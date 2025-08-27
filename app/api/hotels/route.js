import { NextResponse } from 'next/server';
import { getGuestyToken } from '../../../lib/auth.js';
import axios from 'axios';
import crypto from 'crypto';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

// Helper function for Hotelbeds signature
function generateHotelbedsSignature() {
  const apiKey = process.env.HOTELBEDS_API_KEY;
  const secret = process.env.HOTELBEDS_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  return crypto.createHash("sha256").update(apiKey + secret + timestamp).digest("hex");
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract search parameters
    const city = searchParams.get('city');
    const checkin = searchParams.get('checkin') || searchParams.get('checkIn');
    const checkout = searchParams.get('checkout') || searchParams.get('checkOut');
    const guests = searchParams.get('guests') || searchParams.get('minOccupancy') || '2';
    const destinationCode = searchParams.get('destinationCode');
    const country = "Spain";

    console.log('Hotel search params:', { city, checkin, checkout, guests, destinationCode });

    const results = [];
    let guestyError = null;
    let hotelbedsError = null;

    // --- 1. Search Guesty API (First Priority) ---
    try {
      console.log('🔍 Searching Guesty API...');

      if (city) {
        // Get fresh token
        const token = await getGuestyToken();

        let guestyUrl = `${GUESTY_API_BASE}/listings?limit=30&country=Spain`;
        if (city) guestyUrl += `&city=${encodeURIComponent(city)}`;
        if (checkin) guestyUrl += `&checkIn=${checkin}`;
        if (checkout) guestyUrl += `&checkOut=${checkout}`;
        if (guests) guestyUrl += `&minOccupancy=${guests}`;

        const guestyResponse = await fetch(guestyUrl, {
          method: 'GET',
          headers: {
            'accept': 'application/json; charset=utf-8',
            'authorization': `Bearer ${token}`,
          },
          timeout: 10000
        });

        if (guestyResponse.ok) {
          const guestyData = await guestyResponse.json();
          let guestyListings = [];

          if (Array.isArray(guestyData)) {
            guestyListings = guestyData;
          } else if (guestyData?.results) {
            guestyListings = guestyData.results;
          }

          console.log(`✅ Found ${guestyListings.length} hotels from Guesty`);

          // Transform Guesty results
          results.push(...guestyListings.map(listing => ({
            id: listing._id,
            source: "guesty",
            priority: 1,
            code: listing._id,
            name: listing.title || listing.nickname || 'Untitled Property',
            description: listing.publicDescription?.summary || listing.publicDescription?.space || 'No description available',
            city: listing.address?.city || city || 'Unknown City',
            country: listing.address?.country || 'Unknown',
            address: `${listing.address?.street || ''} ${listing.address?.apt || ''}`.trim() || 'Address not available',
            coordinates: listing.address?.coordinates ? {
              longitude: listing.address.coordinates.lng,
              latitude: listing.address.coordinates.lat
            } : null,
            accommodationType: listing.propertyType || 'APARTMENT',
            category: listing.listingType || 'SINGLE',
            bedrooms: listing.bedrooms || 0,
            bathrooms: listing.bathrooms || 0,
            beds: listing.beds || 1,
            maxGuests: listing.accommodates || 2,
            prices: listing.prices || null,
            images: listing.pictures?.map(pic => pic.original) || [],
            amenities: listing.amenities || [],
            minOccupancy:  guests || 2,
            checkin: checkin || '',
            checkout: checkout || '',
            houseRules: {
              petsAllowed: listing.petsAllowed,
              smokingAllowed: listing.smokingAllowed,
              suitableForEvents: listing.suitableForEvents,
              suitableForChildren: listing.suitableForChildren,
              suitableForInfants: listing.suitableForInfants
            }
          })));

        } else {
          throw new Error(`Guesty API error: ${guestyResponse.status}`);
        }
      }
    } catch (error) {
      guestyError = error.message;
      console.error('❌ Guesty API error:', guestyError);
    }

    // --- 2. Search Hotelbeds API (Second Priority) ---
    try {
      console.log('🔍 Searching Hotelbeds API...');

      if (process.env.HOTELBEDS_API_KEY && process.env.HOTELBEDS_SECRET) {
        const signature = generateHotelbedsSignature();

        console.log('Hotelbeds signature generated', signature);

        const hotelbedsResponse = await axios.get("https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels", {
          headers: {
            "Api-key": process.env.HOTELBEDS_API_KEY,
            "X-Signature": signature,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          params: {
            fields: 'all',
            destinationCode: destinationCode || city,
            language: 'CAS',
            from: 1,
            to: 30,
            useSecondaryLanguage: false
          },
          timeout: 10000
        });

        const hotelbedsHotels = hotelbedsResponse.data.hotels || [];
        console.log(`✅ Found ${hotelbedsHotels.length} hotels from Hotelbeds`);

        // Transform Hotelbeds results
        results.push(...hotelbedsHotels.map(hotel => ({
          id: hotel.code || hotel.hotelCode,
          source: "hotelbeds",
          priority: 2,
          code: hotel.code || hotel.hotelCode,
          name: hotel.name?.content || hotel.name || 'Unnamed Hotel',
          description: hotel.description?.content || hotel.description || 'No description available',
          city: hotel.city?.content || city || 'Unknown City',
          country: hotel.country?.content || 'Unknown',
          address: hotel.address?.content || 'Address not available',
          coordinates: hotel.coordinates ? {
            longitude: hotel.coordinates.longitude,
            latitude: hotel.coordinates.latitude
          } : null,
          accommodationType: hotel.accommodationType?.content || 'HOTEL',
          category: hotel.categoryCode || 'Standard',
          rating: hotel.ranking,
          images: hotel.images?.map(img => `https://photos.hotelbeds.com/giata/${img.path}`) || [],
          amenities: hotel.facilities?.map(f => f.facilityName) || [],
          chainCode: hotel.chain?.chainCode,
          chainName: hotel.chain?.content
        })));
      } else {
        console.log('⚠️ Hotelbeds API credentials not configured');
      }
    } catch (error) {
      hotelbedsError = error.response?.data || error.message;
      console.error('❌ Hotelbeds API error:', hotelbedsError);
    }

    // Sort results by priority (Guesty first, then Hotelbeds)
    results.sort((a, b) => a.priority - b.priority);

    console.log(`🏨 Total hotels found: ${results.length} (Guesty: ${results.filter(r => r.source === 'guesty').length}, Hotelbeds: ${results.filter(r => r.source === 'hotelbeds').length})`);

    // Return combined results with Guesty first, then Hotelbeds
    return NextResponse.json({
      success: true,
      total: results.length,
      guestyCount: results.filter(r => r.source === 'guesty').length,
      hotelbedsCount: results.filter(r => r.source === 'hotelbeds').length,
      hotels: results,
      searchParams: { city, checkin, checkout, guests },
      errors: {
        guesty: guestyError,
        hotelbeds: hotelbedsError
      }
    });

  } catch (error) {
    console.error('❌ Hotel search failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Hotel search failed",
        details: error.message
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getGuestyToken } from '../../../lib/auth.js';
import axios from 'axios';
import crypto from 'crypto';
import { facilities as hotelbedsFacilities } from '../../../hotelbeds_facilities.js';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

// Helper function for Hotelbeds signature
function generateHotelbedsSignature() {
  const apiKey = process.env.HOTELBEDS_API_KEY;
  const secret = process.env.HOTELBEDS_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  return crypto.createHash("sha256").update(apiKey + secret + timestamp).digest("hex");
}

export async function GET(request) {
  const facilityMap = new Map();
  for (const facility of hotelbedsFacilities) {
    const key = `${facility.code}-${facility.facilityGroupCode}`;
    if (!facilityMap.has(key)) {
      facilityMap.set(key, facility?.description?.content || "");
    }
  }

  try {
    const { searchParams } = new URL(request.url);

    console.log('Raw URL:', request.url);
    console.log('SearchParams object:', searchParams);
    console.log('All searchParams entries:', Object.fromEntries(searchParams.entries()));

    // Extract search parameters
    const city = searchParams.get('city');
    const checkin = searchParams.get('checkin') || searchParams.get('checkIn');
    const checkout = searchParams.get('checkout') || searchParams.get('checkOut');
    const guests = parseInt(searchParams.get('guests') || searchParams.get('minOccupancy') || '2');
    const destinationCode = searchParams.get('destinationCode');
    const destId = searchParams.get('dest_id');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const country = "Spain";

    console.log('Hotel search params:', { city, checkin, checkout, guests, destinationCode, destId, page, pageSize });

    const results = [];
    let guestyError = null;
    let hotelbedsError = null;
    let bookingError = null;
    let bookingPagination = null;
    let bookingCount = 0;

    // --- 1. Search Guesty API (First Priority) ---
    try {
      console.log('🔍 Searching Guesty API...');

      if (city) {
        // Get fresh token
        const token = await getGuestyToken();

        let guestyUrl = `${GUESTY_API_BASE}/listings?country=Spain`;
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
            minOccupancy: guests || 2,
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

    // --- 2. Search New Booking.com API (Second Priority) ---
    try {
      console.log('🔍 Searching New Booking.com API...');
      console.log('destId available:', destId);

      if (city && destId) {
        console.log('✅ Both city and destId available, proceeding with Booking.com API');

        const options = {
          method: 'GET',
          url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
          params: {
            dest_id: destId,
            dest_type: 'city',
            adults_number: guests.toString(),
            page_number: (page - 1).toString(), // API uses 0-based indexing
            room_number: '1',
            locale: 'en-gb',
            units: 'metric',
            order_by: 'popularity',
            filter_by_currency: 'EUR',
            include_adjacency: 'true'
          },
          headers: {
            'x-rapidapi-key': '29afa57339msh2bad14f20e8b316p166cfdjsnfc4dd245d41f',
            'x-rapidapi-host': 'booking-com.p.rapidapi.com'
          }
        };

        // Add date parameters if provided
        if (checkin) {
          options.params.checkin_date = checkin;
        }
        if (checkout) {
          options.params.checkout_date = checkout;
        }

        const bookingResponse = await axios.request(options);
        console.log('New Booking.com response received');

        if (bookingResponse.data && bookingResponse.data.result) {
          const bookingResults = bookingResponse.data.result;
          bookingCount = bookingResponse.data.count || bookingResults.length;

          // Extract pagination info
          bookingPagination = {
            totalPages: Math.ceil(bookingCount / pageSize),
            currentPage: page,
            totalItems: bookingCount,
            pageSize: bookingResults.length,
            primaryCount: bookingResponse.data.primary_count || bookingCount,
            unfilteredCount: bookingResponse.data.unfiltered_count || bookingCount
          };

          const bookingHotels = bookingResults.map(hotel => ({
            id: `${hotel.hotel_id}`,
            name: hotel.hotel_name || hotel.hotel_name_trans || 'Hotel sin nombre',
            address: hotel.address || hotel.address_trans || '',
            city: hotel.city || hotel.city_trans || city || '',
            country: hotel.country_trans || 'Unknown',
            description: hotel.hotel_name_trans || hotel.hotel_name || '',

            // Images
            images: [
              hotel.max_1440_photo_url,
              hotel.max_photo_url,
              hotel.main_photo_url
            ].filter(Boolean),

            // Pricing
            price: hotel.composite_price_breakdown?.all_inclusive_amount?.value ||
              hotel.min_total_price ||
              null,
            currency: hotel.composite_price_breakdown?.all_inclusive_amount?.currency ||
              hotel.currency_code ||
              'EUR',
            priceBreakdown: hotel.composite_price_breakdown,

            // Ratings and reviews
            rating: hotel.class || null,
            reviews_count: hotel.review_nr || 0,
            reviews_score: hotel.review_score || 0,
            reviews_score_word: hotel.review_score_word || '',

            // Property details
            accommodationType: hotel.accommodation_type_name || 'Hotel',
            accommodationTypeId: hotel.accommodation_type || null,
            bedrooms: hotel.unit_configuration_label ?
              extractBedroomsFromLabel(hotel.unit_configuration_label) : 0,
            bathrooms: hotel.unit_configuration_label ?
              extractBathroomsFromLabel(hotel.unit_configuration_label) : 0,

            beds: extractBedsFromLabel(hotel.unit_configuration_label) || 1,
            maxGuests: guests,
            unit_configuration_label: hotel.unit_configuration_label || '',

            // Location
            location: {
              lat: hotel.latitude || null,
              lng: hotel.longitude || null
            },
            coordinates: hotel.latitude && hotel.longitude ? {
              latitude: hotel.latitude,
              longitude: hotel.longitude
            } : null,

            // Distance and location info
            distance_to_center: hotel.distance_to_cc || hotel.distance || null,
            distance_formatted: hotel.distance_to_cc_formatted || null,
            district: hotel.district || '',

            // Booking details
            hotel_link: hotel.url || '',
            is_free_cancellable: hotel.is_free_cancellable === 1,
            is_genius_deal: hotel.is_genius_deal === 1,
            is_mobile_deal: hotel.is_mobile_deal === 1,

            // Additional info
            facilities: hotel.hotel_facilities ?
              hotel.hotel_facilities.split(',').map(f => f.trim()) : [],
            badges: hotel.badges || [],
            amenities: hotel.hotel_facilities ?
              hotel.hotel_facilities.split(',').slice(0, 10) : [], // Limit amenities

            // Checkin/checkout
            checkin: hotel.checkin || { from: '', until: '' },
            checkout: hotel.checkout || { from: '', until: '' },

            // Source and priority
            source: 'booking',
            priority: 2,
            dest_id: destId,

            // Search params
            searchParams: {
              checkin,
              checkout,
              guests
            }
          }));

          results.push(...bookingHotels);
          console.log(`✅ Found ${bookingHotels.length} hotels from New Booking.com API (Page ${page})`);
        }
      } else {
        console.log('❌ Skipping Booking.com API - missing city or dest_id:', { city: !!city, destId: !!destId });
      }
    } catch (error) {
      bookingError = error.response?.data?.message || error.message;
      console.error('❌ New Booking.com API error:', error.response?.data || error.message);
    }

    // --- 3. Search Hotelbeds API (Third Priority) ---
    try {
      console.log('🔍 Searching Hotelbeds API...');

      if (process.env.HOTELBEDS_API_KEY && process.env.HOTELBEDS_SECRET) {
        const signature = generateHotelbedsSignature();

        console.log('Hotelbeds signature generated', signature);

        // Get Content API hotels (metadata)
        const hotelsResponse = await axios.get(
          `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?destinationCode=${destinationCode}&language=CAS`,
          {
            headers: {
              "Api-key": process.env.HOTELBEDS_API_KEY,
              "X-Signature": signature,
              "Accept": "application/json"
            }
          }
        );

        const hotelCodes = hotelsResponse.data.hotels.map(h => h.code).slice(0, 100);

        const hotelbedsResponse = await axios.post(
          "https://api.test.hotelbeds.com/hotel-api/1.0/hotels",
          {
            stay: {
              checkIn: checkin,
              checkOut: checkout
            },
            occupancies: [
              {
                rooms: 1,
                adults: guests || 1,
                children: 0
              }
            ],
            hotels: {
              hotel: hotelCodes
            },
            language: "CAS"
          },
          {
            headers: {
              "Api-key": process.env.HOTELBEDS_API_KEY,
              "X-Signature": signature,
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            timeout: 10000
          }
        );

        // Get Content API hotels (metadata)
        const contentHotels = hotelsResponse.data.hotels || [];
        const contentMap = new Map(contentHotels.map(h => [h.code, h]));

        // Get Availability API hotels (prices & rooms)
        const hotelbedsHotels = hotelbedsResponse.data.hotels.hotels || [];

        // Merge and push results
        results.push(
          ...hotelbedsHotels.map(hotel => {
            const content = contentMap.get(hotel.code) || {};

            return {
              id: hotel.code,
              source: "hotelbeds",
              priority: 3,

              // Identification
              code: hotel.code,
              name: content.name?.content || hotel.name?.content || "Unnamed Hotel",

              // Availability info
              currency: hotel.currency,
              minRate: hotel.minRate,
              maxRate: hotel.maxRate,
              bedrooms: hotel.rooms.length,
              rooms: hotel.rooms?.map(room => ({
                code: room.code,
                name: room.name?.content,
                rates: room.rates?.map(rate => ({
                  rateKey: rate.rateKey,
                  net: rate.net,
                  sellingRate: rate.sellingRate,
                  rateType: rate.rateType,
                  boardCode: rate.boardCode,
                  boardName: rate.boardName,
                  paymentType: rate.paymentType,
                  cancellationPolicies: rate.cancellationPolicies?.map(c => ({
                    amount: c.amount,
                    from: c.from
                  }))
                }))
              })) || [],

              // Content info
              description: content.description?.content || "No description available",
              city: content.city?.content || "Unknown City",
              country: content.country?.content || "",
              address: content.address?.content || "Address not available",
              coordinates: content.coordinates
                ? {
                  longitude: content.coordinates.longitude,
                  latitude: content.coordinates.latitude
                }
                : null,
              accommodationType: content.accommodationType?.content || "HOTEL",
              category: content.categoryCode || "Standard",
              rating: hotel.ranking || null,
              images:
                content.images?.map(
                  img => `https://photos.hotelbeds.com/giata/${img.path}`
                ) || [],
              amenities: content.facilities?.map(f => facilityMap.get(`${f.facilityCode}-${f.facilityGroupCode}`)).filter(Boolean) || [],
              chainCode: content.chain?.chainCode || null,
              chainName: content.chain?.content || null,
              checkin: checkin,
              checkout: checkout,
              guests: guests
            };
          })
        );

      } else {
        console.log('⚠️ Hotelbeds API credentials not configured');
      }
    } catch (error) {
      hotelbedsError = error.response?.data || error.message;
      console.error('❌ Hotelbeds API error:', hotelbedsError);
    }

    // Sort results by priority (Guesty first, then Booking.com, then Hotelbeds)
    results.sort((a, b) => a.priority - b.priority);

    console.log(`🏨 Total hotels found: ${results.length} (Guesty: ${results.filter(r => r.source === 'guesty').length}, Booking.com: ${results.filter(r => r.source === 'booking').length}, Hotelbeds: ${results.filter(r => r.source === 'hotelbeds').length})`);
    // Return combined results with Guesty first, then Booking.com, then Hotelbeds
    return NextResponse.json({
      success: true,
      total: results.length,
      guestyCount: results.filter(r => r.source === 'guesty').length,
      bookingCount: bookingCount,
      hotelbedsCount: results.filter(r => r.source === 'hotelbeds').length,
      coordinates: results.find(r => r.coordinates)?.coordinates || null,
      hotels: results,
      pagination: {
        ...(bookingPagination && { booking: bookingPagination })
      },
      searchParams: { city, checkin, checkout, guests, page, pageSize },
      errors: {
        guesty: guestyError,
        booking: bookingError,
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

// Helper function to extract bedroom count from unit configuration label

function extractBathroomsFromLabel(label) {
  if (!label) return 0;

  const bathroomMatch = label.match(/(\d+)\s*bathroom/i);
  if (bathroomMatch) {
    return parseInt(bathroomMatch[1]);
  }

  // Check for studio or apartment types
  if (label.toLowerCase().includes('studio')) return 0;
  if (label.toLowerCase().includes('entire apartment')) return 1;

  return 0;
}

function extractBedroomsFromLabel(label) {
  if (!label) return 0;

  const bedroomMatch = label.match(/(\d+)\s*bedroom/i);
  if (bedroomMatch) {
    return parseInt(bedroomMatch[1]);
  }

  // Check for studio or apartment types
  if (label.toLowerCase().includes('studio')) return 0;
  if (label.toLowerCase().includes('entire apartment')) return 1;

  return 0;
}

// Helper function to extract bed count from unit configuration label
function extractBedsFromLabel(label) {
  if (!label) return 1;

  const bedMatch = label.match(/(\d+)\s*bed/i);
  if (bedMatch) {
    return parseInt(bedMatch[1]);
  }

  return 1;
}
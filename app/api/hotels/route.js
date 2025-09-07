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

    // Extract search parameters
    const city = searchParams.get('city');
    const checkin = searchParams.get('checkin') || searchParams.get('checkIn');
    const checkout = searchParams.get('checkout') || searchParams.get('checkOut');
    const guests = searchParams.get('guests') || searchParams.get('minOccupancy') || '2';
    const destinationCode = searchParams.get('destinationCode');
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '25';
    const country = "Spain";

    console.log('Hotel search params:', { city, checkin, checkout, guests, destinationCode, page, pageSize });

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

    // --- 2. Search Booking.com API (Second Priority) ---
    try {
      console.log('🔍 Searching Booking.com API...');

      const options = {
        method: 'GET',
        url: 'https://booking-com-api4.p.rapidapi.com/list-hotels/',
        params: {
          city_name: city,
          page_number: page,
          items_per_page: 2
        },
        headers: {
          'x-rapidapi-key': '29afa57339msh2bad14f20e8b316p166cfdjsnfc4dd245d41f',
          'x-rapidapi-host': 'booking-com-api4.p.rapidapi.com'
        }
      };

      const bookingResponse = await axios.request(options);
      console.log('Booking.com response:', bookingResponse.data);

      // Extract pagination data
      if (bookingResponse.data && bookingResponse.data.pagination_data) {
        bookingCount = bookingResponse.data.pagination_data.total_items;
        bookingPagination = {
          totalPages: bookingResponse.data.pagination_data.total_pages,
          currentPage: bookingResponse.data.pagination_data.current_page,
          totalItems: bookingResponse.data.pagination_data.total_items,
          pageSize: bookingResponse.data.pagination_data.page_size
        };
        console.log('Booking.com pagination:', bookingPagination);
      }
      console.log(bookingResponse.data);
      if (bookingResponse.data && bookingResponse.data.data.length > 0) {
        const bookingHotels = bookingResponse.data.data.map(hotel => ({
          id: `booking-${hotel.id || hotel.hotel_id}`,
          name: hotel.venue_name || hotel.name || 'Hotel sin nombre',
          address: hotel.address || '',
          city: city || '',
          description: hotel.venue_description || hotel.description || '',
          images: hotel.images ||  [hotel.primary_image],
          price: hotel.rooms_data && hotel.rooms_data[0] ? hotel.rooms_data[0].price : null,
          rating: hotel.rating || null,
          reviews_count: hotel.reviews_count || 0,
          reviews_score: hotel.reviews_score || 0,
          source: 'booking',
          priority: 2,
          hotel_link: hotel.hotel_link || '',
          rooms_data: hotel.rooms_data || [],
          location: {
            lat: hotel.latitude || null,
            lng: hotel.longitude || null
          }
        }));
        results.push(...bookingHotels);
        console.log(`Found ${bookingHotels.length} hotels from Booking.com (Page ${page}/${bookingPagination?.totalPages || '?'})`);
      }

    } catch (error) {
      bookingError = error.message;
      console.error('Booking.com API error:', error);
    }

    // --- 3. Search Hotelbeds API (Third Priority) ---
    try {
      console.log('🔍 Searching Hotelbeds API...');

      if (process.env.HOTELBEDS_API_KEY && process.env.HOTELBEDS_SECRET) {
        const signature = generateHotelbedsSignature();

        console.log('Hotelbeds signature generated', signature);

        // const hotelbedsResponse = await axios.get("https://api.test.hotelbeds.com/hotel-api/1.0/hotels", {
        //   headers: {
        //     "Api-key": process.env.HOTELBEDS_API_KEY,
        //     "X-Signature": signature,
        //     "Accept": "application/json",
        //     "Content-Type": "application/json"
        //   },
        //   params: {
        //     fields: 'all',
        //     destinationCode: destinationCode || city,
        //     language: 'CAS',
        //     from: 1,
        //     to: 30,
        //     useSecondaryLanguage: false
        //   },
        //   timeout: 10000
        // });

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
              checkIn: checkin,   // e.g. "2025-09-01"
              checkOut: checkout  // e.g. "2025-09-05"
            },
            occupancies: [
              {
                rooms: 1,
                adults: guests || 1,
                children: 0
              }
            ],
            hotels: {
              hotel: hotelCodes   // array of hotel codes from step 1
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

        // 1) Get Content API hotels (metadata)
        const contentHotels = hotelsResponse.data.hotels || [];
        const contentMap = new Map(contentHotels.map(h => [h.code, h]));

        // 2) Get Availability API hotels (prices & rooms)
        const hotelbedsHotels = hotelbedsResponse.data.hotels.hotels || [];

        // 3) Merge and push results
        results.push(
          ...hotelbedsHotels.map(hotel => {
            const content = contentMap.get(hotel.code) || {};
            // 

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
              // bedrooms: countBedroomsFromRooms(hotel.rooms),
              bedrooms: hotel.rooms.length ,
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
      hotels: results,
      pagination: bookingPagination ? {
        booking: bookingPagination
      } : null,
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

function countBedroomsFromRooms(rooms) {
  if (!rooms || !Array.isArray(rooms)) return 0;
  
  let bedroomCount = 0;
  
  rooms.forEach(room => {
    if (room.roomStays && Array.isArray(room.roomStays)) {
      console.log('roomStays:', room.roomStays);
      const bedRooms = room.roomStays.filter(stay => stay.stayType === "BED");
      bedroomCount += bedRooms.length;
    }
  });
  
  return bedroomCount;
}
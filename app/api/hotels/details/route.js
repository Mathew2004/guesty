import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';
import { facilities as hotelbedsFacilities } from '../../../../hotelbeds_facilities.js';

// Helper function to generate the Hotelbeds API signature
function generateHotelbedsSignature() {
  const apiKey = process.env.HOTELBEDS_API_KEY;
  const secret = process.env.HOTELBEDS_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  return crypto.createHash("sha256").update(apiKey + secret + timestamp).digest("hex");
}

export async function POST(request) {
  try {
    const { hotelCode, checkin, checkout, guests } = await request.json();

    const facilityMap = new Map();
    for (const facility of hotelbedsFacilities) {
      const key = `${facility.code}-${facility.facilityGroupCode}`;
      if (!facilityMap.has(key)) {
        facilityMap.set(key, facility?.description?.content || "");
      }
    }

    // Validate required parameters
    if (!hotelCode) {
      return NextResponse.json({ error: "Hotel code is required" }, { status: 400 });
    }
    if (!checkin || !checkout) {
      return NextResponse.json({ error: "Check-in and check-out dates are required" }, { status: 400 });
    }

    const signature = generateHotelbedsSignature();

    // 1. Fetch detailed hotel content (metadata, images, amenities)
    const contentResponse = await axios.get(
      `https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels/${hotelCode}/details?language=CAS`,
      {
        headers: {
          "Api-key": process.env.HOTELBEDS_API_KEY,
          "X-Signature": signature,
          "Accept": "application/json"
        }
      }
    );
    const content = contentResponse.data.hotel || {};

    // 2. Fetch hotel availability (pricing, rooms for specific dates)
    const availabilityResponse = await axios.post(
      "https://api.test.hotelbeds.com/hotel-api/1.0/hotels",
      {
        stay: { checkIn: checkin, checkOut: checkout },
        occupancies: [{ rooms: 1, adults: guests || 1, children: 0 }],
        hotels: { hotel: [hotelCode] },
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
    const availability = availabilityResponse.data.hotels.hotels?.[0] || {};

    // 3. Merge the data from both API calls into a single object
    const hotelData = {
      id: content.code,
      source: "hotelbeds",
      code: content.code,
      name: content.name?.content || "Unnamed Hotel",
      description: content.description?.content || "No description available",
      city: content.city?.content || "Unknown City",
      country: content.country?.content || "Unknown",
      address: content.address?.content || "Address not available",
      coordinates: content.coordinates,
      accommodationType: content.accommodationType?.content || "HOTEL",
      category: content.categoryCode || "Standard",
      rating: availability.ranking || content.categoryCode?.replace(/EST/, '') || null,
      images: content.images?.map(img => `https://photos.hotelbeds.com/giata/${img.path}`) || [],
      amenities: content.facilities?.map(f => facilityMap.get(`${f.facilityCode}-${f.facilityGroupCode}`)).filter(Boolean) || [],
      currency: availability.currency,
      minRate: availability.minRate,
      maxRate: availability.maxRate,
      rooms: availability.rooms?.map(room => ({
        code: room.code,
        name: room.name?.content,
        rates: room.rates?.map(rate => ({
          rateKey: rate.rateKey,
          net: rate.net,
          sellingRate: rate.sellingRate,
          rateType: rate.rateType,
          boardName: rate.boardName,
          paymentType: rate.paymentType,
          cancellationPolicies: rate.cancellationPolicies
        }))
      })) || [],
      // Add more fields from the content API as needed
      web: content.web,
      email: content.email,
      phones: content.phones,
      creditCards: content.creditCards,
      interestPoints: content.interestPoints,
    };

    return NextResponse.json(hotelData);

  } catch (error) {
    console.error("Error fetching hotel details:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch hotel details",
        details: error.response?.data || error.message
      },
      { status: 500 }
    );
  }
}

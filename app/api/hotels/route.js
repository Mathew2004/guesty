import { NextResponse } from 'next/server';
import { getGuestyToken } from '../../../lib/auth.js';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search parameters
    const city = searchParams.get('city');
    const country = searchParams.get('country');
    const state = searchParams.get('state');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const minOccupancy = searchParams.get('minOccupancy') || '';
    const numberOfBedrooms = searchParams.get('numberOfBedrooms') || '0';
    const numberOfBathrooms = searchParams.get('numberOfBathrooms') || '0';
    const propertyType = searchParams.get('propertyType') || '';
    const listingType = searchParams.get('listingType') || '';
    const limit = searchParams.get('limit') || '20';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const currency = searchParams.get('currency') || '';
    
    // Get fresh token
    const token = await getGuestyToken();
    
    const headers = {
      'accept': 'application/json; charset=utf-8',
      'authorization': `Bearer ${token}`,
    };

    // Build the query URL
    let url = `${GUESTY_API_BASE}/listings?limit=${limit}&numberOfBedrooms=${numberOfBedrooms}&numberOfBathrooms=${numberOfBathrooms}`;
    
    // Add optional parameters
    if (city) url += `&city=${encodeURIComponent(city)}`;
    if (country) url += `&country=${encodeURIComponent(country)}`;
    if (state) url += `&state=${encodeURIComponent(state)}`;
    if (checkIn) url += `&checkIn=${checkIn}`;
    if (checkOut) url += `&checkOut=${checkOut}`;
    if (minOccupancy) url += `&minOccupancy=${minOccupancy}`;
    if (propertyType) url += `&propertyType=${propertyType}`;
    if (listingType) url += `&listingType=${listingType}`;
    if (minPrice && currency) {
      url += `&minPrice=${minPrice}&currency=${currency}`;
    }
    if (maxPrice && currency) {
      url += `&maxPrice=${maxPrice}&currency=${currency}`;
    }
    
    console.log('Fetching listings from Guesty API:', url);
    console.log('Request headers:', headers);
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Guesty API Error response:', errorText);
      console.error('Request URL was:', url);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    console.log('Guesty API Response data structure:', JSON.stringify(data, null, 2));
    console.log('Data type:', typeof data);
    console.log('Is data an array?', Array.isArray(data));
    
    // Handle different response structures from Guesty API
    let listings = [];
    
    if (Array.isArray(data)) {
      listings = data;
      console.log('Using data directly as array');
    } else if (data && data.results && Array.isArray(data.results)) {
      listings = data.results;
      console.log('Using data.results as array');
    } else if (data && data.data && Array.isArray(data.data)) {
      listings = data.data;
      console.log('Using data.data as array');
    } else if (data && data.listings && Array.isArray(data.listings)) {
      listings = data.listings;
      console.log('Using data.listings as array');
    } else {
      console.error('Unexpected data structure. Data keys:', Object.keys(data || {}));
      console.error('Full data:', data);
      
      // Return empty result instead of error to allow debugging
      return NextResponse.json({
        hotels: [],
        total: 0,
        error: 'No listings found or unexpected response format',
        debug: {
          dataType: typeof data,
          isArray: Array.isArray(data),
          keys: Object.keys(data || {}),
          responseData: data
        }
      });
    }
    
    // Transform the listings data to match the expected format
    const transformedData = {
      hotels: listings.map(listing => ({
        code: listing._id,
        name: {
          content: listing.title || listing.nickname || 'Untitled Property'
        },
        description: {
          content: listing.publicDescription?.summary || listing.publicDescription?.space || 'No description available'
        },
        countryCode: listing.address?.country || 'Unknown',
        city: {
          content: listing.address?.city || 'Unknown City'
        },
        address: {
          content: `${listing.address?.street || ''} ${listing.address?.apt || ''}`.trim() || 'Address not available',
          street: listing.address?.street,
          number: listing.address?.apt
        },
        coordinates: listing.address?.coordinates ? {
          longitude: listing.address.coordinates.lng,
          latitude: listing.address.coordinates.lat
        } : null,
        accommodationTypeCode: listing.propertyType || 'APARTMENT',
        categoryCode: listing.listingType || 'SINGLE',
        rooms: [{
          roomType: listing.roomType || 'STD',
          maxPax: listing.accommodates || 2,
          maxAdults: listing.accommodates || 2,
          maxChildren: Math.max(0, (listing.accommodates || 2) - 2),
          minAdults: 1,
          minPax: 1
        }],
        amenities: listing.amenities || [],
        bedrooms: listing.bedrooms || 0,
        bathrooms: listing.bathrooms || 0,
        beds: listing.beds || 1,
        propertyType: listing.propertyType,
        listingType: listing.listingType,
        prices: listing.prices || null,
        images: listing.pictures?.map(pic => pic.original) || [],
        defaultCheckInTime: listing.defaultCheckInTime,
        defaultCheckOutTime: listing.defaultCheckOutTime,
        houseRules: {
          petsAllowed: listing.petsAllowed,
          smokingAllowed: listing.smokingAllowed,
          suitableForEvents: listing.suitableForEvents,
          suitableForChildren: listing.suitableForChildren,
          suitableForInfants: listing.suitableForInfants
        }
      })) || [],
      total: listings.length,
      originalResponse: data // For debugging
    };
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels', details: error.message }, 
      { status: 500 }
    );
  }
}

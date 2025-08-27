import { NextResponse } from 'next/server';
import { getGuestyToken, handleUnauthorizedError } from '../../../lib/auth.js';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    const fields = searchParams.get('fields') || '';

    console.log('Fetching listing details for:', listingId);
    
    if (!listingId) {
      return NextResponse.json(
        { error: 'listingId parameter is required' }, 
        { status: 400 }
      );
    }
    
    // Get fresh token
    let token = await getGuestyToken();
    
    const makeRequest = async (authToken) => {
      const headers = {
        'accept': 'application/json; charset=utf-8',
        'authorization': `Bearer ${authToken}`,
      };

      // Build the query URL
      let url = `${GUESTY_API_BASE}/listings/${listingId}`;
      
      if (fields) {
        url += `?fields=${encodeURIComponent(fields)}`;
      }
      
      console.log('Fetching listing details from Guesty API:', url);
      
      return await fetch(url, {
        method: 'GET',
        headers
      });
    };

    let response = await makeRequest(token);

    // If we get 401, try to refresh token and retry once
    // if (response.status === 401) {
    //   console.log('Got 401, attempting token refresh...');
    //   try {
    //     token = await handleUnauthorizedError();
    //     response = await makeRequest(token);
    //   } catch (refreshError) {
    //     console.error('Token refresh failed:', refreshError);
    //     return NextResponse.json(
    //       { error: 'Authentication failed', details: refreshError.message }, 
    //       { status: 401 }
    //     );
    //   }
    // }

    console.log('Listing details response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Listing details error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const listing = await response.json();
    console.log('Listing details response received successfully');
    
    // Transform the listing data to match expected format
    
    // Transform the listing data to match expected format
    const transformedListing = {
      id: listing._id,
      title: listing.title || listing.nickname || 'Untitled Property',
      description: {
        summary: listing.publicDescription?.summary || '',
        space: listing.publicDescription?.space || '',
        access: listing.publicDescription?.access || '',
        interaction: listing.publicDescription?.interaction || '',
        notes: listing.publicDescription?.notes || '',
        transit: listing.publicDescription?.transit || '',
        neighborhood: listing.publicDescription?.neighborhood || ''
      },
      address: {
        street: listing.address?.street || '',
        apt: listing.address?.apt || '',
        city: listing.address?.city || '',
        state: listing.address?.state || '',
        country: listing.address?.country || '',
        zipcode: listing.address?.zipcode || '',
        full: `${listing.address?.street || ''} ${listing.address?.apt || ''}, ${listing.address?.city || ''}, ${listing.address?.state || ''}, ${listing.address?.country || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '')
      },
      coordinates: listing.address?.coordinates ? {
        lat: listing.address.coordinates.lat,
        lng: listing.address.coordinates.lng
      } : null,
      propertyType: listing.propertyType || 'APARTMENT',
      listingType: listing.listingType || 'SINGLE',
      roomType: listing.roomType || 'ENTIRE_HOME',
      accommodates: listing.accommodates || 1,
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      beds: listing.beds || 1,
      bedArrangements: listing.bedArrangements || [],
      amenities: listing.amenities || [],
      pictures: listing.pictures || [],
      prices: listing.prices || null,
      availability: listing.availability || null,
      calendar: listing.calendar || null,
      houseRules: {
        petsAllowed: listing.petsAllowed,
        smokingAllowed: listing.smokingAllowed,
        suitableForEvents: listing.suitableForEvents,
        suitableForChildren: listing.suitableForChildren,
        suitableForInfants: listing.suitableForInfants,
        checkInTime: listing.defaultCheckInTime,
        checkOutTime: listing.defaultCheckOutTime
      },
      host: listing.host || null,
      tags: listing.tags || [],
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
      originalData: listing // Keep original data for debugging
    };
    
    return NextResponse.json(transformedListing);
  } catch (error) {
    console.error('Listing details API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing details', details: error.message }, 
      { status: 500 }
    );
  }
}

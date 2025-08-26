import { NextResponse } from 'next/server';
import { getGuestyToken } from '../../../lib/auth.js';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

export async function GET(request) {
  try {
    // Get fresh token
    const token = await getGuestyToken();
    
    const headers = {
      'accept': 'application/json; charset=utf-8',
      'authorization': `Bearer ${token}`,
    };

    // Get a limited set of listings to calculate stats
    const url = `${GUESTY_API_BASE}/listings?limit=100`;
    
    console.log('Fetching hotel stats from Guesty API:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Guesty API Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    
    // Handle different response structures
    let listings = [];
    if (Array.isArray(data)) {
      listings = data;
    } else if (data && data.results && Array.isArray(data.results)) {
      listings = data.results;
    } else if (data && data.data && Array.isArray(data.data)) {
      listings = data.data;
    }
    
    // Calculate statistics
    const stats = {
      totalProperties: listings.length,
      propertyTypes: {},
      cities: {},
      countries: {},
      bedroomCounts: {},
      averageBedrooms: 0,
      averageBathrooms: 0,
      listingTypes: {}
    };

    let totalBedrooms = 0;
    let totalBathrooms = 0;

    listings.forEach(listing => {
      // Property types
      const propType = listing.propertyType || 'Other';
      stats.propertyTypes[propType] = (stats.propertyTypes[propType] || 0) + 1;

      // Cities
      const city = listing.address?.city || 'Unknown';
      stats.cities[city] = (stats.cities[city] || 0) + 1;

      // Countries
      const country = listing.address?.country || 'Unknown';
      stats.countries[country] = (stats.countries[country] || 0) + 1;

      // Bedrooms
      const bedrooms = listing.bedrooms || 0;
      stats.bedroomCounts[bedrooms] = (stats.bedroomCounts[bedrooms] || 0) + 1;
      totalBedrooms += bedrooms;

      // Bathrooms
      totalBathrooms += listing.bathrooms || 0;

      // Listing types
      const listingType = listing.listingType || 'Other';
      stats.listingTypes[listingType] = (stats.listingTypes[listingType] || 0) + 1;
    });

    // Calculate averages
    if (listings.length > 0) {
      stats.averageBedrooms = Math.round((totalBedrooms / listings.length) * 10) / 10;
      stats.averageBathrooms = Math.round((totalBathrooms / listings.length) * 10) / 10;
    }

    // Convert objects to sorted arrays for easier frontend consumption
    stats.topPropertyTypes = Object.entries(stats.propertyTypes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));

    stats.topCities = Object.entries(stats.cities)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([city, count]) => ({ city, count }));

    stats.topCountries = Object.entries(stats.countries)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Hotel stats API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel statistics', details: error.message }, 
      { status: 500 }
    );
  }
}

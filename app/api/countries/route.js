import { NextResponse } from 'next/server';
import { getGuestyToken } from '../../../lib/auth.js';

const GUESTY_API_BASE = process.env.GUESTY_API_BASE;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '100';
    const searchText = searchParams.get('searchText') || '';
    
    // Get fresh token
    const token = await getGuestyToken();
    
    const headers = {
      'accept': 'application/json; charset=utf-8',
      'authorization': `Bearer ${token}`,
    };

    let url = `${GUESTY_API_BASE}/listings/cities?limit=${limit}`;
    if (searchText) {
      url += `&searchText=${encodeURIComponent(searchText)}`;
    }
    
    console.log('Fetching cities from Guesty API:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    console.log('Cities API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cities API Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    console.log('Cities API Response data:', data);
    
    // Transform the data to group by countries for the dropdown
    const cities = data.results || data || [];
    const countries = {};
    
    cities.forEach(city => {
      const countryName = city.country || 'Unknown';
      if (!countries[countryName]) {
        countries[countryName] = {
          code: countryName.replace(/\s+/g, '').toUpperCase().slice(0, 2), // Generate a simple code
          name: countryName,
          cities: []
        };
      }
      countries[countryName].cities.push({
        name: city.city,
        state: city.state,
        fullLocation: `${city.city}, ${city.state || ''}, ${countryName}`.replace(/, ,/, ',')
      });
    });
    
    // Convert to array format for countries dropdown
    const countriesArray = Object.values(countries);
    
    return NextResponse.json({
      // countries: countriesArray, // For backward compatibility
      // results: countriesArray,
      total: countriesArray.length,
      cities: cities // Also return raw cities for direct use
    });
  } catch (error) {
    console.error('Cities API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cities', details: error.message }, 
      { status: 500 }
    );
  }
}

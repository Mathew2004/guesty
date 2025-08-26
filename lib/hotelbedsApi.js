// Guesty API Configuration
const BASE_URL = '/api';

// Generic API request function for internal API routes
async function makeApiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Get countries and cities
export async function getCountries() {
  return makeApiRequest(`${BASE_URL}/countries`);
}

// Search listings
export async function searchHotels(searchParams) {
  const { country, state, city, checkIn, checkOut, adults = 2 } = searchParams;
  
  const params = new URLSearchParams();
  if (country) params.append('country', country);
  if (state) params.append('state', state);
  if (city) params.append('city', city);
  if (checkIn) params.append('checkIn', checkIn);
  if (checkOut) params.append('checkOut', checkOut);
  params.append('adults', adults.toString());

  return makeApiRequest(`${BASE_URL}/hotels?${params.toString()}`);
}

// Get individual listing details
export async function getListingDetails(listingId, fields = '') {
  const params = new URLSearchParams();
  params.append('listingId', listingId);
  if (fields) params.append('fields', fields);
  
  return makeApiRequest(`${BASE_URL}/listing?${params.toString()}`);
}

// Get listing calendar availability
export async function getListingCalendar(listingId, fromDate, toDate) {
  const params = new URLSearchParams();
  params.append('listingId', listingId);
  params.append('from', fromDate);
  params.append('to', toDate);

  return makeApiRequest(`${BASE_URL}/calendar?${params.toString()}`);
}
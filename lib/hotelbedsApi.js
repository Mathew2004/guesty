import crypto from 'crypto';

const API_KEY = 'c9fb197970150c2c6cd3c8819e746f13';
const SECRET = '65970ef37a';
const ENDPOINT = 'https://api.test.hotelbeds.com';

// Generate signature for HotelBeds API
function generateSignature() {
  const timestamp = Math.floor(Date.now() / 1000);
  const assemble = API_KEY + SECRET + timestamp;
  const signature = crypto.createHash('sha256').update(assemble).digest('hex');
  return { signature, timestamp };
}

// Generic API request function
async function makeApiRequest(url, options = {}) {
  const { signature, timestamp } = generateSignature();
  
  const headers = {
    'Api-key': API_KEY,
    'X-Signature': signature,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Search hotels
export async function searchHotels(searchParams) {
  const {
    destination,
    checkIn,
    checkOut,
    adults = 2,
    children = 0,
    rooms = 1
  } = searchParams;

  const requestBody = {
    stay: {
      checkIn,
      checkOut
    },
    occupancies: [{
      rooms: rooms,
      adults: adults,
      children: children
    }],
    destinations: [{
      code: destination
    }]
  };

  const url = `${ENDPOINT}/hotel-api/1.0/hotels`;
  
  return makeApiRequest(url, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  });
}

// Get hotel details
export async function getHotelDetails(hotelCode) {
  const url = `${ENDPOINT}/hotel-content-api/1.0/hotels/${hotelCode}`;
  
  return makeApiRequest(url, {
    method: 'GET'
  });
}

// Get countries
export async function getCountries() {
  const url = `${ENDPOINT}/hotel-content-api/1.0/locations/countries?fields=all&language=ENG&from=1&to=203`;
  
  return makeApiRequest(url, {
    method: 'GET'
  });
}

// Get destinations by country codes
export async function getDestinations(countryCodes) {
  const countryCodesParam = Array.isArray(countryCodes) ? countryCodes.join(',') : countryCodes;
  const url = `${ENDPOINT}/hotel-content-api/1.0/locations/destinations?fields=all&countryCodes=${countryCodesParam}&language=ENG&from=1&to=100&useSecondaryLanguage=false`;
  
  return makeApiRequest(url, {
    method: 'GET'
  });
}

// Get hotels by destination and country
export async function getHotels(destinationCode, countryCode, options = {}) {
  const { from = 1, to = 100, hotelCodes = '' } = options;
  let url = `${ENDPOINT}/hotel-content-api/1.0/hotels?fields=all&destinationCode=${destinationCode}&countryCode=${countryCode}&language=ENG&from=${from}&to=${to}&useSecondaryLanguage=false`;
  
  if (hotelCodes) {
    url += `&codes=${hotelCodes}`;
  }
  
  return makeApiRequest(url, {
    method: 'GET'
  });
}

// Create booking
export async function createBooking(bookingData) {
  const url = `${ENDPOINT}/hotel-api/1.0/bookings`;
  
  return makeApiRequest(url, {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
}
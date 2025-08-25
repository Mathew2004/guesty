// Client-side API functions that call our Next.js API routes

// Get countries
export async function getCountries() {
  try {
    const response = await fetch('/api/countries');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}

// Get destinations by country codes
export async function getDestinations(countryCodes) {
  try {
    const countryCodesParam = Array.isArray(countryCodes) ? countryCodes.join(',') : countryCodes;
    const response = await fetch(`/api/destinations?countryCodes=${countryCodesParam}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
}

// Get hotels by destination and country
export async function getHotels(destinationCode, countryCode, options = {}) {
  try {
    const { from = 1, to = 100, hotelCodes = '' } = options;
    let url = `/api/hotels?destinationCode=${destinationCode}&countryCode=${countryCode}&from=${from}&to=${to}`;
    
    if (hotelCodes) {
      url += `&hotelCodes=${hotelCodes}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
}

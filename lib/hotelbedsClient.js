// Client-side API functions that call our Next.js API routes (now using Guesty API)

// Get cities from Guesty API
export async function getCities(searchText = '') {
  try {
    let url = '/api/countries'; // This actually returns cities
    if (searchText) {
      url += `?searchText=${encodeURIComponent(searchText)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}

// Get listings/hotels with search parameters
export async function getListings(searchParams = {}) {
  try {
    const params = new URLSearchParams();
    
    // Map common search parameters
    if (searchParams.city) params.append('city', searchParams.city);
    if (searchParams.country) params.append('country', searchParams.country);
    if (searchParams.state) params.append('state', searchParams.state);
    if (searchParams.checkIn) params.append('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) params.append('checkOut', searchParams.checkOut);
    if (searchParams.adults) params.append('minOccupancy', searchParams.adults);
    if (searchParams.numberOfBedrooms) params.append('numberOfBedrooms', searchParams.numberOfBedrooms);
    if (searchParams.numberOfBathrooms) params.append('numberOfBathrooms', searchParams.numberOfBathrooms);
    if (searchParams.propertyType) params.append('propertyType', searchParams.propertyType);
    if (searchParams.listingType) params.append('listingType', searchParams.listingType);
    if (searchParams.limit) params.append('limit', searchParams.limit);
    if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
    if (searchParams.currency) params.append('currency', searchParams.currency);
    
    const url = `/api/hotels?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

// Get individual listing details
export async function getListingDetails(listingId, fields = '') {
  try {
    let url = `/api/listing?listingId=${listingId}`;
    if (fields) {
      url += `&fields=${encodeURIComponent(fields)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching listing details:', error);
    throw error;
  }
}

// Legacy function names for backward compatibility
export const getCountries = getCities; // Now both point to getCities
export const getDestinations = getCities;
export const getHotels = getListings;

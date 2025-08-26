'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { getCities, getListings } from '../lib/hotelbedsClient';

export default function SearchForm({ onSearch }) {
  const [searchData, setSearchData] = useState({
    city: '',
    country: '',
    state: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    propertyType: '',
    listingType: ''
  });

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState({
    cities: false,
    listings: false
  });
  const [error, setError] = useState(null);

  // Fetch cities on component mount
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(prev => ({ ...prev, cities: true }));
    setError(null);
    try {
      console.log('Fetching cities...');
      const response = await getCities();
      console.log('Cities response:', response);
      const allCities = response.cities || [];
      setCities(allCities);
      
      // Extract unique countries
      const uniqueCountries = [...new Set(allCities.map(city => city.country))].sort();
      setCountries(uniqueCountries);
      
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to load cities. Please check console for details.');
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  // Update states when country changes
  useEffect(() => {
    if (searchData.country && cities.length > 0) {
      const countryStates = cities
        .filter(city => city.country === searchData.country)
        .map(city => city.state)
        .filter(state => state && state.trim() !== '')
        .filter((state, index, arr) => arr.indexOf(state) === index) // unique states
        .sort();
      
      setStates(countryStates);
      
      // Reset state and city when country changes
      setSearchData(prev => ({
        ...prev,
        state: '',
        city: ''
      }));
    } else {
      setStates([]);
      setSearchData(prev => ({
        ...prev,
        state: '',
        city: ''
      }));
    }
  }, [searchData.country, cities]);

  // Update cities when state changes
  useEffect(() => {
    if (searchData.country && cities.length > 0) {
      let filtered = cities.filter(city => city.country === searchData.country);
      
      if (searchData.state) {
        filtered = filtered.filter(city => city.state === searchData.state);
      }
      
      setFilteredCities(filtered);
      
      // Reset city when state changes
      if (searchData.state) {
        setSearchData(prev => ({
          ...prev,
          city: ''
        }));
      }
    } else {
      setFilteredCities([]);
    }
  }, [searchData.country, searchData.state, cities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchData.country) {
      setError('Please select a country');
      return;
    }

    setLoading(prev => ({ ...prev, listings: true }));
    setError(null);
    
    try {
      const searchParams = {
        city: searchData.city,
        country: searchData.country,
        state: searchData.state,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        adults: parseInt(searchData.adults),
        numberOfBedrooms: parseInt(searchData.numberOfBedrooms),
        numberOfBathrooms: parseInt(searchData.numberOfBathrooms),
        propertyType: searchData.propertyType,
        listingType: searchData.listingType,
        limit: 20
      };

      const listingsResponse = await getListings(searchParams);
      
      if (onSearch) {
        onSearch({
          ...searchData,
          listings: listingsResponse.hotels || [], // Note: changed from results to hotels
          total: listingsResponse.total || 0
        });
      }
    } catch (err) {
      console.error('Error searching listings:', err);
      setError('Failed to search listings. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, listings: false }));
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 mx-4 -mt-20 relative z-10 max-w-6xl lg:mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-8 lg:gap-4 lg:items-center ">
        {/* Country Selection */}
        <div className="lg:col-span-1">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              id="country"
              name="country"
              value={searchData.country}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
              required
              disabled={loading.cities}
            >
              <option value="">
                {loading.cities ? 'Loading...' : 'Select Country'}
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* State Selection - Only show when country is selected */}
        {searchData.country && (
          <div className="lg:col-span-1">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                id="state"
                name="state"
                value={searchData.state}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
              >
                <option value="">All States</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* City Selection - Only show when country is selected */}
        {searchData.country && (
          <div className="lg:col-span-1">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                id="city"
                name="city"
                value={searchData.city}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
              >
                <option value="">All Cities</option>
                {filteredCities.map((city, index) => (
                  <option key={index} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}


        {/* Property Type */}
        <div className="lg:col-span-1">
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={searchData.propertyType}
            onChange={handleInputChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Any Type</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="VILLA">Villa</option>
            <option value="CONDO">Condo</option>
          </select>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rooms
          </label>
          <div className="grid grid-cols-2 gap-1">
            <select
              name="numberOfBedrooms"
              value={searchData.numberOfBedrooms}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            >
              <option value="0">Any BR</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} BR</option>
              ))}
            </select>
            <select
              name="numberOfBathrooms"
              value={searchData.numberOfBathrooms}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            >
              <option value="0">Any BA</option>
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num} BA</option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-in Date */}
        <div className="lg:col-span-1">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleInputChange}
              min={today}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="lg:col-span-1">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleInputChange}
              min={searchData.checkIn || today}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1 flex-shrink-0">
          <button
            type="submit"
            disabled={loading.listings || !searchData.country}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading.listings ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
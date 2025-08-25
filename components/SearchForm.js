'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { getCountries, getDestinations, getHotels } from '../lib/hotelbedsClient';

export default function SearchForm({ onSearch }) {
  const [searchData, setSearchData] = useState({
    country: '',
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1
  });

  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    destinations: false,
    hotels: false
  });
  const [error, setError] = useState(null);

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch destinations when country is selected
  useEffect(() => {
    if (searchData.country) {
      fetchDestinations(searchData.country);
    } else {
      setDestinations([]);
    }
  }, [searchData.country]);

  const fetchCountries = async () => {
    setLoading(prev => ({ ...prev, countries: true }));
    setError(null);
    try {
      console.log('Fetching countries...');
      const response = await getCountries();
      console.log('Countries response:', response);
      setCountries(response.countries || []);
    } catch (err) {
      console.error('Error fetching countries:', err);
      setError('Failed to load countries. Please check console for details.');
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  };

  const fetchDestinations = async (countryCode) => {
    setLoading(prev => ({ ...prev, destinations: true }));
    setError(null);
    try {
      const response = await getDestinations(countryCode);
      setDestinations(response.destinations || []);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError('Failed to load destinations. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, destinations: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => {
      const newData = { ...prev, [name]: value };
      // Reset destination when country changes
      if (name === 'country') {
        newData.destination = '';
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchData.country || !searchData.destination) {
      setError('Please select both country and destination');
      return;
    }

    setLoading(prev => ({ ...prev, hotels: true }));
    setError(null);
    
    try {
      const hotelsResponse = await getHotels(searchData.destination, searchData.country);
      
      if (onSearch) {
        onSearch({
          ...searchData,
          hotels: hotelsResponse.hotels || []
        });
      }
    } catch (err) {
      console.error('Error searching hotels:', err);
      setError('Failed to search hotels. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, hotels: false }));
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
      
      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:items-end">
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
              disabled={loading.countries}
            >
              <option value="">
                {loading.countries ? 'Loading...' : 'Select Country'}
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.description.content}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination Selection */}
        <div className="lg:col-span-1">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            Destination *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              id="destination"
              name="destination"
              value={searchData.destination}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white"
              required
              disabled={loading.destinations || !searchData.country}
            >
              <option value="">
                {loading.destinations ? 'Loading...' : searchData.country ? 'Select Destination' : 'Select country first'}
              </option>
              {destinations.map((destination) => (
                <option key={destination.code} value={destination.code}>
                  {destination.name.content}
                </option>
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

        {/* Guests */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests & Rooms
          </label>
          <div className="grid grid-cols-1 gap-2">
            <div className="relative">
              <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                name="adults"
                value={searchData.adults}
                onChange={handleInputChange}
                className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Adults</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <select
                name="children"
                value={searchData.children}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-xs"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} Kids</option>
                ))}
              </select>
              <select
                name="rooms"
                value={searchData.rooms}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-xs"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1 flex-shrink-0">
          <button
            type="submit"
            disabled={loading.hotels || !searchData.country || !searchData.destination}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading.hotels ? (
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
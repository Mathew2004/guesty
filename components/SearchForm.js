'use client';

import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import cities from '../cities.json';
import { useFetch } from '../hooks/useFetch';
import HotelResults from './HotelResults';
import DatePicker from './DatePicker';

export default function SearchForm({ onSearch }) {
  const [searchData, setSearchData] = useState({
    location: {},
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'location') {
      // Find the selected city object
      const selectedCity = cities.find((city, index) => index.toString() === value);
      setSearchData(prev => ({
        ...prev,
        [name]: selectedCity || {}
      }));
    } else {
      setSearchData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchData.location || !searchData.location.city) {
      setError('Please select a location');
      return;
    }

    // if (!searchData.checkIn || !searchData.checkOut) {
    //   setError('Please select check-in and check-out dates');
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
      // Format search data for API
      const searchParams = {
        location: searchData.location,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: parseInt(searchData.guests)
      };

      // Call parent onSearch function if provided
      if (onSearch) {
        onSearch(searchParams);
      }

      console.log('Search params:', searchParams);

      // Make API call using fetch directly
      const response = await fetch(`/api/hotels?city=${encodeURIComponent(searchData.location.city)}&checkin=${searchData.checkIn}&checkout=${searchData.checkOut}&guests=${searchData.guests}&destinationCode=${searchData.location.code}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log('Search results:', res);

      // Store the results to display them
      setSearchResults(res);
    } catch (err) {
      console.error('Error searching:', err);
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Search Form positioned at bottom of image slider */}
      <div className="relative -mt-16 z-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg md:rounded-full shadow-lg border border-gray-200">
          {error && (
            <div className="mb-4 mx-4 pt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Desktop Layout - Horizontal */}
          <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-0 p-2">
            {/* Location Dropdown */}
            <div className="flex-1 relative">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <select
                  name="location"
                  value={cities.findIndex(city => city === searchData.location)}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border-0 bg-transparent focus:outline-none appearance-none text-gray-700 font-medium cursor-pointer"
                  required
                >
                  <option value="">New Orleans</option>
                  {cities.map((city, index) => (
                    <option key={index} value={index}>
                      {city.city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-300 mx-2"></div>

            {/* Check-in Date */}
            <div className="flex-1">
              <DatePicker
                value={searchData.checkIn}
                onChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                placeholder="Check in"
                minDate={today}
                className="w-full px-4 py-4 border-0 bg-transparent focus:outline-none text-gray-700 font-medium"
              />
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-300 mx-2"></div>

            {/* Check-out Date */}
            <div className="flex-1">
              <DatePicker
                value={searchData.checkOut}
                onChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                placeholder="Check out"
                minDate={searchData.checkIn || today}
                className="w-full px-4 py-4 border-0 bg-transparent focus:outline-none text-gray-700 font-medium"
              />
            </div>

            {/* Separator */}
            <div className="w-px h-10 bg-gray-300 mx-2"></div>

            {/* Guests Dropdown */}
            <div className="flex-1 relative">
              <select
                name="guests"
                value={searchData.guests}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border-0 bg-transparent focus:outline-none appearance-none text-gray-700 font-medium cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num} Guest{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-bold transition-colors duration-300 flex items-center justify-center space-x-2 ml-4"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>SEARCH</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>SEARCH</span>
                </>
              )}
            </button>
          </form>

          {/* Mobile Layout - Vertical Grid */}
          <form onSubmit={handleSubmit} className="md:hidden p-4 space-y-4">
            {/* Location Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <select
                  name="location"
                  value={cities.findIndex(city => city === searchData.location)}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-gray-700 font-medium cursor-pointer bg-white"
                  required
                >
                  <option value="">Select destination</option>
                  {cities.map((city, index) => (
                    <option key={index} value={index}>
                      {city.city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Check-in and Check-out Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <DatePicker
                  value={searchData.checkIn}
                  onChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                  placeholder="Check in"
                  minDate={today}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <DatePicker
                  value={searchData.checkOut}
                  onChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                  placeholder="Check out"
                  minDate={searchData.checkIn || today}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 font-medium"
                />
              </div>
            </div>

            {/* Guests Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
              <div className="relative">
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-gray-700 font-medium cursor-pointer bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} Guest{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>SEARCHING...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>SEARCH HOTELS</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {searchResults && (
        <div className="bg-gray-50 mt-8">
          <HotelResults
            results={searchResults}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </>
  );
}
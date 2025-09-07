'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, Calendar, Users } from 'lucide-react';
import cities from '../cities.json';
import DateRangePicker from './DateRangePicker';
import SearchableDropdown from './SearchableDropdown';

export default function SearchForm({ onSearch, setSearchResults, loading, setLoading, compact = false, initialValues = {}, isFrame = false }) {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    location: initialValues.location || {},
    checkIn: initialValues.checkIn || '',
    checkOut: initialValues.checkOut || '',
    guests: initialValues.guests || 2
  });

  const [error, setError] = useState(null);

  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);

  // Initialize form with URL parameters
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setSearchData(prevData => ({
        location: initialValues.location || prevData.location,
        checkIn: initialValues.checkIn || prevData.checkIn,
        checkOut: initialValues.checkOut || prevData.checkOut,
        guests: initialValues.guests || prevData.guests
      }));
    }
  }, [initialValues]);

  // Close guests dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestsDropdownOpen && !event.target.closest('.guests-dropdown')) {
        setGuestsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [guestsDropdownOpen]);

  // const [searchResults, setSearchResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (selectedCity) => {
    setSearchData(prev => ({
      ...prev,
      location: selectedCity
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchData.location || !searchData.location.city) {
      setError && setError('Por favor selecciona una ubicación');
      return;
    }

    if (!searchData.checkIn || !searchData.checkOut) {
      setError && setError('Por favor selecciona un rango de fechas');
      return;
    }

    // Create URL search parameters
    const searchParams = new URLSearchParams({
      city: searchData.location.city,
      country: searchData.location.country || '',
      destinationCode: searchData.location.code || '',
      checkin: searchData.checkIn,
      checkout: searchData.checkOut,
      guests: searchData.guests.toString()
    });

    // Navigate to search results page
    if (isFrame) window.open(`/search-results?${searchParams.toString()}`, '_blank');
    else router.push(`/search-results?${searchParams.toString()}`);
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Search Form */}
      <div className={`${compact ? 'relative z-[10] max-w-6xl mx-auto px-4' : 'relative mt-0 md:-mt-16 z-[150] w-full md:max-w-8xl mx-auto px-0 md:px-8 py-4'}`}>
        {error && (
          <div className="mb-4 mx-4 pt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className={`${compact ? 'bg-white rounded-lg' : 'bg-[#29415A] border rounded-full shadow-2xl'}`}>

          {/* Desktop Layout - Horizontal */}
          <form
            style={{
              margin: "0 200px"
            }}
            onSubmit={handleSubmit} className={`hidden md:flex justify-center items-center gap-2 ${compact ? 'p-2' : 'p-4'}`}>
            {/* Location Dropdown */}
            <div className="flex-1 relative group">
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder={compact ? "Destino" : "Destination"}
                transparent={false}
                compact={compact}
              />
            </div>
            {/* Date Range Picker */}
            <div className="flex-1">
              <DateRangePicker
                checkIn={searchData.checkIn}
                checkOut={searchData.checkOut}
                onCheckInChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                onCheckOutChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                transparent={false}
                compact={compact}
                placeholder={compact ? "Selecciona fechas" : "Check in      Check out"}
              />
            </div>

            {/* Guests Dropdown */}
            <div className="flex-1 relative group">
              <div className="relative">
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full appearance-none cursor-pointer bg-white text-gray-700 font-medium focus:outline-none transition-colors p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className={`rounded-full group relative bg-gradient-to-r bg-[#e5daaf] hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-3 font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span className="font-medium">SEARCH</span>
                </>
              ) : (
                <>
                  {/* <Search size={20} className="transition-transform group-hover:scale-110" /> */}
                  <span className="font-medium">SEARCH</span>
                </>
              )}
            </button>
          </form>

          {/* Mobile Layout - Vertical Grid */}
          <form
            style={{
              margin: "30px 50px",
              // marginTop: "30px",
              // paddingBottom: "20px"
            }}
            onSubmit={handleSubmit} className="md:hidden p-2 space-y-2  rounded-full">
            {/* Location Dropdown */}
            <div className="relative">
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder="Destination"
                className="w-full"
              />
            </div>

            {/* Date Range Picker */}
            <div>
              <DateRangePicker
                checkIn={searchData.checkIn}
                checkOut={searchData.checkOut}
                onCheckInChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                onCheckOutChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                transparent={false}
                placeholder="Check in        Check out"
              />
            </div>

            {/* Guests Dropdown */}
            <div className="relative">
              <select
                name="guests"
                value={searchData.guests}
                onChange={handleInputChange}
                className="w-full p-2 md:p-4 border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 appearance-none text-gray-700 font-medium cursor-pointer bg-white hover:border-gray-400 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>

            {/* Search Button */}
            <div className='flex justify-center items-center'>
              <button
                type="submit"
                disabled={loading}
                className="px-12 bg-[#e8d0b3] hover:bg-[#c9ad85] disabled:bg-gray-400 disabled:cursor-not-allowed text-black py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2"></div>
                    <span>SEARCHING...</span>
                  </>
                ) : (
                  <span>Search</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import cities from '../cities.json';
import DateRangePicker from './DateRangePicker';
import SearchableDropdown from './SearchableDropdown';

export default function SearchForm({ onSearch, setSearchResults, loading, setLoading, error, setError, compact = false, initialValues = {} }) {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    location: initialValues.location || {},
    checkIn: initialValues.checkIn || '',
    checkOut: initialValues.checkOut || '',
    guests: initialValues.guests || 2
  });

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

    if(!searchData.checkIn || !searchData.checkOut) {
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
    router.push(`/search-results?${searchParams.toString()}`);
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Search Form */}
      <div className={`${compact ? 'relative z-20 max-w-6xl mx-auto px-4' : 'relative -mt-16 z-20 max-w-6xl mx-auto px-8'}`}>
        {error && (
          <div className="mb-4 mx-4 pt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className={`${compact ? 'bg-white rounded-lg shadow-lg border border-gray-200' : 'bg-white rounded-xl shadow-lg border border-gray-200'}`}>

          {/* Desktop Layout - Horizontal */}
          <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-0 p-2">
            {/* Location Dropdown */}
            <div className="flex-1 relative">
              <h4 className="text-md font-bold text-gray-700 pl-4">Location</h4>
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder="Nueva Orleans"
                transparent={!compact}
              />
            </div>

            {/* Separator */}
            {/* <div className="w-px h-10 bg-gray-300 mx-2"></div> */}

            {/* Date Range Picker */}
            <div className="flex-2 px-4 py-2 justify-end">
              <h4 className="text-md font-bold text-gray-700 pl-4">Check In  -  Check Out</h4>
              <DateRangePicker
                checkIn={searchData.checkIn}
                checkOut={searchData.checkOut}
                onCheckInChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                onCheckOutChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                transparent={!compact}
              />
            </div>

            {/* Separator */}
            {/* <div className="w-px h-10 bg-gray-300 mx-2"></div> */}

            {/* Guests Dropdown */}
            <div className="flex-1 relative guests-dropdown">
              <h4 className="text-md font-bold text-gray-700 pl-4">Guests</h4>
              <div className="relative">
                <div
                  className={`w-full px-4 py-4 border-0 ${compact ? 'bg-white' : 'bg-transparent'} focus:outline-none text-gray-700 font-medium cursor-pointer flex items-center justify-between`}
                  onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
                >
                  <span>{searchData.guests} Huéspedes {searchData.guests !== 1 ? 's' : ''}</span>
                  <ChevronDown className={`text-gray-400 transition-transform ${guestsDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                </div>

                {guestsDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Huéspedes</span>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => searchData.guests > 1 && setSearchData(prev => ({ ...prev, guests: prev.guests - 1 }))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50"
                            disabled={searchData.guests <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{searchData.guests}</span>
                          <button
                            type="button"
                            onClick={() => searchData.guests < 10 && setSearchData(prev => ({ ...prev, guests: prev.guests + 1 }))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50"
                            disabled={searchData.guests >= 10}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 ${compact ? 'rounded-lg' : 'rounded-full'} font-bold transition-colors duration-300 flex items-center justify-center space-x-2 ml-4`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>BUSCAR</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>BUSCAR</span>
                </>
              )}
            </button>
          </form>

          {/* Mobile Layout - Vertical Grid */}
          <form onSubmit={handleSubmit} className="md:hidden p-4 space-y-4">
            {/* Location Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder="Seleccionar destino"
                className=""
              />
            </div>

            {/* Date Range Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entrada y Salida</label>
              <DateRangePicker
                checkIn={searchData.checkIn}
                checkOut={searchData.checkOut}
                onCheckInChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                onCheckOutChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                transparent={false}
              />
            </div>

            {/* Guests Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Huéspedes</label>
              <div className="relative">
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-gray-700 font-medium cursor-pointer bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} Huésped{num !== 1 ? 'es' : ''}
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
                  <span>BUSCANDO...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>BUSCAR HOTELES</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

    </>
  );
}
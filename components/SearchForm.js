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
      <div className={`${compact ? 'relative z-20 max-w-6xl mx-auto px-4' : 'relative mt-0 md:-mt-16 z-20 max-w-6xl mx-auto px-8 py-3'}`}>
        {error && (
          <div className="mb-4 mx-4 pt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className={`${compact ? 'bg-white rounded-lg' : 'bg-white/95 backdrop-blur-lg rounded-lg md:rounded-full shadow-2xl border border-white/20'}`}>

          {/* Desktop Layout - Horizontal */}
          <form onSubmit={handleSubmit} className={`hidden md:flex items-center gap-1 ${compact ? 'p-2' : 'p-3'}`}>
            {/* Location Dropdown */}
            <div className="flex-1 relative group">
              {/* {!compact && <h4 className="text-sm font-bold text-gray-700 pl-4 mb-1 group-hover:text-[#486698] transition-colors">Ubicación</h4>} */}
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder={compact ? "Destino" : "Nueva Orleans"}
                transparent={!compact}
                compact={compact}
              />
            </div>

            {/* Separator */}
            {/* {!compact && <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>} */}

            {/* Date Range Picker */}
            <div className="flex-2 px-2 justify-end group">
              {/* {!compact && <h4 className="text-sm font-bold text-gray-700 pl-4 mb-1 group-hover:text-[#486698] transition-colors">Check In - Check Out</h4>} */}
              <DateRangePicker
                checkIn={searchData.checkIn}
                checkOut={searchData.checkOut}
                onCheckInChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                onCheckOutChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                transparent={!compact}
                compact={compact}
                placeholder={compact ? "Selecciona fechas" : ""}
              />
            </div>

            {/* Separator */}
            {/* {!compact && <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>} */}

            {/* Guests Dropdown */}
            <div className="flex-1 relative group">
              <div className="relative">
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className={`w-full appearance-none cursor-pointer text-gray-700 font-medium focus:outline-none transition-colors ${compact ? 'px-3 py-3 border border-gray-300 rounded-lg bg-white hover:border-[#486698]' : 'px-4 py-4 border-0 bg-transparent rounded-lg hover:bg-[#486698]/5'}`}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'huésped' : 'huéspedes'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-colors group-hover:text-[#486698]" size={20} />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className={` rounded-full group relative bg-gradient-to-r from-[#486698] to-[#3e5788] hover:from-[#3e5788] hover:to-[#354b77] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white ${compact ? 'px-4 py-3 ml-2' : 'px-8 py-4 ml-4'} ${compact ? 'rounded-lg' : 'rounded-2xl'} font-bold transition-all duration-300 flex items-center justify-center ${compact ? 'space-x-1' : 'space-x-2'} shadow-lg hover:shadow-xl hover:shadow-[#486698]/25 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-md`}
            >
              {loading ? (
                <>
                  <div className={`animate-spin rounded-full ${compact ? 'h-4 w-4' : 'h-5 w-5'} border-2 border-white border-t-transparent`}></div>
                  {!compact && <span className="font-semibold">BUSCANDO...</span>}
                </>
              ) : (
                <>
                  <Search size={compact ? 16 : 20} className="transition-transform group-hover:scale-110" />
                  {!compact && <span className="font-semibold">BUSCAR</span>}
                </>
              )}
              {/* Button glow effect */}
              <div className={`absolute inset-0 bg-white ${compact ? 'rounded-lg' : 'rounded-2xl'} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            </button>
          </form>

          {/* Mobile Layout - Vertical Grid */}
          <form onSubmit={handleSubmit} className="md:hidden p-6  space-y-6">
            {/* Location Dropdown */}
            <div className="relative group">
              <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-[#486698] transition-colors">
                <MapPin size={16} className="inline mr-2" />
                Destino
              </label>
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder="Seleccionar destino"
                className="rounded-xl shadow-sm border-gray-200 focus:border-[#486698] focus:ring-2 focus:ring-[#486698]/20"
              />
            </div>

            {/* Date Range Picker */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-[#486698] transition-colors">
                <Calendar size={16} className="inline mr-2" />
                Entrada y Salida
              </label>
              <DateRangePicker
                checkIn={searchData.checkIn}
                checkOut={searchData.checkOut}
                onCheckInChange={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                onCheckOutChange={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                transparent={false}
              />
            </div>

            {/* Guests Dropdown */}
            <div className="relative group">
              <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-[#486698] transition-colors">
                <Users size={16} className="inline mr-2" />
                Huéspedes
              </label>
              <div className="relative">
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#486698]/20 focus:border-[#486698] appearance-none text-gray-700 font-semibold cursor-pointer bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'huésped' : 'huéspedes'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-colors group-hover:text-[#486698]" size={20} />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-[#486698] to-[#3e5788] hover:from-[#3e5788] hover:to-[#354b77] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-2.5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:shadow-[#486698]/25 transform hover:-translate-y-1 disabled:transform-none disabled:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-3 border-white border-t-transparent"></div>
                  <span className="text-md font-bold">BUSCANDO...</span>
                </>
              ) : (
                <>
                  <Search size={24} className="transition-transform group-hover:scale-110" />
                  <span className="text-md font-bold">BUSCAR</span>
                </>
              )}
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      </div>

    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, Calendar, Users } from 'lucide-react';
import cities from '../cities.json';
import DateRangePicker from './DateRangePicker';
import SearchableDropdown from './SearchableDropdown';

export default function SearchForm({ onSearch, setSearchResults, loading, setLoading, compact = false, initialValues = {} }) {
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
        <div className={`${compact ? 'bg-white rounded-lg' : 'bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20'}`}>

          {/* Desktop Layout - Horizontal */}
          <form onSubmit={handleSubmit} className={`hidden md:flex items-center gap-1 ${compact ? 'p-2' : 'p-3'}`}>
            {/* Location Dropdown */}
            <div className="flex-1 relative group">
              {!compact && <h4 className="text-sm font-bold text-gray-700 pl-4 mb-1 group-hover:text-blue-600 transition-colors">Ubicación</h4>}
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
            {!compact && <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>}

            {/* Date Range Picker */}
            <div className="flex-2 px-2 justify-end group">
              {!compact && <h4 className="text-sm font-bold text-gray-700 pl-4 mb-1 group-hover:text-blue-600 transition-colors">Check In - Check Out</h4>}
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
            {!compact && <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>}

            {/* Guests Dropdown */}
            <div className="flex-1 relative guests-dropdown group">
              {!compact && <h4 className="text-sm font-bold text-gray-700 pl-4 mb-1 group-hover:text-blue-600 transition-colors">Huéspedes</h4>}
              <div className="relative">
                <div
                  className={`w-full ${compact ? 'px-3 py-3 border border-gray-300 rounded-lg bg-white' : 'px-4 py-4 border-0 bg-transparent'} focus:outline-none text-gray-700 font-medium cursor-pointer flex items-center justify-between hover:bg-blue-50/50 transition-colors ${compact ? 'hover:border-blue-300' : 'rounded-lg'}`}
                  onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
                >
                  <span className={`${compact ? 'text-gray-500' : 'font-semibold text-sm'}`}>
                    {compact ? `${searchData.guests} huésped${searchData.guests !== 1 ? 'es' : ''}` : `${searchData.guests} Huésped${searchData.guests !== 1 ? 'es' : ''}`}
                  </span>
                  <ChevronDown className={`text-gray-400 transition-transform duration-200 ${guestsDropdownOpen ? 'rotate-180 text-blue-500' : ''}`} size={16} />
                </div>

                {guestsDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 mt-2 backdrop-blur-sm">
                    <div className="p-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => searchData.guests > 1 && setSearchData(prev => ({ ...prev, guests: prev.guests - 1 }))}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-sm hover:shadow-md"
                            disabled={searchData.guests <= 1}
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-bold text-base text-gray-800">{searchData.guests}</span>
                          <button
                            type="button"
                            onClick={() => searchData.guests < 10 && setSearchData(prev => ({ ...prev, guests: prev.guests + 1 }))}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-sm hover:shadow-md"
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
              className={`group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white ${compact ? 'px-4 py-3 ml-2' : 'px-8 py-4 ml-4'} ${compact ? 'rounded-lg' : 'rounded-2xl'} font-bold transition-all duration-300 flex items-center justify-center ${compact ? 'space-x-1' : 'space-x-2'} shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-md`}
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
          <form onSubmit={handleSubmit} className="md:hidden p-6 space-y-6">
            {/* Location Dropdown */}
            <div className="relative group">
              <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors">
                <MapPin size={16} className="inline mr-2" />
                Destino
              </label>
              <SearchableDropdown
                options={cities}
                value={searchData.location}
                onChange={handleLocationChange}
                placeholder="Seleccionar destino"
                className="rounded-xl shadow-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Date Range Picker */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors">
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
              <label className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors">
                <Users size={16} className="inline mr-2" />
                Huéspedes
              </label>
              <div className="relative">
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none text-gray-700 font-semibold cursor-pointer bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} Huésped{num !== 1 ? 'es' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-colors group-hover:text-blue-500" size={20} />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 disabled:transform-none disabled:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                  <span className="text-lg font-bold">BUSCANDO...</span>
                </>
              ) : (
                <>
                  <Search size={24} className="transition-transform group-hover:scale-110" />
                  <span className="text-lg font-bold">BUSCAR HOTELES</span>
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
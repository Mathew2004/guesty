'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import HotelResults from '@/components/HotelResults';
import MobileSearchModal from '@/components/MobileSearchModal';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  // Extract search parameters
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const destinationCode = searchParams.get('destinationCode');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const guests = searchParams.get('guests');

  // Prepare initial values for SearchForm
  const initialValues = {
    location: city && country ? {
      city: city,
      country: country,
      destinationCode: destinationCode
    } : {},
    checkIn: checkin || '',
    checkOut: checkout || '',
    guests: parseInt(guests) || 2
  };

  useEffect(() => {
    const fetchHotels = async () => {
      if (!city) {
        setError('Ciudad no especificada');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl = `/api/hotels?city=${encodeURIComponent(city)}&checkin=${checkin || ''}&checkout=${checkout || ''}&guests=${guests || '2'}&destinationCode=${destinationCode || ''}`;
        
        console.log('Fetching hotels from:', apiUrl);
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError('Error al buscar hoteles. Por favor intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city, checkin, checkout, guests, destinationCode]);

  // Handle mobile search
  const handleMobileSearch = (searchData) => {
    // Create URL search parameters
    const newSearchParams = new URLSearchParams({
      city: searchData.location.city,
      country: searchData.location.country || '',
      destinationCode: searchData.location.code || '',
      checkin: searchData.checkIn,
      checkout: searchData.checkOut,
      guests: searchData.guests.toString()
    });

    // Navigate to search results with new parameters
    router.push(`/search-results?${newSearchParams.toString()}`);
  };

  // Format search info for display
  const getSearchInfo = () => {
    const parts = [];
    if (city) parts.push(city);
    if (country && country !== city) parts.push(country);
    
    let dateInfo = '';
    if (checkin && checkout) {
      const checkInDate = new Date(checkin).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      });
      const checkOutDate = new Date(checkout).toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      });
      dateInfo = ` • ${checkInDate} - ${checkOutDate}`;
    }
    
    const guestInfo = guests ? ` • ${guests} huésped${guests !== '1' ? 'es' : ''}` : '';
    
    return parts.join(', ') + dateInfo + guestInfo;
  };

  // Format mobile search display values
  const getMobileDisplayValues = () => {
    let location = 'Destino';
    if (city) {
      // Keep it short for mobile single line
      location = city.length > 12 ? city.substring(0, 10) + '...' : city;
    }
    
    let dates = 'Fechas';
    if (checkin && checkout) {
      const checkInDate = new Date(checkin);
      const checkOutDate = new Date(checkout);
      
      // Shorter date format for mobile
      const checkInFormatted = checkInDate.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'numeric' 
      });
      const checkOutFormatted = checkOutDate.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'numeric' 
      });
      dates = `${checkInFormatted}-${checkOutFormatted}`;
    }
    
    const guestsCount = parseInt(guests) || 2;
    const guestsText = `${guestsCount} huésped${guestsCount !== 1 ? 'es' : ''}`;
    
    return { location, dates, guests: guestsText };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Desktop Sticky Header with Search Form */}
      <div className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Compact Search Form */}
          <SearchForm 
            compact={true}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            initialValues={initialValues}
          />
        </div>
      </div>

      {/* Mobile Sticky Search Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
        <div className="px-4 py-4">

          {/* Mobile Search Values */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={() => setShowMobileModal(true)}
          >
            <div className="flex items-center justify-between space-x-3">
              {/* Destination */}
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-blue-800 truncate">
                    {getMobileDisplayValues().location}
                  </p>
                </div>
              </div>
              
              {/* Dates */}
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-purple-800 whitespace-nowrap">
                    {getMobileDisplayValues().dates}
                  </p>
                </div>
              </div>
              
              {/* Guests */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-800 whitespace-nowrap">
                    {getMobileDisplayValues().guests}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <MobileSearchModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        initialData={{
          location: city ? { 
            city, 
            country, 
            code: destinationCode 
          } : {},
          checkIn: checkin || '',
          checkOut: checkout || '',
          guests: parseInt(guests) || 2
        }}
        onSearch={handleMobileSearch}
      />

      {/* Search Results Content */}
      <div className="pt-8">
        <HotelResults 
          results={results}
          loading={loading}
          error={error}
        />
      </div>

      {/* No Results State */}
      {!loading && results && (!results.hotels || results.hotels.length === 0) && (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No se encontraron hoteles
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              No pudimos encontrar hoteles que coincidan con tus criterios de búsqueda en <strong className="text-blue-600">{city}</strong>.
            </p>
            <div className="bg-blue-50/50 rounded-2xl p-6 mb-8">
              <p className="text-sm font-semibold text-gray-700 mb-4">Sugerencias para mejorar tu búsqueda:</p>
              <div className="grid md:grid-cols-2 gap-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Cambiar las fechas de tu viaje</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Reducir el número de huéspedes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Buscar en una ciudad cercana</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Probar diferentes criterios</span>
                </div>
              </div>
            </div>
            <Link 
              href="/"
              className="group relative inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
            >
              <span className="relative z-10">Nueva búsqueda</span>
              <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

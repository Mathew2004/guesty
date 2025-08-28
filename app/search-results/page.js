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
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sticky Header with Search Form */}
      <div className="hidden md:block sticky top-0 z-50 bg-white shadow-sm">
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
      <div className="md:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="px-4 py-3">

          {/* Mobile Search Values */}
          <div 
            className="bg-gray-50 rounded-lg p-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setShowMobileModal(true)}
          >
            <div className="flex items-center justify-between space-x-3">
              {/* Destination */}
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {getMobileDisplayValues().location}
                  </p>
                </div>
              </div>
              
              {/* Dates */}
              <div className="flex items-center space-x-2 min-w-0">
                <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 whitespace-nowrap">
                    {getMobileDisplayValues().dates}
                  </p>
                </div>
              </div>
              
              {/* Guests */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Users size={14} className="text-gray-400" />
                <div>
                  <p className="text-xs font-medium text-gray-900 whitespace-nowrap">
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
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No se encontraron hoteles
            </h2>
            <p className="text-gray-600 mb-6">
              No pudimos encontrar hoteles que coincidan con tus criterios de búsqueda en <strong>{city}</strong>.
            </p>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <p className="text-sm text-gray-600">Intenta:</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Cambiar las fechas de tu viaje</li>
                <li>Reducir el número de huéspedes</li>
                <li>Buscar en una ciudad cercana</li>
                <li>Probar diferentes criterios de búsqueda</li>
              </ul>
            </div>
            <Link 
              href="/"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Nueva búsqueda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

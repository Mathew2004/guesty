'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import HotelResults from '@/components/HotelResults';
import MobileSearchModal from '@/components/MobileSearchModal';
import { ArrowLeft, MapPin, Calendar, Users, Search, FilterIcon } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { allAmenities } from '@/lib/amenities';


export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSelectedAmenities, setTempSelectedAmenities] = useState([]);

  const handleApplyFilters = () => {
    setSelectedAmenities(tempSelectedAmenities);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setTempSelectedAmenities([]);
  };

  const handleFilterOpenChange = (isOpen) => {
    if (isOpen) {
      setTempSelectedAmenities(selectedAmenities);
    }
    setIsFilterOpen(isOpen);
  };

  // Extract search parameters
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const destinationCode = searchParams.get('destinationCode');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const guests = searchParams.get('guests');
  const pageFromUrl = searchParams.get('page');

  // Update current page when URL changes
  useEffect(() => {
    setCurrentPage(parseInt(pageFromUrl) || 1);
  }, [pageFromUrl]);

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

  const filteredHotels = useMemo(() => {
    if (!results || !results.hotels) return [];
    if (selectedAmenities.length === 0) {
      return results.hotels;
    }
    return results.hotels.filter(hotel =>
      selectedAmenities.every(selectedAmenity =>
        hotel.amenities?.some(hotelAmenity => {
          const hotelAmenityLower = hotelAmenity?.toLowerCase();
          const selectedAmenityLower = selectedAmenity.toLowerCase();
          return hotelAmenityLower?.includes(selectedAmenityLower) || selectedAmenityLower.includes(hotelAmenityLower);
        })
      )
    );
  }, [results, selectedAmenities]);

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
        const apiUrl = `/api/hotels?city=${encodeURIComponent(city)}&checkin=${checkin || ''}&checkout=${checkout || ''}&guests=${guests || '2'}&destinationCode=${destinationCode || ''}&page=${currentPage}&pageSize=25`;

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
  }, [city, checkin, checkout, guests, destinationCode, currentPage]);

  // Handle mobile search
  const handleMobileSearch = (searchData) => {
    // Create URL search parameters
    const newSearchParams = new URLSearchParams({
      city: searchData.location.city,
      country: searchData.location.country || '',
      destinationCode: searchData.location.code || '',
      checkin: searchData.checkIn,
      checkout: searchData.checkOut,
      guests: searchData.guests.toString(),
      page: '1' // Reset to first page on new search
    });

    // Reset current page and navigate
    setCurrentPage(1);
    router.push(`/search-results?${newSearchParams.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // Update URL with new page
    const newSearchParams = new URLSearchParams({
      city: city,
      country: country || '',
      destinationCode: destinationCode || '',
      checkin: checkin || '',
      checkout: checkout || '',
      guests: guests || '2',
      page: newPage.toString()
    });

    router.push(`/search-results?${newSearchParams.toString()}`);

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-lg  border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
          {/* Compact Search Form */}
          <div className="flex-grow">
            <SearchForm
              compact={true}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              initialValues={initialValues}
            />
          </div>
          {/* Filter Button */}
          {allAmenities.length > 0 && (
            <div className="flex-shrink-0">
              <Dialog open={isFilterOpen} onOpenChange={handleFilterOpenChange}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full mt-2">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filtrar
                    {selectedAmenities.length > 0 && ` (${selectedAmenities.length})`}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filtrar por servicios</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                    {allAmenities.map(amenity => (
                      <div key={amenity.en} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity.en}
                          checked={tempSelectedAmenities.includes(amenity.en)}
                          onCheckedChange={(checked) => {
                            setTempSelectedAmenities(prev =>
                              checked
                                ? [...prev, amenity.en]
                                : prev.filter(a => a !== amenity.en)
                            );
                          }}
                        />
                        <label
                          htmlFor={amenity.en}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity.es}
                        </label>
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={handleClearFilters}>Limpiar</Button>
                    <Button onClick={handleApplyFilters}>Aplicar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Search Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="px-4 py-2">

          {/* Mobile Search Values */}
          <div
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
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

          <div>
            {/* Filter Button */}
            {allAmenities.length > 0 && (
              <div className="flex-shrink-0">
                <Dialog open={isFilterOpen} onOpenChange={handleFilterOpenChange}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full mt-2">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      Filtrar
                      {selectedAmenities.length > 0 && ` (${selectedAmenities.length})`}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Filtrar por servicios</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                      {allAmenities.map(amenity => (
                        <div key={amenity.en} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.en}
                            checked={tempSelectedAmenities.includes(amenity.en)}
                            onCheckedChange={(checked) => {
                              setTempSelectedAmenities(prev =>
                                checked
                                  ? [...prev, amenity.en]
                                  : prev.filter(a => a !== amenity.en)
                              );
                            }}
                          />
                          <label
                            htmlFor={amenity.en}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity.es}
                          </label>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button variant="ghost" onClick={handleClearFilters}>Limpiar</Button>
                      <Button onClick={handleApplyFilters}>Aplicar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
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
      <div className="pt-8 relative">
        <HotelResults
          results={{ ...results, hotels: filteredHotels }}
          loading={loading}
          error={error}
          onPageChange={handlePageChange}
          selectedAmenities={selectedAmenities}
        />
        {filteredHotels.length === 0 && selectedAmenities.length > 0 && !loading && (
          <div className="absolute inset-0 bg-blue-100/20 flex items-center justify-center z-10 margin-4 rounded-2xl p-8 ">
            <div className="text-center text-gray-900">
              <h2 className="text-2xl font-bold">¿No encontraste lo que buscabas?</h2>
              <p className="mb-4">Intenta cambiar los filtros</p>
              <Button onClick={() => setIsFilterOpen(true)}>Cambiar filtros</Button>
            </div>
          </div>
        )}
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

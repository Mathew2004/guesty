'use client';

import { MapPin, Users, Star, Wifi, Car, Coffee, Dumbbell, Map, CreditCard, Calendar, Bed } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Pagination from './Pagination';

const HotelCard = ({ hotel }) => {
  const [showMap, setShowMap] = useState(false);
  const [showRooms, setShowRooms] = useState(false);

  const getSourceBadge = (source) => {
    if (source === 'guesty') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500 text-white shadow-lg">
          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
          Guesty
        </span>
      );
    } else if (source === 'hotelbeds') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-green-500 text-white shadow-lg">
          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
          Hotelbeds
        </span>
      );
    } else if (source === 'booking') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500 text-white shadow-lg">
          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
          Booking.com
        </span>
      );
    }
    return null;
  };

  const getAmenityIcon = (amenity) => {
    const amenityLower = typeof amenity === 'string' ? amenity.toLowerCase() : '';
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={16} />;
    if (amenityLower.includes('parking') || amenityLower.includes('garage')) return <Car size={16} />;
    if (amenityLower.includes('coffee') || amenityLower.includes('kitchen')) return <Coffee size={16} />;
    if (amenityLower.includes('pool') || amenityLower.includes('swimming')) return <MapPin size={16} />; // Using MapPin as Pool replacement
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell size={16} />;
    return null;
  };

  const renderPricing = () => {
    if (hotel.source === 'hotelbeds') {
      // Hotelbeds pricing structure
      if (hotel.minRate && hotel.currency) {
        return (
          <div className="text-left">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">desde</span>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">
                  €{hotel.minRate}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  /noche
                </span>
              </div>
            </div>
          </div>
        );
      }
    } else if (hotel.source === 'guesty') {
      // Guesty pricing structure
      if (hotel.prices && hotel.prices.basePrice) {
        return (
          <div className="text-left">
            <div className="flex flex-col">
              <span className="text-xs text-green-600 font-medium mb-1">Precio total</span>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">
                  €{hotel.prices.basePrice}
                </span>
              </div>
            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="text-left">
        <div className="flex flex-col">
          <span className="text-xs text-blue-600 font-medium mb-1">Consultar</span>
          <span className="text-sm font-bold text-gray-900">Precio</span>
        </div>
      </div>
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseInt(rating) || 5;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${i < numRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const renderRoomsSection = () => {
    if (hotel.source !== 'hotelbeds' || !hotel.rooms || hotel.rooms.length === 0) {
      return null;
    }

    return (
      <div className="bg-gray-50 rounded-xl p-4">
        <button
          onClick={() => setShowRooms(!showRooms)}
          className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-3 bg-white rounded-lg px-3 py-2 shadow-sm hover:shadow-md"
        >
          <Bed size={16} className="mr-2" />
          Ver {hotel.rooms.length} habitación{hotel.rooms.length !== 1 ? 'es' : ''} disponible{hotel.rooms.length !== 1 ? 's' : ''}
        </button>
        
        {showRooms && (
          <div className="space-y-3">
            {hotel.rooms.slice(0, 3).map((room, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h5 className="font-semibold text-gray-900 mb-2">{room.name}</h5>
                {room.rates && room.rates.length > 0 && (
                  <div className="space-y-2">
                    {room.rates.slice(0, 2).map((rate, rateIndex) => (
                      <div key={rateIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">{rate.boardName || 'Habitación'}</span>
                          {rate.paymentType && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              {rate.paymentType}
                            </span>
                          )}
                        </div>
                        <div className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                          {hotel.currency} {rate.net || rate.sellingRate}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {hotel.rooms.length > 3 && (
              <div className="text-center">
                <p className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  +{hotel.rooms.length - 3} habitaciones más disponibles
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderMapSection = () => {
    if (hotel.source !== 'hotelbeds' || !hotel.coordinates) {
      return null;
    }

    return (
      <div className="bg-gray-50 rounded-xl p-4">
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-white rounded-lg px-3 py-2 shadow-sm hover:shadow-md"
        >
          <Map size={16} className="mr-2" />
          {showMap ? 'Ocultar mapa' : 'Ver en mapa'}
        </button>
        
        {showMap && hotel.coordinates && (
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="200"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6disiTPHpuUjUO'}&q=${hotel.coordinates.latitude},${hotel.coordinates.longitude}&zoom=15`}
              allowFullScreen
              title={`Mapa de ${hotel.name}`}
              className="rounded-xl"
            />
          </div>
        )}
      </div>
    );
  };

  // Get redirect URL based on hotel source
  const getRedirectUrl = () => {
    if (hotel.source === 'guesty') {
      return `https://travidu.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`;
    } else if (hotel.source === 'booking' && hotel.hotel_link) {
      return hotel.hotel_link;
    } else if (hotel.source === 'hotelbeds') {
      return `/hotels?code=${hotel.code}&checkin=${hotel.checkin || ''}&checkout=${hotel.checkout || ''}&guests=${hotel.guests || '2'}`;
    }
    return null;
  };

  // Handle card click
  const handleCardClick = (e) => {
    // Prevent card click when clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.interactive-element')) {
      return;
    }
    
    const redirectUrl = getRedirectUrl();
    if (redirectUrl) {
      if (hotel.source === 'hotelbeds') {
        window.location.href = redirectUrl;
      } else {
        window.open(redirectUrl, '_blank');
      }
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {hotel.images && hotel.images.length > 0 ? (
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/320x192?text=No+Image';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2 mx-auto">
                <MapPin className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-gray-500 text-xs">No hay imagen</span>
            </div>
          </div>
        )}
        
        {/* Image indicators for multiple images */}
        {hotel.images && hotel.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {hotel.images.slice(0, 5).map((_, index) => (
                <div key={index} className="w-2 h-2 bg-white/60 rounded-full"></div>
              ))}
              {hotel.images.length > 5 && (
                <div className="w-2 h-2 bg-white/80 rounded-full"></div>
              )}
            </div>
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-3 right-3">
          {getSourceBadge(hotel.source)}
        </div>

        {/* Rating Badge */}
        {hotel.rating && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
            <span className="text-xs font-semibold text-gray-800">{hotel.rating}</span>
          </div>
        )}

        {/* Clickable indicator */}
        {getRedirectUrl() && (
          <div className="absolute bottom-3 right-3 bg-blue-500/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Hotel Name */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {hotel.name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="text-gray-400 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{hotel.city ? `${hotel.city},` : ''} {hotel.country ? hotel.country : ''}</span>
        </div>

        {/* Property Details */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.maxGuests && (
            <div className="flex items-center bg-blue-50 rounded-full px-2 py-1">
              <Users size={12} className="text-blue-600 mr-1" />
              <span className="text-xs font-medium text-blue-700">{hotel.maxGuests} Huéspedes</span>
            </div>
          )}
          {hotel.bedrooms > 0 && (
            <div className="flex items-center bg-purple-50 rounded-full px-2 py-1">
              <Bed size={12} className="text-purple-600 mr-1" />
              <span className="text-xs font-medium text-purple-700">{hotel.bedrooms} Habitaciones</span>
            </div>
          )}
          {hotel.bathrooms > 0 && (
            <div className="flex items-center bg-green-50 rounded-full px-2 py-1">
              <Coffee size={12} className="text-green-600 mr-1" />
              <span className="text-xs font-medium text-green-700">{hotel.bathrooms} Baños</span>
            </div>
          )}
        </div>

        {/* Spacer to push pricing to bottom */}
        <div className="flex-1"></div>

        {/* Bottom Section with Price and Button */}
        <div className="flex justify-between items-end mt-auto">
          <div className="flex-1">
            {renderPricing()}
          </div>
          
          <div className="ml-3 interactive-element">
            {hotel.source === 'guesty' ? (
              <Link 
                href={`https://travidu.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`}
                target='_blank'
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 inline-block"
              >
                <span className="relative z-10">Reservar</span>
                <div className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            ) : hotel.source === 'booking' && hotel.hotel_link ? (
              <Link 
                href={hotel.hotel_link}
                target='_blank'
                className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 inline-block"
              >
                <span className="relative z-10">Reservar</span>
                <div className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            ) : getRedirectUrl() ? (
              <div className="text-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg font-normal">
                  Ver detalles
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelResults = ({ results, loading, error, onPageChange }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">Buscando hoteles...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium">Error de búsqueda</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!results || !results.hotels || results.hotels.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-800 font-medium">No se encontraron hoteles</p>
        <p className="text-gray-600 text-sm mt-1">Intenta ajustar tus criterios de búsqueda</p>
      </div>
    );
  }

  // Separate Guesty, Booking.com, and Hotelbeds results
  const guestyHotels = results.hotels.filter(hotel => hotel.source === 'guesty');
  const bookingHotels = results.hotels.filter(hotel => hotel.source === 'booking');
  const hotelbedsHotels = results.hotels.filter(hotel => hotel.source === 'hotelbeds');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Results Summary */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-shrink-0">
            <h2 className="text-sm md:text-xl font-bold text-gray-900">
              Resultados de búsqueda
            </h2>
            <p className="text-sm md:text-lg text-gray-600 font-medium">
              {results.total} hoteles encontrados
            </p>
          </div>
          
          {results.guestyCount > 0 && (
            <div className="flex items-center bg-blue-50 rounded-full px-2 py-1 md:px-4 md:py-2 border border-blue-100">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-1 md:mr-3 shadow-sm"></div>
              <span className="text-xs md:text-sm font-semibold text-blue-700">
                Guesty: {results.guestyCount}
              </span>
            </div>
          )}
          
          {results.bookingCount > 0 && (
            <div className="flex items-center bg-purple-50 rounded-full px-2 py-1 md:px-4 md:py-2 border border-purple-100">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-1 md:mr-3 shadow-sm"></div>
              <span className="text-xs md:text-sm font-semibold text-purple-700">
                Booking.com: {results.bookingCount}
              </span>
            </div>
          )}
          
          {results.hotelbedsCount > 0 && (
            <div className="flex items-center bg-green-50 rounded-full px-2 py-1 md:px-4 md:py-2 border border-green-100">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-1 md:mr-3 shadow-sm"></div>
              <span className="text-xs md:text-sm font-semibold text-green-700">
                Hotelbeds: {results.hotelbedsCount}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Guesty Results Section */}
      {guestyHotels.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            Propiedades Guesty ({guestyHotels.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guestyHotels.map((hotel, index) => (
              <HotelCard key={`guesty-${hotel.id}-${index}`} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {/* Booking.com Results Section */}
      {bookingHotels.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            Hoteles Booking.com ({bookingHotels.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingHotels.map((hotel, index) => (
              <HotelCard key={`booking-${hotel.hotel_id}-${index}`} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {/* Hotelbeds Results Section */}
      {hotelbedsHotels.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            Hoteles Hotelbeds ({hotelbedsHotels.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelbedsHotels.map((hotel, index) => (
              <HotelCard key={`hotelbeds-${hotel.id}-${index}`} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {/* API Errors (for debugging) */}
      {(results.errors?.guesty || results.errors?.hotelbeds) && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Estado de la API:</h4>
          {results.errors.guesty && (
            <p className="text-sm text-yellow-700">Guesty API: {results.errors.guesty}</p>
          )}
          {results.errors.hotelbeds && (
            <p className="text-sm text-yellow-700">Hotelbeds API: {results.errors.hotelbeds}</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {results.pagination?.booking && onPageChange && (
        <Pagination
          currentPage={results.pagination.booking.currentPage}
          totalPages={results.pagination.booking.totalPages}
          totalItems={results.pagination.booking.totalItems}
          pageSize={results.pagination.booking.pageSize}
          onPageChange={onPageChange}
          loading={loading}
        />
      )}
    </div>
  );
};

export default HotelResults;

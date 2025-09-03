'use client';

import { MapPin, Users, Star, Wifi, Car, Coffee, Dumbbell, Map, CreditCard, Calendar, Bed } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-bold text-gray-900 mr-1">
                € {hotel.minRate}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /noche
              </span>
            </div>
            <div className="text-sm text-gray-500">
              desde
            </div>
            {hotel.maxRate && hotel.maxRate !== hotel.minRate && (
              <div className="text-xs text-gray-400 mt-1 bg-gray-50 px-2 py-1 rounded-lg inline-block">
                hasta € {hotel.maxRate}
              </div>
            )}
          </div>
        );
      }
    } else if (hotel.source === 'guesty') {
      // Guesty pricing structure
      if (hotel.prices && hotel.prices.basePrice) {
        return (
          <div className="text-left">
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-bold text-gray-900 mr-2">
                € {hotel.prices.basePrice}
              </span>
            </div>
            <div className="text-sm font-medium bg-green-50 text-green-600 px-2 py-1 rounded-lg inline-block">
              Precio total
            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="text-left">
        <div className="text-lg font-bold text-gray-900 mb-1">Consultar precio</div>
        <div className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-lg inline-block">
          Contactar para detalles
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
      window.open(redirectUrl, '_blank');
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 mb-6 hover:-translate-y-1 cursor-pointer"
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
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left Side */}
        <div className="relative md:w-80 h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
          {hotel.images && hotel.images.length > 0 ? (
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/320x224?text=No+Image';
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-gray-500 text-sm">No hay imagen disponible</span>
              </div>
            </div>
          )}
          
          {/* Source Badge */}
          <div className="absolute top-4 right-4">
            {getSourceBadge(hotel.source)}
          </div>

          {/* Rating Badge on Image */}
          {hotel.rating && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
            </div>
          )}

          {/* Clickable indicator */}
          {getRedirectUrl() && (
            <div className="absolute bottom-4 left-4 bg-blue-500/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50/30">
          <div>
            {/* Header with Title */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {hotel.name}
              </h3>
              
              {/* Stars Row */}
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-3">
                  {renderStars(hotel.rating || 5)}
                </div>
                {hotel.rating && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {hotel.rating}/5
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium">{hotel.city ? `${hotel.city},` : ''} {hotel.country ? hotel.country : ''} {hotel.address ? hotel.address : ''}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
              {hotel.description}
            </p>

            {/* Property Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {hotel.source === 'guesty' && (
                <>
                  {hotel.bedrooms > 0 && (
                    <div className="flex items-center bg-green-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Coffee size={16} className="text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-green-700">Desayuno incluido</span>
                    </div>
                  )}
                  {hotel.maxGuests && (
                    <div className="flex items-center bg-blue-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Users size={16} className="text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-700">{hotel.maxGuests} Huéspedes</span>
                    </div>
                  )}
                  {hotel.bedrooms > 0 && (
                    <div className="flex items-center bg-purple-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Bed size={16} className="text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-purple-700">{hotel.bedrooms} Habitaciones</span>
                    </div>
                  )}
                </>
              )}
              {hotel.source === 'hotelbeds' && (
                <>
                  <div className="flex items-center bg-blue-50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-blue-600">H</span>
                    </div>
                    <span className="text-sm font-medium text-blue-700">{hotel.accommodationType || 'Hotel'}</span>
                  </div>
                  <div className="flex items-center bg-green-50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Star size={16} className="text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-green-700">Categoría: {hotel.category}</span>
                  </div>
                  {hotel.chainName && (
                    <div className="flex items-center bg-gray-50 rounded-lg p-3 md:col-span-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-gray-600">C</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{hotel.chainName}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Comodidades</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center bg-white border border-gray-200 hover:border-blue-300 text-gray-700 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200">
                      {getAmenityIcon(amenity)}
                      <span className="ml-2">{typeof amenity === 'string' ? amenity : amenity?.facilityName || 'Amenidad'}</span>
                    </div>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <div className="flex items-center justify-center bg-gray-100 text-gray-500 px-3 py-2 rounded-full text-xs font-medium min-w-[60px]">
                      +{hotel.amenities.length - 4} más
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hotelbeds-specific features */}
            {hotel.source === 'hotelbeds' && (
              <div className="space-y-4">
                <div className="interactive-element">
                  {renderMapSection()}
                </div>
                <div className="interactive-element">
                  {renderRoomsSection()}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Section with Price and Button */}
          <div className="flex justify-between items-end mt-6 pt-6 border-t border-gray-100">
            <div className="flex-1">
              {renderPricing()}
            </div>
            
            <div className="ml-6 interactive-element">
              {hotel.source === 'guesty' ? (
                <Link 
                  href={`https://travidu.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`}
                  target='_blank'
                  className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-8 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5">
                  <span className="relative z-10">Reservar ahora</span>
                  <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              ) : hotel.source === 'booking' && hotel.hotel_link ? (
                <Link 
                  href={hotel.hotel_link}
                  target='_blank'
                  className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-8 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-0.5">
                  <span className="relative z-10">Ver en Booking.com</span>
                  <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              ) : getRedirectUrl() ? (
                <div className="text-center">
                  <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                    Haz clic en la tarjeta para ver más detalles
                  </span>
                </div>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelResults = ({ results, loading, error }) => {
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Resultados de búsqueda ({results.total} hoteles encontrados)
        </h2>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Propiedades Guesty: {results.guestyCount}
          </span>
          <span className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            Hoteles Booking.com: {results.bookingCount}
          </span>
          <span className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Hoteles Hotelbeds: {results.hotelbedsCount}
          </span>
        </div>
      </div>

      {/* Guesty Results Section */}
      {guestyHotels.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            Propiedades Guesty ({guestyHotels.length})
          </h3>
          <div className="space-y-4">
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
          <div className="space-y-4">
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
          <div className="space-y-4">
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
    </div>
  );
};

export default HotelResults;

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
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Guesty
        </span>
      );
    } else if (source === 'hotelbeds') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Hotelbeds
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
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {hotel.currency} {hotel.minRate}
            </div>
            <div className="text-sm text-gray-500">
              desde / noche
            </div>
            {hotel.maxRate && hotel.maxRate !== hotel.minRate && (
              <div className="text-xs text-gray-400">
                hasta {hotel.currency} {hotel.maxRate}
              </div>
            )}
          </div>
        );
      }
    } else if (hotel.source === 'guesty') {
      // Guesty pricing structure
      if (hotel.prices && hotel.prices.basePrice) {
        return (
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              € {hotel.prices.basePrice}
            </div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        );
      }
    }
    
    return (
      <div className="text-right">
        <div className="text-md font-bold text-gray-900">Consultar precio</div>
        <div className="text-sm text-gray-500">Contactar para detalles</div>
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
      <div className="mt-4 border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowRooms(!showRooms)}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-2"
        >
          <Bed size={16} className="mr-1" />
          Ver {hotel.rooms.length} habitación{hotel.rooms.length !== 1 ? 'es' : ''} disponible{hotel.rooms.length !== 1 ? 's' : ''}
        </button>
        
        {showRooms && (
          <div className="space-y-3 mt-3">
            {hotel.rooms.slice(0, 3).map((room, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm">
                <h5 className="font-medium text-gray-900 mb-1">{room.name}</h5>
                {room.rates && room.rates.length > 0 && (
                  <div className="space-y-1">
                    {room.rates.slice(0, 2).map((rate, rateIndex) => (
                      <div key={rateIndex} className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-600">{rate.boardName || 'Habitación'}</span>
                          {rate.paymentType && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {rate.paymentType}
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-green-600">
                          {hotel.currency} {rate.net || rate.sellingRate}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {hotel.rooms.length > 3 && (
              <p className="text-xs text-gray-500">
                +{hotel.rooms.length - 3} habitaciones más disponibles
              </p>
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
      <div className="mt-3">
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Map size={16} className="mr-1" />
          {showMap ? 'Ocultar mapa' : 'Ver en mapa'}
        </button>
        
        {showMap && hotel.coordinates && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="200"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6disiTPHpuUjUO'}&q=${hotel.coordinates.latitude},${hotel.coordinates.longitude}&zoom=15`}
              allowFullScreen
              title={`Mapa de ${hotel.name}`}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left Side */}
        <div className="relative md:w-80 h-full md:h-full bg-gray-200 flex-shrink-0">
          {hotel.images && hotel.images.length > 0 ? (
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/320x224?text=No+Image';
              }}
            />
          ) : (
            <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
              <span>No hay imagen disponible</span>
            </div>
          )}
          
          {/* Source Badge */}
          <div className="absolute top-3 right-3">
            {getSourceBadge(hotel.source)}
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Header with Title and Stars */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1 mr-4">
                {hotel.name}
              </h3>
              <div className="flex items-center">
                {renderStars(hotel.rating || 5)}
                {hotel.rating && (
                  <span className="ml-2 text-sm text-gray-600">({hotel.rating})</span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{hotel.city}, {hotel.country}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {hotel.description}
            </p>

            {/* Property Details Row */}
            <div className="flex items-center space-x-6 text-sm text-gray-700 mb-4">
              {hotel.source === 'guesty' && (
                <>
                  {hotel.bedrooms > 0 && (
                    <div className="flex items-center">
                      <span className="font-medium">• Desayuno incluido</span>
                    </div>
                  )}
                  {hotel.maxGuests && (
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      <span>• {hotel.maxGuests} Huéspedes</span>
                    </div>
                  )}
                  {hotel.bedrooms > 0 && <span>• {hotel.bedrooms} Habitaciones</span>}
                  {hotel.bathrooms > 0 && <span>• {hotel.bathrooms} Baños</span>}
                </>
              )}
              {hotel.source === 'hotelbeds' && (
                <>
                  <div className="flex items-center">
                    <span className="font-medium">• {hotel.accommodationType || 'Hotel'}</span>
                  </div>
                  <div className="flex items-center">
                    <span>• Categoría: {hotel.category}</span>
                  </div>
                  {hotel.chainName && (
                    <div className="flex items-center">
                      <span>• {hotel.chainName}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {hotel.amenities.slice(0, 4).map((amenity, index) => (
                  <div key={index} className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{typeof amenity === 'string' ? amenity : amenity?.facilityName || 'Amenidad'}</span>
                  </div>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="text-xs text-gray-500 px-3 py-1">
                    +{hotel.amenities.length - 4} más
                  </span>
                )}
              </div>
            )}

            {/* Hotelbeds-specific features */}
            {hotel.source === 'hotelbeds' && (
              <>
                {renderMapSection()}
                {renderRoomsSection()}
              </>
            )}
          </div>

          {/* Bottom Section with Price and Button */}
          <div className="flex justify-between items-end">
            {renderPricing()}
            
            <div className="ml-4">
              {hotel.source === 'guesty' ? (
                <Link 
                  href={`https://travidu.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`}
                  target='_blank'
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium">
                  Reservar ahora
                </Link>
              ) : (
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium"
                  onClick={() => alert('Contactar agencia para reservar este hotel de Hotelbeds')}
                >
                  Ver disponibilidad
                </button>
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

  // Separate Guesty and Hotelbeds results
  const guestyHotels = results.hotels.filter(hotel => hotel.source === 'guesty');
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

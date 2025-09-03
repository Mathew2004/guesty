'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Users, Bed } from 'lucide-react';
import Link from 'next/link';
import { hotelsList } from './feature_hotels';

const amenityIcons = {
  'WiFi Gratis': Wifi,
  'Wireless Internet': Wifi,
  'Estacionamiento': Car,
  'Restaurante': Coffee,
  'Gimnasio': Dumbbell,
  'Acceso a Playa': MapPin,
  'Acceso a Esquí': MapPin,
  'Spa': Coffee,
  'Washer': Coffee,
  'Smoking allowed': Coffee,
  'Suitable for infants (under 2 years)': Users
};

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

export default function FeaturedHotels() {
  const [featuredHotels, setFeaturedHotels] = useState([]);

  const renderPricing = (hotel) => {
    if (hotel.source === 'hotelbeds' && hotel.minRate) {
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
    } else if (hotel.source === 'guesty' && hotel.prices?.basePrice) {
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
    
    return (
      <div className="text-left">
        <div className="flex flex-col">
          <span className="text-xs text-blue-600 font-medium mb-1">Consultar</span>
          <span className="text-sm font-bold text-gray-900">Precio</span>
        </div>
      </div>
    );
  };


  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Hoteles Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección cuidadosa de alojamientos en Conil de la Frontera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsList
          .slice(0, 6)
          .map((hotel) => (
            <div 
              key={hotel.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
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
                  <span className="text-sm truncate">{hotel.city}, {hotel.country}</span>
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
                    {renderPricing(hotel)}
                  </div>
                  
                  <div className="ml-3">
                    {hotel.source === 'guesty' ? (
                      <Link 
                        href={`https://travidu.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`}
                        target='_blank'
                        className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 inline-block"
                      >
                        <span className="relative z-10">Ver Detalles</span>
                        <div className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </Link>
                    ) : (
                      <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                        Ver Detalles
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
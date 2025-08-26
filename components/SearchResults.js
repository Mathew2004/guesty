'use client';

import Link from 'next/link';
import { MapPin, Users, Bed, Bath } from 'lucide-react';

export default function SearchResults({ hotels, searchData }) {
  if (!hotels || hotels.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Properties Found</h2>
          <p className="text-gray-600">Try adjusting your search criteria to find available properties.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Search Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Found {hotels.length} properties{searchData?.city && ` in ${searchData.city}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Link 
              key={hotel.code} 
              href={`/listing/${hotel.code}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group block"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                {hotel.images && hotel.images.length > 0 ? (
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name?.content}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-2" />
                      <p className="text-sm font-medium">Property Image</p>
                    </div>
                  </div>
                )}
                {hotel.accommodationTypeCode && (
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">{hotel.accommodationTypeCode}</span>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm">
                    {hotel.city?.content || hotel.address?.city}, {hotel.countryCode || hotel.address?.country}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {hotel.name?.content || hotel.title || 'Property Name Not Available'}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {hotel.description?.content || 'Beautiful property with modern amenities and great location.'}
                </p>

                {/* Property Stats */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{hotel.rooms?.[0]?.maxPax || hotel.accommodates || 2} guests</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bed size={16} />
                    <span>{hotel.bedrooms || 1} bed{hotel.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath size={16} />
                    <span>{hotel.bathrooms || 1} bath{hotel.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* House Rules */}
                {hotel.houseRules && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 text-xs">
                      {hotel.houseRules.petsAllowed && (
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full">🐕 Pets OK</span>
                      )}
                      {hotel.houseRules.suitableForChildren && (
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full">👶 Kids OK</span>
                      )}
                      {hotel.houseRules.smokingAllowed && (
                        <span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full">🚬 Smoking OK</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Property Info */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {hotel.propertyType || hotel.accommodationTypeCode} • {hotel.listingType || hotel.categoryCode}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    View details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

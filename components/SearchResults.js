'use client';

import { Star, MapPin, Phone, Mail } from 'lucide-react';

export default function SearchResults({ hotels, searchData }) {
  if (!hotels || hotels.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Hotels Found</h2>
          <p className="text-gray-600">Try adjusting your search criteria to find available hotels.</p>
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
            Found {hotels.length} hotels{searchData?.destination && ` in ${searchData.destination}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.code} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              {/* Hotel Image - Using a placeholder for now since API doesn't include images */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p className="text-sm font-medium">Hotel Image</p>
                  </div>
                </div>
                {hotel.categoryCode && (
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">{hotel.categoryCode}</span>
                  </div>
                )}
              </div>

              {/* Hotel Details */}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm">
                    {hotel.city?.content}, {hotel.countryCode}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {hotel.name?.content || 'Hotel Name Not Available'}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {hotel.description?.content || 'Description not available'}
                </p>

                {/* Address */}
                {hotel.address?.content && (
                  <p className="text-xs text-gray-500 mb-3">
                    📍 {hotel.address.content}
                  </p>
                )}

                {/* Contact Info */}
                <div className="flex flex-col space-y-2 mb-4">
                  {hotel.email && (
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Mail size={12} />
                      <span className="truncate">{hotel.email}</span>
                    </div>
                  )}
                  {hotel.phones && hotel.phones.length > 0 && (
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Phone size={12} />
                      <span>{hotel.phones[0].phoneNumber}</span>
                    </div>
                  )}
                </div>

                {/* Room Types */}
                {hotel.rooms && hotel.rooms.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Room Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {hotel.rooms.slice(0, 3).map((room, index) => (
                        <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                          {room.roomType} ({room.maxPax} pax)
                        </span>
                      ))}
                      {hotel.rooms.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{hotel.rooms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Board Codes */}
                {hotel.boardCodes && hotel.boardCodes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Board Options:</p>
                    <div className="flex flex-wrap gap-1">
                      {hotel.boardCodes.slice(0, 4).map((board, index) => (
                        <span key={index} className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Hotel Code: {hotel.code}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Star, MapPin, Wifi, Car, Utensils, Dumbbell } from 'lucide-react';

const featuredHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    rating: 4.8,
    price: 299,
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'Gym'],
    description: 'Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.'
  },
  {
    id: 2,
    name: 'Ocean View Resort',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    rating: 4.9,
    price: 450,
    amenities: ['Free WiFi', 'Beach Access', 'Restaurant', 'Spa'],
    description: 'Beachfront resort with pristine white sand beaches and crystal clear waters.'
  },
  {
    id: 3,
    name: 'Mountain Lodge',
    location: 'Aspen, CO',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    rating: 4.7,
    price: 380,
    amenities: ['Free WiFi', 'Ski Access', 'Restaurant', 'Spa'],
    description: 'Cozy mountain retreat perfect for skiing and alpine adventures.'
  }
];

const amenityIcons = {
  'Free WiFi': Wifi,
  'Parking': Car,
  'Restaurant': Utensils,
  'Gym': Dumbbell,
  'Beach Access': MapPin,
  'Ski Access': MapPin,
  'Spa': Utensils
};

export default function FeaturedHotels() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Hotels
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury accommodations worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              {/* Hotel Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Wifi;
                    return (
                      <div key={amenity} className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                        <IconComponent size={12} />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    ${hotel.price}
                    <span className="text-sm text-gray-500 font-normal">/night</span>
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
'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { hotelsList } from './feature_hotels';

// Get featured properties from the hotels list (first 6 properties with priority 1)
const featuredProperties = hotelsList
  .filter(hotel => hotel.priority === 1 && hotel.images && hotel.images.length > 0)
  .slice(0, 6)
  .map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    location: `${hotel.city}, ${hotel.country}`,
    price: `${hotel.prices.basePrice} ${hotel.prices.currency}`,
    images: [hotel.images[0]], // Use the first image
    accommodationType: hotel.accommodationType,
    bedrooms: hotel.bedrooms,
    maxGuests: hotel.maxGuests,
  }));

export default function FeaturedHotels() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-5xl md:max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className={`flex justify-center md:justify-between my-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-xl text-center md:text-left lg:text-3xl font-bold text-[#486698] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Propiedades Destacadas
          </h2>
          <Link href="/properties" className="hidden md:block bg-[#d0effa] hover:bg-blue-300 text-sky-600 px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
            Reserva tu Estancia
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, index) => (
            <div 
              key={property.id}
              className={`group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-700 h-80 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                backgroundImage: `url(${property.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Full Image Background with Hover Effect */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500"></div>
              
              {/* Bottom Content Section with Dark Background */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3">
                <h3 className="text-white font-bold text-md md:text-lg mb-1 leading-tight line-clamp-1">
                  {property.name}
                </h3>
                
                <div className="flex items-center text-white/90 mb-2">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-white">
                    <span className="text-sm text-white/80">Starting from </span>
                    <span className="text-sm md:text-md font-bold">{property.price}</span>
                  </div>
                  
                  <Link
                    href={`/property/${property.id}`}
                    className="text-white hover:text-white/80 text-sm font-medium transition-all flex items-center"
                  >
                    View more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className={`group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                    {property.name}
                  </h3>
                  
                  <div className="flex items-center text-sm text-white/90 mb-3">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-white">
                      <span className="text-sm text-white/90">Desde </span>
                      <span className="text-lg font-semibold">{property.price}</span>
                    </div>
                    
                    <Link
                      href={`/property/${property.id}`}
                      className="flex items-center text-white hover:text-white/80 text-sm font-medium transition-colors bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"
                    >
                      Ver más
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
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
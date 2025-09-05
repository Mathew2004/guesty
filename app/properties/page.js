'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Users, Bed, Bath, Wifi, Car, Pool, Coffee, BathIcon, BedDouble, User } from 'lucide-react';

export default function PropertiesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const headerRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Todas las Propiedades' },
    { id: 'beach', name: 'Casa de Playa' },
    { id: 'mountain', name: 'Casa de Montaña' },
    { id: 'city', name: 'Ciudad' },
    { id: 'wine', name: 'País del Vino' }
  ];

  const properties = [
    {
      id: 1,
      title: "Casa de Playa Moderna en Cambria",
      category: "beach",
      location: "Cambria, California",
      price: "$350",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      amenities: ['wifi', 'parking', 'pool', 'coffee'],
      description: "Hermosa casa de playa con vistas al océano, perfecta para familias grandes."
    },
    {
      id: 2,
      title: "Refugio en las Montañas de Big Sur",
      category: "mountain",
      location: "Big Sur, California",
      price: "$275",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      amenities: ['wifi', 'parking', 'coffee'],
      description: "Cabaña acogedora rodeada de naturaleza, ideal para una escapada romántica."
    },
    {
      id: 3,
      title: "Casa Familiar en Hanford",
      category: "city",
      location: "Hanford, California",
      price: "$180",
      guests: 10,
      bedrooms: 5,
      bathrooms: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      amenities: ['wifi', 'parking', 'coffee'],
      description: "Espaciosa casa familiar en un barrio tranquilo, perfecta para reuniones familiares."
    },
    {
      id: 4,
      title: "Villa en el País del Vino de Paso Robles",
      category: "wine",
      location: "Paso Robles, California",
      price: "$425",
      guests: 12,
      bedrooms: 6,
      bathrooms: 4,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      amenities: ['wifi', 'parking', 'pool', 'coffee'],
      description: "Lujosa villa en el corazón del país del vino, ideal para grupos grandes."
    },
    {
      id: 5,
      title: "Casa Costera en Pismo Beach",
      category: "beach",
      location: "Pismo Beach, California",
      price: "$300",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      amenities: ['wifi', 'parking', 'pool'],
      description: "Casa moderna a pasos de la playa con todas las comodidades."
    },
    {
      id: 6,
      title: "Retiro en Carmel Valley",
      category: "mountain",
      location: "Carmel Valley, California",
      price: "$380",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      amenities: ['wifi', 'parking', 'pool', 'coffee'],
      description: "Elegante retiro con vistas panorámicas del valle y viñedos."
    }
  ];

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(property => property.category === selectedCategory);

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

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi size={16} />;
      case 'parking': return <Car size={16} />;
      case 'pool': return <Pool size={16} />;
      case 'coffee': return <Coffee size={16} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#486698] to-[#5a7ba8]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={headerRef} className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Nuestras Propiedades
            </h1>
            <p className="text-xl lg:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Descubre alojamientos únicos en los destinos más hermosos de California
            </p>
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{properties.length}+</div>
                <div className="text-sm opacity-80">Propiedades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm opacity-80">Ubicaciones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-80">Verificadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#486698] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {/* Property Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="font-bold text-[#486698]">{property.price}</span>
                    <span className="text-gray-600 text-sm">/noche</span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#486698] transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Property Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>{property.guests} huéspedes</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble size={16} className="mr-1" />
                      <span>{property.bedrooms} habitaciones</span>
                    </div>
                    <div className="flex items-center">
                      <BathIcon size={16} className="mr-1" />
                      <span>{property.bathrooms} baños</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center space-x-3 mb-4">
                    {/* {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="text-gray-500">
                        {getAmenityIcon(amenity)}
                      </div>
                    ))} */}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-[#486698] hover:bg-[#3a5280] text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#E8F9FF]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contáctanos y te ayudaremos a encontrar la propiedad perfecta para tu estancia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#486698] hover:bg-[#3a5280] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Contactar Ahora
            </button>
            <button className="border-2 border-[#486698] text-[#486698] hover:bg-[#486698] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
              Ver Disponibilidad
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SearchForm from './SearchForm';

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    title: 'Resort de Playa de Lujo',
    subtitle: 'Vive el paraíso en los destinos costeros más exclusivos'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    title: 'Refugio de Montaña',
    subtitle: 'Escápate a serenos alojamientos de montaña con vistas impresionantes'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    title: 'Hoteles Urbanos',
    subtitle: 'Alojamientos premium en el corazón de ciudades vibrantes'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    title: 'Propiedades Históricas',
    subtitle: 'Hospédate en edificios patrimoniales cuidadosamente restaurados con amenidades modernas'
  },
];

export default function ImageSlider({ setSearchResults, loading, setLoading, error, setError }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-[70vh] lg:min-h-[80vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
          </div>
        </div>
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-49">
        <SearchForm setSearchResults={setSearchResults} loading={loading} setLoading={setLoading} error={error} setError={setError} />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import ImageSlider from '@/components/ImageSlider';
import SearchForm from '@/components/SearchForm';
import FeaturedHotels from '@/components/FeaturedHotels';
import SearchResults from '@/components/SearchResults';
import HotelResults from '@/components/HotelResults';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchData, setSearchData] = useState(null);

  // const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (results) => {
    console.log('Search results:', results);
    setSearchResults(results.listings || []); // Changed from hotels to listings
    setSearchData(results);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <div className="relative mb-8">
        <ImageSlider setSearchResults={setSearchResults} loading={loading} setLoading={setLoading} error={error} setError={setError} />
      </div>

      {/* Search Form */}
      {/* <SearchForm onSearch={handleSearch} /> */}

      {/* Results Section */}
      {searchResults && (
        <div className="bg-gray-50 mt-8" id="results">
          <HotelResults
            results={searchResults}
            loading={loading}
            error={error}
          />
        </div>
      )}

      {/* Featured Hotels Section - Only show if no search results */}
      {/* {!searchResults && <FeaturedHotels />} */}

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué elegir Guestyz?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Garantía del Mejor Precio</h3>
                    <p className="text-gray-600">Igualamos cualquier precio más bajo que encuentres para el mismo hotel y fechas.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Atención al Cliente 24/7</h3>
                    <p className="text-gray-600">Nuestro equipo dedicado está disponible las 24 horas para asistirte.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Confirmación Instantánea</h3>
                    <p className="text-gray-600">Obtén confirmación inmediata de tu reserva y tranquilidad total.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
                alt="Vestíbulo de hotel de lujo"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
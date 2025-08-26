'use client';

import { useState } from 'react';
import ImageSlider from '@/components/ImageSlider';
import SearchForm from '@/components/SearchForm';
import FeaturedHotels from '@/components/FeaturedHotels';
import SearchResults from '@/components/SearchResults';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (results) => {
    console.log('Search results:', results);
    setSearchResults(results.listings || []); // Changed from hotels to listings
    setSearchData(results);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <ImageSlider />
      
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />
      
      {/* Search Results */}
      {searchResults && (
        <SearchResults hotels={searchResults} searchData={searchData} />
      )}

      {/* Featured Hotels Section - Only show if no search results */}
      {!searchResults && <FeaturedHotels />}

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Guestyz?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Best Price Guarantee</h3>
                    <p className="text-gray-600">We match any lower price you find for the same hotel and dates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">24/7 Customer Support</h3>
                    <p className="text-gray-600">Our dedicated team is available around the clock to assist you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Instant Confirmation</h3>
                    <p className="text-gray-600">Get immediate booking confirmation and peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
                alt="Luxury hotel lobby"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
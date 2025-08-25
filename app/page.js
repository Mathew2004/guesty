'use client';

import { useState } from 'react';
import ImageSlider from '@/components/ImageSlider';
import SearchForm from '@/components/SearchForm';
import FeaturedHotels from '@/components/FeaturedHotels';
import { searchHotels } from '@/lib/hotelbedsApi';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchData) => {
    setIsLoading(true);
    try {
      console.log('Searching for hotels with data:', searchData);
      // For now, we'll just log the search data
      // In a real implementation, you would call the API here
      // const results = await searchHotels(searchData);
      // setSearchResults(results);
      
      // Mock results for demonstration
      setTimeout(() => {
        setSearchResults({
          hotels: [],
          message: `Searching for hotels in ${searchData.destination} from ${searchData.checkIn} to ${searchData.checkOut} for ${searchData.adults} adults, ${searchData.children} children, ${searchData.rooms} room(s)`
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Search failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <ImageSlider />
      
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />
      
      {/* Search Results or Loading */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Searching for the best hotels...</p>
        </div>
      )}
      
      {searchResults && !isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">{searchResults.message}</p>
          </div>
        </div>
      )}

      {/* Featured Hotels Section */}
      <FeaturedHotels />

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose LuxuryStay?
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
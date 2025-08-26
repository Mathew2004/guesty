'use client';

import { useState, useEffect } from 'react';
import { searchHotels } from '../../lib/hotelbedsApi';
import SearchResults from '../../components/SearchResults';
import { Search, Filter, MapPin, Home, Bed, Bath, Users, X, ChevronDown } from 'lucide-react';

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    city: '',
    country: '',
    state: '',
    propertyType: '',
    minBedrooms: '',
    maxBedrooms: '',
    minBathrooms: '',
    maxBathrooms: '',
    minOccupancy: '',
    listingType: '',
    searchText: ''
  });

  // Property types from Guesty API
const propertyTypes = [
    'APARTMENT',
    'HOUSE',
    'CONDO',
    'VILLA',
    'STUDIO',
    'LOFT',
    'TOWNHOUSE',
    'CABIN',
    'COTTAGE',
];

  const listingTypes = [
    'ENTIRE_PLACE',
    'PRIVATE_ROOM',
    'SHARED_ROOM'
  ];

  // Load all hotels on component mount
  useEffect(() => {
    loadHotels();
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/hotel-stats');
      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const loadHotels = async (searchFilters = {}) => {
    setLoading(true);
    setError('');
    
    try {
      const searchParams = {
        limit: '50',
        ...searchFilters
      };

      console.log('Searching hotels with params:', searchParams);
      const response = await searchHotels(searchParams);
      
      if (response && response.hotels) {
        setHotels(response.hotels);
        console.log(`Loaded ${response.hotels.length} hotels`);
      } else {
        setHotels([]);
        setError('No hotels found');
      }
    } catch (err) {
      console.error('Error loading hotels:', err);
      setError(`Failed to load hotels: ${err.message}`);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const activeFilters = {};
    
    // Only include non-empty filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        if (key === 'minBedrooms') {
          activeFilters.numberOfBedrooms = value;
        } else if (key === 'minBathrooms') {
          activeFilters.numberOfBathrooms = value;
        } else {
          activeFilters[key] = value;
        }
      }
    });

    console.log('Applying filters:', activeFilters);
    loadHotels(activeFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      country: '',
      state: '',
      propertyType: '',
      minBedrooms: '',
      maxBedrooms: '',
      minBathrooms: '',
      maxBathrooms: '',
      minOccupancy: '',
      listingType: '',
      searchText: ''
    });
    loadHotels();
  };

  const activeFilterCount = Object.values(filters).filter(value => value && value.trim() !== '').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Home className="mr-3 text-blue-600" />
                All Properties
              </h1>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
                <span>{hotels.length} properties available</span>
                {stats && (
                  <>
                    <span>•</span>
                    <span>{stats.topCountries.length} countries</span>
                    <span>•</span>
                    <span>{stats.topCities.length} cities</span>
                    <span>•</span>
                    <span>Avg {stats.averageBedrooms} bed, {stats.averageBathrooms} bath</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={filters.searchText}
                  onChange={(e) => handleFilterChange('searchText', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors relative"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {/* Location Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  placeholder="e.g., United States"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Region
                </label>
                <input
                  type="text"
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  placeholder="e.g., California"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="e.g., San Francisco"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Listing Type
                </label>
                <select
                  value={filters.listingType}
                  onChange={(e) => handleFilterChange('listingType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="ENTIRE_PLACE">Entire Place</option>
                  <option value="PRIVATE_ROOM">Private Room</option>
                  <option value="SHARED_ROOM">Shared Room</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Bed className="inline w-4 h-4 mr-1" />
                  Min Bedrooms
                </label>
                <select
                  value={filters.minBedrooms}
                  onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}+ Bedroom{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Bath className="inline w-4 h-4 mr-1" />
                  Min Bathrooms
                </label>
                <select
                  value={filters.minBathrooms}
                  onChange={(e) => handleFilterChange('minBathrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}+ Bathroom{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Max Occupancy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="inline w-4 h-4 mr-1" />
                  Min Guests
                </label>
                <select
                  value={filters.minOccupancy}
                  onChange={(e) => handleFilterChange('minOccupancy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                    <option key={num} value={num}>{num}+ Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <SearchResults hotels={hotels} searchData={{}} />
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import HotelResults from '@/components/HotelResults';
import MobileSearchModal from '@/components/MobileSearchModal';
import Pagination from '@/components/Pagination';
import { MapPin, Calendar, Users, Search, FilterIcon, Map, Satellite, StarIcon, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { allAmenities } from '@/lib/amenities';
import { FaStar } from "react-icons/fa";
import { HotelsMap } from '@/components/Map';


export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSelectedAmenities, setTempSelectedAmenities] = useState([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [tempBedrooms, setTempBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [tempBathrooms, setTempBathrooms] = useState(0);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [tempSortByPrice, setTempSortByPrice] = useState(false);

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Mobile filter expansion state
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);

  // Additional filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [tempSelectedPropertyTypes, setTempSelectedPropertyTypes] = useState([]);

  const popularAmenities = allAmenities.filter(a => a.type === 'popular');
  const otherAmenities = allAmenities.filter(a => a.type === 'other');

  const handleApplyFilters = () => {
    setSelectedAmenities(tempSelectedAmenities);
    setBedrooms(tempBedrooms);
    setBathrooms(tempBathrooms);
    setSortByPrice(tempSortByPrice);
    setPriceRange(tempPriceRange);
    setSelectedCategories(tempSelectedCategories);
    setSelectedPropertyTypes(tempSelectedPropertyTypes);
    setIsFilterOpen(false);
    setIsFilterApplied(true);
  };

  const handleClearFilters = () => {
    setTempSelectedAmenities([]);
    setTempBedrooms(0);
    setTempBathrooms(0);
    setTempSortByPrice(false);
    setTempPriceRange({ min: 0, max: 1000 });
    setTempSelectedCategories([]);
    setTempSelectedPropertyTypes([]);
    setIsFilterApplied(false);
  };

  // Individual clear functions for quick filters
  const clearPriceFilter = () => setPriceRange({ min: 0, max: 1000 });
  const clearCategoriesFilter = () => setSelectedCategories([]);
  const clearPropertyTypesFilter = () => setSelectedPropertyTypes([]);
  const clearAmenitiesFilter = () => setSelectedAmenities([]);
  const clearBedroomsFilter = () => setBedrooms(0);
  const clearBathroomsFilter = () => setBathrooms(0);


  const clearAllFilters = () => {
    clearPriceFilter();
    clearCategoriesFilter();
    clearPropertyTypesFilter();
    clearAmenitiesFilter();
    clearBedroomsFilter();
    clearBathroomsFilter();
    setSortByPrice(false);
  };

  const handleFilterOpenChange = (isOpen) => {
    if (isOpen) {
      setTempSelectedAmenities(selectedAmenities);
      setTempBedrooms(bedrooms);
      setTempBathrooms(bathrooms);
      setTempSortByPrice(sortByPrice);
      setTempPriceRange(priceRange);
      setTempSelectedCategories(selectedCategories);
      setTempSelectedPropertyTypes(selectedPropertyTypes);
    }
    setIsFilterOpen(isOpen);
  };

  // Extract search parameters
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const destinationCode = searchParams.get('destinationCode');
  const destId = searchParams.get('dest_id');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const guests = searchParams.get('guests');
  const pageFromUrl = searchParams.get('page');

  // Update current page when URL changes
  useEffect(() => {
    setCurrentPage(parseInt(pageFromUrl) || 1);
  }, [pageFromUrl]);

  // Prepare initial values for SearchForm
  const initialValues = {
    location: city && country ? {
      city: city,
      country: country,
      destinationCode: destinationCode,
      dest_id: destId
    } : {},
    checkIn: checkin || '',
    checkOut: checkout || '',
    guests: parseInt(guests) || 2
  };

  const filteredHotels = useMemo(() => {
    if (!results || !results.hotels) return [];

    let hotels = results.hotels;

    // Price filtering
    if (priceRange.min > 0 || priceRange.max < 1000) {
      hotels = hotels.filter(hotel => {
        const price = hotel.price || hotel.minRate || hotel.prices?.basePrice || 0;
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // Category filtering
    if (selectedCategories.length > 0) {
      hotels = hotels.filter(hotel =>
        selectedCategories.includes(hotel.category || 'Budget')
      );
    }

    // Property type filtering
    if (selectedPropertyTypes.length > 0) {
      hotels = hotels.filter(hotel =>
        selectedPropertyTypes.includes(hotel.accommodationType || 'Hotel')
      );
    }

    // Amenity filtering
    if (selectedAmenities.length > 0) {
      hotels = hotels.filter(hotel =>
        selectedAmenities.every(selectedAmenity =>
          hotel.amenities?.some(hotelAmenity => {
            const hotelAmenityLower = hotelAmenity?.toLowerCase();
            const selectedAmenityLower = selectedAmenity.toLowerCase();
            return hotelAmenityLower?.includes(selectedAmenityLower) || selectedAmenityLower.includes(hotelAmenityLower);
          })
        )
      );
    }

    // Bedroom filtering
    if (bedrooms > 0) {
      hotels = hotels.filter(hotel => hotel.bedrooms >= bedrooms);
    }

    // Bathroom filtering
    if (bathrooms > 0) {
      hotels = hotels.filter(hotel => hotel.bathrooms >= bathrooms);
    }

    // Sorting
    if (sortByPrice) {
      hotels = [...hotels].sort((a, b) => {
        const priceA = a.prices?.basePrice || a.minRate || Infinity;
        const priceB = b.prices?.basePrice || b.minRate || Infinity;
        return priceA - priceB;
      });
    }

    return hotels;
  }, [results, selectedAmenities, bedrooms, bathrooms, sortByPrice, priceRange, selectedCategories, selectedPropertyTypes]);

  useEffect(() => {
    const fetchHotels = async () => {
      if (!city) {
        setError('Ciudad no especificada');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl = `/api/hotels?city=${encodeURIComponent(city)}&checkin=${checkin || ''}&checkout=${checkout || ''}&guests=${guests || '2'}&destinationCode=${destinationCode || ''}&dest_id=${destId || ''}&page=${currentPage}&pageSize=25`;

        console.log('Fetching hotels from:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError('Error al buscar hoteles. Por favor intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city, checkin, checkout, guests, destinationCode, destId, currentPage]);

  // Handle mobile search
  const handleMobileSearch = (searchData) => {
    // Create URL search parameters
    const newSearchParams = new URLSearchParams({
      city: searchData.location.city,
      country: searchData.location.country || '',
      destinationCode: searchData.location.code || '',
      dest_id: searchData.location.dest_id || '',
      checkin: searchData.checkIn,
      checkout: searchData.checkOut,
      guests: searchData.guests.toString(),
      page: '1' // Reset to first page on new search
    });

    // Reset current page and navigate
    setCurrentPage(1);
    router.push(`/search-results?${newSearchParams.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // Update URL with new page
    const newSearchParams = new URLSearchParams({
      city: city,
      country: country || '',
      destinationCode: destinationCode || '',
      dest_id: destId || '',
      checkin: checkin || '',
      checkout: checkout || '',
      guests: guests || '2',
      page: newPage.toString()
    });

    router.push(`/search-results?${newSearchParams.toString()}`);

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format search info for display
  const getSearchInfo = () => {
    const parts = [];
    if (city) parts.push(city);
    if (country && country !== city) parts.push(country);

    let dateInfo = '';
    if (checkin && checkout) {
      const checkInDate = new Date(checkin).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });
      const checkOutDate = new Date(checkout).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });
      dateInfo = ` • ${checkInDate} - ${checkOutDate}`;
    }

    const guestInfo = guests ? ` • ${guests} huésped${guests !== '1' ? 'es' : ''}` : '';

    return parts.join(', ') + dateInfo + guestInfo;
  };

  // Format mobile search display values
  const getMobileDisplayValues = () => {
    let location = 'Destino';
    if (city) {
      // Keep it short for mobile single line
      location = city.length > 12 ? city.substring(0, 10) + '...' : city;
    }

    let dates = 'Fechas';
    if (checkin && checkout) {
      const checkInDate = new Date(checkin);
      const checkOutDate = new Date(checkout);

      // Shorter date format for mobile
      const checkInFormatted = checkInDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'numeric'
      });
      const checkOutFormatted = checkOutDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'numeric'
      });
      dates = `${checkInFormatted}-${checkOutFormatted}`;
    }

    const guestsCount = parseInt(guests) || 2;
    const guestsText = `${guestsCount} huésped${guestsCount !== 1 ? 'es' : ''}`;

    return { location, dates, guests: guestsText };
  };

  const getSourceBadge = (source) => {
    if (source === 'guesty') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-500 text-white shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
          Guestyzz
        </span>
      );
    } else if (source === 'hotelbeds') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-green-500 text-white shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
          Hotelbeds
        </span>
      );
    } else if (source === 'booking') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500 text-white shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
          Booking.com
        </span>
      );
    }
    return null;
  };


  const coordinates = results?.coordinates || null;

  const getRedirectUrl = (hotel) => {
    if (hotel?.source === 'guesty') {
      return `https://guestyz.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`;
    } else if (hotel?.source === 'booking' && hotel?.hotel_link) {
      // return `${hotel.hotel_link}?checkin=${hotel.searchParams?.checkin || ''}&checkout=${hotel.searchParams?.checkout || ''}`;
      return `https://www.booking.com/searchresults.html?ss=${hotel.city}&ssne=${hotel.city}&ssne_untouched=${hotel.city}&highlighted_hotels=${hotel.id}&checkin=${hotel.searchParams?.checkin || ''}&checkout=${hotel.searchParams?.checkout || ''}`;
    } else if (hotel?.source === 'hotelbeds') {
      return `/hotels?code=${hotel.code}&checkin=${hotel.checkin || ''}&checkout=${hotel.checkout || ''}&guests=${hotel.guests || '2'}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative flex items-center justify-between">
            {/* Spacer for left side to help center the logo */}
            <div className="w-1/3"></div>

            {/* Logo - Centered */}
            <div className="w-1/3 flex justify-center">
              <Link href="/" className="flex items-center">
                <img
                  src="https://assets.chorcha.net/-a3zutNwSHFbhpOR-wpJR.png"
                  alt="Guest Equity Inc"
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            {/* Navigation Links - Right Aligned */}
            <div className="w-1/3 flex justify-end">
              <nav className="hidden md:flex items-center space-x-8">
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">USD $</span>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="w-full mx-auto px-4 py-4">
          {/* Search Form */}
          <div className="mb-4">
            <SearchForm
              compact={true}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              initialValues={initialValues}
            />
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="md:hidden sticky top-12 bg-gray-50 z-50 py-2 px-4 -mx-4 border-b border-gray-200 mb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FilterIcon size={16} />
                <span className="text-sm font-medium">Filtros</span>
                <span className="text-xs text-gray-600">
                  {mobileFiltersExpanded ? '▼' : '▶'}
                </span>
              </button>
              <span className="text-sm text-blue-600 font-medium">{!isFilterApplied ? (results?.bookingCount + results?.total) || 0 : filteredHotels?.length || 0} properties</span>
            </div>
          </div>

          {/* Quick Filters - Desktop Always Visible, Mobile Collapsible */}
          <div
            style={{ fontFamily: "system-ui" }}
            className={`${mobileFiltersExpanded ? 'block' : 'hidden'} md:flex flex-wrap items-center justify-center gap-4`}
          >
            {/* Price Filter Dropdown */}
            <div className="relative mb-2 md:mb-0">
              <Select onValueChange={(value) => {
                if (value === 'all') {
                  setPriceRange({ min: 0, max: 1000 });
                } else if (value === '0-100') {
                  setPriceRange({ min: 0, max: 100 });
                } else if (value === '100-200') {
                  setPriceRange({ min: 100, max: 200 });
                } else if (value === '200-500') {
                  setPriceRange({ min: 200, max: 500 });
                } else if (value === '500+') {
                  setPriceRange({ min: 500, max: 1000 });
                }
              }}>
                <SelectTrigger className="h-8 text-md border-0 bg-transparent hover:bg-gray-100 focus:ring-0 w-full md:w-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-800">Precio por noche:</span>
                    <span className="font-medium text-gray-800">
                      {priceRange.min > 0 || priceRange.max < 1000
                        ? `€${priceRange.min} - €${priceRange.max}`
                        : 'All'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="0-100">€0 - €100</SelectItem>
                  <SelectItem value="100-200">€100 - €200</SelectItem>
                  <SelectItem value="200-500">€200 - €500</SelectItem>
                  <SelectItem value="500+">€500+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Separator - Only on Desktop */}
            <div className="hidden md:block border-l-2 w-2 h-6 border-gray-600 mx-2" />

            {/* Categories Filter Dropdown */}
            <div className="relative mb-2 md:mb-0">
              <Select onValueChange={(value) => {
                if (value === 'all') {
                  setSelectedCategories([]);
                } else {
                  setSelectedCategories([value]);
                }
              }}>
                <SelectTrigger className="h-8 text-md border-0 bg-transparent hover:bg-gray-100 focus:ring-0 w-full md:w-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Categorías:</span>
                    <span className="font-medium text-gray-800">
                      {selectedCategories.length > 0 ? selectedCategories[0] : 'All'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Budget">Económico</SelectItem>
                  <SelectItem value="Mid-Range">Intermedio</SelectItem>
                  <SelectItem value="Luxury">Lujo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Separator - Only on Desktop */}
            <div className="hidden md:block border-l-2 w-2 h-6 border-gray-600 mx-2" />

            {/* Property Type Filter Dropdown */}
            <div className="relative mb-2 md:mb-0">
              <Select onValueChange={(value) => {
                if (value === 'all') {
                  setSelectedPropertyTypes([]);
                } else {
                  setSelectedPropertyTypes([value]);
                }
              }}>
                <SelectTrigger className="h-8 text-md border-0 bg-transparent hover:bg-gray-100 focus:ring-0 w-full md:w-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Tipo de Propiedad:</span>
                    <span className="font-medium text-gray-800">
                      {selectedPropertyTypes.length > 0 ? selectedPropertyTypes[0] : 'All'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Apartment">Departamento</SelectItem>
                  <SelectItem value="Cabin">Cabaña</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Guesthouse">Casa de Huéspedes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Separator - Only on Desktop */}
            <div className="hidden md:block border-l-2 w-2 h-6 border-gray-600 mx-2" />

            {/* Amenities Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded mb-2 md:mb-0 w-full md:w-auto justify-start"
            >
              <span className="text-gray-600">Servicios:</span>
              <span className="font-medium text-gray-800">
                {selectedAmenities.length > 0 ? `${selectedAmenities.length} selected` : 'All'}
              </span>
            </button>

            {/* Separator - Only on Desktop */}
            <div className="hidden md:block border-l-2 w-2 h-6 border-gray-600 mx-2" />

            {/* Dormitorios Filter Dropdown */}
            <div className="relative mb-2 md:mb-0">
              <Select value={bedrooms.toString()} onValueChange={(val) => setBedrooms(parseInt(val))}>
                <SelectTrigger className="h-8 text-md border-0 bg-transparent hover:bg-gray-100 focus:ring-0 w-full md:w-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Habitaciones:</span>
                    <span className="font-medium text-gray-800">
                      {bedrooms > 0 ? `${bedrooms}+` : 'All'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Separator - Only on Desktop */}
            <div className="hidden md:block border-l-2 w-2 h-6 border-gray-600 mx-4" />

            {/* Bathrooms Filter Dropdown */}
            <div className="relative mb-2 md:mb-0">
              <Select value={bathrooms.toString()} onValueChange={(val) => setBathrooms(parseInt(val))}>
                <SelectTrigger className="h-8 text-md border-0 bg-transparent hover:bg-gray-100 focus:ring-0 w-full md:w-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Baños:</span>
                    <span className="font-medium text-gray-800">
                      {bathrooms > 0 ? `${bathrooms}+` : 'Todos'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Todos</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Properties Count and Clear All */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-blue-600 font-medium">{!isFilterApplied ? (results?.bookingCount + results?.total) || 0 : filteredHotels?.length || 0} properties</span>

              {(priceRange.min > 0 || priceRange.max < 1000 || selectedCategories.length > 0 ||
                selectedPropertyTypes.length > 0 || selectedAmenities.length > 0 || bedrooms > 0 || bathrooms > 0) && (
                  <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-800">Clear all</button>
                )}
            </div>

            {/* Mobile Clear All Button */}
            <div className="md:hidden w-full mt-3 pt-3 border-t border-gray-200">
              {(priceRange.min > 0 || priceRange.max < 1000 || selectedCategories.length > 0 ||
                selectedPropertyTypes.length > 0 || selectedAmenities.length > 0 || bedrooms > 0 || bathrooms > 0) && (
                  <button
                    onClick={clearAllFilters}
                    className="w-full py-2 text-center text-sm text-blue-600 hover:text-blue-800 bg-blue-50 rounded-lg"
                  >
                    Clear all filters
                  </button>
                )}
            </div>
          </div>

        </div>
      </div>


      {/* Sort and Filter Options */}
      <div className="flex ml-4 items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-800 font-medium">Sort by:</span>
          <button
            onClick={() => setSortByPrice(!sortByPrice)}
            className={`text-sm px-3 py-1 rounded-full border ${sortByPrice
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
          >
            Price (Low to High)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full mx-auto flex flex-col md:flex-row">
        {/* Left Side - Hotel Cards */}
        <div className="w-full md:w-2/3 p-4 md:max-h-screen md:overflow-y-auto" style={{ fontFamily: 'system-ui' }}>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-64 h-48 md:h-32 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHotels.map((hotel, index) => (
                <div key={`hotel-${hotel.id}-${index}`} className="bg-white rounded-lg border border-gray-200 shadow-md  ">
                  {/* Desktop Layout - Horizontal */}
                  <div className="hidden md:block">
                    <div className="flex space-x-4">
                      {/* Hotel Image */}
                      <div className="w-64 h-full relative flex-shrink-0">
                        {hotel.images && hotel.images.length > 0 ? (
                          <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-full h-full object-cover rounded-l-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/256x192?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          {getSourceBadge(hotel.source)}
                        </div>
                      </div>

                      {/* Hotel Details */}
                      <div className="flex-1 min-w-0 flex flex-col p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {hotel.name}
                            </h3>


                            <div className="flex items-center mb-3 text-sm text-gray-600">
                              <MapPin size={16} className="mr-2" />
                              <span className="text-sm truncate" style={{ fontFamily: '"Playfair Display", serif' }}>{hotel.address ? `${hotel.address},` : ''} {hotel.city ? `${hotel.city},` : ''} {hotel.country ? hotel.country : ''}</span>
                            </div>

                            <div className="text-gray-600 mb-3">
                              {hotel.accommodationType || 'Nature Haven'}
                            </div>

                            {/* Property Details */}
                            <div className="flex items-center text-sm text-gray-600 space-x-6">

                              <>
                                <span>• {hotel.maxGuests || 8} Huéspedes</span>
                                <span>• {hotel.bedrooms || 2} Dormitorios</span>
                                <span>• {(hotel.bathrooms || 1.5).toString().includes('.') ? hotel.bathrooms || 1.5 : hotel.bathrooms || 1} Baños</span>
                              </>

                            </div>
                          </div>

                          {/* Price and Book Button */}
                          <div className="text-right ml-6 flex-shrink-0">

                            {/* Rating */}
                            <div className="flex flex-col items-end mb-2">
                              <div className="flex space-x-1">
                                {[...Array(4)].map((_, i) => (
                                  <FaStar key={i} className="w-6 h-6 text-yellow-400" />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">
                                ({hotel.reviews_count || 8} reviews)
                              </span>
                            </div>
                            <div className='flex flex-col items-start w-full'>
                              <div className="text-xs mb-1 font-semibold">de</div>
                              <div className="text-xl text-gray-900 mb-1 font-bold" style={{ fontFamily: "Arial" }}>
                                € {Math.round(hotel.price || hotel.minRate || hotel.prices?.basePrice)}
                              </div>
                              <div className="text-xs mb-1 font-semibold">Por noche</div>
                              <div className="text-xs text-gray-400 mb-4">Se pueden aplicar cargos adicionales</div>
                              <a href={getRedirectUrl(hotel)} target="_blank" rel="noopener noreferrer"
                                className="bg-[#486698] text-white text-center px-8 py-3 text-md font-medium transition-colors w-full">
                                Buscar oferta
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout - Vertical */}
                  <div className="block md:hidden">
                    {/* Hotel Image */}
                    <div className="w-full h-48 relative">
                      {hotel.images && hotel.images.length > 0 ? (
                        <img
                          src={hotel.images[0]}
                          alt={hotel.name}
                          className="w-full h-full object-cover rounded-t-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x192?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        {getSourceBadge(hotel.source)}
                      </div>
                    </div>

                    {/* Hotel Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {hotel.name}
                      </h3>

                      <div className="flex items-center mb-2 text-sm text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        <span>
                          {hotel.city || 'Oakhurst'}, {hotel.country || 'United States of America'}
                        </span>
                      </div>

                      {/* Property Details */}
                      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
                        <>
                          <span>• {hotel.maxGuests || 8} Guests</span>
                          <span>• {hotel.bedrooms || 2} Dormitorios</span>
                          <span>• {(hotel.bathrooms || 1.5).toString().includes('.') ? hotel.bathrooms || 1.5 : hotel.bathrooms || 1} Bathrooms</span>
                        </>

                      </div>

                      <div className="flex items-end justify-between">
                        <div className='max-w-2xl'>
                          <div className="text-sm text-gray-600">from</div>
                          <div className="text-xl font-bold text-gray-900">
                            € {Math.round(hotel.price || hotel.minRate || hotel.prices?.basePrice || 215)}.00
                          </div>
                          <div className="text-xs mb-1 font-semibold">Por noche</div>
                          <div className="text-xs text-gray-400 mb-4 mr-2">Se pueden aplicar cargos adicionales</div>

                        </div>

                        <a href={getRedirectUrl(hotel)} target="_blank" rel="noopener noreferrer"
                          style={{
                            background: "#3A1C71",  /* fallback for old browsers */
                            background: "-webkit-linear-gradient(to left, #FFAF7B, #D76D77, #3A1C71)",  /* Chrome 10-25, Safari 5.1-6 */
                            background: "linear-gradient(to left, #FFAF7B, #D76D77, #3A1C71)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                          }}
                          className=" text-white text-center px-8 py-3 text-md font-medium transition-colors rounded-full">
                          Buscar oferta
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* No Results */}
              {!loading && filteredHotels.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No properties found matching your criteria.</p>
                </div>
              )}

              {/* Pagination */}
              {results?.pagination?.booking && handlePageChange && selectedAmenities.length === 0 && (
                <Pagination
                  currentPage={results.pagination.booking.currentPage}
                  totalPages={results.pagination.booking.totalPages}
                  totalItems={results.pagination.booking.totalItems}
                  pageSize={results.pagination.booking.pageSize}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Side - Map */}
        <div className="w-full md:w-1/3 relative h-64 md:h-auto hidden md:block">
          <div className="sticky top-16 h-screen bg-gray-100">
            {/* Map Toggle Buttons */}
            <div className="absolute top-4 right-4 z-10 flex bg-white rounded-lg border border-gray-300 overflow-hidden">
              {/* <button className="px-3 py-2 text-sm bg-gray-800 text-white flex items-center">
                <Map size={16} className="mr-1" />
                Map
              </button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center">
                <Satellite size={16} className="mr-1" />
                Satellite
              </button> */}
            </div>

            {/* Fullscreen Button */}
            <button className="absolute top-4 left-4 z-10 bg-white p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            {/* Map Container */}
            <div className="w-full h-full">
              {/* <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${coordinates?.longitude},${coordinates?.latitude}&zoom=12`}
                allowFullScreen
                title={`Map of ${city}`}
              /> */}

              <HotelsMap hotels={filteredHotels} getRedirectUrl={getRedirectUrl()} />

              {/* Map Pins for Hotels */}
              {/* {filteredHotels.map((hotel, index) => {
                // Ensure the hotel has coordinates and the map center coordinates are available
                if (hotel.coordinates && coordinates) {
                  // A simple projection to convert lat/lng to a percentage-based position
                  // This is a simplified approach and may need adjustment for different zoom levels or map areas
                  const latDiff = hotel.coordinates.latitude - coordinates.latitude;
                  const lngDiff = hotel.coordinates.longitude - coordinates.longitude;

                  // Adjust these multipliers to scale the pin distribution appropriately for your map's zoom level
                  const latMultiplier = 200; // Higher value spreads pins more vertically
                  const lngMultiplier = 200; // Higher value spreads pins more horizontally

                  const top = 50 - (latDiff * latMultiplier);
                  const left = 50 + (lngDiff * lngMultiplier);

                  return (
                    <div
                      key={`pin-${hotel.id}-${index}`}
                      className="absolute"
                      style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        transform: 'translate(-50%, -100%)'
                      }}
                    >
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium cursor-pointer hover:bg-blue-600">
                        € {Math.round(hotel.price || hotel.minRate || hotel.prices?.basePrice)}
                      </div>
                    </div>
                  );
                }
                return null;
              })} */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <MobileSearchModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        initialData={{
          location: city ? {
            city,
            country,
            code: destinationCode,
            dest_id: destId
          } : {},
          checkIn: checkin || '',
          checkOut: checkout || '',
          guests: parseInt(guests) || 2
        }}
        onSearch={handleMobileSearch}
      />

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={handleFilterOpenChange}>
        <DialogContent className="sm:max-w-2xl shadow-md border rounded-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4 max-h-96 overflow-y-auto">

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-3 block">Price per night (€)</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Min</label>
                  <input
                    type="number"
                    value={tempPriceRange.min}
                    onChange={(e) => setTempPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Max</label>
                  <input
                    type="number"
                    value={tempPriceRange.max}
                    onChange={(e) => setTempPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-medium mb-3 block">Categories</label>
              <div className="grid grid-cols-2 gap-2">
                {['Budget', 'Mid-Range', 'Luxury', 'Premium'].map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={tempSelectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        setTempSelectedCategories(prev =>
                          checked
                            ? [...prev, category]
                            : prev.filter(c => c !== category)
                        );
                      }}
                    />
                    <label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div>
              <label className="text-sm font-medium mb-3 block">Property Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Hotel', 'Apartment', 'Cabin', 'Villa', 'Resort', 'Guesthouse'].map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={tempSelectedPropertyTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        setTempSelectedPropertyTypes(prev =>
                          checked
                            ? [...prev, type]
                            : prev.filter(t => t !== type)
                        );
                      }}
                    />
                    <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort Option */}
            <div className="flex items-center justify-between">
              <label htmlFor="sort-by-price" className="text-sm font-medium">Sort by lowest price</label>
              <Switch
                id="sort-by-price"
                checked={tempSortByPrice}
                onCheckedChange={setTempSortByPrice}
              />
            </div>

            {/* Dormitorios and Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Dormitorios</label>
                <Select value={tempBedrooms.toString()} onValueChange={(val) => setTempBedrooms(parseInt(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num === 0 ? 'Any' : `${num}+`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Bathrooms</label>
                <Select value={tempBathrooms.toString()} onValueChange={(val) => setTempBathrooms(parseInt(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num === 0 ? 'Any' : `${num}+`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-sm font-medium mb-3">Popular Amenities</h4>
              <div className="grid grid-cols-2 gap-4">
                {popularAmenities.map(amenity => (
                  <div key={amenity.en} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pop-${amenity.en}`}
                      checked={tempSelectedAmenities.includes(amenity.en)}
                      onCheckedChange={(checked) => {
                        setTempSelectedAmenities(prev =>
                          checked
                            ? [...prev, amenity.en]
                            : prev.filter(a => a !== amenity.en)
                        );
                      }}
                    />
                    <label htmlFor={`pop-${amenity.en}`} className="text-sm flex items-center gap-2 cursor-pointer">
                      {amenity.icon} {amenity.es}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={handleClearFilters}>Limpiar todo</Button>
            <Button onClick={handleApplyFilters}>Aplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

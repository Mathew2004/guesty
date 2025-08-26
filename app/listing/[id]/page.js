'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Utensils, 
  Star,
  Calendar,
  Clock,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getListingDetails, getListingCalendar } from '../../../lib/hotelbedsApi';

export default function ListingDetails() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Calendar state
  const [calendar, setCalendar] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchListingDetails(params.id);
    }
  }, [params.id]);

  const fetchListingDetails = async (listingId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching listing details for ID:', listingId);
      const response = await getListingDetails(listingId, 'bedArrangements pictures amenities houseRules');
      console.log('Listing details response:', response);
      setListing(response);
    } catch (err) {
      console.error('Error fetching listing details:', err);
      setError('Failed to load listing details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async () => {
    if (!checkIn || !checkOut || !params.id) {
      setAvailabilityMessage('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setAvailabilityMessage('Check-out date must be after check-in date');
      return;
    }

    setCalendarLoading(true);
    setAvailabilityMessage('Checking availability...');
    
    try {
      const response = await getListingCalendar(params.id, checkIn, checkOut);
      setCalendar(response);
      
      // Check if all days in the range are available
      const unavailableDays = response.filter(day => day.status === 'unavailable');
      
      if (unavailableDays.length === 0) {
        setAvailabilityMessage('✅ Available for your selected dates!');
      } else {
        const unavailableDates = unavailableDays.map(day => day.date).join(', ');
        setAvailabilityMessage(`❌ Not available on: ${unavailableDates}`);
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      setAvailabilityMessage('Failed to check availability. Please try again.');
    } finally {
      setCalendarLoading(false);
    }
  };

  const nextImage = () => {
    if (listing?.pictures?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.pictures.length);
    }
  };

  const prevImage = () => {
    if (listing?.pictures?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.pictures.length) % listing.pictures.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'This listing could not be found.'}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Search</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Heart size={20} />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Location */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={18} className="mr-2" />
            <span>{listing.address.full}</span>
          </div>
          
          {/* Property Details */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{listing.accommodates} guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bed size={16} />
              <span>{listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath size={16} />
              <span>{listing.bathrooms} bathroom{listing.bathrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">{listing.propertyType}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            {listing.pictures && listing.pictures.length > 0 && (
              <div className="mb-8">
                <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={listing.pictures[currentImageIndex]?.original || listing.pictures[currentImageIndex]}
                    alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Property+Image';
                    }}
                  />
                  
                  {listing.pictures.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {listing.pictures.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Image Counter */}
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {listing.pictures.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {listing.pictures.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {listing.pictures.slice(0, 8).map((picture, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={picture.thumbnail || picture.original || picture}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x150?text=Image';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <div className="space-y-4">
                {listing.description.summary && (
                  <p className="text-gray-700">{listing.description.summary}</p>
                )}
                {listing.description.space && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">The Space</h3>
                    <p className="text-gray-700">{listing.description.space}</p>
                  </div>
                )}
                {listing.description.neighborhood && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">The Neighborhood</h3>
                    <p className="text-gray-700">{listing.description.neighborhood}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bed Arrangements */}
            {listing.bedArrangements && listing.bedArrangements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sleeping arrangements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listing.bedArrangements.map((room, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {room.room || `Room ${index + 1}`}
                      </h3>
                      <div className="space-y-1">
                        {Object.entries(room).map(([bedType, count]) => {
                          if (bedType !== 'room' && count > 0) {
                            return (
                              <div key={bedType} className="flex items-center text-sm text-gray-600">
                                <Bed size={16} className="mr-2" />
                                <span>{count} {bedType.replace(/([A-Z])/g, ' $1').toLowerCase()}{count > 1 ? 's' : ''}</span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-gray-600">
                        {/* You can add specific icons for different amenities */}
                        <Wifi size={20} />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              {/* Booking Card */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {listing.prices && (
                      <div className="text-2xl font-bold text-gray-900">
                        ${listing.prices.basePrice || 'N/A'}
                        <span className="text-sm font-normal text-gray-500"> / night</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">New</span>
                  </div>
                </div>

                {/* Check-in/out dates */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-OUT</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="border border-gray-300 rounded-lg p-3 mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
                  <select className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0">
                    {Array.from({length: listing.accommodates}, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={checkAvailability}
                  disabled={calendarLoading || !checkIn || !checkOut}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {calendarLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <Calendar size={16} className="mr-2" />
                      Check availability
                    </>
                  )}
                </button>

                {/* Availability Message */}
                {availabilityMessage && (
                  <div className={`text-center text-sm mb-4 p-2 rounded-lg ${
                    availabilityMessage.includes('✅') ? 'bg-green-50 text-green-700' :
                    availabilityMessage.includes('❌') ? 'bg-red-50 text-red-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {availabilityMessage}
                  </div>
                )}

                {/* Calendar Details */}
                {calendar.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Availability Details</h4>
                    <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
                      {calendar.map((day) => (
                        <div key={day.date} className={`flex justify-between items-center p-1 rounded ${
                          day.status === 'available' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          <span>{new Date(day.date).toLocaleDateString()}</span>
                          <span className="capitalize">{day.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
              </div>

              {/* House Rules */}
              {listing.houseRules && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">House Rules</h3>
                  <div className="space-y-3 text-sm">
                    {listing.houseRules.checkInTime && (
                      <div className="flex items-center space-x-3">
                        <Clock size={16} className="text-gray-600" />
                        <span>Check-in: {listing.houseRules.checkInTime}</span>
                      </div>
                    )}
                    {listing.houseRules.checkOutTime && (
                      <div className="flex items-center space-x-3">
                        <Clock size={16} className="text-gray-600" />
                        <span>Check-out: {listing.houseRules.checkOutTime}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Shield size={16} className="text-gray-600" />
                      <span>Pets {listing.houseRules.petsAllowed ? 'allowed' : 'not allowed'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield size={16} className="text-gray-600" />
                      <span>Smoking {listing.houseRules.smokingAllowed ? 'allowed' : 'not allowed'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

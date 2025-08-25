'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function SearchForm({ onSearch }) {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 mx-4 lg:mx-8 -mt-20 relative z-10 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-0 lg:flex lg:space-x-4 lg:items-end">
        {/* Destination */}
        <div className="flex-1">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="destination"
              name="destination"
              value={searchData.destination}
              onChange={handleInputChange}
              placeholder="Where are you going?"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="flex-1">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleInputChange}
              min={today}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex-1">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleInputChange}
              min={searchData.checkIn || today}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests & Rooms
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                name="adults"
                value={searchData.adults}
                onChange={handleInputChange}
                className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Adults</option>
                ))}
              </select>
            </div>
            <select
              name="children"
              value={searchData.children}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            >
              {[0, 1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num} Children</option>
              ))}
            </select>
            <select
              name="rooms"
              value={searchData.rooms}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
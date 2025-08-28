'use client';

import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchableDropdown from './SearchableDropdown';
import cities from '../cities.json';

export default function MobileSearchModal({ 
  isOpen, 
  onClose, 
  initialData = {}, 
  onSearch 
}) {
  const [searchData, setSearchData] = useState({
    location: {},
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Update search data when modal opens with initial data
  useEffect(() => {
    if (isOpen && initialData) {
      setSearchData({
        location: initialData.location || {},
        checkIn: initialData.checkIn || '',
        checkOut: initialData.checkOut || '',
        guests: initialData.guests || 2
      });
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLocationChange = (selectedCity) => {
    setSearchData(prev => ({
      ...prev,
      location: selectedCity
    }));
  };

  const handleDateChange = (dates) => {
    setSearchData(prev => ({
      ...prev,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut
    }));
    setShowDatePicker(false);
  };

  const handleCheckInChange = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSearchData(prev => ({
      ...prev,
      checkIn: dateStr
    }));
    setSelectingCheckOut(true);
  };

  const handleCheckOutChange = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSearchData(prev => ({
      ...prev,
      checkOut: dateStr
    }));
    // Close date picker when checkout is selected
    setShowDatePicker(false);
    setSelectingCheckOut(false);
  };

  const handleDateClick = (date) => {
    if (!searchData.checkIn || selectingCheckOut) {
      if (!searchData.checkIn) {
        handleCheckInChange(date);
      } else {
        handleCheckOutChange(date);
      }
    } else {
      // If both dates are selected, clicking starts over
      setSearchData(prev => ({
        ...prev,
        checkIn: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        checkOut: ''
      }));
      setSelectingCheckOut(true);
    }
  };

  const isDateDisabled = (date) => {
    return date < today;
  };

  const isDateSelected = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (searchData.checkIn === dateStr) return 'checkin';
    if (searchData.checkOut === dateStr) return 'checkout';
    return false;
  };

  const isDateInRange = (date) => {
    if (!searchData.checkIn || !searchData.checkOut) return false;
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return dateStr > searchData.checkIn && dateStr < searchData.checkOut;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleGuestsChange = (change) => {
    setSearchData(prev => ({
      ...prev,
      guests: Math.max(1, Math.min(10, prev.guests + change))
    }));
  };

  const handleApply = () => {
    if (!searchData.location || !searchData.location.city) {
      return;
    }

    onSearch(searchData);
    onClose();
  };

  const formatDateRange = () => {
    if (!searchData.checkIn || !searchData.checkOut) {
      return 'Seleccionar fechas';
    }
    
    const checkInDate = new Date(searchData.checkIn);
    const checkOutDate = new Date(searchData.checkOut);
    
    const checkInFormatted = checkInDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
    
    const checkOutFormatted = checkOutDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
    
    return `${checkInFormatted} - ${checkOutFormatted}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="text-blue-600 font-medium"
        >
          Cancelar
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          ¿A dónde vamos?
        </h2>
        <button
          onClick={handleApply}
          disabled={!searchData.location?.city}
          className={`font-medium ${
            searchData.location?.city
              ? 'text-blue-600'
              : 'text-gray-400'
          }`}
        >
          Aplicar
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Location Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center mb-2">
            <MapPin size={20} className="text-gray-400 mr-3" />
            <span className="text-gray-700 font-medium">Destino</span>
          </div>
          <SearchableDropdown
            options={cities}
            onChange={handleLocationChange}
            placeholder="Buscar ciudades..."
            value={searchData.location}
            className="w-full"
          />
        </div>

        {/* Dates Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center mb-2">
            <Calendar size={20} className="text-gray-400 mr-3" />
            <span className="text-gray-700 font-medium">Fechas</span>
          </div>
          <button
            onClick={() => setShowDatePicker(true)}
            className="w-full text-left p-3 border border-gray-300 rounded-lg bg-white"
          >
            <span className={searchData.checkIn && searchData.checkOut ? 'text-gray-900' : 'text-gray-500'}>
              {formatDateRange()}
            </span>
          </button>
        </div>

        {/* Guests Section */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Users size={20} className="text-gray-400 mr-3" />
            <span className="text-gray-700 font-medium">Huéspedes</span>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white">
            <span className="text-gray-900">
              {searchData.guests} huésped{searchData.guests !== 1 ? 'es' : ''}
            </span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleGuestsChange(-1)}
                disabled={searchData.guests <= 1}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  searchData.guests <= 1
                    ? 'border-gray-300 text-gray-400'
                    : 'border-blue-600 text-blue-600'
                }`}
              >
                -
              </button>
              <button
                onClick={() => handleGuestsChange(1)}
                disabled={searchData.guests >= 10}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  searchData.guests >= 10
                    ? 'border-gray-300 text-gray-400'
                    : 'border-blue-600 text-blue-600'
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={() => {
                setShowDatePicker(false);
                setSelectingCheckOut(false);
              }}
              className="text-blue-600 font-medium"
            >
              Atrás
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {!searchData.checkIn ? 'Fecha de entrada' : selectingCheckOut ? 'Fecha de salida' : 'Seleccionar fechas'}
            </h3>
            <div className="w-16"></div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button
              onClick={() => {
                const prevMonth = new Date(currentMonth);
                prevMonth.setMonth(currentMonth.getMonth() - 1);
                setCurrentMonth(prevMonth);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h4 className="text-lg font-semibold text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>
            <button
              onClick={() => {
                const nextMonth = new Date(currentMonth);
                nextMonth.setMonth(currentMonth.getMonth() + 1);
                setCurrentMonth(nextMonth);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar */}
          <div className="flex-1 p-4">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-12"></div>;
                }

                const disabled = isDateDisabled(date);
                const selected = isDateSelected(date);
                const inRange = isDateInRange(date);

                return (
                  <button
                    key={index}
                    onClick={() => !disabled && handleDateClick(date)}
                    disabled={disabled}
                    className={`h-12 rounded-lg text-sm font-medium transition-colors ${
                      disabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : selected === 'checkin'
                        ? 'bg-blue-600 text-white'
                        : selected === 'checkout'
                        ? 'bg-blue-600 text-white'
                        : inRange
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Selected dates info */}
            {(searchData.checkIn || searchData.checkOut) && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Entrada: </span>
                    <span className="font-medium text-gray-900">
                      {searchData.checkIn ? new Date(searchData.checkIn).toLocaleDateString('es-ES', { 
                        weekday: 'short', day: 'numeric', month: 'short' 
                      }) : 'Seleccionar'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Salida: </span>
                    <span className="font-medium text-gray-900">
                      {searchData.checkOut ? new Date(searchData.checkOut).toLocaleDateString('es-ES', { 
                        weekday: 'short', day: 'numeric', month: 'short' 
                      }) : 'Seleccionar'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

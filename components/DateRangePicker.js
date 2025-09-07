'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';

const DateRangePicker = ({ 
  checkIn, 
  checkOut, 
  onCheckInChange, 
  onCheckOutChange, 
  className = "",
  transparent = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get next month
  const getNextMonth = (date) => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    return nextMonth;
  };

  // Generate calendar days for a specific month
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

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const options = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Check if date is disabled (past dates)
  const isDisabled = (date) => {
    if (!date) return false;
    return date < today;
  };

  // Check if date is selected - Fixed timezone handling
  const isSelected = (date) => {
    if (!date) return false;
    
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (checkIn && dateStr === checkIn) return 'checkin';
    if (checkOut && dateStr === checkOut) return 'checkout';
    return false;
  };

  // Check if date is in range or hover preview range - Fixed timezone handling
  const isInRange = (date) => {
    if (!date || !checkIn) return false;
    
    const checkInDate = new Date(checkIn + 'T00:00:00');
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (checkOut) {
      // If we have both dates, show actual range
      const checkOutDate = new Date(checkOut + 'T00:00:00');
      return currentDate > checkInDate && currentDate < checkOutDate;
    } else if (hoverDate && isSelectingCheckOut) {
      // If we're selecting checkout and hovering, show preview range
      const hoverDateTime = new Date(hoverDate.getFullYear(), hoverDate.getMonth(), hoverDate.getDate());
      return currentDate > checkInDate && currentDate < hoverDateTime;
    }
    
    return false;
  };

  // Check if date is hover preview checkout - Fixed timezone handling
  const isHoverPreview = (date) => {
    if (!date || !checkIn || !isSelectingCheckOut || !hoverDate) return false;
    
    const checkInDate = new Date(checkIn + 'T00:00:00');
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const hoverDateTime = new Date(hoverDate.getFullYear(), hoverDate.getMonth(), hoverDate.getDate());
    
    return currentDate.getTime() === hoverDateTime.getTime() && currentDate > checkInDate;
  };

  // Handle date selection - Fixed date selection logic with proper timezone handling
  const handleDateClick = (date, event) => {
    // Prevent any form submission
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (isDisabled(date)) return;

    // Create date string without timezone conversion issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    if (!checkIn || (!isSelectingCheckOut && checkIn && checkOut)) {
      // First selection or resetting - set check-in
      onCheckInChange(dateString);
      onCheckOutChange(''); // Clear checkout
      setIsSelectingCheckOut(true);
      setHoverDate(null);
    } else if (isSelectingCheckOut) {
      // Second selection - set check-out
      const checkInDate = new Date(checkIn + 'T00:00:00');
      const clickedDate = new Date(dateString + 'T00:00:00');
      
      if (clickedDate > checkInDate) {
        onCheckOutChange(dateString);
        setIsSelectingCheckOut(false);
        setHoverDate(null);
        // Don't close dropdown immediately, let user see the result
        setTimeout(() => setIsOpen(false), 500);
      } else {
        // If selected date is before or same as check-in, reset and set as new check-in
        onCheckInChange(dateString);
        onCheckOutChange('');
        setIsSelectingCheckOut(true);
        setHoverDate(null);
      }
    }
  };

  // Handle mouse enter for hover preview - Fixed timezone handling
  const handleMouseEnter = (date) => {
    if (isSelectingCheckOut && checkIn && !isDisabled(date)) {
      const checkInDate = new Date(checkIn + 'T00:00:00');
      const hoverDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      if (hoverDate > checkInDate) {
        setHoverDate(date);
      }
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  // Navigate months
  const navigateMonth = (direction, event) => {
    // Prevent form submission
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  // Handle input click
  const handleInputClick = (event) => {
    // Prevent form submission
    event.preventDefault();
    event.stopPropagation();
    
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset selection state when opening
      if (checkIn && !checkOut) {
        setIsSelectingCheckOut(true);
      } else {
        setIsSelectingCheckOut(false);
      }
      setHoverDate(null);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsSelectingCheckOut(false);
        setHoverDate(null);
      }
    };

    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Get number of nights - Fixed timezone handling
  const getNights = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate + 'T00:00:00');
    let end;
    
    if (typeof endDate === 'string') {
      end = new Date(endDate + 'T00:00:00');
    } else {
      // If endDate is a Date object (from hover)
      end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    }
    
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Get display text
  const getDisplayText = () => {
    if (checkIn && checkOut) {
      return `${formatDate(new Date(checkIn))} - ${formatDate(new Date(checkOut))}`;
    } else if (checkIn) {
      return `${formatDate(new Date(checkIn))} - Salida`;
    }
    return 'Seleccionar fechas';
  };

  // Render mobile fullscreen modal
  const renderMobileModal = () => (
    <div className="fixed inset-0 top-24 z-[9999] bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Seleccionar fechas</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Instructions */}
        <div className="px-4 py-4 text-center bg-gray-50">
          <p className="text-sm text-gray-600">
            {!checkIn ? 'Selecciona tu fecha de entrada' : 
             isSelectingCheckOut ? 'Ahora selecciona tu fecha de salida' : 
             'Haz clic en una fecha para cambiar tu selección'}
          </p>
          {checkIn && checkOut && (
            <p className="text-xs text-green-600 mt-1">
              {getNights(checkIn, checkOut)} noches • {formatDate(new Date(checkIn))} a {formatDate(new Date(checkOut))}
            </p>
          )}
        </div>

        {/* Calendar Navigation */}
        <div className="px-4 py-2 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => navigateMonth(-1, e)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-4">
              <h3 className="font-semibold text-gray-900 text-center">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <h3 className="font-semibold text-gray-900 text-center">
                {months[getNextMonth(currentMonth).getMonth()]} {getNextMonth(currentMonth).getFullYear()}
              </h3>
            </div>
            <button
              type="button"
              onClick={(e) => navigateMonth(1, e)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Calendars - 2 rows for mobile */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* First month */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 text-center">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              {renderMobileMonth(currentMonth)}
            </div>
            
            {/* Second month */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 text-center">
                {months[getNextMonth(currentMonth).getMonth()]} {getNextMonth(currentMonth).getFullYear()}
              </h4>
              {renderMobileMonth(getNextMonth(currentMonth))}
            </div>
          </div>
        </div>

        {/* Footer with Apply/Cancel buttons */}
        <div className="px-4 py-4 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                onCheckInChange('');
                onCheckOutChange('');
                setIsSelectingCheckOut(false);
              }}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              disabled={!checkIn}
            >
              {checkIn && checkOut ? 'Aplicar' : 'Cerrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render mobile calendar month
  const renderMobileMonth = (monthDate) => (
    <div>
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium p-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(monthDate).map((date, index) => {
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const disabled = isDisabled(date);
          const hoverPreview = isHoverPreview(date);
          
          return (
            <button
              key={index}
              onClick={(e) => date && handleDateClick(date, e)}
              disabled={!date || disabled}
              type="button"
              className={`
                p-3 text-sm rounded-lg transition-all relative min-h-[44px] flex items-center justify-center
                ${!date ? 'invisible' : ''}
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                ${selected === 'checkin' ? 'bg-blue-600 text-white font-semibold' : ''}
                ${selected === 'checkout' ? 'bg-blue-600 text-white font-semibold' : ''}
                ${hoverPreview ? 'bg-blue-500 text-white font-medium' : ''}
                ${inRange && !selected ? 'bg-blue-100 text-blue-700' : ''}
                ${!disabled && !selected && !inRange && !hoverPreview ? 'text-gray-700 hover:bg-gray-100' : ''}
              `}
            >
              {date ? date.getDate() : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
  const renderMonth = (monthDate, isSecondMonth = false) => (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">
          {months[monthDate.getMonth()]} {monthDate.getFullYear()}
        </h3>
        {!isSecondMonth && (
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={(e) => navigateMonth(-1, e)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => navigateMonth(1, e)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium p-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(monthDate).map((date, index) => {
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const disabled = isDisabled(date);
          const hoverPreview = isHoverPreview(date);
          
          return (
            <button
              key={index}
              onClick={(e) => date && handleDateClick(date, e)}
              onMouseEnter={() => date && handleMouseEnter(date)}
              onMouseLeave={handleMouseLeave}
              disabled={!date || disabled}
              type="button"
              className={`
                p-2 text-sm rounded transition-all relative
                ${!date ? 'invisible' : ''}
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                ${selected === 'checkin' ? 'bg-blue-600 text-white font-semibold' : ''}
                ${selected === 'checkout' ? 'bg-blue-600 text-white font-semibold' : ''}
                ${hoverPreview ? 'bg-blue-500 text-white font-medium' : ''}
                ${inRange && !selected ? 'bg-blue-100 text-blue-700' : ''}
                ${!disabled && !selected && !inRange && !hoverPreview ? 'text-gray-700 hover:bg-gray-100' : ''}
              `}
            >
              {date ? date.getDate() : ''}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className={`relative ${className} `}>
        {/* <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${transparent ? 'left-4' : 'left-3'}`} size={18} /> */}
        
        <input
          ref={inputRef}
          type="text"
          value={getDisplayText()}
          onClick={handleInputClick}
          readOnly
          placeholder="Check-in   -   Check-out"
          className="cursor-pointer w-full p-2 md:p-3 border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white text-gray-700 font-medium hover:border-gray-400 transition-colors"
          required
       />
      </div>

      {/* Mobile Fullscreen Modal */}
      {isOpen && isMobile && renderMobileModal()}

      {/* Desktop Dropdown */}
      {isOpen && !isMobile && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-2xl border border-gray-200 z-[9999] p-6" style={{ width: '640px' }}>
          {/* Instructions */}
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">
              {!checkIn ? 'Selecciona tu fecha de entrada' : 
               isSelectingCheckOut ? 'Ahora selecciona tu fecha de salida' : 
               'Haz clic en una fecha para cambiar tu selección'}
            </p>
            {checkIn && checkOut && (
              <p className="text-xs text-green-600 mt-1">
                {getNights(checkIn, checkOut)} noches • {formatDate(new Date(checkIn))} a {formatDate(new Date(checkOut))}
              </p>
            )}
          </div>

          {/* Dual Calendar */}
          <div className="flex space-x-6">
            {renderMonth(currentMonth)}
            <div className="w-px bg-gray-200"></div>
            {renderMonth(getNextMonth(currentMonth), true)}
          </div>
        </div>
      )}

      {/* Desktop Backdrop */}
      {isOpen && !isMobile && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DateRangePicker;

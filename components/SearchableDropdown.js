'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';

const SearchableDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Buscar ubicación...",
  className = "",
  icon: Icon = MapPin,
  transparent = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Calculate dropdown position based on viewport
  const calculateDropdownPosition = () => {
    if (!dropdownRef.current || !inputRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const dropdownHeight = 320; // Max height we set
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;

    // If there's not enough space below but there's more space above, show above
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom');
    }
  };

  // Filter options based on search term with better matching
  const filteredOptions = options.filter(option => {
    const searchLower = searchTerm.toLowerCase();
    const cityMatch = option.city.toLowerCase().includes(searchLower);
    const countryMatch = option.country && option.country.toLowerCase().includes(searchLower);
    return cityMatch || countryMatch;
  });

  // Highlight matched text
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="font-semibold text-gray-900">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  // Get display text for selected value
  const getDisplayText = () => {
    if (value && typeof value === 'object' && value.city) {
      return value.city;
    }
    return '';
  };

  // Handle option selection
  const handleSelect = (option) => {
    onChange(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(calculateDropdownPosition, 0);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm('');
    // Calculate position when opening
    setTimeout(calculateDropdownPosition, 0);
  };

  // Clear selection
  const handleClear = (e) => {
    e.stopPropagation();
    onChange({});
    setSearchTerm('');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className={`relative ${className}`}>
        <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${transparent ? 'left-4' : 'left-3'}`} size={18} />
        
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : getDisplayText()}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={`w-full ${transparent ? 'pl-12 pr-10 py-4 border-0 bg-transparent focus:outline-none' : 'pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white'} text-gray-700 font-medium cursor-pointer`}
        />
        
        <div className={`absolute ${transparent ? 'right-2' : 'right-3'} top-1/2 transform -translate-y-1/2 flex items-center space-x-1`}>
          {getDisplayText() && !isOpen && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown 
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            size={16} 
          />
        </div>
      </div>

      {isOpen && (
        <div 
          className={`absolute left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-[100] overflow-hidden ${
            dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          }`} 
          style={{ maxHeight: '400px' }}
        >
          {/* Options list - Clean Google-style */}
          <div className="scrollbar-hide smooth-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group flex items-center space-x-3"
                >
                  <div className="flex-shrink-0">
                    <MapPin className="text-gray-400 group-hover:text-gray-600 transition-colors" size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900 text-sm">
                      {searchTerm ? highlightText(option.city, searchTerm) : option.city}
                    </div>
                    {option.country && (
                      <div className="text-xs text-gray-500">
                        {searchTerm ? highlightText(option.country, searchTerm) : option.country}
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : searchTerm ? (
              <div className="px-4 py-6 text-center text-gray-500">
                <div className="mb-2">
                  <Search className="mx-auto text-gray-300" size={20} />
                </div>
                <p className="text-sm text-gray-500">No se encontraron resultados para "{searchTerm}"</p>
                <p className="text-xs text-gray-400 mt-1">Intenta con un término diferente</p>
              </div>
            ) : null}
          </div>

          {/* Powered by attribution */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-end">
              <span className="text-xs text-gray-400">Powered By Guesty</span>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchableDropdown;

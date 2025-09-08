'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#29415A] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link className="flex-shrink-0 flex items-center" href="/">
            <div className="flex items-center space-x-3">
              {/* Pine tree logo placeholder - you can replace with actual logo */}
              {/* <div className="text-2xl">🏔️</div> */}
              <div>
                <div className="text-lg font-bold text-white">GUESTYZ</div>
                {/* <div className="text-sm text-gray-200 font-medium">Alquileres Vacacionales</div> */}
              </div>
            </div>
          </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/properties" className="relative text-white hover:text-gray-300 font-medium transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
              PROPIEDADES
              </Link>
              <Link href="/management" className="relative text-white hover:text-gray-300 font-medium transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
              GESTIÓN
              </Link>
              <Link href="/testimonials" className="relative text-white hover:text-gray-300 font-medium transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
              TESTIMONIOS
              </Link>
              <Link href="/resources" className="relative text-white hover:text-gray-300 font-medium transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
              RECURSOS
              </Link>
              <Link href="/contact" className="relative text-white hover:text-gray-300 font-medium transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
              CONTACTO
              </Link>
            </div>
            </div>

            {/* Phone Number */}
          <div className="hidden lg:flex items-center space-x-2">
            <Phone size={16} className="text-orange-400" />
            <span className="text-white font-medium">(559) 284-9848</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 absolute left-0 right-0 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/properties"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                PROPIEDADES
              </Link>
              <Link
                href="/management"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                GESTIÓN
              </Link>
              <Link
                href="/testimonials"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                TESTIMONIOS
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                RECURSOS
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACTO
              </Link>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center space-x-2 px-3 text-sm text-gray-600 mb-3">
                  <Phone size={16} className="text-orange-500" />
                  <span>(559) 284-9848</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
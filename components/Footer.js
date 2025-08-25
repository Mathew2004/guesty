import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-400">LuxuryStay</h3>
            <p className="text-gray-300">
              Your gateway to luxury accommodations worldwide. Experience the finest hotels and resorts with our premium booking service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/hotels" className="text-gray-300 hover:text-amber-400 transition-colors">Hotels</Link></li>
              <li><Link href="/destinations" className="text-gray-300 hover:text-amber-400 transition-colors">Destinations</Link></li>
              <li><Link href="/deals" className="text-gray-300 hover:text-amber-400 transition-colors">Special Deals</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-amber-400 transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/booking-policy" className="text-gray-300 hover:text-amber-400 transition-colors">Booking Policy</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@luxurystay.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} />
                <span>123 Luxury Ave, Hotel District</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 LuxuryStay. All rights reserved. | Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}
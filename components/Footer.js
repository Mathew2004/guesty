import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-400">Guestyz</h3>
            <p className="text-gray-300">
              Tu puerta de entrada a alojamientos de lujo en todo el mundo. Experimenta los mejores hoteles y resorts con nuestro servicio de reservas premium.
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
            <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/hotels" className="text-gray-300 hover:text-amber-400 transition-colors">Hoteles</Link></li>
              <li><Link href="/destinations" className="text-gray-300 hover:text-amber-400 transition-colors">Destinos</Link></li>
              <li><Link href="/deals" className="text-gray-300 hover:text-amber-400 transition-colors">Ofertas Especiales</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors">Acerca de</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Soporte</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-amber-400 transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contáctanos</Link></li>
              <li><Link href="/booking-policy" className="text-gray-300 hover:text-amber-400 transition-colors">Política de Reservas</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Información de Contacto</h4>
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
            © 2024 Guestyz. Todos los derechos reservados. | Términos de Servicio | Política de Privacidad
          </p>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#29415A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Logo and BBB */}
          <div className="space-y-6">
            {/* Logo Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-[#29415A] font-bold text-sm">
                    <div className="flex flex-col items-center">
                      <div className="text-xs">🏔️</div>
                      <div className="text-[8px] leading-tight">GUESTYZ</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F5D76E]">GUESTYZ</h3>
                  <p className="text-sm text-gray-300 italic">Alquileres Vacacionales</p>
                </div>
              </div>
              
              {/* BBB Accreditation */}
              <div className="bg-white p-3 rounded-lg inline-block">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <div className="text-xs text-gray-800">
                    <div className="font-bold">NEGOCIO ACREDITADO</div>
                    <div>Calificación BBB: A+</div>
                    <div>Desde 4/9/2023</div>
                  </div>
                </div>
                <div className="text-[8px] text-gray-600 mt-1">Clic para Perfil</div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#29415A] hover:bg-[#F5D76E] transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#29415A] hover:bg-[#F5D76E] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#29415A] hover:bg-[#F5D76E] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#F5D76E] tracking-wider">DIRECCIÓN</h4>
            <div className="space-y-1 text-gray-300">
              <p>25221 Rd 68</p>
              <p>Tulare, CA</p>
              <p>93274</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#F5D76E] tracking-wider">CONTACTO</h4>
            <div className="space-y-2 text-gray-300">
              <p>Huéspedes (210) 686-1984</p>
              <p>Oficina (559) 284-9848</p>
              <p>soporte@guestyz.com</p>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#F5D76E] tracking-wider">RECURSOS</h4>
            <ul className="space-y-2">
              <li><Link href="/recursos" className="text-gray-300 hover:text-[#F5D76E] transition-colors">Recursos</Link></li>
              <li><Link href="/login-propietario" className="text-gray-300 hover:text-[#F5D76E] transition-colors">Login Propietario</Link></li>
              <li><Link href="/gestion" className="text-gray-300 hover:text-[#F5D76E] transition-colors">Gestión</Link></li>
              <li><Link href="/privacidad" className="text-gray-300 hover:text-[#F5D76E] transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="text-gray-300 hover:text-[#F5D76E] transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3a5574] mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Todos los Derechos Reservados | Guestyz
          </p>
        </div>
      </div>
    </footer>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl">
          {/* Icon */}
          <div className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h2 className={`text-xl md:text-2xl lg:text-4xl font-light text-white leading-tight transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Reserva tu próxima estancia hoy y descubre propiedades de alquiler a corto plazo en California que coincidan con tu estilo de viaje.
            </h2>

            <button className={`group bg-white/90 hover:bg-white text-[#29415A] px-8 py-4 rounded-full font-medium transition-all duration-700 delay-600 transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span>Ponte en Contacto</span>
              <div className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}></div>
      <div className={`absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full transition-all duration-1000 delay-800 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}></div>
      <div className={`absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full transition-all duration-1000 delay-900 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}></div>
    </section>
  );
}

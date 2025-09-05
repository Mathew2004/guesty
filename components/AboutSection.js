'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
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
    <section ref={sectionRef} className="py-16 bg-[#E8F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h2 className="text-3xl lg:text-5xl font-semibold text-[#486698] mb-6">
              Encuentra la Estancia Perfecta
              <br />
              para Cualquier Viaje
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Alquileres vacacionales en California para cada viaje: escapadas de fin de semana, vacaciones familiares, estancias de trabajo y más. Desde la costa hasta las montañas y parques nacionales, te tenemos cubierto.
            </p>
            <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
              Reserva tu Estancia
            </button>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Interior moderno de alquiler vacacional con chimenea de piedra"
              className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { DollarSign, Users, Shield, Clock, TrendingUp, Home, Star, CheckCircle } from 'lucide-react';

export default function ManagementPage() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Gestión Completa de Propiedades",
      description: "Nos encargamos de todo: limpieza, mantenimiento, check-in/check-out y atención al huésped.",
      features: ["Limpieza profesional", "Mantenimiento preventivo", "Gestión de llaves", "Atención 24/7"]
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Maximización de Ingresos",
      description: "Optimizamos precios dinámicamente y maximizamos la ocupación de tu propiedad.",
      features: ["Precios dinámicos", "Análisis de mercado", "Optimización de ocupación", "Reportes detallados"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Marketing y Promoción",
      description: "Promocionamos tu propiedad en múltiples plataformas y atraemos huéspedes de calidad.",
      features: ["Listado en Airbnb/VRBO", "Fotografía profesional", "SEO optimizado", "Gestión de reseñas"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Protección y Seguros",
      description: "Tu propiedad está protegida con seguros completos y verificación rigurosa de huéspedes.",
      features: ["Seguro de daños", "Verificación de huéspedes", "Depósitos de seguridad", "Soporte legal"]
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Hasta 40% más ingresos",
      description: "Comparado con alquileres tradicionales"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Gestión sin esfuerzo",
      description: "Nosotros nos encargamos de todo"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Huéspedes de calidad",
      description: "Proceso de verificación riguroso"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Transparencia total",
      description: "Reportes y comunicación constante"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Evaluamos tu propiedad y discutimos tus objetivos y expectativas.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      step: "02",
      title: "Preparación",
      description: "Fotografía profesional, optimización del listado y configuración inicial.",
      color: "bg-green-100 text-green-600"
    },
    {
      step: "03",
      title: "Lanzamiento",
      description: "Publicamos tu propiedad en múltiples plataformas y comenzamos a recibir reservas.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      step: "04",
      title: "Gestión Continua",
      description: "Manejo completo de huéspedes, mantenimiento y optimización de ingresos.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

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

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#486698] to-[#5a7ba8]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={headerRef} className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Gestión de Propiedades
            </h1>
            <p className="text-xl lg:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Maximiza tus ingresos sin el estrés de gestionar tu propiedad vacacional
            </p>
            <button className="bg-white text-[#486698] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
              ¿Por qué elegir Guest Equity?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos expertos en convertir tu propiedad en una inversión rentable y sin complicaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#486698] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#E8F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una gestión completa para que tú solo tengas que ver crecer tus ingresos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-[#486698] text-white p-4 rounded-2xl flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un proceso simple y transparente para comenzar a generar ingresos con tu propiedad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#486698]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para maximizar tus ingresos?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Únete a más de 100 propietarios que han confiado en nosotros para gestionar sus propiedades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#486698] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Consulta Gratuita
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#486698] font-semibold px-8 py-4 rounded-lg transition-all duration-300">
              Descargar Información
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

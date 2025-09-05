'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, Video, Calculator, MapPin, Download, ExternalLink, BookOpen, Lightbulb } from 'lucide-react';

export default function ResourcesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const headerRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Todos los Recursos' },
    { id: 'guides', name: 'Guías' },
    { id: 'tools', name: 'Herramientas' },
    { id: 'videos', name: 'Videos' },
    { id: 'local', name: 'Información Local' }
  ];

  const resources = [
    {
      id: 1,
      title: "Guía Completa para Propietarios",
      category: "guides",
      type: "PDF",
      icon: <FileText className="w-6 h-6" />,
      description: "Todo lo que necesitas saber sobre alquileres vacacionales en California.",
      downloadUrl: "#",
      size: "2.5 MB"
    },
    {
      id: 2,
      title: "Calculadora de Ingresos",
      category: "tools",
      type: "Herramienta",
      icon: <Calculator className="w-6 h-6" />,
      description: "Calcula el potencial de ingresos de tu propiedad vacacional.",
      downloadUrl: "#",
      size: "Online"
    },
    {
      id: 3,
      title: "Video: Preparando tu Propiedad",
      category: "videos",
      type: "Video",
      icon: <Video className="w-6 h-6" />,
      description: "Aprende cómo preparar tu propiedad para huéspedes.",
      downloadUrl: "#",
      size: "15 min"
    },
    {
      id: 4,
      title: "Atracciones en Cambria",
      category: "local",
      type: "Guía Local",
      icon: <MapPin className="w-6 h-6" />,
      description: "Las mejores actividades y restaurantes en Cambria.",
      downloadUrl: "#",
      size: "1.2 MB"
    },
    {
      id: 5,
      title: "Checklist de Limpieza",
      category: "guides",
      type: "PDF",
      icon: <FileText className="w-6 h-6" />,
      description: "Lista completa para mantener tu propiedad impecable.",
      downloadUrl: "#",
      size: "800 KB"
    },
    {
      id: 6,
      title: "Optimización de Precios",
      category: "tools",
      type: "Guía",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Estrategias para maximizar tus ingresos por noche.",
      downloadUrl: "#",
      size: "1.8 MB"
    },
    {
      id: 7,
      title: "Video: Marketing de Propiedades",
      category: "videos",
      type: "Video",
      icon: <Video className="w-6 h-6" />,
      description: "Cómo promocionar efectivamente tu alquiler vacacional.",
      downloadUrl: "#",
      size: "22 min"
    },
    {
      id: 8,
      title: "Restaurantes en Paso Robles",
      category: "local",
      type: "Guía Local",
      icon: <MapPin className="w-6 h-6" />,
      description: "Los mejores lugares para comer en la región vinícola.",
      downloadUrl: "#",
      size: "1.5 MB"
    }
  ];

  const faqs = [
    {
      question: "¿Cómo empiezo con mi propiedad vacacional?",
      answer: "Primero, descarga nuestra Guía Completa para Propietarios. Luego, usa nuestra Calculadora de Ingresos para estimar el potencial de tu propiedad. Finalmente, contáctanos para una consulta gratuita."
    },
    {
      question: "¿Qué documentos necesito?",
      answer: "Necesitarás escrituras de propiedad, permisos locales, seguros actualizados y documentación de cualquier HOA. Te ayudamos con todo el proceso."
    },
    {
      question: "¿Cuánto tiempo toma configurar una propiedad?",
      answer: "Típicamente entre 2-4 semanas, dependiendo de la preparación necesaria. Esto incluye fotografía profesional, listado optimizado y configuración inicial."
    },
    {
      question: "¿Qué incluye la gestión completa?",
      answer: "Incluye limpieza, mantenimiento, atención a huéspedes, gestión de reservas, optimización de precios y reportes mensuales detallados."
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

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
              Recursos y Herramientas
            </h1>
            <p className="text-xl lg:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Todo lo que necesitas para tener éxito con tu propiedad vacacional
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#486698] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <div
                key={resource.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#486698] text-white p-3 rounded-lg">
                      {resource.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {resource.size}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#486698] transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    {resource.description}
                  </p>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-[#486698] hover:bg-[#3a5280] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                      <Download size={16} />
                      <span>Descargar</span>
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <ExternalLink size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-[#E8F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
              Herramientas Destacadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utiliza nuestras herramientas especializadas para optimizar tu propiedad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-green-100 text-green-600 p-4 rounded-2xl">
                  <Calculator className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Calculadora de Ingresos</h3>
                  <p className="text-gray-600">Estima tus ganancias potenciales</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Ingresa los detalles de tu propiedad y obtén una estimación precisa de tus ingresos mensuales y anuales potenciales.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Usar Calculadora
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Consulta Personalizada</h3>
                  <p className="text-gray-600">Habla con nuestros expertos</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Programa una consulta gratuita con nuestros expertos para analizar el potencial específico de tu propiedad.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Respuestas a las preguntas más comunes sobre alquileres vacacionales
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#486698]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Necesitas más ayuda?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Nuestro equipo está aquí para apoyarte en cada paso del camino
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#486698] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Contactar Soporte
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#486698] font-semibold px-8 py-4 rounded-lg transition-all duration-300">
              Ver Más Recursos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

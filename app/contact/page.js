'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, User } from 'lucide-react';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'general'
  });
  const headerRef = useRef(null);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      details: "(559) 284-9848",
      subtitle: "Lunes a Viernes, 9:00 AM - 6:00 PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "info@guestequity.com",
      subtitle: "Respuesta en 24 horas"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Oficina Principal",
      details: "California Central Coast",
      subtitle: "Sirviendo toda California"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horarios",
      details: "Lun - Vie: 9:00 AM - 6:00 PM",
      subtitle: "Sáb - Dom: 10:00 AM - 4:00 PM"
    }
  ];

  const contactReasons = [
    { value: 'general', label: 'Consulta General' },
    { value: 'property', label: 'Gestión de Propiedad' },
    { value: 'booking', label: 'Reservación' },
    { value: 'support', label: 'Soporte Técnico' },
    { value: 'partnership', label: 'Asociación' }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add form submission logic here
  };

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
              Contáctanos
            </h1>
            <p className="text-xl lg:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Estamos aquí para ayudarte con todas tus necesidades de alquiler vacacional
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#486698] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-[#486698] font-semibold mb-1">
                  {info.details}
                </p>
                <p className="text-gray-600 text-sm">
                  {info.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-20 bg-[#E8F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#486698] mb-6">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo dentro de 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#486698] focus:border-transparent"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#486698] focus:border-transparent"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#486698] focus:border-transparent"
                        placeholder="(559) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contactReason" className="block text-sm font-medium text-gray-700 mb-2">
                      Motivo de Contacto
                    </label>
                    <select
                      id="contactReason"
                      name="contactReason"
                      value={formData.contactReason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#486698] focus:border-transparent"
                    >
                      {contactReasons.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#486698] focus:border-transparent"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#486698] focus:border-transparent"
                    placeholder="Cuéntanos más detalles sobre tu consulta..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#486698] hover:bg-[#3a5280] text-white font-semibold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#486698] mb-6">
                  Acciones Rápidas
                </h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-4 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-300">
                    <div className="bg-green-600 text-white p-3 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Llamar Ahora</div>
                      <div className="text-sm text-gray-600">Respuesta inmediata</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-300">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Agendar Consulta</div>
                      <div className="text-sm text-gray-600">Consulta gratuita de 30 min</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-300">
                    <div className="bg-purple-600 text-white p-3 rounded-lg">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Chat en Vivo</div>
                      <div className="text-sm text-gray-600">Disponible 9AM-6PM</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#486698] mb-6">
                  Horarios de Atención
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Lunes - Viernes</span>
                    <span className="font-semibold text-gray-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sábados</span>
                    <span className="font-semibold text-gray-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Domingos</span>
                    <span className="font-semibold text-gray-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-700">Emergencias</span>
                    <span className="font-semibold text-green-600">24/7 Disponible</span>
                  </div>
                </div>
              </div>
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
              Respuestas rápidas a las preguntas más comunes
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Cuál es el tiempo de respuesta típico?",
                answer: "Respondemos a todos los emails dentro de 24 horas. Para consultas urgentes, puedes llamarnos directamente durante horarios de oficina."
              },
              {
                question: "¿Ofrecen consultas gratuitas?",
                answer: "Sí, ofrecemos consultas gratuitas de 30 minutos para discutir el potencial de tu propiedad y nuestros servicios."
              },
              {
                question: "¿Atienden emergencias fuera del horario?",
                answer: "Sí, tenemos un servicio de emergencias 24/7 para huéspedes actuales y propietarios con propiedades bajo gestión."
              },
              {
                question: "¿En qué zonas de California operan?",
                answer: "Operamos principalmente en la Costa Central de California, incluyendo Cambria, Paso Robles, Big Sur, Hanford y áreas circundantes."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
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
    </div>
  );
}

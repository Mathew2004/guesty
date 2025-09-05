'use client';

import { useEffect, useRef, useState } from 'react';

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "We used Guest Equity for our trip to Cambria. It was the best decision we made. The team was extremely friendly and excellent at communicating every step of the way. Would absolutely book with them again!",
      author: "Sarah & Mike Johnson",
      location: "Cambria Trip"
    },
    {
      id: 2,
      text: "Love this hidden gem in Hanford! The house is beautiful, spotless, and equipped with everything you need in a quiet neighborhood minutes away from groceries, shopping, restaurants and an adorable downtown. Thank you to the hosts for putting their heart into this home!",
      author: "Emily Rodriguez",
      location: "Hanford Stay"
    },
    {
      id: 3,
      text: "Guest Equity has excellent customer service and locations. The rental properties that they represent are spotless and well maintained. This small business has grown so quickly the last few years and that is because they do such a great job of representing their customers and advertising the properties professionally.",
      author: "David Thompson",
      location: "Repeat Customer"
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
    <section ref={sectionRef} className="py-16 bg-[#E8F1F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-sm font-medium text-[#7B8FA1] tracking-wider uppercase mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[#486698] mb-6">
            What Our Guests Are Saying
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg className="w-12 h-12 text-[#486698] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow">
                  {testimonial.text}
                </blockquote>

                {/* Author */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-[#486698] mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied guests who have experienced exceptional stays with Guest Equity.
          </p>
          <button className="bg-[#486698] hover:bg-[#3a5280] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            Book Your Perfect Stay
          </button>
        </div>
      </div>
    </section>
  );
}

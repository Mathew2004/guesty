'use client';

import { useEffect, useRef, useState } from 'react';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function TestimonialsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

  const detailedTestimonials = [
    {
      id: 1,
      text: "We used Guest Equity for our trip to Cambria. It was the best decision we made. The team was extremely friendly and excellent at communicating every step of the way. The property was exactly as described, clean, and in the perfect location. The check-in process was seamless, and they were always available to answer any questions. Would absolutely book with them again!",
      author: "Sarah & Mike Johnson",
      location: "Cambria Beach House",
      date: "August 2024",
      rating: 5,
      stayDuration: "5 nights",
      propertyType: "Beach House"
    },
    {
      id: 2,
      text: "Love this hidden gem in Hanford! The house is beautiful, spotless, and equipped with everything you need in a quiet neighborhood minutes away from groceries, shopping, restaurants and an adorable downtown. The attention to detail was incredible - from the welcome basket to the local recommendations. Thank you to the hosts for putting their heart into this home!",
      author: "Emily Rodriguez",
      location: "Hanford Family Home",
      date: "July 2024",
      rating: 5,
      stayDuration: "3 nights",
      propertyType: "Family Home"
    },
    {
      id: 3,
      text: "Guest Equity has excellent customer service and locations. The rental properties that they represent are spotless and well maintained. This small business has grown so quickly the last few years and that is because they do such a great job of representing their customers and advertising the properties professionally. I've stayed at multiple properties and each one exceeded my expectations.",
      author: "David Thompson",
      location: "Multiple Properties",
      date: "Ongoing since 2022",
      rating: 5,
      stayDuration: "Regular Guest",
      propertyType: "Various"
    },
    {
      id: 4,
      text: "Our family reunion was made perfect by Guest Equity's amazing property in Paso Robles. The house was spacious enough for all 12 of us, had a beautiful outdoor area for gatherings, and was located perfectly for wine country exploration. The team helped us with local recommendations and even arranged for special amenities. Truly exceptional service!",
      author: "Maria & Carlos Gonzalez",
      location: "Paso Robles Wine Country",
      date: "September 2024",
      rating: 5,
      stayDuration: "4 nights",
      propertyType: "Large Family Home"
    },
    {
      id: 5,
      text: "As a business traveler, I need reliable, comfortable accommodations. Guest Equity's properties consistently deliver. Fast WiFi, dedicated workspace, quiet environment, and professional service. I've been using their properties for my monthly California trips for over a year now. Highly recommend for business travelers!",
      author: "Jennifer Chen",
      location: "Various Business Properties",
      date: "Regular since 2023",
      rating: 5,
      stayDuration: "Monthly Stays",
      propertyType: "Business-Friendly"
    },
    {
      id: 6,
      text: "Our romantic getaway to Big Sur was absolutely magical, thanks to Guest Equity. The cabin was cozy, private, and had the most incredible views. They surprised us with champagne and chocolates for our anniversary. The personal touches and attention to detail made this trip unforgettable. We're already planning our next stay!",
      author: "Robert & Lisa Williams",
      location: "Big Sur Mountain Cabin",
      date: "October 2024",
      rating: 5,
      stayDuration: "2 nights",
      propertyType: "Mountain Cabin"
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
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
              Guest Stories
            </h1>
            <p className="text-xl lg:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Discover what makes Guest Equity special through the voices of our valued guests
            </p>
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm opacity-80">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-80">Return Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <TestimonialsSection />

      {/* Detailed Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
              Detailed Guest Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read comprehensive reviews from our guests about their experiences
            </p>
          </div>

          <div className="space-y-12">
            {detailedTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-gray-600 font-medium">
                        {testimonial.rating}.0 out of 5
                      </span>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-6">
                      <div className="font-semibold text-[#486698] text-base">
                        {testimonial.author}
                      </div>
                      <div>{testimonial.location}</div>
                      <div>{testimonial.date}</div>
                      <div>{testimonial.stayDuration}</div>
                      <div className="bg-[#486698] text-white px-2 py-1 rounded">
                        {testimonial.propertyType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#E8F9FF]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#486698] mb-6">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of satisfied guests and experience the Guest Equity difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#486698] hover:bg-[#3a5280] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Browse Properties
            </button>
            <button className="border-2 border-[#486698] text-[#486698] hover:bg-[#486698] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

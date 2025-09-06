'use client';

import ImageSlider from '@/components/ImageSlider';
import FeaturedHotels from '@/components/FeaturedHotels';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <div className="relative mb-8">
        {/* <ImageSlider /> */}
        <Hero />
      </div>
      {/* <Hero /> */}


      {/* About Section */}
      <AboutSection />

      {/* Featured Hotels Section */}
      <FeaturedHotels />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToAction />

    </div>
  );
}
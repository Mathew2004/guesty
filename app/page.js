'use client';

import ImageSlider from '@/components/ImageSlider';
import FeaturedHotels from '@/components/FeaturedHotels';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToAction from '@/components/CallToAction';
import SearchForm from '@/components/SearchForm';
import WhatSetsUsApart from '@/components/WhatSetsUsApart';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <div className="relative">
        {/* <ImageSlider /> */}
        <Hero />

        {/* Search Form */}
        <div className={`w-full z-[20] hidden md:block absolute -bottom-8 transition-all duration-1000 delay-300 `}>
          <SearchForm compact={false} isFrame={true} />
        </div>
        <div className='md:hidden relative z-[10]'>
          <SearchForm compact={false} />
        </div>
      </div>
      {/* <Hero /> */}


      {/* About Section */}
      <AboutSection />

      {/* Featured Hotels Section */}
      <FeaturedHotels />

      {/* What Sets Us Apart Section */}
      <WhatSetsUsApart />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToAction />

    </div>
  );
}
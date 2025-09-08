'use client';

import React from 'react';

const WhatSetsUsApart = () => {
  const features = [
    {
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Amazing Rates",
      description: "Book directly and get the best prices!"
    },
    {
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Peace of Mind",
      description: "Have questions? We're here for you 7 days a week, before, during, and after your stay."
    },
    {
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality You Can Count On",
      description: "Every property is fully stocked and professionally cleaned for a smooth, stress-free stay."
    }
  ];

return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ fontFamily: '"Playfair Display", serif' }}>
        <div className="max-w-8xl mx-auto px-4 flex md:flex-row flex-col justify-center space-x-2 md:space-y-16">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-semibold text-[#486698] mb-4">
                    What Sets Us Apart
                </h2>
            </div>
            {/* Features Grid */}
            <div className="flex flex-col space-y-12">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-6 sm:space-x-8">
                        <div className="flex-shrink-0">
                            {feature.icon}
                        </div>
                        <div className='flex flex-col'>
                            <h3 className="text-2xl sm:text-3xl font-normal" style={{ color: '#3A4F6A' }}>
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-base sm:text-lg text-gray-600" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
};

export default WhatSetsUsApart;

'use client';

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { testimonials } from '@/data/testimonials';

// Import Slick Carousel CSS (will need to be imported in layout.tsx)
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">What People Say</h2>
      
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="px-4 focus:outline-none">
            <div className="text-center mb-6">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover rounded-full border-4 border-primary-100 dark:border-primary-900"
                />
              </div>
              
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating 
                        ? 'text-yellow-400' 
                        : 'text-secondary-300 dark:text-secondary-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <h3 className="text-xl font-bold dark:text-white">{testimonial.name}</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
            
            <blockquote className="relative">
              <svg
                className="absolute top-0 left-0 w-8 h-8 text-primary-200 dark:text-primary-900 -mt-3 -ml-4 opacity-50"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <p className="text-lg text-secondary-700 dark:text-secondary-300 italic px-8 md:px-12">
                "{testimonial.content}"
              </p>
            </blockquote>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;

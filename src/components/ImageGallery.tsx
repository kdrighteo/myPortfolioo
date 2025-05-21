'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type ImageGalleryProps = {
  images: string[];
  altPrefix: string;
};

const ImageGallery = ({ images, altPrefix }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImageIndex(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : 0
      );
    } else {
      setSelectedImageIndex(prev => 
        prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : 0
      );
    }
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };
  
  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Thumbnails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative h-64 w-full rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image}
              alt={`${altPrefix} screenshot ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-2 text-white hover:text-primary-400 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Previous button */}
            <button
              className="absolute left-6 p-3 text-white hover:text-primary-400 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next button */}
            <button
              className="absolute right-6 p-3 text-white hover:text-primary-400 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Current image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-full max-h-[80vh] mx-6 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[selectedImageIndex]}
                  alt={`${altPrefix} screenshot ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1800px) 100vw, 1800px"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;

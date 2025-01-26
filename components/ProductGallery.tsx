'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProductGalleryProps {
  imagePrincipale: string;
  imagesSecondaires: string[];
}

export default function ProductGallery({ imagePrincipale, imagesSecondaires }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const allImages = [imagePrincipale, ...imagesSecondaires];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Image principale */}
        <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
          <img
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${imagePrincipale}`}
            alt="Image principale du produit"
            className="h-[300px] w-full object-contain bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              setCurrentImageIndex(0);
              setIsModalOpen(true);
            }}
          />
        </div>

        {/* Grid d'images secondaires */}
        <div className="grid grid-cols-2 gap-4">
          {imagesSecondaires.map((image, index) => (
            <div key={index} className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${image}`}
                alt={`Image ${index + 1} du produit`}
                className="h-[140px] w-full object-contain bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal de galerie plein écran */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          
          <button
            onClick={previousImage}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          
          <img
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${allImages[currentImageIndex]}`}
            alt={`Image ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}

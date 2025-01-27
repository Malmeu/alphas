'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProductGalleryProps {
  imagePrincipale: string;
  imagesSecondaires: string[];
}

export default function ProductGallery({ imagePrincipale, imagesSecondaires = [] }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const allImages = [imagePrincipale, ...imagesSecondaires];
  const [selectedImage, setSelectedImage] = useState(imagePrincipale);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Gestionnaire de la touche Échap
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le défilement du body quand la modal est ouverte
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Rétablir le défilement quand la modal est fermée
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div className="w-full overflow-hidden rounded-lg bg-white">
        <img
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${selectedImage}`}
          alt="Image principale du produit"
          className="h-[400px] w-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => {
            setCurrentImageIndex(allImages.indexOf(selectedImage));
            setIsModalOpen(true);
          }}
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.png';
          }}
        />
      </div>

      {/* Miniatures */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${
              selectedImage === image ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${image}`}
              alt={`Image ${index + 1} du produit`}
              className="h-20 w-20 object-contain bg-white"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.png';
              }}
            />
          </button>
        ))}
      </div>

      {/* Modal de galerie plein écran */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={(e) => {
            // Fermer seulement si on clique sur l'arrière-plan
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Fermer la galerie"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          
          <button
            onClick={previousImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Image précédente"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          
          <img
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${allImages[currentImageIndex]}`}
            alt={`Image ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.png';
            }}
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Image suivante"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
}

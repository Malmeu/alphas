'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProductGalleryProps {
  imagePrincipale: string;
  imagesSecondaires: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ imagePrincipale, imagesSecondaires = [] }) => {
  const allImages = [imagePrincipale, ...imagesSecondaires];
  const [selectedImage, setSelectedImage] = useState(imagePrincipale);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentExtension, setCurrentExtension] = useState<'png' | 'jpg'>('png');

  const getImageUrl = (path: string) => {
    if (!path) return '/placeholder.png';
    if (path.startsWith('http')) return path;
    
    // Si le chemin contient déjà une extension, on la garde
    if (path.includes('.')) {
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}/storage/v1/object/public/products/${path}`;
    }
    
    // Sinon on utilise l'extension courante
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}/storage/v1/object/public/products/${path}.${currentExtension}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    
    // Si l'image en PNG échoue, on essaie en JPG
    if (currentExtension === 'png') {
      setCurrentExtension('jpg');
      return;
    }
    
    // Si les deux extensions ont échoué, on affiche le placeholder
    target.src = '/placeholder.png';
    setImageError(true);
    setImageLoaded(false);
    setShowZoom(false);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      setImageLoaded(true);
      setImageError(false);
    } else {
      handleImageError(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageLoaded || imageError) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  useEffect(() => {
    setCurrentExtension('png');
    setImageLoaded(false);
    setImageError(false);
  }, [selectedImage]);

  return React.createElement("div", { className: "flex flex-col gap-4" },
    // Image principale avec zoom au survol
    React.createElement("div", {
      className: `relative w-full h-[400px] overflow-hidden rounded-lg bg-white ${!imageError && imageLoaded ? 'cursor-zoom-in' : ''}`,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => !imageError && imageLoaded && setShowZoom(true),
      onMouseLeave: () => setShowZoom(false)
    },
      React.createElement("img", {
        key: `${selectedImage}-${currentExtension}`, // Force le rechargement quand l'extension change
        src: getImageUrl(selectedImage),
        alt: "Image principale du produit",
        className: "w-full h-full object-contain",
        onLoad: handleImageLoad,
        onError: handleImageError
      }),
      !imageError && imageLoaded && showZoom && React.createElement("div", {
        className: "absolute inset-0 bg-contain pointer-events-none",
        style: {
          backgroundImage: `url(${getImageUrl(selectedImage)})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundSize: '200%',
          backgroundRepeat: 'no-repeat',
          zIndex: 10
        }
      })
    ),

    // Miniatures
    React.createElement("div", { className: "flex gap-4 overflow-x-auto pb-2" },
      allImages.map((image, index) => 
        React.createElement("button", {
          key: index,
          onClick: () => {
            setSelectedImage(image);
          },
          className: `flex-shrink-0 rounded-lg overflow-hidden border-2 ${
            selectedImage === image ? 'border-primary' : 'border-transparent'
          }`
        },
          React.createElement("img", {
            src: getImageUrl(image),
            alt: `Image ${index + 1} du produit`,
            className: "h-20 w-20 object-contain bg-white",
            onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.currentTarget;
              if (currentExtension === 'png') {
                setCurrentExtension('jpg');
                return;
              }
              target.src = '/placeholder.png';
            }
          })
        )
      )
    )
  );
};

export default ProductGallery;

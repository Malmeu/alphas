'use client';

import React, { useState } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return React.createElement("div", { className: "flex flex-col gap-4" },
    // Image principale avec zoom au survol
    React.createElement("div", {
      className: "relative w-full h-[400px] overflow-hidden rounded-lg bg-white",
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setShowZoom(true),
      onMouseLeave: () => setShowZoom(false)
    },
      React.createElement("img", {
        src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${selectedImage}`,
        alt: "Image principale du produit",
        className: "w-full h-full object-contain",
        onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.currentTarget;
          target.src = '/images/placeholder.png';
        }
      }),
      showZoom && React.createElement("div", {
        className: "absolute inset-0 bg-contain pointer-events-none",
        style: {
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${selectedImage})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundSize: '200%',
          backgroundRepeat: 'no-repeat'
        }
      })
    ),

    // Miniatures
    React.createElement("div", { className: "flex gap-4 overflow-x-auto pb-2" },
      allImages.map((image, index) => 
        React.createElement("button", {
          key: index,
          onClick: () => setSelectedImage(image),
          className: `flex-shrink-0 rounded-lg overflow-hidden border-2 ${
            selectedImage === image ? 'border-primary' : 'border-transparent'
          }`
        },
          React.createElement("img", {
            src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${image}`,
            alt: `Image ${index + 1} du produit`,
            className: "h-20 w-20 object-contain bg-white",
            onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.currentTarget;
              target.src = '/images/placeholder.png';
            }
          })
        )
      )
    ),

    // Modal de galerie plein écran
    // React.createElement("div", {
    //   className: "fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
    // },
    //   React.createElement("button", {
    //     onClick: () => setIsModalOpen(false),
    //     className: "absolute top-4 right-4 text-white hover:text-gray-300 z-50 bg-black/50 p-2 rounded-full"
    //   },
    //     React.createElement(XMarkIcon, { className: "h-8 w-8" })
    //   ),
    //   React.createElement("div", { className: "relative max-w-4xl max-h-[80vh] w-full" },
    //     React.createElement("img", {
    //       src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${allImages[currentImageIndex]}`,
    //       alt: `Image ${currentImageIndex + 1}`,
    //       className: "w-full h-full object-contain"
    //     }),
    //     // Boutons de navigation
    //     allImages.length > 1 && React.createElement(React.Fragment, null,
    //       React.createElement("button", {
    //         onClick: (e) => {
    //           e.stopPropagation();
    //           previousImage();
    //         },
    //         className: "absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
    //       },
    //         React.createElement(ChevronLeftIcon, { className: "h-8 w-8" })
    //       ),
    //       React.createElement("button", {
    //         onClick: (e) => {
    //           e.stopPropagation();
    //           nextImage();
    //         },
    //         className: "absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
    //       },
    //         React.createElement(ChevronRightIcon, { className: "h-8 w-8" })
    //       )
    //     )
    //   )
    // )
  );
};

export default ProductGallery;

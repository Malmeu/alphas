'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const brands = [
  { name: 'Marque 1', image: '/image_marques/F427.png', href: '/marques/verder' },
  { name: 'Marque 2', image: '/image_marques/F427 (2).png', href: '/marques/someflu' },
  { name: 'Marque 3', image: '/image_marques/F427 (3).png', href: '/marques/pcm' },
  { name: 'Marque 4', image: '/image_marques/F427 (4).png', href: '/marques/flowserve' },
  { name: 'Marque 5', image: '/image_marques/F427 (5).png', href: '/marques/flux' },
  { name: 'Marque 6', image: '/image_marques/F427 (6).png', href: '/marques/oflow' },
  { name: 'Marque 7', image: '/image_marques/F427 (7).png', href: '/marques/al-dewatering' },
  { name: 'Marque 8', image: '/image_marques/F427 (8).png', href: '/marques/al-fire' },
];

export default function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Nombre de marques à afficher selon la taille de l'écran
  const getVisibleBrands = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 5; // xl
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 3; // md
      if (window.innerWidth >= 640) return 2; // sm
      return 1; // xs
    }
    return 4; // Valeur par défaut
  };

  const [visibleBrands, setVisibleBrands] = useState(getVisibleBrands());

  // Mettre à jour le nombre de marques visibles lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setVisibleBrands(getVisibleBrands());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => 
        current === brands.length - visibleBrands ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleBrands]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((current) => 
      current === brands.length - visibleBrands ? 0 : current + 1
    );
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((current) => 
      current === 0 ? brands.length - visibleBrands : current - 1
    );
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative overflow-hidden">
        {/* Contrôles */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors duration-200"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors duration-200"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Carrousel */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleBrands)}%)` }}
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 px-4"
            >
              <Link 
                href={brand.href}
                className="group block relative aspect-[3/2] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={200}
                    height={100}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: brands.length - visibleBrands + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'
              }`}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

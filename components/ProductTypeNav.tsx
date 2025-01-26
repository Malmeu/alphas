'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const productTypes = [
  { name: 'Pompes Centrifuges', href: '/produits?type=Pompes Centrifuges' },
  { name: 'Pompes Volumetriques', href: '/produits?type=Pompes Volumetriques' },
  { name: 'Pompes vide-fut', href: '/produits?type=Pompes-vide-fut' },
  { name: 'Anti-incendie', href: '/produits?type=Anti-incendie' },
  { name: 'Moto-pompes', href: '/produits?type=Moto-pompes' },
  { name: 'Anti-belier', href: '/produits?type=Anti-belier' },
  { name: 'Station de relevage', href: '/produits?type=Station-de-relevage' },
  { name: "Stations d'épuration", href: '/produits?type=Stations-d-epuration' },
];

function ProductTypeNavContent() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');

  return (
    <nav className="bg-primary">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between overflow-x-auto">
        {productTypes.map((type) => (
          <Link
            key={type.name}
            href={type.href}
            className={`px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark whitespace-nowrap ${
              currentType === type.name ? 'bg-primary-dark' : ''
            }`}
          >
            {type.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function ProductTypeNav() {
  return (
    <Suspense fallback={<div className="h-12 bg-primary animate-pulse" />}>
      <ProductTypeNavContent />
    </Suspense>
  );
}

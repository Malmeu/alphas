'use client';

import Link from 'next/link';
import { Fragment } from 'react';

const products = [
  {
    name: 'Pompes Centrifuges',
    href: '/produits?type=Pompes centrifuges'
  },
  {
    name: 'Pompes Volumetriques',
    href: '/produits?type=Pompes-volumetriques'
  },
  {
    name: 'Pompes vide-fut',
    href: '/produits?type=Pompes vide-fut'
  },
  {
    name: 'Anti-incendie',
    href: '/produits?type=anti-incendie'
  },
  {
    name: 'Moto-pompes',
    href: '/produits?type=Moto-pompes'
  },
  {
    name: 'Anti-belier',
    href: '/produits?type=Anti-belier'
  },
  {
    name: 'Station de relevage',
    href: '/produits?type=Station-de-relevage'
  },
  {
    name: 'Stations d\'épuration',
    href: '/produits?type=Stations-d-epuration'
  }
];

export default function NavMenu() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center divide-x divide-white/30">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap transition-colors text-white"
            >
              {product.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

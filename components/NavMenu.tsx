'use client';

import Link from 'next/link';
import { Fragment } from 'react';

const products = [
  'Pompes Centrifuges',
  'Pompes Volumetriques',
  'Pompes vide fût',
  'Anti incendie',
  'Moto pompes',
  'Anti bélier',
  'Stations de relevage',
  'Stations d\'épuration',
];

export default function NavMenu() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center divide-x divide-white/30">
          {products.map((product) => (
            <Link
              key={product}
              href={`/products/${product.toLowerCase().replace(/ /g, '-')}`}
              className="text-white text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap transition-colors"
            >
              {product}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

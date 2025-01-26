'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produits/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
        {/* Image */}
        <div className="aspect-w-4 aspect-h-3 overflow-hidden">
          {product.image_principale ? (
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image_principale}`}
              alt={product.nom}
              className="h-48 w-full object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center bg-gray-100">
              <span className="text-gray-400">Pas d'image</span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.nom}</h3>
          
          {/* Secteurs d'activité */}
          <div className="mb-3 flex flex-wrap gap-2">
            {product.secteurs_activite.map((secteur) => (
              <span
                key={secteur}
                className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                {secteur}
              </span>
            ))}
          </div>

          {/* Description courte */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description || 'Aucune description disponible'}
          </p>

          {/* Marque et Type */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>{product.marque}</span>
            <span>{product.type_produit}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

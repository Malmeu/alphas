'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produits/${product.id}`}>
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image avec overlay au hover */}
        <div className="relative aspect-w-4 aspect-h-3">
          {product.image_principale ? (
            <>
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image_principale}`}
                alt={product.nom}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="flex h-56 w-full items-center justify-center bg-gray-50">
              <span className="text-gray-400">Pas d'image</span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Type de produit */}
          <div className="mb-2">
            <span className="text-sm font-medium text-primary/80">
              {product.type_produit}
            </span>
          </div>

          {/* Titre */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
            {product.nom}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
            {product.description || 'Aucune description disponible'}
          </p>

          {/* Secteurs d'activité */}
          <div className="flex flex-wrap gap-2">
            {product.secteurs_activite.slice(0, 3).map((secteur) => (
              <span
                key={secteur}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/5 text-primary"
              >
                {secteur}
              </span>
            ))}
            {product.secteurs_activite.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{product.secteurs_activite.length - 3}
              </span>
            )}
          </div>

          {/* Bouton Voir détails */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
              Voir les détails
              <svg
                className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

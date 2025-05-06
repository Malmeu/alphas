'use client';

import Script from 'next/script';
import { Product } from '@/types/product';

interface ProductSchemaProps {
  product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const baseUrl = 'https://www.alphaspompes.com';
  
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nom,
    description: product.description || 'Pompe industrielle de haute qualité ALPHAS POMPES',
    image: product.image_principale 
      ? `${baseUrl}${product.image_principale}` 
      : `${baseUrl}/images/placeholder.png`,
    brand: {
      '@type': 'Brand',
      name: product.marque
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.marque
    },
    category: product.type_produit,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'DZD',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      url: `${baseUrl}/produits/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: 'ALPHAS POMPES'
      }
    }
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

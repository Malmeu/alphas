'use client';

import ProductPage from '@/components/ProductPage';

const products = [
  {
    titre: 'Pompe Vide-Fût Standard',
    description: 'Solution économique pour le transfert de produits chimiques',
    image: '/images/pompes/videfut-standard.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe Vide-Fût ATEX',
    description: 'Version antidéflagrante pour zones dangereuses',
    image: '/images/pompes/videfut-atex.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe Vide-Fût Sanitaire',
    description: 'Pour les applications alimentaires et pharmaceutiques',
    image: '/images/pompes/videfut-sanitaire.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe Vide-Fût Portable',
    description: 'Solution mobile et légère',
    image: '/images/pompes/videfut-portable.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  }
];

export default function PompesVideFut() {
  return (
    <ProductPage
      title="Pompes Vide-Fût"
      description="Explorez notre gamme de pompes vide-fût, spécialement conçues pour un transfert efficace et sécurisé des liquides en fûts et conteneurs."
      bannerImage="/images/banner-videfut.jpg"
      products={products}
    />
  );
}

'use client';

import ProductPage from '../../components/ProductPage';

const products = [
  {
    titre: 'Anti-Bélier à Vessie',
    description: 'Protection optimale pour les réseaux de distribution',
    image: '/images/pompes/belier-vessie.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  },
  {
    titre: 'Anti-Bélier à Air Comprimé',
    description: 'Solution économique pour les installations simples',
    image: '/images/pompes/belier-air.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  },
  {
    titre: 'Anti-Bélier à Ressort',
    description: 'Idéal pour les petites installations',
    image: '/images/pompes/belier-ressort.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  },
  {
    titre: 'Réservoir Anti-Bélier',
    description: 'Pour les grands réseaux de distribution',
    image: '/images/pompes/belier-reservoir.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  }
];

export default function AntiBelier() {
  return (
    <ProductPage
      title="Anti-Bélier"
      description="Découvrez nos solutions anti-bélier, essentielles pour protéger vos installations contre les coups de bélier et les variations de pression."
      bannerImage="/images/banner-belier.jpg"
      products={products}
    />
  );
}

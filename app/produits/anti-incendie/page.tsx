'use client';

import ProductPage from '../../components/ProductPage';

const products = [
  {
    titre: 'Pompe Jockey',
    description: 'Maintien de la pression dans les réseaux sprinklers',
    image: '/images/pompes/jockey.jpg',
    domaines: ['Industriel', 'Bâtiment', 'Protection incendie']
  },
  {
    titre: 'Pompe Principale Électrique',
    description: 'Solution principale pour les systèmes anti-incendie',
    image: '/images/pompes/principale-electrique.jpg',
    domaines: ['Industriel', 'Bâtiment', 'Protection incendie']
  },
  {
    titre: 'Pompe Diesel',
    description: 'Système de secours autonome',
    image: '/images/pompes/diesel.jpg',
    domaines: ['Industriel', 'Bâtiment', 'Protection incendie']
  },
  {
    titre: 'Groupes Surpresseurs',
    description: 'Solutions complètes pour réseaux RIA et sprinklers',
    image: '/images/pompes/surpresseurs.jpg',
    domaines: ['Industriel', 'Bâtiment', 'Protection incendie']
  }
];

export default function AntiIncendie() {
  return (
    <ProductPage
      title="Anti-Incendie"
      description="Découvrez nos solutions de pompage anti-incendie, conçues pour assurer une protection fiable et efficace contre les incendies."
      bannerImage="/images/banner-incendie.jpg"
      products={products}
    />
  );
}

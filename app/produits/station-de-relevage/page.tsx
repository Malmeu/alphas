'use client';

import ProductPage from '../../components/ProductPage';

const products = [
  {
    titre: 'Station Simple Pompe',
    description: 'Solution économique pour les petites installations',
    image: '/images/pompes/relevage-simple.jpg',
    domaines: ['Eau et environnement', 'Bâtiment', 'Industriel']
  },
  {
    titre: 'Station Double Pompe',
    description: 'Pour une sécurité de fonctionnement maximale',
    image: '/images/pompes/relevage-double.jpg',
    domaines: ['Eau et environnement', 'Bâtiment', 'Industriel']
  },
  {
    titre: 'Station Eaux Chargées',
    description: 'Spécialement conçue pour les effluents difficiles',
    image: '/images/pompes/relevage-chargees.jpg',
    domaines: ['Eau et environnement', 'Bâtiment', 'Industriel']
  },
  {
    titre: 'Station Eaux Pluviales',
    description: 'Gestion optimale des eaux de pluie',
    image: '/images/pompes/relevage-pluviales.jpg',
    domaines: ['Eau et environnement', 'Bâtiment', 'Industriel']
  }
];

export default function StationsRelevage() {
  return (
    <ProductPage
      title="Stations de Relevage"
      description="Découvrez nos stations de relevage, solutions complètes pour le transfert des eaux usées et effluents."
      bannerImage="/images/banner-relevage.jpg"
      products={products}
    />
  );
}

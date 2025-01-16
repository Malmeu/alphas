'use client';

import ProductPage from '../../components/ProductPage';

const products = [
  {
    titre: 'Station Compacte',
    description: 'Solution tout-en-un pour petites collectivités',
    image: '/images/pompes/epuration-compacte.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  },
  {
    titre: 'Station Industrielle',
    description: 'Traitement des effluents industriels',
    image: '/images/pompes/epuration-industrielle.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  },
  {
    titre: 'Station Biologique',
    description: 'Traitement écologique des eaux usées',
    image: '/images/pompes/epuration-biologique.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  },
  {
    titre: 'Station Modulaire',
    description: 'Solution évolutive selon vos besoins',
    image: '/images/pompes/epuration-modulaire.jpg',
    domaines: ['Eau et environnement', 'Industriel']
  }
];

export default function StationsEpuration() {
  return (
    <ProductPage
      title="Stations d'Épuration"
      description="Explorez nos solutions de traitement des eaux usées, conçues pour répondre aux normes environnementales les plus strictes."
      bannerImage="/images/banner-epuration.jpg"
      products={products}
    />
  );
}

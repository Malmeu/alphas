'use client';

import ProductPage from '../../components/ProductPage';

const products = [
  {
    titre: 'Motopompe Essence',
    description: 'Solution portable pour les chantiers et l\'irrigation',
    image: '/images/pompes/motopompe-essence.jpg',
    domaines: ['Agriculture', 'Bâtiment', 'Industriel']
  },
  {
    titre: 'Motopompe Diesel',
    description: 'Pour les applications intensives nécessitant une grande autonomie',
    image: '/images/pompes/motopompe-diesel.jpg',
    domaines: ['Agriculture', 'Bâtiment', 'Industriel']
  },
  {
    titre: 'Motopompe Haute Pression',
    description: 'Idéale pour l\'irrigation et le nettoyage haute pression',
    image: '/images/pompes/motopompe-hp.jpg',
    domaines: ['Agriculture', 'Bâtiment', 'Industriel']
  },
  {
    titre: 'Motopompe Eaux Chargées',
    description: 'Spécialement conçue pour les eaux boueuses et chargées',
    image: '/images/pompes/motopompe-chargees.jpg',
    domaines: ['Agriculture', 'Bâtiment', 'Industriel']
  }
];

export default function Motopompes() {
  return (
    <ProductPage
      title="Moto-pompes"
      description="Explorez notre gamme de motopompes, alliant autonomie et performance pour vos besoins de pompage mobile."
      bannerImage="/images/banner-motopompes.jpg"
      products={products}
    />
  );
}

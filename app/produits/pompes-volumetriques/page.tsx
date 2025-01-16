'use client';

import ProductPage from '../../components/ProductPage';

const products = [
  {
    titre: 'Pompe à Engrenages',
    description: 'Solution robuste pour le transfert de fluides visqueux',
    image: '/images/pompes/engrenages.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe à Lobes',
    description: 'Idéale pour les applications nécessitant une manipulation délicate des fluides',
    image: '/images/pompes/lobes.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe à Vis',
    description: 'Performance optimale pour les fluides à haute viscosité',
    image: '/images/pompes/vis.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe à Palettes',
    description: 'Excellente solution pour les transferts à débit constant',
    image: '/images/pompes/palettes.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  },
  {
    titre: 'Pompe à Piston',
    description: 'Parfaite pour les applications à haute pression',
    image: '/images/pompes/piston.jpg',
    domaines: ['Hydrocarbure', 'Agroalimentaire', 'Cosmétique', 'Pharmaceutique', 'Industriel']
  }
];

export default function PompesVolumetriques() {
  return (
    <ProductPage
      title="Pompes Volumétriques"
      description="Découvrez notre gamme de pompes volumétriques, conçues pour offrir une précision exceptionnelle et une fiabilité à toute épreuve."
      bannerImage="/images/banner-volumetriques.jpg"
      products={products}
    />
  );
}

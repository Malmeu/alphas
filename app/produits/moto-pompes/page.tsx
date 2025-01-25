'use client';

import ProductPage from '@/components/ProductPage';

const product = {
  id: 'moto-pompe-1',
  nom: 'Moto-pompe Série MP',
  marque: 'ALPHAS',
  type_produit: 'Moto-pompe',
  technologie: 'Diesel',
  serie: 'MP',
  modele: 'MP-200',
  description: 'La moto-pompe série MP est une solution autonome idéale pour les applications mobiles nécessitant un pompage efficace. Équipée d\'un moteur diesel robuste, elle assure une performance fiable dans les conditions les plus exigeantes.',
  domaines_activite: ['Industrie', 'Bâtiment et TP', 'Mine & Carrière'],
  domaines_application: [
    'Pompage de chantier',
    'Irrigation mobile',
    'Intervention d\'urgence',
    'Applications temporaires'
  ],
  debit: '10 à 100 m³/h',
  hauteur_refoulement: 'Jusqu\'à 40m',
  viscosite: 'Eau claire à légèrement chargée',
  type_entrainement: 'Moteur diesel',
  compatibilite: 'Eau, eaux chargées',
  image_principale: '/moto-pompes/mp-200-main.jpg',
  images_secondaires: [
    '/moto-pompes/mp-200-1.jpg',
    '/moto-pompes/mp-200-2.jpg',
    '/moto-pompes/mp-200-3.jpg'
  ],
  avantages: [
    'Mobilité totale',
    'Autonomie importante',
    'Robustesse à toute épreuve',
    'Maintenance simplifiée',
    'Démarrage rapide'
  ]
};

export default function MotoPompes() {
  return <ProductPage product={product} />;
}

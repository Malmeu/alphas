'use client';

import ProductPage from '@/components/ProductPage';

const product = {
  id: 'station-epuration-1',
  nom: 'Station d\'épuration Série 300',
  marque: 'ALPHAS',
  type_produit: 'Station d\'épuration',
  technologie: 'Compacte',
  serie: '300',
  modele: 'SC-300',
  description: 'La station d\'épuration de la série 300 est spécialement conçue pour le traitement efficace des eaux usées dans les petites collectivités et les installations industrielles. Elle offre une solution complète et performante pour la gestion des effluents.',
  domaines_activite: ['Industrie', 'Eau & Environnement', 'Bâtiment et TP'],
  domaines_application: [
    'Traitement des eaux usées domestiques',
    'Traitement des effluents industriels',
    'Recyclage et réutilisation des eaux',
    'Conformité aux normes environnementales'
  ],
  debit: '5 à 50 m³/h',
  hauteur_refoulement: 'Selon configuration',
  viscosite: 'NA',
  type_entrainement: 'Électrique',
  compatibilite: 'Eaux usées domestiques et industrielles',
  image_principale: '/stations/station-300-main.jpg',
  images_secondaires: [
    '/stations/station-300-1.jpg',
    '/stations/station-300-2.jpg',
    '/stations/station-300-3.jpg'
  ],
  avantages: [
    'Conception compacte et modulaire',
    'Installation rapide et simple',
    'Maintenance réduite',
    'Performance épuratoire élevée',
    'Conformité aux normes environnementales'
  ]
};

export default function StationsEpuration() {
  return <ProductPage product={product} />;
}

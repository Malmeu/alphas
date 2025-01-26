export type SecteurActivite =
  | 'Industrie'
  | 'Pharmacies & Cosmetique'
  | 'Anti-incendie'
  | 'Agroalimentaire'
  | 'Agriculture & Irrigation'
  | 'Eau & Environnement'
  | 'Mines & Carriere'
  | 'Batiment & TP'
  | 'Gaz & Oil'
  | 'Service Après-Vente';

export type Marque = 
  | 'OFLOW'
  | 'AL DEWATERING'
  | 'AL FIRE'
  | 'FLUX'
  | 'VERDER'
  | 'SOMEFLU'
  | 'FLOWSERVE'
  | 'PCM';

export type TypePompe =
  | 'Pompes Centrifuges'
  | 'Pompes Volumetriques'
  | 'Pompes vide-fut'
  | 'Anti-incendie'
  | 'Moto-pompes'
  | 'Anti-belier'
  | 'Station de relevage'
  | "Stations d'épuration";

export interface CaracteristiqueTechnique {
  nom: string;
  valeur: string;
}

export interface Product {
  id?: string;
  nom: string;
  type_produit: TypePompe;
  technologie: string;
  serie: string;
  modele: string;
  marque: Marque;
  description: string;
  secteurs_activite: SecteurActivite[];
  domaines_application: string;
  debit: string;
  hauteur_refoulement: string;
  viscosite: string;
  type_entrainement: string;
  compatibilite: string;
  caracteristiques_supplementaires: CaracteristiqueTechnique[];
  avantages: string;
  image_principale: string;
  images_secondaires?: string[];
  created_at?: string;
  updated_at?: string;
}

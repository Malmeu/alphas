import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue de Produits | ALPHAS POMPES',
  description: 'Découvrez notre catalogue complet de pompes industrielles en Algérie. Filtrez par marque, type ou secteur d\'activité pour trouver la solution adaptée à vos besoins.',
  keywords: [
    'pompes industrielles',
    'catalogue pompes',
    'Algérie',
    'ALPHAS POMPES',
    'pompes centrifuges',
    'pompes volumétriques',
    'filtrage produits',
  ],
  openGraph: {
    title: 'Catalogue de Produits | ALPHAS POMPES',
    description: 'Découvrez notre catalogue complet de pompes industrielles en Algérie. Filtrez par marque, type ou secteur d\'activité.',
    images: [
      {
        url: '/images/produits-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ALPHAS POMPES - Catalogue de produits',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.alphaspompes.com/produits',
  },
};

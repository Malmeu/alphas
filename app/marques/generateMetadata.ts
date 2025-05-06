import { Metadata } from 'next';

// Fonction pour générer les métadonnées des pages de marques
export function generateBrandMetadata(
  brand: string,
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} | ALPHAS POMPES`,
    description,
    keywords: [
      'pompes industrielles',
      'Algérie',
      brand,
      'ALPHAS POMPES',
      'solutions de pompage',
      'équipements industriels',
    ],
    openGraph: {
      title: `${title} | ALPHAS POMPES`,
      description,
      images: [
        {
          url: `/image_marques/${brand.toLowerCase().replace(/-/g, '')}.png`,
          width: 1200,
          height: 630,
          alt: `ALPHAS POMPES - Partenaire ${title}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.alphaspompes.com/marques/${brand}`,
    },
  };
}

// Données pour chaque marque
export const brandData = {
  'oflow': {
    title: 'OFLOW',
    description: 'Découvrez la gamme de pompes OFLOW distribuée par ALPHAS POMPES en Algérie. Solutions innovantes et fiables pour tous vos besoins de pompage.',
  },
  'al-dewatering': {
    title: 'AL DEWATERING',
    description: 'Pompes d\'assèchement AL DEWATERING disponibles chez ALPHAS POMPES. Solutions performantes pour l\'évacuation des eaux et l\'assèchement de chantiers.',
  },
  'al-fire': {
    title: 'AL FIRE',
    description: 'Systèmes anti-incendie AL FIRE proposés par ALPHAS POMPES. Protection optimale contre les incendies avec des équipements fiables et conformes aux normes.',
  },
  'flux': {
    title: 'FLUX',
    description: 'Pompes FLUX distribuées par ALPHAS POMPES en Algérie. Solutions de qualité allemande pour le transfert de fluides dans divers secteurs industriels.',
  },
  'verder': {
    title: 'VERDER',
    description: 'Découvrez les pompes VERDER chez ALPHAS POMPES. Équipements de pompage innovants et durables pour applications industrielles exigeantes.',
  },
  'someflu': {
    title: 'SOMEFLU',
    description: 'Pompes SOMEFLU disponibles chez ALPHAS POMPES. Solutions spécialisées pour le transfert de fluides corrosifs et abrasifs dans l\'industrie.',
  },
  'flowserve': {
    title: 'FLOWSERVE',
    description: 'ALPHAS POMPES, distributeur des solutions FLOWSERVE en Algérie. Équipements de pompage de haute qualité pour applications industrielles complexes.',
  },
  'pcm': {
    title: 'PCM',
    description: 'Pompes PCM proposées par ALPHAS POMPES. Solutions de pompage volumétrique innovantes pour les industries exigeantes en Algérie.',
  },
  'orex': {
    title: 'OREX',
    description: 'Découvrez la gamme OREX chez ALPHAS POMPES. Solutions de pompage robustes et fiables pour les applications industrielles les plus exigeantes.',
  },
};

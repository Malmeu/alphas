import { Metadata } from 'next';

// Fonction pour générer les métadonnées des pages de domaines
export function generateDomainMetadata(
  domain: string,
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} | ALPHAS POMPES`,
    description,
    keywords: [
      'pompes industrielles',
      'Algérie',
      domain,
      'ALPHAS POMPES',
      'solutions de pompage',
      'équipements industriels',
    ],
    openGraph: {
      title: `${title} | ALPHAS POMPES`,
      description,
      images: [
        {
          url: `/image_domaine/${domain.toLowerCase().replace(/-/g, '')}.png`,
          width: 1200,
          height: 630,
          alt: `ALPHAS POMPES - Solutions pour ${title}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.alphaspompes.com/domaines/${domain}`,
    },
  };
}

// Données pour chaque domaine
export const domainData = {
  'industrie': {
    title: 'Solutions pour l\'Industrie',
    description: 'Découvrez nos solutions de pompage pour le secteur industriel. Pompes robustes et fiables adaptées aux environnements industriels exigeants.',
  },
  'pharmacie-cosmetique': {
    title: 'Solutions pour Pharmacies & Cosmétique',
    description: 'Pompes spécialisées pour l\'industrie pharmaceutique et cosmétique. Équipements conformes aux normes sanitaires et de qualité les plus strictes.',
  },
  'anti-incendie': {
    title: 'Solutions Anti-incendie',
    description: 'Systèmes de pompage anti-incendie fiables et performants. Protection optimale pour vos installations contre les risques d\'incendie.',
  },
  'agroalimentaire': {
    title: 'Solutions pour l\'Agroalimentaire',
    description: 'Pompes adaptées aux exigences de l\'industrie agroalimentaire. Équipements conformes aux normes sanitaires pour le transfert de fluides alimentaires.',
  },
  'agriculture-et-irrigation': {
    title: 'Solutions pour l\'Agriculture & Irrigation',
    description: 'Systèmes de pompage efficaces pour l\'agriculture et l\'irrigation. Optimisez vos ressources en eau et améliorez la productivité de vos cultures.',
  },
  'eau-et-environnement': {
    title: 'Solutions pour l\'Eau & Environnement',
    description: 'Pompes spécialisées pour le traitement de l\'eau et la protection de l\'environnement. Solutions durables pour la gestion des ressources hydriques.',
  },
  'mine-et-carriere': {
    title: 'Solutions pour Mines & Carrières',
    description: 'Équipements de pompage robustes pour l\'industrie minière et les carrières. Pompes résistantes adaptées aux conditions les plus difficiles.',
  },
  'batiment-et-tp': {
    title: 'Solutions pour Bâtiment & TP',
    description: 'Pompes performantes pour le secteur du bâtiment et des travaux publics. Équipements fiables pour l\'assèchement, le transfert et l\'alimentation en eau.',
  },
  'gaz-et-oil': {
    title: 'Solutions pour Gaz & Oil',
    description: 'Pompes spécialisées pour l\'industrie pétrolière et gazière. Équipements conformes aux normes de sécurité les plus strictes pour environnements ATEX.',
  },
};

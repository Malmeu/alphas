'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function JsonLdSchema() {
  const pathname = usePathname();
  const baseUrl = 'https://www.alphaspompes.com';
  const currentUrl = `${baseUrl}${pathname}`;
  
  // Schéma de base pour l'organisation
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ALPHAS POMPES',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs: industrie, agriculture, eau et environnement.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressLocality: 'Alger',
      addressRegion: 'Alger',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+213-XX-XX-XX-XX',
      contactType: 'customer service',
      availableLanguage: ['French', 'Arabic'],
    },
    sameAs: [
      'https://www.facebook.com/alphaspompes',
      'https://www.linkedin.com/company/alphas-pompes',
    ],
  };

  // Schéma pour la page d'accueil
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': baseUrl,
    url: baseUrl,
    name: 'ALPHAS POMPES | Solutions de pompage industrielles en Algérie',
    description: 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs.',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}/images/hero.jpg`,
    },
  };

  // Schéma pour le site web
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'ALPHAS POMPES',
    description: 'Solutions de pompage industrielles en Algérie',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/produits?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Schéma pour les produits (page produits)
  const productsPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/produits`,
    url: `${baseUrl}/produits`,
    name: 'Produits | ALPHAS POMPES',
    description: 'Découvrez notre gamme complète de pompes industrielles pour tous secteurs d\'activité.',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  // Schéma pour la page contact
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${baseUrl}/contact`,
    url: `${baseUrl}/contact`,
    name: 'Contact | ALPHAS POMPES',
    description: 'Contactez ALPHAS POMPES pour toutes vos questions concernant nos solutions de pompage industrielles.',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
  };

  // Sélection du schéma approprié en fonction du chemin
  let schema;
  if (pathname === '/') {
    schema = [organizationSchema, websiteSchema, homePageSchema];
  } else if (pathname === '/produits') {
    schema = [organizationSchema, productsPageSchema];
  } else if (pathname === '/contact') {
    schema = [organizationSchema, contactPageSchema];
  } else {
    // Schéma par défaut pour les autres pages
    schema = [
      organizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': currentUrl,
        url: currentUrl,
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${baseUrl}/#organization`,
        },
      },
    ];
  }

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

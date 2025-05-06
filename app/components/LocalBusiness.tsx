'use client';

import Script from 'next/script';

export default function LocalBusiness() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ALPHAS POMPES',
    image: 'https://www.alphaspompes.com/images/logo.png',
    '@id': 'https://www.alphaspompes.com/#localbusiness',
    url: 'https://www.alphaspompes.com',
    telephone: '+213-XX-XX-XX-XX',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adresse ALPHAS POMPES',
      addressLocality: 'Alger',
      postalCode: '16000',
      addressCountry: 'DZ'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.7538, // À remplacer par les coordonnées exactes
      longitude: 3.0588  // À remplacer par les coordonnées exactes
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Sunday'
        ],
        opens: '08:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '08:00',
        closes: '12:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/alphaspompes',
      'https://www.linkedin.com/company/alphas-pompes'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Algeria'
    },
    description: 'ALPHAS POMPES est votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs: industrie, agriculture, eau et environnement.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catalogue de pompes industrielles',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Pompes Centrifuges',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Pompes Centrifuges Horizontales'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Pompes Centrifuges Verticales'
              }
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Pompes Volumétriques',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Pompes à Lobes'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Pompes à Vis'
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

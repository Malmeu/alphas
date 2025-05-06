'use client';

import Script from 'next/script';

export default function LocalSeo() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.alphaspompes.com/#localbusiness',
    name: 'ALPHAS POMPES',
    image: 'https://www.alphaspompes.com/images/logo.png',
    url: 'https://www.alphaspompes.com',
    telephone: '+213-XX-XX-XX-XX',
    email: 'contact@alphaspompes.com',
    description: 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs: industrie, agriculture, eau et environnement.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adresse ALPHAS POMPES',
      addressLocality: 'Alger',
      postalCode: '16000',
      addressCountry: 'DZ'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.7538,
      longitude: 3.0588
    },
    areaServed: {
      '@type': 'Country',
      name: 'Algérie'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:30',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '08:30',
        closes: '12:00'
      }
    ],
    priceRange: '€€€',
    paymentAccepted: 'Cash, Credit Card',
    currenciesAccepted: 'DZD',
    hasMap: 'https://goo.gl/maps/XXXXX',
  };

  return (
    <Script
      id="local-seo-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

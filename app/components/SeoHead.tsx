'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SeoHead({
  title = 'ALPHAS POMPES | Solutions de pompage industrielles en Algérie',
  description = 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs.',
  keywords = ['pompes industrielles', 'Algérie', 'solutions de pompage', 'ALPHAS POMPES'],
  ogImage = '/images/alphas-og-image.jpg',
  ogType = 'website',
  canonicalUrl,
}: SeoHeadProps) {
  const pathname = usePathname();
  const baseUrl = 'https://www.alphaspompes.com';
  const currentUrl = canonicalUrl || `${baseUrl}${pathname}`;

  return (
    <Head>
      {/* Balises Meta de base */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="ALPHAS POMPES" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Balises Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="ALPHAS POMPES" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Balises Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* URL canonique */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Autres balises utiles */}
      <meta name="geo.region" content="DZ" />
      <meta name="geo.placename" content="Alger" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#1e3a8a" />
    </Head>
  );
}

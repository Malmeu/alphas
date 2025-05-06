'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import JsonLdSchema from './JsonLdSchema';
import LocalSeo from './LocalSeo';
import PerformanceOptimizer from './PerformanceOptimizer';

export default function SeoOptimizer() {
  const pathname = usePathname();
  const baseUrl = 'https://www.alphaspompes.com';
  const currentUrl = `${baseUrl}${pathname}`;
  
  return (
    <>
      {/* Composants SEO */}
      <JsonLdSchema />
      <LocalSeo />
      <PerformanceOptimizer />
      
      {/* Balises meta supplémentaires */}
      <Script id="seo-meta-tags">
        {`
          // Ajout de balises meta pour améliorer le SEO
          const metaTags = [
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { name: 'author', content: 'ALPHAS POMPES' },
            { name: 'geo.region', content: 'DZ' },
            { name: 'geo.placename', content: 'Alger' },
            { name: 'distribution', content: 'global' },
            { name: 'revisit-after', content: '7 days' },
            { name: 'theme-color', content: '#1e3a8a' }
          ];
          
          metaTags.forEach(tag => {
            const metaElement = document.createElement('meta');
            metaElement.name = tag.name;
            metaElement.content = tag.content;
            document.head.appendChild(metaElement);
          });
        `}
      </Script>
      
      {/* Google Tag Manager */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}
      </Script>
      
      {/* Optimisation pour les réseaux sociaux */}
      <Script id="social-media-tags">
        {`
          // Ajout de balises pour les réseaux sociaux
          const socialTags = [
            { property: 'og:site_name', content: 'ALPHAS POMPES' },
            { property: 'og:locale', content: 'fr_FR' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@alphaspompes' }
          ];
          
          socialTags.forEach(tag => {
            const metaElement = document.createElement('meta');
            if (tag.property) {
              metaElement.setAttribute('property', tag.property);
            } else {
              metaElement.setAttribute('name', tag.name);
            }
            metaElement.content = tag.content;
            document.head.appendChild(metaElement);
          });
        `}
      </Script>
    </>
  );
}

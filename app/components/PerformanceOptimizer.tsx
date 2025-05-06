'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Préchargement des ressources critiques
    const preloadLinks = [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { href: '/images/logo.png', as: 'image' },
    ];

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.href = link.href;
      linkElement.as = link.as;
      if (link.type) linkElement.type = link.type;
      if (link.crossOrigin) linkElement.crossOrigin = link.crossOrigin;
      document.head.appendChild(linkElement);
    });

    // Intersection Observer pour le lazy loading
    const lazyLoadImages = () => {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
      });
    };

    // Exécuter le lazy loading après le chargement initial
    if (document.readyState === 'complete') {
      lazyLoadImages();
    } else {
      window.addEventListener('load', lazyLoadImages);
      return () => {
        window.removeEventListener('load', lazyLoadImages);
      };
    }
  }, []);

  return (
    <>
      {/* Script pour améliorer le Core Web Vitals */}
      <Script id="performance-script" strategy="afterInteractive">
        {`
          // Optimisation du LCP (Largest Contentful Paint)
          document.addEventListener('DOMContentLoaded', function() {
            // Priorité aux ressources visibles
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              // Log LCP pour débogage
              console.log('LCP:', lastEntry.startTime, lastEntry);
            });
            observer.observe({ type: 'largest-contentful-paint', buffered: true });

            // Optimisation du FID (First Input Delay)
            const fidObserver = new PerformanceObserver((list) => {
              list.getEntries().forEach(entry => {
                const delay = entry.processingStart - entry.startTime;
                console.log('FID:', delay, entry);
              });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });

            // Optimisation du CLS (Cumulative Layout Shift)
            const clsObserver = new PerformanceObserver((list) => {
              let clsValue = 0;
              list.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              });
              console.log('CLS:', clsValue);
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
          });
        `}
      </Script>
    </>
  );
}

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // URL de base du site
  const baseUrl = 'https://www.alphaspompes.com'
  
  // Pages principales
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produits`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alphas-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tout-sur-alphas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
  
  // Pages de domaines d'activité
  const domainRoutes: MetadataRoute.Sitemap = [
    'industrie',
    'pharmacie-cosmetique',
    'anti-incendie',
    'agroalimentaire',
    'agriculture-et-irrigation',
    'eau-et-environnement',
    'mine-et-carriere',
    'batiment-et-tp',
    'gaz-et-oil',
  ].map(domain => ({
    url: `${baseUrl}/domaines/${domain}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  // Pages de marques
  const brandRoutes: MetadataRoute.Sitemap = [
    'oflow',
    'al-dewatering',
    'al-fire',
    'flux',
    'verder',
    'someflu',
    'flowserve',
    'pcm',
    'orex'
  ].map(brand => ({
    url: `${baseUrl}/marques/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  return [...mainRoutes, ...domainRoutes, ...brandRoutes]
}

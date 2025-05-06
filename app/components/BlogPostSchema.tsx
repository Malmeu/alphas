'use client';

import Script from 'next/script';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  slug: string;
}

export default function BlogPostSchema({
  title,
  description,
  datePublished,
  dateModified,
  author = 'ALPHAS POMPES',
  image,
  slug,
}: BlogPostSchemaProps) {
  const baseUrl = 'https://www.alphaspompes.com';
  const articleUrl = `${baseUrl}/actualite/${slug}`;
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? `${baseUrl}${image}` : `${baseUrl}/images/logo.png`,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ALPHAS POMPES',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/client';

// Fonction pour générer les métadonnées dynamiques des pages de produits
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    return {
      title: 'Produit non trouvé | ALPHAS POMPES',
      description: 'Ce produit n\'existe pas ou a été supprimé.',
    };
  }

  const title = `${product.nom} | ${product.marque} | ALPHAS POMPES`;
  const description = product.description 
    ? `${product.description.substring(0, 150)}...` 
    : `Découvrez le ${product.nom} de la marque ${product.marque}. Solutions de pompage industrielles de haute qualité en Algérie.`;

  // Création de mots-clés pertinents basés sur les données du produit
  const keywords = [
    product.nom,
    product.marque,
    product.type_produit,
    'pompes industrielles',
    'Algérie',
    ...product.secteurs_activite,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image_principale || '/images/placeholder.png',
          width: 1200,
          height: 630,
          alt: `${product.nom} - ${product.marque} - ALPHAS POMPES`,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.alphaspompes.com/produits/${params.id}`,
    },
  };
}

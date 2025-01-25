'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ProductPage from '@/components/ProductPage';

interface Product {
  id: string;
  nom: string;
  marque: string;
  type_produit: string;
  technologie: string;
  serie: string;
  modele: string;
  description: string;
  domaines_activite: string[];
  domaines_application: string[];
  debit: string;
  hauteur_refoulement: string;
  viscosite: string;
  type_entrainement: string;
  compatibilite: string;
  image_principale: string;
  images_secondaires: string[];
  avantages: string[];
}

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchProduct() {
      try {
        console.log('Fetching product with ID:', params.id);
        const { data, error } = await supabase
          .from('produits')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (data) {
          console.log('Raw product data:', {
            image_principale: data.image_principale,
            images_secondaires: data.images_secondaires
          });

          // Construire l'URL complète pour l'image principale
          let mainImageUrl = data.image_principale;
          if (mainImageUrl && !mainImageUrl.startsWith('http') && !mainImageUrl.startsWith('/')) {
            const { data: imageData } = supabase.storage
              .from('images')
              .getPublicUrl(mainImageUrl);
            console.log('Main image URL:', imageData?.publicUrl);
            mainImageUrl = imageData?.publicUrl || '';

            // Vérifier si l'image existe
            try {
              const response = await fetch(mainImageUrl);
              console.log('Main image response status:', response.status);
              if (!response.ok) {
                console.error('Main image not found:', mainImageUrl);
                mainImageUrl = ''; // Image non trouvée
              }
            } catch (error) {
              console.error('Error checking main image:', error);
              mainImageUrl = ''; // Erreur lors de la vérification
            }
          }

          // Construire les URLs complètes pour les images secondaires
          const secondaryUrls = await Promise.all(data.images_secondaires?.map(async (imagePath: string) => {
            if (!imagePath) return '';
            if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;
            
            const { data: imageUrl } = await supabase.storage
              .from('products')
              .getPublicUrl(imagePath);
            return imageUrl.publicUrl;
          }) || []);

          const processedProduct = {
            ...data,
            image_principale: mainImageUrl,
            images_secondaires: secondaryUrls.filter(url => url !== ''),
            domaines_activite: data.domaines_activite || [],
            domaines_application: data.domaines_application || [],
            avantages: data.avantages || []
          };

          console.log('Processed product data:', processedProduct);
          setProduct(processedProduct);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        setError('Erreur lors de la récupération du produit');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Erreur
          </h1>
          <p className="text-gray-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-600">
            Désolé, le produit que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
        </div>
      </div>
    );
  }

  return <ProductPage product={product} />;
}
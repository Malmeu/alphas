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
        const { data, error } = await supabase
          .from('produits')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Erreur lors du chargement du produit');
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{error || 'Produit non trouvé'}</p>
      </div>
    );
  }

  return (
    <ProductPage
      title={product.nom}
      description={product.description}
      bannerImage={product.image_principale}
      products={[
        {
          titre: product.nom,
          description: product.description,
          image: product.image_principale,
          domaines: product.domaines_activite || [],
          debit: product.debit,
          hauteur: product.hauteur_refoulement,
          viscosite: product.viscosite,
          entrainement: product.type_entrainement,
          marque: product.marque,
          technologie: product.technologie,
          serie: product.serie,
          modele: product.modele,
          images_secondaires: product.images_secondaires || [],
          avantages: product.avantages || [],
          domaines_application: product.domaines_application || []
        }
      ]}
    />
  );
}
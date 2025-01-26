'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import type { Product } from '@/types/product';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setProduct(data);
      if (data?.image_principale) {
        setSelectedImage(data.image_principale);
        console.log('URL de l\'image:', `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${data.image_principale}`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link href="/produits" className="text-primary hover:text-primary-dark">
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec les informations de base */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Type Produit :</span> {product.type_produit} /{' '}
          <span className="font-semibold">Technologie :</span> {product.technologie} /{' '}
          <span className="font-semibold">Série :</span> {product.serie} /{' '}
          <span className="font-semibold">Modèle :</span> {product.modele} /{' '}
          <span className="font-semibold">Marque :</span> {product.marque}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galerie d'images */}
        <div>
          {/* Image principale sélectionnée */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            {selectedImage && (
              <div className="relative aspect-square w-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${selectedImage}`}
                  alt={product.nom}
                  className="w-full h-[400px] object-contain"
                  onError={(e) => {
                    console.error('Erreur de chargement de l\'image:', selectedImage);
                    e.currentTarget.src = '/images/placeholder.png';
                  }}
                />
              </div>
            )}
          </div>

          {/* Miniatures des images */}
          <div className="grid grid-cols-5 gap-2">
            {/* Image principale */}
            {product.image_principale && (
              <button
                onClick={() => setSelectedImage(product.image_principale)}
                className={`relative aspect-square w-full border-2 rounded-lg overflow-hidden ${
                  selectedImage === product.image_principale ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image_principale}`}
                  alt={product.nom}
                  className="w-full h-[80px] object-contain bg-gray-50"
                  onError={(e) => {
                    console.error('Erreur de chargement de l\'image principale:', product.image_principale);
                    e.currentTarget.src = '/images/placeholder.png';
                  }}
                />
              </button>
            )}

            {/* Images secondaires */}
            {Array.isArray(product.images_secondaires) && product.images_secondaires.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square w-full border-2 rounded-lg overflow-hidden ${
                  selectedImage === image ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${image}`}
                  alt={`${product.nom} - Image ${index + 1}`}
                  className="w-full h-[80px] object-contain bg-gray-50"
                  onError={(e) => {
                    console.error('Erreur de chargement de l\'image secondaire:', image);
                    e.currentTarget.src = '/images/placeholder.png';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informations du produit */}
        <div>
          <h1 className="text-3xl font-bold mb-6">{product.nom}</h1>
          
          <div className="prose max-w-none mb-8">
            <p>{product.description}</p>
          </div>

          {/* Secteurs d'activité */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Secteurs d'activité :</h2>
            <div className="flex flex-wrap gap-2">
              {product.secteurs_activite.map((secteur, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {secteur}
                </span>
              ))}
            </div>
          </div>

          {/* Domaines d'applications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Domaines d'applications :</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.domaines_application }} />
          </div>

          {/* Fiche Technique */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Fiche Technique :</h2>
            <dl className="grid grid-cols-1 gap-4">
              {product.debit && (
                <div>
                  <dt className="font-medium text-gray-600">Débit :</dt>
                  <dd>{product.debit}</dd>
                </div>
              )}
              {product.hauteur_refoulement && (
                <div>
                  <dt className="font-medium text-gray-600">Hauteur de Refoulement :</dt>
                  <dd>{product.hauteur_refoulement}</dd>
                </div>
              )}
              {product.viscosite && (
                <div>
                  <dt className="font-medium text-gray-600">Viscosité :</dt>
                  <dd>{product.viscosite}</dd>
                </div>
              )}
              {product.type_entrainement && (
                <div>
                  <dt className="font-medium text-gray-600">Type d'Entraînement :</dt>
                  <dd>{product.type_entrainement}</dd>
                </div>
              )}
              {product.compatibilite && (
                <div>
                  <dt className="font-medium text-gray-600">Compatibilité :</dt>
                  <dd>{product.compatibilite}</dd>
                </div>
              )}
              {product.caracteristiques_supplementaires?.map((carac, index) => (
                carac.nom && carac.valeur ? (
                  <div key={index}>
                    <dt className="font-medium text-gray-600">{carac.nom} :</dt>
                    <dd>{carac.valeur}</dd>
                  </div>
                ) : null
              ))}
            </dl>
          </div>

          {/* Avantages */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Avantages :</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.avantages }} />
          </div>

          {/* Produits similaires */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">ILS POURRAIENT VOUS INTÉRESSER</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cette section sera remplie dynamiquement avec des produits similaires */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

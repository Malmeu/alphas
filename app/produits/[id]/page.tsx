'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import ProductGallery from '@/components/ProductGallery';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon className="h-6 w-6 text-gray-500" />
        </div>
      </button>
      <div
        className={`transition-all duration-200 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-5 border-t border-gray-200">{children}</div>
      </div>
    </div>
  );
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Erreur lors du chargement du produit:', error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Produits', href: '/produits' },
    { name: product.nom, href: '#' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Fil d'Ariane */}
          <nav className="mb-6">
            <ol className="flex flex-wrap space-x-2">
              {breadcrumbs.map((item, index) => (
                <li key={item.name} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                  {item.href === '#' ? (
                    <span className="text-gray-500">{item.name}</span>
                  ) : (
                    <Link href={item.href} className="text-primary hover:text-primary-dark">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* En-tête avec les informations de base */}
          <div className="bg-white shadow-sm rounded-xl p-4 mb-8 border border-gray-100">
            <p className="text-sm text-gray-600 flex flex-wrap gap-2">
              <span><span className="font-medium text-gray-800">Type Produit :</span> {product.type_produit}</span>
              <span className="text-gray-300">|</span>
              <span><span className="font-medium text-gray-800">Technologie :</span> {product.technologie}</span>
              <span className="text-gray-300">|</span>
              <span><span className="font-medium text-gray-800">Série :</span> {product.serie}</span>
              <span className="text-gray-300">|</span>
              <span><span className="font-medium text-gray-800">Modèle :</span> {product.modele}</span>
              <span className="text-gray-300">|</span>
              <span><span className="font-medium text-gray-800">Marque :</span> {product.marque}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <ProductGallery
              imagePrincipale={product.image_principale || ''}
              imagesSecondaires={product.images_secondaires || []}
            />
          </div>

          {/* Informations produit */}
          <div>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{product.nom}</h1>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 whitespace-pre-line break-words">{product.description}</p>
            </div>

            {/* Secteurs d'activité */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Secteurs d'activité</h2>
              <div className="flex flex-wrap gap-2">
                {product.secteurs_activite?.map((secteur, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 transition-colors hover:bg-blue-100"
                  >
                    {secteur}
                  </span>
                )) || null}
              </div>
            </div>

            {/* Sections rétractables avec style amélioré */}
            <div className="space-y-6">
              <CollapsibleSection title="Domaines d'applications">
                <div 
                  className="prose max-w-none text-gray-600"
                  style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                  dangerouslySetInnerHTML={{ 
                    __html: product.domaines_application?.replace(/<br\s*\/?>/g, '\n') || '' 
                  }} 
                />
              </CollapsibleSection>

              <CollapsibleSection title="Fiche Technique">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.debit && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-gray-800">Débit :</span>
                      <span className="text-gray-600 ml-2">{product.debit}</span>
                    </div>
                  )}
                  {product.hauteur_refoulement && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-gray-800">Hauteur de refoulement :</span>
                      <span className="text-gray-600 ml-2">{product.hauteur_refoulement}</span>
                    </div>
                  )}
                  {product.viscosite && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-gray-800">Viscosité :</span>
                      <span className="text-gray-600 ml-2">{product.viscosite}</span>
                    </div>
                  )}
                  {product.type_entrainement && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-gray-800">Type d'entraînement :</span>
                      <span className="text-gray-600 ml-2">{product.type_entrainement}</span>
                    </div>
                  )}
                  {product.compatibilite && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-gray-800">Compatibilité :</span>
                      <span className="text-gray-600 ml-2">{product.compatibilite}</span>
                    </div>
                  )}
                </div>
                {(product.caracteristiques_supplementaires?.length || 0) > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Caractéristiques supplémentaires :</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.caracteristiques_supplementaires?.map((carac, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <span className="font-medium text-gray-800">{carac.nom} :</span>
                          <span className="text-gray-600 ml-2">{carac.valeur}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CollapsibleSection>

              {/* Avantages */}
              {product.avantages && (
                <CollapsibleSection title="Avantages">
                  <div 
                    className="prose max-w-none text-gray-600"
                    style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                    dangerouslySetInnerHTML={{ 
                      __html: product.avantages?.replace(/<br\s*\/?>/g, '\n') || '' 
                    }} 
                  />
                </CollapsibleSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

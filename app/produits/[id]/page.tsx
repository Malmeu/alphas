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
    <div className="border rounded-lg mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
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
    <div className="bg-white">
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

        {/* Fil d'Ariane */}
        <nav className="mb-8">
          <ol className="flex space-x-2">
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

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div>
            <ProductGallery
              imagePrincipale={product.image_principale || ''}
              imagesSecondaires={product.images_secondaires || []}
            />
          </div>

          {/* Informations produit */}
          <div>
            <h1 className="text-3xl font-bold mb-6">{product.nom}</h1>
            
            <div className="prose max-w-none mb-8">
              <p>{product.description}</p>
            </div>

            {/* Secteurs d'activité */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Secteurs d'activité</h2>
              <div className="flex flex-wrap gap-2">
                {product.secteurs_activite?.map((secteur, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {secteur}
                  </span>
                )) || null}
              </div>
            </div>

            {/* Domaines d'application */}
            <CollapsibleSection title="Domaines d'applications">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.domaines_application || '' }} />
            </CollapsibleSection>

            {/* Fiche technique */}
            <CollapsibleSection title="Fiche Technique">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.debit && (
                  <div>
                    <span className="font-semibold">Débit :</span> {product.debit}
                  </div>
                )}
                {product.hauteur_refoulement && (
                  <div>
                    <span className="font-semibold">Hauteur de refoulement :</span> {product.hauteur_refoulement}
                  </div>
                )}
                {product.viscosite && (
                  <div>
                    <span className="font-semibold">Viscosité :</span> {product.viscosite}
                  </div>
                )}
                {product.type_entrainement && (
                  <div>
                    <span className="font-semibold">Type d'entraînement :</span> {product.type_entrainement}
                  </div>
                )}
                {product.compatibilite && (
                  <div>
                    <span className="font-semibold">Compatibilité :</span> {product.compatibilite}
                  </div>
                )}
              </div>
              {(product.caracteristiques_supplementaires?.length || 0) > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Caractéristiques supplémentaires :</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.caracteristiques_supplementaires?.map((carac, index) => (
                      <div key={index}>
                        <span className="font-semibold">{carac.nom} :</span> {carac.valeur}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleSection>

            {/* Avantages */}
            {product.avantages && (
              <CollapsibleSection title="Avantages">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.avantages }} />
              </CollapsibleSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

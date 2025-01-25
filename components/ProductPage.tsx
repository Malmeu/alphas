'use client';

import Image from 'next/image';
import { IconBuildingFactory2, IconGasStation, IconBuilding, IconTruck, IconDroplet } from '@tabler/icons-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

interface ProductPageProps {
  title: string;
  description: string;
  bannerImage: string;
  products: {
    titre: string;
    description: string;
    image: string;
    domaines: string[];
    debit: string;
    hauteur: string;
    viscosite: string;
    entrainement: string;
    marque: string;
    technologie: string;
    serie: string;
    modele: string;
    images_secondaires: string[];
    avantages: string[];
    domaines_application: string[];
  }[];
}

const sectorIcons = {
  'Industrie': <IconBuildingFactory2 className="w-8 h-8 text-white" />,
  'Oil & Gaz': <IconGasStation className="w-8 h-8 text-white" />,
  'Bâtiment et TP': <IconBuilding className="w-8 h-8 text-white" />,
  'Mine & Carrière': <IconTruck className="w-8 h-8 text-white" />,
  'Eau & Environnement': <IconDroplet className="w-8 h-8 text-white" />
};

export default function ProductPage({ title, description, bannerImage, products }: ProductPageProps) {
  const supabase = createClientComponentClient();
  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const [secondaryImageUrls, setSecondaryImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const loadImages = async () => {
      if (products?.[0]?.image) {
        if (products[0].image.startsWith('http')) {
          setMainImageUrl(products[0].image);
          setSelectedImage(products[0].image);
        } else {
          const { data } = await supabase.storage
            .from('images')
            .getPublicUrl(products[0].image);

          if (data?.publicUrl) {
            setMainImageUrl(data.publicUrl);
            setSelectedImage(data.publicUrl);
          }
        }
      }

      if (products?.[0]?.images_secondaires?.length > 0) {
        const urls = await Promise.all(
          products[0].images_secondaires.map(async (filename) => {
            if (filename.startsWith('http')) {
              return filename;
            } else {
              const { data } = await supabase.storage
                .from('images')
                .getPublicUrl(filename);
              return data?.publicUrl || '';
            }
          })
        );
        setSecondaryImageUrls(urls.filter(Boolean));
      }
    };

    if (products?.length > 0) {
      loadImages();
    }
  }, [products, supabase]);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Produit non trouvé</p>
      </div>
    );
  }

  const showMainImage = selectedImage || mainImageUrl;
  const product = products[0]; // Pour simplifier l'accès aux données

  // Ne pas afficher les images si elles ne sont pas encore chargées
  const showSecondaryImages = secondaryImageUrls.length > 0;

  // Vérifier si l'URL est valide
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* En-tête avec type, technologie, etc. */}
      <div className="bg-[#EBF3F9] p-3 mb-8">
        <p className="text-sm text-gray-700">
          Type Produit : {product.titre} / Technologie : {product.technologie} / Série : {product.serie} / Modèle : {product.modele} / Marque : {product.marque}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne gauche - Images et caractéristiques */}
          <div>
            {/* Image principale */}
            <div className="bg-white border rounded-lg p-4 mb-4">
              <div className="relative h-[400px] w-full">
                {showMainImage && isValidUrl(showMainImage) && (
                  <Image
                    src={showMainImage}
                    alt={product.titre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Images secondaires */}
            {showSecondaryImages && (
              <div className="grid grid-cols-4 gap-4">
                {mainImageUrl && isValidUrl(mainImageUrl) && (
                  <div 
                    className={`bg-white border rounded-lg p-2 cursor-pointer ${selectedImage === mainImageUrl ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedImage(mainImageUrl)}
                  >
                    <div className="relative h-20 w-full">
                      <Image
                        src={mainImageUrl}
                        alt={`${product.titre} - principale`}
                        fill
                        sizes="(max-width: 768px) 25vw, 20vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                {secondaryImageUrls.map((url, index) => (
                  isValidUrl(url) && (
                    <div
                      key={index}
                      className={`bg-white border rounded-lg p-2 cursor-pointer ${selectedImage === url ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedImage(url)}
                    >
                      <div className="relative h-20 w-full">
                        <Image
                          src={url}
                          alt={`${product.titre} - ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 20vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Section Caractéristiques */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">Caractéristiques Techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne de gauche avec toutes les caractéristiques */}
                <div>
                  {/* Caractéristiques de base */}
                  {product.debit && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Débit</h3>
                      <p>{product.debit}</p>
                    </div>
                  )}
                  {product.hauteur && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Hauteur de refoulement</h3>
                      <p>{product.hauteur}</p>
                    </div>
                  )}
                  {product.viscosite && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Viscosité</h3>
                      <p>{product.viscosite}</p>
                    </div>
                  )}
                  {product.entrainement && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Type d'entrainement</h3>
                      <p>{product.entrainement}</p>
                    </div>
                  )}
                </div>

                {/* Colonne de droite vide ou pour d'autres informations */}
                <div>
                  {/* Autres informations si nécessaire */}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Informations */}
          <div>
            {/* Titre du produit */}
            <h1 className="text-2xl font-bold mb-6">
              {product.titre}
            </h1>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Secteurs d'activité */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Secteurs d'activité :</h2>
              <div className="flex flex-wrap gap-8">
                {product.domaines?.map((domaine) => (
                  <div key={domaine} className="flex flex-col items-center">
                    <div className="bg-[#007CC3] p-3 rounded-full mb-2">
                      {sectorIcons[domaine as keyof typeof sectorIcons]}
                    </div>
                    <span className="text-sm text-center">{domaine}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domaines d'applications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Domaines d'applications :</h2>
              <ul className="list-disc pl-5 space-y-2">
                {product.domaines_application?.map((domaine, index) => (
                  <li key={index} className="text-gray-600">
                    {domaine}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avantages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Avantages :</h2>
              <ul className="list-disc pl-5 space-y-2">
                {product.avantages?.map((avantage, index) => (
                  <li key={index} className="text-gray-600">
                    {avantage}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import DomainFilters from '@/components/DomainFilters';
import { Product, Marque, TypePompe } from '@/types/product';
import { createClient } from '@/lib/supabase/client';

const MARQUES: Marque[] = [
  'OFLOW',
  'AL DEWATERING',
  'AL FIRE',
  'FLUX',
  'VERDER',
  'SOMEFLU',
  'FLOWSERVE',
  'PCM'
];

const TYPES_POMPE: TypePompe[] = [
  'Pompes Centrifuges',
  'Pompes Volumetriques',
  'Pompes vide-fut',
  'Anti-incendie',
  'Moto-pompes',
  'Anti-belier',
  'Station de relevage',
  "Stations d'épuration"
];

export default function MineEtCarriere() {
  const [selectedMarques, setSelectedMarques] = useState<Marque[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<TypePompe[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, [selectedMarques, selectedTypes]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .contains('secteurs_activite', ['Mine & Carrière']);

      if (selectedMarques.length > 0) {
        query = query.in('marque', selectedMarques);
      }

      if (selectedTypes.length > 0) {
        query = query.in('type_produit', selectedTypes);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarqueChange = (marque: Marque) => {
    setSelectedMarques(prev => 
      prev.includes(marque)
        ? prev.filter(m => m !== marque)
        : [...prev, marque]
    );
  };

  const handleTypeChange = (type: TypePompe) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <main className="min-h-screen">
      {/* Banner Hero */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/image_domaine/mine.png"
          alt="Mine et Carrière"
          fill
          priority
          className="object-cover"
        />
       {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/75 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Mine & Carrière
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Solutions robustes pour l'exploitation minière et l'extraction en carrière.
            </p>
          </div>
        </div>*/}
      </div>

      {/* Contenu Principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filtres */}
          <div className="w-full md:w-64 flex-shrink-0">
            <DomainFilters
              marques={MARQUES}
              typesPompe={TYPES_POMPE}
              selectedMarques={selectedMarques}
              selectedTypes={selectedTypes}
              onMarqueChange={handleMarqueChange}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Liste des Produits */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun produit trouvé avec les filtres sélectionnés.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

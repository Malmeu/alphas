'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/supabase';

interface Product {
  id: string;
  nom: string;
  description: string;
  marque: string;
  type_produit: string;
  domaines_activite: string[];
  image_principale: string;
}

const TYPES_POMPES = [
  'Horizontal Mono-cellulaire',
  'Horizontal Multi-cellulaire',
  'Vertical Multi-cellulaire',
  'À Vide',
  'Immergée',
  'Submersible'
];

const DOMAINES_APPLICATION = [
  'Hydrocarbure',
  'Agroalimentaire',
  'Cosmétique',
  'Pharmaceutique',
  'Eau et environnement',
  'Industriel'
];

const MARQUES = [
  'Oflow',
  'Orex',
  'Al-Demating',
  'Al-fire',
  'FLUX'
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    marques: [] as string[],
    types: [] as string[],
    domaines: [] as string[]
  });

  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('produits')
          .select('*');

        if (error) {
          console.error('Erreur lors de la récupération des produits:', error);
          return;
        }

        const typedData = data as Product[];
        setProducts(typedData);
        setFilteredProducts(typedData);
      } catch (error) {
        console.error('Erreur inattendue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const typeParam = searchParams.get('type');
    const marqueParam = searchParams.get('marque');
    const domaineParam = searchParams.get('domaine');

    // Mettre à jour les filtres en fonction des paramètres
    if (typeParam) {
      setFilters(prev => ({ ...prev, types: [typeParam] }));
    }
    if (marqueParam) {
      setFilters(prev => ({ ...prev, marques: [marqueParam] }));
    }
    if (domaineParam) {
      setFilters(prev => ({ ...prev, domaines: [domaineParam] }));
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Appliquer les filtres
    if (filters.marques.length > 0) {
      filtered = filtered.filter(product => filters.marques.includes(product.marque));
    }
    if (filters.types.length > 0) {
      filtered = filtered.filter(product => filters.types.includes(product.type_produit));
    }
    if (filters.domaines.length > 0) {
      filtered = filtered.filter(product => 
        product.domaines_activite?.some(domaine => filters.domaines.includes(domaine))
      );
    }

    // Appliquer la recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.nom.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.marque.toLowerCase().includes(query) ||
        product.type_produit.toLowerCase().includes(query) ||
        product.domaines_activite?.some(domaine => 
          domaine.toLowerCase().includes(query)
        )
      );
    }

    setFilteredProducts(filtered);
  }, [products, filters, searchQuery]);

  const toggleFilter = (type: 'marques' | 'types' | 'domaines', value: string) => {
    setFilters(prev => {
      const currentFilters = prev[type];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(item => item !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [type]: newFilters
      };
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section avec barre de recherche */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Produits
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez notre gamme complète de pompes industrielles
            </p>
            <div className="relative max-w-lg mx-auto">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtres */}
          <div className="w-full lg:w-64 space-y-6">
            {/* Filtre par marque */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Marques</h3>
              <div className="space-y-2">
                {MARQUES.map(marque => (
                  <label key={marque} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.marques.includes(marque)}
                      onChange={() => toggleFilter('marques', marque)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">{marque}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtre par type */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Types de pompes</h3>
              <div className="space-y-2">
                {TYPES_POMPES.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => toggleFilter('types', type)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtre par domaine */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Domaines d'application</h3>
              <div className="space-y-2">
                {DOMAINES_APPLICATION.map(domaine => (
                  <label key={domaine} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.domaines.includes(domaine)}
                      onChange={() => toggleFilter('domaines', domaine)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">{domaine}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Liste des produits */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Image du produit */}
                  <div className="relative h-48 bg-gray-200">
                    {product.image_principale ? (
                      <Image
                        src={product.image_principale?.startsWith('/') || product.image_principale?.startsWith('http')
                          ? product.image_principale
                          : `/${product.image_principale}`}
                        alt={product.nom}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Informations du produit */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.nom}
                    </h2>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Marque:</span>
                        {product.marque}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Type:</span>
                        {product.type_produit}
                      </div>

                      <div className="mt-3">
                        <span className="font-medium text-sm text-gray-600 block mb-2">
                          Secteurs d'activité:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.domaines_activite?.map((secteur, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary"
                            >
                              {secteur}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description courte */}
                    <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Bouton En savoir plus */}
                    <div className="mt-4">
                      <Link
                        href={`/produits/${product.id}`}
                        className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                      >
                        En savoir plus
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

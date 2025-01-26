'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProductFilters from '@/components/ProductFilters';

import type { Product, Marque, TypePompe, SecteurActivite } from '@/types/product';

const MARQUES: Marque[] = ['Oflow', 'Orex', 'Al Demating', 'Al fire', 'FLUX'];

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

const SECTEURS_ACTIVITE: SecteurActivite[] = [
  'Industrie',
  'Pharmacies & Cosmetique',
  'Anti-incendie',
  'Agroalimentaire',
  'Agriculture & Irrigation',
  'Eau & Environnement',
  'Mines & Carriere',
  'Batiment & TP',
  'Gaz & Oil',
  'Service Après-Vente'
];

export default function ProduitsPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarques, setSelectedMarques] = useState<Marque[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<TypePompe[]>([]);
  const [selectedSecteurs, setSelectedSecteurs] = useState<SecteurActivite[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [selectedMarques, selectedTypes, selectedSecteurs, searchQuery]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('*');

      // Filtrage par marque
      if (selectedMarques.length > 0) {
        query = query.in('marque', selectedMarques);
      }

      // Filtrage par type
      if (selectedTypes.length > 0) {
        query = query.in('type_produit', selectedTypes);
      }

      // Filtrage par secteur d'activité
      if (selectedSecteurs.length > 0) {
        query = query.overlaps('secteurs_activite', selectedSecteurs);
      }

      // Recherche textuelle
      if (searchQuery) {
        query = query.or(`nom.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
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

  const handleSecteurChange = (secteur: SecteurActivite) => {
    setSelectedSecteurs(prev =>
      prev.includes(secteur)
        ? prev.filter(s => s !== secteur)
        : [...prev, secteur]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Hero */}
      <div className="relative bg-primary">
        <div className="absolute inset-0">
          <img
            src="/images/banner-produits.jpg"
            alt="Bannière produits"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nos Produits
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Découvrez notre gamme complète de pompes industrielles. Des solutions adaptées à tous vos besoins, 
            avec une expertise technique et un service client de qualité.
          </p>
        </div>
      </div>

      {/* Navigation des types de produits */}
      

      {/* Barre de recherche */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white shadow-lg placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Rechercher un produit..."
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filtres */}
          <div className="lg:col-span-1">
            <ProductFilters
              marques={MARQUES}
              typesPompe={TYPES_POMPE}
              secteursActivite={SECTEURS_ACTIVITE}
              selectedMarques={selectedMarques}
              selectedTypes={selectedTypes}
              selectedSecteurs={selectedSecteurs}
              onMarqueChange={handleMarqueChange}
              onTypeChange={handleTypeChange}
              onSecteurChange={handleSecteurChange}
            />
          </div>

          {/* Liste des produits */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative aspect-w-4 aspect-h-3">
                      {product.image_principale ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image_principale}`}
                          alt={product.nom}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">Pas d'image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {product.nom}
                      </h3>
                      
                      {/* Secteurs d'activité */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {product.secteurs_activite?.slice(0, 3).map((secteur, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {secteur}
                            </span>
                          ))}
                          {product.secteurs_activite?.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{product.secteurs_activite.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Marque et bouton détails */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-primary">
                            {product.marque}
                          </span>
                        </div>
                        <a
                          href={`/produits/${product.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Voir détails
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

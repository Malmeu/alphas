'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product, TypePompe } from '@/types/product';
import { createClient } from '@/lib/supabase/client';

export default function AntiIncendie() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .contains('secteurs_activite', ['Anti incendie']);

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

  const categories = ['all', ...Array.from(new Set(products.map(product => product.type_produit)))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.type_produit === selectedCategory);

  return (
    <main className="min-h-screen">
      {/* Banner Hero */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/image_domaine/incendie.png"
          alt="Anti-incendie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/0">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Protection Incendie de Pointe
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              La sécurité incendie exige des équipements fiables et performants. Nos systèmes de pompage 
              anti-incendie sont conçus pour répondre aux normes les plus strictes et garantir une 
              protection optimale. Certifiés selon les standards internationaux, nos équipements assurent 
              une réponse rapide et efficace en cas d'urgence.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Nos Solutions Anti-incendie
            </h2>
            
            {/* Filter */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Filtrer par :</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="all">Toutes les catégories</option>
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

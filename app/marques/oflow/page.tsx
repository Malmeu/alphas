'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { createClient } from '@/lib/supabase/client';

export default function OflowPage() {
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
        .eq('marque', 'OFLOW');

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

  return (
    <main className="min-h-screen">
      {/* Logo Banner */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-72 h-40">
              <Image
                src="/image_marques/oflow.png"
                alt="Oflow"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-8 max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Oflow - Solutions de Pompage Innovantes
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Oflow est un leader dans la conception et la fabrication de pompes 
                de haute qualité. La marque se distingue par ses solutions innovantes 
                et sa technologie de pointe, offrant des produits fiables et performants 
                pour répondre aux besoins les plus exigeants de l'industrie.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Caractéristiques */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Pourquoi Choisir Oflow ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Technologies de pointe et solutions innovantes pour une performance optimale
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fiabilité</h3>
              <p className="text-gray-600">
                Produits robustes et durables conçus pour une utilisation intensive
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">
                Assistance technique experte et service après-vente de qualité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Produits Oflow
          </h2>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
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

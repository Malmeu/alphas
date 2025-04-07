'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types/product';

export default function NouvelleMarquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('marque', 'NOUVELLE MARQUE');

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Logo Banner */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="relative w-72 h-40">
              <Image
                src="/image_marques/nouvelle-marque.png"
                alt="NOUVELLE MARQUE"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-8 text-center max-w-3xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">OREX</h1>
              <p className="text-lg text-gray-600">
                Description de votre nouvelle marque. Présentez ses points forts, son histoire et sa spécialité dans le domaine des pompes industrielles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Qualité supérieure',
                description: 'Des produits conçus pour durer avec des matériaux de première qualité',
                icon: '⭐'
              },
              {
                title: 'Innovation constante',
                description: 'Recherche et développement continus pour des solutions de pointe',
                icon: '💡'
              },
              {
                title: 'Service client exceptionnel',
                description: 'Support technique et service après-vente réactifs',
                icon: '🛠️'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Produits OREX</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Aucun produit disponible pour le moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
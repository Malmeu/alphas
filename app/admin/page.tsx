'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import type { Product } from '@/types/product';

export default function AdminPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      setMessage({
        type: 'error',
        content: 'Erreur lors de la récupération des produits'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage({
        type: 'success',
        content: 'Produit supprimé avec succès'
      });
      
      // Rafraîchir la liste des produits
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setMessage({
        type: 'error',
        content: 'Erreur lors de la suppression du produit'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Administration des Produits</h1>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Ajouter un produit
          </Link>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md mb-6 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.content}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <li className="px-6 py-12">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Aucun produit n'a été créé pour le moment</p>
                  <div className="mt-6">
                    <Link
                      href="/admin/produits/nouveau"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary-50 hover:bg-primary-100"
                    >
                      Créer votre premier produit
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              products.map((product) => (
                <li key={product.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {product.image_principale && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image_principale}`}
                          alt={product.nom}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">{product.nom}</h2>
                        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                          <span>{product.marque}</span>
                          <span>•</span>
                          <span>{product.type_produit}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/produits/${product.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => product.id && handleDelete(product.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

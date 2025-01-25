'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/config';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    type_produit: '',
    technologie: '',
    serie: '',
    modele: '',
    description: '',
    domaines_activite: [] as string[],
    domaines_application: [] as string[],
    debit: '',
    hauteur_refoulement: '',
    viscosite: '',
    type_entrainement: '',
    compatibilite: '',
    avantages: [] as string[],
  });

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      setProduct(data);
      setFormData({
        nom: data.nom || '',
        marque: data.marque || '',
        type_produit: data.type_produit || '',
        technologie: data.technologie || '',
        serie: data.serie || '',
        modele: data.modele || '',
        description: data.description || '',
        domaines_activite: data.domaines_activite || [],
        domaines_application: data.domaines_application || [],
        debit: data.debit || '',
        hauteur_refoulement: data.hauteur_refoulement || '',
        viscosite: data.viscosite || '',
        type_entrainement: data.type_entrainement || '',
        compatibilite: data.compatibilite || '',
        avantages: data.avantages || [],
      });
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
      alert('Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('produits')
        .update(formData)
        .eq('id', params.id);

      if (error) throw error;

      alert('Produit mis à jour avec succès !');
      router.push('/admin');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string) => {
    const values = value.split('\n').filter(v => v.trim() !== '');
    setFormData(prev => ({ ...prev, [name]: values }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Modifier le produit
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marque
                </label>
                <input
                  type="text"
                  name="marque"
                  value={formData.marque}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type de produit
                </label>
                <input
                  type="text"
                  name="type_produit"
                  value={formData.type_produit}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Technologie
                </label>
                <input
                  type="text"
                  name="technologie"
                  value={formData.technologie}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Série
                </label>
                <input
                  type="text"
                  name="serie"
                  value={formData.serie}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Modèle
                </label>
                <input
                  type="text"
                  name="modele"
                  value={formData.modele}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Domaines d'activité */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Domaines d'activité (un par ligne)
              </label>
              <textarea
                value={formData.domaines_activite.join('\n')}
                onChange={(e) => handleArrayChange('domaines_activite', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Domaines d'application */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Domaines d'application (un par ligne)
              </label>
              <textarea
                value={formData.domaines_application.join('\n')}
                onChange={(e) => handleArrayChange('domaines_application', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Caractéristiques techniques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Débit
                </label>
                <input
                  type="text"
                  name="debit"
                  value={formData.debit}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hauteur de refoulement
                </label>
                <input
                  type="text"
                  name="hauteur_refoulement"
                  value={formData.hauteur_refoulement}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Viscosité
                </label>
                <input
                  type="text"
                  name="viscosite"
                  value={formData.viscosite}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type d'entraînement
                </label>
                <input
                  type="text"
                  name="type_entrainement"
                  value={formData.type_entrainement}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Compatibilité
                </label>
                <input
                  type="text"
                  name="compatibilite"
                  value={formData.compatibilite}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Avantages */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Avantages (un par ligne)
              </label>
              <textarea
                value={formData.avantages.join('\n')}
                onChange={(e) => handleArrayChange('avantages', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product, TypePompe, Marque, SecteurActivite } from '@/types/product';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'infos' | 'tech' | 'media'>('infos');

  const initialFormData: ProductFormData = {
    nom: '',
    type_produit: 'Pompes Centrifuges',
    technologie: '',
    serie: '',
    modele: '',
    marque: 'Oflow',
    description: '',
    secteurs_activite: [],
    domaines_application: '',
    debit: '',
    hauteur_refoulement: '',
    viscosite: '',
    type_entrainement: '',
    compatibilite: '',
    caracteristiques_supplementaires: [],
    avantages: '',
    image_principale: '',
    images_secondaires: []
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  useEffect(() => {
    const fetchProduct = async () => {
      // Si l'ID est "nouveau", on ne charge pas de produit
      if (params.id === 'nouveau') {
        return;
      }

      try {
        const { data: product, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        if (product) {
          setFormData({
            nom: product.nom,
            type_produit: product.type_produit as TypePompe,
            technologie: product.technologie || '',
            serie: product.serie || '',
            modele: product.modele || '',
            marque: product.marque as Marque,
            description: product.description || '',
            secteurs_activite: product.secteurs_activite as SecteurActivite[],
            domaines_application: product.domaines_application || '',
            debit: product.debit || '',
            hauteur_refoulement: product.hauteur_refoulement || '',
            viscosite: product.viscosite || '',
            type_entrainement: product.type_entrainement || '',
            compatibilite: product.compatibilite || '',
            caracteristiques_supplementaires: product.caracteristiques_supplementaires || [],
            avantages: product.avantages || '',
            image_principale: product.image_principale || '',
            images_secondaires: product.images_secondaires || []
          });
        }
      } catch (error: any) {
        console.error('Erreur lors du chargement du produit:', error);
        setMessage({
          type: 'error',
          content: 'Erreur lors du chargement du produit'
        });
      }
    };

    fetchProduct();
  }, [params.id, supabase]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecteurChange = (secteur: SecteurActivite) => {
    setFormData((prev) => ({
      ...prev,
      secteurs_activite: prev.secteurs_activite.includes(secteur)
        ? prev.secteurs_activite.filter((s) => s !== secteur)
        : [...prev.secteurs_activite, secteur]
    }));
  };

  const handleEditorChange = (name: string, content: string) => {
    setFormData((prev) => ({ ...prev, [name]: content }));
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      setFormData(prev => ({
        ...prev,
        image_principale: fileName
      }));

      return fileName;
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      throw error;
    }
  };

  const handleMultipleImageUpload = async (files: FileList | null) => {
    if (!files) return;
    
    try {
      const uploadedPaths = await Promise.all(
        Array.from(files).map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          return fileName;
        })
      );

      setFormData(prev => ({
        ...prev,
        images_secondaires: [...(prev.images_secondaires || []), ...uploadedPaths]
      }));
    } catch (error) {
      console.error('Erreur lors du téléchargement des images:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (params.id === 'nouveau') {
        // Création d'un nouveau produit
        const { data: newProduct, error: insertError } = await supabase
          .from('products')
          .insert([formData])
          .select()
          .single();

        if (insertError) throw insertError;

        setMessage({
          type: 'success',
          content: 'Produit créé avec succès!'
        });
        
        // Redirection vers la page d'édition du nouveau produit
        if (newProduct) {
          router.push(`/admin/produits/${newProduct.id}`);
        }
      } else {
        // Mise à jour d'un produit existant
        const { error: updateError } = await supabase
          .from('products')
          .update(formData)
          .eq('id', params.id);

        if (updateError) throw updateError;

        setMessage({
          type: 'success',
          content: 'Produit mis à jour avec succès!'
        });
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      setMessage({
        type: 'error',
        content: error.message || 'Une erreur est survenue'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Modifier le produit</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {(['infos', 'tech', 'media'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                {tab === 'infos'
                  ? 'Informations générales'
                  : tab === 'tech'
                  ? 'Caractéristiques techniques'
                  : 'Médias'}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {message && (
            <div
              className={`mb-4 p-4 rounded ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {message.content}
            </div>
          )}

          {/* Contenu des onglets */}
          <div className={activeTab === 'infos' ? 'block' : 'hidden'}>
            {/* Informations générales */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type de produit</label>
                <select
                  name="type_produit"
                  value={formData.type_produit}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="Pompes Centrifuges">Pompes Centrifuges</option>
                  <option value="Pompes Volumetriques">Pompes Volumétriques</option>
                  <option value="Pompes vide-fut">Pompes vide-fût</option>
                  <option value="Anti-incendie">Anti-incendie</option>
                  <option value="Moto-pompes">Moto-pompes</option>
                  <option value="Anti-belier">Anti-bélier</option>
                  <option value="Station de relevage">Station de relevage</option>
                  <option value="Stations d'épuration">Stations d'épuration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Marque</label>
                <select
                  name="marque"
                  value={formData.marque}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="Oflow">Oflow</option>
                  <option value="Orex">Orex</option>
                  <option value="Al Demating">Al Demating</option>
                  <option value="Al fire">Al fire</option>
                  <option value="FLUX">FLUX</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Secteurs d'activité</label>
                <div className="mt-2 space-y-2">
                  {[
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
                  ].map((secteur) => (
                    <label key={secteur} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.secteurs_activite.includes(secteur as SecteurActivite)}
                        onChange={() => handleSecteurChange(secteur as SecteurActivite)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{secteur}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Domaines d'application
                </label>
                <div className="mt-1 border rounded-lg overflow-hidden">
                  <Editor
                    initialContent={formData.domaines_application}
                    onChange={(content) => handleEditorChange('domaines_application', content)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={activeTab === 'tech' ? 'block' : 'hidden'}>
            {/* Caractéristiques techniques */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Technologie</label>
                <input
                  type="text"
                  name="technologie"
                  value={formData.technologie}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Série</label>
                <input
                  type="text"
                  name="serie"
                  value={formData.serie}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Modèle</label>
                <input
                  type="text"
                  name="modele"
                  value={formData.modele}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Débit</label>
                <input
                  type="text"
                  name="debit"
                  value={formData.debit}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Viscosité</label>
                <input
                  type="text"
                  name="viscosite"
                  value={formData.viscosite}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type d'entraînement</label>
                <input
                  type="text"
                  name="type_entrainement"
                  value={formData.type_entrainement}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Compatibilité</label>
                <input
                  type="text"
                  name="compatibilite"
                  value={formData.compatibilite}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              {/* Caractéristiques supplémentaires */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caractéristiques supplémentaires
                </label>
                <div className="space-y-4">
                  {formData.caracteristiques_supplementaires.map((carac, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={carac.nom}
                          onChange={(e) => {
                            const newCaracs = [...formData.caracteristiques_supplementaires];
                            newCaracs[index] = { ...carac, nom: e.target.value };
                            setFormData({ ...formData, caracteristiques_supplementaires: newCaracs });
                          }}
                          placeholder="Nom de la caractéristique"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={carac.valeur}
                          onChange={(e) => {
                            const newCaracs = [...formData.caracteristiques_supplementaires];
                            newCaracs[index] = { ...carac, valeur: e.target.value };
                            setFormData({ ...formData, caracteristiques_supplementaires: newCaracs });
                          }}
                          placeholder="Valeur"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newCaracs = formData.caracteristiques_supplementaires.filter((_, i) => i !== index);
                          setFormData({ ...formData, caracteristiques_supplementaires: newCaracs });
                        }}
                        className="mt-1 p-2 text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        caracteristiques_supplementaires: [
                          ...formData.caracteristiques_supplementaires,
                          { nom: '', valeur: '' }
                        ]
                      });
                    }}
                    className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Ajouter une caractéristique
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Avantages</label>
                <div className="mt-1 border rounded-lg overflow-hidden">
                  <Editor
                    initialContent={formData.avantages}
                    onChange={(content) => handleEditorChange('avantages', content)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={activeTab === 'media' ? 'block' : 'hidden'}>
            {/* Médias */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image principale</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                  className="mt-1 block w-full"
                />
                {formData.image_principale && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${formData.image_principale}`}
                    alt="Image principale"
                    className="mt-2 h-32 w-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Images secondaires</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleMultipleImageUpload(e.target.files)}
                  className="mt-1 block w-full"
                />
                <div className="mt-2 grid grid-cols-4 gap-4">
                  {formData.images_secondaires?.map((image, index) => (
                    <img
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${image}`}
                      alt={`Image ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin/produits')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

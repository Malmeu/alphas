'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product, TypePompe, Marque, SecteurActivite, CaracteristiqueTechnique } from '@/types/product';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

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

const MARQUES: Marque[] = ['Oflow', 'Orex', 'Al Demating', 'Al fire', 'FLUX'];

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

export default function AdminProduitsPage() {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (name: string, content: string) => {
    setFormData((prev) => ({ ...prev, [name]: content }));
  };

  const handleSecteurChange = (secteur: SecteurActivite) => {
    setFormData((prev) => ({
      ...prev,
      secteurs_activite: prev.secteurs_activite.includes(secteur)
        ? prev.secteurs_activite.filter((s) => s !== secteur)
        : [...prev.secteurs_activite, secteur]
    }));
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload de l'image
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur upload:', uploadError);
        throw uploadError;
      }

      // Mettre à jour le state avec le nom du fichier
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

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Erreur upload:', uploadError);
            throw uploadError;
          }

          return fileName;
        })
      );

      setFormData(prev => ({
        ...prev,
        images_secondaires: [...(prev.images_secondaires || []), ...uploadedPaths]
      }));

      return uploadedPaths;
    } catch (error) {
      console.error('Erreur lors du téléchargement des images:', error);
      throw error;
    }
  };

  const handleCaracteristiqueAdd = () => {
    setFormData((prev) => ({
      ...prev,
      caracteristiques_supplementaires: [
        ...prev.caracteristiques_supplementaires,
        { nom: '', valeur: '' }
      ]
    }));
  };

  const handleCaracteristiqueChange = (index: number, content: CaracteristiqueTechnique) => {
    setFormData((prev) => {
      const newCaracteristiques = [...prev.caracteristiques_supplementaires];
      newCaracteristiques[index] = content;
      return {
        ...prev,
        caracteristiques_supplementaires: newCaracteristiques,
      };
    });
  };

  const handleCaracteristiqueRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      caracteristiques_supplementaires: prev.caracteristiques_supplementaires.filter((_, i) => i !== index)
    }));
  };

  const handleDomainesChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      domaines_application: content,
    }));
  };

  const handleAvantagesChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      avantages: content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('products')
        .insert([formData]);

      if (error) throw error;

      setMessage({ type: 'success', content: 'Produit ajouté avec succès!' });
      setFormData(initialFormData);
    } catch (error: any) {
      setMessage({ type: 'error', content: error.message });
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ tab, label }: { tab: typeof activeTab; label: string }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
        activeTab === tab
          ? 'bg-white text-primary border-t-2 border-primary'
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Ajouter un produit</h1>
            <p className="mt-2 text-gray-600">Remplissez les informations du produit ci-dessous</p>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex gap-2 px-6">
              <TabButton tab="infos" label="Informations générales" />
              <TabButton tab="tech" label="Caractéristiques techniques" />
              <TabButton tab="media" label="Médias" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {activeTab === 'infos' && (
              <div className="space-y-6">
                {/* Nom du produit */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nom du produit
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type de Produit
                    </label>
                    <select
                      name="type_produit"
                      value={formData.type_produit}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      {TYPES_POMPE.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Marque
                    </label>
                    <select
                      name="marque"
                      value={formData.marque}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      {MARQUES.map((marque) => (
                        <option key={marque} value={marque}>
                          {marque}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Technologie
                    </label>
                    <input
                      type="text"
                      name="technologie"
                      value={formData.technologie}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                {/* Secteurs d'activité */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteurs d'activité
                  </label>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    {SECTEURS_ACTIVITE.map((secteur) => (
                      <label key={secteur} className="flex items-center space-x-3 p-2 hover:bg-white rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.secteurs_activite.includes(secteur)}
                          onChange={() => handleSecteurChange(secteur)}
                          className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">{secteur}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Domaines d'application */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domaines d'application
                  </label>
                  <div className="border rounded-lg overflow-hidden">
                    <Editor
                      initialContent={formData.domaines_application}
                      onChange={(content) => handleDomainesChange(content)}
                    />
                  </div>
                </div>

                {/* Avantages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avantages
                  </label>
                  <div className="border rounded-lg overflow-hidden">
                    <Editor
                      initialContent={formData.avantages}
                      onChange={(content) => handleAvantagesChange(content)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-6">
                {/* Caractéristiques techniques de base */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Débit
                    </label>
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
                      Hauteur de Refoulement
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
                    <label className="block text-sm font-medium text-gray-700">
                      Viscosité
                    </label>
                    <input
                      type="text"
                      name="viscosite"
                      value={formData.viscosite}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type d'Entraînement
                    </label>
                    <input
                      type="text"
                      name="type_entrainement"
                      value={formData.type_entrainement}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Compatibilité
                    </label>
                    <input
                      type="text"
                      name="compatibilite"
                      value={formData.compatibilite}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                {/* Caractéristiques techniques personnalisées */}
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Caractéristiques supplémentaires</h3>
                    <button
                      type="button"
                      onClick={handleCaracteristiqueAdd}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Ajouter
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.caracteristiques_supplementaires.map((carac, index) => (
                      <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Nom
                          </label>
                          <input
                            type="text"
                            value={carac.nom}
                            onChange={(e) => handleCaracteristiqueChange(index, { nom: e.target.value, valeur: carac.valeur })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Valeur
                          </label>
                          <input
                            type="text"
                            value={carac.valeur}
                            onChange={(e) => handleCaracteristiqueChange(index, { nom: carac.nom, valeur: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCaracteristiqueRemove(index)}
                          className="mt-6 p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                {/* Images */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Principale
                      </label>
                      <div className="mt-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Images Secondaires
                      </label>
                      <div className="mt-4">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageUpload(e.target.files)}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {message.content}
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Création en cours...' : 'Créer le produit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

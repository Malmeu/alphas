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
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);
  const [selectedSecondaryImages, setSelectedSecondaryImages] = useState<File[]>([]);
  const [caracteristiques, setCaracteristiques] = useState<CaracteristiqueTechnique[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    nom: '',
    type_produit: 'Pompes Centrifuges',
    technologie: '',
    serie: '',
    modele: '',
    marque: 'Oflow',
    description: '',
    debit: '',
    hauteur_refoulement: '',
    viscosite: '',
    type_entrainement: '',
    compatibilite: '',
    avantages: '',
    secteurs_activite: [],
    domaines_application: '',
    caracteristiques_supplementaires: [],
    image_principale: '',
    images_secondaires: []
  });

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

  const handleCaracteristiqueAdd = () => {
    setCaracteristiques((prev) => [...prev, { nom: '', valeur: '' }]);
  };

  const handleCaracteristiqueChange = (index: number, content: CaracteristiqueTechnique) => {
    setCaracteristiques((prev) => {
      const newCaracteristiques = [...prev];
      newCaracteristiques[index] = content;
      return newCaracteristiques;
    });
  };

  const handleCaracteristiqueRemove = (index: number) => {
    setCaracteristiques((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Création du produit dans la base de données
      const { data: newProduct, error: insertError } = await supabase
        .from('products')
        .insert({
          nom: formData.nom,
          type_produit: formData.type_produit,
          technologie: formData.technologie,
          serie: formData.serie,
          modele: formData.modele,
          marque: formData.marque,
          description: formData.description,
          debit: formData.debit,
          hauteur_refoulement: formData.hauteur_refoulement,
          viscosite: formData.viscosite,
          type_entrainement: formData.type_entrainement,
          compatibilite: formData.compatibilite,
          caracteristiques_supplementaires: caracteristiques,
          avantages: formData.avantages
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Upload de l'image principale si elle existe
      if (selectedMainImage && newProduct) {
        const mainImagePath = `${newProduct.id}/${selectedMainImage.name}`;
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(mainImagePath, selectedMainImage);

        if (uploadError) throw uploadError;

        // Mise à jour du produit avec le chemin de l'image principale
        const { error: updateError } = await supabase
          .from('products')
          .update({ image_principale: mainImagePath })
          .eq('id', newProduct.id);

        if (updateError) throw updateError;
      }

      // Upload des images secondaires si elles existent
      if (selectedSecondaryImages.length > 0 && newProduct) {
        const secondaryImagePaths: string[] = [];

        for (const image of selectedSecondaryImages) {
          const imagePath = `${newProduct.id}/${image.name}`;
          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(imagePath, image);

          if (uploadError) throw uploadError;
          secondaryImagePaths.push(imagePath);
        }

        // Mise à jour du produit avec les chemins des images secondaires
        const { error: updateError } = await supabase
          .from('products')
          .update({ images_secondaires: secondaryImagePaths })
          .eq('id', newProduct.id);

        if (updateError) throw updateError;
      }

      setMessage({
        type: 'success',
        content: 'Produit créé avec succès !'
      });

      // Réinitialisation du formulaire
      setFormData({
        nom: '',
        type_produit: 'Pompes Centrifuges',
        technologie: '',
        serie: '',
        modele: '',
        marque: 'Oflow',
        description: '',
        debit: '',
        hauteur_refoulement: '',
        viscosite: '',
        type_entrainement: '',
        compatibilite: '',
        avantages: '',
        secteurs_activite: [],
        domaines_application: '',
        caracteristiques_supplementaires: [],
        image_principale: '',
        images_secondaires: []
      });
      setCaracteristiques([]);
      setSelectedMainImage(null);
      setSelectedSecondaryImages([]);

    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      setMessage({
        type: 'error',
        content: 'Erreur lors de la création du produit. Veuillez réessayer.'
      });
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
                      onChange={(content) => handleEditorChange('domaines_application', content)}
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
                      onChange={(content) => handleEditorChange('avantages', content)}
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
                    {caracteristiques.map((carac, index) => (
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
                          onChange={(e) => setSelectedMainImage(e.target.files?.[0] || null)}
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
                          onChange={(e) => setSelectedSecondaryImages(Array.from(e.target.files || []))}
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

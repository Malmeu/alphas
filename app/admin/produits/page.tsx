'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/config';
import dynamic from 'next/dynamic';

// Types de pompes
const TYPES_POMPES = [
  'Pompes centrifuges',
  'Pompes vide-fut',
  'Anti-belier',
  'Moto-pompes',
  'anti-incendie',
  'Stations d\'épuration',
  'Pompes volumétriques',
  'Station de relevage'
] as const;

// Domaines d'activité
const DOMAINES_ACTIVITE = [
  'Industrie',
  'Gaz & Oil',
  'Agriculture',
  'Bâtiment et TP',
  'Anti-incendies',
  'Stations de relevage',
  'Stations d\'épuration',
  'Système d\'irrigation',
  'Pharmacie et Cosmétique'
] as const;

// Marques
const MARQUES = [
  'Oflow',
  'Orex',
  'Al Demating',
  'Al fire',
  'FLUX'
];

interface ProductData {
  id?: string;
  nom: string;
  marque: string;
  type_produit: string;
  technologie: string;
  serie: string;
  modele: string;
  description: string;
  debit: string;
  hauteur_refoulement: string;
  viscosite: string;
  type_entrainement: string;
  compatibilite: string;
  domaines_activite: string[];
  domaines_application: string[];
  avantages: string[];
  caracteristiques_techniques: { [key: string]: string };
  image_principale?: string | null;
  images_secondaires?: string[];
}

interface FormData {
  nom: string;
  marque: string;
  type_produit: string;
  technologie: string;
  serie: string;
  modele: string;
  description: string;
  debit: string;
  hauteur_refoulement: string;
  viscosite: string;
  type_entrainement: string;
  compatibilite: string;
  domaines_activite: string[];
  domaines_application: string[];
  avantages: string[];
  caracteristiques_techniques: Array<{ nom: string; valeur: string }>;
  image_principale: File | null;
  images_secondaires: File[];
}

// Composant pour convertir le HTML en texte formaté
const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Composant pour afficher le texte formaté
const FormattedText = ({ text }: { text: string }) => {
  return (
    <div>
      {text.split('\n').map((line, index) => {
        const [title, content] = line.split(' : ').map(s => s.trim());
        if (!content) return <p key={index}>{title}</p>;
        return (
          <p key={index} className="mb-2">
            <strong>{title} : </strong>
            {content}
          </p>
        );
      })}
    </div>
  );
};

interface UpdateData {
  nom: string;
  marque: string;
  type_produit: string;
  technologie: string;
  serie: string;
  modele: string;
  description: string;
  debit: string;
  hauteur_refoulement: string;
  viscosite: string;
  type_entrainement: string;
  compatibilite: string;
  domaines_activite: string[];
  domaines_application: string[];
  avantages: string[];
  caracteristiques_techniques: { [key: string]: string };
  image_principale?: string;
  images_secondaires?: string[];
}

export default function AdminProduits() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    marque: '',
    type_produit: '',
    technologie: '',
    serie: '',
    modele: '',
    description: '',
    debit: '',
    hauteur_refoulement: '',
    viscosite: '',
    type_entrainement: '',
    compatibilite: '',
    domaines_activite: [],
    domaines_application: [],
    avantages: [],
    caracteristiques_techniques: [],
    image_principale: null,
    images_secondaires: []
  });

  const [existingMainImage, setExistingMainImage] = useState<string | null>(null);
  const [existingSecondaryImages, setExistingSecondaryImages] = useState<string[] | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [products, setProducts] = useState<ProductData[]>([]);

  const initialFormData: FormData = {
    nom: '',
    marque: '',
    type_produit: '',
    technologie: '',
    serie: '',
    modele: '',
    description: '',
    debit: '',
    hauteur_refoulement: '',
    viscosite: '',
    type_entrainement: '',
    compatibilite: '',
    domaines_activite: [],
    domaines_application: [],
    avantages: [],
    caracteristiques_techniques: [],
    image_principale: null,
    images_secondaires: []
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isMain = true) => {
    const files = e.target.files;
    if (!files) return;

    if (isMain) {
      setFormData(prev => ({
        ...prev,
        image_principale: files[0]
      }));
    } else {
      // Limiter à 4 images secondaires maximum
      const newImages = Array.from(files).slice(0, 4);
      setFormData(prev => ({
        ...prev,
        images_secondaires: newImages
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload des images si nécessaire
      const { mainImage, secondaryImages } = await handleImageUpload();

      // Préparer les données du produit
      const productData: any = {
        nom: formData.nom,
        marque: formData.marque,
        type_produit: formData.type_produit,
        technologie: formData.technologie,
        serie: formData.serie,
        modele: formData.modele,
        description: formData.description,
        debit: formData.debit,
        hauteur_refoulement: formData.hauteur_refoulement,
        viscosite: formData.viscosite,
        type_entrainement: formData.type_entrainement,
        compatibilite: formData.compatibilite,
        domaines_activite: formData.domaines_activite,
        domaines_application: formData.domaines_application,
        avantages: formData.avantages,
        caracteristiques_techniques: Object.fromEntries(
          formData.caracteristiques_techniques
            .filter(c => c.nom && c.valeur) // Ne garder que les caractéristiques complètes
            .map(c => [c.nom, c.valeur])
        )
      };

      // Ajouter les images uniquement si elles ont été modifiées
      if (mainImage) {
        productData.image_principale = mainImage;
      }
      if (secondaryImages.length > 0) {
        productData.images_secondaires = secondaryImages;
      }

      if (editMode && productId) {
        // Mode modification
        console.log('Tentative de modification du produit:', productId);
        console.log('Nouvelles données:', productData);
        
        try {
          // 1. Préparer les données de mise à jour
          const updateData: UpdateData = {
            nom: productData.nom.trim(),
            marque: productData.marque.trim(),
            type_produit: productData.type_produit.trim(),
            technologie: productData.technologie.trim(),
            serie: productData.serie.trim(),
            modele: productData.modele.trim(),
            description: productData.description.trim(),
            debit: productData.debit.trim(),
            hauteur_refoulement: productData.hauteur_refoulement.trim(),
            viscosite: productData.viscosite.trim(),
            type_entrainement: productData.type_entrainement.trim(),
            compatibilite: productData.compatibilite.trim(),
            domaines_activite: productData.domaines_activite,
            domaines_application: productData.domaines_application,
            avantages: productData.avantages,
            caracteristiques_techniques: productData.caracteristiques_techniques
          };

          if (productData.image_principale) {
            updateData.image_principale = productData.image_principale;
          }
          if (productData.images_secondaires && productData.images_secondaires.length > 0) {
            updateData.images_secondaires = productData.images_secondaires;
          }

          console.log('Données à mettre à jour:', updateData);

          // 2. Appeler la fonction RPC
          const { data: updatedProduct, error: updateError } = await supabase
            .rpc('update_product', {
              product_id: productId,
              product_data: updateData
            });

          if (updateError) {
            console.error('Erreur lors de la modification:', updateError);
            throw updateError;
          }

          if (!updatedProduct) {
            throw new Error('La mise à jour n\'a pas retourné de données');
          }

          console.log('Données après mise à jour:', updatedProduct);

          // 3. Vérifier que la mise à jour a réussi
          if (updatedProduct.nom !== updateData.nom) {
            throw new Error('La mise à jour n\'a pas été effectuée correctement');
          }

          // 4. Mettre à jour l'état local
          const updatedProducts = products.map(p => 
            p.id === productId ? updatedProduct : p
          );
          setProducts(updatedProducts);

          // 5. Réinitialiser le formulaire
          setFormData(initialFormData);
          setEditMode(false);
          setProductId(null);

          alert('Produit modifié avec succès');
        } catch (error: any) {
          console.error('Erreur détaillée:', error);
          alert(error.message || 'Erreur lors de la modification du produit');
        }
      } else {
        // Mode création
        const { data: newProduct, error: insertError } = await supabase
          .from('produits')
          .insert([productData])
          .select()
          .single();

        if (insertError) {
          console.error('Erreur lors de la création:', insertError);
          throw insertError;
        }

        // Ajouter le nouveau produit à la liste
        setProducts(prev => [newProduct, ...prev]);
      }

      // Réinitialiser le formulaire
      setFormData(initialFormData);
      setEditMode(false);
      setProductId(null);

      // Rafraîchir une dernière fois pour être sûr
      await fetchProducts();
      
      alert(editMode ? 'Produit modifié avec succès' : 'Produit ajouté avec succès');
    } catch (error: any) {
      console.error('Erreur détaillée:', error);
      alert(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    setLoading(true);

    try {
      console.log('Tentative de suppression du produit:', productId);

      // 1. Vérifier que le produit existe
      const { data: product, error: fetchError } = await supabase
        .from('produits')
        .select('*')
        .eq('id', productId)
        .single();

      if (fetchError) {
        console.error('Erreur lors de la récupération du produit:', fetchError);
        throw fetchError;
      }

      if (!product) {
        throw new Error('Produit non trouvé');
      }

      console.log('Produit à supprimer:', product);

      // 2. Supprimer les images
      if (product.image_principale) {
        console.log('Suppression de l\'image principale:', product.image_principale);
        const { error: deleteMainError } = await supabase.storage
          .from('images')
          .remove([product.image_principale]);
        
        if (deleteMainError) {
          console.warn('Erreur lors de la suppression de l\'image principale:', deleteMainError);
        }
      }

      if (product.images_secondaires?.length > 0) {
        console.log('Suppression des images secondaires:', product.images_secondaires);
        const { error: deleteSecondaryError } = await supabase.storage
          .from('images')
          .remove(product.images_secondaires);
        
        if (deleteSecondaryError) {
          console.warn('Erreur lors de la suppression des images secondaires:', deleteSecondaryError);
        }
      }

      // 3. Supprimer le produit
      const { error: deleteError } = await supabase
        .from('produits')
        .delete()
        .eq('id', productId);

      if (deleteError) {
        console.error('Erreur lors de la suppression du produit:', deleteError);
        throw deleteError;
      }

      console.log('Produit supprimé avec succès');

      // 4. Réinitialiser le formulaire si nécessaire
      if (productId === productId) {
        setFormData(initialFormData);
        setEditMode(false);
        setProductId(null);
      }

      // 5. Rafraîchir la liste
      await fetchProducts();
      
      alert('Produit supprimé avec succès');
    } catch (error: any) {
      console.error('Erreur détaillée:', error);
      alert(error.message || 'Une erreur est survenue lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        throw error;
      }

      // Forcer un rafraîchissement complet de la liste
      setProducts([]);
      setTimeout(() => {
        setProducts(data || []);
      }, 100);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      alert('Erreur lors de la récupération des produits');
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          nom: data.nom || '',
          marque: data.marque || '',
          type_produit: data.type_produit || '',
          technologie: data.technologie || '',
          serie: data.serie || '',
          modele: data.modele || '',
          description: data.description || '',
          debit: data.debit || '',
          hauteur_refoulement: data.hauteur_refoulement || '',
          viscosite: data.viscosite || '',
          type_entrainement: data.type_entrainement || '',
          compatibilite: data.compatibilite || '',
          domaines_activite: data.domaines_activite || [],
          domaines_application: data.domaines_application || [],
          avantages: data.avantages || [],
          caracteristiques_techniques: Object.entries(data.caracteristiques_techniques || {}).map(([nom, valeur]) => ({ 
            nom, 
            valeur: typeof valeur === 'string' ? valeur : String(valeur)
          })),
          image_principale: null,
          images_secondaires: []
        });
        
        // Stocker les URLs des images existantes
        if (data.image_principale) {
          setExistingMainImage(data.image_principale);
        }
        if (data.images_secondaires) {
          setExistingSecondaryImages(data.images_secondaires);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
      alert('Erreur lors du chargement du produit');
    }
  };

  const handleImageUpload = async () => {
    try {
      const timestamp = Math.random();
      let mainImage = null;
      let secondaryImages = [];

      if (formData.image_principale) {
        const cleanFileName = `${timestamp}_${formData.image_principale.name}`
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[']/g, '')
          .replace(/[^a-zA-Z0-9\-_.]/g, '_');

        const filePath = `products/${cleanFileName}`;

        const { data: mainImageData, error: mainImageError } = await supabase.storage
          .from('images')
          .upload(filePath, formData.image_principale, {
            cacheControl: '3600',
            upsert: false
          });

        if (mainImageError) {
          throw mainImageError;
        }

        mainImage = filePath;
      }

      if (formData.images_secondaires.length > 0) {
        for (const file of formData.images_secondaires) {
          const cleanFileName = `${timestamp}_${file.name}`
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[']/g, '')
            .replace(/[^a-zA-Z0-9\-_.]/g, '_');

          const filePath = `products/${cleanFileName}`;

          const { data: secondaryImageData, error: secondaryImageError } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (secondaryImageError) {
            throw secondaryImageError;
          }

          secondaryImages.push(filePath);
        }
      }

      return {
        mainImage,
        secondaryImages
      };
    } catch (error) {
      throw error;
    }
  };

  const setFormDataFromProduct = (product: ProductData) => {
    setFormData({
      nom: product.nom || '',
      marque: product.marque || '',
      type_produit: product.type_produit || '',
      technologie: product.technologie || '',
      serie: product.serie || '',
      modele: product.modele || '',
      description: product.description || '',
      debit: product.debit || '',
      hauteur_refoulement: product.hauteur_refoulement || '',
      viscosite: product.viscosite || '',
      type_entrainement: product.type_entrainement || '',
      compatibilite: product.compatibilite || '',
      domaines_activite: product.domaines_activite || [],
      domaines_application: product.domaines_application || [],
      avantages: product.avantages || [],
      caracteristiques_techniques: Object.entries(product.caracteristiques_techniques || {}).map(([nom, valeur]) => ({ 
        nom, 
        valeur: typeof valeur === 'string' ? valeur : String(valeur)
      })),
      image_principale: null,
      images_secondaires: []
    });
  };

  const ajouterCaracteristique = () => {
    setFormData(prev => ({
      ...prev,
      caracteristiques_techniques: [...prev.caracteristiques_techniques, { nom: '', valeur: '' }]
    }));
  };

  const supprimerCaracteristique = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caracteristiques_techniques: prev.caracteristiques_techniques.filter((_, i) => i !== index)
    }));
  };

  const updateCaracteristique = (index: number, field: 'nom' | 'valeur', value: string) => {
    setFormData(prev => ({
      ...prev,
      caracteristiques_techniques: prev.caracteristiques_techniques.map((carac, i) => 
        i === index ? { ...carac, [field]: value } : carac
      )
    }));
  };

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const id = searchParams.get('id');
    if (id) {
      setEditMode(true);
      setProductId(id);
      fetchProduct(id);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {editMode ? 'Modifier un produit' : 'Ajouter un nouveau produit'}
          </h1>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
              {editMode ? 'Produit modifié avec succès !' : 'Produit ajouté avec succès !'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Informations de base
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Marque
                  </label>
                  <select
                    name="marque"
                    value={formData.marque}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="">Sélectionner une marque</option>
                    {MARQUES.map(marque => (
                      <option key={marque} value={marque}>
                        {marque}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de produit
                  </label>
                  <select
                    name="type_produit"
                    value={formData.type_produit}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="">Sélectionner un type</option>
                    {TYPES_POMPES.map(type => (
                      <option key={type} value={type}>
                        {type}
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
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Description détaillée du produit..."
              />
            </div>

            {/* Caractéristiques techniques */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Caractéristiques techniques
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                <div className="sm:col-span-2">
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
            </div>

            {/* Caractéristiques techniques personnalisées */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Caractéristiques Techniques</h3>
              
              {formData.caracteristiques_techniques.map((carac, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nom de la caractéristique"
                    value={carac.nom}
                    onChange={(e) => updateCaracteristique(index, 'nom', e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Valeur"
                    value={carac.valeur}
                    onChange={(e) => updateCaracteristique(index, 'valeur', e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => supprimerCaracteristique(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={ajouterCaracteristique}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Ajouter une caractéristique
              </button>
            </div>

            {/* Domaines d'activité */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                <strong>Secteurs d'activité</strong>
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {DOMAINES_ACTIVITE.map((domaine) => (
                  <label key={domaine} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.domaines_activite.includes(domaine)}
                      onChange={(e) => {
                        const newDomaines = e.target.checked
                          ? [...formData.domaines_activite, domaine]
                          : formData.domaines_activite.filter(d => d !== domaine);
                        setFormData(prev => ({ ...prev, domaines_activite: newDomaines }));
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{domaine}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Domaines d'application */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <strong>Description des applications</strong>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Décrivez les applications spécifiques avec leur titre en les séparant par " : "
              </p>
              <div className="space-y-4">
                {formData.domaines_application.map((domaine, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={domaine}
                      onChange={(e) => {
                        const newDomaines = [...formData.domaines_application];
                        newDomaines[index] = e.target.value;
                        setFormData(prev => ({ ...prev, domaines_application: newDomaines }));
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Titre : Description de l'application"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newDomaines = formData.domaines_application.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, domaines_application: newDomaines }));
                      }}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      domaines_application: [...prev.domaines_application, '']
                    }));
                  }}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Ajouter une application
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Aperçu :</p>
                <div className="p-4 bg-gray-50 rounded-lg mt-2">
                  <FormattedText text={formData.domaines_application.join('\n')} />
                </div>
              </div>
            </div>

            {/* Avantages */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                <strong>Avantages du produit</strong>
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Listez les avantages avec leur titre en les séparant par " : "
              </p>
              <div className="space-y-4">
                {formData.avantages.map((avantage, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={avantage}
                      onChange={(e) => {
                        const newAvantages = [...formData.avantages];
                        newAvantages[index] = e.target.value;
                        setFormData(prev => ({ ...prev, avantages: newAvantages }));
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Titre : Description de l'avantage"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newAvantages = formData.avantages.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, avantages: newAvantages }));
                      }}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      avantages: [...prev.avantages, '']
                    }));
                  }}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Ajouter un avantage
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Aperçu :</p>
                <div className="p-4 bg-gray-50 rounded-lg mt-2">
                  <FormattedText text={formData.avantages.join('\n')} />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                <strong>Images</strong>
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image principale
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary-dark"
                />
                {formData.image_principale && (
                  <p className="mt-2 text-sm text-gray-500">
                    Image sélectionnée : {formData.image_principale.name}
                  </p>
                )}
                {existingMainImage && (
                  <p className="mt-2 text-sm text-gray-500">
                    Image existante : <img src={existingMainImage} alt="Image existante" />
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Images secondaires (maximum 4)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, false)}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary-dark"
                />
                {formData.images_secondaires.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Images sélectionnées ({formData.images_secondaires.length}/4) :
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {formData.images_secondaires.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {existingSecondaryImages && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Images existantes ({existingSecondaryImages.length}) :
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {existingSecondaryImages.map((image, index) => (
                        <li key={index}>
                          <img src={image} alt="Image existante" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {loading ? (editMode ? 'Modification en cours...' : 'Ajout en cours...') : (editMode ? 'Modifier le produit' : 'Ajouter le produit')}
              </button>
              {editMode && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialFormData);
                      setEditMode(false);
                      setProductId(null);
                    }}
                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={() => productId && handleDelete(productId)}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Liste des produits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setEditMode(true);
                setProductId(product.id || null);
                setFormDataFromProduct(product);
              }}
            >
              <h3 className="font-bold">{product.nom}</h3>
              <p className="text-gray-600">{product.marque}</p>
              <p className="text-sm text-gray-500">{product.type_produit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

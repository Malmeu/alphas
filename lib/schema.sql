-- Suppression des anciennes politiques
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON products;
DROP POLICY IF EXISTS "Give public access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes from products bucket" ON storage.objects;
DROP POLICY IF EXISTS "Tout le monde peut lire les produits" ON products;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent créer des produits" ON products;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent modifier les produits" ON products;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent supprimer les produits" ON products;
DROP POLICY IF EXISTS "Accès public aux images" ON storage.objects;
DROP POLICY IF EXISTS "Upload d'images pour utilisateurs authentifiés" ON storage.objects;
DROP POLICY IF EXISTS "Suppression d'images pour utilisateurs authentifiés" ON storage.objects;
DROP POLICY IF EXISTS "allow_all" ON products;
DROP POLICY IF EXISTS "allow_all_storage" ON storage.objects;

-- Suppression de toutes les politiques existantes
DROP POLICY IF EXISTS "allow_all" ON products;
DROP POLICY IF EXISTS "allow_all_operations" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON products;

-- Suppression de toutes les politiques de stockage
DROP POLICY IF EXISTS "allow_public_select" ON storage.objects;
DROP POLICY IF EXISTS "allow_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "allow_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON storage.objects;
DROP POLICY IF EXISTS "Donner l'accès public en lecture aux fichiers" ON storage.objects;
DROP POLICY IF EXISTS "Permettre le téléchargement d'images pour les utilisateurs authentifiés" ON storage.objects;
DROP POLICY IF EXISTS "Permettre la mise à jour des images pour les utilisateurs authentifiés" ON storage.objects;
DROP POLICY IF EXISTS "Permettre la suppression des images pour les utilisateurs authentifiés" ON storage.objects;

-- Suppression des tables existantes si nécessaire
DROP TABLE IF EXISTS products;

-- Création de la table products si elle n'existe pas
CREATE TABLE IF NOT EXISTS products (
    id uuid default gen_random_uuid() primary key,
    nom text not null,
    type_produit text not null,
    technologie text,
    serie text,
    modele text,
    marque text not null,
    description text,
    secteurs_activite text[] default '{}',
    domaines_application text,
    debit text,
    hauteur_refoulement text,
    viscosite text,
    type_entrainement text,
    compatibilite text,
    caracteristiques_supplementaires jsonb[] default '{}',
    avantages text,
    image_principale text,
    images_secondaires text[] default '{}',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activation de RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Création d'une politique simple permettant toutes les opérations sur products
CREATE POLICY "allow_all_operations"
ON products
FOR ALL
USING (true)
WITH CHECK (true);

-- Mise à jour de la table products pour les images
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_principale text,
ADD COLUMN IF NOT EXISTS images_secondaires text[] DEFAULT '{}';

-- Création des politiques de stockage pour les images
CREATE POLICY "Accès public aux images de produits"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Upload d'images pour utilisateurs authentifiés"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

CREATE POLICY "Mise à jour d'images pour utilisateurs authentifiés"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

CREATE POLICY "Suppression d'images pour utilisateurs authentifiés"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- Suppression du bucket s'il existe
DO $$
BEGIN
    DELETE FROM storage.buckets WHERE id = 'products';
END $$;

-- Création du bucket products s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

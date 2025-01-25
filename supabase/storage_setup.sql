-- Politiques de sécurité pour le bucket 'images'

-- Politique pour permettre l'accès public en lecture
CREATE POLICY "Accès public en lecture pour les images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Politique pour permettre l'upload aux utilisateurs authentifiés
CREATE POLICY "Upload d'images pour les utilisateurs authentifiés"
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'products'
);

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "Mise à jour d'images pour les utilisateurs authentifiés"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'products'
);

-- Politique pour permettre la suppression aux utilisateurs authentifiés
CREATE POLICY "Suppression d'images pour les utilisateurs authentifiés"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'products'
);

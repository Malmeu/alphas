-- Suppression des politiques
DROP POLICY IF EXISTS "Permettre la lecture publique des produits" ON produits;
DROP POLICY IF EXISTS "Permettre l'écriture aux utilisateurs authentifiés" ON produits;

-- Suppression du trigger
DROP TRIGGER IF EXISTS update_produits_updated_at ON produits;

-- Suppression de la fonction
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Suppression des index
DROP INDEX IF EXISTS idx_produits_marque;
DROP INDEX IF EXISTS idx_produits_type_produit;
DROP INDEX IF EXISTS idx_produits_created_at;

-- Suppression de la table
DROP TABLE IF EXISTS produits;

-- Suppression des types énumérés
DROP TYPE IF EXISTS type_pompe;
DROP TYPE IF EXISTS domaine_application;
DROP TYPE IF EXISTS marque_pompe;

DO $$ 
BEGIN
    -- Désactiver la vérification des clés étrangères
    SET session_replication_role = 'replica';

    -- Suppression des politiques si elles existent
    IF EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Permettre la lecture publique des produits') THEN
        DROP POLICY "Permettre la lecture publique des produits" ON produits;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Permettre l''écriture aux utilisateurs authentifiés') THEN
        DROP POLICY "Permettre l'écriture aux utilisateurs authentifiés" ON produits;
    END IF;

    -- Suppression du trigger s'il existe
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_produits_updated_at') THEN
        DROP TRIGGER IF EXISTS update_produits_updated_at ON produits;
    END IF;

    -- Suppression de la fonction si elle existe
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        DROP FUNCTION IF EXISTS update_updated_at_column();
    END IF;

    -- Suppression des index s'ils existent
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'idx_produits_marque') THEN
        DROP INDEX IF EXISTS idx_produits_marque;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'idx_produits_type_produit') THEN
        DROP INDEX IF EXISTS idx_produits_type_produit;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'idx_produits_created_at') THEN
        DROP INDEX IF EXISTS idx_produits_created_at;
    END IF;

    -- Suppression de la table si elle existe
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'produits') THEN
        DROP TABLE IF EXISTS produits CASCADE;
    END IF;

    -- Suppression des types s'ils existent
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'type_pompe') THEN
        DROP TYPE IF EXISTS type_pompe CASCADE;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'marque_pompe') THEN
        DROP TYPE IF EXISTS marque_pompe CASCADE;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'domaine_activite') THEN
        DROP TYPE IF EXISTS domaine_activite CASCADE;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'domaine_application') THEN
        DROP TYPE IF EXISTS domaine_application CASCADE;
    END IF;

    -- Réactiver la vérification des clés étrangères
    SET session_replication_role = 'origin';
END $$;

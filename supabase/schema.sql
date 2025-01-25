-- Création des types énumérés
CREATE TYPE type_pompe AS ENUM (
  'Pompes centrifuges',
  'Pompes vide-fut',
  'Anti-belier',
  'Moto-pompes',
  'anti-incendie',
  'Stations d''épuration',
  'Pompes volumétriques',
  'Station de relevage'
);

CREATE TYPE domaine_application AS ENUM (
  'Industrie',
  'Gaz & Oil',
  'Agriculture',
  'Bâtiment et TP',
  'Anti-incendies',
  'Stations de relevage',
  'Stations d''épuration',
  'Système d''irrigation',
  'Pharmacie et Cosmétique'
);

CREATE TYPE domaine_activite AS ENUM (
  'Industrie',
  'Gaz & Oil',
  'Agriculture',
  'Bâtiment et TP',
  'Anti-incendies',
  'Stations de relevage',
  'Stations d''épuration',
  'Système d''irrigation',
  'Pharmacie et Cosmétique'
);

CREATE TYPE marque_pompe AS ENUM (
  'Oflow',
  'Orex',
  'Al Demating',
  'Al fire',
  'FLUX'
);

-- Création de la table produits
CREATE TABLE produits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR NOT NULL,
  marque marque_pompe NOT NULL,
  type_produit type_pompe NOT NULL,
  technologie VARCHAR,
  serie VARCHAR,
  modele VARCHAR,
  description TEXT,
  domaines_activite domaine_activite[] DEFAULT '{}' NOT NULL,
  domaines_application domaine_application[] DEFAULT '{}' NOT NULL,
  debit VARCHAR,
  hauteur_refoulement VARCHAR,
  viscosite VARCHAR,
  type_entrainement VARCHAR,
  compatibilite VARCHAR,
  image_principale VARCHAR,
  images_secondaires VARCHAR[] DEFAULT '{}',
  avantages TEXT[] DEFAULT '{}',
  caracteristiques_techniques JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Création de l'index sur la marque
CREATE INDEX idx_produits_marque ON produits (marque);

-- Création de l'index sur le type de produit
CREATE INDEX idx_produits_type_produit ON produits (type_produit);

-- Création de l'index sur la date de création
CREATE INDEX idx_produits_created_at ON produits (created_at);

-- Fonction pour mettre à jour la date de modification
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour la date de modification
CREATE TRIGGER update_produits_updated_at
  BEFORE UPDATE ON produits
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Fonction pour mettre à jour un produit
CREATE OR REPLACE FUNCTION update_product(
  product_id UUID,
  product_data JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_row produits;
  domaines_activite_array domaine_activite[];
  domaines_application_array domaine_application[];
BEGIN
  -- Convertir les tableaux d'énumérations
  SELECT ARRAY(
    SELECT DISTINCT unnest.value::domaine_activite
    FROM jsonb_array_elements_text(product_data->'domaines_activite') AS unnest(value)
  ) INTO domaines_activite_array;

  SELECT ARRAY(
    SELECT DISTINCT unnest.value::domaine_application
    FROM jsonb_array_elements_text(product_data->'domaines_application') AS unnest(value)
  ) INTO domaines_application_array;

  -- Faire la mise à jour
  UPDATE produits
  SET 
    nom = COALESCE((product_data->>'nom')::VARCHAR, nom),
    marque = COALESCE((product_data->>'marque')::marque_pompe, marque),
    type_produit = COALESCE((product_data->>'type_produit')::type_pompe, type_produit),
    technologie = COALESCE((product_data->>'technologie')::VARCHAR, technologie),
    serie = COALESCE((product_data->>'serie')::VARCHAR, serie),
    modele = COALESCE((product_data->>'modele')::VARCHAR, modele),
    description = COALESCE((product_data->>'description')::TEXT, description),
    debit = COALESCE((product_data->>'debit')::VARCHAR, debit),
    hauteur_refoulement = COALESCE((product_data->>'hauteur_refoulement')::VARCHAR, hauteur_refoulement),
    viscosite = COALESCE((product_data->>'viscosite')::VARCHAR, viscosite),
    type_entrainement = COALESCE((product_data->>'type_entrainement')::VARCHAR, type_entrainement),
    compatibilite = COALESCE((product_data->>'compatibilite')::VARCHAR, compatibilite),
    domaines_activite = COALESCE(domaines_activite_array, domaines_activite),
    domaines_application = COALESCE(domaines_application_array, domaines_application),
    avantages = COALESCE((SELECT ARRAY(SELECT jsonb_array_elements_text(product_data->'avantages'))), avantages),
    image_principale = COALESCE((product_data->>'image_principale')::VARCHAR, image_principale),
    images_secondaires = COALESCE((SELECT ARRAY(SELECT jsonb_array_elements_text(product_data->'images_secondaires'))), images_secondaires),
    caracteristiques_techniques = COALESCE(product_data->'caracteristiques_techniques', caracteristiques_techniques),
    updated_at = NOW()
  WHERE id = product_id
  RETURNING *
  INTO updated_row;

  IF updated_row IS NULL THEN
    RAISE EXCEPTION 'Product not found or update failed';
  END IF;

  RETURN row_to_json(updated_row)::JSONB;
END;
$$;

-- Politiques de sécurité
ALTER TABLE produits ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
CREATE POLICY "Permettre la lecture publique des produits"
  ON produits
  FOR SELECT
  USING (true);

-- Politique pour permettre l'écriture aux utilisateurs authentifiés
CREATE POLICY "Permettre l'écriture aux utilisateurs authentifiés"
  ON produits
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

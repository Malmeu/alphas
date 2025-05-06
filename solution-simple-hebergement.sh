#!/bin/bash

# Script de pru00e9paration simplifiu00e9 pour l'hu00e9bergement mutualisu00e9
echo "Pru00e9paration d'une solution simplifiu00e9e pour Alphas..."

# Cru00e9er le dossier de destination
DEST_DIR="./alphas-solution-simple"
mkdir -p "$DEST_DIR"

# Construire le site en mode statique
echo "Configuration du mode statique..."
cat > "next.config.js.static" << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['wjyadfujajdeuojxtzar.supabase.co', 'lunatech.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
EOL

# Sauvegarder la configuration actuelle
cp next.config.js next.config.js.backup

# Appliquer la configuration statique
cp next.config.js.static next.config.js

# Construire le site en mode statique
echo "Construction du site en mode statique..."
npm run build

# Copier les fichiers statiques
echo "Copie des fichiers statiques..."
cp -r ./out/* "$DEST_DIR/"

# Cru00e9er un fichier .htaccess pour la redirection
echo "Cru00e9ation du fichier .htaccess..."
cat > "$DEST_DIR/.htaccess" << 'EOL'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Ne pas appliquer les ru00e8gles aux fichiers et dossiers existants
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Rediriger les requ00eates sans extension vers le fichier HTML correspondant
    RewriteRule ^([^.]+)$ $1.html [L]
</IfModule>

# Activer la compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOL

# Cru00e9er un fichier README avec les instructions
echo "Cru00e9ation du fichier README..."
cat > "$DEST_DIR/README.txt" << 'EOL'
Du00e9ploiement du site Alphas sur hu00e9bergement mutualisu00e9 (Version Simplifiu00e9e)
==================================================================

Instructions de du00e9ploiement :

1. Tu00e9lu00e9chargez tous les fichiers de ce dossier sur votre hu00e9bergement mutualisu00e9
   via FTP ou le gestionnaire de fichiers de votre hu00e9bergeur.

2. Placez tous les fichiers u00e0 la racine de votre dossier public_html.

3. Assurez-vous que le fichier .htaccess est bien u00e0 la racine.

4. Vu00e9rifiez que le module mod_rewrite est activu00e9 sur votre hu00e9bergement.

Remarque : Cette version est une exportation statique du site. Les fonctionnalitu00e9s
dynamiques comme l'administration et les routes API ne fonctionneront pas.
EOL

# Restaurer la configuration originale
cp next.config.js.backup next.config.js
rm next.config.js.static

echo "Pru00e9paration terminu00e9e ! Les fichiers sont pru00eats dans le dossier $DEST_DIR"
echo "Suivez les instructions dans README.txt pour du00e9ployer sur votre hu00e9bergement mutualisu00e9."

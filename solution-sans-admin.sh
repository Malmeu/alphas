#!/bin/bash

# Script de pru00e9paration pour l'hu00e9bergement mutualisu00e9 sans les pages admin
echo "Pru00e9paration d'une solution sans admin pour Alphas..."

# Cru00e9er le dossier de destination
DEST_DIR="./alphas-solution-finale"
mkdir -p "$DEST_DIR"

# Sauvegarder les fichiers originaux
echo "Sauvegarde des fichiers originaux..."
cp -f next.config.js next.config.js.backup

# Cru00e9er un fichier temporaire pour exclure les routes admin
cat > "temp-exclude-admin.js" << 'EOL'
// Fichier temporaire pour exclure les routes admin
const fs = require('fs');
const path = require('path');

// Cru00e9er un dossier temporaire pour stocker les fichiers modifiu00e9s
const tempDir = path.join(__dirname, 'temp-app');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Copier tous les fichiers sauf le dossier admin
function copyDirExcludeAdmin(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name === 'admin') {
        // Cru00e9er un fichier placeholder pour le dossier admin
        const adminDir = path.join(dest, 'admin');
        fs.mkdirSync(adminDir, { recursive: true });
        fs.writeFileSync(
          path.join(adminDir, 'page.tsx'),
          "export default function AdminPage() { return <div>Admin non disponible en mode statique</div>; }\n"
        );
      } else {
        fs.mkdirSync(destPath, { recursive: true });
        copyDirExcludeAdmin(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copier le contenu du dossier app en excluant admin
const appDir = path.join(__dirname, 'app');
const tempAppDir = path.join(tempDir, 'app');
fs.mkdirSync(tempAppDir, { recursive: true });

copyDirExcludeAdmin(appDir, tempAppDir);

console.log('Fichiers temporaires cru00e9u00e9s avec succu00e8s!');
EOL

# Exu00e9cuter le script pour exclure les routes admin
echo "Exclusion des routes admin..."
node temp-exclude-admin.js

# Sauvegarder le dossier app original
echo "Sauvegarde du dossier app original..."
mv app app.backup

# Utiliser la version temporaire sans admin
echo "Utilisation de la version sans admin..."
mv temp-app/app app

# Modifier la configuration Next.js pour l'exportation statique
echo "Configuration pour l'exportation statique..."
cat > "next.config.js" << 'EOL'
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
Du00e9ploiement du site Alphas sur hu00e9bergement mutualisu00e9 (Version Finale)
==================================================================

Instructions de du00e9ploiement :

1. Tu00e9lu00e9chargez tous les fichiers de ce dossier sur votre hu00e9bergement mutualisu00e9
   via FTP ou le gestionnaire de fichiers de votre hu00e9bergeur.

2. Placez tous les fichiers u00e0 la racine de votre dossier public_html.

3. Assurez-vous que le fichier .htaccess est bien u00e0 la racine.

4. Vu00e9rifiez que le module mod_rewrite est activu00e9 sur votre hu00e9bergement.

Remarque : Cette version est une exportation statique du site sans les
fonctionnalitu00e9s d'administration. Les pages publiques fonctionneront
correctement, mais l'administration des produits n'est pas disponible
dans cette version.
EOL

# Restaurer les fichiers originaux
echo "Restauration des fichiers originaux..."
rm -rf app
mv app.backup app
cp -f next.config.js.backup next.config.js
rm -f next.config.js.backup
rm -f temp-exclude-admin.js
rm -rf temp-app

echo "Pru00e9paration terminu00e9e ! Les fichiers sont pru00eats dans le dossier $DEST_DIR"
echo "Suivez les instructions dans README.txt pour du00e9ployer sur votre hu00e9bergement mutualisu00e9."

#!/bin/bash

# Script de pru00e9paration amu00e9lioru00e9 pour l'hu00e9bergement mutualisu00e9
echo "Pru00e9paration du site Alphas pour l'hu00e9bergement mutualisu00e9..."

# Cru00e9er le dossier de destination
DEST_DIR="./alphas-shared-hosting-v2"
mkdir -p "$DEST_DIR"

# Copier les fichiers statiques
echo "Copie des fichiers statiques..."
cp -r ./.next/static "$DEST_DIR/static"
cp -r ./public "$DEST_DIR/public"

# Copier les fichiers du serveur Next.js
echo "Copie des fichiers du serveur Next.js..."
mkdir -p "$DEST_DIR/.next/server/pages"
cp -r ./.next/server/pages "$DEST_DIR/.next/server/"

# Copier les fichiers de configuration
echo "Copie des fichiers de configuration..."
cp ./.env.local "$DEST_DIR/.env.local"

# Cru00e9er un fichier .htaccess pour la redirection
echo "Cru00e9ation du fichier .htaccess..."
cat > "$DEST_DIR/.htaccess" << 'EOL'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Ne pas appliquer les ru00e8gles aux fichiers et dossiers existants
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Ru00e8gles pour les ressources statiques
    RewriteRule ^_next/static/(.*)$ static/$1 [L]
    
    # Ru00e8gles pour les images
    RewriteRule ^public/(.*)$ public/$1 [L]
    
    # Toutes les autres requu00eates vers index.php
    RewriteRule ^(.*)$ index.php [L,QSA]
</IfModule>

# Activer la compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Du00e9finir les types MIME
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg
AddType application/json .json

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

# Cru00e9er un fichier PHP pour servir l'application
echo "Cru00e9ation du fichier index.php..."
cat > "$DEST_DIR/index.php" << 'EOL'
<?php
// Fichier de point d'entru00e9e pour l'application Next.js sur hu00e9bergement mutualisu00e9

// Charger les variables d'environnement
$env_file = __DIR__ . '/.env.local';
if (file_exists($env_file)) {
    $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Du00e9terminer la route demandu00e9e
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Nettoyer le chemin
$path = rtrim($path, '/');
if (empty($path)) {
    $path = '/';
}

// Vu00e9rifier si c'est une ressource statique
if (preg_match('/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/', $path)) {
    // Servir le fichier statique directement
    $file_path = __DIR__ . $path;
    if (file_exists($file_path)) {
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $content_types = [
            'js' => 'application/javascript',
            'css' => 'text/css',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'ico' => 'image/x-icon',
            'svg' => 'image/svg+xml',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject'
        ];
        
        if (isset($content_types[$extension])) {
            header('Content-Type: ' . $content_types[$extension]);
        }
        
        readfile($file_path);
        exit;
    }
}

// Pour les routes API, renvoyer une erreur JSON
if (strpos($path, '/api/') === 0) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'API routes are not supported in this environment']);
    exit;
}

// Du00e9terminer le chemin du fichier HTML
$html_path = $path;
if ($path === '/') {
    $html_path = '/index';
}

// Vu00e9rifier si le fichier HTML existe
$html_file = __DIR__ . '/.next/server/pages' . $html_path . '.html';

if (file_exists($html_file)) {
    // Lire le contenu HTML
    $html_content = file_get_contents($html_file);
    
    // Remplacer les chemins _next/static par static
    $html_content = str_replace('"/_next/static/', '"/static/', $html_content);
    
    // Afficher le contenu HTML modifiu00e9
    echo $html_content;
} else {
    // Essayer avec /index.html si disponible
    if ($path !== '/' && file_exists(__DIR__ . '/.next/server/pages/index.html')) {
        $html_content = file_get_contents(__DIR__ . '/.next/server/pages/index.html');
        $html_content = str_replace('"/_next/static/', '"/static/', $html_content);
        echo $html_content;
    } else {
        // Page 404 si la page demandu00e9e n'existe pas
        header('HTTP/1.0 404 Not Found');
        if (file_exists(__DIR__ . '/.next/server/pages/404.html')) {
            $html_content = file_get_contents(__DIR__ . '/.next/server/pages/404.html');
            $html_content = str_replace('"/_next/static/', '"/static/', $html_content);
            echo $html_content;
        } else {
            echo '<h1>404 - Page Not Found</h1>';
        }
    }
}
?>
EOL

# Cru00e9er un fichier README avec les instructions
echo "Cru00e9ation du fichier README..."
cat > "$DEST_DIR/README.txt" << 'EOL'
Du00e9ploiement du site Alphas sur hu00e9bergement mutualisu00e9
==================================================

Instructions de du00e9ploiement :

1. Tu00e9lu00e9chargez tous les fichiers de ce dossier sur votre hu00e9bergement mutualisu00e9
   via FTP ou le gestionnaire de fichiers de votre hu00e9bergeur.

2. Assurez-vous que les fichiers .htaccess et index.php sont u00e0 la racine de
   votre domaine ou sous-domaine.

3. Vu00e9rifiez que le module mod_rewrite est activu00e9 sur votre hu00e9bergement.

4. Si votre hu00e9bergeur utilise PHP-FPM, vous devrez peut-u00eatre ajuster les
   configurations dans le fichier .htaccess.

5. Assurez-vous que les variables d'environnement dans .env.local sont correctes
   pour votre environnement de production.

Structure des fichiers :

- .htaccess : Configuration Apache pour les redirections
- index.php : Point d'entru00e9e principal qui sert les pages HTML
- .env.local : Variables d'environnement
- static/ : Fichiers JavaScript, CSS et autres ressources statiques
- public/ : Images et autres fichiers publics
- .next/server/pages/ : Pages HTML gu00e9nu00e9ru00e9es par Next.js

Remarque : Cette configuration est une solution de contournement pour exu00e9cuter
une application Next.js sur un hu00e9bergement mutualisu00e9 standard. Certaines
fonctionnalitu00e9s dynamiques comme les routes API ne fonctionneront pas.
EOL

echo "Pru00e9paration terminu00e9e ! Les fichiers sont pru00eats dans le dossier $DEST_DIR"
echo "Suivez les instructions dans README.txt pour du00e9ployer sur votre hu00e9bergement mutualisu00e9."

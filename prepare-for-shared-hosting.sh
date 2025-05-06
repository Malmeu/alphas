#!/bin/bash

# Script de préparation pour l'hébergement mutualisé
echo "Préparation du site Alphas pour l'hébergement mutualisé..."

# Créer le dossier de destination
DEST_DIR="./alphas-shared-hosting"
mkdir -p "$DEST_DIR"

# Copier les fichiers statiques
echo "Copie des fichiers statiques..."
cp -r ./.next/static "$DEST_DIR/static"
cp -r ./public "$DEST_DIR/public"

# Copier les fichiers de configuration
echo "Copie des fichiers de configuration..."
cp ./.env.local "$DEST_DIR/.env.local"

# Créer un fichier .htaccess pour la redirection
echo "Création du fichier .htaccess..."
cat > "$DEST_DIR/.htaccess" << 'EOL'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Rediriger toutes les requêtes vers index.php sauf pour les fichiers existants
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php [L,QSA]
</IfModule>
EOL

# Créer un fichier PHP pour servir l'application
echo "Création du fichier index.php..."
cat > "$DEST_DIR/index.php" << 'EOL'
<?php
// Fichier de point d'entrée pour l'application Next.js sur hébergement mutualisé

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

// Déterminer la route demandée
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Vérifier si c'est une ressource statique
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

// Pour les routes API, rediriger vers une page HTML statique
if (strpos($path, '/api/') === 0) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'API routes are not supported in this environment']);
    exit;
}

// Pour toutes les autres routes, servir la page HTML statique correspondante
$html_file = __DIR__ . '/.next/server/pages' . ($path === '/' ? '/index' : $path) . '.html';

if (file_exists($html_file)) {
    readfile($html_file);
} else {
    // Page 404 si la page demandée n'existe pas
    header('HTTP/1.0 404 Not Found');
    readfile(__DIR__ . '/.next/server/pages/404.html');
}
?>
EOL

# Créer un fichier README avec les instructions
echo "Création du fichier README..."
cat > "$DEST_DIR/README.txt" << 'EOL'
Déploiement du site Alphas sur hébergement mutualisé
==================================================

Instructions de déploiement :

1. Téléchargez tous les fichiers de ce dossier sur votre hébergement mutualisé
   via FTP ou le gestionnaire de fichiers de votre hébergeur.

2. Assurez-vous que les fichiers .htaccess et index.php sont à la racine de
   votre domaine ou sous-domaine.

3. Vérifiez que le module mod_rewrite est activé sur votre hébergement.

4. Si votre hébergeur utilise PHP-FPM, vous devrez peut-être ajuster les
   configurations dans le fichier .htaccess.

5. Assurez-vous que les variables d'environnement dans .env.local sont correctes
   pour votre environnement de production.

Remarque : Cette configuration est une solution de contournement pour exécuter
une application Next.js sur un hébergement mutualisé standard. Certaines
fonctionnalités dynamiques comme les routes API ne fonctionneront pas.
EOL

echo "Préparation terminée ! Les fichiers sont prêts dans le dossier $DEST_DIR"
echo "Suivez les instructions dans README.txt pour déployer sur votre hébergement mutualisé."

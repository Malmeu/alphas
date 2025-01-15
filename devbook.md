# Journal de développement - ALPHAS POMPES Website

## Structure du projet
- [x] Initialisation du projet Next.js avec Typescript
- [x] Configuration de Tailwind CSS
- [x] Installation de Supabase
- [x] Configuration des polices et couleurs personnalisées

## Composants de base
- [x] Header avec navigation responsive
- [x] Footer avec informations de contact
- [x] Layout principal

## Pages principales
- [x] Page d'accueil
  - [x] Section héro
  - [x] Section domaines d'activité
  - [ ] Section produits phares
  - [ ] Section actualités

- [x] Page Domaines d'activité
  - [x] Liste des domaines
  - [x] Page exemple (Industrie)
  - [ ] Créer les autres pages de domaines

- [x] Page Produits
  - [x] Catégories de produits
  - [x] Section avantages
  - [ ] Pages détaillées des produits
  - [ ] Filtres de recherche

- [ ] Page Marques
  - [ ] Liste des marques partenaires
  - [ ] Descriptions et logos
  - [ ] Liens vers les catalogues

- [x] Page "Tout sur Alphas"
  - [x] Histoire de l'entreprise
  - [x] Vision et valeurs
  - [x] Déploiement national
  - [x] Objectifs et ambitions

- [x] Page Actualités
  - [x] Liste des actualités
  - [x] Système de filtrage
  - [x] Pagination
  - [x] Newsletter
  - [ ] Intégration avec Supabase

- [ ] Page Actualités
  - [ ] Liste des actualités
  - [ ] Système de filtrage
  - [ ] Pages détaillées des articles

## Fonctionnalités à implémenter
- [ ] Système de recherche global
- [ ] Formulaire de contact
- [ ] Newsletter
- [ ] Catalogue de produits téléchargeable
- [ ] Système de demande de devis

## Base de données (Supabase)
- [ ] Structure des tables
  - [ ] Produits
  - [ ] Marques
  - [ ] Actualités
  - [ ] Demandes de contact
  - [ ] Abonnés newsletter

## Optimisations
- [ ] SEO
- [ ] Performance (Images, CSS, JS)
- [ ] Accessibilité
- [ ] Tests

## Déploiement
- [ ] Configuration du domaine
- [ ] Mise en place CI/CD
- [ ] Configuration des variables d'environnement
- [ ] Tests de production

## Documentation
- [ ] Guide d'utilisation
- [ ] Documentation technique
- [ ] Guide de maintenance

## Journal des modifications

### 15/01/2025 - Page "Tout sur Alphas"

#### Composants créés
1. `Header.tsx`
   - Menu de navigation principal
   - Logo Alphas
   - Sous-menus pour Domaines d'activité, Produits, et Marques
   - Liens vers Tout sur Alphas et Actualité
   - Bouton Contact

2. `NavMenu.tsx`
   - Barre de navigation des produits sous le header
   - Liste horizontale des produits principaux
   - Style cohérent avec le design global

3. `Timeline.tsx`
   - Timeline horizontale interactive
   - Animations avec framer-motion
   - Points de repère pour chaque événement
   - Affichage chronologique de l'histoire d'Alphas

#### Pages modifiées
1. `app/tout-sur-alphas/page.tsx`
   - Nouvelle mise en page avec 4 sections
   - Banner avec image de fond (banner-tout.png)
   - Contenu structuré depuis toutSuralphas.md
   - Animations et transitions fluides
   - Design responsive

2. `app/layout.tsx`
   - Intégration du nouveau Header
   - Ajustements pour le header fixe

#### Dépendances ajoutées
- framer-motion : Pour les animations
- @headlessui/react : Pour les menus déroulants
- @heroicons/react : Pour les icônes

#### Ressources ajoutées
- `/public/images/banner-tout.png` : Image de banner pour la page Tout sur Alphas
- `/public/images/hero2.jpeg` : Image héro alternative

#### Structure des menus
1. Domaines d'activité
   - Industrie
   - Gaz & Oil
   - Agriculture
   - Bâtiment et TP
   - Anti-incendies
   - Stations de relevage
   - Stations d'épuration
   - Système d'irrigation
   - Pharmacie et Cosmétique

2. Produits
   - Pompes centrifuges
   - Pompes vide fût
   - Anti Belier
   - Moto pompes
   - Stations d'epuration
   - Station de relevage

3. Marques
   - Oflow
   - Orex
   - Al Demating
   - Al fire

#### Navigation sous banner
- Pompes Centrifuges
- Pompes Volumetriques
- Pompes vide fût
- Anti incendie
- Moto pompes
- Anti bélier
- Stations de relevage
- Stations d'épuration

#### Timeline Events
- 1982 : Creation de la societe
- 1995 : vente de pompes
- 2005 : premiere certification ISO 9001
- 2017 : creation de la division industrie

### Notes techniques
1. Le header est fixé en haut avec un z-index élevé
2. La page principale a un padding-top pour compenser le header fixe
3. Les animations utilisent framer-motion pour une meilleure performance
4. Les images sont optimisées avec next/image
5. La timeline est scrollable horizontalement sur mobile
6. Les menus déroulants utilisent @headlessui/react pour l'accessibilité

### Prochaines étapes suggérées
1. Optimiser les images pour de meilleures performances
2. Ajouter des tests pour les composants
3. Améliorer l'accessibilité
4. Ajouter des transitions de page
5. Implémenter le responsive design pour les petits écrans

## Notes importantes
- Couleurs principales : #0b65ac (primary), #000000 (secondary), #ffffff (white)
- Polices : Inter pour le texte, Montserrat pour les titres
- Images : Optimiser toutes les images avant mise en production
- Responsive : Tester sur tous les appareils

# Spécification de conception — Site vitrine SalahPub

**Date :** 2026-11-18  
**Statut :** En attente de relecture utilisateur  
**Auteur :** Claude Code (assistant)

---

## 1. Objectif

Créer un site vitrine statique pour l'agence de publicité "SalahPub" inspiré du site de référence pano-plaisir.fr. Le site présente les services de l'agence, ses engagements, ses réalisations, un formulaire de contact et une page "Qui sommes-nous ?". Les modifications de contenu et d'images sont effectuées par le développeur en éditant les fichiers source (pas de base de données, pas de CMS).

---

## 2. Contraintes et règles

| Contrainte | Détail |
|------------|--------|
| Langue du site | Français |
| Langue du code | Anglais |
| Type de site | Statique (build HTML, pas de serveur côté client) |
| Identité visuelle | Logo SalahPub déjà existant ; slogan "Votre image, notre métier" |
| Palette couleurs | Bleu dominant (du logo), noir, blanc ; touches d'accent coloré discrètes (pas d'arc-en-ciel) |
| Hébergement | Statique (dossier `dist/` à uploader sur hébergeur) |
| Modification contenu | Édition des fichiers source par le développeur uniquement |
| Pas de dépendances inutiles | Respect de la règle utilisateur |

---

## 3. Stack technique

| Élément | Choix | Justification |
|---------|-------|---------------|
| Framework | **Astro** | Génère du HTML pur, site statique, multi-pages, rapide, pas de JS inutile |
| Styling | **Tailwind CSS** | Utilitaires CSS, responsive mobile-first, facile à maintenir |
| Langage | HTML, JS, TypeScript (config) | Zéro dépendance runtime, accessible au développeur |
| Images | Dossier `public/images/` | Optimisation automatique par Astro |
| Données de contenu | `src/data/site.ts` | Fichier unique éditable pour textes et photos |
| Build | `npm run build` | Génère `dist/` prêt à déployer |
| Développement | `npm run dev` | Serveur local avec rechargement à chaud |

---

## 4. Architecture des pages

### 4.1 Liste des pages (`src/pages/`)

| Page | Fichier | Contenu principal |
|------|---------|-------------------|
| Accueil | `index.astro` | Hero, services en vedette, engagements, réalisations, contact rapide |
| Services | `services.astro` | Grille détaillée de tous les services avec icônes |
| Réalisation | `realizations.astro` | Galerie de photos de réalisations légendées |
| Qui sommes-nous ? | `about.astro` | Présentation de l'agence, parcours, valeurs |
| FAQ | `faq.astro` | Questions fréquentes par blocs |
| Contact | `contact.astro` | Formulaire de contact + coordonnées + téléphone + carte |
| Article éditorial | `article.astro` | Actualité avec visuel, titre, extrait |

### 4.2 Composants partagés (`src/components/`)

| Composant | Rôle |
|-----------|------|
| `Header.astro` | Logo SalahPub, menu de navigation, téléphone, adresse |
| `Footer.astro` | Coordonnées, horaires, réseaux sociaux, avis 4,8/5, lien remonter en haut |
| `ServiceCard.astro` | Carte de service avec pictogramme et description |
| `RealizationCard.astro` | Carte de réalisation avec photo et légende |
| `HeroSection.astro` | Section d'accueil avec accroche, coordonnées, bouton devis |

---

## 5. Source de contenu centralisée

**Fichier :** `src/data/site.ts`

Ce fichier TypeScript contient toutes les informations modifiables sans toucher au HTML :

- `site.identity` : nom, slogan, téléphone, email, adresse, horaires
- `site.services` : liste des services (titre, slug, icône, description)
- `site.engagements` : liste des engagements avec coches
- `site.realizations` : galerie (titre, image, catégorie)
- `site.faq` : questions/réponses
- `site.social` : liens réseaux sociaux

**Flux de modification :**
1. Éditer `src/data/site.ts` (ajouter/modifier un service, une photo, un texte)
2. Ajouter les images dans `public/images/`
3. `npm run build` → `dist/`
4. Uploader `dist/` sur l'hébergeur

---

## 6. Design visuel

### 6.1 Palette de couleurs

| Rôle | Couleur | Usage |
|------|---------|-------|
| Primaire | Bleu (du logo SalahPub) | Boutons principaux, titres, liens actifs |
| Secondaire | Noir | Fond, textes de corps, contraste |
| Accent | Blanc + touches colorées discrètes | Coches, icônes, éléments décoratifs |
| Fond | Blanc / très clair | Sections de contenu |

### 6.2 Typographie

- Polices sans-serif modernes et lisibles
- Titres : gras, hiérarchie claire (h1 > h2 > h3)
- Corps : interligne confortable, bonne lisibilité sur mobile

### 6.3 Structure visuelle (d'après pano-plaisir.fr)

- **Haut de page** : identité, adresse, téléphone, icônes sociales, menu principal
- **Hero** : grande accroche, coordonnées, image de fond, bouton "Demander un devis"
- **Services** : grille de cartes avec pictogrammes
- **Engagements** : liste avec coches blanches
- **Réalisations** : galerie d'images légendées
- **FAQ** : blocs de questions/réponses
- **Contact** : formulaire + coordonnées cliquables
- **Bas de page** : coordonnées, horaires, réseaux sociaux, avis, remontée en haut

---

## 7. Gestion des erreurs et robustesse

| Situation | Solution |
|-----------|----------|
| Image manquante | Image de remplacement (fallback) affichée |
| Champ vide dans `site.ts` | Section conditionnelle masquée |
| Formulaire de contact | Service tiers gratuit sans serveur (ex. Formspree) — l'email de destination est configurable dans `site.ts`. Alternative sans tiers : lien `mailto:` (ouverture du client mail du visiteur). Choix retenu : **Formspree** (plus fiable sur mobile, pas d'ouverture de client mail). |
| Liens morts | Vérification lors du build / recette |
| Mobile | Design mobile-first, testé à 375 px |

---

## 8. Tests et vérification

1. `npm run build` doit réussir sans erreur.
2. `npm run dev` pour contrôle visuel sur chaque page (desktop, tablette, mobile).
3. Vérification des liens : menu, boutons "Devis"/"Contact", réseaux sociaux, téléphone.
4. Objectif Lighthouse : > 90 en performance et accessibilité.
5. Vérification responsive : pas de défilement horizontal, cartes qui s'empilent sur mobile.

---

## 9. Déploiement

Le dossier `dist/` généré par le build est un site statique classique. Il peut être déposé sur :
- GitHub Pages
- Netlify
- Vercel
- Tout hébergeur web classique (FTP)

---

## 10. Évolutions futures (hors scope initial)

- Espace admin dynamique (base de données, authentification)
- Blog avec édition en ligne
- Système de devis en ligne

Ces fonctionnalités ne font pas partie de ce projet : le site reste statique et modifiable par le développeur uniquement.

---

> **Prochaine étape :** une fois cette spécification validée par vous, j'invoquerai la compétence `superpowers:writing-plans` pour établir le plan d'implémentation détaillé, puis je passerai au codage.
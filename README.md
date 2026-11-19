# SalahPub — Site vitrine

Site statique construit avec Astro et Tailwind CSS pour l'agence publicitaire SalahPub.

## Modifier le contenu

Le contenu éditable se trouve dans `src/data/site.ts` : coordonnées, slogan, horaires, services, engagements, réalisations, FAQ, réseaux sociaux et article.
Les coordonnées, liens sociaux et l'identifiant Formspree sont des valeurs provisoires à remplacer avant la mise en ligne.

## Ajouter une photo de réalisation

1. Déposer l'image dans `public/images/`.
2. Ajouter une entrée dans `site.realizations` (`src/data/site.ts`) avec son titre, son chemin et sa catégorie.

## Développement

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
npm run test:build
```

## Déploiement

`npm run build` génère le site statique dans `dist/`. Uploader ce dossier sur l'hébergeur (GitHub Pages, Netlify, Vercel ou FTP).

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

### GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit et publie le site automatiquement à chaque mise à jour de `main`.

1. Dans le dépôt GitHub, ouvrir **Settings → Pages**.
2. Sous **Build and deployment**, choisir **GitHub Actions** comme source.
3. Fusionner les changements dans `main` et vérifier l'exécution du workflow dans l'onglet **Actions**.
4. Le site sera disponible à `https://tarek-prod.github.io/salahpub/`.

### Autres hébergeurs

`npm run build` génère le site statique dans `dist/`. Uploader ce dossier sur Netlify, Vercel ou un hébergeur FTP.

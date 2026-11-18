# Site vitrine SalahPub — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire un site vitrine statique de 7 pages pour l'agence publicitaire SalahPub, inspiré de pano-plaisir.fr, bleu/noir, contenu centralisé dans un fichier unique modifiable par le développeur.

**Architecture:** Astro 5 génère du HTML statique à partir de pages `.astro`, d'un layout commun et de composants réutilisables. Toutes les données éditables (textes, coordonnées, services, réalisations, FAQ) vivent dans `src/data/site.ts`, parcouru par les pages. Tailwind CSS 4 (via `@tailwindcss/vite`) fournit le styling responsive et un thème `brand` bleu défini dans `global.css`.

**Tech Stack:** Astro 5, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript, Vitest (tests), Formspree (formulaire sans backend), Git.

---

## Global Constraints

- Langue du site : **français**. Langue du code (variables, classes, commentaires) : **anglais**.
- Site **statique** uniquement : aucun serveur, aucune base de données, aucun CMS.
- Palette : **bleu dominant** (échelle `brand`), noir, blanc ; accents colorés **très discrets** (pas d'arc-en-ciel).
- Slogan officiel : **« Votre image, notre métier »**. Nom : **SalahPub**.
- Les 5 services issus du logo : Enseignes & signalétique, Lettres lumineuses, Impression tous supports, Décoration intérieur & extérieur, Marquage véhicules.
- Contenu réel inconnu → les coordonnées de `site.ts` sont des **placeholders clairement balisés** `TODO:` à remplacer.
- Aucune dépendance inutile. Pas de React/Vue/SSR. Pas de Playwright.
- Responsive mobile-first, testé à 375 px. Objectif Lighthouse ≥ 90 perf/accessibilité.
- Sujet de commits : `feat:`, `test:`, `chore:`, en anglais.

---

## File Structure

```
salahpub/
├── package.json                  # scripts, deps
├── astro.config.mjs              # config Astro + plugin Tailwind
├── tsconfig.json                 # config TypeScript stricte
├── .gitignore                    # node_modules, dist, .astro
├── vitest.config.ts              # config Vitest
├── public/
│   ├── favicon.svg               # favicon simple (bleu)
│   └── images/                   # photos de réalisations (placeholders SVG)
├── src/
│   ├── styles/global.css         # @import tailwind + @theme (couleurs brand, police)
│   ├── data/site.ts              # SOURCE DE CONTENU UNIQUE (édité par le développeur)
│   ├── data/site.test.ts         # tests de validité des données
│   ├── layouts/BaseLayout.astro  # <head>, SEO, header, slot, footer
│   ├── components/
│   │   ├── Header.astro          # logo, navigation, téléphone
│   │   ├── Footer.astro          # coordonnées, horaires, réseaux, retour haut
│   │   ├── Hero.astro            # section d'accueil (accroche + CTA)
│   │   ├── ServiceCard.astro     # carte service (icône + titre + description)
│   │   ├── RealizationCard.astro # carte réalisation (image + légende)
│   │   ├── EngagementList.astro  # liste avec coches
│   │   ├── ContactForm.astro     # formulaire Formspree
│   │   └── SectionTitle.astro    # titre de section réutilisable
│   └── pages/
│       ├── index.astro           # Accueil
│       ├── services.astro        # Services
│       ├── realizations.astro    # Réalisations
│       ├── about.astro           # Qui sommes-nous ?
│       ├── faq.astro             # FAQ
│       ├── contact.astro         # Contact
│       └── article.astro         # Article éditorial
└── tests/build.test.ts           # tests sur le HTML généré dans dist/
```

---

## Tâches

### Task 1: Initialiser le projet Astro + Tailwind

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/styles/global.css`, `src/pages/index.astro`

**Interfaces:**
- Produces: projet Astro qui build ; thème Tailwind `brand-*`, `ink`, police `font-sans`.

- [ ] **Step 1: Créer `package.json`**

```json
{
  "name": "salahpub",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:build": "astro build && vitest run tests/build.test.ts"
  },
  "dependencies": {
    "astro": "^5.15.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Créer `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://salahpub.fr",
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Créer `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Créer `.gitignore`**

```
node_modules/
dist/
.astro/
.env
.env.*
```

- [ ] **Step 5: Créer `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-brand-50: #eaf3ff;
  --color-brand-100: #d3e6ff;
  --color-brand-200: #a8ccff;
  --color-brand-300: #74abff;
  --color-brand-400: #3d86ff;
  --color-brand-500: #1e6fd9;
  --color-brand-600: #1457b0;
  --color-brand-700: #0f4287;
  --color-brand-800: #0b2f61;
  --color-brand-900: #071f40;
  --color-ink: #0b0f19;
  --color-accent: #ffd43b;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

body {
  @apply bg-white text-ink font-sans antialiased;
}
```

- [ ] **Step 6: Créer `src/pages/index.astro` temporaire**

```astro
---
import "../styles/global.css";
---
<!doctype html>
<html lang="fr">
  <head><meta charset="utf-8" /><title>SalahPub</title></head>
  <body><h1 class="text-brand-600">SalahPub</h1></body>
</html>
```

- [ ] **Step 7: Installer et vérifier le build**

Run: `npm install && npm run build`
Expected: installation OK, build passe, dossier `dist/` créé avec `index.html`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro 5 + Tailwind 4 project"
```

---

### Task 2: Source de contenu centralisée + tests

**Files:**
- Create: `src/data/site.ts`, `src/data/site.test.ts`, `vitest.config.ts`

**Interfaces:**
- Produces: `site` (objet exporté) avec `identity`, `navigation`, `services`, `engagements`, `realizations`, `faq`, `social`, `formspreeId`, `article`. Types `Service`, `Realization`, `FaqItem` exportés.

- [ ] **Step 1: Écrire le test qui échoue — `src/data/site.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { site } from "./site";

describe("site data", () => {
  it("has the official identity", () => {
    expect(site.identity.name).toBe("SalahPub");
    expect(site.identity.slogan).toBe("Votre image, notre métier");
  });
  it("has valid contact fields", () => {
    expect(site.identity.phone).toMatch(/\d/);
    expect(site.identity.email).toContain("@");
  });
  it("has at least 5 services with required fields", () => {
    expect(site.services.length).toBeGreaterThanOrEqual(5);
    for (const s of site.services) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
      expect(s.description.length).toBeGreaterThan(0);
    }
  });
  it("has at least 6 engagements and 4 faq items", () => {
    expect(site.engagements.length).toBeGreaterThanOrEqual(6);
    expect(site.faq.length).toBeGreaterThanOrEqual(4);
  });
  it("has navigation entries for all pages", () => {
    const hrefs = site.navigation.map((n) => n.href);
    for (const h of ["/", "/services", "/realizations", "/about", "/faq", "/contact"]) {
      expect(hrefs).toContain(h);
    }
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

Run: `npx vitest run src/data/site.test.ts`
Expected: FAIL — Cannot find module `./site`.

- [ ] **Step 3: Créer `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Implémenter `src/data/site.ts`**

```ts
export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Realization {
  title: string;
  image: string;
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const site = {
  identity: {
    name: "SalahPub",
    slogan: "Votre image, notre métier",
    // TODO: remplacer par les coordonnées réelles de SalahPub
    phone: "+33 1 23 45 67 89",
    email: "contact@salahpub.fr",
    address: "12 rue de la République, 75000 Paris",
    hours: "Lun–Ven : 9h–18h · Sam : 9h–12h",
  },
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realizations" },
    { label: "Qui sommes-nous ?", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      title: "Enseignes & signalétique",
      slug: "enseignes",
      description:
        "Conception, fabrication et pose d'enseignes pour vitrines et façades professionnelles.",
      icon: "🪧",
    },
    {
      title: "Lettres lumineuses",
      slug: "lettres-lumineuses",
      description:
        "Lettres boîtiers lumineuses LED, rétro-éclairées, pour une visibilité maximale de jour comme de nuit.",
      icon: "💡",
    },
    {
      title: "Impression tous supports",
      slug: "impression",
      description:
        "Impression grand format : adhésifs, bâches, kakémonos, roll-up et supports de communication.",
      icon: "🖨️",
    },
    {
      title: "Décoration intérieur & extérieur",
      slug: "decoration",
      description:
        "Habillage de vitrines, covering mural et décoration sur mesure de vos espaces.",
      icon: "🎨",
    },
    {
      title: "Marquage véhicules",
      slug: "marquage-vehicules",
      description:
        "Covering et marquage publicitaire de véhicules utilitaires et flottes d'entreprise.",
      icon: "🚐",
    },
  ],
  engagements: [
    "Accompagnement de A à Z",
    "Devis clairs et détaillés",
    "Fabrication directe",
    "Pose assurée par nos soins",
    "Délais tenus",
    "Charte qualité",
    "SAV assuré",
  ],
  realizations: [
    { title: "Enseigne lumineuse — Commerce", image: "/images/realization-1.svg", category: "Enseigne" },
    { title: "Covering véhicule utilitaire", image: "/images/realization-2.svg", category: "Marquage véhicule" },
    { title: "Lettres boîtiers LED", image: "/images/realization-3.svg", category: "Lettres lumineuses" },
    { title: "Habillage de vitrine", image: "/images/realization-4.svg", category: "Décoration" },
    { title: "Impression grand format", image: "/images/realization-5.svg", category: "Impression" },
    { title: "Signalétique intérieure", image: "/images/realization-6.svg", category: "Signalétique" },
  ],
  faq: [
    {
      question: "Quels sont vos délais de fabrication ?",
      answer:
        "Les délais varient selon la prestation. Nous vous communiquons un planning précis dès la validation du devis.",
    },
    {
      question: "Assurez-vous la pose ?",
      answer:
        "Oui, la pose est assurée par nos soins partout dans notre zone d'intervention, avec un SAV garanti.",
    },
    {
      question: "Proposez-vous des devis gratuits ?",
      answer:
        "Oui, chaque projet commence par un devis clair et détaillé, sans engagement.",
    },
    {
      question: "Travaillez-vous avec les professionnels ?",
      answer:
        "Nous accompagnons les commerces, entreprises et collectivités, de la conception à la pose.",
    },
  ],
  social: {
    // TODO: remplacer par les vrais liens SalahPub
    facebook: "https://facebook.com/salahpub",
    instagram: "https://instagram.com/salahpub",
  },
  // TODO: créer une formule gratuite sur https://formspree.io et coller l'ID ici
  formspreeId: "your-form-id",
  article: {
    title: "Comment une bonne enseigne booste votre visibilité locale",
    excerpt:
      "Une enseigne bien conçue attire l'œil, renforce votre image de marque et guide vos clients. Voici nos conseils.",
    image: "/images/realization-1.svg",
    body:
      "Une enseigne est souvent le premier contact entre votre commerce et un client. Sa lisibilité, ses couleurs et son éclairage jouent un rôle décisif. Chez SalahPub, nous concevons des enseignes sur mesure, adaptées à votre identité et à votre environnement.",
  },
};
```

- [ ] **Step 5: Lancer le test pour vérifier qu'il passe**

Run: `npx vitest run src/data/site.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 6: Commit**

```bash
git add src/data vitest.config.ts
git commit -m "feat: add centralized site content with data tests"
```

---

### Task 3: Layout de base, header et footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` de `src/data/site.ts`.
- Produces: `BaseLayout.astro` avec props `title: string`, `description?: string`, slot par défaut. `Header.astro` et `Footer.astro` sans props.

- [ ] **Step 1: Créer `src/components/Header.astro`**

```astro
---
import { site } from "../data/site";
---
<header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-100">
  <div class="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
    <a href="/" class="flex items-center gap-2 font-extrabold text-xl text-brand-700">
      <span class="text-brand-500">S</span>alah<span class="text-brand-500">Pub</span>
    </a>
    <nav class="hidden md:flex gap-6 text-sm font-medium">
      {site.navigation.map((item) => (
        <a href={item.href} class="text-ink/80 hover:text-brand-600 transition-colors">{item.label}</a>
      ))}
    </nav>
    <a href={`tel:${site.identity.phone.replace(/\s/g, "")}`} class="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
      {site.identity.phone}
    </a>
  </div>
</header>
```

- [ ] **Step 2: Créer `src/components/Footer.astro`**

```astro
---
import { site } from "../data/site";
---
<footer class="bg-ink text-white">
  <div class="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3">
    <div>
      <p class="text-lg font-extrabold">Salah<span class="text-brand-400">Pub</span></p>
      <p class="mt-2 text-sm text-white/70">{site.identity.slogan}</p>
    </div>
    <div class="text-sm text-white/80 space-y-1">
      <p>{site.identity.address}</p>
      <p>{site.identity.phone}</p>
      <p>{site.identity.email}</p>
      <p class="text-white/60">{site.identity.hours}</p>
    </div>
    <div class="text-sm">
      <p class="font-semibold mb-2">Suivez-nous</p>
      <div class="flex gap-4">
        <a href={site.social.facebook} class="hover:text-brand-300">Facebook</a>
        <a href={site.social.instagram} class="hover:text-brand-300">Instagram</a>
      </div>
    </div>
  </div>
  <div class="border-t border-white/10 py-4 text-center text-xs text-white/50">
    © {new Date().getFullYear()} SalahPub — Tous droits réservés.
  </div>
</footer>
```

- [ ] **Step 3: Créer `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

interface Props {
  title: string;
  description?: string;
}
const { title, description = "Agence publicitaire SalahPub — Votre image, notre métier." } = Astro.props;
---
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | SalahPub</title>
  </head>
  <body>
    <Header />
    <main><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Remplacer `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Accueil">
  <div class="mx-auto max-w-6xl px-4 py-16">
    <h1 class="text-3xl font-bold text-brand-700">Bienvenue chez SalahPub</h1>
  </div>
</BaseLayout>
```

- [ ] **Step 5: Vérifier le build**

Run: `npm run build`
Expected: PASS, `dist/index.html` contient « SalahPub » et le numéro de téléphone.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add base layout, header and footer"
```

---

### Task 4: Accueil complet (Hero, services, engagements, réalisations)

**Files:**
- Create: `src/components/Hero.astro`, `src/components/SectionTitle.astro`, `src/components/ServiceCard.astro`, `src/components/EngagementList.astro`, `src/components/RealizationCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site`. `ServiceCard` props `{ service: Service }`. `RealizationCard` props `{ realization: Realization }`. `SectionTitle` props `{ title: string; subtitle?: string }`.

- [ ] **Step 1: Créer `src/components/SectionTitle.astro`**

```astro
---
interface Props { title: string; subtitle?: string; }
const { title, subtitle } = Astro.props;
---
<div class="max-w-2xl mb-8">
  <h2 class="text-2xl md:text-3xl font-extrabold text-brand-700">{title}</h2>
  {subtitle && <p class="mt-2 text-ink/70">{subtitle}</p>}
</div>
```

- [ ] **Step 2: Créer `src/components/ServiceCard.astro`**

```astro
---
import type { Service } from "../data/site";
interface Props { service: Service; }
const { service } = Astro.props;
---
<a href="/services" class="group block rounded-2xl border border-brand-100 p-6 hover:border-brand-400 hover:shadow-lg transition">
  <span class="text-3xl" aria-hidden="true">{service.icon}</span>
  <h3 class="mt-4 font-bold text-brand-700 group-hover:text-brand-500">{service.title}</h3>
  <p class="mt-2 text-sm text-ink/70 leading-relaxed">{service.description}</p>
</a>
```

- [ ] **Step 3: Créer `src/components/EngagementList.astro`**

```astro
---
import { site } from "../data/site";
---
<ul class="grid gap-3 sm:grid-cols-2">
  {site.engagements.map((e) => (
    <li class="flex items-center gap-3 text-ink/80">
      <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs">✓</span>
      {e}
    </li>
  ))}
</ul>
```

- [ ] **Step 4: Créer `src/components/RealizationCard.astro`**

```astro
---
import type { Realization } from "../data/site";
interface Props { realization: Realization; }
const { realization } = Astro.props;
---
<figure class="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
  <img src={realization.image} alt={realization.title} loading="lazy" class="aspect-[4/3] w-full object-cover" />
  <figcaption class="p-4">
    <p class="text-xs font-semibold uppercase tracking-wide text-brand-500">{realization.category}</p>
    <p class="mt-1 font-medium">{realization.title}</p>
  </figcaption>
</figure>
```

- [ ] **Step 5: Créer `src/components/Hero.astro`**

```astro
---
import { site } from "../data/site";
---
<section class="bg-brand-900 text-white">
  <div class="mx-auto max-w-6xl px-4 py-20">
    <p class="inline-block rounded-full bg-white/10 px-4 py-1 text-sm text-brand-200">{site.identity.slogan}</p>
    <h1 class="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
      Agence publicitaire <span class="text-brand-300">SalahPub</span>
    </h1>
    <p class="mt-4 max-w-xl text-white/80">
      Enseignes, lettrées lumineuses, impression et signalétique : nous donnons de l'éclat à votre image.
    </p>
    <div class="mt-8 flex flex-wrap gap-4">
      <a href="/contact" class="rounded-full bg-brand-500 px-6 py-3 font-semibold hover:bg-brand-400">Demander un devis</a>
      <a href="/realizations" class="rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">Nos réalisations</a>
    </div>
    <div class="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
      <span>📞 {site.identity.phone}</span>
      <span>📍 {site.identity.address}</span>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Remplacer `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import SectionTitle from "../components/SectionTitle.astro";
import ServiceCard from "../components/ServiceCard.astro";
import EngagementList from "../components/EngagementList.astro";
import RealizationCard from "../components/RealizationCard.astro";
import { site } from "../data/site";
---
<BaseLayout title="Accueil">
  <Hero />
  <section class="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle title="Nos services pour les professionnels" subtitle="Une offre complète, de la conception à la pose." />
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {site.services.map((s) => <ServiceCard service={s} />)}
    </div>
  </section>
  <section class="bg-brand-50/60">
    <div class="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle title="Nos engagements" subtitle="La satisfaction client au cœur de chaque projet." />
      <EngagementList />
    </div>
  </section>
  <section class="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle title="Nos réalisations" subtitle="Quelques exemples concrets de notre savoir-faire." />
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {site.realizations.slice(0, 6).map((r) => <RealizationCard realization={r} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Vérifier le build**

Run: `npm run build`
Expected: PASS ; `dist/index.html` contient chaque service et chaque titre d'engagement.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: build full homepage with hero, services, engagements and gallery"
```

---

### Task 5: Pages Services et Réalisations

**Files:**
- Create: `src/pages/services.astro`, `src/pages/realizations.astro`

**Interfaces:**
- Consumes: `site`, `ServiceCard`, `RealizationCard`, `SectionTitle`, `BaseLayout`.

- [ ] **Step 1: Créer `src/pages/services.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import SectionTitle from "../components/SectionTitle.astro";
import ServiceCard from "../components/ServiceCard.astro";
import { site } from "../data/site";
---
<BaseLayout title="Nos services" description="Les services publicitaires de SalahPub : enseignes, lettrées lumineuses, impression, décoration et marquage véhicules.">
  <section class="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle title="Nos services" subtitle="Des solutions publicitaires complètes pour votre entreprise." />
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {site.services.map((s) => <ServiceCard service={s} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Créer `src/pages/realizations.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import SectionTitle from "../components/SectionTitle.astro";
import RealizationCard from "../components/RealizationCard.astro";
import { site } from "../data/site";
---
<BaseLayout title="Nos réalisations" description="Galerie des réalisations de SalahPub : enseignes, lettres lumineuses, covering et décoration.">
  <section class="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle title="Nos réalisations" subtitle="Un aperçu de nos projets récents." />
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {site.realizations.map((r) => <RealizationCard realization={r} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: PASS ; `dist/services/index.html` et `dist/realizations/index.html` existent et contiennent les titres.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add services and realizations pages"
```

---

### Task 6: Page « Qui sommes-nous ? »

**Files:**
- Create: `src/pages/about.astro`

**Interfaces:**
- Consumes: `site`, `BaseLayout`, `SectionTitle`.

- [ ] **Step 1: Créer `src/pages/about.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import SectionTitle from "../components/SectionTitle.astro";
import { site } from "../data/site";
---
<BaseLayout title="Qui sommes-nous ?" description="SalahPub, votre agence publicitaire de proximité : conception, fabrication et pose.">
  <section class="mx-auto max-w-4xl px-4 py-16">
    <SectionTitle title="Qui sommes-nous ?" />
    <p class="text-ink/80 leading-relaxed">{site.identity.name} est une agence publicitaire spécialisée dans la signalétique et la communication visuelle. Nous accompagnons les commerces, entreprises et collectivités de la conception à la pose.</p>
    <p class="mt-4 text-ink/80 leading-relaxed">Nous maîtrisons l'ensemble de la chaîne : conseil, création, fabrication directe et installation par nos équipes. Cette maîtrise garantit des délais tenus, une charte qualité constante et un service après-vente assuré.</p>
    <div class="mt-10 grid gap-6 sm:grid-cols-3">
      <div class="rounded-2xl bg-brand-50 p-6"><p class="text-3xl font-extrabold text-brand-600">A à Z</p><p class="mt-2 text-sm text-ink/70">Un accompagnement complet</p></div>
      <div class="rounded-2xl bg-brand-50 p-6"><p class="text-3xl font-extrabold text-brand-600">100%</p><p class="mt-2 text-sm text-ink/70">Fabrication et pose maîtrisées</p></div>
      <div class="rounded-2xl bg-brand-50 p-6"><p class="text-3xl font-extrabold text-brand-600">SAV</p><p class="mt-2 text-sm text-ink/70">Service après-vente garanti</p></div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Vérifier le build**

Run: `npm run build`
Expected: PASS ; `dist/about/index.html` contient « Qui sommes-nous ».

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add about page"
```

---

### Task 7: Page FAQ

**Files:**
- Create: `src/pages/faq.astro`

**Interfaces:**
- Consumes: `site.faq`, `BaseLayout`, `SectionTitle`.

- [ ] **Step 1: Créer `src/pages/faq.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import SectionTitle from "../components/SectionTitle.astro";
import { site } from "../data/site";
---
<BaseLayout title="FAQ" description="Questions fréquentes sur les services publicitaires de SalahPub.">
  <section class="mx-auto max-w-3xl px-4 py-16">
    <SectionTitle title="Questions fréquentes" subtitle="Vous ne trouvez pas votre réponse ? Contactez-nous." />
    <div class="space-y-4">
      {site.faq.map((item) => (
        <details class="group rounded-2xl border border-brand-100 bg-white p-5 open:shadow-sm">
          <summary class="cursor-pointer list-none font-semibold text-brand-700 flex justify-between items-center">
            {item.question}
            <span class="text-brand-400 group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p class="mt-3 text-ink/75 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Vérifier le build**

Run: `npm run build`
Expected: PASS ; `dist/faq/index.html` contient chaque question.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add FAQ page"
```

---

### Task 8: Contact + formulaire Formspree

**Files:**
- Create: `src/components/ContactForm.astro`, `src/pages/contact.astro`

**Interfaces:**
- Consumes: `site.identity`, `site.formspreeId`, `BaseLayout`, `SectionTitle`.
- Produces: formulaire POST vers `https://formspree.io/f/{formspreeId}`.

- [ ] **Step 1: Créer `src/components/ContactForm.astro`**

```astro
---
import { site } from "../data/site";
---
<form action={`https://formspree.io/f/${site.formspreeId}`} method="POST" class="grid gap-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <label class="block">
      <span class="text-sm font-medium">Nom</span>
      <input name="name" required class="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2 focus:border-brand-500 focus:outline-none" />
    </label>
    <label class="block">
      <span class="text-sm font-medium">Email</span>
      <input type="email" name="email" required class="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2 focus:border-brand-500 focus:outline-none" />
    </label>
  </div>
  <label class="block">
    <span class="text-sm font-medium">Téléphone</span>
    <input type="tel" name="phone" class="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2 focus:border-brand-500 focus:outline-none" />
  </label>
  <label class="block">
    <span class="text-sm font-medium">Message</span>
    <textarea name="message" rows="5" required class="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2 focus:border-brand-500 focus:outline-none"></textarea>
  </label>
  <label class="flex items-start gap-2 text-sm text-ink/70">
    <input type="checkbox" required class="mt-1" />
    <span>J'accepte que mes données soient utilisées pour être recontacté.</span>
  </label>
  <button type="submit" class="justify-self-start rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600">Envoyer ma demande</button>
</form>
```

- [ ] **Step 2: Créer `src/pages/contact.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import SectionTitle from "../components/SectionTitle.astro";
import ContactForm from "../components/ContactForm.astro";
import { site } from "../data/site";
---
<BaseLayout title="Contact" description="Contactez SalahPub pour votre projet d'enseigne, de signalétique ou de communication visuelle.">
  <section class="mx-auto max-w-6xl px-4 py-16 grid gap-10 lg:grid-cols-2">
    <div>
      <SectionTitle title="Contactez-nous" subtitle="Demandez votre devis gratuit et sans engagement." />
      <ul class="space-y-3 text-ink/80">
        <li>📞 <a href={`tel:${site.identity.phone.replace(/\s/g, "")}`} class="hover:text-brand-600">{site.identity.phone}</a></li>
        <li>✉️ <a href={`mailto:${site.identity.email}`} class="hover:text-brand-600">{site.identity.email}</a></li>
        <li>📍 {site.identity.address}</li>
        <li>🕐 {site.identity.hours}</li>
      </ul>
    </div>
    <ContactForm />
  </section>
</BaseLayout>
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: PASS ; `dist/contact/index.html` contient `formspree.io` et le bouton « Envoyer ma demande ».

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add contact page with Formspree form"
```

---

### Task 9: Page article éditorial

**Files:**
- Create: `src/pages/article.astro`

**Interfaces:**
- Consumes: `site.article`, `BaseLayout`, `SectionTitle`.

- [ ] **Step 1: Créer `src/pages/article.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { site } from "../data/site";
---
<BaseLayout title={site.article.title} description={site.article.excerpt}>
  <article class="mx-auto max-w-3xl px-4 py-16">
    <p class="text-sm font-semibold uppercase tracking-wide text-brand-500">Article à la une</p>
    <h1 class="mt-2 text-3xl md:text-4xl font-extrabold text-brand-700">{site.article.title}</h1>
    <img src={site.article.image} alt={site.article.title} class="mt-8 w-full rounded-2xl" />
    <p class="mt-6 text-lg text-ink/80 leading-relaxed">{site.article.excerpt}</p>
    <p class="mt-4 text-ink/75 leading-relaxed">{site.article.body}</p>
    <a href="/contact" class="mt-8 inline-block rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600">Parler de mon projet</a>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Vérifier le build**

Run: `npm run build`
Expected: PASS ; `dist/article/index.html` contient le titre de l'article.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add editorial article page"
```

---

### Task 10: Images, favicon, SEO et tests de build

**Files:**
- Create: `public/favicon.svg`, `public/images/realization-1.svg` … `realization-6.svg`, `tests/build.test.ts`
- Modify: `astro.config.mjs` (déjà `site`)

**Interfaces:**
- Consumes: tout le site.
- Produces: tests d'intégration vérifiant le HTML généré.

- [ ] **Step 1: Créer `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1e6fd9"/>
  <text x="32" y="44" font-family="system-ui,sans-serif" font-size="36" font-weight="800" fill="#fff" text-anchor="middle">S</text>
</svg>
```

- [ ] **Step 2: Créer 6 images placeholder `public/images/realization-1.svg` … `-6.svg`**

Pour chaque n : remplacer `{N}` par le numéro et `{C}` par une des couleurs `#1457b0 #3d86ff #0f4287 #1e6fd9 #74abff #071f40`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="{C}"/>
  <text x="400" y="310" font-family="system-ui,sans-serif" font-size="48" font-weight="700" fill="#fff" text-anchor="middle">Réalisation {N}</text>
</svg>
```

- [ ] **Step 3: Créer `tests/build.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const pages = ["index", "services", "realizations", "about", "faq", "contact", "article"];
const read = (p: string) => readFileSync(join(dist, p, "index.html"), "utf-8");

describe("generated site", () => {
  it("builds all seven pages", () => {
    for (const p of pages) {
      expect(existsSync(join(dist, p, "index.html"))).toBe(true);
    }
  });
  it("homepage shows identity and services", () => {
    const html = readFileSync(join(dist, "index.html"), "utf-8");
    expect(html).toContain("SalahPub");
    expect(html).toContain("Votre image, notre métier");
    expect(html).toContain("Enseignes &amp; signalétique");
  });
  it("every page has french lang and a title", () => {
    for (const p of pages) {
      const html = read(p);
      expect(html).toContain('lang="fr"');
      expect(html).toMatch(/<title>.+<\/title>/);
    }
  });
  it("contact page posts to formspree", () => {
    expect(read("contact")).toContain("formspree.io");
  });
});
```

- [ ] **Step 4: Lancer les tests de build**

Run: `npm run test:build`
Expected: PASS (4 tests). Si `Enseignes &amp; signalétique` échoue, vérifier l'échappement dans le HTML généré.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add images, favicon and build integration tests"
```

---

### Task 11: Recette responsive, accessibilité et README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Lancer le serveur et contrôler visuellement**

Run: `npm run dev`
Ouvrir chaque page (`/`, `/services`, `/realizations`, `/about`, `/faq`, `/contact`, `/article`) en desktop puis à 375 px de large.
Expected: pas de défilement horizontal, cartes empilées, header lisible, boutons cliquables.

- [ ] **Step 2: Vérifier le typage et les tests**

Run: `npm run check && npm run test:build`
Expected: PASS sur les deux.

- [ ] **Step 3: Créer `README.md`**

```markdown
# SalahPub — Site vitrine

Site statique Astro + Tailwind de l'agence publicitaire SalahPub.

## Modifier le contenu

Tout le contenu éditable est dans `src/data/site.ts` :
- coordonnées, slogan, adresse, horaires (rechercher `TODO:`)
- services, engagements, réalisations, FAQ, article, réseaux sociaux

## Ajouter une photo de réalisation

1. Déposer l'image dans `public/images/`
2. Ajouter une entrée dans `site.realizations` (`src/data/site.ts`) :
   `{ title: "…", image: "/images/mon-image.jpg", category: "…" }`

## Développement

```bash
npm install
npm run dev      # serveur local
npm run build    # génère dist/
npm run test:build
```

## Déploiement

Uploader le dossier `dist/` sur l'hébergeur (GitHub Pages, Netlify, Vercel, FTP…).
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: add README with content editing instructions"
```

---

### Task 12: Build final et push

- [ ] **Step 1: Build de production final**

Run: `npm run test:build`
Expected: tous les tests PASS.

- [ ] **Step 2: Pousser sur GitHub**

```bash
git push origin main
```

Expected: push réussi vers `github.com/tarek-prod/salahpub`.

---

## Self-Review (couverture de la spec)

| Exigence spec | Tâche |
|---------------|-------|
| Site statique Astro + Tailwind | Task 1 |
| Source de contenu centralisée `site.ts` | Task 2 |
| Header / Footer | Task 3 |
| Accueil (hero, services, engagements, réalisations) | Task 4 |
| Services | Task 5 |
| Réalisations | Task 5 |
| Qui sommes-nous | Task 6 |
| FAQ | Task 7 |
| Contact + formulaire sans backend | Task 8 |
| Article éditorial | Task 9 |
| Images, favicon, SEO, tests | Task 10 |
| Responsive, accessibilité, README | Task 11 |
| Déploiement / push | Task 12 |
| Palette bleu/noir, accents discrets | Task 1 (`@theme`), Tasks 3–9 |
| Pas de dépendances inutiles | Task 1 (deps limitées) |
| Modifiable par le développeur | Task 2 + README |

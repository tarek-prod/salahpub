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
    // TODO: remplacer par les coordonnées réelles de SalahPub.
    phone: "+213 660 20 88 39",
    email: "tarek.benmaiza@gmail.com",
    address: "Khemis Miliana, Algérie",
    hours: "Lun–Ven : 9h–18h · Sam : 9h–12h",
  },
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realizations" },
    { label: "Qui sommes-nous ?", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Conseils", href: "/article" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      title: "Enseignes & signalétique",
      slug: "enseignes",
      description:
        "Conception, fabrication et pose d'enseignes pour vitrines et façades professionnelles.",
      icon: "▣",
    },
    {
      title: "Lettres lumineuses",
      slug: "lettres-lumineuses",
      description:
        "Lettres boîtiers lumineuses LED, rétro-éclairées, pour une visibilité maximale de jour comme de nuit.",
      icon: "✳",
    },
    {
      title: "Impression tous supports",
      slug: "impression",
      description:
        "Impression grand format : adhésifs, bâches, kakémonos, roll-up et supports de communication.",
      icon: "▤",
    },
    {
      title: "Décoration intérieur & extérieur",
      slug: "decoration",
      description:
        "Habillage de vitrines, covering mural et décoration sur mesure de vos espaces.",
      icon: "◈",
    },
    {
      title: "Marquage véhicules",
      slug: "marquage-vehicules",
      description:
        "Covering et marquage publicitaire de véhicules utilitaires et flottes d'entreprise.",
      icon: "▰",
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
    {
      title: "Enseigne lumineuse — Commerce",
      image: "/images/realization-1.svg",
      category: "Enseigne",
    },
    {
      title: "Covering véhicule utilitaire",
      image: "/images/realization-2.svg",
      category: "Marquage véhicule",
    },
    {
      title: "Lettres boîtiers LED",
      image: "/images/realization-3.svg",
      category: "Lettres lumineuses",
    },
    {
      title: "Habillage de vitrine",
      image: "/images/realization-4.svg",
      category: "Décoration",
    },
    {
      title: "Impression grand format",
      image: "/images/realization-5.svg",
      category: "Impression",
    },
    {
      title: "Signalétique intérieure",
      image: "/images/realization-6.svg",
      category: "Signalétique",
    },
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
    // TODO: remplacer par les vrais liens SalahPub.
    facebook: "https://facebook.com/salahpub",
    instagram: "https://instagram.com/salahpub",
  },
  formspreeId: "xkjrzewo",
  article: {
    title: "Comment une bonne enseigne booste votre visibilité locale",
    excerpt:
      "Une enseigne bien conçue attire l'œil, renforce votre image de marque et guide vos clients. Voici nos conseils.",
    image: "/images/realization-1.svg",
    body:
      "Une enseigne est souvent le premier contact entre votre commerce et un client. Sa lisibilité, ses couleurs et son éclairage jouent un rôle décisif. Chez SalahPub, nous concevons des enseignes sur mesure, adaptées à votre identité et à votre environnement.",
  },
} as const;

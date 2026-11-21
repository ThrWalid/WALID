export const profile = {
  name: 'Walid Tahiri',
  role: 'Développeur web indépendant',
  specialization: 'Sites web, applications et automatisation',
  location: 'Belfort, France · à distance',
  email: 'tahiri.walidd@gmail.com',
  linkedin: 'https://www.linkedin.com/in/walid-tahiri/',
  github: null as string | null,
  resume: '/Walid-Tahiri-CV.pdf',
  url: 'https://walid-tahiri-portfolio.indigo-sugar-5337.chatgpt.site',
  about: 'Je conçois des interfaces et développe des applications full-stack pour transformer des besoins concrets en outils utiles et maintenables.',
};

export const services = [
  {
    id: '01',
    title: 'Sites web',
    headline: 'Une présence claire. Un contact plus simple.',
    description: 'Un site qui explique votre activité, se consulte facilement sur mobile et guide vos visiteurs vers la bonne action.',
    deliverables: ['Site vitrine ou page de présentation', 'Design et développement responsive', 'Référencement technique et performance', 'Contenu multilingue selon le besoin', 'Accompagnement à la mise en ligne'],
    idealFor: 'les indépendants et entreprises qui souhaitent présenter leur activité ou refondre leur site.',
  },
  {
    id: '02',
    title: 'Applications web',
    headline: 'Des parcours simples, même pour les besoins complexes.',
    description: 'De la maquette aux API, je développe les interfaces et les fonctionnalités nécessaires à votre produit.',
    deliverables: ['Tableaux de bord et espaces clients', 'Applications SaaS', 'Conception UX/UI', 'Maquettes et prototypes', 'Développement frontend et backend'],
    idealFor: 'les équipes qui lancent un produit ou ont besoin d’une plateforme adaptée à leur fonctionnement.',
  },
  {
    id: '03',
    title: 'Agents IA & automatisation',
    headline: 'Faire travailler vos outils ensemble, sans répétition inutile.',
    description: 'Des workflows n8n et des agents IA qui comprennent les informations reçues, exécutent les actions prévues et transmettent un résultat structuré à vos outils métier.',
    deliverables: ['Audit des processus répétitifs', 'Workflows n8n et webhooks', 'Agents IA connectés à vos outils', 'Intégrations API et structuration des données', 'Contrôles, suivi et documentation'],
    idealFor: 'les équipes qui traitent manuellement des e-mails, des données ou des demandes récurrentes entre plusieurs outils.',
  },
  {
    id: '04',
    title: 'SEO technique & performance web',
    headline: 'Une base saine pour être compris, trouvé et consulté rapidement.',
    description: 'Audit SEO, architecture sémantique, données structurées, indexation et Core Web Vitals pour améliorer durablement la visibilité et l’expérience de votre site.',
    deliverables: ['Audit SEO technique et priorisation', 'Architecture, métadonnées et maillage interne', 'Schema.org, sitemap et robots.txt', 'Optimisation des performances et Core Web Vitals', 'Mesure Lighthouse et suivi des améliorations'],
    idealFor: 'les entreprises qui veulent corriger les freins techniques de leur site et construire une visibilité organique durable.',
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  problem: string;
  contribution: string;
  approach: string;
  outcome: string | null;
  repository: string | null;
  demo: string | null;
  nodes: string[];
  context: string;
  service: string;
};

export const projects: Project[] = [
  {
    id: '01',
    name: 'Marketplace freelance',
    category: 'Plateforme de mise en relation',
    description: 'Une plateforme full-stack pour mettre en relation des indépendants, des entreprises et des particuliers.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB Atlas'],
    problem: 'Traduire les besoins du projet en parcours de mise en relation entre indépendants et clients.',
    contribution: 'Traduction des besoins en solutions techniques, développement des interfaces et intégration au backend pendant mon stage de fin d’études chez SeoDev.',
    approach: 'Frontend Next.js et TypeScript avec Tailwind CSS ; backend Express / Node.js et données dans MongoDB Atlas.',
    outcome: null,
    repository: null,
    demo: null,
    nodes: ['Interface Next.js', 'Express / Node.js', 'MongoDB Atlas'],
    context: 'SeoDev · Stage · 2024',
    service: 'Conception produit · Développement full-stack',
  },
  {
    id: '02',
    name: 'Portail de services publics',
    category: 'Services administratifs',
    description: 'Un portail centralisant les informations et les services administratifs pour les citoyens.',
    stack: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
    problem: 'Faciliter l’accès des citoyens d’Errachidia aux informations et aux services administratifs.',
    contribution: 'Recueil des besoins auprès des administrateurs, préparation du plan technique, conception et développement de l’application.',
    approach: 'Interface HTML, CSS, Bootstrap et JavaScript ; application PHP et base de données MySQL.',
    outcome: null,
    repository: null,
    demo: null,
    nodes: ['Interface citoyenne', 'Application PHP', 'MySQL'],
    context: 'Préfecture · Stage · 2023',
    service: 'Conception des parcours · Développement full-stack',
  },
  {
    id: '03',
    name: 'Plateforme éducative UTBM',
    category: 'Application pédagogique',
    description: 'Une plateforme éducative inspirée de Moodle, développée dans le cadre d’un projet académique à l’UTBM.',
    stack: ['Angular', 'TypeScript', 'Tailwind CSS'],
    problem: 'Concevoir une expérience pédagogique structurée dans le cadre d’un projet à l’UTBM.',
    contribution: 'Développement de l’interface et adaptation des parcours d’une plateforme pédagogique à une application web.',
    approach: 'Interface développée avec Angular, TypeScript et Tailwind CSS.',
    outcome: null,
    repository: null,
    demo: null,
    nodes: ['Angular', 'TypeScript', 'Tailwind CSS'],
    context: 'UTBM · Projet académique',
    service: 'Développement frontend · Intégration UX',
  },
];

export const process = [
  { step: '01', title: 'Comprendre', body: 'Nous définissons les utilisateurs, les objectifs et les contraintes pour délimiter un périmètre utile.' },
  { step: '02', title: 'Concevoir', body: 'Je traduis le besoin en parcours, en maquettes et en un plan de réalisation partagé.' },
  { step: '03', title: 'Développer', body: 'Le produit avance par étapes, avec des points réguliers pour vérifier les choix et les fonctionnalités.' },
  { step: '04', title: 'Livrer', body: 'Je teste les parcours, accompagne la mise en ligne et transmets les éléments nécessaires à la prise en main.' },
];

export const faqs = [
  { question: 'Quels projets pouvez-vous réaliser ?', answer: 'Sites vitrines, refontes, applications web, espaces clients, outils internes et automatisations. Nous commençons par préciser le problème à résoudre et les fonctionnalités nécessaires.' },
  { question: 'Quel budget prévoir ?', answer: 'Le budget dépend du périmètre, du design, des contenus et des intégrations. Après un premier échange, je propose un périmètre, un calendrier et un prix avant le début du travail.' },
  { question: 'Combien de temps dure un projet ?', answer: 'Un site ciblé peut se réaliser en quelques semaines. Une application sur mesure demande davantage de conception et de tests. Le calendrier est défini ensemble selon le besoin et les contenus disponibles.' },
  { question: 'Prenez-vous en charge le design et le développement ?', answer: 'Oui : structure, maquettes, interfaces, backend, tests et mise en ligne peuvent faire partie de la mission. Le périmètre est convenu au départ.' },
  { question: 'Faut-il déjà avoir un cahier des charges ?', answer: 'Non. Une idée, un objectif ou une difficulté suffit pour commencer. Nous précisons ensemble les utilisateurs, les priorités et les contraintes techniques.' },
  { question: 'Le site sera-t-il adapté au mobile et modifiable ?', answer: 'L’adaptation aux écrans, l’accessibilité et la performance font partie du travail. Un outil de gestion de contenu peut être prévu si vous souhaitez effectuer des mises à jour vous-même.' },
  { question: 'Prenez-vous en charge le référencement naturel ?', answer: 'Oui. Je travaille le SEO technique dès la conception : structure sémantique, métadonnées, données structurées, sitemap, indexation, maillage interne, performance et Core Web Vitals. Un audit permet ensuite de mesurer les résultats et de prioriser les améliorations, sans promettre artificiellement une position précise dans Google.' },
  { question: 'Que se passe-t-il après la mise en ligne ?', answer: 'Je vous accompagne pour la mise en ligne et la prise en main. La maintenance, le suivi ou de nouvelles fonctionnalités peuvent faire l’objet d’un accompagnement complémentaire.' },
  { question: 'Pouvez-vous travailler avec notre équipe ?', answer: 'Oui. Je peux collaborer avec vos designers, développeurs ou partenaires, en définissant les responsabilités et les points de suivi dès le départ.' },
];

export type Experience = {
  company: string;
  logo?: string;
  logoAspect?: 'wide' | 'crest';
  role: string;
  type: string;
  start: { label: string; dateTime: string };
  end: { label: string; dateTime: string };
  location: string;
  body: string;
  highlights: string[];
  stack: string[];
  focusAreas?: { label: string; title: string; description: string }[];
};

export const experience: Experience[] = [
  {
    company: 'Dassault Systèmes',
    logo: '/dassault-logo-optimized.webp',
    logoAspect: 'wide',
    role: 'Stagiaire ingénieur logiciel',
    type: 'Stage · Business Development Hub',
    start: { label: 'Février 2026', dateTime: '2026-02' },
    end: { label: 'Juillet 2026', dateTime: '2026-07' },
    location: 'Vélizy-Villacoublay, France',
    body: 'Au sein du Business Development Hub, j’ai conçu des outils qui ont réduit les opérations manuelles, fiabilisé les échanges entre environnements clients et rendu l’exécution des workflows directement observable par les équipes.',
    highlights: [
      'Réduction des actions manuelles grâce à l’automatisation de la création et de la synchronisation de communautés 3DSwym.',
      'Synchronisations rendues fiables et rejouables avec des API REST, une authentification multi-environnement et des traitements idempotents.',
      'Visibilité en temps réel offerte aux équipes via SSE, logs structurés, historique d’exécution et gestion contrôlée des erreurs.',
      'Mise en production et passation facilitées avec GitLab CI/CD, ArgoCD, Outscale S3 et une documentation opérationnelle.',
    ],
    stack: ['TypeScript', 'Vue.js', 'Node.js', 'Express', 'REST APIs', 'SSE', 'ArgoCD', 'GitLab CI/CD', 'Outscale S3'],
  },
  {
    company: 'SeoDev',
    logo: '/seodev-logo-optimized.webp',
    role: 'Développeur full-stack stagiaire',
    type: 'Stage de fin d’études',
    start: { label: 'Avril 2024', dateTime: '2024-04' },
    end: { label: 'Août 2024', dateTime: '2024-08' },
    location: 'France',
    body: 'Chez SeoDev, j’ai contribué à transformer les besoins d’une marketplace en une application full-stack structurée, du cadrage fonctionnel jusqu’à la préparation du déploiement.',
    highlights: [
      'Périmètre fonctionnel clarifié avec des modèles UML, des structures de données et des contrats d’API partagés.',
      'Parcours utilisateurs rendus cohérents grâce aux maquettes Figma et à des composants React réutilisables.',
      'Fonctionnalités métier centralisées dans une API Node.js / Express avec MongoDB : authentification, profils, offres et favoris.',
      'Qualité de livraison renforcée par les tests Postman, l’optimisation des performances, la revue de code et GitLab CI.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'Figma'],
  },
  {
    company: "Préfecture d’Oujda-Angad",
    logo: '/oujda-angad-prefecture.png',
    logoAspect: 'crest',
    role: 'Développeur full-stack stagiaire',
    type: 'Stage d’initiation',
    start: { label: 'Juillet 2023', dateTime: '2023-07' },
    end: { label: 'Août 2023', dateTime: '2023-08' },
    location: 'Oujda, Maroc',
    body: 'Pour la Préfecture d’Oujda-Angad, j’ai conçu de façon autonome un portail responsive centralisant les services et structurant le traitement des demandes selon les rôles utilisateurs.',
    highlights: [
      'Accès aux informations et services regroupé dans une interface responsive adaptée aux différents profils.',
      'Traitement des demandes structuré avec des rôles, des droits d’accès et des circuits de validation clairs.',
      'Gestion des contenus, formulaires et fichiers fiabilisée par une validation côté serveur en PHP.',
      'Prise en main et déploiement facilités par les tests, les exports imprimables et la documentation technique.',
    ],
    stack: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'SQL'],
  },
];

export const capabilities = ['Conception', 'UX/UI', 'Next.js', 'React', 'TypeScript', 'Node.js', 'API', 'Bases de données', 'Automatisation', 'Mise en ligne'];

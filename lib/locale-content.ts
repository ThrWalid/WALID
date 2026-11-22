import type { Locale } from '@/lib/i18n';
import type { Experience } from '@/lib/portfolio';
import { capabilities, experience, faqs, services } from '@/lib/portfolio';

export const profileCopy = {
  fr: {
    role: 'Développeur web indépendant',
    specialization: 'Sites web, applications et automatisation',
  },
  en: {
    role: 'Freelance web developer',
    specialization: 'Websites, applications and automation',
    location: 'Belfort, France · Remote',
    about: 'I design interfaces and build full-stack applications that turn real needs into useful, maintainable tools.',
  },
  es: {
    role: 'Desarrollador web freelance',
    specialization: 'Sitios web, aplicaciones y automatización',
    location: 'Belfort, Francia · Remoto',
    about: 'Diseño interfaces y desarrollo aplicaciones full-stack que convierten necesidades reales en herramientas útiles y mantenibles.',
  },
} as const;

export const capabilitiesByLocale = {
  fr: capabilities,
  en: ['Product design', 'UX/UI', 'Next.js', 'React', 'TypeScript', 'Node.js', 'APIs', 'Databases', 'Automation', 'Deployment'],
  es: ['Diseño de producto', 'UX/UI', 'Next.js', 'React', 'TypeScript', 'Node.js', 'APIs', 'Bases de datos', 'Automatización', 'Despliegue'],
} satisfies Record<Locale, string[]>;

export const serviceSchemaByLocale = {
  fr: services.map(service => [service.title, service.description]),
  en: [
    ['Websites', 'Fast, accessible custom websites designed around a clear business goal.'],
    ['Web applications', 'Full-stack interfaces, APIs and data flows for useful, maintainable products.'],
    ['AI agents and automation', 'Reliable workflows that connect tools and remove repetitive work.'],
    ['Technical SEO and performance', 'Technical foundations that improve discoverability, speed and user experience.'],
  ],
  es: [
    ['Sitios web', 'Sitios rápidos, accesibles y a medida, diseñados en torno a un objetivo comercial claro.'],
    ['Aplicaciones web', 'Interfaces full-stack, APIs y flujos de datos para productos útiles y mantenibles.'],
    ['Agentes de IA y automatización', 'Flujos fiables que conectan herramientas y eliminan tareas repetitivas.'],
    ['SEO técnico y rendimiento', 'Bases técnicas que mejoran la visibilidad, la velocidad y la experiencia de usuario.'],
  ],
} satisfies Record<Locale, string[][]>;

export const faqsByLocale = {
  fr: faqs,
  en: [
    { question: 'What kind of projects can you build?', answer: 'Corporate websites, redesigns, web applications, client portals, internal tools and automations. We start by defining the problem and the features that are actually needed.' },
    { question: 'What budget should I plan for?', answer: 'The budget depends on scope, design, content and integrations. After an initial conversation, I provide a clear scope, timeline and price before any work begins.' },
    { question: 'How long does a project take?', answer: 'A focused website can be completed in a few weeks. A custom application needs more design and testing time. We agree on the schedule based on the scope and available content.' },
    { question: 'Do you handle both design and development?', answer: 'Yes. Structure, wireframes, interface design, backend, testing and deployment can all be included. We agree on the exact scope at the outset.' },
    { question: 'Do I need a detailed specification?', answer: 'No. An idea, goal or current problem is enough to begin. Together we clarify users, priorities and technical constraints.' },
    { question: 'Will the website work on mobile and be editable?', answer: 'Responsive design, accessibility and performance are built into the work. A content management system can be included if you want to update the site yourself.' },
    { question: 'Do you provide SEO services?', answer: 'Yes. I address technical SEO from the design stage: semantic structure, metadata, structured data, sitemaps, indexing, internal linking, performance and Core Web Vitals. An audit then helps measure results and prioritize improvements without making unrealistic ranking promises.' },
  ],
  es: [
    { question: '¿Qué tipo de proyectos puedes realizar?', answer: 'Sitios corporativos, rediseños, aplicaciones web, áreas de cliente, herramientas internas y automatizaciones. Empezamos por definir el problema y las funciones realmente necesarias.' },
    { question: '¿Qué presupuesto debo prever?', answer: 'El presupuesto depende del alcance, el diseño, los contenidos y las integraciones. Tras una primera conversación, presento un alcance, un calendario y un precio claros antes de empezar.' },
    { question: '¿Cuánto dura un proyecto?', answer: 'Un sitio bien delimitado puede completarse en pocas semanas. Una aplicación a medida requiere más diseño y pruebas. Acordamos el calendario según el alcance y los contenidos disponibles.' },
    { question: '¿Te encargas del diseño y del desarrollo?', answer: 'Sí. La estructura, los wireframes, la interfaz, el backend, las pruebas y la puesta en producción pueden formar parte del proyecto. El alcance exacto se acuerda desde el principio.' },
    { question: '¿Necesito un pliego de requisitos detallado?', answer: 'No. Una idea, un objetivo o una dificultad actual bastan para empezar. Juntos definimos los usuarios, las prioridades y las restricciones técnicas.' },
    { question: '¿El sitio funcionará en móvil y podré editarlo?', answer: 'El diseño responsive, la accesibilidad y el rendimiento forman parte del trabajo. También puedo integrar un gestor de contenidos si quieres actualizar el sitio por tu cuenta.' },
    { question: '¿Ofreces servicios de SEO?', answer: 'Sí. Trabajo el SEO técnico desde el diseño: estructura semántica, metadatos, datos estructurados, sitemap, indexación, enlazado interno, rendimiento y Core Web Vitals. Después, una auditoría permite medir resultados y priorizar mejoras sin prometer posiciones irreales.' },
  ],
} satisfies Record<Locale, { question: string; answer: string }[]>;

export const experienceByLocale: Record<Locale, Experience[]> = {
  fr: experience,
  en: [
    {
      company: 'Dassault Systèmes', logo: '/dassault-logo-optimized.webp', logoAspect: 'wide',
      role: 'Software Engineering Intern', type: 'Internship · Business Development Hub',
      start: { label: 'February 2026', dateTime: '2026-02' }, end: { label: 'July 2026', dateTime: '2026-07' }, location: 'Vélizy-Villacoublay, France',
      body: 'Within the Business Development Hub, I built tools that reduced manual operations, made exchanges between customer environments more reliable and gave teams direct visibility into workflow execution.',
      highlights: [
        'Reduced manual work by automating the creation and synchronization of 3DSwym communities.',
        'Made synchronization reliable and repeatable with REST APIs, multi-environment authentication and idempotent processing.',
        'Provided real-time visibility through SSE, structured logs, execution history and controlled error handling.',
        'Streamlined production delivery and handover with GitLab CI/CD, ArgoCD, Outscale S3 and operational documentation.',
      ],
      stack: ['TypeScript', 'Vue.js', 'Node.js', 'Express', 'REST APIs', 'SSE', 'ArgoCD', 'GitLab CI/CD', 'Outscale S3'],
    },
    {
      company: 'SeoDev', logo: '/seodev-logo-optimized.webp', role: 'Full-stack Developer Intern', type: 'Final-year internship',
      start: { label: 'April 2024', dateTime: '2024-04' }, end: { label: 'August 2024', dateTime: '2024-08' }, location: 'France',
      body: 'At SeoDev, I helped turn marketplace requirements into a structured full-stack application, from functional scoping through deployment preparation.',
      highlights: [
        'Clarified the functional scope with UML models, data structures and shared API contracts.',
        'Created consistent user journeys with Figma mockups and reusable React components.',
        'Centralized business features in a Node.js and Express API backed by MongoDB: authentication, profiles, listings and favorites.',
        'Improved delivery quality through Postman tests, performance optimization, code review and GitLab CI.',
      ],
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'Figma'],
    },
    {
      company: 'Oujda-Angad Prefecture', logo: '/oujda-angad-prefecture.png', logoAspect: 'crest', role: 'Full-stack Developer Intern', type: 'Introductory internship',
      start: { label: 'July 2023', dateTime: '2023-07' }, end: { label: 'August 2023', dateTime: '2023-08' }, location: 'Oujda, Morocco',
      body: 'For the Oujda-Angad Prefecture, I independently designed a responsive portal that centralized public services and structured request handling around user roles.',
      highlights: [
        'Centralized information and services in a responsive interface adapted to different user profiles.',
        'Structured request processing with roles, access rights and clear approval workflows.',
        'Made content, forms and file handling more reliable with server-side PHP validation.',
        'Simplified adoption and deployment with testing, printable exports and technical documentation.',
      ],
      stack: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'SQL'],
    },
  ],
  es: [
    {
      company: 'Dassault Systèmes', logo: '/dassault-logo-optimized.webp', logoAspect: 'wide',
      role: 'Becario de ingeniería de software', type: 'Prácticas · Business Development Hub',
      start: { label: 'Febrero de 2026', dateTime: '2026-02' }, end: { label: 'Julio de 2026', dateTime: '2026-07' }, location: 'Vélizy-Villacoublay, Francia',
      body: 'En el Business Development Hub desarrollé herramientas que redujeron las operaciones manuales, hicieron más fiables los intercambios entre entornos de clientes y ofrecieron visibilidad directa sobre la ejecución de los flujos.',
      highlights: [
        'Reduje las tareas manuales automatizando la creación y sincronización de comunidades 3DSwym.',
        'Hice las sincronizaciones fiables y repetibles con APIs REST, autenticación multientorno y procesos idempotentes.',
        'Ofrecí visibilidad en tiempo real mediante SSE, logs estructurados, historial de ejecución y gestión controlada de errores.',
        'Facilité la puesta en producción y el traspaso con GitLab CI/CD, ArgoCD, Outscale S3 y documentación operativa.',
      ],
      stack: ['TypeScript', 'Vue.js', 'Node.js', 'Express', 'REST APIs', 'SSE', 'ArgoCD', 'GitLab CI/CD', 'Outscale S3'],
    },
    {
      company: 'SeoDev', logo: '/seodev-logo-optimized.webp', role: 'Becario de desarrollo full-stack', type: 'Prácticas de fin de estudios',
      start: { label: 'Abril de 2024', dateTime: '2024-04' }, end: { label: 'Agosto de 2024', dateTime: '2024-08' }, location: 'Francia',
      body: 'En SeoDev ayudé a transformar los requisitos de un marketplace en una aplicación full-stack estructurada, desde la definición funcional hasta la preparación del despliegue.',
      highlights: [
        'Aclaré el alcance funcional con modelos UML, estructuras de datos y contratos de API compartidos.',
        'Creé recorridos coherentes mediante maquetas de Figma y componentes React reutilizables.',
        'Centralicé la lógica de negocio en una API Node.js y Express con MongoDB: autenticación, perfiles, ofertas y favoritos.',
        'Reforcé la calidad de entrega con pruebas Postman, optimización del rendimiento, revisión de código y GitLab CI.',
      ],
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'Figma'],
    },
    {
      company: 'Prefectura de Oujda-Angad', logo: '/oujda-angad-prefecture.png', logoAspect: 'crest', role: 'Becario de desarrollo full-stack', type: 'Prácticas de iniciación',
      start: { label: 'Julio de 2023', dateTime: '2023-07' }, end: { label: 'Agosto de 2023', dateTime: '2023-08' }, location: 'Oujda, Marruecos',
      body: 'Para la Prefectura de Oujda-Angad diseñé de forma autónoma un portal responsive que centralizaba los servicios públicos y estructuraba la gestión de solicitudes según los roles de usuario.',
      highlights: [
        'Centralicé la información y los servicios en una interfaz responsive adaptada a distintos perfiles.',
        'Estructuré la gestión de solicitudes con roles, permisos y circuitos de validación claros.',
        'Hice más fiable la gestión de contenidos, formularios y archivos mediante validación PHP en el servidor.',
        'Facilité la adopción y el despliegue con pruebas, exportaciones imprimibles y documentación técnica.',
      ],
      stack: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'SQL'],
    },
  ],
};

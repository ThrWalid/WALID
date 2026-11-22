import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, BriefcaseBusiness, Code2, Download, ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import { siNvidia } from 'simple-icons';
import { CleanFooter } from '@/components/portfolio-controls';
import { PortfolioNavbar } from '@/components/portfolio-navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SkillsShowcase } from '@/components/skills-showcase';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { experienceByLocale } from '@/lib/locale-content';
import { profile } from '@/lib/portfolio';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import './profile.css';

const content = {
  fr: {
    metadataTitle: 'Développeur full-stack | Walid Tahiri', metadataDescription: 'Profil professionnel de Walid Tahiri : développeur full-stack et élève ingénieur à l’UTBM, expérimenté en interfaces web, API, automatisation et outils métier.',
    skip: 'Aller au contenu', breadcrumb: 'Profil professionnel', location: 'Belfort, France · à distance', eyebrow: 'Développeur full-stack · Élève ingénieur UTBM',
    heroTitle: <>Je transforme les besoins métier en produits web <em>fiables.</em></>, intro: 'Je développe des interfaces, des API et des automatisations de bout en bout. Mes expériences chez Dassault Systèmes et SeoDev m’ont appris à travailler avec des contraintes réelles, documenter mes choix et livrer des solutions maintenables.',
    resume: 'Télécharger mon CV', linkedin: 'Voir mon LinkedIn', strengthsLabel: 'Points forts professionnels', strengths: [['Full-stack', 'Interfaces, API et données'], ['Orienté métier', 'Comprendre avant de construire'], ['Livraison fiable', 'Tests, documentation, déploiement']],
    about: 'À propos de Walid Tahiri', portrait: 'Portrait de Walid Tahiri', contribution: 'Ce que j’apporte', contributionTitle: 'Une vision produit soutenue par une exécution technique solide.', contributionText: 'J’avance avec méthode : comprendre l’usage, proposer une solution claire, construire proprement et transmettre ce qui est nécessaire pour la faire évoluer.',
    experience: 'Expérience', career: 'Parcours professionnel', experienceTitle: <>Des produits web,<br /><em>dans des contextes réels.</em></>,
    certifications: 'Certifications', verified: 'Compétences vérifiées', certificationsTitle: <>Des acquis techniques.<br /><em>Validés par l’écosystème.</em></>, certificate: 'Vérifier le certificat', badge: 'Badge',
    education: 'Formation', academic: 'Parcours académique', educationTitle: <>Comprendre les systèmes.<br /><em>Construire les usages.</em></>,
    educationItems: [
      { institution: 'Université de technologie de Belfort-Montbéliard', shortName: 'UTBM', location: 'Belfort-Montbéliard, France', degree: 'Cycle ingénieur en informatique', field: 'Ingénierie informatique', period: '2025 — 2028', credential: 'Diplôme d’ingénieur en préparation', description: 'Formation en développement web et applicatif, génie logiciel, calcul parallèle, cloud, virtualisation, réseaux et stratégies de test logiciel.', logo: '/utbm-mark.png' },
      { institution: 'Lycée Paul Éluard', shortName: 'Paul Éluard', location: 'Saint-Denis, région parisienne', degree: 'CPGE — ATS', field: 'Adaptation technicien supérieur', period: '2024 — 2025', credential: 'Formation ATS validée', description: 'Approfondissement en mathématiques avancées, physique, sciences industrielles et informatique pour préparer les concours d’entrée en école d’ingénieurs.', grade: 'Mention Très bien', logo: '/lycee-paul-eluard-logo.jpg' },
      { institution: 'École Supérieure de Technologie d’Oujda', shortName: 'EST Oujda', location: 'Oujda, Maroc', degree: 'DUT Informatique', field: 'Développement informatique', period: '2022 — 2024', credential: 'Diplôme universitaire de technologie obtenu', description: 'Formation en algorithmique avancée, bases de données, architecture des systèmes, développement web et développement d’applications.', grade: 'Mention Très bien', logo: '/est-oujda-logo.png' },
    ],
    certificationsItems: [
      ['3DEXPERIENCE Business Process Designer Advanced', 'Associate · Niveau avancé', 'Conception de processus avancés et connexion d’ITEROP à des applications et services externes.', '/certifications/3dexperience-advanced.png', 'https://www.credly.com/badges/fc7e90c6-2ea0-4312-8c5e-2b3fb4112f4d'],
      ['3DEXPERIENCE Business Process Designer Beginner', 'Associate · Fondamentaux', 'Conception, configuration, test, déploiement et administration de processus métier.', '/certifications/3dexperience-beginner.png', 'https://www.credly.com/badges/6aba54c1-a505-4f60-882f-25592e20a84a/linked_in_profile'],
      ['3DEXPERIENCE Business Process Player', 'Associate · Utilisateur certifié', 'Exécution, délégation et suivi opérationnel des tâches et processus sur la plateforme.', '/certifications/3dexperience-player.png', 'https://www.credly.com/badges/1c4ca8e6-aa8b-4267-8dcb-67077e98058e/linked_in_profile'],
      ['Fundamentals of Accelerated Computing with CUDA Python', 'Calcul accéléré · CUDA Python', 'Développement et optimisation de calculs parallèles accélérés sur GPU avec CUDA Python.', '', 'https://learn.nvidia.com/certificates?id=fxy9PAM8SDS_Q3KlOR6FiA'],
    ],
  },
  en: {
    metadataTitle: 'Full-stack developer | Walid Tahiri', metadataDescription: 'Professional profile of Walid Tahiri: full-stack developer and UTBM engineering student with experience in web interfaces, APIs, automation and business tools.',
    skip: 'Skip to content', breadcrumb: 'Professional profile', location: 'Belfort, France · Remote', eyebrow: 'Full-stack developer · UTBM engineering student',
    heroTitle: <>I turn business needs into <em>reliable web products.</em></>, intro: 'I build end-to-end interfaces, APIs and automations. My experience at Dassault Systèmes and SeoDev taught me to work with real constraints, document decisions and deliver maintainable solutions.',
    resume: 'Download my résumé', linkedin: 'View my LinkedIn', strengthsLabel: 'Professional strengths', strengths: [['Full-stack', 'Interfaces, APIs and data'], ['Business-focused', 'Understand before building'], ['Reliable delivery', 'Testing, documentation, deployment']],
    about: 'About Walid Tahiri', portrait: 'Portrait of Walid Tahiri', contribution: 'What I bring', contributionTitle: 'Product thinking backed by solid technical execution.', contributionText: 'I work methodically: understand the use case, propose a clear solution, build it cleanly and transfer everything needed for its future evolution.',
    experience: 'Experience', career: 'Professional journey', experienceTitle: <>Web products,<br /><em>in real-world settings.</em></>,
    certifications: 'Certifications', verified: 'Verified skills', certificationsTitle: <>Technical expertise.<br /><em>Validated by the ecosystem.</em></>, certificate: 'Verify certificate', badge: 'Badge',
    education: 'Education', academic: 'Academic journey', educationTitle: <>Understand systems.<br /><em>Build useful experiences.</em></>,
    educationItems: [
      { institution: 'Belfort-Montbéliard University of Technology', shortName: 'UTBM', location: 'Belfort-Montbéliard, France', degree: 'Engineering degree in Computer Science', field: 'Computer engineering', period: '2025–2028', credential: 'Engineering degree in progress', description: 'Coursework in web and application development, software engineering, parallel computing, cloud, virtualization, networks and software testing strategies.', logo: '/utbm-mark.png' },
      { institution: 'Lycée Paul Éluard', shortName: 'Paul Éluard', location: 'Saint-Denis, Greater Paris', degree: 'CPGE — ATS', field: 'Advanced technician adaptation program', period: '2024–2025', credential: 'ATS program completed', description: 'Advanced mathematics, physics, engineering sciences and computer science in preparation for engineering school entrance examinations.', grade: 'High honors', logo: '/lycee-paul-eluard-logo.jpg' },
      { institution: 'Oujda Higher School of Technology', shortName: 'EST Oujda', location: 'Oujda, Morocco', degree: 'University Diploma in Computer Science', field: 'Software development', period: '2022–2024', credential: 'University technology degree awarded', description: 'Coursework in advanced algorithms, databases, systems architecture, web development and application development.', grade: 'High honors', logo: '/est-oujda-logo.png' },
    ],
    certificationsItems: [
      ['3DEXPERIENCE Business Process Designer Advanced', 'Associate · Advanced level', 'Advanced process design and connection of ITEROP to external applications and services.', '/certifications/3dexperience-advanced.png', 'https://www.credly.com/badges/fc7e90c6-2ea0-4312-8c5e-2b3fb4112f4d'],
      ['3DEXPERIENCE Business Process Designer Beginner', 'Associate · Fundamentals', 'Design, configuration, testing, deployment and administration of business processes.', '/certifications/3dexperience-beginner.png', 'https://www.credly.com/badges/6aba54c1-a505-4f60-882f-25592e20a84a/linked_in_profile'],
      ['3DEXPERIENCE Business Process Player', 'Associate · Certified user', 'Execution, delegation and operational monitoring of tasks and processes on the platform.', '/certifications/3dexperience-player.png', 'https://www.credly.com/badges/1c4ca8e6-aa8b-4267-8dcb-67077e98058e/linked_in_profile'],
      ['Fundamentals of Accelerated Computing with CUDA Python', 'Accelerated computing · CUDA Python', 'Development and optimization of GPU-accelerated parallel computing with CUDA Python.', '', 'https://learn.nvidia.com/certificates?id=fxy9PAM8SDS_Q3KlOR6FiA'],
    ],
  },
  es: {
    metadataTitle: 'Desarrollador full-stack | Walid Tahiri', metadataDescription: 'Perfil profesional de Walid Tahiri: desarrollador full-stack y estudiante de ingeniería en la UTBM, con experiencia en interfaces web, APIs, automatización y herramientas empresariales.',
    skip: 'Ir al contenido', breadcrumb: 'Perfil profesional', location: 'Belfort, Francia · A distancia', eyebrow: 'Desarrollador full-stack · Estudiante de ingeniería en la UTBM',
    heroTitle: <>Convierto necesidades empresariales en <em>productos web fiables.</em></>, intro: 'Desarrollo interfaces, APIs y automatizaciones de principio a fin. Mis experiencias en Dassault Systèmes y SeoDev me enseñaron a trabajar con restricciones reales, documentar decisiones y entregar soluciones mantenibles.',
    resume: 'Descargar mi CV', linkedin: 'Ver mi LinkedIn', strengthsLabel: 'Puntos fuertes profesionales', strengths: [['Full-stack', 'Interfaces, APIs y datos'], ['Enfoque empresarial', 'Entender antes de construir'], ['Entrega fiable', 'Pruebas, documentación y despliegue']],
    about: 'Sobre Walid Tahiri', portrait: 'Retrato de Walid Tahiri', contribution: 'Lo que aporto', contributionTitle: 'Visión de producto respaldada por una ejecución técnica sólida.', contributionText: 'Avanzo con método: entender el uso, proponer una solución clara, construir con calidad y transmitir lo necesario para que el producto evolucione.',
    experience: 'Experiencia', career: 'Trayectoria profesional', experienceTitle: <>Productos web,<br /><em>en contextos reales.</em></>,
    certifications: 'Certificaciones', verified: 'Competencias verificadas', certificationsTitle: <>Conocimientos técnicos.<br /><em>Validados por el ecosistema.</em></>, certificate: 'Verificar certificado', badge: 'Insignia',
    education: 'Formación', academic: 'Trayectoria académica', educationTitle: <>Comprender los sistemas.<br /><em>Construir experiencias útiles.</em></>,
    educationItems: [
      { institution: 'Universidad de Tecnología de Belfort-Montbéliard', shortName: 'UTBM', location: 'Belfort-Montbéliard, Francia', degree: 'Ingeniería informática', field: 'Ingeniería informática', period: '2025–2028', credential: 'Título de ingeniería en curso', description: 'Formación en desarrollo web y de aplicaciones, ingeniería de software, cálculo paralelo, cloud, virtualización, redes y estrategias de pruebas.', logo: '/utbm-mark.png' },
      { institution: 'Lycée Paul Éluard', shortName: 'Paul Éluard', location: 'Saint-Denis, región parisina', degree: 'CPGE — ATS', field: 'Adaptación de técnico superior', period: '2024–2025', credential: 'Programa ATS completado', description: 'Profundización en matemáticas, física, ciencias industriales e informática para preparar las pruebas de acceso a escuelas de ingeniería.', grade: 'Mención sobresaliente', logo: '/lycee-paul-eluard-logo.jpg' },
      { institution: 'Escuela Superior de Tecnología de Oujda', shortName: 'EST Oujda', location: 'Oujda, Marruecos', degree: 'Diploma Universitario de Tecnología en Informática', field: 'Desarrollo de software', period: '2022–2024', credential: 'Diploma universitario de tecnología obtenido', description: 'Formación en algoritmos avanzados, bases de datos, arquitectura de sistemas, desarrollo web y desarrollo de aplicaciones.', grade: 'Mención sobresaliente', logo: '/est-oujda-logo.png' },
    ],
    certificationsItems: [
      ['3DEXPERIENCE Business Process Designer Advanced', 'Associate · Nivel avanzado', 'Diseño de procesos avanzados y conexión de ITEROP con aplicaciones y servicios externos.', '/certifications/3dexperience-advanced.png', 'https://www.credly.com/badges/fc7e90c6-2ea0-4312-8c5e-2b3fb4112f4d'],
      ['3DEXPERIENCE Business Process Designer Beginner', 'Associate · Fundamentos', 'Diseño, configuración, pruebas, despliegue y administración de procesos empresariales.', '/certifications/3dexperience-beginner.png', 'https://www.credly.com/badges/6aba54c1-a505-4f60-882f-25592e20a84a/linked_in_profile'],
      ['3DEXPERIENCE Business Process Player', 'Associate · Usuario certificado', 'Ejecución, delegación y seguimiento operativo de tareas y procesos en la plataforma.', '/certifications/3dexperience-player.png', 'https://www.credly.com/badges/1c4ca8e6-aa8b-4267-8dcb-67077e98058e/linked_in_profile'],
      ['Fundamentals of Accelerated Computing with CUDA Python', 'Cálculo acelerado · CUDA Python', 'Desarrollo y optimización de cálculos paralelos acelerados por GPU con CUDA Python.', '', 'https://learn.nvidia.com/certificates?id=fxy9PAM8SDS_Q3KlOR6FiA'],
    ],
  },
} as const;

type ProfilePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = content[locale];
  return { title: copy.metadataTitle, description: copy.metadataDescription, alternates: { canonical: `/${locale}/profile`, languages: { fr: '/fr/profile', en: '/en/profile', es: '/es/profile' } } };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = content[locale];
  return <>
    <ScrollToTop />
    <a className="skip-link" href="#main">{copy.skip}</a>
    <PortfolioNavbar locale={locale} />
    <main id="main" className="profile-page-main">
      <section className="profile-page-hero" aria-labelledby="profile-title"><div className="profile-page-shell profile-hero-stage">
        <div className="profile-hero-topline"><Link href={`/${locale}`}>Portfolio <span>/ {copy.breadcrumb}</span></Link><p><MapPin aria-hidden="true" />{copy.location}</p></div>
        <div className="profile-page-hero-grid"><div className="profile-page-hero-copy">
          <p className="profile-page-eyebrow">{copy.eyebrow}</p><h1 id="profile-title">{copy.heroTitle}</h1><p className="profile-page-intro">{copy.intro}</p>
          <div className="profile-page-actions"><a className="profile-page-primary" href={profile.resume} download>{copy.resume} <Download aria-hidden="true" /></a><a className="profile-page-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">{copy.linkedin} <BadgeCheck aria-hidden="true" /></a></div>
          <ul className="profile-recruiter-proof" aria-label={copy.strengthsLabel}>{copy.strengths.map((item, index) => { const Icon = [Code2, BriefcaseBusiness, ShieldCheck][index]!; return <li key={item[0]}><Icon aria-hidden="true" /><p><strong>{item[0]}</strong><span>{item[1]}</span></p></li>; })}</ul>
        </div><aside className="profile-hero-profile" aria-label={copy.about}><figure className="profile-hero-visual"><div className="profile-page-photo"><Image src="/walid-portrait-cutout.png" alt={copy.portrait} fill priority sizes="(max-width: 760px) 92vw, 460px" /></div></figure><div className="profile-recruiter-note"><span>{copy.contribution}</span><h2>{copy.contributionTitle}</h2><p>{copy.contributionText}</p></div></aside></div>
      </div></section>

      <section id="experience" className="profile-page-section" aria-labelledby="experience-title"><div className="profile-page-shell profile-page-section-heading"><p>{copy.experience}</p><div><span>{copy.career}</span><h2 id="experience-title">{copy.experienceTitle}</h2></div></div><ExperienceTimeline items={experienceByLocale[locale]} locale={locale} /></section>

      <section id="certifications" className="profile-page-section profile-certifications" aria-labelledby="certifications-title"><div className="profile-page-shell profile-page-section-heading"><p>{copy.certifications}</p><div><span>{copy.verified}</span><h2 id="certifications-title">{copy.certificationsTitle}</h2></div></div>
        <div className="profile-page-shell profile-certifications-list">{copy.certificationsItems.map((certification, index) => <article className="profile-certification-entry" key={certification[0]}><div className={`profile-certification-visual${certification[3] ? '' : ' is-nvidia'}`}>{certification[3] ? <Image src={certification[3]} alt={`${copy.badge} ${certification[0]}`} width={180} height={180} sizes="96px" /> : <><svg viewBox="0 0 24 24" role="img" aria-label="NVIDIA logo"><path d={siNvidia.path} /></svg><strong>NVIDIA</strong></>}</div><div className="profile-certification-meta"><span>0{index + 1}</span><strong>{index === 3 ? 'NVIDIA' : 'Dassault Systèmes'}</strong></div><h3>{certification[0]}</h3><p className="profile-certification-level">{certification[1]}</p><p className="profile-certification-description">{certification[2]}</p><a href={certification[4]} target="_blank" rel="noopener noreferrer" aria-label={`${copy.certificate}: ${certification[0]}`}>{copy.certificate} <ExternalLink aria-hidden="true" /></a></article>)}</div>
      </section>

      <section id="education" className="profile-page-section profile-education" aria-labelledby="education-title"><div className="profile-page-shell profile-page-section-heading"><p>{copy.education}</p><div><span>{copy.academic}</span><h2 id="education-title">{copy.educationTitle}</h2></div></div>
        <div className="profile-page-shell profile-education-list">{copy.educationItems.map((item, index) => <article className="profile-education-entry" key={item.institution}><span className="profile-education-index">0{index + 1}</span><div className="profile-education-school"><div className="profile-education-logo"><Image src={item.logo} alt={`${item.shortName} logo`} width={280} height={110} sizes="180px" /></div><p>{item.institution}</p><small>{item.location}</small></div><div className="profile-education-content"><div className="profile-education-meta"><span>{item.field}</span>{'grade' in item ? <strong>{item.grade}</strong> : null}</div><h3>{item.degree}</h3><p>{item.description}</p><div className="profile-education-details"><span>{item.period}</span><strong>{item.credential}</strong></div></div></article>)}</div>
      </section>
      <SkillsShowcase locale={locale} />
    </main>
    <CleanFooter email={profile.email} linkedin={profile.linkedin} resume={profile.resume} locale={locale} />
  </>;
}

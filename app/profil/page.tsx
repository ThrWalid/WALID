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
import { experience, profile } from '@/lib/portfolio';
import './profile.css';

export const metadata: Metadata = {
  title: 'Développeur full-stack | Walid Tahiri',
  description: 'Profil professionnel de Walid Tahiri : développeur full-stack et élève ingénieur à l’UTBM, expérimenté en interfaces web, API, automatisation et outils métier.',
  alternates: { canonical: '/profil' },
};

const education = [
  {
    institution: 'Université de technologie de Belfort-Montbéliard',
    shortName: 'UTBM',
    location: 'Belfort-Montbéliard, France',
    degree: 'Cycle ingénieur en informatique',
    field: 'Ingénierie informatique',
    period: '2025 — 2028',
    credential: 'Diplôme d’ingénieur en préparation',
    description: 'Formation en développement web et applicatif, génie logiciel, calcul parallèle, cloud, virtualisation, réseaux et stratégies de test logiciel.',
    logo: '/utbm-mark.png',
  },
  {
    institution: 'Lycée Paul Éluard',
    shortName: 'Paul Éluard',
    location: 'Saint-Denis, région parisienne',
    degree: 'CPGE — ATS',
    field: 'Adaptation technicien supérieur',
    period: '2024 — 2025',
    credential: 'Formation ATS validée',
    description: 'Approfondissement en mathématiques avancées, physique, sciences industrielles et informatique pour préparer les concours d’entrée en école d’ingénieurs.',
    grade: 'Mention Très bien',
    logo: '/lycee-paul-eluard-logo.jpg',
  },
  {
    institution: 'École Supérieure de Technologie d’Oujda',
    shortName: 'EST Oujda',
    location: 'Oujda, Maroc',
    degree: 'DUT Informatique',
    field: 'Développement informatique',
    period: '2022 — 2024',
    credential: 'Diplôme universitaire de technologie obtenu',
    description: 'Formation en algorithmique avancée, bases de données, architecture des systèmes, développement web et développement d’applications.',
    grade: 'Mention Très bien',
    logo: '/est-oujda-logo.png',
  },
];

const certifications = [
  {
    title: '3DEXPERIENCE Business Process Designer Advanced',
    level: 'Associate · Niveau avancé',
    issuer: 'Dassault Systèmes',
    description: 'Conception de processus avancés et connexion d’ITEROP à des applications et services externes.',
    image: '/certifications/3dexperience-advanced.png',
    url: 'https://www.credly.com/badges/fc7e90c6-2ea0-4312-8c5e-2b3fb4112f4d',
  },
  {
    title: '3DEXPERIENCE Business Process Designer Beginner',
    level: 'Associate · Fondamentaux',
    issuer: 'Dassault Systèmes',
    description: 'Conception, configuration, test, déploiement et administration de processus métier.',
    image: '/certifications/3dexperience-beginner.png',
    url: 'https://www.credly.com/badges/6aba54c1-a505-4f60-882f-25592e20a84a/linked_in_profile',
  },
  {
    title: '3DEXPERIENCE Business Process Player',
    level: 'Associate · Utilisateur certifié',
    issuer: 'Dassault Systèmes',
    description: 'Exécution, délégation et suivi opérationnel des tâches et processus sur la plateforme.',
    image: '/certifications/3dexperience-player.png',
    url: 'https://www.credly.com/badges/1c4ca8e6-aa8b-4267-8dcb-67077e98058e/linked_in_profile',
  },
  {
    title: 'Fundamentals of Accelerated Computing with CUDA Python',
    level: 'Calcul accéléré · CUDA Python',
    issuer: 'NVIDIA',
    description: 'Développement et optimisation de calculs parallèles accélérés sur GPU avec CUDA Python.',
    url: 'https://learn.nvidia.com/certificates?id=fxy9PAM8SDS_Q3KlOR6FiA',
  },
];

export default function ProfilePage() {
  return <>
    <ScrollToTop />
    <a className="skip-link" href="#main">Aller au contenu</a>
    <PortfolioNavbar />

    <main id="main" className="profile-page-main">
      <section className="profile-page-hero" aria-labelledby="profile-title">
        <div className="profile-page-shell profile-hero-stage">
          <div className="profile-hero-topline">
            <Link href="/">Portfolio <span>/ Profil professionnel</span></Link>
            <p><MapPin aria-hidden="true" />Belfort, France · à distance</p>
          </div>

          <div className="profile-page-hero-grid">
            <div className="profile-page-hero-copy">
              <p className="profile-page-eyebrow">Développeur full-stack · Élève ingénieur UTBM</p>
              <h1 id="profile-title">Je transforme les besoins métier en produits web <em>fiables.</em></h1>
              <p className="profile-page-intro">Je développe des interfaces, des API et des automatisations de bout en bout. Mes expériences chez Dassault Systèmes et SeoDev m’ont appris à travailler avec des contraintes réelles, documenter mes choix et livrer des solutions maintenables.</p>

              <div className="profile-page-actions">
                <a className="profile-page-primary" href={profile.resume} download>Télécharger mon CV <Download aria-hidden="true" /></a>
                <a className="profile-page-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Voir mon LinkedIn <BadgeCheck aria-hidden="true" /></a>
              </div>

              <ul className="profile-recruiter-proof" aria-label="Points forts professionnels">
                <li><Code2 aria-hidden="true" /><p><strong>Full-stack</strong><span>Interfaces, API et données</span></p></li>
                <li><BriefcaseBusiness aria-hidden="true" /><p><strong>Orienté métier</strong><span>Comprendre avant de construire</span></p></li>
                <li><ShieldCheck aria-hidden="true" /><p><strong>Livraison fiable</strong><span>Tests, documentation, déploiement</span></p></li>
              </ul>
            </div>

            <aside className="profile-hero-profile" aria-label="À propos de Walid Tahiri">
              <figure className="profile-hero-visual">
                <div className="profile-page-photo"><Image src="/walid-portrait-cutout.png" alt="Portrait de Walid Tahiri" fill priority sizes="(max-width: 760px) 92vw, 460px" /></div>
              </figure>
              <div className="profile-recruiter-note">
                <span>Ce que j’apporte</span>
                <h2>Une vision produit soutenue par une exécution technique solide.</h2>
                <p>J’avance avec méthode : comprendre l’usage, proposer une solution claire, construire proprement et transmettre ce qui est nécessaire pour la faire évoluer.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="experience" className="profile-page-section" aria-labelledby="experience-title">
        <div className="profile-page-shell profile-page-section-heading">
          <p>Expérience</p>
          <div><span>Parcours professionnel</span><h2 id="experience-title">Des produits web,<br /><em>dans des contextes réels.</em></h2></div>
        </div>

        <ExperienceTimeline items={experience} />
      </section>

      <section id="certifications" className="profile-page-section profile-certifications" aria-labelledby="certifications-title">
        <div className="profile-page-shell profile-page-section-heading">
          <p>Certifications</p>
          <div><span>Compétences vérifiées</span><h2 id="certifications-title">Des acquis techniques.<br /><em>Validés par l’écosystème.</em></h2></div>
        </div>

        <div className="profile-page-shell profile-certifications-list">
          {certifications.map((certification, index) => <article className="profile-certification-entry" key={certification.title}>
            <div className={`profile-certification-visual${certification.image ? '' : ' is-nvidia'}`}>
              {certification.image
                ? <Image src={certification.image} alt={`Badge ${certification.title}`} width={180} height={180} sizes="96px" />
                : <><svg viewBox="0 0 24 24" role="img" aria-label="Logo NVIDIA"><path d={siNvidia.path} /></svg><strong>NVIDIA</strong></>}
            </div>
            <div className="profile-certification-meta"><span>0{index + 1}</span><strong>{certification.issuer}</strong></div>
            <h3>{certification.title}</h3>
            <p className="profile-certification-level">{certification.level}</p>
            <p className="profile-certification-description">{certification.description}</p>
            <a href={certification.url} target="_blank" rel="noopener noreferrer" aria-label={`Vérifier la certification ${certification.title}`}>
              Vérifier le certificat <ExternalLink aria-hidden="true" />
            </a>
          </article>)}
        </div>
      </section>

      <section id="education" className="profile-page-section profile-education" aria-labelledby="education-title">
        <div className="profile-page-shell profile-page-section-heading">
          <p>Formation</p>
          <div><span>Parcours académique</span><h2 id="education-title">Comprendre les systèmes.<br /><em>Construire les usages.</em></h2></div>
        </div>
        <div className="profile-page-shell profile-education-list">
          {education.map((item, index) => <article className="profile-education-entry" key={item.institution}>
            <span className="profile-education-index">0{index + 1}</span>
            <div className="profile-education-school">
              <div className={`profile-education-logo${item.logo ? '' : ' is-text'}`}>
                {item.logo ? <Image src={item.logo} alt={`Logo ${item.shortName}`} width={280} height={110} sizes="180px" /> : <strong>EST</strong>}
              </div>
              <p>{item.institution}</p>
              <small>{item.location}</small>
            </div>
            <div className="profile-education-content">
              <div className="profile-education-meta"><span>{item.field}</span>{item.grade ? <strong>{item.grade}</strong> : null}</div>
              <h3>{item.degree}</h3>
              <p>{item.description}</p>
              <div className="profile-education-details"><span>{item.period}</span><strong>{item.credential}</strong></div>
            </div>
          </article>)}
        </div>
      </section>

      <SkillsShowcase />

    </main>

    <CleanFooter email={profile.email} linkedin={profile.linkedin} resume={profile.resume} />
  </>;
}

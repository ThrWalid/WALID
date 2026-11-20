import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { CleanFooter } from '@/components/portfolio-controls';
import { PortfolioNavbar } from '@/components/portfolio-navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SkillsShowcase } from '@/components/skills-showcase';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { experience, profile } from '@/lib/portfolio';
import './profile.css';

export const metadata: Metadata = {
  title: 'Profil professionnel | Walid Tahiri',
  description: 'Parcours, expériences, projets et compétences techniques de Walid Tahiri, développeur web et élève ingénieur en informatique.',
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
            <p>Belfort, France · à distance</p>
          </div>

          <div className="profile-page-hero-grid">
            <div className="profile-page-hero-copy">
              <p className="profile-page-eyebrow">Développeur web indépendant</p>
              <h1 id="profile-title"><span>Du besoin métier</span><span>au produit</span><em>en production.</em></h1>
              <p className="profile-page-intro">Je prends en charge le parcours, l’interface, le backend et les intégrations nécessaires pour livrer un produit web utilisable, documenté et prêt à évoluer.</p>
            </div>

            <figure className="profile-hero-visual">
              <span className="profile-hero-name" aria-hidden="true">Walid</span>
              <div className="profile-page-photo"><Image src="/walid-portrait-cutout.png" alt="Portrait de Walid Tahiri" fill priority sizes="(max-width: 760px) 92vw, 360px" /></div>
            </figure>

            <aside className="profile-hero-details" aria-label="À propos de Walid Tahiri">
              <p>À propos</p>
              <h2>Développeur web et élève ingénieur en informatique.</h2>
              <p className="profile-hero-about">Basé à Belfort, je développe des sites, des applications et des outils métier pour des usages concrets.</p>
            </aside>
          </div>

          <div className="profile-hero-actions-row">
            <p>CV et profil professionnel</p>
            <div className="profile-page-actions">
              <a className="profile-page-primary" href={profile.resume} download>Télécharger mon CV <Download aria-hidden="true" /></a>
              <a className="profile-page-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Consulter LinkedIn</a>
            </div>
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

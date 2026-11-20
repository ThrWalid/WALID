import { capabilities, faqs, profile, services } from '@/lib/portfolio';
import { CleanFooter, StartProjectButton } from '@/components/portfolio-controls';
import { FaqGrid } from '@/components/faq-accordion';
import { ServicesExplorer } from '@/components/services-explorer';
import { ProjectStudies } from '@/components/project-studies';
import { PortfolioHero } from '@/components/portfolio-hero';
import { PortfolioNavbar } from '@/components/portfolio-navbar';
import { FeedbackShowcase } from '@/components/feedback-showcase';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: profile.specialization,
    url: profile.url,
    email: profile.email,
    sameAs: [profile.linkedin],
    homeLocation: { '@type': 'Place', name: 'Belfort, France' },
    knowsAbout: capabilities,
    makesOffer: services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, description: service.description } })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#main">Aller au contenu</a>

    <PortfolioNavbar />

    <main id="main" tabIndex={-1}>
      <PortfolioHero />

      <ServicesExplorer />

      <ProjectStudies />

      <FeedbackShowcase />

      <section id="faq" className="faq-section section-space shell" aria-labelledby="faq-title">
        <header className="editorial-heading"><p className="kicker">Avant de commencer</p><div><h2 id="faq-title">Vos questions.</h2><p>Quelques repères pour préparer notre premier échange.</p></div></header>
        <FaqGrid items={[faqs[0], faqs[1], faqs[2], faqs[5], faqs[6]]} />
        <StartProjectButton className="faq-more" label="Une autre question ?" />
      </section>

    </main>

    <CleanFooter email={profile.email} linkedin={profile.linkedin} resume={profile.resume} />
  </>;
}

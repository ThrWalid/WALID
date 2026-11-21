import Image from 'next/image';
import { capabilities, faqs, profile, services } from '@/lib/portfolio';
import { CleanFooter, StartProjectButton } from '@/components/portfolio-controls';
import { FaqGrid } from '@/components/faq-accordion';
import { ServicesExplorer } from '@/components/services-explorer';
import { ProjectStudies } from '@/components/project-studies';
import { PortfolioHero } from '@/components/portfolio-hero';
import { PortfolioNavbar } from '@/components/portfolio-navbar';
import { FeedbackShowcase } from '@/components/feedback-showcase';
import { PricingSection } from '@/components/pricing-section';

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

      <PricingSection />

      <ProjectStudies />

      <FeedbackShowcase />

      <section id="faq" className="faq-section section-space shell" aria-labelledby="faq-title">
        <header className="editorial-heading faq-intro">
          <p className="kicker">Avant de commencer</p>
          <div><h2 id="faq-title">Des réponses<br /><em>sans détour.</em></h2><p>Budget, délais, fonctionnement : voici l’essentiel pour vous aider à avancer sereinement.</p></div>
          <figure className="faq-profile">
            <Image src="/walid-linkedin-portrait.webp" alt="Portrait de Walid Tahiri" width={817} height={829} sizes="72px" />
            <blockquote>« Un projet réussi commence par des réponses claires et des décisions simples. »</blockquote>
            <figcaption><strong>Walid Tahiri</strong><span>Développeur web indépendant</span></figcaption>
          </figure>
        </header>
        <FaqGrid items={[faqs[0], faqs[1], faqs[2], faqs[5], faqs[6]]} />
        <StartProjectButton className="faq-more" label="Une autre question ?" />
      </section>

    </main>

    <CleanFooter email={profile.email} linkedin={profile.linkedin} resume={profile.resume} />
  </>;
}

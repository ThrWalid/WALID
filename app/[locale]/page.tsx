import Image from 'next/image';
import { profile } from '@/lib/portfolio';
import { capabilitiesByLocale, faqsByLocale, profileCopy, serviceSchemaByLocale } from '@/lib/locale-content';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { CleanFooter, StartProjectButton } from '@/components/portfolio-controls';
import { FaqGrid } from '@/components/faq-accordion';
import { ServicesExplorer } from '@/components/services-explorer';
import { ProjectStudies } from '@/components/project-studies';
import { PortfolioHero } from '@/components/portfolio-hero';
import { PortfolioNavbar } from '@/components/portfolio-navbar';
import { FeedbackShowcase } from '@/components/feedback-showcase';
import { PricingSection } from '@/components/pricing-section';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const faqs = faqsByLocale[locale];
  const capabilities = capabilitiesByLocale[locale];
  const copy = {
    fr: {
      skip: 'Aller au contenu', faqKicker: 'Avant de commencer', faqTitle: <>Des réponses<br /><em>sans détour.</em></>,
      faqIntro: 'Budget, délais, fonctionnement : voici l’essentiel pour vous aider à avancer sereinement.', portraitAlt: 'Portrait de Walid Tahiri',
      quote: '« Un projet réussi commence par des réponses claires et des décisions simples. »', role: 'Développeur web indépendant', question: 'Une autre question ?',
    },
    en: {
      skip: 'Skip to content', faqKicker: 'Before we begin', faqTitle: <>Clear answers,<br /><em>straight to the point.</em></>,
      faqIntro: 'Budget, timing and process: the essentials you need to move forward with confidence.', portraitAlt: 'Portrait of Walid Tahiri',
      quote: '“A successful project starts with clear answers and simple decisions.”', role: 'Freelance web developer', question: 'Another question?',
    },
    es: {
      skip: 'Ir al contenido', faqKicker: 'Antes de empezar', faqTitle: <>Respuestas claras,<br /><em>sin rodeos.</em></>,
      faqIntro: 'Presupuesto, plazos y forma de trabajo: lo esencial para avanzar con confianza.', portraitAlt: 'Retrato de Walid Tahiri',
      quote: '«Un proyecto exitoso comienza con respuestas claras y decisiones sencillas.»', role: 'Desarrollador web freelance', question: '¿Tienes otra pregunta?',
    },
  }[locale];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profileCopy[locale].role,
    description: profileCopy[locale].specialization,
    url: `${profile.url}/${locale}`,
    email: profile.email,
    sameAs: [profile.linkedin],
    homeLocation: { '@type': 'Place', name: 'Belfort, France' },
    knowsAbout: capabilities,
    makesOffer: serviceSchemaByLocale[locale].map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description } })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#main">{copy.skip}</a>

    <PortfolioNavbar locale={locale} />

    <main id="main" tabIndex={-1}>
      <PortfolioHero locale={locale} />

      <ServicesExplorer locale={locale} />

      <PricingSection locale={locale} />

      <ProjectStudies locale={locale} />

      <FeedbackShowcase locale={locale} />

      <section id="faq" className="faq-section section-space shell" aria-labelledby="faq-title">
        <header className="editorial-heading faq-intro">
          <p className="kicker">{copy.faqKicker}</p>
          <div><h2 id="faq-title">{copy.faqTitle}</h2><p>{copy.faqIntro}</p></div>
          <figure className="faq-profile">
            <Image src="/walid-linkedin-portrait.webp" alt={copy.portraitAlt} width={817} height={829} sizes="72px" />
            <blockquote>{copy.quote}</blockquote>
            <figcaption><strong>Walid Tahiri</strong><span>{copy.role}</span></figcaption>
          </figure>
        </header>
        <FaqGrid items={[faqs[0], faqs[1], faqs[2], faqs[5], faqs[6]]} />
        <StartProjectButton className="faq-more" label={copy.question} />
      </section>

    </main>

    <CleanFooter email={profile.email} linkedin={profile.linkedin} resume={profile.resume} locale={locale} />
  </>;
}

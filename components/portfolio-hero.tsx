import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { StartProjectButton } from '@/components/portfolio-controls';
import { Button } from '@/components/ui/button';
import { HeroLaurels } from '@/components/hero-laurels';
import { HeroPointerLight } from '@/components/hero-pointer-light';
import type { Locale } from '@/lib/i18n';

export function PortfolioHero({ locale }: { locale: Locale }) {
  const copy = locale === 'fr' ? {
    profile: 'Découvrir le profil de Walid Tahiri', experience: 'Expérience chez', experienceLabel: 'Expérience professionnelle chez Dassault Systèmes et SeoDev',
    title: <><span>Je conçois des sites <em>sur mesure</em></span><span>rapides, utiles et durables.</span></>,
    description: 'Du cadrage et du design UI/UX au développement Next.js et à la mise en ligne, je construis des expériences web professionnelles, performantes et faciles à faire évoluer.',
    capabilities: 'Domaines d’intervention', items: ['Stratégie UI/UX', 'Développement', 'Mise en ligne'], start: 'Parlons de votre projet', work: 'Voir mes réalisations', note: 'Une idée, un besoin ? Commençons par en parler.',
  } : locale === 'es' ? {
    profile: 'Descubrir el perfil de Walid Tahiri', experience: 'Experiencia en', experienceLabel: 'Experiencia profesional en Dassault Systèmes y SeoDev',
    title: <><span>Diseño sitios <em>a medida</em></span><span>rápidos, útiles y duraderos.</span></>,
    description: 'Desde la estrategia y el diseño UI/UX hasta el desarrollo con Next.js y el lanzamiento, creo experiencias web profesionales, rápidas y fáciles de mantener.',
    capabilities: 'Áreas de especialización', items: ['Estrategia UI/UX', 'Desarrollo', 'Lanzamiento'], start: 'Hablemos de tu proyecto', work: 'Ver mis proyectos', note: '¿Tienes una idea o una necesidad? Empecemos por hablar.',
  } : {
    profile: 'Discover Walid Tahiri’s profile', experience: 'Experience at', experienceLabel: 'Professional experience at Dassault Systèmes and SeoDev',
    title: <><span>I build <em>custom websites</em></span><span>that are fast, useful and built to last.</span></>,
    description: 'From strategy and UI/UX design to Next.js development and launch, I create professional web experiences that perform well and remain easy to evolve.',
    capabilities: 'Areas of expertise', items: ['UI/UX strategy', 'Development', 'Launch'], start: 'Let’s discuss your project', work: 'View my work', note: 'Have an idea or a need? Let’s start with a conversation.',
  };
  return <section id="accueil" className="hero-showcase" aria-labelledby="hero-title">
    <HeroPointerLight />
    <HeroLaurels />
    <div className="shell hero-showcase-inner">
      <div className="hero-showcase-copy">
        <div className="hero-identity">
          <a className="hero-portrait" href={`/${locale}/profile`} aria-label={copy.profile}>
            <Image src="/walid-linkedin.webp" alt="" width={240} height={244} priority sizes="56px" />
          </a>
        </div>
        <div className="hero-company-proof" aria-label={copy.experienceLabel}><span>{copy.experience}</span><div><Image src="/dassault-logo-optimized.webp" alt="Dassault Systèmes" width={512} height={158} sizes="118px" /><i /><Image src="/seodev-logo-optimized.webp" alt="SeoDev" width={128} height={128} sizes="28px" /><strong>SeoDev</strong></div></div>
        <h1 id="hero-title">{copy.title}</h1>
        <p className="hero-showcase-description">{copy.description}</p>
        <ul className="hero-capabilities" aria-label={copy.capabilities}>{copy.items.map(item => <li key={item}><i />{item}</li>)}</ul>
        <div className="hero-showcase-actions">
          <StartProjectButton className="hero-primary-action" size="lg" label={copy.start} icon={<ArrowUpRight aria-hidden="true" />} />
          <Button asChild variant="outline" size="lg" className="hero-secondary-action"><a href="#realisations">{copy.work} <ArrowRight aria-hidden="true" /></a></Button>
        </div>
        <p className="hero-action-note">{copy.note}</p>
      </div>
    </div>
  </section>;
}


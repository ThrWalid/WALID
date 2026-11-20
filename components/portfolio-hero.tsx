import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { StartProjectButton } from '@/components/portfolio-controls';
import { Button } from '@/components/ui/button';
import { HeroLaurels } from '@/components/hero-laurels';
import { HeroPointerLight } from '@/components/hero-pointer-light';

export function PortfolioHero() {
  return <section id="accueil" className="hero-showcase" aria-labelledby="hero-title">
    <HeroPointerLight />
    <HeroLaurels />
    <div className="shell hero-showcase-inner">
      <div className="hero-showcase-copy">
        <div className="hero-identity">
          <a className="hero-portrait" href="/profil" aria-label="Découvrir le portfolio de Walid Tahiri">
            <Image src="/walid-linkedin.webp" alt="" width={240} height={244} priority sizes="56px" />
          </a>
        </div>
        <div className="hero-company-proof" aria-label="Expérience professionnelle chez Dassault Systèmes et SeoDev"><span>Expérience chez</span><div><Image src="/dassault-logo-optimized.webp" alt="Dassault Systèmes" width={512} height={158} sizes="118px" /><i /><Image src="/seodev-logo-optimized.webp" alt="SeoDev" width={128} height={128} sizes="28px" /><strong>SeoDev</strong></div></div>
        <h1 id="hero-title"><span>Je conçois des sites <em>sur mesure</em></span><span>rapides, utiles et durables.</span></h1>
        <p className="hero-showcase-description">Du cadrage et du design UI/UX au développement Next.js et à la mise en ligne, je construis des expériences web professionnelles, performantes et faciles à faire évoluer.</p>
        <ul className="hero-capabilities" aria-label="Domaines d’intervention"><li><i />Stratégie UI/UX</li><li><i />Développement</li><li><i />Mise en ligne</li></ul>
        <div className="hero-showcase-actions">
          <StartProjectButton className="hero-primary-action" size="lg" label="Parlons de votre projet" icon={<ArrowUpRight aria-hidden="true" />} />
          <Button asChild variant="outline" size="lg" className="hero-secondary-action"><a href="#realisations">Voir mes réalisations <ArrowRight aria-hidden="true" /></a></Button>
        </div>
        <p className="hero-action-note">Une idée, un besoin ? Commençons par en parler.</p>
      </div>
    </div>
  </section>;
}


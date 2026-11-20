'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { StartProjectButton } from '@/components/portfolio-controls';

const showcaseProjects = [
  { number: '01', src: '/showcase/saas-dashboard.webp', title: 'Baseline', kind: 'Application · SaaS', outcome: 'Hiérarchiser les indicateurs pour accélérer la prise de décision.' },
  { number: '02', src: '/showcase/beauty-platform.webp', title: 'Transeface', kind: 'Plateforme · Beauté & IA', outcome: 'Expliquer une technologie complexe dans un parcours rassurant.' },
  { number: '03', src: '/showcase/growth-agency.webp', title: 'Growthy', kind: 'Site vitrine · Conseil', outcome: 'Clarifier l’expertise et transformer l’intérêt en prise de contact.' },
  { number: '04', src: '/showcase/craftsmanship.webp', title: 'Atelier du Chêne', kind: 'Site vitrine · Artisanat', outcome: 'Présenter le savoir-faire et guider vers une demande sur mesure.' },
];

export function ProjectStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let revert = () => {};

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.project-stack-card');

        const headingTimeline = gsap.timeline({ scrollTrigger: { trigger: '.work-heading', start: 'top 82%', once: true } });
        headingTimeline
          .from('.work-heading-rail > *', { x: -16, autoAlpha: 0, stagger: .06, duration: .42, ease: 'power2.out' })
          .from('.work-heading-line > span', { yPercent: 105, stagger: .07, duration: .65, ease: 'power3.out' }, '-=.25')
          .from('.work-heading-summary > *', { y: 14, autoAlpha: 0, stagger: .07, duration: .42, ease: 'power2.out' }, '-=.3');

        cards.forEach(card => {
          const captionItems = card.querySelectorAll('figcaption > *');
          gsap.from(captionItems, { y: 10, autoAlpha: 0, stagger: .05, duration: .45, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 82%', once: true } });
        });
      }, section);

      revert = () => context.revert();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return <section ref={sectionRef} id="realisations" className="project-studies section-space" aria-labelledby="work-title">
    <div className="shell">
      <header className="work-heading">
        <div className="work-heading-rail">
          <p className="kicker">Réalisations sélectionnées</p>
          <span>Sites · Interfaces · Applications</span>
        </div>
        <div className="work-heading-main">
          <p className="work-heading-overline">Du problème à l’interface</p>
          <h2 id="work-title">
            <span className="work-heading-line"><span>Des projets conçus</span></span><br />
            <span className="work-heading-line"><span>pour produire</span></span><br />
            <span className="work-heading-line"><span><em>un résultat concret.</em></span></span>
          </h2>
          <div className="work-heading-summary">
            <p>Chaque direction part d’un usage précis : comprendre une offre, trouver une information ou accomplir une action sans friction.</p>
            <ul aria-label="Types de réalisations"><li>Sites vitrines</li><li>Refontes</li><li>Applications web</li></ul>
          </div>
        </div>
      </header>

      <div className="project-stack" aria-label="Aperçu de quatre directions web sélectionnées">
        {showcaseProjects.map((project, index) => <figure className="project-stack-card" style={{ zIndex: index + 1 }} key={project.src}>
          <div className="project-stack-media">
            <Image src={project.src} alt={`Aperçu complet du projet ${project.title}`} width={1600} height={1067} sizes="(max-width: 760px) calc(100vw - 16px), min(1120px, calc(100vw - 48px))" priority={index === 0} />
            <span className="project-stack-card-overlay" />
          </div>
          <figcaption>
            <div><span>{project.number} / {project.kind}</span><strong>{project.title}</strong></div>
            <p>{project.outcome}</p>
          </figcaption>
        </figure>)}
      </div>

      <footer className="work-closing">
        <div><span>Un besoin différent ?</span><p>Le format s’adapte au problème à résoudre, pas l’inverse.</p></div>
        <StartProjectButton label="Construire mon projet" icon={<ArrowUpRight aria-hidden="true" />} />
      </footer>
    </div>
  </section>;
}

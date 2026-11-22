'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { StartProjectButton } from '@/components/portfolio-controls';
import type { Locale } from '@/lib/i18n';

const projectCopy = {
  fr: {
    projects: [
      ['Application · SaaS', 'Hiérarchiser les indicateurs pour accélérer la prise de décision.'], ['Plateforme · Beauté & IA', 'Expliquer une technologie complexe dans un parcours rassurant.'],
      ['Site vitrine · Conseil', 'Clarifier l’expertise et transformer l’intérêt en prise de contact.'], ['Site vitrine · Artisanat', 'Présenter le savoir-faire et guider vers une demande sur mesure.'],
    ],
    kicker: 'Réalisations sélectionnées', types: 'Sites · Interfaces · Applications', overline: 'Du problème à l’interface', title: <>Des projets conçus<br />pour produire<br /><em>un résultat concret.</em></>,
    summary: 'Chaque direction part d’un usage précis : comprendre une offre, trouver une information ou accomplir une action sans friction.', typeLabel: 'Types de réalisations', typeItems: ['Sites vitrines', 'Refontes', 'Applications web'],
    showcaseLabel: 'Aperçu de quatre directions web sélectionnées', imageAlt: 'Aperçu complet du projet {title}', different: 'Un besoin différent ?', adaptable: 'Le format s’adapte au problème à résoudre, pas l’inverse.', cta: 'Construire mon projet',
  },
  en: {
    projects: [
      ['Application · SaaS', 'Organize key metrics to speed up decision-making.'], ['Platform · Beauty & AI', 'Explain complex technology through a reassuring user journey.'],
      ['Corporate site · Consulting', 'Clarify expertise and turn interest into inquiries.'], ['Corporate site · Craftsmanship', 'Showcase expertise and guide visitors toward a custom request.'],
    ],
    kicker: 'Selected work', types: 'Websites · Interfaces · Applications', overline: 'From problem to interface', title: <>Projects designed<br />to deliver<br /><em>a tangible outcome.</em></>,
    summary: 'Every direction begins with a clear use case: understand an offer, find information or complete an action without friction.', typeLabel: 'Project types', typeItems: ['Corporate websites', 'Redesigns', 'Web applications'],
    showcaseLabel: 'Preview of four selected web directions', imageAlt: 'Full preview of the {title} project', different: 'A different need?', adaptable: 'The format adapts to the problem—not the other way around.', cta: 'Build my project',
  },
  es: {
    projects: [
      ['Aplicación · SaaS', 'Jerarquizar los indicadores para acelerar la toma de decisiones.'], ['Plataforma · Belleza e IA', 'Explicar una tecnología compleja mediante un recorrido tranquilizador.'],
      ['Sitio corporativo · Consultoría', 'Aclarar la experiencia y convertir el interés en contactos.'], ['Sitio corporativo · Artesanía', 'Mostrar el saber hacer y guiar hacia una solicitud a medida.'],
    ],
    kicker: 'Proyectos seleccionados', types: 'Sitios · Interfaces · Aplicaciones', overline: 'Del problema a la interfaz', title: <>Proyectos diseñados<br />para conseguir<br /><em>un resultado concreto.</em></>,
    summary: 'Cada dirección parte de un uso concreto: entender una oferta, encontrar información o completar una acción sin fricción.', typeLabel: 'Tipos de proyectos', typeItems: ['Sitios corporativos', 'Rediseños', 'Aplicaciones web'],
    showcaseLabel: 'Vista previa de cuatro propuestas web seleccionadas', imageAlt: 'Vista completa del proyecto {title}', different: '¿Tienes otra necesidad?', adaptable: 'El formato se adapta al problema, no al revés.', cta: 'Crear mi proyecto',
  },
} as const;

const projectVisuals = [
  { number: '01', src: '/showcase/saas-dashboard.webp', title: 'Baseline' }, { number: '02', src: '/showcase/beauty-platform.webp', title: 'Transeface' },
  { number: '03', src: '/showcase/growth-agency.webp', title: 'Growthy' }, { number: '04', src: '/showcase/craftsmanship.webp', title: 'Atelier du Chêne' },
];

export function ProjectStudies({ locale }: { locale: Locale }) {
  const copy = projectCopy[locale];
  const showcaseProjects = projectVisuals.map((project, index) => ({ ...project, kind: copy.projects[index][0], outcome: copy.projects[index][1] }));
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
          <p className="kicker">{copy.kicker}</p>
          <span>{copy.types}</span>
        </div>
        <div className="work-heading-main">
          <p className="work-heading-overline">{copy.overline}</p>
          <h2 id="work-title">
            <span className="work-heading-line"><span>{copy.title}</span></span>
          </h2>
          <div className="work-heading-summary">
            <p>{copy.summary}</p>
            <ul aria-label={copy.typeLabel}>{copy.typeItems.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </header>

      <div className="project-stack" aria-label={copy.showcaseLabel}>
        {showcaseProjects.map((project, index) => <figure className="project-stack-card" style={{ zIndex: index + 1 }} key={project.src}>
          <div className="project-stack-media">
            <Image src={project.src} alt={copy.imageAlt.replace('{title}', project.title)} width={1600} height={1067} sizes="(max-width: 760px) calc(100vw - 16px), min(1120px, calc(100vw - 48px))" priority={index === 0} />
            <span className="project-stack-card-overlay" />
          </div>
          <figcaption>
            <div><span>{project.number} / {project.kind}</span><strong>{project.title}</strong></div>
            <p>{project.outcome}</p>
          </figcaption>
        </figure>)}
      </div>

      <footer className="work-closing">
        <div><span>{copy.different}</span><p>{copy.adaptable}</p></div>
        <StartProjectButton label={copy.cta} icon={<ArrowUpRight aria-hidden="true" />} />
      </footer>
    </div>
  </section>;
}

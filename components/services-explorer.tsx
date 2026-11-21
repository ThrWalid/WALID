'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  PanelsTopLeft,
  RefreshCcw,
  SearchCheck,
  Sparkles,
} from 'lucide-react';
import { StartProjectButton } from '@/components/portfolio-controls';

const clientJourney = [
  {
    moment: 'Premier échange',
    title: 'On pose le cap',
    description: 'Nous transformons vos idées en un objectif précis : attirer, rassurer et déclencher la bonne action.',
    action: 'Partager votre vision',
  },
  {
    moment: 'Le lendemain',
    title: 'Votre feuille de route',
    description: 'Vous recevez une proposition structurée avec les priorités, les livrables, le budget et le calendrier.',
    action: 'Donner le feu vert',
  },
  {
    moment: 'Première semaine',
    title: 'L’expérience prend forme',
    description: 'Votre univers devient une interface claire et mémorable, pensée pour guider naturellement vos visiteurs.',
    action: 'Affiner les choix clés',
  },
  {
    moment: 'Deuxième semaine',
    title: 'Le projet devient réel',
    description: 'Je développe une expérience rapide, fluide et soignée sur chaque écran, puis vous ouvre l’accès aux tests.',
    action: 'Valider la version finale',
  },
  {
    moment: 'Jour du lancement',
    title: 'Prêt à convaincre',
    description: 'Votre site est contrôlé, connecté à votre domaine et publié pour accueillir vos prochains clients.',
    action: 'Prendre les commandes',
    complete: true,
  },
];

const launchHandoff = [
  'Un site rapide, responsive et prêt à convertir',
  'La pleine propriété du site et de son code',
  'Des accès et un guide pour rester autonome',
  '30 jours d’accompagnement après le lancement',
];

const serviceOffers = [
  {
    code: '01',
    label: 'Site vitrine & acquisition',
    icon: Globe2,
    title: 'Présenter votre offre. Générer le bon contact.',
    context: 'Pour lancer une activité, clarifier un positionnement ou remplacer un site qui ne produit pas assez de demandes.',
    outcome: 'Le visiteur comprend ce que vous proposez, vérifie que votre offre lui correspond et accède rapidement au contact, au devis ou à la réservation.',
    deliverables: [
      'Arborescence et pages adaptées à votre offre',
      'Design sur mesure pour mobile, tablette et ordinateur',
      'Développement Next.js rapide et accessible',
      'Formulaire, prise de rendez-vous ou demande de devis',
      'SEO technique, métadonnées et mesure des conversions',
    ],
    outputs: [
      { title: 'Produit livré', text: 'Un site publié sur votre domaine, testé sur les principaux écrans.' },
      { title: 'Autonomie', text: 'Une gestion simple des contenus via un CMS lorsque le projet le nécessite.' },
      { title: 'Mesure', text: 'Les actions importantes suivies pour savoir ce qui génère des contacts.' },
    ],
    action: 'Parler de mon futur site',
  },
  {
    code: '02',
    label: 'Refonte de site',
    icon: RefreshCcw,
    title: 'Corriger ce qui freine. Conserver ce qui fonctionne.',
    context: 'Pour un site lent, vieillissant, difficile à mettre à jour ou devenu incohérent avec votre activité.',
    outcome: 'Vous gagnez en crédibilité, en lisibilité et en vitesse sans perdre les contenus utiles, les adresses importantes ni les acquis SEO de l’existant.',
    deliverables: [
      'Audit du site, des parcours et des performances',
      'Nouvelle architecture des contenus et priorités',
      'Refonte visuelle et système de composants cohérent',
      'Migration des contenus et redirections des anciennes pages',
      'Optimisation des performances, du SEO et de l’accessibilité',
    ],
    outputs: [
      { title: 'Continuité', text: 'Les contenus et URLs utiles sont repris avec un plan de redirection clair.' },
      { title: 'Performance', text: 'Images, polices et code optimisés pour accélérer le chargement.' },
      { title: 'Passation', text: 'Accès, documentation et fonctionnement du nouveau site transmis.' },
    ],
    action: 'Faire auditer mon site',
  },
  {
    code: '03',
    label: 'Application web métier',
    icon: PanelsTopLeft,
    title: 'Transformer un processus en outil simple.',
    context: 'Pour remplacer des fichiers dispersés, centraliser une activité ou proposer un espace sécurisé à vos clients et collaborateurs.',
    outcome: 'L’outil rassemble les bonnes données, réduit les manipulations répétitives et donne à chaque utilisateur un parcours adapté à son rôle.',
    deliverables: [
      'Spécification des rôles, données et parcours métier',
      'Tableau de bord, espace client ou interface interne',
      'Authentification et gestion des autorisations',
      'Connexion aux API et bases de données nécessaires',
      'Tests, déploiement, documentation et plan d’évolution',
    ],
    outputs: [
      { title: 'Version utilisable', text: 'Un premier périmètre complet pour réaliser les opérations prioritaires.' },
      { title: 'Données fiables', text: 'Des règles claires pour enregistrer, consulter et sécuriser l’information.' },
      { title: 'Évolution', text: 'Une architecture prévue pour ajouter des fonctions sans reconstruire le produit.' },
    ],
    action: 'Décrire mon application',
  },
  {
    code: '04',
    label: 'SEO technique & performance',
    icon: SearchCheck,
    title: 'Être trouvé. Charger vite. Convertir mieux.',
    context: 'Pour construire une base SEO solide, corriger les freins techniques d’un site existant ou préparer une croissance durable dans les résultats de recherche.',
    outcome: 'Votre site devient plus simple à explorer pour Google, plus rapide pour vos visiteurs et mieux structuré pour relier chaque page à une intention de recherche utile à votre activité.',
    deliverables: [
      'Audit technique, sémantique et analyse des performances',
      'Architecture des pages, balises et maillage interne',
      'Données structurées, sitemap, robots et métadonnées',
      'Optimisation des Core Web Vitals et des médias',
      'Configuration du suivi et recommandations prioritaires',
    ],
    outputs: [
      { title: 'Indexation', text: 'Des pages accessibles, compréhensibles et correctement déclarées aux moteurs.' },
      { title: 'Performance', text: 'Une expérience rapide qui limite les abandons et soutient le référencement.' },
      { title: 'Pilotage', text: 'Des contrôles mesurables et un plan d’amélioration classé par impact.' },
    ],
    action: 'Améliorer mon référencement',
  },
];

const seoScores = [
  { value: '100', label: 'Performance' },
  { value: '97', label: 'Accessibilité' },
  { value: '100', label: 'Bonnes pratiques' },
  { value: '100', label: 'SEO' },
];

const projectShowcase = [
  { src: '/showcase/saas-dashboard.webp', title: 'Baseline', category: 'SaaS', number: '01' },
  { src: '/showcase/beauty-platform.webp', title: 'Transeface', category: 'Beauté & IA', number: '02' },
  { src: '/showcase/growth-agency.webp', title: 'Growthy', category: 'Conseil', number: '03' },
];

export function ServicesExplorer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let revert = () => {};

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const headingTimeline = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', once: true } });
        headingTimeline
          .from('.web-story-heading .services-editorial-kicker', { x: -18, autoAlpha: 0, duration: .42, ease: 'power2.out' })
          .from('.story-heading-line > span', { yPercent: 105, duration: .62, stagger: .07, ease: 'power3.out' }, '-=.2')
          .from('.web-story-intro > p', { y: 16, autoAlpha: 0, duration: .45, stagger: .07, ease: 'power2.out' }, '-=.3')
          .from('.story-heading-rule', { scaleX: 0, transformOrigin: 'left', duration: .5, ease: 'power2.inOut' }, '-=.28');

        const visual = root.querySelector<HTMLElement>('.story-visual-sticky');
        const progressLine = root.querySelector<HTMLElement>('.story-progress-line');
        const setVisualStage = (stage: number) => visual?.setAttribute('data-stage', String(stage));

        gsap.from('.story-project-lane', { y: 22, autoAlpha: 0, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: '.web-story', start: 'top 78%', once: true } });
        gsap.fromTo('.story-project-track', { yPercent: 0 }, { yPercent: -50, duration: 30, repeat: -1, ease: 'none' });

        gsap.utils.toArray<HTMLElement>('.web-story-chapter').forEach((chapter, index) => {
          const items = chapter.querySelectorAll('[data-chapter-item]');
          gsap.fromTo(items, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .52, stagger: .045, ease: 'power2.out', scrollTrigger: { trigger: chapter, start: 'top 82%', once: true } });
          const visualStage = Math.min(index, 2);
          ScrollTrigger.create({ trigger: chapter, start: 'top 58%', end: 'bottom 42%', onEnter: () => setVisualStage(visualStage), onEnterBack: () => setVisualStage(visualStage) });
        });

        const progressValue = root.querySelector<HTMLElement>('.story-progress-value');
        ScrollTrigger.create({
          trigger: '.web-story', start: 'top 62%', end: 'bottom 62%',
          onUpdate: self => {
            if (progressValue) progressValue.textContent = `${Math.round(self.progress * 100).toString().padStart(2, '0')}%`;
            progressLine?.style.setProperty('--story-progress', self.progress.toString());
          },
        });

        const result = root.querySelector('.web-story-result');
        if (result) {
          ScrollTrigger.create({ trigger: result, start: 'top 65%', end: 'bottom 40%', onEnter: () => setVisualStage(2), onEnterBack: () => setVisualStage(2) });
          gsap.from(result.children, { scrollTrigger: { trigger: result, start: 'top 76%', once: true }, y: 42, autoAlpha: 0, stagger: .1, duration: .8, ease: 'power3.out' });
        }

        gsap.from('.client-journey-step', { scrollTrigger: { trigger: '.client-journey', start: 'top 78%', once: true }, y: 24, autoAlpha: 0, duration: .58, stagger: .09, ease: 'power2.out' });
        gsap.from('.client-journey-handoff li', { scrollTrigger: { trigger: '.client-journey-handoff', start: 'top 88%', once: true }, x: -12, autoAlpha: 0, duration: .42, stagger: .06, ease: 'power2.out' });
      }, root);

      revert = () => context.revert();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return <section ref={rootRef} id="services" className="web-story-section section-space" aria-labelledby="services-title">
    <div className="shell">
      <header className="web-story-heading">
        <p className="services-editorial-kicker"><Sparkles aria-hidden="true" />Conception & développement web</p>
        <h2 id="services-title">
          <span className="story-heading-line"><span>Votre besoin.</span></span><br />
          <span className="story-heading-line"><span>Un produit web</span></span><br />
          <span className="story-heading-line"><span><em>prêt à servir.</em></span></span>
        </h2>
        <div className="web-story-intro">
          <p>Je conçois et développe des sites et applications directement reliés à un objectif : présenter une offre, générer des demandes ou simplifier un processus.</p>
          <span className="story-heading-rule" />
          <p><strong>Sites vitrines</strong><i>·</i><strong>Refontes</strong><i>·</i><strong>Applications web</strong></p>
        </div>
      </header>

      <div className="story-mobile-showcase" aria-label="Aperçu de projets web">
        <div className="story-mobile-showcase-heading">
          <span>Projets sélectionnés</span>
          <p>Glissez pour explorer</p>
        </div>
        <div className="story-mobile-showcase-track">
          {projectShowcase.map(item => <figure className="story-mobile-project" key={`mobile-${item.src}`}>
            <Image src={item.src} alt={`Interface du projet ${item.title}`} width={900} height={600} sizes="(max-width: 700px) 78vw, 0px" />
            <span aria-hidden="true" />
            <figcaption>
              <p><small>{item.category}</small><strong>{item.title}</strong></p>
              <i>{item.number}</i>
            </figcaption>
          </figure>)}
        </div>
      </div>

      <div className="web-story">
        <aside className="web-story-visual" aria-hidden="true">
          <div className="story-visual-sticky" data-stage="0">
            <div className="story-visual-meta">
              <p><span>Sélection</span> interfaces web</p>
              <div className="story-progress-readout"><span className="story-progress-value">00%</span><i className="story-progress-line" /></div>
            </div>
            <div className="story-project-reel">
              <div className="story-project-glow" />
              <div className="story-project-lane">
                <div className="story-project-track">
                  {[false, true].map(duplicate => <div className="story-project-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                    {projectShowcase.map(item => <figure className="story-project-card" key={`${item.src}-${duplicate}`}>
                      <Image src={item.src} alt="" width={1600} height={1067} sizes="(max-width: 980px) 250px, 480px" />
                      <span className="story-project-scrim" />
                      <figcaption><span>{item.category}</span><strong>{item.title}</strong><i>{item.number}</i></figcaption>
                    </figure>)}
                  </div>)}
                </div>
              </div>
              <div className="story-project-badge"><span>03</span><p>interfaces<br />sur mesure</p></div>
              <div className="story-project-caption">
                <span className="story-caption-1">Site vitrine — clarifier l’offre et faciliter la prise de contact.</span>
                <span className="story-caption-2">Refonte — améliorer l’expérience sans perdre l’existant utile.</span>
                <span className="story-caption-3">Application — transformer un processus en outil opérationnel.</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="web-story-content">
          {serviceOffers.map(offer => {
            const Icon = offer.icon;
            return <article className="web-story-chapter" key={offer.code}>
              <header data-chapter-item><span>{offer.code}</span><i><Icon aria-hidden="true" /></i><p>{offer.label}</p></header>
              <h3 data-chapter-item>{offer.title}</h3>
              <p className="story-chapter-context" data-chapter-item>{offer.context}</p>
              <div className="story-value-statement" data-chapter-item><span>Valeur livrée</span><p>{offer.outcome}</p></div>
              {offer.code === '04' && <div className="story-seo-proof" data-chapter-item>
                <header><p><strong>Preuve par la mesure</strong><span>Audit Lighthouse de cette réalisation</span></p><small>Contrôle qualité</small></header>
                <div>{seoScores.map(score => <p key={score.label}><strong>{score.value}</strong><span>{score.label}</span></p>)}</div>
                <small>Scores obtenus sur l’audit présenté. Les résultats peuvent évoluer selon la page, l’hébergement, le contenu et les conditions de mesure.</small>
              </div>}
              <div className="story-chapter-scope" data-chapter-item><span>Ce qui est inclus</span><ul>{offer.deliverables.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
              <div className="story-chapter-delivery" data-chapter-item>{offer.outputs.map(item => <div key={item.title}><strong>{item.title}</strong><p>{item.text}</p></div>)}</div>
              <a href="#contact" data-chapter-item>{offer.action}<ArrowUpRight aria-hidden="true" /></a>
            </article>;
          })}

          <div className="web-story-result">
            <span>05 / Engagement</span>
            <h3>Un périmètre clair.<br /><em>Un produit réellement livré.</em></h3>
            <p>Avant de commencer, vous savez ce qui sera construit, ce qui sera remis à la livraison et comment le résultat répond à votre besoin.</p>
          </div>
        </div>
      </div>

      <section className="client-journey" aria-labelledby="client-journey-title">
        <header className="client-journey-heading">
          <p>Une méthode fluide, un résultat concret</p>
          <h3 id="client-journey-title">Un site prêt à <em>faire la différence</em>.<br />Sans projet qui s’éternise.</h3>
          <span>Pour un site vitrine bien cadré, comptez généralement deux semaines entre le premier échange et la mise en ligne.</span>
        </header>

        <ol className="client-journey-timeline">
          {clientJourney.map(step => <li className={`client-journey-step${step.complete ? ' is-complete' : ''}`} key={step.title}>
            <div className="client-journey-rail">
              {step.complete && <i aria-hidden="true"><Check /></i>}
              <span>{step.moment}</span>
            </div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <small><strong>Vous :</strong> {step.action}</small>
          </li>)}
        </ol>

        <div className="client-journey-handoff">
          <div>
            <p>À l’arrivée, vous avez tout pour avancer :</p>
            <ul>{launchHandoff.map(item => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
          </div>
          <aside>
            <span>Votre futur site peut commencer ici.</span>
            <StartProjectButton label="Donner vie à mon projet" icon={<ArrowRight aria-hidden="true" />} />
            <small>Un premier retour concret sous 24 à 48 h ouvrées</small>
          </aside>
        </div>
      </section>
    </div>
  </section>;
}

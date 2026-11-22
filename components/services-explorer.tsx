'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Globe2,
  PanelsTopLeft,
  RefreshCcw,
  SearchCheck,
  Sparkles,
} from 'lucide-react';
import { StartProjectButton } from '@/components/portfolio-controls';
import { servicesContent } from '@/lib/services-content';
import type { Locale } from '@/lib/i18n';

export const clientJourney = [
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

export const launchHandoff = [
  'Un site rapide, responsive et prêt à convertir',
  'La pleine propriété du site et de son code',
  'Des accès et un guide pour rester autonome',
  '30 jours d’accompagnement après le lancement',
];

export const serviceOffers = [
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
  {
    code: '05',
    label: 'Agents IA & automatisation',
    icon: Bot,
    title: 'Moins de tâches répétitives. Plus de temps utile.',
    context: 'Pour les équipes qui perdent du temps à trier des e-mails, recopier des données, préparer des comptes rendus ou faire circuler l’information entre plusieurs outils.',
    outcome: 'Un workflow intelligent reçoit l’information, la comprend, déclenche les bonnes actions et structure le résultat. Votre équipe garde le contrôle et n’intervient que lorsqu’une décision humaine est réellement nécessaire.',
    deliverables: [
      'Audit des tâches répétitives et des points de friction',
      'Workflow n8n relié à vos outils, API et sources de données',
      'Agent IA configuré avec ses règles, ses outils et son contexte',
      'Validation humaine, gestion des erreurs et journal d’exécution',
      'Tests, documentation et accompagnement à la prise en main',
    ],
    outputs: [
      { title: 'Temps récupéré', text: 'Les opérations prévisibles s’exécutent automatiquement, sans copier-coller ni relance manuelle.' },
      { title: 'Données structurées', text: 'Les informations utiles arrivent au bon format dans votre CRM, tableur ou outil métier.' },
      { title: 'Contrôle conservé', text: 'Les cas sensibles sont signalés ou soumis à validation avant toute action importante.' },
    ],
    action: 'Automatiser mon processus',
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

export function ServicesExplorer({ locale }: { locale: Locale }) {
  const localized = locale === 'fr' ? {
    offers: serviceOffers,
    journey: clientJourney.map(step => [step.moment, step.title, step.description, step.action]),
    handoff: launchHandoff,
    labels: {
      kicker: 'Conception & développement web', heading: <>Votre besoin.<br />Un produit web<br /><em>prêt à servir.</em></>, intro: 'Je conçois et développe des sites et applications directement reliés à un objectif : présenter une offre, générer des demandes ou simplifier un processus.', categories: ['Sites vitrines', 'Applications web', 'Agents IA', 'Refontes'],
      mobileLabel: 'Aperçu de projets web', selected: 'Projets sélectionnés', swipe: 'Glissez pour explorer', selection: 'Sélection', interfaces: 'interfaces web', customInterfaces: <>interfaces<br />sur mesure</>, captions: ['Site vitrine — clarifier l’offre et faciliter la prise de contact.', 'Refonte — améliorer l’expérience sans perdre l’existant utile.', 'Application — transformer un processus en outil opérationnel.'],
      deliveredValue: 'Valeur livrée', proof: 'Preuve par la mesure', lighthouse: 'Audit Lighthouse de cette réalisation', quality: 'Contrôle qualité', scores: ['Performance', 'Accessibilité', 'Bonnes pratiques', 'SEO'], scoreNote: 'Scores obtenus sur l’audit présenté. Les résultats peuvent évoluer selon la page, l’hébergement, le contenu et les conditions de mesure.',
      workflowAlt: 'Workflow n8n reliant un e-mail à un agent IA puis à Google Sheets', workflowExample: 'Exemple de workflow', workflowCaption: 'Un e-mail déclenche l’agent IA, le résultat est contrôlé, formaté puis enregistré automatiquement dans Google Sheets.', included: 'Ce qui est inclus',
      commitment: '06 / Engagement', commitmentTitle: <>Un périmètre clair.<br /><em>Un produit réellement livré.</em></>, commitmentText: 'Avant de commencer, vous savez ce qui sera construit, ce qui sera remis à la livraison et comment le résultat répond à votre besoin.', method: 'Une méthode fluide, un résultat concret', journeyTitle: <>Un site prêt à <em>faire la différence</em>.<br />Sans projet qui s’éternise.</>, journeyIntro: 'Pour un site vitrine bien cadré, comptez généralement deux semaines entre le premier échange et la mise en ligne.',
      you: 'Vous :', arrival: 'À l’arrivée, vous avez tout pour avancer :', future: 'Votre futur site peut commencer ici.', cta: 'Donner vie à mon projet', response: 'Un premier retour concret sous 24 à 48 h ouvrées',
    },
  } : servicesContent[locale];
  const { offers, journey, handoff, labels } = localized;
  const offerIcons = [Globe2, RefreshCcw, PanelsTopLeft, SearchCheck, Bot];
  const showcaseCategories = locale === 'fr' ? ['SaaS', 'Beauté & IA', 'Conseil'] : locale === 'es' ? ['SaaS', 'Belleza e IA', 'Consultoría'] : ['SaaS', 'Beauty & AI', 'Consulting'];
  const showcase = projectShowcase.map((item, index) => ({ ...item, category: showcaseCategories[index] }));
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
        <p className="services-editorial-kicker"><Sparkles aria-hidden="true" />{labels.kicker}</p>
        <h2 id="services-title">
          <span className="story-heading-line"><span>{labels.heading}</span></span>
        </h2>
        <div className="web-story-intro">
          <p>{labels.intro}</p>
          <span className="story-heading-rule" />
          <p>{labels.categories.map((item, index) => <span key={item}><strong>{item}</strong>{index < labels.categories.length - 1 && <i>·</i>}</span>)}</p>
        </div>
      </header>

      <div className="story-mobile-showcase" aria-label={labels.mobileLabel}>
        <div className="story-mobile-showcase-heading">
          <span>{labels.selected}</span>
          <p>{labels.swipe}</p>
        </div>
        <div className="story-mobile-showcase-track">
          {showcase.map(item => <figure className="story-mobile-project" key={`mobile-${item.src}`}>
            <Image src={item.src} alt={`${locale === 'fr' ? 'Interface du projet' : locale === 'es' ? 'Interfaz del proyecto' : 'Project interface'} ${item.title}`} width={900} height={600} sizes="(max-width: 700px) 78vw, 0px" />
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
              <p><span>{labels.selection}</span> {labels.interfaces}</p>
              <div className="story-progress-readout"><span className="story-progress-value">00%</span><i className="story-progress-line" /></div>
            </div>
            <div className="story-project-reel">
              <div className="story-project-glow" />
              <div className="story-project-lane">
                <div className="story-project-track">
                  {[false, true].map(duplicate => <div className="story-project-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                    {showcase.map(item => <figure className="story-project-card" key={`${item.src}-${duplicate}`}>
                      <Image src={item.src} alt="" width={1600} height={1067} sizes="(max-width: 980px) 250px, 480px" />
                      <span className="story-project-scrim" />
                      <figcaption><span>{item.category}</span><strong>{item.title}</strong><i>{item.number}</i></figcaption>
                    </figure>)}
                  </div>)}
                </div>
              </div>
              <div className="story-project-badge"><span>03</span><p>{labels.customInterfaces}</p></div>
              <div className="story-project-caption">
                {labels.captions.map((caption, index) => <span className={`story-caption-${index + 1}`} key={caption}>{caption}</span>)}
              </div>
            </div>
          </div>
        </aside>

        <div className="web-story-content">
          {offers.map((offer, index) => {
            const Icon = offerIcons[index];
            return <article className="web-story-chapter" key={offer.code}>
              <header data-chapter-item><span>{offer.code}</span><i><Icon aria-hidden="true" /></i><p>{offer.label}</p></header>
              <h3 data-chapter-item>{offer.title}</h3>
              <p className="story-chapter-context" data-chapter-item>{offer.context}</p>
              <div className="story-value-statement" data-chapter-item><span>{labels.deliveredValue}</span><p>{offer.outcome}</p></div>
              {offer.code === '04' && <div className="story-seo-proof" data-chapter-item>
                <header><p><strong>{labels.proof}</strong><span>{labels.lighthouse}</span></p><small>{labels.quality}</small></header>
                <div>{seoScores.map((score, index) => <p key={score.value + index}><strong>{score.value}</strong><span>{labels.scores[index]}</span></p>)}</div>
                <small>{labels.scoreNote}</small>
              </div>}
              {offer.code === '05' && <figure className="story-automation-proof" data-chapter-item>
                <div><Image src="/n8n-ai-agent-workflow.png" alt={labels.workflowAlt} width={2000} height={1125} sizes="(max-width: 700px) calc(100vw - 40px), 700px" /></div>
                <figcaption><strong>{labels.workflowExample}</strong><span>{labels.workflowCaption}</span></figcaption>
              </figure>}
              <div className="story-chapter-scope" data-chapter-item><span>{labels.included}</span><ul>{offer.deliverables.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
              <div className="story-chapter-delivery" data-chapter-item>{offer.outputs.map(item => <div key={item.title}><strong>{item.title}</strong><p>{item.text}</p></div>)}</div>
              <a href="#contact" data-chapter-item>{offer.action}<ArrowUpRight aria-hidden="true" /></a>
            </article>;
          })}

          <div className="web-story-result">
            <span>{labels.commitment}</span>
            <h3>{labels.commitmentTitle}</h3>
            <p>{labels.commitmentText}</p>
          </div>
        </div>
      </div>

      <section className="client-journey" aria-labelledby="client-journey-title">
        <header className="client-journey-heading">
          <p>{labels.method}</p>
          <h3 id="client-journey-title">{labels.journeyTitle}</h3>
          <span>{labels.journeyIntro}</span>
        </header>

        <ol className="client-journey-timeline">
          {journey.map((step, index) => <li className={`client-journey-step${index === journey.length - 1 ? ' is-complete' : ''}`} key={step[1]}>
            <div className="client-journey-rail">
              {index === journey.length - 1 && <i aria-hidden="true"><Check /></i>}
              <span>{step[0]}</span>
            </div>
            <h4>{step[1]}</h4>
            <p>{step[2]}</p>
            <small><strong>{labels.you}</strong> {step[3]}</small>
          </li>)}
        </ol>

        <div className="client-journey-handoff">
          <div>
            <p>{labels.arrival}</p>
            <ul>{handoff.map(item => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>
          </div>
          <aside>
            <span>{labels.future}</span>
            <StartProjectButton label={labels.cta} icon={<ArrowRight aria-hidden="true" />} />
            <small>{labels.response}</small>
          </aside>
        </div>
      </section>
    </div>
  </section>;
}

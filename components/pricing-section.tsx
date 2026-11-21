import { Bot, Check, Globe2, SearchCheck, ShieldCheck, Workflow } from 'lucide-react';
import { StartProjectButton } from '@/components/portfolio-controls';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const packs = [
  {
    code: '01 / Essentiel',
    eyebrow: 'Site web',
    title: 'Présence digitale',
    price: '990 €',
    description: 'Pour les indépendants et petites entreprises qui veulent être visibles, crédibles et faciles à contacter.',
    result: 'Votre activité inspire confiance dès la première visite et le passage à la prise de contact devient évident.',
    value: 'Un site rapide dont vous êtes propriétaire, sans abonnement de construction imposé.',
    icon: Globe2,
    features: [
      'Site one-page Next.js, responsive',
      'Design professionnel personnalisé',
      'SEO technique de base',
      'Formulaire de contact et appels à l’action',
      'Mise en ligne et configuration du domaine',
    ],
  },
  {
    code: '02 / Croissance',
    eyebrow: 'Offre principale',
    title: 'Site & Acquisition',
    price: '2 490 €',
    description: 'Pour les entreprises qui veulent attirer des prospects et transformer leur présence en opportunités commerciales.',
    result: 'Chaque page répond à une intention précise et guide le visiteur vers une demande mesurable.',
    value: 'Vous gagnez en autonomie sur les contenus et savez enfin quelles actions génèrent des contacts.',
    icon: SearchCheck,
    featured: true,
    features: [
      'Site vitrine jusqu’à 5 pages',
      'UI/UX sur mesure, responsive',
      'SEO technique des pages clés',
      'Search Console et suivi des conversions',
      'CMS simple pour modifier les contenus',
      'Formulaire de devis personnalisé',
    ],
  },
  {
    code: '03 / Business connecté',
    eyebrow: 'Site + automatisation',
    title: 'Web & Workflow',
    price: '3 990 €',
    description: 'Pour générer des demandes qualifiées et automatiser leur traitement dès leur arrivée.',
    result: 'Chaque demande est centralisée, signalée et confirmée automatiquement, sans copier-coller.',
    value: 'Moins d’administratif, aucune demande oubliée et un processus documenté que votre équipe peut suivre.',
    icon: Workflow,
    features: [
      'Tout le pack Croissance',
      'Un workflow n8n simple et défini',
      'Connexion à un CRM ou Google Sheets',
      'Notification automatique à chaque demande',
      'E-mail d’accusé de réception',
      'Tests, documentation et prise en main',
    ],
    note: 'Flux simple, outils standards et API disponibles. Toute logique métier complexe fait l’objet d’un chiffrage séparé.',
  },
];

const specialistServices = [
  ['Audit SEO ciblé', 'Dès 390 €'],
  ['SEO local & Google Business Profile', 'Dès 290 €'],
  ['Accompagnement SEO mensuel', 'Dès 450 €/mois'],
  ['Workflow n8n simple', 'Dès 490 €'],
  ['Automatisation multi-étapes', '1 200–2 500 €'],
  ['Automatisation complexe API / IA', 'Dès 3 500 €'],
  ['Dashboard ou outil interne', 'Dès 3 000 €'],
  ['Application web métier', 'Sur devis'],
];

const monthlyOffers = [
  { name: 'Maintenance Web', price: '49 €/mois', scope: 'Vérifications et corrections mineures.' },
  { name: 'Maintenance n8n', price: 'Dès 99 €/mois', scope: 'Suivi d’un workflow simple, alertes et corrections limitées.' },
  { name: 'SEO Local', price: '450 €/mois', scope: 'Optimisations ciblées, suivi et reporting.' },
  { name: 'Digital Care', price: 'Dès 590 €/mois', scope: 'Maintenance web, un workflow et SEO local limité.' },
];

export function PricingSection() {
  return <section id="tarifs" className="pricing-section section-space" aria-labelledby="pricing-title">
    <div className="shell">
      <header className="pricing-heading">
        <div><span>Des offres claires</span><p>Commencez avec le bon périmètre. Faites évoluer le dispositif lorsque votre activité en a besoin.</p></div>
        <div><p>Tarifs</p><h2 id="pricing-title">Investir dans ce qui<br /><em>fait vraiment avancer.</em></h2></div>
      </header>

      <div className="pricing-packs">
        {packs.map(pack => {
          const Icon = pack.icon;
          return <Card className={`pricing-pack${pack.featured ? ' is-featured' : ''}`} key={pack.title}>
            {pack.featured && <span className="pricing-popular">Le plus choisi</span>}
            <CardHeader className="pricing-pack-header">
              <div className="pricing-pack-meta"><p>{pack.code}</p><Icon aria-hidden="true" /></div>
              <CardDescription className="pricing-eyebrow">{pack.eyebrow}</CardDescription>
              <CardTitle className="pricing-pack-title"><h3>{pack.title}</h3></CardTitle>
              <p className="pricing-price">{pack.price}</p>
              <CardDescription className="pricing-description">{pack.description}</CardDescription>
              <div className="pricing-result"><span>Résultat attendu</span><strong>{pack.result}</strong></div>
            </CardHeader>
            <CardContent className="pricing-pack-content">
              <p className="pricing-value"><span>Valeur ajoutée</span><strong>{pack.value}</strong></p>
              <ul>{pack.features.map(feature => <li key={feature}><Check aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              {pack.note && <small className="pricing-pack-note">{pack.note}</small>}
            </CardContent>
            <CardFooter className="pricing-pack-footer"><StartProjectButton className="pricing-pack-action" label="Demander un devis" icon={false} /></CardFooter>
          </Card>;
        })}
      </div>

      <p className="pricing-independent"><Bot aria-hidden="true" /><span><strong>Besoin différent ?</strong> SEO, automatisation et applications métier sont aussi disponibles indépendamment, avec un périmètre adapté.</span></p>

      <div className="pricing-extras">
        <Card className="pricing-specialists" role="region" aria-labelledby="specialists-title">
          <CardHeader><p>Expertises à la carte</p><CardTitle><h3 id="specialists-title">Une intervention ciblée,<br />sans pack imposé.</h3></CardTitle></CardHeader>
          <CardContent>{specialistServices.map(([name, price]) => <p key={name}><span>{name}</span><strong>{price}</strong></p>)}</CardContent>
        </Card>

        <Card className="pricing-monthly" role="region" aria-labelledby="monthly-title">
          <CardHeader><p>Suivi dans la durée</p><CardTitle><h3 id="monthly-title">Votre digital reste<br />fiable et utile.</h3></CardTitle></CardHeader>
          <CardContent>{monthlyOffers.map(offer => <article key={offer.name}><p><strong>{offer.name}</strong><span>{offer.price}</span></p><small>{offer.scope}</small></article>)}</CardContent>
        </Card>
      </div>

      <footer className="pricing-disclaimer">
        <ShieldCheck aria-hidden="true" />
        <p><strong>Un cadre transparent avant de commencer.</strong><span>Les heures incluses, délais d’intervention et exclusions sont précisés dans la proposition. Hébergement, abonnements n8n, API et consommation des modèles IA sont identifiés séparément.</span></p>
        <StartProjectButton label="Recevoir une proposition" icon={false} />
      </footer>
    </div>
  </section>;
}

import { Bot, Check, Globe2, SearchCheck, ShieldCheck, Workflow } from 'lucide-react';
import { StartProjectButton } from '@/components/portfolio-controls';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Locale } from '@/lib/i18n';

const packBase = [
  {
    icon: Globe2,
  },
  {
    icon: SearchCheck,
    featured: true,
  },
  {
    icon: Workflow,
  },
];

const pricing = {
  fr: {
    packs: [
      { code: '01 / Essentiel', eyebrow: 'Site web', title: 'Présence digitale', price: '990 €', description: 'Pour les indépendants et petites entreprises qui veulent être visibles, crédibles et faciles à contacter.', result: 'Votre activité inspire confiance dès la première visite et le passage à la prise de contact devient évident.', value: 'Un site rapide dont vous êtes propriétaire, sans abonnement de construction imposé.', features: ['Site one-page Next.js, responsive', 'Design professionnel personnalisé', 'SEO technique de base', 'Formulaire de contact et appels à l’action', 'Mise en ligne et configuration du domaine'] },
      { code: '02 / Croissance', eyebrow: 'Offre principale', title: 'Site & Acquisition', price: '2 490 €', description: 'Pour les entreprises qui veulent attirer des prospects et transformer leur présence en opportunités commerciales.', result: 'Chaque page répond à une intention précise et guide le visiteur vers une demande mesurable.', value: 'Vous gagnez en autonomie sur les contenus et savez enfin quelles actions génèrent des contacts.', features: ['Site vitrine jusqu’à 5 pages', 'UI/UX sur mesure, responsive', 'SEO technique des pages clés', 'Search Console et suivi des conversions', 'CMS simple pour modifier les contenus', 'Formulaire de devis personnalisé'] },
      { code: '03 / Business connecté', eyebrow: 'Site + automatisation', title: 'Web & Workflow', price: '3 990 €', description: 'Pour générer des demandes qualifiées et automatiser leur traitement dès leur arrivée.', result: 'Chaque demande est centralisée, signalée et confirmée automatiquement, sans copier-coller.', value: 'Moins d’administratif, aucune demande oubliée et un processus documenté que votre équipe peut suivre.', features: ['Tout le pack Croissance', 'Un workflow n8n simple et défini', 'Connexion à un CRM ou Google Sheets', 'Notification automatique à chaque demande', 'E-mail d’accusé de réception', 'Tests, documentation et prise en main'], note: 'Flux simple, outils standards et API disponibles. Toute logique métier complexe fait l’objet d’un chiffrage séparé.' },
    ],
    specialistServices: [['Audit SEO ciblé', 'Dès 390 €'], ['SEO local & Google Business Profile', 'Dès 290 €'], ['Accompagnement SEO mensuel', 'Dès 450 €/mois'], ['Workflow n8n simple', 'Dès 490 €'], ['Automatisation multi-étapes', '1 200–2 500 €'], ['Automatisation complexe API / IA', 'Dès 3 500 €'], ['Dashboard ou outil interne', 'Dès 3 000 €'], ['Application web métier', 'Sur devis']],
    monthlyOffers: [
      { name: 'Maintenance Web', price: '49 €/mois', scope: 'Vérifications et corrections mineures.' }, { name: 'Maintenance n8n', price: 'Dès 99 €/mois', scope: 'Suivi d’un workflow simple, alertes et corrections limitées.' },
      { name: 'SEO Local', price: '450 €/mois', scope: 'Optimisations ciblées, suivi et reporting.' }, { name: 'Digital Care', price: 'Dès 590 €/mois', scope: 'Maintenance web, un workflow et SEO local limité.' },
    ],
    labels: { heading: 'Des offres claires', intro: 'Commencez avec le bon périmètre. Faites évoluer le dispositif lorsque votre activité en a besoin.', pricing: 'Tarifs', title: <>Investir dans ce qui<br /><em>fait vraiment avancer.</em></>, popular: 'Le plus choisi', expected: 'Résultat attendu', value: 'Valeur ajoutée', quote: 'Demander un devis', different: 'Besoin différent ?', differentText: 'SEO, automatisation et applications métier sont aussi disponibles indépendamment, avec un périmètre adapté.', expertise: 'Expertises à la carte', expertiseTitle: <>Une intervention ciblée,<br />sans pack imposé.</>, ongoing: 'Suivi dans la durée', ongoingTitle: <>Votre digital reste<br />fiable et utile.</>, transparent: 'Un cadre transparent avant de commencer.', disclaimer: 'Les heures incluses, délais d’intervention et exclusions sont précisés dans la proposition. Hébergement, abonnements n8n, API et consommation des modèles IA sont identifiés séparément.', proposal: 'Recevoir une proposition' },
  },
  en: {
    packs: [
  {
    code: '01 / Essential', eyebrow: 'Website', title: 'Digital presence',
    price: '990 €',
    description: 'For freelancers and small businesses that need to be visible, credible and easy to contact.',
    result: 'Your business builds trust from the first visit and the next step toward contact is immediately clear.',
    value: 'A fast website that you own, with no mandatory website-builder subscription.',
    features: ['Responsive one-page Next.js website', 'Custom professional design', 'Core technical SEO', 'Contact form and calls to action', 'Launch and domain configuration'],
  },
  {
    code: '02 / Growth', eyebrow: 'Most popular', title: 'Website & Acquisition',
    price: '2 490 €',
    description: 'For companies that want to attract prospects and turn their online presence into business opportunities.',
    result: 'Every page serves a specific intent and guides visitors toward a measurable inquiry.',
    value: 'You gain control over your content and understand which actions generate leads.',
    features: ['Corporate website with up to 5 pages', 'Custom responsive UI/UX', 'Technical SEO for key pages', 'Search Console and conversion tracking', 'Simple CMS for content updates', 'Custom quote request form'],
  },
  {
    code: '03 / Connected business', eyebrow: 'Website + automation', title: 'Web & Workflow',
    price: '3 990 €',
    description: 'For generating qualified inquiries and automating their processing from the moment they arrive.',
    result: 'Every inquiry is centralized, flagged and acknowledged automatically, with no copying and pasting.',
    value: 'Less admin, no missed inquiries and a documented process your team can follow.',
    features: ['Everything in the Growth package', 'One clearly defined n8n workflow', 'CRM or Google Sheets integration', 'Automatic notification for each inquiry', 'Acknowledgement email', 'Testing, documentation and handover'],
    note: 'For a straightforward flow using standard tools and available APIs. Complex business logic is quoted separately.',
  },
    ],
    specialistServices: [['Targeted SEO audit', 'From €390'], ['Local SEO & Google Business Profile', 'From €290'], ['Monthly SEO support', 'From €450/month'], ['Simple n8n workflow', 'From €490'], ['Multi-step automation', '€1,200–€2,500'], ['Complex API / AI automation', 'From €3,500'], ['Dashboard or internal tool', 'From €3,000'], ['Business web application', 'Custom quote']],
    monthlyOffers: [
      { name: 'Web Maintenance', price: '€49/month', scope: 'Checks and minor fixes.' }, { name: 'n8n Maintenance', price: 'From €99/month', scope: 'Monitoring for one simple workflow, alerts and limited fixes.' },
      { name: 'Local SEO', price: '€450/month', scope: 'Targeted optimization, monitoring and reporting.' }, { name: 'Digital Care', price: 'From €590/month', scope: 'Web maintenance, one workflow and limited local SEO.' },
    ],
    labels: { heading: 'Clear offers', intro: 'Start with the right scope. Expand the solution when your business needs it.', pricing: 'Pricing', title: <>Invest in what<br /><em>moves you forward.</em></>, popular: 'Most popular', expected: 'Expected outcome', value: 'Added value', quote: 'Request a quote', different: 'Need something different?', differentText: 'SEO, automation and business applications are also available independently, with a scope tailored to your needs.', expertise: 'Specialist services', expertiseTitle: <>Targeted expertise,<br />without a fixed package.</>, ongoing: 'Ongoing support', ongoingTitle: <>Your digital presence stays<br />reliable and useful.</>, transparent: 'A transparent framework before we begin.', disclaimer: 'Included hours, response times and exclusions are detailed in the proposal. Hosting, n8n subscriptions, APIs and AI model usage are identified separately.', proposal: 'Get a proposal' },
  },
  es: {
    packs: [
      { code: '01 / Esencial', eyebrow: 'Sitio web', title: 'Presencia digital', price: '990 €', description: 'Para autónomos y pequeñas empresas que quieren ser visibles, creíbles y fáciles de contactar.', result: 'Tu actividad inspira confianza desde la primera visita y el paso hacia el contacto resulta evidente.', value: 'Un sitio rápido de tu propiedad, sin suscripciones obligatorias a constructores web.', features: ['Sitio one-page Next.js responsive', 'Diseño profesional personalizado', 'SEO técnico esencial', 'Formulario de contacto y llamadas a la acción', 'Publicación y configuración del dominio'] },
      { code: '02 / Crecimiento', eyebrow: 'Oferta principal', title: 'Sitio & Captación', price: '2 490 €', description: 'Para empresas que quieren atraer clientes potenciales y convertir su presencia digital en oportunidades comerciales.', result: 'Cada página responde a una intención concreta y guía al visitante hacia una solicitud medible.', value: 'Ganas autonomía sobre los contenidos y entiendes qué acciones generan contactos.', features: ['Sitio corporativo de hasta 5 páginas', 'UI/UX responsive a medida', 'SEO técnico de las páginas clave', 'Search Console y seguimiento de conversiones', 'CMS sencillo para editar contenidos', 'Formulario de presupuesto personalizado'] },
      { code: '03 / Negocio conectado', eyebrow: 'Sitio + automatización', title: 'Web & Workflow', price: '3 990 €', description: 'Para generar solicitudes cualificadas y automatizar su tratamiento desde que llegan.', result: 'Cada solicitud se centraliza, notifica y confirma automáticamente, sin copiar y pegar.', value: 'Menos administración, ninguna solicitud olvidada y un proceso documentado que tu equipo puede seguir.', features: ['Todo el pack Crecimiento', 'Un flujo n8n sencillo y definido', 'Conexión con un CRM o Google Sheets', 'Notificación automática para cada solicitud', 'Correo de confirmación', 'Pruebas, documentación y formación'], note: 'Flujo sencillo con herramientas estándar y APIs disponibles. La lógica de negocio compleja se presupuesta por separado.' },
    ],
    specialistServices: [['Auditoría SEO específica', 'Desde 390 €'], ['SEO local y Google Business Profile', 'Desde 290 €'], ['Acompañamiento SEO mensual', 'Desde 450 €/mes'], ['Flujo n8n sencillo', 'Desde 490 €'], ['Automatización multietapa', '1 200–2 500 €'], ['Automatización compleja API / IA', 'Desde 3 500 €'], ['Dashboard o herramienta interna', 'Desde 3 000 €'], ['Aplicación web empresarial', 'A medida']],
    monthlyOffers: [
      { name: 'Mantenimiento web', price: '49 €/mes', scope: 'Comprobaciones y correcciones menores.' }, { name: 'Mantenimiento n8n', price: 'Desde 99 €/mes', scope: 'Seguimiento de un flujo sencillo, alertas y correcciones limitadas.' },
      { name: 'SEO local', price: '450 €/mes', scope: 'Optimizaciones específicas, seguimiento e informes.' }, { name: 'Digital Care', price: 'Desde 590 €/mes', scope: 'Mantenimiento web, un flujo y SEO local limitado.' },
    ],
    labels: { heading: 'Ofertas claras', intro: 'Empieza con el alcance adecuado. Amplía la solución cuando tu actividad lo necesite.', pricing: 'Precios', title: <>Invierte en lo que<br /><em>realmente te hace avanzar.</em></>, popular: 'La más elegida', expected: 'Resultado esperado', value: 'Valor añadido', quote: 'Solicitar presupuesto', different: '¿Necesitas algo diferente?', differentText: 'El SEO, la automatización y las aplicaciones empresariales también están disponibles por separado, con un alcance adaptado.', expertise: 'Servicios especializados', expertiseTitle: <>Una intervención específica,<br />sin packs impuestos.</>, ongoing: 'Acompañamiento continuo', ongoingTitle: <>Tu entorno digital sigue siendo<br />fiable y útil.</>, transparent: 'Un marco transparente antes de empezar.', disclaimer: 'Las horas incluidas, los plazos de intervención y las exclusiones se detallan en la propuesta. El alojamiento, las suscripciones n8n, las APIs y el consumo de modelos de IA se identifican por separado.', proposal: 'Recibir una propuesta' },
  },
};

export function PricingSection({ locale }: { locale: Locale }) {
  const { packs: translatedPacks, specialistServices, monthlyOffers, labels } = pricing[locale];
  const packs = translatedPacks.map((pack, index) => ({ ...pack, ...packBase[index] }));
  return <section id="tarifs" className="pricing-section section-space" aria-labelledby="pricing-title">
    <div className="shell">
      <header className="pricing-heading">
        <div><span>{labels.heading}</span><p>{labels.intro}</p></div>
        <div><p>{labels.pricing}</p><h2 id="pricing-title">{labels.title}</h2></div>
      </header>

      <div className="pricing-packs">
        {packs.map(pack => {
          const Icon = pack.icon;
          return <Card className={`pricing-pack${pack.featured ? ' is-featured' : ''}`} key={pack.title}>
            {pack.featured && <span className="pricing-popular">{labels.popular}</span>}
            <CardHeader className="pricing-pack-header">
              <div className="pricing-pack-meta"><p>{pack.code}</p><Icon aria-hidden="true" /></div>
              <CardDescription className="pricing-eyebrow">{pack.eyebrow}</CardDescription>
              <CardTitle className="pricing-pack-title"><h3>{pack.title}</h3></CardTitle>
              <p className="pricing-price">{pack.price}</p>
              <CardDescription className="pricing-description">{pack.description}</CardDescription>
              <div className="pricing-result"><span>{labels.expected}</span><strong>{pack.result}</strong></div>
            </CardHeader>
            <CardContent className="pricing-pack-content">
              <p className="pricing-value"><span>{labels.value}</span><strong>{pack.value}</strong></p>
              <ul>{pack.features.map(feature => <li key={feature}><Check aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              {pack.note && <small className="pricing-pack-note">{pack.note}</small>}
            </CardContent>
            <CardFooter className="pricing-pack-footer"><StartProjectButton className="pricing-pack-action" label={labels.quote} icon={false} /></CardFooter>
          </Card>;
        })}
      </div>

      <p className="pricing-independent"><Bot aria-hidden="true" /><span><strong>{labels.different}</strong> {labels.differentText}</span></p>

      <div className="pricing-extras">
        <Card className="pricing-specialists" role="region" aria-labelledby="specialists-title">
          <CardHeader><p>{labels.expertise}</p><CardTitle><h3 id="specialists-title">{labels.expertiseTitle}</h3></CardTitle></CardHeader>
          <CardContent>{specialistServices.map(([name, price]) => <p key={name}><span>{name}</span><strong>{price}</strong></p>)}</CardContent>
        </Card>

        <Card className="pricing-monthly" role="region" aria-labelledby="monthly-title">
          <CardHeader><p>{labels.ongoing}</p><CardTitle><h3 id="monthly-title">{labels.ongoingTitle}</h3></CardTitle></CardHeader>
          <CardContent>{monthlyOffers.map(offer => <article key={offer.name}><p><strong>{offer.name}</strong><span>{offer.price}</span></p><small>{offer.scope}</small></article>)}</CardContent>
        </Card>
      </div>

      <footer className="pricing-disclaimer">
        <ShieldCheck aria-hidden="true" />
        <p><strong>{labels.transparent}</strong><span>{labels.disclaimer}</span></p>
        <StartProjectButton label={labels.proposal} icon={false} />
      </footer>
    </div>
  </section>;
}

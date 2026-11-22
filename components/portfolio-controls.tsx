'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Check, Download, LoaderCircle, Mail, Menu, Send, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { navigateToSection } from '@/lib/navigation';
import { navigation, type Locale } from '@/lib/i18n';
import { getInquiryOptions } from '@/lib/inquiry';

const projectFormEvent = 'walid:open-project-form';

const controlsCopy = {
  fr: {
    openMenu: 'Ouvrir le menu', menuDescription: 'Sites web, applications et automatisation.', mobileNav: 'Navigation mobile', portfolio: 'Profil', project: 'Parlons de votre projet', close: 'Fermer',
    sendingSecure: 'Envoi sécurisé en cours…', genericError: 'Une erreur est survenue.', sentFallback: 'Votre demande a bien été envoyée.', sendError: 'Impossible d’envoyer le message. Réessayez ou contactez-moi par e-mail.',
    sent: 'Demande envoyée', thanks: 'Merci pour votre confiance.', another: 'Envoyer une autre demande', invalid: 'Vérifiez les champs signalés avant l’envoi.',
    name: 'Nom et prénom', required: 'Requis', namePlaceholder: 'Votre nom', email: 'E-mail professionnel', emailPlaceholder: 'vous@entreprise.fr', company: 'Entreprise', optional: 'Optionnel', companyPlaceholder: 'Nom de l’entreprise', phone: 'Téléphone',
    projectType: 'Type de projet', budget: 'Budget envisagé', timeline: 'Calendrier souhaité', projectLabel: 'Votre projet', min: 'Requis · 30 caractères min.', projectPlaceholder: 'Quel est votre objectif ? À qui s’adresse le projet ? Quelles fonctionnalités sont importantes ?', honeypot: 'Ne pas remplir',
    privacy: 'Envoi sécurisé. Vos informations servent uniquement à répondre à votre demande.', sending: 'Envoi…', submit: 'Envoyer ma demande', direct: 'Écrire directement',
    first: 'Premier échange', startTitle: <>Votre projet<br /><em>commence ici.</em></>, startLead: 'Présentez-moi votre besoin en quelques lignes. Je vous répondrai avec des premières pistes concrètes sous 24 à 48 heures ouvrées.',
    steps: [['Vous décrivez le besoin', 'Objectif, périmètre et contraintes.'], ['Nous clarifions le projet', 'Un échange pour cadrer la bonne solution.'], ['Vous recevez une proposition', 'Périmètre, calendrier et budget clairs.']], prefer: 'Vous préférez écrire directement ?',
    expertise: 'Conception · Développement · Mise en ligne', promise: 'Un interlocuteur unique pour transformer une idée en produit web clair, rapide et prêt à évoluer.', idea: 'Un projet en tête ?', contactTitle: <>Parlons de ce que<br />vous voulez construire.</>,
    assurances: ['Premier échange sans engagement', 'Cadrage clair avant de commencer', 'Belfort · France · à distance'], useful: 'Liens utiles', directAccess: 'Accès direct', newTab: 'nouvel onglet', terms: 'Modalités de contact', top: 'Retour en haut ↑', footerLocation: 'Belfort, France · Développement web',
  },
  en: {
    openMenu: 'Open menu', menuDescription: 'Websites, applications and automation.', mobileNav: 'Mobile navigation', portfolio: 'Profile', project: 'Let’s discuss your project', close: 'Close',
    sendingSecure: 'Securely sending…', genericError: 'Something went wrong.', sentFallback: 'Your inquiry has been sent.', sendError: 'Unable to send the message. Try again or contact me by email.',
    sent: 'Inquiry sent', thanks: 'Thank you for your trust.', another: 'Send another inquiry', invalid: 'Check the highlighted fields before submitting.',
    name: 'Full name', required: 'Required', namePlaceholder: 'Your name', email: 'Business email', emailPlaceholder: 'you@company.com', company: 'Company', optional: 'Optional', companyPlaceholder: 'Company name', phone: 'Phone',
    projectType: 'Project type', budget: 'Estimated budget', timeline: 'Preferred timeline', projectLabel: 'Your project', min: 'Required · 30 characters minimum', projectPlaceholder: 'What is your goal? Who is the project for? Which features matter most?', honeypot: 'Do not fill in',
    privacy: 'Secure submission. Your information is used only to reply to your inquiry.', sending: 'Sending…', submit: 'Send my inquiry', direct: 'Email me directly',
    first: 'First conversation', startTitle: <>Your project<br /><em>starts here.</em></>, startLead: 'Describe your needs in a few lines. I will reply with concrete initial ideas within 1–2 business days.',
    steps: [['You describe the need', 'Goal, scope and constraints.'], ['We clarify the project', 'A conversation to define the right solution.'], ['You receive a proposal', 'Clear scope, timeline and budget.']], prefer: 'Prefer to email directly?',
    expertise: 'Design · Development · Launch', promise: 'One partner to turn an idea into a clear, fast web product built to evolve.', idea: 'Have a project in mind?', contactTitle: <>Let’s discuss what<br />you want to build.</>,
    assurances: ['No-obligation first conversation', 'Clear scope before work begins', 'Belfort · France · Remote'], useful: 'Useful links', directAccess: 'Direct access', newTab: 'new tab', terms: 'Contact options', top: 'Back to top ↑', footerLocation: 'Belfort, France · Web development',
  },
  es: {
    openMenu: 'Abrir el menú', menuDescription: 'Sitios web, aplicaciones y automatización.', mobileNav: 'Navegación móvil', portfolio: 'Perfil', project: 'Hablemos de tu proyecto', close: 'Cerrar',
    sendingSecure: 'Envío seguro en curso…', genericError: 'Se ha producido un error.', sentFallback: 'Tu solicitud se ha enviado correctamente.', sendError: 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.',
    sent: 'Solicitud enviada', thanks: 'Gracias por tu confianza.', another: 'Enviar otra solicitud', invalid: 'Comprueba los campos señalados antes de enviar.',
    name: 'Nombre y apellidos', required: 'Obligatorio', namePlaceholder: 'Tu nombre', email: 'Correo profesional', emailPlaceholder: 'tu@empresa.es', company: 'Empresa', optional: 'Opcional', companyPlaceholder: 'Nombre de la empresa', phone: 'Teléfono',
    projectType: 'Tipo de proyecto', budget: 'Presupuesto estimado', timeline: 'Calendario deseado', projectLabel: 'Tu proyecto', min: 'Obligatorio · 30 caracteres mínimo', projectPlaceholder: '¿Cuál es tu objetivo? ¿A quién se dirige el proyecto? ¿Qué funciones son importantes?', honeypot: 'No rellenar',
    privacy: 'Envío seguro. Tus datos se utilizan únicamente para responder a tu solicitud.', sending: 'Enviando…', submit: 'Enviar mi solicitud', direct: 'Escribir directamente',
    first: 'Primera conversación', startTitle: <>Tu proyecto<br /><em>empieza aquí.</em></>, startLead: 'Cuéntame tu necesidad en unas líneas. Responderé con primeras ideas concretas en 1–2 días laborables.',
    steps: [['Describes la necesidad', 'Objetivo, alcance y restricciones.'], ['Aclaramos el proyecto', 'Una conversación para definir la solución adecuada.'], ['Recibes una propuesta', 'Alcance, calendario y presupuesto claros.']], prefer: '¿Prefieres escribir directamente?',
    expertise: 'Diseño · Desarrollo · Publicación', promise: 'Un único interlocutor para convertir una idea en un producto web claro, rápido y preparado para evolucionar.', idea: '¿Tienes un proyecto en mente?', contactTitle: <>Hablemos de lo que<br />quieres construir.</>,
    assurances: ['Primera conversación sin compromiso', 'Alcance claro antes de empezar', 'Belfort · Francia · A distancia'], useful: 'Enlaces útiles', directAccess: 'Acceso directo', newTab: 'nueva pestaña', terms: 'Opciones de contacto', top: 'Volver arriba ↑', footerLocation: 'Belfort, Francia · Desarrollo web',
  },
} as const;

function openProjectForm() {
  const form = document.getElementById('project-contact-form');
  if (form) {
    form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 500);
    return;
  }
  window.dispatchEvent(new Event(projectFormEvent));
}

export function StartProjectButton({
  className,
  label = 'Let’s discuss your project',
  size = 'default',
  icon,
}: {
  className?: string;
  label?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  icon?: ReactNode;
}) {
  return <Button className={className} size={size} aria-haspopup="dialog" onClick={openProjectForm}>{label}{icon ?? <ArrowUpRight aria-hidden="true" />}</Button>;
}

export function MobileNavigation({ activeSection = '', isHomePage = true, locale }: { activeSection?: string; isHomePage?: boolean; locale: Locale }) {
  const copy = controlsCopy[locale];
  const navItems = navigation[locale];
  const [open, setOpen] = useState(false);
  const pendingAnchor = useRef<string | null>(null);
  const pendingForm = useRef(false);
  const desktopClose = useRef(false);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const onResize = () => {
      if (desktop.matches && open) { desktopClose.current = true; setOpen(false); }
    };
    desktop.addEventListener('change', onResize);
    return () => desktop.removeEventListener('change', onResize);
  }, [open]);
  return <div className="mobile-nav"><Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label={copy.openMenu}><Menu /></Button></SheetTrigger>
    <SheetContent ref={menu} className="mobile-sheet" closeLabel={copy.close} onOpenAutoFocus={event => {
      event.preventDefault();
      menu.current?.querySelector<HTMLAnchorElement>('a[aria-current="location"], nav a')?.focus({ preventScroll: true });
    }} onCloseAutoFocus={event => {
      if (desktopClose.current) {
        event.preventDefault();
        desktopClose.current = false;
        document.querySelector<HTMLAnchorElement>('.brand')?.focus({ preventScroll: true });
        return;
      }
      if (pendingForm.current) {
        event.preventDefault();
        pendingForm.current = false;
        document.querySelector<HTMLButtonElement>('.mobile-nav button')?.focus({ preventScroll: true });
        openProjectForm();
        return;
      }
      const id = pendingAnchor.current;
      if (!id) return;
      event.preventDefault();
      pendingAnchor.current = null;
      navigateToSection(id);
    }}>
      <SheetHeader><SheetTitle>Walid Tahiri</SheetTitle><SheetDescription>{copy.menuDescription}</SheetDescription></SheetHeader>
      <nav aria-label={copy.mobileNav}>{navItems.map(([label, id]) => {
        const isLocalSection = isHomePage || id === 'contact';
        return <Link className={activeSection === id ? 'is-active' : undefined} href={isLocalSection ? `#${id}` : `/${locale}#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={event => {
          if (isLocalSection) {
            event.preventDefault();
            pendingAnchor.current = id;
          }
          setOpen(false);
        }} key={id}>{label}<ArrowUpRight size={18} /></Link>;
      })}<Link className={!isHomePage ? 'is-active' : undefined} href={`/${locale}/profile`} aria-current={!isHomePage ? 'page' : undefined} onClick={() => setOpen(false)}>{copy.portfolio}<ArrowUpRight size={18} /></Link></nav>
      <div className="mobile-language-switcher" aria-label={locale === 'fr' ? 'Langue' : locale === 'es' ? 'Idioma' : 'Language'}>{(['fr', 'en', 'es'] as const).map(option => <Link key={option} href={`/${option}${isHomePage ? '' : '/profile'}`} hrefLang={option} lang={option} aria-current={locale === option ? 'page' : undefined}>{option.toUpperCase()}</Link>)}</div>
      <Button className="mobile-cta" onClick={() => { pendingForm.current = true; setOpen(false); }}>{copy.project}</Button>
    </SheetContent>
  </Sheet></div>;
}

export function LeadForm({ email, locale }: { email: string; locale: Locale }) {
  const copy = controlsCopy[locale];
  const inquiryOptions = getInquiryOptions(locale);
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [status, setStatus] = useState('');
  const [startedAt] = useState(() => Date.now());
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState('sending');
    setStatus(copy.sendingSecure);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, locale, startedAt }) });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || copy.genericError);
      setState('success');
      setStatus(result.message || copy.sentFallback);
      form.reset();
    } catch (error) {
      setState('error');
      setStatus(error instanceof Error ? error.message : copy.sendError);
    }
  }
  if (state === 'success') return <div className="form-success" role="status"><span><Check aria-hidden="true" /></span><p className="kicker">{copy.sent}</p><h3>{copy.thanks}</h3><p>{status}</p><Button type="button" variant="outline" onClick={() => { setState('idle'); setStatus(''); }}>{copy.another}</Button></div>;
  return <form className="lead-form" onSubmit={submit} onInvalid={() => { setState('error'); setStatus(copy.invalid); }} aria-describedby="inquiry-help inquiry-status">
    <div className="form-row"><label><span>{copy.name} <small>{copy.required}</small></span><input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder={copy.namePlaceholder} /></label><label><span>{copy.email} <small>{copy.required}</small></span><input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder={copy.emailPlaceholder} /></label></div>
    <div className="form-row"><label><span>{copy.company} <small>{copy.optional}</small></span><input name="company" autoComplete="organization" maxLength={100} placeholder={copy.companyPlaceholder} /></label><label><span>{copy.phone} <small>{copy.optional}</small></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="+33 6 00 00 00 00" /></label></div>
    <div className="form-row"><label><span>{copy.projectType}</span><select name="service" defaultValue={inquiryOptions.types.at(-1)}>{inquiryOptions.types.map(item => <option key={item}>{item}</option>)}</select></label><label><span>{copy.budget}</span><select name="budget" defaultValue={inquiryOptions.budgets.at(-1)}>{inquiryOptions.budgets.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <label><span>{copy.timeline}</span><select name="timeline" defaultValue={inquiryOptions.timelines.at(-1)}>{inquiryOptions.timelines.map(item => <option key={item}>{item}</option>)}</select></label>
    <label><span>{copy.projectLabel} <small>{copy.min}</small></span><textarea name="message" required minLength={30} maxLength={2500} rows={5} placeholder={copy.projectPlaceholder} /></label>
    <label className="contact-honeypot" aria-hidden="true">{copy.honeypot}<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className="form-footer"><p id="inquiry-help"><ShieldCheck aria-hidden="true" />{copy.privacy}</p><Button type="submit" size="lg" disabled={state === 'sending'}>{state === 'sending' ? <>{copy.sending}<LoaderCircle className="form-spinner" aria-hidden="true" /></> : <>{copy.submit}<Send aria-hidden="true" /></>}</Button></div>
    <p className={`form-status is-${state}`} id="inquiry-status" role="status">{status}{state === 'error' && <> <a href={`mailto:${email}`}>{copy.direct}</a></>}</p>
  </form>;
}

export function CleanFooter({
  email,
  linkedin,
  resume,
  locale,
}: {
  email: string;
  linkedin: string;
  resume: string;
  locale: Locale;
}) {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const copy = controlsCopy[locale];
  const isHomePage = pathname === `/${locale}`;

  return <footer id="contact" className="kinetic-footer footer-editorial" aria-labelledby="contact-title">
    <div id="project-contact-form" className="contact-form-section">
      <div className="shell contact-form-layout">
        <div className="contact-form-intro">
          <p className="kicker">{copy.first}</p>
          <h2>{copy.startTitle}</h2>
          <p className="contact-form-lead">{copy.startLead}</p>
          <ol className="inquiry-steps">
            {copy.steps.map((step, index) => <li key={step[0]}><span>0{index + 1}</span><p><strong>{step[0]}</strong><small>{step[1]}</small></p></li>)}
          </ol>
          <div className="inquiry-direct"><span>{copy.prefer}</span><a href={`mailto:${email}`}>{email}<ArrowUpRight aria-hidden="true" /></a></div>
        </div>
        <div className="project-inquiry-form"><LeadForm email={email} locale={locale} /></div>
      </div>
    </div>
    <div className="shell footer-editorial-main">
      <div className="footer-editorial-note">
        <p><i aria-hidden="true" />{copy.expertise}</p>
        <span>{copy.promise}</span>
      </div>

      <div className="footer-editorial-top">
        <div className="footer-editorial-intro">
          <p>{copy.idea}</p>
          <h2 id="contact-title">{copy.contactTitle}</h2>
          <div className="footer-editorial-actions">
            <button type="button" aria-haspopup="dialog" onClick={openProjectForm}><span>{copy.project}</span><ArrowUpRight aria-hidden="true" /></button>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <ul className="footer-contact-assurances" aria-label={copy.terms}>
            {copy.assurances.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}
          </ul>
        </div>

        <nav className="footer-editorial-links" aria-label={copy.useful}>
          <p>{copy.directAccess}</p>
          {isHomePage && <Link href={`/${locale}/profile`}><UserRound aria-hidden="true" /><span>{copy.portfolio}</span></Link>}
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z" /></svg>
            <span>LinkedIn<span className="sr-only"> ({copy.newTab})</span></span>
          </a>
          <a href={`mailto:${email}`}><Mail aria-hidden="true" /><span>E-mail</span></a>
          <a href={resume} download><Download aria-hidden="true" /><span>CV · PDF</span></a>
        </nav>
      </div>

      <div className="footer-editorial-wordmark"><Image src="/walid-organic-logo.webp" alt="Walid" width={2098} height={749} sizes="(max-width: 1180px) 100vw, 1180px" /></div>

      <div className="footer-editorial-bottom">
        <span className="footer-editorial-copy">© {year} Walid Tahiri</span><span>{copy.footerLocation}</span><a href={isHomePage ? '#accueil' : `/${locale}#accueil`}>{copy.top}</a>
      </div>
    </div>
  </footer>;
}

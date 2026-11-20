'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Check, Copy, Download, LoaderCircle, Mail, Menu, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import type { Project } from '@/lib/portfolio';
import { navigation, navigateToSection } from '@/lib/navigation';
import { projectBudgets, projectTimelines, projectTypes } from '@/lib/inquiry';

const projectFormEvent = 'walid:open-project-form';

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
  label = 'Parlons de votre projet',
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

export function MobileNavigation({ activeSection = '', isHomePage = true }: { activeSection?: string; isHomePage?: boolean }) {
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
    <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Ouvrir le menu"><Menu /></Button></SheetTrigger>
    <SheetContent ref={menu} className="mobile-sheet" onOpenAutoFocus={event => {
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
      <SheetHeader><SheetTitle>Walid Tahiri</SheetTitle><SheetDescription>Sites web, applications et automatisation.</SheetDescription></SheetHeader>
      <nav aria-label="Navigation mobile">{navigation.map(([label, id]) => {
        const isLocalSection = isHomePage || id === 'contact';
        return <Link className={activeSection === id ? 'is-active' : undefined} href={isLocalSection ? `#${id}` : `/#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={event => {
          if (isLocalSection) {
            event.preventDefault();
            pendingAnchor.current = id;
          }
          setOpen(false);
        }} key={id}>{label}<ArrowUpRight size={18} /></Link>;
      })}<Link className={!isHomePage ? 'is-active' : undefined} href="/profil" aria-current={!isHomePage ? 'page' : undefined} onClick={() => setOpen(false)}>Portfolio<ArrowUpRight size={18} /></Link></nav>
      <Button className="mobile-cta" onClick={() => { pendingForm.current = true; setOpen(false); }}>Parlons de votre projet</Button>
    </SheetContent>
  </Sheet></div>;
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return <Button variant="ghost" className="copy-button" onClick={copy} aria-live="polite">{copied ? <Check /> : <Copy />}{copied ? 'Adresse copiée' : 'Copier l’adresse'}</Button>;
}

export function ProjectDetails({ project }: { project: Project }) {
  return <Sheet><SheetTrigger asChild><button className="case-link" aria-label={`En savoir plus : ${project.name}`}>Voir le projet<ArrowUpRight /></button></SheetTrigger>
    <SheetContent className="project-sheet">
      <SheetHeader><p className="kicker">Projet {project.id} · {project.context}</p><SheetTitle>{project.name}</SheetTitle><SheetDescription>{project.description}</SheetDescription></SheetHeader>
      <div className="sheet-body"><ul className="tags">{project.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <Accordion type="multiple" defaultValue={['need', 'contribution', 'approach']}>
          <AccordionItem value="need"><AccordionTrigger>Le besoin</AccordionTrigger><AccordionContent>{project.problem}</AccordionContent></AccordionItem>
          <AccordionItem value="contribution"><AccordionTrigger>Ma contribution</AccordionTrigger><AccordionContent>{project.contribution}</AccordionContent></AccordionItem>
          <AccordionItem value="approach"><AccordionTrigger>Approche technique</AccordionTrigger><AccordionContent>{project.approach}</AccordionContent></AccordionItem>
        </Accordion>
        <div className="project-note"><strong>À propos de cette présentation</strong><p>Synthèse de mon travail. Aucune capture interne ni donnée confidentielle n’est publiée. Les résultats chiffrés, la démonstration et le code ne sont pas disponibles publiquement ici.</p></div>
      </div>
    </SheetContent>
  </Sheet>;
}

export function LeadForm({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [status, setStatus] = useState('');
  const [startedAt] = useState(() => Date.now());
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState('sending');
    setStatus('Envoi sécurisé en cours…');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, startedAt }) });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || 'Une erreur est survenue.');
      setState('success');
      setStatus(result.message || 'Votre demande a bien été envoyée.');
      form.reset();
    } catch (error) {
      setState('error');
      setStatus(error instanceof Error ? error.message : 'Impossible d’envoyer le message. Réessayez ou contactez-moi par e-mail.');
    }
  }
  if (state === 'success') return <div className="form-success" role="status"><span><Check aria-hidden="true" /></span><p className="kicker">Demande envoyée</p><h3>Merci pour votre confiance.</h3><p>{status}</p><Button type="button" variant="outline" onClick={() => { setState('idle'); setStatus(''); }}>Envoyer une autre demande</Button></div>;
  return <form className="lead-form" onSubmit={submit} onInvalid={() => { setState('error'); setStatus('Vérifiez les champs signalés avant l’envoi.'); }} aria-describedby="inquiry-help inquiry-status">
    <div className="form-row"><label><span>Nom et prénom <small>Requis</small></span><input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Votre nom" /></label><label><span>E-mail professionnel <small>Requis</small></span><input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder="vous@entreprise.fr" /></label></div>
    <div className="form-row"><label><span>Entreprise <small>Optionnel</small></span><input name="company" autoComplete="organization" maxLength={100} placeholder="Nom de l’entreprise" /></label><label><span>Téléphone <small>Optionnel</small></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="+33 6 00 00 00 00" /></label></div>
    <div className="form-row"><label><span>Type de projet</span><select name="service" defaultValue="À définir ensemble">{projectTypes.map(item => <option key={item}>{item}</option>)}</select></label><label><span>Budget envisagé</span><select name="budget" defaultValue="À discuter">{projectBudgets.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <label><span>Calendrier souhaité</span><select name="timeline" defaultValue="Je suis flexible">{projectTimelines.map(item => <option key={item}>{item}</option>)}</select></label>
    <label><span>Votre projet <small>Requis · 30 caractères min.</small></span><textarea name="message" required minLength={30} maxLength={2500} rows={5} placeholder="Quel est votre objectif ? À qui s’adresse le projet ? Quelles fonctionnalités sont importantes ?" /></label>
    <label className="contact-honeypot" aria-hidden="true">Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className="form-footer"><p id="inquiry-help"><ShieldCheck aria-hidden="true" />Envoi sécurisé. Vos informations servent uniquement à répondre à votre demande.</p><Button type="submit" size="lg" disabled={state === 'sending'}>{state === 'sending' ? <>Envoi…<LoaderCircle className="form-spinner" aria-hidden="true" /></> : <>Envoyer ma demande<Send aria-hidden="true" /></>}</Button></div>
    <p className={`form-status is-${state}`} id="inquiry-status" role="status">{status}{state === 'error' && <> <a href={`mailto:${email}`}>Écrire directement</a></>}</p>
  </form>;
}

export function CleanFooter({
  email,
  linkedin,
  resume,
}: {
  email: string;
  linkedin: string;
  resume: string;
}) {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return <footer id="contact" className="kinetic-footer footer-editorial" aria-labelledby="contact-title">
    <div id="project-contact-form" className="contact-form-section">
      <div className="shell contact-form-layout">
        <div className="contact-form-intro">
          <p className="kicker">Premier échange</p>
          <h2>Votre projet<br /><em>commence ici.</em></h2>
          <p className="contact-form-lead">Présentez-moi votre besoin en quelques lignes. Je vous répondrai avec des premières pistes concrètes sous 24 à 48 heures ouvrées.</p>
          <ol className="inquiry-steps">
            <li><span>01</span><p><strong>Vous décrivez le besoin</strong><small>Objectif, périmètre et contraintes.</small></p></li>
            <li><span>02</span><p><strong>Nous clarifions le projet</strong><small>Un échange pour cadrer la bonne solution.</small></p></li>
            <li><span>03</span><p><strong>Vous recevez une proposition</strong><small>Périmètre, calendrier et budget clairs.</small></p></li>
          </ol>
          <div className="inquiry-direct"><span>Vous préférez écrire directement ?</span><a href={`mailto:${email}`}>{email}<ArrowUpRight aria-hidden="true" /></a></div>
        </div>
        <div className="project-inquiry-form"><LeadForm email={email} /></div>
      </div>
    </div>
    <div className="shell footer-editorial-main">
      <div className="footer-editorial-note">
        <p><i aria-hidden="true" />Conception · Développement · Mise en ligne</p>
        <span>Un interlocuteur unique pour transformer une idée en produit web clair, rapide et prêt à évoluer.</span>
      </div>

      <div className="footer-editorial-top">
        <div className="footer-editorial-intro">
          <p>Un projet en tête ?</p>
          <h2 id="contact-title">Parlons de ce que<br />vous voulez construire.</h2>
          <div className="footer-editorial-actions">
            <button type="button" aria-haspopup="dialog" onClick={openProjectForm}><span>Parlons de votre projet</span><ArrowUpRight aria-hidden="true" /></button>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <ul className="footer-contact-assurances" aria-label="Modalités de contact">
            <li><Check aria-hidden="true" />Premier échange sans engagement</li>
            <li><Check aria-hidden="true" />Cadrage clair avant de commencer</li>
            <li><Check aria-hidden="true" />Belfort · France · à distance</li>
          </ul>
        </div>

        <nav className="footer-editorial-links" aria-label="Contacter Walid">
          <p>Accès direct</p>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z" /></svg>
            <span>LinkedIn<span className="sr-only"> (nouvel onglet)</span></span>
          </a>
          <a href={`mailto:${email}`}><Mail aria-hidden="true" /><span>E-mail</span></a>
          <a href={resume} download><Download aria-hidden="true" /><span>CV · PDF</span></a>
        </nav>
      </div>

      <div className="footer-editorial-wordmark"><Image src="/walid-organic-logo.webp" alt="Walid" width={2098} height={749} sizes="(max-width: 1180px) 100vw, 1180px" /></div>

      <div className="footer-editorial-bottom">
        <span className="footer-editorial-copy">© {year} Walid Tahiri</span><span>Belfort, France · Développement web</span><a href={pathname === '/' ? '#accueil' : '/#accueil'}>Retour en haut ↑</a>
      </div>
    </div>
  </footer>;
}

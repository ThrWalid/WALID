import { isLocale, type Locale } from '@/lib/i18n';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const options = {
  fr: {
    types: ['Création de site web', 'Refonte de site', 'Application web', 'Agents IA et automatisation', 'À définir ensemble'],
    budgets: ['Moins de 2 000 €', '2 000 — 5 000 €', '5 000 — 10 000 €', 'Plus de 10 000 €', 'À discuter'],
    timelines: ['Dès que possible', 'Dans 1 à 2 mois', 'Dans 3 à 6 mois', 'Je suis flexible'],
  },
  en: {
    types: ['New website', 'Website redesign', 'Web application', 'AI agents and automation', 'To be defined together'],
    budgets: ['Under €2,000', '€2,000–€5,000', '€5,000–€10,000', 'Over €10,000', 'Let’s discuss'],
    timelines: ['As soon as possible', 'Within 1–2 months', 'Within 3–6 months', 'I’m flexible'],
  },
  es: {
    types: ['Creación de un sitio web', 'Rediseño web', 'Aplicación web', 'Agentes de IA y automatización', 'Por definir juntos'],
    budgets: ['Menos de 2 000 €', '2 000–5 000 €', '5 000–10 000 €', 'Más de 10 000 €', 'A convenir'],
    timelines: ['Lo antes posible', 'En 1–2 meses', 'En 3–6 meses', 'Soy flexible'],
  },
} satisfies Record<Locale, { types: string[]; budgets: string[]; timelines: string[] }>;

export function getInquiryOptions(locale: Locale) {
  return options[locale];
}

export type Inquiry = { locale: Locale; name: string; company: string; email: string; phone: string; service: string; budget: string; timeline: string; message: string; website: string; startedAt: number };

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : '';
}

export function parseInquiry(input: unknown): { data?: Inquiry; error?: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'Invalid request.' };
  const value = input as Record<string, unknown>;
  const locale: Locale = typeof value.locale === 'string' && isLocale(value.locale) ? value.locale : 'en';
  const messages = locale === 'fr' ? {
    rejected: 'Envoi refusé.', refresh: 'Veuillez actualiser le formulaire puis réessayer.', name: 'Indiquez votre nom ou celui de votre entreprise.', email: 'Indiquez une adresse e-mail valide.', service: 'Sélectionnez un type de projet valide.', budget: 'Sélectionnez un budget valide.', timeline: 'Sélectionnez un calendrier valide.', message: 'Ajoutez au moins 30 caractères pour présenter votre besoin.',
  } : locale === 'es' ? {
    rejected: 'Envío rechazado.', refresh: 'Actualiza el formulario e inténtalo de nuevo.', name: 'Indica tu nombre o el de tu empresa.', email: 'Indica una dirección de correo válida.', service: 'Selecciona un tipo de proyecto válido.', budget: 'Selecciona un presupuesto válido.', timeline: 'Selecciona un calendario válido.', message: 'Añade al menos 30 caracteres para describir tu necesidad.',
  } : {
    rejected: 'Submission rejected.', refresh: 'Refresh the form and try again.', name: 'Enter your name or company name.', email: 'Enter a valid email address.', service: 'Select a valid project type.', budget: 'Select a valid budget.', timeline: 'Select a valid timeline.', message: 'Add at least 30 characters to describe your needs.',
  };
  const data: Inquiry = {
    locale, name: clean(value.name, 80), company: clean(value.company, 100), email: clean(value.email, 160).toLowerCase(), phone: clean(value.phone, 30),
    service: clean(value.service, 60), budget: clean(value.budget, 40), timeline: clean(value.timeline, 40), message: clean(value.message, 2500),
    website: clean(value.website, 200), startedAt: typeof value.startedAt === 'number' ? value.startedAt : 0,
  };
  const selected = options[locale];
  if (data.website) return { error: messages.rejected };
  if (Date.now() - data.startedAt < 2500 || Date.now() - data.startedAt > 86_400_000) return { error: messages.refresh };
  if (data.name.length < 2) return { error: messages.name };
  if (!emailPattern.test(data.email)) return { error: messages.email };
  if (!selected.types.includes(data.service)) return { error: messages.service };
  if (!selected.budgets.includes(data.budget)) return { error: messages.budget };
  if (!selected.timelines.includes(data.timeline)) return { error: messages.timeline };
  if (data.message.length < 30) return { error: messages.message };
  return { data };
}

export const projectTypes = ['Création de site web', 'Refonte de site', 'Application web', 'Automatisation et intégration', 'À définir ensemble'] as const;
export const projectBudgets = ['Moins de 2 000 €', '2 000 — 5 000 €', '5 000 — 10 000 €', 'Plus de 10 000 €', 'À discuter'] as const;
export const projectTimelines = ['Dès que possible', 'Dans 1 à 2 mois', 'Dans 3 à 6 mois', 'Je suis flexible'] as const;

export type Inquiry = { name: string; company: string; email: string; phone: string; service: string; budget: string; timeline: string; message: string; website: string; startedAt: number };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : '';
}

export function parseInquiry(input: unknown): { data?: Inquiry; error?: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'Requête invalide.' };
  const value = input as Record<string, unknown>;
  const data: Inquiry = {
    name: clean(value.name, 80), company: clean(value.company, 100), email: clean(value.email, 160).toLowerCase(), phone: clean(value.phone, 30),
    service: clean(value.service, 60), budget: clean(value.budget, 40), timeline: clean(value.timeline, 40), message: clean(value.message, 2500),
    website: clean(value.website, 200), startedAt: typeof value.startedAt === 'number' ? value.startedAt : 0,
  };
  if (data.website) return { error: 'Envoi refusé.' };
  if (Date.now() - data.startedAt < 2500 || Date.now() - data.startedAt > 86_400_000) return { error: 'Veuillez actualiser le formulaire puis réessayer.' };
  if (data.name.length < 2) return { error: 'Indiquez votre nom ou celui de votre entreprise.' };
  if (!emailPattern.test(data.email)) return { error: 'Indiquez une adresse e-mail valide.' };
  if (!projectTypes.includes(data.service as (typeof projectTypes)[number])) return { error: 'Sélectionnez un type de projet valide.' };
  if (!projectBudgets.includes(data.budget as (typeof projectBudgets)[number])) return { error: 'Sélectionnez un budget valide.' };
  if (!projectTimelines.includes(data.timeline as (typeof projectTimelines)[number])) return { error: 'Sélectionnez un calendrier valide.' };
  if (data.message.length < 30) return { error: 'Ajoutez au moins 30 caractères pour présenter votre besoin.' };
  return { data };
}

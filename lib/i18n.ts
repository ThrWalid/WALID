export const locales = ['fr', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = '') {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
};

export const navigation = {
  fr: [
    ['Accueil', 'accueil'],
    ['Services', 'services'],
    ['Tarifs', 'tarifs'],
    ['Réalisations', 'realisations'],
    ['FAQ', 'faq'],
    ['Contact', 'contact'],
  ],
  en: [
    ['Home', 'accueil'],
    ['Services', 'services'],
    ['Pricing', 'tarifs'],
    ['Work', 'realisations'],
    ['FAQ', 'faq'],
    ['Contact', 'contact'],
  ],
  es: [
    ['Inicio', 'accueil'],
    ['Servicios', 'services'],
    ['Precios', 'tarifs'],
    ['Proyectos', 'realisations'],
    ['Preguntas', 'faq'],
    ['Contacto', 'contact'],
  ],
} as const;

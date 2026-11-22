import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import { profile } from '@/lib/portfolio';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import "../globals.css";
import "../hero.css";
import "../brand.css";
import "../feedback.css";
import 'lenis/dist/lenis.css';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';

const geist = localFont({
  src: '../../public/geist.woff2',
  variable: '--font-geist',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

const metadataByLocale = {
  fr: {
    description: 'Développeur web indépendant à Belfort. Sites sur mesure, applications full-stack et automatisation : découvrez mon travail et parlons de votre projet.',
    shortDescription: 'Sites web, applications et automatisation. Un interlocuteur pour concevoir et développer votre projet.',
    imageAlt: 'Walid Tahiri — Développement web et automatisation',
  },
  en: {
    description: 'Freelance web developer in Belfort. Custom websites, full-stack applications and automation: explore my work and let’s discuss your project.',
    shortDescription: 'Websites, applications and automation. One partner to design and build your project.',
    imageAlt: 'Walid Tahiri — Web development and automation',
  },
  es: {
    description: 'Desarrollador web freelance en Belfort. Sitios a medida, aplicaciones full-stack y automatización: descubre mi trabajo y hablemos de tu proyecto.',
    shortDescription: 'Sitios web, aplicaciones y automatización. Un único interlocutor para diseñar y desarrollar tu proyecto.',
    imageAlt: 'Walid Tahiri — Desarrollo web y automatización',
  },
} satisfies Record<Locale, { description: string; shortDescription: string; imageAlt: string }>;

type LocaleLayoutProps = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = metadataByLocale[locale];
  return {
  metadataBase: new URL(profile.url),
  title: { default: 'Walid Tahiri', template: '%s | Walid Tahiri' },
  description: copy.description,
  alternates: { canonical: `/${locale}`, languages: { fr: '/fr', en: '/en', es: '/es', 'x-default': '/fr' } },
  openGraph: { title: 'Walid Tahiri', description: copy.shortDescription, type: 'website', locale: locale === 'es' ? 'es_ES' : locale === 'fr' ? 'fr_FR' : 'en_US', url: `/${locale}`, images: [{ url: '/social-preview.png', width: 1200, height: 630, alt: copy.imageAlt }] },
  twitter: { card: 'summary_large_image', title: 'Walid Tahiri', description: copy.shortDescription, images: ['/social-preview.png'] },
  icons: {
    icon: [
      { url: '/walid-profile-icon.png', type: 'image/png' },
    ],
    shortcut: '/walid-profile-icon.png',
    apple: { url: '/walid-apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  };
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body className={`${geist.variable} antialiased`}><SmoothScrollProvider>{children}</SmoothScrollProvider></body>
    </html>
  );
}

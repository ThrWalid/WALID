import type { Metadata } from "next";
import { profile } from '@/lib/portfolio';
import "./globals.css";
import "./hero.css";
import "./brand.css";
import "./feedback.css";
import 'lenis/dist/lenis.css';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: 'Walid Tahiri',
  description: 'Développeur web indépendant à Belfort. Sites sur mesure, applications full-stack et automatisation : découvrez mon travail et parlons de votre projet.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Walid Tahiri', description: 'Sites web, applications et automatisation. Un interlocuteur pour concevoir et développer votre projet.', type: 'website', locale: 'fr_FR', url: profile.url, images: [{ url: '/social-preview.png', width: 1200, height: 630, alt: 'Walid Tahiri — Développement web et automatisation' }] },
  twitter: { card: 'summary_large_image', title: 'Walid Tahiri', description: 'Sites sur mesure, applications full-stack et automatisation.', images: ['/social-preview.png'] },
  icons: {
    icon: [
      { url: '/walid-profile-icon.png', type: 'image/png' },
    ],
    shortcut: '/walid-profile-icon.png',
    apple: { url: '/walid-apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head><link rel="preload" href="/geist.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head>
      <body className="antialiased"><SmoothScrollProvider>{children}</SmoothScrollProvider></body>
    </html>
  );
}

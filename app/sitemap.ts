import type { MetadataRoute } from 'next';
import { profile } from '@/lib/portfolio';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLanguages = Object.fromEntries(locales.map(locale => [locale, `${profile.url}/${locale}`]));
  const profileLanguages = Object.fromEntries(locales.map(locale => [locale, `${profile.url}/${locale}/profile`]));

  return locales.flatMap(locale => [
    { url: `${profile.url}/${locale}`, changeFrequency: 'monthly' as const, priority: 1, alternates: { languages: homeLanguages } },
    { url: `${profile.url}/${locale}/profile`, changeFrequency: 'monthly' as const, priority: .8, alternates: { languages: profileLanguages } },
  ]);
}

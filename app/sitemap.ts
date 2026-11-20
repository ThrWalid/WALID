import type { MetadataRoute } from 'next';
import { profile } from '@/lib/portfolio';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${profile.url}/profil`, changeFrequency: 'monthly', priority: .8 },
  ];
}

# Walid Tahiri — Portfolio

Personal bilingual portfolio built with Next.js 16, React 19, TypeScript and Tailwind CSS.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3100](http://localhost:3100). The language-aware proxy redirects to French (`/fr`), English (`/en`) or Spanish (`/es`) from the browser preference.

## Commands

- `npm run dev`: Next.js development server
- `npm run build`: production build
- `npm run start`: production server
- `npm run lint`: ESLint checks
- `npm run typecheck`: TypeScript checks
- `npm run check`: run every verification

## Structure

- `app/[locale]/`: statically generated French, English and Spanish routes
- `components/`: portfolio components
- `lib/`: localized content and shared utilities
- `public/`: images, font and résumé assets
- `proxy.ts`: locale detection and legacy-route redirects

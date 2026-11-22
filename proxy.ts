import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales } from '@/lib/i18n';

function preferredLocale(request: NextRequest) {
  const languages = request.headers.get('accept-language')?.toLowerCase() ?? '';
  const requested = languages.split(',').map(language => language.trim().split(';')[0].split('-')[0]);
  return requested.find(isLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, locale] = pathname.split('/');

  if (isLocale(locale)) return NextResponse.next();

  const targetLocale = preferredLocale(request);
  const legacyPath = pathname === '/profil' ? '/profile' : pathname;
  request.nextUrl.pathname = `/${targetLocale}${legacyPath === '/' ? '' : legacyPath}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

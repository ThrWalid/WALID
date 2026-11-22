'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MobileNavigation } from '@/components/portfolio-controls';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { navigateToSection } from '@/lib/navigation';
import { navigation, type Locale } from '@/lib/i18n';

export function PortfolioNavbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = navigation[locale];
  const isHomePage = pathname === `/${locale}`;
  const homePath = `/${locale}`;
  const profilePath = `${homePath}/profile`;
  const copy = locale === 'fr'
    ? { home: 'Walid Tahiri, retour à l’accueil', mainNav: 'Navigation principale', profile: 'Qui suis-je ?', contact: 'Contact', language: 'Langue' }
    : locale === 'es'
      ? { home: 'Walid Tahiri, volver al inicio', mainNav: 'Navegación principal', profile: 'Sobre mí', contact: 'Contacto', language: 'Idioma' }
      : { home: 'Walid Tahiri, back to home', mainNav: 'Main navigation', profile: 'About me', contact: 'Contact', language: 'Language' };
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const sectionHref = (id: string) => isHomePage || id === 'contact' ? `#${id}` : `${homePath}#${id}`;

  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;
      setScrolled(window.scrollY > 18);

      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 72;
      const marker = window.scrollY + headerHeight + 24;
      let current = '';
      const sections = navItems.map(([, id]) => id)
        .map(id => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .sort((first, second) => first.getBoundingClientRect().top - second.getBoundingClientRect().top);

      for (const section of sections) {
        if (section.getBoundingClientRect().top + window.scrollY <= marker) current = section.id;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';

      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute('href')?.slice(1);
      if (!id || !document.getElementById(id)) return;
      event.preventDefault();
      navigateToSection(id);
    };
    const onHistory = () => { navigateToSection(window.location.hash.slice(1) || 'main', false); scheduleUpdate(); };
    const header = document.querySelector<HTMLElement>('.site-header');
    const resizeObserver = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--nav-offset', `${(header?.offsetHeight ?? 72) + 16}px`);
      scheduleUpdate();
    });
    if (header) resizeObserver.observe(header);
    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('popstate', onHistory);
    document.addEventListener('click', onAnchorClick);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('popstate', onHistory);
      document.removeEventListener('click', onAnchorClick);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [navItems]);

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="shell header-inner">
      <Link className="brand" href={isHomePage ? '#accueil' : `${homePath}#accueil`} aria-label={copy.home} onClick={event => {
        event.preventDefault();
        setActiveSection('accueil');
        if (isHomePage) navigateToSection('accueil');
        else router.push(`${homePath}#accueil`);
      }}>
        <span className="brand-wordmark" aria-hidden="true">
          <Image src="/walid-organic-logo.webp" alt="" width={640} height={228} priority sizes="(max-width: 760px) 136px, 157px" />
        </span>
      </Link>

      <nav className="desktop-nav" aria-label={copy.mainNav}>
        {navItems.filter(([, id]) => id !== 'contact').map(([label, id]) => <Link
          className={activeSection === id ? 'is-active' : undefined}
          href={sectionHref(id)}
          aria-current={activeSection === id ? 'location' : undefined}
          onClick={event => {
            if (isHomePage || id === 'contact') { event.preventDefault(); navigateToSection(id); }
          }}
          key={id}
        >{label}</Link>)}
      </nav>

      <Link className={`header-portfolio-link${pathname === profilePath ? ' is-active' : ''}`} href={profilePath} aria-current={pathname === profilePath ? 'page' : undefined}>{copy.profile}</Link>
      <nav className="language-switcher" aria-label={copy.language}>
        {(['fr', 'en', 'es'] as const).map(option => <Link key={option} href={pathname.replace(/^\/(fr|en|es)/, `/${option}`) || `/${option}`} hrefLang={option} lang={option} aria-current={locale === option ? 'page' : undefined}>{option.toUpperCase()}</Link>)}
      </nav>
      <Button asChild className={`header-cta${activeSection === 'contact' ? ' is-active' : ''}`}><Link href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined}>{copy.contact}<ArrowUpRight aria-hidden="true" /></Link></Button>
      <MobileNavigation activeSection={activeSection} isHomePage={isHomePage} locale={locale} />
    </div>
  </header>;
}

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

const feedback = [
  {
    name: 'Maximilian Behre',
    avatar: '/feedback/maximilian.png',
    subtitle: 'Senior Director @ Dassault Systèmes',
    language: 'en',
    quote: 'Thank you so much for everything you did. The results speak for themselves! Good luck in your future endeavours.',
    tone: 'maximilian',
    verified: true,
  },
  {
    name: 'Fabien Demoersman',
    avatar: '/feedback/fabien.png',
    subtitle: 'WW Business Development HUB Senior Solution Architect',
    language: 'fr',
    quote: "Merci et félicitations pour ton travail ! Continue de travailler de la même façon, j’ai été très heureux de pouvoir t’aider à réaliser ton projet 👌",
    tone: 'fabien',
  },
  {
    name: 'Alaa AYOUBI',
    avatar: '/feedback/alaa.png',
    subtitle: 'Architecte de Solution chez Dassault Systèmes',
    language: 'en',
    quote: 'You did a great job, congrats! and it was a pleasure working with you. Wishing you continued success! 💪🏻',
    tone: 'alaa',
    verified: true,
  },
  {
    name: 'Florent GILBERT',
    avatar: '/feedback/florent.png',
    subtitle: '3DEXPERIENCE Business Developer',
    language: 'fr',
    quote: 'Merci Walid pour ces bons échanges, bon vent à toi :-)',
    tone: 'florent',
    linkedin: true,
  },
] as const;

export function FeedbackShowcase({ locale }: { locale: Locale }) {
  const copy = locale === 'fr' ? {
    kicker: 'Retours de collaboration', title: <>Le travail parle.<br /><em>Eux aussi.</em></>, intro: 'Des retours directs de professionnels avec qui j’ai eu le plaisir de construire et de collaborer.', portrait: 'Portrait de', verified: 'Profil professionnel vérifié',
  } : locale === 'es' ? {
    kicker: 'Opiniones de colaboradores', title: <>El trabajo habla.<br /><em>Ellos también.</em></>, intro: 'Opiniones directas de profesionales con quienes he tenido el placer de crear y colaborar.', portrait: 'Retrato de', verified: 'Perfil profesional verificado',
  } : {
    kicker: 'Collaboration feedback', title: <>The work speaks.<br /><em>So do they.</em></>, intro: 'Direct feedback from professionals I have had the pleasure of building and collaborating with.', portrait: 'Portrait of', verified: 'Verified professional profile',
  };
  const translations = locale === 'fr' ? feedback.map(person => ({ subtitle: person.subtitle, quote: person.quote })) : locale === 'es' ? [
    { subtitle: 'Director sénior en Dassault Systèmes', quote: 'Muchas gracias por todo lo que hiciste. ¡Los resultados hablan por sí solos! Mucha suerte en tus próximos proyectos.' },
    { subtitle: 'Arquitecto sénior de soluciones del WW Business Development HUB', quote: '¡Gracias y enhorabuena por tu trabajo! Sigue trabajando así; me alegró mucho poder ayudarte a realizar tu proyecto 👌' },
    { subtitle: 'Arquitecta de soluciones en Dassault Systèmes', quote: '¡Hiciste un gran trabajo, enhorabuena! Fue un placer trabajar contigo. ¡Te deseo muchos más éxitos! 💪🏻' },
    { subtitle: 'Business Developer de 3DEXPERIENCE', quote: 'Gracias, Walid, por estas buenas conversaciones. Te deseo todo lo mejor :-)' },
  ] : [
    { subtitle: 'Senior Director at Dassault Systèmes', quote: 'Thank you so much for everything you did. The results speak for themselves! Good luck in your future endeavours.' },
    { subtitle: 'WW Business Development HUB Senior Solution Architect', quote: 'Thank you, and congratulations on your work! Keep working the same way; I was very happy to help you complete your project 👌' },
    { subtitle: 'Solution Architect at Dassault Systèmes', quote: 'You did a great job—congratulations! It was a pleasure working with you. Wishing you continued success! 💪🏻' },
    { subtitle: '3DEXPERIENCE Business Developer', quote: 'Thank you, Walid, for these great conversations. Wishing you all the best :-)' },
  ];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let revert = () => {};

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from('.feedback-heading > *', {
          y: 20,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.feedback-heading', start: 'top 86%', once: true },
        });
        gsap.from('.feedback-entry', {
          y: 24,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.62,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.feedback-list', start: 'top 84%', once: true },
        });
      }, section);

      revert = () => context.revert();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return <section ref={sectionRef} id="temoignages" className="feedback-section section-space" aria-labelledby="feedback-title">
    <div className="shell">
      <header className="feedback-heading">
        <p className="kicker">{copy.kicker}</p>
        <h2 id="feedback-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>

      <div className="feedback-list">
        {feedback.map((person, index) => <article className="feedback-entry" key={person.name}>
          <blockquote lang={locale}><span aria-hidden="true">“</span>{translations[index].quote}</blockquote>
          <footer>
            <div className={`feedback-avatar is-${person.tone}`}>
              <Image src={person.avatar} alt={`${copy.portrait} ${person.name}`} width={96} height={96} />
            </div>
            <div className="feedback-identity">
              <div className="feedback-name-line">
                <strong>{person.name}</strong>
                {'verified' in person && person.verified ? <BadgeCheck aria-label={copy.verified} /> : null}
                {'linkedin' in person && person.linkedin ? <span className="feedback-linkedin" aria-label="Profil LinkedIn">in</span> : null}
              </div>
              <p>{translations[index].subtitle}</p>
            </div>
          </footer>
        </article>)}
      </div>
    </div>
  </section>;
}

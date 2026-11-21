'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

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

export function FeedbackShowcase() {
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
        <p className="kicker">Retours de collaboration</p>
        <h2 id="feedback-title">Le travail parle.<br /><em>Eux aussi.</em></h2>
        <p>Des retours directs de professionnels avec qui j’ai eu le plaisir de construire et de collaborer.</p>
      </header>

      <div className="feedback-list">
        {feedback.map(person => <article className="feedback-entry" key={person.name}>
          <blockquote lang={person.language}><span aria-hidden="true">“</span>{person.quote}</blockquote>
          <footer>
            <div className={`feedback-avatar is-${person.tone}`}>
              <Image src={person.avatar} alt={`Portrait de ${person.name}`} width={96} height={96} />
            </div>
            <div className="feedback-identity">
              <div className="feedback-name-line">
                <strong>{person.name}</strong>
                {'verified' in person && person.verified ? <BadgeCheck aria-label="Profil professionnel vérifié" /> : null}
                {'linkedin' in person && person.linkedin ? <span className="feedback-linkedin" aria-label="Profil LinkedIn">in</span> : null}
              </div>
              <p>{person.subtitle}</p>
            </div>
          </footer>
        </article>)}
      </div>
    </div>
  </section>;
}

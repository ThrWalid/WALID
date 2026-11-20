'use client';

import { useEffect, useRef } from 'react';

export function HeroPointerLight() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    const hero = marker?.closest<HTMLElement>('.hero-showcase');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (!hero || reduceMotion || coarsePointer) return;

    let frame = 0;
    const update = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        hero.style.setProperty('--hero-pointer-x', `${x}px`);
        hero.style.setProperty('--hero-pointer-y', `${y}px`);
        hero.style.setProperty('--hero-parallax-x', `${((x / bounds.width) - .5) * 7}px`);
        hero.style.setProperty('--hero-parallax-y', `${((y / bounds.height) - .5) * 5}px`);
        hero.dataset.pointerActive = 'true';
      });
    };
    const reset = () => {
      hero.dataset.pointerActive = 'false';
      hero.style.setProperty('--hero-parallax-x', '0px');
      hero.style.setProperty('--hero-parallax-y', '0px');
    };

    hero.addEventListener('pointermove', update, { passive: true });
    hero.addEventListener('pointerleave', reset);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', update);
      hero.removeEventListener('pointerleave', reset);
    };
  }, []);

  return <span ref={markerRef} className="hero-pointer-light" aria-hidden="true" />;
}

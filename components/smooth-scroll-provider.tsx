'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let cancelled = false;
    let retryFrame = 0;
    let cleanup = () => {};

    const connect = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        retryFrame = requestAnimationFrame(connect);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const update = () => ScrollTrigger.update();
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        lenis.off('scroll', update);
        gsap.ticker.remove(tick);
      };
    };

    void connect();
    return () => {
      cancelled = true;
      cancelAnimationFrame(retryFrame);
      cleanup();
    };
  }, []);

  return <ReactLenis ref={lenisRef} root options={{ autoRaf: false, lerp: .12, duration: .68, smoothWheel: true, wheelMultiplier: 1, syncTouch: false }}>{children}</ReactLenis>;
}

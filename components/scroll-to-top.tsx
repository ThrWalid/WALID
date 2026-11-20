'use client';

import { useLayoutEffect } from 'react';
import { useLenis } from 'lenis/react';

export function ScrollToTop() {
  const lenis = useLenis();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const resetScroll = () => {
      lenis?.scrollTo(0, { immediate: true, force: true });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    resetScroll();
    const frame = window.requestAnimationFrame(() => {
      resetScroll();
      root.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [lenis]);

  return null;
}

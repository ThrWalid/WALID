export const navigation = [
  ['Accueil', 'accueil'],
  ['Services', 'services'],
  ['Tarifs', 'tarifs'],
  ['Réalisations', 'realisations'],
  ['FAQ', 'faq'],
  ['Contact', 'contact'],
] as const;

/** Shared by ordinary links and links deferred until a modal has closed. */
export function navigateToSection(id: string, updateHistory = true) {
  const target = document.getElementById(id);
  if (!target) return;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  if (id === 'accueil') window.scrollTo({ top: 0, behavior });
  else target.scrollIntoView({ behavior, block: 'start' });
  if (updateHistory && window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`);
  }
}

// @ts-nocheck
// Small native scroll helper used by in-page navigation.
import type Lenis from 'lenis';

// Kept as compatibility shims for the unused ScrollStack component. Native
// scrolling is the only active page scroll engine.
export function getLenis(): Lenis | null {
  return null;
}

export function destroyLenis(): void {}

/** Smooth-scrolls to an element (by id, without the leading #) or to the
 * very top when id is falsy/"top". Uses native browser scrolling so that
 * wheel, touch, keyboard, and reduced-motion behavior stay under one engine. */
export function scrollToTarget(id: string | null | undefined, offset = 0): void {
  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior });
}

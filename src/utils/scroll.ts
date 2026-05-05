/**
 * Smoothly scrolls the viewport to the section element with the given id,
 * accounting for the sticky navbar height. No-op if the target is missing.
 */
const NAV_OFFSET_PX = 72;

export function scrollToSection(sectionId: string): void {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
  window.scrollTo({ top: targetTop, behavior: 'smooth' });
}

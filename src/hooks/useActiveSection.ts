/**
 * Returns the id of the section the user is currently reading — used by
 * the navbar to highlight the active link.
 *
 * Strategy: pick the *last* section whose top edge has scrolled past a
 * trigger line near the top of the viewport (just below the navbar).
 * This matches what the user intuitively expects — once the next section's
 * heading enters the viewport, that section becomes active. An
 * IntersectionObserver with a thin middle band, by contrast, can leave
 * the previous section "winning" by area for a long time, which is what
 * the old implementation did.
 */
import { useEffect, useState } from 'react';

const NAVBAR_OFFSET_PX = 120;

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return undefined;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const update = (): void => {
      const triggerLine =
        window.scrollY + Math.max(NAVBAR_OFFSET_PX, window.innerHeight * 0.25);

      const initial = elements[0]?.id ?? sectionIds[0] ?? '';
      const current = elements.reduce<string>(
        (acc, el) => (el.offsetTop <= triggerLine ? el.id : acc),
        initial,
      );

      setActiveId((previous) => (previous === current ? previous : current));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sectionIds]);

  return activeId;
}

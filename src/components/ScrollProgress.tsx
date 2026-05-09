/**
 * ScrollProgress — slim gradient bar pinned to the top of the viewport
 * that fills from 0% → 100% as the user scrolls. Updates run on the
 * compositor via Framer Motion's `useScroll`, with a soft spring so
 * the fill never feels jittery.
 */
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = (): JSX.Element => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, boxShadow: '0 0 14px rgba(168, 85, 247, 0.55)' }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-brand pointer-events-none z-[51]"
    />
  );
}

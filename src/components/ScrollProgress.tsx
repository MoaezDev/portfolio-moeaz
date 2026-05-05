/**
 * ScrollProgress — slim gradient bar pinned to the top of the viewport
 * that fills from 0% → 100% as the user scrolls the page. Uses
 * Framer Motion's `useScroll` so updates run on the compositor thread,
 * with a soft spring so the fill never feels jittery.
 */
import { motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';

const Bar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transform-origin: 0% 50%;
  background: ${({ theme }) => theme.gradients.brand};
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.55);
  z-index: ${({ theme }) => theme.z.nav + 1};
  pointer-events: none;
`;

export function ScrollProgress(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return <Bar style={{ scaleX }} aria-hidden="true" />;
}

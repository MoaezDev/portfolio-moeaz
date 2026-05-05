/**
 * CustomCursor — replaces the native pointer with a glowing comet:
 * a sharp white core, a soft violet/blue radial halo, and two lagging
 * trail orbs that fade behind the cursor as it moves. Each layer is
 * driven by its own `useSpring` so position updates are written
 * straight to the DOM (no React re-renders per frame), and each spring
 * has progressively softer physics so the trail fans out naturally.
 *
 * Hover/press states retint and resize the halo. The whole layer is
 * hidden on touch / coarse-pointer devices via media queries.
 */
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SPRING_DOT = { stiffness: 800, damping: 30, mass: 0.18 };
const SPRING_HALO = { stiffness: 220, damping: 24, mass: 0.45 };
const SPRING_TRAIL_NEAR = { stiffness: 130, damping: 22, mass: 0.75 };
const SPRING_TRAIL_FAR = { stiffness: 80, damping: 22, mass: 1 };

function computeHaloScale(isPressed: boolean, isHovering: boolean): number {
  if (isPressed) return 0.7;
  if (isHovering) return 1.55;
  return 1;
}

function computeBaseOpacity(isVisible: boolean): number {
  return isVisible ? 1 : 0;
}

function computeHaloOpacity(isVisible: boolean, isHovering: boolean): number {
  if (!isVisible) return 0;
  return isHovering ? 1 : 0.85;
}

const Layer = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.cursor};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const Dot = styled(motion.div)`
  position: fixed;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow:
    0 0 6px rgba(255, 255, 255, 0.95),
    0 0 14px rgba(168, 85, 247, 0.7);
  will-change: transform, opacity;
`;

const Halo = styled(motion.div)`
  position: fixed;
  top: -28px;
  left: -28px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(168, 85, 247, 0.55) 0%,
    rgba(59, 130, 246, 0.4) 35%,
    rgba(59, 130, 246, 0) 70%
  );
  filter: blur(4px);
  will-change: transform, opacity, background;
`;

const Trail = styled(motion.div)<{ $size: number }>`
  position: fixed;
  top: ${({ $size }) => -$size / 2}px;
  left: ${({ $size }) => -$size / 2}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.4) 0%,
    rgba(168, 85, 247, 0.18) 50%,
    transparent 75%
  );
  filter: blur(3px);
  will-change: transform, opacity;
`;

export function CustomCursor(): JSX.Element {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const dotX = useSpring(pointerX, SPRING_DOT);
  const dotY = useSpring(pointerY, SPRING_DOT);
  const haloX = useSpring(pointerX, SPRING_HALO);
  const haloY = useSpring(pointerY, SPRING_HALO);
  const trailNearX = useSpring(pointerX, SPRING_TRAIL_NEAR);
  const trailNearY = useSpring(pointerY, SPRING_TRAIL_NEAR);
  const trailFarX = useSpring(pointerX, SPRING_TRAIL_FAR);
  const trailFarY = useSpring(pointerY, SPRING_TRAIL_FAR);

  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent): void => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const handleEnter = (): void => setIsVisible(true);
    const handleLeave = (): void => setIsVisible(false);
    const handleDown = (): void => setIsPressed(true);
    const handleUp = (): void => setIsPressed(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseenter', handleEnter);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseenter', handleEnter);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [pointerX, pointerY, isVisible]);

  useEffect(() => {
    const handleOver = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, textarea, [data-cursor="hover"]');
      setIsHovering(Boolean(interactive));
    };
    window.addEventListener('mouseover', handleOver);
    return () => window.removeEventListener('mouseover', handleOver);
  }, []);

  const baseOpacity = computeBaseOpacity(isVisible);
  const haloScale = computeHaloScale(isPressed, isHovering);
  const haloOpacity = computeHaloOpacity(isVisible, isHovering);

  return (
    <Layer>
      <Trail
        $size={26}
        style={{ x: trailFarX, y: trailFarY }}
        animate={{ opacity: isVisible ? 0.55 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <Trail
        $size={18}
        style={{ x: trailNearX, y: trailNearY }}
        animate={{ opacity: isVisible ? 0.75 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <Halo
        style={{ x: haloX, y: haloY }}
        animate={{
          scale: haloScale,
          opacity: haloOpacity,
          background: isHovering
            ? 'radial-gradient(circle, rgba(245, 196, 107, 0.5) 0%, rgba(168, 85, 247, 0.4) 35%, rgba(168, 85, 247, 0) 70%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.55) 0%, rgba(59, 130, 246, 0.4) 35%, rgba(59, 130, 246, 0) 70%)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.4 }}
      />
      <Dot style={{ x: dotX, y: dotY, opacity: baseOpacity }} />
    </Layer>
  );
}

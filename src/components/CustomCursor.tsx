/**
 * CustomCursor — replaces the native pointer with a glowing comet:
 * a sharp white core (bound directly to the pointer for zero lag),
 * a soft violet/blue radial halo, and two lagging trail orbs. Each
 * non-dot layer is driven by its own `useSpring` so position updates
 * are written straight to the DOM (no React re-renders per frame),
 * and each spring has progressively softer physics so the trail fans
 * out naturally behind the dot.
 *
 * Hover/press states retint and resize the halo. The whole layer is
 * hidden on touch / coarse-pointer devices via media queries.
 */
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_HALO = { stiffness: 320, damping: 28, mass: 0.4 };
const SPRING_TRAIL_NEAR = { stiffness: 130, damping: 22, mass: 0.75 };
const SPRING_TRAIL_FAR = { stiffness: 80, damping: 22, mass: 1 };

const HALO_BG_DEFAULT =
  'radial-gradient(circle, rgba(168, 85, 247, 0.55) 0%, rgba(59, 130, 246, 0.4) 35%, rgba(59, 130, 246, 0) 70%)';
const HALO_BG_HOVER =
  'radial-gradient(circle, rgba(245, 196, 107, 0.5) 0%, rgba(168, 85, 247, 0.4) 35%, rgba(168, 85, 247, 0) 70%)';
const TRAIL_BG =
  'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(168, 85, 247, 0.18) 50%, transparent 75%)';

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

export const CustomCursor = (): JSX.Element => {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

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
    <div className="pointer-events-none fixed inset-0 z-cursor max-md:hidden [@media(hover:none)]:hidden [@media(pointer:coarse)]:hidden">
      <motion.div
        style={{
          x: trailFarX,
          y: trailFarY,
          background: TRAIL_BG,
          top: -13,
          left: -13,
          width: 26,
          height: 26,
        }}
        animate={{ opacity: isVisible ? 0.55 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed rounded-full blur-[3px] [will-change:transform,opacity]"
      />
      <motion.div
        style={{
          x: trailNearX,
          y: trailNearY,
          background: TRAIL_BG,
          top: -9,
          left: -9,
          width: 18,
          height: 18,
        }}
        animate={{ opacity: isVisible ? 0.75 : 0 }}
        transition={{ duration: 0.2 }}
        className="fixed rounded-full blur-[3px] [will-change:transform,opacity]"
      />
      <motion.div
        style={{ x: haloX, y: haloY }}
        animate={{
          scale: haloScale,
          opacity: haloOpacity,
          background: isHovering ? HALO_BG_HOVER : HALO_BG_DEFAULT,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.4 }}
        className="fixed top-[-28px] left-[-28px] w-14 h-14 rounded-full blur-[4px] [will-change:transform,opacity,background]"
      />
      <motion.div
        style={{ x: pointerX, y: pointerY, opacity: baseOpacity }}
        className="fixed top-[-3px] left-[-3px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95),0_0_14px_rgba(168,85,247,0.7)] [will-change:transform,opacity]"
      />
    </div>
  );
}

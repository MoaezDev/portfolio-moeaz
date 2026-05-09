/**
 * SplashScreen — first-visit welcome overlay.
 *
 * Visual: three perpendicular CSS-3D rings (electric blue, violet, gold)
 * rotate around a glowing gradient core that displays the user's
 * initials. Below the scene the full name appears in brand gradient
 * type, and a row of pulsing dots indicates loading. A "Skip" button
 * sits in the top-right. The overlay auto-dismisses after 5.2 s and
 * fades out via Framer Motion's exit animation, then the parent
 * unmounts it and never shows it again until `localStorage` is cleared.
 */
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiCode } from 'react-icons/fi';
import { PERSONAL } from '@constants/data';

const AUTO_DISMISS_MS = 5200;

interface SplashScreenProps {
  onDismiss: () => void;
}

const RING_BASE =
  'absolute inset-0 rounded-full border-2 border-transparent [will-change:transform]';

export const SplashScreen = ({ onDismiss }: SplashScreenProps): JSX.Element => {
  useEffect(() => {
    const dismissTimer = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(dismissTimer);
  }, [onDismiss]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — loading portfolio"
      aria-busy="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-splash grid place-items-center isolate cursor-none bg-[radial-gradient(ellipse_at_center,rgba(11,16,36,0.97)_0%,rgba(5,8,22,1)_75%)]"
    >
      <div className="relative w-[220px] h-[220px] [perspective:1200px] [transform-style:preserve-3d] max-[480px]:w-[172px] max-[480px]:h-[172px]">
        <div
          className={`${RING_BASE} animate-ring-yaw`}
          style={{
            background:
              'linear-gradient(rgba(5, 8, 22, 0), rgba(5, 8, 22, 0)) padding-box, linear-gradient(135deg, #3b82f6 0%, rgba(59, 130, 246, 0) 60%) border-box',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.55)',
          }}
        />
        <div
          className={`${RING_BASE} animate-ring-pitch`}
          style={{
            background:
              'linear-gradient(rgba(5, 8, 22, 0), rgba(5, 8, 22, 0)) padding-box, linear-gradient(135deg, #a855f7 0%, rgba(168, 85, 247, 0) 60%) border-box',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.55)',
          }}
        />
        <div
          className={`${RING_BASE} animate-ring-roll`}
          style={{
            background:
              'linear-gradient(rgba(5, 8, 22, 0), rgba(5, 8, 22, 0)) padding-box, linear-gradient(135deg, #6366f1 0%, rgba(99, 102, 241, 0) 60%) border-box',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.55)',
          }}
        />
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 w-[88px] h-[88px] -mt-11 -ml-11 rounded-full bg-brand grid place-items-center text-white text-[2.5rem] animate-core-pulse [&>svg]:w-[1em] [&>svg]:h-[1em] [&>svg]:[filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.35))] max-[480px]:w-[72px] max-[480px]:h-[72px] max-[480px]:-mt-9 max-[480px]:-ml-9 max-[480px]:text-[2.1rem]"
        >
          <FiCode aria-hidden="true" />
        </motion.div>
      </div>

      <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 text-center flex flex-col items-center gap-3.5 w-max max-w-[92vw]">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-display font-bold text-[clamp(1.2rem,2.4vw,1.65rem)] tracking-[0.04em] bg-brand bg-clip-text text-transparent"
        >
          {PERSONAL.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="font-display font-normal italic text-[clamp(0.95rem,1.7vw,1.15rem)] text-text-muted tracking-[0.02em] m-0 [&_em]:not-italic [&_em]:font-bold [&_em]:bg-brand [&_em]:bg-clip-text [&_em]:text-transparent [&_em]:mr-1"
        >
          <em>Welcome</em> — let&apos;s build something brilliant.
        </motion.p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-7 right-7 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-text-muted px-3.5 py-2 rounded-pill border border-border bg-white/[0.03] backdrop-blur-md transition-[color,border-color,background] duration-200 hover:text-text hover:border-primary hover:bg-primary/10 max-[480px]:top-[18px] max-[480px]:right-[18px]"
      >
        Skip →
      </button>
    </motion.div>
  );
}

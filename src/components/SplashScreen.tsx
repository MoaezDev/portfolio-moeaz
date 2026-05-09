/**
 * SplashScreen — first-visit welcome overlay.
 *
 * Composition (top to bottom):
 *   1. A central Lottie animation loaded from /splash.json (lazy fetch
 *      so the JSON is a static asset, not bundled JS).
 *   2. The user's name in brand-gradient type.
 *   3. A typewriter-cycled multilingual greeting.
 *   4. A thin gradient progress bar at the bottom that fills in sync
 *      with the splash duration.
 *   5. A "Skip" button in the top-right.
 *
 * Tap anywhere on the overlay (outside the skip button) also dismisses
 * the splash early. The whole thing auto-dismisses after AUTO_DISMISS_MS
 * and fades out via the parent's AnimatePresence.
 */
import { motion } from 'framer-motion';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { PERSONAL } from '@constants/data';
import { useTypewriter } from '@hooks/useTypewriter';

const AUTO_DISMISS_MS = 5200;
const LOTTIE_URL = '/splash.json';

const GREETINGS = [
  'Welcome to my portfolio',
  'Welcome to my craft',
  'Welcome to my world',
];

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen = ({ onDismiss }: SplashScreenProps): JSX.Element => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [progress, setProgress] = useState(0);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const greeting = useTypewriter(GREETINGS, { typeSpeed: 70, deleteSpeed: 40, pauseMs: 900 });

  useEffect(() => {
    const dismissTimer = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(dismissTimer);
  }, [onDismiss]);

  useEffect(() => {
    const startedAt = Date.now();
    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const pct = Math.min(100, (elapsed / AUTO_DISMISS_MS) * 100);
      setProgress(pct);
      if (pct >= 100) window.clearInterval(intervalId);
    }, 60);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(LOTTIE_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data === 'object' && 'layers' in data) {
          setAnimationData(data as object);
        }
      })
      .catch(() => {
        // Splash still works without the Lottie — fall back to the gradient core.
      });
    return () => {
      cancelled = true;
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
      onClick={onDismiss}
      className="fixed inset-0 z-splash grid place-items-center isolate cursor-pointer bg-[radial-gradient(ellipse_at_center,rgba(11,16,36,0.97)_0%,rgba(5,8,22,1)_75%)]"
    >
      <div className="flex flex-col items-center gap-6 px-6 max-w-[92vw]">
        <div className="relative w-[440px] h-[440px] grid place-items-center max-md:w-[360px] max-md:h-[360px] max-[480px]:w-[280px] max-[480px]:h-[280px]">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-brand opacity-20 blur-3xl"
          />
          {animationData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop
              autoplay
              className="relative w-full h-full"
            />
          )}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display font-bold text-[clamp(1.4rem,3vw,2rem)] tracking-[0.04em] bg-brand bg-clip-text text-transparent text-center"
        >
          {PERSONAL.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          aria-live="polite"
          className="font-display font-normal text-[clamp(1.05rem,1.9vw,1.35rem)] text-text-muted tracking-[0.02em] m-0 min-h-[1.6em] text-center"
        >
          <span className="font-semibold bg-brand bg-clip-text text-transparent">
            {greeting}
          </span>
          <span className="text-primary ml-0.5 animate-caret-blink">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-[280px] max-w-full mt-2"
        >
          <div className="flex justify-between mb-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-text-muted">
            <span>Loading…</span>
            <span className="tabular-nums text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-pill bg-white/[0.06] border border-border overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-brand rounded-pill shadow-glow-blue transition-[width] duration-[60ms] ease-linear"
            />
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDismiss();
        }}
        className="absolute top-7 right-7 font-mono text-[0.74rem] tracking-[0.22em] uppercase text-text-muted px-3.5 py-2 rounded-pill border border-border bg-white/[0.03] backdrop-blur-md transition-[color,border-color,background] duration-200 hover:text-text hover:border-primary hover:bg-primary/10 max-[480px]:top-[18px] max-[480px]:right-[18px] z-[1]"
      >
        Skip →
      </button>

    </motion.div>
  );
};

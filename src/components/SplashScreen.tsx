/**
 * SplashScreen — first-visit welcome overlay.
 *
 * Visual: three perpendicular CSS-3D rings (electric blue, violet, gold)
 * rotate around a glowing gradient core that displays the user's
 * initials. Below the scene the full name appears in brand gradient
 * type, and a row of pulsing dots indicates loading. A "Skip" button
 * sits in the top-right. The overlay auto-dismisses after 2.8 s and
 * fades out via Framer Motion's exit animation, then the parent
 * unmounts it and never shows it again until `localStorage` is cleared.
 *
 * Why CSS 3D and not Three.js / Spline?
 *   - The whole effect is ~70 LOC, runs on the GPU compositor and adds
 *     zero KB to the bundle.
 *
 * To swap in a Spline scene instead:
 *   1. yarn add @splinetool/react-spline @splinetool/runtime
 *   2. import Spline from '@splinetool/react-spline';
 *   3. Replace the entire <Scene>…</Scene> block with:
 *        <Spline scene="https://prod.spline.design/<your-id>/scene.splinecode" />
 *   4. Lazy-load it (React.lazy + Suspense) so the splash itself stays
 *      lightweight on first paint.
 */
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiCode } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';
import { PERSONAL } from '@constants/data';

const AUTO_DISMISS_MS = 5200;
const SCENE_SIZE_PX = 220;

interface SplashScreenProps {
  onDismiss: () => void;
}

const ringYaw = keyframes`
  from { transform: rotateX(72deg) rotateY(0deg); }
  to   { transform: rotateX(72deg) rotateY(360deg); }
`;

const ringPitch = keyframes`
  from { transform: rotateY(72deg) rotateX(0deg); }
  to   { transform: rotateY(72deg) rotateX(360deg); }
`;

const ringRoll = keyframes`
  from { transform: rotateZ(0deg) rotateX(45deg) rotateY(45deg); }
  to   { transform: rotateZ(360deg) rotateX(45deg) rotateY(45deg); }
`;

const corePulse = keyframes`
  0%, 100% { box-shadow: 0 0 28px rgba(168, 85, 247, 0.7), 0 0 60px rgba(59, 130, 246, 0.45); }
  50%      { box-shadow: 0 0 44px rgba(168, 85, 247, 0.9), 0 0 80px rgba(59, 130, 246, 0.6); }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: radial-gradient(
    ellipse at center,
    rgba(11, 16, 36, 0.97) 0%,
    rgba(5, 8, 22, 1) 75%
  );
  isolation: isolate;
  cursor: none;
`;

const Scene = styled.div`
  position: relative;
  width: ${SCENE_SIZE_PX}px;
  height: ${SCENE_SIZE_PX}px;
  perspective: 1200px;
  transform-style: preserve-3d;

  @media (max-width: 480px) {
    width: ${SCENE_SIZE_PX * 0.78}px;
    height: ${SCENE_SIZE_PX * 0.78}px;
  }
`;

interface RingProps {
  $animation: ReturnType<typeof keyframes>;
  $duration: number;
  $color: string;
  $glow: string;
}

const Ring = styled.div<RingProps>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  background:
    linear-gradient(rgba(5, 8, 22, 0), rgba(5, 8, 22, 0)) padding-box,
    ${({ $color }) => $color} border-box;
  box-shadow: 0 0 30px ${({ $glow }) => $glow};
  animation: ${({ $animation }) => $animation} ${({ $duration }) => $duration}s linear infinite;
  will-change: transform;
`;

const Core = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 88px;
  height: 88px;
  margin-top: -44px;
  margin-left: -44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.brand};
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 2.5rem;
  animation: ${corePulse} 3.2s ease-in-out infinite;

  & > svg {
    width: 1em;
    height: 1em;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 480px) {
    width: 72px;
    height: 72px;
    margin-top: -36px;
    margin-left: -36px;
    font-size: 2.1rem;
  }
`;

const Branding = styled.div`
  position: absolute;
  bottom: 16%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: max-content;
  max-width: 92vw;
`;

const Name = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: clamp(1.2rem, 2.4vw, 1.65rem);
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.04em;
`;

const WelcomeLine = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-style: italic;
  font-size: clamp(0.95rem, 1.7vw, 1.15rem);
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.02em;
  margin: 0;

  & em {
    font-style: normal;
    font-weight: 700;
    background: ${({ theme }) => theme.gradients.brand};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-right: 4px;
  }
`;

const Skip = styled.button`
  position: absolute;
  top: 28px;
  right: 28px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(6px);
  transition: color 0.2s, border-color 0.2s, background 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 480px) {
    top: 18px;
    right: 18px;
  }
`;

export function SplashScreen({ onDismiss }: SplashScreenProps): JSX.Element {
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
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — loading portfolio"
      aria-busy="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <Scene>
        <Ring
          $animation={ringYaw}
          $duration={7}
          $color="linear-gradient(135deg, #3b82f6 0%, rgba(59, 130, 246, 0) 60%)"
          $glow="rgba(59, 130, 246, 0.55)"
        />
        <Ring
          $animation={ringPitch}
          $duration={8.5}
          $color="linear-gradient(135deg, #a855f7 0%, rgba(168, 85, 247, 0) 60%)"
          $glow="rgba(168, 85, 247, 0.55)"
        />
        <Ring
          $animation={ringRoll}
          $duration={10}
          $color="linear-gradient(135deg, #6366f1 0%, rgba(99, 102, 241, 0) 60%)"
          $glow="rgba(99, 102, 241, 0.55)"
        />
        <Core
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <FiCode aria-hidden="true" />
        </Core>
      </Scene>

      <Branding>
        <Name
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {PERSONAL.name}
        </Name>
        <WelcomeLine
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <em>Welcome</em> — let&apos;s build something brilliant.
        </WelcomeLine>
      </Branding>

      <Skip type="button" onClick={onDismiss}>
        Skip →
      </Skip>
    </Overlay>
  );
}

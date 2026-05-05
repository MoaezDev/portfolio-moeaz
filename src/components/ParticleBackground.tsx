/**
 * ParticleBackground — full-bleed animated particle field rendered behind
 * the hero section. Uses tsparticles' slim bundle so we ship a small subset
 * of features (links + repulse on hover).
 */
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

export function ParticleBackground(): JSX.Element {
  const init = useCallback(async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      init={init}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            resize: true,
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.4 } },
          },
        },
        particles: {
          number: { value: 70, density: { enable: true, area: 900 } },
          color: { value: ['#3b82f6', '#a855f7', '#f5c46b'] },
          links: {
            enable: true,
            color: '#5b6cff',
            distance: 140,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none',
            outModes: { default: 'bounce' },
          },
          opacity: {
            value: { min: 0.2, max: 0.7 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 1.4, sync: false },
          },
          shape: { type: 'circle' },
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: 40 },
                links: { distance: 110 },
              },
            },
          },
          {
            maxWidth: 480,
            options: {
              particles: {
                number: { value: 26 },
                links: { distance: 90, opacity: 0.15 },
              },
            },
          },
        ],
      }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}

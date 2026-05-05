/**
 * Centralised design tokens — colours, gradients, spacing, motion easings.
 * Consumed via styled-components ThemeProvider; never duplicate values inline.
 */

const theme = {
  colors: {
    background: '#06081a',
    backgroundAlt: '#0b1024',
    surface: 'rgba(18, 22, 48, 0.65)',
    surfaceSolid: '#101633',
    border: 'rgba(132, 142, 200, 0.18)',
    text: '#e7ecff',
    textMuted: '#a3acd6',
    textDim: '#6c759b',
    primary: '#3b82f6',
    primaryGlow: 'rgba(59, 130, 246, 0.55)',
    accent: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.55)',
    gold: '#f5c46b',
    goldGlow: 'rgba(245, 196, 107, 0.45)',
    danger: '#ff5c8a',
  },
  gradients: {
    brand: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
    brandSoft:
      'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(168, 85, 247, 0.18) 100%)',
    accentBlue: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
    accentViolet: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
    accentGold: 'linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)',
    radialGlow:
      'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.22), transparent 50%), radial-gradient(circle at 80% 60%, rgba(168,85,247,0.20), transparent 55%)',
  },
  shadows: {
    glowBlue: '0 0 30px rgba(59, 130, 246, 0.35)',
    glowViolet: '0 0 35px rgba(168, 85, 247, 0.35)',
    glowGold: '0 0 30px rgba(245, 196, 107, 0.25)',
    card: '0 18px 50px -20px rgba(7, 9, 24, 0.75)',
  },
  fonts: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    display: '"Sora", "Inter", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '22px',
    pill: '999px',
  },
  spacing: (unit: number): string => `${unit * 4}px`,
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  motion: {
    easeOutSoft: [0.16, 1, 0.3, 1] as [number, number, number, number],
    spring: { type: 'spring', stiffness: 120, damping: 18 } as const,
  },
  z: {
    base: 1,
    nav: 50,
    cursor: 100,
    overlay: 80,
  },
};

export type AppTheme = typeof theme;
export default theme;

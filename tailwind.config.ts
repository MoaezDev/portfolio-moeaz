import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        surface: 'var(--color-surface)',
        'surface-solid': 'var(--color-surface-solid)',
        glass: 'var(--color-glass)',
        'glass-strong': 'var(--color-glass-strong)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-dim': 'var(--color-text-dim)',
        primary: '#3b82f6',
        accent: '#a855f7',
        gold: '#f5c46b',
        danger: '#ff5c8a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '22px',
        pill: '999px',
      },
      backgroundImage: {
        brand: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
        'brand-soft':
          'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(168, 85, 247, 0.18) 100%)',
        'accent-indigo': 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
        'accent-emerald': 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
        'accent-amber': 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
        'accent-rose': 'linear-gradient(135deg, #e11d48 0%, #fb7185 100%)',
        'accent-sky': 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
        'radial-glow': 'var(--bg-radial-glow)',
      },
      boxShadow: {
        'glow-blue': '0 0 18px rgba(59, 130, 246, 0.18)',
        'glow-violet': '0 0 22px rgba(168, 85, 247, 0.18)',
        'glow-indigo': '0 0 30px rgba(99, 102, 241, 0.35)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.35)',
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.30)',
        'glow-rose': '0 0 30px rgba(244, 63, 94, 0.35)',
        'glow-sky': '0 0 30px rgba(14, 165, 233, 0.35)',
        card: '0 18px 50px -20px rgba(7, 9, 24, 0.75)',
      },
      zIndex: {
        nav: '50',
        overlay: '80',
        cursor: '100',
        splash: '200',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-large': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'avatar-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 22px rgba(59, 130, 246, 0.32), 0 0 60px rgba(168, 85, 247, 0.14)',
          },
          '50%': {
            boxShadow:
              '0 0 34px rgba(168, 85, 247, 0.38), 0 0 80px rgba(59, 130, 246, 0.20)',
          },
        },
        'core-pulse': {
          '0%, 100%': {
            boxShadow:
              '0 0 28px rgba(168, 85, 247, 0.7), 0 0 60px rgba(59, 130, 246, 0.45)',
          },
          '50%': {
            boxShadow:
              '0 0 44px rgba(168, 85, 247, 0.9), 0 0 80px rgba(59, 130, 246, 0.6)',
          },
        },
        'ring-yaw': {
          from: { transform: 'rotateX(72deg) rotateY(0deg)' },
          to: { transform: 'rotateX(72deg) rotateY(360deg)' },
        },
        'ring-pitch': {
          from: { transform: 'rotateY(72deg) rotateX(0deg)' },
          to: { transform: 'rotateY(72deg) rotateX(360deg)' },
        },
        'ring-roll': {
          from: { transform: 'rotateZ(0deg) rotateX(45deg) rotateY(45deg)' },
          to: { transform: 'rotateZ(360deg) rotateX(45deg) rotateY(45deg)' },
        },
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'caret-blink': {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-soft': 'float-soft 7s ease-in-out infinite',
        'float-large': 'float-large 6s ease-in-out infinite',
        'avatar-glow': 'avatar-glow 4s ease-in-out infinite',
        'avatar-float-glow':
          'float-large 6s ease-in-out infinite, avatar-glow 4s ease-in-out infinite',
        'core-pulse': 'core-pulse 3.2s ease-in-out infinite',
        'ring-yaw': 'ring-yaw 7s linear infinite',
        'ring-pitch': 'ring-pitch 8.5s linear infinite',
        'ring-roll': 'ring-roll 10s linear infinite',
        'marquee-scroll': 'marquee-scroll 38s linear infinite',
        'marquee-scroll-fast': 'marquee-scroll 30s linear infinite',
        'caret-blink': 'caret-blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;

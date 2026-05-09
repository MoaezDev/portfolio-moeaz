/**
 * useTheme — owns the active color theme. Defaults to dark on first
 * visit, then persists whatever the user toggles to in localStorage.
 * Toggling adds/removes a `light` class on <html>; CSS variables in
 * index.css and Tailwind tokens that reference them swap automatically.
 */
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

const readStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
};

interface UseThemeResult {
  theme: Theme;
  toggle: () => void;
  setTheme: (next: Theme) => void;
}

export function useTheme(): UseThemeResult {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback((): void => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle, setTheme: setThemeState };
}

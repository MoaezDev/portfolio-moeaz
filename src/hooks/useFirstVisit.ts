/**
 * useFirstVisit — returns whether this is the user's first visit to the
 * site (read from `localStorage` on mount) plus a callback to mark the
 * visit complete. Falls back to "not first" if storage is unavailable
 * (private mode, sandboxed iframe, etc.) so the splash never blocks the
 * page in degraded environments.
 *
 * Reset during development with:
 *   localStorage.removeItem('portfolio-moaez:visited')
 */
import { useCallback, useState } from 'react';

const STORAGE_KEY = 'portfolio-moaez:visited';

interface FirstVisitState {
  isFirstVisit: boolean;
  markVisited: () => void;
}

export function useFirstVisit(): FirstVisitState {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== '1';
    } catch {
      return false;
    }
  });

  const markVisited = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage unavailable; fail silently
    }
    setIsFirstVisit(false);
  }, []);

  return { isFirstVisit, markVisited };
}

/**
 * Tracks the current mouse position in viewport coordinates.
 * Used by the custom cursor to render its glowing trail.
 */
import { useEffect, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (event: MouseEvent): void => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}

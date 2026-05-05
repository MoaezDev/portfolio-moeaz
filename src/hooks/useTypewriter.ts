/**
 * Typewriter effect hook — cycles through `phrases`, typing each character
 * forward then erasing back, returning the current display string.
 */
import { useEffect, useState } from 'react';

interface TypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

export function useTypewriter(phrases: string[], options: TypewriterOptions = {}): string {
  const { typeSpeed = 80, deleteSpeed = 40, pauseMs = 1400 } = options;
  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return undefined;

    const currentPhrase = phrases[phraseIndex % phrases.length];
    const isPhraseComplete = !isDeleting && displayed === currentPhrase;
    const isPhraseErased = isDeleting && displayed === '';

    if (isPhraseComplete) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pauseTimer);
    }

    if (isPhraseErased) {
      setIsDeleting(false);
      setPhraseIndex((index) => index + 1);
      return undefined;
    }

    const tickTimer = setTimeout(
      () => {
        setDisplayed((current) =>
          isDeleting ? current.slice(0, -1) : currentPhrase.slice(0, current.length + 1),
        );
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(tickTimer);
  }, [displayed, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

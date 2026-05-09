/**
 * ThemeToggle — floating bottom-right button that flips between dark
 * and light themes. Sun icon when dark (click → go light), moon icon
 * when light (click → go dark).
 */
import { AnimatePresence, motion } from 'framer-motion';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '@hooks/useTheme';

export const ThemeToggle = (): JSX.Element => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? LuSun : LuMoon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="fixed bottom-6 right-6 z-overlay grid place-items-center w-12 h-12 rounded-full border border-border bg-glass backdrop-blur-md text-text shadow-card transition-[transform,box-shadow,background] duration-200 hover:scale-110 hover:shadow-glow-blue max-sm:bottom-4 max-sm:right-4 max-sm:w-11 max-sm:h-11"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex"
        >
          <Icon className="text-xl" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

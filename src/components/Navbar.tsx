/**
 * Navbar — sticky glassmorphism navigation that highlights the active
 * section, animates an underline beneath it, and exposes a mobile menu
 * toggle for narrow viewports.
 */
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi';
import { useActiveSection } from '@hooks/useActiveSection';
import { NAV_LINKS, PERSONAL } from '@constants/data';
import { scrollToSection } from '@utils/scroll';

export const Navbar = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));

  const handleNavigate = (id: string): void => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-nav flex justify-center px-6 py-4 pointer-events-none max-sm:px-3.5 max-sm:py-3">
      <nav className="pointer-events-auto flex items-center justify-between gap-8 w-full max-w-[1100px] px-[22px] py-3 rounded-pill bg-glass border border-border backdrop-blur-[18px] shadow-[0_10px_35px_-18px_rgba(7,9,24,0.85)] max-sm:px-4 max-sm:py-2.5 max-sm:gap-3 relative">
        <button
          type="button"
          onClick={() => handleNavigate('hero')}
          aria-label="Scroll to top"
          className="font-display font-extrabold text-[1.05rem] tracking-[0.04em] whitespace-nowrap bg-brand bg-clip-text text-transparent max-sm:text-[0.98rem]"
        >
          {PERSONAL.shortName}.dev
        </button>

        <ul
          className={clsx(
            'flex list-none gap-2 items-center max-md:absolute max-md:top-[calc(100%+10px)] max-md:right-3.5 max-md:left-auto max-md:flex-col max-md:items-stretch max-md:bg-glass-strong max-md:border max-md:border-border max-md:backdrop-blur-[14px] max-md:rounded-lg max-md:p-2.5 max-md:min-w-[200px] max-md:max-w-[calc(100vw-28px)] max-md:origin-top-right max-md:transition-all max-md:duration-200 max-md:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)]',
            menuOpen
              ? 'max-md:scale-100 max-md:opacity-100 max-md:pointer-events-auto'
              : 'max-md:scale-95 max-md:opacity-0 max-md:pointer-events-none',
          )}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className={clsx(
                    'relative w-full text-left px-3.5 py-2 text-[0.92rem] transition-colors duration-200 hover:text-text',
                    isActive ? 'text-text font-semibold' : 'text-text-muted font-medium',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 bottom-0.5 h-0.5 rounded-sm bg-brand shadow-glow-blue"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="hidden max-md:inline-flex text-[1.6rem] text-text"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt4 />}
        </button>
      </nav>
    </header>
  );
}

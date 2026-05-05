/**
 * Navbar — sticky glassmorphism navigation that highlights the active
 * section, animates an underline beneath it, and exposes a mobile menu
 * toggle for narrow viewports.
 */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi';
import styled from 'styled-components';
import { useActiveSection } from '@hooks/useActiveSection';
import { NAV_LINKS, PERSONAL } from '@constants/data';
import { scrollToSection } from '@utils/scroll';

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.z.nav};
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px 14px;
  }
`;

const Glass = styled.nav`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  max-width: 1100px;
  padding: 12px 22px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(11, 16, 36, 0.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 35px -18px rgba(7, 9, 24, 0.85);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 10px 16px;
    gap: 12px;
  }
`;

const Brand = styled.button`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: 1.05rem;
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.04em;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.98rem;
  }
`;

const Links = styled.ul<{ $open: boolean }>`
  display: flex;
  list-style: none;
  gap: 8px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    top: calc(100% + 10px);
    right: 14px;
    left: auto;
    flex-direction: column;
    align-items: stretch;
    background: rgba(11, 16, 36, 0.94);
    border: 1px solid ${({ theme }) => theme.colors.border};
    backdrop-filter: blur(14px);
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 10px;
    min-width: 200px;
    max-width: calc(100vw - 28px);
    transform-origin: top right;
    transform: ${({ $open }) => ($open ? 'scale(1)' : 'scale(0.95)')};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: all 0.2s ease;
    box-shadow: 0 12px 40px -16px rgba(0, 0, 0, 0.6);
  }
`;

const LinkItem = styled.li`
  position: relative;
`;

const LinkButton = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 8px 14px;
  font-size: 0.92rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: color 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Underline = styled(motion.span)`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.gradients.brand};
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
`;

const MenuToggle = styled.button`
  display: none;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`;

export function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));

  const handleNavigate = (id: string): void => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <Bar>
      <Glass>
        <Brand onClick={() => handleNavigate('hero')} aria-label="Scroll to top">
          {PERSONAL.shortName}.dev
        </Brand>

        <Links $open={menuOpen}>
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <LinkItem key={link.id}>
                <LinkButton $active={isActive} onClick={() => handleNavigate(link.id)}>
                  {link.label}
                  {isActive && <Underline layoutId="nav-underline" />}
                </LinkButton>
              </LinkItem>
            );
          })}
        </Links>

        <MenuToggle
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt4 />}
        </MenuToggle>
      </Glass>
    </Bar>
  );
}

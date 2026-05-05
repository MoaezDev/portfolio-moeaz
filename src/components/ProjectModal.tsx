/**
 * ProjectModal — accessible details overlay for a single project. Closes
 * on backdrop click or Escape; uses Framer Motion for fade + scale entry.
 */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import styled from 'styled-components';
import type { Project } from '@constants/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.overlay};
  background: rgba(4, 6, 18, 0.78);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 14px;
    align-items: end;
  }
`;

const Dialog = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 620px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surfaceSolid};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 32px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 20px;
    max-height: calc(100vh - 28px);
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h3`
  font-size: 1.6rem;
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Description = styled.p`
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin-top: 20px;
`;

const Tag = styled.li`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.brandSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export function ProjectModal({ project, onClose }: ProjectModalProps): JSX.Element {
  useEffect(() => {
    if (!project) return undefined;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <Dialog
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
          >
            <CloseBtn type="button" onClick={onClose} aria-label="Close project details">
              <HiOutlineX />
            </CloseBtn>
            <Title id={`modal-title-${project.id}`}>{project.title}</Title>
            <Description>{project.description}</Description>
            <Tags>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          </Dialog>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

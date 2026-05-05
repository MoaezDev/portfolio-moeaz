/**
 * ProjectCard — 3D tilt card showing a single project's headline info.
 * Click opens a detail modal handled by the parent. Accent colour comes
 * from the project's `accent` field.
 */
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import styled, { css } from 'styled-components';
import type { Project, ProjectAccent } from '@constants/data';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  tilt?: boolean;
}

const accentTint = (accent: ProjectAccent) => css`
  ${({ theme }) => {
    if (accent === 'violet') return theme.gradients.accentViolet;
    if (accent === 'gold') return theme.gradients.accentGold;
    return theme.gradients.accentBlue;
  }};
`;

const accentGlow = (accent: ProjectAccent) => css`
  ${({ theme }) => {
    if (accent === 'violet') return theme.shadows.glowViolet;
    if (accent === 'gold') return theme.shadows.glowGold;
    return theme.shadows.glowBlue;
  }};
`;

const Wrapper = styled(motion.button)<{ $accent: ProjectAccent }>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 26px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(14px);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: ${({ $accent }) => accentTint($accent)};
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: ${({ $accent }) => accentGlow($accent)};
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Highlight = styled.span<{ $accent: ProjectAccent }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  align-self: flex-start;
  background: ${({ $accent }) => accentTint($accent)};
  color: #06081a;
  font-weight: 700;
`;

const Title = styled.h3`
  margin-top: 16px;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Summary = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin-top: 18px;
`;

const Tag = styled.li`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TILT_OPTIONS = {
  reverse: false,
  max: 12,
  perspective: 1000,
  scale: 1.02,
  speed: 800,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.16,1,.3,1)',
};

export function ProjectCard({
  project,
  onOpen,
  tilt = true,
}: ProjectCardProps): JSX.Element {
  const card = (
    <Wrapper
      type="button"
      $accent={project.accent}
      onClick={() => onOpen(project)}
      whileTap={{ scale: 0.98 }}
      aria-label={`Open details for ${project.title}`}
    >
      <Highlight $accent={project.accent}>{project.highlight}</Highlight>
      <Title>{project.title}</Title>
      <Summary>{project.summary}</Summary>
      <Tags>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </Wrapper>
  );

  if (!tilt) return card;

  return (
    <Tilt options={TILT_OPTIONS} style={{ height: '100%', width: '100%' }}>
      {card}
    </Tilt>
  );
}

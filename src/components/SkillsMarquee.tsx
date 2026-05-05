/**
 * SkillsMarquee — full-bleed horizontal banner that scrolls every skill
 * across the screen in an infinite loop. The track is rendered twice and
 * translated by exactly -50% so the join is seamless. Hover pauses the
 * animation; edge masks fade items in/out at the borders. Decorative —
 * the duplicate copy is `aria-hidden` so screen readers only encounter
 * each skill once.
 */
import styled, { keyframes } from 'styled-components';
import { SKILL_GROUPS } from '@constants/data';

const ALL_SKILLS: string[] = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => skill.name),
);

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Strip = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 28px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background:
    linear-gradient(
      90deg,
      rgba(11, 16, 36, 0.4) 0%,
      rgba(18, 22, 48, 0.55) 50%,
      rgba(11, 16, 36, 0.4) 100%
    );
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
`;

const Track = styled.div`
  display: flex;
  gap: 48px;
  width: max-content;
  animation: ${scroll} 38s linear infinite;
  will-change: transform;

  ${Strip}:hover & {
    animation-play-state: paused;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 28px;
    animation-duration: 30s;
  }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(6px);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &::before {
    content: '✦';
    color: ${({ theme }) => theme.colors.gold};
    font-size: 0.78rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glowBlue};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 16px;
    font-size: 0.84rem;
  }
`;

export function SkillsMarquee(): JSX.Element {
  return (
    <Strip aria-label="Skills marquee">
      <Track>
        {ALL_SKILLS.map((skill) => (
          <Pill key={skill}>{skill}</Pill>
        ))}
        {ALL_SKILLS.map((skill) => (
          <Pill key={`dup-${skill}`} aria-hidden="true">
            {skill}
          </Pill>
        ))}
      </Track>
    </Strip>
  );
}

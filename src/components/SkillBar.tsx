/**
 * SkillBar — labelled horizontal proficiency bar that fills from 0 → level%
 * the first time it scrolls into view, with a soft electric-blue glow.
 */
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface SkillBarProps {
  name: string;
  level: number;
}

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Fill = styled(motion.div)`
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.brand};
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};
`;

export function SkillBar({ name, level }: SkillBarProps): JSX.Element {
  const clampedLevel = Math.max(0, Math.min(100, level));
  return (
    <Row>
      <Label>
        <span>{name}</span>
        <span>{clampedLevel}%</span>
      </Label>
      <Track>
        <Fill
          initial={{ width: 0 }}
          whileInView={{ width: `${clampedLevel}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </Track>
    </Row>
  );
}

/**
 * Skills — grid of grouped skill cards. Each skill renders an animated
 * proficiency bar that fills the first time it scrolls into view.
 */
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { SectionWrapper } from '@components/SectionWrapper';
import { SkillBar } from '@components/SkillBar';
import { SKILL_GROUPS } from '@constants/data';
import { fadeLeft, fadeRight, staggerParent } from '@utils/motion';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const GroupCard = styled(motion.div)`
  padding: 26px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  min-width: 0;

  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: ${({ theme }) => theme.shadows.glowBlue};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px;
    gap: 14px;
  }
`;

const GroupTitle = styled.h3`
  font-size: 1.05rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: 0.08em;
`;

export function Skills(): JSX.Element {
  return (
    <SectionWrapper id="skills" eyebrow="Skills" title="Tools I work with">
      <Grid
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SKILL_GROUPS.map((group, groupIndex) => (
          <GroupCard
            key={group.title}
            variants={groupIndex % 2 === 0 ? fadeLeft : fadeRight}
          >
            <GroupTitle>{group.title}</GroupTitle>
            {group.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </GroupCard>
        ))}
      </Grid>
    </SectionWrapper>
  );
}

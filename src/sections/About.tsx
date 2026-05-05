/**
 * About — narrative bio paired with an education panel. Both columns
 * fade up on scroll into view.
 */
import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
import styled from 'styled-components';
import { SectionWrapper } from '@components/SectionWrapper';
import { ABOUT, EDUCATION } from '@constants/data';
import { fadeUp, staggerParent } from '@utils/motion';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const Lead = styled(motion.h3)`
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  margin-bottom: 22px;
  color: ${({ theme }) => theme.colors.text};
`;

const Body = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 16px;
  font-size: 1.02rem;
`;

const EducationCard = styled(motion.div)`
  position: relative;
  padding: 28px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(14px);
  box-shadow: ${({ theme }) => theme.shadows.card};
  animation: float 7s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px;
  }
`;

const EducationLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 18px;
`;

const School = styled.h4`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Degree = styled.p`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Period = styled.p`
  margin-top: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Detail = styled.p`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

export function About(): JSX.Element {
  const primaryEducation = EDUCATION[0];

  return (
    <SectionWrapper id="about" eyebrow="About" title="Who I am">
      <Grid
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <Lead variants={fadeUp}>{ABOUT.headline}</Lead>
          {ABOUT.body.map((paragraph) => (
            <Body key={paragraph.slice(0, 24)} variants={fadeUp}>
              {paragraph}
            </Body>
          ))}
        </div>

        {primaryEducation && (
          <EducationCard variants={fadeUp}>
            <EducationLabel>
              <FiBookOpen aria-hidden="true" />
              <span>Education</span>
            </EducationLabel>
            <School>{primaryEducation.school}</School>
            <Degree>{primaryEducation.degree}</Degree>
            <Period>{primaryEducation.period}</Period>
            <Detail>{primaryEducation.detail}</Detail>
          </EducationCard>
        )}
      </Grid>
    </SectionWrapper>
  );
}

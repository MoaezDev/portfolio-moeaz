/**
 * SectionWrapper — gives every page section consistent vertical rhythm,
 * a stable id anchor, and a reveal-on-scroll animation. Children render
 * inside a centred max-width container.
 */
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { fadeUp } from '@utils/motion';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  eyebrow?: string;
  title?: string;
}

const Section = styled.section`
  position: relative;
  padding: 120px 24px;
  scroll-margin-top: 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 80px 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 64px 16px;
  }
`;

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 56px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 36px;
  }
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.gradients.brandSoft};
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  margin-top: 18px;
  font-size: clamp(1.7rem, 4vw, 2.75rem);
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export function SectionWrapper({
  id,
  children,
  eyebrow,
  title,
}: SectionWrapperProps): JSX.Element {
  return (
    <Section id={id}>
      <Inner>
        {(eyebrow || title) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <Header>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && <Title>{title}</Title>}
            </Header>
          </motion.div>
        )}
        {children}
      </Inner>
    </Section>
  );
}

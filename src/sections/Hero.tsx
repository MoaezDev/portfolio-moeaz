/**
 * Hero — full-screen landing section with floating particles, an animated
 * typewritten role title, the avatar badge, and primary CTAs.
 */
import { motion } from 'framer-motion';
import { FiArrowDownCircle } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import styled from 'styled-components';
import { AvatarBadge } from '@components/AvatarBadge';
import { Button } from '@components/Button';
import { ParticleBackground } from '@components/ParticleBackground';
import { PERSONAL, ROLE_TYPEWRITER } from '@constants/data';
import { useTypewriter } from '@hooks/useTypewriter';
import { scrollToSection } from '@utils/scroll';

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 120px 24px 80px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 110px 20px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 100px 16px 72px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 60px;
  max-width: 1180px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;

    & > [data-hero-slot='avatar'] {
      order: -1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 24px;
  }
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  background: rgba(245, 196, 107, 0.08);
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(245, 196, 107, 0.25);
  margin-bottom: 22px;
`;

const Headline = styled.h1`
  font-size: clamp(1.9rem, 5.2vw, 4.2rem);
  line-height: 1.1;
  margin-bottom: 18px;
  word-break: break-word;
`;

const Gradient = styled.span`
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const RoleLine = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(0.92rem, 2vw, 1.35rem);
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 28px;
  min-height: 1.6em;
  word-break: break-word;

  & .cursor {
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 2px;
    animation: blink 1s steps(1) infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const Tagline = styled.p`
  max-width: 540px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 36px;
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-inline: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 24px;
  }
`;

const CtaRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 10px;
    width: 100%;

    & > * {
      flex: 1 1 140px;
      justify-content: center;
    }
  }
`;

const AvatarSlot = styled.div`
  display: grid;
  place-items: center;
`;

const ScrollHint = styled(motion.button)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.mono};

  & svg {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export function Hero(): JSX.Element {
  const role = useTypewriter(ROLE_TYPEWRITER);

  return (
    <Wrapper>
      <ParticleBackground />
      <Content>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>Hello, I&apos;m</Eyebrow>
          <Headline>
            <Gradient>{PERSONAL.name}</Gradient>
          </Headline>
          <RoleLine>
            <span>&gt; </span>
            <span>{role}</span>
            <span className="cursor">|</span>
          </RoleLine>
          <Tagline>
            I build elegant cross-platform mobile experiences in Flutter, ship Firebase-powered
            backends, and pair it all with a relentless eye for clean, maintainable code.
          </Tagline>
          <CtaRow>
            <Button onClick={() => scrollToSection('projects')}>View My Work</Button>
            <Button
              variant="ghost"
              href={`mailto:${PERSONAL.email}`}
              icon={<HiOutlineMail />}
            >
              Get In Touch
            </Button>
          </CtaRow>
        </motion.div>

        <motion.div
          data-hero-slot="avatar"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <AvatarSlot>
            <AvatarBadge
              initials={PERSONAL.initials}
              imageSrc={PERSONAL.avatarUrl}
              ariaLabel={PERSONAL.name}
            />
          </AvatarSlot>
        </motion.div>
      </Content>

      <ScrollHint
        type="button"
        onClick={() => scrollToSection('about')}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to next section"
      >
        <span>Scroll</span>
        <FiArrowDownCircle />
      </ScrollHint>
    </Wrapper>
  );
}

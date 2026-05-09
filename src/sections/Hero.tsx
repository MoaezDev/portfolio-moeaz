/**
 * Hero — full-screen landing section with floating particles, an animated
 * typewritten role title, the avatar badge, and primary CTAs.
 */
import { motion } from 'framer-motion';
import { FiArrowDownCircle, FiDownload } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { AvatarBadge } from '@components/AvatarBadge';
import { Button } from '@components/Button';
import { ParticleBackground } from '@components/ParticleBackground';
import { PERSONAL, ROLE_TYPEWRITER } from '@constants/data';
import { useTypewriter } from '@hooks/useTypewriter';
import { scrollToSection } from '@utils/scroll';

export const Hero = (): JSX.Element => {
  const role = useTypewriter(ROLE_TYPEWRITER);

  return (
    <section
      id="hero"
      className="relative min-h-screen grid place-items-center px-6 pt-[120px] pb-20 overflow-hidden max-md:px-5 max-md:pt-[110px] max-sm:px-4 max-sm:pt-[100px] max-sm:pb-[72px]"
    >
      <ParticleBackground />
      <div className="relative z-[1] grid grid-cols-[1.2fr_0.8fr] items-center gap-[60px] max-w-[1180px] w-full max-md:grid-cols-1 max-md:text-center max-md:gap-10 max-md:[&>[data-hero-slot=avatar]]:order-first max-sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block font-mono text-[0.78rem] tracking-[0.18em] uppercase text-gold bg-gold/[0.08] px-3.5 py-1.5 rounded-pill border border-gold/25 mb-[22px]">
            Hello, I&apos;m
          </span>
          <h1 className="text-[clamp(1.9rem,5.2vw,4.2rem)] leading-[1.1] mb-[18px] break-words">
            <span className="bg-brand bg-clip-text text-transparent">{PERSONAL.name}</span>
          </h1>
          <div className="font-mono text-[clamp(0.92rem,2vw,1.35rem)] text-text-muted mb-7 min-h-[1.6em] break-words">
            <span>&gt; </span>
            <span>{role}</span>
            <span className="text-primary ml-0.5 animate-caret-blink">|</span>
          </div>
          <p className="max-w-[540px] text-text-muted mb-9 text-[clamp(0.95rem,1.6vw,1.05rem)] max-md:mx-auto max-sm:mb-6">
            I build polished products for the web and mobile — modern React/Next.js frontends,
            cross-platform apps, and Firebase-powered backends, all paired with a relentless eye
            for clean, maintainable code.
          </p>
          <div className="flex gap-3.5 flex-wrap max-md:justify-center max-sm:gap-2.5 max-sm:w-full max-sm:[&>*]:flex-[1_1_140px] max-sm:[&>*]:justify-center">
            <Button onClick={() => scrollToSection('projects')}>View My Work</Button>
            <Button
              variant="ghost"
              href={PERSONAL.resumeUrl}
              download
              icon={<FiDownload />}
            >
              Download CV
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              icon={<HiOutlineMail />}
            >
              Get In Touch
            </Button>
          </div>
        </motion.div>

        <motion.div
          data-hero-slot="avatar"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid place-items-center">
            <AvatarBadge
              initials={PERSONAL.initials}
              imageSrc={PERSONAL.avatarUrl}
              ariaLabel={PERSONAL.name}
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1] max-sm:bottom-[22px]">
        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll to next section"
          className="inline-flex flex-col items-center gap-1.5 text-text-muted text-[0.78rem] tracking-[0.18em] uppercase font-mono [&>svg]:text-[1.4rem] [&>svg]:text-primary"
        >
          <span>Scroll</span>
          <FiArrowDownCircle />
        </motion.button>
      </div>
    </section>
  );
}

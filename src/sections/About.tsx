/**

* About — narrative bio paired with an education panel. The bio side
 * leads with a brand-gradient headline; the education side is a
 * "diploma" card: large graduation-cap badge, gradient school name,
 * period as a pill, and a soft brand glow in the top-right corner so
 * the panel feels lit from within rather than flat.
 */
import { motion } from 'framer-motion';
import { LuGraduationCap } from 'react-icons/lu';
import { SectionWrapper } from '@components/SectionWrapper';
import { ABOUT, EDUCATION } from '@constants/data';
import { fadeUp, staggerParent } from '@utils/motion';

export const About = (): JSX.Element => {
  const primaryEducation = EDUCATION[0];

  return (
    <SectionWrapper id="about" eyebrow="About" title="Who I am">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-[1.4fr_1fr] gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8"
      >
        <div>
          <motion.h3
            variants={fadeUp}
            className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-display font-bold leading-tight mb-[22px] bg-brand bg-clip-text text-transparent"
          >
            {ABOUT.headline}
          </motion.h3>
          {ABOUT.body.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 24)}
              variants={fadeUp}
              className="text-text-muted mb-4 text-[1.02rem] leading-[1.7]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {primaryEducation && (
          <motion.div
            variants={fadeUp}
            className="group relative p-8 rounded-lg bg-surface border border-border backdrop-blur-[14px] shadow-card overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/40 hover:shadow-glow-blue hover:-translate-y-1 animate-float-soft max-sm:p-6"
          >
            {/* Decorative corner glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-brand opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
            />

            {/* Graduation cap badge */}
            <div className="relative w-14 h-14 grid place-items-center rounded-2xl bg-brand-soft border border-border mb-5">
              <LuGraduationCap aria-hidden="true" className="text-[1.7rem] text-primary" />
            </div>

            <div className="relative font-mono text-[0.72rem] tracking-[0.22em] uppercase text-gold mb-2">
              Education
            </div>

            <h4 className="relative text-[1.25rem] font-display font-bold bg-brand bg-clip-text text-transparent leading-tight">
              {primaryEducation.school}
            </h4>

            <div className="relative flex flex-wrap items-center gap-3 mt-2">
              <p className="text-text-muted text-[0.95rem]">{primaryEducation.degree}</p>
              <span className="inline-flex items-center font-mono text-[0.74rem] px-3 py-1 rounded-pill bg-white/[0.04] border border-border text-primary tracking-[0.04em]">
                {primaryEducation.period}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

/**
 * About — narrative bio paired with an education panel. Both columns
 * fade up on scroll into view.
 */
import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';
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
        className="grid grid-cols-[1.4fr_1fr] gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8"
      >
        <div>
          <motion.h3
            variants={fadeUp}
            className="text-[clamp(1.35rem,2.4vw,1.75rem)] mb-[22px] text-text"
          >
            {ABOUT.headline}
          </motion.h3>
          {ABOUT.body.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 24)}
              variants={fadeUp}
              className="text-text-muted mb-4 text-[1.02rem]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {primaryEducation && (
          <motion.div
            variants={fadeUp}
            className="relative p-7 rounded-lg bg-surface border border-border backdrop-blur-[14px] shadow-card animate-float-soft max-sm:p-[22px]"
          >
            <div className="inline-flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.18em] uppercase text-gold mb-[18px]">
              <FiBookOpen aria-hidden="true" />
              <span>Education</span>
            </div>
            <h4 className="text-[1.2rem] text-text">{primaryEducation.school}</h4>
            <p className="mt-1.5 text-text-muted">{primaryEducation.degree}</p>
            <p className="mt-2.5 font-mono text-[0.84rem] text-primary">
              {primaryEducation.period}
            </p>
            <p className="mt-1 font-mono text-[0.84rem] text-text-dim">
              {primaryEducation.detail}
            </p>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}

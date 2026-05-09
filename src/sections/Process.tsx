/**
 * Process — four numbered tiles describing how I take an idea from
 * fuzzy requirement to a shipped product. Each tile fades up on entry,
 * then responds to mouse movement with a subtle 3D tilt and a brand
 * glow on hover, so the section reads as a flow rather than a static
 * grid of equally-weighted facts.
 */
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { SectionWrapper } from '@components/SectionWrapper';
import { PROCESS_STEPS } from '@constants/data';
import { fadeUp, staggerParent } from '@utils/motion';

const TILT_OPTIONS = {
  reverse: false,
  max: 10,
  perspective: 1100,
  scale: 1.03,
  speed: 700,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.16,1,.3,1)',
};

export const Process = (): JSX.Element => (
  <SectionWrapper id="process" eyebrow="Process" title="How I work">
    <motion.ol
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-4 gap-6 list-none p-0 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1"
    >
      {PROCESS_STEPS.map((step) => (
        <motion.li
          key={step.step}
          variants={fadeUp}
          className="flex [&>div]:w-full"
        >
          <Tilt options={TILT_OPTIONS} style={{ width: '100%' }}>
            <div className="group relative h-full p-6 rounded-lg bg-surface border border-border backdrop-blur-[14px] flex flex-col gap-3 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-glow-blue">
              <span
                aria-hidden="true"
                className="font-display font-extrabold text-[3.2rem] leading-none bg-brand bg-clip-text text-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              >
                {step.step}
              </span>
              <h3 className="font-mono text-[0.78rem] tracking-[0.2em] uppercase text-gold">
                {step.title}
              </h3>
              <p className="text-text-muted text-[0.92rem] leading-[1.6]">
                {step.description}
              </p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 w-32 h-32 rounded-full bg-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
              />
            </div>
          </Tilt>
        </motion.li>
      ))}
    </motion.ol>
  </SectionWrapper>
);

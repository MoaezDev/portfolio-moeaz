/**
 * SectionWrapper — gives every page section consistent vertical rhythm,
 * a stable id anchor, and a reveal-on-scroll animation. Children render
 * inside a centred max-width container.
 */
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from '@utils/motion';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  eyebrow?: string;
  title?: string;
}

export const SectionWrapper = ({
  id,
  children,
  eyebrow,
  title,
}: SectionWrapperProps): JSX.Element => (
    <section
      id={id}
      className="relative px-6 py-[120px] scroll-mt-[72px] max-md:px-[18px] max-md:py-20 max-sm:px-4 max-sm:py-16"
    >
      <div className="max-w-[1180px] mx-auto">
        {(eyebrow || title) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="mb-14 text-center max-sm:mb-9">
              {eyebrow && (
                <span className="inline-block font-mono text-[0.78rem] tracking-[0.18em] uppercase text-primary bg-brand-soft border border-border rounded-pill px-3.5 py-1.5">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2 className="mt-[18px] text-[clamp(1.7rem,4vw,2.75rem)] bg-brand bg-clip-text text-transparent">
                  {title}
                </h2>
              )}
            </div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )

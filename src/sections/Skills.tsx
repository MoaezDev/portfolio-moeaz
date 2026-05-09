/**
 * Skills — grid of grouped skill cards. Each skill renders an animated
 * proficiency bar that fills the first time it scrolls into view.
 */
import { motion } from 'framer-motion';
import { SectionWrapper } from '@components/SectionWrapper';
import { SkillBar } from '@components/SkillBar';
import { SKILL_GROUPS } from '@constants/data';
import { fadeLeft, fadeRight, staggerParent } from '@utils/motion';

export const Skills = (): JSX.Element => (
    <SectionWrapper id="skills" eyebrow="Skills" title="Tools I work with">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-[18px]"
      >
        {SKILL_GROUPS.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            variants={groupIndex % 2 === 0 ? fadeLeft : fadeRight}
            className="p-[26px] rounded-lg bg-surface border border-border backdrop-blur-[14px] flex flex-col gap-[18px] transition-[border-color,box-shadow] duration-300 min-w-0 hover:border-primary/40 hover:shadow-glow-blue max-sm:p-5 max-sm:gap-3.5"
          >
            <h3 className="text-[1.05rem] font-mono text-gold tracking-[0.08em]">{group.title}</h3>
            {group.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )

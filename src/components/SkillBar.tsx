/**
 * SkillBar — labelled horizontal proficiency bar that fills from 0 → level%
 * the first time it scrolls into view, with a soft electric-blue glow.
 */
import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  level: number;
}

export const SkillBar = ({ name, level }: SkillBarProps): JSX.Element => {
  const clampedLevel = Math.max(0, Math.min(100, level));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[0.92rem] text-text-muted">
        <span>{name}</span>
        <span>{clampedLevel}%</span>
      </div>
      <div className="relative w-full h-2 rounded-pill bg-white/[0.05] overflow-hidden border border-border">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${clampedLevel}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-pill bg-brand shadow-glow-blue"
        />
      </div>
    </div>
  );
}

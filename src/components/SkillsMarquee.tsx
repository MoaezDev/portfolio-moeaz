/**
 * SkillsMarquee — full-bleed horizontal banner that scrolls every skill
 * across the screen in an infinite loop. The track is rendered twice and
 * translated by exactly -50% so the join is seamless. Hover pauses the
 * animation; edge masks fade items in/out at the borders. Decorative —
 * the duplicate copy is `aria-hidden` so screen readers only encounter
 * each skill once.
 */
import { SKILL_GROUPS } from '@constants/data';

const ALL_SKILLS: string[] = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => skill.name),
);

const STRIP_BG =
  'linear-gradient(90deg, rgba(11, 16, 36, 0.4) 0%, rgba(18, 22, 48, 0.55) 50%, rgba(11, 16, 36, 0.4) 100%)';

const EDGE_MASK = 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)';

export const SkillsMarquee = (): JSX.Element => (
    <div
      aria-label="Skills marquee"
      className="group relative w-full overflow-hidden py-7 border-y border-border"
      style={{
        background: STRIP_BG,
        WebkitMaskImage: EDGE_MASK,
        maskImage: EDGE_MASK,
      }}
    >
      <div className="flex gap-12 w-max animate-marquee-scroll [will-change:transform] group-hover:[animation-play-state:paused] max-sm:gap-7 max-sm:animate-marquee-scroll-fast">
        {ALL_SKILLS.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-3 px-[22px] py-2.5 rounded-pill border border-border bg-white/[0.03] backdrop-blur-md font-mono text-[0.92rem] text-text-muted whitespace-nowrap transition-[color,border-color,box-shadow] duration-[250ms] before:content-['✦'] before:text-gold before:text-[0.78rem] hover:text-text hover:border-primary hover:shadow-glow-blue max-sm:px-4 max-sm:py-2 max-sm:text-[0.84rem]"
          >
            {skill}
          </span>
        ))}
        {ALL_SKILLS.map((skill) => (
          <span
            key={`dup-${skill}`}
            aria-hidden="true"
            className="inline-flex items-center gap-3 px-[22px] py-2.5 rounded-pill border border-border bg-white/[0.03] backdrop-blur-md font-mono text-[0.92rem] text-text-muted whitespace-nowrap transition-[color,border-color,box-shadow] duration-[250ms] before:content-['✦'] before:text-gold before:text-[0.78rem] hover:text-text hover:border-primary hover:shadow-glow-blue max-sm:px-4 max-sm:py-2 max-sm:text-[0.84rem]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )

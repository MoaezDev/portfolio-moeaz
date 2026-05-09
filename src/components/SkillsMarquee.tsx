/**
 * SkillsMarquee — full-bleed horizontal banner that scrolls a curated set
 * of frameworks / platforms / disciplines across the screen in an infinite
 * loop. The track is rendered twice and translated by exactly -50% so the
 * join is seamless. Hover on the marquee pauses the scroll; hover on a
 * pill lights it with the brand gradient and a soft glow. Edge masks fade
 * items in/out at the borders. The duplicate copy is `aria-hidden` so
 * screen readers only encounter each tag once.
 */
import { MARQUEE_TAGS } from '@constants/data';

const EDGE_MASK = 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)';

const PILL_CLASSES =
  "group/pill inline-flex items-center gap-3 px-[22px] py-2.5 rounded-pill border border-border bg-glass backdrop-blur-md font-mono text-[0.92rem] text-text-muted whitespace-nowrap cursor-default transition-[color,border-color,box-shadow,transform,background] duration-300 before:content-['✦'] before:text-gold before:text-[0.78rem] before:transition-colors before:duration-300 hover:text-text hover:bg-glass-strong hover:border-primary/60 hover:shadow-glow-blue hover:-translate-y-0.5 hover:before:text-accent max-sm:px-4 max-sm:py-2 max-sm:text-[0.84rem]";

export const SkillsMarquee = (): JSX.Element => (
  <div
    aria-label="Tech marquee"
    className="group relative w-full overflow-hidden py-7 border-y border-border bg-[image:var(--bg-marquee)]"
    style={{
      WebkitMaskImage: EDGE_MASK,
      maskImage: EDGE_MASK,
    }}
  >
    <div className="flex gap-12 w-max animate-marquee-scroll [will-change:transform] group-hover:[animation-play-state:paused] max-sm:gap-7 max-sm:animate-marquee-scroll-fast">
      {MARQUEE_TAGS.map((tag) => (
        <span key={tag} className={PILL_CLASSES}>
          {tag}
        </span>
      ))}
      {MARQUEE_TAGS.map((tag) => (
        <span key={`dup-${tag}`} aria-hidden="true" className={PILL_CLASSES}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

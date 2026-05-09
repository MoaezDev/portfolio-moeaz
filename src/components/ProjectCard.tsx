/**
 * ProjectCard — 3D tilt card showing a single project's headline info,
 * a demo image, and quick links to the repo and live demo. Click the
 * card body opens a detail modal handled by the parent. Accent colour
 * comes from the project's `accent` field.
 */
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Tilt } from 'react-tilt';
import type { Project, ProjectAccent } from '@constants/data';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  tilt?: boolean;
}

const ACCENT_BG: Record<ProjectAccent, string> = {
  indigo: 'bg-accent-indigo',
  emerald: 'bg-accent-emerald',
  amber: 'bg-accent-amber',
  rose: 'bg-accent-rose',
  sky: 'bg-accent-sky',
};

const ACCENT_GLOW: Record<ProjectAccent, string> = {
  indigo: 'hover:shadow-glow-indigo',
  emerald: 'hover:shadow-glow-emerald',
  amber: 'hover:shadow-glow-amber',
  rose: 'hover:shadow-glow-rose',
  sky: 'hover:shadow-glow-sky',
};

const ACCENT_BORDER_GRAD: Record<ProjectAccent, string> = {
  indigo: 'before:bg-accent-indigo',
  emerald: 'before:bg-accent-emerald',
  amber: 'before:bg-accent-amber',
  rose: 'before:bg-accent-rose',
  sky: 'before:bg-accent-sky',
};

const TILT_OPTIONS = {
  reverse: false,
  max: 12,
  perspective: 1000,
  scale: 1.02,
  speed: 800,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.16,1,.3,1)',
};

export const ProjectCard = ({
  project,
  onOpen,
  tilt = true,
}: ProjectCardProps): JSX.Element => {
  const open = (): void => onOpen(project);

  const card = (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className={clsx(
        'group/card relative flex flex-col text-left w-full h-full rounded-lg bg-surface border border-border backdrop-blur-[14px] overflow-hidden transition-[box-shadow,transform] duration-300',
        ACCENT_GLOW[project.accent],
        // Animated gradient border via ::before with mask trick
        "before:content-[''] before:absolute before:-inset-px before:rounded-[inherit] before:p-px before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:pointer-events-none before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]",
        ACCENT_BORDER_GRAD[project.accent],
      )}
    >
      <button
        type="button"
        onClick={open}
        aria-label={`Open details for ${project.title}`}
        className={clsx(
          'relative block w-full aspect-[16/9] overflow-hidden border-0 p-0 cursor-pointer group/media',
          ACCENT_BG[project.accent],
          "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(180deg,transparent_50%,rgba(6,8,26,0.85)_100%)]",
        )}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.04]"
        />
      </button>

      <div className="flex flex-col flex-1 p-6 pt-6 max-sm:p-5">
        <h3 className="text-[1.3rem] text-text">{project.title}</h3>
        <p className="mt-2.5 text-text-muted text-[0.95rem]">{project.summary}</p>

        <ul className="flex flex-wrap gap-2 list-none mt-4">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[0.72rem] px-2.5 py-1 rounded-pill bg-white/[0.05] border border-border text-text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-2.5 mt-[22px] pt-[18px] border-t border-border">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-semibold tracking-[0.04em] px-3.5 py-2 rounded-pill border border-border bg-white/[0.04] text-text no-underline transition-[transform,box-shadow,background,color] duration-200 hover:bg-white/[0.08] hover:-translate-y-px [&>svg]:text-[0.95rem]"
            >
              <FiGithub /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className={clsx(
                'inline-flex items-center gap-2 font-mono text-[0.78rem] font-semibold tracking-[0.04em] px-3.5 py-2 rounded-pill border border-transparent text-[#06081a] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-px [&>svg]:text-[0.95rem]',
                ACCENT_BG[project.accent],
                ACCENT_GLOW[project.accent],
              )}
            >
              <FiExternalLink /> Live
            </a>
          )}
          <button
            type="button"
            onClick={open}
            className="ml-auto inline-flex items-center font-mono text-[0.78rem] font-semibold tracking-[0.04em] px-3.5 py-2 rounded-pill border border-border bg-transparent text-text-muted cursor-pointer transition-[color,border-color] duration-200 hover:text-text hover:border-primary"
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (!tilt) return card;

  return (
    <Tilt options={TILT_OPTIONS} style={{ height: '100%', width: '100%' }}>
      {card}
    </Tilt>
  );
}

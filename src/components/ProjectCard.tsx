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

const ACCENT_BORDER_HOVER: Record<ProjectAccent, string> = {
  indigo: 'hover:border-indigo-400/50',
  emerald: 'hover:border-emerald-400/50',
  amber: 'hover:border-amber-400/50',
  rose: 'hover:border-rose-400/50',
  sky: 'hover:border-sky-400/50',
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
        'group/card relative flex flex-col text-left w-full h-full rounded-lg bg-surface border border-border backdrop-blur-[14px] overflow-hidden transition-[box-shadow,border-color,transform] duration-300',
        ACCENT_GLOW[project.accent],
        ACCENT_BORDER_HOVER[project.accent],
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
        <h3 className="text-[1.3rem] text-text line-clamp-2">{project.title}</h3>
        <p className="mt-2.5 text-text-muted text-[0.95rem] line-clamp-3">
          {project.summary}
        </p>

        <ul className="flex flex-wrap gap-2 list-none mt-4 mb-5">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[0.72rem] px-2.5 py-1 rounded-pill bg-white/[0.05] border border-border text-text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-2.5 mt-auto pt-[18px] border-t border-border">
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

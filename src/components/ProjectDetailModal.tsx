/**
 * ProjectDetailModal — project details rendered inside the shared
 * AdaptiveModal (centered modal on desktop, bottom drawer on mobile).
 * Shows the demo image, description, stack, highlights, and links.
 */
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { AdaptiveModal } from '@components/AdaptiveModal';
import type { Project } from '@constants/data';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const SECTION_LABEL =
  'mt-[18px] font-mono text-[0.68rem] tracking-[0.18em] uppercase text-text-dim';

const TAG =
  'font-mono text-[0.78rem] px-3 py-1.5 rounded-pill bg-brand-soft border border-border';

const HIGHLIGHT =
  "relative pl-[18px] text-text-muted text-[0.88rem] leading-[1.55] before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand";

const LINK_BASE =
  'inline-flex items-center gap-2 font-mono text-[0.8rem] font-semibold px-4 py-2.5 rounded-pill no-underline border transition-[transform,box-shadow,background] duration-200 hover:-translate-y-px hover:shadow-glow-violet';

const LINK_GHOST = 'border-border bg-white/[0.04] text-text';

const LINK_PRIMARY = 'border-transparent bg-brand text-white shadow-glow-blue';

export const ProjectDetailModal = ({
  project,
  onClose,
}: ProjectDetailModalProps): JSX.Element => {
  const titleId = project ? `modal-title-${project.id}` : undefined;

  return (
    <AdaptiveModal
      open={Boolean(project)}
      onClose={onClose}
      maxWidth={560}
      ariaLabelledBy={titleId}
    >
      {project && (
        <>
          <div className="w-full h-[180px] overflow-hidden flex-shrink-0 max-sm:h-[150px]">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover block"
            />
          </div>
          <div className="px-[26px] pt-[22px] pb-[26px] max-sm:px-[18px] max-sm:pt-[18px] max-sm:pb-[22px]">
            <h3
              id={titleId}
              className="text-[1.4rem] bg-brand bg-clip-text text-transparent"
            >
              {project.title}
            </h3>
            <p className="mt-2.5 text-text-muted leading-[1.6] text-[0.92rem]">
              {project.description}
            </p>

            <h4 className={SECTION_LABEL}>Stack</h4>
            <ul className="flex flex-wrap gap-1.5 list-none mt-2">
              {project.stack.map((tag) => (
                <li key={tag} className={TAG}>
                  {tag}
                </li>
              ))}
            </ul>

            {project.highlights.length > 0 && (
              <>
                <h4 className={SECTION_LABEL}>Highlights</h4>
                <ul className="mt-2.5 pl-0 list-none flex flex-col gap-2">
                  {project.highlights.map((item) => (
                    <li key={item} className={HIGHLIGHT}>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {(project.repoUrl || project.liveUrl) && (
              <div className="flex flex-wrap gap-2.5 mt-5">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${LINK_BASE} ${LINK_GHOST}`}
                  >
                    <FiGithub /> View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${LINK_BASE} ${LINK_PRIMARY}`}
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </AdaptiveModal>
  );
}

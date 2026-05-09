/**
 * ProjectCarousel — mobile-first horizontal carousel of project cards.
 * Auto-advances every 5 seconds, supports touch/drag swipe with a soft
 * spring snap, and exposes clickable indicator dots beneath the strip.
 * Auto-advance pauses for 6s after any user interaction so they have
 * time to read whichever slide they jumped to.
 */
import clsx from 'clsx';
import { motion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectCard } from '@components/ProjectCard';
import type { Project } from '@constants/data';

interface ProjectCarouselProps {
  projects: Project[];
  onOpen: (project: Project) => void;
}

const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_MS = 6000;
const SWIPE_DISTANCE_PX = 50;
const SWIPE_VELOCITY = 300;

export const ProjectCarousel = ({
  projects,
  onOpen,
}: ProjectCarouselProps): JSX.Element | null => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideCount = projects.length;

  const goTo = useCallback(
    (next: number) => {
      if (slideCount === 0) return;
      const wrapped = ((next % slideCount) + slideCount) % slideCount;
      setIndex(wrapped);
    },
    [slideCount],
  );

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_AFTER_MS);
  }, []);

  useEffect(() => {
    if (isPaused || slideCount < 2) return undefined;
    const intervalId = setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(intervalId);
  }, [isPaused, slideCount]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  const handleDragEnd = (_: unknown, info: PanInfo): void => {
    const { offset, velocity } = info;
    const swipedLeft = offset.x < -SWIPE_DISTANCE_PX || velocity.x < -SWIPE_VELOCITY;
    const swipedRight = offset.x > SWIPE_DISTANCE_PX || velocity.x > SWIPE_VELOCITY;

    if (swipedLeft) goTo(index + 1);
    else if (swipedRight) goTo(index - 1);

    pauseTemporarily();
  };

  if (slideCount === 0) return null;

  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-lg touch-pan-y">
        <motion.div
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.6 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          className="flex w-full cursor-grab active:cursor-grabbing"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              aria-hidden={projects[index].id !== project.id}
              className="flex-[0_0_100%] w-full min-w-0 p-1 flex [&>*]:w-full"
            >
              <ProjectCard project={project} onOpen={onOpen} tilt={false} />
            </div>
          ))}
        </motion.div>
      </div>

      {slideCount > 1 && (
        <div role="tablist" aria-label="Project slides" className="flex justify-center gap-2.5 mt-[22px]">
          {projects.map((project, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${slideIndex + 1} of ${slideCount}: ${project.title}`}
                onClick={() => {
                  goTo(slideIndex);
                  pauseTemporarily();
                }}
                className={clsx(
                  'h-2.5 rounded-pill transition-[width,background,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isActive
                    ? 'w-7 bg-brand shadow-glow-blue hover:bg-brand'
                    : 'w-2.5 bg-white/[0.18] hover:bg-white/[0.32]',
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * ProjectCarousel — mobile-first horizontal carousel of project cards.
 * Auto-advances every 5 seconds, supports touch/drag swipe with a soft
 * spring snap, and exposes clickable indicator dots beneath the strip.
 * Auto-advance pauses for 6s after any user interaction so they have
 * time to read whichever slide they jumped to.
 */
import { motion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

const Viewport = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  touch-action: pan-y;
`;

const Strip = styled(motion.div)`
  display: flex;
  width: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  min-width: 0;
  padding: 4px;
  display: flex;

  & > * {
    width: 100%;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '28px' : '10px')};
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.brand : 'rgba(255, 255, 255, 0.18)'};
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.glowBlue : 'none')};
  transition:
    width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.gradients.brand : 'rgba(255, 255, 255, 0.32)'};
  }
`;

export function ProjectCarousel({ projects, onOpen }: ProjectCarouselProps): JSX.Element | null {
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
      <Viewport>
        <Strip
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.6 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {projects.map((project) => (
            <Slide key={project.id} aria-hidden={projects[index].id !== project.id}>
              <ProjectCard project={project} onOpen={onOpen} tilt={false} />
            </Slide>
          ))}
        </Strip>
      </Viewport>

      {slideCount > 1 && (
        <Dots role="tablist" aria-label="Project slides">
          {projects.map((project, slideIndex) => (
            <Dot
              key={project.id}
              type="button"
              role="tab"
              $active={slideIndex === index}
              aria-selected={slideIndex === index}
              aria-label={`Go to slide ${slideIndex + 1} of ${slideCount}: ${project.title}`}
              onClick={() => {
                goTo(slideIndex);
                pauseTemporarily();
              }}
            />
          ))}
        </Dots>
      )}
    </div>
  );
}

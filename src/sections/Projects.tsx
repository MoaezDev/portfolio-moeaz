/**
 * Projects — responsive showcase. On desktop renders a tilt-card grid;
 * on mobile renders a swipeable, auto-advancing carousel with dot
 * indicators. Selecting any card opens a shared detail modal.
 */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectCard } from '@components/ProjectCard';
import { ProjectCarousel } from '@components/ProjectCarousel';
import { ProjectDetailModal } from '@components/ProjectDetailModal';
import { SectionWrapper } from '@components/SectionWrapper';
import { PROJECTS, type Project } from '@constants/data';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { popIn, staggerParent } from '@utils/motion';

export const Projects = (): JSX.Element => {
  const [selected, setSelected] = useState<Project | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <SectionWrapper id="projects" eyebrow="Projects" title="Things I've built">
      {isMobile ? (
        <ProjectCarousel projects={PROJECTS} onOpen={setSelected} />
      ) : (
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={popIn}
              className="flex min-w-0 [&>*]:w-full"
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
}

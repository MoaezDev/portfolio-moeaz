/**
 * Projects — responsive showcase. On desktop renders a tilt-card grid;
 * on mobile renders a swipeable, auto-advancing carousel with dot
 * indicators. Selecting any card opens a shared detail modal.
 */
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { ProjectCard } from '@components/ProjectCard';
import { ProjectCarousel } from '@components/ProjectCarousel';
import { ProjectModal } from '@components/ProjectModal';
import { SectionWrapper } from '@components/SectionWrapper';
import { PROJECTS, type Project } from '@constants/data';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { popIn, staggerParent } from '@utils/motion';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 24px;
  align-items: stretch;
`;

const Cell = styled(motion.div)`
  display: flex;
  min-width: 0;

  & > * {
    width: 100%;
  }
`;

export function Projects(): JSX.Element {
  const [selected, setSelected] = useState<Project | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <SectionWrapper id="projects" eyebrow="Projects" title="Things I've built">
      {isMobile ? (
        <ProjectCarousel projects={PROJECTS} onOpen={setSelected} />
      ) : (
        <Grid
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PROJECTS.map((project) => (
            <Cell key={project.id} variants={popIn}>
              <ProjectCard project={project} onOpen={setSelected} />
            </Cell>
          ))}
        </Grid>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
}

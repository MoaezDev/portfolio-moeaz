/**
 * App — composes the welcome splash (first-visit only), the navbar,
 * all page sections, the persistent custom cursor, and the closing
 * footer.
 */
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from '@components/CustomCursor';
import { Footer } from '@components/Footer';
import { Navbar } from '@components/Navbar';
import { ScrollProgress } from '@components/ScrollProgress';
import { SkillsMarquee } from '@components/SkillsMarquee';
import { SplashScreen } from '@components/SplashScreen';
import { useFirstVisit } from '@hooks/useFirstVisit';
import { About } from '@sections/About';
import { Contact } from '@sections/Contact';
import { Hero } from '@sections/Hero';
import { Projects } from '@sections/Projects';
import { Skills } from '@sections/Skills';

export const App = (): JSX.Element => {
  const { isFirstVisit, markVisited } = useFirstVisit();

  return (
    <>
      <AnimatePresence mode="wait">
        {isFirstVisit && <SplashScreen key="splash" onDismiss={markVisited} />}
      </AnimatePresence>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

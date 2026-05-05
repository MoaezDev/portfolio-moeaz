/**
 * App — composes the welcome splash (first-visit only), the navbar,
 * all page sections, the persistent custom cursor, and the closing
 * footer. Wraps the tree in the styled-components ThemeProvider so
 * every component has access to design tokens.
 */
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
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
import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';

export function App(): JSX.Element {
  const { isFirstVisit, markVisited } = useFirstVisit();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
    </ThemeProvider>
  );
}

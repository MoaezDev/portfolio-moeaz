/**
 * Single source of truth for all portfolio content.
 * Update name, links, projects, and skills here — never hardcode in components.
 */

export type ProjectAccent = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';

export interface Personal {
  name: string;
  shortName: string;
  initials: string;
  avatarUrl: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  resumeUrl: string;
}

export interface About {
  headline: string;
  body: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  accent: ProjectAccent;
}

export interface NavLink {
  id: string;
  label: string;
}

export const PERSONAL: Personal = {
  name: 'Muhammad Moaez Ahmad',
  shortName: 'Moaez',
  initials: 'MM',
  avatarUrl: '/profile.jpg',
  role: 'Associate Software Engineer / Flutter Developer',
  email: 'muhammadmoaezahmad@gmail.com',
  linkedin: 'https://www.linkedin.com/in/your-link-here',
  github: 'https://github.com/your-link-here',
  location: 'Lahore, Pakistan',
  resumeUrl: '#',
};

export const ROLE_TYPEWRITER: string[] = [
  'Mobile APP Developer',
  'Web Developer',
  'Associate Software Engineer',
  'Cross-Platform Builder',
];

export const ABOUT: About = {
  headline: 'Crafting cross-platform experiences with a love for clean code.',
  body: [
    "I'm a Computer Science graduate from GCU Lahore who turns ideas into polished mobile and full-stack experiences. My focus is Flutter — pairing it with Firebase, REST APIs, and on-device ML to ship apps that feel responsive and look unmistakably modern.",
    'Beyond Flutter, I work comfortably across React Native, Java, Python, and C/C++. I enjoy translating fuzzy product requirements into solid architecture, writing maintainable code, and collaborating with teammates who care about the details.',
  ],
};

export const EDUCATION: EducationEntry[] = [
  {
    school: 'Government College University, Lahore',
    degree: 'BS Computer Science',
    period: '2021 — 2025',
    detail: 'CGPA: 3.14 / 4.00',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Mobile & Frontend',
    skills: [
      { name: 'Flutter', level: 92 },
      { name: 'React Native', level: 78 },
      { name: 'HTML / CSS', level: 85 },
      { name: 'JavaScript', level: 82 },
    ],
  },
  {
    title: 'Backend & Data',
    skills: [
      { name: 'Firebase', level: 88 },
      { name: 'REST APIs', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Python', level: 78 },
    ],
  },
  {
    title: 'Languages & Foundations',
    skills: [
      { name: 'Java', level: 82 },
      { name: 'C / C++', level: 80 },
      { name: 'OOP', level: 88 },
      { name: 'DSA', level: 80 },
    ],
  },
  {
    title: 'Tools & ML',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'NumPy', level: 75 },
      { name: 'OpenCV', level: 72 },
      { name: 'MediaPipe', level: 72 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'fitness-coach',
    title: 'AI Fitness Coach',
    summary:
      'A computer-vision-powered mobile application providing real-time biomechanical feedback and workout analytics.',
    description:
      'An intelligent fitness ecosystem that transforms a smartphone into a personal trainer. By leveraging on-device machine learning, the app analyzes live camera streams to ensure user safety through posture correction. It features a comprehensive library of beginner-to-advanced programs, automated progress tracking, and personalized nutritional roadmaps.',
    stack: ['Flutter', 'Firebase', 'Google ML Kit', 'Camera API', 'Dart'],
    highlights: [
      'Integrated Google ML Kit Pose Detection for real-time biomechanical analysis and form correction.',
      'Developed a custom algorithm for automated rep counting and movement validation to minimize user manual input.',
      'Architected a scalable backend using Firebase for seamless user authentication and real-time synchronization of health metrics.',
      'Designed an intuitive, modular UI/UX that delivers personalized meal plans and adaptive workout schedules.',
    ],
    image: '/images/projects/fitness-coach.png',
    repoUrl: 'https://github.com/moaez-dev/ai-fitness-coach',
    liveUrl: 'https://ai-fitness-coach.example.com',
    accent: 'rose',
  },
  {
    id: 'code-folio',
    title: 'CodeFolio Dashboard',
    summary:
      'A high-performance developer analytics dashboard built with React 18 and the GitHub REST API.',
    description:
      'CodeFolio is a professional-grade metrics dashboard that visualizes GitHub profiles through interactive data storytelling. It features complex data fetching patterns, responsive data visualizations using Recharts, and a modular architecture designed for scalability and speed.',
    stack: [
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'Recharts',
      'Framer Motion',
    ],
    highlights: [
      'Engineered a robust API layer with TanStack Query (React Query) for efficient caching, optimistic updates, and sophisticated loading/error state management.',
      'Developed an interactive data visualization suite using Recharts to display 30-day activity trends and repository language breakdowns.',
      'Optimized performance via lazy-loaded routes and manual chunk splitting, ensuring a minimal initial bundle size and near-instant load times.',
      'Implemented a persistence-layer theme engine (Dark/Light mode) that respects system preferences and prevents flash-of-unstyled-content (FOUC).',
      'Maintained high code quality standards with a comprehensive CI/CD-ready setup, including Vitest suites and Husky pre-commit hooks.',
    ],
    image: '/images/projects/code-folio.png',
    repoUrl: 'https://github.com/moaez-dev/code-folio',
    liveUrl: 'https://code-folio.example.com',
    accent: 'sky',
  },
  {
    id: 'task-flow',
    title: 'TaskFlow: Offline-First Kanban',
    summary:
      'A high-performance, local-first productivity suite built with Next.js 15 and IndexedDB.',
    description:
      'TaskFlow is a deeply interactive Kanban board inspired by Linear and Trello. It prioritizes speed and reliability by utilizing a local-first architecture, ensuring seamless performance regardless of connectivity. The app features a sophisticated drag-and-drop system, fractional ordering for re-ordering logic, and cross-tab state synchronization.',
    stack: ['Next.js 15', 'TypeScript', 'Dexie.js', 'Zustand', 'dnd-kit', 'Framer Motion'],
    highlights: [
      'Implemented an offline-first persistence layer using Dexie.js and IndexedDB, enabling real-time UI updates across multiple browser tabs via live queries.',
      'Engineered a complex Drag-and-Drop system with @dnd-kit, featuring fractional ordering algorithms to handle re-ordering logic with single-record database writes.',
      'Architected a clean separation of concerns by isolating persistence logic into a dedicated service layer, making the codebase ready for future cloud-sync integration.',
      'Enhanced user productivity with custom keyboard shortcuts (hotkeys), local notifications for deadlines, and a mobile-first responsive design.',
      'Leveraged React 19 and Next.js 15 App Router for optimized rendering, skeleton loading states, and advanced type safety across the entire stack.',
    ],
    image: '/images/projects/task-flow.png',
    repoUrl: 'https://github.com/moaez-dev/task-flow',
    liveUrl: 'https://task-flow.example.com',
    accent: 'emerald',
  },
  {
    id: 'online-cook',
    title: 'OnlineCook',
    summary:
      'A high-performance recipe and culinary social platform built with Remix and modern web standards.',
    description:
      'OnlineCook is a comprehensive culinary ecosystem where users discover recipes, follow creators, and manage dietary needs. I spearheaded the frontend development, focusing on building a seamless, "edge-first" user experience that leverages Remix’s unique ability to handle complex data loading and mutations with near-zero client-side overhead.',
    stack: ['Remix', 'React', 'Tailwind CSS', 'TypeScript'],
    highlights: [
      'Developed a sophisticated, multi-faceted search and filtering system allowing users to sort recipes by diet (Vegan, Keto), ingredients, and prep time.',
      'Optimized initial page load and SEO by implementing Remix Server-Side Rendering (SSR) and progressive enhancement for all interactive forms.',
      'Built a responsive "Food Feed" and creator dashboard, ensuring a fluid, app-like experience across mobile and desktop devices.',
      'Implemented advanced UI patterns including skeleton loading states, optimistic UI updates, and nested routing to reduce layout shifts.',
      'Integrated complex data visualizations for nutritional facts and cooking metrics using modern CSS-in-JS and Tailwind utility classes.',
    ],
    image: '/images/projects/online-cook.png',
    repoUrl: 'https://github.com/moaez-dev/online-cook',
    liveUrl: 'https://online-cook.example.com',
    accent: 'amber',
  },
  {
    id: 'flutter-quiz-app',
    title: 'Flutter Quiz App',
    summary: 'Topic-based quiz app with dynamic API-driven questions and live scoring.',
    description:
      'A Flutter quiz app that pulls questions from a public API, supports multiple topics, and gives instant feedback with score tracking.',
    stack: ['Flutter', 'Dart', 'REST API'],
    highlights: [
      'Dynamic question fetching from REST API',
      'Multiple topics with adjustable difficulty',
      'Immediate per-question feedback',
      'Final score summary and retake flow',
    ],
    image: '/images/projects/flutter-quiz-app.png',
    repoUrl: 'https://github.com/moaez-dev/flutter-quiz-app',
    liveUrl: 'https://flutter-quiz-app.example.com',
    accent: 'indigo',
  },
  {
    id: 'entech-portal',
    title: 'Entech Smart Portal',
    summary:
      'An enterprise IoT dashboard for real-time sensor monitoring and industrial data analytics.',
    description:
      'Entech Portal is a professional IoT management platform designed to monitor and visualize complex sensor networks. I developed the frontend architecture, focusing on transforming high-frequency sensor data into actionable insights through interactive telemetry graphs and industrial-grade status monitoring tools.',
    stack: ['Next.js 14', 'Chakra UI', 'TanStack Query', 'TypeScript', 'Recharts', 'Lucide Icons'],
    highlights: [
      'Engineered complex data visualization systems to render high-frequency sensor telemetry through interactive, time-series graphs.',
      'Optimized frontend performance for real-time data streaming using TanStack Query, ensuring smooth UI updates without full page refreshes.',
      'Developed a modular, accessible component library with Chakra UI, maintaining design consistency across enterprise-scale dashboards.',
      'Implemented robust TypeScript interfaces for complex sensor data structures, significantly reducing runtime errors and improving developer experience.',
      'Architected a responsive multi-tenant layout featuring deep-linking for specific sensor nodes and saved analytical views.',
    ],
    image: '/images/projects/entech-portal.png',
    repoUrl: 'https://github.com/moaez-dev/entech-portal',
    liveUrl: 'https://entech-portal.example.com',
    accent: 'sky',
  },
];

export const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

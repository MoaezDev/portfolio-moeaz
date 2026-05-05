/**
 * Single source of truth for all portfolio content.
 * Update name, links, projects, and skills here — never hardcode in components.
 */

export type ProjectAccent = 'blue' | 'violet' | 'gold';

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
  tags: string[];
  accent: ProjectAccent;
  highlight: string;
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
  'Flutter Developer',
  'Associate Software Engineer',
  'Cross-Platform Builder',
  'ML-Powered App Engineer',
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
    title: 'Fitness Coach App',
    summary:
      'Cross-platform fitness companion that uses on-device ML to count reps, evaluate form, and personalise plans.',
    description:
      'Built in Flutter with Google ML Kit pose detection. Detects body landmarks in real time, scores rep quality, and adapts workout suggestions based on session history. Authentication and progress sync over Firebase.',
    tags: ['Flutter', 'ML Kit', 'Firebase', 'Dart'],
    accent: 'blue',
    highlight: 'Real-time pose detection',
  },
  {
    id: 'quiz-app',
    title: 'Quiz App',
    summary:
      'Animated quiz experience with timed questions, score tracking, and category-based challenges.',
    description:
      'A polished Flutter quiz app featuring smooth screen transitions, animated answer feedback, and persistent high scores. Includes multi-category support and a leaderboard.',
    tags: ['Flutter', 'Dart', 'State Management'],
    accent: 'violet',
    highlight: 'Animated transitions',
  },
  {
    id: 'hostel-mess',
    title: 'Hostel Mess Management System',
    summary:
      'SQL-driven system for managing meal plans, daily attendance, billing, and inventory in a university hostel.',
    description:
      'Designed normalised relational schemas, wrote complex queries with views and stored procedures, and built reporting for monthly billing and waste tracking.',
    tags: ['SQL', 'Database Design', 'Reporting'],
    accent: 'gold',
    highlight: 'Normalised schema design',
  },
  {
    id: 'hostel-management',
    title: 'Hostel Management System',
    summary:
      'Desktop application for hostel staff to manage rooms, residents, payments, and complaints.',
    description:
      'Built in C# with WinForms over a relational backend. Role-based access for admins and staff, exportable reports, and a clean form-driven UX.',
    tags: ['C#', 'WinForms', '.NET'],
    accent: 'blue',
    highlight: 'Role-based desktop UX',
  },
  {
    id: 'student-hostel-finder',
    title: 'Student Hostel Finder',
    summary:
      'Software-engineering case study: full requirements, use-case, sequence, and class diagrams for a hostel-discovery platform.',
    description:
      'Captured stakeholders, drafted functional/non-functional requirements, and produced UML artefacts (use-case, sequence, class, activity) ready for an implementation team.',
    tags: ['SE Diagrams', 'UML', 'Requirements'],
    accent: 'violet',
    highlight: 'Full UML deliverables',
  },
];

export const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

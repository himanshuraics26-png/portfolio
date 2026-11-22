export interface HeroMetric {
  value: string;
  label: string;
  context: string;
}

export interface AboutPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
}

export type SkillCategory = 'all' | 'frontend' | 'design';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  proficiency: number;
  experience: string;
  summary: string;
}

export type ProjectCategory = 'all' | 'ui-ux' | 'frontend' | '3d-motion';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  shortDescription: string;
  technologies: string[];
  imageUrl: string;
  imageAlt: string;
  outcome: string;
  challenge: string;
  solution: string;
  liveUrl: string;
  repoUrl: string;
}

export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education';
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
}

export const PROFILE = {
  name: 'Himanshu Rai',
  role: 'Creative UI/UX Designer & Frontend Developer',
  headline: 'Turning Ideas Into Digital Experiences.',
  heroIntro:
    'I design and engineer expressive web interfaces where architectural typography, glassmorphic depth, and fluid 3D motion converge into memorable digital products.',
  email: 'himanshu.rai_cs26@gla.ac.in',
  location: 'India · Remote Worldwide',
  availability: 'Available for select freelance & full-time roles',
  portraitUrl: '/assets/aistudio/Professional_LinkedIn_Portrait_e6af6a74.png',
  socials: [
    { label: 'GitHub', href: 'https://github.com', handle: '@himanshurai-dev' },
    { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'in/himanshurai' },
    { label: 'Dribbble', href: 'https://dribbble.com', handle: 'dribbble.com/himanshurai' },
    { label: 'X', href: 'https://x.com', handle: '@himanshu_ui' },
  ],
};

export const HERO_METRICS: HeroMetric[] = [
  {
    value: '4+ yrs',
    label: 'Design & Frontend Craft',
    context: 'Production interfaces & systems',
  },
  {
    value: '28+',
    label: 'Shipped Digital Products',
    context: 'SaaS, audio & spatial web apps',
  },
  {
    value: '14',
    label: 'Design Systems Built',
    context: 'Figma tokens to React primitives',
  },
  {
    value: '99%',
    label: 'Lighthouse Accessibility',
    context: '60fps motion & WCAG AA focus',
  },
];

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    id: 'architecture',
    title: 'Visual Systems & UI Architecture',
    subtitle: 'Figma · Design Tokens · Typography',
    description:
      'Building scalable component libraries and multi-brand design systems in Figma that translate cleanly into strongly typed React primitives.',
    metric: '14 token systems deployed',
  },
  {
    id: 'engineering',
    title: 'Interactive Frontend Engineering',
    subtitle: 'React · TypeScript · Tailwind CSS',
    description:
      'Writing clean, responsive, compositor-first interfaces with tactile micro-interactions, accessible keyboard flows, and sub-200ms feedback.',
    metric: '28+ production launches',
  },
  {
    id: 'spatial',
    title: '3D Web & Creative Motion',
    subtitle: 'Three.js · Shaders · Motion',
    description:
      'Crafting WebGL scenes, procedural PBR geometry, and atmospheric spatial layouts that elevate digital storytelling without sacrificing speed.',
    metric: '60fps WebGL optimization',
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    proficiency: 96,
    experience: '4+ years',
    summary: 'Semantic document structure, WCAG AA landmarks, and SEO-ready markup.',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    proficiency: 94,
    experience: '4+ years',
    summary: 'Modern Grid/Flexbox architecture, Tailwind CSS, glassmorphism, and GPU-composited motion.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    proficiency: 92,
    experience: '4+ years',
    summary: 'ES2024+, TypeScript, async state orchestration, and WebGL/Canvas animation loops.',
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 94,
    experience: '3.5+ years',
    summary: 'Modular hooks, custom component primitives, performance profiling, and SPA architecture.',
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    category: 'design',
    proficiency: 95,
    experience: '4+ years',
    summary: 'Information architecture, user flows, visual hierarchy, and high-craft dark-mode interfaces.',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    proficiency: 96,
    experience: '4+ years',
    summary: 'Variables, auto-layout systems, interactive prototypes, and developer-ready handoff specs.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'aether-spatial-audio',
    title: 'Aether Spatial Audio Studio',
    category: 'ui-ux',
    categoryLabel: 'UI/UX Design & Audio Interface',
    year: '2026',
    client: 'Aether Acoustics Lab',
    role: 'Lead Product Designer & Frontend Engineer',
    shortDescription:
      'An atmospheric spatial audio workstation featuring real-time 3D soundstage placement, spectral waveform analysis, and crystalline dark-glass controls.',
    technologies: ['React', 'TypeScript', 'Web Audio API', 'Three.js', 'Figma'],
    imageUrl: '/src/assets/images/project_aether_audio_1795357794428.jpg',
    imageAlt: 'Aether Spatial Audio Studio interface displayed on a frameless glass monitor in an acoustic studio',
    outcome: 'Reduced soundstage mixing workflow time by 38% across 120 beta mastering engineers.',
    challenge:
      'Spatial audio mixers typically drown users in dense modal dialogs and low-contrast floating knobs that break focus during long studio sessions.',
    solution:
      'Designed a unified cosmic glass workspace anchored by a central 3D placement dome, tabular decibel metering, and keyboard-first track scrubbing.',
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 'velox-quant-terminal',
    title: 'Velox Quantitative Terminal',
    category: 'frontend',
    categoryLabel: 'Frontend Architecture & Data Viz',
    year: '2025',
    client: 'Velox Markets',
    role: 'Senior Frontend Developer',
    shortDescription:
      'High-density dark-mode portfolio analytics platform rendering live multi-series liquidity curves, risk matrices, and sub-second execution telemetry.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas 2D', 'CSS Grid'],
    imageUrl: '/src/assets/images/project_velox_terminal_1795357794241.jpg',
    imageAlt: 'Velox Quantitative Terminal analytics dashboard running on an anodized dark aluminum laptop',
    outcome: 'Sustained 60fps chart scrubbing over 50,000 live ticks with zero layout shift.',
    challenge:
      'Financial dashboards often suffer from DOM thrashing when streaming high-frequency market ticks across dozens of visible widgets.',
    solution:
      'Engineered an off-main-thread canvas rendering pipeline paired with crisp tabular-numeral typography and restrained electric cyan signal cues.',
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 'lumina-design-system',
    title: 'Lumina Design System',
    category: 'ui-ux',
    categoryLabel: 'Design System & Token Architecture',
    year: '2025',
    client: 'Lumina Cloud Suite',
    role: 'Design Systems Architect',
    shortDescription:
      'A multi-surface design token library bridging Figma variables and accessible React primitives with strict contrast guarantees and typographic scales.',
    technologies: ['Figma', 'CSS Variables', 'React', 'HTML', 'Accessibility'],
    imageUrl: '/src/assets/images/project_lumina_system_1795357794680.jpg',
    imageAlt: 'Lumina Design System modular typography specimen sheets and obsidian-violet color swatches',
    outcome: 'Adopted across 6 product squads, cutting UI handoff and QA cycles by 45%.',
    challenge:
      'Product teams were shipping inconsistent glass surfaces, incompatible radii, and failing contrast ratios across light and dark product suites.',
    solution:
      'Unified 180+ semantic color, spacing, and elevation tokens in Figma with automated CSS variable sync and zero-runtime-overhead React primitives.',
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 'solstice-3d-configurator',
    title: 'Solstice 3D Lighting Studio',
    category: '3d-motion',
    categoryLabel: '3D WebGL & Interactive Configurator',
    year: '2024',
    client: 'Solstice Architectural',
    role: 'Creative Technologist',
    shortDescription:
      'Interactive browser-based PBR lighting and metallic finish studio enabling architects to inspect specular reflections and studio rigs in real time.',
    technologies: ['Three.js', 'JavaScript', 'React', 'GLSL', 'UI/UX Design'],
    imageUrl: '/src/assets/images/project_solstice_spatial_1795357794436.jpg',
    imageAlt: 'Solstice 3D Lighting Studio running on a curved widescreen display showing a metallic sphere',
    outcome: 'Increased custom architectural fixture inquiries by 62% within 90 days of launch.',
    challenge:
      'Architects needed photorealistic material inspection in the browser without waiting on multi-megabyte HDR downloads or sluggish server renders.',
    solution:
      'Built a procedural RoomEnvironment studio lighting rig in Three.js with real-time anisotropic metalness tuning and an unobtrusive glass control rail.',
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'exp-1',
    type: 'experience',
    period: '2025 — Present',
    title: 'Creative UI/UX Designer & Frontend Engineer',
    organization: 'Independent Studio & Product Consulting',
    location: 'Remote',
    description:
      'Partnering with early-stage AI, fintech, and creative tooling startups to architect flagship web experiences, design systems, and interactive 3D product showcases.',
    highlights: [
      'Led end-to-end Figma-to-React delivery for 8 SaaS and spatial web launches',
      'Standardized WCAG AA dark-mode token libraries and 60fps animation budgets',
    ],
  },
  {
    id: 'exp-2',
    type: 'experience',
    period: '2024 — 2025',
    title: 'Frontend & UI Engineering Intern',
    organization: 'Nebula Interactive Labs',
    location: 'Bengaluru · Hybrid',
    description:
      'Built modular React data visualization dashboards, interactive onboarding flows, and reusable component primitives in close collaboration with product designers.',
    highlights: [
      'Improved core dashboard Lighthouse performance score from 74 to 99',
      'Created an interactive Figma prototype kit used across 4 internal engineering teams',
    ],
  },
  {
    id: 'exp-3',
    type: 'experience',
    period: '2023 — 2024',
    title: 'UI/UX Design Lead',
    organization: 'Campus Design & Developer Collective',
    location: 'Mathura, India',
    description:
      'Directed visual identity, web interface design, and frontend workshops for annual technical symposiums and student-led product hackathons.',
    highlights: [
      'Mentored 40+ peers in Figma auto-layout, modern CSS, and React fundamentals',
      'Designed event web portals serving 4,500+ student registrations',
    ],
  },
  {
    id: 'edu-1',
    type: 'education',
    period: '2022 — 2026',
    title: 'B.Tech in Computer Science & Engineering',
    organization: 'GLA University',
    location: 'Mathura, India',
    description:
      'Focusing on human-computer interaction, software engineering, computer graphics, and modern web architecture while building real-world digital products.',
    highlights: [
      'Coursework in Computer Graphics, Algorithms, Human-Centered Computing & Web Systems',
      'Winner & finalist in multiple national UI/UX and frontend engineering hackathons',
    ],
  },
];

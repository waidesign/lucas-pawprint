export interface ProfileData {
  name: string;
  short: string;
  title: string;
  years: number;
  email: string;
  bookingUrl: string;
  location: string;
  timezone: string;
  timezoneNote: string;
  workingHours: {
    timeZone: string;
    start: string;
    end: string;
  };
  studio: {
    name: string;
    url: string;
  };
  founderOf: {
    name: string;
    url: string;
    status: string;
    slug: string;
  };
  socials: {
    linkedin: string;
    behance: string;
    github: string;
    medium: string;
  };
  bioShort: string;
  motionIntro: string;
  portrait: {
    src: string;
    alt: string;
  };
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
}

export interface TestimonialEntry {
  id: string;
  pull: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  relationship: string;
}

export interface EducationData {
  degree: string;
  school: string;
  location: string;
  graduated: string;
}

export const profile: ProfileData = {
  name: "Lucas (Wai Phyo Aung)",
  short: "Lucas",
  title: "Product & Motion Designer",
  years: 10,
  email: "lucas@pawprint.design",
  bookingUrl: "https://cal.com/wai.design-start-a-virtual-chat",
  location: "Phuket, Thailand",
  timezone: "UTC+7",
  timezoneNote: "Based in Phuket, Thailand · UTC+7",
  workingHours: {
    timeZone: "Asia/Bangkok",
    start: "09:00",
    end: "18:00",
  },
  studio: {
    name: "Pawprint",
    url: "https://pawprint.design",
  },
  founderOf: {
    name: "Luci",
    url: "https://luci.pawprint.design",
    status: "Private beta",
    slug: "luci",
  },
  socials: {
    linkedin: "https://linkedin.com/in/waiphyoaung-design",
    behance: "https://www.behance.net/waiphyoaungdesign",
    github: "https://github.com/waidesign",
    medium: "https://medium.com/@waiphyoaung.design",
  },
  bioShort:
    "I'm Lucas (Wai Phyo Aung), a product and motion designer based in Phuket, Thailand. I spent my first years in video editing and motion graphics, then moved into UI/UX, and I've been designing for 10 years. Today I design web products, apps and design systems, and I build my own: Luci, a tool that helps designers and AI coding agents speak the same language. I use AI every day, but I never let it do the thinking.",
  motionIntro:
    "I started in video and animation. Now I use motion to explain products, not decorate them.",
  portrait: {
    src: "/images/lucas-portrait.webp",
    alt: "Portrait of Lucas (Wai Phyo Aung), Product and Motion Designer.",
  },
};

export const shippedForClients: string[] = [
  "Classic Decoder",
  "Vehicle Databases",
  "Detailed Vehicle History",
  "Fierce Fight Gear",
  "Sarayah Villas",
];

/**
 * Exact skills list migrated from Lucas's legacy portfolio (`docs/legacy/skillsAndTools.ts`).
 */
export const legacySkills: string[] = [
  "Product Thinking",
  "User Research & Discovery",
  "UX Strategy",
  "Information Architecture",
  "User Flows & Journeys",
  "Usability Testing",
  "Data-Informed Design",
  "Accessibility (WCAG)",
  "Interaction & Visual Design",
  "Responsive Design",
  "Prototyping & Wireframing",
  "Design Systems & Tokens",
  "Component Architecture",
  "Micro-Interactions & Lottie",
  "Motion Design & Animation",
  "Storyboarding & Visual Storytelling",
  "Video Editing",
  "AI-First Design Workflows",
  "AI-Assisted Ideation & Prototyping",
  "AI-Powered UI Generation",
  "Design-to-Code Workflows",
  "AI-Assisted Front-End Dev",
  "Prompt Engineering",
  "Human-in-the-Loop Validation",
  "HTML, CSS, JS, React & Tailwind",
  "Git & Version Control",
  "Developer Handoff Fidelity",
];

/**
 * Exact tools list migrated from Lucas's legacy portfolio (`docs/legacy/skillsAndTools.ts`),
 * plus Luci (own product).
 */
export const legacyTools: string[] = [
  "Luci (Own Product)",
  "Figma",
  "Figma AI",
  "FigJam",
  "Claude Code",
  "Google Antigravity",
  "Cursor",
  "Codex",
  "Google AI Studio",
  "v0.dev",
  "Copilot",
  "Framer",
  "Webflow",
  "Adobe After Effects",
  "Lottiefiles",
  "Adobe Premiere Pro",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe Firefly",
  "Github",
  "Bitbucket",
  "Vercel",
  "JIRA",
  "Google Apps",
];

export const experience: ExperienceEntry[] = [
  {
    period: "2026 – Now",
    role: "Founder & Product Designer",
    company: "Luci (Pawprint)",
    location: "Own product, private beta",
    summary:
      "Designing and building an on-page toolbar that captures any website's components, sections and design tokens as design.md files for AI coding agents.",
  },
  {
    period: "2022 – Now",
    role: "Senior UI/UX & Motion Designer",
    company: "Empire Pixel Co., Ltd",
    location: "Canada company, remote (Phuket)",
    summary:
      "Leading end-to-end product design across web apps, mobile apps and design systems for automotive data and e-commerce platforms, combining Figma, motion and AI-assisted workflows.",
  },
  {
    period: "2020 – 2022",
    role: "Motion Graphics Designer",
    company: "Global Innovation Media",
    location: "Myanmar, on-site",
    summary:
      "Delivered motion design projects from concept and storyboarding to final animation and visual effects across multi-platform campaigns.",
  },
  {
    period: "2019 – 2020",
    role: "Video Editor",
    company: "YTV Digital Free To Air Channel",
    location: "Myanmar, on-site",
    summary:
      "Shaped raw broadcast footage into television programs and campaign launches through narrative pacing, color grading and sound sync.",
  },
  {
    period: "2016 – 2019",
    role: "Freelance Creative Designer",
    company: "Clients incl. Version X Entertainment, Midas Creatives, MCIX",
    location: "Myanmar",
    summary:
      "Designed brand visuals, campaign graphics and animations from client briefs to production-ready assets.",
  },
];

export const testimonials: TestimonialEntry[] = [
  {
    id: "hafsa-a",
    pull: "He uniquely combines sharp UI/UX design with fluid, purposeful motion design that brings products to life.",
    quote:
      "Having managed Wai, I can confidently say he is a standout asset to our product team. He uniquely combines sharp UI/UX design with fluid, purposeful motion design that brings products to life. Wai doesn't just make things look good—he solves real user problems and thinks through every edge case. His dynamic prototypes and micro-interactions consistently elevated our user experience and design standards.",
    author: "Hafsa A.",
    role: "Project Manager",
    company: "Empire Pixel Co., Ltd",
    relationship: "Direct manager",
  },
  {
    id: "fahad-q",
    pull: "Wai is a great example of what happens when talent is combined with curiosity, adaptability, and the willingness to keep learning.",
    quote:
      "I've had the pleasure of working closely with Wai Phyo Aung at Empire Pixel, where I've had the opportunity to manage and guide him as an Art Director.\n\nWhen Wai started with us, his core strengths were in animation and video editing. But what really stood out to me was his mindset. He was never someone who wanted to stay limited to what he already knew. He consistently pushed himself to learn, experiment, and take on new challenges. Over time, I watched him grow beyond animation and editing and develop himself into a stronger, more versatile designer. He started thinking more deeply about composition, visual hierarchy, typography, storytelling, and the overall creative direction behind a piece of work, not just how to execute it.\n\nWhat impressed me even more was how quickly he adapted to the changing creative landscape with AI. Wai embraced new AI-powered workflows and explored vibe coding through Google AI Studio, Antigravity, and Claude Code, using these tools not simply as shortcuts, but as ways to experiment, prototype, solve problems, and expand what he could create. That willingness to adapt is something I genuinely value in a creative professional.\n\nFrom an Art Director's perspective, one of the most rewarding things is seeing someone you've worked with evolve. Wai has gone from being primarily an animator and editor to becoming a more complete creative, someone who can think across motion, video, design, technology, and AI.\n\nBeyond his technical abilities, Wai is hardworking, curious, receptive to feedback, and willing to step outside his comfort zone. He doesn't just wait for someone to tell him what to learn. He actively explores and finds ways to improve himself.\n\nI'm genuinely proud of the growth I've seen in him at Empire Pixel, and I believe his ability to combine creativity with emerging technology will continue to open new doors for him. Wai is a great example of what happens when talent is combined with curiosity, adaptability, and the willingness to keep learning.",
    author: "Fahad Qaiser",
    role: "Art Director",
    company: "Empire Pixel Co., Ltd",
    relationship: "Direct manager",
  },
];

export const education: EducationData = {
  degree: "B.Eng. (Hons) Civil Engineering",
  school: "University of Wolverhampton",
  location: "Wolverhampton, United Kingdom",
  graduated: "October 2019",
};

export interface NavItem {
  label: string;
  href: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Motion", href: "/motion" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
  },
  {
    label: "Behance",
    href: profile.socials.behance,
  },
  {
    label: "GitHub",
    href: profile.socials.github,
  },
  {
    label: "Medium",
    href: profile.socials.medium,
  },
];

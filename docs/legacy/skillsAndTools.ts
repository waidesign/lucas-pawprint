export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ToolItem {
  name: string;
  category: "Design & Prototyping" | "Code & AI-Assisted" | "Motion & Video" | "CMS & Web";
  proficiency: "Daily Core" | "Advanced" | "Proficient";
  highlight?: boolean;
}

export interface ProcessStage {
  step: string;
  title: string;
  description: string;
  deliverables: string;
}

export const skillsData: SkillCategory[] = [
  {
    title: "Product & UX Strategy",
    description: "Aligning user needs and business objectives into scalable, high-converting product architectures.",
    skills: [
      "Product Thinking",
      "User Research & Discovery",
      "UX Strategy",
      "Information Architecture",
      "User Flows and Journeys Mapping",
      "Usability Testing",
      "Data-Informed Design",
      "Accessibility (WCAG)",
    ],
  },
  {
    title: "Interaction, UI & Motion Design",
    description: "Crafting fluid, accessible interface systems, design tokens, and kinetic visual storytelling.",
    skills: [
      "Interaction Design & Visual Design",
      "Responsive Design",
      "Prototyping & Wireframing",
      "Design Systems & Token Architecture",
      "Component Architecture",
      "Micro-Interactions & Lottie",
      "Motion Design & Animation",
      "Storyboarding & Visual Storytelling",
      "Video Editing",
    ],
  },
  {
    title: "AI-First & Design-to-Code Engineering",
    description: "Accelerating ideation and bridging design concepts to front-end implementation with AI workflows.",
    skills: [
      "AI-First Design Workflows",
      "AI-Assisted Ideation & Prototyping",
      "AI-Powered UI Generation",
      "Design-to-Code Workflows",
      "AI-Assisted Front-End Development",
      "Prompt Engineering",
      "Human-in-the-Loop Validation",
      "HTML, CSS, JavaScript, React, Tailwind CSS",
      "Git & Version Control",
      "Developer Handoff Fidelity",
    ],
  },
];

export const toolsData: ToolItem[] = [
  { name: "Figma", category: "Design & Prototyping", proficiency: "Daily Core", highlight: true },
  { name: "Figma AI", category: "Design & Prototyping", proficiency: "Daily Core", highlight: true },
  { name: "FigJam", category: "Design & Prototyping", proficiency: "Daily Core" },
  { name: "Webflow", category: "CMS & Web", proficiency: "Advanced" },
  { name: "Framer", category: "CMS & Web", proficiency: "Advanced", highlight: true },
  { name: "Google AI Studio", category: "Code & AI-Assisted", proficiency: "Daily Core", highlight: true },
  { name: "Google Antigravity", category: "Code & AI-Assisted", proficiency: "Daily Core", highlight: true },
  { name: "Codex", category: "Code & AI-Assisted", proficiency: "Advanced" },
  { name: "Claude Code", category: "Code & AI-Assisted", proficiency: "Daily Core", highlight: true },
  { name: "Cursor", category: "Code & AI-Assisted", proficiency: "Daily Core", highlight: true },
  { name: "Google Apps", category: "Design & Prototyping", proficiency: "Daily Core" },
  { name: "JIRA", category: "Design & Prototyping", proficiency: "Daily Core" },
  { name: "Copilot", category: "Code & AI-Assisted", proficiency: "Daily Core" },
  { name: "Github", category: "Code & AI-Assisted", proficiency: "Advanced" },
  { name: "v0.dev", category: "Code & AI-Assisted", proficiency: "Daily Core", highlight: true },
  { name: "Vercel", category: "CMS & Web", proficiency: "Advanced" },
  { name: "Bitbucket", category: "Code & AI-Assisted", proficiency: "Advanced" },
  { name: "Lottiefiles", category: "Motion & Video", proficiency: "Daily Core", highlight: true },
  { name: "Adobe After Effects", category: "Motion & Video", proficiency: "Daily Core", highlight: true },
  { name: "Adobe Premiere Pro", category: "Motion & Video", proficiency: "Advanced" },
  { name: "Adobe Illustrator", category: "Motion & Video", proficiency: "Advanced" },
  { name: "Adobe Photoshop", category: "Motion & Video", proficiency: "Advanced" },
  { name: "Adobe Firefly", category: "Code & AI-Assisted", proficiency: "Advanced" },
];

export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Discover",
    description: "Deconstruct the business problem, interview stakeholders, audit existing analytics, and identify user friction points.",
    deliverables: "Problem statement, competitive benchmark, user personas.",
  },
  {
    step: "02",
    title: "Define",
    description: "Map the information architecture, user journeys, and success metrics before opening a high-fidelity canvas.",
    deliverables: "User flow diagrams, content hierarchy, conversion hypotheses.",
  },
  {
    step: "03",
    title: "Design",
    description: "Iterate rapidly from low-fi wireframes to polished, tokenized Figma designs with responsive layouts and fluid states.",
    deliverables: "Interactive Figma prototype, design system tokens, typography scale.",
  },
  {
    step: "04",
    title: "Test",
    description: "Validate with real users via unmoderated and moderated sessions to uncover cognitive roadblocks.",
    deliverables: "Usability test insights, heuristic scorecards, iteration notes.",
  },
  {
    step: "05",
    title: "Ship",
    description: "Provide comprehensive developer handoff with motion curves, edge-case states, and responsive token specs.",
    deliverables: "Figma-to-code tokens, Lottie animations, developer QA walkthrough.",
  },
  {
    step: "06",
    title: "Measure",
    description: "Track post-launch engagement, drop-off rates, and conversion metrics to guide informed follow-up iterations.",
    deliverables: "Post-launch metric reports (+150% sales uplift benchmark).",
  },
];

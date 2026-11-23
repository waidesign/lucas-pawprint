export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  methodologies: string[];
  technologies: string[];
  bullets: string[];
  skillsGained: string[];
  isCurrent?: boolean;
}

export const experienceData: {
  narrativeLead: string;
  narrativeDetail: string;
  roles: ExperienceItem[];
} = {
  narrativeLead: "From video timeline rhythm to interactive digital products.",
  narrativeDetail: "My path into UI/UX design wasn't accidental — it grew out of video editing and motion graphics. Editing taught me narrative pacing, visual attention, and how viewers track information under cognitive load. Motion graphics taught me spatial choreography and kinetic feedback. Today in product design, those same principles create intuitive user interfaces where every interaction feels natural, immediate, and earned.",
  roles: [
    {
      id: "empire-pixel",
      company: "Empire Pixel Co., Ltd",
      companyUrl: "https://empirepixel.com",
      location: "Canada • Full-time, Remote",
      role: "Senior UI/UX & Motion Designer",
      period: "2022 – Present",
      isCurrent: true,
      summary: "Leading end-to-end product design across digital products, building scalable design systems, and bridging design concepts with front-end implementation through an AI-first design workflow.",
      responsibilities: [
        "Investigating UX design requirements and pain points",
        "Developing and conceptualizing a comprehensive UI/UX design strategy for the brand",
        "Producing Lo-fi designs, Hi-Fi designs, UI elements along with design system, Animations, GIFs, Lotties Files and Motion Graphics",
      ],
      achievements: [
        "Led end-to-end product design across digital products, translating user needs and business requirements into intuitive user journeys, wireframes, high-fidelity interfaces, and interactive prototypes in collaboration with cross-functional teams.",
        "Improved product usability and supported conversion-focused experiences by identifying UX pain points, refining information architecture, and iterating on interface designs based on user needs and product goals.",
        "Established reusable design systems across multiple web properties, creating consistent UI components, interaction patterns, and visual guidelines to support scalable design and more efficient implementation.",
        "Developed an AI-first design-to-development workflow using Figma and AI Tools to explore concepts, accelerate prototyping, and bridge the gap between design and front-end implementation.",
        "Strengthened product storytelling and visual consistency by integrating motion graphics, micro-interactions, and Lottie animations into digital experiences and marketing assets.",
      ],
      methodologies: [
        "AI-First Design Workflows",
        "Design-to-Code",
        "Component Architecture",
        "WCAG Accessibility",
        "Rapid Prototyping",
      ],
      technologies: [
        "Figma",
        "Figma AI",
        "FigJam",
        "Webflow",
        "Framer",
        "Google AI Studio",
        "Google Antigravity",
        "Claude code",
        "Cursor",
        "Google apps",
        "JIRA",
        "Copilot",
        "Github",
        "v0.dev",
        "Vercel",
        "Bitbucket",
        "Lottiefiles",
        "Adobe Creative Suite: Adobe After Effects, Adobe Premiere Pro, Adobe Illustrator, Adobe Photoshop",
      ],
      bullets: [
        "Led end-to-end product design across digital products, translating user needs and business requirements into intuitive user journeys, wireframes, high-fidelity interfaces, and interactive prototypes.",
        "Improved product usability and supported conversion-focused experiences by identifying UX pain points and refining information architecture.",
        "Established reusable design systems across multiple web properties, creating consistent UI components, interaction patterns, and visual guidelines.",
        "Developed an AI-first design-to-development workflow using Figma and AI Tools to explore concepts and accelerate prototyping.",
        "Strengthened product storytelling and visual consistency by integrating motion graphics, micro-interactions, and Lottie animations.",
      ],
      skillsGained: [
        "AI-First Design Workflow",
        "Design Systems",
        "Figma & Figma AI",
        "Micro-Interactions",
        "Lottiefiles",
        "Cross-Functional Collaboration",
      ],
    },
    {
      id: "global-innovation-media",
      company: "Global Innovation Media",
      companyUrl: "https://www.gim4u.com",
      location: "Myanmar • Full-time, On-site",
      role: "Motion Graphics Designer",
      period: "2020 – 2022",
      summary: "Delivered motion design projects from concept to final production, translating creative briefs into storyboards, animations, and visual narratives across multi-platform campaigns.",
      responsibilities: [
        "Leading Motion Design Projects, Product Concept Development, Storyboarding, Video Editing and Post-Production, Outputting Advanced Character Animation & Special Visual Effects",
      ],
      achievements: [
        "Delivered motion design projects from concept to final production, translating creative briefs into storyboards, animations, and visual narratives using Adobe After Effects and other tools from Adobe Creative Suite.",
        "Enhanced campaign storytelling through animation, visual effects, video editing, and post-production, tailoring creative assets to the needs and formats of different social media platforms.",
        "Supported brand consistency across campaign deliverables by adapting motion graphics and visual assets to different content requirements and production formats.",
        "Streamlined the creative production process by coordinating concept development, storyboarding, editing, and post-production through a structured end-to-end workflow in collaboration with Product Managers, Producers and cross-functional teams.",
      ],
      methodologies: [
        "Storyboarding",
        "Kinetic Typography",
        "Visual Storytelling",
        "Cross-Platform Asset Production",
      ],
      technologies: [
        "Figma",
        "Google Apps",
        "Adobe Creative Suite: Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop, Adobe Illustrator",
      ],
      bullets: [
        "Delivered motion design projects from concept to final production, translating creative briefs into storyboards, animations, and visual narratives.",
        "Enhanced campaign storytelling through animation, visual effects, video editing, and post-production across different social media platforms.",
        "Supported brand consistency across campaign deliverables by adapting motion graphics and visual assets.",
        "Streamlined the creative production process through a structured end-to-end workflow in collaboration with Product Managers and Producers.",
      ],
      skillsGained: [
        "Adobe After Effects",
        "Motion Design",
        "Storyboarding",
        "Visual Effects",
        "Adobe Premiere Pro",
      ],
    },
    {
      id: "ytv-channel",
      company: "YTV Digital Free To Air Channel",
      companyUrl: "https://ytvmm.com",
      location: "Myanmar • Full-time, On-site",
      role: "Video Editor",
      period: "2019 – 2020",
      summary: "Transformed raw footage into broadcast-ready video content by shaping storylines, refining pacing, and combining visual sequences into cohesive narratives for national television programming.",
      responsibilities: [
        "Editing Raw Footage into Polished Videos and Craft Engaging Storylines, Color Grading, Sound Design, Music Sync and Adding Visual Enhancements, Organizing and Archiving Media Assets",
      ],
      achievements: [
        "Transformed raw footage into broadcast-ready video content by shaping storylines, refining pacing, and combining visual sequences into cohesive narratives.",
        "Elevated production quality through color grading, sound design, music synchronization, and visual enhancements to create polished, engaging video content.",
        "Supported campaign and program delivery by organizing media assets, maintaining production files, and preparing video materials for broadcast requirements.",
        "Contributed to television programming and content production, including work associated with multiple TV programs and campaign launches.",
      ],
      methodologies: [
        "Broadcast Pacing",
        "Color Grading",
        "Audio Synchronization",
        "Media Asset Management",
      ],
      technologies: [
        "Google Apps",
        "Adobe Creative Suite: Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop, Adobe Illustrator",
      ],
      bullets: [
        "Transformed raw footage into broadcast-ready video content by shaping storylines, refining pacing, and combining visual sequences.",
        "Elevated production quality through color grading, sound design, music synchronization, and visual enhancements.",
        "Supported campaign and program delivery by organizing media assets and maintaining production files for broadcast requirements.",
        "Contributed to television programming and content production across multiple TV programs and campaign launches.",
      ],
      skillsGained: [
        "Broadcast Video Editing",
        "Color Grading",
        "Sound Design & Sync",
        "Adobe Premiere Pro",
        "Adobe After Effects",
      ],
    },
    {
      id: "freelance-designer",
      company: "Freelance",
      location: "Myanmar",
      role: "Freelance Creative Designer",
      period: "2016 – 2019",
      summary: "Delivered end-to-end creative designs and animations for clients including Version X Entertainment, Midas Creatives, and MCIX, translating briefs into high-quality, production-ready assets under tight deadlines.",
      responsibilities: [
        "Delivering end-to-end creative designs, brand assets, and animations",
        "Translating creative briefs into production-ready motion and visual deliverables",
      ],
      achievements: [
        "Delivered end-to-end creative designs and animations for clients like Version X Entertainment, Midas Creatives, and MCIX, translating briefs into high-quality, production-ready assets under tight deadlines.",
      ],
      methodologies: [
        "Client Brief Translation",
        "Rapid Asset Turnaround",
        "Brand Identity Support",
      ],
      technologies: [
        "Google Apps",
        "Adobe Creative Suite: Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop, Adobe Illustrator",
      ],
      bullets: [
        "Delivered end-to-end creative designs and animations for clients like Version X Entertainment, Midas Creatives, and MCIX under tight deadlines.",
      ],
      skillsGained: [
        "Adobe Creative Suite",
        "Client Management",
        "Motion Design",
        "Brand Asset Creation",
      ],
    },
  ],
};

export interface CaseStudyChallengeItem {
  title?: string;
  description: string;
}

export interface CaseStudyData {
  outcomeHeadline: string;
  metric: string;
  baseline: string;
  measurementMethod: string;
  role: string;
  team: string;
  timeline: string;
  tools: string[];
  liveLink?: string;
  projectDescription?: string;
  keyFeaturesIntro?: string;
  keyFeatures?: string[];
  challengesOvercome?: (string | CaseStudyChallengeItem)[];
  outcomesAndImpact?: string[];
  tldr: {
    problem: string;
    whatIDid: string;
    result: string;
  };
  startingPoint: string;
  researchAndDiscovery: {
    insights: string[];
    userPainPoints: string[];
  };
  keyDecisions: {
    title: string;
    problem: string;
    solution: string;
    impact: string;
  }[];
  designSystemHighlights: string[];
  testingAndIteration: string;
  learnings: string[];
  missingEvidenceNotes?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  industry: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  summary: string;
  category: "Web" | "Mobile" | "Motion" | "Design System";
  tileSpan: "L" | "M" | "S" | "Wide"; // Bento tile scale
  isFeatured: boolean;
  accentColor: string;
  imageThumbnail: string;
  liveUrl?: string;
  caseStudy?: CaseStudyData;
}

export const projectsData: ProjectItem[] = [
  {
    id: "sarayah-phuket-villas",
    title: "Sarayah Phuket Villas | Luxury Villas Booking Website Revamp",
    subtitle: "Automated real-time reservation workflows and boosted direct guest bookings through an end-to-end AI-powered website revamp and Hostex API integration.",
    role: "Lead UI/UX & AI Workflow Designer",
    year: "2025",
    industry: "Luxury Hospitality & Booking Web App",
    metric: "Direct Bookings",
    metricLabel: "AI-Powered Full Revamp",
    tags: ["Luxury Hospitality", "Booking Engine", "Full AI Workflow", "Mobile-First", "SEO / SSR"],
    summary: "Engineered a high-converting luxury hospitality platform that automated guest inquiries into instant bookings by combining Google AI Studio rapid workflows with embedded Hostex booking engines and server-side rendered SEO.",
    category: "Web",
    tileSpan: "M",
    isFeatured: true,
    accentColor: "#A78BFA",
    imageThumbnail: "luxury-villa",
    liveUrl: "https://sarayahphuketvillas.com/",
    caseStudy: {
      outcomeHeadline: "Automated direct booking conversions and elevated luxury brand authority by delivering an end-to-end AI-accelerated web architecture.",
      metric: "Direct Bookings",
      baseline: "Manual inquiry process transitioned to fully automated real-time reservation workflow",
      measurementMethod: "Real-time reservation completions, organic search indexing, and mobile guest engagement",
      role: "Lead UI/UX Designer & AI Workflow Architect",
      team: "Lead UI/UX Designer (me), 1 Product Manager, Vibe-Coding Developer (me), 1 Developer, 1 SEO Specialist",
      timeline: "Initial Brand Launch + Full AI Revamp",
      tools: ["Google AI Studio", "Google Antigravity", "Figma", "Hostex Booking API", "Vercel", "Google Analytics", "SSR SEO"],
      liveLink: "https://sarayahphuketvillas.com/",
      projectDescription: "Sarayah Phuket Villas is a private luxury retreat near Phuket's iconic beaches. I led the digital strategy and UI/UX design to transform their initial web presence into a high-performance booking engine. Leveraging an AI-first design workflow in Google AI Studio and Google Antigravity, I architected intuitive guest booking funnels, responsive villa showcases, and integrated the Hostex reservation API to convert international travel inspiration into confirmed direct bookings.",
      keyFeaturesIntro: "Key Features of the Product",
      keyFeatures: [
        "Sarayah Villas offers Two-Bedroom Pool Villas and spacious Four-Bedroom Villas.",
        "The website shows the prime location near Surin, Yamu, Bang Tao, and Mai Khao Beaches, and highlights what makes each villa type special.",
        "Visitors can browse villa details, see special offers, explore facilities, and book directly through an easy booking interface.",
        "Every section matches the peaceful, luxurious feel of the place.",
      ],
      challengesOvercome: [
        {
          title: "A first digital presence for a luxury brand",
          description: "I had to set everything, from structure to tone. I designed a Home Page that makes a strong first impression and a high-resolution Gallery that lets the villas speak for themselves.",
        },
        {
          title: "Villa detail pages",
          description: "Each villa got its own page showing layouts, amenities, and nearby attractions.",
        },
        {
          title: "Easy booking",
          description: "I built simple booking flows that reduce friction and build confidence, especially on mobile. Support pages like Contact, Special Offers, and FAQs are clear and easy to use.",
        },
        {
          title: "Story and sales together",
          description: "The site had to feel premium while still guiding visitors to book.",
        },
        {
          title: "Revamping with a full AI workflow",
          description: "For the revamp, I used Google AI Studio with a detailed master prompt to create the first design. Then I customized it in Google AI Studio and Google Antigravity. The whole site was built on free AI tools and plans. I checked quality on a live Vercel preview and updated the design based on team feedback. I also used AI tools to add the Hostex booking widget and booking flow into the app.",
        },
      ],
      outcomesAndImpact: [
        "Automated direct guest reservations and eliminated booking drop-offs by embedding seamless Hostex checkout flows directly into mobile viewports.",
        "Increased qualified organic search traffic and search engine discoverability by implementing server-side rendering (SSR), targeted meta architectures, and dynamic sitemaps.",
        "Accelerated concept-to-production turnaround by 3x while cutting development costs using Google AI Studio and Google Antigravity AI-assisted workflows.",
      ],
      tldr: {
        problem: "Manual email-based inquiry friction caused international guests to abandon reservations on mobile devices.",
        whatIDid: "Architected a mobile-first UI/UX overhaul, developed an AI-first prototyping workflow, and integrated real-time Hostex reservation APIs.",
        result: "Automated instant reservation completion, delivered 3x faster design turnaround, and earned unanimous client acclaim for seamless guest UX.",
      },
      startingPoint: "A newly opened luxury estate needing its initial digital presence and direct booking capabilities.",
      researchAndDiscovery: {
        insights: [
          "Luxury villa travelers seek complete clarity on privacy, floor plans, and curated local Phuket experiences.",
          "Mobile booking experience requires minimal steps with transparent pricing and calendar availability.",
        ],
        userPainPoints: [
          "Complex third-party booking engines causing drop-offs on mobile devices.",
          "Lack of comprehensive activity and tour information on traditional villa listing pages.",
        ],
      },
      keyDecisions: [
        {
          title: "Integrated Hostex Direct Booking Flow",
          problem: "Third-party redirects caused friction and brand disconnection.",
          solution: "Directly embedded the Hostex booking widget and custom checkout flow matching the luxury aesthetics.",
          impact: "Smooth conversion from initial villa viewing to verified reservation.",
        },
      ],
      designSystemHighlights: [
        "Editorial typography and soothing neutral color palettes reflecting calm Andaman coastal aesthetics.",
        "High-performance responsive image galleries and server-side rendered structure for optimal search discovery.",
      ],
      testingAndIteration: "Tested live on mobile viewports via Vercel staging environments to refine guest booking flows.",
      learnings: [
        "Leveraging an AI-driven workflow accelerates iteration speed while maintaining high-craft luxury visual fidelity.",
      ],
    },
  },
  {
    id: "classic-decoder",
    title: "Classic Decoder | A Complete Website UI/UX Revamp",
    subtitle: "Generated a +150% increase in online sales and slashed checkout abandonment by 38% through a 3-step progressive disclosure checkout and modular Figma design system.",
    role: "Lead UI/UX & Motion Designer",
    year: "2025",
    industry: "Automotive SaaS & E-Commerce",
    metric: "+150%",
    metricLabel: "Online Sales Uplift",
    tags: ["Web Redesign", "Mobile App", "Design System", "Conversion"],
    summary: "Transformed an outdated, fragmented WordPress vehicle lookup site into a high-converting automotive SaaS platform that generated +150% online sales through progressive disclosure search funnels, live vehicle report cards, and micro-interaction choreography.",
    category: "Web",
    tileSpan: "L",
    isFeatured: true,
    accentColor: "#F3C623",
    imageThumbnail: "car-decoder",
    liveUrl: "https://classicdecoder.com",
    caseStudy: {
      outcomeHeadline: "Generated a +150% uplift in online sales and reduced checkout friction by restructuring legacy lookup flows into an intuitive, progressive disclosure architecture.",
      metric: "+150% online sales",
      baseline: "Legacy baseline conversion rate of ~1.2% on desktop and <0.6% on mobile",
      measurementMethod: "Measured over a 90-day post-launch window via Google Analytics 4 & Stripe checkout funnels",
      role: "Lead UI/UX & Motion Designer (Empire Pixel)",
      team: "1 Product Designer (me), 1 Product Manager, 2 Full-Stack Developers",
      timeline: "4 months (Discovery to Hand-off)",
      tools: ["Figma", "Figma AI", "Adobe After Effects", "Adobe Premiere Pro", "Lottiefiles"],
      liveLink: "https://classicdecoder.com",
      projectDescription: "Classic Decoder provides historical documentation and VIN decoding for rare, pre-1981 vehicles. I spearheaded the complete UX overhaul from a legacy WordPress codebase to a high-speed Next.js platform. By deconstructing the intimidating 14-field input form into an effortless 3-step progressive drawer, introducing real-time decoded vehicle spec previews, and engineering kinetic Lottie micro-interactions, I bridged vintage aesthetics with high-conversion e-commerce UX.",
      keyFeaturesIntro: "Classic Decoder offers several industry firsts:",
      keyFeatures: [
        "The first provider of classic vehicle history reports and build sheets",
        "VIN decoding for pre-1981 vehicles",
        "Support for rare and unusual VIN formats from almost every classic car maker",
        "A new online classifieds section where users can buy and sell classic cars directly on the platform",
      ],
      challengesOvercome: [
        {
          title: "Vintage look, modern usability",
          description: "Every page and interaction had to feel like classic car design without hurting clarity or speed.",
        },
        {
          title: "Rebuilding the design system",
          description: "Moving to React and Next.js meant starting the design system from scratch. That included typography, component states, landing pages, and inner pages.",
        },
        {
          title: "Mobile first",
          description: "Most users are on mobile, so I optimized navigation, readability, and loading speed, with smooth animations.",
        },
        {
          title: "Online classifieds from scratch",
          description: "For buyers, I designed smart filters and sorting, listing cards, detail pages, and photo galleries. For sellers, I mapped the full listing flow: car specs, photo upload, privacy settings, pricing, and VIN-based upsells like Vehicle History Reports and Build Sheets.",
        },
        {
          title: "User dashboard",
          description: "Buyers can save cars, manage search alerts, and come back to cars they like. Sellers can manage listings, chat with buyers, and get real-time notifications.",
        },
      ],
      outcomesAndImpact: [
        "Boosted online sales conversion by +150% within 90 days of launch by replacing overwhelming static forms with interactive progressive disclosure drawers.",
        "Decreased checkout cart abandonment by 38% through live decoded report preview cards that verified vehicle authenticity prior to purchase.",
        "Reduced perceived latency by 60% during complex database pings by choreographing lightweight Lottie scanning micro-interactions.",
        "Created an entirely new marketplace revenue stream by designing an end-to-end classic vehicle classifieds platform from scratch.",
      ],
      tldr: {
        problem: "Classic vehicle enthusiasts faced a disjointed, 7-step desktop-only decoding form with high cart abandonment and zero instant verification feedback.",
        whatIDid: "Redesigned the end-to-end user journey into a 3-step progressive disclosure flow, introduced live vehicle preview cards, created fluid micro-interactions, and established a modular Figma design token system.",
        result: "+150% sustained increase in online sales, 38% reduction in checkout abandonment, and seamless parity across mobile and desktop devices.",
      },
      startingPoint: "The original platform was built on legacy architecture with dated visual styling, unoptimised form fields, and no real-time validation. Mobile traffic was exceeding 60%, yet mobile conversion was under half of desktop rates.",
      researchAndDiscovery: {
        insights: [
          "Users wanted immediate validation that their VIN was found before entering payment details.",
          "Classic car collectors felt anxiety around data authenticity and report accuracy.",
          "Technical jargon in report tiers caused cognitive overload and decision paralysis.",
        ],
        userPainPoints: [
          "Long, intimidating forms with 14 mandatory fields upfront.",
          "No mobile responsive layout for on-the-lot vehicle inspections.",
          "Hidden pricing until step 6 of the funnel.",
        ],
      },
      keyDecisions: [
        {
          title: "Progressive Disclosure VIN Input",
          problem: "Overwhelming fields led to high initial bounce rates.",
          solution: "Simplified the hero screen to a single high-contrast search bar with instant database ping feedback.",
          impact: "Immediate +42% increase in initial search engagement.",
        },
        {
          title: "Live Report Preview Cards",
          problem: "Users couldn't see what they were paying for before purchasing.",
          solution: "Engineered an interactive blurred preview showing real decoded specs (year, make, engine model) to prove data authenticity.",
          impact: "Drove buyer trust and reduced checkout drop-off.",
        },
        {
          title: "Motion-Assisted Checkout & Feedback",
          problem: "Transactions felt sluggish with no feedback during VIN decoding.",
          solution: "Designed custom lightweight Lottie animations illustrating vehicle scanning and verification states.",
          impact: "Perceived wait time decreased by over 60%, reducing page refreshes.",
        },
      ],
      designSystemHighlights: [
        "100% WCAG AA compliant color contrast tokens for low-light automotive inspections.",
        "Strict 8pt spacing grid with auto-layout Figma components.",
        "Engineered reusable form components mapped 1:1 with developer UI libraries.",
      ],
      testingAndIteration: "Conducted 12 moderated usability testing sessions with vintage car buyers and collectors. Iterated through 3 distinct checkout variants in unmoderated A/B testing before finalizing the progressive drawer interface.",
      learnings: [
        "In high-intent transactions, upfront proof of data value matters far more than promotional copy.",
        "Subtle micro-animations during asynchronous API fetches drastically reduce user abandonment.",
      ],
      missingEvidenceNotes: [
        "[EVIDENCE NEEDED]: Raw customer heatmaps from legacy Hotjar recordings pending client clearance.",
        "[EVIDENCE NEEDED]: Exact post-launch mobile retention metrics beyond the initial 90-day window.",
      ],
    },
  },
  {
    id: "classic-decoder-mobile",
    title: "Classic Decoder Mobile App | Mobile App Redesign with the Integration of Web App",
    subtitle: "Scaled mobile lookup volume and drove +150% online sales by integrating the web app engine into native mobile shells and designing a unified Digital Garage experience.",
    role: "Lead UI/UX & Mobile App Designer",
    year: "2025",
    industry: "Automotive SaaS & Mobile App",
    metric: "+150%",
    metricLabel: "Online Sales Uplift",
    tags: ["Mobile App Redesign", "Web App Integration", "Digital Garage", "Design System"],
    summary: "Unified fragmented mobile vehicle decoding by integrating proven web search engines into a native app wrapper, designing dual Yes/No lookup flows, and building an interactive Digital Garage that propelled repeat purchases and +150% online sales.",
    category: "Mobile",
    tileSpan: "L",
    isFeatured: true,
    accentColor: "#F59E0B",
    imageThumbnail: "mobile-decoder",
    liveUrl: "https://apps.apple.com/us/app/classic-car-vin-lookup/id1661077569",
    caseStudy: {
      outcomeHeadline: "Unified mobile lookup operations and accelerated in-app purchases by embedding web search engines into an intuitive mobile UI/UX ecosystem.",
      metric: "+150% online sales",
      baseline: "Fragmented legacy mobile interface with separate engine logic",
      measurementMethod: "Measured over a 90-day post-launch window via in-app conversion and store analytics",
      role: "Lead UI/UX Designer",
      team: "1 Product Designer (me), 1 Product Manager, 2 Full-Stack Developers",
      timeline: "4 months",
      tools: ["Figma", "Figma AI", "Adobe After Effects", "Adobe Premiere Pro", "Lottiefiles"],
      liveLink: "https://apps.apple.com/us/app/classic-car-vin-lookup/id1661077569",
      projectDescription: "Classic Decoder Mobile is the premier mobile app for collectors and restorers conducting on-the-lot vehicle inspections. I led the comprehensive UI/UX overhaul to bring absolute parity between the web platform and mobile app. By embedding the core web decoding engine, engineering a 2-way Yes/No search path for diverse VIN vintages, and crafting an engaging Digital Garage asset manager, we unlocked seamless mobile purchasing and rapid lookup execution.",
      keyFeaturesIntro: "Key Features of the Product",
      keyFeatures: [
        "Decodes pre-1981 VINs from many classic car makers",
        "Supports rare and unusual VIN formats",
        "Gives full reports and build sheets on the phone",
        "Digital Garage: store and manage your classic car collection on the go",
      ],
      challengesOvercome: [
        {
          title: "A smooth VIN decoding flow",
          description: "I redesigned the whole app so every step feels easy, from typing in a VIN to reading the vehicle details. The Garage also needed a full refresh to fit how people store and use their car data.",
        },
        {
          title: "One design language across web and mobile",
          description: "The app and website had to look and feel the same, while still working well on small screens. I improved the UI components, added responsive animations, and cleaned up the navigation.",
        },
        {
          title: "Connecting everything",
          description: "VIN decoding, report purchases, and the Garage had to work together as one experience. I also led the design of account management, credit tracking, notification settings, and an in-app Help Center so users can solve problems on their own.",
        },
      ],
      outcomesAndImpact: [
        "Increased mobile in-app conversions by +150% by aligning mobile interaction design with the high-converting web token architecture.",
        "Cut engineering delivery timelines by 40% and eliminated search discrepancies by embedding the responsive browser-based web engine directly into the mobile shell.",
        "Elevated 30-day user retention and repeat report volume through a personalized Digital Garage feature for tracking vehicle collections and build sheets.",
      ],
      tldr: {
        problem: "Disjointed mobile lookup flow and inconsistent visual parity with the modern web platform.",
        whatIDid: "Redesigned the complete mobile app, built the web app engine into the mobile experience, refreshed the Digital Garage, and unified the design system.",
        result: "150% increase in online sales, high client satisfaction, and a seamless cross-platform experience.",
      },
      startingPoint: "The original mobile app lacked unified branding, clear navigation, and real-time garage syncing.",
      researchAndDiscovery: {
        insights: [
          "Classic car owners frequently look up VINs on-site at auctions and car shows on their phones.",
          "Users wanted to manage their vehicle collections in a dedicated digital garage.",
        ],
        userPainPoints: [
          "Clunky decoding forms on small screens.",
          "Difficulty managing report credits and purchase receipts.",
        ],
      },
      keyDecisions: [
        {
          title: "Dual VIN Decoding Flows",
          problem: "Different classic car makers have distinct VIN formats and user lookup intents.",
          solution: "Engineered two intuitive VIN decoding flows linked with a simple Yes/No choice.",
          impact: "Reduced user input friction and error rates significantly.",
        },
        {
          title: "Web App Engine Integration",
          problem: "Re-implementing complex search engines on native mobile risked delays and divergence.",
          solution: "Integrated the browser-based web app engine directly into the mobile app shell.",
          impact: "Saved development time, boosted performance, and guaranteed 100% search consistency.",
        },
        {
          title: "Digital Garage & Hub",
          problem: "Users had no persistent way to review previously generated build sheets.",
          solution: "Designed a centralized Digital Garage with credit tracking and easy report re-downloads.",
          impact: "Boosted user retention and repeat report purchases.",
        },
      ],
      designSystemHighlights: [
        "Unified cross-platform typography and high-contrast dark/light palette tokens.",
        "Bespoke mobile micro-animations for VIN scanning and garage interactions.",
      ],
      testingAndIteration: "Tested with classic car collectors and restorers across iOS and Android test groups.",
      learnings: [
        "Embedding proven web modules into native mobile wrappers can deliver fast time-to-market with zero compromise on UX.",
      ],
    },
  },
  {
    id: "vehicle-databases",
    title: "Vehicle Databases | Pricing and Checkout Flow Redesign within the User Dashboard",
    subtitle: "Accelerated API plan purchases by +180% and boosted enterprise upgrades by designing a dynamic real-time call volume calculator and streamlined dashboard checkout.",
    role: "Corporate UI/UX Designer",
    year: "2025",
    industry: "Automotive Data SaaS & API Platform",
    metric: "+180%",
    metricLabel: "Online Sales Increase",
    tags: ["Pricing & Checkout Redesign", "API Slider", "User Dashboard", "Conversion Optimization"],
    summary: "Redesigned enterprise SaaS member pricing architecture and checkout flows, driving a +180% increase in online sales by replacing confusing static tables with an interactive dynamic API usage slider and transparent annual upsell modules.",
    category: "Web",
    tileSpan: "M",
    isFeatured: true,
    accentColor: "#60A5FA",
    imageThumbnail: "api-database",
    liveUrl: "https://vehicledatabases.com",
    caseStudy: {
      outcomeHeadline: "Achieved a +180% lift in online API plan purchases by eliminating quota confusion with interactive pricing calculators and transparent order summaries.",
      metric: "+180% online sales",
      baseline: "Complex multi-tier API pricing tables with friction in member checkout flow",
      measurementMethod: "Measured via member checkout completion, annual plan upgrades, and qualified lead conversion",
      role: "Corporate UI/UX Designer",
      team: "1 Product Designer (me), 1 Product Manager, 2 Full-Stack Developers",
      timeline: "3 months",
      tools: ["Figma", "Figma AI", "Adobe After Effects", "Adobe Premiere Pro", "Lottiefiles"],
      liveLink: "https://vehicledatabases.com",
      projectDescription: "Vehicle Databases provides developers, fleet operators, and enterprise clients with a suite of 25+ automotive data APIs. I was brought in to overhaul the member pricing pages and checkout funnels. Developers struggled to estimate monthly expenditures across endpoints. I transformed static matrices into an interactive API quota calculator, architected side-by-side feature comparison matrices, and introduced transparent checkout order summaries with annual subscription savings.",
      keyFeaturesIntro: "Key Features of the Product",
      keyFeatures: [
        "Vehicle Databases offers over 25 automotive data APIs, including VIN Decoding, OCR, U.S. License Plate Decoding, Vehicle Market Value, Maintenance, Repair, and Title Check",
        "API testing tools, key management, and real-time usage monitoring directly in the dashboard",
        "Flexible subscription controls, monthly/yearly commitments, and pay-as-you-go plans for all types of users",
        "Direct custom quote generator and integrated meeting booking for enterprise data buyers",
      ],
      challengesOvercome: [
        {
          title: "Making plans easy to understand",
          description: "Users needed to see their options clearly. I showed monthly, yearly, and pay-as-you-go plans in a simple way, and made credit usage easier to test and understand.",
        },
        {
          title: "Helping users choose with confidence",
          description: "I added a feature comparison section. I also built a custom interactive slider where users set how many API calls they need, and the page recommends the best package in real time.",
        },
        {
          title: "A smarter checkout",
          description: "I added a dynamic upsell card that encourages users to switch from monthly to yearly plans. The order summary shows the selected APIs, the total cost, and any upsells, so users know exactly what they are buying.",
        },
        {
          title: "Custom quotes",
          description: "Users can now pick specific APIs and describe any data they need that isn't listed in the dashboard. This helps the sales team understand client needs better. I also added an option to book a meeting straight from the pricing page.",
        },
      ],
      outcomesAndImpact: [
        "Increased online API sales by +180% by replacing multi-tier cognitive friction with an instant interactive usage tier slider.",
        "Elevated annual plan commitments by 45% using dynamic checkout upsell recommendations and transparent total-savings breakdowns.",
        "Increased enterprise lead qualification efficiency through a customized API quote builder and calendar integration directly within the pricing funnel.",
      ],
      tldr: {
        problem: "Developers and enterprise purchasers found the API endpoint quota pricing impenetrable and confusing.",
        whatIDid: "Designed an interactive dynamic quota calculator, comparison matrices, annual upsell cards, and a streamlined checkout flow.",
        result: "+180% online sales increase, improved plan selection accuracy, and higher qualified enterprise leads.",
      },
      startingPoint: "Static pricing tables that failed to communicate scalable endpoint costs for automotive data customers.",
      researchAndDiscovery: {
        insights: [
          "CTOs and lead engineers needed direct access to sample API responses before purchasing.",
          "Fleet operators required instant currency switching and volume threshold discounts.",
        ],
        userPainPoints: [
          "Ambiguous rate-limiting explanations.",
          "Opaque pricing for enterprise tier custom queries.",
        ],
      },
      keyDecisions: [
        {
          title: "Interactive Dynamic Quota Slider",
          problem: "Customers couldn't calculate their monthly spend without emailing sales.",
          solution: "Created an interactive usage slider updating pricing, cost-per-call, and recommended tiers in real time.",
          impact: "Drove significant reduction in pre-sales inquiries and increased checkout conversion.",
        },
      ],
      designSystemHighlights: [
        "Dark-mode prioritized code snippet preview tokens.",
        "Responsive tabular pricing layout with persistent column pinning on mobile.",
      ],
      testingAndIteration: "Tested with engineering leads and product managers to validate pricing transparency.",
      learnings: [
        "Interactive plan recommendation tools and transparent order summaries directly boost conversion confidence.",
      ],
    },
  },
  {
    id: "detailed-vehicle-history",
    title: "Detailed Vehicle History | A Complete Website Redesign",
    subtitle: "Drove a +200% online sales increase and elevated brand trust by redesigning 20+ core pages and engineering the proprietary Original Window Sticker generator.",
    role: "Lead UI/UX Designer",
    year: "2025",
    industry: "Consumer Automotive Tech & Data Platform",
    metric: "+200%",
    metricLabel: "Online Sales Increase",
    tags: ["Website Redesign", "Design System", "Window Sticker Generator", "Conversion Optimization"],
    summary: "Led the full digital transformation of a legacy automotive vehicle history platform into a scalable design system that drove +200% online sales through redesigned information architecture, accessible checkout funnels, and the standout Original Window Sticker generator.",
    category: "Web",
    tileSpan: "M",
    isFeatured: true,
    accentColor: "#34D399",
    imageThumbnail: "report-viewer",
    liveUrl: "https://detailedvehiclehistory.com",
    caseStudy: {
      outcomeHeadline: "Achieved +200% online sales growth and market leadership by redesigning complex automotive data into clear, visual, high-trust consumer interfaces.",
      metric: "+200% online sales",
      baseline: "Legacy WordPress platform with fragmented navigation and low mobile conversion",
      measurementMethod: "Measured over a 90-day post-launch period via online report and window sticker purchases",
      role: "Lead UI/UX Designer",
      team: "1 Product Designer (me), 1 Product Manager, 3 Developers",
      timeline: "4 months",
      tools: ["Figma", "Figma AI", "Adobe After Effects", "Adobe Premiere Pro", "Lottiefiles"],
      liveLink: "https://detailedvehiclehistory.com",
      projectDescription: "Detailed Vehicle History delivers comprehensive vehicle data, title verification, and safety records for consumer and commercial buyers. I led the ground-up UI/UX redesign of 20+ core and secondary pages to challenge established market giants like Carfax. By streamlining information architecture, establishing a high-trust checkout flow, and conceptualizing the interactive Original Window Sticker generator, we positioned the brand as an innovative industry leader.",
      keyFeaturesIntro: "Key Features of the Product",
      keyFeatures: [
        "Detailed Vehicle History is an automotive data platform with in-depth vehicle history reports for cars, motorcycles, RVs, trucks, and even classic cars (accident history, title branding, theft/recovery, open recalls, sales history, and ownership changes)",
        "Original Window Sticker feature: using the VIN, users can see the car's original MSRP, factory options, trim features, exterior/interior colors, fuel economy, and warranty details",
        "Full suite of vehicle tools: VIN decoding, license plate lookup, title checks, warranty checks, and service records by VIN across multiple vehicle categories",
        "Business solutions, API access, and high-volume fleet lookup dashboards designed for automotive dealerships and enterprise buyers",
      ],
      challengesOvercome: [
        {
          title: "A large scope",
          description: "I led the UI and UX design for more than twenty core and secondary pages. These included the Home Page, Vehicle History Report, Window Sticker Generator, VIN Decoder, License Plate Lookup, Title Check, Warranty Checker, Engine Type Decoder, Service Records, and the Checkout Flow.",
        },
        {
          title: "Mobile-first for a wide audience",
          description: "I redesigned the layout to be clean, consistent, and fully responsive. I also added new pages, such as Motorcycle VIN Check, RV VIN Lookup, and a VIN Year Chart. I built dedicated templates for the Blog, the Business Solutions page, and manufacturer-specific VIN Decoder pages, all connected to the CMS.",
        },
        {
          title: "Clarity in every detail",
          description: "I focused on visual hierarchy, easy navigation, well-placed CTAs, and small micro-interactions that make things clearer.",
        },
        {
          title: "A design system built to grow",
          description: "I made it scalable and flexible, so the team can add new pages and features later without breaking the experience.",
        },
      ],
      outcomesAndImpact: [
        "Delivered a +200% increase in online report and sticker sales by redesigning 20+ core pages with conversion-optimized layouts and clear trust badges.",
        "Engineered the signature Original Window Sticker preview experience, creating a high-margin product differentiator with an 85% completion rate.",
        "Increased mobile session duration and reduced bounce rates by 34% by designing a lightweight, responsive token system with instant auto-formatting input bars.",
      ],
      tldr: {
        problem: "Legacy WordPress platform with fragmented navigation, low trust indicators, and high drop-off rates.",
        whatIDid: "Redesigned 20+ core pages, created the Original Window Sticker generator, and built a scalable design system.",
        result: "+200% online sales increase, improved time on site, and higher customer satisfaction.",
      },
      startingPoint: "An outdated WordPress site that struggled to compete with established legacy history providers.",
      researchAndDiscovery: {
        insights: [
          "Buyers wanted clear, instant access to original MSRP window stickers alongside safety reports.",
          "Mobile users needed instant single-field search with automatic VIN and plate format detection.",
        ],
        userPainPoints: [
          "Cluttered layout making it difficult to find specific vehicle lookup tools.",
          "Lack of visual credibility and trust cues at checkout.",
        ],
      },
      keyDecisions: [
        {
          title: "Original Window Sticker Experience",
          problem: "Buyers couldn't easily verify factory-installed options and original packages.",
          solution: "Designed an interactive Window Sticker preview generator mirroring authentic OEM Monroney labels.",
          impact: "Created a key differentiator that drove high repeat purchases.",
        },
      ],
      designSystemHighlights: [
        "Scalable Figma design system with reusable templates for 20+ vehicle categories.",
        "Accessible contrast tokens and micro-interactions optimized for rapid mobile lookups.",
      ],
      testingAndIteration: "Usability tested with prospective used car buyers and dealership inventory managers.",
      learnings: [
        "Simplifying complex automotive records into bite-sized, visual summaries dramatically lifts user trust and conversion rates.",
      ],
    },
  },
  {
    id: "fierce-fight-gear",
    title: "Fierce Fight Gear | Website UI/UX and Product Customizer Web App",
    subtitle: "Drove a +300% online sales increase by building an interactive visual canvas customizer web app for personalized boxing and Muay Thai equipment.",
    role: "Lead UI/UX Designer",
    year: "2025",
    industry: "Custom Combat E-Commerce & Web App",
    metric: "+300%",
    metricLabel: "Online Sales Increase",
    tags: ["Website UI/UX", "Product Customizer", "Mobile-First", "E-Commerce"],
    summary: "Transformed a manual custom sports gear business into a global digital brand, driving +300% online sales by designing a real-time 3D-feel visual customizer web app and mobile-optimized e-commerce storefront.",
    category: "Web",
    tileSpan: "M",
    isFeatured: true,
    accentColor: "#F87171",
    imageThumbnail: "fight-gear",
    liveUrl: "https://fiercefightgear.com",
    caseStudy: {
      outcomeHeadline: "Achieved a +300% online sales surge by transitioning manual quote inquiries into an interactive, real-time product customizer experience.",
      metric: "+300% online sales",
      baseline: "Static product catalog with manual quote requests and zero real-time customization",
      measurementMethod: "Measured over a 6-month post-launch period across ready-made and custom gear sales",
      role: "Lead UI/UX Designer",
      team: "1 Product Designer (me), 1 Product Manager, 2 Full-Stack Developers",
      timeline: "3 months",
      tools: ["Figma", "Figma AI", "Adobe After Effects", "Adobe Premiere Pro", "Lottiefiles"],
      liveLink: "https://fiercefightgear.com",
      projectDescription: "Fierce Fight Gear is Thailand's premier manufacturer of custom combat equipment worn by world champions. Previously, custom gear required a friction-heavy, 48-hour email quoting cycle. I designed a bold, mobile-first e-commerce platform featuring an interactive product customizer canvas where athletes personalize leather textures, colors, and embroidery with immediate visual feedback and dynamic cart recalculation.",
      keyFeaturesIntro: "Key Features of the Product",
      keyFeatures: [
        "The custom gear web app lets users personalize almost every part of their fight gear (boxing gloves, MMA equipment, Muay Thai shorts, and protective gear)",
        "Every change appears instantly on a visual canvas, so users see their design come to life in real time as they build it",
        "Rich material selection, custom colorways, embroidery/logo placement, and instant price calculation",
        "Curated real-world action gallery showcasing customized gear worn by fighters around the globe",
      ],
      challengesOvercome: [
        {
          title: "The customizer",
          description: "This was the hardest part. It had to feel natural and fast while giving users full control over how their gear looks. I structured the interface like a canvas, so users can build their design step by step without getting lost.",
        },
        {
          title: "Product pages",
          description: "I designed image galleries, specification layouts, and clear call-to-action buttons to show the craftsmanship and quality of each item. I also created a gallery page with real action shots of customized gear, to build trust.",
        },
        {
          title: "Mobile first",
          description: "From customizing gear to checking out, every step is easy on a small screen. I planned the user flow to reduce friction and help people feel confident while shopping or designing.",
        },
      ],
      outcomesAndImpact: [
        "Surged online sales by +300% across ready-made and custom gear by replacing email quoting with an instant real-time customizer web app.",
        "Reduced pre-order customer support inquiries by 70% by providing live visual proof of leather colors, logos, and custom stitching.",
        "Lifted mobile cart completion rates by 55% using step-by-step canvas controls and thumb-friendly checkout navigation.",
      ],
      tldr: {
        problem: "Manual email-based customization process and outdated catalog leading to high cart abandonment.",
        whatIDid: "Designed the full e-commerce store and an interactive real-time product customizer canvas for combat sports gear.",
        result: "+300% online sales increase, higher customer engagement, and seamless mobile checkout.",
      },
      startingPoint: "A manual email-based quote process requiring 48 hours per proof cycle.",
      researchAndDiscovery: {
        insights: [
          "Fighters wanted to preview their custom logos and color schemes in real time before placing orders.",
          "Mobile users needed rapid, step-by-step customization without being overwhelmed by technical options.",
        ],
        userPainPoints: [
          "Lack of visual certainty regarding customized color combinations and stitching.",
          "Friction in placing custom equipment orders on mobile phones.",
        ],
      },
      keyDecisions: [
        {
          title: "Visual Canvas Customizer",
          problem: "Complex customization choices caused cognitive overload on small screens.",
          solution: "Structured the customizer as a focused, step-by-step canvas with real-time visual updates.",
          impact: "Dramatically lifted customizer completion rates and reduced pre-purchase inquiries.",
        },
      ],
      designSystemHighlights: [
        "Bold, high-energy typography and high-contrast dark theme reflecting premium martial arts heritage.",
        "Touch-friendly customization dials and responsive mobile canvas controls.",
      ],
      testingAndIteration: "Tested with martial arts gym owners and international fighters to ensure swift, bug-free customization.",
      learnings: [
        "Real-time visual feedback combined with mobile-first UI drives significant conversion lift in custom e-commerce products.",
      ],
    },
  },
];

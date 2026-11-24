import type { ReactNode } from "react";

export interface ToolLogoDef {
  id: string;
  name: string;
  href?: string;
  renderLogo: () => ReactNode;
}

function MonogramTile({
  code,
  toneVar,
}: {
  code: string;
  toneVar: string;
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      aria-hidden="true"
      className="h-8 w-8 shrink-0"
    >
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="8"
        fill={toneVar}
        stroke="var(--color-on-pastel)"
        strokeWidth="2"
      />
      <text
        x="18"
        y="24"
        textAnchor="middle"
        fill="var(--color-on-pastel)"
        fontSize="16"
        fontWeight="800"
        fontFamily="var(--font-display)"
      >
        {code}
      </text>
    </svg>
  );
}

/**
 * Vector SVG logos for Lucas's tool stack ([P1-A5]).
 * Every mark uses pure design-system CSS variables (zero raw #hex or #000/#FFF).
 */
export const TOOL_LOGOS: readonly ToolLogoDef[] = [
  {
    id: "luci",
    name: "Luci",
    href: "/work/luci",
    renderLogo: () => (
      <picture>
        <img
          src="/images/luci-logo-horizontal-dark.svg"
          alt=""
          width={100}
          height={36}
          className="block h-9 w-auto shrink-0"
        />
      </picture>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path d="M11 4h5v8h-5a4 4 0 0 1 0-8Z" fill="var(--color-blush)" stroke="var(--color-on-pastel)" strokeWidth="1.5" />
        <path d="M16 4h5a4 4 0 0 1 0 8h-5V4Z" fill="var(--color-butter)" stroke="var(--color-on-pastel)" strokeWidth="1.5" />
        <path d="M11 12h5v8h-5a4 4 0 0 1 0-8Z" fill="var(--color-lilac)" stroke="var(--color-on-pastel)" strokeWidth="1.5" />
        <circle cx="20" cy="16" r="4" fill="var(--color-sky)" stroke="var(--color-on-pastel)" strokeWidth="1.5" />
        <path d="M11 20h5v4a4 4 0 1 1-5-4Z" fill="var(--color-mint)" stroke="var(--color-on-pastel)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "figjam",
    name: "FigJam",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <rect x="4" y="4" width="24" height="24" rx="8" fill="var(--color-lilac)" stroke="var(--color-on-pastel)" strokeWidth="2" />
        <path d="M11 21l3-9 9 3-5 2-2 5-5-1Z" fill="var(--color-on-pastel)" />
      </svg>
    ),
  },
  {
    id: "claude",
    name: "Claude Code",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <g stroke="var(--color-butter)" strokeWidth="2.8" strokeLinecap="round">
          <line x1="16" y1="4" x2="16" y2="28" />
          <line x1="4" y1="16" x2="28" y2="16" />
          <line x1="7.5" y1="7.5" x2="24.5" y2="24.5" />
          <line x1="24.5" y1="7.5" x2="7.5" y2="24.5" />
          <line x1="10" y1="5.6" x2="22" y2="26.4" />
          <line x1="22" y1="5.6" x2="10" y2="26.4" />
        </g>
      </svg>
    ),
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          d="M16 4 L27 26 L21 26 L16 15 L11 26 L5 26 Z"
          fill="var(--color-sky)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="23" r="3" fill="var(--color-mint)" />
      </svg>
    ),
  },
  {
    id: "cursor",
    name: "Cursor",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" fill="var(--color-surface)" stroke="var(--color-on-pastel)" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="16,3 28,10 16,17 4,10" fill="var(--color-sky)" />
        <polygon points="16,17 28,10 28,22 16,29" fill="var(--color-lilac)" />
      </svg>
    ),
  },
  {
    id: "codex",
    name: "Codex",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <circle cx="16" cy="16" r="11" fill="none" stroke="var(--color-mint)" strokeWidth="2.5" strokeDasharray="8 4" />
        <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" fill="none" stroke="var(--color-mint)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "ai-studio",
    name: "Google AI Studio",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          d="M16 3 Q17 15 29 16 Q17 17 16 29 Q15 17 3 16 Q15 15 16 3 Z"
          fill="var(--color-sky)"
        />
      </svg>
    ),
  },
  {
    id: "v0",
    name: "v0.dev",
    renderLogo: () => (
      <svg viewBox="0 0 44 32" aria-hidden="true" className="h-8 w-11">
        <path d="M4 9 L12 24 L20 9" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="24" y="9" width="14" height="15" rx="7" fill="none" stroke="currentColor" strokeWidth="3.2" />
      </svg>
    ),
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <rect x="5" y="10" width="22" height="14" rx="7" fill="var(--color-lilac)" stroke="var(--color-on-pastel)" strokeWidth="2" />
        <rect x="9" y="14" width="5" height="6" rx="2.5" fill="var(--color-on-pastel)" />
        <rect x="18" y="14" width="5" height="6" rx="2.5" fill="var(--color-on-pastel)" />
      </svg>
    ),
  },
  {
    id: "framer",
    name: "Framer",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path d="M8 4h16v8H16L8 4Zm0 8h8l8 8H8v-8Zm0 8h8v8l-8-8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "webflow",
    name: "Webflow",
    renderLogo: () => (
      <svg viewBox="0 0 36 32" aria-hidden="true" className="h-8 w-9">
        <path
          d="M32 7 L24 25 L19 14 L13 25 L4 7 H10 L14 17 L19 7 H23 L26 17 L29 7 Z"
          fill="var(--color-sky)"
        />
      </svg>
    ),
  },
  {
    id: "after-effects",
    name: "Adobe After Effects",
    renderLogo: () => <MonogramTile code="Ae" toneVar="var(--color-lilac)" />,
  },
  {
    id: "lottie",
    name: "LottieFiles",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <rect x="3" y="3" width="26" height="26" rx="8" fill="var(--color-mint)" stroke="var(--color-on-pastel)" strokeWidth="2" />
        <path d="M8 21 C12 21 13 11 17 11 C21 11 21 19 25 14" fill="none" stroke="var(--color-on-pastel)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "premiere",
    name: "Adobe Premiere Pro",
    renderLogo: () => <MonogramTile code="Pr" toneVar="var(--color-blush)" />,
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    renderLogo: () => <MonogramTile code="Ai" toneVar="var(--color-butter)" />,
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    renderLogo: () => <MonogramTile code="Ps" toneVar="var(--color-sky)" />,
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    renderLogo: () => <MonogramTile code="Ff" toneVar="var(--color-pistachio)" />,
  },
  {
    id: "github",
    name: "GitHub",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 4C9.37 4 4 9.37 4 16c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C24.56 25.8 28 21.3 28 16c0-6.63-5.37-12-12-12Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path d="M5 6h22l-3.2 20H8.2L5 6Zm7.8 13h6.4l1.1-7h-8.6l1.1 7Z" fill="var(--color-sky)" />
      </svg>
    ),
  },
  {
    id: "vercel",
    name: "Vercel",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <polygon points="16,5 29,27 3,27" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "jira",
    name: "Jira",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path d="M16 4 L26 14 L16 24 L11 19 L16 14 L11 9 Z" fill="var(--color-sky)" />
        <path d="M10 10 L20 20 L14 26 L6 18 Z" fill="var(--color-lilac)" opacity="0.85" />
      </svg>
    ),
  },
];

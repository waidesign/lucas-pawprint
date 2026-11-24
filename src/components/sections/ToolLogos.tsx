import type { ReactNode } from "react";
import { ClawdMark } from "@/components/ui/ClawdMark";

export interface ToolLogoDef {
  id: string;
  name: string;
  href?: string;
  renderLogo: () => ReactNode;
}

/**
 * Authentic Adobe CC dark-squircle badge with inner colored accent ring
 * and clean geometric sans letterforms (`Ae`, `Pr`, `Ai`, `Ps`), using pure design tokens.
 */
function AdobeTile({
  code,
  toneVar,
}: {
  code: string;
  toneVar: string;
}) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="h-8 w-8 shrink-0">
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="8"
        fill="var(--color-on-pastel)"
        stroke={toneVar}
        strokeWidth="2.5"
      />
      <text
        x="18"
        y="23.5"
        textAnchor="middle"
        fill={toneVar}
        fontSize="15.5"
        fontWeight="700"
        letterSpacing="-0.03em"
        fontFamily="var(--font-body)"
      >
        {code}
      </text>
    </svg>
  );
}

/**
 * Vector SVG logos for Lucas's tool stack ([P1-A5], refined per [P1-A1]).
 * Every mark uses pure design-system CSS variables (zero raw #hex or #000/#FFF).
 */
export const TOOL_LOGOS: readonly ToolLogoDef[] = [
  {
    id: "luci",
    name: "Luci",
    href: "/work/luci",
    renderLogo: () => (
      // Theme-aware wordmark: ink "luci" on light, cream "luci" on dark/warm-dark.
      <>
        <picture className="block shrink-0 dark:hidden">
          <img
            src="/images/luci-logo-horizontal-light.svg"
            alt=""
            width={100}
            height={36}
            className="block h-9 w-auto"
          />
        </picture>
        <picture className="hidden shrink-0 dark:block">
          <img
            src="/images/luci-logo-horizontal-dark.svg"
            alt=""
            width={100}
            height={36}
            className="block h-9 w-auto"
          />
        </picture>
      </>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          d="M11 4h5v8h-5a4 4 0 0 1 0-8Z"
          fill="var(--color-blush)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.5"
        />
        <path
          d="M16 4h5a4 4 0 0 1 0 8h-5V4Z"
          fill="var(--color-butter)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.5"
        />
        <path
          d="M11 12h5v8h-5a4 4 0 0 1 0-8Z"
          fill="var(--color-lilac)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.5"
        />
        <circle
          cx="20"
          cy="16"
          r="4"
          fill="var(--color-sky)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.5"
        />
        <path
          d="M11 20h5v4a4 4 0 1 1-5-4Z"
          fill="var(--color-mint)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: "figjam",
    name: "FigJam",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="7"
          fill="var(--color-lilac)"
          stroke="var(--color-on-pastel)"
          strokeWidth="2"
        />
        {/* FigJam marker scribble wave */}
        <path
          d="M8.5 20.5 C10 12 13 22 15.5 13 C17.5 7.5 19.5 18 22.5 11.5"
          fill="none"
          stroke="var(--color-on-pastel)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23.5" cy="21.5" r="2" fill="var(--color-on-pastel)" />
      </svg>
    ),
  },
  {
    id: "claude",
    name: "Claude Code",
    // Clawd, Claude Code's pixel mascot (shared ClawdMark)
    renderLogo: () => <ClawdMark className="w-9" />,
  },
  {
    id: "antigravity",
    name: "Google Antigravity",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        {/* Smooth sweeping ribbon A arch */}
        <path
          d="M6 26 C9.5 14 13 6 16 6 C19 6 22.5 14 26 26 C22.5 23.5 19.5 18 16 14.5 C12.5 18 9.5 23.5 6 26 Z"
          fill="var(--color-sky)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M11 23 C13 19 14.5 17 16 17 C17.5 17 19 19 21 23"
          fill="none"
          stroke="var(--color-mint)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "cursor",
    name: "Cursor",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <polygon
          points="16,3 28,10 28,22 16,29 4,22 4,10"
          fill="var(--color-surface)"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Left dark facet */}
        <polygon points="16,3 16,16 4,22 4,10" fill="var(--color-surface-2)" />
        {/* Bottom muted facet */}
        <polygon points="16,16 28,22 16,29 4,22" fill="var(--color-sky)" />
        {/* Iconic bright cursor triangle pointing top-right */}
        <polygon
          points="16,3 28,10 16,16"
          fill="var(--color-inverse-bg)"
        />
        <line
          x1="16"
          y1="16"
          x2="16"
          y2="29"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="16"
          y1="16"
          x2="4"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="16"
          y1="16"
          x2="28"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: "codex",
    name: "Codex",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        {/* OpenAI / Codex 6-petal interwoven knot */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            d="M16 4.5 C19.2 4.5 21.5 6.8 21.5 9.8 L21.5 14.8 L16 11.6 L12.2 13.8 L12.2 8.8 C12.2 6.2 13.8 4.5 16 4.5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            transform={`rotate(${deg} 16 16)`}
          />
        ))}
      </svg>
    ),
  },
  {
    id: "ai-studio",
    name: "Google AI Studio",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        {/* Primary Gemini 4-point spark */}
        <path
          d="M14 5 Q15.2 14.8 25 16 Q15.2 17.2 14 27 Q12.8 17.2 3 16 Q12.8 14.8 14 5 Z"
          fill="var(--color-sky)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Secondary AI Studio corner spark */}
        <path
          d="M25 4 Q25.5 8.5 30 9 Q25.5 9.5 25 14 Q24.5 9.5 20 9 Q24.5 8.5 25 4 Z"
          fill="var(--color-lilac)"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "v0",
    name: "v0.dev",
    renderLogo: () => (
      <svg viewBox="0 0 44 32" aria-hidden="true" className="h-8 w-11">
        {/* Sharp geometric chamfered "v" */}
        <polygon
          points="3,8 8.5,8 14.5,20 19,8 23.5,8 16.5,25 11.5,25"
          fill="currentColor"
        />
        {/* Chamfered "0" with diagonal cut corners */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27,8 H38 L41,11 V22 L38,25 H27 L24,22 V11 L27,8 Z M28.5,12 V21 H36.5 V12 H28.5 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        {/* Helmet brow bridge */}
        <path
          d="M7 13 C7 7.5 11 5.5 16 5.5 C21 5.5 25 7.5 25 13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Left & right goggle pods */}
        <rect
          x="4"
          y="12"
          width="11"
          height="12"
          rx="5"
          fill="var(--color-lilac)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.75"
        />
        <rect
          x="17"
          y="12"
          width="11"
          height="12"
          rx="5"
          fill="var(--color-sky)"
          stroke="var(--color-on-pastel)"
          strokeWidth="1.75"
        />
        {/* Visor slit eyes */}
        <rect
          x="8.2"
          y="15.5"
          width="2.6"
          height="5"
          rx="1.3"
          fill="var(--color-on-pastel)"
        />
        <rect
          x="21.2"
          y="15.5"
          width="2.6"
          height="5"
          rx="1.3"
          fill="var(--color-on-pastel)"
        />
      </svg>
    ),
  },
  {
    id: "framer",
    name: "Framer",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          d="M8 4h16v8H16L8 4Zm0 8h8l8 8H8v-8Zm0 8h8v8l-8-8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "webflow",
    name: "Webflow",
    renderLogo: () => (
      <svg viewBox="0 0 36 32" aria-hidden="true" className="h-8 w-9">
        {/* Swooping angled italic Webflow W */}
        <path
          d="M32 7 L24.5 25 C22 25 20.5 23.2 19.5 19.8 L18 15 L14.8 25 C12.5 25 10.8 23.2 10 19.5 L4 7 H9.5 L12.8 18 L16.2 7 H20.5 L23 17.5 L26.5 7 Z"
          fill="var(--color-sky)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "after-effects",
    name: "Adobe After Effects",
    renderLogo: () => <AdobeTile code="Ae" toneVar="var(--color-lilac)" />,
  },
  {
    id: "lottie",
    name: "LottieFiles",
    renderLogo: () => (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx="7"
          fill="var(--color-mint)"
          stroke="var(--color-on-pastel)"
          strokeWidth="2"
        />
        {/* Lottie signature bold tilted curve + corner dot */}
        <path
          d="M8.5 22 C13 22 14.5 10 19 10 C21.5 10 22.5 12.5 23 15"
          fill="none"
          stroke="var(--color-on-pastel)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="23.5" cy="19.5" r="2.2" fill="var(--color-on-pastel)" />
      </svg>
    ),
  },
  {
    id: "premiere",
    name: "Adobe Premiere Pro",
    renderLogo: () => <AdobeTile code="Pr" toneVar="var(--color-blush)" />,
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    renderLogo: () => <AdobeTile code="Ai" toneVar="var(--color-butter)" />,
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    renderLogo: () => <AdobeTile code="Ps" toneVar="var(--color-sky)" />,
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    renderLogo: () => (
      /* Adobe Firefly twin interlocking wing petals on dark CC tile */
      <svg viewBox="0 0 36 36" aria-hidden="true" className="h-8 w-8 shrink-0">
        <rect
          x="2"
          y="2"
          width="32"
          height="32"
          rx="8"
          fill="var(--color-on-pastel)"
          stroke="var(--color-pistachio)"
          strokeWidth="2.5"
        />
        <path
          d="M11 24 C10 16 14 10 21 10 C20 17 16 23 11 24 Z"
          fill="var(--color-blush)"
        />
        <path
          d="M15 26 C16 19 21 15 27 16 C25 22 20 26 15 26 Z"
          fill="var(--color-butter)"
        />
        <circle cx="24" cy="11" r="2" fill="var(--color-pistachio)" />
      </svg>
    ),
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
        <path
          d="M5 6 C4.2 6 3.7 6.8 3.9 7.6 L7.8 25 C8 26 8.9 26.5 9.9 26.5 H22.1 C23.1 26.5 24 26 24.2 25 L28.1 7.6 C28.3 6.8 27.8 6 27 6 H5 Z M18.8 19 H13.2 L12.1 12.5 H19.9 L18.8 19 Z"
          fill="var(--color-sky)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
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
        {/* Three stacked Atlassian Jira diagonal chevron ribbons */}
        <path
          d="M15 4 H26.5 C27.2 4 27.5 4.8 27 5.3 L19.5 12.8 L15 8.3 Z"
          fill="var(--color-sky)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 10.5 H21.5 C22.2 10.5 22.5 11.3 22 11.8 L14.5 19.3 L10 14.8 Z"
          fill="var(--color-lilac)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M5 17 H16.5 C17.2 17 17.5 17.8 17 18.3 L9.5 25.8 L5 21.3 Z"
          fill="var(--color-mint)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

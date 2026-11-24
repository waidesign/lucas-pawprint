import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Default-state illustrations for the five ProcessStory cards ([P1-A1]).
 * Sticker style from the design system: 2px ink (`--color-on-pastel`) outlines, pastel
 * fills, rounded joins, no gradients/blur, no characters (Loaffy is the only character
 * and appears on the active card). Each sits on its card's pastel panel, so fills avoid
 * that card's own tone. SVG geometry is illustration coordinates (viewBox 160×96).
 */

export type ProcessIllustrationId =
  "understand" | "shape" | "design" | "motion" | "ship";

const INK = "var(--color-on-pastel)";

const STROKE = {
  stroke: INK,
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const satisfies SVGProps<SVGElement>;

function Frame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 160 96"
      className={cn("h-24 w-auto xl:h-20", className)}
    >
      {children}
    </svg>
  );
}

/** 01 Understand (butter panel): question notes on the board + a magnifying glass. */
function Understand() {
  return (
    <Frame label="Sticky notes full of questions under a magnifying glass">
      <g transform="rotate(-6 36 44)">
        <rect
          x="14"
          y="22"
          width="44"
          height="44"
          rx="4"
          fill="var(--color-sky)"
          {...STROKE}
        />
        <path d="M30 36q0-8 6-8t6 6q0 4-6 6v4" fill="none" {...STROKE} />
        <circle cx="36" cy="52" r="2" fill={INK} />
      </g>
      <g transform="rotate(5 82 50)">
        <rect
          x="60"
          y="28"
          width="44"
          height="44"
          rx="4"
          fill="var(--color-blush)"
          {...STROKE}
        />
        <path d="M68 40h28M68 48h20M68 56h24" fill="none" {...STROKE} />
      </g>
      <circle cx="122" cy="40" r="20" fill="var(--color-lilac)" {...STROKE} />
      <path d="M112 34q4-8 12-8" fill="none" {...STROKE} />
      <path
        d="M136 54l16 16"
        fill="none"
        stroke={INK}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/** 02 Shape (sky panel): a sketched flow, start → decision → two outcomes. */
function Shape() {
  return (
    <Frame label="A sketched user flow with a start, a decision and two outcomes">
      <rect
        x="6"
        y="38"
        width="36"
        height="20"
        rx="10"
        fill="var(--color-mint)"
        {...STROKE}
      />
      <path d="M42 48h16" fill="none" strokeDasharray="4 4" {...STROKE} />
      <path d="M54 44l4 4-4 4" fill="none" {...STROKE} />
      <path
        d="M78 28l20 20-20 20-20-20z"
        fill="var(--color-butter)"
        {...STROKE}
      />
      <path
        d="M98 48h8V26h10M106 48v22h10"
        fill="none"
        strokeDasharray="4 4"
        {...STROKE}
      />
      <path d="M112 22l4 4-4 4M112 66l4 4-4 4" fill="none" {...STROKE} />
      <rect
        x="118"
        y="16"
        width="36"
        height="20"
        rx="4"
        fill="var(--color-lilac)"
        {...STROKE}
      />
      <rect
        x="118"
        y="60"
        width="36"
        height="20"
        rx="4"
        fill="var(--color-blush)"
        {...STROKE}
      />
    </Frame>
  );
}

/** 03 Design (lilac panel): a screen built from components + the token swatches behind it. */
function Design() {
  return (
    <Frame label="A screen built from reusable components next to colour token swatches">
      <rect
        x="8"
        y="12"
        width="104"
        height="72"
        rx="8"
        fill="var(--color-pistachio)"
        {...STROKE}
      />
      <path d="M8 28h104" fill="none" {...STROKE} />
      <rect
        x="18"
        y="36"
        width="40"
        height="12"
        rx="6"
        fill="var(--color-blush)"
        {...STROKE}
      />
      <rect
        x="18"
        y="56"
        width="40"
        height="20"
        rx="4"
        fill="var(--color-sky)"
        {...STROKE}
      />
      <rect
        x="66"
        y="36"
        width="36"
        height="40"
        rx="4"
        fill="var(--color-butter)"
        {...STROKE}
      />
      <path d="M74 48h20M74 56h14" fill="none" {...STROKE} />
      <circle cx="136" cy="24" r="10" fill="var(--color-sky)" {...STROKE} />
      <circle cx="136" cy="48" r="10" fill="var(--color-blush)" {...STROKE} />
      <circle cx="136" cy="72" r="10" fill="var(--color-butter)" {...STROKE} />
    </Frame>
  );
}

/** 04 Motion (blush panel): an easing curve between two keyframes, with a moving ball. */
function Motion() {
  return (
    <Frame label="An ease-out motion curve between two keyframes with a ball travelling along it">
      <path d="M20 12v68h128" fill="none" {...STROKE} />
      <path
        d="M20 80L140 20"
        fill="none"
        strokeDasharray="4 8"
        strokeOpacity="0.4"
        {...STROKE}
      />
      <path d="M20 80C60 80 72 20 140 20" fill="none" {...STROKE} />
      <path d="M20 72l8 8-8 8-8-8z" fill="var(--color-butter)" {...STROKE} />
      <path d="M140 12l8 8-8 8-8-8z" fill="var(--color-butter)" {...STROKE} />
      {/* Ball + motion trail sit on the curve at t = 0.35, 0.45 and 0.6 */}
      <circle
        cx="55"
        cy="63"
        r="4"
        fill="var(--color-sky)"
        fillOpacity="0.5"
        stroke="none"
      />
      <circle
        cx="65"
        cy="54"
        r="6"
        fill="var(--color-sky)"
        fillOpacity="0.75"
        stroke="none"
      />
      <circle cx="80" cy="41" r="8" fill="var(--color-sky)" {...STROKE} />
    </Frame>
  );
}

/** 05 Ship (mint panel): a fully ticked QA checklist and a paper plane taking off. */
function Ship() {
  return (
    <Frame label="A fully checked QA checklist and a paper plane taking off">
      <rect
        x="12"
        y="12"
        width="68"
        height="76"
        rx="6"
        fill="var(--color-butter)"
        {...STROKE}
      />
      <rect
        x="34"
        y="6"
        width="24"
        height="12"
        rx="4"
        fill="var(--color-lilac)"
        {...STROKE}
      />
      {[28, 48, 68].map((y) => (
        <g key={y}>
          <rect
            x="22"
            y={y - 6}
            width="12"
            height="12"
            rx="3"
            fill="var(--color-sky)"
            {...STROKE}
          />
          <path d={`M25 ${y}l3 3 5-6`} fill="none" {...STROKE} />
          <path d={`M42 ${y}h28`} fill="none" {...STROKE} />
        </g>
      ))}
      {/* Take-off trail, then the plane: top wing + folded lower wing */}
      <path
        d="M88 88q8-14 24-22"
        fill="none"
        strokeDasharray="4 4"
        {...STROKE}
      />
      <path d="M96 48l56-28-36 40z" fill="var(--color-blush)" {...STROKE} />
      <path d="M116 60l36-40-20 56z" fill="var(--color-lilac)" {...STROKE} />
    </Frame>
  );
}

const ILLUSTRATIONS: Record<ProcessIllustrationId, () => ReactNode> = {
  understand: Understand,
  shape: Shape,
  design: Design,
  motion: Motion,
  ship: Ship,
};

export function ProcessIllustration({ id }: { id: ProcessIllustrationId }) {
  const Illustration = ILLUSTRATIONS[id];
  return <Illustration />;
}

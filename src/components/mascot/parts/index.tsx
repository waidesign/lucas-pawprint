import { useId } from "react";
import type { BeanSpec } from "./clearance";

export const LOAFFY_COLORS = {
  ginger: "#F4A878",
  gingerDeep: "#CD8D65",
  gingerLight: "#F8CAAA",
  cheek: "#F2B8B0",
  claw: "#F7F0E2",
  ink: "#2B2B2B",
  glint: "#FBF6EE",
} as const;

export const MAIN_PAD_PATH =
  "M100,92 C130,92 160,118 164,148 C167,170 150,182 132,178 C120,175 112,182 100,182 C88,182 80,175 68,178 C50,182 33,170 36,148 C40,118 70,92 100,92 Z";

export type ShapeGeometry =
  | { kind: "path"; d: string; transform?: string }
  | {
      kind: "ellipse";
      cx: number;
      cy: number;
      rx: number;
      ry: number;
      transform?: string;
    }
  | {
      kind: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      rx?: number;
      transform?: string;
    };

function renderRawGeometry(
  geometry: ShapeGeometry,
  props: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinejoin?: "round" | "miter" | "bevel";
    transformOverride?: string;
  }
) {
  const transform =
    props.transformOverride !== undefined
      ? props.transformOverride
      : geometry.transform;

  if (geometry.kind === "path") {
    return (
      <path
        d={geometry.d}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        strokeLinejoin={props.strokeLinejoin}
        transform={transform}
      />
    );
  }
  if (geometry.kind === "ellipse") {
    return (
      <ellipse
        cx={geometry.cx}
        cy={geometry.cy}
        rx={geometry.rx}
        ry={geometry.ry}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        strokeLinejoin={props.strokeLinejoin}
        transform={transform}
      />
    );
  }
  return (
    <rect
      x={geometry.x}
      y={geometry.y}
      width={geometry.width}
      height={geometry.height}
      rx={geometry.rx}
      fill={props.fill}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      strokeLinejoin={props.strokeLinejoin}
      transform={transform}
    />
  );
}

export interface PenShapeProps {
  geometry: ShapeGeometry;
  fill?: string;
  strokeWidth?: number;
  underOffset?: { x: number; y: number };
}

/**
 * Pen-style outline per LOAFFY.md §2.2:
 * - Under-copy filled and stroked in currentColor, strokeWidth = main + 2.4, nudged translate(0.9, 1.5)
 * - Main shape with fill and 3.4px currentColor stroke, stroke-linejoin: round
 */
export function PenShape({
  geometry,
  fill = LOAFFY_COLORS.ginger,
  strokeWidth = 3.4,
  underOffset = { x: 0.9, y: 1.5 },
}: PenShapeProps) {
  const underTransform = geometry.transform
    ? `translate(${underOffset.x} ${underOffset.y}) ${geometry.transform}`
    : `translate(${underOffset.x} ${underOffset.y})`;

  return (
    <>
      {renderRawGeometry(geometry, {
        fill: "currentColor",
        stroke: "currentColor",
        strokeWidth: Number((strokeWidth + 2.4).toFixed(1)),
        strokeLinejoin: "round",
        transformOverride: underTransform,
      })}
      {renderRawGeometry(geometry, {
        fill,
        stroke: "currentColor",
        strokeWidth,
        strokeLinejoin: "round",
      })}
    </>
  );
}

export interface ShadedShapeProps {
  geometry: ShapeGeometry;
  fill?: string;
  shadeFill?: string;
  strokeWidth?: number;
  shift?: { x: number; y: number };
}

/**
 * 3D inside one outline per LOAFFY.md §2.4:
 * - Under-copy in currentColor
 * - Silhouette filled with Ginger-deep (#CD8D65)
 * - Ginger face clipped to the same silhouette and shifted (-5, -7) (or (-3, -4) for beans)
 * - Main outline stroke on top
 */
export function ShadedShape({
  geometry,
  fill = LOAFFY_COLORS.ginger,
  shadeFill = LOAFFY_COLORS.gingerDeep,
  strokeWidth = 3.4,
  shift = { x: -5, y: -7 },
}: ShadedShapeProps) {
  const rawId = useId().replace(/:/g, "");
  const clipId = `lp-shade-${rawId}`;
  const underTransform = geometry.transform
    ? `translate(0.9 1.5) ${geometry.transform}`
    : "translate(0.9 1.5)";
  const shiftedTransform = geometry.transform
    ? `translate(${shift.x} ${shift.y}) ${geometry.transform}`
    : `translate(${shift.x} ${shift.y})`;

  return (
    <>
      <clipPath id={clipId}>{renderRawGeometry(geometry, {})}</clipPath>
      {renderRawGeometry(geometry, {
        fill: "currentColor",
        stroke: "currentColor",
        strokeWidth: Number((strokeWidth + 2.4).toFixed(1)),
        strokeLinejoin: "round",
        transformOverride: underTransform,
      })}
      {renderRawGeometry(geometry, {
        fill: shadeFill,
      })}
      <g clipPath={`url(#${clipId})`}>
        {renderRawGeometry(geometry, {
          fill,
          transformOverride: shiftedTransform,
        })}
      </g>
      {renderRawGeometry(geometry, {
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinejoin: "round",
      })}
    </>
  );
}

export function GroundShadow({
  cx = 100,
  cy = 196,
  rx = 46,
  ry = 4.5,
  opacity = 0.12,
}: {
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  opacity?: number;
}) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="currentColor"
      opacity={opacity}
    />
  );
}

export function Pad({ shaded = false }: { shaded?: boolean }) {
  const geometry: ShapeGeometry = { kind: "path", d: MAIN_PAD_PATH };
  if (shaded) {
    return <ShadedShape geometry={geometry} shift={{ x: -5, y: -7 }} />;
  }
  return <PenShape geometry={geometry} />;
}

export function Bean({
  bean,
  shaded = false,
  strokeWidth = 3.4,
  show3DHighlight = false,
}: {
  bean: BeanSpec;
  shaded?: boolean;
  strokeWidth?: number;
  show3DHighlight?: boolean;
}) {
  const transform = `rotate(${bean.rotate} ${bean.cx} ${bean.cy})`;
  const geometry: ShapeGeometry = {
    kind: "ellipse",
    cx: bean.cx,
    cy: bean.cy,
    rx: bean.rx,
    ry: bean.ry,
    transform,
  };

  return (
    <>
      {shaded ? (
        <ShadedShape
          geometry={geometry}
          strokeWidth={strokeWidth}
          shift={{ x: -3, y: -4 }}
        />
      ) : (
        <PenShape geometry={geometry} strokeWidth={strokeWidth} />
      )}
      {show3DHighlight && (
        <ellipse
          cx={bean.cx - 4}
          cy={bean.cy - 8}
          rx={bean.rx === 15 ? 4.8 : 4.48}
          ry={bean.ry === 19 ? 4.94 : 4.68}
          transform={transform}
          fill={LOAFFY_COLORS.glint}
          opacity={0.75}
        />
      )}
    </>
  );
}

export function Highlight({
  d = "M60,128 Q68,110 86,104",
  strokeWidth = 5,
  opacity = 0.85,
}: {
  d?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      stroke={LOAFFY_COLORS.glint}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

export function Cheeks({
  leftCx = 70,
  rightCx = 130,
  cy = 156,
  rx = 7,
  ry = 4,
}: {
  leftCx?: number;
  rightCx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
}) {
  return (
    <>
      <ellipse cx={leftCx} cy={cy} rx={rx} ry={ry} fill={LOAFFY_COLORS.cheek} />
      <ellipse
        cx={rightCx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={LOAFFY_COLORS.cheek}
      />
    </>
  );
}

export type EyeVariant =
  | "calm"
  | "curious"
  | "thinking"
  | "happy"
  | "sleepy"
  | "surprised"
  | "chill-lean"
  | "side-eye"
  | "wink"
  | "shades"
  | "lost";

export function Eyes({
  variant = "calm",
  leftCx = 86,
  rightCx = 114,
  cy = 140,
  lookOffset = { x: 0, y: 0 },
  blinking = false,
}: {
  variant?: EyeVariant;
  leftCx?: number;
  rightCx?: number;
  cy?: number;
  lookOffset?: { x: number; y: number };
  blinking?: boolean;
}) {
  if (blinking && variant !== "shades") {
    return (
      <>
        <path
          d={`M${leftCx - 6},${cy} Q${leftCx},${cy + 5} ${leftCx + 6},${cy}`}
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M${rightCx - 6},${cy} Q${rightCx},${cy + 5} ${rightCx + 6},${cy}`}
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      </>
    );
  }

  switch (variant) {
    case "shades":
      return (
        <>
          <path
            d="M72,132 H96 Q97,148 86,149 Q74,149 72,136 Z"
            fill={LOAFFY_COLORS.ink}
          />
          <path
            d="M104,132 H128 Q126,149 114,149 Q103,148 104,132 Z"
            fill={LOAFFY_COLORS.ink}
          />
          <path d="M96,134 H104" stroke={LOAFFY_COLORS.ink} strokeWidth={3} />
          <path
            d="M78,137 l6,-3"
            stroke={LOAFFY_COLORS.glint}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <path
            d="M110,137 l6,-3"
            stroke={LOAFFY_COLORS.glint}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </>
      );

    case "happy":
      return (
        <>
          <path
            d="M80,143 Q86,133 92,143"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M108,143 Q114,133 120,143"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
        </>
      );

    case "sleepy":
      return (
        <>
          <path
            d="M80,140 Q86,145 92,140"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M108,140 Q114,145 120,140"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
        </>
      );

    case "thinking":
      return (
        <>
          <ellipse
            cx={86 + lookOffset.x}
            cy={136 + lookOffset.y}
            rx={4.5}
            ry={7}
            fill={LOAFFY_COLORS.ink}
          />
          <ellipse
            cx={114 + lookOffset.x}
            cy={136 + lookOffset.y}
            rx={4.5}
            ry={7}
            fill={LOAFFY_COLORS.ink}
          />
        </>
      );

    case "surprised":
      return (
        <>
          <circle
            cx={86 + lookOffset.x}
            cy={140 + lookOffset.y}
            r={7.5}
            fill={LOAFFY_COLORS.ink}
          />
          <circle
            cx={114 + lookOffset.x}
            cy={140 + lookOffset.y}
            r={7.5}
            fill={LOAFFY_COLORS.ink}
          />
          <circle
            cx={88 + lookOffset.x}
            cy={137 + lookOffset.y}
            r={2.2}
            fill={LOAFFY_COLORS.glint}
          />
          <circle
            cx={116 + lookOffset.x}
            cy={137 + lookOffset.y}
            r={2.2}
            fill={LOAFFY_COLORS.glint}
          />
        </>
      );

    case "lost":
      return (
        <>
          <circle
            cx={79 + lookOffset.x}
            cy={140 + lookOffset.y}
            r={7.5}
            fill={LOAFFY_COLORS.ink}
          />
          <circle
            cx={107 + lookOffset.x}
            cy={140 + lookOffset.y}
            r={7.5}
            fill={LOAFFY_COLORS.ink}
          />
          <circle
            cx={81 + lookOffset.x}
            cy={137 + lookOffset.y}
            r={2.2}
            fill={LOAFFY_COLORS.glint}
          />
          <circle
            cx={109 + lookOffset.x}
            cy={137 + lookOffset.y}
            r={2.2}
            fill={LOAFFY_COLORS.glint}
          />
        </>
      );

    case "chill-lean":
      return (
        <>
          <path
            d="M80.5,140 A5.5,8 0 0 0 91.5,140 Z"
            fill={LOAFFY_COLORS.ink}
          />
          <path
            d="M79,140 H93"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M108.5,140 A5.5,8 0 0 0 119.5,140 Z"
            fill={LOAFFY_COLORS.ink}
          />
          <path
            d="M107,140 H121"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </>
      );

    case "side-eye":
      return (
        <>
          <path
            d="M85.5,140 A5.5,8 0 0 0 96.5,140 Z"
            fill={LOAFFY_COLORS.ink}
          />
          <path
            d="M84,140 H98"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M113.5,140 A5.5,8 0 0 0 124.5,140 Z"
            fill={LOAFFY_COLORS.ink}
          />
          <path
            d="M112,140 H126"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </>
      );

    case "wink":
      return (
        <>
          <ellipse
            cx={86 + lookOffset.x}
            cy={140 + lookOffset.y}
            rx={5.5}
            ry={9}
            fill={LOAFFY_COLORS.ink}
          />
          <circle
            cx={87.5 + lookOffset.x}
            cy={136 + lookOffset.y}
            r={1.8}
            fill={LOAFFY_COLORS.glint}
          />
          <path
            d="M108,142 Q114,134 120,142"
            stroke={LOAFFY_COLORS.ink}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
        </>
      );

    case "curious": {
      const lx = 91 + lookOffset.x;
      const rx = 119 + lookOffset.x;
      const ey = 138 + lookOffset.y;
      return (
        <>
          <ellipse cx={lx} cy={ey} rx={5.5} ry={9} fill={LOAFFY_COLORS.ink} />
          <ellipse cx={rx} cy={ey} rx={5.5} ry={9} fill={LOAFFY_COLORS.ink} />
          <circle
            cx={lx + 1.5}
            cy={ey - 4}
            r={1.8}
            fill={LOAFFY_COLORS.glint}
          />
          <circle
            cx={rx + 1.5}
            cy={ey - 4}
            r={1.8}
            fill={LOAFFY_COLORS.glint}
          />
        </>
      );
    }

    case "calm":
    default: {
      const lx = leftCx + lookOffset.x;
      const rx = rightCx + lookOffset.x;
      const ey = cy + lookOffset.y;
      return (
        <>
          <ellipse cx={lx} cy={ey} rx={5.5} ry={9} fill={LOAFFY_COLORS.ink} />
          <ellipse cx={rx} cy={ey} rx={5.5} ry={9} fill={LOAFFY_COLORS.ink} />
          <circle
            cx={lx + 1.5}
            cy={ey - 4}
            r={1.8}
            fill={LOAFFY_COLORS.glint}
          />
          <circle
            cx={rx + 1.5}
            cy={ey - 4}
            r={1.8}
            fill={LOAFFY_COLORS.glint}
          />
        </>
      );
    }
  }
}

export type MouthVariant =
  | "smile"
  | "big"
  | "flat"
  | "o"
  | "smirk";

export function Mouth({ variant = "smile" }: { variant?: MouthVariant }) {
  switch (variant) {
    case "big":
      return (
        <path
          d="M92,157 Q100,167 108,157"
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "flat":
      return (
        <path
          d="M95,160 H105"
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "o":
      return (
        <ellipse
          cx={100}
          cy={161}
          rx={3.5}
          ry={4.5}
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "smirk":
      return (
        <path
          d="M94,160 Q102,163 109,155"
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
      );
    case "smile":
    default:
      return (
        <path
          d="M95,158 Q100,163 105,158"
          stroke={LOAFFY_COLORS.ink}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
  }
}

export function HappyBurstLines() {
  return (
    <path
      d="M30,40 l-6,-8 M100,8 v-6 M170,40 l6,-8"
      stroke="currentColor"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
  );
}

export function JumpMotionLines() {
  return (
    <path
      d="M44,186 l-8,4 M156,186 l8,4 M100,192 v6"
      stroke="currentColor"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
  );
}

export function LandingImpactLines() {
  return (
    <path
      d="M22,182 h-10 M178,182 h10"
      stroke="currentColor"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
  );
}

export function MidFlipSpinLines() {
  return (
    <>
      <path
        d="M26,150 Q14,110 34,74"
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M174,86 Q188,126 168,160"
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

export function WinkSparkle() {
  return (
    <path
      d="M178,31 Q179.5,38.5 187,40 Q179.5,41.5 178,49 Q176.5,41.5 169,40 Q176.5,38.5 178,31 Z"
      fill={LOAFFY_COLORS.ginger}
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinejoin="round"
    />
  );
}

export function VibingNotes() {
  return (
    <>
      <ellipse
        cx={22}
        cy={60}
        rx={5}
        ry={4}
        transform="rotate(-20 22 60)"
        fill="currentColor"
      />
      <path
        d="M26.5,59 V40 q6,3 8,9"
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx={176}
        cy={34}
        rx={5}
        ry={4}
        transform="rotate(-20 176 34)"
        fill="currentColor"
      />
      <path
        d="M180.5,33 V14 q6,3 8,9"
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

export function ThinkingOrbit() {
  return (
    <circle
      cx={100}
      cy={100}
      r={88}
      stroke="currentColor"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
      strokeDasharray="2 10"
      opacity={0.5}
    />
  );
}

export function SleepyZz() {
  return (
    <>
      <text
        x={150}
        y={30}
        fontFamily="Bricolage Grotesque, sans-serif"
        fontWeight={700}
        fontSize={22}
        fill="currentColor"
      >
        z
      </text>
      <text
        x={168}
        y={14}
        fontFamily="Bricolage Grotesque, sans-serif"
        fontWeight={700}
        fontSize={15}
        fill="currentColor"
      >
        z
      </text>
    </>
  );
}

export function LostQuestionMark() {
  return (
    <text
      x={150}
      y={64}
      fontFamily="Bricolage Grotesque, sans-serif"
      fontWeight={800}
      fontSize={30}
      fill="currentColor"
    >
      ?
    </text>
  );
}

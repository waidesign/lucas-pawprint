"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  type MotionStyle,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import { REST_BEANS } from "./parts/clearance";
import { LoaffyMarkShape } from "./LoaffyMark";
import { useLoaffyStagePresence } from "./stage";
import { Bean, Cheeks, Eyes, Highlight, Mouth, Pad, PenShape } from "./parts";

/**
 * LoaffyWorkspace: Loaffy's late-night corner (Built-with section).
 *
 * An isometric room diorama. Every object is built from ONE projection (`P`) and
 * three helpers (iso box, iso cylinder, plane matrix), so everything shares the same
 * axes, stands on a surface and stays inside it: physics by construction.
 *
 * - Loaffy sits on a floor cushion behind a low table (kotatsu style), so its face is
 *   naturally above the table top; no arms needed. It types by tapping its beans
 *   (beans only lift away from the pad: clearance never drops below the 9.5-unit
 *   rest gap). Headphones are a prop on the face, clear of every bean.
 * - Laptop on the table: deck flat, lid upright, screen facing Loaffy, so we see the
 *   back of the lid with the Loaffy sticker (favicon-level mark, a logo).
 * - Table props, all well inside its edges: noodles + chopsticks, mug + steam,
 *   notebook + pen, and an ashtray with the cigarette resting in its notch, lit end
 *   over the tray, smoke rising.
 * - Card: lilac (pairs with the near-white walls; fixed in every theme).
 * - Room: near-white walls (`--color-claw`), wood floor, rug, a window with a night
 *   skyline, sticky notes, a framed pixel Clawd and a floor plant.
 *
 * Built from the official Loaffy parts (pad, beans, eyes, mouth, cheeks, highlight,
 * pen outline, wobble). Ginger only on Loaffy; pastel tokens + ink outlines elsewhere;
 * faces shaded with flat ink at low opacity; no gradients or blur.
 * Motion (multiples of 40ms) only while on screen; reduced motion = still scene.
 * Geometry is illustration coordinates (viewBox 640×480, iso unit 30).
 */

const INK = "var(--color-on-pastel)";
const C = {
  wall: "var(--color-claw)",
  lilac: "var(--color-lilac)",
  mint: "var(--color-mint)",
  butter: "var(--color-butter)",
  sky: "var(--color-sky)",
  blush: "var(--color-blush)",
  pistachio: "var(--color-pistachio)",
} as const;

const LINE = {
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const PLANE_LINE = {
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

/* ── Isometric projection ───────────────────────────────────────────────
   Room: floor x,y ∈ [0,10], walls 5 high. Back corner (0,0,0) at (320,166). */
const S = 30;
const O = { x: 320, y: 166 };
type V3 = [number, number, number];
function P(x: number, y: number, z = 0): [number, number] {
  return [O.x + (x - y) * S, O.y + ((x + y) * S) / 2 - z * S];
}
const f = (n: number) => Number(n.toFixed(1));
function poly(...pts: V3[]) {
  return `M${pts
    .map((p) =>
      P(...p)
        .map(f)
        .join(","),
    )
    .join(" L")} Z`;
}
/** Plane matrices: draw in (u, w) units on a wall / table top / lid. */
const LEFT_WALL = `matrix(${-S} ${S / 2} 0 ${-S} ${O.x} ${O.y})`; // u = y, w = z
const RIGHT_WALL = `matrix(${S} ${S / 2} 0 ${-S} ${O.x} ${O.y})`; // u = x, w = z
const flat = (z: number) =>
  `matrix(${S} ${S / 2} ${-S} ${S / 2} ${O.x} ${O.y - z * S})`; // u = x, v = y
const xzPlane = (y: number) =>
  `matrix(${S} ${S / 2} 0 ${-S} ${O.x - y * S} ${O.y + (y * S) / 2})`; // u = x, w = z

/** Iso box: top, +x face and +y face (the faces we can see), flat-shaded. */
function IsoBox({
  x,
  y,
  z,
  dx,
  dy,
  dz,
  top,
  side,
  front,
}: {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  top: string;
  side?: string;
  front?: string;
}) {
  const x1 = x + dx;
  const y1 = y + dy;
  const z1 = z + dz;
  const right = poly([x1, y, z], [x1, y1, z], [x1, y1, z1], [x1, y, z1]);
  const left = poly([x, y1, z], [x1, y1, z], [x1, y1, z1], [x, y1, z1]);
  return (
    <g>
      <path d={right} fill={side ?? top} {...LINE} />
      <path d={right} fill={INK} opacity={0.08} />
      <path d={left} fill={front ?? top} {...LINE} />
      <path d={left} fill={INK} opacity={0.16} />
      <path
        d={poly([x, y, z1], [x1, y, z1], [x1, y1, z1], [x, y1, z1])}
        fill={top}
        {...LINE}
      />
    </g>
  );
}

/** Iso cylinder standing on (cx, cy, z): side band + top ellipse. */
function IsoCylinder({
  cx,
  cy,
  z,
  r,
  h,
  fill,
  topFill,
}: {
  cx: number;
  cy: number;
  z: number;
  r: number;
  h: number;
  fill: string;
  topFill?: string;
}) {
  const rx = r * S * Math.SQRT2;
  const ry = rx / 2;
  const [bx, by] = P(cx, cy, z);
  const ty = by - h * S;
  return (
    <g>
      <path
        d={`M${f(bx - rx)},${f(ty)} L${f(bx - rx)},${f(by)} A${f(rx)} ${f(ry)} 0 0 0 ${f(bx + rx)},${f(by)} L${f(bx + rx)},${f(ty)} Z`}
        fill={fill}
        {...LINE}
      />
      <path
        d={`M${f(bx - rx)},${f(ty)} L${f(bx - rx)},${f(by)} A${f(rx)} ${f(ry)} 0 0 0 ${f(bx + rx)},${f(by)} L${f(bx + rx)},${f(ty)} Z`}
        fill={INK}
        opacity={0.1}
      />
      <ellipse
        cx={f(bx)}
        cy={f(ty)}
        rx={f(rx)}
        ry={f(ry)}
        fill={topFill ?? fill}
        {...LINE}
      />
    </g>
  );
}

/* Loaffy: sits on its cushion behind the table. Pad bottom (100,182) at SEAT. */
const CUSHION = { x: 5.7, y: 2.3, r: 1.1, h: 0.5 };
const SEAT = (() => {
  const [sx, sy] = P(CUSHION.x, CUSHION.y, CUSHION.h);
  return { x: sx, y: sy + 4 };
})();
const LOAFFY_SCALE = 0.95;
const LOAFFY_TRANSFORM = `translate(${f(SEAT.x - 100 * LOAFFY_SCALE)} ${f(
  SEAT.y - 182 * LOAFFY_SCALE,
)}) scale(${LOAFFY_SCALE})`;

/* Headphones in Loaffy's 200-unit space: band ≥ 12 units clear of every bean. */
const HEADPHONE_BAND =
  "M38,128 C-14,108 -12,44 44,30 C70,20 130,20 156,30 C212,44 214,108 162,128";

/* Bean typing: each bean lifts 3 units and drops back, on its own rhythm. */
const BEAN_TAPS: Record<string, { repeatDelay: number; delay: number }> = {
  ol: { repeatDelay: 0.4, delay: 0 },
  il: { repeatDelay: 0.48, delay: 0.16 },
  ir: { repeatDelay: 0.56, delay: 0.32 },
  or: { repeatDelay: 1.2, delay: 0.72 },
};

/* Table + laptop */
const TABLE = { x: 3.6, y: 3.6, dx: 4.2, dy: 3.6, top: 1.4, thick: 0.3 };
const TABLE_TOP = TABLE.top + TABLE.thick; // 1.7
const LAPTOP = { x: 4.7, w: 2.2, hingeY: 5.4, depth: 1.4, lid: 1.6, lean: 0.2 };

/* Clawd pixels (same banner art as ClawdMark), for the framed poster */
const CLAWD: [number, number][] = [
  [3, 0],
  [3, 1],
  [4, 0],
  [5, 0],
  [4, 1],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [10, 0],
  [11, 0],
  [6, 1],
  [7, 1],
  [8, 1],
  [9, 1],
  [10, 1],
  [11, 1],
  [12, 0],
  [13, 0],
  [13, 1],
  [14, 0],
  [14, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [3, 3],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [8, 2],
  [9, 2],
  [10, 2],
  [11, 2],
  [12, 2],
  [13, 2],
  [4, 3],
  [5, 3],
  [6, 3],
  [7, 3],
  [8, 3],
  [9, 3],
  [10, 3],
  [11, 3],
  [12, 3],
  [13, 3],
  [14, 2],
  [15, 2],
  [14, 3],
  [16, 2],
  [4, 4],
  [6, 4],
  [11, 4],
  [13, 4],
];

/** A looping motion group that falls back to a static pose when not animating. */
function Loop({
  active,
  animate,
  transition,
  still,
  children,
  style,
}: {
  active: boolean;
  animate: TargetAndTransition;
  transition: Transition;
  still?: TargetAndTransition;
  children: ReactNode;
  style?: MotionStyle;
}) {
  return (
    <motion.g
      initial={still ?? false}
      animate={active ? animate : (still ?? {})}
      transition={active ? transition : { duration: 0 }}
      style={style}
    >
      {children}
    </motion.g>
  );
}

const ORIGIN_BOTTOM: MotionStyle = {
  transformBox: "fill-box",
  originX: 0.5,
  originY: 1,
};
const ORIGIN_TOP: MotionStyle = {
  transformBox: "fill-box",
  originX: 0.5,
  originY: 0,
};
const ORIGIN_CENTER: MotionStyle = {
  transformBox: "fill-box",
  originX: 0.5,
  originY: 0.5,
};

function MusicNote() {
  return (
    <>
      <ellipse cx={0} cy={0} rx={5} ry={4} transform="rotate(-20)" fill={INK} />
      <path
        d="M4.5,-1 V-18 q6,3 8,9"
        stroke={INK}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

/** Steam / smoke wisp rising from (x, y): rises, sways and fades. */
function Wisp({
  active,
  x,
  y,
  flip = false,
  delay,
  duration,
  rise,
  opacity,
}: {
  active: boolean;
  x: number;
  y: number;
  flip?: boolean;
  delay: number;
  duration: number;
  rise: number;
  opacity: number;
}) {
  const s = flip ? -1 : 1;
  return (
    <Loop
      active={active}
      animate={{
        y: [0, -rise],
        x: [0, 4 * s, -2 * s],
        opacity: [0, opacity, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeOut", delay }}
      still={{ y: -rise / 3, x: 0, opacity: opacity * 0.8 }}
    >
      <path
        d={`M${f(x)},${f(y)} q${-5 * s},-7 0,-14 t0,-14`}
        fill="none"
        stroke={INK}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Loop>
  );
}

export interface LoaffyWorkspaceProps {
  className?: string;
}

export function LoaffyWorkspace({ className }: LoaffyWorkspaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  useLoaffyStagePresence(ref);
  const prefersReduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { margin: "120px 0px" });
  const active = inView && !prefersReduced;
  const [blinking, setBlinking] = useState(false);
  const wobbleId = `lp-workspace-wobble-${useId().replace(/:/g, "")}`;

  // Blink every ~4.8s (80 close · 40 hold · 80 open ≈ 200ms), only while animating.
  useEffect(() => {
    if (!active) return;
    let closeTimer = 0;
    const interval = window.setInterval(() => {
      setBlinking(true);
      closeTimer = window.setTimeout(() => setBlinking(false), 200);
    }, 4800);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(closeTimer);
    };
  }, [active]);

  /* Derived screen points for small props */
  const mug = P(7.15, 6.55, TABLE_TOP);
  const ember = P(5.62, 6.5, TABLE_TOP + 0.16);
  const LX = LAPTOP.x;
  const LX1 = LAPTOP.x + LAPTOP.w;
  const HY = LAPTOP.hingeY;
  const DY = HY - LAPTOP.depth;
  const DECK = TABLE_TOP + 0.1;

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-4/3 w-full overflow-hidden rounded-xl border-2 border-line-strong bg-lilac shadow-sticker",
        className,
      )}
    >
      <svg
        role="img"
        aria-label="Loaffy's late-night corner: Loaffy sits on a floor cushion behind a low table, headphones on, typing on a laptop with a Loaffy sticker. On the table: takeaway noodles with chopsticks, a steaming coffee mug, a notebook and pen, and a cigarette resting in an ashtray. The room has a window over a night skyline, sticky notes, a framed pixel Clawd and a plant."
        viewBox="0 0 640 480"
        className="block h-full w-full"
      >
        <defs>
          <filter id={wobbleId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves={2}
              seed={7}
            />
            <feDisplacementMap in="SourceGraphic" scale={2.4} />
          </filter>
        </defs>

        {/* ── Room shell: walls, floor, baseboards ─────────────── */}
        <path
          d={poly([0, 0, 0], [0, 10, 0], [0, 10, 5], [0, 0, 5])}
          fill={C.wall}
          {...LINE}
        />
        <path
          d={poly([0, 0, 0], [10, 0, 0], [10, 0, 5], [0, 0, 5])}
          fill={C.wall}
          {...LINE}
        />
        <path
          d={poly([0, 0, 0], [10, 0, 0], [10, 0, 5], [0, 0, 5])}
          fill={C.lilac}
          opacity={0.22}
        />
        <path
          d={poly([0, 0, 0], [10, 0, 0], [10, 10, 0], [0, 10, 0])}
          fill={C.butter}
          {...LINE}
        />
        <g transform={flat(0)}>
          {[2, 4, 6, 8].map((k) => (
            <path
              key={k}
              d={`M0,${k} H10`}
              stroke={INK}
              strokeWidth={1.5}
              opacity={0.18}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
        <path
          d={poly([0, 0, 0], [0, 10, 0], [0, 10, 0.25], [0, 0, 0.25])}
          fill={C.pistachio}
          {...LINE}
          strokeWidth={2}
        />
        <path
          d={poly([0, 0, 0], [10, 0, 0], [10, 0, 0.25], [0, 0, 0.25])}
          fill={C.pistachio}
          {...LINE}
          strokeWidth={2}
        />

        {/* ── Window on the left wall: night skyline ────────────── */}
        <g transform={LEFT_WALL}>
          <rect
            x={1.5}
            y={1.9}
            width={4}
            height={2.6}
            rx={0.12}
            fill={C.butter}
            {...PLANE_LINE}
          />
          <rect
            x={1.68}
            y={2.06}
            width={3.64}
            height={2.28}
            rx={0.06}
            fill={INK}
          />
          {[
            [1.75, 2.06, 0.5, 0.9],
            [2.3, 2.06, 0.4, 1.4],
            [2.75, 2.06, 0.55, 0.7],
            [3.55, 2.06, 0.45, 1.6],
            [4.05, 2.06, 0.6, 1.0],
            [4.7, 2.06, 0.55, 1.3],
          ].map(([x, y, w, h]) => (
            <rect
              key={x}
              x={x}
              y={y}
              width={w}
              height={h}
              fill={C.lilac}
              opacity={0.36}
            />
          ))}
          {[
            [1.9, 2.6],
            [2.45, 2.95],
            [2.45, 2.65],
            [3.65, 3.1],
            [3.65, 2.8],
            [4.2, 2.5],
            [4.85, 2.8],
          ].map(([x, y], i) =>
            i % 3 === 1 ? (
              <Loop
                key={`${x}-${y}`}
                active={active}
                animate={{ opacity: [1, 1, 0.2, 1] }}
                transition={{
                  duration: 3.2 + i * 0.4,
                  repeat: Infinity,
                  times: [0, 0.7, 0.8, 1],
                }}
                still={{ opacity: 1 }}
              >
                <rect x={x} y={y} width={0.14} height={0.16} fill={C.butter} />
              </Loop>
            ) : (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={0.14}
                height={0.16}
                fill={C.butter}
              />
            ),
          )}
          <circle cx={2.2} cy={3.85} r={0.25} fill={C.butter} />
          {[
            [3.0, 4.05, 2.4],
            [3.9, 3.8, 3.2],
            [4.6, 4.15, 2.8],
            [4.95, 3.65, 3.6],
          ].map(([x, y, d]) => (
            <Loop
              key={`${x}-${y}`}
              active={active}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
              still={{ opacity: 1 }}
            >
              <circle cx={x} cy={y} r={0.05} fill={C.butter} />
            </Loop>
          ))}
          <rect x={3.44} y={2.06} width={0.12} height={2.28} fill={C.butter} />
          <rect x={1.68} y={3.25} width={3.64} height={0.1} fill={C.butter} />
        </g>
        {/* window sill */}
        <IsoBox
          x={0}
          y={1.4}
          z={1.75}
          dx={0.35}
          dy={4.2}
          dz={0.15}
          top={C.butter}
        />

        {/* ── Right wall: framed pixel Clawd + sticky notes ────── */}
        <g transform={RIGHT_WALL}>
          <rect
            x={1.6}
            y={2.3}
            width={1.8}
            height={1.5}
            rx={0.08}
            fill={C.butter}
            {...PLANE_LINE}
          />
          <rect
            x={1.75}
            y={2.45}
            width={1.5}
            height={1.2}
            fill={C.wall}
            {...PLANE_LINE}
            strokeWidth={1.5}
          />
          {/* pixels: 18×10 art scaled into the frame; w-axis points up, so flip */}
          <g transform="translate(1.82 3.5) scale(0.075 -0.075)">
            {CLAWD.map(([px, py]) => (
              <rect
                key={`${px}-${py}`}
                x={px}
                y={py * 2}
                width={1.04}
                height={2.04}
                fill={INK}
              />
            ))}
          </g>
          <g transform="rotate(-4 6.2 3.7)">
            <rect
              x={5.8}
              y={3.3}
              width={0.8}
              height={0.8}
              rx={0.05}
              fill={C.butter}
              {...PLANE_LINE}
            />
            <path
              d="M5.95,3.85 h0.5 M5.95,3.7 h0.35 M5.95,3.55 h0.45"
              fill="none"
              {...PLANE_LINE}
              strokeWidth={1.5}
            />
          </g>
          <Loop
            active={active}
            animate={{ rotate: [4, 8, 4] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            still={{ rotate: 4 }}
            style={ORIGIN_TOP}
          >
            <rect
              x={6.8}
              y={2.8}
              width={0.75}
              height={0.75}
              rx={0.05}
              fill={C.mint}
              {...PLANE_LINE}
            />
            <path
              d="M6.95,3.15 l0.15,-0.15 l0.3,0.3"
              fill="none"
              {...PLANE_LINE}
              strokeWidth={2}
            />
          </Loop>
        </g>

        {/* ── Rug ──────────────────────────────────────────────── */}
        <path
          d={poly(
            [2.9, 2.9, 0.01],
            [8.7, 2.9, 0.01],
            [8.7, 8.4, 0.01],
            [2.9, 8.4, 0.01],
          )}
          fill={C.mint}
          {...LINE}
        />
        <path
          d={poly(
            [3.3, 3.3, 0.01],
            [8.3, 3.3, 0.01],
            [8.3, 8.0, 0.01],
            [3.3, 8.0, 0.01],
          )}
          fill="none"
          stroke={INK}
          strokeWidth={1.5}
          strokeDasharray="6 6"
          opacity={0.35}
        />

        {/* ── Loaffy's cushion + Loaffy (behind the table) ─────── */}
        <IsoCylinder
          cx={CUSHION.x}
          cy={CUSHION.y}
          z={0}
          r={CUSHION.r}
          h={CUSHION.h}
          fill={C.blush}
        />
        <g transform={LOAFFY_TRANSFORM} style={{ color: INK }}>
          <Loop
            active={active}
            animate={{ rotate: [-6, -2, -6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            still={{ rotate: -4 }}
            style={ORIGIN_BOTTOM}
          >
            <g filter={`url(#${wobbleId})`}>
              <path
                d={HEADPHONE_BAND}
                fill="none"
                stroke={INK}
                strokeWidth={14}
                strokeLinecap="round"
              />
              <path
                d={HEADPHONE_BAND}
                fill="none"
                stroke={C.sky}
                strokeWidth={7}
                strokeLinecap="round"
              />
              <PenShape
                geometry={{
                  kind: "rect",
                  x: 76,
                  y: 14,
                  width: 48,
                  height: 16,
                  rx: 8,
                }}
                fill={C.lilac}
                strokeWidth={3}
              />
              <Pad />
              {REST_BEANS.map((bean) => {
                const tap = BEAN_TAPS[bean.id];
                return (
                  <Loop
                    key={bean.id}
                    active={active}
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 0.24,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: tap?.repeatDelay ?? 0.8,
                      delay: tap?.delay ?? 0,
                    }}
                    still={{ y: 0 }}
                  >
                    <Bean bean={bean} />
                  </Loop>
                );
              })}
              <Highlight />
              <Cheeks />
              <Eyes
                variant="calm"
                lookOffset={{ x: -3, y: 2.5 }}
                blinking={blinking}
              />
              <Mouth variant="smile" />
              <PenShape
                geometry={{
                  kind: "rect",
                  x: 14,
                  y: 112,
                  width: 28,
                  height: 50,
                  rx: 12,
                }}
                fill={C.sky}
                strokeWidth={3}
              />
              <rect
                x={36}
                y={118}
                width={8}
                height={38}
                rx={4}
                fill={C.lilac}
                {...LINE}
              />
              <PenShape
                geometry={{
                  kind: "rect",
                  x: 158,
                  y: 112,
                  width: 28,
                  height: 50,
                  rx: 12,
                }}
                fill={C.sky}
                strokeWidth={3}
              />
              <rect
                x={156}
                y={118}
                width={8}
                height={38}
                rx={4}
                fill={C.lilac}
                {...LINE}
              />
            </g>
          </Loop>
        </g>

        {/* Music notes drifting out of the headphones */}
        {[
          {
            x: SEAT.x - 104 * LOAFFY_SCALE,
            y: SEAT.y - 100 * LOAFFY_SCALE,
            dx: -12,
            delay: 0,
          },
          {
            x: SEAT.x + 100 * LOAFFY_SCALE,
            y: SEAT.y - 112 * LOAFFY_SCALE,
            dx: 12,
            delay: 1.36,
          },
        ].map((n) => (
          <Loop
            key={n.dx}
            active={active}
            animate={{
              y: [0, -40],
              x: [0, n.dx],
              opacity: [0, 1, 0],
              rotate: [0, n.dx > 0 ? 12 : -12],
            }}
            transition={{
              duration: 2.72,
              repeat: Infinity,
              ease: "easeOut",
              delay: n.delay,
            }}
            still={{ y: -16, x: n.dx / 2, opacity: 1, rotate: 0 }}
            style={ORIGIN_CENTER}
          >
            <g transform={`translate(${f(n.x)} ${f(n.y)})`}>
              <MusicNote />
            </g>
          </Loop>
        ))}

        {/* ── Floor plant (right-back) ─────────────────────────── */}
        <g>
          {[
            [-14, -30, -30],
            [0, -40, 0],
            [14, -30, 30],
            [-6, -22, -14],
            [8, -24, 16],
          ].map(([dx, dy, rot]) => {
            const [px, py] = P(8.9, 1.3, 0.75);
            return (
              <ellipse
                key={`${dx}-${dy}`}
                cx={f(px + (dx ?? 0))}
                cy={f(py + (dy ?? 0))}
                rx={7}
                ry={16}
                transform={`rotate(${rot} ${f(px + (dx ?? 0))} ${f(py + (dy ?? 0))})`}
                fill={C.mint}
                {...LINE}
              />
            );
          })}
          <IsoCylinder
            cx={8.9}
            cy={1.3}
            z={0}
            r={0.45}
            h={0.75}
            fill={C.blush}
            topFill={INK}
          />
        </g>

        {/* ── Low table: legs, then the top ────────────────────── */}
        {(
          [
            [TABLE.x + 0.1, TABLE.y + 0.1],
            [TABLE.x + TABLE.dx - 0.35, TABLE.y + 0.1],
            [TABLE.x + 0.1, TABLE.y + TABLE.dy - 0.35],
            [TABLE.x + TABLE.dx - 0.35, TABLE.y + TABLE.dy - 0.35],
          ] as [number, number][]
        ).map(([lx, ly]) => (
          <IsoBox
            key={`${lx}-${ly}`}
            x={lx}
            y={ly}
            z={0}
            dx={0.25}
            dy={0.25}
            dz={TABLE.top}
            top={C.pistachio}
          />
        ))}
        <IsoBox
          x={TABLE.x}
          y={TABLE.y}
          z={TABLE.top}
          dx={TABLE.dx}
          dy={TABLE.dy}
          dz={TABLE.thick}
          top={C.butter}
          side={C.pistachio}
          front={C.pistachio}
        />

        {/* ── Ashtray (front-middle of the table) + resting cigarette ── */}
        <IsoCylinder
          cx={5.75}
          cy={6.55}
          z={TABLE_TOP}
          r={0.42}
          h={0.14}
          fill={C.sky}
          topFill={C.sky}
        />
        {(() => {
          const [ax, ay] = P(5.75, 6.55, TABLE_TOP + 0.14);
          return (
            <ellipse
              cx={f(ax)}
              cy={f(ay)}
              rx={10}
              ry={5}
              fill={INK}
              opacity={0.22}
            />
          );
        })()}
        {/* cigarette: rests in the rim notch, lit end over the tray */}
        {(() => {
          const [x0, y0] = P(6.42, 6.5, TABLE_TOP + 0.2);
          const [x1, y1] = ember;
          return (
            <g>
              <path
                d={`M${f(x0)},${f(y0)} L${f(x1)},${f(y1)}`}
                stroke={INK}
                strokeWidth={6}
                strokeLinecap="round"
              />
              <path
                d={`M${f(x0)},${f(y0)} L${f(x1)},${f(y1)}`}
                stroke={C.butter}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              <path
                d={`M${f(x0)},${f(y0)} L${f(x0 + (x1 - x0) * 0.25)},${f(y0 + (y1 - y0) * 0.25)}`}
                stroke={C.blush}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </g>
          );
        })()}
        <Loop
          active={active}
          animate={{ opacity: [1, 0.48, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          still={{ opacity: 1 }}
        >
          <circle cx={f(ember[0])} cy={f(ember[1])} r={3} fill={C.blush} />
        </Loop>
        <Wisp
          active={active}
          x={ember[0]}
          y={ember[1] - 4}
          delay={0}
          duration={3.6}
          rise={24}
          opacity={0.5}
        />
        <Wisp
          active={active}
          x={ember[0] + 2}
          y={ember[1] - 6}
          flip
          delay={1.8}
          duration={3.6}
          rise={20}
          opacity={0.4}
        />

        {/* ── Notebook + pen (back-right of the table) ─────────── */}
        <IsoBox
          x={7.0}
          y={3.85}
          z={TABLE_TOP}
          dx={0.65}
          dy={1.0}
          dz={0.12}
          top={C.sky}
          side={C.butter}
          front={C.butter}
        />
        <g transform={flat(TABLE_TOP + 0.12)}>
          <rect
            x={7.0}
            y={3.85}
            width={0.14}
            height={1.0}
            fill={C.lilac}
            {...PLANE_LINE}
            strokeWidth={1.5}
          />
          <path
            d="M7.25,4.0 L7.55,4.7"
            stroke={INK}
            strokeWidth={5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M7.26,4.03 L7.53,4.66"
            stroke={C.butter}
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* ── Laptop: deck, keys, screen light; lid back with sticker ── */}
        <IsoBox
          x={LX}
          y={DY}
          z={TABLE_TOP}
          dx={LAPTOP.w}
          dy={LAPTOP.depth}
          dz={0.1}
          top={C.pistachio}
        />
        <g transform={flat(DECK)}>
          {[0, 1, 2, 3].map((col) =>
            [0, 1, 2].map((row) => (
              <rect
                key={`${col}-${row}`}
                x={LX + 0.22 + col * 0.46}
                y={DY + 0.16 + row * 0.24}
                width={0.36}
                height={0.16}
                rx={0.04}
                fill={C.wall}
                {...PLANE_LINE}
                strokeWidth={1.2}
              />
            )),
          )}
          <Loop
            active={active}
            animate={{ opacity: [0.32, 0.2, 0.38, 0.32] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            still={{ opacity: 0.3 }}
          >
            <rect
              x={LX}
              y={DY}
              width={LAPTOP.w}
              height={LAPTOP.depth}
              fill={C.butter}
            />
          </Loop>
          {[
            { c: 1, r: 1, delay: 0 },
            { c: 2, r: 0, delay: 0.24 },
            { c: 3, r: 2, delay: 0.48 },
          ].map((k) => (
            <Loop
              key={`${k.c}-${k.r}`}
              active={active}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{
                duration: 0.24,
                repeat: Infinity,
                repeatDelay: 0.56,
                delay: k.delay,
              }}
              still={{ opacity: 0 }}
            >
              <rect
                x={LX + 0.22 + k.c * 0.46}
                y={DY + 0.16 + k.r * 0.24}
                width={0.36}
                height={0.16}
                rx={0.04}
                fill={INK}
                opacity={0.5}
              />
            </Loop>
          ))}
        </g>
        {/* lid (we see its back; the screen faces Loaffy) */}
        <path
          d={poly(
            [LX, HY, DECK],
            [LX1, HY, DECK],
            [LX1, HY + LAPTOP.lean, DECK + LAPTOP.lid],
            [LX, HY + LAPTOP.lean, DECK + LAPTOP.lid],
          )}
          fill={C.sky}
          {...LINE}
          strokeWidth={3}
        />
        <path
          d={poly(
            [LX, HY, DECK],
            [LX1, HY, DECK],
            [LX1, HY + LAPTOP.lean, DECK + LAPTOP.lid],
            [LX, HY + LAPTOP.lean, DECK + LAPTOP.lid],
          )}
          fill={INK}
          opacity={0.1}
        />
        <Loop
          active={active}
          animate={{ opacity: [0.9, 0.5, 1, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          still={{ opacity: 0.9 }}
        >
          <path
            d={`M${P(
              LX + 0.1,
              HY + LAPTOP.lean - 0.08,
              DECK + LAPTOP.lid + 0.06,
            )
              .map(f)
              .join(",")} L${P(
              LX1 - 0.1,
              HY + LAPTOP.lean - 0.08,
              DECK + LAPTOP.lid + 0.06,
            )
              .map(f)
              .join(",")}`}
            stroke={C.butter}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </Loop>
        <g transform={xzPlane(HY + LAPTOP.lean / 2)}>
          <ellipse
            cx={LX + LAPTOP.w / 2}
            cy={DECK + LAPTOP.lid / 2}
            rx={0.5}
            ry={0.5}
            fill={C.butter}
            {...PLANE_LINE}
          />
          <g
            transform={`translate(${LX + LAPTOP.w / 2} ${DECK + LAPTOP.lid / 2}) scale(0.005 -0.005) translate(-100 -114)`}
          >
            <LoaffyMarkShape />
          </g>
        </g>

        {/* ── Takeaway noodles + chopsticks (front-left) ───────── */}
        {(() => {
          const [cx, cy] = P(4.3, 6.55, TABLE_TOP + 0.95);
          return (
            <g>
              <path
                d={`M${f(cx - 4)},${f(cy + 4)} L${f(cx + 22)},${f(cy - 40)}`}
                stroke={INK}
                strokeWidth={6}
                strokeLinecap="round"
              />
              <path
                d={`M${f(cx - 4)},${f(cy + 4)} L${f(cx + 22)},${f(cy - 40)}`}
                stroke={C.mint}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              <path
                d={`M${f(cx + 4)},${f(cy + 6)} L${f(cx + 32)},${f(cy - 34)}`}
                stroke={INK}
                strokeWidth={6}
                strokeLinecap="round"
              />
              <path
                d={`M${f(cx + 4)},${f(cy + 6)} L${f(cx + 32)},${f(cy - 34)}`}
                stroke={C.mint}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </g>
          );
        })()}
        <IsoBox
          x={4.0}
          y={6.25}
          z={TABLE_TOP}
          dx={0.65}
          dy={0.65}
          dz={0.9}
          top={C.butter}
          side={C.blush}
          front={C.blush}
        />
        <g transform={flat(TABLE_TOP + 0.9)}>
          <path
            d="M4.12,6.37 q0.1,0.12 0.2,0 t0.2,0"
            fill="none"
            {...PLANE_LINE}
            strokeWidth={1.8}
          />
          <path
            d="M4.12,6.62 q0.1,0.12 0.2,0 t0.2,0"
            fill="none"
            {...PLANE_LINE}
            strokeWidth={1.8}
          />
        </g>
        {(() => {
          const a = P(4.0, 6.9, TABLE_TOP + 0.9);
          const b = P(4.65, 6.9, TABLE_TOP + 0.9);
          const c = P(4.65, 6.25, TABLE_TOP + 0.9);
          return (
            <g>
              <path
                d={`M${f(a[0])},${f(a[1])} L${f(a[0] - 6)},${f(a[1] - 14)} L${f(b[0] - 6)},${f(b[1] - 14)} L${f(b[0])},${f(b[1])} Z`}
                fill={C.blush}
                {...LINE}
              />
              <path
                d={`M${f(b[0])},${f(b[1])} L${f(b[0] + 6)},${f(b[1] - 14)} L${f(c[0] + 6)},${f(c[1] - 14)} L${f(c[0])},${f(c[1])} Z`}
                fill={C.blush}
                {...LINE}
              />
            </g>
          );
        })()}

        {/* ── Coffee mug + steam (front-right) ─────────────────── */}
        <path
          d={`M${f(mug[0] + 11)},${f(mug[1] - 16)} q10,0 10,6 t-10,6`}
          fill="none"
          {...LINE}
          strokeWidth={3}
        />
        <IsoCylinder
          cx={7.15}
          cy={6.55}
          z={TABLE_TOP}
          r={0.3}
          h={0.75}
          fill={C.mint}
          topFill={INK}
        />
        <Wisp
          active={active}
          x={mug[0] - 4}
          y={mug[1] - 26}
          delay={0}
          duration={2.76}
          rise={24}
          opacity={0.6}
        />
        <Wisp
          active={active}
          x={mug[0] + 3}
          y={mug[1] - 28}
          flip
          delay={0.92}
          duration={2.76}
          rise={28}
          opacity={0.6}
        />
        <Wisp
          active={active}
          x={mug[0] + 10}
          y={mug[1] - 26}
          delay={1.84}
          duration={2.76}
          rise={22}
          opacity={0.5}
        />
      </svg>
    </div>
  );
}

export interface BeanSpec {
  id: "ol" | "il" | "ir" | "or";
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
}

export const REST_BEANS: BeanSpec[] = [
  { id: "ol", cx: 38, cy: 90, rx: 14, ry: 18, rotate: -34 },
  { id: "il", cx: 80, cy: 66, rx: 15, ry: 19, rotate: -12 },
  { id: "ir", cx: 120, cy: 66, rx: 15, ry: 19, rotate: 12 },
  { id: "or", cx: 162, cy: 90, rx: 14, ry: 18, rotate: 34 },
];

export const LOST_BEANS: BeanSpec[] = [
  { id: "ol", cx: 26, cy: 66, rx: 14, ry: 18, rotate: 40 },
  { id: "il", cx: 66, cy: 24, rx: 15, ry: 19, rotate: -50 },
  { id: "ir", cx: 140, cy: 22, rx: 15, ry: 19, rotate: 70 },
  { id: "or", cx: 178, cy: 92, rx: 14, ry: 18, rotate: -10 },
];

interface Point {
  x: number;
  y: number;
}

const PAD_SEGMENTS: [Point, Point, Point, Point][] = [
  [
    { x: 100, y: 92 },
    { x: 130, y: 92 },
    { x: 160, y: 118 },
    { x: 164, y: 148 },
  ],
  [
    { x: 164, y: 148 },
    { x: 167, y: 170 },
    { x: 150, y: 182 },
    { x: 132, y: 178 },
  ],
  [
    { x: 132, y: 178 },
    { x: 120, y: 175 },
    { x: 112, y: 182 },
    { x: 100, y: 182 },
  ],
  [
    { x: 100, y: 182 },
    { x: 88, y: 182 },
    { x: 80, y: 175 },
    { x: 68, y: 178 },
  ],
  [
    { x: 68, y: 178 },
    { x: 50, y: 182 },
    { x: 33, y: 170 },
    { x: 36, y: 148 },
  ],
  [
    { x: 36, y: 148 },
    { x: 40, y: 118 },
    { x: 70, y: 92 },
    { x: 100, y: 92 },
  ],
];

function evalCubicBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

function samplePadPoints(
  stepsPerSegment = 32,
  bodyScaleX = 1,
  bodyScaleY = 1,
  pivotX = 100,
  pivotY = 182
): Point[] {
  const pts: Point[] = [];
  for (const [p0, p1, p2, p3] of PAD_SEGMENTS) {
    for (let i = 0; i < stepsPerSegment; i++) {
      const raw = evalCubicBezier(p0, p1, p2, p3, i / stepsPerSegment);
      pts.push({
        x: pivotX + (raw.x - pivotX) * bodyScaleX,
        y: pivotY + (raw.y - pivotY) * bodyScaleY,
      });
    }
  }
  return pts;
}

function sampleBeanPoints(bean: BeanSpec, steps = 48): Point[] {
  const pts: Point[] = [];
  const rad = (bean.rotate * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);

  for (let i = 0; i < steps; i++) {
    const theta = (2 * Math.PI * i) / steps;
    const lx = bean.rx * Math.cos(theta);
    const ly = bean.ry * Math.sin(theta);
    pts.push({
      x: bean.cx + lx * cosR - ly * sinR,
      y: bean.cy + lx * sinR + ly * cosR,
    });
  }
  return pts;
}

/**
 * Computes the minimum Euclidean distance (in 200-viewBox units) between
 * any toe bean perimeter and the main pad perimeter.
 */
export function computeMinBeanPadGap(
  beans: BeanSpec[] = REST_BEANS,
  options?: {
    bodyScaleX?: number;
    bodyScaleY?: number;
    beanOffsetY?: number;
  }
): { minGap: number; closestBeanId: string } {
  const padPoints = samplePadPoints(
    36,
    options?.bodyScaleX ?? 1,
    options?.bodyScaleY ?? 1
  );
  const offsetY = options?.beanOffsetY ?? 0;

  let minGap = Number.POSITIVE_INFINITY;
  let closestBeanId = "ol";

  for (const bean of beans) {
    const shiftedBean: BeanSpec = { ...bean, cy: bean.cy + offsetY };
    const beanPoints = sampleBeanPoints(shiftedBean, 48);

    for (const bp of beanPoints) {
      for (const pp of padPoints) {
        const dx = bp.x - pp.x;
        const dy = bp.y - pp.y;
        const dist = Math.hypot(dx, dy);
        if (dist < minGap) {
          minGap = dist;
          closestBeanId = bean.id;
        }
      }
    }
  }

  return {
    minGap: Number(minGap.toFixed(2)),
    closestBeanId,
  };
}

let hasVerifiedDefaultFrames = false;

/**
 * Dev-only assertion per LOAFFY.md §2.1 & LOAFFY-ANIMATION.md §2.8:
 * - Static rest gap between beans and pad must be >= 9.5 units.
 * - No animation frame may ever bring a bean closer than 4.0 units to the pad.
 */
export function assertLoaffyClearance(
  beans: BeanSpec[] = REST_BEANS,
  contextLabel = "rest",
  minAllowed = 4
): void {
  if (process.env.NODE_ENV === "production") return;

  const { minGap, closestBeanId } = computeMinBeanPadGap(beans);
  if (minGap < minAllowed) {
    throw new Error(
      `[Loaffy clearance violation] Bean "${closestBeanId}" is ${minGap} units from pad in "${contextLabel}" (minimum allowed: ${minAllowed} units).`
    );
  }

  if (!hasVerifiedDefaultFrames) {
    hasVerifiedDefaultFrames = true;

    // 1. Static rest check (>= 9.5 units)
    const restResult = computeMinBeanPadGap(REST_BEANS);
    if (restResult.minGap < 9.5) {
      throw new Error(
        `[Loaffy static clearance violation] Static rest gap is ${restResult.minGap} units (must be >= 9.5).`
      );
    }

    // 2. Most squashed animation frames (LOAFFY-ANIMATION.md §4):
    // - idle_breathe exhale: body S(1.01, 0.985), beans y +1
    // - hop anticipation: body S(1.06, 0.94), beans y +2
    // - landing contact: body S(1.14, 0.84), beans cy +4
    // - sleepy: beans cy +3
    // - morph squash peak: body S(1.12, 0.88), beans y -6
    const criticalFrames = [
      {
        label: "idle_breathe exhale",
        opts: { bodyScaleX: 1.01, bodyScaleY: 0.985, beanOffsetY: 1 },
      },
      {
        label: "hop anticipation",
        opts: { bodyScaleX: 1.06, bodyScaleY: 0.94, beanOffsetY: 2 },
      },
      {
        label: "landing contact",
        opts: { bodyScaleX: 1.14, bodyScaleY: 0.84, beanOffsetY: 4 },
      },
      {
        label: "sleepy rest",
        opts: { bodyScaleX: 1.02, bodyScaleY: 0.97, beanOffsetY: 3 },
      },
      {
        label: "morph squash peak",
        opts: { bodyScaleX: 1.12, bodyScaleY: 0.88, beanOffsetY: -6 },
      },
    ];

    for (const frame of criticalFrames) {
      const res = computeMinBeanPadGap(REST_BEANS, frame.opts);
      if (res.minGap < 4) {
        throw new Error(
          `[Loaffy motion clearance violation] Frame "${frame.label}" gap is ${res.minGap} units on bean "${res.closestBeanId}" (must be >= 4.0).`
        );
      }
    }
  }
}

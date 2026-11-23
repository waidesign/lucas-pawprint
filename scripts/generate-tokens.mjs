import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DESIGN_MD_PATH = path.join(ROOT_DIR, "design.md");
const OUTPUT_CSS_PATH = path.join(ROOT_DIR, "src", "styles", "tokens.css");
const GOLDEN_CSS_PATH = path.join(
  ROOT_DIR,
  "docs",
  "pawprint-kit",
  "02-design-system",
  "tokens.css"
);

const BANNED_COLORS = new Set([
  "#000",
  "#000000",
  "#fff",
  "#ffffff",
  "black",
  "white",
  "rgb(0,0,0)",
  "rgb(255,255,255)",
]);

const SPRING_LINEAR_MAP = {
  "spring-calm":
    "linear(0, 0.18 4%, 0.56 12%, 0.86 21%, 1.02 31%, 1.045 38%, 1.03 47%, 1.005 60%, 0.998 75%, 1)",
  "spring-bouncy":
    "linear(0, 0.25 5%, 0.75 13%, 1.08 22%, 1.12 28%, 1.06 37%, 0.98 50%, 1.01 65%, 1)",
};

function pxToRemStr(pxNum) {
  const rem = pxNum / 16;
  return `${Number(rem.toFixed(4))}rem`;
}

function fluidClampFromArrow(arrowStr, minVw = 375, maxVw = 1440) {
  const match = String(arrowStr).match(/^(\d+(?:\.\d+)?)→(\d+(?:\.\d+)?)px$/);
  if (!match) {
    throw new Error(`Invalid fluid range format: "${arrowStr}"`);
  }
  const minPx = Number(match[1]);
  const maxPx = Number(match[2]);
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const interceptRem = (minPx - minVw * slope) / 16;
  const slopeVw = (slope * 100).toFixed(4);
  const interceptStr = `${interceptRem.toFixed(4)}rem`;
  return {
    minPx,
    maxPx,
    css: `clamp(${pxToRemStr(minPx)}, ${interceptStr} + ${slopeVw}vw, ${pxToRemStr(maxPx)})`,
  };
}

function assertMultipleOf4(valuePx, label, { allowStroke = false, allowPill = false } = {}) {
  if (allowPill && valuePx === 9999) return;
  if (allowStroke && (valuePx === 1 || valuePx === 2)) return;
  if (Math.abs(valuePx) % 4 !== 0) {
    throw new Error(
      `Grid lint failure: ${label} = ${valuePx}px is not a multiple of 4.`
    );
  }
}

function validateGridAndRules(data) {
  // 1. Validate colors: no #000000 or #FFFFFF
  const colorGroups = [
    ["colors", data.colors],
    ["themes.dark", data.themes?.dark],
    ["themes.warm-dark", data.themes?.["warm-dark"]],
    ["pastels", data.pastels],
    ["character", data.character],
  ];

  for (const [groupName, group] of colorGroups) {
    if (!group) continue;
    for (const [key, val] of Object.entries(group)) {
      const normalized = String(val).trim().toLowerCase().replace(/\s+/g, "");
      if (BANNED_COLORS.has(normalized)) {
        throw new Error(
          `Color rule violation: ${groupName}.${key} uses banned pure black/white "${val}".`
        );
      }
    }
  }

  // 2. Validate typography endpoints (rem * 16 on 4px grid)
  for (const [role, spec] of Object.entries(data.typography ?? {})) {
    for (const field of ["fontSize", "lineHeight"]) {
      const raw = String(spec[field]);
      const clampMatch = raw.match(
        /^clamp\(([\d.]+)rem,\s*[^,]+,\s*([\d.]+)rem\)$/
      );
      if (clampMatch) {
        assertMultipleOf4(Number(clampMatch[1]) * 16, `typography.${role}.${field} (min)`);
        assertMultipleOf4(Number(clampMatch[2]) * 16, `typography.${role}.${field} (max)`);
      } else if (raw.endsWith("rem")) {
        const remVal = Number(raw.replace(/rem$/, ""));
        assertMultipleOf4(remVal * 16, `typography.${role}.${field}`);
      }
    }
  }

  // 3. Validate rounded
  for (const [key, val] of Object.entries(data.rounded ?? {})) {
    const px = Number(String(val).replace(/px$/, ""));
    assertMultipleOf4(px, `rounded.${key}`, { allowPill: key === "pill" });
  }

  // 4. Validate spacing
  const sp = data.spacing ?? {};
  if (sp.unit) {
    assertMultipleOf4(Number(String(sp.unit).replace(/px$/, "")), "spacing.unit");
  }
  for (const step of sp.scale ?? []) {
    assertMultipleOf4(Number(step), `spacing.scale[${step}]`);
  }
  if (sp.section) {
    const { minPx, maxPx } = fluidClampFromArrow(sp.section);
    assertMultipleOf4(minPx, "spacing.section (min)");
    assertMultipleOf4(maxPx, "spacing.section (max)");
  }
  if (sp.gutter) {
    const { minPx, maxPx } = fluidClampFromArrow(sp.gutter);
    assertMultipleOf4(minPx, "spacing.gutter (min)");
    assertMultipleOf4(maxPx, "spacing.gutter (max)");
  }
  for (const key of ["container", "prose"]) {
    if (sp[key]) {
      assertMultipleOf4(
        Number(String(sp[key]).replace(/px$/, "")),
        `spacing.${key}`
      );
    }
  }

  // 5. Validate sizes
  for (const [key, val] of Object.entries(data.sizes ?? {})) {
    assertMultipleOf4(Number(String(val).replace(/px$/, "")), `sizes.${key}`);
  }

  // 6. Validate borders (strokes 1px/2px allowed)
  for (const [key, val] of Object.entries(data.borders ?? {})) {
    const px = Number(String(val).replace(/px$/, ""));
    const isStroke = key === "hairline" || key === "pen" || key === "focus-width";
    assertMultipleOf4(px, `borders.${key}`, { allowStroke: isStroke });
  }

  // 7. Validate shadows offsets
  for (const [key, val] of Object.entries(data.shadows ?? {})) {
    const parts = String(val).trim().split(/\s+/);
    const xPx = Number(parts[0].replace(/px$/, ""));
    const yPx = Number(parts[1].replace(/px$/, ""));
    assertMultipleOf4(xPx, `shadows.${key}.x`);
    assertMultipleOf4(yPx, `shadows.${key}.y`);
  }

  // 8. Validate motion durations (multiples of 40ms) and press/lift shifts
  for (const [key, val] of Object.entries(data.motion?.duration ?? {})) {
    const ms = Number(String(val).replace(/ms$/, ""));
    if (ms % 40 !== 0) {
      throw new Error(
        `Grid lint failure: motion.duration.${key} = ${ms}ms is not a multiple of 40ms.`
      );
    }
  }
  if (data.motion?.press?.shift) {
    assertMultipleOf4(
      Number(String(data.motion.press.shift).replace(/px$/, "")),
      "motion.press.shift"
    );
  }
  if (data.motion?.lift?.shift) {
    assertMultipleOf4(
      Number(String(data.motion.lift.shift).replace(/px$/, "")),
      "motion.lift.shift"
    );
  }

  // 9. Validate breakpoints and z-index ladder
  for (const [key, val] of Object.entries(data.breakpoints ?? {})) {
    assertMultipleOf4(
      Number(String(val).replace(/px$/, "")),
      `breakpoints.${key}`
    );
  }
  for (const [key, val] of Object.entries(data.z ?? {})) {
    assertMultipleOf4(Number(val), `z.${key}`);
  }
}

export function generateTokensCss(data) {
  validateGridAndRules(data);

  const lines = [];
  lines.push(
    `/* lucas.pawprint.design · tokens.css — GOLDEN OUTPUT.`,
    `   Generated from design.md by scripts/generate-tokens.mjs. Do not hand-edit in the app; change design.md and regenerate.`,
    `   Grid rule: every size, space, radius, offset and duration is a multiple of 4 (or 8). Strokes (1px, 2px) are the only exception. */`,
    ``,
    `/* 1. Raw theme values (switch with data-theme on <html>) */`,
    `:root, [data-theme="light"] {`
  );

  for (const [key, val] of Object.entries(data.colors)) {
    lines.push(`  --lp-${key}: ${val};`);
  }
  lines.push(`  color-scheme: light;`, `}`, ``);

  lines.push(`[data-theme="dark"] {`);
  for (const [key, val] of Object.entries(data.themes.dark)) {
    lines.push(`  --lp-${key}: ${val};`);
  }
  lines.push(`  color-scheme: dark;`, `}`, ``);

  lines.push(`[data-theme="warm-dark"] {`);
  for (const [key, val] of Object.entries(data.themes["warm-dark"])) {
    lines.push(`  --lp-${key}: ${val};`);
  }
  lines.push(`  color-scheme: dark;`, `}`, ``);

  lines.push(
    `/* 2. Static tokens → Tailwind utilities (default palette removed: tokens only) */`,
    `@theme {`,
    `  --color-*: initial;`,
    `  --font-*: initial;`,
    `  --radius-*: initial;`,
    `  --shadow-*: initial;`
  );

  for (const [key, val] of Object.entries(data.pastels)) {
    lines.push(`  --color-${key}: ${val};`);
  }
  for (const [key, val] of Object.entries(data.character)) {
    lines.push(`  --color-${key}: ${val};`);
  }

  lines.push(
    `  --font-display: "${data.fonts.display}", ui-sans-serif, system-ui, sans-serif;`,
    `  --font-body: "${data.fonts.body}", ui-sans-serif, system-ui, sans-serif;`,
    `  --font-mono: "${data.fonts.mono}", ui-monospace, monospace;`
  );

  for (const [role, spec] of Object.entries(data.typography)) {
    lines.push(`  --text-${role}: ${spec.fontSize};`);
    lines.push(`  --text-${role}--line-height: ${spec.lineHeight};`);
    lines.push(`  --text-${role}--letter-spacing: ${spec.letterSpacing};`);
    lines.push(`  --text-${role}--font-weight: ${spec.fontWeight};`);
  }

  for (const [key, val] of Object.entries(data.rounded)) {
    lines.push(`  --radius-${key}: ${val};`);
  }

  const unitPx = Number(String(data.spacing.unit).replace(/px$/, ""));
  lines.push(
    `  --spacing: ${pxToRemStr(unitPx)};  /* 4px: p-1=4, p-2=8, p-3=12, p-4=16 … use steps from the scale only */`
  );

  for (const [key, val] of Object.entries(data.breakpoints)) {
    lines.push(`  --breakpoint-${key}: ${val};`);
  }

  for (const [key, val] of Object.entries(data.motion.easing)) {
    const resolved = SPRING_LINEAR_MAP[key] ?? val;
    lines.push(`  --ease-${key}: ${resolved};`);
  }

  lines.push(`}`, ``);

  lines.push(
    `/* 3. Theme-aware tokens → utilities that follow data-theme */`,
    `@theme inline {`
  );
  for (const key of Object.keys(data.colors)) {
    lines.push(`  --color-${key}: var(--lp-${key});`);
  }
  for (const [key, val] of Object.entries(data.shadows)) {
    const resolved = String(val).replace(/\bshadow\b/g, "var(--lp-shadow)");
    lines.push(`  --shadow-${key}: ${resolved};`);
  }
  lines.push(`}`, ``);

  lines.push(`/* 4. Non-utility tokens */`, `:root {`);
  for (const step of data.spacing.scale) {
    lines.push(`  --space-${step}: ${pxToRemStr(step)};  /* ${step}px */`);
  }

  const sectionClamp = fluidClampFromArrow(data.spacing.section);
  const gutterClamp = fluidClampFromArrow(data.spacing.gutter);
  lines.push(`  --space-section: ${sectionClamp.css};`);
  lines.push(`  --space-gutter: ${gutterClamp.css};`);

  const containerPx = Number(String(data.spacing.container).replace(/px$/, ""));
  const prosePx = Number(String(data.spacing.prose).replace(/px$/, ""));
  lines.push(`  --container-max: ${pxToRemStr(containerPx)};  /* ${containerPx}px */`);
  lines.push(`  --prose-max: ${pxToRemStr(prosePx)};     /* ${prosePx}px */`);

  for (const [key, val] of Object.entries(data.sizes)) {
    const px = Number(String(val).replace(/px$/, ""));
    lines.push(`  --size-${key}: ${pxToRemStr(px)};  /* ${px}px */`);
  }

  lines.push(`  --border-hairline: ${data.borders.hairline};`);
  lines.push(`  --border-pen: ${data.borders.pen};`);
  lines.push(`  --focus-width: ${data.borders["focus-width"]};`);
  lines.push(`  --focus-offset: ${data.borders["focus-offset"]};`);

  for (const [key, val] of Object.entries(data.motion.duration)) {
    lines.push(`  --duration-${key}: ${val};`);
  }

  for (const [key, val] of Object.entries(data.z)) {
    lines.push(`  --z-${key}: ${val};`);
  }

  lines.push(`  --press-scale: ${data.motion.press.scale};`);
  lines.push(`  --press-shift: ${data.motion.press.shift};`);
  lines.push(`  --lift-shift: ${data.motion.lift.shift};`);
  lines.push(`}`, ``);

  lines.push(
    `@media (prefers-reduced-motion: reduce) {`,
    `  :root { --duration-fast: 1ms; --duration-base: 1ms; --duration-slow: 1ms; --duration-lazy: 1ms; --press-scale: 1; --press-shift: 0px; --lift-shift: 0px; }`,
    `}`,
    ``
  );

  return lines.join("\n");
}

function normalizeCssForComparison(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes("--check");

  if (!fs.existsSync(DESIGN_MD_PATH)) {
    console.error(`Error: design.md not found at ${DESIGN_MD_PATH}`);
    process.exit(1);
  }

  const rawMd = fs.readFileSync(DESIGN_MD_PATH, "utf8");
  const { data } = matter(rawMd);

  if (!data || !data.colors || !data.themes) {
    console.error("Error: design.md frontmatter is missing required token keys.");
    process.exit(1);
  }

  const generatedCss = generateTokensCss(data);

  if (checkOnly) {
    if (!fs.existsSync(GOLDEN_CSS_PATH)) {
      console.error(`Error: Golden tokens.css not found at ${GOLDEN_CSS_PATH}`);
      process.exit(1);
    }
    if (!fs.existsSync(OUTPUT_CSS_PATH)) {
      console.error(`Error: Output tokens.css not found at ${OUTPUT_CSS_PATH}`);
      process.exit(1);
    }

    const goldenCss = fs.readFileSync(GOLDEN_CSS_PATH, "utf8");
    const currentOutputCss = fs.readFileSync(OUTPUT_CSS_PATH, "utf8");

    const normGenerated = normalizeCssForComparison(generatedCss);
    const normGolden = normalizeCssForComparison(goldenCss);
    const normCurrent = normalizeCssForComparison(currentOutputCss);

    if (normGenerated !== normGolden) {
      console.error("✗ tokens:check failed — generated tokens.css does not match golden docs/pawprint-kit/02-design-system/tokens.css");
      process.exit(1);
    }
    if (normCurrent !== normGolden) {
      console.error("✗ tokens:check failed — src/styles/tokens.css is out of sync with golden tokens.css. Run `npm run tokens`.");
      process.exit(1);
    }

    console.log("✓ tokens:check passed (4/8 grid lint clean; matches golden tokens.css)");
    return;
  }

  fs.mkdirSync(path.dirname(OUTPUT_CSS_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_CSS_PATH, generatedCss, "utf8");
  console.log("✓ Generated src/styles/tokens.css from design.md (4/8 grid lint passed)");
}

main();

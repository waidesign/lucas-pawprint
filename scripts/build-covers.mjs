import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 750;

const PASTELS = {
  lilac: "#E2D3FF",
  mint: "#AEE8CC",
  butter: "#FFE591",
  sky: "#AED6FF",
  blush: "#FFC9D5",
  pistachio: "#D7EEA6",
};

const INK = "#2B2B2B";
const SURFACE = "#ECECE6";
const BG = "#F6F6F3";

/**
 * Create a flat ink-bordered browser window PNG buffer containing a resized screenshot.
 * 2px ink border, rounded corners (20px), top bar with 3 pastel dots, zero blur/gradients.
 */
async function makeBrowserFrame(imagePath, { width = 760, height = 490, topBar = 32, radius = 20 }) {
  const screenW = width - 4;
  const screenH = height - topBar - 4;

  const screenBuf = await sharp(imagePath)
    .resize(screenW, screenH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  // Clip screen with bottom rounded corners matching inner radius
  const innerR = Math.max(0, radius - 2);
  const maskSvg = Buffer.from(
    `<svg width="${screenW}" height="${screenH}" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 H${screenW} V${screenH - innerR} Q${screenW},${screenH} ${screenW - innerR},${screenH} H${innerR} Q0,${screenH} 0,${screenH - innerR} Z" fill="#fff"/>
    </svg>`,
  );

  const maskedScreen = await sharp(screenBuf)
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Base chrome SVG (outer rounded border + top bar with 3 pastel dots)
  const chromeSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}" fill="${BG}" stroke="${INK}" stroke-width="2"/>
      <path d="M${radius},1 H${width - radius} Q${width - 1},1 ${width - 1},${radius} V${topBar} H1 V${radius} Q1,1 ${radius},1 Z" fill="${SURFACE}" stroke="${INK}" stroke-width="2"/>
      <line x1="1" y1="${topBar}" x2="${width - 1}" y2="${topBar}" stroke="${INK}" stroke-width="2"/>
      <circle cx="20" cy="${Math.round(topBar / 2)}" r="5" fill="${PASTELS.blush}" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="36" cy="${Math.round(topBar / 2)}" r="5" fill="${PASTELS.butter}" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="52" cy="${Math.round(topBar / 2)}" r="5" fill="${PASTELS.mint}" stroke="${INK}" stroke-width="1.5"/>
    </svg>`,
  );

  // Outer stroke overlay so screen pixels never cover the 2px ink border
  const borderOverlay = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}" fill="none" stroke="${INK}" stroke-width="2"/>
    </svg>`,
  );

  return sharp(chromeSvg)
    .composite([
      { input: maskedScreen, left: 2, top: topBar + 1 },
      { input: borderOverlay, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

/**
 * Create a flat ink-bezel phone frame PNG buffer (12px bezel, outer radius 48, screen radius 36).
 */
async function makePhoneFrame(imagePath, { width = 280, height = 560 }) {
  const bezel = 12;
  const outerR = 48;
  const screenR = 36;
  const screenW = width - bezel * 2;
  const screenH = height - bezel * 2;

  const screenBuf = await sharp(imagePath)
    .resize(screenW, screenH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const screenMask = Buffer.from(
    `<svg width="${screenW}" height="${screenH}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${screenW}" height="${screenH}" rx="${screenR}" fill="#fff"/>
    </svg>`,
  );

  const maskedScreen = await sharp(screenBuf)
    .composite([{ input: screenMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const bodySvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${outerR}" fill="${INK}"/>
    </svg>`,
  );

  const pillSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${Math.round(width / 2 - 28)}" y="${bezel + 8}" width="56" height="12" rx="6" fill="${INK}"/>
    </svg>`,
  );

  return sharp(bodySvg)
    .composite([
      { input: maskedScreen, left: bezel, top: bezel },
      { input: pillSvg, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

/** Rotate a PNG frame buffer cleanly with transparent background, ready to composite onto a 1200x750 canvas. */
async function rotateFrame(buf, angle) {
  return sharp(buf)
    .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

/**
 * Cover definitions (classic-decoder-app is kept untouched per instructions).
 * Each cover composes 2–3 real framed screenshots on a diagonal bleeding off edges,
 * on a flat pastel background from design.md §1.4 (no blur, no gradients, no logos, no text).
 */
const COVER_SPECS = [
  {
    slug: "luci",
    tone: "lilac",
    frames: [
      {
        type: "browser",
        src: "public/case-studies/luci/screens/core-demo.webp",
        width: 680,
        height: 440,
        angle: -8,
        left: -90,
        top: -60,
      },
      {
        type: "browser",
        src: "public/case-studies/luci/screens/devtool-demo.webp",
        width: 780,
        height: 500,
        angle: -6,
        left: 240,
        top: 120,
      },
      {
        type: "browser",
        src: "public/case-studies/luci/screens/extension-demo.webp",
        width: 640,
        height: 410,
        angle: -8,
        left: 690,
        top: 430,
      },
    ],
  },
  {
    slug: "classic-decoder",
    tone: "sky",
    frames: [
      {
        type: "browser",
        src: "public/case-studies/classic-decoder/screens/classifieds-desktop.webp",
        width: 700,
        height: 450,
        angle: -7,
        left: -120,
        top: 320,
      },
      {
        type: "browser",
        src: "public/case-studies/classic-decoder/screens/home-desktop.webp",
        width: 780,
        height: 500,
        angle: -6,
        left: 140,
        top: 60,
      },
      {
        type: "phone",
        src: "public/case-studies/classic-decoder/screens/home-mobile.webp",
        width: 270,
        height: 540,
        angle: 7,
        left: 880,
        top: 150,
      },
    ],
  },
  {
    slug: "vehicle-databases",
    tone: "butter",
    frames: [
      {
        type: "browser",
        src: "public/case-studies/vehicle-databases/screens/api-product-desktop.webp",
        width: 680,
        height: 440,
        angle: -8,
        left: -100,
        top: -70,
      },
      {
        type: "browser",
        src: "public/case-studies/vehicle-databases/screens/home-desktop.webp",
        width: 780,
        height: 500,
        angle: -5,
        left: 120,
        top: 140,
      },
      {
        type: "browser",
        src: "public/case-studies/vehicle-databases/screens/pricing-desktop.webp",
        width: 640,
        height: 410,
        angle: 6,
        left: 630,
        top: 340,
      },
    ],
  },
  {
    slug: "detailed-vehicle-history",
    tone: "pistachio",
    frames: [
      {
        type: "browser",
        src: "public/case-studies/detailed-vehicle-history/screens/window-sticker-desktop.webp",
        width: 700,
        height: 450,
        angle: -8,
        left: -110,
        top: 290,
      },
      {
        type: "browser",
        src: "public/case-studies/detailed-vehicle-history/screens/home-desktop.webp",
        width: 780,
        height: 500,
        angle: -6,
        left: 160,
        top: 50,
      },
      {
        type: "phone",
        src: "public/case-studies/detailed-vehicle-history/screens/home-mobile.webp",
        width: 270,
        height: 540,
        angle: 6,
        left: 890,
        top: 160,
      },
    ],
  },
  {
    slug: "fierce-fight-gear",
    tone: "blush",
    frames: [
      {
        type: "browser",
        src: "public/case-studies/fierce-fight-gear/screens/home-desktop.webp",
        width: 720,
        height: 460,
        angle: -7,
        left: -100,
        top: 40,
      },
      {
        type: "browser",
        src: "public/case-studies/fierce-fight-gear/screens/customizer-desktop.webp",
        width: 760,
        height: 490,
        angle: -5,
        left: 340,
        top: 180,
      },
      {
        type: "phone",
        src: "public/case-studies/fierce-fight-gear/screens/home-mobile.webp",
        width: 260,
        height: 520,
        angle: 8,
        left: 920,
        top: -40,
      },
    ],
  },
  {
    slug: "sarayah-phuket-villas",
    tone: "lilac",
    frames: [
      {
        type: "browser",
        src: "public/case-studies/sarayah-phuket-villas/screens/villa-desktop.webp",
        width: 700,
        height: 450,
        angle: -8,
        left: -110,
        top: 290,
      },
      {
        type: "browser",
        src: "public/case-studies/sarayah-phuket-villas/screens/home-desktop.webp",
        width: 780,
        height: 500,
        angle: -5,
        left: 150,
        top: 50,
      },
      {
        type: "phone",
        src: "public/case-studies/sarayah-phuket-villas/screens/home-mobile.webp",
        width: 270,
        height: 540,
        angle: 7,
        left: 880,
        top: 160,
      },
    ],
  },
];

async function buildCover(spec) {
  const missing = spec.frames.filter((f) => !fs.existsSync(path.join(ROOT, f.src)));
  if (missing.length > 0) {
    console.log(`↷ Skipping ${spec.slug} (missing: ${missing.map((m) => m.src).join(", ")})`);
    return false;
  }

  const bgHex = PASTELS[spec.tone];
  const composites = [];

  for (const frame of spec.frames) {
    const absSrc = path.join(ROOT, frame.src);
    const raw =
      frame.type === "phone"
        ? await makePhoneFrame(absSrc, { width: frame.width, height: frame.height })
        : await makeBrowserFrame(absSrc, { width: frame.width, height: frame.height });
    const rotated = await rotateFrame(raw, frame.angle);

    // Crop/clip rotated frame onto the 1200x750 viewport so sharp composite never overflows negative/positive bounds
    const rMeta = await sharp(rotated).metadata();
    const rW = rMeta.width ?? frame.width;
    const rH = rMeta.height ?? frame.height;

    const srcLeft = Math.max(0, -frame.left);
    const srcTop = Math.max(0, -frame.top);
    const dstLeft = Math.max(0, frame.left);
    const dstTop = Math.max(0, frame.top);
    const extractW = Math.min(rW - srcLeft, WIDTH - dstLeft);
    const extractH = Math.min(rH - srcTop, HEIGHT - dstTop);

    if (extractW > 0 && extractH > 0) {
      const clipped = await sharp(rotated)
        .extract({ left: srcLeft, top: srcTop, width: extractW, height: extractH })
        .png()
        .toBuffer();
      composites.push({ input: clipped, left: dstLeft, top: dstTop });
    }
  }

  const outDir = path.join(ROOT, "public", "case-studies", spec.slug);
  fs.mkdirSync(outDir, { recursive: true });
  const webpPath = path.join(outDir, "cover.webp");
  const avifPath = path.join(outDir, "cover.avif");

  const canvas = sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: bgHex,
    },
  }).composite(composites);

  await canvas.clone().webp({ quality: 86 }).toFile(webpPath);
  await canvas.clone().avif({ quality: 60 }).toFile(avifPath);

  const webpKb = (fs.statSync(webpPath).size / 1024).toFixed(1);
  const avifKb = (fs.statSync(avifPath).size / 1024).toFixed(1);
  console.log(`✓ Built cover for ${spec.slug}: cover.webp (${webpKb}KB) + cover.avif (${avifKb}KB)`);
  return true;
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const onlyList = onlyArg ? onlyArg.replace("--only=", "").split(",") : null;

  const targets = onlyList
    ? COVER_SPECS.filter((s) => onlyList.includes(s.slug))
    : COVER_SPECS;

  for (const spec of targets) {
    await buildCover(spec);
  }
}

main().catch((err) => {
  console.error("✗ build-covers failed:", err);
  process.exit(1);
});

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const LEGACY_DIR = path.join(ROOT_DIR, "docs", "legacy");
const PUBLIC_CASE_DIR = path.join(ROOT_DIR, "public", "case-studies");
const PUBLIC_IMAGES_DIR = path.join(ROOT_DIR, "public", "images");
const CONTENT_CASE_DIR = path.join(ROOT_DIR, "src", "content", "case-studies");

async function stageLegacyImages() {
  // Portrait image (case study covers and screens are now captured from live sites / scripts/build-covers.mjs)
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  const portraitSrc = path.join(LEGACY_DIR, "profileimg.webp");
  const portraitDest = path.join(PUBLIC_IMAGES_DIR, "lucas-portrait.webp");
  if (fs.existsSync(portraitSrc) && !fs.existsSync(portraitDest)) {
    fs.copyFileSync(portraitSrc, portraitDest);
  }

  // Generate build-time OG share images for every published case study
  await generateCaseOgImages();
}

const PASTEL_HEX = {
  lilac: "#E2D3FF",
  mint: "#AEE8CC",
  butter: "#FFE591",
  sky: "#AED6FF",
  blush: "#FFC9D5",
  pistachio: "#D7EEA6",
};

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapLines(text, maxChars, maxLines) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  return lines;
}

function parseMdxMetadata(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const startMatch = raw.match(/export\s+const\s+metadata\s*=\s*\{/);
  if (!startMatch || startMatch.index === undefined) return null;
  const braceStart = raw.indexOf("{", startMatch.index);
  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return null;
  const objSource = raw.slice(braceStart, end + 1);
  return vm.runInNewContext(`(${objSource})`, {});
}

async function loadLoaffyFormBuffer(form) {
  const formPath = path.join(ROOT_DIR, "public", "loaffy", "forms", `${form}.svg`);
  const fallbackPath = path.join(ROOT_DIR, "public", "loaffy", "forms", "window.svg");
  const resolved = fs.existsSync(formPath)
    ? formPath
    : fs.existsSync(fallbackPath)
      ? fallbackPath
      : null;
  if (!resolved) return null;
  return sharp(resolved)
    .resize({ width: 304, height: 304, fit: "contain" })
    .png()
    .toBuffer();
}

async function renderCaseOgPng({
  slug,
  title,
  summary,
  tone,
  form,
  badgeText,
  outFile,
}) {
  const bgHex = PASTEL_HEX[tone] ?? PASTEL_HEX.lilac;
  const safeBadge = escapeXml(badgeText);
  const pillWidth = Math.max(200, Math.min(540, badgeText.length * 13 + 64));

  const titleSize = title.length > 18 ? 64 : title.length > 10 ? 74 : 90;
  const titleMaxChars = title.length > 18 ? 17 : 15;
  const titleLines = wrapLines(title, titleMaxChars, 2);
  const titleLineHeight = Math.round(titleSize * 1.12);
  const titleStartY = titleLines.length > 1 ? 216 : 240;

  const summaryLines = wrapLines(summary, 46, 4);
  const summaryStartY =
    titleStartY + (titleLines.length - 1) * titleLineHeight + 52;

  const titleSvg = titleLines
    .map(
      (line, idx) =>
        `<text x="80" y="${titleStartY + idx * titleLineHeight}" font-family="sans-serif" font-size="${titleSize}" font-weight="800" fill="#2B2B2B">${escapeXml(line)}</text>`
    )
    .join("");

  const summarySvg = summaryLines
    .map(
      (line, idx) =>
        `<text x="80" y="${summaryStartY + idx * 36}" font-family="sans-serif" font-size="26" font-weight="500" fill="#55524D">${escapeXml(line)}</text>`
    )
    .join("");

  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${bgHex}"/>
    <rect x="32" y="32" width="1136" height="566" rx="40" fill="#F6F6F3" stroke="#2B2B2B" stroke-width="4"/>
    <rect x="80" y="80" width="${pillWidth}" height="48" rx="24" fill="${bgHex}" stroke="#2B2B2B" stroke-width="3"/>
    <text x="108" y="111" font-family="monospace" font-size="20" font-weight="700" fill="#2B2B2B">${safeBadge}</text>
    ${titleSvg}
    ${summarySvg}
    <text x="80" y="532" font-family="monospace" font-size="22" font-weight="600" fill="#2B2B2B">lucas.pawprint.design/work/${escapeXml(slug)}</text>
  </svg>`;

  const loaffyBuffer = await loadLoaffyFormBuffer(form);
  const baseOg = sharp(Buffer.from(ogSvg));
  if (loaffyBuffer) {
    baseOg.composite([{ input: loaffyBuffer, left: 824, top: 160 }]);
  }
  await baseOg.png().toFile(outFile);
}

async function generateCaseOgImages() {
  const ogDir = path.join(ROOT_DIR, "public", "og");
  fs.mkdirSync(ogDir, { recursive: true });

  const mdxFiles = fs
    .readdirSync(CONTENT_CASE_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));

  let generatedCount = 0;

  for (const file of mdxFiles) {
    const meta = parseMdxMetadata(path.join(CONTENT_CASE_DIR, file));
    if (!meta || meta.status === "draft") continue;

    if (meta.slug === "luci") {
      await renderCaseOgPng({
        slug: meta.slug,
        title: meta.title,
        summary: meta.summary,
        tone: meta.tone,
        form: meta.form,
        badgeText: "Luci · open source",
        outFile: path.join(ogDir, "luci.png"),
      });
      generatedCount++;
      continue;
    }

    await renderCaseOgPng({
      slug: meta.slug,
      title: meta.title,
      summary: meta.summary,
      tone: meta.tone,
      form: meta.form,
      badgeText: `${meta.client} · ${meta.year}`,
      outFile: path.join(ogDir, `${meta.slug}.png`),
    });
    generatedCount++;
  }

  console.log(`✓ Generated ${generatedCount} build-time OG share images in public/og/`);
}

function collectRasterImages(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectRasterImages(fullPath));
    } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeRasterFiles() {
  const dirsToScan = [PUBLIC_CASE_DIR, PUBLIC_IMAGES_DIR, CONTENT_CASE_DIR];
  const allFiles = dirsToScan.flatMap((d) => collectRasterImages(d));

  let webpCount = 0;
  let avifCount = 0;

  for (const filePath of allFiles) {
    const parsed = path.parse(filePath);
    const baseNoExt = path.join(parsed.dir, parsed.name);
    const webpPath = `${baseNoExt}.webp`;
    const avifPath = `${baseNoExt}.avif`;

    if (!fs.existsSync(webpPath)) {
      await sharp(filePath).webp({ quality: 84 }).toFile(webpPath);
      webpCount++;
    }

    if (!fs.existsSync(avifPath)) {
      await sharp(filePath).avif({ quality: 68 }).toFile(avifPath);
      avifCount++;
    }
  }

  console.log(
    `✓ Image pipeline checked ${allFiles.length} source images (generated ${webpCount} WebP, ${avifCount} AVIF)`
  );
}

async function main() {
  await stageLegacyImages();
  await optimizeRasterFiles();
}

main().catch((err) => {
  console.error("✗ Image optimization failed:", err);
  process.exit(1);
});

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

const LEGACY_CASE_MAP = [
  {
    slug: "classic-decoder",
    files: [
      ["cdsite-thumbnail.webp", "cover.webp"],
      ["cdsite1.webp", "screen-1.webp"],
      ["cdsite2.webp", "screen-2.webp"],
      ["cdsite3.webp", "screen-3.webp"],
    ],
  },
  {
    slug: "classic-decoder-app",
    files: [
      ["cdapp-thumbnail.webp", "cover.webp"],
      ["cdapp1.webp", "screen-1.webp"],
      ["cdapp2.webp", "screen-2.webp"],
      ["cdapp3.webp", "screen-3.webp"],
    ],
  },
  {
    slug: "vehicle-databases",
    files: [
      ["vdbsite-thumbnail.webp", "cover.webp"],
      ["vdb1.webp", "screen-1.webp"],
      ["vdb2.webp", "screen-2.webp"],
      ["vdb3.webp", "screen-3.webp"],
    ],
  },
  {
    slug: "detailed-vehicle-history",
    files: [
      ["dvhsite-thumbnail.webp", "cover.webp"],
      ["dvh1.webp", "screen-1.webp"],
      ["dvh2.webp", "screen-2.webp"],
      ["dvh3.webp", "screen-3.webp"],
    ],
  },
  {
    slug: "fierce-fight-gear",
    files: [
      ["ffg-thumbnail.webp", "cover.webp"],
      ["ffg1.webp", "screen-1.webp"],
      ["ffg2.webp", "screen-2.webp"],
      ["ffg3.webp", "screen-3.webp"],
    ],
  },
  {
    slug: "sarayah-phuket-villas",
    files: [
      ["sarayah-thumbnail.webp", "cover.webp"],
      ["sarayah1.webp", "screen-1.webp"],
      ["sarayah2.webp", "screen-2.webp"],
      ["sarayah3.webp", "screen-3.webp"],
    ],
  },
];

async function stageLegacyImages() {
  for (const entry of LEGACY_CASE_MAP) {
    const destDir = path.join(PUBLIC_CASE_DIR, entry.slug);
    fs.mkdirSync(destDir, { recursive: true });

    for (const [srcName, destName] of entry.files) {
      const srcPath = path.join(LEGACY_DIR, srcName);
      const destPath = path.join(destDir, destName);
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  // Portrait image
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  const portraitSrc = path.join(LEGACY_DIR, "profileimg.webp");
  const portraitDest = path.join(PUBLIC_IMAGES_DIR, "lucas-portrait.webp");
  if (fs.existsSync(portraitSrc) && !fs.existsSync(portraitDest)) {
    fs.copyFileSync(portraitSrc, portraitDest);
  }

  // Luci V1 illustration cover (/case-studies/luci/hero.{webp,avif}) + build-time OG images (/og/luci-{teaser,full}.png)
  const luciDestDir = path.join(PUBLIC_CASE_DIR, "luci");
  fs.mkdirSync(luciDestDir, { recursive: true });
  const luciCoverWebp = path.join(luciDestDir, "cover.webp");
  const luciHeroWebp = path.join(luciDestDir, "hero.webp");
  const luciHeroAvif = path.join(luciDestDir, "hero.avif");

  const v1HeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
    <rect width="1200" height="750" fill="#F5EFEA"/>
    <!-- Left landing page area -->
    <rect x="48" y="48" width="664" height="568" rx="16" fill="#F5EFEA" stroke="#2B2B2B" stroke-width="3"/>
    <circle cx="80" cy="80" r="8" fill="#FFC9D5" stroke="#2B2B2B" stroke-width="2"/>
    <circle cx="104" cy="80" r="8" fill="#FFE591" stroke="#2B2B2B" stroke-width="2"/>
    <circle cx="128" cy="80" r="8" fill="#AEE8CC" stroke="#2B2B2B" stroke-width="2"/>
    <line x1="48" y1="112" x2="712" y2="112" stroke="#2B2B2B" stroke-width="3"/>
    <rect x="88" y="164" width="140" height="16" rx="8" fill="#2B2B2B" opacity="0.25"/>
    <text x="88" y="232" font-family="sans-serif" font-size="38" font-weight="800" fill="#2B2B2B">Ship calm interfaces faster.</text>
    <rect x="88" y="260" width="360" height="14" rx="7" fill="#2B2B2B" opacity="0.2"/>
    <!-- Selection chip -->
    <rect x="88" y="330" width="332" height="44" rx="22" fill="#F4A878" stroke="#2B2B2B" stroke-width="3"/>
    <text x="112" y="358" font-family="monospace" font-size="18" font-weight="700" fill="#2B2B2B">Button · 4 states · can export ✓</text>
    <!-- Selected Get started button + dashed outline -->
    <rect x="88" y="392" width="216" height="64" rx="32" fill="none" stroke="#CD8D65" stroke-width="3" stroke-dasharray="10 8"/>
    <rect x="98" y="402" width="196" height="44" rx="22" fill="#2B2B2B"/>
    <text x="148" y="430" font-family="sans-serif" font-size="20" font-weight="700" fill="#F5EFEA">Get started</text>
    <!-- Right design.md panel -->
    <rect x="736" y="48" width="416" height="568" rx="16" fill="#2B2B2B" stroke="#2B2B2B" stroke-width="3"/>
    <text x="768" y="96" font-family="monospace" font-size="20" font-weight="700" fill="#F5EFEA">design.md</text>
    <rect x="1012" y="72" width="108" height="32" rx="16" fill="#F4A878"/>
    <text x="1028" y="93" font-family="monospace" font-size="16" font-weight="700" fill="#2B2B2B">measured</text>
    <line x1="768" y1="120" x2="1120" y2="120" stroke="#F5EFEA" stroke-opacity="0.2" stroke-width="2"/>
    <text x="768" y="168" font-family="monospace" font-size="17" fill="#F5EFEA">1  component: button.get-started</text>
    <text x="768" y="208" font-family="monospace" font-size="17" fill="#F5EFEA">2  scope: single-element</text>
    <text x="768" y="248" font-family="monospace" font-size="17" fill="#F5EFEA">3  states: [default, hover, focus]</text>
    <text x="768" y="288" font-family="monospace" font-size="17" fill="#F4A878">4  backgroundColor: "{colors.surface}"</text>
    <text x="768" y="328" font-family="monospace" font-size="17" fill="#F5EFEA">5  rounded: "{rounded.r-9999}"</text>
    <text x="768" y="368" font-family="monospace" font-size="17" fill="#F5EFEA">6  padding: "1.25rem 1.75rem"</text>
    <text x="768" y="408" font-family="monospace" font-size="17" fill="#AEE8CC">7  wcag: "AAA · passes contrast"</text>
    <!-- Docked Luci toolbar pill -->
    <rect x="210" y="644" width="780" height="64" rx="32" fill="#2B2B2B" stroke="#2B2B2B" stroke-width="3"/>
    <rect x="226" y="656" width="112" height="40" rx="20" fill="#F4A878"/>
    <text x="252" y="682" font-family="monospace" font-size="16" font-weight="700" fill="#2B2B2B">Capture</text>
    <text x="366" y="682" font-family="monospace" font-size="16" fill="#F5EFEA">Text</text>
    <text x="450" y="682" font-family="monospace" font-size="16" fill="#F5EFEA">Colour</text>
    <text x="554" y="682" font-family="monospace" font-size="16" fill="#F5EFEA">Spacing</text>
    <text x="668" y="682" font-family="monospace" font-size="16" fill="#F5EFEA">Basket</text>
    <text x="772" y="682" font-family="monospace" font-size="16" fill="#F5EFEA">Feedback</text>
    <text x="892" y="682" font-family="monospace" font-size="16" fill="#F5EFEA">Settings</text>
  </svg>`;

  const v1WebpBuffer = await sharp(Buffer.from(v1HeroSvg))
    .webp({ quality: 88 })
    .toBuffer();
  const v1AvifBuffer = await sharp(Buffer.from(v1HeroSvg))
    .avif({ quality: 72 })
    .toBuffer();

  fs.writeFileSync(luciHeroWebp, v1WebpBuffer);
  fs.writeFileSync(luciHeroAvif, v1AvifBuffer);
  if (!fs.existsSync(luciCoverWebp)) {
    fs.writeFileSync(luciCoverWebp, v1WebpBuffer);
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

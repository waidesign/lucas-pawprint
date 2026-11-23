import fs from "node:fs";
import path from "node:path";
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

  // Luci teaser cover (Muzzle White #F5EFEA canvas with public Luci stacked logo)
  const luciDestDir = path.join(PUBLIC_CASE_DIR, "luci");
  fs.mkdirSync(luciDestDir, { recursive: true });
  const luciCoverWebp = path.join(luciDestDir, "cover.webp");
  const luciLogoSvg = path.join(
    CONTENT_CASE_DIR,
    "luci",
    "luci-logo-stacked.svg"
  );

  if (!fs.existsSync(luciCoverWebp) && fs.existsSync(luciLogoSvg)) {
    const logoBuffer = await sharp(luciLogoSvg)
      .resize({ width: 360, height: 360, fit: "contain" })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 1200,
        height: 750,
        channels: 4,
        background: "#F5EFEA",
      },
    })
      .composite([{ input: logoBuffer, gravity: "center" }])
      .webp({ quality: 86 })
      .toFile(luciCoverWebp);
  }
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

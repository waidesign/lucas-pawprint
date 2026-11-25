/**
 * Builds the site icons from Loaffy's real geometry (BRAND.md §5 "Favicon / app icon",
 * LOAFFY.md §3): Loaffy's calm face on a Lilac square.
 * - Small (16–48px + icon.svg): simplified mark = pad + 4 beans + eyes, no cheeks,
 *   no highlight, chunkier strokes so it stays readable in a browser tab.
 * - Large (180 / 192 / 512px): the full calm face (cheeks, glints, smile, highlight,
 *   pen under-copy).
 * Corner radius: 8px at 32px (25%), 40px at 180px (~22%).
 *
 * Run: npm run icons   (outputs are committed; re-run only when the mark changes)
 *   src/app/icon.svg          browser tab (SVG, scales cleanly)
 *   src/app/favicon.ico       16/32/48 PNG-in-ICO fallback
 *   src/app/apple-icon.png    180×180 iOS home screen
 *   public/icons/icon-192.png, icon-512.png   web manifest (Android)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* Loaffy geometry (src/components/mascot/parts) — the only allowed raw values. */
const C = {
  lilac: "#E2D3FF",
  ginger: "#F4A878",
  ink: "#2B2B2B",
  cheek: "#F2B8B0",
  glint: "#FBF6EE",
};
const PAD =
  "M100,92 C130,92 160,118 164,148 C167,170 150,182 132,178 C120,175 112,182 100,182 C88,182 80,175 68,178 C50,182 33,170 36,148 C40,118 70,92 100,92 Z";
const BEANS = [
  { cx: 38, cy: 90, rx: 14, ry: 18, rotate: -34 },
  { cx: 80, cy: 66, rx: 15, ry: 19, rotate: -12 },
  { cx: 120, cy: 66, rx: 15, ry: 19, rotate: 12 },
  { cx: 162, cy: 90, rx: 14, ry: 18, rotate: 34 },
];
/* Paw bounds in its 200-unit space (LoaffyMark viewBox "14 40 172 148"). */
const PAW = { x: 14, y: 40, w: 172, h: 148 };

function pawGroup({ size, fill, detail }) {
  const s = (size * fill) / PAW.w;
  const tx = size / 2 - (PAW.x + PAW.w / 2) * s;
  const ty = size / 2 - (PAW.y + PAW.h / 2) * s;
  // Stroke in paw units: thick when small so the outline survives 16px.
  const stroke = detail ? 4.4 : 6;
  // Small mark only: push each bean further from the pad (gap only grows, so the
  // "beans never touch the pad" rule holds) so they stay separate at 16px.
  const spread = detail ? 0 : 7;
  const spreadBean = (b) => {
    const dx = b.cx - 100;
    const dy = b.cy - 150;
    const len = Math.hypot(dx, dy);
    return { ...b, cx: b.cx + (dx / len) * spread, cy: b.cy + (dy / len) * spread };
  };
  const bean = (raw) => {
    const b = spreadBean(raw);
    return `<ellipse cx="${b.cx.toFixed(2)}" cy="${b.cy.toFixed(2)}" rx="${b.rx}" ry="${b.ry}" transform="rotate(${b.rotate} ${b.cx.toFixed(2)} ${b.cy.toFixed(2)})"`;
  };

  const under = detail
    ? `<g transform="translate(0.9 1.5)" fill="${C.ink}" stroke="${C.ink}" stroke-width="${stroke + 2.4}" stroke-linejoin="round">${BEANS.map((b) => `${bean(b)}/>`).join("")}<path d="${PAD}"/></g>`
    : "";

  const beans = BEANS.map(
    (b) => `${bean(b)} fill="${C.ginger}" stroke="${C.ink}" stroke-width="${stroke}"/>`,
  ).join("");
  const pad = `<path d="${PAD}" fill="${C.ginger}" stroke="${C.ink}" stroke-width="${stroke}" stroke-linejoin="round"/>`;

  const face = detail
    ? [
        `<path d="M60,128 Q68,110 86,104" stroke="${C.glint}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.85"/>`,
        `<ellipse cx="86" cy="140" rx="5.5" ry="9" fill="${C.ink}"/>`,
        `<ellipse cx="114" cy="140" rx="5.5" ry="9" fill="${C.ink}"/>`,
        `<circle cx="87.5" cy="136" r="1.8" fill="${C.glint}"/>`,
        `<circle cx="115.5" cy="136" r="1.8" fill="${C.glint}"/>`,
        `<ellipse cx="70" cy="156" rx="7" ry="4" fill="${C.cheek}"/>`,
        `<ellipse cx="130" cy="156" rx="7" ry="4" fill="${C.cheek}"/>`,
        `<path d="M95,158 Q100,163 105,158" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
      ].join("")
    : // Simplified: eyes only, enlarged so they read at 16px.
      `<ellipse cx="85" cy="142" rx="8" ry="12" fill="${C.ink}"/><ellipse cx="115" cy="142" rx="8" ry="12" fill="${C.ink}"/>`;

  return `<g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)})">${under}${beans}${pad}${face}</g>`;
}

function iconSvg(size, { detail }) {
  const radius = detail ? Math.round(size * (40 / 180)) : size * 0.25;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${C.lilac}"/>${pawGroup({ size, fill: detail ? 0.74 : 0.84, detail })}</svg>`;
}

async function png(size, detail) {
  // Render the SVG at 4× and downsample for clean antialiasing.
  const svg = iconSvg(size * 4, { detail });
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
}

/** ICO container with PNG payloads (supported by every current browser and OS). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const appDir = path.join(ROOT, "src", "app");
const iconsDir = path.join(ROOT, "public", "icons");
fs.mkdirSync(iconsDir, { recursive: true });

fs.writeFileSync(path.join(appDir, "icon.svg"), iconSvg(64, { detail: false }));

const ico = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(size, false) })));
fs.writeFileSync(path.join(appDir, "favicon.ico"), buildIco(ico));

fs.writeFileSync(path.join(appDir, "apple-icon.png"), await png(180, true));
fs.writeFileSync(path.join(iconsDir, "icon-192.png"), await png(192, true));
fs.writeFileSync(path.join(iconsDir, "icon-512.png"), await png(512, true));

console.log("✓ Icons: src/app/{icon.svg,favicon.ico,apple-icon.png}, public/icons/icon-{192,512}.png");

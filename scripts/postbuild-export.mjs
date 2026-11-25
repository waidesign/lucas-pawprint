/**
 * Post-build fixes for the static export in out/ (runs automatically after `npm run build`).
 *
 * 1. Prefetch payload names. `next build` (output: "export") writes per-segment
 *    prefetch files as nested folders, e.g.
 *      out/work/luci/__next.work/$d$slug/__PAGE__.txt
 *    but the client router requests the dotted name
 *      /work/luci/__next.work.$d$slug.__PAGE__.txt
 *    Without a copy at the dotted name every prefetch 404s and links fall back to full
 *    page loads. We add a flat copy next to each nested file (the originals stay).
 *
 * 2. /lab is development-only (src/app/lab/page.tsx). In export mode it would still be
 *    written as a 200 page, so it is removed unless NEXT_PUBLIC_ENABLE_LAB=true.
 */
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");

if (!fs.existsSync(OUT_DIR)) {
  console.log("postbuild-export: no out/ folder (not a static export build), skipping.");
  process.exit(0);
}

/** Every file below a `__next.*` folder, returned with its path parts below that folder. */
function collectSegmentFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      const walk = (d, parts) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const p = path.join(d, e.name);
          if (e.isDirectory()) walk(p, [...parts, e.name]);
          else results.push({ parent: dir, root: entry.name, parts: [...parts, e.name], file: p });
        }
      };
      walk(full, []);
    } else if (entry.name !== "_next") {
      results.push(...collectSegmentFiles(full));
    }
  }
  return results;
}

let flattened = 0;
for (const { parent, root, parts, file } of collectSegmentFiles(OUT_DIR)) {
  const flatName = [root, ...parts].join(".");
  const target = path.join(parent, flatName);
  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    flattened++;
  }
}

let labRemoved = false;
if (process.env.NEXT_PUBLIC_ENABLE_LAB !== "true") {
  for (const p of ["lab.html", "lab.txt", "lab"]) {
    const target = path.join(OUT_DIR, p);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
      labRemoved = true;
    }
  }
}

console.log(
  `✓ postbuild-export: ${flattened} prefetch payload aliases written${labRemoved ? ", /lab removed from export" : ""}`,
);

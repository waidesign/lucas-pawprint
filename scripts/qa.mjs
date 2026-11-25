/**
 * Visual + accessibility QA runner (Playwright + @axe-core/playwright).
 *
 * Usage:
 *   npm run qa
 *   node scripts/qa.mjs --routes=/work/luci,/work/classic-decoder --themes=light,warm-dark --widths=375,1440 --out=tmp/qa
 *
 * Optional flags / env vars:
 *   --routes / QA_ROUTES   Comma-separated routes (default: /work, 7 case studies, /about, /contact, /colophon)
 *   --themes / QA_THEMES   Comma-separated themes (default: light,warm-dark)
 *   --widths / QA_WIDTHS   Comma-separated viewport widths (default: 375,1440)
 *   --out    / QA_OUT_DIR  Directory to save screenshots (omit or set --no-screenshots to skip saving PNGs)
 *   --crop   / QA_CROP     Optional CSS selector to also save an element crop PNG
 *   --port   / QA_PORT     Local port for the `wrangler dev` preview of out/ (default: 3010); reused if already listening. Run `npm run build` first.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { spawn, spawnSync } from "node:child_process";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;

function getArg(name) {
  const prefix = `--${name}=`;
  const hit = process.argv.find((a) => a.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : undefined;
}

const DEFAULT_ROUTES = [
  "/",
  "/work",
  "/work/luci",
  "/work/classic-decoder",
  "/work/classic-decoder-app",
  "/work/vehicle-databases",
  "/work/detailed-vehicle-history",
  "/work/fierce-fight-gear",
  "/work/sarayah-phuket-villas",
  "/about",
  "/contact",
  "/colophon",
];

const PORT = getArg("port") || process.env.QA_PORT || "3010";
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = (
  getArg("routes") ||
  process.env.QA_ROUTES ||
  DEFAULT_ROUTES.join(",")
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const THEMES = (getArg("themes") || process.env.QA_THEMES || "light,warm-dark")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const WIDTHS = (getArg("widths") || process.env.QA_WIDTHS || "375,1440")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => Number.isFinite(n) && n > 0);
const OUT_DIR = getArg("out") || process.env.QA_OUT_DIR || "";
const SKIP_SCREENSHOTS = process.argv.includes("--no-screenshots") || !OUT_DIR;
const CROP_SELECTOR = getArg("crop") || process.env.QA_CROP || "";
const VIEW_TIMEOUT_MS = 60_000;

if (!SKIP_SCREENSHOTS) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function isServerListening() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch(`${BASE}/`, { signal: controller.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function waitForReady() {
  for (let i = 0; i < 160; i++) {
    if (await isServerListening()) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Preview server on port ${PORT} did not become ready in time`);
}

function withTimeout(promise, ms, label) {
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Timed out after ${ms}ms on ${label}`)),
      ms,
    );
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

let server = null;
let hasFailures = false;

try {
  const alreadyRunning = await isServerListening();
  if (!alreadyRunning) {
    // The site is a static export (out/), so QA runs it on the same runtime as production:
    // Cloudflare Workers static assets via `wrangler dev` (run `npm run build` first).
    const wranglerBin = path.join(
      path.dirname(require.resolve("wrangler/package.json")),
      "bin",
      "wrangler.js",
    );
    server = spawn(
      process.execPath,
      [wranglerBin, "dev", "--port", PORT, "--ip", "127.0.0.1"],
      { stdio: "ignore", windowsHide: true },
    );
    await waitForReady();
  }

  const browser = await chromium.launch({ headless: true });
  const summary = [];

  try {
    for (const route of ROUTES) {
      const safeRoute =
        route === "/"
          ? "home"
          : route.replace(/^\/+/, "").replace(/[^a-z0-9-_]+/gi, "-");

      for (const theme of THEMES) {
        for (const width of WIDTHS) {
          const height = width < 768 ? 812 : 900;
          const viewLabel = `${route} [${theme} @ ${width}px]`;
          let context = null;

          try {
            const result = await withTimeout(
              (async () => {
                context = await browser.newContext({
                  viewport: { width, height },
                });
                await context.addInitScript((t) => {
                  try {
                    window.localStorage.setItem("theme", t);
                  } catch {
                    // ignore storage errors
                  }
                }, theme);

                const page = await context.newPage();
                page.setDefaultTimeout(30_000);
                page.setDefaultNavigationTimeout(30_000);

                await page.goto(`${BASE}${route}`, {
                  waitUntil: "load",
                  timeout: 30_000,
                });
                await page.waitForTimeout(400);
                await page.evaluate((t) => {
                  document.documentElement.setAttribute("data-theme", t);
                }, theme);

                // Scroll through page so viewport reveals settle, then return to top.
                const totalHeight = await page.evaluate(
                  () => document.body.scrollHeight,
                );
                for (let y = 0; y <= totalHeight; y += 500) {
                  await page.evaluate((pos) => window.scrollTo(0, pos), y);
                  await page.waitForTimeout(40);
                }
                await page.evaluate(() => window.scrollTo(0, 0));
                await page.waitForTimeout(800);

                const axe = await new AxeBuilder({ page }).analyze();
                const horizOverflow = await page.evaluate(
                  () =>
                    document.documentElement.scrollWidth -
                    document.documentElement.clientWidth,
                );

                let screenshot = null;
                let cropScreenshot = null;
                if (!SKIP_SCREENSHOTS) {
                  screenshot = path.join(
                    OUT_DIR,
                    `${safeRoute}-${theme}-${width}.png`,
                  );
                  await page.screenshot({ path: screenshot, fullPage: true });

                  if (CROP_SELECTOR) {
                    const loc = page.locator(CROP_SELECTOR).first();
                    if ((await loc.count()) > 0) {
                      cropScreenshot = path.join(
                        OUT_DIR,
                        `${safeRoute}-${theme}-${width}-crop.png`,
                      );
                      await loc.scrollIntoViewIfNeeded();
                      await page.waitForTimeout(200);
                      await loc.screenshot({ path: cropScreenshot });
                    }
                  }
                }

                return {
                  route,
                  theme,
                  width,
                  horizOverflow,
                  violations: axe.violations.length,
                  violationDetails: axe.violations.map((v) => ({
                    id: v.id,
                    impact: v.impact,
                    nodes: v.nodes.length,
                    help: v.help,
                    samples: v.nodes.slice(0, 3).map((n) => ({
                      target: n.target,
                      summary: n.failureSummary,
                    })),
                  })),
                  ...(screenshot ? { screenshot } : {}),
                  ...(cropScreenshot ? { cropScreenshot } : {}),
                };
              })(),
              VIEW_TIMEOUT_MS,
              viewLabel,
            );

            if (result.violations > 0) {
              hasFailures = true;
            }
            summary.push(result);
          } catch (err) {
            hasFailures = true;
            summary.push({
              route,
              theme,
              width,
              error: err instanceof Error ? err.message : String(err),
            });
          } finally {
            if (context) {
              await context.close().catch(() => {});
            }
          }
        }
      }
    }
  } finally {
    await browser.close();
  }

  console.log(JSON.stringify(summary, null, 2));
} finally {
  if (server && server.pid) {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], {
        stdio: "ignore",
      });
    } else {
      server.kill("SIGTERM");
    }
  }
}

if (hasFailures) {
  process.exitCode = 1;
}

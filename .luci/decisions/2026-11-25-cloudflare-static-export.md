# Deploy: static export on Cloudflare Workers static assets

**Date:** 2026-11-25 · **Decided by:** Lucas (go-ahead to deploy; follows `docs/pawprint-kit/04-build/DEPLOY-CLOUDFLARE.md`)

## Setup
- `next.config.ts`: `output: "export"`, `trailingSlash: false`, `images.unoptimized`. `cacheComponents` and `partialPrefetching` were **removed**: they enable PPR, which Next refuses in export mode, and nothing used `"use cache"`.
- `wrangler.jsonc` (Worker `lucas-pawprint`): assets only from `./out`, `not_found_handling: "404-page"`, `html_handling: "auto-trailing-slash"`. `wrangler` is a devDependency; `npm run cf:preview` / `npm run cf:deploy`.
- `public/_headers`: security headers + CSP on `/*`; `Cache-Control` only on asset paths (Cloudflare merges duplicate header values across matching rules, so HTML keeps the platform default `max-age=0, must-revalidate`). `/_next/static/*` is 1 year immutable. No `upgrade-insecure-requests` (Cloudflare forces HTTPS; it broke the http local preview).
- `scripts/postbuild-export.mjs` (npm `postbuild`): (1) writes dotted aliases for Next's per-segment prefetch files (export writes `__next.work/$d$slug/__PAGE__.txt`, the client requests `__next.work.$d$slug.__PAGE__.txt`; without them every prefetch 404s); (2) removes `/lab` from `out/` unless `NEXT_PUBLIC_ENABLE_LAB=true`.
- SEO: `src/app/sitemap.ts`, `src/app/robots.ts` (force-static), `metadataBase` + default Open Graph/Twitter in the root layout, Home canonical, site-wide share image `public/og/site.png` (generated in `scripts/optimize-images.mjs`) for Home, Work, About, Contact, Colophon.
- `scripts/qa.mjs` now runs against `wrangler dev` (serving `out/`) instead of `next start`, and includes `/`.

## Verified (local wrangler dev, 2026-11-25)
All 12 routes 200; `/motion`, `/lab`, unknown URLs → 404 page; resume and OG images served; headers applied. `npm run qa`: 48 runs (12 routes × light/warm-dark × 375/1440), 0 axe violations, no horizontal overflow (Home's one contrast hit was a mid-fade frame; 0 once settled).

## Known, not blocking
- `/rive/loaffy.riv` doesn't exist yet → one HEAD 404 per page (Loaffy stays SVG until the file is added).
- npm `allowScripts` blocked esbuild/workerd postinstall; `wrangler dev`/`deploy` work regardless.

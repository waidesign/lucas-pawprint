# Deploy & Domain · Cloudflare (pawprint.design umbrella)

> Goal: `https://lucas.pawprint.design` served by Cloudflare, next to `luci.pawprint.design`, with preview URLs per branch, and `lucas@pawprint.design` forwarding to Gmail.
> Do this in **Phase 9** (launch). Steps marked 🧑 are for Lucas in a browser; 🤖 are for the coding agent.

## 1. Why a static export on Workers

The portfolio is content-only: pages, MDX case studies, images, client-side motion. No server, database or forms are needed (contact = copy email, mailto and cal.com). So the simplest, fastest and cheapest setup is:

**`next build` with `output: "export"` → static files in `out/` → served by Cloudflare Workers static assets.**

- No adapter to break when Next.js updates.
- Free tier, global CDN, instant rollbacks, preview URL per branch (Workers Builds).
- If a server feature is ever needed (e.g. a contact form API or on-demand OG images), move to Cloudflare's Next.js adapter (vinext, currently beta) or OpenNext. Not needed now.

> If `luci.pawprint.design` already uses Cloudflare **Pages** instead of Workers, it's fine to mirror that: Pages also serves the `out/` folder. Keep both projects on the same product so you manage them in one place.

## 2. 🤖 Make the app export-ready

Prompt for the agent (part of Phase 9):
```
Make the site deployable as a static export on Cloudflare Workers static assets.
1. next.config.ts: output: "export", trailingSlash: false, images: { unoptimized: true }. Run `npm run build`.
   If cacheComponents or partialPrefetching conflict with output: "export", turn them off (the site is fully static) and tell me.
2. Pre-optimise images at build: a script (sharp) that writes AVIF + WebP next to each source image in public/ and src/content/; components use <picture> or next/image with unoptimized + explicit width/height.
3. OG images: keep opengraph-image.tsx only if it renders at build time in export mode; otherwise generate PNGs in a prebuild script into public/og/<slug>.png and reference them in metadata.
4. Add wrangler.jsonc:
   {
     "name": "lucas-pawprint",
     "compatibility_date": "2026-11-01",
     "assets": { "directory": "./out", "not_found_handling": "404-page", "html_handling": "auto-trailing-slash" }
   }
5. Add devDependency wrangler and scripts:
   "cf:preview": "npm run build && wrangler dev",
   "cf:deploy":  "npm run build && wrangler deploy"
6. Add public/_headers (it is copied into out/ and read by Workers static assets): cache /_next/static/* and fonts for 1 year immutable, HTML no-cache, plus security headers (CSP allowing Rive's wasm, Cloudflare Web Analytics and links to cal.com; X-Content-Type-Options; Referrer-Policy; Permissions-Policy).
7. Run `npm run cf:preview` and confirm every route in IA.md §1, the 404 page and /resume.pdf load.
```

## 3. 🧑 Connect GitHub → Cloudflare (preview deploys per branch)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → GitHub → `waidesign/lucas-pawprint`.
2. Build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/`
   - Environment variable: `NODE_VERSION` = the Node LTS you use locally.
3. Enable **builds for non-production branches**. Every branch/PR now gets its own preview URL (`<branch>-lucas-pawprint.<account>.workers.dev`). Production = `main`.
4. Push to `main` → first production deploy on `lucas-pawprint.<account>.workers.dev`.

## 4. 🧑 Custom domain

1. Open the Worker `lucas-pawprint` → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → `lucas.pawprint.design`.
2. Because `pawprint.design` is already on Cloudflare DNS, the record and certificate are created automatically (a few minutes).
3. Check: `https://lucas.pawprint.design` loads, padlock is valid, `http://` redirects to `https://`.
4. Turn on **Cloudflare Web Analytics** for the site (cookieless, no banner needed).

## 5. 🧑 Email: lucas@pawprint.design → Gmail

**Receive (Cloudflare Email Routing)**
1. Cloudflare → `pawprint.design` zone → **Email** → **Email Routing** → enable (if Luci already set it up, skip to step 3). Cloudflare adds the MX and SPF records for you.
2. **Destination addresses** → add `waiphyoaung.design@gmail.com` → click the verification link Cloudflare emails you.
3. **Routing rules** → **Create address** → custom address `lucas` → action **Send to an email** → destination `waiphyoaung.design@gmail.com` → Save.
4. Test: send an email to `lucas@pawprint.design` from another account.

**Send as lucas@ from Gmail (optional, recommended for replies)**
1. Google Account → Security → 2-Step Verification on → **App passwords** → create one for "Mail".
2. Gmail → Settings → **Accounts and Import** → **Send mail as** → Add `Lucas (Wai Phyo Aung)` / `lucas@pawprint.design` → SMTP server `smtp.gmail.com`, port 587, username = your Gmail address, password = the app password, TLS.
3. Confirm with the code Gmail sends to lucas@ (it arrives through the forward).
4. DNS deliverability: edit the existing SPF TXT record on `pawprint.design` so there is **only one** SPF record: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`. Add a DMARC record if you don't have one: `_dmarc` TXT `v=DMARC1; p=none; rua=mailto:lucas@pawprint.design`.

## 6. 🧑 Retire the old site

In the **old** repo (`waidesign/lucas-portfolio`, still on Vercel), replace the app with a single `vercel.json` and push:
```json
{ "redirects": [ { "source": "/(.*)", "destination": "https://lucas.pawprint.design/$1", "permanent": true } ] }
```
Then update links everywhere: LinkedIn (Contact info + Featured), Behance profile, GitHub profile README, CV, email signature, job applications in progress.

## 7. Launch checklist

- [ ] `lucas.pawprint.design` live with HTTPS; preview URLs work per branch
- [ ] Canonical / OG / sitemap all use `https://lucas.pawprint.design`
- [ ] Old domain 301s to the new one (check 3 random paths)
- [ ] `lucas@pawprint.design` receives; Gmail can send as it
- [ ] Cloudflare Web Analytics receiving data
- [ ] Lighthouse budgets met on the production URL (TECH-STACK.md §4)

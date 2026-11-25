# Home-style case-study template & real media pipeline

- Date: 2026-11-25
- Status: accepted

## What
Rebuilt `/work/[slug]` (`src/components/case/`) onto one shared template matching Home's visual language, hierarchy, and section rhythm, then rebuilt `/work/luci` as the open-source reference case and migrated all six client case studies onto it with real live-site screenshots, WebM interaction loops, and sharp-generated covers (`scripts/build-covers.mjs`).

Key architectural changes:
- **Hero & Overview**: Replaced the sticky top breadcrumb + stepper bar with an inline breadcrumb inside `CaseHero`, meta line with generic `Badge` (replaces `BetaBadge`, no decorative dots), `display-xl` `h1` with one highlighted word, Home-style pill CTAs, and a full-width tilted cover stage (`rounded-2xl`, 2px pen border, `shadow-sticker`; Loaffy peek disabled on Luci per Rule 11). Followed by plain `"At a glance."` (`MetaRow` + 3-column `IndexColumns` TL;DR with large numerals).
- **Alternating wavy chapters**: `Chapter` alternates `bg` and `<caseTone>-soft` bands joined by Home's `<SectionSeam>` waves, led by ProcessStory-style display numerals (`01.`–`04.`), a quiet mono step label (dropping the mono pill), an `h2` at `h1` token with one highlighted word, and a `body-lg` intro.
- **Floating chapter pill**: `CaseStepper` floats top-center on `lg+` once `[data-case-hero]` leaves view, hides over `[data-case-closing]`, and reveals on `focus-within` for keyboard users.
- **New Rule-18 MDX components**: `FeatureRow`, `DecisionList` (replaces `DecisionCard`), `Showcase` (single frame or 2–3 frame lightbox gallery), `BrowserFrame`, `LoopVideo` (IntersectionObserver play-in-view, 48×48 pause/play, reduced-motion poster, optional `start` offset), `PainList`, `InsightList`, generic `Outcome`, `Learnings`, and `CaseCTA`.
- **Luci open source & client media**: Removed all private-beta/teaser infrastructure (`LaunchOnly`, `BuildTimeline`, `BetaBadge`, teaser OG). Captured real live-site screenshots & recordings via Playwright, built 1200×750 diagonal flat-frame covers with `scripts/build-covers.mjs`, refreshed copy from the old portfolio minus every unverified metric, and expanded `vehicle-databases` to cover both Part A (full public website redesign) and Part B (member dashboard pricing & checkout).

## Why
Lucas noted that the previous `/work/[slug]` pages felt disconnected from Home's layout, hierarchy, and craft, and that dark legacy mockup thumbnails and unverified numbers diluted trust. Unifying case studies onto Home's wavy bands, ProcessStory numerals, CaseCard-style feature rows, and real live-site recordings makes every route feel like one coherent product.

## Consequences
- Every case study (including Luci) renders through the exact same `CaseLayout` shell.
- `scripts/optimize-images.mjs` no longer re-stages legacy dark `screen-1..3` assets and generates one `public/og/luci.png` ("Luci · open source").
- `CaseCard` row variant now renders spaces cleanly between title words (`<Fragment>` fix).
- All 7 case studies carry zero unverified percentage/sales claims and zero private-beta references.

## Alternatives considered
- **Keep Luci on a bespoke one-off layout (`LuciHero` + custom sections):** Rejected because it caused Luci and client cases to diverge visually and prevented Luci from serving as the reference template for the portfolio.
- **Keep the sticky top breadcrumb + full-width stepper bar:** Rejected because it added visual chrome at the top of the viewport that Home never uses and crowded the hero.
- **Use raw `<video controls>` (`Clip`) without IntersectionObserver or `start` seeking:** Rejected because native video controls break visual consistency, autoplay under reduced motion, or flash initial page-load frames on loop.

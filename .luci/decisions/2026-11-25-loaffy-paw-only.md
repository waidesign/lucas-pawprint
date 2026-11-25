# Loaffy is always a cat paw (object shape-shifts removed)

**Date:** 2026-11-25 · **Decided by:** Lucas

## Decision
Loaffy no longer shape-shifts into objects. The five object forms are removed from the site and the code: `window`, `phone`, `cube`, `play`, `bubble`. Loaffy stays unique as its own cat-paw illustration.

Kept (all of them are the paw): `paw` (default, every pose and mood), `paw-3d` (shaded inside one outline, intro finale), `lost` (scattered beans + "?", 404 only).

## What changed
- `Form` type (`LoaffyBus.ts`) = `"paw" | "paw-3d" | "lost"`. `FORM_TO_RIVE` keeps the original Rive numbers (0, 1, 7).
- `LoaffySVG` / `parts` / `clearance`: removed object bodies, paths, small-bean layout, cube eyes and object mouths.
- Case studies: the `form` frontmatter field is removed from the schema and all MDX (incl. `_template.mdx`); `CaseCard`, `CaseHero`, `NextCase`, `SelectedWork`, `WorkIndex` no longer pass it. OG images (`scripts/optimize-images.mjs`) all use `forms/paw-3d.svg`.
- Replacements: /work hero → curious paw; /contact hero → happy paw; ContactPanel + CaseCTA → winking paw; Process "Design" step → thinking paw (no button squash); Hero → Work scroll keeps the downward gaze + land, without the paw → window morph; intro beats "Web & products" → side-eye, "Design systems" → chill-lean; VideoReel play button → plain Play icon (`loaffyButton` prop removed).
- `/lab`: "Shape-Shift Forms (7)" → "Paw Styles (2)"; stage switcher lists the 3 paw styles.
- Deleted `public/loaffy/forms/{window,phone,cube,play,bubble}.svg`.

## Kit docs to update when Lucas approves (not edited: `docs/pawprint-kit/` is read-only for agents)
`01-brand/LOAFFY.md` and `LOAFFY-ANIMATION.md` (forms section, §6.2 Hero→Work morph, §6.4 Design step, §4.16 morph), `02-design-system/COMPONENTS.md`, `03-ux/IA.md` (case `form` field), `03-ux/CASE-LUCI.md`, `04-build/*` mentions, `README.md`, and the reference copies in `05-assets/loaffy/forms/`. The Rive file (when made) needs only the paw, paw-3d and lost states.

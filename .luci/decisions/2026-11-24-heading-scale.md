# One heading scale for every page

- Date: 2026-11-24
- Status: accepted

## What
Each heading level renders at exactly one size on every page, current and future: `h1` → display-xl (64→160px), `h2` → h1 token (40→64px), `h3` → h2 token (32→48px), `h4` → h3 token (24→32px). The scale lives in `HEADING_SCALE` / `HEADING_SCALE_CLASSES` (`src/components/ui/Heading.tsx`). `<Heading as="…">` picks the size from the tag. Hand-written tags (`mdx-components.tsx`, case components, cards) use `HEADING_SCALE_CLASSES`. A `size` override is only for `/lab` demos.

## Why
Lucas flagged that h2s on the homepage used different sizes: 160px for "Work." and "Motion.", 64px for the other sections. Case study titles (h3) were also bigger than most h2s, and case pages used yet another scale (96px h1, 48px MDX h2, 12px mono-label h3s). He chose 64 / 48 / 32 under a 160px h1 and asked for it to apply to all pages going forward.

## Consequences
- The "giant word per section" (display-xl "Work." / "Motion.") is gone. display-xl is now the page h1 only, so `/work` keeps a 160px "Work." because it is that page's h1.
- Small mono-label headings ("Who it's for", "Jobs", "Learnings", "Five principles") are now real 48px h3s.
- If a title doesn't fit at its level's size, change the layout, not the size. For example, the generic case header now gives the h1 its own full-width row.
- `ContactPanel`'s `compact` prop (a smaller h2) was removed.

## Alternatives considered
- 96 / 48 / 32 (h2 = display 96px): louder, but sentence-length section titles wrap a lot.
- 64 / 32 / 24 (token names literally): too little contrast between h3 and body text, and case titles shrink too far.

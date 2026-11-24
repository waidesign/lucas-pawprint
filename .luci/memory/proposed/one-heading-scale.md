# Proposed Rule · One heading scale, every page

- **Rule:** Each heading level has exactly one size on every page: `h1` → `text-display-xl` (160px), `h2` → `text-h1` (64px), `h3` → `text-h2` (48px), `h4` → `text-h3` (32px). Pick the semantic tag; the size follows (`<Heading as="…">` without `size`, or `HEADING_SCALE_CLASSES` from `src/components/ui/Heading.tsx`). Never size a heading by hand. If a title doesn't fit, change the layout, not the size.
- **Source:** Lucas, 2026-11-24 ("set this as rule/decisions for all other upcoming pages too"). Already added as AGENTS.md / CLAUDE.md hard rule 17. Decision: `.luci/decisions/2026-11-24-heading-scale.md`.
- **Suggested home:** `.luci/rules.md`, next to the AGENTS.md hard rules. Rules 15 and 16 (no availability badges, no badge dots) are also not merged there yet.

# Rule 18: Cards are the exception, not the layout

- Date: 2026-11-24
- Status: accepted

## What
Stop using `<Card>` (filled boxes with a 2px pen border and sticker shadow) as the default container across non-Home routes (`/work`, `/work/[slug]`, `/motion`, `/about`, `/contact`, `/colophon`, 404). Replace text-only cards with type, spacing, 1px hairlines, and the layout kit (`RuledList`, `IndexColumns`, `MetaRow`, `PullQuote`, `Callout` margin note, and tinted `<Section soft>` bands). Keep `<Card>` and framed containers only when a box passes the rule test: clickable whole, media/live-demo frame, or the single standout panel of a section.

## Why
Overusing cards across every list, stat, decision row, and bio block created repetitive visual boxing and nested borders that crowded the typography and weakened emphasis. Reserving boxes for clickable wholes, framed media, and one focal panel restores hierarchy and calm whitespace.

## Alternatives considered
- Keep existing card grids and soften shadows: still leaves redundant borders and nested boxes on text content.
- Remove cards everywhere including Home: rejected by the Home guard; Home keeps its current layout until redesigned intentionally.

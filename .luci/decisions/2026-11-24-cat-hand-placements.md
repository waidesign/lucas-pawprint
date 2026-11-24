# Cat hand placements and the one-character stage check

- Date: 2026-11-24
- Status: accepted

## What
The cat hand (`<CatHand>`) appears in five places, each triggered by scroll or by the visitor, never as an ambient loop:
1. Home · Process "Shape" step: `<HandSketch>` (the paw rises, its claws draw the wireframe, then it leaves). Scrubbed by the pinned scroll on ≥ lg (§6.4 20–45%); otherwise plays once when the step opens.
2. Home · About changelog board (xl): the paw rises from the canvas's bottom edge and pats each new sticky note once the camera centres it, then leaves.
3. Home and /work · case rows: the paw peeks over the "Read case study" button and bats it on hover or keyboard focus (`<PeekingHand>`). Loaffy's form peek now shows on hovering the **cover** only (it used to be the whole row), so the two never share the screen.
4. Case studies · `DecisionCard`: the bean side hangs over the top edge of the first Key decision that reaches the middle of the screen, once per page, then leaves.
5. /about · How I work: the Shape card sketches the flow once in view.

A small registry (`src/components/mascot/stage.ts`) enforces "one character on screen at a time": every visible `<Loaffy>` (and `LoaffyWorkspace`) reports while it intersects the viewport, and `<PeekingHand>` and the board pats wait while any Loaffy is on screen. `<Loaffy onStage={false}>` marks a mounted-but-hidden Loaffy (the case-row peek at rest).

## Why
Lucas asked to use the hand meaningfully across the site without overusing it. LOAFFY.md §7 lists its uses (tapping a CTA, hanging over a card edge, batting at the scroll cue, sketching in the process story); each placement maps to one of them.

## Not used (on purpose)
- Hero scroll cue: the headline Loaffy is always on screen there.
- ProofStrip, MotionReel, ContactPanel, footer, Toast, 404, KindWords: Loaffy is nearby, or it would be one moment too many.

## Alternatives considered
- Manual placement only (no stage check): relies on layout never changing; easy to break silently.
- Hand on every DecisionCard: repetitive on long case studies; once per page is enough.

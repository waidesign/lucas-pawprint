# No card overuse (Rule 18)

- What happened: Non-Home pages accumulated nested `<Card>` grids around plain text sections (TL;DR stickers, decision blocks, principle lists, info cards), flattening visual hierarchy.
- Proposed: Enforce AGENTS.md Rule 18 ("Cards are the exception, not the layout"): only box clickable wholes, media/live-demo frames, or one standout panel per section; default to `RuledList`, `IndexColumns`, `MetaRow` spec row, `PullQuote`, `Callout` margin note, and `<Section soft>` bands. Include the rule-test check in Definition of done.
- Belongs in: rules.md

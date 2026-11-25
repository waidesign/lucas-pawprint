# Proposed Rule · Numerals only for steps

- **Rule:** Use leading-zero numerals (01, 02, 03…) only in two cases:
  - **Order matters:** the reader follows steps in sequence, such as a process, a how-to or a loop.
  - **Reference IDs:** markers that point into an image or code panel.
- **No numerals on parallel items:** problems, features, decisions, principles, findings, learnings, FAQs, checklists and TL;DR parts. A title, eyebrow or Chip labels them instead.
- **Number once:** never number something that is already numbered elsewhere. Case chapters are numbered once, in `CaseStepper`.
- **Lists:** `ol` only for numbered sequences; parallel lists use `ul`.
- **Source:** Lucas, 2026-11-25: "we are over using leading zeros… Using them for meaningful purpose only necessary is acceptable", then "numbers usage for Steps are fine and acceptable. But not everywhere."
- **Details:** `docs/pawprint-kit/02-design-system/COMPONENTS.md` → "Numerals"; `.luci/decisions/2026-11-25-meaningful-numerals.md`.
- **Status:** Approved by Lucas on 2026-11-25. Added as AGENTS.md / CLAUDE.md §4 rule 19 and to `.luci/rules.md`.

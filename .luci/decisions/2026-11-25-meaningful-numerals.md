# Numerals only where order matters

**Date:** 2026-11-25 · **Decided by:** Lucas ("numbers usage for Steps are fine and acceptable. But not everywhere.")

## Decision
Leading-zero numerals (01, 02, 03…) appear only when:
- **order matters**, meaning the reader follows steps in sequence, or
- the number is a **reference ID** pointing at something (an annotation marker).

Parallel items get no number; their title, eyebrow or Chip labels them. Never number something already numbered elsewhere.

## Removed
- `Chapter`: the big "01."–"04." before the step label. `CaseStepper` already numbers the chapters.
- `TLDR`: 01–03 over Problem · What I did · Outcome. The Chips are the labels.
- `LuciProblems` 01–04 (now `ul`).
- `FeatureRow`: the `number` prop is deleted and stripped from every case MDX and `_template.mdx`.
- `DecisionList`: auto 01… (now `ul`).
- `PainList`, `InsightList`, `Learnings`: auto beans. Their `tone` props are deleted too (they only coloured the beans) and stripped from the MDX.
- Luci `PrincipleCards`: beans 01–05.
- About "How I work": 01–03.
- Contact: the "What helps in a first message" 01–04 and the Quick answers 01.–03.
- Home FAQ: 01.–0n.
- `RuledList`: when a row has no marker, the marker column collapses (title 5 / body 7).

## Kept (real steps or reference IDs)
- `CaseStepper` 1–4.
- Home `ProcessStory` 01–04.
- Home MotionCraft "How I make it" 01–04.
- `LuciWorkflow` Show → Direct → Check → Remember.
- `AnnotatedExport` marker beans 1–4.
- `/lab` card decision test (questions asked in order).

## Kit docs updated (Lucas approved)
- `02-design-system/COMPONENTS.md`: RuledList, IndexColumns, a new "Numerals" section, and the TLDR/Chapter/FeatureRow/DecisionList/PainList/InsightList/Learnings rows.
- `DESIGN.md` and root `design.md`: the IndexColumns row.
- `03-ux/IA.md`, `03-ux/CASE-LUCI.md`.
- `04-build/LAYOUT-STEPS.md`, `04-build/LUCI-BUILD-STEPS.md`.

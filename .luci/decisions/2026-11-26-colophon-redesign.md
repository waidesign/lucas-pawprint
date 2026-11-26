# Colophon rebuilt in the Home/About page style, and added to the header menu

- Date: 2026-11-26
- Status: accepted

## What
`/colophon` now uses the same page pattern as About and Contact: `Section` bands with wavy `SectionSeam`s, one highlighted word per heading and a `HeroReveal` hero. Its sections are: at a glance, portfolio as a product, colour, type, space/corners/shadows, motion, Loaffy, components and how it ships. Each design-system part is a small live specimen in `src/components/colophon/` (`ColourSpecimen`, `TypeSpecimen`, `SpaceShapeSpecimen`, `MotionSpecimen`, `LoaffyPicker`, `ComponentSpecimen`). Colophon is the fourth header-menu item (`04 · How it's built`), and the Home hero's "Off the grid" button links to it.

## Why
The old page reused the case-study shell (breadcrumb, `CaseStepper`, `MetaRow`, `TLDR`, `Chapter`) and embedded the `/lab` panels. That broke:
- rule 18: cards inside chapters, several card groups per section;
- rule 11: the Loaffy gallery showed many characters at once;
- rule 17: `h3` headings at the `text-h3` size.
It also didn't look like the rest of the site. The new page has one card group per section, only around specimens and demos, and the picker shows one Loaffy at a time.

## Alternatives considered
- Keep embedding the `/lab` sections: they are dev galleries with their own cards, numbering and headings, and they can't follow rules 11/17/18 without breaking `/lab`.
- Splitting the component into heading-level variants: more code to keep `/lab` identical. Instead, the token data moved to `src/components/colophon/foundations-data.ts` and Loaffy's moods/poses to `src/components/mascot/catalog.ts`, both shared by `/lab` and `/colophon`. `/lab` itself is unchanged.

## Kit docs to update when Lucas approves
- `docs/pawprint-kit/03-ux/IA.md` §2: the nav table now has Colophon in the menu (Motion is parked). §3 Colophon template: the new section list.
- `docs/pawprint-kit/02-design-system/COMPONENTS.md`: the colophon specimens, if they should be documented.

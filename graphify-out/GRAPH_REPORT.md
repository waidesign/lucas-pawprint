# Graph Report - lucas.pawprint.design  (2026-11-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 155 nodes · 208 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2edf4f05`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 10 edges
3. `next` - 6 edges
4. `react` - 6 edges
5. `LabClient()` - 5 edges
6. `generateTokensCss()` - 5 edges
7. `ThemeProvider()` - 5 edges
8. `fluidClampFromArrow()` - 4 edges
9. `validateGridAndRules()` - 4 edges
10. `motion` - 4 edges

## Surprising Connections (you probably didn't know these)
- `LabPage()` --calls--> `LabClient()`  [EXTRACTED]
  src/app/lab/page.tsx → src/app/lab/LabClient.tsx
- `RootLayout()` --calls--> `ThemeProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/lib/theme.ts
- `LabClient()` --calls--> `FadeIn()`  [EXTRACTED]
  src/app/lab/LabClient.tsx → src/components/motion/FadeIn.tsx
- `LabClient()` --calls--> `useTheme()`  [EXTRACTED]
  src/app/lab/LabClient.tsx → src/lib/theme.ts

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (25): motion@^14.14.0, motion, CHARACTER_TOKENS, DURATION_TOKENS, EASING_TOKENS, LabClient(), PASTEL_TOKENS, RADIUS_TOKENS (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (21): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/react@^19 (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (17): nextConfig, withMDX, dependencies, gray-matter@^4.0.3, @mdx-js/loader@^3.1.1, @mdx-js/react@^3.1.1, next@16.4.6, @next/mdx@^16.4.6 (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (15): assertMultipleOf4(), BANNED_COLORS, DESIGN_MD_PATH, __dirname, __filename, fluidClampFromArrow(), generateTokensCss(), GOLDEN_CSS_PATH (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (13): bricolage, inter, metadata, RootLayout(), applyDomTheme(), ResolvedTheme, resolveThemePreference(), THEME_INIT_SCRIPT (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.20
Nodes (9): react@19.3.0, react, CASE_STUDIES_DIR, CaseStudyMetadata, CaseStudyModule, CaseStudySummary, getAllCaseStudies(), getCaseStudyBySlug() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (10): scripts, build, dev, lint, prebuild, predev, start, tokens (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (3): @rive-app/react-canvas@^4.41.0, @rive-app/react-canvas, RiveMascotProps

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 6` to `Community 0`, `Community 1`, `Community 5`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09359605911330049 - nodes in this community are weakly interconnected._
- **Why does `gray-matter` connect `Community 2` to `Community 1`, `Community 4`, `Community 6`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1225296442687747 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Community 2` to `Community 0`, `Community 1`, `Community 5`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
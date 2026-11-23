# Decision · Full-width header, sections, and footer with 80px horizontal padding

- **Date:** 2026-11-24
- **Status:** Approved by Lucas

## Decision
Remove outer container `max-width` (`--container-max`) across the site header (`SiteNav`), all page sections (`Section`, `Hero`, `ProofStrip`, `Chapter`, `TLDR`, `NextCase`, `LuciHero`, `CaseLayout`), and footer (`SiteFooter`). Maintain `80px` (`lg:px-20` / `var(--space-80)`) left and right padding on desktop (`px-4 md:px-10 lg:px-20` on mobile/tablet so 375px and 768px viewports remain responsive).

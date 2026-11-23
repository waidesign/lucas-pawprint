# Design System & Tokens (`design.md`)

> Single source of truth for design tokens. Run `npm run tokens` (automatically executed before `dev` and `build`) to compile these tokens into `src/styles/tokens.css` for Tailwind CSS v4 (`@theme`).
>
> **Supported formats in this file:**
> 1. **Markdown tables** (`| Token | Value | Description |` or `| Token | Light | Dark | Description |`)
> 2. **Bullet lists** (`- \`--token-name\`: \`value\``)
> 3. **Fenced `css` token blocks** (`--token-name: value;`)

---

## Colors

| Token | Light | Dark | Description |
| :--- | :--- | :--- | :--- |
| `--color-background` | `#FAF8F5` | `#0E0E10` | Page canvas background |
| `--color-surface` | `#FFFFFF` | `#16161A` | Elevated card / surface background |
| `--color-surface-muted` | `#F2EFE9` | `#1F1F24` | Secondary / subtle container fill |
| `--color-foreground` | `#141413` | `#F4F3EF` | Primary body & heading text |
| `--color-muted` | `#66645E` | `#9E9C95` | Secondary / supporting text |
| `--color-border` | `#E6E2D8` | `#2A2A30` | Hairline dividers and card borders |
| `--color-accent` | `#FF5A36` | `#FF6E4E` | Brand primary accent (Pawprint) |
| `--color-accent-foreground` | `#FFFFFF` | `#141413` | Text/icon on primary accent |

## Typography

| Token | Value | Description |
| :--- | :--- | :--- |
| `--font-sans` | `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif` | Primary UI & body typeface |
| `--font-display` | `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif` | Display / hero headings |
| `--font-mono` | `var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace` | Code, metadata & tags |

## Radius

| Token | Value | Description |
| :--- | :--- | :--- |
| `--radius-sm` | `0.375rem` | Small chips & badges |
| `--radius-md` | `0.75rem` | Buttons & inputs |
| `--radius-lg` | `1.25rem` | Case study cards & media frames |
| `--radius-xl` | `1.75rem` | Hero containers & bento panels |
| `--radius-full` | `9999px` | Pills & avatars |

## Shadows

| Token | Value | Description |
| :--- | :--- | :--- |
| `--shadow-subtle` | `0 1px 2px 0 rgb(20 20 19 / 0.04)` | Subtle resting card elevation |
| `--shadow-card` | `0 8px 24px -4px rgb(20 20 19 / 0.06), 0 2px 6px -1px rgb(20 20 19 / 0.04)` | Interactive case study card shadow |
| `--shadow-float` | `0 20px 40px -12px rgb(20 20 19 / 0.12)` | Floating nav / modal elevation |

## Motion & Easing

| Token | Value | Description |
| :--- | :--- | :--- |
| `--ease-spring` | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary UI entrance curve |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy interactive feedback |
| `--ease-in-out-smooth` | `cubic-bezier(0.65, 0, 0.35, 1)` | Layout & page transitions |

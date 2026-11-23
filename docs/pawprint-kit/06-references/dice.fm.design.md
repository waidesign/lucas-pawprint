---
name: home
scope: page
type: page
source: https://dice.fm/
captured: 2026-11-23
method: measured
---

## Typography
### Roles
| Role | Family | Size | Weight | Line height | Letter spacing | Color | Uses | Elements |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| heading-1 | Foggy, sans-serif | 6.625rem | 400 | 5.5rem | normal | #000000 | 4 | h1 |
| heading-2 | Favorit, Helvetica, Arial, sans-serif | 1.75rem | 350 | 2.125rem | normal | #000000 | 5 | h2 |
| heading-2-regular | Favorit, Helvetica, Arial, sans-serif | 1.75rem | 400 | 2.125rem | normal | #000000 | 3 | h5 |
| body-large | Favorit, Helvetica, Arial, sans-serif | 1.125rem | 350 | 1.375rem | normal | #000000 | 8 | p |
| heading-3 | Favorit, Helvetica, Arial, sans-serif | 1.125rem | 700 | 1.375rem | normal | #000000 | 1 | h2 |
| link | Favorit, Helvetica, Arial, sans-serif | 1rem | 400 | 1.25rem | normal | #000000 | 25 | a, button |
| link-2 | Favorit, Helvetica, Arial, sans-serif | 1rem | 350 | 1.5rem | normal | #000000 | 17 | a, span, button |
| body-large-2 | Favorit, Helvetica, Arial, sans-serif | 1rem | 700 | 1.25rem | normal | #000000 | 3 | summary |
| body | Favorit, Helvetica, Arial, sans-serif | 0.875rem | 400 | 1.0938rem | normal | #000000 | 54 | div |
| link-2 | Favorit, Helvetica, Arial, sans-serif | 0.75rem | 700 | 1rem | 0.72px | #ffffff | 6 | a |
| link-2-2 | Favorit, Helvetica, Arial, sans-serif | 0.75rem | 700 | 1rem | 0.72px | #ffffff | 1 | a |

### Families
| Family | Uses |
| --- | --- |
| Favorit, Helvetica, Arial, sans-serif | 123 |
| Foggy, sans-serif | 4 |

### Scale
| Size | Token | Uses |
| --- | --- | --- |
| 6.625rem |  | 4 |
| 1.75rem |  | 8 |
| 1.125rem |  | 9 |
| 1rem |  | 45 |
| 0.875rem |  | 54 |
| 0.75rem |  | 7 |

## Colors
### Roles
| Role | Value | Authored | Token | Uses | Properties |
| --- | --- | --- | --- | --- | --- |
| background | #000000 |  |  | 24 | background-color |
| background | #eeeeee |  |  | 18 | background-color |
| background | #ffffff |  |  | 5 | background-color |
| background | #d9d9d9 |  |  | 3 | background-color |
| background | #333333 |  |  | 2 | background-color |
| background | #f2f2f2 |  |  | 1 | background-color |
| text | #000000 | `currentcolor` |  | 122 | color, fill, stroke |
| text | #ffffff |  |  | 34 | color, fill, stroke |
| text | #595959 |  |  | 2 | color, fill |
| text | #00000080 |  |  | 1 | color |
| border | #333333 |  |  | 8 | border-bottom-color, border-left-color, border-right-color, border-top-color |
| border | #d9d9d9 |  |  | 1 | border-top-color |

### Tokens
| Token | Value | Uses |
| --- | --- | --- |
| `--blue` | #0000fe | 0 |
| `--blue-light` | #24afee | 0 |
| `--brand-green` | #4bfa94 | 0 |
| `--brand-yellow` | #f2ef1d | 0 |
| `--green` | #00d8af | 0 |
| `--lightest-gray` | #f9f9f9 | 0 |
| `--purple-light` | #a783ff | 0 |
| `--white-semi-transparent` | #ffffffa8 | 0 |

## Spacing
### Scale
| Value | Authored | Token | Uses |
| --- | --- | --- | --- |
| 0.0625rem |  |  | 11 |
| 0.125rem |  |  | 36 |
| 0.25rem |  |  | 18 |
| 0.5rem |  |  | 118 |
| 0.625rem |  |  | 6 |
| 0.75rem |  |  | 2 |
| 1rem |  |  | 25 |
| 1.25rem |  |  | 13 |
| 1.375rem |  |  | 10 |
| 1.5rem |  |  | 35 |
| 1.5625rem |  |  | 10 |
| 1.75rem |  |  | 1 |
| 1.875rem |  |  | 2 |
| 2rem | `var(--row-gap)` | `--row-gap` | 3 |
| 2.5rem |  |  | 2 |
| 2.625rem |  |  | 3 |
| 2.75rem |  |  | 1 |
| 3rem |  |  | 5 |
| 3.125rem |  |  | 6 |
| 3.75rem |  |  | 2 |
| 5rem |  |  | 1 |
| 5.4375rem |  |  | 8 |
| 5.5rem |  |  | 1 |
| 6.25rem |  |  | 1 |
| 7.5rem |  |  | 5 |
| 9.375rem |  |  | 2 |
| 100% | `100%` |  | 3 |

### Base unit
- 0.125rem: 91% of spacing uses are multiples of it.

### Outliers
| Value | Uses |
| --- | --- |
| 0.0625rem | 11 |
| 1.5625rem | 10 |
| 5.4375rem | 8 |

## Sections
- 9 sections on this page, in order. Each references the components defined below; leave out any section you do not need.

| # | Section | Selector | Layout & surface | Uses |
| --- | --- | --- | --- | --- |
| 1 | hero | `main > div:nth-of-type(1) > div` | display grid, column-gap 3rem, grid-template-columns 644px 644px (`1fr 1fr`) | – |
| 2 | section-2 | `main > div:nth-of-type(2)` | padding 9.375rem 0 | `link` (×18), `button` (×18) |
| 3 | navigation | `div > nav` | – | `navigation`, `link` (×6), `button-2` |
| 4 | section-3 | `section:nth-of-type(1)` | padding 3.75rem 0 5rem, background-color #000000 | `link-3` (×3) |
| 5 | section-4 | `section:nth-of-type(2)` | padding 7.5rem 0, background-color #ffffff | – |
| 6 | section-5 | `section:nth-of-type(3)` | padding 0 0 7.5rem, background-color #ffffff | `card` |
| 7 | section-6 | `section:nth-of-type(4)` | padding 0 0 7.5rem, background-color #ffffff | `card` |
| 8 | section-7 | `section:nth-of-type(5)` | padding 0 0 7.5rem, background-color #ffffff | `card` |
| 9 | footer | `footer` | padding 3.125rem, background-color #ffffff | `footer`, `link` (×7), `navigation` (×3), `link-2` (×11), `button-3`, `button-4` |

## Components
- 5 kinds of component on this page, each with its variants and the states its stylesheet rules give it. For a state done in JavaScript, capture that component on its own with Luci.

### navigation
- navigation · example: `div > nav` · 4 on the page, 1 variant

#### Anatomy
- container — nav (navigation): no styles of its own
- action — button: font-family Favorit, Helvetica, Arial, sans-serif, font-size 100%, font-weight 400, line-height 1.15rem (`1.15`), color #595959, align-items center, padding 0.75rem 1rem, width max-content, border-radius 100px, background-color #f2f2f2, cursor pointer
- link (×5) — a (link): font-family Favorit, Helvetica, Arial, sans-serif, font-size 1rem, font-weight 400, line-height 1.1875rem, color #000000, cursor pointer

#### Motion
- transition opacity 0.2s linear

#### Accessibility
| Check | Part | Measured | Result |
| --- | --- | --- | --- |
| Text contrast | action | 6.25:1, #595959 on #f2f2f2, normal text | AA (AAA needs 7:1) |
| Text contrast | link | 21:1, #000000 on #ffffff, normal text | AAA. Estimated: the background is an image, a gradient or see-through |

- Measured on this page against WCAG 2.2. Check again wherever the colors, sizes or focus styles differ.

#### Variants
| Variant | Uses | Differences from this one | Example |
| --- | --- | --- | --- |
| navigation | 4 | same styles | `div > nav` |

### link
- link · example: `li:nth-of-type(1) > a` · 45 on the page, 3 variants

#### Anatomy
- container — a (link): display block, cursor pointer
- label — text: font-family Favorit, Helvetica, Arial, sans-serif, font-size 1rem, font-weight 400, line-height 1.1875rem, color #000000

#### States
| State | Changes | Read from |
| --- | --- | --- |
| focus-visible | outline #000000 none 3px → currentcolor solid 2px; outline-offset 0px → 2px | stylesheet rules |

#### Accessibility
| Check | Part | Measured | Result |
| --- | --- | --- | --- |
| Text contrast | container | 21:1, #000000 on #ffffff, normal text | AAA. Estimated: the background is an image, a gradient or see-through |
| Target size | container | 106.3 × 19px | Fails (AA needs 24 × 24px, unless it is a link inside a sentence) |
| Focus visible | container | outline change on focus-visible | Yes |

- Measured on this page against WCAG 2.2. Check again wherever the colors, sizes or focus styles differ.

#### Variants
| Variant | Uses | Differences from this one | Example |
| --- | --- | --- | --- |
| link | 31 | same styles | `li:nth-of-type(1) > a` |
| link-2 | 11 | font-weight 350 | `details:nth-of-type(1) > nav > div:nth-of-type(1) > a` |
| link-3 | 3 | color #ffffff, border-radius 5px, padding-top 100% | `figure:nth-of-type(1) > a` |

### button
- button · example: `div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > button` · 21 on the page, 4 variants

#### Anatomy
- container — button: display flex, align-items center, justify-content center, border 2px solid transparent (`transparent`), width 30px, height 30px, border-radius 40px, background-color #000000, cursor pointer
- icon — svg: width 24px, height 24px, color #ffffff

#### States
| State | Changes | Read from |
| --- | --- | --- |
| hover | opacity 1 → 0.8 | stylesheet rules |
| focus-visible | outline #ffffff none 3px → #000000 solid 2px; outline-offset 0px → 2px | stylesheet rules |
| disabled | color #ffffff → #666666; cursor pointer → not-allowed; icon color #ffffff → #666666; icon cursor pointer → not-allowed | disabled attribute |

#### Motion
- transition background-color 0.3s ease
- transition color 0.3s ease

#### Accessibility
| Check | Part | Measured | Result |
| --- | --- | --- | --- |
| Target size | container | 30 × 30px | AA (at least 24 × 24px; AAA needs 44 × 44px) |
| Focus visible | container | outline change on focus-visible | Yes |

- Measured on this page against WCAG 2.2. Check again wherever the colors, sizes or focus styles differ.

#### Variants
| Variant | Uses | Differences from this one | Example |
| --- | --- | --- | --- |
| button | 18 | same styles | `div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > button` |
| button-2 | 1 | background-color #f2f2f2, color #595959, border-top-width 0px (`medium`), border-radius 100px, padding-top 0.75rem, padding-left 1rem, font-size 100%, font-weight 400 | `nav > div:nth-of-type(2) > div > button:nth-of-type(1)` |
| button-3 | 1 | background-color transparent, color #000000 (`currentcolor`), border-top-width 0px (`medium`), border-radius 0px, font-size 1rem, font-weight 350 | `footer > div:nth-of-type(2) > div:nth-of-type(1) > button` |
| button-4 | 1 | background-color transparent, color #000000, border-top-width 0px, border-radius 0px, font-size 100%, font-weight 400 | `div:nth-of-type(4) > button` |

### card
- card · example: `section:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div` · 3 on the page, 1 variant

#### Anatomy
- container — div: width 100%, height 100%, background-color #d9d9d9, transform translateY(-550.63px) (`translateY(-100%)`)

#### Motion
- transition transform 0.35s cubic-bezier(0.39, 0.575, 0.565, 1)

#### Variants
| Variant | Uses | Differences from this one | Example |
| --- | --- | --- | --- |
| card | 3 | same styles | `section:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div` |

### footer
- footer · example: `footer` · 1 on the page, 1 variant

#### Anatomy
- container — footer (contentinfo): padding 3.125rem, background-color #ffffff
- link (×11) — a (link): font-family Favorit, Helvetica, Arial, sans-serif, font-size 1rem, font-weight 350, line-height 1.5rem, color #000000, padding 0 0 0.0625rem, background-image linear-gradient(#000000, #000000) (`linear-gradient(currentcolor, currentcolor)`)
- action — button: font-family Favorit, Helvetica, Arial, sans-serif, font-size 1rem, font-weight 350, line-height 1.25rem, color #000000 (`currentcolor`), align-items center, cursor pointer
- action-2 — button: font-family Favorit, Helvetica, Arial, sans-serif, font-size 100%, font-weight 400, line-height 1.15rem (`1.15`), color #000000, cursor pointer
- label — span: font-family Favorit, Helvetica, Arial, sans-serif, font-size 1rem, font-weight 350, line-height 1.25rem, color #000000
- label-2 — span: font-family Favorit, Helvetica, Arial, sans-serif, font-size 1rem, font-weight 350, line-height 1.25rem, color #00000080, width 100%
- image — img: width 100%, height auto

#### Images
| Part | Kind | Size | Shape | Fit | Corners | Effects | Layers over it |
| --- | --- | --- | --- | --- | --- | --- | --- |
| image | img | 90 × 109.8px | 1:1.22 | fill | none | none | none |

- These are slots for your own images, framed as above. No image file or URL is included.

#### Motion
- transition opacity 0.2s linear

#### Accessibility
| Check | Part | Measured | Result |
| --- | --- | --- | --- |
| Text contrast | link | 21:1, #000000 on #ffffff, normal text | AAA. Estimated: the background is an image, a gradient or see-through |
| Text contrast | action | 21:1, #000000 on #ffffff, normal text | AAA |
| Text contrast | action-2 | 21:1, #000000 on #ffffff, normal text | AAA |
| Text contrast | label | 21:1, #000000 on #ffffff, normal text | AAA |
| Text contrast | label-2 | 3.97:1, #808080 on #ffffff, normal text | Fails (AA needs 4.5:1). Estimated: the background is an image, a gradient or see-through |
| Target size | container | 190.72 × 24px | AA (at least 24 × 24px; AAA needs 44 × 44px) |
| Focus visible | container | not read: only stylesheet rules were checked | Unknown: capture the component on its own in Luci to check |

- Measured on this page against WCAG 2.2. Check again wherever the colors, sizes or focus styles differ.

#### Variants
| Variant | Uses | Differences from this one | Example |
| --- | --- | --- | --- |
| footer | 1 | same styles | `footer` |

---
version: alpha
name: Mindmarket design
description: "Exported by Luci from 1 capture of mindmarket.com/; values measured from live pages."
colors:
  primary: "#8ed462"
  secondary: "#ff705d"
  tertiary: "#f5e211"
  primary-4: "#2ba0ff"
  surface: "#ffffff"
  surface-variant: "#f5f1e4"
  surface-3: "#e0dbce"
  on-surface: "#2c2e2a"
  on-surface-variant: "#000000"
  on-surface-3: "#2c2e2a99"
typography:
  display:
    fontFamily: Inter
    fontSize: 11.2941rem
    fontWeight: "400"
    lineHeight: 10.7294rem
    letterSpacing: -0.06em
  display-2:
    fontFamily: Inter
    fontSize: 9.7vw
    fontWeight: "500"
    lineHeight: 10.4075rem
    letterSpacing: -0.06em
  display-3:
    fontFamily: Inter
    fontSize: 4.75rem
    fontWeight: "500"
    lineHeight: 4.5125rem
    letterSpacing: -0.06em
  heading-1:
    fontFamily: Inter
    fontSize: 3.125rem
    fontWeight: "500"
    lineHeight: 3.5938rem
    letterSpacing: -0.06em
  body-large:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: "500"
    lineHeight: 2.1rem
    letterSpacing: -0.06em
  body:
    fontFamily: Inter
    fontSize: 1.1875rem
    fontWeight: "500"
    lineHeight: 1.4844rem
    letterSpacing: -0.04em
  link:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: "500"
    lineHeight: 1.3281rem
    letterSpacing: -0.04em
  link-2:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: "500"
    lineHeight: 1.5rem
  body-small:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: "500"
    lineHeight: 1.0938rem
    letterSpacing: -0.04em
  navigation-label:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: "500"
    lineHeight: 1.5rem
  link-label:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: "500"
    lineHeight: 1.3281rem
    letterSpacing: -0.04em
  button-label:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: "500"
    lineHeight: 1.5rem
  card-label:
    fontFamily: Inter
    fontSize: 1.1875rem
    fontWeight: "500"
    lineHeight: 1.4844rem
    letterSpacing: -0.04em
  badge-label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: "500"
    lineHeight: 1.0938rem
    letterSpacing: -0.04em
rounded:
  r-50: 50px
  "r-63.75": 63.75px
  3xl: 25.5px
spacing:
  "space-4.25px": 0.25rem
  "space-6.38px": 0.375rem
  button-gap: 0.5rem
  button-padding: 0.625rem
  "space-12.75px": 0.75rem
  space-17px: 1rem
  "space-18.06px": 1.0625rem
  "space-19.2px": 1.1294rem
  spacing-unit-md: 1.1765rem
  "space-21.25px": 1.25rem
  "space-25.5px": 1.5rem
  "space-26.56px": 1.5625rem
  spacing-fluid-md: 2rem
  "space-38.25px": 2.25rem
  spacing-fluid-lg: 2.5rem
  space-51px: 3rem
  "space-53.13px": 3.125rem
  "space-59.5px": 3.5rem
  spacing-fluid-2xl: 5rem
  "space-112.63px": 6.625rem
  spacing-fluid-3xl: 8rem
  "space-138.75px": 8.1618rem
  spacing-fluid-4xl: 10rem
  space-255px: 15rem
  space-336px: 19.7647rem
  space-340px: 20rem
  space-384px: 22.5882rem
components:
  navigation:
    textColor: "{colors.on-surface}"
    typography: "{typography.navigation-label}"
  link:
    textColor: "{colors.on-surface}"
    typography: "{typography.link-label}"
    rounded: "{rounded.r-50}"
    padding: "0 1rem"
  button:
    textColor: "{colors.on-surface}"
    typography: "{typography.button-label}"
  card:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    typography: "{typography.card-label}"
    rounded: "{rounded.r-63.75}"
    padding: "1.25rem 2.5rem 1.25rem 1.25rem"
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.badge-label}"
    rounded: "{rounded.3xl}"
    padding: "0.375rem 0.625rem"
  primary-footer:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.r-50}"
    padding: "8rem 0 2.25rem"
---

# Mindmarket design

## Overview
This design system is measured from live pages: https://mindmarket.com/. Every value below is one Luci found there, and the words are filled in from those values; nothing is invented.

## Colors
- **Primary (#8ed462):** an accent, used 17 times for background-color, fill, stroke; the site writes it as --color-green.
- **Secondary (#ff705d):** an accent, used 4 times for background-color, fill.
- **Tertiary (#f5e211):** an accent, used 3 times for background-color, fill; the site writes it as --color-yellow.
- **Primary 4 (#2ba0ff):** an accent, used 3 times for background-color, color; the site writes it as --color.
- **Surface (#ffffff):** a background, used 69 times for background-color; the site writes it as --color-white.
- **Surface Variant (#f5f1e4):** a background, used 62 times for background-color; the site writes it as --color-beige-400.
- **Surface 3 (#e0dbce):** a background, used 1 time for background-color; the site writes it as --color-beige-500.
- **On Surface (#2c2e2a):** a text color, used 111 times for color, fill, stroke; the site writes it as --color-primary.
- **On Surface Variant (#000000):** a text color, used 7 times for color, stroke; the site writes it as --button-color.
- **On Surface 3 (#2c2e2a99):** a text color, used 6 times for color.

## Typography
- **Display:** Inter 11.2941rem, weight 400, line height 10.7294rem, letter spacing -0.06em; used by p.
- **Display 2:** Inter 9.7vw, weight 500, line height 10.4075rem, letter spacing -0.06em; used by p, h1, u.
- **Display 3:** Inter 4.75rem, weight 500, line height 4.5125rem, letter spacing -0.06em; used by p, strong.
- **Heading 1:** Inter 3.125rem, weight 500, line height 3.5938rem, letter spacing -0.06em; used by h2.
- **Body Large:** Inter 1.75rem, weight 500, line height 2.1rem, letter spacing -0.06em; used by p, h2, h3.
- **Body:** Inter 1.1875rem, weight 500, line height 1.4844rem, letter spacing -0.04em; used by p, h3.
- **Link:** Inter 1.0625rem, weight 500, line height 1.3281rem, letter spacing -0.04em; used by a, span, div, p, strong.
- **Link 2:** Inter 1rem, weight 500, line height 1.5rem; used by a, span, button.
- **Body Small:** Inter 0.875rem, weight 500, line height 1.0938rem, letter spacing -0.04em; used by div.

Type families: Inter.

## Layout
- Spacing values: 0.25rem, 0.375rem, 0.5rem, 0.625rem, 0.75rem, 1rem, 1.0625rem, 1.1294rem, 1.1765rem, 1.25rem, 1.5rem, 1.5625rem, 2rem, 2.25rem, 2.5rem, 3rem, 3.125rem, 3.5rem, 5rem, 6.625rem, 8rem, 8.1618rem, 10rem, 15rem, 19.7647rem, 20rem, 22.5882rem.

## Shapes
- **R 50 (50px):** corners of Link, Primary Footer.
- **R 63.75 (63.75px):** corners of Card.
- **3xl (25.5px):** corners of Badge.

## Components

### Navigation
A navigation (nav (navigation)) with #2c2e2a text. Its label is Inter 1rem, weight 500. Parts: container (nav (navigation)); action (button); image (img); image-2 (img); image-3 (img); image-4 (img); image-5 (img); image-6 (img); image-7 (img); image-8 (canvas). Motion: transition of transform, 0.4s cubic-bezier(0.5, 0, 0, 1). Image slots: image, 1:1.3; image-2, 1:1.3; image-3, 1:1.3; image-4, 1:1.3; image-5, 1:1.3; image-6, 1:1.3; image-7, 1:1.3; image-8, 1:1.

### Link
A link (a (link)) with #2c2e2a text, 50px corners, 0 1rem padding. Its label is Inter 1.0625rem, weight 500. Parts: container (a (link)); label (span); icon (svg).

### Button
A button (button) with #2c2e2a text. Its label is Inter 1rem, weight 500. Parts: container (button); label (text). On hover, text-decoration-line becomes underline.

### Card
A card (div) with a #f5f1e4 background, #2c2e2a text, 63.75px corners, 1.25rem 2.5rem 1.25rem 1.25rem padding. Its label is Inter 1.1875rem, weight 500. Parts: container (div); image (img); description (p (paragraph)). Image slots: image, 1:1.

### Badge
A badge (div) with a #ffffff background, #2c2e2a text, 25.5px corners, 0.375rem 0.625rem padding. Its label is Inter 0.875rem, weight 500. Parts: container (div); label (text).

### Primary Footer
A footer (footer (contentinfo)) with a #f5e211 background, 50px corners, 8rem 0 2.25rem padding. Parts: container (footer (contentinfo)); image (img). Image slots: image, 8.51:1.

## Do's and Don'ts
- Do build with the colors above, through their tokens; don't add new ones without a reason.

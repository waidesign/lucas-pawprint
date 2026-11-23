---
version: alpha
name: Ko Fi design
description: "Exported by Luci from 1 capture of ko-fi.com/; values measured from live pages."
colors:
  primary: "#fd5913"
  secondary: "#89a4ec"
  tertiary: "#aac9f7"
  primary-4: "#f2db7d"
  primary-5: "#72a4f2"
  primary-6: "#b6c9f3"
  primary-7: "#ec9773"
  surface: "#ffffff"
  surface-variant: "#202020"
  surface-3: "#ede6dd"
  surface-4: "#f4efe7"
  on-surface: "#000000"
  on-surface-5: "#2d2d2d"
  on-surface-6: "#cedcf7"
  on-surface-7: "#161616"
  on-surface-8: "#595959"
  field-disabled: "#efefef4d"
typography:
  heading-1:
    fontFamily: bogue-black
    fontSize: 4.5rem
    fontWeight: "400"
    lineHeight: 4.5rem
  heading-2:
    fontFamily: bogue-black
    fontSize: 3.75rem
    fontWeight: "400"
    lineHeight: 3.75rem
  body-large:
    fontFamily: DM Sans
    fontSize: 1.875rem
    fontWeight: "400"
    lineHeight: 2.25rem
  link:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "400"
    lineHeight: 1.75rem
  body:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "600"
    lineHeight: 1.75rem
  link-2:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: "600"
    lineHeight: 1.4rem
  body-small:
    fontFamily: DM Sans
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: 1.25rem
  navigation-label:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: "600"
    lineHeight: 1.5rem
  link-label:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "400"
    lineHeight: 1.75rem
  button-label:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "600"
    lineHeight: 1.75rem
  card-label:
    fontFamily: bogue-black
    fontSize: 3.75rem
    fontWeight: "400"
    lineHeight: 3.75rem
  form-label:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "600"
    lineHeight: 1.75rem
  field-label:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "400"
    lineHeight: 1.75rem
  primary-footer-label:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: "400"
    lineHeight: 1.75rem
rounded:
  r-9999: 9999px
  r-40: 40px
spacing:
  unit: 0.25rem
  space-4px: 0.25rem
  space-8px: 0.5rem
  space-12px: 0.75rem
  space-16px: 1rem
  space-20px: 1.25rem
  space-24px: 1.5rem
  space-28px: 1.75rem
  space-32px: 2rem
  space-40px: 2.5rem
  space-80px: 5rem
  space-96px: 6rem
  space-128px: 8rem
components:
  navigation:
    textColor: "{colors.surface}"
    typography: "{typography.navigation-label}"
    width: 100vw
  link:
    textColor: "{colors.surface-variant}"
    typography: "{typography.link-label}"
  button:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.surface}"
    typography: "{typography.button-label}"
    rounded: "{rounded.r-9999}"
    padding: "1.25rem 1.75rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-variant}"
    typography: "{typography.card-label}"
    rounded: "{rounded.r-40}"
    padding: "6rem 5rem"
    width: "100%"
  form:
    textColor: "{colors.surface-variant}"
    typography: "{typography.form-label}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-variant}"
    typography: "{typography.field-label}"
    height: "100%"
    width: "100%"
  field-disabled:
    backgroundColor: "{colors.field-disabled}"
  primary-footer:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface-variant}"
    typography: "{typography.primary-footer-label}"
    padding: "0 5rem 1rem"
    width: "100%"
---

# Ko Fi design

## Overview
This design system is measured from live pages: https://ko-fi.com/. Every value below is one Luci found there, and the words are filled in from those values; nothing is invented.

## Colors
- **Primary (#fd5913):** an accent, used 5 times for fill.
- **Secondary (#89a4ec):** an accent, used 3 times for fill.
- **Tertiary (#aac9f7):** an accent, used 2 times for background-color.
- **Primary 4 (#f2db7d):** an accent, used 2 times for fill.
- **Primary 5 (#72a4f2):** an accent, used 1 time for background-color.
- **Primary 6 (#b6c9f3):** an accent, used 1 time for fill.
- **Primary 7 (#ec9773):** an accent, used 1 time for fill.
- **Surface (#ffffff):** a background, used 4 times for background-color.
- **Surface Variant (#202020):** a background, used 3 times for background-color; the site writes it as --black.
- **Surface 3 (#ede6dd):** a background, used 1 time for background-color; the site writes it as --stone-200.
- **Surface 4 (#f4efe7):** a background, used 1 time for background-color; the site writes it as --stone-100.
- **On Surface (#000000):** a text color, used 1269 times for fill, stroke.
- **On Surface 5 (#2d2d2d):** a text color, used 6 times for stroke.
- **On Surface 6 (#cedcf7):** a text color, used 3 times for fill.
- **On Surface 7 (#161616):** a text color, used 3 times for stroke.
- **On Surface 8 (#595959):** a text color, used 1 time for fill.
- **Field Disabled (#efefef4d):** used by field.

## Typography
- **Heading 1:** bogue-black 4.5rem, weight 400, line height 4.5rem; used by h1.
- **Heading 2:** bogue-black 3.75rem, weight 400, line height 3.75rem; used by h1, h2.
- **Body Large:** DM Sans 1.875rem, weight 400, line height 2.25rem; used by p.
- **Link:** DM Sans 1.25rem, weight 400, line height 1.75rem; used by a.
- **Body:** DM Sans 1.25rem, weight 600, line height 1.75rem; used by div, a, span.
- **Link 2:** DM Sans 1rem, weight 600, line height 1.4rem; used by a.
- **Body Small:** DM Sans 0.875rem, weight 400, line height 1.25rem; used by div.

Type families: bogue-black, DM Sans.

## Layout
- Spacing follows a 0.25rem base unit: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 1.75rem, 2rem, 2.5rem, 5rem, 6rem, 8rem.

## Shapes
- **R 9999 (9999px):** corners of Button.
- **R 40 (40px):** corners of Card.

## Components

### Navigation
A navigation (nav (navigation)) with #ffffff text. Its label is DM Sans 1rem, weight 600. Parts: container (nav (navigation)); link (a (link)); image (img). Image slots: image, 3.64:1.

### Link
A link (a (link)) with #202020 text. Its label is DM Sans 1.25rem, weight 400. Parts: container (a (link)); label (text).

### Button
A button (input (button)) with a #202020 background, #ffffff text, 9999px corners, 1.25rem 1.75rem padding. Its label is DM Sans 1.25rem, weight 600. Motion: transition of all, 0.15s cubic-bezier(0.4, 0, 0.2, 1).

### Card
A card (div) with a #ffffff background, #202020 text, 40px corners, 6rem 5rem padding, a 2px solid #000000 border. Its label is bogue-black 3.75rem, weight 400. Parts: container (div); heading (h2 (heading)); description (p (paragraph)); link (a (link)); label (span); image (video). Image slots: image, 4:3.

### Form
A form (form) with #202020 text. Its label is DM Sans 1.25rem, weight 600. Parts: container (form); label (span); field (input (textbox)); field-2 (input (button)).

### Field
A field (input (textbox)) with a #ffffff background, #202020 text. Its label is DM Sans 1.25rem, weight 400. On disabled, background-color becomes #efefef4d; cursor becomes default.

### Primary Footer
A footer (footer (contentinfo)) with a #aac9f7 background, #202020 text, 0 5rem 1rem padding. Its label is DM Sans 1.25rem, weight 400. Parts: container (footer (contentinfo)); link (a (link)); image (img). Image slots: image, 5:4.

## Do's and Don'ts
- Do build with the colors above, through their tokens; don't add new ones without a reason.
- Do keep spacing to multiples of 0.25rem.
- Don't put #9ca3af text on #ffffff as in Form: its contrast is 2.53:1, under the 4.5:1 AA needs.
- Don't put #9ca3af text on #ffffff as in Field: its contrast is 2.53:1, under the 4.5:1 AA needs.

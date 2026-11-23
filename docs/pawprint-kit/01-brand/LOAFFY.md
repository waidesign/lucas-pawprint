# Loaffy · Character Bible

> Loaffy is a ginger cat's pawprint with a face. Calm and curious. No arms, no legs.
> The name comes from the "loaf" pose cats make when they sit calm and tucked in.
> Source SVGs: `../05-assets/loaffy/`. Canvas: https://claude.ai/artifact/RPWddP3RqrRrfh72Zayjns
> **All motion (timelines, Rive rig, state machine, site choreography): `LOAFFY-ANIMATION.md`.**

---

## 1. Anatomy (viewBox `0 0 200 200`)

| Part | Spec |
|---|---|
| **Main pad (body + face)** | Path: `M100,92 C130,92 160,118 164,148 C167,170 150,182 132,178 C120,175 112,182 100,182 C88,182 80,175 68,178 C50,182 33,170 36,148 C40,118 70,92 100,92 Z` |
| **Toe beans (4)** | Ellipses `cx, cy, rx, ry, rotate`: `(38,90,14,18,−34)`, `(80,66,15,19,−12)`, `(120,66,15,19,12)`, `(162,90,14,18,34)` |
| **Eyes (calm)** | Ellipses at `(86,140)` and `(114,140)`, rx 5.5, ry 9, Ink. Glints: circles r 1.8 at `(+1.5, −4)`, Cloud |
| **Mouth (smile)** | `M95,158 Q100,163 105,158`, Ink, 3.5px, round caps |
| **Cheeks** | Ellipses at `(70,156)` and `(130,156)`, rx 7, ry 4, Blush-cheek `#F2B8B0` |
| **Highlight** | `M60,128 Q68,110 86,104`, Cloud, 5px, round caps, 85% opacity |
| **Ground shadow** | Ellipse at `(100,196)`, rx 46, ry 4.5, Ink at 12% opacity |

**Colours:** Ginger `#F4A878` (fill) · Ginger-deep `#CD8D65` (3D shade, stripes) · Ginger-light `#F8CAAA` (bean side of hand, cube top) · Claw `#F7F0E2` · Outline Ink `#2B2B2B`.

---

## 2. Construction rules (non-negotiable)

1. **No overlapping shapes.** Every part is its own shape with a visible gap. Minimum gap between beans and pad: **9.5 units** in the 200 viewBox. Facial features (eyes, mouth, cheeks, highlight, sunglasses) sit *on* the pad; that's allowed.
2. **Pen-style outline.** Each outlined shape is drawn twice:
   - an **under-copy** filled and stroked in Ink, stroke width `main + 2.4`, nudged `translate(0.9, 1.5)`;
   - the **main shape** with its fill and a 3.4px Ink stroke, `stroke-linejoin: round`.
   Result: thin top-left edges, heavy bottom-right edges, like a pen.
3. **Hand-drawn wobble.** Wrap the whole character in an SVG filter:
   `feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2"` → `feDisplacementMap scale="2.4"`.
   Turn the wobble off below 48px (it muddies small sizes) and for cursors.
4. **3D lives inside one outline.** For depth, fill the silhouette with Ginger-deep, then draw the Ginger face clipped to the same silhouette and shifted `(−5, −7)`. Never stack an offset copy behind the shape.
5. **Outline colour follows the theme.** Use `currentColor` for outlines. Light: Ink. Dark and Warm Dark: the theme's text colour, so Loaffy never disappears. Eyes and mouth stay Ink (they sit on ginger).
6. **Ginger is Loaffy's alone.** Never recolour Loaffy; never use ginger elsewhere.

---

## 3. Sizes and presence

| Context | Size | Detail level |
|---|---|---|
| Hero | Loaffy and its stage take about **60%** of the hero's visual weight | Full detail + wobble + eye tracking |
| Section accent | 10–20% of the section | Full detail |
| Card peek | 72–128px | Full detail, no ground shadow |
| Toast / inline | 32–48px | Simplified: no cheeks, no highlight, no wobble |
| Favicon | 16–32px | Pad + 4 beans + eyes only |

**One character on screen at a time** (Loaffy *or* the cat hand). The paw cursor is the exception.

---

## 4. Expressions (face + beans do all the acting)

| Expression | Eyes | Mouth | Beans | Used for |
|---|---|---|---|---|
| **Calm** (default) | Tall ovals, slow blink every 5–7s | Small smile | Rest | Hero idle |
| **Curious** | Shift toward the target | Smile | Whole paw tilts −8° | Hovering a work card |
| **Thinking** | Small, looking up | Flat | Slow orbit (dotted path) | Loading |
| **Happy** | Closed arcs `^ ^` | Big smile | Hop up 10 units | Email copied, form sent |
| **Sleepy** | Closed, droopy | Flat | Drop 3 units | 30s idle; late-night visitors |
| **Surprised** | Round, wide | Small "o" | Spread outward | 404, errors |

SVGs: `05-assets/loaffy/expressions/*.svg`

## 5. Poses (attitude without limbs: tilt, squash, stretch, props on the face)

| Pose | How | Used for |
|---|---|---|
| **Loaf** | Squash `scale(1.08, 0.92)`, calm eyes | Hero, sitting outside the box |
| **Shades** | Tilt −6°, sunglasses, smirk | "Open to work" badge |
| **Chill lean** | Tilt 14°, half-lidded eyes, smirk | About section |
| **Jump** | Stretch `scale(0.9, 1.1)`, lifted 10, beans flared, small shadow | Success |
| **Landing** | Squash `scale(1.14, 0.84)`, wide shadow | Page transitions |
| **Wink** | One eye closed, sparkle | Easter egg: hover the logo |
| **Side-eye** | Half-lidded, looking right, one outer bean raised | Hovering the email but not copying |
| **Vibing** | Tilt −7°, beans bob unevenly, music notes | Motion section while the reel plays |
| **Mid-flip** | Rotated 160°, spin lines | 404, back to top |

SVGs: `05-assets/loaffy/poses/*.svg`

## 6. Shape-shift (one character, many bodies)

**Always kept:** four beans in the same arc (smaller: rx 10, ry 13), two tall eyes, ginger fill, pen outline.
**Always changes:** the body becomes the thing the section is about.

| Form | Section |
|---|---|
| Paw (3D) | Home |
| Browser window | Web work |
| Phone | App work |
| Cube | Design systems |
| Play button | Motion |
| Speech bubble | Contact |
| Lost (beans scattered, "?") | 404 |

**Morph motion:** 720ms — anticipation, squash peak at 200ms where the body swaps, stretch, settle. Beans follow 40/80ms later. Never a hard cut. Full keys: `LOAFFY-ANIMATION.md §4.16`.

SVGs: `05-assets/loaffy/forms/*.svg`

---

## 7. The cat hand (second character)

- **Shape:** a straight leg as wide as the paw; four short, tightly packed toe bumps on top; small creases between toes; tabby stripes across the leg in Ginger-deep.
- **Claws:** four sharp, slightly hooked claws in Claw `#F7F0E2`, growing out of each toe tip (the base tucks inside the toe; this is the one allowed connection).
- **Two sides:** fur side (Ginger, stripes) and bean side (Ginger-light, with four toe beans and a palm pad that is a tiny Loaffy pad).
- **No face.** The hand is Loaffy's paw, not a second mascot.
- **Uses:** tapping a CTA, hanging over a card edge, batting at the scroll cue, sketching in the process story.

SVGs: `05-assets/loaffy/hand/*.svg`

## 8. Paw cursor

| State | File | Hotspot (x, y) at 40px |
|---|---|---|
| Default | `cursors/cursor-default.svg` | `10 8` |
| Link / button hover | `cursors/cursor-link.svg` | `12 7` |
| Pressed | `cursors/cursor-pressed.svg` | `13 8` |
| Text inputs | System I-beam (never replace) | — |

```css
:root[data-paw-cursor="on"] body { cursor: url("/cursors/cursor-default.svg") 10 8, auto; }
:root[data-paw-cursor="on"] :is(a, button, [role="button"], summary, label[for]) { cursor: url("/cursors/cursor-link.svg") 12 7, pointer; }
:root[data-paw-cursor="on"] :is(a, button):active { cursor: url("/cursors/cursor-pressed.svg") 13 8, pointer; }
:root[data-paw-cursor="on"] :is(input, textarea, [contenteditable]) { cursor: text; }
@media (pointer: coarse), (prefers-reduced-motion: reduce) { :root body { cursor: auto; } }
```

- 40px (on the 8px grid), no wobble filter, outline uses Ink in all themes (cursors can't read CSS colour).
- Off on touch devices and for reduced motion; a footer switch ("Paw cursor: On / Off") saves the choice in `localStorage`.
- Idea for later: claws hidden at rest, pop out on press.

---

## 9. Behaviour

- **Eye tracking:** pupils move up to 3 units toward the pointer (clamped), eased with a spring. Off under `prefers-reduced-motion` and on touch.
- **Blink:** every 4–7s (randomised), 200ms total (80 close · 40 hold · 80 open); 15% chance of a double blink.
- **Idle:** after 30s with no input → Sleepy. Any input → Calm.
- **Click Loaffy:** Happy hop, then Calm. Five clicks in a row → Mid-flip (easter egg).
- **Reduced motion:** static Calm pose, no tracking, no morphs. Pose changes become instant swaps.

## 10. Implementation notes

- `<Loaffy mood pose form size … />` is a facade: it server-renders the **SVG** version (fast first paint, reduced-motion and no-JS fallback) and upgrades to **Rive** (`public/rive/loaffy.riv`, state machine `Loaffy SM`) when loaded. Contract: `LOAFFY-ANIMATION.md §7`.
- Lucas builds the `.riv` in Rive from `LOAFFY-ANIMATION.md §3–§5`; the agent builds the SVG version and the integration.
- Every Loaffy SVG has `role="img"` and an `aria-label`, or `aria-hidden="true"` when purely decorative next to text that says the same thing.

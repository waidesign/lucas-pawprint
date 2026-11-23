# Loaffy · End-to-End Animation Kit

> Everything needed to animate Loaffy and the cat hand: principles, the Rive rig and state machine (for Lucas to build), every timeline with frame-level timing, the site choreography, the React integration (for the coding agent), exports and QA.
> Read with `LOAFFY.md` (shapes, rules). Animated reference: canvas board **Animation kit** → https://claude.ai/artifact/RPWddP3RqrRrfh72Zayjns#artboard-AnimationKit

**Who does what**
- **Lucas (in Rive):** builds `loaffy.riv` from §3–§5 (rig, timelines, state machine).
- **Coding agent:** builds the React SVG fallback and the integration layer from §7–§8, wires site events, tests.
- The site must look complete **without** Rive (SVG fallback first paint), then upgrade to Rive when loaded.

---

## 1. Motion personality

| Trait | In motion |
|---|---|
| Calm | Slow idle breathing, long holds, soft settles. Never jittery. |
| Curious | Leads with the eyes, then the beans, then the body (eyes → beans → body). |
| Active | Quick anticipation, clean arcs, snappy but short reactions. |
| Optimistic | Upward motion for good news (hops, beans lift); downward only for sleepy. |
| Detail-obsessed | Everything lands on a 40ms beat; overlapping action is always there. |

## 2. Principles (apply to every timeline)

1. **Timing grid:** all keys on multiples of **40ms** (= every 2.4 frames at 60fps; author at **50fps in Rive so 1 frame = 20ms** and keys sit on even frames). Durations: 120 / 200 / 280 / 480 / 720ms for UI-facing moments.
2. **Squash & stretch budget:** body max **±12%** (scaleX × scaleY ≈ 1, preserve volume). Beans max ±8%. Eyes never stretch.
3. **Pivot:** body squash pivots at the **bottom centre of the pad (100, 182)**; beans pivot at their own centres; eyes at their centres.
4. **Overlapping action:** beans follow the body by **40ms** (inner beans) and **80ms** (outer beans). Eyes lead by 40ms on look changes.
5. **Anticipation:** 80–120ms, small (squash 4–6%) before any jump, hop or morph.
6. **Arcs:** hops and flips travel on arcs, never straight lines.
7. **Overshoot:** UI-facing settles overshoot ≈ 4%; Loaffy's own reactions ≈ 8–12%.
8. **No overlap, ever:** at every frame, beans keep ≥ 4 units from the pad (the static rule is 9.5; motion may compress to 4, never touch). Check the most squashed frame of each timeline.
9. **Line boil (hand-drawn life):** the pen outline has 3 boil drawings swapped every **120ms** (≈ 8fps) on idle. Off for cursor-size and reduced motion.
10. **Reduced motion:** one static frame per state; transitions become cross-fades ≤ 120ms; no boil, no tracking, no loops.

## 3. Rive rig (`loaffy.riv`)

### 3.1 Artboards
| Artboard | Size | Contents |
|---|---|---|
| `Loaffy` | 400×400 (2× the 200 viewBox) | Main character, all expressions, poses, forms |
| `Hand` | 400×400 | Cat hand, both sides, claws |
| `Box` | 480×400 | Open cardboard box for the hero (separate so it can sit in layout) |

### 3.2 Hierarchy (`Loaffy`)
```
Root (pivot 200,364  ← bottom centre of pad ×2)
├── GroundShadow            ellipse, Ink 12%
├── Body (pivot at pad bottom centre)
│   ├── Pad
│   │   ├── PadUnder        pen under-copy (Ink, +2.4 stroke, offset 0.9/1.5 ×2)
│   │   ├── PadFill         Ginger (3D forms: Ginger-deep base + clipped Ginger face)
│   │   ├── PadLine         3.4 ×2 stroke Ink  ← 3 boil variants: PadLine_A/B/C
│   │   └── Highlight
│   ├── Face (pivot 200,280)
│   │   ├── Eye_L  (pivot 172,280) → Pupil_L, Glint_L, Lid_L (closed arc), Happy_L, Wide_L
│   │   ├── Eye_R  (pivot 228,280) → Pupil_R, Glint_R, Lid_R, Happy_R, Wide_R
│   │   ├── Mouth  → Smile, Flat, O, Big, W, Smirk (one visible at a time via opacity)
│   │   ├── Cheeks (L/R)
│   │   └── Props  → Shades, Sparkle, Zz, Notes (hidden by default)
│   └── Forms  → Paw3D, Window, Phone, Cube, Play, Bubble, Lost (each its own group; opacity-swapped at squash peak)
└── Beans
    ├── Bean_OL (outer left,  pivot 76,180)
    ├── Bean_IL (inner left,  pivot 160,132)
    ├── Bean_IR (inner right, pivot 240,132)
    └── Bean_OR (outer right, pivot 324,180)
        (each: Under / Fill / Line_A/B/C)
```
Rive notes: use **solid strokes**; the pen effect = under-copy shape (as in the SVG). No SVG filters in Rive — the hand-drawn wobble is done by **line boil** (3 hand-nudged versions of each Line path).

### 3.3 State machine `Loaffy SM`
**Inputs**
| Input | Type | Values |
|---|---|---|
| `mood` | Number | 0 calm · 1 curious · 2 thinking · 3 happy · 4 sleepy · 5 surprised |
| `form` | Number | 0 paw · 1 paw3d · 2 window · 3 phone · 4 cube · 5 play · 6 bubble · 7 lost |
| `pose` | Number | 0 none · 1 loaf · 2 shades · 3 chillLean · 4 vibing |
| `lookX` / `lookY` | Number | −100…100 (React maps pointer position) |
| `hover` | Boolean | pointer over Loaffy |
| `tap` | Trigger | happy hop |
| `jump` / `land` / `wink` / `flip` | Trigger | one-shots |
| `blink` | Trigger | fired by React at random 4–7s |
| `reduced` | Boolean | reduced motion → static layer only |

**Layers** (top to bottom)
| Layer | States | Notes |
|---|---|---|
| L1 Idle | `idle_breathe` (loop) · `boil` (loop) | Always running unless `reduced` |
| L2 Mood | calm · curious · thinking · happy · sleepy · surprised | Transitions 200ms blend on `mood` change |
| L3 Pose | none · loaf · shades · chillLean · vibing | 280–480ms in/out |
| L4 Form | one state per form; each transition plays `morph_*` | 720ms; ignores `mood` eyes during swap |
| L5 Look | 1D blends `lookX`, `lookY` (pupil offset ±6 at 400px, tilt ±3°) | Additive |
| L6 One-shots | blink · hop · jump · land · wink · flip | Exit to Any State when done |

## 4. Timelines (keyframe specs)

Times in ms from 0. "S" = scale about the pivot. All keys on the 40ms grid. Easing names from DESIGN.md.

### 4.1 `idle_breathe` — loop 3200ms
| t | Body | Beans | Eyes |
|---|---|---|---|
| 0 | S 1.00/1.00 | y 0 | — |
| 1600 | S 1.01/0.985 (exhale) | y +1 (IL/IR at 1640, OL/OR at 1680) | — |
| 3200 | back to 1.00/1.00 | y 0 | — |
Ease: in-out. Subtle enough to read as "alive", not bouncing.

### 4.2 `blink` — 200ms (React fires every 4–7s, random; 15% chance of a double blink)
0 open → 80 closed (lid arc) → 120 hold → 200 open. Glints hide 40–160.

### 4.3 `look` — continuous
Pupils move ≤ 6 units (in 400px artboard) toward `lookX/Y`; head tilt ±3° follows 40ms later. Spring (stiffness 200, damping 20). Clamp so pupils never leave the eye.

### 4.4 `mood_curious` — in 280ms
0 eyes shift toward target → 40 beans lean 4° toward target (inner 40ms, outer 80ms lag) → 120 whole body tilts −8° → 280 settle (overshoot 4%).

### 4.5 `mood_thinking` — loop 1600ms
Eyes small, looking up. Beans orbit their rest positions on a 6-unit circle, 90° phase offset each. Mouth flat. Dotted orbit ring fades in 0–200.

### 4.6 `hop` (happy) — 560ms
| t | Body | Beans | Face |
|---|---|---|---|
| 0 | S 1.00 | — | eyes → happy arcs |
| 80 | anticipation S 1.06/0.94 | down 2 | — |
| 200 | stretch S 0.94/1.08, y −24 | IL/IR lag 40ms, OL/OR 80ms, lift 12 | mouth big |
| 280 | apex y −28, S 1.00 | flared up | — |
| 400 | falling y −8, S 0.96/1.04 | — | — |
| 440 | contact S 1.08/0.92, y 0 | — | — |
| 520 | overshoot S 0.98/1.02 | land 40ms later | — |
| 560 | S 1.00 | rest | eyes → calm at 600 |

### 4.7 `jump` (success, bigger) — 720ms
Same structure as hop, apex y −56 at 320ms, beans flare +16, small sparkle at apex, landing squash 1.12/0.88 at 560.

### 4.8 `land` (page transition) — 480ms
Enters from y −80 (opacity 0→1 by 80). Contact at 200: S 1.14/0.84 + shadow widens to 1.3×. 320 rebound 0.96/1.04. 480 rest. Beans land 40/80ms late.

### 4.9 `mood_sleepy` — in 720ms, loop 4000ms
In: eyes close slowly (480), beans drop 3 units (overlapping), mouth flat. Loop: breathe deeper (S 1.02/0.97), "z" letters rise 24 units and fade, staggered 1200ms.

### 4.10 `mood_surprised` — 200ms pop
0 → 80: body S 1.06, eyes → wide, beans spread outward 8 units (all at once) → 200 settle. Hold.

### 4.11 `wink` — 320ms
Right eye closes (80) → hold (160) → opens (240); sparkle pops at 120 (S 0→1.2→1.0 by 280). Smirk mouth during.

### 4.12 `shades_on` — 480ms
Shades drop from y −40 above the eyes (0→240, bounce at 240 with 4% overshoot), body tilts −6° by 320, mouth → smirk at 280.

### 4.13 `chill_lean` — in 480ms
Body rotates 14° around pad bottom (spring-calm), lids half-close at 200, smirk at 280. Beans follow 40/80ms.

### 4.14 `vibing` — loop on a 120 BPM beat (500ms per beat → snap keys to 480/520ms alternating so the 40ms grid holds)
Body bob y −4 on the beat, tilt alternates ±7°, beans bob unevenly (IL, OR on beat; IR, OL off beat), music notes rise every 2 beats.

### 4.15 `flip` (mid-flip easter egg) — 720ms
Anticipation squash 120 → launch on an arc (y −64 at 320) rotating 360° (ease-in-out) → land squash at 560 → settle 720. Spin lines appear 200–480.

### 4.16 Morphs `morph_<from>_<to>` — 720ms (shape-shift)
| t | What happens |
|---|---|
| 0 | Anticipation: body S 1.04/0.96, beans lift 6 |
| 200 | Squash peak S 1.12/0.88 — **swap form groups here** (opacity 0↔1 in 40ms) |
| 320 | New form stretches S 0.96/1.06 |
| 480 | Overshoot S 1.02/0.99 |
| 720 | Rest; beans settle 40/80ms later (into the small-bean arc for non-paw forms) |
Eyes stay in place on the face across the swap (re-positioned to the new form's face anchor by 280).

## 5. The cat hand (`Hand` artboard)

| Timeline | Duration | Notes |
|---|---|---|
| `enter_<edge>` | 480ms | Slides in from the frame edge, overshoot 4%, slight 4° rotation settle |
| `tap` | 240ms | 0 → 120 press: moves 8 toward target, toes squash 6% → 240 return |
| `claws_out` / `claws_in` | 120ms each | Claws scale 0→1 from their base (inside the toe) with 8% overshoot |
| `sketch` | loop 1600ms | Small circular writing motion (path follow), used in the process story |
| `bat` | 480ms | Quick swipe 16° toward target and back (playful), claws out at 120 |
| `exit_<edge>` | 280ms | Ease-in back out of frame |

**Inputs:** `side` (0 fur / 1 beans), `claws` Boolean, `tap`, `bat` Triggers.
**Rule:** the hand and Loaffy are never on screen together (the paw cursor excepted).

## 6. Site choreography

### 6.1 Hero intro (first visit, once per session) — 1200ms total
| t | Element |
|---|---|
| 0–320 | Box drops in from y −40, lands with a 4% squash |
| 240–720 | Loaffy pops up **above** the box (never inside it) with `land` |
| 720–880 | Beans settle; eyes open with a blink at 880 |
| 880–1200 | Headline word "box" highlight wipes in (280); smash sticker + availability sticker stamp in (rotate from 0 to ±3°, scale 1.2→1, 80ms stagger) |
Return visits in the same session: no intro, final frame immediately. Reduced motion: final frame.

### 6.2 Scroll: hero → Selected Work
As the first case card enters (scroll progress 0→1 over 400px), Loaffy plays `morph_paw_window` and the eyes look down toward the card.

### 6.3 Work cards
Hover: card lifts (UI motion), Loaffy peek in the card's form slides up 24px from behind the card's top-right corner (280ms, spring-calm) with `mood_curious` toward the cursor. Leave: slides back (200ms).

### 6.4 Process story (GSAP, see USER-FLOWS.md §5)
| Scroll % | Loaffy / Hand |
|---|---|
| 0–20 | Loaffy `mood_curious`, looks at each sticky note as it appears |
| 20–45 | Loaffy exits; Hand `enter_bottom` + `sketch` while wireframe lines draw |
| 45–70 | Hand `exit_bottom`; Loaffy `land`, then morphs into a button shape (use `form` = window, squashed to button proportions) |
| 70–90 | Loaffy `vibing` while the UI springs alive |
| 90–100 | Loaffy `jump`; "Shipped" sticker stamps |
Scrubbed: timelines are driven by scroll progress (Rive: set timeline time from scroll; or SVG fallback: Motion values from GSAP progress).

### 6.5 Event → reaction map
| Site event | Loaffy |
|---|---|
| Copy email success | `tap` (hop) → mood happy 1600ms → calm |
| Book a chat click | `wink` |
| Hover logo | `wink` (once per 10s) |
| Idle 30s | mood sleepy; any input → calm |
| Click Loaffy | `tap`; 5 clicks within 3s → `flip` |
| Reel playing | pose vibing; paused → none |
| Route change | `land` on the new page's Loaffy |
| 404 | form lost + mood surprised |
| Theme switch | `blink` |

## 7. Integration (coding agent)

### 7.1 Architecture
```
src/components/mascot/
├── Loaffy.tsx            ← public facade: <Loaffy mood pose form size track label decorative />
├── LoaffySVG.tsx         ← SVG renderer (server-renderable first paint, reduced-motion renderer)
├── RiveMascot.tsx        ← existing; extend to accept the inputs below
├── useLoaffyMachine.ts   ← maps props/events → Rive inputs; random blink scheduler; idle timer
├── LoaffyBus.ts          ← tiny event bus: emit("email-copied") from anywhere
└── reactions.ts          ← the §6.5 table as data
```
**Loading strategy:** render `LoaffySVG` on the server (no layout shift, fast LCP). On the client, when the element is in view and the browser is idle, lazy-load `@rive-app/react-canvas` + `/rive/loaffy.riv`, then cross-fade (120ms) from SVG to the Rive canvas. If Rive fails or `prefers-reduced-motion` is on, stay on SVG.

### 7.2 Rive input contract
```ts
type LoaffyInputs = {
  mood: 0|1|2|3|4|5; form: 0|1|2|3|4|5|6|7; pose: 0|1|2|3|4;
  lookX: number; lookY: number; hover: boolean; reduced: boolean;
  triggers: "tap"|"jump"|"land"|"wink"|"flip"|"blink";
};
```
- State machine name: `Loaffy SM`. Artboard: `Loaffy`. Input names exactly as §3.3.
- `lookX/Y`: from pointer position relative to Loaffy's centre, normalised to −100…100, throttled with `requestAnimationFrame`; 0/0 on touch.
- Pause the Rive instance when off-screen (IntersectionObserver) and when the tab is hidden.
- Canvas DPR capped at 2. One Rive instance per visible Loaffy (max 2 on a page).

### 7.3 SVG fallback motion (Motion library)
Implement the same timelines in reduced form with `motion/react` variants on the SVG groups (Body, Beans, Eyes) using the §4 keys: `idle_breathe`, `blink`, `hop`, `land`, `morph`. Use `transform-box: fill-box` and the pivots in §3.2 (halved for the 200 viewBox).

## 8. Exports and budgets

| Output | Spec |
|---|---|
| `public/rive/loaffy.riv` | ≤ 150 KB, one artboard per character, embedded assets none, fonts none |
| `public/rive/hand.riv` | ≤ 80 KB |
| SVG fallbacks | `public/loaffy/*.svg` (from the kit), ≤ 8 KB each |
| Social / Behance | MP4 (H.264) + WebM, 1080×1080 and 1920×1080, 50fps, cream background `#F6F6F3`; GIF 600×600 for README/LinkedIn |
| Naming | `loaffy_<timeline>.mp4`, e.g. `loaffy_hop.mp4` |

## 9. QA checklist

- [ ] Every timeline keyed on the 40ms grid (Rive at 50fps: even frames only).
- [ ] No frame where a bean touches the pad (check each timeline's most squashed frame).
- [ ] Squash/stretch within ±12% body, ±8% beans; volume preserved.
- [ ] Overlapping action present (beans 40/80ms behind the body).
- [ ] Outline readable in Light, Dark, Warm Dark (outline colour input or SVG `currentColor`).
- [ ] Reduced motion: static frames, no loops, no tracking.
- [ ] Rive lazy-loads after LCP; SVG first paint matches Rive's first frame exactly (no jump on swap).
- [ ] CPU: idle Loaffy < 2% CPU on a mid-range laptop; paused when off-screen.
- [ ] Every event in §6.5 fires the right reaction once (no stacking).

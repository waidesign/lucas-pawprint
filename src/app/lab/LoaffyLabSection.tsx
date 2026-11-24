"use client";

import { useMemo, useState } from "react";
import { Loaffy } from "@/components/mascot/Loaffy";
import type { LoaffySize } from "@/components/mascot/LoaffySVG";
import {
  emitLoaffyEvent,
  emitLoaffyMessage,
  emitLoaffyTrigger,
  type Form,
  type LoaffySiteEvent,
  type LoaffyTrigger,
  type Mood,
  type Pose,
} from "@/components/mascot/LoaffyBus";
import { LOAFFY_REACTIONS } from "@/components/mascot/reactions";
import {
  CatHand,
  type CatHandAction,
  type CatHandEdge,
  type CatHandSide,
} from "@/components/mascot/CatHand";
import { HandSketch } from "@/components/mascot/HandSketch";
import { PeekingHand } from "@/components/mascot/PeekingHand";
import { usePawCursor } from "@/components/mascot/PawCursorProvider";
import { useLoaffyOnScreen } from "@/components/mascot/stage";
import {
  computeMinBeanPadGap,
  REST_BEANS,
} from "@/components/mascot/parts/clearance";
import type { ResolvedTheme } from "@/lib/theme";

const EXPRESSIONS: { mood: Mood; refSvg: string; note: string }[] = [
  {
    mood: "calm",
    refSvg: "/loaffy/expressions/calm.svg",
    note: "Tall ovals, slow blink every 4–7s, small smile",
  },
  {
    mood: "curious",
    refSvg: "/loaffy/expressions/curious.svg",
    note: "Eyes shift toward target, whole paw tilts −8°",
  },
  {
    mood: "thinking",
    refSvg: "/loaffy/expressions/thinking.svg",
    note: "Eyes small looking up, flat mouth, dotted orbit",
  },
  {
    mood: "happy",
    refSvg: "/loaffy/expressions/happy.svg",
    note: "Closed arcs ^ ^, big smile, beans hop up 10 units",
  },
  {
    mood: "sleepy",
    refSvg: "/loaffy/expressions/sleepy.svg",
    note: "Closed droopy arcs, flat mouth, beans drop 3 units, z z",
  },
  {
    mood: "surprised",
    refSvg: "/loaffy/expressions/surprised.svg",
    note: "Round wide eyes, small 'o' mouth, beans spread outward",
  },
];

const POSES: { pose: Exclude<Pose, "none">; refSvg: string; note: string }[] = [
  {
    pose: "loaf",
    refSvg: "/loaffy/poses/loaf.svg",
    note: "Squash scale(1.08, 0.92), calm eyes",
  },
  {
    pose: "shades",
    refSvg: "/loaffy/poses/shades.svg",
    note: "Tilt −6°, sunglasses, smirk",
  },
  {
    pose: "chill-lean",
    refSvg: "/loaffy/poses/chill-lean.svg",
    note: "Tilt 14°, half-lidded eyes, smirk",
  },
  {
    pose: "jump",
    refSvg: "/loaffy/poses/jump.svg",
    note: "Stretch scale(0.9, 1.1), lifted 10, beans flared",
  },
  {
    pose: "landing",
    refSvg: "/loaffy/poses/landing.svg",
    note: "Squash scale(1.14, 0.84), wide shadow",
  },
  {
    pose: "wink",
    refSvg: "/loaffy/poses/wink.svg",
    note: "One eye closed, ginger sparkle, smirk",
  },
  {
    pose: "side-eye",
    refSvg: "/loaffy/poses/side-eye.svg",
    note: "Half-lidded looking right, outer left bean raised",
  },
  {
    pose: "vibing",
    refSvg: "/loaffy/poses/vibing.svg",
    note: "Tilt −7°, beans bob unevenly, music notes",
  },
  {
    pose: "mid-flip",
    refSvg: "/loaffy/poses/mid-flip.svg",
    note: "Rotated 160°, surprised face, spin lines",
  },
];

const FORMS: { form: Exclude<Form, "paw">; refSvg: string; section: string }[] =
  [
    {
      form: "paw-3d",
      refSvg: "/loaffy/forms/paw-3d.svg",
      section: "Home (3D shaded inside one outline)",
    },
    {
      form: "window",
      refSvg: "/loaffy/forms/window.svg",
      section: "Web work (Browser window)",
    },
    {
      form: "phone",
      refSvg: "/loaffy/forms/phone.svg",
      section: "App work (Phone)",
    },
    {
      form: "cube",
      refSvg: "/loaffy/forms/cube.svg",
      section: "Design systems (Isometric cube)",
    },
    {
      form: "play",
      refSvg: "/loaffy/forms/play.svg",
      section: "Motion (Play triangle)",
    },
    {
      form: "bubble",
      refSvg: "/loaffy/forms/bubble.svg",
      section: "Contact (Speech bubble)",
    },
    {
      form: "lost",
      refSvg: "/loaffy/forms/lost.svg",
      section: "404 (Scattered beans + '?')",
    },
  ];

const HANDS: { side: CatHandSide; refSvg: string; note: string }[] = [
  {
    side: "fur",
    refSvg: "/loaffy/hand/hand-fur.svg",
    note: "3D shaded Ginger + Ginger-deep tabby stripes + 4 claws",
  },
  {
    side: "beans",
    refSvg: "/loaffy/hand/hand-beans.svg",
    note: "Ginger-light palm + tiny Loaffy palm pad + 4 toe beans + 4 claws",
  },
];

const GALLERY_SIZES: LoaffySize[] = [32, 64, 128, 320];
const THEMES: { id: ResolvedTheme; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "warm-dark", label: "Warm Dark" },
];

const TRIGGERS: LoaffyTrigger[] = [
  "tap",
  "jump",
  "land",
  "wink",
  "flip",
  "blink",
];

const ALL_FORMS: Form[] = [
  "paw",
  "paw-3d",
  "window",
  "phone",
  "cube",
  "play",
  "bubble",
  "lost",
];

export function LoaffyLabSection() {
  const [galleryTheme, setGalleryTheme] = useState<ResolvedTheme | "inherit">(
    "inherit"
  );
  const [stageForm, setStageForm] = useState<Form>("paw");
  const [handClaws, setHandClaws] = useState(true);
  const [handEdge, setHandEdge] = useState<CatHandEdge>("bottom");
  const [handAction, setHandAction] = useState<CatHandAction>("idle");
  const [handPlayKey, setHandPlayKey] = useState(0);
  const [peekActive, setPeekActive] = useState(false);
  const [sketchRun, setSketchRun] = useState(0);
  const loaffyOnScreen = useLoaffyOnScreen();
  const pawCursor = usePawCursor();

  const clearanceChecks = useMemo(
    () => [
      {
        label: "Static rest (min ≥ 9.5)",
        ...computeMinBeanPadGap(REST_BEANS),
        threshold: 9.5,
      },
      {
        label: "idle_breathe exhale S(1.01, 0.985)",
        ...computeMinBeanPadGap(REST_BEANS, {
          bodyScaleX: 1.01,
          bodyScaleY: 0.985,
          beanOffsetY: 1,
        }),
        threshold: 4.0,
      },
      {
        label: "hop anticipation S(1.06, 0.94)",
        ...computeMinBeanPadGap(REST_BEANS, {
          bodyScaleX: 1.06,
          bodyScaleY: 0.94,
          beanOffsetY: 2,
        }),
        threshold: 4.0,
      },
      {
        label: "landing contact S(1.14, 0.84)",
        ...computeMinBeanPadGap(REST_BEANS, {
          bodyScaleX: 1.14,
          bodyScaleY: 0.84,
          beanOffsetY: 4,
        }),
        threshold: 4.0,
      },
      {
        label: "morph squash peak S(1.12, 0.88)",
        ...computeMinBeanPadGap(REST_BEANS, {
          bodyScaleX: 1.12,
          bodyScaleY: 0.88,
          beanOffsetY: -6,
        }),
        threshold: 4.0,
      },
    ],
    []
  );

  const scopedThemeAttr =
    galleryTheme === "inherit" ? undefined : galleryTheme;

  return (
    <section
      aria-labelledby="lab-loaffy-heading"
      data-theme={scopedThemeAttr}
      className="space-y-12 rounded-xl border-2 border-line-strong bg-bg p-6 text-text shadow-sticker md:p-8"
    >
      {/* Header + Gallery Theme Scope Switcher */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-body text-label uppercase text-text-muted">
            08 · Phase 2 — Loaffy, Cat Hand & Paw Cursor
          </p>
          <h2
            id="lab-loaffy-heading"
            className="mt-2 font-display text-h2 text-text"
          >
            Loaffy Character Gallery & Reaction Board
          </h2>
          <p className="mt-2 max-w-2xl font-body text-body text-text-muted">
            Every React component below is paired side-by-side with its ground
            truth SVG from{" "}
            <code className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption">
              /public/loaffy/
            </code>
            . Outlines use{" "}
            <code className="rounded-xs bg-surface-2 px-2 py-1 font-mono text-caption">
              var(--lp-outline)
            </code>{" "}
            so Loaffy stays readable across Light, Dark and Warm Dark.
          </p>
        </div>

        <div
          role="group"
          aria-label="Gallery theme scope"
          className="flex flex-wrap gap-1 rounded-pill border-2 border-line-strong bg-surface p-1 shadow-sticker-sm"
        >
          {(
            [
              { id: "inherit", label: "Follow Page Theme" },
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
              { id: "warm-dark", label: "Warm Dark" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={galleryTheme === t.id}
              onClick={() => setGalleryTheme(t.id)}
              className={`min-h-12 rounded-pill px-4 font-body text-button transition-colors duration-200 ${
                galleryTheme === t.id
                  ? "bg-inverse-bg text-inverse-text"
                  : "bg-transparent text-text hover:bg-surface-2"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Interactive Stage + Reaction Board + Clearance Check */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Live Stage */}
        <div className="flex flex-col items-center justify-between rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm lg:col-span-5">
          <div className="w-full flex items-center justify-between">
            <span className="font-display text-h4 text-text">
              Interactive Stage
            </span>
            <span className="rounded-pill border border-line bg-bg px-3 py-1 font-mono text-caption text-text-muted">
              Click Loaffy (5× → flip)
            </span>
          </div>

          <div className="my-6 flex items-center justify-center rounded-lg border border-line bg-bg p-6">
            <Loaffy
              form={stageForm}
              size={240}
              track
              blink
              listenToBus
              label="Interactive Loaffy stage"
            />
          </div>

          {/* 720ms Morph Switcher */}
          <div className="w-full space-y-2">
            <p className="font-mono text-caption text-text-muted">
              720ms Form Morph (swaps at 200ms squash peak):
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_FORMS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={stageForm === f}
                  onClick={() => {
                    setStageForm(f);
                    emitLoaffyMessage({ kind: "state", form: f });
                  }}
                  className={`min-h-12 rounded-pill border-2 border-line-strong px-3 font-mono text-caption transition-colors duration-200 ${
                    stageForm === f
                      ? "bg-lilac text-on-pastel"
                      : "bg-bg text-text hover:bg-surface-2"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reaction Triggers & Clearance Report */}
        <div className="space-y-6 lg:col-span-7">
          {/* One-shot triggers */}
          <div className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
            <h3 className="font-display text-h4 text-text">
              One-Shot Timelines (40ms Grid)
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {TRIGGERS.map((trig) => (
                <button
                  key={trig}
                  type="button"
                  onClick={() => emitLoaffyTrigger(trig)}
                  className="min-h-12 rounded-pill border-2 border-line-strong bg-butter px-4 font-body text-button text-on-pastel shadow-sticker-sm transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Trigger: {trig}
                </button>
              ))}
            </div>

            <h3 className="mt-6 font-display text-h4 text-text">
              Site Event → Reaction Map (LOAFFY-ANIMATION.md §6.5)
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(Object.keys(LOAFFY_REACTIONS) as LoaffySiteEvent[]).map(
                (evt) => {
                  const spec = LOAFFY_REACTIONS[evt];
                  return (
                    <button
                      key={evt}
                      type="button"
                      onClick={() => emitLoaffyEvent(evt)}
                      className="flex min-h-12 flex-col items-start justify-center rounded-sm border-2 border-line-strong bg-bg px-4 py-2 text-left transition-colors duration-200 hover:bg-surface-2"
                    >
                      <span className="font-mono text-caption font-semibold text-text">
                        emit(&quot;{evt}&quot;)
                      </span>
                      <span className="font-body text-caption text-text-muted">
                        {spec.description}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Bean-to-Pad Clearance Audit & Paw Cursor Controls */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm">
              <h3 className="font-display text-h4 text-text">
                Bean ↔ Pad Clearance Assertion
              </h3>
              <ul className="mt-3 space-y-2 font-mono text-caption">
                {clearanceChecks.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between rounded-xs border border-line bg-bg px-3 py-2"
                  >
                    <span className="text-text-muted">{c.label}</span>
                    <span className="rounded-pill bg-mint px-2 py-0.5 font-semibold text-on-pastel">
                      {c.minGap}u ≥ {c.threshold}u
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm">
              <div>
                <h3 className="font-display text-h4 text-text">
                  Paw Cursor (LOAFFY.md §8)
                </h3>
                <p className="mt-1 font-body text-caption text-text-muted">
                  Hotspots aligned to middle claw tip: default (10, 8), link
                  (12, 7), pressed (13, 8). Auto-off on touch & reduced motion.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  {(
                    [
                      {
                        label: "Default (10,8)",
                        src: "/cursors/cursor-default.svg",
                        hx: 10,
                        hy: 8,
                      },
                      {
                        label: "Link (12,7)",
                        src: "/cursors/cursor-link.svg",
                        hx: 12,
                        hy: 7,
                      },
                      {
                        label: "Pressed (13,8)",
                        src: "/cursors/cursor-pressed.svg",
                        hx: 13,
                        hy: 8,
                      },
                    ] as const
                  ).map((cur) => (
                    <div
                      key={cur.label}
                      className="flex flex-col items-center gap-1 rounded-sm border border-line bg-bg p-2"
                    >
                      <div className="relative h-10 w-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cur.src}
                          alt={cur.label}
                          width={40}
                          height={40}
                        />
                        <span
                          aria-hidden="true"
                          title={`Hotspot (${cur.hx}, ${cur.hy})`}
                          className="pointer-events-none absolute h-2 w-2 -translate-x-1 -translate-y-1 rounded-pill border border-line-strong bg-blush"
                          style={{ left: cur.hx, top: cur.hy }}
                        />
                      </div>
                      <span className="font-mono text-caption text-text-muted">
                        {cur.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={pawCursor.enabled}
                onClick={pawCursor.toggle}
                className="mt-4 min-h-12 w-full rounded-pill border-2 border-line-strong bg-sky px-4 font-body text-button text-on-pastel shadow-sticker-sm"
              >
                Paw cursor: {pawCursor.enabled ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Size Ladder (32 / 64 / 128 / 320) across all 3 themes */}
      <div className="space-y-4">
        <h3 className="font-display text-h3 text-text">
          Sizes (32 · 64 · 128 · 320) across all 3 themes
        </h3>
        <p className="font-body text-body text-text-muted">
          Below 48px (size 32), cheeks, highlight and pen wobble filter turn off
          automatically so small inline/toast icons stay crisp.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {THEMES.map((t) => (
            <div
              key={t.id}
              data-theme={t.id}
              className="rounded-lg border-2 border-line-strong bg-bg p-6 text-text shadow-sticker-sm"
            >
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-display text-h4 text-text">
                  {t.label}
                </span>
                <code className="font-mono text-caption text-text-muted">
                  data-theme=&quot;{t.id}&quot;
                </code>
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-around gap-4">
                {GALLERY_SIZES.map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center rounded-sm border border-line bg-surface p-2">
                      <Loaffy
                        mood="calm"
                        size={sz}
                        track={false}
                        blink={false}
                        listenToBus={false}
                        label={`Loaffy size ${sz} in ${t.label}`}
                      />
                    </div>
                    <code className="font-mono text-caption text-text-muted">
                      {sz}px
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Expressions (6) — Live React vs Reference SVG */}
      <div className="space-y-4">
        <h3 className="font-display text-h3 text-text">
          Expressions (6) — React Component vs Reference SVG
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPRESSIONS.map((item) => (
            <div
              key={item.mood}
              className="rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm"
            >
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="font-display text-h4 capitalize text-text">
                  {item.mood}
                </span>
                <code className="font-mono text-caption text-text-muted">
                  mood=&quot;{item.mood}&quot;
                </code>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-3">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    React &lt;Loaffy&gt;
                  </span>
                  <Loaffy
                    mood={item.mood}
                    size={128}
                    track={false}
                    blink={false}
                    listenToBus={false}
                    showGroundShadow
                  />
                </div>
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-3">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    Reference SVG
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.refSvg}
                    alt={`Reference Loaffy ${item.mood}`}
                    width={128}
                    height={128}
                  />
                </div>
              </div>

              <p className="mt-3 font-body text-caption text-text-muted">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Poses (9) — Live React vs Reference SVG */}
      <div className="space-y-4">
        <h3 className="font-display text-h3 text-text">
          Poses (9) — React Component vs Reference SVG
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSES.map((item) => (
            <div
              key={item.pose}
              className="rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm"
            >
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="font-display text-h4 text-text">
                  {item.pose}
                </span>
                <code className="font-mono text-caption text-text-muted">
                  pose=&quot;{item.pose}&quot;
                </code>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-3">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    React &lt;Loaffy&gt;
                  </span>
                  <Loaffy
                    pose={item.pose}
                    size={128}
                    track={false}
                    blink={false}
                    listenToBus={false}
                    showGroundShadow
                  />
                </div>
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-3">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    Reference SVG
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.refSvg}
                    alt={`Reference Loaffy ${item.pose}`}
                    width={128}
                    height={128}
                  />
                </div>
              </div>

              <p className="mt-3 font-body text-caption text-text-muted">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Shape-Shift Forms (7) — Live React vs Reference SVG */}
      <div className="space-y-4">
        <h3 className="font-display text-h3 text-text">
          Shape-Shift Forms (7) — React Component vs Reference SVG
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FORMS.map((item) => (
            <div
              key={item.form}
              className="rounded-lg border-2 border-line-strong bg-surface p-4 shadow-sticker-sm"
            >
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="font-display text-h4 text-text">
                  {item.form}
                </span>
                <code className="font-mono text-caption text-text-muted">
                  form=&quot;{item.form}&quot;
                </code>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-3">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    React &lt;Loaffy&gt;
                  </span>
                  <Loaffy
                    form={item.form}
                    size={128}
                    track={false}
                    blink={false}
                    listenToBus={false}
                    showGroundShadow
                  />
                </div>
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-3">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    Reference SVG
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.refSvg}
                    alt={`Reference Loaffy ${item.form}`}
                    width={128}
                    height={128}
                  />
                </div>
              </div>

              <p className="mt-3 font-body text-caption text-text-muted">
                {item.section}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Cat Hand (Fur & Beans, Claws, Edge & Action Controls) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-h3 text-text">
              Cat Hand (&lt;CatHand&gt;) — Fur & Bean Sides
            </h3>
            <p className="font-body text-body text-text-muted">
              Four claws in Claw #F7F0E2 grow out of the toe tips (the one
              allowed connection).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setHandClaws((c) => !c)}
              className="min-h-12 rounded-pill border-2 border-line-strong bg-pistachio px-4 font-body text-button text-on-pastel shadow-sticker-sm"
            >
              Claws: {handClaws ? "Out" : "In"}
            </button>

            {(["bottom", "top", "left", "right"] as CatHandEdge[]).map(
              (edge) => (
                <button
                  key={edge}
                  type="button"
                  aria-pressed={handEdge === edge}
                  onClick={() => setHandEdge(edge)}
                  className={`min-h-12 rounded-pill border-2 border-line-strong px-3 font-mono text-caption ${
                    handEdge === edge
                      ? "bg-inverse-bg text-inverse-text"
                      : "bg-surface text-text"
                  }`}
                >
                  from: {edge}
                </button>
              )
            )}

            {(
              ["idle", "enter", "tap", "bat", "sketch", "exit"] as CatHandAction[]
            ).map(
              (act) => (
                <button
                  key={act}
                  type="button"
                  aria-pressed={handAction === act}
                  onClick={() => {
                    setHandAction(act);
                    setHandPlayKey((k) => k + 1);
                  }}
                  className={`min-h-12 rounded-pill border-2 border-line-strong px-3 font-mono text-caption ${
                    handAction === act
                      ? "bg-blush text-on-pastel"
                      : "bg-surface text-text"
                  }`}
                >
                  {act}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {HANDS.map((item) => (
            <div
              key={item.side}
              className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm"
            >
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="font-display text-h4 capitalize text-text">
                  {item.side} side
                </span>
                <code className="font-mono text-caption text-text-muted">
                  side=&quot;{item.side}&quot;
                </code>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-4">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    React &lt;CatHand&gt;
                  </span>
                  <CatHand
                    side={item.side}
                    from={handEdge}
                    claws={handClaws}
                    action={handAction}
                    playKey={handPlayKey}
                    size={160}
                  />
                </div>
                <div className="flex flex-col items-center rounded-sm border border-line bg-bg p-4">
                  <span className="mb-2 font-mono text-caption text-text-muted">
                    Reference SVG
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.refSvg}
                    alt={`Reference CatHand ${item.side}`}
                    width={160}
                    height={160}
                  />
                </div>
              </div>

              <p className="mt-3 font-body text-caption text-text-muted">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {/* Site placements: peek over an edge, and the Shape sketch scene */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="font-display text-h4 text-text">
                &lt;PeekingHand&gt;
              </span>
              <code className="font-mono text-caption text-text-muted">
                Loaffy on screen: {loaffyOnScreen ? "yes (hand waits)" : "no"}
              </code>
            </div>
            <p className="font-body text-caption text-text-muted">
              Case CTA (bat on hover/focus) and DecisionCard (hangs once per
              page). Waits while any Loaffy is on screen, so scroll the gallery
              above out of view to see it.
            </p>
            <div className="flex min-h-40 items-end justify-center pt-12">
              <span className="relative inline-flex">
                <PeekingHand
                  active={peekActive}
                  then="bat"
                  className="bottom-0 right-6 z-0"
                />
                <button
                  type="button"
                  aria-pressed={peekActive}
                  onClick={() => setPeekActive((a) => !a)}
                  className="relative z-10 inline-flex min-h-14 items-center rounded-pill bg-inverse-bg px-6 font-body text-button font-semibold text-inverse-text lp-btn-primary"
                >
                  {peekActive ? "Hand: in (click to exit)" : "Hand: out (click to peek)"}
                </button>
              </span>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="font-display text-h4 text-text">
                &lt;HandSketch&gt;
              </span>
              <button
                type="button"
                onClick={() => setSketchRun((n) => n + 1)}
                className="min-h-12 rounded-pill border-2 border-line-strong bg-sky px-4 font-body text-button text-on-pastel shadow-sticker-sm"
              >
                Replay
              </button>
            </div>
            <p className="font-body text-caption text-text-muted">
              Process &quot;Shape&quot; and /about: enter 480 · draw 720 · hold
              480 · exit 280. Scroll-scrubbed when pinned on Home.
            </p>
            <div className="relative h-36 w-full overflow-hidden rounded-md border-2 border-on-pastel bg-sky">
              <HandSketch key={sketchRun} play handSize={144} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

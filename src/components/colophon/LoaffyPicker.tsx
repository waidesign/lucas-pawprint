"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Loaffy } from "@/components/mascot/Loaffy";
import { LOAFFY_EXPRESSIONS, LOAFFY_POSES } from "@/components/mascot/catalog";
import type { Mood, Pose } from "@/components/mascot/LoaffyBus";
import { cn } from "@/lib/cn";

const LABEL = "font-mono text-label uppercase tracking-wider text-text-muted";

type PoseChoice = Pose; // "none" = standing

const POSE_CHOICES: { value: PoseChoice; label: string }[] = [
  { value: "none", label: "standing" },
  ...LOAFFY_POSES.map((p) => ({ value: p.pose as PoseChoice, label: p.pose })),
];

const MOOD_CHOICES: { value: Mood; label: string }[] = LOAFFY_EXPRESSIONS.map(
  (e) => ({ value: e.mood, label: e.mood }),
);

/** A labelled radio group of chips with roving focus (arrow keys, Home, End). */
function ChipRadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  const labelId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdx = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const move = (to: number) => {
    const next = (to + options.length) % options.length;
    const option = options[next];
    if (!option) return;
    onChange(option.value);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(activeIdx + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(activeIdx - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(options.length - 1);
    }
  };

  return (
    <div className="space-y-3">
      <p id={labelId} className={LABEL}>
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="-mx-1 flex flex-wrap"
      >
        {options.map((option, idx) => {
          const checked = idx === activeIdx;
          return (
            <button
              key={option.value}
              ref={(el) => {
                refs.current[idx] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => onChange(option.value)}
              onKeyDown={onKeyDown}
              className="group inline-flex min-h-12 items-center rounded-pill px-1"
            >
              <span
                className={cn(
                  "inline-flex h-8 items-center whitespace-nowrap rounded-pill border-2 px-3 font-body text-caption font-medium transition-colors",
                  checked
                    ? "border-line-strong bg-inverse-bg text-inverse-text"
                    : "border-line bg-surface text-text group-hover:bg-surface-2",
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * /colophon · Meet Loaffy: one Loaffy on a framed stage (rules 11 and 18b) and two
 * radio groups that change its mood and pose. The note under the stage says what the
 * face and beans are doing (LOAFFY.md §4–5).
 */
export function LoaffyPicker() {
  const [mood, setMood] = useState<Mood>("happy");
  const [pose, setPose] = useState<PoseChoice>("none");

  const moodNote = LOAFFY_EXPRESSIONS.find((e) => e.mood === mood)?.note;
  const poseNote = LOAFFY_POSES.find((p) => p.pose === pose)?.note;
  const poseLabel = pose === "none" ? "standing" : pose;

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <figure className="lg:col-span-5">
        <div className="flex h-96 items-center justify-center overflow-hidden rounded-xl border-2 border-line-strong bg-surface shadow-sticker">
          <Loaffy
            listenToBus={false}
            form="paw"
            mood={mood}
            pose={pose}
            size={240}
            label={`Loaffy, ${mood}, ${poseLabel}`}
          />
        </div>
        <figcaption
          aria-live="polite"
          className="mt-4 space-y-1 font-body text-caption text-text-muted"
        >
          <span className="block">
            <span className="font-mono font-semibold text-text">{mood}</span>
            {moodNote ? ` · ${moodNote}` : ""}
          </span>
          <span className="block">
            <span className="font-mono font-semibold text-text">
              {poseLabel}
            </span>
            {poseNote ? ` · ${poseNote}` : ""}
          </span>
        </figcaption>
      </figure>

      <div className="space-y-8 lg:col-span-7">
        <ChipRadioGroup
          label="Expression"
          options={MOOD_CHOICES}
          value={mood}
          onChange={setMood}
        />
        <ChipRadioGroup
          label="Pose"
          options={POSE_CHOICES}
          value={pose}
          onChange={setPose}
        />

        <ul className="divide-y divide-line border-y border-line font-body text-body text-text-muted">
          <li className="py-4">
            A ginger cat&apos;s pawprint with a face. Calm and curious, with no
            arms and no legs. The face and the beans do all the acting.
          </li>
          <li className="py-4">
            No shapes overlap inside the character. Depth is shaded inside one
            outline, and the beans never touch the pad.
          </li>
          <li className="py-4">
            One character on screen at a time: Loaffy or the cat hand. The paw
            cursor is the only exception.
          </li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DURATION_TOKENS, EASING_TOKENS } from "./foundations-data";

const LABEL = "font-mono text-label uppercase tracking-wider text-text-muted";

function Track({
  running,
  duration,
  easing,
  fillClass,
}: {
  running: boolean;
  duration: string;
  easing: string;
  fillClass: string;
}) {
  return (
    <span className="block h-8 overflow-hidden rounded-pill border border-line bg-bg p-1">
      {/* The wrapper is the travel distance, so translateX(100%) reaches the end. */}
      <span
        aria-hidden="true"
        className="block h-full w-[calc(100%-var(--space-48))] transition-transform motion-reduce:transition-none"
        style={{
          transform: running ? "translateX(100%)" : "translateX(0%)",
          transitionDuration: duration,
          transitionTimingFunction: easing,
        }}
      >
        <span
          className={`block h-full w-12 rounded-pill border-2 border-line-strong ${fillClass}`}
        />
      </span>
    </span>
  );
}

/**
 * /colophon · Motion: the duration ladder (every step a multiple of 40ms) and the
 * easing curves, raced side by side on one button. One framed live demo (rule 18b).
 * Reduced motion: the bars jump to the end with no travel.
 */
export function MotionSpecimen() {
  const [running, setRunning] = useState(false);

  return (
    <div className="rounded-lg border-2 border-line-strong bg-surface p-6 shadow-sticker-sm md:p-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className={LABEL}>Durations · multiples of 40ms</p>
          <ul className="space-y-4">
            {DURATION_TOKENS.map((d) => (
              <li key={d.name} className="space-y-2">
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 font-mono text-caption">
                  <span className="font-semibold text-text">
                    {d.name.replace("--", "")} · {d.ms}
                  </span>
                  <span className="text-text-muted">{d.use}</span>
                </span>
                <Track
                  running={running}
                  duration={`var(${d.name})`}
                  easing="var(--ease-out-soft)"
                  fillClass="bg-pistachio"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <p className={LABEL}>Easing · all at 480ms</p>
          <ul className="space-y-4">
            {EASING_TOKENS.map((e) => (
              <li key={e.name} className="space-y-2">
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 font-mono text-caption">
                  <span className="font-semibold text-text">{e.name}</span>
                  <span className="text-text-muted">{e.use}</span>
                </span>
                <Track
                  running={running}
                  duration="var(--duration-slow)"
                  easing={`var(${e.cssVar})`}
                  fillClass="bg-blush"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <Button
          variant="secondary"
          tone="butter"
          size="md"
          onClick={() => setRunning((r) => !r)}
          iconStart={
            running ? (
              <RotateCcw className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )
          }
        >
          {running ? "Reset the race" : "Run the race"}
        </Button>
      </div>
    </div>
  );
}

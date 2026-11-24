"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/site";

const DAY_MIN = 24 * 60;
const AXIS_TICKS = [0, 3, 6, 9, 12, 15, 18, 21, 24] as const;

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function parseHHMM(hhmm: string, fallbackMin: number): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return fallbackMin;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return fallbackMin;
  return Math.max(0, Math.min(DAY_MIN, h * 60 + m));
}

function getZonedParts(date: Date, timeZone?: string): ZonedParts {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const map: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour) % 24,
    minute: Number(map.minute),
  };
}

/**
 * Computes a timezone's UTC offset in minutes at `date` using only Intl.DateTimeFormat
 * (handles DST and fractional-hour offsets without hard-coded tables).
 */
function getOffsetMinutes(date: Date, timeZone?: string): number {
  const p = getZonedParts(date, timeZone);
  const zonedAsUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  const actualUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
  );
  return Math.round((zonedAsUtc - actualUtc) / 60_000);
}

function formatTime(date: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function formatOffsetLabel(date: Date, timeZone?: string): string {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(date);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}

function formatMinutesHHMM(totalMin: number): string {
  const norm = ((totalMin % DAY_MIN) + DAY_MIN) % DAY_MIN;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function normalizeSegments(
  startMin: number,
  endMin: number,
): [number, number][] {
  const duration = endMin - startMin;
  const s = ((startMin % DAY_MIN) + DAY_MIN) % DAY_MIN;
  if (s + duration <= DAY_MIN) {
    return [[s, s + duration]];
  }
  return [
    [s, DAY_MIN],
    [0, s + duration - DAY_MIN],
  ];
}

function intersectSegments(
  a: [number, number][],
  b: [number, number][],
): [number, number][] {
  const result: [number, number][] = [];
  for (const [aStart, aEnd] of a) {
    for (const [bStart, bEnd] of b) {
      const start = Math.max(aStart, bStart);
      const end = Math.min(aEnd, bEnd);
      if (end > start) {
        result.push([start, end]);
      }
    }
  }
  return result;
}

interface LiveTimezoneState {
  sameOffset: boolean;
  phuketTime: string;
  phuketOffset: string;
  visitorTime: string;
  visitorZone: string;
  visitorOffset: string;
  visitorNowPct: number;
  lucasSegments: [number, number][];
  visitorSegments: [number, number][];
  overlapSegments: [number, number][];
  lucasRangeVisitorText: string;
}

function computeState(now: Date): LiveTimezoneState {
  const { timeZone: phuketTz, start, end } = profile.workingHours;
  const workStartMin = parseHHMM(start, 9 * 60);
  const workEndMin = parseHHMM(end, 18 * 60);

  const visitorZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Local time";
  const phuketOffsetMin = getOffsetMinutes(now, phuketTz);
  const visitorOffsetMin = getOffsetMinutes(now);
  const deltaMin = visitorOffsetMin - phuketOffsetMin;

  const lucasStartVisitor = workStartMin + deltaMin;
  const lucasEndVisitor = workEndMin + deltaMin;

  const lucasSegments = normalizeSegments(lucasStartVisitor, lucasEndVisitor);
  const visitorSegments: [number, number][] = [[workStartMin, workEndMin]];
  const overlapSegments = intersectSegments(lucasSegments, visitorSegments);

  const visitorParts = getZonedParts(now);
  const visitorNowMin = visitorParts.hour * 60 + visitorParts.minute;

  return {
    sameOffset: deltaMin === 0,
    phuketTime: formatTime(now, phuketTz),
    phuketOffset: formatOffsetLabel(now, phuketTz),
    visitorTime: formatTime(now),
    visitorZone,
    visitorOffset: formatOffsetLabel(now),
    visitorNowPct: (visitorNowMin / DAY_MIN) * 100,
    lucasSegments,
    visitorSegments,
    overlapSegments,
    lucasRangeVisitorText: `${formatMinutesHHMM(lucasStartVisitor)}–${formatMinutesHHMM(lucasEndVisitor)}`,
  };
}

/**
 * Live local-time comparison + 24-hour working-hours overlap diagram (LAYOUT-STEPS.md Step 7).
 * - Uses Intl.DateTimeFormat exclusively (no hard-coded UTC offsets, no country list).
 * - Working hours are read from `profile.workingHours` in `src/content/site.ts`.
 * - When the visitor's UTC offset matches Phuket's, shows one clock + "You're on Phuket time too."
 * - Server render & no-JS fallback occupy the same minimum height (`min-h-104`) to prevent CLS.
 * - Pure diagram (hairlines, ticks, pastel bars, ink overlap) — not a card.
 */
export function TimezoneOverlap() {
  const [state, setState] = useState<LiveTimezoneState | null>(null);
  const { timeZone: phuketTz, start, end } = profile.workingHours;
  const hoursRange = `${start}–${end}`;

  useEffect(() => {
    const update = () => setState(computeState(new Date()));
    const initTimer = window.setTimeout(update, 0);

    // Align subsequent updates to the start of each minute
    let intervalId: number | null = null;
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    const alignTimer = window.setTimeout(() => {
      update();
      intervalId = window.setInterval(update, 60_000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(initTimer);
      window.clearTimeout(alignTimer);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, []);

  if (!state) {
    return (
      <div
        data-timezone-state="fallback"
        className="flex min-h-104 flex-col justify-center border-y border-line py-8"
      >
        <p className="font-mono text-label uppercase tracking-wider text-text-muted">
          {profile.location} · {profile.timezone}
        </p>
        <p className="mt-2 max-w-[var(--prose-max)] font-body text-body-lg text-text">
          I work from {profile.location} ({hoursRange} {profile.timezone}). Turn
          on JavaScript to see live local times and today&apos;s meeting overlap
          in your time zone.
        </p>
      </div>
    );
  }

  if (state.sameOffset) {
    return (
      <div
        data-timezone-state="live-same"
        className="flex min-h-104 flex-col justify-center space-y-6 border-y border-line py-8"
      >
        <div className="space-y-2">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Phuket, now
          </p>
          <p className="font-display text-h1 tabular-nums text-text">
            {state.phuketTime}
          </p>
          <p className="font-mono text-caption text-text-muted">
            {phuketTz}
            {state.phuketOffset ? ` · ${state.phuketOffset}` : ""}
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-body text-body-lg font-medium text-text">
            You&apos;re on Phuket time too.
          </p>
          <p className="font-mono text-caption text-text-muted">
            Usual working hours: {hoursRange} local time.
          </p>
        </div>
      </div>
    );
  }

  const overlapLabel =
    state.overlapSegments.length > 0
      ? state.overlapSegments
          .map(
            ([s, e]) =>
              `${formatMinutesHHMM(s)}–${formatMinutesHHMM(e)}`,
          )
          .join(", ")
      : null;

  return (
    <div
      data-timezone-state="live"
      className="min-h-104 space-y-10 border-y border-line py-8"
    >
      {/* Side-by-side live clocks */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Phuket, now
          </p>
          <p className="font-display text-h1 tabular-nums text-text">
            {state.phuketTime}
          </p>
          <p className="font-mono text-caption text-text-muted">
            {phuketTz}
            {state.phuketOffset ? ` · ${state.phuketOffset}` : ""}
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-label uppercase tracking-wider text-text-muted">
            Your time, now
          </p>
          <p className="font-display text-h1 tabular-nums text-text">
            {state.visitorTime}
          </p>
          <p className="font-mono text-caption text-text-muted">
            {state.visitorZone}
            {state.visitorOffset ? ` · ${state.visitorOffset}` : ""}
          </p>
        </div>
      </div>

      {/* 24-hour working-hours diagram */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-caption text-text-muted">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-6 rounded-xs bg-lilac"
              />
              <span>My hours ({hoursRange} Phuket)</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-6 rounded-xs bg-mint"
              />
              <span>Your hours ({hoursRange} local)</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-6 rounded-xs bg-inverse-bg"
              />
              <span>Overlap</span>
            </span>
          </div>
          <span>24-hour track · your time</span>
        </div>

        <div
          role="img"
          aria-label={
            overlapLabel
              ? `24-hour time-zone overlap diagram. Best time to meet: ${overlapLabel} your time.`
              : `24-hour time-zone diagram. My working hours are ${state.lucasRangeVisitorText} in your local time.`
          }
          className="space-y-3"
        >
          {/* Bars container with subtle now-line */}
          <div className="relative space-y-2 py-2">
            {/* Current local time hairline indicator */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-10 w-px bg-line-strong"
              style={{ left: `${state.visitorNowPct}%` }}
            />

            {/* Lane 1: Lucas's working hours in visitor's local day */}
            <div className="relative h-4 w-full overflow-hidden rounded-xs bg-surface-2">
              {state.lucasSegments.map(([startSeg, endSeg], i) => (
                <div
                  key={`lucas-${i}`}
                  className="absolute inset-y-0 rounded-xs bg-lilac"
                  style={{
                    left: `${(startSeg / DAY_MIN) * 100}%`,
                    width: `${((endSeg - startSeg) / DAY_MIN) * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Lane 2: Visitor's working hours */}
            <div className="relative h-4 w-full overflow-hidden rounded-xs bg-surface-2">
              {state.visitorSegments.map(([startSeg, endSeg], i) => (
                <div
                  key={`visitor-${i}`}
                  className="absolute inset-y-0 rounded-xs bg-mint"
                  style={{
                    left: `${(startSeg / DAY_MIN) * 100}%`,
                    width: `${((endSeg - startSeg) / DAY_MIN) * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Lane 3: Overlap marked in ink */}
            {state.overlapSegments.length > 0 && (
              <div className="relative h-2 w-full overflow-hidden rounded-xs bg-surface-2">
                {state.overlapSegments.map(([startSeg, endSeg], i) => (
                  <div
                    key={`overlap-${i}`}
                    className="absolute inset-y-0 rounded-xs bg-inverse-bg"
                    style={{
                      left: `${(startSeg / DAY_MIN) * 100}%`,
                      width: `${((endSeg - startSeg) / DAY_MIN) * 100}%`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hairline axis with ticks every 3 hours */}
          <div className="relative border-t border-line pt-2">
            <div className="flex items-center justify-between font-mono text-caption tabular-nums text-text-muted">
              {AXIS_TICKS.map((hour) => (
                <span key={hour} className="relative">
                  {String(hour).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-2 font-body text-body-lg font-medium text-text">
          {overlapLabel
            ? `Best time to meet: ${overlapLabel} your time`
            : `No ${hoursRange} overlap today — my workday is ${state.lucasRangeVisitorText} your time.`}
        </p>
      </div>
    </div>
  );
}

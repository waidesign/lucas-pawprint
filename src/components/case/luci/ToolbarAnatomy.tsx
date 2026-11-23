"use client";

import "./luci.css";
import {
  Crosshair,
  Type,
  Palette,
  Ruler,
  ShoppingBasket,
  MessageSquarePlus,
  SlidersHorizontal,
} from "lucide-react";

const ANATOMY_TOOLS = [
  {
    name: "Capture",
    note: "Pick one component or section",
    Icon: Crosshair,
    active: true,
  },
  {
    name: "Text",
    note: "Inspect live type roles",
    Icon: Type,
    active: false,
  },
  {
    name: "Colour",
    note: "Measure role palettes",
    Icon: Palette,
    active: false,
  },
  {
    name: "Spacing",
    note: "Read gaps, padding & grid",
    Icon: Ruler,
    active: false,
  },
  {
    name: "Basket",
    note: "Collect across pages",
    Icon: ShoppingBasket,
    active: false,
  },
  {
    name: "Feedback",
    note: "Pin notes for your agent",
    Icon: MessageSquarePlus,
    active: false,
  },
  {
    name: "Settings",
    note: "Units & colour formats",
    Icon: SlidersHorizontal,
    active: false,
  },
] as const;

/**
 * ToolbarAnatomy (V4 in CASE-LUCI.md §4 §5):
 * - Large, centred toolbar inside `.luci-brand-frame`, with each of the 7 tools
 *   labelled with a leader line: Capture · Text · Colour · Spacing · Basket · Feedback · Settings.
 */
export function ToolbarAnatomy() {
  return (
    <figure
      role="img"
      aria-label="Luci toolbar anatomy showing all 7 tools with leader lines: Capture, Text, Colour, Spacing, Basket, Feedback, and Settings."
      className="luci-brand-frame my-8 overflow-x-auto rounded-xl border-2 border-line-strong p-6 shadow-sticker md:p-10"
      style={{
        backgroundColor: "var(--luci-surface)",
        color: "var(--luci-ink)",
      }}
    >
      <div className="mx-auto flex min-w-max flex-col items-center">
        {/* Top row: 7 tool labels with vertical leader lines down into the toolbar pill */}
        <div className="grid grid-cols-7 gap-3 px-4">
          {ANATOMY_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="flex w-28 flex-col items-center text-center"
            >
              <span className="font-display text-h4 font-bold">
                {tool.name}
              </span>
              <span className="mt-1 font-body text-caption opacity-80">
                {tool.note}
              </span>
              {/* Leader line + dot */}
              <div
                aria-hidden="true"
                className="mt-3 flex flex-col items-center"
              >
                <span
                  className="h-2 w-2 rounded-pill"
                  style={{ backgroundColor: "var(--luci-accent-deep)" }}
                />
                <span
                  className="h-8 w-0.5"
                  style={{ backgroundColor: "var(--luci-ink)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Centred large Luci toolbar pill */}
        <div
          className="grid grid-cols-7 gap-3 rounded-pill border-2 border-line-strong px-4 py-3 shadow-sticker"
          style={{
            backgroundColor: "var(--luci-ink)",
            color: "var(--luci-surface)",
          }}
        >
          {ANATOMY_TOOLS.map(({ name, Icon, active }) => (
            <div
              key={name}
              className="flex w-28 items-center justify-center gap-2 rounded-pill px-3 py-2.5 font-mono text-caption font-semibold"
              style={
                active
                  ? {
                      backgroundColor: "var(--luci-accent)",
                      color: "var(--luci-ink)",
                    }
                  : undefined
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

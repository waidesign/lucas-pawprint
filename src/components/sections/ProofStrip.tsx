"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { legacySkills } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { TOOL_LOGOS } from "./ToolLogos";

function TicketStub({
  label,
  toneClass,
}: {
  label: string;
  toneClass: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-xs border-2 border-on-pastel px-3 font-mono text-label uppercase tracking-wider text-on-pastel",
        toneClass
      )}
    >
      <span>{label}</span>
    </span>
  );
}

/**
 * Skills & Tools Ticket Strip (`#proof`), no background of its own: it sits on the
 * page background, so all text/borders use theme tokens (`text-text`, `border-text/*`)
 * and pass AA in Light, Dark, Warm Dark and System.
 * - Row 1: Dot-free skill pills (`[P1-A6]` — no decorative dots in badges).
 * - Row 2: Vector Tool Logos (`[P1-A5]` — visual SVG logos instead of plain text).
 * - Left/right edge blurs inside the frame (`lp-ticker-edge`: ink tint + backdrop blur).
 * - Pauses on hover/focus; static accessible wrap under `prefers-reduced-motion`.
 */
export function ProofStrip() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section
      id="proof"
      aria-label="Skills and tools ticket strip"
      className="lp-ticker-group relative overflow-x-clip py-12 text-text md:py-16"
    >
      {prefersReduced ? (
        <div className="space-y-6 px-4 md:px-10 lg:px-20">
          <div className="space-y-3">
            <TicketStub label="Skills" toneClass="bg-mint" />
            <ul className="flex flex-wrap gap-2">
              {legacySkills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex h-10 items-center rounded-pill border border-text/25 px-4 font-body text-caption font-medium text-text"
                >
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 border-t border-text/15 pt-4">
            <TicketStub label="Tools" toneClass="bg-butter" />
            <ul className="flex flex-wrap items-center gap-3">
              {TOOL_LOGOS.map((tool) => (
                <li key={tool.id}>
                  {tool.href ? (
                    <Link
                      href={tool.href}
                      aria-label={`${tool.name} — Read case study`}
                      title={tool.name}
                      onClick={() =>
                        trackEvent("luci_click", { location: "proof_strip" })
                      }
                      className="inline-flex h-12 items-center justify-center rounded-md border border-text/20 px-4 text-text transition-all hover:-translate-y-1 hover:bg-surface"
                    >
                      {tool.renderLogo()}
                    </Link>
                  ) : (
                    <span
                      role="img"
                      aria-label={tool.name}
                      title={tool.name}
                      className="inline-flex h-12 w-14 items-center justify-center rounded-md border border-text/20 text-text"
                    >
                      {tool.renderLogo()}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="-mx-6 -rotate-2 space-y-2 py-2">
          {/* Row 1: Skills Ticket Strip (dot-free pills per [P1-A6], scrolls left) */}
          <div className="relative flex w-full overflow-hidden py-2">
            <div className="lp-ticker-track-left flex w-max items-center gap-3 pr-3">
              {[0, 1].map((copyIdx) => (
                <ul
                  key={copyIdx}
                  aria-hidden={copyIdx === 1 ? "true" : undefined}
                  className="flex shrink-0 items-center gap-3"
                >
                  <li className="shrink-0">
                    <TicketStub label="Skills" toneClass="bg-mint" />
                  </li>
                  {legacySkills.map((skill) => (
                    <li
                      key={`${copyIdx}-${skill}`}
                      className="inline-flex h-10 shrink-0 items-center rounded-pill border border-text/20 px-4 font-body text-body font-medium text-text"
                    >
                      <span className="whitespace-nowrap">{skill}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Perforated ticket divider */}
          <div
            aria-hidden="true"
            className="mx-4 border-t border-dashed border-text/20 md:mx-10 lg:mx-20"
          />

          {/* Row 2: Tool Logos Strip ([P1-A5], py-2 prevents top clipping on hover:-translate-y-1 [P1-A3]) */}
          <div className="relative flex w-full overflow-hidden py-2">
            <div className="lp-ticker-track-right flex w-max items-center gap-4 pr-4">
              {[0, 1].map((copyIdx) => (
                <ul
                  key={copyIdx}
                  aria-hidden={copyIdx === 1 ? "true" : undefined}
                  className="flex shrink-0 items-center gap-4"
                >
                  <li className="shrink-0">
                    <TicketStub label="Tools" toneClass="bg-butter" />
                  </li>
                  {TOOL_LOGOS.map((tool) => {
                    if (tool.href) {
                      return (
                        <li key={`${copyIdx}-${tool.id}`} className="shrink-0">
                          <Link
                            href={tool.href}
                            tabIndex={copyIdx === 1 ? -1 : undefined}
                            aria-hidden={copyIdx === 1 ? "true" : undefined}
                            aria-label={
                              copyIdx === 0
                                ? `${tool.name} — Read case study`
                                : undefined
                            }
                            title={tool.name}
                            onClick={() =>
                              trackEvent("luci_click", {
                                location: "proof_strip",
                              })
                            }
                            className="inline-flex h-12 items-center justify-center rounded-md border border-text/20 px-4 text-text transition-all hover:-translate-y-1 hover:bg-surface"
                          >
                            {tool.renderLogo()}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={`${copyIdx}-${tool.id}`} className="shrink-0">
                        <span
                          role={copyIdx === 0 ? "img" : undefined}
                          aria-label={copyIdx === 0 ? tool.name : undefined}
                          title={tool.name}
                          className={cn(
                            "group/logo relative inline-flex h-12 items-center justify-center rounded-md border border-text/20 text-text transition-transform hover:-translate-y-1",
                            tool.href ? "px-4" : "w-14 px-3"
                          )}
                        >
                          {tool.renderLogo()}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Left/right edge blurs, inside the frame, over both ticker rows */}
      {!prefersReduced && (
        <>
          <div aria-hidden="true" className="lp-ticker-edge lp-ticker-edge-left" />
          <div aria-hidden="true" className="lp-ticker-edge lp-ticker-edge-right" />
        </>
      )}
    </section>
  );
}

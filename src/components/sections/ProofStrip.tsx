"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { legacySkills, legacyTools } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const PASTEL_DOT_CLASSES = [
  "bg-lilac",
  "bg-mint",
  "bg-butter",
  "bg-sky",
  "bg-blush",
  "bg-pistachio",
] as const;

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
        "inline-flex h-8 shrink-0 items-center gap-2 rounded-xs border-2 border-on-pastel px-3 font-mono text-label uppercase tracking-wider text-on-pastel",
        toneClass
      )}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-pill bg-on-pastel"
      />
      <span>{label}</span>
    </span>
  );
}

/**
 * Skills & Tools Ticket Strip (`#proof`) on Ink ("Black", `#2B2B2B` via `bg-on-pastel`)
 * replacing the previous text strip per UI feedback [P1-A1]:
 * - Uses exact skills and tools from Lucas's legacy portfolio (`docs/legacy/skillsAndTools.ts`).
 * - Dual counter-scrolling ticket marquee rows (pauses on hover/focus; static wrap under `prefers-reduced-motion`).
 * - Pure tokens only (`bg-on-pastel` = `#2B2B2B` across Light, Dark & Warm Dark; `text-inverse-text dark:text-text` = Cloud `#F6F6F3`/`#F6EFE6` for >12.5:1 AAA contrast).
 */
export function ProofStrip() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section
      id="proof"
      aria-label="Skills and tools ticket strip"
      className="lp-ticker-group w-full overflow-hidden border-y-2 border-line-strong bg-on-pastel py-6 text-inverse-text dark:text-text"
    >
      {prefersReduced ? (
        /* Reduced-motion accessible static layout (respects 80px desktop horizontal padding) */
        <div className="space-y-6 px-4 md:px-10 lg:px-20">
          <div className="space-y-3">
            <TicketStub label="Skills Ticket" toneClass="bg-mint" />
            <ul className="flex flex-wrap gap-2">
              {legacySkills.map((skill, idx) => (
                <li
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-pill border border-inverse-text/25 px-3 py-1 font-mono text-caption text-inverse-text dark:border-text/25 dark:text-text"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2 rounded-pill",
                      PASTEL_DOT_CLASSES[idx % PASTEL_DOT_CLASSES.length]
                    )}
                  />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 border-t border-inverse-text/15 pt-4 dark:border-text/15">
            <TicketStub label="Tools Ticket" toneClass="bg-butter" />
            <ul className="flex flex-wrap gap-2">
              {legacyTools.map((tool, idx) => {
                const isLuci = tool.startsWith("Luci");
                return (
                  <li key={tool}>
                    {isLuci ? (
                      <Link
                        href="/work/luci"
                        onClick={() =>
                          trackEvent("luci_click", { location: "proof_strip" })
                        }
                        className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-on-pastel bg-lilac px-4 py-1 font-mono text-caption font-bold text-on-pastel"
                      >
                        <span>{tool}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-pill border border-inverse-text/25 px-3 py-1 font-mono text-caption text-inverse-text dark:border-text/25 dark:text-text">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-2 w-2 rounded-pill",
                            PASTEL_DOT_CLASSES[idx % PASTEL_DOT_CLASSES.length]
                          )}
                        />
                        <span>{tool}</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        /* Animated dual-track ticket strip */
        <div className="space-y-4">
          {/* Row 1: Skills Ticket Strip (scrolls left) */}
          <div className="relative flex w-full overflow-hidden">
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
                  {legacySkills.map((skill, idx) => (
                    <li
                      key={`${copyIdx}-${skill}`}
                      className="inline-flex h-10 shrink-0 items-center gap-3 rounded-pill border border-inverse-text/20 px-4 font-body text-body font-medium text-inverse-text dark:border-text/20 dark:text-text"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-2 w-2 shrink-0 rounded-pill",
                          PASTEL_DOT_CLASSES[idx % PASTEL_DOT_CLASSES.length]
                        )}
                      />
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
            className="mx-4 border-t border-dashed border-inverse-text/20 md:mx-10 lg:mx-20 dark:border-text/20"
          />

          {/* Row 2: Tools Ticket Strip (scrolls right) */}
          <div className="relative flex w-full overflow-hidden">
            <div className="lp-ticker-track-right flex w-max items-center gap-3 pr-3">
              {[0, 1].map((copyIdx) => (
                <ul
                  key={copyIdx}
                  aria-hidden={copyIdx === 1 ? "true" : undefined}
                  className="flex shrink-0 items-center gap-3"
                >
                  <li className="shrink-0">
                    <TicketStub label="Tools" toneClass="bg-butter" />
                  </li>
                  {legacyTools.map((tool, idx) => {
                    const isLuci = tool.startsWith("Luci");
                    if (isLuci && copyIdx === 0) {
                      return (
                        <li key={`${copyIdx}-${tool}`} className="shrink-0">
                          <Link
                            href="/work/luci"
                            onClick={() =>
                              trackEvent("luci_click", {
                                location: "proof_strip",
                              })
                            }
                            className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-on-pastel bg-lilac px-4 font-mono text-caption font-bold text-on-pastel transition-transform hover:-translate-y-1"
                          >
                            <span className="whitespace-nowrap">{tool}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={`${copyIdx}-${tool}`}
                        className={cn(
                          "inline-flex h-10 shrink-0 items-center gap-3 rounded-pill px-4 font-mono text-caption font-semibold",
                          isLuci
                            ? "border-2 border-on-pastel bg-lilac text-on-pastel"
                            : "border border-inverse-text/25 text-inverse-text dark:border-text/25 dark:text-text"
                        )}
                      >
                        {!isLuci && (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-2 w-2 shrink-0 rounded-pill",
                              PASTEL_DOT_CLASSES[
                                (idx + 2) % PASTEL_DOT_CLASSES.length
                              ]
                            )}
                          />
                        )}
                        <span className="whitespace-nowrap">
                          {isLuci ? `${tool} →` : tool}
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
    </section>
  );
}

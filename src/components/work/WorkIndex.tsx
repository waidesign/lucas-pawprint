"use client";

import { useEffect, useMemo, useState } from "react";
import type { CaseStudySummary } from "@/lib/case-studies";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { Loaffy } from "@/components/mascot/Loaffy";
import { CaseCard } from "@/components/sections/CaseCard";
import { COVER_TILTS, WORK_FILTER_TAGS } from "@/components/sections/SelectedWork";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export interface WorkIndexProps {
  caseStudies: CaseStudySummary[];
}

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
] as const;

function countWord(n: number, capitalize = false): string {
  const base = NUMBER_WORDS[n] ?? String(n);
  return capitalize ? base.charAt(0).toUpperCase() + base.slice(1) : base;
}

/**
 * Card-free `/work` index (LAYOUT-STEPS.md Step 4 & IA.md §3 Work index):
 * - Hero with mono eyebrow, h1 "Work.", data-driven count subtitle, filter chips synced
 *   to `?tag=` + polite aria-live result count, and a curious Loaffy peeking from
 *   the hero's right edge at `lg+` (the page's only Loaffy; per-card peeks are off).
 * - Featured Luci row (7/5 split) followed by a hairline + "Client work · {n}" label
 *   and a 2-column grid of cover tiles (`CaseCard variant="tile"`).
 * - Empty filter state: plain line + "Show all" text button (no card).
 */
export function WorkIndex({ caseStudies }: WorkIndexProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const rawTag = params.get("tag")?.trim();
      if (!rawTag) {
        setSelectedTag("All");
        return;
      }
      const matched = WORK_FILTER_TAGS.find(
        (t) => t.toLowerCase() === rawTag.toLowerCase(),
      );
      if (matched) {
        setSelectedTag(matched);
      } else {
        setSelectedTag("All");
        const url = new URL(window.location.href);
        url.searchParams.delete("tag");
        window.history.replaceState({}, "", url.toString());
      }
    };
    const timer = window.setTimeout(syncFromUrl, 0);
    window.addEventListener("popstate", syncFromUrl);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, []);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tag === "All") {
        url.searchParams.delete("tag");
      } else {
        url.searchParams.set("tag", tag.toLowerCase());
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const totalCount = caseStudies.length;
  const foundedCount = caseStudies.filter((c) => c.metadata.featured).length;
  const clientTotalCount = Math.max(0, totalCount - foundedCount);

  const years = caseStudies
    .map((c) => Number.parseInt(c.metadata.year, 10))
    .filter((y) => Number.isFinite(y));
  const minYear = years.length > 0 ? Math.min(...years) : null;
  const maxYear = years.length > 0 ? Math.max(...years) : null;
  const yearRangeLabel =
    minYear !== null && maxYear !== null
      ? minYear === maxYear
        ? `Case studies · ${minYear}`
        : `Case studies · ${minYear}–${maxYear}`
      : null;

  const filtered = useMemo(() => {
    if (selectedTag === "All") return caseStudies;
    return caseStudies.filter((c) =>
      c.metadata.tags.some(
        (t) => t.toLowerCase() === selectedTag.toLowerCase(),
      ),
    );
  }, [caseStudies, selectedTag]);

  const featuredCase = filtered.find((c) => c.metadata.featured);
  const clientCases = filtered.filter((c) => !c.metadata.featured);

  return (
    <Section id="work" labelledBy="work-heading" tone="bg">
      <div className="space-y-16">
        {/* 1. Page Hero + Filter Bar + Hero Loaffy (lg+, page's only Loaffy) */}
        <div className="relative overflow-x-clip">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-9">
              {yearRangeLabel && (
                <HeroReveal step={0} variant="eyebrow">
                  <p className="font-mono text-label uppercase tracking-wider text-text-muted">
                    {yearRangeLabel}
                  </p>
                </HeroReveal>
              )}

              <HeroReveal step={1} variant="heading">
                <Heading id="work-heading" as="h1">
                  Work.
                </Heading>
              </HeroReveal>

              <HeroReveal step={2} variant="body">
                <p className="max-w-2xl font-body text-body-lg text-text-muted">
                  {countWord(totalCount, true)}{" "}
                  {totalCount === 1 ? "project" : "projects"}:{" "}
                  {countWord(foundedCount)} I founded,{" "}
                  {countWord(clientTotalCount)} I shipped for clients.
                </p>
              </HeroReveal>

              <HeroReveal step={3} variant="body" className="space-y-3 pt-2">
                <div
                  role="group"
                  aria-label="Filter case studies by category"
                  className="flex flex-wrap items-center gap-1"
                >
                  {WORK_FILTER_TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      as="button"
                      selected={
                        selectedTag.toLowerCase() === tag.toLowerCase()
                      }
                      onClick={() => handleSelectTag(tag)}
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>

                <p
                  aria-live="polite"
                  className="font-mono text-caption text-text-muted"
                >
                  Showing {filtered.length}{" "}
                  {filtered.length === 1 ? "case study" : "case studies"}
                  {selectedTag !== "All" ? ` in "${selectedTag}"` : ""}
                </p>
              </HeroReveal>
            </div>

            {/* Curious Loaffy at the hero's right edge (lg+ only) */}
            <HeroReveal
              step={2}
              variant="mascot"
              className="hidden justify-end lg:col-span-3 lg:flex"
            >
              <Loaffy
                mood="curious"
                size={240}
                track
                blink
                listenToBus={false}
                showGroundShadow
                label="Loaffy, curious about the work"
              />
            </HeroReveal>
          </div>
        </div>

        {/* 2. Empty Filter State (plain text + Show all button, no card) */}
        {filtered.length === 0 && (
          <div className="space-y-4 border-t border-line py-12">
            <p className="font-display text-h3 text-text">
              Nothing here yet. Try another filter.
            </p>
            <button
              type="button"
              onClick={() => handleSelectTag("All")}
              className="inline-flex min-h-12 items-center font-body text-button font-semibold text-text underline decoration-2 underline-offset-4 transition-colors hover:text-text-muted"
            >
              Show all
            </button>
          </div>
        )}

        {/* 3. Featured Row (Luci, 7/5 split, peek off) */}
        {featuredCase && (
          <div className="space-y-8 border-t border-line pt-12">
            <h2 className="sr-only">Featured project</h2>
            <p className="font-mono text-label uppercase tracking-wider text-text-muted">
              Own product · Lead case study
            </p>
            <FadeIn delay={0} yOffset={16}>
              <CaseCard
                slug={featuredCase.slug}
                title={featuredCase.metadata.title}
                summary={featuredCase.metadata.summary}
                tags={featuredCase.metadata.tags}
                tone={featuredCase.metadata.tone}
                cover={featuredCase.metadata.cover}
                coverAlt={featuredCase.metadata.coverAlt}
                liveUrl={featuredCase.metadata.liveUrl}
                featured
                badge={featuredCase.metadata.badge}
                year={featuredCase.metadata.year}
                role={featuredCase.metadata.role}
                peek={false}
                variant="row"
                split="7/5"
                tilt={COVER_TILTS[0]}
              />
            </FadeIn>
          </div>
        )}

        {/* 4. Client Work (hairline + mono label + 2-col cover tiles) */}
        {clientCases.length > 0 && (
          <div className="space-y-12 border-t border-line pt-12">
            <h2 className="sr-only">Client work</h2>
            <p className="font-mono text-label uppercase tracking-wider text-text-muted">
              Client work · {clientCases.length}
            </p>

            <div
              id="work-client-grid"
              className="grid grid-cols-1 gap-x-16 gap-y-24 lg:grid-cols-2"
            >
              {clientCases.map((item, idx) => (
                <FadeIn
                  key={item.slug}
                  delay={Math.min(idx, 5) * 0.04}
                  yOffset={16}
                >
                  <CaseCard
                    slug={item.slug}
                    title={item.metadata.title}
                    summary={item.metadata.summary}
                    tags={item.metadata.tags}
                    tone={item.metadata.tone}
                    cover={item.metadata.cover}
                    coverAlt={item.metadata.coverAlt}
                    liveUrl={item.metadata.liveUrl}
                    badge={item.metadata.badge}
                    year={item.metadata.year}
                    role={item.metadata.role}
                    peek={false}
                    variant="tile"
                    tilt={COVER_TILTS[(idx + 1) % COVER_TILTS.length]}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

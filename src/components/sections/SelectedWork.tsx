"use client";

import { useEffect, useMemo, useState } from "react";
import type { CaseStudySummary } from "@/lib/case-studies";
import { FadeIn } from "@/components/motion/FadeIn";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { CaseCard } from "./CaseCard";

export const WORK_FILTER_TAGS = [
  "All",
  "Own product",
  "Web",
  "Apps",
  "Design systems",
  "E-commerce",
  "AI workflow",
] as const;

export interface SelectedWorkProps {
  caseStudies: CaseStudySummary[];
  /** Render the section heading as h1 on `/work` vs h2 on Home */
  headingLevel?: "h1" | "h2";
  /** Sync active tag filter with `?tag=` in the browser URL on `/work` */
  syncUrlQuery?: boolean;
  /** Show the tag filter chips + result count (hidden on Home for now) */
  showFilters?: boolean;
}

export function SelectedWork({
  caseStudies,
  headingLevel = "h2",
  syncUrlQuery = false,
  showFilters = true,
}: SelectedWorkProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    if (!syncUrlQuery || typeof window === "undefined") return;
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tagParam = params.get("tag");
      const matched = tagParam
        ? WORK_FILTER_TAGS.find(
            (t) => t.toLowerCase() === tagParam.toLowerCase(),
          )
        : "All";
      if (matched) {
        setSelectedTag(matched);
      }
    };
    const timer = window.setTimeout(syncFromUrl, 0);
    window.addEventListener("popstate", syncFromUrl);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, [syncUrlQuery]);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    if (syncUrlQuery && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tag === "All") {
        url.searchParams.delete("tag");
      } else {
        url.searchParams.set("tag", tag.toLowerCase());
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const filtered = useMemo(() => {
    if (selectedTag === "All") return caseStudies;
    return caseStudies.filter((c) =>
      c.metadata.tags.some(
        (t) => t.toLowerCase() === selectedTag.toLowerCase(),
      ),
    );
  }, [caseStudies, selectedTag]);

  const orderedCases = [
    ...filtered.filter((c) => c.metadata.featured),
    ...filtered.filter((c) => !c.metadata.featured),
  ];

  return (
    <Section id="work" labelledBy="work-heading" tone="bg">
      <div className="space-y-6 md:space-y-8">
        {/* Giant section word + filter chips */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Heading id="work-heading" as={headingLevel}>
              Work.
            </Heading>
            <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
              My own product first, followed by client platforms I designed
              across automotive data, SaaS, e-commerce and hospitality.
            </p>
          </div>

          {showFilters && (
            <div className="space-y-2">
              <div
                role="group"
                aria-label="Filter case studies by category"
                className="flex flex-wrap items-center gap-1"
              >
                {WORK_FILTER_TAGS.map((tag) => (
                  <Chip
                    key={tag}
                    as="button"
                    selected={selectedTag === tag}
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
            </div>
          )}
        </div>

        {/* Empty filter state (BRAND.md §4) */}
        {filtered.length === 0 && (
          <div className="rounded-xl border-2 border-line-strong bg-surface p-12 text-center shadow-sticker-sm">
            <p className="font-display text-h3 text-text">
              Nothing here yet. Try another filter.
            </p>
          </div>
        )}

        {/* Case study rows (slush.app-inspired): thumbnail card + plain-on-canvas copy,
            featured (Luci) first, thumbnails alternating left / right on large screens. */}
        {orderedCases.length > 0 && (
          <div className="space-y-16 pt-4 md:space-y-24 md:pt-8 lg:space-y-40 lg:pt-16">
            {orderedCases.map((item, idx) => {
              const isFeatured = Boolean(item.metadata.featured);
              return (
                <FadeIn key={item.slug} delay={0}>
                  <CaseCard
                    slug={item.slug}
                    title={item.metadata.title}
                    summary={item.metadata.summary}
                    tags={item.metadata.tags}
                    tone={item.metadata.tone}
                    cover={item.metadata.cover}
                    coverAlt={item.metadata.coverAlt}
                    form={item.metadata.form}
                    liveUrl={item.metadata.liveUrl}
                    featured={isFeatured}
                    badge={
                      isFeatured && item.metadata.visibility === "full"
                        ? "Live"
                        : item.metadata.badge
                    }
                    year={item.metadata.year}
                    role={item.metadata.role}
                    reverse={idx % 2 === 1}
                  />
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

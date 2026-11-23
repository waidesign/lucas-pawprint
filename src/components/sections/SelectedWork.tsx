"use client";

import { useMemo, useState } from "react";
import type { CaseStudySummary } from "@/lib/case-studies";
import { stagger } from "@/lib/motion";
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
}

export function SelectedWork({ caseStudies }: SelectedWorkProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selectedTag === "All") return caseStudies;
    return caseStudies.filter((c) =>
      c.metadata.tags.some(
        (t) => t.toLowerCase() === selectedTag.toLowerCase()
      )
    );
  }, [caseStudies, selectedTag]);

  const featuredCase = filtered.find((c) => c.metadata.featured);
  const standardCases = filtered.filter((c) => !c.metadata.featured);

  return (
    <Section id="work" labelledBy="work-heading" tone="bg">
      <div className="space-y-8">
        {/* Giant section word + filter chips */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Heading id="work-heading" as="h2" size="display-xl">
              Work.
            </Heading>
            <p className="mt-2 max-w-xl font-body text-body-lg text-text-muted">
              My own product first, followed by client platforms I designed across
              automotive data, SaaS, e-commerce and hospitality.
            </p>
          </div>

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
                  onClick={() => setSelectedTag(tag)}
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
        </div>

        {/* Empty filter state (BRAND.md §4) */}
        {filtered.length === 0 && (
          <div className="rounded-xl border-2 border-line-strong bg-surface p-12 text-center shadow-sticker-sm">
            <p className="font-display text-h3 text-text">
              Nothing here yet. Try another filter.
            </p>
          </div>
        )}

        {/* Featured first card (Luci) */}
        {featuredCase && (
          <FadeIn delay={0}>
            <CaseCard
              slug={featuredCase.slug}
              title={featuredCase.metadata.title}
              summary={featuredCase.metadata.summary}
              tags={featuredCase.metadata.tags}
              tone={featuredCase.metadata.tone}
              cover={featuredCase.metadata.cover}
              coverAlt={featuredCase.metadata.coverAlt}
              form={featuredCase.metadata.form}
              liveUrl={featuredCase.metadata.liveUrl}
              featured
              badge={featuredCase.metadata.badge}
              year={featuredCase.metadata.year}
              role={featuredCase.metadata.role}
            />
          </FadeIn>
        )}

        {/* 6 Client case studies in 2-column grid */}
        {standardCases.length > 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {standardCases.map((item, idx) => (
              <FadeIn key={item.slug} delay={Math.min(idx + 1, 5) * stagger}>
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
                  featured={false}
                  badge={item.metadata.badge}
                  year={item.metadata.year}
                  role={item.metadata.role}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

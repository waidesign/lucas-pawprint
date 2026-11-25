"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCaseStudy } from "@/components/case/CaseStudyContext";

export interface MetaItem {
  label: string;
  value: string;
  href?: string;
}

export interface MetaRowProps {
  items?: MetaItem[];
  role?: string;
  team?: string;
  timeline?: string;
  platforms?: string[];
  tools?: string[];
  status?: string;
  licence?: string;
  liveUrl?: string;
  className?: string;
}

/**
 * Semantic definition list (`<dl>`) for case study metadata per COMPONENTS.md §E.
 * Can be given explicit `items` / fields or automatically read from `CaseStudyContext`.
 */
export function MetaRow({
  items,
  role,
  team,
  timeline,
  platforms,
  tools,
  status,
  licence,
  liveUrl,
  className,
}: MetaRowProps) {
  const ctx = useCaseStudy();
  const meta = ctx?.metadata;

  const resolvedItems: MetaItem[] =
    items ??
    [
      { label: "Role", value: role ?? meta?.role ?? "" },
      ...(team || meta?.team
        ? [{ label: "Team", value: team ?? meta?.team ?? "" }]
        : []),
      ...(timeline || meta?.timeline
        ? [{ label: "Timeline", value: timeline ?? meta?.timeline ?? "" }]
        : []),
      {
        label: "Platform",
        value: (platforms ?? meta?.platforms ?? []).join(" + "),
      },
      ...(status
        ? [{ label: "Status", value: status }]
        : meta?.badge
          ? [{ label: "Status", value: meta.badge }]
          : []),
      ...(licence ? [{ label: "Licence", value: licence }] : []),
      ...(tools || meta?.tools
        ? [
            {
              label: "Tools",
              value: (tools ?? meta?.tools ?? []).join(" · "),
            },
          ]
        : []),
      ...(liveUrl || meta?.liveUrl
        ? [
            {
              label: "Live",
              value: (liveUrl ?? meta?.liveUrl ?? "").replace(
                /^https?:\/\//,
                "",
              ),
              href: liveUrl ?? meta?.liveUrl,
            },
          ]
        : []),
    ].filter((item) => item.value.trim().length > 0);

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-6 border-b border-t-2 border-b-line border-t-line-strong py-6 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {resolvedItems.map((item) => (
        <div key={item.label} className="min-w-0 space-y-1">
          <dt className="font-mono text-label uppercase tracking-wider text-text-muted">
            {item.label}
          </dt>
          <dd className="min-w-0 break-words font-body text-body font-medium text-text">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full flex-wrap items-center gap-1 break-all underline decoration-2 underline-offset-4 hover:text-text-muted"
              >
                <span>{item.value}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

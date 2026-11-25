import { cn } from "@/lib/cn";
import { CursorToggle } from "@/components/ui/CursorToggle";
import { SectionSeam } from "@/components/ui/SectionSeam";
import { TextLink } from "@/components/ui/TextLink";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { PRIMARY_NAV_ITEMS, SOCIAL_LINKS } from "@/content/site";
import { BackToTopButton } from "./BackToTopButton";
import { FooterBoxSignOff } from "./FooterBoxSignOff";
import { Wordmark } from "./Wordmark";

export interface SiteFooterProps {
  navLabel?: string;
  className?: string;
}

const FOOTER_NAV_ITEMS = [
  ...PRIMARY_NAV_ITEMS,
  { label: "Colophon & design system", href: "/colophon" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

export function SiteFooter({
  navLabel = "Footer navigation",
  className,
}: SiteFooterProps) {
  return (
    <>
      <SectionSeam from="bg" to="pistachio" seed={53} />
      <footer
        className={cn(
          "overflow-hidden bg-pistachio-soft px-4 pt-12 text-text md:px-10 md:pt-16 lg:px-20",
          className
        )}
      >
      <div className="w-full space-y-12 pb-6 md:pb-8">
        {/* Top row: Wordmark, Navigation & Socials */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <Wordmark />
            <p className="max-w-sm font-body text-body text-text">
              Built with full-agentic-workflow &amp; tools powered by Luci and
              Human.
            </p>
          </div>

          <nav aria-label={navLabel} className="md:col-span-4">
            <p className="font-body text-label uppercase text-text-muted">
              Explore
            </p>
            <ul className="mt-4 space-y-3">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <TextLink
                    href={item.href}
                    external={"external" in item ? item.external : false}
                    tone="pistachio"
                  >
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-body text-label uppercase text-text-muted">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <TextLink href={s.href} external tone="mint">
                    {s.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle row: ThemeSwitch (full) + CursorToggle + Back to top ([P3-A1]) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <ThemeSwitch variant="segmented" />
          <div className="flex flex-wrap items-center gap-3">
            <CursorToggle />
            <BackToTopButton />
          </div>
        </div>

        {/* Bottom row: copyright on left, Pawprint & Luci links on right */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-body text-body text-text-muted md:text-caption">
          <span>© 2026 Lucas (Wai Phyo Aung)</span>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span>
              Part of Pawprint ·{" "}
              <TextLink
                href="https://pawprint.design"
                external
                tone="lilac"
                className="text-body md:text-caption"
              >
                pawprint.design
              </TextLink>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Founder of{" "}
              <TextLink
                href="https://luci.pawprint.design"
                external
                tone="butter"
                className="text-body md:text-caption"
              >
                Luci (Open source)
              </TextLink>
            </span>
          </div>
        </div>
      </div>

      {/* Monumental cropped sign-off with animated Box burst ([P3-A2]) */}
      <FooterBoxSignOff />
    </footer>
    </>
  );
}

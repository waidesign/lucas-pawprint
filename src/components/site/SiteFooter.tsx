import { cn } from "@/lib/cn";
import { CursorToggle } from "@/components/ui/CursorToggle";
import { TextLink } from "@/components/ui/TextLink";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { PRIMARY_NAV_ITEMS, SOCIAL_LINKS } from "@/content/site";
import { Wordmark } from "./Wordmark";

export interface SiteFooterProps {
  className?: string;
}

const FOOTER_NAV_ITEMS = [
  ...PRIMARY_NAV_ITEMS,
  { label: "Colophon", href: "/colophon" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "mt-4 w-full rounded-xl border-2 border-line-strong bg-pistachio-soft px-4 py-12 text-text md:mt-6 md:rounded-2xl md:px-10 md:py-16 lg:px-20",
        className
      )}
    >
      <div className="w-full space-y-12">
        {/* Top row: Wordmark, Navigation & Socials */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <Wordmark />
            <p className="font-body text-body text-text-muted">
              Curious by nature, careful by habit.
            </p>
            <p className="font-body text-body text-text">
              Made with care in Phuket, Thailand.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-4">
            <p className="font-body text-label uppercase text-text-muted">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
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

        {/* Middle row: ThemeSwitch (full) + CursorToggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <ThemeSwitch variant="segmented" />
          <CursorToggle />
        </div>

        {/* Bottom row: Pawprint umbrella, Luci link, copyright & colophon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-body text-caption text-text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Lucas (Wai Phyo Aung)</span>
            <span aria-hidden="true">·</span>
            <span>
              Part of Pawprint ·{" "}
              <TextLink
                href="https://pawprint.design"
                external
                tone="lilac"
                className="text-caption"
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
                className="text-caption"
              >
                Luci (Private beta)
              </TextLink>
            </span>
          </div>

          <TextLink href="/colophon" tone="sky" className="text-caption">
            Colophon & design system →
          </TextLink>
        </div>
      </div>
    </footer>
  );
}

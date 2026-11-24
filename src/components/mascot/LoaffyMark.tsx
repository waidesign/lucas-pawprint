import { REST_BEANS } from "./parts/clearance";
import { Bean, Eyes, Pad } from "./parts";
import { cn } from "@/lib/cn";

/**
 * Favicon-level Loaffy mark (LOAFFY.md §3: pad + 4 beans + eyes only). It's a logo,
 * not the character: used for avatars and stickers, so it doesn't count toward
 * "one character on screen". Outlines are ink (it always sits on a pastel).
 */
export function LoaffyMarkShape() {
  return (
    <g style={{ color: "var(--color-on-pastel)" }}>
      <Pad />
      {REST_BEANS.map((bean) => (
        <Bean key={bean.id} bean={bean} />
      ))}
      <Eyes variant="calm" />
    </g>
  );
}

export function LoaffyMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="14 40 172 148"
      aria-hidden="true"
      className={cn("block h-auto w-6", className)}
    >
      <LoaffyMarkShape />
    </svg>
  );
}

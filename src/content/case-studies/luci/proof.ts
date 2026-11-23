/**
 * Real proof data for /work/luci (CASE-LUCI.md §6 & §4 V7).
 * From Luci exports Lucas made on 2026-11-23 (`docs/pawprint-kit/06-references/*.design.md`).
 * These are the ONLY numbers allowed on `/work/luci`.
 */

export interface LuciCaptureProof {
  site: string;
  sections: number | "1 capture";
  componentKinds: number;
}

export interface LuciA11yFinding {
  label: string;
  measured: string;
  verdict: "Fails AA" | "Fails AA (needs 24 × 24)" | "AAA";
}

export const LUCI_CAPTURES: readonly LuciCaptureProof[] = [
  { site: "family.co", sections: 16, componentKinds: 5 },
  { site: "tocaboca.com", sections: 12, componentKinds: 4 },
  { site: "atoms.dev", sections: 3, componentKinds: 7 },
  { site: "deno.com", sections: 4, componentKinds: 8 },
  { site: "dice.fm", sections: 9, componentKinds: 5 },
  { site: "slush.app", sections: 9, componentKinds: 5 },
  { site: "ko-fi.com", sections: "1 capture", componentKinds: 7 },
  { site: "mindmarket.com", sections: "1 capture", componentKinds: 6 },
] as const;

export const LUCI_A11Y_FINDINGS: readonly LuciA11yFinding[] = [
  {
    label: "Footer text on a fintech homepage",
    measured: "1.71:1 contrast",
    verdict: "Fails AA",
  },
  {
    label: "Primary button on an AI builder homepage",
    measured: "4.26:1 contrast",
    verdict: "Fails AA",
  },
  {
    label: "Card label on a developer-platform homepage",
    measured: "2.12:1 contrast",
    verdict: "Fails AA",
  },
  {
    label: "Carousel dots on a wallet homepage",
    measured: "10.66 × 10.66px target",
    verdict: "Fails AA (needs 24 × 24)",
  },
  {
    label: "Navigation on a kids' games homepage",
    measured: "18.98:1 contrast",
    verdict: "AAA",
  },
] as const;

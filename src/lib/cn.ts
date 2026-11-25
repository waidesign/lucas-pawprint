import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "label",
            "caption",
            "button",
            "menu-link-sm",
            "menu-link-md",
            "menu-link-lg",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "bg",
            "surface",
            "surface-2",
            "line",
            "line-strong",
            "text",
            "text-muted",
            "text-subtle",
            "inverse-bg",
            "inverse-text",
            "on-pastel",
          ],
        },
      ],
      shadow: [{ shadow: ["sticker-sm", "sticker", "sticker-lg"] }],
      rounded: [{ rounded: ["xs", "sm", "md", "lg", "xl", "2xl", "pill"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}

export type Tone =
  | "lilac"
  | "mint"
  | "butter"
  | "sky"
  | "blush"
  | "pistachio";

export const TONE_BG_CLASSES: Record<Tone, string> = {
  lilac: "bg-lilac text-on-pastel",
  mint: "bg-mint text-on-pastel",
  butter: "bg-butter text-on-pastel",
  sky: "bg-sky text-on-pastel",
  blush: "bg-blush text-on-pastel",
  pistachio: "bg-pistachio text-on-pastel",
};

export const TONE_SOFT_BG_CLASSES: Record<Tone, string> = {
  lilac: "bg-lilac-soft text-text",
  mint: "bg-mint-soft text-text",
  butter: "bg-butter-soft text-text",
  sky: "bg-sky-soft text-text",
  blush: "bg-blush-soft text-text",
  pistachio: "bg-pistachio-soft text-text",
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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

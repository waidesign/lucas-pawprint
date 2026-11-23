import { z } from "zod";

export const TONE_VALUES = [
  "lilac",
  "mint",
  "butter",
  "sky",
  "blush",
  "pistachio",
] as const;

export const FORM_VALUES = [
  "paw",
  "paw-3d",
  "window",
  "phone",
  "cube",
  "play",
  "bubble",
  "lost",
] as const;

const BANNED_CLAIM_REGEX =
  /\+\s*(?:150|180|200|300)\s*%|\b(?:150|180|200|300)%\s*(?:increase|uplift|sales|growth|surge)/i;

function assertNoBannedClaims(
  text: string,
  ctx: z.RefinementCtx,
  field: string
) {
  if (BANNED_CLAIM_REGEX.test(text)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Unverified sales/percentage claim detected in ${field}: "${text}". Per AGENTS.md §4.6, remove banned claims.`,
    });
  }
}

export const ctaActionSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const caseStudyCtaSchema = z.object({
  teaser: ctaActionSchema,
  full: ctaActionSchema,
});

export const caseStudyMetadataSchema = z
  .object({
    title: z.string().min(1),
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
    order: z.number().int().positive(),
    featured: z.boolean(),
    status: z.enum(["published", "draft", "beta"]),
    visibility: z.enum(["teaser", "full"]),
    badge: z.string().optional(),
    client: z.string().min(1),
    summary: z.string().min(1),
    year: z.string().min(1),
    role: z.string().min(1),
    team: z.string().min(1),
    timeline: z.string().min(1),
    platforms: z.array(z.string().min(1)).min(1),
    industry: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    tools: z.array(z.string().min(1)).min(1),
    tone: z.enum(TONE_VALUES),
    form: z.enum(FORM_VALUES),
    cover: z.string().min(1),
    coverAlt: z.string().min(1),
    liveUrl: z.string().url().optional(),
    cta: caseStudyCtaSchema.optional(),
    tldr: z.object({
      problem: z.string().min(1),
      whatIDid: z.string().min(1),
      outcome: z.string().min(1),
    }),
    seo: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  })
  .superRefine((val, ctx) => {
    assertNoBannedClaims(val.summary, ctx, "summary");
    assertNoBannedClaims(val.tldr.problem, ctx, "tldr.problem");
    assertNoBannedClaims(val.tldr.whatIDid, ctx, "tldr.whatIDid");
    assertNoBannedClaims(val.tldr.outcome, ctx, "tldr.outcome");
    assertNoBannedClaims(val.seo.description, ctx, "seo.description");
  });

export type CaseStudyCtaAction = z.infer<typeof ctaActionSchema>;
export type CaseStudyCta = z.infer<typeof caseStudyCtaSchema>;
export type CaseStudyMetadata = z.infer<typeof caseStudyMetadataSchema>;

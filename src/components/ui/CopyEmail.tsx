"use client";

import { useId, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import { Field } from "./Field";
import { Input } from "./Input";
import { useToast } from "./Toast";
import {
  emitLoaffyEvent,
  emitLoaffyMessage,
} from "@/components/mascot/LoaffyBus";
import { trackEvent } from "@/lib/analytics";

export interface CopyEmailProps {
  email?: string;
  className?: string;
}

/**
 * Pre-filled, read-only email Field + icon-only Copy button ([P1-A6], [P1-A7]):
 * - Uses the design-system Field + Input primitives (`readOnly`, non-editable, select-all).
 * - Pairs with a 48×48 icon-only mint sticker Copy button (swaps to Check when copied).
 */
export function CopyEmail({
  email = "lucas@pawprint.design",
  className,
}: CopyEmailProps) {
  const { showToast } = useToast();
  const inputId = useId();
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasCopiedOnHoverRef = useRef(false);

  const selectFallbackText = () => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  };

  const handleCopy = async () => {
    hasCopiedOnHoverRef.current = true;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    emitLoaffyMessage({ kind: "state", pose: "none" });

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFailed(false);
      trackEvent("email_copy", { email });
      emitLoaffyEvent("email-copied");
      showToast({
        message: "Copied. Loaffy's waiting by the inbox.",
        tone: "mint",
        mood: "happy",
      });
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setFailed(true);
      selectFallbackText();
      showToast({
        message: `Couldn't copy. Here it is: ${email}`,
        tone: "blush",
        mood: "surprised",
      });
    }
  };

  // LOAFFY.md §5: "Side-eye: Hovering the email but not copying"
  const handleMouseEnter = () => {
    hasCopiedOnHoverRef.current = false;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (!hasCopiedOnHoverRef.current) {
        emitLoaffyMessage({ kind: "state", pose: "side-eye" });
      }
    }, 1200);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!hasCopiedOnHoverRef.current) {
      emitLoaffyMessage({ kind: "state", pose: "none" });
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-flex max-w-full flex-col gap-2", className)}
    >
      <div className="flex items-center gap-3">
        <Field
          htmlFor={inputId}
          label="Email address"
          hideLabel
          className="min-w-0 flex-1"
        >
          <Input
            ref={inputRef}
            id={inputId}
            type="email"
            value={email}
            readOnly
            shape="pill"
            inputSize="md"
            aria-readonly="true"
            onClick={(e) => e.currentTarget.select()}
            className="w-64 max-w-full"
          />
        </Field>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Email copied" : `Copy ${email}`}
          title={copied ? "Copied" : "Copy email"}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong bg-mint text-on-pastel lp-sticker-sm-interactive"
        >
          {copied ? (
            <Check className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Copy className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {failed && (
        <p className="font-body text-caption text-text-muted">
          Couldn&apos;t copy. Here it is: {email}
        </p>
      )}
    </div>
  );
}

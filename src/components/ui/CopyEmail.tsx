"use client";

import { useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
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

export function CopyEmail({
  email = "lucas@pawprint.design",
  className,
}: CopyEmailProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const emailSpanRef = useRef<HTMLSpanElement | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasCopiedOnHoverRef = useRef(false);

  const selectFallbackText = () => {
    const el = emailSpanRef.current;
    if (!el || typeof window === "undefined") return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
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
      className={cn("inline-flex flex-wrap items-center gap-3", className)}
    >
      <div className="inline-flex min-h-12 items-center rounded-pill border-2 border-line-strong bg-surface px-5 font-body text-body text-text shadow-sticker-sm">
        <span ref={emailSpanRef} className="select-all font-medium">
          {email}
        </span>
      </div>

      <Button
        variant="secondary"
        tone="mint"
        size="md"
        onClick={handleCopy}
        iconStart={
          copied ? (
            <Check className="h-5 w-5" />
          ) : (
            <Copy className="h-5 w-5" />
          )
        }
      >
        {copied ? "Copied" : "Copy email"}
      </Button>

      <IconButton
        href={`mailto:${email}`}
        variant="surface"
        aria-label={`Send email to ${email}`}
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
      </IconButton>

      {failed && (
        <p className="w-full font-body text-caption text-text-muted">
          Couldn&apos;t copy. Here it is: {email}
        </p>
      )}
    </div>
  );
}

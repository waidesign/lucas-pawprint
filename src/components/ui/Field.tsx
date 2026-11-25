import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FieldProps {
  /** Matches the child control's `id` */
  htmlFor: string;
  label: string;
  /** Optional sr-only label when the surrounding layout provides visible context */
  hideLabel?: boolean;
  /** Optional helper text shown beneath the control */
  hint?: string;
  /** Optional validation error message (announced via role="alert") */
  error?: string;
  /** Mark field as required */
  required?: boolean;
  /** Optional ID for hint/error so callers can wire `aria-describedby` */
  descriptionId?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Field wrapper primitive: pairs a semantic `<label>`, form control (`Input` / `Textarea`),
 * optional helper hint, and accessible validation error message on the 4/8 grid.
 */
export function Field({
  htmlFor,
  label,
  hideLabel = false,
  hint,
  error,
  required = false,
  descriptionId,
  children,
  className,
}: FieldProps) {
  const messageId = descriptionId ?? `${htmlFor}-description`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          hideLabel
            ? "sr-only"
            : "font-mono text-label uppercase tracking-wider text-text-muted",
        )}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-error">
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p
          id={messageId}
          role="alert"
          className="font-body text-caption font-medium text-error"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="font-body text-caption text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

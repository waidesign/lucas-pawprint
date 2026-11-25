import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type InputSize = "md" | "lg";
export type InputShape = "rounded" | "pill";

export type InputProps = {
  /** Control height on the 4/8 grid: md = 48px, lg = 56px */
  inputSize?: InputSize;
  /** Corner geometry: rounded (form fields) or pill (compact inline fields) */
  shape?: InputShape;
  /** Visual & semantic error state */
  invalid?: boolean;
  /** Optional leading icon rendered inside the field */
  iconStart?: ReactNode;
  /** Optional trailing element rendered inside the field */
  iconEnd?: ReactNode;
  wrapperClassName?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "size">;

const SIZE_CLASSES: Record<InputSize, string> = {
  md: "min-h-12 text-body",
  lg: "min-h-14 text-body-lg",
};

const SHAPE_CLASSES: Record<InputShape, string> = {
  rounded: "rounded-md",
  pill: "rounded-pill",
};

/**
 * Input primitive (design-system form control):
 * - 2px pen border (`border-line-strong`), 48px/56px min height on the 4/8 grid,
 *   flat sticker shadow (`shadow-sticker-sm`), visible `:focus-visible` ring.
 * - Supports `readOnly` (non-editable pre-filled field on `bg-surface` with clean selection),
 *   `invalid` (`border-error` + `aria-invalid`), and `disabled` (`opacity-50`).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    inputSize = "md",
    shape = "rounded",
    invalid = false,
    readOnly = false,
    disabled = false,
    iconStart,
    iconEnd,
    wrapperClassName,
    className,
    ...props
  },
  ref,
) {
  const hasAffix = Boolean(iconStart || iconEnd);

  const baseFieldClasses = cn(
    "w-full border-2 font-body font-medium text-text shadow-sticker-sm transition-colors duration-160",
    "placeholder:text-text-subtle",
    "focus-visible:outline-[var(--focus-width)] focus-visible:outline-offset-[var(--focus-offset)] focus-visible:outline-focus",
    SIZE_CLASSES[inputSize],
    SHAPE_CLASSES[shape],
    invalid ? "border-error" : "border-line-strong",
    readOnly ? "cursor-default bg-surface select-all" : "bg-bg",
    disabled && "cursor-not-allowed opacity-50 shadow-none",
  );

  if (!hasAffix) {
    return (
      <input
        ref={ref}
        readOnly={readOnly}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          baseFieldClasses,
          shape === "pill" ? "px-5" : "px-4",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center",
        wrapperClassName,
      )}
    >
      {iconStart && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 inline-flex items-center text-text-muted"
        >
          {iconStart}
        </span>
      )}
      <input
        ref={ref}
        readOnly={readOnly}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          baseFieldClasses,
          iconStart ? "pl-12" : shape === "pill" ? "pl-5" : "pl-4",
          iconEnd ? "pr-12" : shape === "pill" ? "pr-5" : "pr-4",
          className,
        )}
        {...props}
      />
      {iconEnd && (
        <span className="absolute right-3 inline-flex items-center text-text-muted">
          {iconEnd}
        </span>
      )}
    </div>
  );
});

export type TextareaProps = {
  invalid?: boolean;
} & ComponentPropsWithoutRef<"textarea">;

/**
 * Textarea primitive matching Input tokens (2px pen border, sticker shadow, 4/8 grid).
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { invalid = false, readOnly = false, disabled = false, className, ...props },
    ref,
  ) {
    return (
      <textarea
        ref={ref}
        readOnly={readOnly}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "min-h-32 w-full rounded-md border-2 px-4 py-3 font-body text-body text-text shadow-sticker-sm transition-colors duration-160",
          "placeholder:text-text-subtle",
          "focus-visible:outline-[var(--focus-width)] focus-visible:outline-offset-[var(--focus-offset)] focus-visible:outline-focus",
          invalid ? "border-error" : "border-line-strong",
          readOnly ? "cursor-default bg-surface" : "bg-bg",
          disabled && "cursor-not-allowed opacity-50 shadow-none",
          className,
        )}
        {...props}
      />
    );
  },
);

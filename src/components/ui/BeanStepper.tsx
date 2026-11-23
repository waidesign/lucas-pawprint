import { cn } from "@/lib/cn";

export interface BeanStepperProps {
  steps: string[];
  /** Zero-based index of the current active step */
  current: number;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (index: number) => void;
  className?: string;
}

export function BeanStepper({
  steps,
  current,
  orientation = "horizontal",
  onStepClick,
  className,
}: BeanStepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <nav aria-label="Progress steps" className={cn("inline-flex", className)}>
      <ol
        className={cn(
          "flex",
          isVertical ? "flex-col gap-0" : "flex-row flex-wrap items-center gap-0"
        )}
      >
        {steps.map((step, index) => {
          const isDone = index < current;
          const isCurrent = index === current;

          const beanStateClasses = isCurrent
            ? "bg-mint text-on-pastel ring-2 ring-line-strong ring-offset-2 ring-offset-bg"
            : isDone
            ? "bg-mint text-on-pastel"
            : "bg-surface text-text-muted";

          const stepInner = (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-6 w-5 shrink-0 items-center justify-center rounded-pill border-2 border-line-strong font-mono text-caption font-semibold transition-all",
                  beanStateClasses
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "font-body text-body",
                  isCurrent
                    ? "font-semibold text-text"
                    : isDone
                    ? "text-text"
                    : "text-text-muted"
                )}
              >
                {step}
              </span>
            </>
          );

          return (
            <li
              key={step}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex items-center",
                isVertical ? "flex-col items-start" : "flex-row"
              )}
            >
              {onStepClick ? (
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className="inline-flex min-h-12 items-center gap-3 rounded-pill px-3 hover:bg-surface-2"
                >
                  {stepInner}
                </button>
              ) : (
                <div className="inline-flex min-h-12 items-center gap-3 px-2">
                  {stepInner}
                </div>
              )}

              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "bg-line-strong",
                    isVertical ? "ml-5 h-6 w-0.5" : "mx-2 h-0.5 w-8"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

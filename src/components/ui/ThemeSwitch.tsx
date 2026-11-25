"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { Coffee, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { springCalm } from "@/lib/motion";
import { useTheme, type ThemePreference } from "@/lib/theme";
import { trackEvent } from "@/lib/analytics";
import { IconButton } from "./IconButton";

export interface ThemeSwitchProps {
  variant?: "segmented" | "compact";
  className?: string;
}

const THEME_OPTIONS: {
  id: ThemePreference;
  label: string;
  Icon: typeof Sun;
}[] = [
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "warm-dark", label: "Warm Dark", Icon: Coffee },
  { id: "system", label: "System", Icon: Monitor },
];

export function ThemeSwitch({
  variant = "segmented",
  className,
}: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const prefersReduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const pillId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;

    const activeIdx = Math.max(
      0,
      THEME_OPTIONS.findIndex((o) => o.id === theme)
    );
    radioRefs.current[activeIdx]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, theme]);

  const handleRadioKeyDown = (
    e: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % THEME_OPTIONS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = THEME_OPTIONS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const targetOption = THEME_OPTIONS[nextIndex];
      if (targetOption) {
        setTheme(targetOption.id);
        radioRefs.current[nextIndex]?.focus();
      }
    }
  };

  if (variant === "compact") {
    const ActiveIcon =
      THEME_OPTIONS.find((o) => o.id === theme)?.Icon ?? Monitor;

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
      >
        <IconButton
          aria-label={`Theme: ${theme}. Activate to change theme`}
          aria-expanded={open}
          aria-controls={popoverId}
          aria-haspopup="true"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ActiveIcon className="h-5 w-5" aria-hidden="true" />
        </IconButton>

        {open && (
          <div
            id={popoverId}
            role="radiogroup"
            aria-label="Theme preference"
            style={{ zIndex: "var(--z-overlay)" }}
            className="absolute right-0 top-full mt-2 w-48 rounded-lg border-2 border-line-strong bg-surface p-2 shadow-sticker"
          >
            {THEME_OPTIONS.map(({ id, label, Icon }, idx) => {
              const active = theme === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    radioRefs.current[idx] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onKeyDown={(e) => handleRadioKeyDown(e, idx)}
                  onClick={() => {
                    setTheme(id);
                    trackEvent("theme_change", { theme: id });
                    setOpen(false);
                  }}
                  className={cn(
                    "relative z-0 flex min-h-12 w-full items-center gap-3 rounded-pill px-4 font-body text-button transition-colors duration-160",
                    active
                      ? "text-inverse-text"
                      : "bg-transparent text-text hover:bg-surface-2"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`theme-compact-pill-${pillId}`}
                      aria-hidden="true"
                      transition={prefersReduced ? { duration: 0 } : springCalm}
                      className="absolute inset-0 -z-10 rounded-pill bg-inverse-bg"
                    />
                  )}
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className={cn(
        "relative inline-flex flex-nowrap items-center gap-1 rounded-pill border-2 border-line-strong bg-surface p-1 shadow-sticker-sm md:flex-wrap",
        className
      )}
    >
      {THEME_OPTIONS.map(({ id, label, Icon }, idx) => {
        const active = theme === id;
        return (
          <button
            key={id}
            ref={(el) => {
              radioRefs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-label={label}
            aria-checked={active}
            title={label}
            tabIndex={active ? 0 : -1}
            onKeyDown={(e) => handleRadioKeyDown(e, idx)}
            onClick={() => {
              setTheme(id);
              trackEvent("theme_change", { theme: id });
            }}
            className={cn(
              "relative z-0 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-pill px-0 font-body text-button transition-colors duration-160 md:min-w-0 md:px-4",
              active
                ? "text-inverse-text"
                : "bg-transparent text-text hover:bg-surface-2"
            )}
          >
            {active && (
              <motion.span
                layoutId={`theme-segmented-pill-${pillId}`}
                aria-hidden="true"
                transition={prefersReduced ? { duration: 0 } : springCalm}
                className="absolute inset-0 -z-10 rounded-pill bg-inverse-bg"
              />
            )}
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden md:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

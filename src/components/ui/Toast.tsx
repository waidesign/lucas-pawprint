"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn, TONE_BG_CLASSES, type Tone } from "@/lib/cn";
import { Loaffy } from "@/components/mascot/Loaffy";
import type { Mood } from "@/components/mascot/LoaffyBus";

export interface ToastPayload {
  id?: number;
  message: string;
  tone?: Tone;
  withLoaffy?: boolean;
  mood?: Mood;
  durationMs?: number;
}

export interface ToastContextValue {
  toast: ToastPayload | null;
  showToast: (payload: ToastPayload | string) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_TOAST_DURATION_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seqRef = useRef(0);

  const dismissToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  const showToast = useCallback((payload: ToastPayload | string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    seqRef.current += 1;

    const normalized: ToastPayload =
      typeof payload === "string"
        ? {
            id: seqRef.current,
            message: payload,
            tone: "mint",
            withLoaffy: true,
            mood: "happy",
          }
        : {
            id: seqRef.current,
            tone: "mint",
            withLoaffy: true,
            mood: "happy",
            ...payload,
          };

    setToast(normalized);

    const duration = normalized.durationMs ?? DEFAULT_TOAST_DURATION_MS;
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      showToast,
      dismissToast,
    }),
    [toast, showToast, dismissToast]
  );

  const tone = toast?.tone ?? "mint";

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ zIndex: "var(--z-toast)" }}
        className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center px-4"
      >
        {toast && (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex max-w-md items-center gap-3 rounded-lg border-2 border-line-strong px-4 py-3 font-body text-body shadow-sticker",
              TONE_BG_CLASSES[tone]
            )}
          >
            {toast.withLoaffy !== false && (
              <Loaffy
                size={48}
                mood={toast.mood ?? "happy"}
                track={false}
                blink={false}
                listenToBus={false}
                decorative
                className="shrink-0"
              />
            )}
            <p className="flex-1 font-medium">{toast.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={dismissToast}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill hover:bg-bg/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast() must be used inside <ToastProvider>.");
  }
  return ctx;
}

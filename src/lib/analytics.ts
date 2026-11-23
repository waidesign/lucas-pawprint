export type AnalyticsEventName =
  | "resume_download"
  | "email_copy"
  | "book_chat_click"
  | "case_open"
  | "luci_click"
  | "theme_change"
  | "cursor_toggle"
  | "not_found";

export interface AnalyticsEventDetail {
  name: AnalyticsEventName;
  payload?: Record<string, string | number | boolean | undefined>;
  timestamp: number;
}

export const ANALYTICS_DOM_EVENT = "lp-analytics";

/**
 * Cookieless analytics event emitter (TECH-STACK.md §5).
 * Dispatches a DOM CustomEvent (`lp-analytics`) for verification and forwards
 * to Cloudflare Web Analytics / beacon queues when present.
 */
export function trackEvent(
  name: AnalyticsEventName,
  payload?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;

  const detail: AnalyticsEventDetail = {
    name,
    payload,
    timestamp: Date.now(),
  };

  window.dispatchEvent(
    new CustomEvent<AnalyticsEventDetail>(ANALYTICS_DOM_EVENT, { detail })
  );
}

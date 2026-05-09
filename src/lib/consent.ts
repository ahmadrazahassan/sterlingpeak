/**
 * Cookie-consent state management.
 *
 * - Stores a versioned record in localStorage so we can force-refresh consent
 *   when the Cookie Policy materially changes.
 * - Exposes a simple pub/sub via `window` custom events so client components
 *   (banner, analytics gate, footer link) stay in sync without extra deps.
 */

export const CONSENT_STORAGE_KEY = "sp.cookie-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "sp:consent-change";
export const CONSENT_OPEN_EVENT = "sp:consent-open";

export type ConsentCategory = "essential" | "analytics" | "functional";

export type ConsentRecord = {
  version: number;
  /** When the user last made a choice. ISO timestamp. */
  decidedAt: string;
  /** Always true — required for the site to work. */
  essential: true;
  analytics: boolean;
  functional: boolean;
};

export const DEFAULT_CONSENT: Omit<ConsentRecord, "decidedAt"> = {
  version: CONSENT_VERSION,
  essential: true,
  analytics: false,
  functional: false,
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return null;
    return { ...parsed, essential: true };
  } catch {
    return null;
  }
}

export function writeConsent(
  next: Omit<ConsentRecord, "version" | "decidedAt" | "essential"> & {
    essential?: true;
  },
): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    essential: true,
    analytics: next.analytics,
    functional: next.functional,
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(
      new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: record }),
    );
  }
  return record;
}

export function acceptAll(): ConsentRecord {
  return writeConsent({ analytics: true, functional: true });
}

export function rejectAll(): ConsentRecord {
  return writeConsent({ analytics: false, functional: false });
}

/** Programmatic trigger to reopen the preferences modal. */
export function openPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

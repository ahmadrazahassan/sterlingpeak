"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Cookie, Settings2, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  type ConsentRecord,
  acceptAll,
  readConsent,
  rejectAll,
  writeConsent,
} from "@/lib/consent";
import { cn } from "@/lib/utils";

type CategoryKey = "essential" | "analytics" | "functional";

type CategoryDef = {
  key: CategoryKey;
  title: string;
  description: string;
  locked?: boolean;
};

const CATEGORIES: CategoryDef[] = [
  {
    key: "essential",
    title: "Essential",
    description:
      "Required for the site to function: session management, security and storing your cookie preferences. These are always on.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Aggregated, anonymised usage data (pages visited, referral sources, device type) that helps us improve our editorial coverage.",
  },
  {
    key: "functional",
    title: "Functional",
    description:
      "Remembers preferences such as newsletter sign-up state so you don't see the same prompts repeatedly.",
  },
];

export function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [existing, setExisting] = useState<ConsentRecord | null>(null);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [draft, setDraft] = useState<{
    analytics: boolean;
    functional: boolean;
  }>({ analytics: false, functional: false });

  // Hydrate from localStorage on mount, then listen for re-open events.
  useEffect(() => {
    const current = readConsent();
    setExisting(current);
    if (current) {
      setDraft({
        analytics: current.analytics,
        functional: current.functional,
      });
    }
    setHydrated(true);

    const onOpen = () => {
      const latest = readConsent();
      setDraft({
        analytics: latest?.analytics ?? false,
        functional: latest?.functional ?? false,
      });
      setPrefsOpen(true);
    };
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentRecord>).detail;
      if (detail) setExisting(detail);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    window.addEventListener(CONSENT_EVENT, onChange as EventListener);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
      window.removeEventListener(CONSENT_EVENT, onChange as EventListener);
    };
  }, []);

  const showBanner = hydrated && !existing && !prefsOpen;

  const handleAcceptAll = useCallback(() => {
    const rec = acceptAll();
    setExisting(rec);
    setPrefsOpen(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    const rec = rejectAll();
    setExisting(rec);
    setPrefsOpen(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    const rec = writeConsent({
      analytics: draft.analytics,
      functional: draft.functional,
    });
    setExisting(rec);
    setPrefsOpen(false);
  }, [draft]);

  const toggleCategory = useCallback((key: CategoryKey, value: boolean) => {
    if (key === "essential") return;
    setDraft((d) => ({ ...d, [key]: value }));
  }, []);

  const prefsDraftMemo = useMemo(
    () => ({
      essential: true,
      analytics: draft.analytics,
      functional: draft.functional,
    }),
    [draft],
  );

  return (
    <>
      {/* ── Bottom banner ── */}
      <div
        aria-hidden={!showBanner}
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 md:left-auto md:right-6 md:bottom-6 md:inset-x-auto md:max-w-[420px] md:px-0 md:pb-0",
          "transition-all duration-300 ease-out",
          showBanner
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
      >
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          className={cn(
            "pointer-events-auto relative w-full rounded-2xl border border-border-subtle bg-card p-5 sm:p-6 shadow-card",
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/5">
              <Cookie className="h-4.5 w-4.5 text-brand" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-[15px] font-semibold text-brand">
                Your cookie preferences
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                We use essential cookies to run sterlingpeak.uk. With your
                consent, we also use analytics cookies to understand which
                articles readers find useful. You can change your choice at any
                time from our{" "}
                <Link
                  href="/cookie-policy"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={handleRejectAll}
              className="inline-flex h-10 items-center justify-center rounded-[9px] bg-gradient-to-b from-white to-[#eef1f2] px-4 text-[13px] font-medium text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(0,55,72,0.08)] ring-1 ring-inset ring-brand/[0.12] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.02] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft({
                  analytics: existing?.analytics ?? false,
                  functional: existing?.functional ?? false,
                });
                setPrefsOpen(true);
              }}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[9px] bg-gradient-to-b from-white to-[#eef1f2] px-4 text-[13px] font-medium text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(0,55,72,0.08)] ring-1 ring-inset ring-brand/[0.12] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.02] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <Settings2 className="h-3.5 w-3.5" aria-hidden />
              Customise
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex h-10 items-center justify-center rounded-[9px] bg-gradient-to-b from-[#0c5064] via-[#003748] to-[#002938] px-4 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.28),0_1px_2px_rgba(0,55,72,0.2)] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.06] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Accept all
            </button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            UK GDPR &middot; PECR compliant
          </p>
        </div>
      </div>

      {/* ── Preferences modal ── */}
      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="max-w-lg gap-0 p-0 sm:max-w-lg">
          <div className="border-b border-border-subtle px-6 pb-5 pt-6">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/5">
                  <Cookie className="h-4.5 w-4.5 text-brand" aria-hidden />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold text-brand">
                    Cookie preferences
                  </DialogTitle>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    Control how sterlingpeak.uk uses cookies on your device.
                  </p>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="max-h-[60vh] space-y-5 overflow-y-auto px-6 py-5">
            {CATEGORIES.map((c) => (
              <CategoryRow
                key={c.key}
                category={c}
                checked={c.locked ? true : prefsDraftMemo[c.key]}
                onChange={(v) => toggleCategory(c.key, v)}
              />
            ))}

            <p className="text-[12px] leading-relaxed text-muted-foreground">
              For full details on how we handle data, see our{" "}
              <Link
                href="/cookie-policy"
                className="text-accent underline-offset-2 hover:underline"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-accent underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border-subtle px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleRejectAll}
              className="inline-flex h-10 items-center justify-center rounded-[9px] px-4 text-[13px] font-medium text-brand/70 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Reject non-essential
            </button>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="inline-flex h-10 items-center justify-center rounded-[9px] bg-gradient-to-b from-white to-[#eef1f2] px-5 text-[13px] font-medium text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(0,55,72,0.08)] ring-1 ring-inset ring-brand/[0.12] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.02] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex h-10 items-center justify-center rounded-[9px] bg-gradient-to-b from-[#0c5064] via-[#003748] to-[#002938] px-5 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.28),0_1px_2px_rgba(0,55,72,0.2)] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.06] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Accept all
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */

type CategoryRowProps = {
  category: CategoryDef;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function CategoryRow({ category, checked, onChange }: CategoryRowProps) {
  const { title, description, locked } = category;
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border-subtle bg-page/40 p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-heading text-[13px] font-semibold text-brand">
            {title}
          </p>
          {locked && (
            <span className="rounded-full bg-brand/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand/60">
              Always on
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <Toggle
        checked={checked}
        disabled={locked}
        onChange={onChange}
        label={`${title} cookies`}
      />
    </div>
  );
}

type ToggleProps = {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

function Toggle({ checked, disabled, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        checked
          ? "border-brand bg-brand"
          : "border-border-subtle bg-card",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

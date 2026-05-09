"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import {
  CONSENT_EVENT,
  type ConsentRecord,
  readConsent,
} from "@/lib/consent";

/**
 * Mounts Vercel Analytics only after the visitor has given analytics consent.
 * Reacts to live consent changes so toggling off stops future tracking
 * within the same session.
 */
export function ConsentAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readConsent()?.analytics === true);
    sync();

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentRecord>).detail;
      setAllowed(detail?.analytics === true);
    };
    window.addEventListener(CONSENT_EVENT, onChange as EventListener);
    return () =>
      window.removeEventListener(CONSENT_EVENT, onChange as EventListener);
  }, []);

  if (!allowed) return null;
  return <Analytics />;
}

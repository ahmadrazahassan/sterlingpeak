"use client";

import { openPreferences } from "@/lib/consent";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Footer-ready button that reopens the cookie-preferences modal. Rendered as
 * an inline button so it can sit inside a list of legal links without visual
 * drift.
 */
export function ManageCookiesLink({
  className,
  children = "Manage cookies",
}: Props) {
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={
        className ??
        "text-[13px] text-white/65 transition-colors hover:text-white"
      }
    >
      {children}
    </button>
  );
}

"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ActionButton } from "@/components/public/action-button";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   NewsletterForm

   One form, two surfaces. `tone="light"` sits on paper (home page
   section, newsletter page). `tone="dark"` sits on the brand panel in
   the footer.

   The field and the button share a single bordered rail rather than
   floating apart, so the whole control reads as one object. The
   consent tick is a native checkbox: no library, no custom control to
   get wrong for keyboard and screen reader users, and it is the thing
   UK GDPR and PECR actually want to see before we mail anyone.
   ────────────────────────────────────────────────────────────────── */

type Tone = "light" | "dark";

type Props = {
  /** Recorded against the subscriber row so we can see what converts. */
  source: string;
  tone?: Tone;
  className?: string;
};

type State = "idle" | "sending" | "done" | "already" | "error";

export function NewsletterForm({ source, tone = "light", className }: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const consentId = useId();
  const dark = tone === "dark";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;

    if (!consent) {
      setState("error");
      setMessage("Please tick the box so we have your permission to email you.");
      return;
    }

    setState("sending");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, consent: true, website }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState(data.already ? "already" : "done");
      setEmail("");
      setConsent(false);
    } catch {
      setState("error");
      setMessage("No connection. Please try again in a moment.");
    }
  }

  if (state === "done" || state === "already") {
    return (
      <div className={cn("max-w-xl", className)}>
        <p
          className={cn(
            "font-heading text-[15px] font-semibold tracking-[-0.005em]",
            dark ? "text-white" : "text-brand",
          )}
        >
          {state === "already"
            ? "You are already on the list."
            : "You are on the list."}
        </p>
        <p
          className={cn(
            "mt-2 text-[13px] leading-relaxed",
            dark ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {state === "already"
            ? "Nothing more to do. The next Briefing reaches you on Thursday morning."
            : "The next Briefing goes out on Thursday morning, UK time. Every issue carries a one click unsubscribe."}
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setMessage("");
          }}
          className={cn(
            "mt-4 text-[12.5px] underline-offset-4 transition-colors hover:underline",
            dark ? "text-white/50 hover:text-white" : "text-brand/55 hover:text-brand",
          )}
        >
          Add another address
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative max-w-xl", className)}
      noValidate
    >
      {/* Honeypot. Off screen for people, filled in by bots. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
      />

      {/* The rail: field and action share one border. */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-[14px] p-1.5 transition-colors",
          dark
            ? "bg-white/[0.06] ring-1 ring-inset ring-white/15 focus-within:ring-white/30"
            : "bg-card ring-1 ring-inset ring-brand/[0.12] focus-within:ring-cta/45",
        )}
      >
        <label htmlFor={`${consentId}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${consentId}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@yourbusiness.co.uk"
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 text-[14.5px] font-medium outline-none",
            dark
              ? "text-white placeholder:font-normal placeholder:text-white/35"
              : "text-brand placeholder:font-normal placeholder:text-brand/35",
          )}
        />
        <ActionButton
          type="submit"
          variant="cta"
          size="md"
          withArrow={false}
          className="shrink-0"
        >
          {state === "sending" ? "Adding you" : "Subscribe"}
        </ActionButton>
      </div>

      {/* Consent */}
      <div className="mt-4 flex items-start gap-3">
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (state === "error") setState("idle");
          }}
          className="mt-[3px] h-[15px] w-[15px] shrink-0 cursor-pointer accent-[#22ad01]"
        />
        <label
          htmlFor={consentId}
          className={cn(
            "cursor-pointer text-[12px] leading-relaxed",
            dark ? "text-white/55" : "text-muted-foreground",
          )}
        >
          I agree to receive The SterlingPeak Briefing by email and I have read
          the{" "}
          <Link
            href="/privacy-policy"
            className={cn(
              "underline underline-offset-2 transition-colors",
              dark ? "text-white/80 hover:text-white" : "text-brand hover:text-cta",
            )}
          >
            Privacy Policy
          </Link>
          . We never sell or share your address, and you can leave in one click.
        </label>
      </div>

      {state === "error" && message && (
        <p
          role="alert"
          className={cn(
            "mt-3 text-[12.5px]",
            dark ? "text-[#ff9a8f]" : "text-red-600",
          )}
        >
          {message}
        </p>
      )}
    </form>
  );
}

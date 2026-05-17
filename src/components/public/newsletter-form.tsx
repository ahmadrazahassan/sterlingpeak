"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   NewsletterForm

   Posts directly to a Kit (formerly ConvertKit) hosted form so we
   inherit Kit's deliverability, double opt-in flow, GDPR consent log,
   bounce handling, and unsubscribe management without running our
   own ESP integration.

   Why direct POST and not API:
     - No API key on the client (Kit's per-form endpoint is public)
     - No backend route to maintain, no env vars to keep in sync
     - Same flow Substack / Beehiiv embed widgets use under the hood

   Visuals stay consistent with the rest of SterlingPeak:
     - Pill input + brand-coloured submit
     - In-place premium success panel with 📬 emoji
     - Light + dark variants for the homepage / footer / article use
   ────────────────────────────────────────────────────────────────── */

/* The form action URL is taken straight from the Kit embed code:
     https://app.kit.com/forms/9453668/subscriptions
   Form ID is hard-coded because it's a public identifier — the same
   URL is exposed in any Kit embed snippet on any site. */
const KIT_FORM_ACTION =
  "https://app.kit.com/forms/9453668/subscriptions";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email to subscribe.")
    .email("That doesn't look like a valid email."),
  first_name: z.string().trim().max(120).optional(),
});

type Form = z.infer<typeof schema>;

type Props = {
  source?: string;
  className?: string;
  showName?: boolean;
  variant?: "light" | "dark";
};

type Outcome = {
  email: string;
};

export function NewsletterForm({
  source = "website",
  className,
  showName = false,
  variant = "light",
}: Props) {
  const isDark = variant === "dark";
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  async function onSubmit(data: Form) {
    /* Kit accepts a urlencoded form POST on its public per-form
       endpoint. We don't read the response body — Kit's response is
       opaque and CORS-restricted. We only care that the network
       request didn't error.

       This mirrors how every Kit / ConvertKit embed widget on the
       internet behaves. The visible "success" state is rendered by
       us locally; the actual "confirm your subscription" email is
       sent by Kit asynchronously. */
    const body = new URLSearchParams();
    body.set("email_address", data.email.trim());
    if (data.first_name && data.first_name.trim()) {
      body.set("first_name", data.first_name.trim());
    }
    /* Tag the source as a referrer so it shows up in Kit's "where did
       this subscriber come from?" report. */
    body.set(
      "referrer",
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#${source}`
        : `https://sterlingpeak.uk/#${source}`,
    );

    try {
      await fetch(KIT_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      setOutcome({ email: data.email.trim() });
      reset({ email: "", first_name: "" });
    } catch {
      setError("email", {
        message:
          "Network error. Please check your connection and try again.",
      });
    }
  }

  /* ── Success / pending state ───────────────────────────────── */
  if (outcome) {
    return (
      <SubscribedPanel
        outcome={outcome}
        isDark={isDark}
        className={className}
        onSubscribeAnother={() => {
          setOutcome(null);
          reset({ email: "", first_name: "" });
        }}
      />
    );
  }

  /* ── Form state ────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-live="polite"
      className={cn("flex flex-col gap-3", className)}
    >
      {showName && (
        <div className="w-full">
          <label
            htmlFor="nl-first"
            className={cn(
              "mb-1.5 block text-xs font-medium",
              isDark ? "text-white/70" : "text-brand/60",
            )}
          >
            First name (optional)
          </label>
          <input
            id="nl-first"
            {...register("first_name")}
            placeholder="Jane"
            autoComplete="given-name"
            className={cn(
              "h-11 w-full rounded-full border px-5 text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/40",
              isDark
                ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40"
                : "border-border-subtle bg-white text-brand placeholder:text-brand/35",
            )}
          />
        </div>
      )}

      <div className="w-full">
        <label
          htmlFor="nl-email"
          className={cn(
            "mb-1.5 block text-xs font-medium",
            isDark ? "text-white/70" : "text-brand/60",
          )}
        >
          Email address
        </label>
        <div className="flex gap-2">
          <input
            id="nl-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email")}
            placeholder="you@company.co.uk"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "nl-email-err" : undefined}
            className={cn(
              "h-11 min-w-0 flex-1 rounded-full border px-5 text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/40",
              isDark
                ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40"
                : "border-border-subtle bg-white text-brand placeholder:text-brand/35",
              errors.email &&
                (isDark ? "border-red-300/60" : "border-red-400/60"),
            )}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-6 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              isDark
                ? "bg-cta text-white hover:bg-cta/90"
                : "bg-brand text-white hover:bg-brand/90",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="h-3.5 w-3.5 animate-spin"
                  aria-hidden
                />
                Subscribing
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </>
            )}
          </button>
        </div>
        {errors.email && (
          <p
            id="nl-email-err"
            role="alert"
            className={cn(
              "mt-2 text-xs",
              isDark ? "text-red-300" : "text-red-500",
            )}
          >
            {errors.email.message}
          </p>
        )}
      </div>
    </form>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SubscribedPanel — premium in-place confirmation that replaces the
   form inside the same container. No toast, no modal, no redirect.
   ────────────────────────────────────────────────────────────────── */

function SubscribedPanel({
  outcome,
  isDark,
  className,
  onSubscribeAnother,
}: {
  outcome: Outcome;
  isDark: boolean;
  className?: string;
  onSubscribeAnother: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-2xl p-6 sm:p-7",
        isDark
          ? "bg-white/[0.04] ring-1 ring-inset ring-white/10"
          : "bg-white ring-1 ring-inset ring-border-subtle",
        className,
      )}
    >
      {/* Header: icon + title inline for tighter rhythm */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            isDark
              ? "bg-cta/15 text-cta ring-1 ring-inset ring-cta/25"
              : "bg-cta/10 text-cta ring-1 ring-inset ring-cta/20",
          )}
        >
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <p
          className={cn(
            "font-heading text-[15px] font-semibold tracking-[-0.005em]",
            isDark ? "text-white" : "text-brand",
          )}
        >
          You&apos;re on the list
        </p>
      </div>

      {/* Body copy */}
      <p
        className={cn(
          "mt-4 text-[13px] leading-[1.65]",
          isDark ? "text-white/65" : "text-muted-foreground",
        )}
      >
        We&apos;ve sent a confirmation email to{" "}
        <span
          className={cn(
            "font-medium",
            isDark ? "text-white/90" : "text-brand",
          )}
        >
          {outcome.email}
        </span>
        . Click the link inside to confirm your subscription.
      </p>

      {/* Divider */}
      <div
        className={cn(
          "mt-6 h-px w-full",
          isDark ? "bg-white/10" : "bg-border-subtle",
        )}
      />

      {/* Meta row: footnote + secondary action */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <p
          className={cn(
            "inline-flex items-center gap-1.5 text-[12px]",
            isDark ? "text-white/45" : "text-muted-foreground",
          )}
        >
          <Mail
            className={cn(
              "h-3.5 w-3.5 shrink-0",
              isDark ? "text-white/40" : "text-brand/40",
            )}
            aria-hidden
          />
          First Briefing arrives Thursday, 07:00 UK
        </p>
        <button
          type="button"
          onClick={onSubscribeAnother}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 text-[12px] font-heading font-semibold transition-colors",
            isDark
              ? "text-white/70 hover:text-white"
              : "text-brand/70 hover:text-brand",
          )}
        >
          Add another
          <ArrowRight className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </div>
  );
}

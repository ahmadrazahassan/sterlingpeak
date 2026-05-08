import { NewsletterForm } from "@/components/public/newsletter-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — The SterlingPeak Briefing",
  description:
    "A weekly dispatch covering UK software updates, HMRC changes, and the editorial analysis our readers rely on.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 md:px-8 md:py-32">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          The SterlingPeak Briefing
        </p>
        <h1 className="mt-4 font-heading text-3xl font-semibold leading-snug text-brand md:text-4xl">
          Intelligence for UK finance teams
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          A weekly dispatch covering UK software updates, HMRC changes, and the editorial
          analysis our readers rely on.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border-subtle bg-card p-8 shadow-card">
        <NewsletterForm source="newsletter-page" showName className="flex-col" />
        <p className="mt-5 text-center text-[11px] text-muted-foreground/50">
          One email per week. No spam. Unsubscribe anytime.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle">
        <div className="bg-card px-4 py-5 text-center">
          <p className="font-heading text-lg font-semibold text-brand">Weekly</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Every Thursday</p>
        </div>
        <div className="bg-card px-4 py-5 text-center">
          <p className="font-heading text-lg font-semibold text-brand">Free</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Always</p>
        </div>
        <div className="bg-card px-4 py-5 text-center">
          <p className="font-heading text-lg font-semibold text-brand">5 min</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Read time</p>
        </div>
      </div>
    </div>
  );
}

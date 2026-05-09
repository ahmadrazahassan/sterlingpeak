import { NewsletterForm } from "@/components/public/newsletter-form";
import { Mail, BarChart3, Shield, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — The SterlingPeak Briefing",
  description:
    "A weekly dispatch covering UK software updates, HMRC changes, and editorial analysis for finance teams at growing businesses.",
};

const features = [
  {
    icon: BarChart3,
    title: "Software intelligence",
    text: "Pricing changes, feature updates, and product launches from leading UK accounting and payroll platforms — curated for your business.",
  },
  {
    icon: Shield,
    title: "Compliance alerts",
    text: "MTD deadlines, VAT threshold changes, payroll legislation updates, and HMRC announcements that affect your business.",
  },
  {
    icon: Clock,
    title: "5-minute read",
    text: "Concise, scannable format. No fluff, no upsells. Just the information your finance team needs to stay current.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-page/60">
        <div className="mx-auto max-w-xl px-6 py-20 text-center md:px-8 md:py-28">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            The SterlingPeak Briefing
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold leading-snug text-brand md:text-4xl">
            Intelligence for UK finance teams
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            A weekly dispatch covering software updates, HMRC changes, and the
            editorial analysis our readers rely on to make confident decisions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-xl px-6 py-14 md:px-8">
        {/* Sign-up card */}
        <div className="rounded-2xl border border-border-subtle bg-white p-8 shadow-card">
          <NewsletterForm source="newsletter-page" showName className="flex-col" />
          <p className="mt-5 text-center text-[11px] text-muted-foreground/50">
            One email per week. No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Sent weekly on Thursdays. Free. Takes about 5 minutes to read.
        </p>

        {/* What you get */}
        <div className="mt-14 space-y-6">
          <h2 className="text-center font-heading text-xl font-semibold text-brand">
            What&apos;s inside each issue
          </h2>
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-xl border border-border-subtle bg-white p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-heading text-[15px] font-semibold text-brand">
                  {f.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial note */}
        <div className="mt-14 rounded-2xl border border-border-subtle bg-card p-6">
          <p className="font-heading text-[15px] font-semibold text-brand">
            Why subscribe?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            UK accounting and payroll regulations change frequently — MTD
            deadlines shift, VAT thresholds get reviewed, software providers
            update pricing without notice. The SterlingPeak Briefing tracks
            these changes so you don&apos;t have to monitor them yourself.
            Every issue is written by our editorial team, not auto-generated.
          </p>
        </div>
      </div>
    </>
  );
}

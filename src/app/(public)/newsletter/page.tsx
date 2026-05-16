import Link from "next/link";
import { Calendar, Check, Mail, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { LinkedInBrand } from "@/components/public/linkedin-brand";
import { NewsletterForm } from "@/components/public/newsletter-form";

const EDITOR_LINKEDIN_URL =
  "https://www.linkedin.com/in/hafiza-ayesha-waheed-4a457440a/";

export const metadata: Metadata = {
  title: "The SterlingPeak Briefing — UK accounting, payroll & MTD intelligence",
  description:
    "An independent weekly editorial briefing for UK finance leaders, founders, accountants, and bookkeepers. Covers UK accounting and payroll software, HMRC changes, MTD deadlines, and practical analysis for growing SMEs. Every Thursday. Free.",
};

const inside = [
  {
    label: "Market moves",
    body: "The week's meaningful changes across Sage, Xero, QuickBooks, FreeAgent, BrightPay and the platforms UK SMEs depend on. Pricing, features, product launches — concrete, not hyped.",
  },
  {
    label: "Compliance watch",
    body: "Making Tax Digital deadlines, VAT changes, PAYE RTI updates, auto-enrolment and CIS shifts — explained in plain English with action points for UK finance teams.",
  },
  {
    label: "Editor's analysis",
    body: "A 300–500 word editorial piece. A verdict, a comparison, a thesis. Written for people making decisions, not readers scrolling feeds.",
  },
  {
    label: "In numbers",
    body: "One sourced UK finance figure every week — an HMRC metric, a pricing change, a market data point — with the context to understand what it means for your business.",
  },
];

const recent = [
  {
    date: "Thu 7 May 2026",
    tag: "Issue 12",
    title:
      "Sage Intacct 2026 R1 — what the new AI agent network changes for UK finance teams",
  },
  {
    date: "Thu 30 Apr 2026",
    tag: "Issue 11",
    title:
      "MTD for Income Tax goes live — what happens in the first quarterly update window",
  },
  {
    date: "Thu 23 Apr 2026",
    tag: "Issue 10",
    title:
      "Sage and Barclays partnership: what it actually changes for small business admin",
  },
  {
    date: "Thu 16 Apr 2026",
    tag: "Issue 09",
    title:
      "Sage Accounting pricing in 2026 — Start, Standard, and Plus compared against Xero",
  },
];

const questions = [
  {
    q: "When does the briefing arrive?",
    a: "Every Thursday at 07:00 UK time. One email per week — no daily pings, no weekend sends.",
  },
  {
    q: "Who writes it?",
    a: "Hafiza Ayesha Waheed, founder and editor-in-chief at SterlingPeak, writes the briefing with input from our editorial contributors. Every issue is researched, written, and edited by people — not auto-generated.",
  },
  {
    q: "How long is each issue?",
    a: "Around a five-minute read. Short enough to finish with your morning coffee, long enough to be genuinely useful.",
  },
  {
    q: "Do issues include sponsored links?",
    a: "Some issues carry clearly disclosed affiliate links to UK-compliant software — most commonly Sage products, because they fit the majority of UK SME use cases we cover. Commission arrangements do not change our editorial conclusions. Full detail in our Affiliate Disclosure.",
  },
  {
    q: "What happens to my email address?",
    a: "It is stored only to send you the briefing. We use a GDPR-compliant email service provider as our data processor and never sell, rent, or share your email. One-click unsubscribe is in every issue.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            The SterlingPeak Briefing
          </p>
          <h1 className="mx-auto mt-5 max-w-2xl font-heading text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.025em] text-brand md:text-[3.25rem]">
            UK accounting &amp; compliance, in five minutes a week.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            An independent Thursday-morning briefing for UK finance leaders,
            founders, accountants, and bookkeepers. Concrete editorial coverage
            of Sage and the software that runs UK business — with the HMRC
            updates, pricing changes, and analysis your team needs to stay
            current.
          </p>

          <div className="mt-10 rounded-2xl border border-border-subtle bg-card p-6 text-left shadow-card sm:p-7">
            <NewsletterForm
              source="newsletter-page-hero"
              showName
              className="flex-col"
            />
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground/85">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-cta" aria-hidden />
                Free to subscribe
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-cta" aria-hidden />
                Double opt-in
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-cta" aria-hidden />
                Unsubscribe any time
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-cta" aria-hidden />
                UK GDPR compliant
              </span>
            </div>
          </div>

          <p className="mt-6 text-[12.5px] text-muted-foreground/75">
            Read by UK founders, finance managers, accountants, bookkeepers,
            sole traders, and landlords.
          </p>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Inside every issue
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand md:text-4xl">
            Four short sections. Nothing more.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Every Thursday&apos;s Briefing follows the same structure, so you
            know exactly what you&apos;re opening — and exactly where to find
            what matters to you.
          </p>

          <div className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
            {inside.map((item, i) => (
              <div
                key={item.label}
                className="grid gap-3 py-7 md:grid-cols-[160px_1fr] md:gap-10"
              >
                <div>
                  <p className="font-mono text-[11px] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-heading text-[15px] font-semibold text-brand">
                    {item.label}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT BRIEFINGS ── */}
      <section className="border-y border-border-subtle bg-card/60 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Recent briefings
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand md:text-4xl">
            What readers got in recent weeks
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            A short tour of what has landed in subscribers&apos; inboxes on
            recent Thursdays, so you know the kind of issue you&apos;ll receive.
          </p>

          <div className="mt-12 divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-card">
            {recent.map((item) => (
              <article
                key={item.tag}
                className="flex flex-col gap-2 px-6 py-5 md:flex-row md:items-center md:gap-8"
              >
                <div className="flex shrink-0 items-center gap-3 text-[12px] text-muted-foreground md:w-52">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent" aria-hidden />
                    {item.date}
                  </span>
                  <span className="rounded-full bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand/70">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading text-[15.5px] font-semibold leading-snug text-brand">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>

          <p className="mt-6 text-[12px] text-muted-foreground/70">
            A full public archive of past issues is in preparation and will be
            linked from the site footer when it launches.
          </p>
        </div>
      </section>

      {/* ── EDITOR ── */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Written by
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand md:text-4xl">
            Hafiza Ayesha Waheed
          </h2>
          <p className="mt-1 text-[14px] font-medium text-accent">
            Founder &amp; Editor-in-Chief, SterlingPeak &middot; Greater
            Manchester, England
          </p>
          <p className="mt-3">
            <a
              href={EDITOR_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-heading font-medium text-brand transition-colors hover:text-cta"
            >
              <LinkedInBrand className="h-3.5 w-3.5" />
              Connect on LinkedIn
            </a>
          </p>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Ayesha writes every issue of the Briefing. The goal is simple:
              give UK finance professionals one email each week that is worth
              opening — grounded in how Sage, Xero, QuickBooks, and the wider
              UK software market actually work for growing businesses.
            </p>
            <p>
              SterlingPeak covers Sage products in depth because Sage remains
              the most widely recommended stack for UK small and mid-sized
              businesses — from Sage Sole Trader and Sage Accounting at the
              small-business end through Sage 50, Sage 200, and Sage Intacct as
              finance complexity grows. Where another product is the better
              fit, we say so.
            </p>
            <p>
              Every product mentioned in the Briefing is evaluated on features,
              UK compliance, and real fit. Affiliate links, where they appear,
              are clearly disclosed and never change editorial conclusions. Read
              our full{" "}
              <Link
                href="/editorial-policy"
                className="text-accent underline-offset-2 hover:underline"
              >
                editorial policy
              </Link>{" "}
              and{" "}
              <Link
                href="/affiliate-disclosure"
                className="text-accent underline-offset-2 hover:underline"
              >
                affiliate disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── PRIVACY ── */}
      <section className="border-t border-border-subtle bg-card/60 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Privacy &amp; consent
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-brand md:text-3xl">
            Your inbox, treated properly.
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-brand">Double opt-in.</strong> Every
              subscription is confirmed by a verification email before you are
              added to the list.
            </p>
            <p>
              <strong className="text-brand">UK GDPR compliant.</strong>{" "}
              Subscriptions are processed under UK GDPR and the Data Protection
              Act 2018. SterlingPeak is the data controller; our email service
              provider acts as a contracted data processor.
            </p>
            <p>
              <strong className="text-brand">No data sharing.</strong> We never
              sell, rent, or exchange subscriber email addresses. Every issue
              includes a one-click unsubscribe link.
            </p>
          </div>
          <p className="mt-8 text-[12.5px] text-muted-foreground/80">
            Processing details, retention, and your rights are set out in our{" "}
            <Link
              href="/privacy-policy"
              className="text-accent underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            . Cookie behaviour is described in our{" "}
            <Link
              href="/cookie-policy"
              className="text-accent underline-offset-2 hover:underline"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── QUESTIONS ── */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Common questions
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand md:text-4xl">
            Practical details
          </h2>
          <dl className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
            {questions.map((item) => (
              <div
                key={item.q}
                className="grid gap-2 py-7 md:grid-cols-[1fr_1.6fr] md:gap-10"
              >
                <dt className="font-heading text-[15.5px] font-semibold text-brand">
                  {item.q}
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="pb-24 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div className="rounded-[1.75rem] border border-white/[0.06] bg-brand p-10 text-center md:p-14">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent/85">
              Subscribe free
            </p>
            <h2 className="mx-auto mt-4 max-w-xl font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
              One short email. Every Thursday. UK finance, understood.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
              Free. Double opt-in. Unsubscribe any time with a single click. We
              never share your email.
            </p>

            <div className="mx-auto mt-10 max-w-md text-left">
              <NewsletterForm
                source="newsletter-page-final"
                showName
                variant="dark"
                className="flex-col"
              />
              <p className="mt-4 text-center text-[11.5px] text-white/40">
                By subscribing you agree to receive the weekly Briefing. See
                our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-white/75 underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" aria-hidden />
                newsletter@sterlingpeak.uk
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                UK GDPR compliant
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

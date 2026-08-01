import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterForm } from "@/components/public/newsletter-form";

export const metadata: Metadata = {
  title: "The SterlingPeak Briefing | Weekly UK accounting and payroll email",
  description:
    "A free weekly email covering Making Tax Digital, VAT, payroll and the accounting software UK businesses run. Sent Thursday mornings from Greater Manchester.",
  alternates: { canonical: "/newsletter" },
};

const contents = [
  {
    title: "What changed this week",
    body: "HMRC updates, Making Tax Digital deadlines, VAT thresholds and payroll rule changes, written in plain English with the date the guidance was checked.",
  },
  {
    title: "What the software actually shipped",
    body: "Real release notes from Sage, Xero, QuickBooks and the rest, filtered down to the handful of changes that affect how you close a month or file a return.",
  },
  {
    title: "What it costs now",
    body: "Price moves, plan restructures and renewal traps, with the figure we verified and the day we verified it. No stale numbers carried over from last year.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      {/* Masthead */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="flex items-baseline justify-between gap-6 border-b border-brand/15 pb-4">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.24em] text-brand">
              The SterlingPeak Briefing
            </p>
            <p className="shrink-0 font-mono text-[11px] tracking-[0.04em] text-brand/45">
              Thursday, 07:00 UK
            </p>
          </div>

          <h1 className="mt-8 font-heading text-[clamp(3.1rem,13vw,9.5rem)] font-semibold leading-[0.83] tracking-[-0.045em] text-brand">
            The Briefing
          </h1>

          <div className="mt-12 grid gap-10 border-t border-border-subtle pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground">
                One email, Thursday mornings. The accounting, payroll and tax
                software news that affects a UK business this week, cut down to
                what you can act on and nothing else.
              </p>
              <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-brand/55">
                Free to read, no sponsored issues, and it stays that way. If a
                link in an issue earns us a commission it is labelled in the
                issue itself, the same rule we follow on the site.
              </p>
            </div>

            <div className="lg:pt-1">
              <NewsletterForm source="newsletter-page" className="max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* What is in an issue */}
      <section className="border-b border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/45">
            Inside every issue
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.016em] text-brand md:text-[2.25rem]">
            Three fixed sections, so you always know where to look
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-border-subtle bg-border-subtle md:grid-cols-3">
            {contents.map((item, i) => (
              <div key={item.title} className="flex flex-col bg-page p-7">
                <span className="font-mono text-[11px] tracking-[0.05em] text-cta/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-heading text-[15px] font-semibold tracking-[-0.005em] text-brand">
                  {item.title}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who reads it + data handling */}
      <section className="border-b border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/45">
                Who reads it
              </p>
              <h2 className="mt-3 font-heading text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.014em] text-brand">
                Written for the person who has to file the return
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground">
                Sole traders and limited company directors who keep their own
                books. Bookkeepers and accountants running several client
                ledgers. Office managers who inherited the payroll and would
                rather not learn it the hard way.
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                If you have ever lost an afternoon working out whether a
                software change affects your VAT return, the Briefing is aimed
                at you.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/45">
                Your address
              </p>
              <h2 className="mt-3 font-heading text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.014em] text-brand">
                Held under UK GDPR, and only for this
              </h2>
              <ul className="mt-5 space-y-3.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {[
                  "We store your email address, the date you subscribed and which page you subscribed from. Nothing else.",
                  "Your address is never sold, rented, shared or passed to any advertiser or software vendor.",
                  "Every issue carries a one click unsubscribe, and leaving takes effect immediately.",
                  "Ask us to delete your record at any time and we will, then confirm it in writing.",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[9px] inline-block h-[5px] w-[5px] shrink-0 rounded-[1px] bg-cta"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-relaxed text-brand/55">
                The full detail sits in our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-brand underline underline-offset-2 hover:text-cta"
                >
                  Privacy Policy
                </Link>
                . Questions about your data go to{" "}
                <a
                  href="mailto:hello@sterlingpeak.uk"
                  className="text-brand underline underline-offset-2 hover:text-cta"
                >
                  hello@sterlingpeak.uk
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing sign-up */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-xl">
            <h2 className="font-heading text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.016em] text-brand md:text-[2rem]">
              Thursday morning, in your inbox
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
              Add your address and the next issue reaches you this week.
            </p>
            <NewsletterForm
              source="newsletter-page-footer"
              className="mt-7 max-w-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Logo, LogoMark } from "@/components/public/logo";
import { ActionButton } from "@/components/public/action-button";

export const metadata: Metadata = {
  title: "About | SterlingPeak",
  description:
    "SterlingPeak is an independent UK editorial publication run by Muhammad Ilyas, covering accounting, payroll, tax and business software for British companies.",
};

/* ── What the desk covers ── */
const coverage = [
  {
    title: "Accounting and bookkeeping",
    body: "Sage Accounting, Sage 50 and Sage Sole Trader, alongside Xero, QuickBooks and FreeAgent, reviewed the way British bookkeeping actually works rather than by a feature checklist.",
  },
  {
    title: "Payroll and people",
    body: "Sage Payroll, BrightPay and Moneysoft, plus the HR tools growing teams adopt, judged against how UK payroll, RTI and workplace pensions run in practice.",
  },
  {
    title: "Tax and compliance",
    body: "Making Tax Digital, UK VAT schemes, Corporation Tax and Self Assessment, written from current HMRC guidance rather than American tax logic.",
  },
  {
    title: "Comparisons",
    body: "The buying decisions British firms genuinely face, from migration to pricing to fit, with figures rechecked at the start of every VAT quarter.",
  },
];

/* ── How the desk works ── */
const principles = [
  {
    label: "01",
    title: "UK only editorial",
    body: "Every guide is written for HMRC, UK VAT schemes, PAYE, automatic enrolment and Making Tax Digital. Never US tax law converted into pounds.",
  },
  {
    label: "02",
    title: "One named editor",
    body: "Editorial decisions sit with Muhammad Ilyas. Nothing is machine written, ghost written or published without a name attached to it.",
  },
  {
    label: "03",
    title: "Pricing verified each quarter",
    body: "Vendor pricing is checked again at the start of every VAT quarter, and each article carries the date it was last confirmed.",
  },
  {
    label: "04",
    title: "Disclosure on every commercial page",
    body: "Affiliate relationships are disclosed at the top of every commercial article, not tucked away in a footer link.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO — centred, quiet, editorial ── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[440px] max-w-3xl bg-[radial-gradient(58%_58%_at_50%_0%,rgba(34,173,1,0.06),transparent_70%)]"
        />
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-20 text-center md:pb-20 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5 text-[11px] font-heading font-medium uppercase tracking-[0.2em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-cta" />
            About SterlingPeak
          </span>
          <h1 className="mx-auto mt-8 max-w-[18ch] font-heading text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.026em] text-brand md:text-[3.4rem]">
            Independent software guidance for the people who run UK finance.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            SterlingPeak is a UK editorial publication covering the accounting,
            payroll and tax software that British companies actually depend on.
            Every review is researched, written and signed by one editor.
          </p>
        </div>
      </section>

      {/* ── THE STORY — single readable column ── */}
      <section className="border-t border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            Why it exists
          </p>
          <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.016em] text-brand md:text-[2.25rem]">
            Built to be the guide the UK never had.
          </h2>
          <div className="mt-7 space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              Most of the accounting software advice a UK finance person can
              find has one of two problems. Either it was written for an
              American audience, with a different tax year and a different set
              of rules, or it was quietly paid for by the very software under
              review. Neither one helps you make a decision you can defend to
              HMRC.
            </p>
            <p>
              SterlingPeak exists to close that gap. It is one editorial desk
              writing a small number of careful reviews, guides and
              comparisons, focused on the software British firms genuinely run
              on, with <strong className="text-brand">Sage UK</strong> and the
              tools around it at the centre of the coverage.
            </p>
            <p>
              This is a single desk, not a content farm and not a marketing
              channel for any vendor. Everything is grounded in current UK
              legislation, checked again each VAT cycle, and corrected in the
              open on the rare occasion we get something wrong.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE EDITOR — one named person ── */}
      <section className="border-t border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            The editor
          </p>
          <div className="mt-7 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <div className="mx-auto md:mx-0">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-[1.5rem] bg-brand ring-1 ring-inset ring-brand/10">
                <span className="font-heading text-[2.75rem] font-semibold tracking-[-0.02em] text-white/90">
                  MI
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cta text-white shadow-[0_4px_12px_-2px_rgba(34,173,1,0.5)] ring-2 ring-page"
                >
                  <LogoMark size={15} tone="dark" />
                </span>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="font-heading text-[1.8rem] font-semibold leading-tight tracking-[-0.014em] text-brand">
                Muhammad Ilyas
              </h2>
              <p className="mt-1 text-[13px] font-heading font-semibold uppercase tracking-[0.16em] text-cta">
                Founder and Editor in Chief
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                Muhammad Ilyas researches every product SterlingPeak covers and
                writes every review it publishes. Nothing goes out under a house
                byline or an anonymous name. If his name is on it, he stands
                behind it.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-brand/65 md:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Greater Manchester, England, United Kingdom
                </span>
                <span
                  aria-hidden
                  className="hidden h-3 w-px bg-brand/15 sm:inline-block"
                />
                <a
                  href="mailto:hello@sterlingpeak.uk"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cta"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                  hello@sterlingpeak.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER — hairline list, no cards ── */}
      <section className="border-t border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            What we cover
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.016em] text-brand md:text-[2.25rem]">
            Four areas, one UK finance stack.
          </h2>

          <div className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
            {coverage.map((c) => (
              <div
                key={c.title}
                className="grid gap-2 py-7 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-12 md:py-8"
              >
                <h3 className="font-heading text-[1.1rem] font-semibold tracking-[-0.006em] text-brand">
                  {c.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK — principles, hairline numbered ── */}
      <section className="border-t border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            How we work
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.016em] text-brand md:text-[2.25rem]">
            The standards behind every article.
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
            The full operating standard sits in our{" "}
            <Link
              href="/editorial-policy"
              className="text-brand underline-offset-2 hover:text-cta hover:underline"
            >
              editorial policy
            </Link>
            . Four principles run through everything we publish.
          </p>

          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.label}>
                <span className="font-mono text-[11px] tracking-[0.05em] text-cta/80">
                  {p.label}
                </span>
                <h3 className="mt-3 font-heading text-[1.1rem] font-semibold tracking-[-0.006em] text-brand">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING — quiet contact call ── */}
      <section className="border-t border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-[11px] font-heading font-semibold text-cta ring-1 ring-inset ring-cta/15">
            <LogoMark size={14} />
            SterlingPeak
          </span>
          <h2 className="mx-auto mt-6 max-w-xl font-heading text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.016em] text-brand md:text-[2.4rem]">
            The publication that takes UK finance software seriously.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
            Independent reviews and honest comparisons, written for the UK
            finance professionals who choose and run the software.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ActionButton href="/comparisons" variant="cta" size="md">
              Read the comparisons
            </ActionButton>
            <ActionButton href="/contact" variant="ghost" size="md">
              Contact the editor
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Brand mark sign-off */}
      <section className="pb-20">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 md:px-8">
          <Logo variant="full" size="sm" />
        </div>
      </section>
    </>
  );
}

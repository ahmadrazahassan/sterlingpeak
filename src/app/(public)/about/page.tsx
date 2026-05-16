/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Quote } from "lucide-react";
import type { Metadata } from "next";
import { Logo, LogoMark } from "@/components/public/logo";
import { LinkedInBrand } from "@/components/public/linkedin-brand";
import { PillButton } from "@/components/public/pill-button";

const EDITOR_LINKEDIN_URL =
  "https://www.linkedin.com/in/hafiza-ayesha-waheed-4a457440a/";
const EDITOR_PORTRAIT = "/Ayesha.jpeg";

export const metadata: Metadata = {
  title: "About — SterlingPeak",
  description:
    "SterlingPeak is an independent UK editorial publication run by Hafiza Ayesha Waheed, covering accounting, payroll, tax, and software for British SMEs.",
};

const journey = [
  {
    year: "2024",
    title: "The first notebook",
    body: "Ayesha starts collecting research notes on UK accounting software while advising small business owners. The phrase 'sterling peak' lands in a side margin — the brand starts here.",
  },
  {
    year: "2025",
    title: "Editorial framework",
    body: "A structured editorial framework is built around UK-specific compliance: Making Tax Digital, VAT schemes, PAYE RTI, auto-enrolment, CIS, and Self Assessment. Reviews must answer: who is this product genuinely for, and where does it break?",
  },
  {
    year: "Early 2026",
    title: "SterlingPeak launches",
    body: "sterlingpeak.uk goes live with the first set of long-form reviews and comparisons covering Sage, Xero, QuickBooks, FreeAgent and the wider UK SME stack. The SterlingPeak Briefing newsletter starts the same week.",
  },
  {
    year: "Today",
    title: "An independent UK desk",
    body: "SterlingPeak is read across England, Scotland, Wales, and Northern Ireland by sole traders, finance managers, bookkeepers, and accountants. Coverage is verified each VAT cycle. Editorial decisions sit with one named editor.",
  },
];

const principles = [
  {
    label: "01",
    title: "UK-only editorial",
    body: "Every guide is written for HMRC, UK VAT schemes, PAYE RTI, auto-enrolment and Making Tax Digital. Not US tax law translated into pounds.",
  },
  {
    label: "02",
    title: "One named editor",
    body: "Editorial decisions sit with Ayesha. Articles are not auto-generated, not ghost-written, and never published anonymously.",
  },
  {
    label: "03",
    title: "Pricing verified each quarter",
    body: "Vendor pricing is re-verified at the start of each VAT quarter. Every article carries the date pricing was last checked.",
  },
  {
    label: "04",
    title: "Disclosure on every commercial page",
    body: "Affiliate relationships are disclosed inline at the top of every commercial article — not only on a footer link.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO — founder-first ── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-20 text-center md:pb-14 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5 text-[11px] font-heading font-medium text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-cta" />
            Meet the founder
          </span>
          <h1 className="mx-auto mt-7 max-w-2xl font-heading text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.022em] text-brand md:text-[3.25rem]">
            The desk behind SterlingPeak.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            SterlingPeak is run by Hafiza Ayesha Waheed — a UK finance editor
            covering accounting, payroll, and tax software for British small
            businesses, accountants, and finance teams.
          </p>
        </div>
      </section>

      {/* ── PORTRAIT + INTRO STRIP ── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div className="grid gap-10 md:grid-cols-[180px_minmax(0,1fr)] md:items-center md:gap-12">
            <div className="mx-auto md:mx-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-[1.75rem] bg-brand/10 ring-1 ring-inset ring-brand/10 md:h-44 md:w-44">
                <img
                  src={EDITOR_PORTRAIT}
                  alt="Hafiza Ayesha Waheed, Founder & Editor-in-Chief at SterlingPeak"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white shadow-[0_4px_12px_-2px_rgba(34,173,1,0.5)] ring-2 ring-page"
                >
                  <LogoMark size={14} tone="dark" />
                </span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                Hafiza Ayesha Waheed
              </p>
              <p className="mt-2 font-heading text-[1.5rem] font-semibold leading-tight tracking-[-0.014em] text-brand md:text-[1.75rem]">
                Founder &amp; Editor-in-Chief
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                Ayesha writes every issue of The SterlingPeak Briefing and
                personally researches every product the publication reviews.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12.5px] text-brand/65 md:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Greater Manchester, England, United Kingdom
                </span>
                <span aria-hidden className="hidden h-3 w-px bg-brand/15 sm:inline-block" />
                <a
                  href="mailto:hello@sterlingpeak.uk"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cta"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                  hello@sterlingpeak.uk
                </a>
                <span aria-hidden className="hidden h-3 w-px bg-brand/15 sm:inline-block" />
                <a
                  href={EDITOR_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cta"
                >
                  <LinkedInBrand className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL QUOTE — Finns-inspired ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-[11px] font-heading font-semibold text-cta ring-1 ring-inset ring-cta/15">
            <LogoMark size={14} />
            <span className="tracking-[0.005em]">SterlingPeak</span>
          </span>

          <Quote
            className="mx-auto mt-8 h-7 w-7 text-cta/60"
            strokeWidth={1.6}
            aria-hidden
          />

          <blockquote className="mt-3 font-heading text-[1.65rem] font-medium leading-[1.32] tracking-[-0.012em] text-brand md:text-[2.1rem]">
            I started SterlingPeak because every honest piece of UK accounting
            software guidance I needed as an SME finance person was either
            written for an American audience, or quietly sponsored by the
            vendor being reviewed. So I built the publication I wanted to read.
          </blockquote>

          <div className="mt-10 inline-flex flex-col items-center gap-1">
            <span className="font-signature text-[2rem] leading-none text-brand">
              Ayesha W.
            </span>
            <span className="text-[12px] font-heading font-medium tracking-[0.005em] text-brand/55">
              Founder &amp; Editor-in-Chief @SterlingPeak
            </span>
          </div>
        </div>
      </section>

      {/* ── ABOUT STERLINGPEAK ── */}
      <section className="border-t border-border-subtle bg-card/40 py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            The publication
          </p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-brand md:text-[2.5rem]">
            What SterlingPeak is, and what it is not.
          </h2>

          <div className="mt-10 space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
            <p>
              SterlingPeak is an independent UK editorial publication covering
              accounting software, payroll platforms, tax compliance, and
              business operations for sole traders, freelancers, limited
              company directors, finance managers, bookkeepers, and accountants
              across England, Scotland, Wales, and Northern Ireland.
            </p>
            <p>
              The publication&apos;s editorial focus is{" "}
              <strong className="text-brand">Sage UK</strong> and the UK SME
              software stack around it — Sage Sole Trader, Sage Accounting,
              Sage 50, Sage Payroll, Sage HR, Sage 200, Sage Intacct, and Sage
              X3 — alongside Xero, QuickBooks, FreeAgent, BrightPay,
              Moneysoft, BambooHR, Pleo, and the platforms British SMEs
              actually run on. Coverage is grounded in HMRC guidance and UK
              legislation, not US-style benchmarks.
            </p>
            <p>
              SterlingPeak is not a content farm, not a vendor mouthpiece, and
              not a generalist software blog. It is a single editorial desk
              writing a small number of long-form reviews, comparisons, and
              compliance guides — verified each VAT cycle and corrected when
              we get something wrong.
            </p>
          </div>
        </div>
      </section>

      {/* ── JOURNEY / TIMELINE ── */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
              The journey
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-brand md:text-[2.5rem]">
              How we got here.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              SterlingPeak is a small publication with deliberate scope. The
              short version of how the desk came together.
            </p>
          </div>

          <ol className="mt-14 space-y-10 border-l border-border-subtle pl-8 md:space-y-12 md:pl-10">
            {journey.map((step) => (
              <li key={step.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-page ring-1 ring-border-subtle md:-left-[41px]"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-cta" />
                </span>
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                  {step.year}
                </p>
                <p className="mt-2 font-heading text-[1.25rem] font-semibold tracking-[-0.012em] text-brand md:text-[1.4rem]">
                  {step.title}
                </p>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="border-t border-border-subtle py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
            <div>
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                How we work
              </p>
              <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.014em] text-brand md:text-[2.25rem]">
                Editorial standards.
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                The full operating standard sits in our{" "}
                <Link
                  href="/editorial-policy"
                  className="text-brand underline-offset-2 hover:text-cta hover:underline"
                >
                  editorial policy
                </Link>
                . Four principles run through every article.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-subtle bg-border-subtle md:grid-cols-2">
              {principles.map((p) => (
                <div key={p.label} className="bg-page p-7">
                  <span className="font-mono text-[11px] tracking-[0.05em] text-cta/80">
                    {p.label}
                  </span>
                  <p className="mt-4 font-heading text-[1.05rem] font-semibold tracking-[-0.005em] text-brand">
                    {p.title}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK CTA — Finns-inspired ── */}
      <section className="pb-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-brand">
            <div className="px-8 py-16 text-center md:px-14 md:py-24">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-heading font-semibold text-cta ring-1 ring-inset ring-white/10">
                <LogoMark size={14} tone="dark" />
                Read SterlingPeak
              </span>
              <h2 className="mx-auto mt-7 max-w-2xl font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-white md:text-[2.75rem]">
                Subscribe to the publication that takes UK finance software
                seriously.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-relaxed text-white/55">
                One short editorial each Thursday. Free. Unsubscribe in one
                click. Read by UK finance professionals who don&apos;t have
                time for fluff.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <PillButton href="/newsletter" variant="cta" size="md" tone="dark">
                  Join the Briefing
                </PillButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[12.5px] font-heading font-semibold text-white transition-colors hover:bg-white/[0.08]"
                >
                  Contact the editor
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
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

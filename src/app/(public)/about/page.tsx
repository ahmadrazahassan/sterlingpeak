/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Mail,
  MapPin,
  Quote,
  Calculator,
  Users,
  ShieldCheck,
  Scale,
  Briefcase,
  Building2,
  BookOpen,
  Landmark,
} from "lucide-react";
import type { Metadata } from "next";
import { Logo, LogoMark } from "@/components/public/logo";
import { ActionButton } from "@/components/public/action-button";

const EDITOR_PORTRAIT = "/Ayesha.jpeg";

export const metadata: Metadata = {
  title: "About | SterlingPeak",
  description:
    "SterlingPeak is an independent UK editorial publication run by Hafiza Ayesha Waheed, covering accounting, payroll, tax, and software for British SMEs.",
};

/* ── What the desk covers — the coverage map ── */
const coverage = [
  {
    icon: Calculator,
    title: "Accounting & bookkeeping",
    body: "Sage Accounting, Sage 50 and Sage Sole Trader, alongside Xero, QuickBooks and FreeAgent, reviewed the way British bookkeeping actually works rather than by a feature checklist.",
  },
  {
    icon: Users,
    title: "Payroll & people",
    body: "Sage Payroll, BrightPay and Moneysoft, plus Sage HR, BambooHR and Pleo, all judged against how UK payroll, RTI and workplace pensions run in practice.",
  },
  {
    icon: ShieldCheck,
    title: "Tax & compliance",
    body: "Making Tax Digital, UK VAT schemes, Corporation Tax and Self Assessment, written from current HMRC guidance rather than American tax logic.",
  },
  {
    icon: Scale,
    title: "Head to head comparisons",
    body: "The buying decisions British firms genuinely face, from migration to pricing to fit, with pricing checked again at the start of every VAT quarter.",
  },
];

/* ── Editorial standards — how the desk works ── */
const principles = [
  {
    label: "01",
    title: "UK-only editorial",
    body: "Every guide is written for HMRC, UK VAT schemes, PAYE RTI, auto-enrolment and Making Tax Digital. Not US tax law translated into pounds.",
  },
  {
    label: "02",
    title: "One named editor",
    body: "Editorial decisions sit with Ayesha. Nothing is machine written, ghost written or published without a name attached to it.",
  },
  {
    label: "03",
    title: "Pricing verified each quarter",
    body: "Vendor pricing is checked again at the start of each VAT quarter, and every article carries the date it was last confirmed.",
  },
  {
    label: "04",
    title: "Disclosure on every commercial page",
    body: "Affiliate relationships are disclosed inline at the top of every commercial article, not just on a footer link.",
  },
];

/* ── Who the publication is written for ── */
const audience = [
  {
    icon: Briefcase,
    title: "Sole traders & freelancers",
    body: "Choosing a first accounting tool and getting ready for Making Tax Digital without an accountant on retainer.",
  },
  {
    icon: Building2,
    title: "Limited company directors",
    body: "Running payroll, dividends and Corporation Tax on software that scales with the company.",
  },
  {
    icon: BookOpen,
    title: "Bookkeepers & accountants",
    body: "Comparing platforms across a client book and staying current with UK compliance changes.",
  },
  {
    icon: Landmark,
    title: "In-house finance teams",
    body: "Standardising on the right Sage tier and integrations for a growing British business.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO — mission-forward ── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-20 text-center md:pb-16 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5 text-[11px] font-heading font-medium text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-cta" />
            About SterlingPeak
          </span>
          <h1 className="mx-auto mt-7 max-w-2xl font-heading text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.022em] text-brand md:text-[3.25rem]">
            Independent UK software guidance, written by someone who does the
            work.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            SterlingPeak is an independent editorial publication covering the
            accounting, payroll and tax software that British small businesses
            actually run on, tested against UK rules rather than American ones.
          </p>
        </div>
      </section>

      {/* ── THE EDITOR — who is behind it, established up top ── */}
      <section>
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-border-subtle bg-card shadow-[0_40px_80px_-56px_rgba(0,55,72,0.4)]">
            <div className="grid gap-10 p-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:gap-14 md:p-12">
              <div className="mx-auto md:mx-0">
                <div className="relative aspect-square w-44 overflow-hidden rounded-[1.75rem] bg-brand/10 ring-1 ring-inset ring-brand/10 md:w-full">
                  <img
                    src={EDITOR_PORTRAIT}
                    alt="Hafiza Ayesha Waheed, Founder & Editor-in-Chief at SterlingPeak"
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cta text-white shadow-[0_4px_12px_-2px_rgba(34,173,1,0.5)] ring-2 ring-card"
                  >
                    <LogoMark size={15} tone="dark" />
                  </span>
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                  Hafiza Ayesha Waheed
                </p>
                <p className="mt-2 font-heading text-[1.6rem] font-semibold leading-tight tracking-[-0.014em] text-brand md:text-[1.9rem]">
                  Founder &amp; Editor-in-Chief
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  Ayesha writes every review SterlingPeak publishes and
                  personally researches every product the publication covers.
                  Nothing goes out under a house byline or an anonymous name.
                  If her name is on it, she stands behind it.
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
        </div>
      </section>

      {/* ── WHY STERLINGPEAK EXISTS — the origin story ── */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-20">
            <div>
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                Why we exist
              </p>
              <h2 className="mt-3 font-heading text-[1.95rem] font-semibold leading-[1.1] tracking-[-0.016em] text-brand md:text-[2.4rem]">
                Built to be the guide the UK didn&apos;t have.
              </h2>
            </div>

            <div className="space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
              <p>
                Nearly every honest piece of accounting software guidance a UK
                finance person can find has one of two problems. Either it was
                written for an American audience, with a different tax year,
                different rules and different software tiers, or it was quietly
                sponsored by the very vendor under review. Neither one helps you
                make a decision you can defend to HMRC.
              </p>
              <p>
                SterlingPeak was built to close that gap. It is one editorial
                desk writing a small number of long guides, reviews and
                comparisons, focused on the software British firms genuinely run
                on, with <strong className="text-brand">Sage UK</strong> and the
                stack around it at the centre of the coverage.
              </p>
              <p>
                This is a single editorial desk, not a content farm and not a
                vendor&apos;s marketing channel. Everything here is grounded in
                UK legislation, checked again each VAT cycle, and corrected in
                the open on the rare occasion we get something wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER — structured coverage grid ── */}
      <section className="border-y border-border-subtle bg-card/40 py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
              What we cover
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-brand md:text-[2.5rem]">
              Four beats, one UK finance stack.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Deep coverage of a narrow field beats shallow coverage of
              everything. These are the areas the desk reports on, and the only
              ones it claims to know well.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coverage.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex flex-col rounded-[1.4rem] border border-border-subtle bg-page p-7 transition-shadow duration-300 hover:shadow-[0_24px_48px_-32px_rgba(0,55,72,0.35)]"
                >
                  <Icon className="h-7 w-7 text-cta" strokeWidth={1.6} />
                  <p className="mt-5 font-heading text-[1.05rem] font-semibold tracking-[-0.005em] text-brand">
                    {c.title}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL QUOTE ── */}
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
            written for an American audience, or quietly sponsored by the vendor
            being reviewed. So I built the publication I wanted to read.
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

      {/* ── PRINCIPLES — editorial standards ── */}
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

      {/* ── WHO WE'RE FOR — audience ── */}
      <section className="border-t border-border-subtle bg-card/40 py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
              Who we&apos;re for
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-brand md:text-[2.5rem]">
              Written for the people who sign it off.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              SterlingPeak is written for the people across the UK who actually
              choose and run the software, not for the vendors who sell it.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audience.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="flex flex-col rounded-[1.4rem] bg-page p-7 ring-1 ring-brand/[0.07]"
                >
                  <Icon className="h-7 w-7 text-brand" strokeWidth={1.6} />
                  <p className="mt-5 font-heading text-[1.02rem] font-semibold tracking-[-0.005em] text-brand">
                    {a.title}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    {a.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-brand">
            <div className="px-8 py-16 text-center md:px-14 md:py-24">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-heading font-semibold text-cta ring-1 ring-inset ring-white/10">
                <LogoMark size={14} tone="dark" />
                Read SterlingPeak
              </span>
              <h2 className="mx-auto mt-7 max-w-2xl font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-white md:text-[2.75rem]">
                The publication that takes UK finance software seriously.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-relaxed text-white/55">
                Independent reviews and head-to-head comparisons, written for UK
                finance professionals who don&apos;t have time for fluff.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ActionButton
                  href="/comparisons"
                  variant="cta"
                  size="md"
                  tone="dark"
                >
                  Read the comparisons
                </ActionButton>
                <ActionButton
                  href="/contact"
                  variant="ghost"
                  size="md"
                  tone="dark"
                >
                  Contact the editor
                </ActionButton>
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

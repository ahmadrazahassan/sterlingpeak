import Link from "next/link";
import {
  Shield,
  Target,
  RefreshCcw,
  Scale,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SterlingPeak",
  description:
    "SterlingPeak is an independent UK publication delivering research-led accounting, payroll, and business software guidance for growing companies.",
};

const principles = [
  {
    icon: Shield,
    title: "Independence first",
    text: "Commercial relationships never influence what we write. Products are evaluated on merit against the same criteria, whether or not we have a partnership with the provider.",
  },
  {
    icon: Target,
    title: "UK-specific by default",
    text: "Every article considers HMRC requirements, UK payroll legislation, VAT schemes, and the compliance realities that generic review sites overlook.",
  },
  {
    icon: Scale,
    title: "Transparent about revenue",
    text: "Some links on our site are affiliate links — if you click through and subscribe, we may earn a commission at no cost to you. We disclose this clearly and it never affects our editorial conclusions.",
  },
  {
    icon: RefreshCcw,
    title: "Corrections are public",
    text: "If we get something wrong, we fix it and note the change. Readers can report errors through our contact page and we aim to address factual corrections the same day.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            About SterlingPeak
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-brand md:text-5xl">
            Independent software guidance for UK businesses
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            SterlingPeak is an independent UK editorial publication focused on
            accounting software, payroll platforms, tax compliance, and business
            operations for small and medium-sized enterprises. We serve sole
            traders, freelancers, limited company directors, finance managers,
            bookkeepers, and accountants across the United Kingdom.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our editorial team researches products by reviewing vendor
            documentation, testing features directly where possible, referencing
            HMRC guidance and UK legislation, and consulting practitioners with
            hands-on experience. We do not republish vendor press releases or
            rely solely on marketing materials.
          </p>
        </div>
      </section>

      {/* Who we help */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          Who reads SterlingPeak
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-brand">
          Written for the people behind the numbers
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The people who read SterlingPeak are usually dealing with a specific
          problem: choosing between two payroll systems, figuring out which
          accounting platform handles MTD properly, or working out whether
          it&apos;s time to move from spreadsheets to cloud software. We write
          for them — not for search engines, not for vendors.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            {
              who: "Sole traders & freelancers",
              need: "trying to find software that handles Self Assessment and invoicing without overcomplicating things",
            },
            {
              who: "Limited company directors",
              need: "looking for VAT-compliant accounting with proper bank feeds and multi-user access",
            },
            {
              who: "Bookkeepers & accountants",
              need: "evaluating platforms for their practice or advising clients on which tool to adopt",
            },
            {
              who: "Finance managers at growing SMEs",
              need: "comparing payroll, HR, and ERP systems as their team scales beyond basic tools",
            },
          ].map((item) => (
            <div
              key={item.who}
              className="rounded-xl border border-border-subtle bg-card p-4"
            >
              <p className="font-heading text-sm font-semibold text-brand">
                {item.who}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {item.need}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-border-subtle bg-white/50">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <div className="space-y-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Why we exist
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-brand">
                The UK market deserves better
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Most software review sites are built for US audiences — they
                overlook Making Tax Digital, UK payroll legislation, HMRC
                reporting, VAT schemes, and CIS requirements. The result is
                content that doesn&apos;t help the people who actually need it.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We started SterlingPeak because UK finance professionals deserve
                guidance written for the regulatory and operational reality they
                work in every day. Every guide, comparison, and review on this
                site is built around the workflows and compliance obligations
                that matter to businesses registered in England, Scotland, Wales,
                and Northern Ireland.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                What we do
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-brand">
                Research-led, practical, and current
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We evaluate software against the criteria that UK businesses
                actually care about — MTD readiness, payroll accuracy, bank feed
                reliability, reporting depth, and real-world pricing including
                add-ons. Our team references HMRC documentation, tests product
                features, and consults practitioners with hands-on experience.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                When regulations change or a product updates its pricing, we
                update the article. Accuracy isn&apos;t a one-time effort —
                it&apos;s an ongoing commitment.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                How we fund our work
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-brand">
                Transparent affiliate model
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                SterlingPeak earns revenue through affiliate commissions. This
                commercial model funds our editorial work but never influences
                our conclusions. Read our{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="text-accent hover:underline"
                >
                  Affiliate Disclosure
                </Link>{" "}
                and{" "}
                <Link
                  href="/editorial-policy"
                  className="text-accent hover:underline"
                >
                  Editorial Policy
                </Link>{" "}
                for full transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          Meet the editor
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-brand">
          Hafiza Ayesha Waheed
        </h2>
        <p className="mt-1 text-sm font-medium text-accent">
          Founder &amp; Editor-in-Chief
        </p>

        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            I started SterlingPeak because I kept running into the same problem:
            every time I looked for honest guidance on UK accounting or payroll
            software, the results were either written for American businesses or
            clearly sponsored by the vendor being reviewed. Neither helped.
          </p>
          <p>
            UK businesses deal with Making Tax Digital, PAYE RTI submissions,
            auto-enrolment pensions, VAT flat rate schemes, CIS deductions — none
            of which exist in the US. So I built a publication that starts from
            those realities instead of treating them as footnotes.
          </p>
          <p>
            I personally research every product we cover. That means going through
            the actual software, reading HMRC&apos;s technical guidance, checking
            real pricing pages (not just what the sales team quotes), and talking
            to accountants and bookkeepers who use these tools with clients every
            day.
          </p>
          <p>
            When something changes — a price increase, a feature retirement, a new
            MTD deadline — I update the article. I don&apos;t wait for someone to
            report it. Accuracy matters more than publishing speed.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border-subtle bg-white/50">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            How we work
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-brand">
            Editorial principles
          </h2>

          <div className="mt-10 space-y-8">
            {principles.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <item.icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-[15px] font-semibold text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8">
          <h2 className="font-heading text-2xl font-semibold text-white">
            Questions, corrections, or feedback?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
            We take accuracy seriously. If something needs updating or you have a
            question about our editorial approach, get in touch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full bg-cta px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/editorial-policy"
              className="inline-flex h-11 items-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Editorial policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

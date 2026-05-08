import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SterlingPeak",
  description:
    "SterlingPeak is an independent UK publication delivering research-led accounting, payroll, and business software guidance for growing companies.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="font-heading text-4xl font-semibold leading-tight text-brand md:text-5xl">
            Independent software guidance for UK businesses
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            SterlingPeak is a UK-based editorial publication. We research,
            compare, and review accounting, payroll, and business software so
            that finance teams at growing companies can make informed decisions
            without sifting through vendor marketing.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
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
              work in every day. Every guide, comparison, and review on this site
              is built around the workflows and compliance obligations that
              matter to businesses registered in England, Scotland, Wales, and
              Northern Ireland.
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
              update the article. Accuracy isn&apos;t a one-time effort — it&apos;s
              an ongoing commitment.
            </p>
          </div>
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
            {[
              {
                title: "Independence first",
                text: "Commercial relationships never influence what we write. Products are evaluated on merit against the same criteria, whether or not we have a partnership with the provider.",
              },
              {
                title: "UK-specific by default",
                text: "Every article considers HMRC requirements, UK payroll legislation, VAT schemes, and the compliance realities that generic review sites overlook.",
              },
              {
                title: "Transparent about revenue",
                text: "Some links on our site are affiliate links — if you click through and subscribe, we may earn a commission at no cost to you. We disclose this clearly and it never affects our editorial conclusions.",
              },
              {
                title: "Corrections are public",
                text: "If we get something wrong, we fix it and note the change. Readers can report errors through our contact page and we aim to address factual corrections the same day.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cta" />
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
            We take accuracy seriously. If something needs updating or you have
            a question about our editorial approach, get in touch.
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

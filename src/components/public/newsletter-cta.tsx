import { NewsletterForm } from "@/components/public/newsletter-form";

/* ──────────────────────────────────────────────────────────────────
   NewsletterCta — the home page block.

   Built like the top of a printed section front. A folio rule carries
   the publication name on the left and the send schedule on the right,
   the masthead word sits underneath at full width, and the standfirst
   and sign-up sit in two columns below it.

   No wash, no panel, no card. The block earns its weight from type
   size and rules alone, which is what stops it reading like a stock
   subscribe box bolted onto the page.
   ────────────────────────────────────────────────────────────────── */

export function NewsletterCta() {
  return (
    <section
      id="newsletter"
      className="scroll-mt-24 border-t border-border-subtle py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Folio */}
        <div className="flex items-baseline justify-between gap-6 border-b border-brand/15 pb-4">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.24em] text-brand">
            The SterlingPeak Briefing
          </p>
          <p className="shrink-0 font-mono text-[11px] tracking-[0.04em] text-brand/45">
            Thursday, 07:00 UK
          </p>
        </div>

        {/* Masthead */}
        <h2 className="mt-8 font-heading text-[clamp(3.1rem,13vw,9.5rem)] font-semibold leading-[0.83] tracking-[-0.045em] text-brand">
          The Briefing
        </h2>

        {/* Standfirst and sign-up */}
        <div className="mt-12 grid gap-10 border-t border-border-subtle pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
              One email on a Thursday morning. What moved in Making Tax Digital,
              VAT and payroll that week, which accounting software actually
              shipped something worth having, and the price changes worth
              knowing before your next renewal comes up.
            </p>
            <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-brand/55">
              Written at one desk in Greater Manchester for people who run UK
              businesses and the bookkeepers and accountants who look after
              them. British rules, British pricing, no American guidance
              converted into pounds.
            </p>
          </div>

          <div className="lg:pt-1">
            <NewsletterForm source="homepage" className="max-w-lg" />
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border-subtle pt-6">
              {[
                { k: "Cadence", v: "Weekly" },
                { k: "Cost", v: "Free" },
                { k: "Sponsored issues", v: "None" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.18em] text-brand/40">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 font-heading text-[14px] font-semibold text-brand">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

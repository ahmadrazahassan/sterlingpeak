import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy | SterlingPeak",
  description:
    "How SterlingPeak researches, writes and maintains the accuracy of UK accounting and business software content.",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Standards
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-brand">
            Editorial policy
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Our commitment to accuracy, transparency, and practical value for UK
            business readers.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <Section title="Research methodology">
            <p>
              Every article on SterlingPeak is grounded in primary research. We
              review vendor documentation, test software features directly where
              possible, reference HMRC guidance and UK legislation, and consult
              practitioners with hands-on experience. We do not republish vendor
              press releases or rely solely on marketing materials.
            </p>
            <p>
              For comparison articles, we evaluate products against a consistent
              set of criteria: MTD and VAT compliance, payroll and auto-enrolment
              capabilities, bank feed quality, reporting depth, integration
              ecosystem, pricing transparency, and onboarding experience.
            </p>
          </Section>

          <Section title="Independence from commercial partners">
            <p>
              Editorial decisions are made independently of commercial
              relationships. SterlingPeak participates in affiliate programmes,
              but commission arrangements never determine which products we
              recommend, the conclusions we reach, or how we structure our
              content.
            </p>
            <p>
              Writers and editors are not informed of specific affiliate
              commission rates during the editorial process. Product evaluations
              follow the same methodology regardless of whether an affiliate
              relationship exists.
            </p>
          </Section>

          <Section title="How comparisons work">
            <p>
              Our comparison articles are structured around the real factors UK
              finance teams consider when choosing software:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>HMRC compliance: Making Tax Digital, VAT, CIS, PAYE RTI</li>
              <li>
                Feature depth: invoicing, bank reconciliation, multi-currency,
                project costing
              </li>
              <li>Payroll: auto-enrolment, statutory pay, P11D, P60</li>
              <li>
                Ecosystem: integrations with banks, payment providers and other
                business tools
              </li>
              <li>
                Pricing: total cost including add-ons, per-user fees and
                scaling costs
              </li>
              <li>Usability: onboarding, learning curve and support quality</li>
            </ul>
            <p className="mt-3">
              We clearly state the date of our most recent review so readers
              know how current the information is.
            </p>
          </Section>

          <Section title="Updates and corrections">
            <p>
              Accounting software, tax regulations, and pricing change
              frequently. We proactively update articles when we become aware of
              material changes. Significant corrections are noted within the
              article.
            </p>
            <p>
              If you spot an error or outdated information, we encourage you to{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact our editorial team
              </Link>
              . We aim to review and address factual corrections within 24 hours.
            </p>
          </Section>

          <Section title="Pricing verification">
            <p>
              Software pricing changes frequently. We verify pricing information
              at the time of publication and note the date of our most recent
              check within each article. Readers should always confirm current
              pricing directly with the provider before making a purchase
              decision.
            </p>
            <p>
              If you notice outdated pricing on any SterlingPeak article, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact our editorial team
              </Link>{" "}
              and we will update it promptly.
            </p>
          </Section>

          <Section title="Affiliate disclosure practices">
            <p>
              Pages containing affiliate links display a clear disclosure notice
              near the top of the article, naming the affiliate relationships
              that apply, with the date pricing was last verified. We also
              maintain a dedicated{" "}
              <Link
                href="/affiliate-disclosure"
                className="text-accent hover:underline"
              >
                Affiliate Disclosure
              </Link>{" "}
              page that explains our commercial relationships in full.
            </p>
          </Section>

          <Section title="Where Sage fits in our coverage">
            <p>
              Sage is the most widely deployed UK accounting and payroll
              software stack across small business, SMB, and mid-market
              segments, and it sits at the centre of our reviews because that
              is where most of our readers operate.
            </p>
            <p>
              We cover the full Sage UK product line at the editorial level:
              Sage Sole Trader, Sage Accounting, Sage 50, Sage Payroll, Sage
              HR, Sage 200, Sage Intacct and Sage X3. SterlingPeak
              participates in the Sage UK affiliate programme. Where Sage is
              genuinely the best fit for a UK business profile we say so;
              where another product is the better fit (FreeAgent for some
              freelancer setups, BrightPay for some payroll-only users, Xero
              for some bookkeeping practices), we say that instead.
            </p>
            <p>
              Sage product positioning, pricing, and feature claims are
              verified each VAT cycle against Sage&apos;s UK pricing pages and
              Sage UK partner documentation. Where Sage updates pricing,
              releases new SKUs, or changes plan structure, the relevant
              article is updated and the verification date refreshed.
            </p>
          </Section>

          <Section title="Operating specifics">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-brand">Pricing re-verification:</strong>{" "}
                vendor pricing on every active review and comparison is
                re-verified at the start of each VAT quarter (January, April,
                July, October).
              </li>
              <li>
                <strong className="text-brand">Minimum article depth:</strong>{" "}
                product reviews are a minimum 2,000 words and comparisons a
                minimum 2,500 words. Articles below these thresholds are not
                published.
              </li>
              <li>
                <strong className="text-brand">Conflict declarations:</strong>{" "}
                where the editor or contributor has a personal relationship
                with a named product or vendor, this is declared inline at the
                top of the article.
              </li>
              <li>
                <strong className="text-brand">Pre-publication review:</strong>{" "}
                every article is reviewed by the editor for accuracy, UK
                compliance framing, and disclosure placement before
                publication.
              </li>
              <li>
                <strong className="text-brand">Correction handling:</strong>{" "}
                factual corrections are addressed within 24 hours of becoming
                aware of the error. Material corrections are noted at the foot
                of the article with the correction date.
              </li>
            </ul>
          </Section>

          <div className="rounded-2xl border border-border-subtle bg-white p-6">
            <p className="font-heading text-[15px] font-semibold text-brand">
              Questions about our editorial standards?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We welcome scrutiny and feedback. If you have concerns about any
              content on SterlingPeak, we&apos;d like to hear from you.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-10 items-center rounded-full bg-cta px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact editorial team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-heading text-lg font-semibold text-brand">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

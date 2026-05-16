import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — SterlingPeak",
  description:
    "How SterlingPeak uses affiliate links, maintains editorial independence, and funds free content for UK businesses.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Transparency
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-brand">
            Affiliate disclosure
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            How we fund this publication and why it doesn&apos;t affect what we
            write.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <Section title="How SterlingPeak earns revenue">
            <p>
              SterlingPeak is free to read. We earn revenue through affiliate
              commissions when readers click certain links and go on to
              subscribe to or purchase a product, including but not limited to
              Sage UK products. Sage UK is our primary editorial focus and our
              largest affiliate relationship. Commission is paid by the
              software provider at no extra cost to you, and the price you pay
              is identical whether you use our link or go directly to the
              provider&apos;s website. Commission never determines which
              products we recommend, the order they appear in, or how we score
              them.
            </p>
          </Section>

          <Section title="Which programmes we participate in">
            <p>
              SterlingPeak participates in affiliate and referral programmes
              operated by UK accounting, payroll, and business software
              providers. Our active programmes include the{" "}
              <strong className="text-brand">Sage UK affiliate programme</strong>{" "}
              and other UK-relevant providers we cover editorially. Where an
              article contains affiliate links, it is clearly marked with a
              disclosure notice near the top of the page, naming the affiliate
              relationships that apply and the date pricing was last verified.
            </p>
          </Section>

          <Section title="Our editorial commitment">
            <div className="mt-2 rounded-2xl border border-border-subtle bg-white p-6">
              <p className="mb-4">
                SterlingPeak may earn a commission when readers click certain
                links on this website and go on to sign up for or purchase a
                product. This commission is paid by the software provider at no
                additional cost to you. Our editorial team evaluates every
                product independently using the same criteria, regardless of
                whether an affiliate relationship exists. Commission arrangements
                never influence which products we recommend, the conclusions we
                reach, or the order in which products appear. We regularly
                recommend products where we have no commercial relationship. If a
                free or lower-cost tool is the better fit, we say so. For full
                details on how we research and review products, see our{" "}
                <Link
                  href="/editorial-policy"
                  className="text-accent hover:underline"
                >
                  Editorial Policy
                </Link>
                .
              </p>
              <ul className="space-y-4">
                {[
                  "Affiliate relationships do not influence editorial conclusions. Products are evaluated on features, compliance, usability, and value.",
                  "We regularly recommend products where we have no commercial relationship. If a tool is the best choice, we say so regardless.",
                  "Our editorial team evaluates products without visibility into the commercial terms of any partnership.",
                  "Articles containing affiliate links always include a disclosure notice so you know where commercial relationships exist.",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cta" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="How affiliate links work">
            <p>
              When you click an affiliate link, a small tracking identifier is
              passed to the provider so they can attribute the referral. If you
              subscribe or purchase within the provider&apos;s attribution window,
              we receive a commission. This tracking does not give us access to
              your personal information on the provider&apos;s site.
            </p>
          </Section>

          <Section title="Your choice">
            <p>
              You are never obligated to use our links. You can navigate to any
              product directly via the provider&apos;s website. Our content and
              recommendations remain the same regardless of how you get there.
            </p>
          </Section>

          <Section title="Questions?">
            <p>
              If you have any questions about our affiliate relationships or want
              to report a concern, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact us
              </Link>
              . For more on how we maintain independence, see our{" "}
              <Link href="/editorial-policy" className="text-accent hover:underline">
                Editorial Policy
              </Link>
              .
            </p>
          </Section>
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

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — SterlingPeak",
  description:
    "Terms governing the use of sterlingpeak.uk, including content disclaimers, intellectual property, and limitation of liability.",
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-page/60">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-brand">
            Terms &amp; conditions
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: 1 May 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <Section title="1. Acceptance of terms">
            <p>
              By accessing or using sterlingpeak.uk (&quot;the Site&quot;), you
              agree to be bound by these Terms &amp; Conditions. If you do not
              agree, please do not use the Site. SterlingPeak reserves the right
              to update these terms at any time; continued use after changes
              constitutes acceptance.
            </p>
          </Section>

          <Section title="2. Nature of content">
            <p>
              All content published on the Site — including articles, guides,
              reviews, and comparisons — is for general informational purposes
              only. It does not constitute financial, legal, tax, or professional
              advice. Software features, pricing, and regulatory requirements
              change frequently; always verify details directly with the vendor
              and consult a qualified professional before making business
              decisions.
            </p>
          </Section>

          <Section title="3. Affiliate relationships">
            <p>
              SterlingPeak participates in affiliate and referral programmes
              with UK software providers. Some links on the Site are
              affiliate links, meaning we may earn a commission if you click
              through and purchase or subscribe to a product. This comes at no
              additional cost to you. Affiliate relationships do not influence
              editorial content or product evaluations. Full details are
              available in our{" "}
              <Link href="/affiliate-disclosure" className="text-accent hover:underline">
                Affiliate Disclosure
              </Link>.
            </p>
          </Section>

          <Section title="4. Intellectual property">
            <p>
              All content, design, logos, and trademarks on the Site are the
              property of SterlingPeak or its licensors. You may not reproduce,
              distribute, or republish any material without prior written
              permission. Brief quotations with attribution and a link back to
              the original article are permitted for non-commercial editorial
              purposes.
            </p>
          </Section>

          <Section title="5. User conduct">
            <p>
              When submitting information through forms on the Site (contact,
              newsletter, or contributions), you agree to provide accurate
              information and not to transmit any content that is unlawful,
              defamatory, or infringes on the rights of others. SterlingPeak
              reserves the right to remove any submission at its discretion.
            </p>
          </Section>

          <Section title="6. Third-party links">
            <p>
              The Site contains links to third-party websites and services. We
              are not responsible for the content, accuracy, or privacy practices
              of external sites. Following a link to a third-party site is at
              your own risk.
            </p>
          </Section>

          <Section title="7. Disclaimer of warranties">
            <p>
              The Site and its content are provided &quot;as is&quot; without
              warranties of any kind, either express or implied. SterlingPeak
              does not guarantee the accuracy, completeness, or timeliness of
              information published on the Site. Product comparisons are based on
              publicly available information and our independent research at the
              time of publication.
            </p>
          </Section>

          <Section title="8. Limitation of liability">
            <p>
              To the fullest extent permitted by law, SterlingPeak shall not be
              liable for any indirect, incidental, consequential, or punitive
              damages arising from your use of the Site, including reliance on
              any content, product reviews, or comparisons published here.
            </p>
          </Section>

          <Section title="9. Governing law">
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of England and Wales. Any disputes arising in connection
              with these terms shall be subject to the exclusive jurisdiction of
              the courts of England and Wales.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              If you have questions about these terms, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact us
              </Link>.
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

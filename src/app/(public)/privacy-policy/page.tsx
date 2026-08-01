import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SterlingPeak",
  description:
    "How SterlingPeak collects, uses and protects your personal information in accordance with UK GDPR and the Data Protection Act 2018.",
};

const POLICY_LAST_UPDATED = "16 May 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-page/60">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-brand">
            Privacy policy
          </h1>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-[12px] font-heading font-medium text-cta ring-1 ring-inset ring-cta/15">
            <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-[1.5px] bg-cta" />
            Last updated: {POLICY_LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <Section title="1. Who we are">
            <p>
              SterlingPeak (sterlingpeak.uk) is an independent UK editorial
              publication covering accounting, payroll, tax, and business
              software for UK SMEs. SterlingPeak is operated by{" "}
              <strong className="text-brand">Muhammad Ilyas</strong>, a
              sole trader publisher based in Greater Manchester, England,
              United Kingdom, who is the data controller for personal
              information collected through this website. You can reach the
              controller at{" "}
              <a
                href="mailto:hello@sterlingpeak.uk"
                className="text-accent hover:underline"
              >
                hello@sterlingpeak.uk
              </a>
              .
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>We collect personal information in the following ways:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-brand">Newsletter sign-up:</strong> Email
                address and optionally your first name, to send our weekly
                briefing.
              </li>
              <li>
                <strong className="text-brand">Contact form:</strong> Name, email
                address, company (optional), subject, and message content, to
                respond to your enquiry.
              </li>
              <li>
                <strong className="text-brand">Analytics:</strong> Aggregated and
                anonymised usage data (pages visited, referral source, device
                type) collected to improve site content and performance.
              </li>
              <li>
                <strong className="text-brand">Cookies:</strong> Essential cookies
                for site functionality and, where consent is given, analytics
                cookies. See our{" "}
                <Link href="/cookie-policy" className="text-accent hover:underline">
                  Cookie Policy
                </Link>{" "}
                for details.
              </li>
            </ul>
          </Section>

          <Section title="3. How we use your information">
            <ul className="list-disc space-y-2 pl-6">
              <li>To deliver the newsletter you subscribed to</li>
              <li>To respond to contact form enquiries</li>
              <li>
                To improve our content, editorial coverage, and site performance
              </li>
              <li>
                To comply with legal obligations under UK GDPR and the Data
                Protection Act 2018
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information with third
              parties for marketing purposes.
            </p>
          </Section>

          <Section title="4. Lawful basis for processing">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-brand">Consent:</strong> Newsletter
                subscriptions and non-essential cookies
              </li>
              <li>
                <strong className="text-brand">Legitimate interest:</strong>{" "}
                Responding to enquiries, improving content quality, and
                maintaining site security
              </li>
              <li>
                <strong className="text-brand">Legal obligation:</strong>{" "}
                Retaining records where required by law
              </li>
            </ul>
          </Section>

          <Section title="5. Data sharing">
            <p>
              We share personal data only with trusted service providers who
              process it on our behalf:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-brand">Hosting provider:</strong> For
                serving the website securely
              </li>
              <li>
                <strong className="text-brand">Email service:</strong> For
                delivering newsletters
              </li>
              <li>
                <strong className="text-brand">Database provider:</strong> For
                storing contact form submissions securely
              </li>
            </ul>
            <p className="mt-3">
              All processors are contractually obligated to handle data in
              accordance with UK GDPR requirements.
            </p>
          </Section>

          <Section title="6. Data retention">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Newsletter subscriber data is retained until you unsubscribe
              </li>
              <li>
                Contact form submissions are retained for up to 24 months and
                then deleted
              </li>
              <li>
                Analytics data is aggregated and anonymised; no individual data
                is retained beyond 26 months
              </li>
            </ul>
          </Section>

          <Section title="7. Your rights">
            <p>
              Under UK GDPR, you have the right to access, rectify, erase,
              restrict processing of, and port your personal data. You may also
              withdraw consent at any time. To exercise any of these rights,
              please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact us
              </Link>.
            </p>
            <p className="mt-3">
              You also have the right to lodge a complaint with the Information
              Commissioner&apos;s Office (ICO) at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                ico.org.uk
              </a>.
            </p>
          </Section>

          <Section title="8. International transfers">
            <p>
              Where data is processed outside the UK, we ensure appropriate
              safeguards are in place, including Standard Contractual Clauses or
              adequacy decisions recognised by the UK government.
            </p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>
              We may update this privacy policy from time to time. Material
              changes will be noted on this page with an updated date.
              Continued use of the Site after changes constitutes acceptance.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For privacy-related enquiries, write to{" "}
              <a
                href="mailto:hello@sterlingpeak.uk"
                className="text-accent hover:underline"
              >
                hello@sterlingpeak.uk
              </a>{" "}
              with the subject &quot;Privacy enquiry&quot;, or{" "}
              <Link href="/contact" className="text-accent hover:underline">
                use the contact form
              </Link>
              . You may also lodge a complaint with the Information
              Commissioner&apos;s Office (ICO) at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                ico.org.uk
              </a>
              .
            </p>
            <p className="text-[12.5px] text-muted-foreground/70">
              Last updated: {POLICY_LAST_UPDATED}.
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

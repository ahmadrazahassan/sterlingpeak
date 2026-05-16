import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — SterlingPeak",
  description:
    "How SterlingPeak uses cookies and similar technologies on sterlingpeak.uk.",
};

const COOKIE_POLICY_LAST_UPDATED = "16 May 2026";

const cookies = [
  {
    category: "Essential",
    description:
      "Required for the website to function correctly. These cookies enable core features such as page navigation, session management, and security. They cannot be disabled.",
    examples: "Session tokens, CSRF protection, cookie consent preferences",
    duration: "Session / 1 year",
  },
  {
    category: "Analytics",
    description:
      "Help us understand how visitors interact with the Site by collecting aggregated, anonymised data. This information is used to improve content quality and user experience.",
    examples: "Page views, referral sources, device and browser type",
    duration: "Up to 26 months",
  },
  {
    category: "Functional",
    description:
      "Remember your preferences and settings to provide a more personalised experience, such as your preferred content region or newsletter sign-up state.",
    examples: "Newsletter acknowledgment, display preferences",
    duration: "Up to 12 months",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-page/60">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-brand">
            Cookie policy
          </h1>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-[12px] font-heading font-medium text-cta ring-1 ring-inset ring-cta/15">
            <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-[1.5px] bg-cta" />
            Last updated: {COOKIE_POLICY_LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <Section title="What are cookies?">
            <p>
              Cookies are small text files stored on your device when you visit a
              website. They serve various purposes including remembering your
              preferences, understanding how you use the site, and improving your
              overall experience. SterlingPeak uses cookies in accordance with UK
              GDPR and the Privacy and Electronic Communications Regulations
              (PECR).
            </p>
          </Section>

          <Section title="Cookies we use">
            <div className="mt-4 overflow-hidden rounded-xl border border-border-subtle">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-page">
                    <th className="px-4 py-3 text-left font-heading text-[12px] font-semibold uppercase tracking-wide text-brand">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-heading text-[12px] font-semibold uppercase tracking-wide text-brand">
                      Purpose
                    </th>
                    <th className="hidden px-4 py-3 text-left font-heading text-[12px] font-semibold uppercase tracking-wide text-brand sm:table-cell">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((c) => (
                    <tr key={c.category} className="border-t border-border-subtle">
                      <td className="px-4 py-3 align-top font-medium text-brand">
                        {c.category}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {c.description}
                      </td>
                      <td className="hidden px-4 py-3 align-top text-muted-foreground sm:table-cell">
                        {c.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm">
              SterlingPeak does not use marketing or advertising cookies. We do
              not participate in cross-site tracking or retargeting.
            </p>
          </Section>

          <Section title="Third-party cookies">
            <p>
              Some cookies may be set by third-party services we use, such as
              analytics providers or embedded content (e.g. video players). These
              cookies are governed by the respective third party&apos;s privacy
              policy. We select partners that comply with data protection
              regulations.
            </p>
          </Section>

          <Section title="Managing cookies">
            <p>
              You can control and delete cookies through your browser settings.
              Please note that disabling essential cookies may affect the
              functionality of the Site. Most browsers allow you to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>View what cookies are stored on your device</li>
              <li>Delete individual or all cookies</li>
              <li>Block cookies from specific or all websites</li>
              <li>Block third-party cookies</li>
              <li>Accept all cookies</li>
            </ul>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this cookie policy to reflect changes in our
              practices or for operational, legal, or regulatory reasons.
              Changes will be posted on this page with an updated date.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For questions about our use of cookies, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact us
              </Link>{" "}
              or see our{" "}
              <Link href="/privacy-policy" className="text-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              for broader data protection information.
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

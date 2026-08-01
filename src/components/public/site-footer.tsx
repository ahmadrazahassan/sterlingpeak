import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/public/logo";
import { ManageCookiesLink } from "@/components/public/manage-cookies-link";
import { NewsletterForm } from "@/components/public/newsletter-form";

type FooterSettings = {
  statement: string;
  supporting: string;
};

const explore = [
  { label: "Accounting", href: "/categories/accounting" },
  { label: "Business Software", href: "/categories/business-software" },
  { label: "Comparisons", href: "/comparisons" },
  { label: "Payroll & HR", href: "/categories/payroll-hr" },
  { label: "VAT & Tax", href: "/categories/vat-tax" },
];

const resources = [
  { label: "Small Business Guides", href: "/categories/small-business-guides" },
  { label: "Payments & Banking", href: "/categories/payments-banking" },
  { label: "ERP & Operations", href: "/categories/erp-operations" },
  { label: "Industry Solutions", href: "/categories/industry-solutions" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

type Props = {
  footer: FooterSettings;
};

export function SiteFooter({ footer }: Props) {
  return (
    <footer className="relative mt-auto">
      <div className="bg-brand rounded-t-[2.5rem] text-white">
        {/* ── Briefing sign-up ──────────────────────────────────────
           Sits above the link columns, on its own rule. Deliberately
           quiet: a label, one line of copy, and the form. The reader
           who wants it will find it, and it does not shout over the
           navigation underneath.
           ────────────────────────────────────────────────────────── */}
        <div className="border-b border-white/8">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
              <div>
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-white/35">
                  The SterlingPeak Briefing
                </p>
                <p className="mt-3 max-w-sm font-heading text-[1.25rem] font-semibold leading-[1.25] tracking-[-0.012em] text-white">
                  UK accounting and payroll, once a week
                </p>
                <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-white/55">
                  Thursday mornings. What changed at HMRC, what the software
                  shipped, and what it costs now.{" "}
                  <Link
                    href="/newsletter"
                    className="text-white underline underline-offset-2 transition-colors hover:text-cta"
                  >
                    See what is inside
                  </Link>
                  .
                </p>
              </div>
              <NewsletterForm source="footer" tone="dark" className="lg:ml-auto" />
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div>
              <Logo variant="full" size="md" tone="dark" />
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
                {footer.supporting ||
                  "Independent UK publication covering accounting software, payroll, tax compliance, and business operations for SMEs and growing companies."}
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-[13px]">
                <li>
                  <a
                    href="mailto:hello@sterlingpeak.uk"
                    className="inline-flex items-center gap-2.5 text-white/55 transition-colors hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span>hello@sterlingpeak.uk</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Explore", links: explore },
                { title: "Resources", links: resources },
                { title: "Company", links: company },
                { title: "Legal", links: legal },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-widest text-white/35">
                    {col.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-[13px] text-white/65 transition-colors hover:text-white"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                    {col.title === "Legal" && (
                      <li>
                        <ManageCookiesLink />
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Publisher block + bottom bar */}
        <div className="border-t border-white/8">
          <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
            {/* Three-line publisher block */}
            <dl className="grid gap-x-10 gap-y-5 text-[12.5px] leading-relaxed md:grid-cols-3">
              <div>
                <dt className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-white/35">
                  Publisher
                </dt>
                <dd className="mt-2 text-white/65">
                  Muhammad Ilyas, sole trader publisher based in
                  Greater Manchester, England, United Kingdom.
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-white/35">
                  Correspondence
                </dt>
                <dd className="mt-2 text-white/65">
                  <a
                    href="mailto:hello@sterlingpeak.uk"
                    className="text-white underline-offset-2 transition-colors hover:text-cta hover:underline"
                  >
                    hello@sterlingpeak.uk
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-white/35">
                  Data &amp; privacy
                </dt>
                <dd className="mt-2 text-white/65">
                  See our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-white underline-offset-2 transition-colors hover:text-cta hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for UK GDPR enquiries.
                </dd>
              </div>
            </dl>

            {/* Bottom rule */}
            <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/[0.06] pt-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
              <p>
                &copy; {new Date().getFullYear()} SterlingPeak. All rights
                reserved.
              </p>
              <p>sterlingpeak.uk</p>
              <a href="#top" className="transition-colors hover:text-white">
                Back to top &uarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

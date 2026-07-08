import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/public/logo";
import { ManageCookiesLink } from "@/components/public/manage-cookies-link";

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
                  Hafiza Ayesha Waheed, sole-trader publisher based in
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

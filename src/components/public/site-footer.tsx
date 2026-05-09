import Link from "next/link";
import { Mail, Mountain } from "lucide-react";
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
        {/* Newsletter strip */}
        <div className="border-b border-white/8">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-12 pt-14 md:grid-cols-[1fr_1.2fr] md:px-8 md:pt-16">
            <div>
              <p className="font-heading text-xl font-semibold">The SterlingPeak Briefing</p>
              <p className="mt-2 text-sm text-white/55">
                UK software updates, HMRC changes, and editorial analysis — weekly.
              </p>
            </div>
            <NewsletterForm source="footer" variant="dark" />
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                  <Mountain className="h-4 w-4 text-white" aria-hidden />
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cta" />
                </span>
                <p className="font-heading text-lg font-semibold tracking-tight">SterlingPeak</p>
              </div>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/50">
                {footer.supporting ||
                  "Independent UK publication covering accounting software, payroll, tax compliance, and business operations for SMEs and growing companies."}
              </p>
              <a
                href="mailto:hello@sterlingpeak.uk"
                className="mt-4 inline-flex items-center gap-2 text-[13px] text-white/50 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                hello@sterlingpeak.uk
              </a>
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

        {/* Bottom bar */}
        <div className="border-t border-white/8">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-5 text-[11px] text-white/35 sm:flex-row sm:justify-between md:px-8">
            <p>&copy; {new Date().getFullYear()} SterlingPeak. All rights reserved.</p>
            <p>sterlingpeak.uk</p>
            <a href="#top" className="transition-colors hover:text-white">
              Back to top &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

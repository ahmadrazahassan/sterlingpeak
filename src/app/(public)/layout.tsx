import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { fetchFeaturedComparisons } from "@/lib/queries/articles";
import { fetchSiteSettingsMap, getSetting } from "@/lib/queries/site-settings";
import type { FooterJson, MegaMenuJson } from "@/lib/settings-types";

const defaultMega: MegaMenuJson = {
  softwareFeatured: {
    title: "Sage vs Xero: Which is better for UK SMEs?",
    description:
      "Compare features, pricing, payroll, VAT support, and reporting workflows.",
    href: "/comparisons",
    ctaLabel: "Read comparison",
  },
};

const defaultFooter: FooterJson = {
  statement: "Helping UK businesses make smarter financial technology decisions.",
  supporting:
    "SterlingPeak publishes practical accounting, payroll, tax, and business software insights for SMEs and growing companies.",
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSiteSettingsMap();
  const mega = getSetting<MegaMenuJson>(settings, "mega_menu", defaultMega);
  const footer = getSetting<FooterJson>(settings, "footer", defaultFooter);
  const comparisons = await fetchFeaturedComparisons(8);
  const softwareFeatured = mega.softwareFeatured ?? defaultMega.softwareFeatured;

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader
        softwareFeatured={softwareFeatured}
        comparisonArticles={comparisons.map((a) => ({
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
        }))}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter footer={footer} />
    </div>
  );
}

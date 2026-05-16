import { HomePage } from "@/components/public/home-page";
import { fetchActiveCategories } from "@/lib/queries/categories";
import {
  fetchFeaturedComparisons,
  fetchLatestInsights,
  fetchArticlesGroupedByCategory,
} from "@/lib/queries/articles";
import { fetchSiteSettingsMap, getSetting } from "@/lib/queries/site-settings";
import type {
  FeaturedComparisonsSectionJson,
  HeroJson,
  LatestSectionJson,
  NewsletterSectionJson,
  TrustSectionJson,
} from "@/lib/settings-types";
import type { Metadata } from "next";
import { JsonLd } from "@/components/public/json-ld";
import { DEFAULT_TRUST } from "@/lib/default-content";

const fallbacks = {
  hero: {
    eyebrow: "Independent UK Finance Publication",
    heading: "UK accounting and payroll software, reviewed properly.",
    description:
      "Editorial reviews and head-to-head comparisons of Sage, Xero, QuickBooks, FreeAgent, and the payroll, VAT, and operations software UK SMEs actually run on. Written for HMRC, Making Tax Digital, and UK GAAP — not US tax law translated into pounds.",
    ctaPrimaryLabel: "Read the comparisons",
    ctaPrimaryHref: "/comparisons",
    ctaSecondaryLabel: "Editorial guides",
    ctaSecondaryHref: "/categories/accounting",
  } satisfies HeroJson,
  featured_comparisons_section: {
    title: "Software, compared properly.",
    subtitle:
      "Real GBP pricing, MTD support, payroll and HR fit, and where each platform breaks. Updated as vendors and HMRC rules change.",
  } satisfies FeaturedComparisonsSectionJson,
  latest_section: { title: "From the desk" } satisfies LatestSectionJson,
  newsletter_section: {
    title: "One UK finance email a week. Worth opening.",
    description:
      "Software pricing changes, HMRC updates, MTD deadlines, and the editorial analysis the desk thinks UK finance teams should read this week.",
  } satisfies NewsletterSectionJson,
  trust_section: DEFAULT_TRUST,
};

export const metadata: Metadata = {
  title: "SterlingPeak — UK Accounting & Business Software Intelligence",
  description:
    "Independent editorial coverage of Sage, Xero, QuickBooks, payroll, tax compliance, and business operations for UK SMEs.",
};

export default async function Page() {
  const settings = await fetchSiteSettingsMap();
  const hero = getSetting<HeroJson>(settings, "hero", fallbacks.hero);
  const featuredSection = getSetting<FeaturedComparisonsSectionJson>(
    settings,
    "featured_comparisons_section",
    fallbacks.featured_comparisons_section,
  );
  const latestSection = getSetting<LatestSectionJson>(
    settings,
    "latest_section",
    fallbacks.latest_section,
  );
  const newsletterSection = getSetting<NewsletterSectionJson>(
    settings,
    "newsletter_section",
    fallbacks.newsletter_section,
  );
  const trustSection = getSetting<TrustSectionJson>(
    settings,
    "trust_section",
    fallbacks.trust_section,
  );

  const categories = await fetchActiveCategories();
  const categorySlugs = categories.map((c) => c.slug);

  const [featuredComparisons, latestArticles, articlesByCategory] =
    await Promise.all([
      fetchFeaturedComparisons(6),
      fetchLatestInsights(10),
      fetchArticlesGroupedByCategory(categorySlugs, 6),
    ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sterlingpeak.uk";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "SterlingPeak",
              url: siteUrl,
              description:
                "Independent UK publication covering accounting software, payroll, tax compliance, and business operations for SMEs.",
            },
            {
              "@type": "WebSite",
              name: "SterlingPeak",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }}
      />
      <HomePage
        hero={hero}
        featuredSection={featuredSection}
        latestSection={latestSection}
        newsletterSection={newsletterSection}
        trustSection={trustSection.columns?.length ? trustSection : DEFAULT_TRUST}
        featuredComparisons={featuredComparisons}
        latestArticles={latestArticles}
        categories={categories}
        articlesByCategory={articlesByCategory}
      />
    </>
  );
}

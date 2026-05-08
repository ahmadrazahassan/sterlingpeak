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
    heading: "The accounting and payroll intelligence UK businesses read first",
    description:
      "SterlingPeak publishes in-depth comparisons, editorial guides, and compliance-focused analysis for Sage, Xero, QuickBooks, and the platforms UK SMEs depend on every day.",
    ctaPrimaryLabel: "Read our comparisons",
    ctaPrimaryHref: "/comparisons",
    ctaSecondaryLabel: "Browse editorial guides",
    ctaSecondaryHref: "/categories/accounting",
  } satisfies HeroJson,
  featured_comparisons_section: {
    title: "Head-to-head software comparisons",
    subtitle:
      "Side-by-side analysis of UK accounting, payroll, and business platforms — pricing, MTD compliance, integrations, and workflow trade-offs.",
  } satisfies FeaturedComparisonsSectionJson,
  latest_section: { title: "Recently published" } satisfies LatestSectionJson,
  newsletter_section: {
    title: "The SterlingPeak Briefing",
    description:
      "A weekly dispatch covering UK software updates, HMRC changes, and the editorial analysis our readers rely on.",
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

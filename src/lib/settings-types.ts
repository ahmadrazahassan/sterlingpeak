import type { MegaFeatured } from "@/components/public/site-header";

export type HeroJson = {
  eyebrow: string;
  heading: string;
  description: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type FeaturedComparisonsSectionJson = {
  title: string;
  subtitle: string;
};

export type FrameworkStep = { n: number; title: string; body: string };

export type FrameworkSectionJson = {
  title: string;
  subtitle: string;
  steps: FrameworkStep[];
};

export type CategoriesSectionJson = { title: string };

export type LatestSectionJson = { title: string };

export type IndustriesSectionJson = { title: string; subtitle: string };

export type ToolkitItem = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export type ToolkitSectionJson = { title: string; subtitle: string };

export type TrustColumn = { title: string; body: string };

export type TrustSectionJson = { title: string; columns: TrustColumn[] };

export type FinalCtaJson = {
  title: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type FooterJson = { statement: string; supporting: string };

export type MegaMenuJson = { softwareFeatured: MegaFeatured };

export type IndustryCard = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

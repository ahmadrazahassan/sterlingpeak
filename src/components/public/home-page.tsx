import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  ClipboardList,
  Landmark,
  UserRound,
} from "lucide-react";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { LogoMarquee } from "@/components/public/logo-marquee";
import {
  ArticleCardHorizontal,
  ArticleCardIndex,
  ArticleCardMagazine,
  ArticleCardPoster,
  ArticleCardStandard,
  SectionHeader,
} from "@/components/public/article-card";
import { PillButton } from "@/components/public/pill-button";
import type { ArticleRow } from "@/lib/queries/articles";
import type { CategoryRow } from "@/lib/queries/categories";
import type {
  FeaturedComparisonsSectionJson,
  HeroJson,
  LatestSectionJson,
  NewsletterSectionJson,
  TrustSectionJson,
} from "@/lib/settings-types";
import { MotionSection } from "@/components/public/motion-section";

type Props = {
  hero: HeroJson;
  featuredSection: FeaturedComparisonsSectionJson;
  latestSection: LatestSectionJson;
  newsletterSection: NewsletterSectionJson;
  trustSection: TrustSectionJson;
  featuredComparisons: ArticleRow[];
  latestArticles: ArticleRow[];
  categories: CategoryRow[];
  articlesByCategory: Record<string, ArticleRow[]>;
};

export function HomePage({
  hero,
  featuredSection,
  latestSection,
  newsletterSection,
  trustSection,
  featuredComparisons,
  latestArticles,
  categories,
  articlesByCategory,
}: Props) {
  const topCategories = categories.filter(
    (c) => (articlesByCategory[c.slug]?.length ?? 0) > 0,
  );

  /* Recently published partition */
  const latestLead = latestArticles[0];
  const latestRanked = latestArticles.slice(1, 6); // 5 numbered items
  const latestRow = latestArticles.slice(6, 9); // 3 standard cards below

  /* Comparisons partition */
  const compLead = featuredComparisons[0];
  const compTrio = featuredComparisons.slice(1, 4);

  return (
    <>
      {/* ── HERO (centered) ── */}
      <section>
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center md:pb-12 md:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5 text-[11px] font-heading font-medium text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-cta" />
            {hero.eyebrow}
          </span>
          <h1 className="mx-auto mt-7 max-w-3xl font-heading text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-brand md:text-[3.5rem]">
            {hero.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PillButton href={hero.ctaPrimaryHref} variant="cta" size="lg">
              {hero.ctaPrimaryLabel}
            </PillButton>
            <PillButton href={hero.ctaSecondaryHref} variant="primary" size="lg">
              {hero.ctaSecondaryLabel}
            </PillButton>
          </div>

          {/* Read by — liquid-glass capsule, lives inside the hero */}
          <ReadByCapsule />
        </div>
      </section>

      {/* ── LOGO MARQUEE ── */}
      <LogoMarquee />

      {/* ──────────────────────────────────────────────────────────
         RECENTLY PUBLISHED
         Single identity: section header on top, lead magazine card,
         numbered "Most read" list. The list does not need its own
         secondary headline next to the section header.
         ────────────────────────────────────────────────────────── */}
      <MotionSection className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeader
            eyebrow="The desk"
            title={latestSection.title}
            href="/categories/accounting"
            ctaLabel="Browse the archive"
          />

          {latestArticles.length === 0 && <EmptyState />}

          {latestLead && (
            <div className="mt-14">
              <ArticleCardMagazine article={latestLead} />
            </div>
          )}

          {latestRanked.length > 0 && (
            <div className="mt-20 border-t border-border-subtle pt-14">
              <div className="flex items-baseline justify-between gap-6">
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/55">
                  Most read this week
                </p>
                <Link
                  href="/categories/accounting"
                  className="hidden items-center gap-1.5 text-[12.5px] font-heading font-semibold text-brand/65 transition-colors hover:text-cta sm:inline-flex"
                >
                  See all
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <ol className="mt-8 divide-y divide-border-subtle">
                {latestRanked.map((a, i) => (
                  <li key={a.id}>
                    <ArticleCardIndex article={a} index={i + 1} />
                  </li>
                ))}
              </ol>
            </div>
          )}

          {latestRow.length > 0 && (
            <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {latestRow.map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      </MotionSection>

      {/* ──────────────────────────────────────────────────────────
         COMPARISONS
         Card-tinted slab. Poster lead + 3-up grid. The previous
         third row (2-up Feature below) was content stuffing.
         ────────────────────────────────────────────────────────── */}
      {featuredComparisons.length > 0 && (
        <MotionSection className="border-y border-border-subtle bg-card py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionHeader
              eyebrow="Head-to-head"
              title={featuredSection.title}
              description={featuredSection.subtitle}
              href="/comparisons"
              ctaLabel="All comparisons"
            />

            {compLead && (
              <div className="mt-14">
                <ArticleCardPoster article={compLead} />
              </div>
            )}

            {compTrio.length > 0 && (
              <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {compTrio.map((a) => (
                  <ArticleCardStandard key={a.id} article={a} />
                ))}
              </div>
            )}
          </div>
        </MotionSection>
      )}

      {/* ── ARTICLES BY CATEGORY (alternating layouts) ──
           Eyebrow = category name (uppercased), title = category
           description. No redundant "Category · {name}" prefix.       */}
      {topCategories.map((cat, idx) => {
        const articles = articlesByCategory[cat.slug] ?? [];
        if (articles.length === 0) return null;

        return (
          <MotionSection
            key={cat.id}
            className={
              idx % 2 === 0
                ? "py-20 md:py-28"
                : "border-y border-border-subtle bg-card/40 py-20 md:py-28"
            }
          >
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <SectionHeader
                eyebrow={cat.name}
                title={cat.description ?? cat.name}
                href={`/categories/${cat.slug}`}
                ctaLabel={`All ${cat.name}`}
              />

              <CategorySection articles={articles} variant={idx % 3} />
            </div>
          </MotionSection>
        );
      })}

      {/* ── MID-PAGE NEWSLETTER ──
           Flat brand-coloured card. No radial gradient. Editorial
           framing matches the rest of the site.                       */}
      <MotionSection className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-brand">
            <div className="grid gap-10 px-8 py-14 md:grid-cols-[1fr_1.1fr] md:gap-14 md:px-14 md:py-20">
              <div>
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta/85">
                  The SterlingPeak Briefing
                </p>
                <h2 className="mt-4 font-heading text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.014em] text-white md:text-[2.5rem]">
                  {newsletterSection.title}
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
                  {newsletterSection.description}
                </p>
                <div className="mt-7 flex items-center gap-5 text-[12px] text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-cta" />
                    Free, every Thursday
                  </span>
                  <span aria-hidden className="h-3 w-px bg-white/15" />
                  <span>Around a 5-minute read</span>
                </div>
              </div>

              <div className="md:max-w-md md:justify-self-end">
                <NewsletterForm source="homepage" variant="dark" />
                <p className="mt-4 text-[11px] text-white/40">
                  Double opt-in. UK GDPR compliant. Unsubscribe in one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ── EDITORIAL STANDARDS ──
           Eyebrow + structural three-column commitment block.         */}
      <MotionSection className="border-t border-border-subtle py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
            <div>
              <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-cta">
                Editorial standards
              </p>
              <h2 className="mt-3 font-heading text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.014em] text-brand md:text-[2rem]">
                {trustSection.title}
              </h2>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
                Read our full{" "}
                <Link
                  href="/editorial-policy"
                  className="text-brand underline-offset-2 hover:text-cta hover:underline"
                >
                  editorial policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/affiliate-disclosure"
                  className="text-brand underline-offset-2 hover:text-cta hover:underline"
                >
                  affiliate disclosure
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-subtle bg-border-subtle md:grid-cols-3">
              {trustSection.columns.map((col, i) => (
                <div
                  key={col.title}
                  className="flex flex-col bg-page p-7"
                >
                  <span className="font-mono text-[11px] tracking-[0.05em] text-cta/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-heading text-[15px] font-semibold tracking-[-0.005em] text-brand">
                    {col.title}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                    {col.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Read by — liquid-glass readership capsule that lives inside the
   hero block. iOS-style frosted glass, soft white reflection, gentle
   ambient shadow. Uses real, recognisable lucide icons (no spark/zap).
   ────────────────────────────────────────────────────────────────── */

function ReadByCapsule() {
  const audience = [
    { label: "Sole traders", Icon: UserRound },
    { label: "Freelancers", Icon: Briefcase },
    { label: "Ltd directors", Icon: Building2 },
    { label: "Finance managers", Icon: ClipboardList },
    { label: "Bookkeepers", Icon: Calculator },
    { label: "Accountants", Icon: Landmark },
  ];

  return (
    <div className="mt-14 md:mt-16">
      {/* Top meta strip */}
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-brand/10" />
        <span className="inline-flex items-center gap-2 text-[10.5px] font-heading font-semibold uppercase tracking-[0.24em] text-brand/55">
          <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-[1.5px] bg-cta" />
          Read by professionals at
        </span>
        <span aria-hidden className="h-px flex-1 bg-brand/10" />
      </div>

      {/* Audience grid */}
      <div className="mx-auto mt-7 max-w-4xl">
        <div className="flex flex-wrap items-stretch justify-center gap-2.5 sm:gap-3">
          {audience.map(({ label, Icon }) => (
            <span
              key={label}
              className={[
                "group inline-flex items-center gap-2 rounded-full px-4 py-2",
                // Liquid-glass tile
                "bg-white/55 backdrop-blur-[18px] backdrop-saturate-150",
                "ring-1 ring-inset ring-white/70",
                "shadow-[0_8px_24px_-16px_rgba(0,55,72,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
                // Type
                "text-[12.5px] font-heading font-medium tracking-[0.005em] text-brand/85",
                // Subtle hover lift
                "transition-all duration-300 hover:bg-white/80 hover:shadow-[0_14px_32px_-18px_rgba(0,55,72,0.25),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-[1px]",
              ].join(" ")}
            >
              <span
                aria-hidden
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cta/10 text-cta"
              >
                <Icon className="h-3 w-3" strokeWidth={2} />
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom region line */}
      <div className="mx-auto mt-7 flex max-w-3xl items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-brand/10" />
        <span className="inline-flex items-center gap-2 text-[11.5px] font-heading font-medium tracking-[0.005em] text-brand/55">
          <span
            aria-hidden
            className="relative flex h-1.5 w-1.5"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-cta/50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cta" />
          </span>
          England &middot; Scotland &middot; Wales &middot; Northern Ireland
        </span>
        <span aria-hidden className="h-px flex-1 bg-brand/10" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Empty state for the Recently published section.
   ────────────────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="mt-12 rounded-[1.75rem] border border-border-subtle bg-card p-12 text-center">
      <p className="font-heading text-xl font-semibold text-brand md:text-2xl">
        First issues publishing soon
      </p>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        SterlingPeak is in editorial setup. Subscribe to the Briefing and the
        first articles — UK accounting reviews, MTD guides, and head-to-head
        comparisons — will land in your inbox the day they go live.
      </p>
      <div className="mt-7 inline-flex">
        <PillButton href="/newsletter" variant="cta" size="md">
          Subscribe to the Briefing
        </PillButton>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Internal: alternating category layouts for visual rhythm.
   Each category section gets one of three layouts so the page feels
   designed rather than templated.
   ────────────────────────────────────────────────────────────────── */

function CategorySection({
  articles,
  variant,
}: {
  articles: ArticleRow[];
  variant: number;
}) {
  /* Variant 0: Magazine + 3-up grid */
  if (variant === 0) {
    const lead = articles[0];
    const rest = articles.slice(1, 4);
    return (
      <div className="mt-14">
        {lead && <ArticleCardMagazine article={lead} />}
        {rest.length > 0 && (
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {rest.map((a) => (
              <ArticleCardStandard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* Variant 1: 3-up Standard grid */
  if (variant === 1) {
    return (
      <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {articles.slice(0, 6).map((a) => (
          <ArticleCardStandard key={a.id} article={a} />
        ))}
      </div>
    );
  }

  /* Variant 2: Poster + 3 horizontal rail */
  const poster = articles[0];
  const list = articles.slice(1, 4);
  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
      {poster && <ArticleCardPoster article={poster} />}
      {list.length > 0 && (
        <div className="flex flex-col divide-y divide-border-subtle">
          {list.map((a) => (
            <div key={a.id} className="py-6 first:pt-0 last:pb-0">
              <ArticleCardHorizontal article={a} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

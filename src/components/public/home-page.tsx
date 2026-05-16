import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { LogoMarquee } from "@/components/public/logo-marquee";
import {
  ArticleCardFeature,
  ArticleCardHero,
  ArticleCardHorizontal,
  ArticleCardMagazine,
  ArticleCardPoster,
  ArticleCardStandard,
  SectionHeader,
} from "@/components/public/article-card";
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

  /* ── partition the latest stream into hierarchy ── */
  const heroArticle = latestArticles[0];
  const sideRail = latestArticles.slice(1, 4); // up to 3 horizontal rail items
  const featureRow = latestArticles.slice(4, 6); // 2-up feature row
  const standardRow = latestArticles.slice(6, 9); // 3-up standard row

  /* ── comparisons partitioning ── */
  const compHero = featuredComparisons[0];
  const compRow = featuredComparisons.slice(1, 4);

  return (
    <>
      {/* ── HERO (centered) ── */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center md:pb-20 md:pt-24">
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
            <Link
              href={hero.ctaPrimaryHref}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {hero.ctaPrimaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.ctaSecondaryHref}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border-subtle bg-card px-7 text-sm font-semibold text-brand transition-colors hover:border-accent/40"
            >
              {hero.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="border-b border-border-subtle bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[12px] text-brand/45">
            <span className="font-medium">Written for</span>
            {[
              "sole traders",
              "freelancers",
              "limited company directors",
              "finance managers",
              "bookkeepers",
              "accountants",
            ].map((audience, i) => (
              <span key={audience}>
                {i > 0 && <span className="text-brand/20 mx-0.5">&middot;</span>}
                {audience}
              </span>
            ))}
            <span className="font-medium">across the UK</span>
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ── */}
      <LogoMarquee />

      {/* ── LATEST: HERO + RAIL ── */}
      <MotionSection className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeader
            eyebrow="Recently published"
            title={latestSection.title}
            href="/categories/accounting"
            ctaLabel="Browse all articles"
          />

          {latestArticles.length > 0 ? (
            <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
              {heroArticle && <ArticleCardHero article={heroArticle} />}

              {sideRail.length > 0 && (
                <div className="flex flex-col divide-y divide-border-subtle">
                  {sideRail.map((a) => (
                    <div key={a.id} className="py-6 first:pt-0 last:pb-0">
                      <ArticleCardHorizontal article={a} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </MotionSection>

      {/* ── LATEST: FEATURE ROW ── */}
      {featureRow.length > 0 && (
        <MotionSection className="border-t border-border-subtle bg-card/40 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              Editor&apos;s picks
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-brand md:text-[2.5rem]">
              The pieces our readers spent the most time with this week
            </h2>

            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-14">
              {featureRow.map((a) => (
                <ArticleCardFeature key={a.id} article={a} />
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* ── COMPARISONS: poster + 3 standard ── */}
      {featuredComparisons.length > 0 && (
        <MotionSection className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionHeader
              eyebrow="Head-to-head"
              title={featuredSection.title}
              description={featuredSection.subtitle}
              href="/comparisons"
              ctaLabel="All comparisons"
            />

            {compHero && (
              <div className="mt-14">
                <ArticleCardPoster article={compHero} />
              </div>
            )}

            {compRow.length > 0 && (
              <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {compRow.map((a) => (
                  <ArticleCardStandard key={a.id} article={a} />
                ))}
              </div>
            )}
          </div>
        </MotionSection>
      )}

      {/* ── EXTRA STANDARD ROW (deeper into latest) ── */}
      {standardRow.length > 0 && (
        <MotionSection className="border-t border-border-subtle py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              More from the desk
            </p>
            <h2 className="mt-3 font-heading text-[1.85rem] font-semibold leading-tight tracking-[-0.014em] text-brand md:text-[2.25rem]">
              More analysis &amp; reviews
            </h2>

            <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {standardRow.map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* ── ARTICLES BY CATEGORY ── */}
      {topCategories.map((cat, idx) => {
        const articles = articlesByCategory[cat.slug] ?? [];
        if (articles.length === 0) return null;

        return (
          <MotionSection
            key={cat.id}
            className={
              idx % 2 === 0
                ? "border-t border-border-subtle py-20 md:py-28"
                : "border-y border-border-subtle bg-card/40 py-20 md:py-28"
            }
          >
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <SectionHeader
                eyebrow={`Category · ${cat.name}`}
                title={cat.name}
                description={cat.description ?? undefined}
                href={`/categories/${cat.slug}`}
                ctaLabel={`All ${cat.name}`}
              />

              <CategorySection articles={articles} variant={idx % 3} />
            </div>
          </MotionSection>
        );
      })}

      {/* ── MID-PAGE NEWSLETTER ── */}
      <MotionSection className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-brand shadow-[0_40px_80px_-20px_rgba(0,55,72,0.35)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(48,197,202,0.08),transparent)]" />

            <div className="relative px-8 py-16 md:px-16 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/80">
                  The SterlingPeak Briefing
                </p>
                <h2 className="mt-4 font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
                  {newsletterSection.title}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
                  {newsletterSection.description}
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-md">
                <NewsletterForm source="homepage" variant="dark" />
                <p className="mt-4 text-center text-[11px] text-white/25">
                  One email per week. No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ── TRUST / EDITORIAL STANDARDS ── */}
      <MotionSection className="border-t border-border-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-xl font-semibold text-brand">{trustSection.title}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {trustSection.columns.map((col) => (
              <div key={col.title}>
                <p className="font-heading text-sm font-semibold text-brand">{col.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Empty state — only shown when there are no published articles yet.
   ────────────────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="mt-12 rounded-[1.75rem] border border-border-subtle bg-card p-12 text-center">
      <p className="font-heading text-xl font-semibold text-brand md:text-2xl">
        New articles publishing soon
      </p>
      <p className="mx-auto mt-3 max-w-md text-[15px] text-muted-foreground">
        Our editorial team is preparing in-depth reviews, comparisons, and
        compliance guides for UK businesses. Subscribe to our briefing to be
        notified when new content goes live.
      </p>
      <Link
        href="/newsletter"
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
      >
        Subscribe to the Briefing <ArrowRight className="h-3.5 w-3.5" />
      </Link>
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
  /* Variant 0: full-width Magazine + 3-up grid below */
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

  /* Variant 1: 3-up Standard grid (clean catalogue look) */
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

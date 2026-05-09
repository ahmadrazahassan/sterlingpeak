import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { LogoMarquee } from "@/components/public/logo-marquee";
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

function ArticleCard({ article }: { article: ArticleRow }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className="flex gap-4">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt=""
            className="h-[72px] w-[100px] shrink-0 rounded-xl object-cover bg-brand/[0.03]"
          />
        ) : (
          <div className="h-[72px] w-[100px] shrink-0 rounded-xl bg-brand/[0.03]" />
        )}
        <div className="min-w-0 pt-0.5">
          {article.category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              {article.category.name}
            </span>
          )}
          <p className="font-heading text-[15px] font-semibold leading-snug text-brand group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {article.author?.name}
            {article.reading_time ? ` · ${article.reading_time} min read` : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ArticleCardLarge({ article }: { article: ArticleRow }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      {article.thumbnail_url ? (
        <img
          src={article.thumbnail_url}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl object-cover bg-brand/[0.03]"
        />
      ) : (
        <div className="aspect-[16/9] w-full rounded-2xl bg-brand/[0.03]" />
      )}
      <div className="mt-4">
        {article.category && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
            {article.category.name}
          </span>
        )}
        <h3 className="mt-1 font-heading text-xl font-semibold text-brand group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          {article.author?.name}
          {article.reading_time ? ` · ${article.reading_time} min read` : ""}
        </p>
      </div>
    </Link>
  );
}

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

      {/* ── RECENTLY PUBLISHED ── */}
      <MotionSection className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold text-brand">{latestSection.title}</h2>
            <Link
              href="/categories/accounting"
              className="hidden items-center gap-1.5 rounded-full border border-border-subtle bg-card px-4 py-2 text-xs font-semibold text-brand transition-colors hover:border-accent/40 sm:inline-flex"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {latestArticles.length > 0 ? (
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
              <ArticleCardLarge article={latestArticles[0]} />
              <div className="space-y-6">
                {latestArticles.slice(1, 10).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-border-subtle bg-card p-8 text-center">
              <p className="font-heading text-lg font-semibold text-brand">
                New articles publishing soon
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Our editorial team is preparing in-depth reviews, comparisons,
                and compliance guides for UK businesses. Subscribe to our
                newsletter to be notified when new content goes live.
              </p>
              <Link
                href="/newsletter"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
              >
                Get notified <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </MotionSection>

      {/* ── COMPARISONS ── */}
      {featuredComparisons.length > 0 && (
        <MotionSection className="border-y border-border-subtle bg-card py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="font-heading text-2xl font-semibold text-brand">{featuredSection.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{featuredSection.subtitle}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredComparisons.slice(0, 6).map((a) => (
                <Link
                  key={a.id}
                  href={`/article/${a.slug}`}
                  className="group rounded-2xl border border-border-subtle bg-page p-5 transition-colors hover:border-accent/30"
                >
                  {a.category && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {a.category.name}
                    </span>
                  )}
                  <h3 className="mt-2 font-heading text-[15px] font-semibold text-brand group-hover:text-accent transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-[13px] text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cta">
                    Read <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* ── ARTICLES BY CATEGORY ── */}
      {topCategories.map((cat) => {
        const articles = articlesByCategory[cat.slug] ?? [];
        if (articles.length === 0) return null;
        return (
          <MotionSection key={cat.id} className="py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-brand">{cat.name}</h2>
                  {cat.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                  )}
                </div>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="hidden items-center gap-1.5 rounded-full border border-border-subtle bg-card px-4 py-2 text-xs font-semibold text-brand transition-colors hover:border-accent/40 sm:inline-flex"
                >
                  All {cat.name} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <Link key={a.id} href={`/article/${a.slug}`} className="group">
                    {a.thumbnail_url ? (
                      <img
                        src={a.thumbnail_url}
                        alt=""
                        className="aspect-[16/9] w-full rounded-2xl object-cover bg-brand/[0.03]"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full rounded-2xl bg-brand/[0.03]" />
                    )}
                    <h3 className="mt-3 font-heading text-[15px] font-semibold text-brand group-hover:text-accent transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="mt-1.5 text-[13px] text-muted-foreground line-clamp-2">{a.excerpt}</p>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {a.author?.name}
                      {a.reading_time ? ` · ${a.reading_time} min` : ""}
                    </p>
                  </Link>
                ))}
              </div>
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

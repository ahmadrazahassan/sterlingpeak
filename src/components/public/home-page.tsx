import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMarquee } from "@/components/public/logo-marquee";
import {
  ArticleCardFeature,
  ArticleCardHorizontal,
  ArticleCardIndex,
  ArticleCardMagazine,
  ArticleCardPoster,
  ArticleCardStandard,
  ListPanel,
  SectionHeader,
} from "@/components/public/article-card";
import { ActionButton } from "@/components/public/action-button";
import { cn } from "@/lib/utils";
import type { ArticleRow } from "@/lib/queries/articles";
import type { CategoryRow } from "@/lib/queries/categories";
import type {
  FeaturedComparisonsSectionJson,
  HeroJson,
  LatestSectionJson,
  TrustSectionJson,
} from "@/lib/settings-types";
import { MotionSection } from "@/components/public/motion-section";

type Props = {
  hero: HeroJson;
  featuredSection: FeaturedComparisonsSectionJson;
  latestSection: LatestSectionJson;
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
  const latestSide = latestArticles.slice(1, 3); // 2 compact tiles beside the lead
  const latestRanked = latestArticles.slice(3, 9); // leaderboard panel rows

  /* Comparisons partition */
  const compLead = featuredComparisons[0];
  const compTrio = featuredComparisons.slice(1, 4);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
         HERO — broadsheet front page.

         Not the centred badge/headline/buttons template. A folio
         line runs across the top (publication left, place and date
         right), the statement sets left-aligned underneath, and a
         numbered "On the desk" index panel sits in the right rail —
         the front-page contents box every serious paper carries.
         ────────────────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-8 md:pb-20 md:pt-14">
          {/* Folio line */}
          <div className="border-b border-brand/15 pb-4">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.24em] text-brand">
              {hero.eyebrow}
            </p>
          </div>

          <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
            {/* Statement */}
            <div>
              <h1 className="max-w-[17ch] font-heading text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.028em] text-brand md:text-[3.3rem] lg:text-[3.7rem]">
                {hero.heading}
              </h1>
              <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted-foreground md:text-[1.08rem]">
                {hero.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ActionButton href={hero.ctaPrimaryHref} variant="cta" size="lg">
                  {hero.ctaPrimaryLabel}
                </ActionButton>
                <ActionButton href={hero.ctaSecondaryHref} variant="ghost" size="lg">
                  {hero.ctaSecondaryLabel}
                </ActionButton>
              </div>
              <p className="mt-10 flex max-w-xl items-center gap-2.5 border-t border-border-subtle pt-5 text-[12.5px] leading-relaxed text-brand/55">
                <span
                  aria-hidden
                  className="inline-block h-[7px] w-[7px] shrink-0 rounded-[2px] bg-cta"
                />
                Read by sole traders, limited company directors, bookkeepers
                and accountants across the UK.
              </p>
            </div>

            {/* Front-page index */}
            <HeroDeskPanel articles={latestArticles.slice(0, 3)} />
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ── */}
      <LogoMarquee />

      {/* ──────────────────────────────────────────────────────────
         RECENTLY PUBLISHED
         Bento opener: one big lead tile beside two stacked compact
         tiles, then the "Most read" leaderboard panel underneath.
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
            <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <ArticleCardFeature article={latestLead} />
              {latestSide.length > 0 && (
                <div className="flex flex-col gap-6">
                  {latestSide.map((a) => (
                    <ArticleCardHorizontal
                      key={a.id}
                      article={a}
                      className="flex-1"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {latestRanked.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between gap-6">
                <p className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/55">
                  Most read this week
                </p>
                <div className="hidden sm:block">
                  <ActionButton
                    href="/categories/accounting"
                    variant="ghost"
                    size="sm"
                  >
                    See all
                  </ActionButton>
                </div>
              </div>

              <ListPanel className="mt-6">
                <ol className="divide-y divide-border-subtle">
                  {latestRanked.map((a, i) => (
                    <li key={a.id}>
                      <ArticleCardIndex article={a} index={i + 1} />
                    </li>
                  ))}
                </ol>
              </ListPanel>
            </div>
          )}
        </div>
      </MotionSection>

      {/* ──────────────────────────────────────────────────────────
         COMPARISONS
         Full brand slab — the one dark passage on the page. White
         tiles and the framed poster sit on deep navy so the
         head-to-head verdicts read as the flagship section.
         ────────────────────────────────────────────────────────── */}
      {featuredComparisons.length > 0 && (
        <MotionSection className="bg-brand py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionHeader
              tone="dark"
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
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {compTrio.map((a) => (
                  <ArticleCardStandard key={a.id} article={a} />
                ))}
              </div>
            )}
          </div>
        </MotionSection>
      )}

      {/* ── ARTICLES BY CATEGORY (alternating tile layouts) ──
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
                : "border-y border-border-subtle bg-brand/[0.04] py-20 md:py-28"
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
   On the desk — the hero's right rail. A numbered front-page index
   of the latest stories, drawn live from the database. Before any
   articles exist it falls back to three true editorial commitments,
   never invented numbers.
   ────────────────────────────────────────────────────────────────── */

const DESK_FACTS = [
  "Pricing re-verified at the start of each VAT quarter",
  "Written for HMRC, Making Tax Digital and UK GAAP",
  "One named editor. Nothing ghost written.",
];

function HeroDeskPanel({ articles }: { articles: ArticleRow[] }) {
  return (
    <aside className="flex flex-col self-start overflow-hidden rounded-[1.25rem] border border-border-subtle bg-card shadow-[0_28px_60px_-34px_rgba(0,55,72,0.3)]">
      <div className="border-b border-border-subtle px-6 py-4">
        <p className="inline-flex items-center gap-2.5 text-[10.5px] font-heading font-semibold uppercase tracking-[0.26em] text-brand/60">
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-cta/50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cta" />
          </span>
          On the desk
        </p>
      </div>

      {articles.length > 0 ? (
        <ol>
          {articles.map((a, i) => (
            <li
              key={a.id}
              className={cn(i > 0 && "border-t border-border-subtle")}
            >
              <Link
                href={`/article/${a.slug}`}
                className="group flex gap-4 px-6 py-5 transition-colors hover:bg-page/60"
              >
                <span className="font-mono text-[12px] leading-[1.5] tabular-nums text-cta/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[14.5px] font-medium leading-[1.35] text-brand transition-colors group-hover:text-cta">
                  {a.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <ul>
          {DESK_FACTS.map((fact, i) => (
            <li
              key={fact}
              className={cn(
                "flex gap-4 px-6 py-5",
                i > 0 && "border-t border-border-subtle",
              )}
            >
              <span className="font-mono text-[12px] leading-[1.5] tabular-nums text-cta/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-[14.5px] font-medium leading-[1.35] text-brand">
                {fact}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-border-subtle bg-page/40 px-6 py-4">
        <Link
          href="/editorial-policy"
          className="group inline-flex items-center gap-1.5 text-[12px] font-heading font-semibold text-brand/60 transition-colors hover:text-cta"
        >
          How the desk works
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
            strokeWidth={1.8}
            aria-hidden
          />
        </Link>
      </div>
    </aside>
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
        SterlingPeak is in editorial setup. The first articles go live shortly:
        UK accounting reviews, MTD guides and head-to-head comparisons.
      </p>
      <div className="mt-7 inline-flex">
        <ActionButton href="/comparisons" variant="cta" size="md">
          Browse the comparisons
        </ActionButton>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Internal: alternating category layouts for visual rhythm.
   Each category section gets one of three tile compositions so the
   page feels designed rather than templated.
   ────────────────────────────────────────────────────────────────── */

function CategorySection({
  articles,
  variant,
}: {
  articles: ArticleRow[];
  variant: number;
}) {
  /* Variant 0: wide Magazine split tile + 3-up tile row */
  if (variant === 0) {
    const lead = articles[0];
    const rest = articles.slice(1, 4);
    return (
      <div className="mt-14">
        {lead && <ArticleCardMagazine article={lead} />}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCardStandard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* Variant 1: Feature 2-up (big artwork) + 3-up tile row */
  if (variant === 1) {
    const pair = articles.slice(0, 2);
    const row = articles.slice(2, 5);
    return (
      <div className="mt-14">
        <div className="grid gap-6 md:grid-cols-2">
          {pair.map((a) => (
            <ArticleCardFeature key={a.id} article={a} />
          ))}
        </div>
        {row.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {row.map((a) => (
              <ArticleCardStandard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* Variant 2: framed Poster + stacked compact tiles */
  const poster = articles[0];
  const list = articles.slice(1, 4);
  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      {poster && <ArticleCardPoster article={poster} />}
      {list.length > 0 && (
        <div className="flex flex-col gap-6">
          {list.map((a) => (
            <ArticleCardHorizontal key={a.id} article={a} className="flex-1" />
          ))}
        </div>
      )}
    </div>
  );
}

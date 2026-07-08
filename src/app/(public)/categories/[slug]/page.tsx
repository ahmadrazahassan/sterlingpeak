import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import {
  ArticleCardHero,
  ArticleCardHorizontal,
  ArticleCardMagazine,
  ArticleCardStandard,
  SectionHeader,
} from "@/components/public/article-card";
import {
  fetchArticlesByCategory,
  fetchCategoryFeaturedArticle,
} from "@/lib/queries/articles";
import { fetchCategoryBySlug } from "@/lib/queries/categories";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await fetchCategoryBySlug(slug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.seo_title ?? `${cat.name} | SterlingPeak`,
    description: cat.seo_description ?? cat.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);
  if (!category) notFound();

  const [featured, articles] = await Promise.all([
    fetchCategoryFeaturedArticle(slug),
    fetchArticlesByCategory(slug, 48),
  ]);

  // De-duplicate the featured from the rest so it doesn't appear twice.
  const restArticles = featured
    ? articles.filter((a) => a.id !== featured.id)
    : articles;

  const sideRail = restArticles.slice(0, 3);
  const magazinePick = restArticles[3];
  const gridArticles = restArticles.slice(4);

  const comparisons = articles.filter((a) => a.is_comparison).slice(0, 4);

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="border-b border-border-subtle bg-page/50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/categories/accounting" },
              { label: category.name },
            ]}
          />
          <p className="mt-7 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Category
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.022em] text-brand md:text-[3.5rem]">
            {category.hero_title ?? category.name}
          </h1>
          {category.description && (
            <p className="mt-5 max-w-3xl text-[1.1rem] leading-relaxed text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-6 py-20 md:space-y-28 md:px-8 md:py-24">
        {/* ── FEATURE + RAIL ── */}
        {featured && (
          <section>
            <SectionHeader eyebrow="Featured" title="The lead read in this category" />
            <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
              <ArticleCardHero article={featured} />
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
          </section>
        )}

        {/* ── MAGAZINE PICK ── */}
        {magazinePick && (
          <section className="border-t border-border-subtle pt-20 md:pt-24">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              Editor&apos;s pick
            </p>
            <div className="mt-8">
              <ArticleCardMagazine article={magazinePick} reverse />
            </div>
          </section>
        )}

        {/* ── ALL IN CATEGORY ── */}
        {gridArticles.length > 0 ? (
          <section>
            <SectionHeader
              eyebrow="More from this category"
              title="All articles"
            />
            <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {gridArticles.map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          </section>
        ) : (
          articles.length === 0 && (
            <section>
              <div className="rounded-[1.75rem] border border-border-subtle bg-card p-12 text-center">
                <p className="font-heading text-xl font-semibold text-brand">
                  No articles in this category yet
                </p>
                <p className="mx-auto mt-3 max-w-md text-[15px] text-muted-foreground">
                  Our editorial team is working on coverage. Check back soon for
                  new articles in this category.
                </p>
              </div>
            </section>
          )
        )}

        {/* ── COMPARISONS WITHIN THIS CATEGORY ── */}
        {comparisons.length > 0 && (
          <section>
            <SectionHeader
              eyebrow="Head-to-head"
              title="Popular comparisons"
              description="Side-by-side analysis from this category."
              href={`/comparisons?category=${slug}`}
              ctaLabel="All comparisons"
            />
            <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:gap-12">
              {comparisons.map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

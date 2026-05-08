import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { NewsletterForm } from "@/components/public/newsletter-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  const comparisons = articles.filter((a) => a.is_comparison);
  const toolkitHint = articles.slice(0, 3);

  return (
    <div>
      <section className="border-b border-border-subtle bg-page/50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/categories/accounting" },
              { label: category.name },
            ]}
          />
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
            Category
          </p>
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-semibold text-brand md:text-5xl">
            {category.hero_title ?? category.name}
          </h1>
          {category.description && (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-8">
        {featured && (
          <section>
            <h2 className="font-heading text-xl font-semibold text-brand">Featured</h2>
            <Link href={`/article/${featured.slug}`} className="mt-4 block">
              <Card className="overflow-hidden border-border-subtle transition-shadow hover:shadow-card">
                <CardContent className="grid gap-6 p-0 md:grid-cols-2">
                  <div className="aspect-video bg-page md:aspect-auto md:min-h-[240px]" />
                  <div className="p-6">
                    <Badge variant="accent">Featured</Badge>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-brand">
                      {featured.title}
                    </h3>
                    {featured.excerpt && (
                      <p className="mt-2 text-muted-foreground line-clamp-3">{featured.excerpt}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </section>
        )}

        <section>
          <h2 className="font-heading text-xl font-semibold text-brand">Latest</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.id} href={`/article/${a.slug}`}>
                <Card className="h-full border-border-subtle transition-shadow hover:shadow-card">
                  <CardContent className="p-5">
                    <p className="font-heading font-semibold text-brand line-clamp-2">{a.title}</p>
                    {a.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                      {a.reading_time != null ? `${a.reading_time} min read` : ""}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {articles.length === 0 && (
            <p className="mt-6 text-sm text-muted-foreground">No articles in this category yet.</p>
          )}
        </section>

        {comparisons.length > 0 && (
          <section>
            <h2 className="font-heading text-xl font-semibold text-brand">
              Popular comparisons
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {comparisons.slice(0, 4).map((a) => (
                <Link key={a.id} href={`/article/${a.slug}`}>
                  <Card className="border-border-subtle hover:border-accent/40">
                    <CardContent className="p-5">
                      <Badge variant="cta" className="text-[10px]">
                        Comparison
                      </Badge>
                      <p className="mt-2 font-heading font-semibold text-brand">{a.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {toolkitHint.length > 0 && (
          <section>
            <h2 className="font-heading text-xl font-semibold text-brand">
              Related toolkit resources
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {toolkitHint.map((a) => (
                <li key={a.id}>
                  <Link href={`/article/${a.slug}`} className="text-brand hover:text-accent">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-[1.5rem] border border-border-subtle bg-card p-8 shadow-card">
          <h2 className="font-heading text-xl font-semibold text-brand">Newsletter</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Practical guides for UK SMEs, straight to your inbox.
          </p>
          <NewsletterForm source={`category-${slug}`} className="mt-6 max-w-lg" />
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { fetchComparisonsForListing } from "@/lib/queries/articles";
import { fetchActiveCategories } from "@/lib/queries/categories";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business software comparisons for UK SMEs",
  description:
    "Compare accounting, payroll, HR, ERP, and finance tools using practical criteria built around real business needs.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function ComparisonsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: catFilter } = await searchParams;
  const [articles, categories] = await Promise.all([
    fetchComparisonsForListing(),
    fetchActiveCategories(),
  ]);

  const filtered = catFilter
    ? articles.filter((a) => a.category?.slug === catFilter)
    : articles;

  return (
    <div>
      <section className="border-b border-border-subtle bg-page/50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <h1 className="font-heading text-4xl font-semibold text-brand md:text-5xl">
            Business software comparisons for UK SMEs
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Compare accounting, payroll, HR, ERP, and finance tools using practical criteria
            built around real business needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link href="/comparisons">
              <Badge variant={!catFilter ? "cta" : "default"} className="cursor-pointer px-3 py-1">
                All
              </Badge>
            </Link>
            {categories.map((c) => (
              <Link key={c.id} href={`/comparisons?category=${c.slug}`}>
                <Badge
                  variant={catFilter === c.slug ? "cta" : "default"}
                  className="cursor-pointer px-3 py-1"
                >
                  {c.name}
                </Badge>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Every comparison evaluates real pricing, UK compliance support, feature
            depth, and operational fit.{" "}
            <Link href="/editorial-policy" className="text-accent hover:underline">
              Read our methodology
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link key={a.id} href={`/article/${a.slug}`} className="group">
              <Card className="h-full overflow-hidden border-border-subtle transition-shadow hover:shadow-card">
                {a.thumbnail_url && (
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={a.thumbnail_url}
                      alt={a.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {a.category && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                        {a.category.name}
                      </span>
                    )}
                    <span className="rounded-full bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand">
                      Comparison
                    </span>
                    {a.reading_time != null && (
                      <span className="rounded-full bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand">
                        {a.reading_time} min read
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 font-heading text-lg font-semibold text-brand">{a.title}</h2>
                  {a.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
                  )}
                  <span className="mt-4 inline-block text-sm font-medium text-cta">
                    Read comparison
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No comparisons match this filter yet.
          </p>
        )}
      </div>
    </div>
  );
}

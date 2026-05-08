import Link from "next/link";
import { searchArticles } from "@/lib/queries/articles";
import { searchCategories } from "@/lib/queries/categories";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

async function runSearch(q: string) {
  const [articles, categories] = await Promise.all([searchArticles(q), searchCategories(q)]);
  return { articles, categories };
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search SterlingPeak articles and categories.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const { articles, categories } = q ? await runSearch(q) : { articles: [], categories: [] };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <h1 className="font-heading text-3xl font-semibold text-brand">Search</h1>
      <form action="/search" method="get" className="mt-6">
        <label htmlFor="q" className="sr-only">
          Search query
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Search articles and categories…"
          className="w-full rounded-2xl border border-border-subtle bg-card px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </form>

      {!q && (
        <p className="mt-6 text-sm text-muted-foreground">Enter a term to search.</p>
      )}

      {q && (
        <div className="mt-10 space-y-10">
          {categories.length > 0 && (
            <div>
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </h2>
              <ul className="mt-3 space-y-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/categories/${c.slug}`} className="text-brand hover:text-accent">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {articles.length > 0 && (
            <div>
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                Articles
              </h2>
              <ul className="mt-3 space-y-3">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/article/${a.slug}`}
                      className="font-medium text-brand hover:text-accent"
                    >
                      {a.title}
                    </Link>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {a.is_comparison && <Badge variant="accent">Comparison</Badge>}
                      {a.category && <Badge variant="default">{a.category.name}</Badge>}
                    </div>
                    {a.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {a.excerpt}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {q && !articles.length && !categories.length && (
            <p className="text-sm text-muted-foreground">No results.</p>
          )}
        </div>
      )}
    </div>
  );
}

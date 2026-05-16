import Link from "next/link";
import { fetchComparisonsForListing } from "@/lib/queries/articles";
import { fetchActiveCategories } from "@/lib/queries/categories";
import {
  ArticleCardPoster,
  ArticleCardStandard,
} from "@/components/public/article-card";
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

  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="border-b border-border-subtle bg-page/50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
            Comparisons
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.022em] text-brand md:text-[3.25rem]">
            Business software comparisons for UK SMEs
          </h1>
          <p className="mt-5 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
            Side-by-side analysis of UK accounting, payroll, HR, and ERP tools —
            evaluated on real pricing, MTD compliance, feature depth, and
            operational fit. Updated as products and HMRC rules change.
          </p>

          {/* Filter chips */}
          <div className="mt-9 flex flex-wrap gap-2">
            <FilterChip href="/comparisons" active={!catFilter} label="All" />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                href={`/comparisons?category=${c.slug}`}
                active={catFilter === c.slug}
                label={c.name}
              />
            ))}
          </div>

          <p className="mt-6 text-[12.5px] text-muted-foreground/85">
            Every comparison evaluates real pricing, UK compliance support,
            feature depth, and operational fit.{" "}
            <Link
              href="/editorial-policy"
              className="text-accent underline-offset-2 hover:underline"
            >
              Read our methodology
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        {filtered.length === 0 && (
          <div className="rounded-[1.75rem] border border-border-subtle bg-card p-10 text-center">
            <p className="font-heading text-lg font-semibold text-brand">
              No comparisons match this filter yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Try removing the filter or check back as we publish new analysis.
            </p>
          </div>
        )}

        {/* Lead poster */}
        {lead && (
          <div>
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              Featured comparison
            </p>
            <div className="mt-4">
              <ArticleCardPoster article={lead} />
            </div>
          </div>
        )}

        {/* Rest of grid */}
        {rest.length > 0 && (
          <div className="mt-20">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
              All comparisons
            </p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <ArticleCardStandard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "inline-flex items-center rounded-full bg-brand px-4 py-1.5 text-[12.5px] font-heading font-semibold text-white transition-colors"
          : "inline-flex items-center rounded-full border border-border-subtle bg-card px-4 py-1.5 text-[12.5px] font-heading font-medium text-brand/75 transition-colors hover:border-accent/40 hover:text-accent"
      }
    >
      {label}
    </Link>
  );
}

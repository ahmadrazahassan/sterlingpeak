"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ArticleHit = {
  title: string;
  slug: string;
  excerpt: string | null;
  category: { name: string; slug: string } | null;
  is_comparison: boolean;
};

type CategoryHit = {
  name: string;
  slug: string;
  description: string | null;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function SearchOverlay({ open, onOpenChange }: Props) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleHit[]>([]);
  const [categories, setCategories] = useState<CategoryHit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setArticles([]);
      setCategories([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setArticles(data.articles ?? []);
      setCategories(data.categories ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setQ("");
      setArticles([]);
      setCategories([]);
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const h = setTimeout(() => runSearch(q), 220);
    return () => clearTimeout(h);
  }, [q, runSearch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12vh] max-h-[80vh] w-[min(640px,94vw)] translate-y-0 overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search SterlingPeak</DialogTitle>
        </DialogHeader>
        <div className="border-b border-border-subtle p-4">
          <Input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, comparisons, categories…"
            className="h-12 border-0 text-base shadow-none focus-visible:ring-0"
            aria-label="Search"
          />
        </div>
        <div className="space-y-6 p-4 pb-6">
          {loading && <p className="text-sm text-muted-foreground">Searching…</p>}
          {!loading && q && !articles.length && !categories.length && (
            <p className="text-sm text-muted-foreground">No results. Try another term.</p>
          )}
          {categories.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/categories/${c.slug}`}
                      className="block rounded-xl px-2 py-2 hover:bg-page"
                      onClick={() => onOpenChange(false)}
                    >
                      <span className="font-medium text-brand">{c.name}</span>
                      {c.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">
                          {c.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {articles.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                Articles & comparisons
              </p>
              <ul className="space-y-2">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/article/${a.slug}`}
                      className="block rounded-xl px-2 py-2 hover:bg-page"
                      onClick={() => onOpenChange(false)}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-brand">{a.title}</span>
                        {a.is_comparison && (
                          <Badge variant="accent" className="text-[10px]">
                            Comparison
                          </Badge>
                        )}
                        {a.category && (
                          <Badge variant="default" className="text-[10px]">
                            {a.category.name}
                          </Badge>
                        )}
                      </div>
                      {a.excerpt && (
                        <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">
                          {a.excerpt}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

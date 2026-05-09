"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, Mountain, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MAIN_NAV,
  SOFTWARE_MEGA_CORE,
  SOFTWARE_MEGA_GUIDES,
  INDUSTRY_MEGA,
} from "@/lib/nav";
import { SearchOverlay } from "@/components/public/search-overlay";
import { cn } from "@/lib/utils";

export type MegaFeatured = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

type ComparisonPreview = {
  title: string;
  slug: string;
  excerpt: string | null;
};

type Props = {
  softwareFeatured: MegaFeatured;
  comparisonArticles: ComparisonPreview[];
};

export function SiteHeader({ softwareFeatured, comparisonArticles }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mega, setMega] = useState<null | "software" | "comparisons" | "industries">(
    null,
  );

  return (
    <>
      <div
        className="flex h-9 items-center justify-between px-4 text-[13px] text-white md:px-8"
        style={{ backgroundColor: "#003748" }}
      >
        <span className="hidden sm:inline">
          Independent UK business software insights for growing SMEs
        </span>
        <span className="sm:hidden">UK SME software insights</span>
        <nav className="flex items-center gap-4" aria-label="Utility">
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/editorial-policy" className="hover:text-accent transition-colors">
            Editorial Policy
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
          <Link href="/newsletter" className="hover:text-accent transition-colors">
            Newsletter
          </Link>
        </nav>
      </div>

      <header
        className="sticky top-0 z-40 relative border-b border-border-subtle backdrop-blur-[18px]"
        style={{ background: "rgba(241, 241, 241, 0.86)" }}
        onMouseLeave={() => setMega(null)}
      >
        <div className="relative mx-auto flex h-[5rem] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-semibold text-brand">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-card">
              <Mountain className="h-5 w-5 text-brand" aria-hidden />
              <span
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
                style={{ backgroundColor: "#22ad01" }}
              />
            </span>
            SterlingPeak
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
            onMouseLeave={() => setMega(null)}
          >
            {MAIN_NAV.map((item) => {
              const key =
                item.label === "Software"
                  ? "software"
                  : item.label === "Comparisons"
                    ? "comparisons"
                    : item.label === "Industries"
                      ? "industries"
                      : null;
              if (!key) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-3 py-2 text-sm font-medium text-brand hover:bg-black/[0.04]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} onMouseEnter={() => setMega(key)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      mega === key
                        ? "bg-white text-brand shadow-sm"
                        : "text-brand hover:bg-black/[0.04]",
                    )}
                    aria-expanded={mega === key}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              asChild
              className="hidden sm:inline-flex rounded-full px-5"
              style={{ backgroundColor: "#22ad01" }}
            >
              <Link href="/newsletter">
                Join Newsletter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mega === "software" && (
          <div
            className="absolute left-0 right-0 top-full border-b border-border-subtle bg-card shadow-card"
            onMouseEnter={() => setMega("software")}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-3 md:px-8">
              <div>
                <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                  Core software
                </p>
                <ul className="space-y-2 text-sm">
                  {SOFTWARE_MEGA_CORE.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-brand hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground">
                  Popular guides
                </p>
                <ul className="space-y-2 text-sm">
                  {SOFTWARE_MEGA_GUIDES.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-brand hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={softwareFeatured.href}
                className="rounded-[1.25rem] border border-border-subtle bg-page p-6 transition-shadow hover:shadow-card"
              >
                <p className="font-heading text-lg font-semibold text-brand">
                  {softwareFeatured.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{softwareFeatured.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cta">
                  {softwareFeatured.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        )}

        {mega === "comparisons" && (
          <div
            className="absolute left-0 right-0 top-full border-b border-border-subtle bg-card shadow-card"
            onMouseEnter={() => setMega("comparisons")}
          >
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {comparisonArticles.slice(0, 6).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/article/${a.slug}`}
                    className="rounded-[1.25rem] border border-border-subtle p-5 transition-colors hover:border-accent/50"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-brand/5 px-2 py-0.5 text-[10px] font-medium text-brand">
                        Comparison
                      </span>
                    </div>
                    <p className="mt-2 font-heading font-semibold text-brand">{a.title}</p>
                    {a.excerpt && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {mega === "industries" && (
          <div
            className="absolute left-0 right-0 top-full border-b border-border-subtle bg-card shadow-card"
            onMouseEnter={() => setMega("industries")}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[2fr_1fr] md:px-8">
              <div className="grid gap-2 sm:grid-cols-2">
                {INDUSTRY_MEGA.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="rounded-xl px-3 py-2 text-sm text-brand hover:bg-page"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="rounded-[1.25rem] bg-brand p-6 text-white">
                <p className="font-heading text-lg font-semibold">Find software by business type</p>
                <p className="mt-2 text-sm text-white/80">
                  Explore industry-specific guidance and operational considerations for UK SMEs.
                </p>
                <Button
                  asChild
                  className="mt-4 rounded-full bg-cta text-white hover:bg-white hover:text-brand"
                >
                  <Link href="/categories/industry-solutions">View industries</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-brand/30 lg:hidden"
          role="presentation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-card shadow-2xl transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-6 flex justify-between">
            <span className="font-heading text-lg font-semibold">Menu</span>
            <button type="button" aria-label="Close" onClick={() => setMobileOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <Input
            placeholder="Search…"
            className="mb-4"
            onFocus={() => {
              setMobileOpen(false);
              setSearchOpen(true);
            }}
          />
          <nav className="flex flex-col gap-1 overflow-y-auto">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-brand hover:bg-page"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 border-t border-border-subtle pt-6">
            <Button asChild className="w-full rounded-full" style={{ backgroundColor: "#22ad01" }}>
              <Link href="/newsletter" onClick={() => setMobileOpen(false)}>
                Join Newsletter
              </Link>
            </Button>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <Link href="/about" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/editorial-policy" onClick={() => setMobileOpen(false)}>
                Editorial Policy
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

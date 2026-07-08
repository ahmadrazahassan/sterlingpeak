import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { LogoMark } from "@/components/public/logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | SterlingPeak",
  description:
    "The page you're looking for doesn't exist. Browse our UK accounting, payroll and business software guides instead.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <LogoMark size={56} />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            404 · Page not found
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-brand md:text-4xl">
            This page doesn&apos;t exist
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            The page you&apos;re looking for may have been moved, removed or
            never existed. Try one of the links below to get back on track.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-gradient-to-b from-[#0c5064] via-[#003748] to-[#002938] px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.28),0_10px_24px_-10px_rgba(0,55,72,0.5)] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.05] active:translate-y-0"
            >
              Go to homepage
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-gradient-to-b from-white to-[#eef1f2] px-6 text-sm font-semibold text-brand ring-1 ring-inset ring-brand/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(0,55,72,0.08)] transition-[transform,filter] duration-300 hover:-translate-y-px hover:brightness-[1.02] active:translate-y-0"
            >
              <Search className="h-4 w-4" />
              Search articles
            </Link>
          </div>

          <div className="mx-auto mt-12 max-w-sm border-t border-border-subtle pt-8">
            <p className="text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground/50">
              Popular sections
            </p>
            <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              <Link href="/comparisons" className="text-brand hover:text-accent">
                Comparisons
              </Link>
              <Link href="/categories/accounting" className="text-brand hover:text-accent">
                Accounting
              </Link>
              <Link href="/categories/payroll-hr" className="text-brand hover:text-accent">
                Payroll & HR
              </Link>
              <Link href="/categories/vat-tax" className="text-brand hover:text-accent">
                VAT & Tax
              </Link>
              <Link href="/contact" className="text-brand hover:text-accent">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

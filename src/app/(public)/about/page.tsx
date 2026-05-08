import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SterlingPeak",
  description:
    "Mission, editorial principles, and affiliate transparency for our UK SME finance publication.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">About SterlingPeak</h1>
      <p className="mt-6 text-muted-foreground">
        SterlingPeak is a UK-focused publication helping SMEs navigate accounting software,
        payroll, tax, and operational technology with clarity and practical judgement.
      </p>
      <h2 className="mt-10 font-heading text-xl font-semibold text-brand">Mission</h2>
      <p className="mt-3 text-muted-foreground">
        We publish research-led guides and comparisons that respect how real finance teams work —
        not generic rankings or coupon-site noise.
      </p>
      <h2 className="mt-10 font-heading text-xl font-semibold text-brand">Who we help</h2>
      <p className="mt-3 text-muted-foreground">
        Finance leads, founders, and operators at growing UK businesses choosing software under
        real compliance and time pressure.
      </p>
      <h2 className="mt-10 font-heading text-xl font-semibold text-brand">Editorial principles</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>Accuracy and practical usefulness first</li>
        <li>Clear disclosure when affiliate relationships exist</li>
        <li>Regular updates when products or regulations change</li>
      </ul>
      <h2 className="mt-10 font-heading text-xl font-semibold text-brand">Affiliate transparency</h2>
      <p className="mt-3 text-muted-foreground">
        We may earn commissions from some partner links. That does not determine our editorial
        conclusions. Details are in our{" "}
        <Link href="/affiliate-disclosure" className="text-accent hover:underline">
          Affiliate Disclosure
        </Link>
        .
      </p>
      <Button asChild className="mt-10 rounded-full" style={{ backgroundColor: "#22ad01" }}>
        <Link href="/contact">Contact editorial</Link>
      </Button>
    </div>
  );
}

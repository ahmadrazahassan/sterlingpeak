import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie policy",
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">Cookie policy</h1>
      <p className="mt-6 text-sm text-muted-foreground">
        Placeholder cookie policy. Document essential, analytics, and marketing cookies you actually
        use, and wire a consent banner if required for your jurisdictions.
      </p>
    </div>
  );
}

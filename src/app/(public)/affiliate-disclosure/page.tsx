import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description: "How SterlingPeak uses affiliate links and maintains editorial independence.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">Affiliate disclosure</h1>
      <p className="mt-6 text-muted-foreground">
        SterlingPeak may earn commissions when readers click certain links or purchase through
        partner programmes. This does not affect editorial independence, and content is created to
        help businesses make informed decisions based on practical workflows and verified product
        capabilities.
      </p>
      <p className="mt-4 text-muted-foreground">
        We only recommend tools when they are relevant and useful to the reader&apos;s context.
        Affiliate relationships are disclosed on pages where they apply.
      </p>
    </div>
  );
}

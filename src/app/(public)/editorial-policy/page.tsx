import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial policy",
  description: "How SterlingPeak researches content, structures comparisons, and handles updates.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">Editorial policy</h1>
      <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-heading text-xl font-semibold text-brand">Research</h2>
          <p>
            Guides combine vendor documentation, practitioner workflows, and UK regulatory context.
            We prioritise primary sources and verifiable product behaviour.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-semibold text-brand">Comparisons</h2>
          <p>
            Comparisons are structured around factors SMEs actually use: VAT, payroll, reporting,
            integrations, and implementation effort — not marketing claims alone.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-semibold text-brand">Affiliate relationships</h2>
          <p>
            When a guide references partners, we disclose relationships clearly on the page and in
            our affiliate disclosure. Commissions do not change our editorial standards.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-semibold text-brand">Updates & corrections</h2>
          <p>
            Software and tax rules change. We update articles when material facts shift and note
            significant revisions where helpful.
          </p>
          <p>
            Report a correction:{" "}
            <a href="mailto:editorial@sterlingpeak.uk" className="text-accent">
              editorial@sterlingpeak.uk
            </a>{" "}
            (placeholder — replace with your mailbox).
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & conditions",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">Terms & conditions</h1>
      <p className="mt-6 text-sm text-muted-foreground">
        Placeholder terms for SterlingPeak. Have qualified counsel review and replace before
        production use.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>Content is for general information, not legal or financial advice.</li>
        <li>Software features and pricing change; verify with vendors before purchase.</li>
        <li>Use of the site constitutes acceptance of these terms.</li>
      </ul>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">Privacy policy</h1>
      <p className="mt-6 text-sm text-muted-foreground">
        This placeholder outlines typical commitments for SterlingPeak. Replace with counsel-reviewed
        copy before launch.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>We collect newsletter and contact information only as needed to respond or send updates.</li>
        <li>Analytics may be used in aggregated form to improve the site.</li>
        <li>We do not sell personal data.</li>
        <li>Data processors (e.g. hosting, email) are chosen for security and compliance.</li>
      </ul>
    </div>
  );
}

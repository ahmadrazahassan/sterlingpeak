import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write for us",
};

export default function WriteForUsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-heading text-4xl font-semibold text-brand">Write for us</h1>
      <p className="mt-6 text-muted-foreground">
        We occasionally work with practitioners and analysts who can add depth on UK accounting,
        payroll, and operations software. Pitches should include topic outline, credentials, and
        conflict-of-interest disclosure.
      </p>
      <p className="mt-4 text-muted-foreground">
        Contact:{" "}
        <a href="/contact" className="text-accent hover:underline">
          editorial via the contact form
        </a>
        .
      </p>
    </div>
  );
}

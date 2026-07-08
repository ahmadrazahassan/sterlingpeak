"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Please provide at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const subjects = [
  "Editorial correction",
  "Affiliate or partnership",
  "Product review request",
  "Press or media",
  "General feedback",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      reset();
      setSubmitted(true);
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-20 text-center md:pb-14 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5 text-[11px] font-heading font-medium text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-cta" />
            Contact the desk
          </span>
          <h1 className="mx-auto mt-7 max-w-2xl font-heading text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.022em] text-brand md:text-[3.25rem]">
            Get in touch with the editor.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            Editorial corrections, affiliate enquiries, product review
            requests, press and reader feedback. Every message is read by
            the SterlingPeak desk.
          </p>
        </div>
      </section>

      {/* ── CONTACT FACTS — quiet editorial row, hairline-divided ── */}
      <section>
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="grid divide-y divide-border-subtle border-y border-border-subtle sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            <ContactFact
              eyebrow="Email"
              value="hello@sterlingpeak.uk"
              href="mailto:hello@sterlingpeak.uk"
              Icon={Mail}
            />
            <ContactFact
              eyebrow="Based in"
              value="Greater Manchester, England"
              Icon={MapPin}
            />
            <ContactFact
              eyebrow="Reply window"
              value="1–2 business days"
              Icon={Clock}
            />
            <ContactFact
              eyebrow="Editor"
              value="Hafiza Ayesha Waheed"
              Icon={User}
            />
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          {submitted ? (
            <div className="rounded-[1.75rem] border border-border-subtle bg-card p-12 text-center md:p-16">
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cta/10 text-cta"
              >
                <CheckCircle2 className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h2 className="mt-6 font-heading text-[1.5rem] font-semibold tracking-[-0.012em] text-brand md:text-[1.75rem]">
                Message received.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                Thanks for reaching out. The desk replies within 1–2 business
                days. Editorial corrections are prioritised.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-brand transition-colors hover:text-cta"
              >
                Send another message
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-7"
              noValidate
            >
              <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
                <Field label="Full name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    className={cn(fieldBase, errors.name && fieldError)}
                  />
                </Field>
                <Field label="Email address" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@company.co.uk"
                    autoComplete="email"
                    className={cn(fieldBase, errors.email && fieldError)}
                  />
                </Field>
              </div>

              <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
                <Field label="Company" hint="Optional">
                  <input
                    {...register("company")}
                    placeholder="Company name"
                    autoComplete="organization"
                    className={fieldBase}
                  />
                </Field>
                <Field label="Subject" error={errors.subject?.message}>
                  <select
                    {...register("subject")}
                    defaultValue=""
                    className={cn(
                      fieldBase,
                      "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%2710%27 viewBox=%270 0 10 10%27><path d=%27M2 4l3 3 3-3%27 stroke=%27%23003748%27 stroke-width=%271.4%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/></svg>')] bg-[length:10px_10px] bg-[position:calc(100%-18px)_center] bg-no-repeat pr-10",
                      errors.subject && fieldError,
                    )}
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={6}
                  placeholder="What can we help with?"
                  className={cn(
                    fieldBase,
                    "resize-none",
                    errors.message && fieldError,
                  )}
                />
              </Field>

              <div className="flex flex-col items-start gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] text-muted-foreground/85">
                  By sending this message, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-brand underline-offset-2 hover:text-cta hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-4 rounded-full bg-cta/10 pl-7 pr-1.5 text-[13.5px] font-heading font-semibold text-brand transition-colors hover:bg-cta/15 disabled:opacity-60"
                >
                  <span className="leading-[3rem]">
                    {isSubmitting ? "Sending…" : "Send message"}
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cta text-white transition-transform duration-300 group-hover:scale-[1.06]"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── BRAND-SAFETY DISCLOSURE ── */}
      <section className="border-t border-border-subtle bg-card/40 py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div className="grid gap-3 text-[13px] leading-relaxed text-muted-foreground sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-brand/55">
              A note on enquiries
            </p>
            <p>
              SterlingPeak is an independent UK editorial publication. Vendors
              are welcome to send press releases and product information; we
              will not publish marketing copy and we never charge for editorial
              coverage. For the way we handle commercial relationships see our{" "}
              <Link
                href="/affiliate-disclosure"
                className="text-brand underline-offset-2 hover:text-cta hover:underline"
              >
                affiliate disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Local primitives
   ────────────────────────────────────────────────────────────────── */

const fieldBase =
  "block w-full rounded-2xl border border-border-subtle bg-card px-5 py-4 text-[14.5px] font-medium text-brand outline-none transition-colors placeholder:font-normal placeholder:text-brand/35 hover:border-brand/20 focus:border-cta/40 focus:bg-page focus:ring-2 focus:ring-cta/15";

const fieldError =
  "border-red-300 focus:border-red-400 focus:ring-red-100/50";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label className="text-[10.5px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/55">
          {label}
        </label>
        {hint && (
          <span className="text-[10.5px] font-heading font-medium tracking-[0.005em] text-brand/35">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-2 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Editorial fact row — quiet, hairline-divided. The pattern major
   editorial and product sites (Linear, Stripe, Vercel, FT) use to
   present small reference data without resorting to SaaS card grids.
   ────────────────────────────────────────────────────────────────── */

type ContactFactProps = {
  eyebrow: string;
  value: string;
  caption?: string;
  href?: string;
  external?: boolean;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

function ContactFact({
  eyebrow,
  value,
  caption,
  href,
  external,
  Icon,
}: ContactFactProps) {
  const inner = (
    <span className="group flex h-full flex-col gap-3 px-6 py-7 transition-colors md:px-8 md:py-9">
      <span className="flex items-center gap-2 text-[10px] font-heading font-semibold uppercase tracking-[0.22em] text-brand/45">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
        {eyebrow}
      </span>
      <span className="font-heading text-[15.5px] font-semibold leading-snug tracking-[-0.008em] text-brand md:text-[16px]">
        {value}
      </span>
      {caption && (
        <span className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-heading font-medium text-brand/55 transition-colors group-hover:text-cta">
          {caption}
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </span>
      )}
    </span>
  );

  if (!href) return <div className="block">{inner}</div>;
  return (
    <a
      href={href}
      className="block transition-colors hover:bg-cta/[0.03]"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

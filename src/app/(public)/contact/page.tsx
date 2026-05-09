"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Mail,
  MessageSquare,
  Building2,
  Clock,
  CheckCircle2,
  Send,
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
  "Editorial correction or update",
  "Affiliate or partnership enquiry",
  "Product review request",
  "General feedback",
  "Press or media enquiry",
  "Other",
];

const contactReasons = [
  {
    icon: MessageSquare,
    title: "Editorial & corrections",
    text: "Spotted an error or outdated information? We take accuracy seriously and respond within 48 hours.",
  },
  {
    icon: Building2,
    title: "Partnerships",
    text: "We work with UK accounting and payroll software providers through transparent affiliate and sponsorship arrangements.",
  },
  {
    icon: Mail,
    title: "Press & media",
    text: "Journalists covering UK fintech and SME technology are welcome to reach out for commentary or data.",
  },
  {
    icon: Clock,
    title: "Response time",
    text: "We typically respond within 1–2 business days. Editorial corrections are prioritised and addressed the same day where possible.",
  },
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
      {/* Hero */}
      <section className="border-b border-border-subtle bg-page/60">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Contact us
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-brand md:text-5xl">
            We&apos;d like to hear from you
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Whether it&apos;s a factual correction, partnership discussion, or
            product feedback — every message is read by our editorial team.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: Contact reasons */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-brand">
              How can we help?
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              SterlingPeak is based in the United Kingdom. We welcome enquiries
              from readers, software vendors, and media professionals.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border-subtle bg-white px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Mail className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground/60">
                  Email us directly
                </p>
                <a
                  href="mailto:hello@sterlingpeak.uk"
                  className="text-sm font-semibold text-brand hover:text-accent transition-colors"
                >
                  hello@sterlingpeak.uk
                </a>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              {contactReasons.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <r.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading text-[15px] font-semibold text-brand">
                      {r.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-card sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cta/10">
                  <CheckCircle2 className="h-7 w-7 text-cta" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-brand">
                  Message received
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Thank you for reaching out. Our team will get back to you
                  within 1–2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex h-10 items-center rounded-full border border-brand/10 px-6 text-sm font-semibold text-brand transition-colors hover:bg-page"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Full name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      placeholder="John Smith"
                      className={cn(fieldBase, errors.name && fieldError)}
                    />
                  </FormField>
                  <FormField label="Email address" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.co.uk"
                      className={cn(fieldBase, errors.email && fieldError)}
                    />
                  </FormField>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Company" hint="Optional">
                    <input
                      {...register("company")}
                      placeholder="Acme Ltd"
                      className={fieldBase}
                    />
                  </FormField>
                  <FormField label="Subject" error={errors.subject?.message}>
                    <select
                      {...register("subject")}
                      defaultValue=""
                      className={cn(
                        fieldBase,
                        "appearance-none",
                        errors.subject && fieldError,
                      )}
                    >
                      <option value="" disabled>
                        Choose a topic...
                      </option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Message" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className={cn(
                      fieldBase,
                      "resize-none",
                      errors.message && fieldError,
                    )}
                  />
                </FormField>

                <div className="flex items-center justify-between pt-2">
                  <p className="hidden text-[11px] text-muted-foreground/50 sm:block">
                    We never share your details with third parties.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-cta px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Reusable form pieces ── */

const fieldBase =
  "w-full rounded-xl border border-black/[0.06] bg-[#f9f9f9] px-4 py-3 text-sm text-brand outline-none transition-colors placeholder:text-brand/30 focus:border-accent/40 focus:ring-2 focus:ring-accent/10";

const fieldError = "border-red-300 focus:border-red-400 focus:ring-red-100";

function FormField({
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
      <label className="mb-1.5 flex items-baseline gap-1.5 text-[13px] font-medium text-brand/70">
        {label}
        {hint && (
          <span className="text-[11px] font-normal text-brand/30">{hint}</span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}

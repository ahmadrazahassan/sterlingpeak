"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  first_name: z.string().max(120).optional(),
});

type Form = z.infer<typeof schema>;

type Props = {
  source?: string;
  className?: string;
  showName?: boolean;
  variant?: "light" | "dark";
};

export function NewsletterForm({
  source = "website",
  className,
  showName = false,
  variant = "light",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<Form>({ resolver: zodResolver(schema) });

  async function onSubmit(data: Form) {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        first_name: data.first_name || null,
        source,
      }),
    });
    if (!res.ok) {
      setError("root", { message: "Something went wrong. Try again." });
      return;
    }
    reset();
  }

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-3", className)}
    >
      {showName && (
        <div className="w-full">
          <label
            htmlFor="nl-first"
            className={cn("mb-1.5 block text-xs font-medium", isDark ? "text-white/70" : "text-brand/60")}
          >
            First name (optional)
          </label>
          <input
            id="nl-first"
            {...register("first_name")}
            placeholder="Jane"
            className={cn(
              "h-11 w-full rounded-full border px-5 text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/40",
              isDark
                ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40"
                : "border-border-subtle bg-white text-brand placeholder:text-brand/35",
            )}
          />
        </div>
      )}
      <div className="w-full">
        <label
          htmlFor="nl-email"
          className={cn("mb-1.5 block text-xs font-medium", isDark ? "text-white/70" : "text-brand/60")}
        >
          Email address
        </label>
        <div className="flex gap-2">
          <input
            id="nl-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            placeholder="you@company.co.uk"
            className={cn(
              "h-11 min-w-0 flex-1 rounded-full border px-5 text-sm outline-none transition-colors focus:ring-2 focus:ring-accent/40",
              isDark
                ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40"
                : "border-border-subtle bg-white text-brand placeholder:text-brand/35",
            )}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-6 text-sm font-semibold transition-colors disabled:opacity-50",
              isDark
                ? "bg-cta text-white hover:bg-cta/90"
                : "bg-brand text-white hover:bg-brand/90",
            )}
          >
            {isSubmitting ? "..." : "Subscribe"}
            {!isSubmitting && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      {errors.root && (
        <p className="text-xs text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
}

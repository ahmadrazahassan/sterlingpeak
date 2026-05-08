"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Mountain } from "lucide-react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

type Form = z.infer<typeof schema>;

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";
  const [err, setErr] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  async function onSubmit(data: Form) {
    setErr(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setErr("Invalid email or password.");
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-5 py-12">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Mountain className="h-5 w-5 text-brand" aria-hidden />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#f5f5f5] bg-cta" />
            </span>
            <span className="font-heading text-xl font-semibold text-brand">SterlingPeak</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-black/[0.04] bg-white p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
          <h1 className="text-center font-heading text-lg font-semibold text-brand">
            Welcome back
          </h1>
          <p className="mt-1 text-center text-[13px] text-brand/40">
            Sign in to the editorial dashboard
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[12px] font-medium text-brand/50">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="h-11 w-full rounded-full border border-black/[0.06] bg-[#f9f9f9] px-5 text-sm text-brand outline-none transition-all placeholder:text-brand/25 focus:border-cta/30 focus:bg-white focus:ring-2 focus:ring-cta/10"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-[12px] font-medium text-brand/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className="h-11 w-full rounded-full border border-black/[0.06] bg-[#f9f9f9] px-5 text-sm text-brand outline-none transition-all placeholder:text-brand/25 focus:border-cta/30 focus:bg-white focus:ring-2 focus:ring-cta/10"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {err && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-center text-[13px] text-red-600">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-full bg-cta text-sm font-semibold text-white shadow-[0_2px_12px_-2px_rgba(34,173,1,0.4)] transition-all hover:shadow-[0_4px_20px_-4px_rgba(34,173,1,0.5)] disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-brand/30">
          <Link href="/" className="rounded-full px-3 py-1 transition-colors hover:bg-brand/5 hover:text-brand/60">
            &larr; Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

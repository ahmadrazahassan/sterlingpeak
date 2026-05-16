import Link from "next/link";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   SterlingPeak logo system.

   The mark is a minimal geometric symbol: a small rounded square
   sits at the top-left, a larger one sits at the bottom-right, and
   a tiny connector dot in the brand green bridges the diagonal
   between them. Reads as a "sterling/peak" — two heights joined by
   a single mark of growth — and feels at home alongside marks like
   Linear, Vectura, Stripe, or Notion.

   Usage:
     <Logo />                        // mark + wordmark, default
     <Logo variant="mark" />         // icon only — favicons / chips
     <Logo variant="wordmark" />     // wordmark only
     <Logo size="sm" />              // compact
     <Logo size="md" />              // default
     <Logo size="lg" />              // large
     <Logo tone="dark" />            // for dark / brand backgrounds
   ────────────────────────────────────────────────────────────────── */

type LogoProps = {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  /** Renders as a Link to "/" by default. Pass `false` to render as a span. */
  asLink?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { mark: 22, gap: "gap-2", text: "text-[15px]" },
  md: { mark: 26, gap: "gap-2.5", text: "text-[18px]" },
  lg: { mark: 32, gap: "gap-3", text: "text-[22px]" },
};

export function Logo({
  variant = "full",
  size = "md",
  tone = "light",
  asLink = true,
  className,
}: LogoProps) {
  const dim = sizeMap[size];
  const wordColor = tone === "dark" ? "text-white" : "text-brand";

  const inner = (
    <span className={cn("group inline-flex items-center", dim.gap, className)}>
      {variant !== "wordmark" && <LogoMark size={dim.mark} tone={tone} />}
      {variant !== "mark" && (
        <span
          className={cn(
            "font-heading font-semibold tracking-[-0.024em] leading-none",
            dim.text,
            wordColor,
          )}
        >
          SterlingPeak
        </span>
      )}
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link
      href="/"
      aria-label="SterlingPeak — home"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Logo mark — geometric two-square symbol with a connector dot.
   Designed on a 32×32 grid so it scales cleanly to any size.
   ────────────────────────────────────────────────────────────────── */

export function LogoMark({
  size = 26,
  tone = "light",
}: {
  size?: number;
  tone?: "light" | "dark";
}) {
  const square = tone === "dark" ? "#ffffff" : "#003748";
  const dot = "#22ad01";

  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        {/* Small rounded square — top-left */}
        <rect
          x="3"
          y="3"
          width="10"
          height="10"
          rx="2.4"
          fill={square}
        />
        {/* Large rounded square — bottom-right */}
        <rect
          x="15"
          y="15"
          width="14"
          height="14"
          rx="3.2"
          fill={square}
        />
        {/* Connector dot — diagonal bridge in brand green */}
        <rect
          x="13"
          y="13"
          width="2.4"
          height="2.4"
          rx="0.6"
          fill={dot}
        />
      </svg>
    </span>
  );
}

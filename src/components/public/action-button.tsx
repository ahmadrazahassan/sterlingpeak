import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   ActionButton — the SterlingPeak action button.

   A rounded rectangle (9px radius), not a pill. The surface is built
   like a physical key on a trading terminal:

     1. Gradient body      — slightly lighter at the top, so the button
                             reads as lit from above.
     2. Inner light edge   — a 1px white inset along the top edge.
     3. Lower shade        — a 1px dark inset along the bottom edge.
     4. Ambient shadow     — a soft coloured drop shadow, tinted by
                             the button's own colour.
     5. Sheen              — a narrow skewed highlight that sweeps
                             across the face on hover. Slow and faint,
                             never a strobe.

   Variants:
     cta       — signal green. The one action we actually want taken.
     primary   — brand teal. Secondary destinations.
     ghost     — quiet paper button for tertiary actions.

   `tone="dark"` adjusts primary/ghost for dark surfaces; cta stays
   cta everywhere, it is the house signal colour.
   ────────────────────────────────────────────────────────────────── */

type Variant = "cta" | "primary" | "ghost";
type Size = "sm" | "md" | "lg";

type ActionButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  /** "light" (default) for light backgrounds; "dark" for dark/brand surfaces. */
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  /** Hide the trailing arrow for compact placements. */
  withArrow?: boolean;
  /**
   * Render as a plain styled span with no link/button wrapper — for
   * placing the button face inside a parent <Link> (article cards),
   * where a nested anchor or button would be invalid HTML.
   */
  asSpan?: boolean;
};

const sizeMap: Record<Size, { box: string; text: string; arrow: string }> = {
  sm: { box: "h-10 gap-2 px-4", text: "text-[12.5px]", arrow: "h-3.5 w-3.5" },
  md: { box: "h-[46px] gap-2.5 px-5", text: "text-[13.5px]", arrow: "h-4 w-4" },
  lg: { box: "h-[52px] gap-3 px-6", text: "text-[14.5px]", arrow: "h-[17px] w-[17px]" },
};

type Skin = {
  /** Body: gradient + text colour + inset edges + ambient shadow. */
  body: string;
  /** Top-half glass overlay opacity. */
  glass: string;
  /** Sheen strip colour. */
  sheen: string;
};

const skins: Record<"light" | "dark", Record<Variant, Skin>> = {
  light: {
    cta: {
      body: cn(
        "text-white",
        "bg-gradient-to-b from-[#33c211] via-[#22ad01] to-[#1a9200]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,45,0,0.25),0_1px_2px_rgba(0,55,72,0.16),0_10px_24px_-10px_rgba(34,173,1,0.55)]",
      ),
      glass: "from-white/[0.18]",
      sheen: "via-white/30",
    },
    primary: {
      body: cn(
        "text-white",
        "bg-gradient-to-b from-[#0c5064] via-[#003748] to-[#002938]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.28),0_1px_2px_rgba(0,55,72,0.2),0_10px_24px_-10px_rgba(0,55,72,0.5)]",
      ),
      glass: "from-white/[0.14]",
      sheen: "via-white/25",
    },
    ghost: {
      body: cn(
        "text-brand",
        "bg-gradient-to-b from-white to-[#eef1f2]",
        "ring-1 ring-inset ring-brand/[0.12]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(0,55,72,0.08),0_8px_18px_-12px_rgba(0,55,72,0.25)]",
      ),
      glass: "from-white/60",
      sheen: "via-brand/[0.05]",
    },
  },
  dark: {
    cta: {
      body: cn(
        "text-white",
        "bg-gradient-to-b from-[#33c211] via-[#22ad01] to-[#1a9200]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,45,0,0.25),0_10px_26px_-10px_rgba(34,173,1,0.6)]",
      ),
      glass: "from-white/[0.18]",
      sheen: "via-white/30",
    },
    primary: {
      body: cn(
        "text-brand",
        "bg-gradient-to-b from-white to-[#e9eeef]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,55,72,0.12),0_12px_26px_-12px_rgba(0,0,0,0.55)]",
      ),
      glass: "from-white/70",
      sheen: "via-brand/[0.06]",
    },
    ghost: {
      body: cn(
        "text-white",
        "bg-white/[0.07]",
        "ring-1 ring-inset ring-white/20",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
        "hover:bg-white/[0.11]",
      ),
      glass: "from-white/[0.08]",
      sheen: "via-white/20",
    },
  },
};

export function ActionButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  tone = "light",
  type = "button",
  className,
  children,
  ariaLabel,
  withArrow = true,
  asSpan = false,
}: ActionButtonProps) {
  const s = sizeMap[size];
  const skin = skins[tone][variant];

  const face = (
    <span
      className={cn(
        "group relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[9px]",
        "font-heading font-semibold tracking-[0.005em]",
        "transition-[transform,filter] duration-300 ease-out",
        "hover:-translate-y-px hover:brightness-[1.03] active:translate-y-0 active:brightness-100",
        s.box,
        s.text,
        skin.body,
        className,
      )}
    >
      {/* Top-half glass — the button reads as lit from above. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 rounded-t-[9px] bg-gradient-to-b to-transparent",
          skin.glass,
        )}
      />
      {/* Sheen — sweeps once across the face on hover. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]",
          skin.sheen,
        )}
      />
      <span className="leading-none">{children}</span>
      {withArrow && (
        <ArrowUpRight
          aria-hidden
          className={cn(
            s.arrow,
            "transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]",
          )}
          strokeWidth={2.1}
        />
      )}
    </span>
  );

  const focusRing =
    "inline-flex rounded-[9px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

  if (asSpan) {
    return face;
  }
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={focusRing}>
        {face}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={focusRing}>
      {face}
    </button>
  );
}

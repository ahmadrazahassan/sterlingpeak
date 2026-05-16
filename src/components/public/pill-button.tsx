import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   PillButton — the SterlingPeak action button.

   Visual: a long rounded-full pill carries the label, with a solid
   circular chip floating at the right edge holding an up-right arrow.
   The chip lifts on hover, and the pill background tints subtly.

   Variants:
     primary   — brand teal chip on a soft card-tinted pill (default)
     cta       — cta green chip on a soft green-tinted pill (Subscribe)
     ghost     — outlined version on the page background

   Sizes:
     sm  — 40px tall pill, 32px chip
     md  — 48px tall pill, 38px chip (default)
     lg  — 56px tall pill, 44px chip
   ────────────────────────────────────────────────────────────────── */

type Variant = "primary" | "cta" | "ghost";
type Size = "sm" | "md" | "lg";

type PillButtonProps = {
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
};

const sizeMap: Record<
  Size,
  { pill: string; pl: string; pr: string; chip: string; arrow: string; gap: string; text: string }
> = {
  sm: {
    pill: "h-10",
    pl: "pl-5",
    pr: "pr-1.5",
    chip: "h-7 w-7",
    arrow: "h-3.5 w-3.5",
    gap: "gap-3",
    text: "text-[12.5px]",
  },
  md: {
    pill: "h-12",
    pl: "pl-6",
    pr: "pr-1.5",
    chip: "h-9 w-9",
    arrow: "h-4 w-4",
    gap: "gap-4",
    text: "text-[14px]",
  },
  lg: {
    pill: "h-14",
    pl: "pl-7",
    pr: "pr-2",
    chip: "h-10 w-10",
    arrow: "h-[18px] w-[18px]",
    gap: "gap-5",
    text: "text-[15px]",
  },
};

type ToneStyle = {
  pill: string;
  text: string;
  chip: string;
  arrow: string;
  chipHover: string;
};

/** Light-tone variants — pills sit on white / page surfaces. */
const variantLight: Record<Variant, ToneStyle> = {
  primary: {
    pill: "bg-card hover:bg-card/85",
    text: "text-brand",
    chip: "bg-brand",
    arrow: "text-white",
    chipHover: "group-hover:scale-[1.06]",
  },
  cta: {
    pill: "bg-cta/10 hover:bg-cta/15",
    text: "text-brand",
    chip: "bg-cta",
    arrow: "text-white",
    chipHover: "group-hover:scale-[1.06]",
  },
  ghost: {
    pill: "bg-transparent ring-1 ring-inset ring-border-subtle hover:bg-card",
    text: "text-brand",
    chip: "bg-brand",
    arrow: "text-white",
    chipHover: "group-hover:scale-[1.06]",
  },
};

/** Dark-tone variants — pills sit on the brand / dark hero surfaces. */
const variantDark: Record<Variant, ToneStyle> = {
  primary: {
    pill: "bg-white/10 hover:bg-white/15 ring-1 ring-inset ring-white/15",
    text: "text-white",
    chip: "bg-white",
    arrow: "text-brand",
    chipHover: "group-hover:scale-[1.06]",
  },
  cta: {
    pill: "bg-cta/15 hover:bg-cta/20 ring-1 ring-inset ring-cta/30",
    text: "text-white",
    chip: "bg-cta",
    arrow: "text-white",
    chipHover: "group-hover:scale-[1.06]",
  },
  ghost: {
    pill: "bg-transparent ring-1 ring-inset ring-white/15 hover:bg-white/[0.06]",
    text: "text-white",
    chip: "bg-white",
    arrow: "text-brand",
    chipHover: "group-hover:scale-[1.06]",
  },
};

export function PillButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  tone = "light",
  type = "button",
  className,
  children,
  ariaLabel,
}: PillButtonProps) {
  const s = sizeMap[size];
  const v = (tone === "dark" ? variantDark : variantLight)[variant];

  const content = (
    <span
      className={cn(
        "group inline-flex shrink-0 items-center rounded-full font-heading font-semibold tracking-[0.005em] transition-colors",
        s.pill,
        s.pl,
        s.pr,
        s.gap,
        s.text,
        v.pill,
        v.text,
        className,
      )}
    >
      <span className="leading-none">{children}</span>
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-transform duration-300 ease-out",
          s.chip,
          v.chip,
          v.chipHover,
        )}
      >
        <ArrowUpRight
          className={cn(s.arrow, v.arrow, "transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]")}
          strokeWidth={2}
        />
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex">
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex"
    >
      {content}
    </button>
  );
}

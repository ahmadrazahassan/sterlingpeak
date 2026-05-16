import { cn } from "@/lib/utils";

/**
 * Real LinkedIn brand mark.
 *
 * - `variant="brand"` (default): blue square with the "in" letterform — the
 *   official LinkedIn brand glyph, recognisable inline next to a name or in
 *   a footer. Uses #0A66C2 (LinkedIn brand blue).
 * - `variant="mono"`: outline mark in `currentColor`. Use this when sitting
 *   inside a coloured pill or on a dark background where the brand square
 *   would clash with the surrounding chrome.
 *
 * Sized in CSS via `className` (height/width). Defaults to 1em so it scales
 * with surrounding text size.
 */

type Props = React.SVGProps<SVGSVGElement> & {
  className?: string;
  /** Optional accessible label. If omitted, the icon is hidden from AT. */
  label?: string;
  variant?: "brand" | "mono";
};

const linkedInPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

export function LinkedInBrand({
  className,
  label,
  variant = "brand",
  // strokeWidth is accepted by callers that share an Icon prop type with
  // lucide icons; LinkedIn is a filled brand mark so we silently drop it.
  strokeWidth: _strokeWidth,
  fill,
  ...rest
}: Props) {
  const ariaProps = label
    ? ({ role: "img", "aria-label": label } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill ?? (variant === "brand" ? "#0A66C2" : "currentColor")}
      className={cn("inline-block h-[1em] w-[1em]", className)}
      {...rest}
      {...ariaProps}
    >
      <path d={linkedInPath} />
    </svg>
  );
}

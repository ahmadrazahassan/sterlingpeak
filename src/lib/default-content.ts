import type {
  TrustSectionJson,
} from "@/lib/settings-types";

export const DEFAULT_TRUST: TrustSectionJson = {
  title: "Our editorial commitments",
  columns: [
    {
      title: "Independent editorial",
      body: "Our writers and editors operate independently. Software vendors have no influence over our conclusions, scores, or recommendations.",
    },
    {
      title: "Research-backed analysis",
      body: "Every comparison evaluates real pricing, actual feature sets, and UK-specific compliance support — not press releases.",
    },
    {
      title: "Transparent affiliate disclosure",
      body: "Some links earn SterlingPeak a referral commission. We disclose every affiliate relationship and never let it shape editorial outcomes.",
    },
  ],
};

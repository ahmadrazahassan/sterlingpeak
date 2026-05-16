import type { TrustSectionJson } from "@/lib/settings-types";

export const DEFAULT_TRUST: TrustSectionJson = {
  title: "How we work",
  columns: [
    {
      title: "UK-only editorial",
      body: "Every guide is written for HMRC, UK VAT schemes, PAYE RTI, auto-enrolment and Making Tax Digital — not US tax law translated into pounds.",
    },
    {
      title: "Pricing verified each quarter",
      body: "We verify vendor pricing in GBP with each VAT cycle. Reviews carry a verified date so readers know when the figures were last checked.",
    },
    {
      title: "Affiliate disclosure on every page",
      body: "Where SterlingPeak earns a referral commission, we disclose it inline. Commission never determines what we recommend or how we score it.",
    },
  ],
};

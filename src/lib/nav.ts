/** Primary navigation — paths align with seeded category slugs (§6, §8). */
export const MAIN_NAV = [
  { label: "Accounting", href: "/categories/accounting" },
  { label: "Software", href: "/categories/business-software" },
  { label: "Comparisons", href: "/comparisons" },
  { label: "Payroll", href: "/categories/payroll-hr" },
  { label: "Tax & VAT", href: "/categories/vat-tax" },
  { label: "Guides", href: "/categories/small-business-guides" },
  { label: "Industries", href: "/categories/industry-solutions" },
] as const;

export const SOFTWARE_MEGA_CORE = [
  { label: "Accounting Software", href: "/categories/accounting" },
  { label: "Payroll Software", href: "/categories/payroll-hr" },
  { label: "HR Software", href: "/categories/payroll-hr" },
  { label: "ERP Software", href: "/categories/erp-operations" },
  { label: "Invoicing Tools", href: "/categories/accounting" },
  { label: "Business Banking", href: "/categories/payments-banking" },
] as const;

export const SOFTWARE_MEGA_GUIDES = [
  { label: "Best Accounting Software UK", href: "/comparisons" },
  { label: "Best Payroll Software for SMEs", href: "/comparisons" },
  { label: "Making Tax Digital Software", href: "/categories/vat-tax" },
  { label: "Cloud Accounting Guide", href: "/categories/accounting" },
] as const;

export const INDUSTRY_MEGA = [
  { label: "Construction", href: "/categories/industry-solutions" },
  { label: "SaaS & Technology", href: "/categories/industry-solutions" },
  { label: "Retail", href: "/categories/industry-solutions" },
  { label: "Healthcare", href: "/categories/industry-solutions" },
  { label: "Hospitality", href: "/categories/industry-solutions" },
  { label: "Manufacturing", href: "/categories/industry-solutions" },
  { label: "Professional Services", href: "/categories/industry-solutions" },
  { label: "Non-profits", href: "/categories/industry-solutions" },
] as const;

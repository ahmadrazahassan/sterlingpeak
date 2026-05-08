-- Seed categories (§31), default site_settings, sample authors & articles for development

insert into public.categories (name, slug, description, hero_title, seo_title, seo_description, sort_order, is_active)
values
  ('Accounting', 'accounting', 'Bookkeeping, cloud accounting, and reporting for UK SMEs.', 'Accounting insights for modern UK businesses', 'Accounting | SterlingPeak', 'Practical accounting software and finance guides for UK SMEs.', 1, true),
  ('Business Software', 'business-software', 'Operational tools beyond the ledger.', 'Business software for UK SMEs', 'Business Software | SterlingPeak', 'Guides to choosing business software in the UK.', 2, true),
  ('Comparisons', 'comparisons', 'Side-by-side software analysis.', 'Software comparisons for UK SMEs', 'Comparisons | SterlingPeak', 'Compare accounting, payroll, and finance tools.', 3, true),
  ('Payroll & HR', 'payroll-hr', 'Payroll compliance and people operations.', 'Payroll & HR insights', 'Payroll & HR | SterlingPeak', 'Payroll software and HR operations for UK businesses.', 4, true),
  ('VAT & Tax', 'vat-tax', 'VAT, MTD, and tax workflows.', 'VAT & tax guidance', 'VAT & Tax | SterlingPeak', 'Tax and Making Tax Digital guidance for SMEs.', 5, true),
  ('Small Business Guides', 'small-business-guides', 'Foundational SME operations content.', 'Small business guides', 'SME Guides | SterlingPeak', 'Practical guides for growing UK businesses.', 6, true),
  ('Payments & Banking', 'payments-banking', 'Cash flow, banking, and payments.', 'Payments & banking', 'Payments & Banking | SterlingPeak', 'Banking and payment workflows for SMEs.', 7, true),
  ('ERP & Operations', 'erp-operations', 'Scaling systems and operations.', 'ERP & operations', 'ERP & Operations | SterlingPeak', 'ERP and operational software for UK SMEs.', 8, true),
  ('Industry Solutions', 'industry-solutions', 'Sector-specific software guidance.', 'Industry solutions', 'Industry Solutions | SterlingPeak', 'Software guidance by industry.', 9, true)
on conflict (slug) do nothing;

insert into public.authors (name, slug, bio, role, is_active)
values
  ('SterlingPeak Editorial Team', 'sterlingpeak-editorial', 'Independent editorial team covering UK business finance and software.', 'Editorial', true),
  ('Business Software Desk', 'business-software-desk', 'Analysts focused on accounting, payroll, and ERP platforms.', 'Research', true)
on conflict (slug) do nothing;

-- Default homepage / site copy (overridable via admin)
insert into public.site_settings (key, value)
values
  ('hero', '{"eyebrow":"Independent UK Finance Publication","heading":"The accounting and payroll intelligence UK businesses read first","description":"SterlingPeak publishes in-depth comparisons, editorial guides, and compliance-focused analysis for Sage, Xero, QuickBooks, and the platforms UK SMEs depend on every day.","ctaPrimaryLabel":"Read our comparisons","ctaPrimaryHref":"/comparisons","ctaSecondaryLabel":"Browse editorial guides","ctaSecondaryHref":"/categories/accounting"}'::jsonb),
  ('featured_comparisons_section', '{"title":"Head-to-head software comparisons","subtitle":"Side-by-side analysis of UK accounting, payroll, and business platforms — pricing, MTD compliance, integrations, and workflow trade-offs."}'::jsonb),
  ('latest_section', '{"title":"Recently published"}'::jsonb),
  ('newsletter_section', '{"title":"The SterlingPeak Briefing","description":"A weekly dispatch covering UK software updates, HMRC changes, and the editorial analysis our readers rely on."}'::jsonb),
  ('trust_section', '{"title":"Our editorial commitments","columns":[{"title":"Independent editorial","body":"Our writers and editors operate independently. Software vendors have no influence over our conclusions, scores, or recommendations."},{"title":"Research-backed analysis","body":"Every comparison evaluates real pricing, actual feature sets, and UK-specific compliance support — not press releases."},{"title":"Transparent affiliate disclosure","body":"Some links earn SterlingPeak a referral commission. We disclose every affiliate relationship and never let it shape editorial outcomes."}]}'::jsonb),
  ('footer', '{"statement":"Independent software intelligence for UK finance teams.","supporting":"SterlingPeak publishes editorial-grade comparisons, guides, and compliance analysis for accounting, payroll, and business operations."}'::jsonb),
  ('mega_menu', '{"softwareFeatured":{"title":"Sage vs Xero: Which is better for UK SMEs?","description":"Compare features, pricing, payroll, VAT support, and reporting workflows.","href":"/comparisons","ctaLabel":"Read comparison"}}'::jsonb)
on conflict (key) do nothing;

-- Sample articles (§31): titles are seed data only; UI reads from DB
insert into public.articles (
  title, slug, excerpt, content, category_id, author_id, status,
  is_featured, is_comparison, article_type, reading_time, published_at,
  meta_title, meta_description, affiliate_disclosure_required
)
select
  v.title,
  v.slug,
  v.excerpt,
  v.content,
  c.id,
  a.id,
  'published',
  v.is_featured,
  v.is_comparison,
  v.article_type,
  v.reading_time,
  now() - (v.days_ago || ' days')::interval,
  v.meta_title,
  v.meta_description,
  v.affiliate_disclosure_required
from (values
  ('Choosing cloud accounting for a growing UK SME', 'choosing-cloud-accounting-uk-sme',
   'What to evaluate before you migrate ledgers, bank feeds, and reporting.',
   E'# Choosing cloud accounting\n\nUK SMEs should map **workflows** before picking a platform: bank feeds, VAT, payroll handoff, and reporting.\n\n## Checklist\n\n- User roles and approvals\n- MTD compatibility\n- Integration with payroll\n',
   'accounting', 'sterlingpeak-editorial', true, false, 'guide', 6, 1,
   'Cloud accounting for UK SMEs | SterlingPeak', 'A practical checklist for choosing cloud accounting.', false),
  ('Payroll compliance calendar for small teams', 'payroll-compliance-calendar-small-teams',
   'Key dates and software capabilities that keep payroll on track.',
   E'# Payroll compliance calendar\n\nPlan monthly and annual cycles alongside **HMRC** submissions.\n\n> Tip: automate reminders in your payroll software.\n',
   'payroll-hr', 'business-software-desk', false, false, 'guide', 5, 2,
   'Payroll calendar UK | SterlingPeak', 'Payroll timing and compliance for SMEs.', false),
  ('Sage vs Xero for UK SMEs: workflow comparison', 'sage-vs-xero-uk-smes',
   'A structured look at reporting, payroll, VAT, and ecosystem fit.',
   E'# Sage vs Xero\n\n| Factor | Sage | Xero |\n| --- | --- | --- |\n| VAT / MTD | Strong enterprise paths | Strong cloud-native |\n| Payroll | Deep UK payroll options | Partner ecosystem |\n\n## Verdict\n\nChoose based on **complexity** and in-house finance capacity.\n',
   'comparisons', 'business-software-desk', true, true, 'guide', 12, 3,
   'Sage vs Xero UK | SterlingPeak', 'Compare Sage and Xero for UK SMEs.', true),
  ('Making Tax Digital: software readiness', 'making-tax-digital-software-readiness',
   'What MTD means for records, bridging, and audit trails.',
   E'# MTD readiness\n\nEnsure your software maintains **digital links** and submission history.\n',
   'vat-tax', 'sterlingpeak-editorial', false, false, 'guide', 7, 4,
   'MTD software readiness | SterlingPeak', 'Making Tax Digital readiness for SMEs.', false),
  ('Best practices for cash flow forecasting', 'cash-flow-forecasting-practices',
   'How to build a rolling forecast without spreadsheet risk.',
   E'# Cash flow forecasting\n\nRoll forecasts weekly; reconcile to bank daily where possible.\n',
   'payments-banking', 'sterlingpeak-editorial', false, false, 'guide', 8, 5,
   'Cash flow forecasting | SterlingPeak', 'Forecasting practices for UK SMEs.', false),
  ('ERP scoping for mid-sized UK operations', 'erp-scoping-mid-sized-uk',
   'When spreadsheets break and ERP becomes the sensible path.',
   E'# ERP scoping\n\nDocument **order-to-cash** and **procure-to-pay** before demos.\n',
   'erp-operations', 'business-software-desk', false, false, 'guide', 10, 6,
   'ERP scoping UK | SterlingPeak', 'How to scope ERP for growing UK businesses.', false),
  ('Retail inventory and accounting integrations', 'retail-inventory-accounting',
   'Connecting POS, stock, and the general ledger.',
   E'# Retail integrations\n\nPrioritise **near real-time** stock valuation feeds.\n',
   'industry-solutions', 'sterlingpeak-editorial', false, false, 'guide', 9, 7,
   'Retail accounting integrations | SterlingPeak', 'Inventory and accounting for retailers.', false),
  ('Construction CIS and job costing overview', 'construction-cis-job-costing',
   'How construction finance teams track jobs and deductions.',
   E'# CIS overview\n\nTrack **CIS deductions** per subcontractor with clear job attribution.\n',
   'industry-solutions', 'business-software-desk', false, false, 'guide', 11, 8,
   'Construction CIS UK | SterlingPeak', 'CIS and job costing for construction SMEs.', false),
  ('QuickBooks vs Sage: reporting depth', 'quickbooks-vs-sage-reporting',
   'Which platform fits finance teams that need granular reporting.',
   E'# Reporting comparison\n\nEvaluate **dimensions**, departments, and consolidation needs.\n',
   'comparisons', 'business-software-desk', false, true, 'guide', 9, 9,
   'QuickBooks vs Sage | SterlingPeak', 'Reporting comparison for UK SMEs.', true),
  ('HR software: when to move beyond spreadsheets', 'hr-software-beyond-spreadsheets',
   'Signals that your people ops stack needs an upgrade.',
   E'# HR software signals\n\nLook for **onboarding**, **policies**, and **time tracking** pain.\n',
   'payroll-hr', 'sterlingpeak-editorial', false, false, 'guide', 6, 10,
   'HR software UK | SterlingPeak', 'When to adopt HR software.', false),
  ('Payments stack for SaaS companies', 'payments-stack-saas-companies',
   'Subscriptions, payouts, and accounting handoff.',
   E'# SaaS payments\n\nAlign **subscription billing** with revenue recognition policies.\n',
   'business-software', 'business-software-desk', false, false, 'guide', 8, 11,
   'SaaS payments stack | SterlingPeak', 'Payments and accounting for SaaS SMEs.', false),
  ('Small business guide: first 90 days of bookkeeping', 'first-90-days-bookkeeping',
   'A practical onboarding path for new finance leads.',
   E'# First 90 days\n\nStabilise **chart of accounts**, bank rules, and month-end close cadence.\n',
   'small-business-guides', 'sterlingpeak-editorial', true, false, 'guide', 7, 12,
   'First 90 days bookkeeping | SterlingPeak', 'Bookkeeping onboarding for SMEs.', false)
) as v(title, slug, excerpt, content, cat_slug, author_slug, is_featured, is_comparison, article_type, reading_time, days_ago, meta_title, meta_description, affiliate_disclosure_required)
join public.categories c on c.slug = v.cat_slug
join public.authors a on a.slug = v.author_slug
on conflict (slug) do nothing;

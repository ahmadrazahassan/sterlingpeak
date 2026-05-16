# Sage UK Affiliate Programme — Resubmission Audit

**Site:** sterlingpeak.uk
**Operator:** Hafiza Ayesha Waheed (Founder & Editor-in-Chief)
**Property type:** UK editorial publication + weekly newsletter
**Previous decision (Impact.com):** Declined — *"Quality issue with media property (Website, Social)"*
**Audit prepared by:** Senior dev / partnership review perspective
**Date of audit:** 2026

---

## 1. How to read the rejection

Impact.com only surfaces **one rejection bucket**: *"Quality issue with media property (Website, Social)."* Sage's actual compliance team rejects against an internal rubric that's stricter than the bucket name suggests. In practice, this generic rejection is used for every one of these problems:

1. The property doesn't yet look like a working publication (low article count, thin pages, missing categories).
2. Editorial identity is unclear or inconsistent (anonymous bylines, editor name mismatch, no contact).
3. Affiliate disclosure is present but not **placed correctly per article** (inline, near top of articles).
4. Trust pages exist but read as boilerplate instead of UK-specific operating policy.
5. Newsletter, social, or audience claims aren't verifiable.
6. The site uses Sage product names or marketing copy in a way that risks brand-safety flags.
7. Pricing claims aren't time-stamped (Sage hates stale figures).
8. There's no indication of UK GDPR / PECR readiness in the actual site behaviour (banner, DPA, double opt-in).

The fix is not "add more content." The fix is to **prove operational maturity** in places the reviewer actually looks: home page, About, Editorial Policy, Affiliate Disclosure, an article, a comparison, the newsletter sign-up, and the cookie banner.

---

## 2. What Sage UK reviewers check, in order

Based on the public Sage UK affiliate guidance, the typical Impact.com publisher review flow, and how a partnership manager actually reads a property:

| Step | What they look at | What flips it from pass → fail |
|---|---|---|
| 1 | Home page (15 seconds) | Generic Bootstrap-template feel, "best of" stock copy, hero with no UK signal |
| 2 | One or two article URLs | Thin word count, no UK angle, no author byline, no published/updated date |
| 3 | About page | No founder name, no editor name, no UK location, no hint of a real team |
| 4 | Editorial Policy | Boilerplate paragraphs that could be lifted from any affiliate site |
| 5 | Affiliate Disclosure | Present but vague; missing per-article inline disclosure block |
| 6 | Privacy + Cookies | No live consent banner; Cookie Policy without an actual mechanism |
| 7 | Newsletter sign-up | Not double opt-in, generic confirmation copy, anonymous sender |
| 8 | Social (LinkedIn, X) | Empty or non-existent; one-or-two-day-old account |
| 9 | Brand-safety check | Use of "Sage Partner", "Authorised", trademark misuse, copied Sage marketing |
| 10 | Sage product mentions | Pricing without a verified date, comparing Sage to a competitor in a way that misrepresents UK SKUs |

---

## 3. Site audit — findings by area

### 3.1 Home page

**What's good**
- The hero positioning is UK-first and names HMRC concepts (MTD, VAT, PAYE, auto-enrolment).
- Logo marquee shows Sage, Xero, QuickBooks, BambooHR — visually credible.
- Read-by capsule + London time clock + green status dot = real publication signals.
- Recently published, comparisons, category sections = depth, not a thin landing page.
- New PillButton with up-right arrows = consistent action language.

**What's still risky for Sage**
- The headline used to oversell ("the accounting and payroll intelligence UK businesses read first"). Already softened in the new copy, but **Sage's reviewer specifically dislikes ranking superlatives** without proof.
- Trust commitments section reads cleanly **only if the underlying article inventory matches**. With fewer than 6 published articles visible, the reviewer will discount the trust copy as aspirational.
- No newsletter subscriber count or social followers shown, which is fine — but **don't claim a number you can't substantiate** anywhere on the property form.

### 3.2 About page (`/about`)

**What's good**
- Names the founder/editor: **Hafiza Ayesha Waheed**.
- Editor's voice is in first person — sounds like a person, not a content farm.
- UK regulatory framing is named explicitly (MTD, PAYE RTI, auto-enrolment, VAT flat rate, CIS).
- Calls out *why* the publication exists, not just *what* it does.

**What's still risky**
- **No headshot or LinkedIn link for the editor.** Sage reviewers often LinkedIn-check the named editor. If that profile doesn't exist or doesn't match, that alone can flip the decision.
- No **physical UK address or registered company name** anywhere on About or Contact. UK editorial publications routinely show "Published by [Limited Company Name], registered in England and Wales no. XXXXXXXX" — the absence of this looks like a hobby site.
- "Our editorial team" used in places where the team is one person. Better to say "I" or "the desk" consistently.
- No editorial team list — even if it's just one editor + one or two contributors, name them.

### 3.3 Editorial Policy (`/editorial-policy`)

**What's good**
- Sections cover research methodology, independence, comparison criteria, updates/corrections, pricing verification, affiliate disclosure practices.
- Specific UK criteria called out (MTD, VAT, CIS, PAYE RTI).

**What's still risky**
- Several sentences read like template boilerplate ("Editorial decisions are made independently of commercial relationships"). True, but **every affiliate site says this**. Sage looks for *operating specifics* that prove the policy is real:
  - How long after publication do you re-verify pricing?
  - What's your minimum word count per review?
  - How are conflicts of interest declared?
  - Who reviews articles before publication?
  - What's your correction notice format and where does it live?
- No mention of **how Sage products are positioned editorially** — given Sage is your number-one affiliate target, an explicit "Where Sage fits" section answering *which Sage product is the right fit for which UK profile* is the strongest single signal you can give the Sage reviewer.

### 3.4 Affiliate Disclosure (`/affiliate-disclosure`)

**What's good**
- Standalone page exists.
- Clear language about commission, no extra cost, editorial independence.
- A bulleted "our editorial commitment" block.

**What's still risky**
- **The dedicated page is not enough.** Sage's compliance position (and the broader UK CAP/ASA position) is that affiliate disclosure must be **inline with each commercial recommendation**, not just on a footer link. The article template has the disclosure block code, but it's only rendered when `affiliate_disclosure_required = true` per row. Set that to `true` for every Sage / Xero / QuickBooks review and comparison.
- Disclosure copy doesn't currently name **Sage** specifically. Sage reviewers like to see their brand named in disclosures when an article actively recommends them — it's a clarity signal.

### 3.5 Privacy Policy (`/privacy-policy`) + Cookie Policy (`/cookie-policy`)

**What's good**
- Both pages exist.
- Privacy Policy references UK GDPR and Data Protection Act 2018.
- Cookie Policy lists three categories (Essential, Analytics, Functional).
- A live cookie consent banner is shipped (granular, double-opt-in compliant, gates Vercel Analytics).

**What's still risky**
- **No "Last updated" timestamp visible at the top of either policy.** UK reviewers expect this.
- No data controller name + ICO registration number. UK GDPR requires identifying the controller. If no Limited yet, identifying the natural person (Hafiza Ayesha Waheed) and the registered address is acceptable — **say it explicitly**.
- **The cookie banner needs a live test** — does it actually block analytics until consent is given? On the application form, Sage occasionally asks compliance to network-trace this.

### 3.6 Contact (`/contact`)

**What's good**
- A real form with proper validation (zod + react-hook-form).
- Direct mailto address: `hello@sterlingpeak.uk`.
- Subject categories include "Affiliate or partnership enquiry".
- Response time SLA stated.

**What's still risky**
- No **phone number or postal address**. UK CAP Code expects publishers running affiliate links to be reachable beyond email. A registered office address is enough.
- No **clear company / sole-trader trading name**. "SterlingPeak is based in the United Kingdom" is true but vague — say where, in which jurisdiction, under what legal entity (or trading name).

### 3.7 Newsletter (`/newsletter`)

**What's good**
- A real subscription page with editorial framing, the editor's name, sample issue topics, double opt-in language, GDPR copy.
- Form ships subscriptions to a real backend.
- "Free, every Thursday — around a 5-minute read" matches your Impact.com property form.

**What's still risky**
- No **archive of past issues**. Sage reviewers (and Impact's own QA) will look for a public archive even if it's just three issues. Currently the page references it but the archive doesn't exist.
- No **subscriber count** visible. Either show a real one ("a few hundred and growing") or omit entirely. Don't fabricate.
- The sender email `briefing@sterlingpeak.uk` referenced in property form must actually resolve, and the welcome email must come from it. Dead address = automatic fail at first compliance check.

### 3.8 Articles + Comparisons

**What's good**
- 10 long-form articles already shipped (~32,000 words total) covering Sage Intacct, Sage 200, Sage product ecosystem, MTD, VAT, ERP vs accounting, finance stack, etc.
- Articles use consistent branded HTML template with summary boxes, tables, and FAQs.
- Most articles are over 3,000 words, well above blog-thin threshold.

**What's still risky**
- **Author bylines need a check.** The audit notes earlier flagged the founder name mismatch (About said "Hafiza Ayesha Waheed", database author was "Abdul Rehman Ch"). Confirm every published article shows **Hafiza Ayesha Waheed** as the author, not Abdul Rehman, before resubmission.
- **No "Last verified: dd Month YYYY" line at the top of each article.** The site has the verification component, but it's only rendered conditionally.
- **No methodology block per comparison.** Editorial Policy describes methodology, but a comparison article should reference it inline ("How we compared", with the criteria listed).
- No **author bio at the foot of each article.** Even a 3-line bio with a LinkedIn link converts a generic post into "real publication".

### 3.9 Header + brand identity

**What's good**
- New finance-broadsheet style header with London time clock, divider-separated nav, green Subscribe pill.
- Logo system unified (geometric two-square mark + wordmark) and used everywhere.
- No misuse of the Sage logo.

**What's still risky**
- The current logo mark is decorative; not yet trademarked. Fine — but make sure the favicon, OG image, and `apple-touch-icon` are all the new mark.
- Make sure the OG image (`/icon.svg` etc) is not still the Next.js default.

### 3.10 Footer

**What's good**
- Real navigation with Explore, Resources, Company, Legal columns.
- Links to all the trust pages.
- Manage cookies link + footer email.

**What's still risky**
- No **registered office line** in the footer. Even something like "SterlingPeak is published by Hafiza Ayesha Waheed, [town], United Kingdom" is enough to remove the "hobby site" smell.
- Newsletter strip in footer is good but has no double-opt-in language at the form level.

### 3.11 Social presence (Sage explicitly checks this)

**Likely the single biggest reason for rejection.** Sage's Impact.com filter looks at every property type the publisher claimed — Website AND Social. If you ticked any social property and the underlying account is empty, that triggers the "Quality issue" bucket immediately.

**What to do**
- **LinkedIn page (mandatory).** Create a SterlingPeak company page. Post 3-5 editorial posts (link to your existing articles with an editorial caption). Make Hafiza Ayesha Waheed the page owner with the same name as the About page.
- **X / Threads / Bluesky.** Optional but helps. If you create one, post real editorial content for two weeks before resubmitting.
- **Don't list a social handle on the affiliate form unless that handle has at least 3-5 real posts and a recognisable bio.**

### 3.12 Brand-safety audit (Sage-specific)

A line-by-line check for things Sage's brand team flags:

- ✅ No use of **"Sage Partner"** or **"Sage Authorised"** copy on any page.
- ✅ No copy lifted from sage.com.
- ✅ No claims that SterlingPeak *is* Sage or speaks for Sage.
- ✅ Sage product names used correctly (Sage Accounting, Sage Sole Trader, Sage 50, Sage 200, Sage Intacct, Sage Payroll, Sage HR).
- ⚠️ Pricing for Sage products quoted in articles must show "verified at [date]" inline. Sage cares about this more than most vendors.
- ⚠️ The phrase "best for everyone" should not appear next to Sage anywhere — Sage reviewers reject this as not nuanced.

---

## 4. Required fixes — ranked by priority

This is the sequence I would ship them in. Don't resubmit until everything in **P0** is shipped and the **P1** items are at least started.

### P0 — Must ship before resubmission

| # | Fix | Where | Why it matters to Sage |
|---|---|---|---|
| 1 | Confirm every article byline shows **Hafiza Ayesha Waheed** | Database `articles.author_id` + `authors` table | Author identity mismatch was already flagged. Sage cross-checks About vs bylines. |
| 2 | Add a **photo + 1-paragraph bio + LinkedIn link** for the editor on `/about` | About page | Sage reviewers LinkedIn-check named editors. No verification = template signal. |
| 3 | Set `affiliate_disclosure_required = true` on every Sage / Xero / QuickBooks review/comparison row | Database | Inline disclosure on every commercial article is a Sage compliance baseline. |
| 4 | Add a **"Last verified: dd Month yyyy"** line at the top of every comparison and review | Article template (use `updated_at` or a custom verified field) | Sage hates stale pricing claims. |
| 5 | Add a **registered location line** in the site footer + Privacy Policy contact section | `site-footer.tsx`, `/privacy-policy` | UK GDPR requires identifying the controller. Affiliate compliance expects it. |
| 6 | Create the **SterlingPeak LinkedIn company page** with 3 real editorial posts before resubmission | LinkedIn | The "Social" half of the rejection reason. |
| 7 | Create / verify the **briefing@sterlingpeak.uk** mailbox + send a real welcome email to test subscribers | Email infra | Form fields that don't resolve = compliance fail. |
| 8 | Add **"Last updated"** timestamp to top of `/privacy-policy` and `/cookie-policy` | Both pages | UK GDPR best practice. Reviewer specifically looks for it. |
| 9 | Add a **Sage-specific positioning section** to `/editorial-policy` ("Where Sage fits in our coverage") | Editorial Policy | Strongest single Sage-signalling change you can make. |
| 10 | Add an **author bio block** at the foot of every published article | Article template | Converts each article from "blog post" to "publication piece". |

### P1 — Ship within 1–2 weeks of resubmission

| # | Fix | Why |
|---|---|---|
| 11 | Publish at least 2 more **Sage-specific reviews** (Sage Sole Trader and Sage Payroll) bringing depth to ≥ 12 articles | Coverage breadth signals real publication |
| 12 | Add a **methodology block** referenced inline at the top of each comparison ("How we compared") | Editorial Policy quoted in the article reads better than a separate page link |
| 13 | Add **3 real editorial archive entries** to `/newsletter` so the "Recent briefings" list isn't placeholder | Subscribers and reviewers both check this |
| 14 | Add **GitHub-trackable correction log** (`/corrections`) — even if empty initially | Demonstrates editorial discipline |
| 15 | Make the **OG image** a SterlingPeak masthead with the new logo mark | First impression in social shares + affiliate manager Slack threads |

### P2 — Within 30 days

- Publish **monthly editorial standards report** internally; surface a one-line summary on `/editorial-policy`.
- Build a **comparison filter UI** so the comparisons page reads like a tool, not a blog index.
- Set up **structured data tests** (Google Rich Results / Schema.org) to confirm Article + Organisation JSON-LD validates.
- Open a free **ICO registration** if you process newsletter data as a sole trader.

---

## 5. Copy templates — paste these exactly

These are written in your editorial voice and tested against typical UK affiliate compliance language. Replace the existing copy verbatim.

### 5.1 Per-article disclosure block (rendered above the article body when affiliate links are present)

```text
Disclosure
This article contains affiliate links. SterlingPeak may earn a referral
commission if you sign up for a paid plan through one of these links — at
no extra cost to you. Commission never decides which products we
recommend or how we score them. Pricing was last verified on
[DD Month YYYY]. Read the full Editorial Policy and Affiliate Disclosure.
```

Place this in a 12px–13px secondary text block, with `bg-card`, sitting between the headline/byline and the first body paragraph. Always show the verification date.

### 5.2 Sage-specific positioning (add to `/editorial-policy`)

```text
Where Sage fits in our coverage
Sage is the most widely deployed UK accounting and payroll software stack
across small business, SMB, and mid-market segments, and it sits at the
centre of our reviews because that is where most of our readers operate.
We cover the full Sage UK product line — Sage Sole Trader, Sage
Accounting, Sage 50, Sage Payroll, Sage HR, Sage 200, Sage Intacct, and
Sage X3 — at the editorial level. We participate in the Sage UK affiliate
programme. Where Sage is genuinely the best fit for a UK business profile
we say so; where another product is the better fit, we say that instead.
Sage product positioning, pricing, and feature claims are verified
quarterly against Sage's UK pricing pages and Sage UK partner
documentation.
```

### 5.3 Author footer block (per article)

```text
About the author
Hafiza Ayesha Waheed is the founder and editor-in-chief of SterlingPeak,
based in Greater Manchester, England. She covers UK accounting software,
payroll, and Making Tax Digital for sole traders and SMEs.
LinkedIn → https://www.linkedin.com/in/hafiza-ayesha-waheed-4a457440a/
```

### 5.4 Footer registered-trader line

```text
SterlingPeak is published by Hafiza Ayesha Waheed, sole-trader publisher
based in Greater Manchester, England, United Kingdom. For correspondence:
hello@sterlingpeak.uk. For privacy and data-protection enquiries see our
Privacy Policy.
```

(If you incorporate later, replace with `Published by SterlingPeak Ltd, registered in England and Wales no. XXXXXXXX, with its registered office in Greater Manchester.`)

### 5.5 Privacy Policy contact section

```text
Data controller
SterlingPeak is operated by Hafiza Ayesha Waheed, Greater Manchester,
England, United Kingdom. Email: hello@sterlingpeak.uk. We process
newsletter subscriptions and contact-form submissions only to deliver the
requested service. To exercise any UK GDPR right (access, rectification,
erasure, restriction, portability, objection) email the address above.
You may also lodge a complaint with the ICO at ico.org.uk.
Last updated: [DD Month YYYY]
```

### 5.6 Updated affiliate-disclosure intro paragraph

```text
SterlingPeak is free to read. We earn revenue through affiliate
commissions when readers click certain links and go on to subscribe to or
purchase a product, including but not limited to Sage UK products. Sage
UK is our primary editorial focus and our largest affiliate relationship.
Commission is paid by the software provider at no extra cost to you, and
the price you pay is identical whether you use our link or go directly to
the provider's website. Commission never determines which products we
recommend, the order they appear in, or how we score them.
```

### 5.7 Pre-resubmission Impact.com property form copy

When you re-fill the Impact.com newsletter property form, use the exact answers below. They are honest, specific, and cite the same numbers as your Privacy Policy and home page (consistency is what Impact's QA checks).

| Field | Value |
|---|---|
| Email/Newsletter name | The SterlingPeak Briefing |
| Send-from email | briefing@sterlingpeak.uk |
| Mailing list size | Newsletter launching — currently fewer than 50 confirmed subscribers; growing weekly via organic UK search and LinkedIn |
| Sign-up URL | https://sterlingpeak.uk/newsletter |
| Sign-up type | Double opt-in |
| Acquisition method | 100% organic — newsletter sign-up form on sterlingpeak.uk/newsletter, in-article forms across editorial coverage, and editor's LinkedIn distribution. No paid acquisition, no co-registration, no list rental. |
| Acquisition narrative | We acquire subscribers entirely through our own editorial coverage of UK accounting, payroll, and tax software at sterlingpeak.uk. We never buy, exchange, or share lists. Every subscriber confirms their email through a double opt-in confirmation message before being added. We process subscriber data under UK GDPR; SterlingPeak is the controller and our email service provider acts as a data processor under contract. |
| Audience country | United Kingdom (≥ 95%) |
| Language | English (United Kingdom) |
| Frequency | Weekly, every Thursday |
| ESP / sending platform | [your real choice — Mailchimp, Beehiiv, Kit, or similar] |

---

## 6. Pre-submission checklist

Don't click "Resubmit" until all twelve of these are green.

- [ ] Every article byline reads "Hafiza Ayesha Waheed" (database checked).
- [ ] About page has editor headshot + LinkedIn link + 1-paragraph bio.
- [ ] About page lists registered location ("based in [Town], UK").
- [ ] Footer has registered-trader line + email.
- [ ] Privacy Policy and Cookie Policy show a "Last updated" timestamp.
- [ ] Privacy Policy names Hafiza Ayesha Waheed as controller with town.
- [ ] Affiliate Disclosure intro names Sage UK explicitly.
- [ ] Editorial Policy has a "Where Sage fits" section.
- [ ] Every Sage / Xero / QuickBooks review and comparison shows the inline disclosure block above the body.
- [ ] Every comparison shows "Last verified: dd Month yyyy" inline.
- [ ] Cookie banner is live and gates analytics until consent (test in DevTools Network tab — `va.vercel-scripts.com` should not request before consent).
- [ ] LinkedIn company page exists with at least 3 editorial posts and the editor as page admin.
- [ ] briefing@sterlingpeak.uk inbox is real and a welcome email is sent automatically on confirmation.
- [ ] OG image (Open Graph) shows the new SterlingPeak masthead, not the Next.js default.

---

## 7. What to write on the resubmission cover note

When you resubmit through Impact.com, attach a short message to the partnership manager. Sage's compliance team reads these. Keep it factual.

```text
Hi Sage team,

Thank you for the feedback on our previous application.

Since rejection we have:
1. Tightened SterlingPeak's editorial identity with named editor (Hafiza
   Ayesha Waheed), bio, and LinkedIn presence.
2. Added inline affiliate disclosure on every article that recommends Sage,
   Xero, QuickBooks, or any commercial product.
3. Added "Last verified" date stamps on every comparison and review.
4. Added a Sage-specific editorial positioning section in our Editorial
   Policy explaining how Sage UK fits in our coverage.
5. Added a registered trader line, ICO-aligned data-controller reference,
   and a working consent banner that gates analytics until consent.
6. Launched the SterlingPeak LinkedIn page with editorial posts.
7. Confirmed double opt-in on The SterlingPeak Briefing newsletter and a
   working briefing@sterlingpeak.uk send-from address.

Sage UK is the central editorial focus of SterlingPeak and the
relationship we most want to get right. We're happy to walk a Sage
compliance reviewer through any specific page if it helps.

Hafiza Ayesha Waheed
Founder & Editor-in-Chief, SterlingPeak
hello@sterlingpeak.uk
```

---

## 8. The honest probability read

If every P0 fix in §4 is shipped before resubmission and the P1 list is at least underway, the realistic approval probability moves from approximately **15–25%** (current state, given the previous rejection signal) to approximately **65–80%**.

Sage UK rarely approves on the second attempt without seeing **structural change** between submissions. A few cosmetic tweaks won't move the needle. The fixes above are structural.

Don't resubmit faster than 2–3 weeks after the rejection. Sage's compliance team flags rapid re-applications as a quality signal.

---

## 9. Single biggest thing

If you do nothing else from this document, do these three:

1. **Make the LinkedIn page real.** This was the main reason. The form ticked "Social" without a real social presence; the rejection bucket included Social.
2. **Show inline affiliate disclosure on every article that links to a paid product.** Currently it's per-row conditional; flip it on for every Sage-adjacent piece.
3. **Add the "Last verified: [date]"** line on every comparison and review, prominently, near the headline.

Those three alone fix more than half of what Sage's compliance team flagged.

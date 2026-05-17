# Newsletter setup — Kit (formerly ConvertKit)

SterlingPeak's newsletter sign-up form posts **directly** to Kit's
public per-form endpoint from the browser. No backend route, no API
key in env, no webhook. The pattern is the same one Kit's own embed
widget uses — we've just styled the form to match the rest of the
site.

## How it works

```
[NewsletterForm in browser]
       │
       │  POST https://app.kit.com/forms/9453668/subscriptions
       │  body: email_address, first_name, referrer
       ▼
[ Kit ]
       │  - records subscriber
       │  - sends double opt-in confirmation email
       │  - manages bounces / unsubscribes / GDPR
       ▼
[ Subscriber inbox ]
       click confirm → marked Active in Kit dashboard
```

The "successfully subscribed" panel on the website is rendered locally
by `NewsletterForm`. The actual confirmation email is sent by Kit
asynchronously after the POST returns.

## Where the form ID lives

Hard-coded in:

```
src/components/public/newsletter-form.tsx
  → const KIT_FORM_ACTION = "https://app.kit.com/forms/9453668/subscriptions"
```

It is a public identifier — exposed in any Kit embed snippet — so
keeping it in source is fine. To change the form, edit that constant.

## To swap to a different Kit form

1. In Kit dashboard → **Grow → Forms** → open or create the form.
2. Make sure the form has **double opt-in** enabled:
   Settings → **Incentive** → **"Auto-confirm new subscribers"** must
   be **OFF**. (Off = double opt-in is on.)
3. **Save & Publish** the form.
4. Click **Embed** → **HTML**. Find the `action="..."` URL, e.g.
   `https://app.kit.com/forms/<NEW_ID>/subscriptions`.
5. Paste that URL into `KIT_FORM_ACTION` in `newsletter-form.tsx`.

## Where subscribers show up

Kit dashboard → **Grow → Subscribers**. Each row shows the email,
status (`Pending` until confirmed, `Confirmed` after), source/referrer,
and date. Use Kit's filters and exports for affiliate-program audits
or analytics.

## What's NOT in this setup

- No `KIT_API_KEY` env var (not needed for direct form post).
- No webhook endpoint. If you ever want a Supabase audit log, register
  a Kit webhook against a future API route — the table
  `public.newsletter_subscribers` already exists for that purpose.
- No `/newsletter` page. The form lives at `/#newsletter` on the
  homepage, plus the footer + selected article and category pages.

## Sending a test issue

In Kit: **Send → Broadcasts → New Broadcast**. Compose, preview, send
to yourself first. Once you're happy, schedule for Thursday 07:00 UK.

## Design + content rules

The confirmation email template lives in Kit (Settings → Incentive →
**Edit Email Contents**). Suggested copy:

```
Subject: Confirm your SterlingPeak Briefing subscription

Hi there,

Thanks for subscribing to The SterlingPeak Briefing — UK accounting,
payroll, and tax software analysis, every Thursday.

Click the button below to confirm your subscription. Without this
step, we won't add you to the list.

[Confirm subscription]

— Hafiza Ayesha Waheed
Founder & Editor-in-Chief, SterlingPeak
hello@sterlingpeak.uk
```

After-confirm redirect URL (also in Settings → Incentive):

```
https://sterlingpeak.uk/#newsletter
```

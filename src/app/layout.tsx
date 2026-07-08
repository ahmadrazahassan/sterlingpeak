import type { Metadata } from "next";
import { DM_Sans, Inter, Caveat } from "next/font/google";
import { ConsentAnalytics } from "@/components/public/consent-analytics";
import { CookieConsent } from "@/components/public/cookie-consent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading-family",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
  weight: ["500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sterlingpeak.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SterlingPeak | UK SME finance & business software intelligence",
    template: "%s | SterlingPeak",
  },
  description:
    "Independent UK business software insights for growing SMEs: accounting, payroll, tax, comparisons and operations.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SterlingPeak",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  other: {
    "impact-site-verification": "39a4f840-3d9b-4ca2-878f-56906886667a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
        <ConsentAnalytics />
      </body>
    </html>
  );
}

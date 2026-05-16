import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { siteMeta } from "@/lib/site-meta";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: [...siteMeta.keywords],
  applicationName: siteMeta.name,
  alternates: {
    canonical: siteMeta.url,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteMeta.url,
    siteName: siteMeta.name,
    title: siteMeta.og.title,
    description: siteMeta.og.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.og.title,
    description: siteMeta.og.description,
  },
};

export const viewport: Viewport = {
  themeColor: siteMeta.themeColor,
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteMeta.name,
  description: siteMeta.description,
  url: siteMeta.url,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "macOS 14 Sonoma and later",
  processorRequirements: "Apple Silicon or Intel",
  offers: {
    "@type": "Offer",
    price: siteMeta.price.launch,
    priceCurrency: siteMeta.price.currency,
    description: "Launch price — one-time purchase, lifetime updates.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

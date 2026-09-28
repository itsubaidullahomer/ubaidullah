import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CommandPaletteProvider } from "@/components/layout/CommandPaletteProvider";
import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";

import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Variable serif with optical size, softness and "wonk" axes. The display
// utilities in globals.css drive those axes.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="relative">
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />

        <SmoothScroll>
          <CommandPaletteProvider>
            <Header />
            <main id="main" className="relative z-10">
              {children}
            </main>
            <Footer />
          </CommandPaletteProvider>
        </SmoothScroll>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

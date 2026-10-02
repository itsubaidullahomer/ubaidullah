import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { CommandPaletteProvider } from "@/components/layout/CommandPaletteProvider";
import { buildMetadata } from "@/lib/seo";

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

// Site-wide defaults. Every page sets its own canonical through buildMetadata,
// so pages without one (the 404) don't inherit the home page's.
const { alternates: _homeCanonical, ...defaults } = buildMetadata();
export const metadata: Metadata = defaults;

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <head>
        {/* Marks the document as JS-driven before paint, so scroll reveals can
            start hidden. Without JS (or with reduced motion) nothing is hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    document.documentElement.classList.add('js-motion');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="relative">
        <CommandPaletteProvider>
          <MotionRoot />
          <Header />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
        </CommandPaletteProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

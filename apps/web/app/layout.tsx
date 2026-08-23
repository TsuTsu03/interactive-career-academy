import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

/**
 * DESIGN.md specifies Clash Display + Satoshi + JetBrains Mono.
 * Clash Display and Satoshi are Fontshare, not Google Fonts, so they cannot be
 * self-hosted through next/font without shipping the files. Space Grotesk and
 * Geist carry the same intent: a chunky geometric display face and a neutral
 * non-Inter sans. Swap in the licensed files when they are available.
 */
const display = Space_Grotesk({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const sans = Geist({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Make a webpage — Academy",
  description:
    "Write real code and see it work. Free, step by step, for people who have never coded.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

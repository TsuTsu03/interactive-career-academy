import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DonationModal } from "@/components/donation-modal";
import { FeedbackModal } from "@/components/feedback-modal";
import { OfflineShell } from "@/components/offline-shell";
import { siteUrl } from "@/lib/site";
import { existsSync } from "node:fs";
import { join } from "node:path";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Learn front-end development by building real, Philippines-first projects in your browser, one clear step at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "CodeDaddy | Learn web development by building for real life",
    template: "%s | CodeDaddy",
  },
  description: DESCRIPTION,
  applicationName: "CodeDaddy",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  authors: [{ name: "CodeDaddy" }],
  creator: "CodeDaddy",
  publisher: "CodeDaddy",
  category: "education",
  keywords: [
    "learn web development",
    "learn HTML",
    "learn CSS",
    "learn JavaScript",
    "learn React",
    "learn TypeScript",
    "free coding course Philippines",
    "browser code editor",
    "front-end development for beginners",
  ],
  // Full snippets and a large image preview. Truncated snippets are what stop
  // a page being quoted, whether the quote lands in a search result or in an
  // AI answer built from the same crawl.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "CodeDaddy",
    locale: "en_PH",
    url: "/",
    title: "CodeDaddy | Learn web development by building for real life",
    description: DESCRIPTION,
  },
  // Title and description are filled per page from the same metadata the
  // Open Graph card uses, so the two never disagree.
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#121318" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gcashQrAvailable = existsSync(join(process.cwd(), "public", "gcash-qr.png"));

  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('codedaddy.theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <OfflineShell enabled={process.env.NODE_ENV === "production"} />
        <DonationModal gcashQrAvailable={gcashQrAvailable} />
        <FeedbackModal />
      </body>
    </html>
  );
}

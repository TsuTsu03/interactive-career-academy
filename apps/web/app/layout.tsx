import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DonationModal } from "@/components/donation-modal";
import { OfflineShell } from "@/components/offline-shell";
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

export const metadata: Metadata = {
  title: {
    default: "CodeDaddy | Learn web development by building for real life",
    template: "%s | CodeDaddy",
  },
  description:
    "Learn front-end development by building real, Philippines-first projects in your browser, one clear step at a time.",
  icons: {
    icon: "/icon.svg",
  },
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
      </body>
    </html>
  );
}

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const REPO = "https://github.com/TsuTsu03/interactive-career-academy";

/**
 * The Stitch footer: wordmark, copyright, and a short link row. Shared by every
 * screen so the frame around the workspace never changes shape.
 */
export function SiteFooter({ home = "/" }: { home?: string }) {
  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-margin-mobile py-gutter md:flex-row md:px-margin-desktop">
        <BrandLogo href={home} compact />
        <p className="text-label-caps uppercase text-on-surface-variant">
          © 2026 CodeDaddy Philippines
        </p>
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-4">
          <a
            href={REPO}
            className="text-label-caps uppercase text-on-surface-variant transition-colors hover:text-primary hover:underline"
          >
            Open Source
          </a>
          <Link
            href="/#how-it-works"
            className="text-label-caps uppercase text-on-surface-variant transition-colors hover:text-primary hover:underline"
          >
            About
          </Link>
          <a
            href={`${REPO}/discussions`}
            className="text-label-caps uppercase text-on-surface-variant transition-colors hover:text-primary hover:underline"
          >
            Community
          </a>
          <a
            href={REPO}
            className="text-label-caps uppercase text-on-surface-variant transition-colors hover:text-primary hover:underline"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}

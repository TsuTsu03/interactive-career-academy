"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { copy, type Copy } from "@/lib/lesson-ir";

const NAV_ITEMS: { href: string; label: Copy; id: string }[] = [
  { href: "/curriculum", id: "courses", label: "Curriculum" },
  { href: "/projects", id: "projects", label: "Portfolio" },
  { href: "/practice", id: "practice", label: "Practice" },
  { href: "/tools", id: "tools", label: "Tools" },
  { href: "/account", id: "account", label: "Learner Profile" },
];

const PRIMARY_LABEL: Copy = "Primary";

/**
 * The Stitch top navigation bar: wordmark, centred section links, and the
 * Start Coding / Resume pair. Below `md` the links collapse behind the menu
 * button, exactly as the adaptive Stitch screen specifies.
 */
export function ProductNav({
  current,
  resumeHref = "/dashboard",
}: {
  current: string;
  resumeHref?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    active: current === item.id || (current === "dashboard" && item.id === "courses") || (current === "evidence" && item.id === "projects"),
  }));

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface">
      <div className="flex h-touch-target w-full items-center justify-between gap-gutter px-margin-mobile md:px-margin-desktop">
        <BrandLogo href="/dashboard" compact />

        <nav aria-label={copy(PRIMARY_LABEL)} className="hidden h-full items-center gap-2 md:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex h-full items-center px-4 text-body-md transition-colors ${
                item.active
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {copy(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Link
            href="/curriculum"
            className="hidden h-touch-target items-center justify-center rounded border border-outline px-6 text-label-caps uppercase text-on-surface transition-colors hover:bg-surface-variant md:flex"
          >
            Start Coding
          </Link>
          <Link
            href={resumeHref}
            className="flex h-touch-target items-center justify-center rounded bg-primary px-4 text-label-caps uppercase text-on-primary transition-colors hover:bg-surface-tint sm:px-6"
          >
            Resume
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-touch-target w-touch-target items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-surface-variant md:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Learner navigation"
          className="flex flex-col border-t border-outline-variant bg-surface-container-lowest md:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`flex min-h-touch-target items-center px-margin-mobile text-body-md ${
                item.active
                  ? "bg-primary-fixed/40 font-bold text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              {copy(item.label)}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";

const THEME_KEY = "codedaddy.theme";

type Theme = "light" | "dark";

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Switches between Manila Modernist and Manila Modernist Night.
 *
 * The theme is read after mount so the server and client agree on markup; the
 * inline script in the document head applies the saved choice before paint, so
 * the learner never sees the wrong palette flash.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = savedTheme();
    if (stored) document.documentElement.dataset.theme = stored;
    // Reading the browser theme has to wait for mount, so this first paint is
    // the neutral icon rather than a guess that could contradict the document.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(stored ?? systemTheme());
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      aria-pressed={theme === "dark"}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        setTheme(next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          // The theme still changes for this page if storage is unavailable.
        }
      }}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary ${className}`}
    >
      <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} size={20} />
    </button>
  );
}

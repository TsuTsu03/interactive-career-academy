"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Fades each screen in on a route change. The pathname key remounts the
 * subtree so the animation replays; nothing else about the tree changes.
 *
 * The fade is opacity only. Under `prefers-reduced-motion` the global rule in
 * `globals.css` collapses it to nothing, and no information lives in the
 * animation, so a learner who never sees it loses nothing.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

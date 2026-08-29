import type { ReactNode } from "react";

/**
 * The App Router builds a fresh instance of a template on every navigation,
 * which is what makes the enter animation replay. A key on the layout's
 * children does the same remount but breaks the router's Suspense boundaries:
 * the `loading.tsx` fallback stayed mounted next to the finished page.
 *
 * The fade is opacity only. A transform here would become the containing block
 * for the sticky product nav and every fixed layer while it ran.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

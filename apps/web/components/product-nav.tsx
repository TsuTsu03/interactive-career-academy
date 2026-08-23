import Link from "next/link";
import { copy, type Copy, type Register } from "@/lib/lesson-ir";

const NAV_ITEMS: { href: string; label: Copy; id: string }[] = [
  { href: "/", id: "courses", label: { simple: "Courses", standard: "Courses" } },
  { href: "/projects", id: "projects", label: { simple: "Projects", standard: "Projects" } },
  {
    href: "/certificate",
    id: "certificate",
    label: { simple: "Certificate", standard: "Certificate" },
  },
  { href: "/account", id: "account", label: { simple: "Account", standard: "Account" } },
];

const PRIMARY_LABEL: Copy = { simple: "Primary", standard: "Primary" };

export function ProductNav({ current, register }: { current: string; register: Register }) {
  return (
    <nav aria-label={copy(PRIMARY_LABEL, register)} className="mb-8 border-b border-hairline">
      <div className="grid grid-cols-4 gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={current === item.id ? "page" : undefined}
            className={`flex min-h-11 items-center justify-center border-b-2 px-1 font-mono text-[11px] transition-colors sm:px-3 sm:text-[12px] ${
              current === item.id
                ? "border-voltage text-chalk"
                : "border-transparent text-ash hover:text-chalk"
            }`}
          >
            {copy(item.label, register)}
          </Link>
        ))}
      </div>
    </nav>
  );
}

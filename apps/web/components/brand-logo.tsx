import Link from "next/link";

function BrandSymbol({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M22 19h-3.5c-4 0-5.5 2.4-5.5 6v4c0 3.2-1.4 4.7-4.5 5 3.1.3 4.5 1.8 4.5 5v4c0 3.6 1.5 6 5.5 6H22"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="square"
      />
      <path
        d="M49 38.5a14 14 0 1 1-1.8-12.8"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path d="M35 13V4M47 16l5-8M55 23l8-5M23 16l-5-8" stroke="var(--color-secondary)" strokeWidth="4" />
      <path d="M26 17.5a19 19 0 0 1 26 0" stroke="var(--color-secondary)" strokeWidth="4" />
    </svg>
  );
}

export function BrandLogo({
  href,
  compact = false,
  className = "",
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  const content = (
    <span className={`inline-flex items-center gap-2 text-primary ${className}`}>
      <BrandSymbol className={compact ? "h-7 w-7" : "h-9 w-9"} />
      <span className={`font-display font-bold tracking-tight ${compact ? "text-[20px]" : "text-headline-md"}`}>
        Code<span className="text-secondary">Daddy</span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="CodeDaddy home"
      className="inline-flex min-h-11 items-center rounded-sm focus-visible:outline"
    >
      {content}
    </Link>
  );
}

const FALLBACK_ORIGIN = "http://localhost:3000";

/**
 * The public origin this deployment answers on. Metadata, the sitemap, the web
 * manifest, and the structured data all need an absolute URL, and `SITE_URL` is
 * the same variable the auth redirects already read, so one setting moves every
 * one of them. An unset or unusable value falls back to local development
 * rather than emitting a wrong canonical.
 */
export function siteUrl(): string {
  const raw = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return FALLBACK_ORIGIN;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.hostname !== "localhost") return FALLBACK_ORIGIN;
    return url.origin;
  } catch {
    return FALLBACK_ORIGIN;
  }
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl()}/`).toString();
}

/**
 * Page-level Open Graph. Next replaces the parent `openGraph` object outright
 * rather than merging it, so every page that sets its own share card has to
 * restate the site identity or lose `og:type`, `og:site_name`, and `og:locale`.
 * This keeps that restatement in one place.
 */
export function pageOpenGraph(page: { url: string; title: string; description: string }) {
  return {
    type: "website" as const,
    siteName: "CodeDaddy",
    locale: "en_PH",
    url: page.url,
    title: page.title,
    description: page.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CodeDaddy — learn web development by building Philippines-first projects in your browser",
      },
    ],
  };
}

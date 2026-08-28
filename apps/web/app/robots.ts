import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

/**
 * Public teaching surfaces are crawlable. Every route that only renders one
 * learner's own browser state — progress, evidence, drafts, tools — is private
 * by definition and stays out of the index, as does the authoring harness.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account",
          "/api/",
          "/auth/",
          "/certificate",
          "/dashboard",
          "/evidence",
          "/harness",
          "/offline",
          "/projects",
          "/proof",
          "/review",
          "/runtime",
          "/tools",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl(),
  };
}

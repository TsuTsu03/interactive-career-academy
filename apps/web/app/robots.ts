import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

/**
 * Public teaching surfaces are crawlable. Every route that only renders one
 * learner's own browser state — progress, evidence, drafts, tools — is private
 * by definition and stays out of the index, as does the authoring harness.
 */
const DISALLOW = [
  "/account",
  "/api/",
  "/auth/",
  "/capstones/*/submit",
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
];

/**
 * The crawlers behind AI answers and AI search. They inherit the `*` rule
 * anyway, so naming them changes no access; it states the intent in a file
 * their operators publish tooling to read, and stops a future edit from
 * restricting them by accident.
 */
const ANSWER_ENGINE_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: ANSWER_ENGINE_AGENTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl(),
  };
}

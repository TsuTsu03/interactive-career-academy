import type { MetadataRoute } from "next";

/**
 * The offline shell already caches a whole course through `public/sw.js`. The
 * manifest is what lets a learner keep it: on a shared or low-storage phone,
 * an installed icon survives a browser that clears tabs, and `standalone`
 * removes the address bar the small-screen workspace has no room for.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeDaddy — Learn web development by building for real life",
    short_name: "CodeDaddy",
    description:
      "Learn front-end development by building real, Philippines-first projects in your browser, one clear step at a time.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f7fafc",
    theme_color: "#002576",
    lang: "en",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}

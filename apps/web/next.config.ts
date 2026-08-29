import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // The React runtime is a build artifact with no hash in its name, so it
        // cannot be immutable, but it also changes only when the app is rebuilt.
        // A day of cache with a week of stale-while-revalidate keeps repeat
        // visits off the network without pinning a stale runtime after a deploy.
        source: "/react-runtime.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:file(offline.html|icon.svg|favicon.ico|gcash-qr.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;

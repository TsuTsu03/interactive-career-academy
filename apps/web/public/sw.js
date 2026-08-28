const CACHE_PREFIX = "codedaddy-offline";
const CACHE_NAME = `${CACHE_PREFIX}-v1`;
const OFFLINE_URL = "/offline.html";

function normalizedPageUrl(value) {
  const url = new URL(value, self.location.origin);
  return `${url.origin}${url.pathname}`;
}

function canCache(url) {
  return (
    url.origin === self.location.origin &&
    !url.pathname.startsWith("/harness") &&
    !url.pathname.startsWith("/api/") &&
    !url.pathname.startsWith("/_next/webpack-hmr")
  );
}

async function put(cache, request, response) {
  if (response.ok && response.type !== "opaque") {
    await cache.put(request, response);
  }
}

function linkedAssets(html, baseUrl) {
  const urls = new Set();
  const pattern = /(?:src|href)=["']([^"']+)["']/g;
  for (const match of html.matchAll(pattern)) {
    try {
      const url = new URL(match[1], baseUrl);
      if (
        canCache(url) &&
        (url.pathname.startsWith("/_next/static/") ||
          url.pathname.startsWith("/_next/image") ||
          url.pathname === "/icon.svg" ||
          url.pathname === "/favicon.ico")
      ) {
        urls.add(url.href);
      }
    } catch {
      // Ignore malformed authored URLs. They are not part of the app shell.
    }
  }
  return [...urls];
}

async function cacheUrls(values) {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(
    values.map(async (value) => {
      const url = new URL(value, self.location.origin);
      if (!canCache(url)) return;
      const response = await fetch(url.href, { cache: "no-cache" });
      await put(cache, url.href, response);
    }),
  );
}

async function cachePage(value) {
  const url = new URL(value, self.location.origin);
  if (!canCache(url)) return;

  const response = await fetch(url.href, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not save ${url.pathname}`);

  const html = await response.clone().text();
  const cache = await caches.open(CACHE_NAME);
  await put(cache, normalizedPageUrl(url.href), response);
  await cacheUrls(linkedAssets(html, url.href));
}

async function savedCourseIds() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  const ids = new Set();
  for (const request of keys) {
    const match = new URL(request.url).pathname.match(/^\/learn\/([^/]+)$/);
    if (match) ids.add(decodeURIComponent(match[1]));
  }
  return [...ids];
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    cachePage(OFFLINE_URL).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((names) =>
          Promise.all(
            names
              .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
              .map((name) => caches.delete(name)),
          ),
        ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("message", (event) => {
  const reply = (payload) => event.ports[0]?.postMessage(payload);
  const data = event.data ?? {};

  if (data.type === "CACHE_PAGE") {
    event.waitUntil(
      Promise.all([
        cachePage(data.url),
        cacheUrls(Array.isArray(data.resources) ? data.resources : []),
      ])
        .then(savedCourseIds)
        .then((courses) => reply({ ok: true, courses }))
        .catch(() => reply({ ok: false, courses: [] })),
    );
  }

  if (data.type === "LIST_COURSES") {
    event.waitUntil(
      savedCourseIds()
        .then((courses) => reply({ ok: true, courses }))
        .catch(() => reply({ ok: false, courses: [] })),
    );
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!canCache(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response.ok) {
            event.waitUntil(
              caches
                .open(CACHE_NAME)
                .then((cache) => put(cache, normalizedPageUrl(url.href), response.clone())),
            );
          }
          return response;
        } catch {
          const cache = await caches.open(CACHE_NAME);
          return (
            (await cache.match(normalizedPageUrl(url.href))) ??
            (await cache.match(OFFLINE_URL)) ??
            new Response("You are offline, and this page was not saved.", {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
          );
        }
      })(),
    );
    return;
  }

  const cacheFirst =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname === "/react-runtime.js" ||
    url.pathname === "/icon.svg" ||
    url.pathname === "/favicon.ico";

  if (cacheFirst) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const saved = await cache.match(request);
        if (saved) return saved;
        const response = await fetch(request);
        event.waitUntil(put(cache, request, response.clone()));
        return response;
      })(),
    );
  }
});

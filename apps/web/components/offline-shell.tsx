"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type WorkerReply = { ok: boolean; courses: string[] };

function askWorker(worker: ServiceWorker, message: unknown): Promise<WorkerReply> {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    const timeout = window.setTimeout(
      () => resolve({ ok: false, courses: [] }),
      10_000,
    );
    channel.port1.onmessage = (event: MessageEvent<WorkerReply>) => {
      window.clearTimeout(timeout);
      resolve(event.data);
    };
    worker.postMessage(message, [channel.port2]);
  });
}

function loadedResources(): string[] {
  return performance
    .getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((value) => {
      const url = new URL(value);
      return (
        url.origin === window.location.origin &&
        (url.pathname.startsWith("/_next/static/") ||
          url.pathname === "/react-runtime.js" ||
          url.pathname === "/icon.svg" ||
          url.pathname === "/favicon.ico")
      );
    });
}

async function connectionAvailable(): Promise<boolean> {
  if (!navigator.onLine) return false;
  try {
    const response = await fetch(`/sw.js?connection-check=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function OfflineShell({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const [online, setOnline] = useState(true);
  const [workerReady, setWorkerReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const courseId = pathname.match(/^\/learn\/([^/]+)$/)?.[1] ?? null;

  useEffect(() => {
    let cancelled = false;
    const sync = () => {
      void connectionAvailable().then((available) => {
        if (!cancelled) setOnline(available);
      });
    };
    sync();
    const interval = window.setInterval(sync, 30_000);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled || pathname.startsWith("/harness")) {
      return;
    }
    if (!("serviceWorker" in navigator)) {
      queueMicrotask(() => setUnavailable(true));
      return;
    }

    let cancelled = false;
    void navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(() => navigator.serviceWorker.ready)
      .then(async (registration) => {
        const worker = registration.active;
        if (!worker || cancelled) return;
        setWorkerReady(true);
        setSaving(Boolean(courseId));
        const reply = await askWorker(worker, {
          type: "CACHE_PAGE",
          url: window.location.href,
          resources: loadedResources(),
        });
        if (cancelled) return;
        setSavedCourses(reply.courses);
        setSaving(false);
      })
      .catch(() => {
        if (!cancelled) {
          setSaving(false);
          setUnavailable(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [courseId, enabled, pathname]);

  useEffect(() => {
    if (online) return;
    const useSavedNavigation = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.origin !== window.location.origin) return;
      event.preventDefault();
      window.location.assign(anchor.href);
    };
    document.addEventListener("click", useSavedNavigation);
    return () => document.removeEventListener("click", useSavedNavigation);
  }, [online]);

  const label = useMemo(() => {
    if (!online) return "Offline. Saved course available.";
    if (!enabled || unavailable) return "Online. Offline saving is unavailable.";
    if (saving) return "Online. Saving course.";
    if (courseId && savedCourses.includes(courseId)) return "Online. Saved offline.";
    if (workerReady) return "Online. Open a course to save it.";
    return "Online. Preparing offline access.";
  }, [courseId, enabled, online, savedCourses, saving, unavailable, workerReady]);

  if (pathname.startsWith("/harness")) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-offline-status={online ? "online" : "offline"}
      className={`pointer-events-none fixed z-40 flex items-center gap-2 border font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm ${courseId ? "inset-x-0 bottom-24 h-7 justify-center rounded-none border-x-0 px-3 py-1 md:bottom-12" : "bottom-3 left-3 max-w-[calc(100vw-1.5rem)] rounded-full px-3 py-2"} ${
        online
          ? "border-acid/35 bg-panel text-acid"
          : "border-gold/45 bg-panel text-gold"
      }`}
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        {online ? "●" : "○"}
      </span>
      <span>{label}</span>
    </div>
  );
}

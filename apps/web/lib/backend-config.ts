export interface BackendConfig {
  url: string;
  publishableKey: string;
  secretKey: string | null;
  siteUrl: string;
}

function cleanUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.hostname !== "localhost") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function backendConfig(): BackendConfig | null {
  const url = cleanUrl(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = (process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)?.trim();
  const siteUrl = cleanUrl(process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000";
  if (!url || !publishableKey) return null;
  return {
    url,
    publishableKey,
    secretKey: process.env.SUPABASE_SECRET_KEY?.trim() || null,
    siteUrl,
  };
}

export function backendAvailability() {
  const config = backendConfig();
  return { configured: Boolean(config), certificateIssuance: Boolean(config?.secretKey) };
}

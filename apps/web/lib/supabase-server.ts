import { cookies } from "next/headers";
import { backendConfig } from "@/lib/backend-config";

export const ACCESS_COOKIE = "codedaddy-access-token";
export const REFRESH_COOKIE = "codedaddy-refresh-token";
export const PKCE_COOKIE = "codedaddy-pkce-verifier";

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: AuthUser;
}

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

function headers(key: string, token?: string) {
  return {
    apikey: key,
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function authRequest(path: string, init: RequestInit = {}) {
  const config = backendConfig();
  if (!config) return null;
  return fetch(`${config.url}/auth/v1${path}`, {
    ...init,
    headers: { ...headers(config.publishableKey), ...init.headers },
    cache: "no-store",
  });
}

export async function restRequest(path: string, init: RequestInit = {}, token?: string, secret = false) {
  const config = backendConfig();
  if (!config || (secret && !config.secretKey)) return null;
  const key = secret ? config.secretKey! : config.publishableKey;
  return fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(key, token), ...init.headers },
    cache: "no-store",
  });
}

export async function saveSession(session: TokenResponse) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, session.access_token, cookieOptions(Math.max(60, session.expires_in)));
  store.set(REFRESH_COOKIE, session.refresh_token, cookieOptions(60 * 60 * 24 * 30));
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
  store.delete(PKCE_COOKIE);
}

async function userForToken(token: string): Promise<AuthUser | null> {
  const response = await authRequest("/user", { headers: { Authorization: `Bearer ${token}` } });
  if (!response?.ok) return null;
  return response.json() as Promise<AuthUser>;
}

export async function authenticatedUser(): Promise<{ user: AuthUser; accessToken: string } | null> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;
  if (accessToken) {
    const user = await userForToken(accessToken);
    if (user) return { user, accessToken };
  }

  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return null;
  const refreshed = await authRequest("/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!refreshed?.ok) {
    await clearSession();
    return null;
  }
  const session = await refreshed.json() as TokenResponse;
  if (!session.access_token || !session.refresh_token || !session.user?.id) return null;
  await saveSession(session);
  return { user: session.user, accessToken: session.access_token };
}

export function noStoreHeaders() {
  return { "Cache-Control": "private, no-store", Pragma: "no-cache", Expires: "0" };
}

import { siteUrl } from "@/lib/site";

export interface OAuthClient {
  clientId: string;
  clientSecret: string;
}

export interface BackendConfig {
  mongoUri: string;
  databaseName: string;
  siteUrl: string;
  github: OAuthClient | null;
  google: OAuthClient | null;
  email: { apiKey: string; from: string } | null;
}

function oauthClient(id: string | undefined, secret: string | undefined): OAuthClient | null {
  const clientId = id?.trim();
  const clientSecret = secret?.trim();
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

/**
 * Reads the server-only backend settings.
 *
 * Nothing here has a NEXT_PUBLIC_ prefix: the connection string and the OAuth
 * client secrets must never reach the browser. A missing MONGODB_URI returns
 * null, which every route turns into an honest "not configured" answer rather
 * than a crash. A missing provider only switches that one sign-in method off.
 */
export function backendConfig(): BackendConfig | null {
  const mongoUri = process.env.MONGODB_URI?.trim();
  if (!mongoUri || !/^mongodb(\+srv)?:\/\//.test(mongoUri)) return null;
  const resendKey = process.env.RESEND_API_KEY?.trim();
  return {
    mongoUri,
    databaseName: process.env.MONGODB_DB?.trim() || "codedaddy",
    siteUrl: siteUrl(),
    github: oauthClient(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET),
    google: oauthClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET),
    email: resendKey
      ? { apiKey: resendKey, from: process.env.AUTH_EMAIL_FROM?.trim() || "CodeDaddy <onboarding@resend.dev>" }
      : null,
  };
}

export function backendAvailability() {
  const config = backendConfig();
  return { configured: Boolean(config), certificateIssuance: Boolean(config) };
}

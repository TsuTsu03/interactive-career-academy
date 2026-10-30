import { promises as dnsPromises, setServers } from "node:dns";
import { MongoClient, MongoServerError, type Db, type Document } from "mongodb";
import { backendConfig } from "@/lib/backend-config";

// Optional, for machines whose local resolver refuses the SRV lookup a
// mongodb+srv:// address needs (Node reports querySrv ECONNREFUSED). Leave it
// unset on a host whose DNS already works. The driver resolves through
// dns.promises, which keeps its own server list, so both are set.
const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",").map((value) => value.trim()).filter(Boolean);
if (dnsServers?.length) {
  setServers(dnsServers);
  dnsPromises.setServers(dnsServers);
}

/**
 * One MongoDB connection pool per server process.
 *
 * Route handlers run many times in one process, and on a serverless host a warm
 * instance is reused across requests, so the client is cached on globalThis.
 * A failed connect clears the cache so the next request tries again instead of
 * reusing a rejected promise forever.
 *
 * Field names stay snake_case, matching the old Postgres columns, so the JSON
 * the browser receives did not change shape when the store did.
 */
const cache = globalThis as unknown as {
  codedaddyMongo?: { uri: string; client: Promise<MongoClient>; indexes?: Promise<void> };
};

export interface UserDoc {
  _id: string;
  email: string | null;
  name: string | null;
  identities: { provider: "github" | "google" | "email"; provider_id: string; email: string | null }[];
  created_at: Date;
  updated_at: Date;
  last_sign_in_at: Date | null;
}

export interface SessionDoc { _id: string; user_id: string; created_at: Date; expires_at: Date }
export interface EmailLinkDoc { _id: string; email: string; verifier_hash: string; expires_at: Date }
export interface ThrottleDoc { _id: string; hits: number; window_started_at: Date }
export interface ProfileDoc { user_id: string; display_name: string; created_at: Date; updated_at: Date }
export interface CourseProgressDoc { user_id: string; course_id: string; session: Record<string, unknown>; created_at: Date; updated_at: Date }
export interface PracticeProgressDoc { user_id: string; state: Record<string, unknown>; created_at: Date; updated_at: Date }
export interface SubmissionDoc {
  user_id: string;
  project_id: string;
  repository_url: string;
  live_url: string;
  verification_status: "recorded" | "verified" | "rejected";
  created_at: Date;
  updated_at: Date;
}
export interface CertificateDoc {
  user_id: string;
  code: string;
  display_name: string;
  credential_name: string;
  portfolio_url: string;
  repository_url: string;
  evidence: Record<string, unknown>;
  issued_at: Date;
}
export interface FeedbackDoc {
  _id: string;
  created_at: Date;
  mood: string;
  message: string | null;
  page: string | null;
  contact: string | null;
  user_id: string | null;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } }),
    db.collection("users").createIndex({ "identities.provider": 1, "identities.provider_id": 1 }, { unique: true, sparse: true }),
    // TTL indexes: MongoDB deletes expired sign-in links and sessions itself.
    db.collection("sessions").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 }),
    db.collection("sessions").createIndex({ user_id: 1 }),
    db.collection("email_links").createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 }),
    // Old throttle rows are worthless once their one-hour window has passed.
    db.collection("auth_throttle").createIndex({ window_started_at: 1 }, { expireAfterSeconds: 7200 }),
    db.collection("profiles").createIndex({ user_id: 1 }, { unique: true }),
    db.collection("course_progress").createIndex({ user_id: 1, course_id: 1 }, { unique: true }),
    db.collection("practice_progress").createIndex({ user_id: 1 }, { unique: true }),
    db.collection("project_submissions").createIndex({ user_id: 1, project_id: 1 }, { unique: true }),
    db.collection("certificates").createIndex({ user_id: 1 }, { unique: true }),
    db.collection("certificates").createIndex({ code: 1 }, { unique: true }),
    db.collection("feedback").createIndex({ created_at: -1 }),
  ]);
}

/** The app database, or null when MONGODB_URI is not set. Throws when the server is unreachable. */
export async function database(): Promise<Db | null> {
  const config = backendConfig();
  if (!config) return null;
  if (!cache.codedaddyMongo || cache.codedaddyMongo.uri !== config.mongoUri) {
    const client = new MongoClient(config.mongoUri, {
      appName: "codedaddy",
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
    }).connect();
    cache.codedaddyMongo = { uri: config.mongoUri, client };
    client.catch(() => {
      if (cache.codedaddyMongo?.client === client) cache.codedaddyMongo = undefined;
    });
  }
  const entry = cache.codedaddyMongo;
  const db = (await entry.client).db(config.databaseName);
  entry.indexes ??= ensureIndexes(db).catch((error) => {
    entry.indexes = undefined;
    throw error;
  });
  await entry.indexes;
  return db;
}

export function isDuplicateKey(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === 11000;
}

/**
 * Records one hit against a fixed one-window bucket and reports whether it is
 * still under the cap.
 *
 * One atomic pipeline update: a bucket whose window has passed starts again at
 * one hit, otherwise its count goes up by one. Two first requests racing to
 * create the same bucket can collide on the key, so that case retries once.
 */
export async function claimThrottle(db: Db, bucket: string, cap: number, windowSeconds = 3600): Promise<boolean> {
  const expired: Document = {
    $or: [
      { $not: ["$window_started_at"] },
      { $lt: ["$window_started_at", { $subtract: ["$$NOW", windowSeconds * 1000] }] },
    ],
  };
  const update = [{
    $set: {
      hits: { $cond: [expired, 1, { $add: ["$hits", 1] }] },
      window_started_at: { $cond: [expired, "$$NOW", "$window_started_at"] },
    },
  }];
  const throttle = db.collection<ThrottleDoc>("auth_throttle");
  for (let attempt = 0; ; attempt += 1) {
    try {
      const row = await throttle.findOneAndUpdate({ _id: bucket }, update, { upsert: true, returnDocument: "after" });
      return (row?.hits ?? 1) <= cap;
    } catch (error) {
      if (attempt === 0 && isDuplicateKey(error)) continue;
      throw error;
    }
  }
}

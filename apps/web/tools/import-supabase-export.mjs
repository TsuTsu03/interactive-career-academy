/**
 * One-time import of the Supabase export into MongoDB.
 *
 * Usage (from apps/web, with MONGODB_URI in the environment):
 *   node --env-file=.env.local tools/import-supabase-export.mjs <export.json>
 *
 * The export is one JSON object with the arrays users, identities, profiles,
 * course_progress, practice_progress, project_submissions, certificates, and
 * feedback, each row shaped like its Postgres table. Supabase account ids are
 * kept as the Mongo user ids, so certificate links and every progress row stay
 * attached to the same person. Every write is an upsert keyed the same way the
 * app keys it, so running the import twice changes nothing.
 */
import { promises as dnsPromises, setServers } from "node:dns";
import { readFile } from "node:fs/promises";
import { MongoClient } from "mongodb";

const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",").map((value) => value.trim()).filter(Boolean);
if (dnsServers?.length) {
  setServers(dnsServers);
  dnsPromises.setServers(dnsServers);
}

const file = process.argv[2];
const uri = process.env.MONGODB_URI?.trim();
if (!file || !uri) {
  console.error("Usage: MONGODB_URI=... node tools/import-supabase-export.mjs <export.json>");
  process.exit(1);
}

const data = JSON.parse(await readFile(file, "utf8"));
const date = (value) => (value ? new Date(value) : null);
const rows = (name) => (Array.isArray(data[name]) ? data[name] : []);

const client = await new MongoClient(uri, { appName: "codedaddy-import" }).connect();
const db = client.db(process.env.MONGODB_DB?.trim() || "codedaddy");
const counts = {};

async function upsertAll(collection, list, key, toDoc) {
  if (!list.length) return (counts[collection] = 0);
  const result = await db.collection(collection).bulkWrite(
    list.map((row) => ({ replaceOne: { filter: key(row), replacement: toDoc(row), upsert: true } })),
    { ordered: true },
  );
  counts[collection] = result.upsertedCount + result.matchedCount;
}

try {
  await upsertAll("users", rows("users"), (row) => ({ _id: row.id }), (row) => {
    const email = row.email ? String(row.email).toLowerCase() : null;
    const identities = rows("identities")
      .filter((identity) => identity.user_id === row.id)
      .map((identity) => {
        const verified = identity.email_verified === true || identity.email_verified === "true";
        const identityEmail = verified && identity.email ? String(identity.email).toLowerCase() : null;
        // Supabase keys an email identity by the user id. The app keys it by the address.
        return identity.provider === "email"
          ? { provider: "email", provider_id: email ?? identityEmail ?? row.id, email: email ?? identityEmail }
          : { provider: identity.provider, provider_id: String(identity.provider_id), email: identityEmail };
      })
      .filter((identity) => ["github", "google", "email"].includes(identity.provider));
    return {
      _id: row.id,
      email,
      name: row.name ?? null,
      identities,
      created_at: date(row.created_at) ?? new Date(),
      updated_at: date(row.updated_at) ?? new Date(),
      last_sign_in_at: date(row.last_sign_in_at),
    };
  });

  await upsertAll("profiles", rows("profiles"), (row) => ({ user_id: row.user_id }), (row) => ({
    user_id: row.user_id,
    display_name: row.display_name,
    created_at: date(row.created_at),
    updated_at: date(row.updated_at),
  }));

  await upsertAll("course_progress", rows("course_progress"), (row) => ({ user_id: row.user_id, course_id: row.course_id }), (row) => ({
    user_id: row.user_id,
    course_id: row.course_id,
    session: row.session,
    created_at: date(row.created_at),
    updated_at: date(row.updated_at),
  }));

  await upsertAll("practice_progress", rows("practice_progress"), (row) => ({ user_id: row.user_id }), (row) => ({
    user_id: row.user_id,
    state: row.state,
    created_at: date(row.created_at),
    updated_at: date(row.updated_at),
  }));

  await upsertAll("project_submissions", rows("project_submissions"), (row) => ({ user_id: row.user_id, project_id: row.project_id }), (row) => ({
    user_id: row.user_id,
    project_id: row.project_id,
    repository_url: row.repository_url,
    live_url: row.live_url,
    verification_status: row.verification_status,
    created_at: date(row.created_at),
    updated_at: date(row.updated_at),
  }));

  await upsertAll("certificates", rows("certificates"), (row) => ({ user_id: row.user_id }), (row) => ({
    user_id: row.user_id,
    code: String(row.code).toLowerCase(),
    display_name: row.display_name,
    credential_name: row.credential_name,
    portfolio_url: row.portfolio_url,
    repository_url: row.repository_url,
    evidence: row.evidence,
    issued_at: date(row.issued_at),
  }));

  await upsertAll("feedback", rows("feedback"), (row) => ({ _id: row.id }), (row) => ({
    _id: row.id,
    created_at: date(row.created_at),
    mood: row.mood,
    message: row.message ?? null,
    page: row.page ?? null,
    contact: row.contact ?? null,
    user_id: row.user_id ?? null,
  }));

  console.log(JSON.stringify({ imported: counts }));
} finally {
  await client.close();
}

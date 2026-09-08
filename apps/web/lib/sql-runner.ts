/**
 * Runs a learner's SQL against an in-memory SQLite database and reports what
 * came back.
 *
 * Trust model, identical to `js-runner.ts` and rule 1.1 of AGENTS.md:
 *
 *   sandbox="allow-scripts"   — SQLite runs
 *   NO allow-same-origin      — opaque origin, so it reaches nothing of the
 *                               platform: no cookies, no storage, no DOM
 *   postMessage only          — a typed, validated boundary in both directions
 *
 * Never add allow-same-origin here.
 *
 * The database lives in the frame's memory and dies with the frame, so a
 * lesson always starts from its own seed and one learner's mistake cannot
 * reach the next step. A learner will eventually write a join that never
 * finishes; the parent owns a hard timeout and destroys the frame, which is
 * the only thing that reliably stops it.
 *
 * The engine is sql.js, published to `public/sql/` by
 * `tools/build-sql-runtime.mjs`. The parent fetches both files on the platform
 * origin — where ordinary HTTP caching works — and passes them into the frame
 * as data, because a null-origin frame cannot fetch them for itself.
 */

const RUN_TIMEOUT_MS = 5000;

export interface SqlResultSet {
  columns: string[];
  rows: unknown[][];
}

export interface SqlRunResult {
  ok: boolean;
  /** One entry per statement that returned rows, in order. */
  results: SqlResultSet[];
  /** Table names present after the learner's SQL ran, sorted. */
  tables: string[];
  /** Set when the seed itself failed. An authoring bug, never the learner's. */
  seedError?: string;
  /** Set when the learner's SQL threw or never finished. */
  error?: string;
  timedOut?: boolean;
}

let enginePromise: Promise<{ glue: string; wasmBinary: ArrayBuffer }> | null = null;

/**
 * Fetched once per page load and reused. The browser's own cache handles
 * repeat visits, so a learner pays the ~332 KB gzipped transfer once.
 */
function loadEngine(): Promise<{ glue: string; wasmBinary: ArrayBuffer }> {
  if (!enginePromise) {
    enginePromise = Promise.all([
      fetch("/sql/sql-wasm.txt").then((r) => r.text()),
      fetch("/sql/sql-wasm.wasm").then((r) => r.arrayBuffer()),
    ]).then(([glue, wasmBinary]) => ({ glue, wasmBinary }));
  }
  return enginePromise;
}

/**
 * The runner document. A fixed string, never assembled from learner or lesson
 * input, so there is nothing to inject into. Both the engine and the SQL
 * arrive later over postMessage, as data.
 */
function runnerDocument(): string {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  "use strict";

  function reply(payload) {
    parent.postMessage(Object.assign({ __academy: "result" }, payload), "*");
  }

  function plain(value) {
    // sql.js returns Uint8Array for BLOB. Nothing else needs converting.
    if (value instanceof Uint8Array) return Array.from(value);
    return value;
  }

  window.addEventListener("message", async function (event) {
    var msg = event.data;
    if (!msg || msg.__academy !== "run") return;

    try {
      (0, eval)(msg.glue);
      var SQL = await self.initSqlJs({ wasmBinary: msg.wasmBinary });
      var db = new SQL.Database();

      if (msg.seed) {
        try {
          db.run(msg.seed);
        } catch (seedErr) {
          reply({
            ok: false,
            results: [],
            tables: [],
            seedError: (seedErr && seedErr.message) ? String(seedErr.message) : String(seedErr)
          });
          return;
        }
      }

      var results = [];
      var error;
      try {
        var raw = db.exec(msg.sql);
        for (var i = 0; i < raw.length; i++) {
          results.push({
            columns: raw[i].columns,
            rows: raw[i].values.map(function (row) { return row.map(plain); })
          });
        }
      } catch (runErr) {
        error = (runErr && runErr.message) ? String(runErr.message) : String(runErr);
      }

      var tables = [];
      try {
        var schema = db.exec(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
        );
        if (schema.length) {
          tables = schema[0].values.map(function (row) { return String(row[0]); });
        }
      } catch (schemaErr) {
        // A failed schema read only means the tables list is empty.
      }

      reply({ ok: !error, results: results, tables: tables, error: error });
    } catch (err) {
      reply({
        ok: false,
        results: [],
        tables: [],
        error: (err && err.message) ? String(err.message) : String(err)
      });
    }
  });

  parent.postMessage({ __academy: "ready" }, "*");
})();
<\/script></body></html>`;
}

/**
 * @param seed  Lesson-authored SQL that builds the starting database.
 * @param sql   What the learner wrote.
 */
export async function runLearnerSql(seed: string, sql: string): Promise<SqlRunResult> {
  const engine = await loadEngine();

  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-9999px;top:0;width:10px;height:10px;border:0;";

    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      // Destroying the frame is what stops a query that will not finish.
      frame.remove();
    };

    const finish = (result: SqlRunResult) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    function onMessage(event: MessageEvent) {
      // The frame has an opaque origin, so identity is proven by the source
      // window rather than by the origin string.
      if (event.source !== frame.contentWindow) return;
      const data = event.data as Record<string, unknown> | null;
      if (!data || typeof data !== "object") return;

      if (data.__academy === "ready") {
        frame.contentWindow?.postMessage(
          {
            __academy: "run",
            glue: engine.glue,
            wasmBinary: engine.wasmBinary,
            seed,
            sql,
          },
          "*",
        );
        return;
      }

      if (data.__academy === "result") {
        finish({
          ok: Boolean(data.ok),
          results: Array.isArray(data.results) ? (data.results as SqlResultSet[]) : [],
          tables: Array.isArray(data.tables) ? (data.tables as string[]) : [],
          seedError: typeof data.seedError === "string" ? data.seedError : undefined,
          error: typeof data.error === "string" ? data.error : undefined,
        });
      }
    }

    window.addEventListener("message", onMessage);

    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        results: [],
        tables: [],
        timedOut: true,
        error: "Your query did not finish. Check for a join with no matching condition.",
      });
    }, RUN_TIMEOUT_MS);

    frame.srcdoc = runnerDocument();
    document.body.appendChild(frame);
  });
}

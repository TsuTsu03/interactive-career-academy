export type NosqlDocument = Record<string, unknown>;
export type NosqlSeed = Record<string, NosqlDocument[]>;
export interface NosqlRunResult {
  ok: boolean;
  documents: NosqlDocument[];
  collections: string[];
  seedError?: string;
  error?: string;
  timedOut?: boolean;
}

/** Self-contained so the same bounded JSON interpreter runs in Node and the frame. */
export function executeNosql(seed: NosqlSeed, query: string): NosqlRunResult {
  const own = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key);
  const object = (value: unknown): value is NosqlDocument => !!value && typeof value === "object" && !Array.isArray(value);
  const safeKey = (key: string) => !["__proto__", "prototype", "constructor"].includes(key);
  const error = (message: string): never => { throw new Error(message); };
  let nodes = 0;
  function validate(value: unknown, depth = 0): void {
    if (++nodes > 30000 || depth > 12) error("The data is too large or nested too deeply.");
    if (value === null || typeof value === "string" || typeof value === "boolean") return;
    if (typeof value === "number" && Number.isFinite(value)) return;
    if (Array.isArray(value)) { for (const item of value) validate(item, depth + 1); return; }
    if (!object(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) error("Use plain JSON values only.");
    for (const [key, item] of Object.entries(value as NosqlDocument)) {
      if (!safeKey(key)) error(`The field name ${key} is not allowed.`);
      validate(item, depth + 1);
    }
  }
  const canonical = (value: unknown): string => {
    if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
    if (object(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
    return JSON.stringify(value) ?? "undefined";
  };
  const equal = (left: unknown, right: unknown) => canonical(left) === canonical(right);
  const docs = (value: unknown): value is NosqlDocument[] => Array.isArray(value) && value.every(object);
  let store: NosqlSeed;
  try {
    validate(seed);
    if (!object(seed) || Object.values(seed).some((value) => !docs(value))) error("Starting data must map collection names to document arrays.");
    if (Object.keys(seed).some((name) => !name.trim() || name.length > 100)) error("Starting data needs valid collection names.");
    if (JSON.stringify(seed).length > 500000 || Object.values(seed).reduce((n, rows) => n + rows.length, 0) > 2000) error("The starting data is too large.");
    store = JSON.parse(JSON.stringify(seed)) as NosqlSeed;
  } catch (cause) {
    return { ok: false, documents: [], collections: [], seedError: cause instanceof Error ? cause.message : "Invalid starting data." };
  }
  let documents: NosqlDocument[] = [];
  try {
    if (typeof query !== "string" || query.length > 100000) error("Keep the query under 100,000 characters.");
    const parsed: unknown = JSON.parse(query);
    nodes = 0;
    validate(parsed);
    const commands = Array.isArray(parsed) ? parsed : [parsed];
    if (!commands.length || commands.length > 30) error("Use between 1 and 30 commands.");
    function matches(doc: NosqlDocument, filter: NosqlDocument): boolean {
      return Object.entries(filter).map(([field, condition]) => {
        if (["$and", "and", "$or", "or"].includes(field)) {
          if (!Array.isArray(condition) || !condition.length || !condition.every(object)) error("and/or needs a nonempty array of filters.");
          const outcomes = (condition as NosqlDocument[]).map((part) => matches(doc, part));
          return field.endsWith("and") ? outcomes.every(Boolean) : outcomes.some(Boolean);
        }
        if (field.startsWith("$")) error(`Unknown filter operator ${field}.`);
        const value = own(doc, field) ? doc[field] : undefined;
        if (!object(condition)) return equal(value, condition);
        return Object.entries(condition).map(([rawOp, wanted]) => {
          const op = rawOp.replace(/^\$/, "");
          if (op === "eq") return equal(value, wanted);
          if (op === "ne") return !equal(value, wanted);
          if (op === "in") {
            if (!Array.isArray(wanted)) error("in needs an array of values.");
            return (wanted as unknown[]).some((item) => equal(value, item));
          }
          if (!["gt", "gte", "lt", "lte"].includes(op)) error(`Unknown filter operator ${rawOp}.`);
          if (!((typeof value === "number" && typeof wanted === "number") || (typeof value === "string" && typeof wanted === "string"))) return false;
          const order = value < wanted ? -1 : value > wanted ? 1 : 0;
          return op === "gt" ? order > 0 : op === "gte" ? order >= 0 : op === "lt" ? order < 0 : order <= 0;
        }).every(Boolean);
      }).every(Boolean);
    }
    for (const command of commands) {
      if (!object(command)) error("Each command must be a JSON object.");
      const c = command as NosqlDocument;
      if (Object.keys(c).some((key) => !["collection", "operation", "documents", "filter", "projection", "sort", "limit"].includes(key))) error("The command contains an unknown option.");
      if (typeof c.collection !== "string" || !c.collection.trim() || c.collection.length > 100 || !safeKey(c.collection)) error("Name a valid collection.");
      const name = c.collection as string;
      const rows = own(store, name) ? store[name] : [];
      if (c.operation === "insert") {
        if (!docs(c.documents) || !c.documents.length) error("insert needs a nonempty documents array.");
        if (["filter", "projection", "sort", "limit"].some((key) => own(c, key))) error("insert accepts documents only.");
        if (Object.values(store).reduce((n, items) => n + items.length, 0) + (c.documents as NosqlDocument[]).length > 2000) error("The store cannot exceed 2,000 documents.");
        store[name] = [...rows, ...c.documents as NosqlDocument[]];
        nodes = 0;
        validate(store);
        if (JSON.stringify(store).length > 500000) error("The store data is too large.");
        documents = c.documents as NosqlDocument[];
      } else if (c.operation === "find") {
        if (own(c, "documents")) error("find does not accept documents.");
        if (own(c, "filter") && !object(c.filter)) error("filter must be an object.");
        if (own(c, "projection") && (!Array.isArray(c.projection) || !c.projection.every((field) => typeof field === "string" && safeKey(field)))) error("projection must be an array of field names.");
        if (own(c, "sort") && (!object(c.sort) || Object.values(c.sort).some((direction) => direction !== 1 && direction !== -1))) error("sort maps fields to 1 or -1.");
        if (own(c, "limit") && (!Number.isInteger(c.limit) || (c.limit as number) < 0 || (c.limit as number) > 2000)) error("limit must be a whole number between 0 and 2,000.");
        // Validate filters even when the collection has no documents.
        if (c.filter) matches({}, c.filter as NosqlDocument);
        documents = rows.filter((row) => !c.filter || matches(row, c.filter as NosqlDocument));
        if (c.sort) documents.sort((a, b) => {
          for (const [field, direction] of Object.entries(c.sort as NosqlDocument)) {
            const av = own(a, field) ? a[field] : undefined, bv = own(b, field) ? b[field] : undefined;
            if (equal(av, bv)) continue;
            const comparable = (typeof av === "number" && typeof bv === "number") || (typeof av === "string" && typeof bv === "string");
            return (comparable ? (av < bv ? -1 : 1) : canonical(av) < canonical(bv) ? -1 : 1) * (direction as number);
          }
          return 0;
        });
        if (c.limit !== undefined) documents = documents.slice(0, c.limit as number);
        if (c.projection) documents = documents.map((row) => Object.fromEntries((c.projection as string[]).filter((field) => own(row, field)).map((field) => [field, row[field]])));
      } else error("Use the find or insert operation.");
    }
    return { ok: true, documents: JSON.parse(JSON.stringify(documents)), collections: Object.keys(store).sort() };
  } catch (cause) {
    return { ok: false, documents: [], collections: Object.keys(store).sort(), error: cause instanceof Error ? cause.message : "Invalid query." };
  }
}

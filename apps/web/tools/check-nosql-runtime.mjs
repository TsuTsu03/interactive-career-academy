import "./content-loader.mjs";
import assert from "node:assert/strict";
const { executeNosql } = await import("../lib/nosql-store.ts");
const { runNosqlTest } = await import("../lib/nosql-assertions.ts");

const seed = { stock: [{ name: "Rice", price: 55 }, { name: "Egg", price: 8 }, { name: "Salt", price: 12 }] };
const original = JSON.stringify(seed);
const find = (options = {}) => executeNosql(seed, JSON.stringify({ collection: "stock", operation: "find", ...options }));
for (const [operator, wanted, count] of [["$eq", 12, 1], ["$ne", 12, 2], ["$gt", 12, 1], ["$gte", 12, 2], ["$lt", 12, 1], ["$lte", 12, 2], ["$in", [8, 55], 2]]) {
  assert.equal(find({ filter: { price: { [operator]: wanted } } }).documents.length, count, operator);
}
assert.deepEqual(find({ filter: { $and: [{ price: { $gt: 8 } }, { price: { $lt: 55 } }] } }).documents, [{ name: "Salt", price: 12 }]);
assert.equal(find({ filter: { $or: [{ name: "Egg" }, { name: "Rice" }] } }).documents.length, 2);
const sorted = find({ sort: { price: 1 }, projection: ["name"], limit: 2 });
assert.deepEqual(sorted.documents, [{ name: "Egg" }, { name: "Salt" }]);
const tests = [
  { kind: "nosql-runs" }, { kind: "nosql-doc-count", count: 2 },
  { kind: "nosql-docs-equal", documents: [{ name: "Egg" }, { name: "Salt" }] },
  { kind: "nosql-doc-contains", document: { name: "Egg" } },
  { kind: "nosql-field-equals", document: 1, field: "name", value: "Salt" },
  { kind: "nosql-collection-exists", collection: "stock" },
];
for (const test of tests) {
  const spec = { id: test.kind, label: "Runtime assertion", ...test };
  assert.equal(runNosqlTest(spec, sorted).status, "passed");
  assert.equal(runNosqlTest(spec, { ...sorted, ok: false, error: "Invalid query" }).status, "failed");
}
assert.equal(runNosqlTest({ id: "duplicates", label: "Duplicate counts", kind: "nosql-docs-equal", ignoreOrder: true, documents: [{ name: "Egg" }, { name: "Egg" }] }, sorted).status, "failed");
const insert = executeNosql(seed, JSON.stringify([{ collection: "stock", operation: "insert", documents: [{ name: "Milk", price: 30 }] }, { collection: "stock", operation: "find" }]));
assert.equal(insert.documents.length, 4);
assert.equal(find().documents.length, 3);
assert.equal(JSON.stringify(seed), original);
for (const query of ["not JSON", '[]', '{"collection":"stock","operation":"drop"}', '{"collection":"stock","operation":"find","filter":{"$where":"parent.document"}}', '{"collection":"__proto__","operation":"find"}', '{"collection":"stock","operation":"find","filter":{"price":{"$unknown":0}}}']) {
  assert.equal(executeNosql(seed, query).ok, false, query);
}
assert.equal(find({ limit: -1 }).ok, false);
assert.equal(find({ sort: { price: 2 } }).ok, false);
assert.ok(executeNosql({ stock: [null] }, '{}').seedError);
assert.equal(executeNosql({}, '{"collection":"missing","operation":"find","filter":{"price":{"$unknown":1}}}').ok, false);
assert.equal(executeNosql(seed, "x".repeat(100001)).ok, false);
console.log("NoSQL runtime: operators, six assertions, error paths, limits, prototype protection, and reset passed.");

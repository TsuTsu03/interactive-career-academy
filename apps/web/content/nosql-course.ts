import type { Course, Step, TestSpec } from "@/lib/lesson-ir";
import type { NosqlDocument, NosqlSeed } from "@/lib/nosql-store";

/**
 * Twenty reference steps for the bounded JSON document store, not MongoDB syntax.
 * Each run rebuilds the starting data. Only query.json carries across a project.
 * Prices and delivery fees deliberately begin out of order: sorting must change
 * the result, or its starting code would already pass the check.
 */
const STORE: NosqlSeed = {
  products: [
    { name: "Rice", price: 55, stock: 8 },
    { name: "Soap", price: 25, stock: 12 },
    { name: "Salt", price: 20, stock: 20 },
    { name: "Coffee", price: 40, stock: 6 },
  ],
};
const DELIVERY: NosqlSeed = {
  deliveries: [
    { name: "Ana", city: "Cebu", fee: 60, status: "pending" },
    { name: "Ben", city: "Mandaue", fee: 45, status: "delivered" },
    { name: "Cora", city: "Cebu", fee: 80, status: "in transit" },
    { name: "Dino", city: "Lapu-Lapu", fee: 50, status: "pending" },
    { name: "Eva", city: "Cebu", fee: 35, status: "delivered" },
  ],
};
const MARKET: NosqlSeed = {
  orders: [{ name: "Lina", item: "Tomatoes", quantity: 3 }],
};

// Keep each option on its own line so a small task has a small visible diff.
function command(options: Record<string, unknown>): string {
  return `{\n${Object.entries(options).map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(",\n")}\n}`;
}
function expected(documents: NosqlDocument[], label: string): TestSpec[] {
  return [{ id: "result", label, kind: "nosql-docs-equal", documents }];
}

interface Draft {
  id: string;
  projectId: string;
  seed: NosqlSeed;
  task: string;
  start: string;
  solution: string;
  tests: TestSpec[];
  hints: [string, string];
  concept?: string;
}

const shelfStart = command({ collection: "products", operation: "" });
const shelfAll = command({ collection: "products", operation: "find" });
const shelfNames = command({ collection: "products", operation: "find", projection: ["name"] });
const shelfPrices = command({ collection: "products", operation: "find", projection: ["name", "price"] });
const shelfAbove = command({ collection: "products", operation: "find", projection: ["name", "price"], filter: { price: { $gt: 20 } } });
const shelfSorted = command({ collection: "products", operation: "find", projection: ["name", "price"], filter: { price: { $gt: 20 } }, sort: { price: 1 } });
const shelfFirst = command({ collection: "products", operation: "find", projection: ["name", "price"], filter: { price: { $gt: 20 } }, sort: { price: 1 }, limit: 1 });
const shelfHighest = command({ collection: "products", operation: "find", projection: ["name", "price"], filter: { price: { $gt: 20 } }, sort: { price: -1 }, limit: 1 });

const deliveryStart = command({ collection: "deliveries", operation: "find", filter: {} });
const deliveryPending = command({ collection: "deliveries", operation: "find", filter: { status: { $eq: "pending" } } });
const deliveryUnfinished = command({ collection: "deliveries", operation: "find", filter: { status: { $ne: "delivered" } } });
const deliveryBudget = command({ collection: "deliveries", operation: "find", filter: { fee: { $lte: 60 } } });
const deliveryLocal = command({ collection: "deliveries", operation: "find", filter: { $and: [{ fee: { $lte: 60 } }, { city: "Cebu" }] } });
const deliveryEither = command({ collection: "deliveries", operation: "find", filter: { $or: [{ city: "Cebu" }, { city: "Mandaue" }] } });
const deliveryCities = command({ collection: "deliveries", operation: "find", filter: { city: { $in: ["Cebu", "Lapu-Lapu"] } } });
const deliverySorted = command({ collection: "deliveries", operation: "find", filter: { city: { $in: ["Cebu", "Lapu-Lapu"] } }, sort: { fee: -1 } });

const firstOrder = { name: "Nena", item: "Eggplant", quantity: 2 };
const notedOrder = { ...firstOrder, note: "Bring a basket" };
const secondOrder = { name: "Omar", item: "Carrots", quantity: 4 };
const marketStart = '[\n  {"collection":"orders","operation":"insert","documents":[]}\n]';
const marketOne = `[\n  ${JSON.stringify({ collection: "orders", operation: "insert", documents: [firstOrder] })}\n]`;
const marketNote = `[\n  ${JSON.stringify({ collection: "orders", operation: "insert", documents: [notedOrder] })}\n]`;
const marketTwo = `[\n  ${JSON.stringify({ collection: "orders", operation: "insert", documents: [notedOrder, secondOrder] })}\n]`;
const marketRead = `${marketTwo.slice(0, -2)},\n  {"collection":"orders","operation":"find"}\n]`;
const marketLarge = marketRead.replace('"operation":"find"}', '"operation":"find","filter":{"quantity":{"$gte":3}}}');
const marketSummary = marketLarge.replace('"$gte":3}}}', '"$gte":3}},"projection":["name","quantity"]}');

const drafts: Draft[] = [
  {
    id: "nosql-find-products", projectId: "sari-sari-catalog", seed: STORE,
    task: 'A sari-sari store is a small neighborhood shop. Its products are saved as documents: named details inside braces. A collection groups those documents. This lesson uses a small JSON command format, not a MongoDB console. The products collection is already named. Set operation to "find" to read its four documents.',
    start: shelfStart, solution: shelfAll,
    tests: expected(STORE.products, "All four product documents come back"),
    hints: ["The collection is ready. Change the empty action name between the quotes.", 'Set "operation" to "find".'],
    concept: "nosql-document",
  },
  {
    id: "nosql-project-names", projectId: "sari-sari-catalog", seed: STORE,
    task: 'A projection chooses which details appear in each returned document. Add projection with ["name"] to show only product names. The stored prices and stock stay available.',
    start: shelfAll, solution: shelfNames,
    tests: expected([{ name: "Rice" }, { name: "Soap" }, { name: "Salt" }, { name: "Coffee" }], "Each document shows only its name"),
    hints: ["Choose the visible details without changing the collection or action.", 'Add a comma after "find", then add "projection": ["name"].'],
    concept: "nosql-projection",
  },
  {
    id: "nosql-project-prices", projectId: "sari-sari-catalog", seed: STORE,
    task: 'The shop needs a price beside each name. Add "price" to the projection list. These example prices are in Philippine pesos.',
    start: shelfNames, solution: shelfPrices,
    tests: expected([{ name: "Rice", price: 55 }, { name: "Soap", price: 25 }, { name: "Salt", price: 20 }, { name: "Coffee", price: 40 }], "Every product shows its name and price"),
    hints: ["The current list chooses just one detail. Keep it and choose one more.", 'Change the projection to ["name", "price"].'],
  },
  {
    id: "nosql-filter-price", projectId: "sari-sari-catalog", seed: STORE,
    task: 'A filter keeps documents that meet a condition. Add "filter": {"price":{"$gt":20}}. Here $gt means greater than. Keep prices above 20 pesos; a price of exactly 20 would not qualify.',
    start: shelfPrices, solution: shelfAbove,
    tests: expected([{ name: "Rice", price: 55 }, { name: "Soap", price: 25 }, { name: "Coffee", price: 40 }], "Only prices above 20 pesos remain"),
    hints: ["Choose documents by their price, while keeping both visible details.", 'Add a filter option containing {"price":{"$gt":20}}.'],
    concept: "nosql-filter",
  },
  {
    id: "nosql-sort-price", projectId: "sari-sari-catalog", seed: STORE,
    task: 'Sort puts returned documents in a chosen order. Add "sort": {"price":1}. The 1 means lowest first. Keep the existing filter and projection.',
    start: shelfAbove, solution: shelfSorted,
    tests: expected([{ name: "Soap", price: 25 }, { name: "Coffee", price: 40 }, { name: "Rice", price: 55 }], "Prices run from lowest to highest"),
    hints: ["The right products already appear. Change their order with another option.", 'Add "sort": {"price":1} after the filter, with a separating comma.'],
    concept: "nosql-sort",
  },
  {
    id: "nosql-limit-result", projectId: "sari-sari-catalog", seed: STORE,
    task: 'Limit caps the number of returned documents after sorting. Add "limit": 1 to show just the cheapest qualifying item.',
    start: shelfSorted, solution: shelfFirst,
    tests: expected([{ name: "Soap", price: 25 }], "Only the cheapest qualifying product appears"),
    hints: ["The cheapest item is already first. Keep only the start of the list.", 'Add "limit": 1 after the sort option, with a separating comma.'],
    concept: "nosql-limit",
  },
  {
    id: "nosql-sort-highest", projectId: "sari-sari-catalog", seed: STORE,
    task: 'Now show the most expensive qualifying product for a shelf sign. Change the price sort from 1 to -1. This reverses the order before limit chooses the first item.',
    start: shelfFirst, solution: shelfHighest,
    tests: expected([{ name: "Rice", price: 55 }], "Only the highest priced qualifying product appears"),
    hints: ["Keep the one-item cap. Reverse the direction used before it.", 'Change "sort": {"price":1} to "sort": {"price":-1}.'],
  },
  {
    id: "nosql-filter-equals", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'Build a delivery list for Cebu and nearby Philippine cities. The data contains five example deliveries. $eq means equal to. Replace the empty filter with {"status":{"$eq":"pending"}} to find the deliveries still waiting to leave.',
    start: deliveryStart, solution: deliveryPending,
    tests: expected([DELIVERY.deliveries[0], DELIVERY.deliveries[3]], "Only pending deliveries appear"),
    hints: ["Look at the status detail. Keep documents that match the waiting state.", 'Set filter to {"status":{"$eq":"pending"}}.'],
    concept: "nosql-equality",
  },
  {
    id: "nosql-filter-not-equal", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'The dispatcher also needs deliveries already on the road. $ne means not equal to. Change the status condition to {"$ne":"delivered"}. This keeps both pending and in-transit deliveries.',
    start: deliveryPending, solution: deliveryUnfinished,
    tests: expected([DELIVERY.deliveries[0], DELIVERY.deliveries[2], DELIVERY.deliveries[3]], "Every unfinished delivery appears"),
    hints: ["Exclude the finished state instead of selecting only one unfinished state.", 'Replace {"$eq":"pending"} with {"$ne":"delivered"}.'],
    concept: "nosql-not-equal",
  },
  {
    id: "nosql-filter-budget", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'Switch the list to fees within a 60-peso budget, regardless of status. $lte means less than or equal to. Replace the filter with {"fee":{"$lte":60}}. A fee of exactly 60 stays in the result.',
    start: deliveryUnfinished, solution: deliveryBudget,
    tests: expected([DELIVERY.deliveries[0], DELIVERY.deliveries[1], DELIVERY.deliveries[3], DELIVERY.deliveries[4]], "All fees at or below 60 pesos appear"),
    hints: ["The new question is about fees. Include the boundary value as well.", 'Replace the filter with {"fee":{"$lte":60}}.'],
    concept: "nosql-upper-bound",
  },
  {
    id: "nosql-filter-and", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'Keep only Cebu deliveries within that budget. $and takes a list of conditions that must all hold. Use {"$and":[{"fee":{"$lte":60}},{"city":"Cebu"}]}. A plain value such as "Cebu" means an exact match too.',
    start: deliveryBudget, solution: deliveryLocal,
    tests: expected([DELIVERY.deliveries[0], DELIVERY.deliveries[4]], "Only Cebu deliveries within budget appear"),
    hints: ["Both the location and the budget must match the same delivery.", 'Set filter to {"$and":[{"fee":{"$lte":60}},{"city":"Cebu"}]}.'],
    concept: "nosql-and",
  },
  {
    id: "nosql-filter-or", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'Plan a route through Cebu or Mandaue, with no fee restriction. $or keeps a document when any listed condition matches. Replace the filter with {"$or":[{"city":"Cebu"},{"city":"Mandaue"}]}.',
    start: deliveryLocal, solution: deliveryEither,
    tests: expected([DELIVERY.deliveries[0], DELIVERY.deliveries[1], DELIVERY.deliveries[2], DELIVERY.deliveries[4]], "Deliveries in either route city appear"),
    hints: ["One city match is enough. The fee no longer affects this route.", 'Set filter to {"$or":[{"city":"Cebu"},{"city":"Mandaue"}]}.'],
    concept: "nosql-or",
  },
  {
    id: "nosql-filter-in", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'Change the route to Cebu and Lapu-Lapu. $in checks whether one detail matches any value in a list. Replace the filter with {"city":{"$in":["Cebu","Lapu-Lapu"]}}. Mandaue is no longer on this route.',
    start: deliveryEither, solution: deliveryCities,
    tests: expected([DELIVERY.deliveries[0], DELIVERY.deliveries[2], DELIVERY.deliveries[3], DELIVERY.deliveries[4]], "Only the revised route cities appear"),
    hints: ["Check one detail against the revised list of allowed cities.", 'Set filter to {"city":{"$in":["Cebu","Lapu-Lapu"]}}.'],
    concept: "nosql-in",
  },
  {
    id: "nosql-sort-delivery-fees", projectId: "cebu-deliveries", seed: DELIVERY,
    task: 'Finish the route list by putting its largest delivery fee first. Add a descending sort on fee. Keep the revised cities.',
    start: deliveryCities, solution: deliverySorted,
    tests: expected([DELIVERY.deliveries[2], DELIVERY.deliveries[0], DELIVERY.deliveries[3], DELIVERY.deliveries[4]], "Route fees run from highest to lowest"),
    hints: ["Reuse the direction from the shop's highest-price sign.", 'Add "sort": {"fee":-1} after the filter.'],
  },
  {
    id: "nosql-insert-order", projectId: "palengke-orders", seed: MARKET,
    task: 'A palengke is a public market. Build its example vegetable orders. Insert adds documents to a collection. Inside the empty documents list, add {"name":"Nena","item":"Eggplant","quantity":2}. Quantity counts bags. Each Run starts fresh; it does not save real orders.',
    start: marketStart, solution: marketOne,
    tests: expected([firstOrder], "The inserted order has Nena's two bags of eggplant"),
    hints: ["The insert action is ready. Fill its empty list with one order.", 'Replace "documents":[] with "documents":[{"name":"Nena","item":"Eggplant","quantity":2}].'],
    concept: "nosql-insert",
  },
  {
    id: "nosql-order-note", projectId: "palengke-orders", seed: MARKET,
    task: 'Nena wants to bring a reusable basket. Add "note":"Bring a basket" inside her document. Keep her name, item, and quantity. Other documents do not need this optional detail.',
    start: marketOne, solution: marketNote,
    tests: expected([notedOrder], "Nena's complete order includes the basket note"),
    hints: ["Add the reminder to this order, beside its existing details.", 'Add ,"note":"Bring a basket" after "quantity":2 inside the document.'],
  },
  {
    id: "nosql-insert-second-order", projectId: "palengke-orders", seed: MARKET,
    task: 'Insert a second order in the same documents list. Add {"name":"Omar","item":"Carrots","quantity":4} after Nena, separated by a comma. Keep Nena\'s basket note.',
    start: marketNote, solution: marketTwo,
    tests: expected([notedOrder, secondOrder], "Both inserted orders retain their details"),
    hints: ["Keep the first document intact. Add another entry inside the same square brackets.", 'After Nena\'s closing brace, add ,{"name":"Omar","item":"Carrots","quantity":4}.'],
  },
  {
    id: "nosql-read-after-insert", projectId: "palengke-orders", seed: MARKET,
    task: 'The outer square brackets can hold a sequence of commands. They run in order, and the last command supplies the result. Add {"collection":"orders","operation":"find"} after the insert command, separated by a comma. Read Lina\'s starting order together with both new orders.',
    start: marketTwo, solution: marketRead,
    tests: expected([MARKET.orders[0], notedOrder, secondOrder], "The final read includes starting and inserted orders"),
    hints: ["Keep the insertion first. Add a second action after it, inside the outer list.", 'Add a comma after the insert command, then {"collection":"orders","operation":"find"}.'],
    concept: "nosql-command-sequence",
  },
  {
    id: "nosql-large-orders", projectId: "palengke-orders", seed: MARKET,
    task: 'The packer needs orders of at least three bags. $gte means greater than or equal to. Add "filter":{"quantity":{"$gte":3}} to the final find command. Keep the insert command as it is.',
    start: marketRead, solution: marketLarge,
    tests: expected([MARKET.orders[0], secondOrder], "Only orders of at least three bags appear"),
    hints: ["Choose from the saved orders during the final read. Include the minimum quantity.", 'Add ,"filter":{"quantity":{"$gte":3}} inside the find command.'],
    concept: "nosql-lower-bound",
  },
  {
    id: "nosql-packing-summary", projectId: "palengke-orders", seed: MARKET,
    task: 'Finish a short packing summary. In the final find command, add a projection showing only name and quantity. Keep the minimum quantity and both inserted orders.',
    start: marketLarge, solution: marketSummary,
    tests: expected([{ name: "Lina", quantity: 3 }, { name: "Omar", quantity: 4 }], "The packing summary shows only the names and bag counts"),
    hints: ["The right orders already appear. Choose the two details the packer needs.", 'Add ,"projection":["name","quantity"] inside the final find command.'],
  },
];

const steps: Step[] = drafts.map((draft, index) => ({
  id: draft.id,
  index: index + 1,
  projectId: draft.projectId,
  task: draft.task,
  kind: "nosql",
  inputMode: "free",
  files: { "query.json": draft.start },
  activeFile: "query.json",
  nosqlSeed: draft.seed,
  solution: { "query.json": draft.solution },
  tests: draft.tests,
  hints: draft.hints.map((text, hintIndex) => ({ level: hintIndex + 1, text })),
  xp: 10,
  estimatedMinutes: 4,
  ...(draft.concept ? { conceptIds: [draft.concept] } : {}),
}));

export const nosqlCourse: Course = {
  id: "nosql-basics",
  title: "Learn NoSQL by Building Shop and Delivery Lists",
  project: "Sari-Sari Store Catalog",
  projects: [
    { id: "sari-sari-catalog", title: "Sari-Sari Store Catalog" },
    { id: "cebu-deliveries", title: "Cebu Delivery List" },
    { id: "palengke-orders", title: "Palengke Packing List" },
  ],
  order: 12,
  summary: "Read, filter, and add documents with small JSON commands. Build a neighborhood shop catalog, a Cebu delivery list, and a public market packing list in your browser.",
  requires: ["sql-basics"],
  kind: "nosql",
  steps,
};

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

// Validated local authoring batch: sari-sari-stock.
nosqlCourse.projects.push({"id":"sari-sari-stock","title":"Sari-Sari Stock"});
nosqlCourse.steps.push(...([
  {
    "id": "nosql-sari-sari-stock-1",
    "index": 21,
    "task": "Find every document in the records collection.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": ""
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "All four records are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Rice",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 2,
            "name": "Soap",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Cooking Oil",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Egg",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the find operation to retrieve all documents from the records collection."
      },
      {
        "level": 2,
        "text": "The solution is a single find command with no projection or filter."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\" }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock"
  },
  {
    "id": "nosql-sari-sari-stock-2",
    "index": 22,
    "task": "Project only the name field from the records collection.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\" }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Only the names are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Rice"
          },
          {
            "name": "Soap"
          },
          {
            "name": "Cooking Oil"
          },
          {
            "name": "Egg"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a projection array with only the field 'name'."
      },
      {
        "level": 2,
        "text": "This step changes the output to show only the product names."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\"] }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock"
  },
  {
    "id": "nosql-sari-sari-stock-3",
    "index": 23,
    "task": "Add the amount field to the projection.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\"] }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Names and amounts are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Rice",
            "amount": 8
          },
          {
            "name": "Soap",
            "amount": 20
          },
          {
            "name": "Cooking Oil",
            "amount": 2
          },
          {
            "name": "Egg",
            "amount": 5
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add 'amount' to the projection array."
      },
      {
        "level": 2,
        "text": "This step adds the quantity of each item to the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"] }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock"
  },
  {
    "id": "nosql-sari-sari-stock-4",
    "index": 24,
    "task": "Filter documents where amount is less than or equal to 10.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"] }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Only items with amount <= 10 are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Rice",
            "amount": 8
          },
          {
            "name": "Cooking Oil",
            "amount": 2
          },
          {
            "name": "Egg",
            "amount": 5
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a filter with $lte to include only amounts less than or equal to 10."
      },
      {
        "level": 2,
        "text": "This step removes Soap (20) from the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$lte\": 10 } } }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock"
  },
  {
    "id": "nosql-sari-sari-stock-5",
    "index": 25,
    "task": "Sort the filtered documents by amount in ascending order.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$lte\": 10 } } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Filtered documents sorted by amount ascending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Cooking Oil",
            "amount": 2
          },
          {
            "name": "Egg",
            "amount": 5
          },
          {
            "name": "Rice",
            "amount": 8
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a sort object with \"amount\": 1 to sort ascending."
      },
      {
        "level": 2,
        "text": "This step rearranges the output so Cooking Oil comes first, then Egg, then Rice."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$lte\": 10 } }, \"sort\": { \"amount\": 1 } }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock"
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: sari-sari-stock.
nosqlCourse.steps.push(...([
  {
    "id": "nosql-sari-sari-stock-6",
    "index": 26,
    "task": "Limit the sorted result to 2.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$lte\": 10 } }, \"sort\": { \"amount\": 1 } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Sorted and limited to two documents",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Cooking Oil",
            "amount": 2
          },
          {
            "name": "Egg",
            "amount": 5
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a limit field with value 2 to restrict output to two rows."
      },
      {
        "level": 2,
        "text": "This step cuts off the list after the two cheapest items: Cooking Oil and Egg."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$lte\": 10 } }, \"sort\": { \"amount\": 1 }, \"limit\": 2 }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock",
    "conceptIds": [
      "nosql-limit"
    ]
  },
  {
    "id": "nosql-sari-sari-stock-7",
    "index": 27,
    "task": "Change the filter to amount > 5.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$lte\": 10 } }, \"sort\": { \"amount\": 1 }, \"limit\": 2 }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Filtered by amount greater than 5",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Rice",
            "amount": 8
          },
          {
            "name": "Soap",
            "amount": 20
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the filter condition with \"$gt\": 5 to exclude items with amount 5 or less."
      },
      {
        "level": 2,
        "text": "This step removes Cooking Oil and Egg, leaving only Rice and Soap."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": 1 }, \"limit\": 2 }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock",
    "conceptIds": [
      "nosql-upper-bound"
    ]
  },
  {
    "id": "nosql-sari-sari-stock-8",
    "index": 28,
    "task": "Sort that result descending.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": 1 }, \"limit\": 2 }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Sorted descending by amount",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Soap",
            "amount": 20
          },
          {
            "name": "Rice",
            "amount": 8
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the sort field from 1 to -1 to reverse the order."
      },
      {
        "level": 2,
        "text": "This step puts Soap (20) first, then Rice (8), because higher amounts come first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": -1 }, \"limit\": 2 }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock",
    "conceptIds": [
      "nosql-sort"
    ]
  },
  {
    "id": "nosql-sari-sari-stock-9",
    "index": 29,
    "task": "Project name only while keeping the filter and sort.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\", \"amount\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": -1 }, \"limit\": 2 }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Projected only name field",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Soap"
          },
          {
            "name": "Rice"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Replace the projection array with [\"name\"] to show only the name field."
      },
      {
        "level": 2,
        "text": "This step hides the amount values, but keeps the same filter and sort order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": -1 }, \"limit\": 2 }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock",
    "conceptIds": [
      "nosql-projection"
    ]
  },
  {
    "id": "nosql-sari-sari-stock-10",
    "index": 30,
    "task": "Limit to 1.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": -1 }, \"limit\": 2 }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Rice",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Soap",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Cooking Oil",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Egg",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Limited to one document",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Soap"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the limit value from 2 to 1 to show only the top item."
      },
      {
        "level": 2,
        "text": "This step removes Rice, leaving only Soap as the highest-priced item."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"projection\": [\"name\"], \"filter\": { \"amount\": { \"$gt\": 5 } }, \"sort\": { \"amount\": -1 }, \"limit\": 1 }"
    },
    "estimatedMinutes": 4,
    "projectId": "sari-sari-stock",
    "conceptIds": [
      "nosql-limit"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: palengke-document-orders.
nosqlCourse.projects.push({"id":"palengke-document-orders","title":"Palengke Document Orders"});
nosqlCourse.steps.push(...([
  {
    "id": "nosql-palengke-document-orders-1",
    "index": 31,
    "task": "Find records with status equal to Open.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": ""
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns Tomatoes and Carrots",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Tomatoes",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Carrots",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $eq to match exact status value."
      },
      {
        "level": 2,
        "text": "Filter by status: Open"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"status\": { \"$eq\": \"Open\" } } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-equality"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-2",
    "index": 32,
    "task": "Find records with status not equal to Open.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"status\": { \"$eq\": \"Open\" } } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns Eggplant and Cabbage",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 2,
            "name": "Eggplant",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Cabbage",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $ne to exclude Open status."
      },
      {
        "level": 2,
        "text": "Filter by status: not Open"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"status\": { \"$ne\": \"Open\" } } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-not-equal"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-3",
    "index": 33,
    "task": "Find records with amount less than or equal to 8.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"status\": { \"$ne\": \"Open\" } } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns Tomatoes, Carrots, and Cabbage",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Tomatoes",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Carrots",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Cabbage",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $lte for inclusive upper bound."
      },
      {
        "level": 2,
        "text": "Filter by amount: <= 8"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"amount\": { \"$lte\": 8 } } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-upper-bound"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-4",
    "index": 34,
    "task": "Find records with amount greater than or equal to 8.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"amount\": { \"$lte\": 8 } } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns Tomatoes and Eggplant",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Tomatoes",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 2,
            "name": "Eggplant",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $gte for inclusive lower bound."
      },
      {
        "level": 2,
        "text": "Filter by amount: >= 8"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"amount\": { \"$gte\": 8 } } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-lower-bound"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-5",
    "index": 35,
    "task": "Find records with status Open AND amount <= 8.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"amount\": { \"$gte\": 8 } } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns Tomatoes and Carrots",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Tomatoes",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Carrots",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $and to combine two conditions."
      },
      {
        "level": 2,
        "text": "Filter by status: Open AND amount <= 8"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"$and\": [{ \"status\": \"Open\" }, { \"amount\": { \"$lte\": 8 } }] } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-and"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: palengke-document-orders.
nosqlCourse.steps.push(...([
  {
    "id": "nosql-palengke-document-orders-6",
    "index": 36,
    "task": "Use $or for status Done or amount < 3.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"$and\": [{ \"status\": \"Open\" }, { \"amount\": { \"$lte\": 8 } }] } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns Eggplant, Carrots, Cabbage",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 2,
            "name": "Eggplant",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Carrots",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Cabbage",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $or to match either status Done or amount less than 3."
      },
      {
        "level": 2,
        "text": "Filter by status: Done OR amount < 3"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"$or\": [{ \"status\": \"Done\" }, { \"amount\": { \"$lt\": 3 } }] } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-or"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-7",
    "index": 37,
    "task": "Use $in for category Local or Regional.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"$or\": [{ \"status\": \"Done\" }, { \"amount\": { \"$lt\": 3 } }] } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Returns all four records",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Tomatoes",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 2,
            "name": "Eggplant",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Carrots",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Cabbage",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $in to match category values Local or Regional."
      },
      {
        "level": 2,
        "text": "Filter by category: Local or Regional"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-in"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-8",
    "index": 38,
    "task": "Project name and amount from that result.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Projects name and amount for all records",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Tomatoes",
            "amount": 8
          },
          {
            "name": "Eggplant",
            "amount": 20
          },
          {
            "name": "Carrots",
            "amount": 2
          },
          {
            "name": "Cabbage",
            "amount": 5
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use projection to show only name and amount fields."
      },
      {
        "level": 2,
        "text": "Project: name, amount"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } }, \"projection\": [\"name\", \"amount\"] }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-projection"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-9",
    "index": 39,
    "task": "Sort by amount ascending.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } }, \"projection\": [\"name\", \"amount\"] }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Sorts by amount ascending: Carrots 2, Cabbage 5, Tomatoes 8, Eggplant 20",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Carrots",
            "amount": 2
          },
          {
            "name": "Cabbage",
            "amount": 5
          },
          {
            "name": "Tomatoes",
            "amount": 8
          },
          {
            "name": "Eggplant",
            "amount": 20
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use sort with amount: 1 for ascending order."
      },
      {
        "level": 2,
        "text": "Sort by amount ascending"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } }, \"projection\": [\"name\", \"amount\"], \"sort\": { \"amount\": 1 } }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-sort"
    ]
  },
  {
    "id": "nosql-palengke-document-orders-10",
    "index": 40,
    "task": "Limit to 3.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } }, \"projection\": [\"name\", \"amount\"], \"sort\": { \"amount\": 1 } }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Tomatoes",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Eggplant",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Carrots",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Cabbage",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Limits to 3: Carrots, Cabbage, Tomatoes",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Carrots",
            "amount": 2
          },
          {
            "name": "Cabbage",
            "amount": 5
          },
          {
            "name": "Tomatoes",
            "amount": 8
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use limit to show only the first three results."
      },
      {
        "level": 2,
        "text": "Limit to 3"
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"find\", \"filter\": { \"category\": { \"$in\": [\"Local\", \"Regional\"] } }, \"projection\": [\"name\", \"amount\"], \"sort\": { \"amount\": 1 }, \"limit\": 3 }"
    },
    "estimatedMinutes": 4,
    "projectId": "palengke-document-orders",
    "conceptIds": [
      "nosql-limit"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: cebu-route-deliveries.
nosqlCourse.projects.push({"id":"cebu-route-deliveries","title":"Cebu Route Deliveries"});
nosqlCourse.steps.push(...([
  {
    "id": "nosql-cebu-route-deliveries-1",
    "index": 41,
    "task": "Insert a new record named 'New Record' with category 'Local', amount 7, and status 'Open'.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": ""
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "inserted-record",
        "label": "New Record is inserted without note",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "New Record",
            "category": "Local",
            "amount": 7,
            "status": "Open"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use insert to add one document."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not add or remove fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\" } ] }"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-insert"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-2",
    "index": 42,
    "task": "Add a 'note' field to the inserted document with value 'Community order'.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\" } ] }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "record-with-note",
        "label": "New Record has note 'Community order'",
        "kind": "nosql-doc-contains",
        "document": {
          "name": "New Record",
          "category": "Local",
          "amount": 7,
          "status": "Open",
          "note": "Community order"
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the note field to the existing document."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change field order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" } ] }"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-insert"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-3",
    "index": 43,
    "task": "Insert a second document named 'Backup Record' with category 'Local', amount 4, and status 'Open'.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" } ] }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "both-inserted-records",
        "label": "Both New Record and Backup Record are inserted",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "New Record",
            "category": "Local",
            "amount": 7,
            "status": "Open",
            "note": "Community order"
          },
          {
            "name": "Backup Record",
            "category": "Local",
            "amount": 4,
            "status": "Open"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add the Backup Record to the existing insert command."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not reorder or remove fields."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" }, { \"name\": \"Backup Record\", \"category\": \"Local\", \"amount\": 4, \"status\": \"Open\" } ] }"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-insert"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-4",
    "index": 44,
    "task": "Use a command sequence to insert both records and then find all records.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{ \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" }, { \"name\": \"Backup Record\", \"category\": \"Local\", \"amount\": 4, \"status\": \"Open\" } ] }"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "command-sequence-insert-find",
        "label": "Command sequence inserts then finds all records",
        "kind": "nosql-runs"
      },
      {
        "id": "all-records-after-insert",
        "label": "All four seed records plus two inserted records",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Lahug",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 2,
            "name": "Mandaue",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Lapu-Lapu",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Talisay",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "name": "New Record",
            "category": "Local",
            "amount": 7,
            "status": "Open",
            "note": "Community order"
          },
          {
            "name": "Backup Record",
            "category": "Local",
            "amount": 4,
            "status": "Open"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Wrap the insert and find commands in an array."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[ { \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" }, { \"name\": \"Backup Record\", \"category\": \"Local\", \"amount\": 4, \"status\": \"Open\" } ] }, { \"collection\": \"records\", \"operation\": \"find\" } ]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-command-sequence"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-5",
    "index": 45,
    "task": "Project only the name and amount fields in the final find command.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "[ { \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" }, { \"name\": \"Backup Record\", \"category\": \"Local\", \"amount\": 4, \"status\": \"Open\" } ] }, { \"collection\": \"records\", \"operation\": \"find\" } ]"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "projected-fields",
        "label": "Only name and amount are projected",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Lahug",
            "amount": 8
          },
          {
            "name": "Mandaue",
            "amount": 20
          },
          {
            "name": "Lapu-Lapu",
            "amount": 2
          },
          {
            "name": "Talisay",
            "amount": 5
          },
          {
            "name": "New Record",
            "amount": 7
          },
          {
            "name": "Backup Record",
            "amount": 4
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add projection to the find command."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[ { \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" }, { \"name\": \"Backup Record\", \"category\": \"Local\", \"amount\": 4, \"status\": \"Open\" } ] }, { \"collection\": \"records\", \"operation\": \"find\", \"projection\": [ \"name\", \"amount\" ] } ]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-projection"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: cebu-route-deliveries.
nosqlCourse.steps.push(...([
  {
    "id": "nosql-cebu-route-deliveries-6",
    "index": 46,
    "task": "Filter the final find to amount <= 7.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "[ { \"collection\": \"records\", \"operation\": \"insert\", \"documents\": [ { \"name\": \"New Record\", \"category\": \"Local\", \"amount\": 7, \"status\": \"Open\", \"note\": \"Community order\" }, { \"name\": \"Backup Record\", \"category\": \"Local\", \"amount\": 4, \"status\": \"Open\" } ] }, { \"collection\": \"records\", \"operation\": \"find\", \"projection\": [ \"name\", \"amount\" ] } ]"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "filtered-amounts",
        "label": "Only records with amount <= 7 are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Lapu-Lapu",
            "amount": 2
          },
          {
            "name": "Talisay",
            "amount": 5
          },
          {
            "name": "New Record",
            "amount": 7
          },
          {
            "name": "Backup Record",
            "amount": 4
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a filter condition using $lte for amount."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Open\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"amount\"],\"filter\":{\"amount\":{\"$lte\":7}}}]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-filter"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-7",
    "index": 47,
    "task": "Sort those documents by amount.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Open\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"amount\"],\"filter\":{\"amount\":{\"$lte\":7}}}]"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "Documents are sorted by amount ascending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Lapu-Lapu",
            "amount": 2
          },
          {
            "name": "Backup Record",
            "amount": 4
          },
          {
            "name": "Talisay",
            "amount": 5
          },
          {
            "name": "New Record",
            "amount": 7
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a sort condition on amount with value 1 for ascending."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Open\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"amount\"],\"filter\":{\"amount\":{\"$lte\":7}},\"sort\":{\"amount\":1}}]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-sort"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-8",
    "index": 48,
    "task": "Limit to 2.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Open\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"amount\"],\"filter\":{\"amount\":{\"$lte\":7}},\"sort\":{\"amount\":1}}]"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "limited-to-two",
        "label": "Only two documents are returned",
        "kind": "nosql-doc-count",
        "count": 2
      },
      {
        "id": "limited-docs",
        "label": "The two documents are Lapu-Lapu and Backup Record",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Lapu-Lapu",
            "amount": 2
          },
          {
            "name": "Backup Record",
            "amount": 4
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a limit condition with value 2."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Open\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"amount\"],\"filter\":{\"amount\":{\"$lte\":7}},\"sort\":{\"amount\":1},\"limit\":2}]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-limit"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-9",
    "index": 49,
    "task": "Change the second inserted document status to Done in its source document and find Done records.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Open\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"amount\"],\"filter\":{\"amount\":{\"$lte\":7}},\"sort\":{\"amount\":1},\"limit\":2}]"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "done-records",
        "label": "Only Done records are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 2,
            "name": "Mandaue",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Talisay",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "name": "Backup Record",
            "category": "Local",
            "amount": 4,
            "status": "Done"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Update the status of the second document to 'Done' in the insert command."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Done\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"filter\":{\"status\":\"Done\"}}]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-insert"
    ]
  },
  {
    "id": "nosql-cebu-route-deliveries-10",
    "index": 50,
    "task": "Project only name and status from the Done result.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Done\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"filter\":{\"status\":\"Done\"}}]"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Lahug",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Mandaue",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Lapu-Lapu",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Talisay",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "projected-fields-done",
        "label": "Only name and status are projected from Done records",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Mandaue",
            "status": "Done"
          },
          {
            "name": "Talisay",
            "status": "Done"
          },
          {
            "name": "Backup Record",
            "status": "Done"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a projection array with fields 'name' and 'status'."
      },
      {
        "level": 2,
        "text": "Copy the exact solution string; do not change the order or structure."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "[{\"collection\":\"records\",\"operation\":\"insert\",\"documents\":[{\"name\":\"New Record\",\"category\":\"Local\",\"amount\":7,\"status\":\"Open\",\"note\":\"Community order\"},{\"name\":\"Backup Record\",\"category\":\"Local\",\"amount\":4,\"status\":\"Done\"}]},{\"collection\":\"records\",\"operation\":\"find\",\"filter\":{\"status\":\"Done\"},\"projection\":[\"name\",\"status\"]}]"
    },
    "estimatedMinutes": 4,
    "projectId": "cebu-route-deliveries",
    "conceptIds": [
      "nosql-projection"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: barangay-services.
nosqlCourse.projects.push({"id":"barangay-services","title":"Barangay Services"});
nosqlCourse.steps.push(...([
  {
    "id": "nosql-barangay-services-1",
    "index": 51,
    "task": "Find all records to observe the embedded details object.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": ""
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "All four records are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Clearance",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 2,
            "name": "Health Check",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Permit",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Senior Aid",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use find to retrieve all records."
      },
      {
        "level": 2,
        "text": "The details object is nested under each document."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\"}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-document"
    ]
  },
  {
    "id": "nosql-barangay-services-2",
    "index": 52,
    "task": "Project only the name and details fields from the records.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\"}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Only name and details are projected",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Clearance",
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "name": "Health Check",
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "name": "Permit",
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "name": "Senior Aid",
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add projection to select only name and details."
      },
      {
        "level": 2,
        "text": "Remove amount and category from the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\"]}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-projection"
    ]
  },
  {
    "id": "nosql-barangay-services-3",
    "index": 53,
    "task": "Add the amount field to the projection.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\"]}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Name, details, and amount are projected",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Clearance",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 8
          },
          {
            "name": "Health Check",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 20
          },
          {
            "name": "Permit",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 2
          },
          {
            "name": "Senior Aid",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 5
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add amount to the projection array."
      },
      {
        "level": 2,
        "text": "Keep name and details as they are."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"]}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-projection"
    ]
  },
  {
    "id": "nosql-barangay-services-4",
    "index": 54,
    "task": "Filter records to only include those with category equal to Local.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"]}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Only Local category records are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Clearance",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 8
          },
          {
            "name": "Permit",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 2
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add a filter condition for category equal to Local."
      },
      {
        "level": 2,
        "text": "Remove Health Check and Senior Aid from the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"category\":\"Local\"}}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-filter"
    ]
  },
  {
    "id": "nosql-barangay-services-5",
    "index": 55,
    "task": "Sort the filtered Local records by amount in ascending order.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"category\":\"Local\"}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Local records sorted by amount ascending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Permit",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 2
          },
          {
            "name": "Clearance",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 8
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add sort to order by amount ascending."
      },
      {
        "level": 2,
        "text": "Permit (2) comes before Clearance (8)."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"category\":\"Local\"},\"sort\":{\"amount\":1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-sort"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: barangay-services.
nosqlCourse.steps.push(...([
  {
    "id": "nosql-barangay-services-6",
    "index": 56,
    "task": "Limit the two sorted Local documents to 1.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"category\":\"Local\"},\"sort\":{\"amount\":1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Only one Local document returned, sorted by amount ascending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Permit",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 2
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add limit to restrict output to one document."
      },
      {
        "level": 2,
        "text": "Permit (2) is the smallest amount, so it appears first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"category\":\"Local\"},\"sort\":{\"amount\":1},\"limit\":1}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-limit"
    ]
  },
  {
    "id": "nosql-barangay-services-7",
    "index": 57,
    "task": "Switch the filter to status Open and remove the limit so two documents return.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"category\":\"Local\"},\"sort\":{\"amount\":1},\"limit\":1}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Two Open documents returned, sorted by amount ascending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Permit",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 2
          },
          {
            "name": "Clearance",
            "details": {
              "source": "Community",
              "checked": true
            },
            "amount": 8
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change the filter to match status Open."
      },
      {
        "level": 2,
        "text": "Remove the limit to show both documents."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-filter"
    ]
  },
  {
    "id": "nosql-barangay-services-8",
    "index": 58,
    "task": "Project only name and status.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"details\",\"amount\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Two documents with name and status only",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Permit",
            "status": "Open"
          },
          {
            "name": "Clearance",
            "status": "Open"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change projection to include only name and status."
      },
      {
        "level": 2,
        "text": "Remove amount from projection to simplify output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"status\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-projection"
    ]
  },
  {
    "id": "nosql-barangay-services-9",
    "index": 59,
    "task": "Sort the two Open documents by amount descending.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"status\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "Two Open documents sorted by amount descending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Clearance",
            "status": "Open"
          },
          {
            "name": "Permit",
            "status": "Open"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Change sort to amount descending by using -1."
      },
      {
        "level": 2,
        "text": "Clearance (8) comes before Permit (2) in descending order."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"status\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":-1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-sort"
    ]
  },
  {
    "id": "nosql-barangay-services-10",
    "index": 60,
    "task": "Limit to the first 1.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"status\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":-1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Clearance",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Health Check",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Permit",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Senior Aid",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "result",
        "label": "One document returned, the highest amount",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Clearance",
            "status": "Open"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Add limit to return only the first document."
      },
      {
        "level": 2,
        "text": "Clearance is the highest amount, so it appears first."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"status\"],\"filter\":{\"status\":\"Open\"},\"sort\":{\"amount\":-1},\"limit\":1}"
    },
    "estimatedMinutes": 4,
    "projectId": "barangay-services",
    "conceptIds": [
      "nosql-limit"
    ]
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: school-supplies.
nosqlCourse.projects.push({"id":"school-supplies","title":"School Supplies"});
nosqlCourse.steps.push(...([
  {
    "id": "nosql-school-supplies-1",
    "index": 61,
    "task": "Find all school supplies records.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": ""
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "all-records",
        "label": "All four records are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "name": "Notebook",
            "category": "Local",
            "amount": 8,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 2,
            "name": "Pencil",
            "category": "Regional",
            "amount": 20,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 3,
            "name": "Ruler",
            "category": "Local",
            "amount": 2,
            "status": "Open",
            "groupId": 1,
            "details": {
              "source": "Community",
              "checked": true
            }
          },
          {
            "id": 4,
            "name": "Paper",
            "category": "Regional",
            "amount": 5,
            "status": "Done",
            "groupId": 2,
            "details": {
              "source": "Community",
              "checked": true
            }
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the records collection to find all items."
      },
      {
        "level": 2,
        "text": "The find operation returns all documents without any filter."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\"}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies"
  },
  {
    "id": "nosql-school-supplies-2",
    "index": 62,
    "task": "Project only the name and groupId fields from the records.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\"}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "projected-fields",
        "label": "Only name and groupId are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Notebook",
            "groupId": 1
          },
          {
            "name": "Pencil",
            "groupId": 2
          },
          {
            "name": "Ruler",
            "groupId": 1
          },
          {
            "name": "Paper",
            "groupId": 2
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use projection to select only the name and groupId fields."
      },
      {
        "level": 2,
        "text": "Remove all other fields from the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"]}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies"
  },
  {
    "id": "nosql-school-supplies-3",
    "index": 63,
    "task": "Filter records to only include those with groupId equal to 1.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"]}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "filtered-group-1",
        "label": "Only records with groupId 1 are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Notebook",
            "groupId": 1
          },
          {
            "name": "Ruler",
            "groupId": 1
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the filter to select only records where groupId equals 1."
      },
      {
        "level": 2,
        "text": "The filter must match the exact groupId value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"],\"filter\":{\"groupId\":1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies"
  },
  {
    "id": "nosql-school-supplies-4",
    "index": 64,
    "task": "Sort the filtered records by amount in ascending order.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"],\"filter\":{\"groupId\":1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "sorted-by-amount",
        "label": "Records are sorted by amount ascending",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "name": "Ruler",
            "groupId": 1
          },
          {
            "name": "Notebook",
            "groupId": 1
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use sort to order the records by the amount field."
      },
      {
        "level": 2,
        "text": "Sort in ascending order using 1 for the sort value."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"],\"filter\":{\"groupId\":1},\"sort\":{\"amount\":1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies"
  },
  {
    "id": "nosql-school-supplies-5",
    "index": 65,
    "task": "Limit the sorted records to only one row.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"],\"filter\":{\"groupId\":1},\"sort\":{\"amount\":1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "limited-to-one",
        "label": "Only one record is returned",
        "kind": "nosql-doc-count",
        "count": 1
      },
      {
        "id": "only-ruler",
        "label": "The returned record is Ruler",
        "kind": "nosql-doc-contains",
        "document": {
          "name": "Ruler",
          "groupId": 1
        }
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use limit to restrict the output to one row."
      },
      {
        "level": 2,
        "text": "The first row after sorting will be returned."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"],\"filter\":{\"groupId\":1},\"sort\":{\"amount\":1},\"limit\":1}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies"
  }
] satisfies typeof nosqlCourse.steps));

// Validated local authoring batch: school-supplies.
nosqlCourse.steps.push(...([
  {
    "id": "nosql-school-supplies-6",
    "index": 66,
    "task": "Query the groups collection instead and find all group documents.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"records\",\"operation\":\"find\",\"projection\":[\"name\",\"groupId\"],\"filter\":{\"groupId\":1},\"sort\":{\"amount\":1},\"limit\":1}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "all-groups",
        "label": "Both group documents are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "label": "North Team",
            "area": "North"
          },
          {
            "id": 2,
            "label": "South Team",
            "area": "South"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use the groups collection to find all items."
      },
      {
        "level": 2,
        "text": "The find operation returns all documents without any filter."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\"}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies",
    "conceptIds": [
      "nosql-document"
    ]
  },
  {
    "id": "nosql-school-supplies-7",
    "index": 67,
    "task": "Project group id and label.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\"}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "projected-fields",
        "label": "Only id and label are returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "label": "North Team"
          },
          {
            "id": 2,
            "label": "South Team"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use projection to select only id and label fields."
      },
      {
        "level": 2,
        "text": "Remove the area field from the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"id\",\"label\"]}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies",
    "conceptIds": [
      "nosql-projection"
    ]
  },
  {
    "id": "nosql-school-supplies-8",
    "index": 68,
    "task": "Sort the two groups by label descending.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"id\",\"label\"]}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "sorted-descending",
        "label": "South Team then North Team",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 2,
            "label": "South Team"
          },
          {
            "id": 1,
            "label": "North Team"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use sort with label: -1 to reverse the order."
      },
      {
        "level": 2,
        "text": "The South Team label comes after North Team alphabetically."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"id\",\"label\"],\"sort\":{\"label\":-1}}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies",
    "conceptIds": [
      "nosql-sort"
    ]
  },
  {
    "id": "nosql-school-supplies-9",
    "index": 69,
    "task": "Use $in to keep only group id 1.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"id\",\"label\"],\"sort\":{\"label\":-1}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "only-id-1",
        "label": "Only North Team is returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "id": 1,
            "label": "North Team"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use $in to match the id field against a list."
      },
      {
        "level": 2,
        "text": "Only group id 1 matches the filter."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"id\",\"label\"],\"sort\":{\"label\":-1},\"filter\":{\"id\":{\"$in\":[1]}}}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies",
    "conceptIds": [
      "nosql-filter"
    ]
  },
  {
    "id": "nosql-school-supplies-10",
    "index": 70,
    "task": "Project only the label from that one group.",
    "kind": "nosql",
    "inputMode": "free",
    "files": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"id\",\"label\"],\"sort\":{\"label\":-1},\"filter\":{\"id\":{\"$in\":[1]}}}"
    },
    "activeFile": "query.json",
    "nosqlSeed": {
      "records": [
        {
          "id": 1,
          "name": "Notebook",
          "category": "Local",
          "amount": 8,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 2,
          "name": "Pencil",
          "category": "Regional",
          "amount": 20,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 3,
          "name": "Ruler",
          "category": "Local",
          "amount": 2,
          "status": "Open",
          "groupId": 1,
          "details": {
            "source": "Community",
            "checked": true
          }
        },
        {
          "id": 4,
          "name": "Paper",
          "category": "Regional",
          "amount": 5,
          "status": "Done",
          "groupId": 2,
          "details": {
            "source": "Community",
            "checked": true
          }
        }
      ],
      "groups": [
        {
          "id": 1,
          "label": "North Team",
          "area": "North"
        },
        {
          "id": 2,
          "label": "South Team",
          "area": "South"
        }
      ]
    },
    "tests": [
      {
        "id": "only-label",
        "label": "Only label North Team is returned",
        "kind": "nosql-docs-equal",
        "documents": [
          {
            "label": "North Team"
          }
        ]
      }
    ],
    "hints": [
      {
        "level": 1,
        "text": "Use projection to select only the label field."
      },
      {
        "level": 2,
        "text": "Remove id and area from the output."
      }
    ],
    "xp": 10,
    "solution": {
      "query.json": "{\"collection\":\"groups\",\"operation\":\"find\",\"projection\":[\"label\"],\"sort\":{\"label\":-1},\"filter\":{\"id\":{\"$in\":[1]}}}"
    },
    "estimatedMinutes": 4,
    "projectId": "school-supplies",
    "conceptIds": [
      "nosql-projection"
    ]
  }
] satisfies typeof nosqlCourse.steps));

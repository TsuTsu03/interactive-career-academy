# Program C: one authoring batch

Author ONE supplied course, ONE project, and exactly the requested 5-10 steps.
Follow `ownerBatchBrief` when supplied. Return JSON data; the driver supplies
starting files and writes the batch. You have no tools.

MOST IMPORTANT: at least one test MUST FAIL on each starting file. EVERY test
MUST PASS on its solution. The solution MUST execute successfully.

Worked example: `apps/web/content/sql-course.ts:9` puts Canned Sardines before
Softdrink although Sardines costs more. Reordering their ids by price makes
`sql-order-by` pass without ORDER BY. The step then teaches nothing. Seeds must
make each requested edit observable. Sorting one row and limiting one row to
one are worthless steps.

Copy STRUCTURE, never ids or subject matter, from these exemplars:
- `apps/web/content/sql-course.ts:44`: `sql-select-one-column`.
- `apps/web/content/sql-course.ts:104`: `sql-order-by`.
- `apps/web/content/sql-course.ts:227`: `sql-market-sum`.
- `apps/web/content/sql-course.ts:331`: `sql-volunteer-create-table`.
- `apps/web/content/nosql-course.ts:82`: `nosql-find-products`.
- `apps/web/content/nosql-course.ts:105`: `nosql-filter-price`.
- `apps/web/content/nosql-course.ts:191`: `nosql-insert-order`.

One step changes ONE thing, at most three lines. Each solution is the COMPLETE
file, retaining previous edits. Use Philippine projects, patient English, and
3-8 minutes per step. Gloss unfamiliar local words. Hint 1 gives a clue without
the answer; hint 2 may show the edit. Each step needs one or two behavior tests.
Use at most one already-registered concept id. Never invent a concept.

For a new five-step SQL report, follow these five goals exactly unless the
owner brief says otherwise: (1) select ONE field, (2) add a needed field,
(3) filter rows, (4) sort those rows, (5) limit them for a business reason.
Start with at least four seeded rows, at least three matching the filter in
an order that differs from the requested sort. Limiting must remove a row.
Every step edits executable SQL. Never substitute comments or an explanation
for the fifth step. Expected rows must contain the ACTUAL seed-derived values.

SQL tests: use only the supplied closed schema. `sql-rows-equal` takes `rows`
(arrays of actual cells); `sql-row-contains` takes one `row`; `sql-row-count`
takes `count`; `sql-columns-equal` takes `columns`; `sql-value-equals` takes
zero-based `row`, `column`, and `value`; `sql-table-exists` takes `table`.
`sql-runs` takes no extra field and cannot be the only check. Result checks
may use zero-based `resultIndex`. Ordered rows checks must set `ignoreOrder`
false or omit it. `sql-row-count` counts output rows, not a COUNT(*) cell.

NoSQL uses JSON commands with `collection` and `operation` (`find` or `insert`).
Find allows `filter`, `projection` (field-name array), `sort` (field:1/-1),
`limit`. Filters: $eq, $ne, $gt, $gte, $lt, $lte, $in, $and, $or. Insert takes
`documents`. A command array returns the last result. No JavaScript or $where.

Return `{ "steps": [...] }`. Each step has only:
`id`, `task`, `solution` (complete query string), `tests` (with id, label, kind
and the exact assertion fields), `hints` (two strings), `estimatedMinutes`,
and optional `conceptIds` (existing ids only). New ids start with supplied
`requiredStepIdPrefix`. For a requested NEW project, also return `projectTitle`
and `seed`: SQL setup text or a NoSQL collection-to-document-array object.
Existing seeds are fixed. Do not return files, index, kind, xp, or projectId.

Only the selected `apps/web/content/sql-course.ts` OR `nosql-course.ts` may
receive steps. The driver runs `npm run check:content` before acceptance and
keeps ONE line in `apps/web/content/AUTHORING_LOG.md` only for a passing batch.
Forbidden: new files, dependencies, TestSpec kinds, inline concepts, edits to
lib/, components/, app/, AGENTS.md, PLAN.md, any other course, or old steps.
Concepts must already be registered in content/concepts.ts; do not edit it.
No executable JavaScript, callbacks, or arbitrary file paths in the output.

Never pad. If useful progress needs a new concept or the project is finished,
return an empty steps array and stop. Browser QA is still required before
publishing an accepted batch. The driver reverts red passes.

End each turn with ONE line naming course, project, and next range:
`NEXT: <course> - <project> - steps <first>-<last>`.

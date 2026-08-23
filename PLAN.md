# Interactive Career Academy — The Plan

**This is the canonical document.** Start here.

**Status:** Decided 2026-08-23, in an interview with the product owner.
**Supersedes:** `ARCHITECTURE_PLAN_V2.md`, most of which was written against the wrong assumptions. It is kept for history, not for guidance.

---

## 1. What this is, in one paragraph

An open-source web app that teaches full-stack development, free forever, straight to the learner. The mission is freeCodeCamp's: put a real skill in reach of anyone with a browser. Acquisition is TikTok and social, not search. Revenue is donations plus paid specialisations that sit beyond the free path. There is no school, no client, no tenant. One hosted site, one open codebase.

## 2. Who it teaches

**Someone with no technical background at all.** Not a career-switcher who already uses a terminal. Someone who does not know what a browser tab really is.

That single fact drives most of the design below. Taught brick by brick, at their own pace, with nothing assumed.

---

## 3. The decisions

Nineteen decisions, with the reasoning, so nobody relitigates them by accident.

| # | Decision | Choice | Why |
|---|---|---|---|
| 1 | What it is | Open-source, free, direct to learner | freeCodeCamp's mission, not a product sold to schools |
| 2 | Revenue | Donations plus paid specialisations | Nothing on the free path is ever paywalled |
| 3 | Credential | **Fully automated.** No reviewer, no defense | The only way free stays free at zero marginal cost, and exactly how fCC does it |
| 4 | Accounts | Required upfront | One progress path instead of two. Simpler code, like fCC |
| 5 | Auth | GitHub OAuth plus email magic link. **No passwords** | They need GitHub for projects anyway. No passwords means no reset flow and nothing to steal |
| 6 | Content | AI drafts, automated harness validates | The only way one person reaches fCC scale |
| 7 | Repos and licences | Platform MIT, free curriculum CC BY-SA, advanced private | The code is a gift. The content is the product |
| 8 | Free scope | Everything through back-end | Specialisations are the paid tier, and they are far away |
| 9 | Back-end runtime | Learner's own machine, submits a URL | Zero platform cost per learner. Also what fCC does, and what real work looks like |
| 10 | Language | English only, no locale system | Chosen knowingly. Taglish is closed |
| 11 | Community | **None in v1** | One moderator, TikTok traffic. Structural safety beats policing |
| 12 | v1 launch | Complete front-end before launching | Chosen twice, knowing the cost. See section 7 |
| 13 | "Frameworks" | Tailwind CSS | Browser-only, no runtime cost, what real work uses |
| 14 | Leagues | Replaced with **solo challenges** | Leagues need a crowd. An empty leaderboard looks abandoned |
| 15 | Time budget | **20 to 30 hours per week** | Raised from 5 to 10 once decision 19's real numbers were known. The number every estimate below is built on |
| 16 | Teaching a concept | **Four representations, every time** | See section 5 |
| 17 | Coming back | Streak, daily challenge, spaced review, opt-in email | Spaced review is the only mechanic that is both a hook and genuinely good teaching |
| 18 | Development sequence | **Finish and verify the complete v1 frontend before backend integration** | Supabase, auth providers, databases, and APIs stay deferred until the frontend is locked |
| 19 | Content depth | **2x freeCodeCamp's real step count** — ~6,300 for the v1 front-end | The first estimate (~400 total) was wrong by roughly 8x; real fCC alone is ~3,150 steps for this scope. Chosen knowingly at 16 to 38 months on the raised time budget. See section 7 |

---

## 4. The curriculum

### The free path, in order

```
HTML  →  CSS  →  Tailwind  →  JavaScript  →  React  →  Database  →  Back-end
└─────────────── v1 launch ───────────────┘  └──── after launch ────┘
```

Every course is one project built across many small steps, freeCodeCamp style. The learner never starts from a blank file mid-course: each step begins where the last one ended.

### Course naming

"Learn X by Building Y." Currently built:

| Course | Project | Steps now | Target | fCC's real count (this scope) |
|---|---|---|---|---|
| Learn HTML | Sari-Sari Store Page | 27 | ~640 | 302 (+16 orientation) |
| Learn CSS | Jeepney Route Card | 12 | ~2,470 | 1,234 |
| Learn Tailwind CSS | Turo-Turo Menu Card | 12 | ~190 | 93 (part of fCC's "CSS Libraries and Frameworks") |
| Learn JavaScript | Palengke Price Counter | 12 | ~2,640 | 1,320 |
| Learn React | not started | 0 | ~370 | 183 (Fundamentals, State/Hooks/Routing, Performance, Testing) |

Targets are decision 19's 2x multiplier applied to each course's real, current fCC step count (verified live at freecodecamp.org 2026-08-23), not an even split. fCC's own depth is wildly uneven per topic — CSS and JavaScript are each roughly four times HTML's size in their curriculum, and the targets follow that shape rather than flattening it.

Not "more of the same steps." The extra depth is meant to come from finer granularity (one idea per step, never two) and more concept cards on new terms, not padding or repeated busywork. Accessibility is folded into the HTML and CSS courses rather than split out as its own course, unlike fCC's structure.

### The paid tier

Specialisations beyond full-stack: mobile, DevOps, AI engineering, security, and similar. **Not designed yet, and not needed for a long time.** Free covers everything through back-end, so the paid product is roughly a year away. Donations are the only revenue until then. That is the accepted consequence of decision 8.

---

## 5. How a concept is taught

**The learning-styles myth is not used here.** There is no "are you a visual learner?" quiz. The evidence does not support matching instruction to a learner's stated style. It strongly supports giving everyone the same idea in several forms at once.

So every new concept ships with **four representations**:

| # | Form | Example, teaching what a CSS class is |
|---|---|---|
| 1 | **Plain definition** | "A class is a name you give to something so you can style it." |
| 2 | **Analogy** | "Like writing 'fragile' on a box. The word does nothing by itself. It tells the person handling it how to treat that box, and every box with the same word gets treated the same way." |
| 3 | **Visual** | A small diagram: three boxes, two labelled `card`, an arrow from one rule to both labelled boxes |
| 4 | **Immediate proof** | The learner adds the class and watches both boxes change in the live preview |

### Two kinds of visual, both cheap

- **Live demo** for anything you can see. What is a `div`? Show a box with a border in the preview, right now. The browser is the illustration, so it costs nothing and cannot go stale.
- **Small authored diagram** for anything you cannot see. How a browser finds a file, what a variable holds, what a request and response are. Authored as structured data from a small set of primitives (boxes, arrows, labels), not as arbitrary SVG, so it stays tiny, themeable, and safe.

**No hand-drawn illustrations, no video.** Both would consume the time budget that has to go to steps, and video breaks the low-bandwidth constraint outright.

### Register

Every piece of text is authored twice: **Simple** and **Standard**. The learner toggles it in one tap and everything on screen re-translates, including error messages they are already looking at. This is language register, not language: both are English.

---

## 6. How it runs

### Accounts and auth

Required before starting. GitHub OAuth as the primary path, email magic link for anyone without GitHub yet. No passwords anywhere, so there is no reset flow, no hash to leak, and no credential stuffing.

GitHub is deliberate: they need it for project submission, so getting them there early is part of the teaching.

### Running code

| Kind | Where it runs | Cost to the platform |
|---|---|---|
| HTML, CSS, Tailwind | Sandboxed iframe, runtime origin | Zero |
| JavaScript | Sandboxed iframe, opaque origin, postMessage, hard timeout | Zero |
| React | Same, bundled in-browser | Zero |
| Database, back-end | **The learner's own machine or a free sandbox.** They submit a live URL and repo. The platform's tests call their API | Zero |

**The security model, which is the easiest thing to break by accident:**

- **Preview frame:** `sandbox="allow-scripts"`, never `allow-same-origin`. Learner code runs and can reach nothing.
- **Grading frame:** `sandbox="allow-same-origin"`, never `allow-scripts`. The parent reads computed styles; nothing can execute.
- **Script runner:** `allow-scripts` only, opaque origin, identity proven by `event.source`, 2.5 second timeout with the frame destroyed on expiry.

Never combine `allow-scripts` and `allow-same-origin`. Together they let sandboxed content remove its own sandbox.

### Certificates

Fully automated. Pass every project's tests, the certificate issues. It references the learner's real repositories and deployments.

It is a **Certificate of Completion**, not accreditation and not a competency certification. Browser-side results can be forged and that is an accepted, disclosed limit. The portfolio is the real evidence; the certificate points at it.

### Coming back

Four mechanics, in order of how much they matter:

1. **Streak** — days in a row, visible on every screen
2. **Daily challenge** — one small solo goal, rotating
3. **Spaced review** — concepts resurface at increasing intervals. This is the only return mechanic that is also the single most evidence-backed learning technique there is
4. **Opt-in email** — at most weekly. Never guilt, never "you're falling behind"

XP, combos, and ranks carry the moment-to-moment feel. **No leagues** until there is a crowd to fill them.

---

## 7. The real risk

**Not architecture. Content.**

The first version of this estimate said "~400 steps." That number was wrong by roughly 8x — an assumption, never checked against fCC's actual current curriculum. Checked live on 2026-08-23: fCC's Responsive Web Design, JavaScript, and Front-End Development Libraries certifications total **~3,150 steps** for the equivalent of this app's v1 front-end scope (HTML, CSS, a CSS-framework course, JavaScript, React). The corrected numbers below replace the original estimate everywhere in this document.

| | |
|---|---|
| Real fCC step count, this scope (verified 2026-08-23) | ~3,150 |
| Target: 2x that depth (decision 19) | **~6,300** |
| Owner's time (decision 15, raised after this correction) | 20 to 30 hours per week |
| Content authoring, at ~20 to 30 min per step reviewed | 2,050 to 3,150 hours |
| Platform work: auth, certificates, projects, harness | 80 to 150 hours |
| **Total** | **2,130 to 3,300 hours** |
| **Calendar, at 20 to 30 hours per week** | **16 to 38 months before anyone sees it** |

This was put to the owner directly, twice: once at the wrong 400-step baseline (accepted at 8 to 12 months), and again once the real ~3,150-step fCC baseline was verified and the 2x target produced 16 to 38 months even at a raised 20-to-30-hour weekly budget. **The decision, made with the corrected numbers in hand, is 2x fCC's real depth.** It is recorded here, with both the mistake and the correction, so the trade-off stays visible rather than being rediscovered in month twenty.

**Where the ~20 to 30 min/step figure actually comes from — this is not an fCC number.** Checked directly: fCC publishes no per-step or per-challenge authoring time anywhere, not in their contributor guides, not in any blog post found. Their own "How to Work on Workshops" contributor documentation confirms why no such number would transfer here even if it existed — their curriculum is hand-authored by thousands of unpaid volunteer contributors across roughly ten years, coordinated through a challenge-editor tool, with zero AI drafting in their process. There is no meaningful "per-step time" to extract from that, and it would not describe this project's process (decision 6: AI drafts, one person plus the harness reviews) even if there were.

The 20 to 30 min/step figure was always this project's own founding assumption, present in the original plan before today's correction and carried forward unverified — the same category of mistake as the ~400-step baseline. The one real data point that exists is this session's own Tailwind course: 12 steps, each with a full task, tests, hints, and — for two of them — a complete four-representation concept card, drafted directly as TypeScript, run through the harness multiple times, with four distinct bugs found and fixed (a false-pass caused by the browser's default bold `<h1>`, two `readonlyLines` misconfigurations, an oversized Simple-register sentence, and a hint that gave away its answer), then confirmed live in a browser. That is a real, if single and rough, sample of this exact authoring process — closer to ground truth than either the original guess or freeCodeCamp's unrelated, unpublished, and structurally different process.

**Before trusting any rate at this scale, get a real one.** The next authoring batch (recommend: 20 to 30 steps, timed with an actual clock, covering a mix of plain style-checks, tap-to-build steps, and concept-card steps) should replace this estimate with a measured rate rather than a second guess. If that measured rate is materially worse than 20 to 30 min/step, decision 19 itself needs revisiting before more hours are committed to it — not just the schedule.

**The mitigation, since the risk is accepted:** work in small finishable pieces, keep the vault status current, and make the AI drafting harness good enough that authoring is review rather than writing.

---

## 8. Build order

Everything in 1 through 4 is expensive to reverse once thousands of steps exist. They come first for that reason alone.

1. **Rewrite the plan** — this document
2. **Extend the lesson IR** — analogy, diagram, and concept blocks carrying all four representations
3. **Build the validation harness** — what makes AI drafting safe
4. **Replace leagues with solo challenges** in the HUD
5. **Finish the frontend product shell**: real local progress, course gating, completion flows, responsive behaviour, and accessibility
6. **Build spaced review as a frontend flow** using local lesson data
7. **Build every remaining v1 frontend surface** for accounts, projects, submissions, and certificates with honest disconnected states
8. **Finish the v1 front-end curriculum**: expand HTML and CSS, add Tailwind, expand JavaScript, add React and accessibility
9. **Freeze the frontend** after browser, responsive, accessibility, performance, and content-harness verification
10. Only after frontend freeze: Supabase, GitHub OAuth, email magic link, database persistence, and APIs
11. Connect project submission and automated certificates to the verified backend

**Current checkpoint, 2026-08-23:** Steps 1 through 7 are implemented. The
frontend now has local progress, ordered course gates, completion flows, and a
spaced-review screen. It also has honest disconnected account, project draft,
submission, and certificate surfaces. Review schedules and project drafts are
stored inside each course's existing atomic browser session, including safe
recovery for older progress. Step 8, completing the frontend curriculum, is
next.

Step 8 is in progress. The HTML course now has 27 steps. Its latest batches add
semantic page regions and accessible form structure, followed by quantity,
minimum-value, pickup-time, option, and order-note controls.

Steps 5 through 9 are frontend-only. They must not add Supabase, a database,
an API integration, or a new runtime package. Local browser sessions remain the
temporary progress system during this phase. Accounts and server-verified
credentials are still required before launch; they are deferred, not removed.

### What the harness must check, per step

A drafted step is rejected unless:

- The reference solution passes every test
- **The tests fail against the starting code.** If they do not, the step teaches nothing
- Both registers are present and the Simple one obeys its length rules
- Every hint level exists and none gives away the answer at level 1
- Estimated time is stated and plausible
- Any new concept carries all four representations
- The rendered step passes an accessibility lint

The second check is the important one. It is the difference between a lesson and a formality.

---

## 9. Constraints that do not bend

Carried forward from the audit and still true.

- **Device budget.** Reference machine is a 4 GB shared laptop on a 3 Mbps metered connection. Lesson shell under 200 KB
- **Animation is `transform` and `opacity` only.** No canvas, no animation library. Glow is a static shadow
- **`prefers-reduced-motion`** collapses every celebration to a crossfade with no loss of information
- **Status is never colour alone.** Every state carries a glyph and a word
- **The editor is a real `<textarea>`**, so keyboard, selection, and screen readers work with no custom handling
- **Refresh never loses unsaved code**
- **Every lesson has a real, shareable URL**
- **No dark patterns.** No fake urgency, no shame copy, no unskippable celebration, no mechanic that blocks a retry

---

## 10. Still open

Not blocking. Decide when they become real.

- Which specialisations are the paid tier
- How donations are taken (Ko-fi, GitHub Sponsors, PayMongo)
- Hosting plan and the scale at which the free tier breaks
- Exact certificate wording, and whether it needs legal review
- Whether the community layer in `ARCHITECTURE_PLAN_V2.md` section 6b is ever revived

---

## 11. What is already built

A working Next.js 16 app in `apps/web`.

- Three-column step workspace: instructions, editor, live preview
- Three courses, 51 steps total, all passing end to end
- Deterministic grading for markup, computed styles, source patterns, and JavaScript behaviour
- Safe JavaScript execution with a timeout that survives `while (true)`
- Tap-to-build blocks, guided typing, progressive hints
- Simple and Standard registers with live retranslation
- XP, combo, streak, ranks, rank-up celebration
- Progress saved per course, restored on return

See `apps/web/README.md` for the two invariants that must never regress.

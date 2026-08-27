# CodeDaddy — The Plan

**This is the canonical document.** Start here. Working title through decision 31 was "Interactive Career Academy" — the product is renamed **CodeDaddy** as of decision 32. The repo folder, `apps/web`'s internal package name, and historical references below keep the old name; only the product's public-facing name changed.

**Status:** Decided 2026-08-23, in an interview with the product owner. Amended the same day, in a second interview, with decisions 20 through 31, and a third time with decision 32. Amended 2026-08-26 with decisions 33 and 34, which define CodeDaddy's product differentiation and approved signature feature set, and again the same day with decisions 35 through 37, which add the access layer, the session and recovery tools, and the portfolio capstone that ends the free path.
**Supersedes:** `ARCHITECTURE_PLAN_V2.md`, most of which was written against the wrong assumptions. It is kept for history, not for guidance.

---

## 1. What this is, in one paragraph

An open-source web app that teaches full-stack development, free forever, straight to the learner. The mission is freeCodeCamp's: put a real skill in reach of anyone with a browser. Acquisition is TikTok and social, not search. Revenue is donations plus paid specialisations that sit beyond the free path. There is no school, no client, no tenant. One hosted site, one open codebase.

## 2. Who it teaches

**Someone with no technical background at all.** Not a career-switcher who already uses a terminal. Someone who does not know what a browser tab really is.

That single fact drives most of the design below. Taught brick by brick, at their own pace, with nothing assumed.

**Philippines-first** (decision 25). Every project the curriculum builds is Filipino by default — a sari-sari store, a jeepney route, a palengke stall, a turo-turo menu — not culturally neutral. This is a decision about subject matter, not about decision 10's language rule: the app is still English only. Reach is traded for identity on purpose. It answers the question the original plan never asked out loud — why build this when freeCodeCamp already exists, is free, and is ten years ahead — with something sturdier than "the same thing, slower, from one person." A Filipino noun that a global reader would not recognise (jeepney, palengke, turo-turo) gets the same treatment as any other new word: a plain gloss the first time it appears, per section 5's jargon rule.

### What makes CodeDaddy distinct

The instruction-editor-preview workspace is a useful, familiar learning pattern. It is not the product identity, and the product must not try to appear original by making that workflow harder to use. CodeDaddy differentiates through four connected layers:

1. **Learning system — the engine.** Every new concept is taught through a definition, a familiar analogy, a live visual or diagram, and immediate proof in the learner's own code. Progressive hints, clear deterministic checks, global spaced review, rebuild practice, and debugging practice help the learner understand, remember, and use the idea without an AI giving away the answer.
2. **Philippines-first projects — the world.** Learners build useful pages and small applications rooted in everyday Filipino life. The setting is not decorative reskinning: project requirements should reflect real concerns such as mobile access, intermittent or metered connections, keyboard access, readable public information, printing, and small-business workflows.
3. **Inspectable project evidence — the outcome.** Progress is shown through finished artifacts, exact checks passed, concepts used, independent rebuilds, and later real repositories and deployments. XP and certificates support this evidence; they never replace it.
4. **Access — the reach.** The learner this product is written for usually owns a phone rather than a laptop, and buys data by the load. The course keeps working after its first load with the connection off, the workspace can be operated with one thumb on a small screen, and the learner's own repeated mistakes are recorded and routed back into practice. Access counts as differentiation here because the audience of decision 25 is defined partly by the device and the connection they actually have.

The concise positioning is:

> Learn every idea four ways. Build projects rooted in everyday Filipino life. Learn on the phone you already have, with the data you already spent. Finish with working proof, not merely completed lessons.

The public-facing headline and supporting copy should begin from this approved direction:

> **Learn web development by building for real life.**
>
> Master each concept four ways, practise it through familiar Philippine projects, and finish with working projects you can explain and improve. Learn on the phone you already have, and keep going after the lesson has loaded.

Do not market CodeDaddy as "freeCodeCamp for Filipinos," claim that it makes someone job-ready, imply employer or client endorsement, or describe a browser-generated certificate as verified competence. The product may state what it actually does: free project-based learning, four-representation teaching, progressive hints, spaced review, solo challenges, beginner-first English, low-end-device design constraints, lessons that keep working after they have loaded, a workspace usable on a phone, a private record of the learner's own repeated mistakes, and working learner projects. The offline and phone claims are stated as exactly what they are — the lesson shell and an already-loaded course work without a connection, and the workspace is operable by thumb — never as a promise that every part of the platform works with no connection, or that a phone replaces a computer for professional work.

### Signature learning features

These features form one teaching system, not a wall of unrelated gamification. Existing strengths should be explained before new mechanics are added.

| Feature | Learner experience and purpose | State |
|---|---|---|
| **Four-way concept teaching** | See a definition, familiar analogy, live visual or diagram, and immediate proof before using a new idea | Built |
| **Spaced review** | Recall concepts across course boundaries at increasing intervals so earlier learning is not abandoned | Built |
| **Progressive recovery** | Move from the failing check to a focused inspection prompt and then an authored hint; never reveal the full solution or overwrite learner code | Foundation built; structured recovery path planned |
| **Rebuild Mode** | After a guided project, rebuild a smaller version from memory with fewer prompts to prove independent recall | Planned |
| **Bug Clinic** | Repair a deliberately broken interface whose failures represent common beginner mistakes | Planned |
| **Skill Evidence Ledger** | Show the exact concepts and checks a learner has proved across named projects, with links to the artifacts when available | Planned |
| **Constraint Missions** | Complete projects under practical requirements such as keyboard access, mobile readability, print output, reduced motion, or low-bandwidth delivery | Planned; some constraints already appear inside course content |
| **Project Remix** | Change the subject, content, layout, or behaviour of a completed build without repeating the original guided steps | Planned |
| **Concept Connections** | Show where one global concept returns in later courses and projects, such as HTML structure becoming a CSS target and then a JavaScript DOM relationship | Registry foundation built; learner-facing connections planned |
| **Mistake Museum** | Keep a private record of the checks the learner actually fails, name the small number of mistakes they repeat most, and route those concepts back into practice | Planned (decision 35) |
| **Proof page** | Turn the private evidence ledger into one page the learner can publish and send to somebody, built only from work the app actually verified | Planned (decision 37) |
| **Portfolio capstone** | Build a real portfolio site as the last project of the free path, guided on what belongs on it and checked on whether it works | Planned (decision 37) |

Implementation rules for the planned features:

- Rebuild Mode and Bug Clinic are optional learning modes. They must not block ordinary course progress unless a future owner decision explicitly changes the certificate requirements.
- Their starting code must fail their named checks and their reference solution must pass. They use the closed `TestSpec` union and the existing sandbox model; no evaluated callbacks, learner code on the platform origin, or combined iframe permissions.
- The Skill Evidence Ledger is derived from real completed steps, passed checks, projects, and independent work. It must never let the learner or UI assert unsupported skill claims.
- Constraint Missions use authored, testable requirements. They do not claim to simulate every device, network, assistive technology, or production environment.
- The recovery path follows the existing hint rule: level 1 never contains the answer. It preserves learner code and explains the next small inspection or change.
- Concept Connections resolve through the global concept registry. They do not duplicate definitions or create course-local versions of the same concept.
- Any new persisted state needs a versioned, backward-compatible migration and must preserve the course-session and global-review atomic boundaries. A storage change that could strand saved learner progress requires an owner decision before implementation.
- The Mistake Museum records only checks the learner actually failed, keyed by test id and concept id. It never stores learner code, never ranks the learner against anybody, and never uses shame copy. It names at most three repeated mistakes at a time, because a longer list is a report card rather than a next action.
- The offline course shell uses a service worker written in this repository. No PWA npm package, no build plugin, no third-party runtime. It caches the lesson shell and the courses the learner has actually opened — never the whole curriculum on first visit, which would spend the learner's data on lessons they may never reach.
- The offline state is always visible and always honest. A screen that needs a connection the learner does not have — project submission, certificates, accounts — says so plainly and leaves every offline surface usable.
- The phone-first workspace is the same workspace laid out for a small screen. It does not fork the lesson content, the grading path, or the `TestSpec` union, and it must not replace the real `<textarea>` editor with a custom input surface.
- The Progress Passport exports and imports the same versioned records the app already persists. It carries progress, review schedule, and the mistake record — never a claim the learner did not earn in the app. An import from an unknown or newer version is refused with a plain explanation rather than being partly applied.
- Baon Mode is built on the per-step estimate decision 21 already requires. It plans, warns, and stops; it never hides a step, never shortens a lesson to fit, and never starts a countdown the learner did not ask for.
- Character Guard is a pre-check, not a hint and not a fix. It names the character and the line and leaves the correction to the learner. It runs only on the character classes it can be certain about — smart quotes, wrong-direction angle brackets, a missing closing slash — and stays silent otherwise.
- The Tanong Card produces text the learner copies out of the app themselves. It sends nothing, hosts nothing, and creates no thread, so it does not reopen decision 11. It includes the learner's code only from the current step, and says so before copying.
- The proof page is derived, never typed. Neither the learner nor the UI can add a claim to it. Before the backend exists it is a self-contained file the learner publishes themselves, and it states plainly, on its face, that it was generated in the learner's own browser.
- The portfolio capstone is guided by an authored brief and acceptance checks, not by step-by-step scaffolding. Its checks test whether the site works — responsive, keyboard-reachable, readable, live, and honest — never whether it matches one approved visual design.
- No planned feature may add an npm dependency, reopen AI help, introduce community or leaderboard mechanics, require video, or weaken the device and accessibility budget.

### Signature access features

These two are not learning mechanics. They decide who can reach the lesson at all, which is why they sit beside the teaching system rather than beneath it.

| Feature | Learner experience and purpose | State |
|---|---|---|
| **Offline course** | After a lesson has loaded once, keep learning with the connection off or the data spent; the app says plainly which screens still need a connection | Planned (decision 35) |
| **Phone-first workspace** | Operate instructions, editor, and preview with one thumb on a small screen, with a symbol row for the characters code needs and tap-to-insert for the rest | Foundation built (tap-to-build blocks); full phone layout planned (decision 35) |
| **Progress Passport** | Carry progress off a shared or borrowed computer and back onto another one, with no account and no server | Planned (decision 36) |
| **Baon Mode** | Say how many minutes are actually available and get a run of steps that fits, with a warning before starting one that will not finish | Planned (decision 36) |
| **Character Guard** | Catch the character mistakes a phone keyboard causes — curly quotes, the wrong angle bracket, a missing slash — and name them before the grader reports a failure the learner cannot see | Planned (decision 36) |
| **Tanong Card** | Turn being stuck into one well-formed, copy-paste question that names the step, the failing check, and what was already tried | Planned (decision 36) |

### Public feature hierarchy

The landing page should lead with the teaching system, not a large imitation of another platform's curriculum list or IDE. Its primary explanatory sequence is:

1. **One idea, four ways** — definition, analogy, live visual, and learner proof.
2. **Build close to home** — a shelf of real Philippines-first project artifacts, not invented client work.
3. **Remember what you learn** — a plain explanation of global spaced review.
4. **Prove it independently** — guided build, optional rebuild, debugging practice, inspectable project evidence, and a portfolio site you build yourself at the end.
5. **Learn on what you have** — the phone in your hand, and a lesson that keeps working after the data runs out.

The workspace preview can remain on the landing page, but it follows this product story instead of carrying the whole identity by itself.

---

## 3. The decisions

Thirty-seven decisions, with the reasoning, so nobody relitigates them by accident. 1 through 19 were decided 2026-08-23 in the first interview; 20 through 31 in a second interview the same day, which grilled the first plan against the actual codebase and found the gaps below; decision 32 renamed the product; decisions 33 and 34 were approved 2026-08-26 after reviewing how CodeDaddy should remain inspired by freeCodeCamp without becoming its visual or product duplicate; decisions 35 through 37 were approved the same day, after asking what else could ship with v1 for that same reason.

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
| 20 | Launch gate | **Reaffirmed.** Decision 12 stands, a third time, with the 16-to-38-month cost stated plainly | Course-by-course launch was offered as an alternative and declined |
| 21 | Learner time per step | **3 to 5 min for an easy step, 5 to 10 for a hard one.** Distinct from decision 19's authoring-minutes estimate — this is what the *learner* spends, not the author | Already the de facto shape of the shipped content; now a stated rule the harness enforces (≤10 min error, >8 min warning) |
| 22 | Authoring rate | **Measure it, judge after.** No pre-committed threshold | The 20-to-30-min/step figure in section 7 was always a guess; §7 already called for a timed batch. This confirms doing it, without locking a trip-wire in advance |
| 23 | Course structure | **Course → Project → Step.** A course is many small projects, not one project stretched across thousands of steps | 2,470 CSS steps on one Jeepney Route Card contradicted section 4's own "one project" rule. `Course.projects[]` plus `Step.projectId` fixes it without breaking saved progress, since `Session.stepIdx` stays a flat index |
| 24 | Finished project | **Milestone plus shareable artifact. No gating, no certificate.** A named completion moment, XP, the artifact visible | The progress bar is the real psychological payload: "project 11 of 30" survives; "step 847 of 2,470" does not. Gating would add state with no teaching benefit |
| 25 | Audience | **Philippines-first, stated explicitly.** See section 2 | The curriculum was already Filipino by default; the plan never said so on purpose |
| 26 | Concepts | **Global registry plus one global cross-course review record**, in `content/concepts.ts` and a second storage key | Concepts were inlined per step, so the same word taught twice could drift, and spaced review could not follow a concept from one course into the next — the exact gap decision 17 exists to close. Amends AGENTS.md rule 1.6: code and step position are atomic per course; review is its own atomic record because it does not belong to one course |
| 27 | Granularity | **Mechanically enforced in the harness.** Solution diff ≤3 changed lines (tap-to-build: exactly 1), ≤1 new concept, 1 to 2 tests asserting new behaviour, ≤10 min hard cap | Decision 19's "2x depth from finer granularity, not padding" had no machine check. An AI drafter told to make more steps will pad unless something refuses it |
| 28 | AI help | **None.** Authored progressive hints only | Only an in-app tutor with the solution withheld from its prompt can be stopped from handing over answers, and that needs a free-tier API key — a setup wall this audience should not have to climb. A deep link to an external chatbot cannot be controlled at all once the learner leaves the app. Declined outright rather than shipped half-safe |
| 29 | Teaching voice | **One patient English voice.** Remove the Simple/Standard toggle and duplicate registers | Dual-authoring made the experience shorter without making it more supportive. The one remaining voice must be clear, detailed, and practical: explain what to do, why it matters, and how to use the checker feedback. |
| 30 | v1 credential | **One Front-End Development certificate**, earned by finishing all five courses plus 5 independent, spec-built capstone projects with their own automated tests | The plan had a certificate mechanism and a disconnected UI surface but never named what a learner actually earns at launch. Adds 5 project specs and test suites to the estimate, not currently costed anywhere |
| 31 | Sequencing | **Structure before content.** Freeze authoring, land the decisions above, retrofit the 63 existing steps, then resume | Every decision above changes the shape every step must carry. Retrofit cost is linear in step count, and 63 is the cheapest this will ever be |
| 32 | Product name | **CodeDaddy.** Public-facing name only — repo folder, `apps/web` package name, and historical docs keep the old name | Owner's call. Flagged once for two real risks before building: the name sits close to GoDaddy (an active, litigious trademark), and "Daddy" carries slang connotations that cut against a wholesome beginner-education brand aimed partly at younger learners. Owner heard both and proceeded |
| 33 | Differentiation | **Learning system as the engine, Philippines-first projects as the world, inspectable project evidence as the outcome** | A different palette or local nouns alone would make the product a surface-level freeCodeCamp variant. These three layers change what the learner experiences, remembers, and can show |
| 34 | Signature feature set | **Four-way teaching, spaced review, progressive recovery, Rebuild Mode, Bug Clinic, Skill Evidence Ledger, Constraint Missions, Project Remix, and Concept Connections** | The existing kernel already supports the first two and foundations for two more. The complete set turns guided step completion into recall, debugging, transfer, and evidence without reopening AI help, community, video, or leaderboards |
| 35 | Access layer | **Offline course, phone-first workspace, and Mistake Museum, all shipping with v1** | Decisions 33 and 34 changed what the learner is taught. Neither changed who can reach the lesson at all. The learner of decision 25 usually owns a phone rather than a laptop and buys data by the load, so a course that dies without a connection, and an editor that cannot be worked by thumb, exclude the audience the product exists for. The Mistake Museum is the cheapest honest personalisation available without reopening AI help: the failed checks are already produced, already deterministic, and currently thrown away. All three are browser-only and need no npm dependency, no backend, and no crowd, so none of them contradicts decisions 11, 14, 18, or 28 |
| 36 | Session and recovery tools | **Progress Passport, Baon Mode, Character Guard, and the Tanong Card, all shipping with v1** | Four small tools against four real failures of this specific audience. Progress lives in `localStorage` and accounts are deferred behind decision 18, so a wiped shared computer erases everything — the Passport is the only answer available before the backend exists. Baon Mode costs almost nothing because decision 21 already requires a per-step estimate. Character Guard exists because decision 35's phone workspace makes smart quotes and wrong brackets the most common invisible failure. The Tanong Card teaches the learner to ask a good question without building the forum decision 11 refused |
| 37 | The final project | **The learner's own portfolio site is the fifth capstone and the last thing they build on the free path, and the proof page feeds it** | Decision 30 named five capstones without saying what they are. The portfolio is the only project whose content is the other projects, so it can only be built last — built any earlier, it is an empty shelf. It is also the artifact that outlives the certificate: a certificate is a claim, a working site with live projects is the evidence. The proof page exists so the evidence on that site is generated from verified work rather than written from memory. Amends decision 30 by naming the fifth capstone; the certificate requirement itself is unchanged |

---

## 4. The curriculum

### The free path, in order

```
HTML  →  CSS  →  Tailwind  →  JavaScript  →  React  →  Database  →  Back-end
└─────────────── v1 launch ───────────────┘  └──── after launch ────┘
```

A course is many small projects built across many small steps, freeCodeCamp style (decision 23) — not one project stretched across the whole course. The learner never starts from a blank file mid-project: each step begins where the last one ended, but that continuity is scoped to the project, not the whole course. Learn HTML uses this split across eighteen projects; CSS and JavaScript across thirteen each; Tailwind across seven. `Course.projects[]` names each one; `Step.projectId` says which project a step belongs to. Finishing a project is a named milestone with a shareable artifact — not a gate, and not itself a certificate (decision 24).

### Course naming

"Learn X by Building Y." Currently built:

| Course | Project | Steps now | Target | fCC's real count (this scope) |
|---|---|---|---|---|
| Learn HTML | Sari-Sari Store Page + 17 more | 147 (18 projects done) | ~640 | 302 (+16 orientation) |
| Learn CSS | Jeepney Route Card + 12 more | 77 (13 projects done) | ~2,470 | 1,234 |
| Learn JavaScript | Palengke Price Counter + 12 more | 75 (13 projects done) | ~2,640 | 1,320 |
| Learn Tailwind CSS | Turo-Turo Menu Card + 6 more | 43 (7 projects done) | ~190 | 93 (part of fCC's "CSS Libraries and Frameworks") |
| Learn React | not started | 0 | ~370 | 183 (Fundamentals, State/Hooks/Routing, Performance, Testing) |

342 steps total, across four courses, as of 2026-08-24. Learn HTML has eighteen finished projects, including Palengke Price Label; Learn CSS has thirteen; JavaScript has thirteen; Tailwind has seven, most recently Palengke Price Row. The ~640 HTML, ~2,470 CSS, and ~2,640 JavaScript targets mean many more small projects still to come, per decision 23.

Targets are decision 19's 2x multiplier applied to each course's real, current fCC step count (verified live at freecodecamp.org 2026-08-23), not an even split. fCC's own depth is wildly uneven per topic — CSS and JavaScript are each roughly four times HTML's size in their curriculum, and the targets follow that shape rather than flattening it.

Not "more of the same steps." The extra depth is meant to come from finer granularity (one idea per step, never two) and more concept cards on new terms, not padding or repeated busywork. Accessibility is folded into the HTML and CSS courses rather than split out as its own course, unlike fCC's structure.

### The five capstones, and the portfolio at the end

Decision 30 required five independent, spec-built capstone projects for the v1 certificate but never said what they are. Decision 37 answers the last one: **the learner's own portfolio site, built last.**

Four capstones are built to an authored brief with their own automated tests and no step-by-step scaffolding. The fifth is the portfolio, and it is the final boss of the whole free path for a plain structural reason — it is the only project whose content is the other projects. Built any earlier it is an empty shelf.

The portfolio is guided, not scaffolded. The learner is taught what belongs on a portfolio and why, then builds it themselves and is checked on whether it works.

**What the portfolio must contain**

| Section | Why it exists | What the check looks for |
|---|---|---|
| One plain sentence saying who you are and what you build | A visitor decides in seconds whether to keep reading. Jargon loses them | One `<h1>`, a sentence under roughly 20 words, and no unglossed jargon |
| Contact that actually works | Most beginner portfolios end with a form that goes nowhere, because a form needs a backend | A working `mailto:` link and a public GitHub profile link. No contact form, per decision 9 |
| A project shelf, at least four | This is the whole point of the page, and four is what the capstones produce | Four project entries, each with an image, one sentence on what it does, a live link, and a repo link, all resolving |
| One project written up properly | A list of links shows what you made; one honest write-up shows how you think | One project with four named parts: the problem, what you built, one decision you made and why, and one thing you would change |
| Proof, labelled honestly | The certificate is a claim; the linked evidence is what somebody can check | A link to the learner's proof page, described as course completion, never as employment readiness or verified competence |
| What you are learning next | Honest, short, and truer than pretending to be finished | A short section present, with no claimed years of experience |

**What the checks enforce, beyond the sections**

- Readable and usable at 360 px wide
- Every interactive element reachable by keyboard, with a visible focus style
- Text and interface colours pass contrast
- Semantic landmarks, exactly one `<h1>`, and headings in order
- A meaningful `<title>` and meta description, and link-preview tags so a shared link does not arrive blank
- Prints readably, because a printed one-page profile is still asked for here
- Loads within a stated size budget on the reference connection of section 9
- Deployed live from a public repository. A portfolio that is not on the internet is not a portfolio

**What the guidance explicitly forbids**

Invented testimonials, client logos the learner never worked for, claimed years of experience, skill percentage bars (they mean nothing and every reviewer knows it), lorem ipsum, dead links, "project coming soon" placeholders, and auto-playing media. These are named in the teaching, not just in the checks, because a beginner copies what they see on other portfolios without knowing which parts are lies.

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

### Teaching voice

Every learner-facing string uses one patient, plain-English teaching voice. The product does not offer a reading-level toggle. Instead of compressing away useful context, instructions, explanations, hints, and test feedback explain the next small action, why the action matters, and how to use the result.

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

### Offline and the phone

Decision 35. Two rules, both about the learner's actual hardware and connection.

**Offline.** A service worker written in this repository caches the app shell and each course the learner opens, so a lesson that has loaded once keeps working with the connection off. It never precaches the whole curriculum: that would spend a metered learner's data on lessons they may never open. Screens that genuinely need the network — accounts, project submission, certificates — say so plainly instead of failing silently or hanging. This is the same posture as section 9's device budget, applied to the connection rather than the machine.

**The phone.** The workspace is the same three surfaces — instructions, editor, preview — arranged for one thumb on a small screen: a symbol row for the characters code needs and a phone keyboard buries, tap-to-insert for the rest, and the existing tap-to-build blocks doing the heaviest typing. The editor stays a real `<textarea>` (section 9), so keyboard, selection, and screen readers keep working with no custom handling. A phone is where this audience starts; it is not a claim that a phone is where professional work is done.

### The proof page

Decision 37. The Skill Evidence Ledger is private and lives inside the app. The proof page is the same evidence, in a form the learner can hand to somebody.

It is **derived, never typed**. It is built from completed steps, the exact checks that passed, the concepts proved, the projects finished, and any rebuilds and bug clinics completed. There is no field anywhere for the learner or the UI to add a claim to it.

Before the backend exists it exports as one self-contained file the learner publishes themselves — on GitHub Pages, which they already have from decision 5 and already need for decision 9. That keeps the platform cost at zero and puts the page on the learner's own name. The honest limit is stated on the page itself: it was generated in the learner's browser on a given date, and browser-side results can be forged. That is the same disclosed limit the certificate carries, said out loud rather than implied. Once the backend of step 11 exists, the platform can host and sign the same page from server-verified state, and the wording tightens then — not before.

### Certificates

Fully automated. The v1 credential is **one Front-End Development certificate** (decision 30), earned by finishing all five free-path courses through React plus **5 independent capstone projects** — four built to an authored brief with their own automated test suites, and a fifth that is the learner's own portfolio site linking the other four (decision 37). No step-by-step scaffolding in any of them. Finishing the guided courses proves the learner can follow instructions; the five independent projects are what make the certificate mean anything beyond that. It references the learner's real repositories and deployments.

It is a **Certificate of Completion**, not accreditation and not a competency certification. Browser-side results can be forged and that is an accepted, disclosed limit. The portfolio is the real evidence; the certificate points at it.

### Help when stuck

**No AI help, in any form** (decision 28). Authored progressive hints are the only assistance. A chatbot with the solution given to it can always be talked into revealing it; a chatbot deep-linked to an external site cannot be controlled at all past the first message. The one shape that could have worked — an in-app tutor with `step.solution` withheld from its prompt — needs a free-tier API key from the learner, a setup wall this audience should not have to climb this early. Declined outright rather than shipped half-safe. Not in the do-not-reopen list by accident — see section 4 of `AGENTS.md`.

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

**Before trusting any rate at this scale, get a real one.** The next authoring batch (recommend: 20 to 30 steps, timed with an actual clock, covering a mix of plain style-checks, tap-to-build steps, and concept-card steps) should replace this estimate with a measured rate rather than a second guess. Confirmed again in the 2026-08-23 grill (decision 22): measure it, judge after, with no threshold pre-committed. That is a deliberate choice, not an oversight — a pre-set trip-wire was offered and declined. It means the honest reading of this section is still "unverified" until that batch happens; nothing below should be read as if the rate were confirmed.

Two different "minutes" appear in this document and must not be conflated. Decision 19's 20-to-30-min/step figure is **authoring time** — how long the author plus the harness takes to produce one step. Decision 21's 3-to-5/5-to-10-min figure is **learner time** — how long a step takes to solve, now a stated rule the harness enforces. They move independently: authoring time is what determines the calendar in the table above; learner time is what determines whether the finished course is any good.

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
9. **Deliver the approved differentiation and access layers**: revise the landing-page story, then add the offline course shell and the phone-first workspace, then the Progress Passport, Character Guard, Baon Mode, the Tanong Card, the Mistake Museum, progressive recovery, Concept Connections, Rebuild Mode, Bug Clinic, the Skill Evidence Ledger, the proof page, Constraint Missions, and Project Remix in that order, then author the five capstone briefs and their test suites with the portfolio last, since its brief depends on what the other four produce
10. **Freeze the frontend** after browser, responsive, accessibility, performance, offline, phone-workspace, passport round-trip, content-harness, rebuild, bug-clinic, recovery, capstone, and evidence-integrity verification
11. Only after frontend freeze: Supabase, GitHub OAuth, email magic link, database persistence, and APIs
12. Connect project submission and automated certificates to the verified backend

Step 9 remains frontend-only. The offline shell and the phone workspace come first inside it because both change the shell every later feature is built into — retrofitting a service worker and a small-screen layout around seven finished features costs far more than building them under it. The Progress Passport and Character Guard follow immediately: the Passport protects work that is being lost today, and Character Guard is what makes the phone workspace survivable. The Mistake Museum comes next, since it only needs to record failures the grader already produces. The proof page waits until the Skill Evidence Ledger exists, because it is that ledger rendered for somebody else to read. The rest of step 9's order deliberately starts with features that can reuse existing lesson, concept, grading, and review data. Rebuild Mode and Bug Clinic require an explicit IR and harness design before content authoring begins. The Skill Evidence Ledger must derive claims from verified state rather than introduce a second source of truth. Constraint Missions should first appear inside selected course projects and the five capstones, then expand only when the harness can verify their requirements. Project Remix remains optional and should reuse completed project files without mutating the learner's original artifact.

**Current checkpoint, 2026-08-23:** Steps 1 through 7 are implemented. The
frontend now has local progress, ordered course gates, completion flows, and a
spaced-review screen. It also has honest disconnected account, project draft,
submission, and certificate surfaces.

Step 8, completing the frontend curriculum, was in progress (HTML at 27 steps)
when the second interview of 2026-08-23 found that every decision it produced
— decisions 20 through 31 — changes the shape every step must carry: a
project id, concept ids resolved against a shared registry instead of inlined
per step, and a mechanically checked granularity. Authoring paused there
(decision 31). Before step 8 resumes, this happened, in order:

1. This document rewritten with decisions 20 through 31
2. `AGENTS.md` amended: rule 1.6 narrowed to code and step position, the
   no-AI-help decision added to the do-not-reopen list, the granularity and
   Philippines-first rules added to the authoring rules
3. `lib/lesson-ir.ts`: added `Project`, `Course.projects[]`, `Step.projectId`,
   and `Step.conceptIds` (replacing inlined `Step.concepts`)
4. `content/concepts.ts`: the global concept registry, holding all 15
   concepts that existed inline plus 7 added to close jargon gaps in the CSS
   and JavaScript courses (`selector`, `declaration`, `box-model` for CSS;
   `variable`, `function`, `array`, `loop` for JavaScript)
5. `lib/review.ts` and a second storage key (`aca.review.v1`): spaced review
   made global across every course instead of siloed per course
6. `lib/harness.ts`: concept checks resolve through the registry; granularity
   checks added (see below); the estimate gate tightened from a >15 min
   warning to a ≤10 min hard error, >8 min warning, matching decision 21
7. All 63 existing steps retrofitted to the new shape: every step now carries
   a `projectId`; every course now declares its one current `Project`; all 15
   formerly-inline concepts now reference the registry by id

Verified after the retrofit: `tsc --noEmit` and `eslint` both clean, `next
build` green, and `/harness` reports 0 errors across all 63 steps — 22
warnings, every one a `granularity` warning on a step that legitimately
bundles a structural change (wrapping existing markup in a new element,
adding several sibling `<option>` rows at once), not padding.

Steps 5 through 10 are frontend-only. They must not add Supabase, a database,
an API integration, or a new runtime package. Local browser sessions remain the
temporary progress system during this phase. Accounts and server-verified
credentials are still required before launch; they are deferred, not removed.

Step 8 resumed the same day. Learn HTML is now 147 steps across eighteen projects.
Project 1, Sari-Sari Store Page (33 steps), is complete end to end: a
checkbox, two radio buttons in one group, a placeholder attribute, and a
`<small>`/`<strong>` pair closing out the order form. Project 2, Price List
Table (7 steps), is the first real test of the multi-project structure
decision 23 introduced — a table, an ordered list, a blockquote, a
figure/figcaption, and an address block, starting from a fresh document per
decision 24 rather than continuing project 1's finished markup. Project 3,
Barangay Water Notice (6 steps), starts from another fresh document and
teaches semantic article and time markup, a machine-readable datetime value,
and a local contact line. Project 4, Jeepney Route Guide (6 steps), begins
from a fresh document and teaches navigation, fragment links, a matching id,
and a short destination description. Project 5, Turo-Turo Food Stall Menu
(6 steps), begins from a fresh document and teaches collapsible details, its
summary label, and the open attribute. Project 6, Adobo Recipe Facts (6 steps),
begins from a fresh document and teaches definition lists, their fact-name and
value elements, and a serving note. Project 7, Barangay Clinic Bulletin (7
steps), teaches abbreviations and their title text, highlighted text, and
visible document corrections. Project 8, Computer Shop Connection Guide (5
steps), teaches keyboard input, exact access-code text, and sample computer
output. Project 9, Relief Supply Tracker (7 steps), uses labelled native
progress and meter elements to show relief packs and water level with readable
fallback text and a defined range. Project 10, Weather Photo (5 steps), uses
responsive picture sources, a narrow-screen media condition, a fallback image,
and lazy loading. Project 11, Water Notice Video (7 steps), adds native video playback, controls, English captions, and a default captions setting.

Verified in a real browser, not just the harness — every new tap-to-build
step was hand-solved or harness-checked to confirm `placeBlock` lands on the
right line with the right indentation, something the harness's behavioural
check does not exercise on its own since it only grades `files` and
`solution`, never the UI path that produces them. The harness's new
granularity check (decision 27) caught one real authoring mistake in batch 2
before it shipped — see `apps/web/content/AUTHORING_LOG.md` for what and why.

Logged per decision 22, with timing caveats: `apps/web/content/AUTHORING_LOG.md`.
Read that log's own caveats before citing the number — it is not the same
measurement decision 22 still calls for.

### What the harness must check, per step

A drafted step is rejected unless:

- The reference solution passes every test
- **The tests fail against the starting code.** If they do not, the step teaches nothing
- Every learner-facing instruction, hint, and test message is present and gives useful next-step context
- Every hint level exists and none gives away the answer at level 1
- Estimated time is stated and plausible, and ≤10 min (decision 21)
- Every `conceptId` resolves against `content/concepts.ts`, and that concept carries all four representations
- The rendered step passes an accessibility lint
- **Granularity (decision 27):** the solution changes at most 3 lines from the starting code (a tap-to-build step: exactly 1), introduces at most 1 new concept, and has 1 to 2 tests asserting new behaviour — warnings, not hard errors, because legitimate exceptions exist, but a step that trips several at once is very likely padding

The second check is the important one. It is the difference between a lesson and a formality. Granularity is the newest one, and the reason it exists: decision 19's whole claim — that 2x depth comes from finer granularity, not padding — had no machine check behind it until today.

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
- **Offline after first load.** A course the learner has opened keeps working with the connection off. Nothing precaches the whole curriculum, and every network-dependent screen states its dependency plainly
- **One thumb, 360 px.** Every workspace action is reachable and operable with one thumb at 360 px wide, without a custom editor surface replacing the real `<textarea>`
- **The mistake record never shames.** It stores failed check ids, not learner code; it names at most three repeated mistakes; it compares the learner to nobody
- **Evidence is derived, never asserted.** Nothing on the proof page, the evidence ledger, or the certificate can be typed in by the learner or the UI. If the app cannot show which check produced a claim, the claim does not appear
- **Progress must be portable off a machine the learner does not own.** No account required, no server required

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
- Four courses (HTML, CSS, JavaScript, Tailwind CSS), 342 steps total, all harness-verified end to end. Learn HTML has eighteen finished projects; CSS and JavaScript have thirteen each; Tailwind has seven.
- A global concept registry (`content/concepts.ts`) and global, cross-course spaced review — a concept learned in one course still resurfaces while the learner spends months inside the next one
- A `Course.projects[]` / `Step.projectId` layer now used by eighteen small HTML projects and ready for the other courses to split as they grow
- An authoring harness (`lib/harness.ts`, at `/harness`) that checks learner copy, hints, concepts, accessibility, and — as of 2026-08-23 — step granularity, mechanically
- Deterministic grading for markup, computed styles, source patterns, and JavaScript behaviour
- Safe JavaScript execution with a timeout that survives `while (true)`
- Tap-to-build blocks, guided typing, progressive hints
- One patient, plain-English teaching voice across the product
- XP, combo, streak, ranks, rank-up celebration
- Progress saved per course, restored on return

See `apps/web/README.md` for the invariants that must never regress.

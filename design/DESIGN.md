# Design System: Interactive Career Academy

**Direction: a game that happens to teach you to ship software.**

Load this into Google Stitch as the design system before generating any screen. Every prompt in `STITCH_PROMPTS.md` assumes these rules.

This is a responsive **web application**. The 1440px desktop browser is the product. Mobile web is a designed companion.

---

## 0. The Engagement Engine

The interface is built to be hard to put down. Every loop below is intentional and should be felt within the first sixty seconds.

### Core loop

```
See the challenge -> commit a prediction -> RUN -> juice payoff
  -> XP burst -> combo climbs -> node unlocks -> next node glows
```

The learner should never have to decide what to do next. The interface always has one glowing thing.

### The eleven mechanics

1. **XP.** Every passing test awards XP. The counter animates by counting up, digit by digit, never by snapping. The XP bar fills with a visible leading edge.
2. **Levels and ranks.** Novice, Apprentice, Builder, Shipper, Engineer, Architect. Each rank has its own color treatment. Rank-up is a full-screen interruption and it is the single most spectacular moment in the product.
3. **Combo multiplier.** Consecutive tests passed without a hint build a multiplier: `x1 → x1.5 → x2 → x3 → x5`. The combo meter sits beside the Run button, pulses on every increment, and drains on a visible timer when idle. Breaking a combo shows the number shattering, not a scold.
4. **Streak.** Days in a row, rendered as a flame that grows in intensity across tiers. Streak shields are earned, not bought, and absorb one missed day. The flame is on the top bar of every screen.
5. **Daily quests.** Three rotating cards on Home: e.g. "Pass 10 tests", "Finish a lesson with no hints", "Fix 3 failing tests". Each has a progress ring and an XP reward. Completing all three fires a chest-opening animation.
6. **Leagues.** Weekly, ten leagues from Bronze to Grandmaster. Top 7 promote, bottom 5 demote. A live standings panel shows the learner's position moving. Promotion is a full-screen celebration.
7. **Boss challenges.** Every stage ends with a timed, no-hints, multi-test challenge on a visually distinct dark-red battle screen with a countdown and a health bar that depletes as tests pass.
8. **Unlockables.** XP and achievements unlock editor themes, profile frames, avatar gear, and animated name effects. A vault screen shows locked items in silhouette with their unlock requirement.
9. **Achievements.** Badges with rarity tiers (Common, Rare, Epic, Legendary), each with its own frame treatment and a burst animation on award. Legendary awards take over the screen.
10. **Login calendar.** A seven-day reward strip on Home, with day 7 as a large chest. Claiming animates.
11. **Sound and haptics.** A tuned kit: test pass tick, combo climb rising pitch, XP shimmer, level-up fanfare, fail thud, chest open. Under 40 KB total. Muteable, and the mute state is remembered.

### Juice rules

Juice is what separates a game from a form. Apply it everywhere:

- **Numbers count up.** Never snap.
- **Everything that increases has a leading edge.** Bars glow at their fill point.
- **Every reward emits particles.** Small, transform-only sprites, capped at 24 per burst.
- **Impact frames.** A 60ms scale punch on the element that just changed.
- **Screen shake** on combo x3 and above, and on boss hits. 4px maximum, 120ms.
- **Anticipation.** Buttons compress 2px before releasing into their action.
- **Stagger everything.** Lists cascade in at 40ms intervals. Test rows resolve one at a time so the learner reads the result as a sequence, and tension builds.
- **Nothing appears instantly.** Everything arrives with weight.

---

## 0b. The Learning Model — freeCodeCamp, not a quiz app

**The learner writes real code that makes real things happen. That is the whole product.**

Multiple choice is not the core mechanic and never carries a lesson. Prediction still appears, but as a quick 5-second beat before running, never as the lesson itself.

### The step model

A lesson is a sequence of **tiny numbered steps**, freeCodeCamp style. Each step changes exactly one thing.

- The header always reads `Step 12 of 87` in mono. Progress is concrete and countable
- One instruction. One change. One test, or a few small ones
- The test checklist is **always visible**, not hidden until you run. The learner sees exactly what they are aiming at
- Passing a step advances automatically with a satisfying transition. No "Next" button hunting
- Steps are small enough that the learner is never stuck for more than about 90 seconds

### Live preview is mandatory

Every step shows the **result of the code on screen, right beside the code**. Change a color, see the color change. This is the single most important thing for a non-technical beginner, and it is why the curriculum starts with HTML and CSS.

The preview updates as the learner types, debounced. Not only on Run.

### The input ladder

Someone who has never written a line of code cannot type `document.querySelector`, and asking them to is how beginners quit in the first ten minutes. The interface scaffolds input and removes the scaffolding as the learner grows. Every mode produces **real code** in the editor, visible at all times, so learners always see what they are actually building.

| Mode | Who | How it works |
|---|---|---|
| **Tap to build** | Absolute first lessons | Code blocks in a tray. Tap a block, it flies into the editor and snaps into place. Real syntax, zero typing. Fully keyboard operable, never drag-only |
| **Fill the blank** | Early lessons | Full code shown with one or two highlighted gaps. Tap a gap, choose or type a short value |
| **Guided typing** | Most learners | Free typing with live syntax help, bracket auto-close, and an inline ghost hint after 20 seconds of no progress |
| **Free typing** | Later stages | Plain editor. The scaffolding is gone |

The mode is set per step by the author. Everyone starts on tap-to-build, and nobody feels patronised, because the blocks are real code and the editor shows exactly what a professional would write.

### Feedback rules

- A failing test says exactly what is wrong in plain language and points at the line: "Your `h1` needs text inside it." Never "Test 3 failed"
- The preview shows the broken result too. Seeing the wrong thing is the lesson
- Hints reveal in levels and never penalise
- The learner can always reset a step to its starting code

---

## 0c. Language - Built for People Who Have Never Coded

**The product must be fully understood by someone who has never opened a terminal, never seen a line of code, and does not know what a browser tab actually is.**

This is a hard product constraint, not a nicety. Most people who try to learn to code quit inside the first session, and the usual cause is not difficulty. It is that the words meant nothing to them.

### Two copy registers, authored in parallel

Every instruction, hint, error, and system message is authored twice.

| Register | Audience | Rules |
|---|---|---|
| **Simple** | Total beginners, and anyone who picks it | Max 10 words per sentence. Common words only. Present tense. One idea per sentence. Every technical word introduced with a picture or a live example first |
| **Standard** | Anyone with some exposure | Plain English, still short. No jargon without a first-use definition |

Examples of the same instruction:

- Simple: `Make the words big. Change 16 to 40.`
- Standard: `Increase the font size. Change the value from 16px to 40px.`

- Simple: `Your box needs a color. Add one.`
- Standard: `The element has no background-color. Add the property.`

**Banned in both registers:** unexplained jargon, sentences over 20 words, passive voice, idioms, sarcasm, and anything requiring cultural context a child would not have.

### Read aloud

Every instruction, hint, and test result has a speaker button that reads it in a clear voice, with the words highlighting as they are spoken. Essential for non-native English readers, for anyone with a reading difficulty, and for anyone learning on a phone while commuting. It is not buried in settings; it sits next to the text.

### Register selection

The learner picks their register once during onboarding, from a plain question with no jargon and no age gate:

> **How much coding have you done?**
> "None at all" -> Simple · "A little" -> Simple · "I've built things before" -> Standard

They can switch at any time, in one tap, from a pill toggle in the workspace. The toggle is visible, never buried in settings, and the labels are "Simple" and "Standard" with no wording implying that one is the beginner's version or that switching is a step backward.

### Jargon rules

- A technical word is never used before it is shown. The learner sees the thing happen first, then learns its name
- First use of any technical term gets a one-line plain definition inline, not a tooltip and not a glossary link
- Never assume knowledge of: the terminal, file paths, browsers as software, servers, "deploy", "repository", "syntax", "function", "variable", or "the cloud"
- Error messages are rewritten in plain words. The raw engine error is available behind a small "Show the real error" toggle for learners who want it

---

## 1. Visual Theme & Atmosphere

**Neon workshop at night.** Deep near-black surfaces, hot electric accents, chunky display type, and light that reacts to what the learner does. It should look like a well-art-directed indie game, not an edtech dashboard and not a corporate SaaS product.

Dark is the default and the design is built for it. Light mode exists and is a genuine alternate, but the product's identity is dark.

**Density:** 6 on reading surfaces, 8 in the workspace and on stat displays.
**Variance:** 8. Asymmetric, offset, layered depth.
**Motion:** 9. Cinematic. This is the highest-motion product in the taste spectrum and that is the point.

Every screen answers one question immediately: **what is the glowing thing I touch next?**

---

## 2. Color Palette & Roles

### Dark (default)

- **Void** (`#0A0C10`) — Page canvas. Near-black with a blue cast. Never pure black
- **Panel** (`#12161C`) — Cards, editor, primary surfaces
- **Panel Raised** (`#1A2029`) — Elevated elements, hovered rows, modals
- **Hairline** (`#242C36`) — Borders and structural rules
- **Chalk** (`#F2F5F8`) — Primary text and headings
- **Ash** (`#96A1AF`) — Secondary text, metadata, labels
- **Voltage** (`#FF6A1F`) — Primary energy. CTAs, the Run button, streak flame, combo meter. The color of action
- **Acid** (`#C6F24E`) — Reward. XP, passing tests, level-up, unlocks. The color of winning
- **Strike** (`#FF3B5C`) — Failure, boss challenges, damage, combo break
- **Plasma** (`#3DE1FF`) — Rare and Epic tier, special unlocks, boss-cleared state
- **Gold** (`#FFC93D`) — Legendary tier, chests, promotion, top-3 league placement

### Glow treatment

Glow is permitted here and is central to the identity. It is disciplined, not smeared.

- Glow is always a colored `box-shadow` at 20 to 40% opacity, matched to the element's own accent
- Only elements that represent live energy glow: the Run button, an active combo, a filling XP bar, an unlocked node, a boss health bar
- Static text never glows. Body copy never glows. Borders never glow
- Maximum three glowing elements per viewport. Scarcity keeps it exciting

### Light mode

- **Paper** (`#F7F9FB`) canvas, **Surface** (`#FFFFFF`), **Hairline** (`#E3E8EE`), **Ink** (`#0A0C10`), **Ash Light** (`#5B6673`)
- Accents darken for contrast: Voltage `#D9480F`, Acid `#6B8E00`, Strike `#D91E3A`, Plasma `#0284A8`, Gold `#B8860B`
- Glow is replaced by a tinted shadow plus a stronger border. Do not carry neon into light mode

### Non-negotiable color rules

- **Status is never carried by color alone.** Every pass, fail, rank, and rarity has an icon and a text label. This is WCAG 2.2 AA and it does not bend for aesthetics
- All text meets 4.5:1 against its background. Accent-on-Void passes; accent-on-accent does not, so accent fills always carry near-black or near-white labels
- No purple. The AI-purple gradient aesthetic is banned even in a neon system
- No gradient body text. Gradients are permitted only on rank badges, chest surfaces, and league tier plates

---

## 3. Typography

- **Display:** `Clash Display` at 600 and 700. Chunky, confident, tight tracking. Used for level numbers, rank names, XP totals, celebration headlines
- **Interface:** `Satoshi` at 400, 500, 700. All UI text, lesson prose, labels
- **Mono:** `JetBrains Mono` — all code, test names, file paths, timers, and any number that changes
- **Numbers are a design element.** XP, combo multipliers, streak counts, and timers are always mono, always tabular-figure so they do not jitter while counting, and always larger than the label beside them
- **Minimum body size:** 16px
- **Banned:** `Inter`, all generic serifs, any serif in the workspace

---

## 4. Component Behaviors

**Run button.** The center of gravity. Voltage fill, near-black label, 52px tall, 10px radius, a Voltage glow at 30%, and a mono `⌘⏎` chip. It compresses 2px on press, then releases with a spring and emits a small particle ring. While running, the label swaps to a mono ticker and the glow pulses. On the boss screen it turns Strike red.

**XP bar.** A 6px track in Hairline with an Acid fill and a brighter leading edge that glows. On award, the bar fills with a spring, the numeric total counts up in mono, and 8 to 12 Acid particles rise and fade. If the fill crosses a level threshold it does not stop; it wraps and triggers the rank-up sequence.

**Combo meter.** Sits left of the Run button. A vertical stack: a mono multiplier `x3` in Voltage at 28px, and beneath it a thin draining timer bar. Each increment punches the number to 1.15 scale and back, and raises the pitch of the tick sound. At x3 and above the meter gains a glow and the screen shakes 4px. On break, the number shatters into particles and resets to `x1` with a soft thud, and no scolding copy appears.

**Streak flame.** Top bar, always visible. A mono day count beside an animated flame whose intensity has four tiers: 1-6 days small Voltage, 7-29 medium with sparks, 30-99 large with Gold edges, 100+ Plasma-white core. Tapping opens the streak calendar with earned shields shown as small crystal icons.

**Test result rows.** Resolve one at a time, 140ms apart, so the learner watches the outcome unfold. Passing rows slide in with an Acid check, a scale punch, a tick sound, and a small particle. Failing rows slide in with a Strike cross and a lower thud. Every row carries an icon and the word "Passed" or "Failed" beside the mono test name.

**Skill tree nodes.** A real game map, not a list. Completed nodes are filled Acid with a soft glow and a check. The current node is a Voltage ring, pulsing, larger than the others, with the connecting path animating toward it. Locked nodes are Hairline silhouettes with a mono requirement line. Boss nodes are hexagonal, Strike-bordered, with a skull glyph. Connector paths are 2px lines that fill with color as the learner progresses.

**Chests.** Rounded Panel Raised boxes with a Gold gradient lid and a glow. On claim: shake, lid pops with a burst of 24 particles, contents fly out and settle into a row with staggered scale punches. This is the highest-juice non-rank-up animation in the product.

**League standings.** A live list of ten rows with avatar, name, and mono XP. The learner's row is Panel Raised with a Voltage left border and a subtle persistent glow. Promotion zone rows sit above an Acid divider labelled "PROMOTION", demotion rows below a Strike divider. On XP change, the row animates to its new position rather than the list re-rendering.

**Rank-up takeover.** Full screen. Void backdrop, radial Gold light bloom from center, the old rank plate shattering, the new rank plate slamming in with a scale-down impact and screen shake, the rank name in 72px Clash Display, and 48 particles. Then a single "Continue" button. Roughly 2.4 seconds and skippable with any key.

**Achievement toast.** Slides in from the top-right on a Panel Raised card with a rarity-colored border and glow, the badge art on the left, name and description on the right, a rarity label in mono caps. Legendary awards bypass the toast and take over the screen.

**Boss challenge screen.** A visually distinct mode. Void deepens, a Strike vignette breathes at the edges, a large mono countdown sits top-center, and a segmented boss health bar depletes with an impact flash as each test passes. No hints available, and the interface says so plainly.

**Loading.** Skeleton blocks matching final layout, with an Acid shimmer sweep. Never a circular spinner.

**Empty states.** A composed layout showing what will fill the space, plus one glowing action.

---

## 5. Layout

- CSS Grid throughout. No flexbox percentage math, no `calc()` hacks
- Containers max at 1400px, lesson prose at 65 characters
- Full-height uses `min-h-[100dvh]`, never `h-screen`
- No overlapping elements except deliberate celebration overlays and toasts, which are above everything by design
- No three-equal-card feature rows. Use asymmetric grids and two-column zig-zag
- Interactive targets at least 44px; primary actions 52px desktop, 56px touch

### The desktop workspace grid — three columns, preview always visible

The freeCodeCamp arrangement, with the preview promoted to a full column because seeing the result is the lesson.

- **Instruction rail, left, 26%.** Step counter, the task in the learner's register, a read-aloud button, and the always-visible test checklist
- **Editor, center, 37%.** File tabs, gutter, code, and the block tray when the step uses tap-to-build
- **Live preview, right, 37%.** The learner's actual output, updating as they type. Never collapsed, never behind a tab
- **Action bar, bottom, spanning editor and preview.** Combo meter, Run button, XP bar, and the resolved test rows

Dividers are draggable with a 1px Hairline rule and a 6px hit area, and positions persist per learner. On steps with no visual output, the preview column becomes a console output panel rather than disappearing, so the layout never shifts under the learner.

Type in the instruction rail is 18px minimum, larger than a typical app, because it is the text that decides whether a beginner keeps going.

### Persistent stat bar

A 56px top bar on every signed-in screen, always visible, containing: streak flame with day count, XP bar with level badge, combo state when active, league tier plate, and the avatar. It is the product's HUD and it never scrolls away.

### Responsive collapse

- **1440px+:** full three-region grid plus the HUD
- **1024-1440px:** prose rail narrows to 28%
- **768-1024px:** instruction rail collapses to a sticky expandable header; editor and preview split the width; the HUD compresses to streak, XP, and level only
- **Below 768px:** companion mode with a segmented switch between Instruction, Code, and Preview so all three remain reachable one tap apart. Tap-to-build steps are fully playable on a phone, because tapping blocks needs no keyboard. Free-typing steps, multi-file work, SQL runtimes, and publishing state plainly that they need a larger screen

---

## 5b. Web Platform Behaviors

A browser application for people learning to be developers. Keyboard fluency is part of the teaching and part of the speed that makes it feel good.

- `⌘/Ctrl + Enter` runs. Shown as a persistent mono chip on the Run button, never a tooltip
- `⌘/Ctrl + K` opens the command palette
- `⌘/Ctrl + S` saves a checkpoint inline and never triggers the browser save dialog
- `1` through `4` select prediction options
- `Space` claims a reward, skips a celebration, or advances
- `Esc` leaves the editor and closes overlays
- `?` opens the shortcut reference

**Command palette.** Centered overlay, 640px, mono input, grouped results with mono shortcut chips, arrow-key selection carrying a Voltage left border. The one permitted centered overlay outside celebrations.

**Browser conventions that must hold.**

- Every lesson, node, and profile has a real, shareable, bookmarkable URL
- Back and forward work correctly, including inside the workspace
- Document title reflects the current lesson
- **Refresh never loses unsaved code**
- Text is selectable everywhere, including test output and diffs
- No scroll hijacking, no custom scrollbars

**Public surface.** Free lesson pages are server-rendered, crawlable, and readable logged out, because organic discovery is the acquisition model. The logged-out page shows the full lesson with a static highlighted code sample and one inline invitation to sign in and play. No modal wall, no blur.

**No mobile-app mimicry.** No bottom tab bar on desktop, no pull-to-refresh, no splash screen, no install interstitial, no hamburger above 1024px.

---

## 6. Motion

- **Spring physics, `stiffness: 260, damping: 18`.** Snappier and bouncier than a productivity tool. Things overshoot slightly and settle. That overshoot is the feel of the product
- **Impact springs** for rewards: `stiffness: 400, damping: 12`
- **`transform` and `opacity` only.** Never `top`, `left`, `width`, or `height`. The target machine is a 4 GB shared laptop on a weak GPU, and juice must be free
- **Particles are CSS transform sprites**, capped at 24 per burst and 48 on screen. No canvas, no WebGL, no particle library
- **Glow is a static `box-shadow`** that animates only in opacity and spread, never in blur radius, which is expensive
- **Staggered cascades** at 40ms. Test rows at 140ms so the sequence is readable
- **Ambient life is permitted and wanted:** the current skill node pulses, the streak flame flickers, the active combo breathes. Cap ambient loops at three per viewport and pause them when the tab is hidden
- **`prefers-reduced-motion` is fully honored.** All celebrations collapse to a single crossfade with the same information. XP counts up in one step. No particles, no shake, no pulse. The learner loses no reward and no meaning, only the animation

---

## 7. Accessibility

Juice and access are not in conflict. Both ship.

- All diagnostics, test results, and console output are real text in the main document. Never trapped in the preview frame
- Test results, XP awards, and level changes announce through a polite live region as text
- Every status carries an icon and a word. Color alone never communicates pass, fail, rarity, or rank
- A plain-text editor mode with full editing and running parity, reachable from the workspace
- Visible documented keyboard escape from the editor. No keyboard traps
- Focus is never obscured by a HUD, toast, or celebration overlay. Celebrations return focus to where it was
- All celebrations are skippable with any key and auto-dismiss
- Adjustable font size and line height in the workspace
- No drag-only interaction
- Sound is off by default on first load, offered once, and the choice is remembered

---

## 8. Voice

Confident, fast, a little cocky. Game copy, not classroom copy. Short. Punchy. Never condescending, never sugary.

- "RUN IT" not "Let's go, superstar!"
- "5 in a row. x3 combo." not "Great job!"
- "Combo broken." not "Oops, try again!"
- "You predicted `undefined`. It returned `NaN`." Always show the truth
- "BOSS: Arrays" not "Stage 2 Assessment"
- "Rank up. You're a Builder." not "Congratulations on your achievement!"
- Failure copy is never apologetic and never scolding. It is factual and immediately actionable

---

## 9. Anti-Patterns (Banned)

Even at maximum juice, these stay out:

- No emojis in the product interface. Rewards use crafted badge art and icons, not emoji
- No `Inter`, no generic serifs
- No pure black `#000000`
- No purple, no AI-gradient aesthetic
- No gradient body text
- No custom mouse cursors
- No three-column equal card grids
- No circular loading spinners
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Journey", "Supercharge"
- No generic placeholder names. Use realistic Filipino names: Mariel Bautista, Renz Dela Cruz, Alyssa Ocampo, Kiel Ramos
- No fake round statistics
- No broken image links. Use `picsum.photos` or inline SVG
- No blur-heavy backdrops. Blur is the most expensive effect on the target hardware; use opacity scrims
- No celebration that cannot be skipped
- No mechanic that blocks a learner from re-running their code

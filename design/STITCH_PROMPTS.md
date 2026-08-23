# Google Stitch Prompts — Interactive Career Academy

**Responsive web application.** Desktop browser at 1440x900 is the product. Mobile web is a designed companion.

**Learning model: freeCodeCamp, not a quiz app.** Tiny numbered steps, real code, live preview beside the editor, always-visible test checklist. Multiple choice is never the core.

**Audience: people who have never written a line of code.** Two copy registers, an input ladder from tap-to-build blocks to free typing, read-aloud on every instruction, and no jargon used before it is shown.

**Aesthetic: a game that teaches you to ship software.** Dark neon, high juice, XP, combos, streaks, leagues, bosses, chests.

**How to use:** load `DESIGN.md` into Stitch first, then paste one prompt at a time. Do not batch.

If you only generate five: **1, 2, 3, 4, 5.**

---

## Screen 1 — Step workspace, desktop (the flagship)

> Dark-mode desktop web application, 1440x900, Chrome. A three-column interactive coding lesson for a complete beginner, in the style of freeCodeCamp: a small numbered step, real code, and a live preview side by side. It looks like a well-art-directed game, not an edtech dashboard.
>
> Colors: near-black canvas `#0A0C10`, panels `#12161C`, raised `#1A2029`, hairline borders `#242C36`, primary text `#F2F5F8`, secondary `#96A1AF`. Energy accent Voltage orange `#FF6A1F`, reward accent Acid lime `#C6F24E`, failure Strike red `#FF3B5C`, rare Plasma cyan `#3DE1FF`, legendary Gold `#FFC93D`. Clash Display for headings and numbers, Satoshi for text, JetBrains Mono for all code and counters. No purple, no emoji, no AI gradients.
>
> **Top HUD, 56px, panel surface with a 1px bottom rule, always visible.** Left: a small wordmark, then a mono breadcrumb `Stage 1 / Make a webpage`. Center-right, a row of live stats each with an icon, a mono number, and a tiny uppercase label beneath: an orange flame with `12` and "STREAK"; an Acid XP bar 180px wide, 6px tall, filled 70% with a glowing leading edge, showing `2,340 XP` and a circular level badge reading `7`; a Plasma league plate reading "SILVER III". Far right: a mono `⌘K` chip and a 30px circular avatar with a Gold ring.
>
> Below the HUD, three columns divided by 1px `#242C36` rules with small draggable handles.
>
> **Left column, 26%, instruction rail, canvas background.** At top a mono 13px Voltage line `STEP 12 OF 87` beside a thin segmented progress bar. Then the task in 18px Satoshi in plain simple language: "Make the words big. Change 16 to 40." Large, high contrast, easy to read. Directly beside it a 32px circular Voltage-outlined speaker button for read aloud. Below the task, a small pill toggle with two options, "Simple" active in Voltage and "Standard" inactive. Then an 11px uppercase Ash label "WHAT TO CHECK", and a checklist of three rows always visible before running: row one has an Acid check icon and the text "The page has a title" with a struck-through look; rows two and three have hollow `#242C36` circles and the texts "The words are 40 pixels" and "The color is blue". At the rail foot a ghost outline button reading "Show a hint".
>
> **Center column, 37%, editor, panel surface.** A mono file tab strip: `index.html` active in `#F2F5F8` with a 2px Voltage underline, `styles.css` inactive. Below, line numbers in an Ash gutter separated by a 1px rule, then eight lines of monospace HTML and CSS at 14px. Line 5 is the active line with a raised `#1A2029` highlight and a visible Voltage text cursor. One value on line 5, the number `16`, is wrapped in a Voltage-outlined highlight box marking it as the thing to change. Syntax colors are muted with Acid for values and Plasma for tag names.
>
> **Right column, 37%, live preview, white surface inside a panel frame.** An 11px uppercase Ash label "YOUR PAGE" at the top with a small Plasma live dot. Below, an actual rendered web page result on a white background: a heading in dark text reading "My Pet Shop" at a small size, a paragraph below it, and a simple colored box. This is the learner's real output, and it looks like a plain webpage, not a mockup.
>
> **Bottom action bar, spanning the center and right columns, 88px, raised panel with a 1px top rule.** On the left, a combo meter: a mono 30px Voltage `x2` with a scale-punch look, and a thin draining timer bar beneath. Center-left, a 52px Voltage `#FF6A1F` button with near-black bold label "RUN IT" and a mono `⌘⏎` chip inside its right edge, with a soft orange glow at 30%. To its right, two resolved test rows already showing: one with an Acid check, the mono name `title-exists`, and the word "Passed"; one with a hollow circle, the mono name `font-size-40`, and the word "Waiting". On the far right, a small Acid `+40 XP` chip.
>
> Every status uses both an icon and a word, never color alone. No overlapping elements. No three-equal-card rows. No spinner.

---

## Screen 2 — Step passed, the juice payoff, desktop

> Dark-mode desktop web application, 1440x900. The same three-column coding step the instant all tests pass. This is the most rewarding moment in the product and it should look loud, physical, and earned.
>
> Same palette and fonts as before: `#0A0C10` canvas, `#12161C` panels, `#1A2029` raised, `#242C36` hairlines, `#F2F5F8` text, `#96A1AF` secondary, Voltage `#FF6A1F`, Acid `#C6F24E`, Strike `#FF3B5C`, Gold `#FFC93D`. Clash Display, Satoshi, JetBrains Mono.
>
> The three-column layout and the HUD remain fully visible. Nothing is covered by a modal.
>
> **In the instruction rail,** all three checklist rows now carry Acid check icons with their text struck through, and a large Acid heading in 26px Clash Display reads "STEP CLEAR". Beneath it, a 15px Ash line "Next: give the box a color."
>
> **In the preview column,** the rendered page now shows the heading much larger and in blue, visibly correct. A thin Acid border pulses once around the preview frame, showing the change landed.
>
> **In the action bar,** the celebration: the combo meter has climbed to a mono 36px Voltage `x3` with a bright glow and a visible scale-punch. Around it, a scatter of 14 small Acid and Voltage particle dots rising and fading, drawn as simple small circles at varying opacity, not a canvas effect. The XP bar in the HUD has surged, its Acid leading edge glowing brightly, with a floating mono `+120 XP` label in Acid rising above it mid-animation, and the total mid-count-up reading `2,4` with trailing digits blurred to suggest counting. Beside the combo, a small Gold chip reading "5 IN A ROW" with a subtle burst.
>
> The Run button has become a 52px Acid `#C6F24E` button with a near-black bold label "NEXT STEP" and a mono `⏎` chip, glowing softly. It is the one obviously glowing thing to touch next.
>
> All five test rows are shown resolved: five Acid check icons, mono test names, and the word "Passed" on each.
>
> **Top-right corner, a toast** sliding in: a raised panel card with a 2px Plasma border and a soft Plasma glow, holding a hexagonal badge illustration on the left, then "FIRST STYLE" in 16px Clash Display, "You changed how something looks." in 13px Ash, and a mono uppercase "RARE" label in Plasma at the bottom.
>
> No modal, no full-screen block, no confetti covering the code, and the learner can still see and edit their work.

---

## Screen 3 — Tap-to-build step for absolute beginners, desktop

> Dark-mode desktop web application, 1440x900. The same coding workspace in beginner input mode, where the learner builds real code by tapping blocks instead of typing. Designed so someone who has never coded succeeds on their first try, while still showing genuine HTML that a professional would recognise.
>
> Same dark game palette: `#0A0C10`, `#12161C`, `#1A2029`, `#242C36`, `#F2F5F8`, `#96A1AF`, Voltage `#FF6A1F`, Acid `#C6F24E`, Plasma `#3DE1FF`. Clash Display, Satoshi, JetBrains Mono. Everything is one size larger than a normal app.
>
> The 56px HUD is unchanged with its flame streak, XP bar, level badge, and league plate.
>
> **Left column, 26%, instruction rail.** Mono Voltage `STEP 3 OF 24`. Then a very short task in 20px Satoshi: "Put a picture on the page." Beside it a 36px circular Voltage speaker button for read aloud, clearly larger than a normal icon button. Beneath the task, a simple illustrative diagram: a small white rectangle representing a page with a picture icon inside it, drawn in flat Plasma and Ash line art, no photograph. Then the checklist with two rows, each with a hollow circle, in 16px text: "The page has a picture" and "The picture has a name".
>
> **Center column, 37%, editor with a block tray.** The upper two thirds is a real code editor showing five lines of monospace HTML with line numbers. Line 4 is an empty slot rendered as a dashed 2px Voltage outlined rectangle spanning the line width, containing faint Ash placeholder text "tap a block".
>
> The lower third is the block tray: an 11px uppercase Ash label "BLOCKS", then six chunky code blocks arranged in a two-column grid. Each block is a raised `#1A2029` rounded rectangle, 56px tall, with a 2px border and monospace 14px text, plus a small colored dot on its left indicating its type. Blocks read `<img>`, `<p>`, `<h1>`, `src=""`, `alt=""`, `</div>`. The `<img>` block has a Voltage border and a soft glow, marking it as the correct next move, and shows a small mono `1` chip in its corner indicating its keyboard shortcut. The others have plain `#242C36` borders.
>
> Blocks are tappable and keyboard selectable. Nothing in this interface requires dragging.
>
> **Right column, 37%, live preview** on a white surface inside a panel frame, labelled "YOUR PAGE". It shows a plain rendered webpage with a heading reading "My Dog Buddy" and empty space below where the picture will appear, with a faint dashed placeholder outline.
>
> **Bottom action bar** spanning the center and right columns: a combo meter showing mono Voltage `x1`, a 56px Voltage "RUN IT" button with a glow, and two waiting test rows with hollow circles and the word "Waiting".
>
> Simple words only. No jargon. No emoji. High contrast throughout, minimum 18px text in the instruction rail.

---

## Screen 4 — Rank up takeover, desktop

> Dark-mode desktop web application, 1440x900. A full-screen celebration the instant a learner reaches a new rank. This is the single most spectacular moment in the entire product and should feel like a game, not a certificate.
>
> Canvas is deep `#0A0C10` with the three-column workspace faintly visible behind a heavy near-black scrim at 88% opacity. No blur on the scrim.
>
> A large radial light bloom in Gold `#FFC93D` emanating from the center at low opacity, fading to nothing by the edges. Behind it, faint diagonal Voltage `#FF6A1F` light rays.
>
> Center of the screen, stacked and vertically centered:
>
> - A small mono uppercase Ash line "RANK UP"
> - A large hexagonal rank plate, roughly 200px, with a Gold gradient fill, a 3px lighter Gold border, a strong Gold glow, and a flat geometric hammer-and-bracket emblem in near-black at its center. It sits at a slight scale-overshoot as though it just slammed into place. Small fragments of a previous grey hexagon scatter outward around it, mid-shatter
> - The rank name "BUILDER" in 72px Clash Display bold, near-white `#F2F5F8`, tight tracking
> - Beneath it, a 17px Satoshi Ash line in simple words: "You can build real pages now."
> - A row of three unlock chips, each a raised `#1A2029` pill with a 1px Plasma border and a small icon: "New editor theme", "Gold name effect", "Boss unlocked"
> - Around the whole composition, roughly 40 small particle dots in Gold, Voltage, and Acid at varying sizes and opacities, spreading outward
>
> Below the composition, a 52px Acid `#C6F24E` button with a near-black bold "CONTINUE" label and a mono `SPACE` chip, with a soft Acid glow.
>
> Bottom-right corner, a small plain Ash text link reading "Skip" with a mono `esc` chip beside it. The celebration must always be skippable.
>
> Clean and composed, not cluttered. No emoji, no purple, no stock imagery, no confetti sprites shaped like ribbons.

---

## Screen 5 — Home with quests, streak, and league, desktop

> Dark-mode desktop web application, 1440x900, signed in. The home screen of a gamified coding platform. It must make the learner want to start immediately and must be instantly clear to someone who has never coded.
>
> Palette: `#0A0C10` canvas, `#12161C` panels, `#1A2029` raised, `#242C36` hairlines, `#F2F5F8` text, `#96A1AF` secondary, Voltage `#FF6A1F`, Acid `#C6F24E`, Strike `#FF3B5C`, Plasma `#3DE1FF`, Gold `#FFC93D`. Clash Display, Satoshi, JetBrains Mono. No emoji, no purple, no mascot photo.
>
> The 56px HUD with flame streak `12`, XP bar and level badge `7`, league plate "SILVER III", `⌘K` chip, and Gold-ringed avatar.
>
> Content contained to 1400px in an asymmetric two-column layout, 62% left and 34% right with a gutter.
>
> **Left column.**
>
> The hero card: a large raised `#1A2029` card with a 1px `#242C36` border, 16px radius, and a subtle Voltage edge glow along its left side. Inside: an 11px uppercase Voltage eyebrow "KEEP GOING", a 32px Clash Display title "Make a webpage", a mono Ash line `Step 12 of 87`, a thin segmented progress bar filled 14% in Acid, then a `#0A0C10` inset block showing three lines of the learner's real monospace code with a Voltage cursor mid-line. At the card foot, a 56px Voltage "CONTINUE" button with a glow and a mono `⏎` chip.
>
> Below the hero, an 11px uppercase Ash label "TODAY'S QUESTS", then three quest cards in a row, each a raised panel with a 1px border: a circular progress ring in Acid at its top left showing partial fill, a 16px title in simple words ("Pass 10 tests", "Finish with no hints", "Fix 3 broken tests"), a mono progress line like `7 / 10`, and a small Gold chip showing the reward `+150 XP`. The third card is complete, tinted with an Acid border and a check.
>
> Beneath the quests, a seven-day login strip: seven small squares in a row, days 1 to 4 filled Acid with checks, day 5 outlined Voltage and glowing as today's claimable, days 6 and 7 dim `#242C36`, and day 7 rendered larger as a Gold-lidded treasure chest with a glow.
>
> **Right column, offset lower.**
>
> A league panel: an 11px uppercase Ash label "SILVER III", a mono Ash line "Ends in 2d 14h", then eight standing rows. Each row has a rank number in mono, a small SVG initial avatar, a display handle, and a mono XP value right-aligned. Above row 4 sits a thin Acid divider labelled in mono uppercase "PROMOTION". Below row 6 sits a Strike divider labelled "DEMOTION". The learner's own row sits at position 5, on raised `#1A2029` with a 2px Voltage left border and a soft glow, handle reading "renz_builds". Handles are pseudonymous, no real names, no photos.
>
> Below it a compact streak panel: a large animated-looking Voltage flame illustration, a mono 40px `12` in Clash Display, the word "DAY STREAK", and beneath it three small crystal shield icons in Plasma with a mono `2 shields` label.
>
> No three-equal-card feature row. No spinner. Every status carries an icon and a word.

---

## Screen 6 — Boss challenge, desktop

> Dark-mode desktop web application, 1440x900. A timed end-of-stage boss challenge where the learner must pass all tests with no hints. Visually distinct from normal lessons: tense, red, high stakes.
>
> Palette shifts toward danger: canvas deepens to `#07080B`, panels `#12161C`, raised `#1A2029`, hairlines `#242C36`, text `#F2F5F8`, secondary `#96A1AF`. Strike red `#FF3B5C` dominates, Voltage `#FF6A1F` on the action, Acid `#C6F24E` for passed tests only. Clash Display, Satoshi, JetBrains Mono.
>
> A Strike red vignette darkens all four screen edges, heavier at the corners, as though the screen is breathing.
>
> The 56px HUD remains but its background is tinted very slightly red, and the combo meter is prominent.
>
> **Top center, the boss header, spanning the full width below the HUD, 96px on a `#12161C` panel with a 1px Strike bottom rule.** On the left, a hexagonal Strike-bordered plate with a flat geometric skull-and-brackets emblem, glowing red. Beside it, "BOSS: ARRAYS" in 28px Clash Display near-white, and a 14px Ash line in simple words "Pass all 6. No hints." Center, a large mono countdown `04:38` in 40px, Strike colored, with tabular figures. Right, a segmented boss health bar: ten segments, four already depleted and rendered as dark empty slots, six remaining filled Strike red with a glow, and a mono label `6 LEFT`.
>
> Below, a two-column layout, 46% editor and 54% preview, with no instruction rail, because there are no hints in a boss.
>
> **Left, editor** on a panel surface with a 1px Strike-tinted border: a mono file tab `challenge.js`, line numbers in an Ash gutter, twelve lines of monospace JavaScript, an active line with a raised highlight and a Voltage cursor.
>
> **Right, results,** on a panel surface. An 11px uppercase Ash label "TESTS", then six rows separated by 1px rules. Four rows carry Acid check icons, mono test names, and the word "Passed". Two rows carry hollow `#242C36` circles, mono names, and the word "Waiting". One previously failed row shows a Strike cross and the word "Failed" with a mono line reference `arrays.test.js:22`.
>
> **Bottom action bar** spanning both columns on raised panel: a combo meter showing a large mono Voltage `x4` with a bright glow and a draining timer, then a 56px Strike red `#FF3B5C` button with near-black bold label "RUN IT" and a mono `⌘⏎` chip, glowing red. On the right, a small Ash text link "Give up" that is deliberately quiet and not styled as a button.
>
> No hint button anywhere on this screen. No emoji. Status always carries an icon and a word.

---

## Screen 7 — Skill map, desktop

> Dark-mode desktop web application, 1440x900. A game-style skill map showing the learner's path through a coding curriculum, with unlocked nodes glowing and locked ones dim. It should look like a well-designed game progression screen, not a bulleted list.
>
> Palette: `#0A0C10` canvas, `#12161C` panels, `#1A2029` raised, `#242C36` hairlines and locked elements, `#F2F5F8` text, `#96A1AF` secondary, Voltage `#FF6A1F` for current, Acid `#C6F24E` for complete, Strike `#FF3B5C` for boss nodes, Plasma `#3DE1FF` for bonus, Gold `#FFC93D` for chests. Clash Display, Satoshi, JetBrains Mono.
>
> The 56px HUD across the top, unchanged.
>
> A faint dot-grid texture across the canvas at very low opacity, suggesting a game board without being busy.
>
> The map itself is a **vertical winding path** running from the bottom of the screen upward, drawn as a 3px connector line. The completed lower portion is solid Acid with a soft glow; the upper portion is dim `#242C36` dashed. Nodes sit along the path, alternating slightly left and right of center to create a winding shape, contained within 900px of the screen width.
>
> Node types, from the bottom up:
> - Three **completed** nodes: 64px circles filled `#12161C` with a 3px Acid border, a soft Acid glow, an Acid check glyph inside, and a label beneath in 15px near-white with a mono Ash line showing `+320 XP`
> - One **chest** node between them: a 56px Gold-lidded treasure chest illustration with a Gold glow and a mono "CLAIM" chip
> - One **current** node: an 88px circle, larger than the others, filled `#1A2029` with a 4px Voltage border, a strong Voltage glow, a play glyph inside, and a pulsing ring around it. Its label beneath is 18px near-white "Make a webpage" with a mono Voltage line `Step 12 of 87`
> - One **boss** node: a 76px hexagon with a 3px Strike border, a red glow, a flat skull-and-brackets emblem, labelled "BOSS: Pages"
> - Three **locked** nodes above: 64px circles filled `#0A0C10` with a 2px `#242C36` border, a lock glyph in Ash, greyed labels, and a mono Ash requirement line "Finish the boss first"
> - One **bonus** node offset to the side, connected by a short dashed branch: a 56px diamond with a 2px Plasma border and glow, labelled "Bonus: Colors"
>
> **Right edge, a fixed 300px panel** on `#12161C` with a 1px left rule: an 11px uppercase Ash label "STAGE 1", a 24px Clash Display title "Make a webpage", a segmented progress bar, mono stats rows showing `4 / 12 nodes`, `1,340 XP earned`, `2 chests left`, and a 52px Voltage "CONTINUE" button with a glow.
>
> No emoji. Locked nodes state their real requirement in plain words. Every node carries a glyph, never color alone.

---

## Screen 8 — Failure state and honest feedback, desktop

> Dark-mode desktop web application, 1440x900. The three-column coding workspace right after the learner ran their code and two tests failed. Failure must read as useful information a learner wants, never as punishment, and the explanation must be understandable by someone who has never coded.
>
> Palette: `#0A0C10`, `#12161C`, `#1A2029`, `#242C36`, `#F2F5F8`, `#96A1AF`, Voltage `#FF6A1F`, Acid `#C6F24E`, Strike `#FF3B5C`. Clash Display, Satoshi, JetBrains Mono.
>
> The full three-column layout and HUD remain visible and usable. Nothing is dimmed, nothing is blocked, no modal appears.
>
> **Left instruction rail:** the checklist now shows one Acid check with struck-through text "The page has a title", and two rows with Strike cross icons and the texts "The words are 40 pixels" and "The color is blue". Below the checklist, a raised `#1A2029` explanation card with a 2px Strike left border containing, in 17px Satoshi simple words: "Your words are still 16 pixels. Change the 16 on line 5." Beside it, a 32px circular speaker button for read aloud. Beneath, a ghost outline button "Show a hint" and a quiet Ash text link "Reset this step".
>
> **Center editor:** line 5 carries a subtle Strike-tinted row background and a small Strike marker in the gutter. The value `16` on that line is wrapped in a Strike-outlined highlight box. Everything remains fully editable with a visible cursor.
>
> **Right preview:** the white rendered page shows the *wrong* result plainly, with the heading still small and black rather than large and blue. A small mono Ash caption beneath the preview reads "This is what your code does right now." Seeing the wrong output is part of the lesson, so it is presented calmly and never hidden.
>
> **Bottom action bar:** the combo meter shows a shattered state, a dim mono `x1` in Ash with four small grey fragment shards scattering away from it, and a small mono Ash label "COMBO LOST". No scolding words anywhere. The Run button remains a full 52px Voltage "RUN IT" with a glow and a `⌘⏎` chip, immediately pressable. Two test rows show Strike crosses with mono names and the word "Failed"; one shows an Acid check with "Passed". One failed row is expanded inline showing a two-column mono comparison on a `#0A0C10` inset: left labelled "SHOULD BE" with `40px`, right labelled "YOURS" with `16px`, split by a thin vertical rule.
>
> No red banner across the screen, no sad character, no shake, no lives lost, no blocked retry. Every status carries an icon and a word.

---

## Screen 9 — Mobile companion, 390x844

> Dark-mode mobile web browser screen, 390x844, Chrome on Android. The responsive companion view of a gamified coding web application. It is a browser page, not a native app, and it does not pretend to be one. Tap-to-build steps are fully playable here because they need no keyboard.
>
> Palette: `#0A0C10` canvas, `#12161C` panels, `#1A2029` raised, `#242C36` hairlines, `#F2F5F8` text, `#96A1AF` secondary, Voltage `#FF6A1F`, Acid `#C6F24E`, Plasma `#3DE1FF`. Clash Display, Satoshi, JetBrains Mono. No bottom tab bar, no pull-to-refresh, no install banner, no hamburger, no emoji.
>
> **Compressed 52px HUD** with a 1px bottom rule: a back chevron, a small Voltage flame with mono `12`, a 90px Acid XP bar with a level badge `7`, and a 26px avatar.
>
> Below it, a **segmented switch** spanning the width, 44px tall, on raised panel with three options in 14px: "Task", "Code" active with a Voltage fill and near-black text, and "Preview". This keeps all three panes one tap apart.
>
> **Main area, showing the Code pane.** A mono Voltage line `STEP 3 OF 24` with a thin segmented progress bar. Then a compact task restatement in 17px Satoshi simple words, "Put a picture on the page.", with a 32px circular speaker button beside it.
>
> Then a code editor block on `#12161C` with line numbers and five lines of 13px monospace HTML, horizontally scrollable within its own container only. Line 4 is a dashed 2px Voltage outlined empty slot with faint placeholder text "tap a block".
>
> Below, an 11px uppercase Ash label "BLOCKS", then a two-column grid of four chunky tappable code blocks, each a raised `#1A2029` rounded rectangle at least 56px tall with a 2px border, monospace 14px text, and a colored type dot: `<img>` with a Voltage border and glow marking it correct, plus `<p>`, `<h1>`, and `src=""` with plain borders.
>
> Then a compact live preview strip: an 11px uppercase Ash label "YOUR PAGE" and a white rendered mini page showing a heading "My Dog Buddy" and a dashed placeholder box.
>
> Beneath, a calm capability card on raised panel with a 1px `#242C36` border and a small monitor glyph: 15px text "Typing lessons need a bigger screen", 13px Ash "Blocks work great on your phone. Free typing, projects, and publishing need a laptop.", and a plain Ash text link "Email me this link".
>
> **Fixed at the bottom in the thumb zone,** a full-width 56px Voltage "RUN IT" button with a glow, and above it a slim row showing a mono `x2` combo chip and two waiting test dots. All touch targets at least 44px.

---

## Screen 10 — Public landing page, desktop

> Dark-mode desktop marketing page, 1440x900, logged out. The entry point for a free platform that teaches complete beginners to build real software by writing real code. High energy, game-like, and instantly clear to a non-technical visitor.
>
> Palette: `#0A0C10` canvas, `#12161C` panels, `#1A2029` raised, `#242C36` hairlines, `#F2F5F8` text, `#96A1AF` secondary, Voltage `#FF6A1F`, Acid `#C6F24E`, Plasma `#3DE1FF`, Gold `#FFC93D`. Clash Display for headlines, Satoshi for text, JetBrains Mono for code. No purple, no AI gradients, no emoji, no stock photos of people at laptops, no mascot.
>
> A 64px top bar on canvas with a 1px bottom rule: wordmark left in 16px Clash Display; three plain 14px Ash links reading Curriculum, Projects, Open source; a plain "Sign in" text link right.
>
> **Hero, asymmetric and left-aligned, never centered.** Left 50%: a 60px Clash Display headline in near-white with tight tracking reading "Write real code. See it work." Below, a 19px Satoshi Ash paragraph of two short sentences in plain words, no jargon. Then a single 56px Voltage `#FF6A1F` button with near-black bold "START FREE" and an orange glow, and beside it a plain 15px Ash text link "See how it works". Beneath, a 14px Ash line "Free forever. No experience needed. No card."
>
> Right 46%, offset lower to create asymmetry: a product screenshot rendered as a raised `#1A2029` panel with a 1px `#242C36` border, 12px radius, and a soft Voltage glow along its edge. It shows the real three-column workspace in miniature: an instruction rail with a step counter and a checklist, a monospace editor, and a white live preview pane. Over its bottom-right corner, a small floating Acid chip reading `+120 XP` and a mono Voltage `x3` combo chip, mid-animation.
>
> **A proof band** below the fold on a `#12161C` panel with 1px top and bottom rules, containing four mono statistics separated by thin vertical rules, each with a 22px Clash Display near-white value and an 11px uppercase Ash label: `87 steps` / "in stage one", `4 projects` / "you keep forever", `Zero` / "experience needed", `0 cost` / "every lesson".
>
> **Then a two-column zig-zag section, never three equal cards.** Row one: left 48% holds a 30px Clash Display heading "You code from minute one" and a short Ash paragraph; right 48%, offset lower, holds a `#12161C` inset with three lines of monospace code, one value highlighted in a Voltage box, and beside it a small white preview square showing the rendered result. Row two reverses: left holds a small skill-map fragment showing three glowing Acid nodes and a Voltage current node connected by a path; right holds a 30px heading "Level up as you learn" and a paragraph.
>
> Footer on canvas with a 1px top rule: four columns of plain 14px Ash links under 11px uppercase labels, and a bottom row with a mono 12px Ash line "Curriculum is open source · CC BY-SA".
>
> Copy uses short plain sentences with no jargon at all. No "Elevate", "Seamless", "Unleash", "Journey", or "Next-Gen". No testimonial carousel, no logo wall, no countdown, no chat bubble, no cookie banner covering the page, no bouncing chevron.

# CodeDaddy Full Rebrand — Google Stitch Prompt

Paste everything below into Google Stitch.

---

Design a complete, connected, desktop-first responsive web application for **CodeDaddy**. This is a full greenfield rebrand. Do not reuse, refine, or take visual inspiration from the existing product interface. Use existing material only to understand product facts and workflows. You own the new visual identity, layout system, typography, color palette, components, illustrations, and motion language.

## Product truth

CodeDaddy is an open-source learning platform that teaches complete beginners to build real web software by writing real code. It is free forever through the full-stack path. The first launch focuses on the complete front-end path: HTML, CSS, Tailwind CSS, JavaScript, and React. Learners progress through many small projects and small steps, rather than watching videos or answering a quiz.

The audience may not know what a browser tab is. Every interaction must feel calm, clear, and encouraging without talking down to them. The product is Philippines-first: examples should naturally include a sari-sari store, jeepney route, palengke stall, barangay notice, or turo-turo menu. All learner-facing copy must be patient, professional English. When a local word appears for the first time, include a short plain-English gloss.

The essential learning loop is: read one small task, change real code, see the result in a live preview, run deterministic checks, understand feedback, and continue. The application is not a quiz app, an online school portal, a social network, or a generic SaaS dashboard.

## Brand and design freedom

Create a distinct, ownable identity for CodeDaddy from scratch. It should feel credible, modern, friendly, energetic when a learner makes real progress, and calm enough for hours of focused coding. Make it feel designed for a real education product, not a template.

Do not inherit the existing dark-neon visual system, existing palette, typography, layout, or game-art direction. Do not clone freeCodeCamp, Duolingo, VS Code, GitHub, or any other familiar product. Do not use a literal father character, a "daddy" mascot, sexualized imagery, or a joke-based interpretation of the name.

You may choose light, dark, or adaptive themes, but the coding workspace must have excellent readable contrast and a stable visual hierarchy. Use imagery or illustration only when it teaches, or makes Filipino project context clearer. Avoid generic stock photos, abstract gradient blobs, glassmorphism, dashboard card grids, and decorative motion that does not explain state.

## Product rules that the design must respect

- This is a responsive browser web app, not a native iOS or Android app. Never create app-store surfaces, a mobile tab bar that implies a native app, or device-native chrome.
- Accounts are required before starting: GitHub OAuth is primary and email magic link is the alternative. There are no passwords, password resets, phone login, or guest learning path.
- A new concept is taught in four connected representations: a plain definition, a practical analogy, a live visual or small diagram, and immediate proof in the learner's preview.
- The central workspace uses real code and a real text editor. Do not substitute block coding, a drag-and-drop canvas, multiple choice, or an AI code generator. Early tap-to-build blocks may support the real editor, but never replace it.
- Authored progressive hints are the only help. There is no AI tutor, chatbot, community, comments, direct messages, instructor flow, human review, leaderboard, league, boss fight, loot chest, or quiz about learning styles.
- Progress rewards are ethical and secondary: XP, a rank, a streak, daily solo challenge, and spaced review may reinforce progress, but must never guilt, shame, create fake urgency, punish missed days, or block a retry. There are no leagues or competitive rankings.
- Completing a guided project creates a named milestone and a shareable artifact. It is not a gate or a certificate.
- One Front-End Development Certificate of Completion is earned only after all five front-end courses plus five independent capstone projects with automated tests. It is not accreditation or a claim of professional competency.
- Future paid specialisations are out of scope. Do not design pricing, checkout, subscriptions, payment, entitlement, or donation-provider flows.
- Do not invent testimonials, completion rates, learner counts, employer logos, partner logos, accreditation, rankings, or performance claims.

## Design constraints

- Default desktop canvas: 1440 x 900. The lesson workspace is the flagship screen and must work beautifully at this size.
- Create responsive browser layouts for 768px tablet and 390px mobile. On phone, prioritize navigation, progress, review, and tap-to-build lessons; clearly explain when full free-typing or capstone work needs a larger screen. Do not pretend a constrained phone editor is equal to a desktop workspace.
- Design for a 4 GB shared laptop and 3 Mbps metered connection. Keep visual treatment lightweight: no canvas, WebGL, heavy video, blur effects, or ornamental particle systems.
- Any motion should use transform and opacity, teach a state change, and collapse to an informative crossfade under reduced motion.
- Meet WCAG 2.2 AA. Minimum 44px touch targets. Do not communicate status with color alone: every pass, fail, warning, lock, rank, and rarity needs both a clear icon and a text label.
- Never make a modal, toast, reward, or animation hide the learner's code or prevent an immediate retry.
- Protect learner trust in the UI: communicate saved state clearly, preserve unsaved work across refreshes, and use plain language for disconnected, offline, or unavailable states.

## Information architecture and required screens

Generate the following coherent screens and states as one design system and connected prototype. Start with the three key desktop screens: public landing, learner home, and active lesson workspace. Then design the remaining screens using the selected direction.

### Public entry and account

1. **Public landing page, logged out**
   - Make the promise immediately clear: complete beginners write real code and see it work.
   - Show the learning loop with an authentic product glimpse, not a fake analytics dashboard.
   - Explain the free front-end path, Philippines-first project examples, open-source commitment, and how progress works.
   - Include a calm primary action to create an account, secondary sign-in, curriculum preview, an honest open-source/about area, and footer navigation.

2. **Create account / sign in**
   - A focused, low-friction entry screen with GitHub OAuth as the primary action and email magic link as the alternative.
   - Explain why GitHub will later help learners publish their work.
   - State plainly: no password is needed. Include accessible loading, failed, and email-link-sent states.

3. **First-run welcome and learner setup**
   - A short, practical orientation after authentication. Set expectations about real code, small steps, local saved work, and desktop-first coding.
   - Do not ask for a learning-style quiz. Do not require a long profile form. Let the learner begin the first HTML project quickly.

### Learning home and curriculum

4. **Learner home**
   - Primary next action: continue the exact project and step in progress.
   - Show a clear, non-competitive overview of the learner's current rank, XP, streak, daily solo challenge, due spaced-review items, and saved projects.
   - Use meaningful hierarchy instead of a grid of equal cards. Include useful empty and new-learner states.

5. **Full curriculum map**
   - Show the sequence HTML, CSS, Tailwind CSS, JavaScript, and React, plus future post-launch areas without making them look available now.
   - Explain course locks with real requirements. Show completion, current position, and the next course in a scannable hierarchy.
   - The core content structure is Course → Project → Step. Make the scale of a long learning path understandable without exposing overwhelming raw step counts.

6. **Course overview and project trail**
   - A page for one course, for example Learn HTML by Building a Sari-Sari Store Page.
   - Show a strong course purpose, project trail, current project, concise expected outcome, progress, concept coverage, and project-completion milestones.
   - Clearly distinguish available, current, completed, and locked projects with icons and words. Projects do not gate one another inside a course.

7. **Solo daily challenge**
   - One small optional, rotating practice goal tied to concepts already learned.
   - Make participation optional and calm. Show the learner what they will practice, estimated time, reward if completed, and a plain skip/return path.
   - No countdown pressure, no leaderboard, no public comparison.

### Lesson workspace: the flagship experience

8. **Active lesson workspace, desktop starting state**
   - This is the most important screen. Use a purposeful multi-pane layout: task and learning guidance, a real code editor with file tabs, a live preview, and visible deterministic checks.
   - Keep the next small action obvious. Show project name, step context, saved state, progress within the current project, and an unobtrusive route back to the course.
   - Use a realistic example such as adding a price list or heading to a sari-sari store page.
   - The learner must be able to read instructions, edit code, view the preview, run checks, and access a progressive hint without losing orientation.

9. **Early tap-to-build lesson workspace**
   - A variation for someone who has never typed code. Show the same real code editor and preview, with a small set of tap-to-build code pieces that insert safely into the correct blank location.
   - Make keyboard and screen-reader access first class. Do not require dragging.

10. **Lesson check results: helpful failure state**
   - Keep the workspace fully usable. Show passed and failed checks with icon, word, and precise patient feedback explaining what to inspect, change, and try again.
   - Point to the relevant code and visibly show the current preview result. Failure is information, not punishment.

11. **Lesson check results: success and next-step state**
   - Make a passed step feel earned without taking over the screen. Update progress and XP clearly, show all resolved checks, preserve the visible code and preview, and make the next step primary.
   - Include a distinct but skippable rank-up state for the rare moment a learner reaches a new rank. It should feel celebratory without confetti, noise, or a full-screen blocker.

12. **Progressive hints and concept learning panel**
   - Design a side panel or inline expansion for progressive hints that never gives away the whole solution at the first level.
   - Design a concept card that visibly connects: plain definition, practical analogy, live visual or compact accessible diagram, and immediate proof in the learner's own preview.
   - Use examples that remove jargon and explain local terms when needed.

13. **Responsive lesson workspace**
   - A 390px browser layout that preserves orientation through clear switching or stacking among task, code, preview, and checks.
   - Support tap-to-build effectively. Where free typing needs a laptop, use a respectful, action-oriented larger-screen message and a way to resume the same link later.

### Retention, projects, and proof of work

14. **Spaced review session**
   - A quiet recall-first review flow for concepts learned across all courses.
   - Show the prompt before the answer, then reveal definition, analogy, visual/diagram, and proof. Let the learner say “Again” or “Got it” with clear consequences, no shame.
   - Include empty, caught-up, and due-today states.

15. **Project portfolio / guided-project tracker**
   - A learner-owned gallery of projects produced throughout courses. Show each project's status, artifact preview, course, and the next useful action.
   - Preserve milestones and visibility of finished work. Do not use social likes, public feeds, or follower counts.

16. **Guided project link preparation**
   - A completed-course flow for adding a GitHub repository link and a live deployment link.
   - Include precise inline validation and friendly error states. Make ownership and privacy clear.
   - Include an honest disconnected / draft-only state for phases before backend connection. Never present a saved draft as a verified submission.

17. **Capstone hub**
   - Show five independent capstone project specifications that unlock after the five guided front-end courses.
   - Emphasize independent work: requirements, acceptance checks, recommended repository and deployment links, and progress across five projects.
   - Avoid instructor review, a defense, peer feedback, or social comparison.

18. **Single capstone specification and submission status**
   - A focused capstone screen with the brief, required behaviour, automated checks, repository and live URL fields, and transparent submitted / needs-attention / verified states.
   - It must feel like a real project brief, not another guided tutorial.

19. **Certificate eligibility and issued certificate**
   - First state: a transparent checklist of all five courses and five capstones, with a clear explanation of what remains.
   - Success state: a shareable Front-End Development Certificate of Completion with learner name, issue date, verification URL, linked portfolio evidence, and a plain statement that it is not accreditation or a competency certification.
   - Do not create a ceremonial “graduation” experience that overstates what browser-side learning proves.

20. **Public certificate verification page**
   - A simple, trustworthy public page for a certificate ID or verification URL. Show the minimum verifiable facts and portfolio links, with clear invalid or revoked states.

21. **Account and preferences**
   - Profile basics, connected GitHub account, email magic-link address, local-versus-cloud save status, export or privacy controls, and an opt-in weekly email preference.
   - Do not include password controls, teams, organizations, classroom roles, billing, or social profiles.

### System states

22. **Design reusable empty, loading, locked, saved, offline, error, and not-found states** for the major pages. They must be plain, useful, and consistent. Do not use a spinner as the only feedback, color as the only status, or humorous error copy that confuses a beginner.

## Prototype flows to connect

Create clickable flows for:

1. Landing → account creation → welcome → learner home → curriculum → course → active lesson → failed check → hint/concept → successful check → project milestone.
2. Learner home → spaced review → reveal answer → rate confidence → caught-up state.
3. Learner home → completed guided project → link preparation → saved draft / validation feedback.
4. Curriculum completion → capstone hub → capstone brief → submission status → certificate eligibility → issued certificate → public verification.
5. Desktop lesson workspace → responsive mobile browser view → return-to-desktop continuation without losing the learner’s place.

## Deliverables

Produce high-fidelity desktop-first screens, tablet and mobile responsive variants, a concise brand-system page, component and state inventory, and a connected clickable prototype. Document the key responsive rules, typography scale, color semantics, interaction states, and reduced-motion behaviour so an engineering team can implement the chosen direction faithfully.

Prioritize the lesson workspace, learner home, and public landing page when presenting the first design direction. The result should make a complete beginner feel: “I understand what to do next, I can safely try it, and I am building something real.”


# Academy — learning kernel

Release 1 from `ARCHITECTURE_PLAN_V2.md`: one lesson, done properly. Next.js 16, React 19, Tailwind v4.

```bash
npm --prefix apps/web run dev
```

Open http://localhost:3000.

## What is here

A working freeCodeCamp-style step workspace for the lesson **Make a webpage** — ten steps that build a real HTML/CSS page, with tap-to-build blocks, live preview, deterministic grading, and the full game layer (XP, combo, streak, ranks).

| Path | Role |
|---|---|
| `lib/lesson-ir.ts` | The lesson intermediate representation. Closed variant types, so authored content can never smuggle executable code into the runtime |
| `lib/grading.ts` | Deterministic assertions run against the learner's rendered output |
| `content/make-a-webpage.ts` | The lesson itself, as data |
| `components/workspace.tsx` | Three-column workspace, session state, run loop |
| `components/code-editor.tsx` | Textarea + syntax highlight layer |
| `components/preview.tsx` | The learner's live output |
| `components/block-tray.tsx` | Tap-to-build input |
| `components/hud.tsx`, `juice.tsx`, `rank-up.tsx` | The game layer |

## Two iframes, on purpose

This is the security core of the product and the easiest thing to break by accident.

| Frame | Sandbox | Why |
|---|---|---|
| **Preview** (`preview.tsx`) | `allow-scripts` | Learner code runs. It never gets `allow-same-origin`, because the two flags together let sandboxed content remove its own sandbox |
| **Grader** (`grading.ts`) | `allow-same-origin` | The parent reads computed styles. Script execution is off, so the same-origin grant cannot be used to escape |

Never add `allow-same-origin` to the preview frame.

Grading is currently client-side and is therefore **formative only**. Per `ARCHITECTURE_AUDIT_REPORT.md` P0-01, a client-reported pass can be forged and must never back a credential. Certificate evidence needs the platform-controlled CI verifier described in `ARCHITECTURE_PLAN_V2.md` section 4.2.

## Two things that must never regress

Both were real bugs found during the first build, and both have the same root cause.

**`requestAnimationFrame` is not a guarantee.** A backgrounded or non-compositing tab never fires it. Relying on it left grading hung in "RUNNING…" forever and left the XP counter showing a stale number rather than merely skipping its animation. Both now race rAF against a timer. Any new animation that carries a *value* rather than only motion needs the same guard.

**Copy is rendered, not baked.** Failure messages carry both registers and are translated at render time, so hitting Simple re-translates everything already on screen. A learner who switches reading level because they did not understand the error must not be left staring at the wording they could not read.

## Deliberate constraints

- Animation is `transform`/`opacity` only; no canvas, no animation library. Glow is a static `box-shadow`. The target machine is a shared 4 GB laptop
- Particle scatter is derived from the index, not `Math.random`, so rendering stays pure
- `prefers-reduced-motion` collapses every celebration to a crossfade with no loss of information
- Status never uses colour alone; every state carries a glyph and a word
- The editor is a real `<textarea>`, so keyboard, selection, and screen reader support come for free
- Session state is one object, so a reload can never restore progress without its matching code

## Not built yet

Skill map, leagues, quests, chests, boss challenges, achievements, command palette, landing page, and the public logged-out lesson page are specified in `design/STITCH_PROMPTS.md` but not implemented. There is no backend, no auth, and no persistence beyond `localStorage`.

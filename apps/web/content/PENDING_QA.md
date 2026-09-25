# Pending browser QA

No frontend browser-QA items remain as of 2026-08-29.

## Program C delivery QA - 2026-09-24

**SQL and NoSQL (all Qwen batches).** Real-Chrome `/harness`: all 750 SQL
steps and all 250 NoSQL steps, 0 errors, 0 warnings. A 30-step workspace
sample (16 SQL, 14 NoSQL, at 1440px and 360px) confirmed the starting code
fails, the solution passes, the code survives a reload, nothing overflows,
and the console stays clean. The workspace flow was sampled, not run on all
1,000 steps; the harness covers every step with the same grader.

**Command Line and Git (180 steps, PLAN decision 43).**
- `check:content` replays every step's commands in a sealed folder with the
  same checker the learner downloads: 180 steps, fail before and pass after.
- The same 180 steps were run again as a learner would: the checker was
  downloaded from `/downloads/codedaddy-check.mjs` (65 KB raw, 8.6 KB gzip),
  and each command ran in real Git Bash with a normal Windows Git setup
  (`core.autocrlf` on). No step passed before its command or failed after it.
- Real-Chrome `/harness?course=cli-git`: 180 steps, 0 errors, 0 warnings.
- Workspace: a real report for the merge step showed "REPORTED CLEAR" and
  "Practice only". XP stayed 0 and `completedSteps` stayed empty. A report for
  another step was refused. Phone width had no overflow.
- Copy scan: no task or hint shows a command that differs from the plan; no
  level 1 hint contains a full command. In 76 steps the model paraphrased the
  command and the adapter appended the exact one.

## V2 backbone evidence - 2026-09-08

All 30 SQL and 20 NoSQL exemplar steps passed the real Chrome harness with
zero errors and warnings. The NoSQL runtime diagnostics, desktop and phone
workspaces, grading, preview, reload preservation, and all five computer
prerequisite/preparation surfaces passed. See `V2_BACKBONE_VERIFICATION.md`
at the repository root for commands, evidence locations, and verification limits.
These targeted checks do not replace the historical full frontend audit below.
Future Qwen-authored batches still need their own browser QA before delivery.

## Frontend freeze evidence

- Full real-Chrome authoring harness: 2,773 items, 0 errors, 28 reviewed granularity warnings, and 0 console errors. This includes 2,760 guided steps, 8 optional practice activities, and 5 capstones. Report: `full-harness-frontend-freeze-1/audit.json` in the session visualization folder.
- Legacy queue drain: 87 queued HTML, CSS, JavaScript, and Tailwind projects passed through their real course route, editor, checker, mobile preview, and desktop preview. Six named tap-to-build placements inserted the authored block without removing existing code. No horizontal overflow or console errors. Report: `pending-qa-4/pending-qa-audit.json`.
- Offline, phone workspace, Passport, Baon Mode, Character Guard, Tanong Card, recovery, Mistake Museum, and Concept Connections: passed the focused recovery/offline audit.
- Rebuild Mode, Bug Clinic, Constraint Missions, Project Remix, evidence integrity, and self-contained proof export: passed focused real-browser audits.
- Five capstones: 5 starting states fail, all 5 solutions pass, final portfolio lock/unlock works, all 15 portfolio checks pass, capstone evidence reaches 5, and no frame combines `allow-scripts` with `allow-same-origin`.
- Backend-facing disconnected state: account, certificate, and local capstone-link draft flows passed real-browser QA with no Supabase credentials present.

The 28 full-harness warnings are the existing reviewed multi-line granularity cases documented in `AUTHORING_LOG.md`; they are not deferred browser checks.

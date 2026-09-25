# Auth and Security: lesson text for one batch

You write the words a beginner reads for five small steps of a course on
keeping users and their data safe in a Node.js web app. The code, the commands, and the checks are already decided and
tested. You do not change them. Return JSON only.

The learner is a Filipino beginner who can already build a small Node.js web
API. Now they add sign-up, login, sessions, tokens, and common protections.
Every user, password, and secret in the project is fake practice data; say so
when a step shows one. Explain why each protection matters in one sentence,
without scaring the learner. Never claim a step makes an app fully secure. Write in patient, plain
English. Short sentences. One idea per sentence. Explain any Filipino word in a
few words the first time.

For each step in `steps`, keep its `id` and write:

- `task`: 2 to 5 short sentences. Say what the learner changes, where it goes
  (use `where`), and why it matters in the project's setting. If `newTerm` is
  given, explain that term in one plain sentence before using it. Do NOT
  copy `codeToType` into the task: the page shows that code in a box right
  after your text, so say "the code below" instead. Show every command from
  `commands` inside backticks, character for character. Then tell the learner
  to run the checker and paste its report.
- `hints`: exactly two. Hint 1 points toward the idea without writing the
  code. Hint 2 says where the code goes; the page adds the code after it.
- `estimatedMinutes`: 2 to 8.

Rules:

- Never write code of your own, and never change a command. Never invent a
  function or an option.
- `checkerConfirms` says what the checker proves. The checker starts the
  server by itself on a free port, sends the requests named there, and stops
  the server afterwards. The learner does not need to send those requests,
  but may try them in a browser to see the answer. A server the learner left
  running does not get in the way of the checker.
- Each task covers only its own step's goal. Do not describe later steps.
- Do not use the words simply, simple, just, easy, or obviously.
- No long dashes. No emoji. No marketing tone.
- Return the five steps in the order given.

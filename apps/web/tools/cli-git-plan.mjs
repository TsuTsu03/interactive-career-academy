// The Command Line and Git course skeleton: 18 projects of 10 steps.
//
// This file fixes what each step asks the learner to do (the commands) and
// how the checker proves it (the checks). The local model writes only the
// learner-facing words around it: the task, two hints, and a time estimate.
// The content gate replays every command in a throwaway folder, so a plan
// mistake fails there before anything ships.
//
// Six tracks teach one skill set each. The first six projects teach every
// track once; the next twelve revisit them in new settings as spaced practice.

const contexts = [
  {
    slug: "sari-sari", title: "Sari-Sari Store", place: "a sari-sari store (a small neighborhood shop)",
    folder: "orders", file: "prices.txt", renamed: "price-list.txt", lines: ["Rice 50", "Soap 25", "Egg 9"],
    branch: "update-prices", branch2: "weekend-sale", name: "Maria Santos", email: "maria@example.com",
  },
  {
    slug: "barangay", title: "Barangay Office", place: "a barangay office (the local community office)",
    folder: "requests", file: "fees.txt", renamed: "fee-list.txt", lines: ["Clearance 50", "Permit 300", "ID 20"],
    branch: "new-fees", branch2: "holiday-hours", name: "Jose Reyes", email: "jose@example.com",
  },
  {
    slug: "school-club", title: "School Club", place: "a public school club",
    folder: "events", file: "schedule.txt", renamed: "club-schedule.txt", lines: ["Monday Practice", "Wednesday Meeting", "Friday Cleanup"],
    branch: "friday-plan", branch2: "sports-week", name: "Ana Cruz", email: "ana@example.com",
  },
];

const t = (id, kind, fields, label) => ({ id, label, kind, ...fields });
const readme = (c) => `${c.title} project files.\nFollow the CodeDaddy course steps inside this folder.\n`;

/** The four steps that open every Git project after the first one. */
function gitStart(c, message) {
  return [
    { commands: ["git init -b main"], goal: "turn the project folder into a Git repository whose first branch is named main", tests: [t("repo", "local-git-repo", {}, "The folder is a Git repository"), t("untracked", "local-git-untracked", { path: c.file }, `${c.file} is not tracked yet`)] },
    { commands: [`git config user.name "${c.name}"`, `git config user.email "${c.email}"`], goal: "tell this repository who is making the commits", tests: [t("name", "local-git-config", { key: "user.name", value: c.name }, `Commits will be signed by ${c.name}`), t("email", "local-git-config", { key: "user.email", value: c.email }, `The commit email is ${c.email}`)] },
    { commands: ["git add ."], goal: "stage every file in the folder at once with a dot", tests: [t("file", "local-git-staged", { path: c.file }, `${c.file} is staged`), t("readme", "local-git-staged", { path: "README.txt" }, "README.txt is staged")] },
    { commands: [`git commit -m "${message}"`], goal: "save the staged files as the first commit", tests: [t("count", "local-git-commit-count", { count: 1 }, "The repository has one commit"), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
  ];
}

const tracks = [
  {
    key: "files", title: "Files and Folders",
    seed: (c) => ({ "README.txt": readme(c) }),
    concepts: ["cli-terminal", "cli-relative-path", "cli-redirect", "cli-append", "cli-copy", null, "cli-move", null, "cli-remove", null],
    steps: (c) => [
      { commands: [`mkdir ${c.folder}`], goal: `make a folder named ${c.folder}`, tests: [t("folder", "local-dir-exists", { path: c.folder }, `The ${c.folder} folder exists`)] },
      { commands: [`touch ${c.folder}/${c.file}`], goal: `make an empty file named ${c.file} inside ${c.folder}, using the path ${c.folder}/${c.file}`, tests: [t("file", "local-file-exists", { path: `${c.folder}/${c.file}` }, `${c.folder}/${c.file} exists`)] },
      { commands: [`echo "${c.lines[0]}" > ${c.folder}/${c.file}`], goal: `write the line ${c.lines[0]} into the file with echo and >`, tests: [t("line", "local-file-contains", { path: `${c.folder}/${c.file}`, value: c.lines[0] }, `${c.file} says ${c.lines[0]}`)] },
      { commands: [`echo "${c.lines[1]}" >> ${c.folder}/${c.file}`], goal: `add ${c.lines[1]} as a second line with >>, keeping the first line`, tests: [t("second", "local-file-contains", { path: `${c.folder}/${c.file}`, value: c.lines[1] }, `${c.file} now also says ${c.lines[1]}`), t("first", "local-file-contains", { path: `${c.folder}/${c.file}`, value: c.lines[0] }, `${c.lines[0]} is still there`)] },
      { commands: [`cp ${c.folder}/${c.file} ${c.folder}/backup.txt`], goal: "copy the file to backup.txt in the same folder", tests: [t("copy", "local-file-contains", { path: `${c.folder}/backup.txt`, value: c.lines[1] }, "backup.txt holds a copy of both lines")] },
      { commands: ["mkdir archive"], goal: "make a second folder named archive next to the first one", tests: [t("archive", "local-dir-exists", { path: "archive" }, "The archive folder exists")] },
      { commands: [`mv ${c.folder}/backup.txt archive/backup.txt`], goal: "move backup.txt into the archive folder", tests: [t("moved", "local-file-exists", { path: "archive/backup.txt" }, "archive/backup.txt exists"), t("gone", "local-path-missing", { path: `${c.folder}/backup.txt` }, `backup.txt is no longer in ${c.folder}`)] },
      { commands: [`echo "${c.lines[2]}" >> ${c.folder}/${c.file}`], goal: `add ${c.lines[2]} to the working file only, so the backup stays older`, tests: [t("third", "local-file-contains", { path: `${c.folder}/${c.file}`, value: c.lines[2] }, `${c.file} now says ${c.lines[2]}`), t("backup-old", "local-file-lacks", { path: "archive/backup.txt", value: c.lines[2] }, `The backup does not have ${c.lines[2]}`)] },
      { commands: ["rm archive/backup.txt"], goal: "delete the old backup file", tests: [t("deleted", "local-path-missing", { path: "archive/backup.txt" }, "The old backup is deleted")] },
      { commands: ["rm -r archive"], goal: "remove the now-empty archive folder with rm -r", tests: [t("no-archive", "local-path-missing", { path: "archive" }, "The archive folder is gone"), t("kept", "local-dir-exists", { path: c.folder }, `The ${c.folder} folder is still there`)] },
    ],
  },
  {
    key: "first-commit", title: "First Commits",
    seed: (c) => ({ "README.txt": readme(c), [c.file]: `${c.lines[0]}\n` }),
    concepts: ["git-repository", "git-identity", null, "git-staging", null, "git-commit", "git-unstaged-change", null, null, "git-amend"],
    steps: (c) => [
      { commands: ["git init -b main"], goal: "turn the folder into a Git repository whose first branch is named main", tests: [t("repo", "local-git-repo", {}, "The folder is a Git repository"), t("untracked", "local-git-untracked", { path: c.file }, `${c.file} is not tracked yet`)] },
      { commands: [`git config user.name "${c.name}"`], goal: `set this repository's author name to ${c.name}`, tests: [t("name", "local-git-config", { key: "user.name", value: c.name }, `Commits will be signed by ${c.name}`)] },
      { commands: [`git config user.email "${c.email}"`], goal: `set this repository's author email to ${c.email}`, tests: [t("email", "local-git-config", { key: "user.email", value: c.email }, `The commit email is ${c.email}`)] },
      { commands: [`git add ${c.file}`], goal: `stage only ${c.file}, leaving README.txt unstaged for now`, tests: [t("staged", "local-git-staged", { path: c.file }, `${c.file} is staged`), t("readme-waits", "local-git-untracked", { path: "README.txt" }, "README.txt is still untracked")] },
      { commands: ["git add README.txt"], goal: "stage README.txt too", tests: [t("readme", "local-git-staged", { path: "README.txt" }, "README.txt is staged")] },
      { commands: [`git commit -m "Start ${c.title.toLowerCase()} list"`], goal: "save both staged files as the first commit", tests: [t("count", "local-git-commit-count", { count: 1 }, "The repository has one commit"), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
      { commands: [`echo "${c.lines[1]}" >> ${c.file}`], goal: `add ${c.lines[1]} to ${c.file} and see Git notice an unstaged change`, tests: [t("changed", "local-git-unstaged", { path: c.file }, `${c.file} has an unstaged change`)] },
      { commands: [`git add ${c.file}`], goal: "stage that change", tests: [t("staged", "local-git-staged", { path: c.file }, `The change to ${c.file} is staged`)] },
      { commands: [`git commit -m "Add ${c.lines[1].split(" ")[0].toLowerCase()} lne"`], goal: `commit it with the message Add ${c.lines[1].split(" ")[0].toLowerCase()} lne, which has a typing mistake on purpose`, tests: [t("count", "local-git-commit-count", { count: 2 }, "The repository has two commits")] },
      { commands: [`git commit --amend -m "Add ${c.lines[1].split(" ")[0].toLowerCase()} line"`], goal: "fix the mistake in the last commit message with --amend", tests: [t("message", "local-git-head-message", { value: `Add ${c.lines[1].split(" ")[0].toLowerCase()} line` }, "The last commit message is spelled correctly"), t("still-two", "local-git-commit-count", { count: 2 }, "There are still two commits, not three")] },
    ],
  },
  {
    key: "undo", title: "Undoing Changes",
    seed: (c) => ({ "README.txt": readme(c), [c.file]: `${c.lines[0]}\n${c.lines[1]}\n` }),
    concepts: [null, null, null, null, null, "git-restore", null, null, "git-unstage", null],
    steps: (c) => [
      ...gitStart(c, `Start ${c.title.toLowerCase()} list`),
      { commands: [`echo "Wrong line" >> ${c.file}`], goal: `add a line that says Wrong line to ${c.file} by mistake`, tests: [t("mistake", "local-file-contains", { path: c.file, value: "Wrong line" }, `${c.file} has the mistaken line`), t("unstaged", "local-git-unstaged", { path: c.file }, "Git sees an unstaged change")] },
      { commands: [`git restore ${c.file}`], goal: "throw away that unstaged change and return the file to its last commit", tests: [t("fixed", "local-file-lacks", { path: c.file, value: "Wrong line" }, "The mistaken line is gone"), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
      { commands: [`echo "${c.lines[2]}" >> ${c.file}`], goal: `add ${c.lines[2]} as a real new line`, tests: [t("unstaged", "local-git-unstaged", { path: c.file }, `${c.file} has an unstaged change`)] },
      { commands: [`git add ${c.file}`], goal: "stage the new line", tests: [t("staged", "local-git-staged", { path: c.file }, `${c.file} is staged`)] },
      { commands: [`git restore --staged ${c.file}`], goal: "unstage it again without losing the line you typed", tests: [t("unstaged", "local-git-unstaged", { path: c.file }, `${c.file} is back to unstaged`), t("kept", "local-file-contains", { path: c.file, value: c.lines[2] }, `${c.lines[2]} is still in the file`)] },
      { commands: [`git restore ${c.file}`], goal: "decide against the change and restore the committed version", tests: [t("dropped", "local-file-lacks", { path: c.file, value: c.lines[2] }, `${c.lines[2]} is gone again`), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
    ],
  },
  {
    key: "branches", title: "Branches",
    seed: (c) => ({ "README.txt": readme(c), [c.file]: `${c.lines[0]}\n` }),
    concepts: [null, null, null, null, "git-branch", "git-switch", null, null, null, null],
    steps: (c) => [
      ...gitStart(c, `Start ${c.title.toLowerCase()} list`),
      { commands: [`git branch ${c.branch}`], goal: `make a new branch named ${c.branch} without leaving main`, tests: [t("exists", "local-git-branch-exists", { branch: c.branch }, `The ${c.branch} branch exists`), t("still-main", "local-git-branch", { value: "main" }, "You are still on main")] },
      { commands: [`git switch ${c.branch}`], goal: `move onto the ${c.branch} branch`, tests: [t("on-branch", "local-git-branch", { value: c.branch }, `You are on ${c.branch}`)] },
      { commands: [`echo "${c.lines[1]}" >> ${c.file}`], goal: `add ${c.lines[1]} while on the new branch`, tests: [t("unstaged", "local-git-unstaged", { path: c.file }, `${c.file} has an unstaged change`)] },
      { commands: [`git commit -am "Add ${c.lines[1]}"`], goal: `stage and commit the tracked change in one command with -am`, tests: [t("count", "local-git-commit-count", { count: 2 }, "This branch has two commits"), t("message", "local-git-head-message", { value: `Add ${c.lines[1]}` }, `The last commit says Add ${c.lines[1]}`)] },
      { commands: ["git switch main"], goal: `go back to main and see that ${c.lines[1]} is not there`, tests: [t("main", "local-git-branch", { value: "main" }, "You are back on main"), t("not-here", "local-file-lacks", { path: c.file, value: c.lines[1] }, `main does not have ${c.lines[1]}`)] },
      { commands: [`git switch -c ${c.branch2}`], goal: `create and move onto a branch named ${c.branch2} in one command with -c`, tests: [t("created", "local-git-branch-exists", { branch: c.branch2 }, `The ${c.branch2} branch exists`), t("on-it", "local-git-branch", { value: c.branch2 }, `You are on ${c.branch2}`)] },
    ],
  },
  {
    key: "merging", title: "Merging Work",
    seed: (c) => ({ "README.txt": readme(c), [c.file]: `${c.lines[0]}\n` }),
    concepts: [null, null, null, null, null, null, null, null, "git-merge", "git-delete-branch"],
    steps: (c) => [
      ...gitStart(c, `Start ${c.title.toLowerCase()} list`),
      { commands: [`git switch -c ${c.branch}`], goal: `create and move onto a branch named ${c.branch}`, tests: [t("on-branch", "local-git-branch", { value: c.branch }, `You are on ${c.branch}`)] },
      { commands: [`echo "${c.lines[1]}" >> ${c.file}`], goal: `add ${c.lines[1]} on that branch`, tests: [t("unstaged", "local-git-unstaged", { path: c.file }, `${c.file} has an unstaged change`)] },
      { commands: [`git commit -am "Add ${c.lines[1]}"`], goal: "commit the change on the branch", tests: [t("count", "local-git-commit-count", { count: 2 }, "The branch has two commits"), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
      { commands: ["git switch main"], goal: "go back to main, which does not have the change yet", tests: [t("main", "local-git-branch", { value: "main" }, "You are on main"), t("not-yet", "local-file-lacks", { path: c.file, value: c.lines[1] }, `main does not have ${c.lines[1]} yet`)] },
      { commands: [`git merge ${c.branch}`], goal: `bring the ${c.branch} work into main`, tests: [t("merged", "local-git-merged", { branch: c.branch }, `${c.branch} is merged into main`), t("arrived", "local-file-contains", { path: c.file, value: c.lines[1] }, `main now has ${c.lines[1]}`)] },
      { commands: [`git branch -d ${c.branch}`], goal: "delete the finished branch; its commits stay safe in main", tests: [t("deleted", "local-git-branch-missing", { branch: c.branch }, `The ${c.branch} branch is deleted`), t("kept", "local-file-contains", { path: c.file, value: c.lines[1] }, `${c.lines[1]} is still in main`)] },
    ],
  },
  {
    key: "tidy", title: "Renaming and Ignoring",
    seed: (c) => ({ "README.txt": readme(c), [c.file]: `${c.lines[0]}\n`, "draft.txt": "Old draft notes\n" }),
    concepts: [null, null, null, null, "git-mv", null, "git-rm", null, "git-ignore", null],
    steps: (c) => [
      ...gitStart(c, `Start ${c.title.toLowerCase()} files`),
      { commands: [`git mv ${c.file} ${c.renamed}`], goal: `rename ${c.file} to ${c.renamed} so Git records the rename`, tests: [t("renamed", "local-git-staged", { path: c.renamed }, `${c.renamed} is staged`), t("old-gone", "local-path-missing", { path: c.file }, `${c.file} no longer exists`)] },
      { commands: [`git commit -m "Rename ${c.file}"`], goal: "commit the rename", tests: [t("in-commit", "local-git-head-has-file", { path: c.renamed }, `The last commit includes ${c.renamed}`), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
      { commands: ["git rm draft.txt"], goal: "delete draft.txt and stage that deletion in one command", tests: [t("gone", "local-path-missing", { path: "draft.txt" }, "draft.txt is deleted"), t("staged", "local-git-staged", { path: "draft.txt" }, "The deletion is staged")] },
      { commands: ['git commit -m "Remove old draft"'], goal: "commit the deletion", tests: [t("count", "local-git-commit-count", { count: 3 }, "The repository has three commits"), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
      { commands: ['echo "*.log" > .gitignore'], goal: "make a .gitignore file that tells Git to ignore every file ending in .log", tests: [t("rule", "local-file-contains", { path: ".gitignore", value: "*.log" }, ".gitignore lists *.log"), t("new", "local-git-untracked", { path: ".gitignore" }, ".gitignore is a new, untracked file")] },
      { commands: ["git add .gitignore", 'git commit -m "Ignore log files"'], goal: "stage and commit .gitignore so the rule is saved with the project", tests: [t("saved", "local-git-head-has-file", { path: ".gitignore" }, "The last commit includes .gitignore"), t("clean", "local-git-clean", {}, "Nothing is left uncommitted")] },
    ],
  },
];

export const cliGitProjects = contexts.flatMap((c, round) =>
  tracks.map((track) => {
    const id = `${track.key}-${c.slug}`;
    const steps = track.steps(c).map((step, index) => ({
      ...step,
      id: `cli-${id}-${index + 1}`,
      // A concept is introduced the first time its word appears, which is
      // the first round. Later rounds revisit the skill without re-teaching.
      conceptId: round === 0 ? track.concepts[index] ?? undefined : undefined,
    }));
    return { id, title: `${c.title} ${track.title}`, place: c.place, track: track.title, seed: track.seed(c), steps };
  }),
);

if (cliGitProjects.length !== 18 || cliGitProjects.some((project) => project.steps.length !== 10)) {
  throw new Error("The Command Line and Git plan must be 18 projects of 10 steps.");
}

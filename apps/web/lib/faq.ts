/**
 * The questions a first-time visitor actually asks, with answers short enough
 * to be quoted whole. One list feeds both the rendered FAQ section and the
 * `FAQPage` JSON-LD, so a search result and the page can never disagree.
 *
 * Answers are plain data. Keep each one self-contained: an answer engine lifts
 * it out of the page, so it has to make sense with no surrounding text.
 */
export type FaqEntry = { question: string; answer: string };

export const faq: FaqEntry[] = [
  {
    question: "What is CodeDaddy?",
    answer:
      "CodeDaddy is a free front-end learning platform that runs in your browser. You read one short task, write real HTML, CSS, JavaScript, React, or TypeScript, and see the page update beside your code. The projects are built around everyday Filipino life, like sari-sari store pages and jeepney fare calculators.",
  },
  {
    question: "Is CodeDaddy free?",
    answer:
      "Yes. Every course, project, and certificate is free. There is no paid tier, no trial that expires, and no card to enter. Donations are optional and change nothing about what you can access.",
  },
  {
    question: "Do I need an account to start learning?",
    answer:
      "No. You can open a course and start writing code right away. Your work saves in your own browser. Signing in with GitHub or an email link is only for keeping progress across devices.",
  },
  {
    question: "What do I learn on CodeDaddy?",
    answer:
      "Ten courses in order: HTML, design foundations, CSS, JavaScript, JavaScript on a page, real app data, Tailwind CSS, React, TypeScript with React, and testing with browser devtools. Each course is a set of small projects built one step at a time.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. The editor, the live preview, and the checks all run inside your browser tab. There is nothing to download, no local setup, and no server that runs your code.",
  },
  {
    question: "Do I need coding experience to start?",
    answer:
      "No. The first course starts with what a web page is made of and assumes you have never written a line of code. Every new word gets an explanation, a familiar comparison, a picture, and a working example before it is used.",
  },
  {
    question: "How long does the full path take?",
    answer:
      "About 2,760 small steps across ten courses. Most steps take a few minutes, so an hour a day gets most learners through the path in a few months. There is no schedule and no deadline.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes. Finishing a course issues a certificate automatically once its checks pass. No one reviews or approves it by hand, and you can save it as an image or share the link.",
  },
  {
    question: "Does CodeDaddy work on a phone or with a slow connection?",
    answer:
      "Yes. The workspace is built for a small screen and a metered connection, and it installs like an app. Once a course has loaded, you can keep working on it offline.",
  },
];

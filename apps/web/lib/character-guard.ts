import type { Step } from "@/lib/lesson-ir";

export interface CharacterIssue {
  id: string;
  file: string;
  line: number;
  character: string;
  message: string;
}

const PHONE_CHARACTERS: Record<string, string> = {
  "“": "left smart double quote",
  "”": "right smart double quote",
  "‘": "left smart single quote",
  "’": "right smart single quote",
  "‹": "left single angle quote",
  "›": "right single angle quote",
  "«": "left double angle quote",
  "»": "right double angle quote",
  "≤": "less-than-or-equal sign",
  "≥": "greater-than-or-equal sign",
};

export function characterIssues(step: Step, files: Record<string, string>): CharacterIssue[] {
  const issues: CharacterIssue[] = [];

  for (const [file, source] of Object.entries(files)) {
    const lines = source.split("\n");
    lines.forEach((line, lineIndex) => {
      for (const [character, name] of Object.entries(PHONE_CHARACTERS)) {
        if (!line.includes(character)) continue;
        issues.push({
          id: `${file}:${lineIndex + 1}:${character}`,
          file,
          line: lineIndex + 1,
          character,
          message: `Line ${lineIndex + 1} in ${file} uses ${name} (${character}). Replace it with the plain code character from the symbol row.`,
        });
      }
    });
  }

  const solution = step.solution?.[step.activeFile];
  const current = files[step.activeFile];
  if (solution && current) {
    const solutionLines = solution.split("\n");
    const currentLines = current.split("\n");
    for (let index = 0; index < Math.min(solutionLines.length, currentLines.length); index++) {
      const expected = solutionLines[index].trim();
      const actual = currentLines[index].trim();
      const closingTag = expected.match(/^<\/([a-z][\w-]*)>$/i)?.[1];
      if (closingTag && actual.toLowerCase() === `<${closingTag.toLowerCase()}>`) {
        issues.push({
          id: `${step.activeFile}:${index + 1}:closing-slash`,
          file: step.activeFile,
          line: index + 1,
          character: "/",
          message: `Line ${index + 1} in ${step.activeFile} needs the closing slash before ${closingTag}. Add the slash yourself, then run the checks again.`,
        });
      }
    }
  }

  return issues.slice(0, 3);
}

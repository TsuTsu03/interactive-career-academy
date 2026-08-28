"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";

/**
 * A textarea with a syntax-highlighted layer behind it.
 *
 * The editable surface is a real `<textarea>`, so keyboard behaviour, screen
 * reader support, selection, and copy all work with no custom handling. This
 * is why the product's accessible editor mode needs no separate component:
 * the editor already is one.
 */

type Token = { text: string; cls: string };

function tokenizeHtml(line: string): Token[] {
  const out: Token[] = [];
  const re = /(<\/?)([a-zA-Z][\w-]*)|([a-zA-Z-]+)(=)("[^"]*")|(>)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ text: line.slice(last, m.index), cls: "text-chalk" });
    if (m[1]) {
      out.push({ text: m[1], cls: "text-ash" });
      out.push({ text: m[2], cls: "text-plasma" });
    } else if (m[3]) {
      out.push({ text: m[3], cls: "text-voltage" });
      out.push({ text: m[4], cls: "text-ash" });
      out.push({ text: truncateSrc(m[5]), cls: "text-acid" });
    } else if (m[6]) {
      out.push({ text: m[6], cls: "text-ash" });
    }
    last = re.lastIndex;
  }
  if (last < line.length) out.push({ text: line.slice(last), cls: "text-chalk" });
  return out;
}

/** Data URIs are hundreds of characters. Show the learner something readable. */
function truncateSrc(v: string): string {
  if (v.length <= 44) return v;
  return `${v.slice(0, 26)}…${v.slice(-4)}`;
}

const JS_PATTERN =
  /("[^"]*"|'[^']*'|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|\b(const|let|var|function|return|if|else|for|of|in|while|break|continue|true|false|null|undefined|new|typeof)\b/g;

function tokenizeJs(line: string): Token[] {
  const out: Token[] = [];
  const comment = line.indexOf("//");
  const code = comment >= 0 ? line.slice(0, comment) : line;
  const rest = comment >= 0 ? line.slice(comment) : "";

  const re = new RegExp(JS_PATTERN.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push({ text: code.slice(last, m.index), cls: "text-chalk" });
    if (m[1]) out.push({ text: m[1], cls: "text-acid" });
    else if (m[2]) out.push({ text: m[2], cls: "text-plasma" });
    else out.push({ text: m[0], cls: "text-voltage" });
    last = re.lastIndex;
  }
  if (last < code.length) out.push({ text: code.slice(last), cls: "text-chalk" });
  if (rest) out.push({ text: rest, cls: "text-ash/60" });
  return out;
}

function tokenizeCss(line: string): Token[] {
  const out: Token[] = [];
  const decl = line.match(/^(\s*)([a-z-]+)(\s*:\s*)(.+?)(;?)$/);
  if (decl) {
    out.push({ text: decl[1], cls: "text-chalk" });
    out.push({ text: decl[2], cls: "text-voltage" });
    out.push({ text: decl[3], cls: "text-ash" });
    out.push({ text: decl[4], cls: "text-acid" });
    if (decl[5]) out.push({ text: decl[5], cls: "text-ash" });
    return out;
  }
  const sel = line.match(/^([^{}]*)([{}])(.*)$/);
  if (sel) {
    out.push({ text: sel[1], cls: "text-plasma" });
    out.push({ text: sel[2], cls: "text-ash" });
    out.push({ text: sel[3], cls: "text-chalk" });
    return out;
  }
  return [{ text: line, cls: "text-chalk" }];
}

export function CodeEditor({
  value,
  onChange,
  language,
  readonlyLines = [],
  highlightToken,
  errorLine,
  label,
  textareaRef,
}: {
  value: string;
  onChange: (next: string) => void;
  language: "html" | "css" | "js";
  readonlyLines?: number[];
  highlightToken?: string;
  errorLine?: number | null;
  label: string;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
}) {
  const localTextareaRef = useRef<HTMLTextAreaElement>(null);
  const taRef = textareaRef ?? localTextareaRef;
  const preRef = useRef<HTMLPreElement>(null);

  const lines = useMemo(() => value.split("\n"), [value]);

  // The highlight layer must scroll in lockstep with the textarea.
  useEffect(() => {
    const ta = taRef.current;
    const pre = preRef.current;
    if (!ta || !pre) return;
    const sync = () => {
      pre.scrollTop = ta.scrollTop;
      pre.scrollLeft = ta.scrollLeft;
    };
    ta.addEventListener("scroll", sync);
    return () => ta.removeEventListener("scroll", sync);
  }, [taRef]);

  const tokenize =
    language === "html" ? tokenizeHtml : language === "js" ? tokenizeJs : tokenizeCss;

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      {/* Gutter */}
      <div
        aria-hidden="true"
        className="shrink-0 select-none border-r border-hairline bg-panel px-3 py-3 text-right font-mono text-[13px] leading-6 text-ash/60"
      >
        {lines.map((_, i) => (
          <div
            key={i}
            className={
              errorLine === i + 1
                ? "text-strike"
                : readonlyLines.includes(i + 1)
                  ? "text-ash/30"
                  : ""
            }
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        {/* Highlight layer */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-auto whitespace-pre px-4 py-3 font-mono text-[13px] leading-6"
        >
          {lines.map((line, i) => {
            const isReadonly = readonlyLines.includes(i + 1);
            const isError = errorLine === i + 1;
            return (
              <div
                key={i}
                className={
                  isError
                    ? "-mx-4 bg-strike/10 px-4"
                    : isReadonly
                      ? "-mx-4 bg-void/40 px-4 opacity-50"
                      : ""
                }
              >
                {tokenize(line).map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
                {line === "" ? "\n" : null}
              </div>
            );
          })}
        </pre>

        {/* The real editing surface */}
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label={label}
          className="absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre bg-transparent px-4 py-3 font-mono text-[13px] leading-6 text-transparent caret-voltage outline-none"
        />

        {highlightToken && value.includes(highlightToken) ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-3 rounded border border-voltage/60 bg-voltage/10 px-2 py-1 font-mono text-[11px] text-voltage"
          >
            change: {truncateSrc(highlightToken)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

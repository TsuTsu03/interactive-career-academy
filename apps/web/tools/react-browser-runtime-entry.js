import * as React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

function hasOpaqueOrigin() {
  try {
    window.localStorage.getItem("__codedaddy_sandbox_probe__");
    return false;
  } catch {
    return true;
  }
}

function isRunMessage(value) {
  return (
    value &&
    typeof value === "object" &&
    value.__academy === "react-run" &&
    typeof value.requestId === "string" &&
    typeof value.code === "string" &&
    Array.isArray(value.checks)
  );
}

function runCheck(mount, check) {
  if (check.kind === "react-document-title-equals") {
    const actual = document.title;
    return { id: check.id, passed: actual === check.value, actual };
  }

  if (
    check.kind === "react-click-text-equals" ||
    check.kind === "react-click-attr-equals" ||
    check.kind === "react-click-focus-equals"
  ) {
    const clickTarget = mount.querySelector(check.clickSelector);
    if (!clickTarget) return { id: check.id, passed: false, actual: "click target not found" };
    flushSync(() => clickTarget.click());
  }

  if (check.kind === "react-input-text-equals") {
    const input = mount.querySelector(check.inputSelector);
    if (!input) return { id: check.id, passed: false, actual: "input not found" };
    const prototype = input instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
    const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    if (!valueSetter) return { id: check.id, passed: false, actual: "input cannot change" };
    flushSync(() => {
      valueSetter.call(input, check.inputValue);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  const element = mount.querySelector(check.selector);
  if (!element) return { id: check.id, passed: false, actual: "not found" };
  if (check.kind === "react-exists") return { id: check.id, passed: true };
  if (check.kind === "react-click-focus-equals") {
    const passed = document.activeElement === element;
    return { id: check.id, passed, actual: passed ? "focused" : "not focused" };
  }

  if (
    check.kind === "react-text-equals" ||
    check.kind === "react-click-text-equals" ||
    check.kind === "react-input-text-equals"
  ) {
    const actual = (element.textContent ?? "").trim();
    return { id: check.id, passed: actual === check.value, actual };
  }

  const actual = element.getAttribute(check.attr) ?? "";
  return { id: check.id, passed: actual === check.value, actual };
}

function startRuntime() {
  const mount = document.getElementById("react-root");
  const status = document.getElementById("react-status");
  if (!mount || !status) return;

  const showStatus = (message) => {
    status.textContent = message;
    status.hidden = message.length === 0;
  };

  if (!hasOpaqueOrigin()) {
    showStatus("⚠ Warning: React preview is available only inside the secure workspace.");
    return;
  }

  const learnerRoot = createRoot(mount);
  window.addEventListener("message", (event) => {
    if (event.source !== window.parent || !isRunMessage(event.data)) return;
    const message = event.data;

    try {
      const makeComponent = new Function(
        "React",
        `"use strict";\n${message.code}\n;return typeof App === "function" ? App : null;`,
      );
      const App = makeComponent(React);
      if (!App) throw new Error("Create a function named App so React has something to show.");

      flushSync(() => learnerRoot.render(React.createElement(App)));
      showStatus("");
      window.parent.postMessage(
        {
          __academy: "react-result",
          requestId: message.requestId,
          ok: true,
          checks: message.checks.map((check) => runCheck(mount, check)),
        },
        "*",
      );
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      flushSync(() => learnerRoot.render(null));
      showStatus(`✕ Error: ${detail}`);
      window.parent.postMessage(
        {
          __academy: "react-result",
          requestId: message.requestId,
          ok: false,
          checks: [],
          error: detail,
        },
        "*",
      );
    }
  });

  window.parent.postMessage({ __academy: "react-ready" }, "*");
}

startRuntime();

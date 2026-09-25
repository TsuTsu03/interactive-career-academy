// Development-only loader for trusted course modules. Learner SQL is never JS.
import { registerHooks, stripTypeScriptTypes } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";

export const appDir = fileURLToPath(new URL("../", import.meta.url));
registerHooks({
  resolve(specifier, context, nextResolve) {
    let url;
    if (specifier.startsWith("@/")) url = pathToFileURL(resolve(appDir, specifier.slice(2))).href;
    else if (specifier.startsWith(".") && context.parentURL) url = new URL(specifier, context.parentURL).href;
    if (url?.startsWith("file:") && existsSync(fileURLToPath(`${url}.ts`))) {
      return nextResolve(`${url}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts") && url.startsWith(pathToFileURL(appDir).href)) {
      return { format: "module", source: stripTypeScriptTypes(readFileSync(new URL(url), "utf8")), shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

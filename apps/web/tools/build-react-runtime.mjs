import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { webpack } = require("next/dist/compiled/webpack/webpack");
const terser = require("next/dist/compiled/terser");
const toolsDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(toolsDir, "..");
const licenseBanner = `/**
 * @license React
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * Licensed under the MIT license.
 *
 * @license Sucrase
 * Copyright (c) 2012-2018 various contributors.
 * Licensed under the MIT license; see the Sucrase LICENSE in node_modules.
 */`;

const compiler = webpack({
  mode: "production",
  context: appDir,
  entry: resolve(toolsDir, "react-browser-runtime-entry.js"),
  output: {
    path: resolve(appDir, "public"),
    filename: "react-runtime.js",
  },
  // Next's vendored webpack points at a private minifier path that is not
  // shipped as a public module. Bundle first, then use Next's vendored Terser.
  optimization: { minimize: false },
});

let stats;
try {
  stats = await new Promise((resolveStats, rejectStats) => {
    compiler.run((error, result) => {
      if (error) rejectStats(error);
      else resolveStats(result);
    });
  });
} finally {
  await new Promise((resolveClose, rejectClose) => {
    compiler.close((error) => {
      if (error) rejectClose(error);
      else resolveClose();
    });
  });
}

if (stats?.hasErrors()) {
  throw new Error(stats.toString({ colors: false, errors: true, warnings: false }));
}

const outputPath = resolve(appDir, "public", "react-runtime.js");
const source = await readFile(outputPath, "utf8");
const minified = terser.minify_sync(source, {
  compress: true,
  mangle: true,
  format: { comments: /^!/ },
});
if (!minified.code) throw new Error("React runtime minification produced no code.");
await writeFile(outputPath, `${licenseBanner}\n${minified.code}\n`, "utf8");
process.stdout.write("Built public/react-runtime.js from the installed React packages.\n");

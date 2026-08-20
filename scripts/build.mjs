import { build } from "esbuild";
import { mkdir, rm, writeFile } from "node:fs/promises";

const entryPoint = process.env.RENDER_RUNTIME_ENTRY ?? "src/index.ts";

await rm("dist/render-runtime.js", { force: true });
await mkdir("dist", { recursive: true });

const result = await build({
  bundle: true,
  entryPoints: [entryPoint],
  format: "iife",
  legalComments: "none",
  minify: true,
  outfile: "dist/skryb-runtime.js",
  platform: "browser",
  target: ["es2020"],
  write: false
});

const runtimeSource = result.outputFiles[0].text;
await writeFile(
  "dist/skryb-runtime.js",
  `${runtimeSource}\nglobalThis.DocDiagramRuntimeSource=${JSON.stringify(runtimeSource)};\n`
);

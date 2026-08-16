import { build } from "esbuild";
import { rm } from "node:fs/promises";

const entryPoint = process.env.RENDER_RUNTIME_ENTRY ?? "src/index.ts";

await rm("dist/render-runtime.js", { force: true });

await build({
  bundle: true,
  entryPoints: [entryPoint],
  format: "iife",
  legalComments: "none",
  minify: true,
  outfile: "dist/skryb-runtime.js",
  platform: "browser",
  target: ["es2020"]
});

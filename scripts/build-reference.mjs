import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(repositoryRoot, ".github", "skills", "render-document", "reference.md");
const outputDirectory = path.join(repositoryRoot, "pages", "docs");
const outputPath = path.join(outputDirectory, "reference.html");

const markdown = await readFile(sourcePath, "utf8");
const escapedMarkdown = markdown
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Skryb reference</title>
  <script src="https://sparkkz-nz.github.io/skryb/latest/skryb-runtime.js" defer></script>
</head>
<body>
  <template id="source" type="text/markdown">
${escapedMarkdown}  </template>
  <main id="rendered-document"></main>
</body>
</html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, document);

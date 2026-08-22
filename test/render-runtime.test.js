const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const runtime = fs.readFileSync(
  path.resolve(__dirname, "..", "dist", "skryb-runtime.js"),
  "utf8"
);
const context = vm.createContext({
  document: { querySelector: () => null },
  globalThis: {}
});

vm.runInContext(runtime, context, { filename: "dist/skryb-runtime.js" });

const {
  supportedDiagramTypes,
  colourSchemes,
  nodeShapes,
  edgeAnchors,
  edgeRoutes,
  edgeMarkerStyles,
  getTheme,
  getGridSize,
  expandCanvasForNode,
  getResizeNodeOrigin,
  resizeFlowchartNode,
  flattenFlowchartNodes,
  getFlowchartNodeBounds,
  reparentFlowchartNode,
  createUniqueNodeId,
  getDefaultNodePosition,
  createNode,
  duplicateNode,
  createConnector,
  reconnectConnector,
  deleteConnector,
  deleteNode,
  getNodeEffectiveStyle,
  getEdgeEffectiveStyle,
  getEdgeMarkerStyle,
  getEdgeMarkerDimensions,
  parseDiagram,
  parseDocumentFrontmatter,
  resolveDocument,
  setFrontmatterTheme,
  isSafeUrl,
  renderInline,
  renderMarkdown,
  renderDiagram,
  snapToGrid,
  clampNodeSize,
  serializeDiagram,
  setNodeLabel,
  setNodeShape,
  setNodeSubtitle,
  setNodeStyleOverride,
  setNodeColorPalette,
  setNodeSize,
  setEdgeLabel,
  setEdgeRoute,
  setEdgeAnchor,
  setEdgeStyleOverride,
  setStyleStrokeWidth,
  setEdgeMarkerStart,
  setEdgeMarkerEnd,
  validateDocumentSource,
  embedRuntimeInDocumentHtml,
  fetchRuntimeSource,
  getPortableRuntimeUrl,
  findSourceTextRange,
  splitTextLines,
  renderTextBlock,
  computeNodeTextLayout,
  getNodeGeometry,
  renderNodeBody,
  buildEdgePath,
  buildEdgeInspectorFields,
  clampZoom
} = context.globalThis.DocDiagramCore;

function readTemplateSource(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const template = html.match(/<template id="source"[^>]*>([\s\S]*?)<\/template>/);

  assert.ok(template, "Expected an HTML template with id=\"source\"");
  return template[1];
}

function readDiagramSources(source) {
  return [...source.matchAll(/^```diagram\s*\n([\s\S]*?)^```$/gm)].map((match) => match[1]);
}

function flowchartSource(source) {
  const body = Array.isArray(source) ? source.join("\n") : String(source);
  return `type: flowchart\n${body}`;
}

function sequenceSource(source) {
  const body = Array.isArray(source) ? source.join("\n") : String(source);
  return `type: sequence\n${body}`;
}

test("render authoring skill fixtures use the required shell and valid source", () => {
  const fixtureDirectory = path.resolve(__dirname, "fixtures", "render-document");
  const fixtures = [
    "simple-document.html",
    "flowchart-document.html",
    "themed-document.html",
    "sequence-document.html"
  ];

  for (const fixture of fixtures) {
    const filePath = path.join(fixtureDirectory, fixture);
    const html = fs.readFileSync(filePath, "utf8");
    const source = readTemplateSource(filePath);

    assert.match(html, /^<!doctype html>/i, `${fixture} has a document doctype`);
    assert.match(html, /<html lang="en">/, `${fixture} declares its language`);
    assert.match(html, /<meta charset="utf-8">/, `${fixture} declares UTF-8`);
    assert.match(html, /<meta name="viewport"/, `${fixture} has a viewport`);
    assert.match(html, /<script src="https:\/\/sparkkz-nz\.github\.io\/skryb\/(?:latest|releases\/v1\.2\.0)\/skryb-runtime\.js" defer><\/script>/, `${fixture} uses a hosted runtime`);
    assert.match(html, /<main id="rendered-document"><\/main>/, `${fixture} has an empty render target`);

    const document = resolveDocument(source);
    assert.ok(document.content.includes("# "), `${fixture} has a document heading`);

    for (const diagramSource of readDiagramSources(document.content)) {
      assert.doesNotThrow(() => parseDiagram(diagramSource), `${fixture} has a valid diagram`);
    }
  }
});

test("creates a portable offline document with the fetched runtime at the end of the body", async () => {
  const runtimeSource = await fetchRuntimeSource("https://example.test/skryb-runtime.js", async () => ({
    ok: true,
    status: 200,
    text: async () => "globalThis.portableRuntime = true;"
  }));
  const exportedDocument = embedRuntimeInDocumentHtml(
    "<html><head></head><body><main id=\"rendered-document\"></main><script src=\"https://sparkkz-nz.github.io/skryb/releases/v1.2.0/skryb-runtime.js\" data-docdiagram-offline-runtime-placeholder defer></script></body></html>",
    runtimeSource,
    "https://sparkkz-nz.github.io/skryb/releases/v1.2.0/skryb-runtime.js"
  );

  assert.doesNotMatch(exportedDocument, /src="https:\/\/sparkkz-nz\.github\.io\/skryb\/releases\/v1\.2\.0\/skryb-runtime\.js"/);
  assert.match(exportedDocument, /data-docdiagram-runtime-url="https:\/\/sparkkz-nz\.github\.io\/skryb\/releases\/v1\.2\.0\/skryb-runtime\.js"/);
  assert.match(exportedDocument, new RegExp(`<script data-docdiagram-runtime="embedded" data-docdiagram-runtime-url="https://sparkkz-nz.github.io/skryb/releases/v1.2.0/skryb-runtime.js">\\n${runtimeSource}\\n</script>\\n</body>`));
});

test("runtime packages its source for local offline export without fetching", () => {
  assert.equal(typeof context.globalThis.DocDiagramRuntimeSource, "string");
  assert.match(context.globalThis.DocDiagramRuntimeSource, /DocDiagramCore/);
});

test("uses the hosted runtime for a portable Save As when local runtime paths are unavailable", () => {
  assert.equal(
    getPortableRuntimeUrl("./dist/skryb-runtime.js"),
    "https://sparkkz-nz.github.io/skryb/latest/skryb-runtime.js"
  );
  assert.equal(
    getPortableRuntimeUrl("https://sparkkz-nz.github.io/skryb/releases/v1.2.0/skryb-runtime.js"),
    "https://sparkkz-nz.github.io/skryb/releases/v1.2.0/skryb-runtime.js"
  );
});

test("the packaged runtime remains executable after offline HTML embedding", () => {
  const exportedDocument = embedRuntimeInDocumentHtml(
    "<html><body><script data-docdiagram-offline-runtime-placeholder></script></body></html>",
    context.globalThis.DocDiagramRuntimeSource
  );
  const embeddedRuntime = exportedDocument.match(/<script data-docdiagram-runtime="embedded">\n([\s\S]*?)\n<\/script>/);
  const offlineContext = vm.createContext({
    document: { querySelector: () => null },
    globalThis: {}
  });

  assert.ok(embeddedRuntime, "Expected exported document to contain an embedded runtime");
  assert.doesNotThrow(() => vm.runInContext(embeddedRuntime[1], offlineContext));
  assert.equal(typeof offlineContext.globalThis.DocDiagramCore, "object");
});

test("does not export an offline document when runtime fetching fails", async () => {
  await assert.rejects(
    () => fetchRuntimeSource("https://example.test/skryb-runtime.js", async () => ({
      ok: false,
      status: 503,
      text: async () => ""
    })),
    /Could not fetch the Skryb runtime \(503\)/
  );
});

test("reopens an exported offline document without fetching the runtime", () => {
  const runtimeSource = "globalThis.portableRuntime = true;";
  const exportedDocument = embedRuntimeInDocumentHtml(
    "<html><body><script src=\"https://example.test/skryb-runtime.js\" data-docdiagram-offline-runtime-placeholder></script></body></html>",
    runtimeSource
  );
  const embeddedRuntime = exportedDocument.match(/<script data-docdiagram-runtime="embedded">\n([\s\S]*?)\n<\/script>/);
  const offlineContext = vm.createContext({ globalThis: {} });

  assert.ok(embeddedRuntime, "Expected exported document to contain an embedded runtime");
  vm.runInContext(embeddedRuntime[1], offlineContext);
  assert.equal(offlineContext.globalThis.portableRuntime, true);
});

test("keeps runtime strings containing closing script tags executable offline", () => {
  const runtimeSource = 'globalThis.runtimeSnippet = "</script>"; globalThis.portableRuntime = true;';
  const exportedDocument = embedRuntimeInDocumentHtml(
    "<html><body><script src=\"https://example.test/skryb-runtime.js\" data-docdiagram-offline-runtime-placeholder></script></body></html>",
    runtimeSource
  );
  const embeddedRuntime = exportedDocument.match(/<script data-docdiagram-runtime="embedded">\n([\s\S]*?)\n<\/script>/);
  const offlineContext = vm.createContext({ globalThis: {} });

  assert.ok(embeddedRuntime, "Expected exported document to contain an embedded runtime");
  assert.doesNotMatch(embeddedRuntime[1], /<\/script/i);
  vm.runInContext(embeddedRuntime[1], offlineContext);
  assert.equal(offlineContext.globalThis.portableRuntime, true);
});

test("preserves dollar sequences while embedding the runtime before the body close tag", () => {
  const runtimeSource = "globalThis.runtimeMatch = '$&';";
  const exportedDocument = embedRuntimeInDocumentHtml(
    "<html><body><script data-docdiagram-offline-runtime-placeholder></script></body></html>",
    runtimeSource
  );
  const embeddedRuntime = exportedDocument.match(/<script data-docdiagram-runtime="embedded">\n([\s\S]*?)\n<\/script>/);
  const offlineContext = vm.createContext({ globalThis: {} });

  assert.ok(embeddedRuntime, "Expected exported document to contain an embedded runtime");
  assert.equal(embeddedRuntime[1], runtimeSource);
  vm.runInContext(embeddedRuntime[1], offlineContext);
  assert.equal(offlineContext.globalThis.runtimeMatch, "$&");
});

test("published documentation and starter template use the required shell and valid source", () => {
  const documentationFiles = [
    path.resolve(__dirname, "..", "pages", "docs", "quickstart.html"),
    path.resolve(__dirname, "..", "pages", "docs", "reference.html"),
    path.resolve(__dirname, "..", "pages", "templates", "skryb-document-template.html")
  ];

  for (const filePath of documentationFiles) {
    const html = fs.readFileSync(filePath, "utf8");
    const source = readTemplateSource(filePath);

    assert.match(html, /^<!doctype html>/i, `${filePath} has a document doctype`);
    assert.match(html, /<html lang="en">/, `${filePath} declares its language`);
    assert.match(html, /<meta charset="utf-8">/, `${filePath} declares UTF-8`);
    assert.match(html, /<meta name="viewport"/, `${filePath} has a viewport`);
    assert.match(html, /<script src="https:\/\/sparkkz-nz\.github\.io\/skryb\/latest\/skryb-runtime\.js" defer><\/script>/, `${filePath} uses the hosted runtime`);
    assert.match(html, /<main id="rendered-document"><\/main>/, `${filePath} has an empty render target`);

    const document = resolveDocument(source);
    assert.ok(document.content.includes("# "), `${filePath} has a document heading`);

    for (const diagramSource of readDiagramSources(document.content)) {
      assert.doesNotThrow(() => parseDiagram(diagramSource), `${filePath} has a valid diagram`);
    }
  }
});

test("published reference renders Markdown and YAML source blocks", () => {
  const source = readTemplateSource(path.resolve(__dirname, "..", "pages", "docs", "reference.html"));
  const markup = renderMarkdown(resolveDocument(source).content);

  assert.match(markup, /<pre><code class="language-markdown">/);
  assert.match(markup, /<pre><code class="language-yaml">/);
  assert.match(markup, /type: flowchart/);
  assert.match(markup, /type: sequence/);
  assert.match(source, /:::diagram \{ id=payment-flow \}/);
});

test("Pages home promotes the published guides", () => {
  const home = fs.readFileSync(path.resolve(__dirname, "..", "pages", "index.html"), "utf8");
  const deployment = fs.readFileSync(path.resolve(__dirname, "..", ".github", "workflows", "deploy-pages.yml"), "utf8");

  assert.match(home, /<title>Skryb - beautiful documents your agent writes and you can still edit<\/title>/);
  assert.match(home, /href="\.\/docs\/quickstart\.html"/);
  assert.match(home, /href="\.\/docs\/reference\.html"/);
  assert.match(home, /src="\.\/assets\/sample\.png"/);
  assert.match(home, /src="\.\/assets\/secure-doc-flow\.png"/);
  assert.match(home, /src="\.\/assets\/source-edit\.png"/);
  assert.match(home, /src="\.\/assets\/edit-flowchart\.png"/);
  assert.match(home, /src="\.\/assets\/sequence\.png"/);
  assert.match(home, /src="\.\/assets\/edit-source\.mp4"/);
  assert.match(home, /src="\.\/assets\/edit-diagram\.mp4"/);
  assert.match(home, /src="\.\/assets\/themes\.mp4"/);
  assert.match(home, /src="\.\/assets\/zoom\.mp4"/);
  assert.match(home, /npx skills add sparkkz-nz\/skryb/);
  assert.match(home, /data-carousel-previous/);
  assert.match(home, /data-carousel-next/);
  assert.match(deployment, /cp pages\/index\.html "\$site_dir\/index\.html"/);
  assert.match(deployment, /cp -R pages\/assets "\$site_dir\/assets"/);
  assert.match(deployment, /cp pages\/docs\/quickstart\.html "\$site_dir\/docs\/index\.html"/);
});

test("extracts document frontmatter without treating it as Markdown content", () => {
  const document = parseDocumentFrontmatter("\n---\ntheme: dark\n---\n\n# Payments");

  assert.equal(document.frontmatter.theme, "dark");
  assert.equal(document.content, "\n# Payments");
});

test("validates a complete source document before it is committed", () => {
  const document = validateDocumentSource([
    "---",
    "theme: dark",
    "---",
    "",
    "# Payments"
  ].join("\n"));

  assert.equal(document.theme, "dark");
  assert.equal(document.content, "\n# Payments");
});

test("finds the first canonical source range for rendered text navigation", () => {
  const source = "# Payments\n\nThe Payments API creates an intent.";
  const range = findSourceTextRange(source, "Payments");

  assert.equal(range.start, 2);
  assert.equal(range.end, 10);
  assert.equal(findSourceTextRange(source, "Missing"), null);
  assert.equal(findSourceTextRange(source, "   "), null);
});

test("rejects malformed frontmatter before source commit", () => {
  assert.throws(
    () => validateDocumentSource("---\ntheme dark\n---\n\n# Payments"),
    /Cannot parse document frontmatter line/
  );
});

test("rejects invalid diagram source before source commit", () => {
  assert.throws(
    () => validateDocumentSource([
      "# Payments",
      "",
      "```diagram",
      "type: flowchart",
      "version: 1",
      "canvas:",
      "  width: 800",
      "  height: 500",
      "nodes:",
      "  - id: api",
      "    label: API",
      "    shape: rounded-rectangle",
      "    position: { x: 100, y: 100 }",
      "    size: { width: 190, height: 80 }",
      "edges:",
      "  - source: api",
      "    target: api",
      "    targetAnchor: left",
      "```"
    ].join("\n")),
    /requires a sourceAnchor/
  );
});

test("rejects diagrams missing a node identifier or label before source commit", () => {
  assert.throws(
    () => validateDocumentSource([
      "```diagram",
      "type: flowchart",
      "version: 1",
      "canvas:",
      "  width: 400",
      "  height: 200",
      "nodes:",
      "  - id: api",
      "    shape: rounded-rectangle",
      "edges:",
      "```"
    ].join("\n")),
    /Every node requires an id and a string label/
  );
  assert.doesNotThrow(() => validateDocumentSource([
    "```diagram",
    "type: flowchart",
    "canvas:",
    "nodes:",
    "  - id: api",
    '    label: ""',
    "    shape: rounded-rectangle",
    "edges:",
    "```"
  ].join("\n")));
});

test("requires a supported diagram type and rejects removed flowchart node.type fields", () => {
  assert.throws(
    () => parseDiagram([
      "canvas:",
      "  width: 400",
      "  height: 200",
      "nodes:",
      "edges:"
    ].join("\n")),
    /Diagram type is required/
  );

  assert.throws(
    () => parseDiagram([
      "type: mindmap",
      "canvas:",
      "  width: 400",
      "  height: 200",
      "nodes:",
      "edges:"
    ].join("\n")),
    /Unsupported diagram type: mindmap/
  );

  assert.throws(
    () => parseDiagram(flowchartSource([
      "canvas:",
      "  width: 400",
      "  height: 200",
      "nodes:",
      "  - id: api",
      "    label: API",
      "    type: service",
      "    shape: rounded-rectangle",
      "edges:"
    ].join("\n"))),
    /uses removed field "type"/
  );
});

test("validates diagram fences with trailing closing-fence whitespace", () => {
  assert.throws(
    () => validateDocumentSource([
      "```diagram",
      "type: flowchart",
      "this is not valid diagram YAML",
      "```   "
    ].join("\n")),
    /Cannot parse diagram line/
  );
});

test("requires document-wide unique diagram IDs when diagram references are used", () => {
  const diagram = [
    "```diagram",
    "type: flowchart",
    "id: flow",
    "canvas:",
    "nodes:",
    "edges:",
    "```"
  ];
  assert.throws(
    () => validateDocumentSource([":::diagram { id=flow }", "", ...diagram, "", ...diagram].join("\n")),
    /Duplicate diagram id: flow/
  );
  assert.throws(
    () => validateDocumentSource([
      ":::diagram { id=flow }",
      "",
      ...diagram,
      "",
      "```diagram",
      "type: flowchart",
      "canvas:",
      "nodes:",
      "edges:",
      "```"
    ].join("\n")),
    /Every diagram requires an id when using diagram references/
  );
});

test("rejects an unclosed code fence before source commit", () => {
  assert.throws(
    () => validateDocumentSource("```diagram\nversion: 1"),
    /Unclosed code block/
  );
});

test("keeps rendering document content around an invalid diagram outside source editing", () => {
  const markup = renderMarkdown([
    "# Before",
    "",
    "```diagram",
      "type: flowchart",
    "version: 1",
    "canvas:",
    "  width: 400",
    "  height: 200",
    "nodes:",
    "  - id: api",
    "    label: API",
    "edges:",
    "```",
    "",
    "## After"
  ].join("\n"));

  assert.match(markup, /Diagram could not be rendered/);
  assert.match(markup, /<h2>After<\/h2>/);
});

test("renders the documented CommonMark and GFM compatibility baseline semantically", () => {
  const source = fs.readFileSync(
    path.resolve(__dirname, "fixtures", "markdown", "compatibility-baseline.md"),
    "utf8"
  );
  const markup = renderMarkdown(source);

  assert.match(markup, /<ol><li>Define the public contract\.<ul><li>Include the API edge case\.<\/li><\/ul><\/li><li>Publish the implementation\.<\/li><\/ol>/);
  assert.match(markup, /<blockquote><p><strong>Important:<\/strong> keep existing document source portable\.<\/p><\/blockquote>/);
  assert.match(markup, /<hr>/);
  assert.match(markup, /<em>emphasis<\/em>, <strong>strong text<\/strong>, <del>removed text<\/del>, and <code>inline code<\/code>/);
  assert.match(markup, /<pre><code class="language-javascript">const enabled = true;<\/code><\/pre>/);
  assert.match(markup, /<table><thead><tr><th style="text-align:left">Name<\/th><th style="text-align:center">State<\/th><th style="text-align:right">Detail<\/th>/);
  assert.match(markup, /<td style="text-align:left">API\|edge<\/td>/);
  assert.match(markup, /<li class="docdiagram-task-list-item"><input type="checkbox" disabled checked> Complete the migration<\/li>/);
  assert.match(markup, /<li class="docdiagram-task-list-item"><input type="checkbox" disabled> Publish the release notes<\/li>/);
});

test("renders only safe links and images while keeping unsafe URLs readable", () => {
  const markup = renderMarkdown([
    "[Safe](https://example.com/docs)",
    "",
    "[Unsafe](javascript:alert(1))",
    "",
    "![Logo](images/logo.png)",
    "",
    "![Unsafe image](data:text/html;base64,PHNjcmlwdD4=)",
    "",
    "<script>alert('literal')</script>"
  ].join("\n"));

  assert.match(markup, /<a href="https:\/\/example\.com\/docs">Safe<\/a>/);
  assert.doesNotMatch(markup, /href="javascript:/);
  assert.match(markup, /\[Unsafe\]\(javascript:alert\(1\)\)/);
  assert.match(markup, /<img src="images\/logo\.png" alt="Logo">/);
  assert.doesNotMatch(markup, /src="data:text\/html/);
  assert.match(markup, /&lt;script&gt;alert\(&#39;literal&#39;\)&lt;\/script&gt;/);
  assert.equal(isSafeUrl("mailto:author@example.com"), true);
  assert.equal(isSafeUrl("javascript:alert(1)"), false);
  assert.equal(isSafeUrl("//untrusted.example/path"), false);
  assert.equal(isSafeUrl("\\\\untrusted.example\\path"), false);
  assert.equal(renderInline("`<literal>`"), "<code>&lt;literal&gt;</code>");
});

test("keeps diagram fences distinct from language-labelled code fences", () => {
  const markup = renderMarkdown([
    "```text",
    "diagram",
    "```",
    "",
    "```diagram",
      "type: flowchart",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "edges:",
    "```"
  ].join("\n"));

  assert.match(markup, /<pre><code class="language-text">diagram<\/code><\/pre>/);
  assert.match(markup, /<figure class="docdiagram"/);
});

test("renders diagram references in reading order and omits their later definitions", () => {
  const markup = renderMarkdown([
    "# Payments",
    "",
    "The flow appears here.",
    "",
    ":::diagram { id=payments-flowchart }",
    "",
    "## Next section",
    "",
    "```diagram",
    "type: flowchart",
    "id: payments-flowchart",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "edges:",
    "```"
  ].join("\n"));

  assert.equal([...markup.matchAll(/<figure class="docdiagram"/g)].length, 1);
  assert.ok(markup.indexOf('<figure class="docdiagram"') < markup.indexOf("<h2>Next section</h2>"));
});

test("reports missing, duplicate, and repeated diagram references", () => {
  const missing = renderMarkdown(":::diagram { id=missing }");
  const repeated = renderMarkdown([
    ":::diagram { id=flow }",
    ":::diagram { id=flow }",
    "```diagram",
    "type: flowchart",
    "id: flow",
    "canvas:",
    "nodes:",
    "edges:",
    "```"
  ].join("\n"));
  const duplicate = renderMarkdown([
    ":::diagram { id=flow }",
    "```diagram",
    "type: flowchart",
    "id: flow",
    "canvas:",
    "nodes:",
    "edges:",
    "```",
    "```diagram",
    "type: flowchart",
    "id: flow",
    "canvas:",
    "nodes:",
    "edges:",
    "```"
  ].join("\n"));

  assert.match(missing, /Diagram "missing" could not be found/);
  assert.match(repeated, /Diagram "flow" is referenced more than once/);
  assert.match(duplicate, /Diagram "flow" has multiple definitions/);
});

test("does not treat diagram references in fenced code as real references", () => {
  const markup = renderMarkdown([
    "```text",
    ":::diagram { id=flow }",
    "```",
    "",
    "```diagram",
    "type: flowchart",
    "id: flow",
    "canvas:",
    "nodes:",
    "edges:",
    "```"
  ].join("\n"));

  assert.match(markup, /<pre><code class="language-text">:::diagram \{ id=flow \}<\/code><\/pre>/);
  assert.equal([...markup.matchAll(/<figure class="docdiagram"/g)].length, 1);
});

test("resolves diagram references across block quotes", () => {
  const markup = renderMarkdown([
    ":::diagram { id=flow }",
    "",
    "> ```diagram",
    "> type: flowchart",
    "> id: flow",
    "> canvas:",
    "> nodes:",
    "> edges:",
    "> ```"
  ].join("\n"));

  assert.equal([...markup.matchAll(/<figure class="docdiagram"/g)].length, 1);
  assert.doesNotMatch(markup, /could not be found/);
});

test("shares diagram indices with diagrams nested in block quotes", () => {
  const diagram = [
    "```diagram",
      "type: flowchart",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "edges:",
    "```"
  ];
  const source = [
    ...diagram,
    "",
    ...diagram.map((line) => `> ${line}`),
    "",
    ...diagram
  ].join("\n");
  const indices = [...renderMarkdown(source).matchAll(/data-diagram-index="(\d+)"/g)]
    .map((match) => match[1]);

  assert.deepEqual([...new Set(indices)], ["0", "1", "2"]);
});

test("renders nested formatting components and responsive grid layouts", () => {
  const markup = renderMarkdown([
    ':::grid { columns="2fr 1fr" }',
    ':::panel { title="Primary" palette=accent }',
    "Primary **Markdown** content.",
    "::: (panel)",
    ":::stack",
    ':::callout { kind=warning title="Review required" palette=highlight }',
    "Confirm the _operational_ assumptions.",
    "::: (callout)",
    ':::panel { title="Supporting detail" fill=#ffffff stroke=#111827 text=#17202a }',
    "Supporting content.",
    ":::",
    "::: (stack)",
    "::: (grid)"
  ].join("\n"));

  assert.match(markup, /class="docdiagram-grid" style="--docdiagram-grid-columns:minmax\(0, 2fr\) minmax\(0, 1fr\)"/);
  assert.match(markup, /class="docdiagram-component docdiagram-panel docdiagram-component-styled" style="[^"]*--docdiagram-component-fill:#BFDBFE;--docdiagram-component-stroke:#2563EB;--docdiagram-component-text:#1E3A8A/);
  assert.match(markup, /class="docdiagram-stack"/);
  assert.match(markup, /<aside class="docdiagram-component docdiagram-component-styled docdiagram-callout docdiagram-callout-warning".*aria-label="Review required callout">/);
  assert.match(markup, /<div class="docdiagram-callout-kind">warning<\/div>/);
  assert.match(markup, /Primary <strong>Markdown<\/strong> content\./);
  assert.match(markup, /Confirm the <em>operational<\/em> assumptions\./);
  assert.match(markup, /--docdiagram-component-fill:#ffffff;--docdiagram-component-stroke:#111827;--docdiagram-component-text:#17202a/);
});

test("renders the documented formatting extension fixture", () => {
  const source = fs.readFileSync(
    path.resolve(__dirname, "fixtures", "markdown", "formatting-extensions.md"),
    "utf8"
  );
  const document = resolveDocument(source);
  const markup = renderMarkdown(document.content);

  assert.match(markup, /class="docdiagram-grid".*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(markup, /class="docdiagram-component docdiagram-component-styled docdiagram-callout docdiagram-callout-success"/);
  assert.match(markup, /class="docdiagram-grid".*minmax\(0, 2fr\) minmax\(0, 1fr\)/);
  assert.match(markup, /class="docdiagram-stack"/);
});

test("keeps malformed and unsupported formatting directives readable", () => {
  const markup = renderMarkdown([
    ":::panel { title=Unclosed }",
    "This remains readable.",
    "",
    ':::grid { columns=4 }',
    ":::panel",
    "Content",
    ":::"
  ].join("\n"));

  assert.match(markup, /<pre class="docdiagram-literal-source"><code>:::panel \{ title=Unclosed \}<\/code><\/pre>/);
  assert.match(markup, /This remains readable\./);
  assert.match(markup, /<pre class="docdiagram-literal-source"><code>:::grid \{ columns=4 \}<\/code><\/pre>/);
});

test("does not treat directive-looking fenced code as nested components", () => {
  const markup = renderMarkdown([
    ":::panel",
    "```markdown",
    ":::panel",
    "```",
    ":::"
  ].join("\n"));

  assert.match(markup, /<section class="docdiagram-component docdiagram-panel"><pre><code class="language-markdown">:::panel<\/code><\/pre><\/section>/);
});

test("marks explicitly styled components so their palette takes precedence over document theme styles", () => {
  const markup = renderMarkdown([
    ':::section { palette=accent }',
    "[Reference](https://example.com), `code`, and a table header.",
    "",
    "| Name | Value |",
    "| --- | --- |",
    "| One | Two |",
    "",
    "> Quoted content.",
    ":::"
  ].join("\n"));

  assert.match(markup, /class="docdiagram-component docdiagram-section docdiagram-component-styled"/);
  assert.match(markup, /--docdiagram-component-fill:#BFDBFE;--docdiagram-component-stroke:#2563EB;--docdiagram-component-text:#1E3A8A/);
  assert.match(runtime, /docdiagram-section:not\(\.docdiagram-component-styled\)/);
  assert.match(runtime, /\.docdiagram-component pre,[\s\S]*background: transparent/);
  assert.match(runtime, /\.docdiagram-component blockquote \{[\s\S]*color: inherit/);
});

test("diagram markup provides compact view-mode zoom and edit controls", () => {
  const markup = renderDiagram(flowchartSource([
    "canvas:",
    "  width: 800",
    "  height: 500",
    "nodes:",
    "  - id: api",
    "    shape: rounded-rectangle",
    "    label: API",
    "    position: { x: 100, y: 100 }",
    "    size: { width: 190, height: 80 }",
    "edges:"
  ].join("\n")), 0);

  assert.match(markup, /class="docdiagram-diagram-toolbar"/);
  assert.match(markup, /class="docdiagram-icon-button docdiagram-zoom-in"/);
  assert.match(markup, /class="docdiagram-icon-button docdiagram-zoom-out"/);
  assert.match(markup, /class="docdiagram-icon-button docdiagram-fit"/);
  assert.match(markup, /class="docdiagram-icon-button docdiagram-start-editing"/);
  assert.match(markup, /aria-label="Zoom in"/);
  assert.match(markup, /aria-label="Zoom to fit"/);
  assert.match(markup, /aria-label="Edit diagram"/);
});

test("flowchart nodes support arbitrary nesting with relative coordinates and edge endpoints", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 800",
    "  height: 500",
    "nodes:",
    "  - id: platform",
    "    label: Platform",
    "    shape: rounded-rectangle",
    "    position: { x: 100, y: 80 }",
    "    size: { width: 400, height: 300 }",
    "    children:",
    "      - id: service",
    "        label: Service",
    "        shape: oval",
    "        position: { x: 40, y: 50 }",
    "        size: { width: 200, height: 140 }",
    "        children:",
    "          - id: store",
    "            label: Store",
    "            shape: database",
    "            position: { x: 30, y: 40 }",
    "            size: { width: 120, height: 80 }",
    "  - id: client",
    "    label: Client",
    "    shape: rounded-rectangle",
    "    position: { x: 600, y: 180 }",
    "    size: { width: 120, height: 60 }",
    "edges:",
    "  - source: platform",
    "    target: store",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "  - source: store",
    "    target: client",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const entries = flattenFlowchartNodes(diagram);

  assert.equal(entries.length, 4);
  assert.equal(
    JSON.stringify(getFlowchartNodeBounds(diagram, entries.find((entry) => entry.node.id === "store").node)),
    JSON.stringify({ x: 170, y: 170, width: 120, height: 80 })
  );
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));

  const markup = renderDiagram(source, 0);
  assert.match(markup, /data-node-id="platform"/);
  assert.match(markup, /data-node-id="store"/);
  assert.match(markup, /data-node-id="client"/);
});

test("resizing from each corner anchors the opposite corner and preserves nested positions", () => {
  const diagram = parseDiagram(flowchartSource([
    "canvas:",
    "  width: 800",
    "  height: 500",
    "nodes:",
    "  - id: container",
    "    label: Container",
    "    shape: rounded-rectangle",
    "    position: { x: 100, y: 80 }",
    "    size: { width: 300, height: 200 }",
    "    children:",
    "      - id: child",
    "        label: Child",
    "        shape: rounded-rectangle",
    "        position: { x: 40, y: 50 }",
    "        size: { width: 120, height: 60 }",
    "edges:"
  ].join("\n")));
  const container = diagram.nodes[0];
  const child = container.children[0];
  const childBounds = getFlowchartNodeBounds(diagram, child);

  const origin = getResizeNodeOrigin(container);
  resizeFlowchartNode(diagram, container, "top-left", -30, -20, origin);
  resizeFlowchartNode(diagram, container, "top-left", -60, -40, origin);

  assert.equal(JSON.stringify(container.position), JSON.stringify({ x: 40, y: 40 }));
  assert.equal(JSON.stringify(container.size), JSON.stringify({ width: 360, height: 240 }));
  assert.equal(JSON.stringify(getFlowchartNodeBounds(diagram, child)), JSON.stringify(childBounds));

  const resizeCases = [
    { corner: "top-right", horizontalDelta: 60, verticalDelta: -40, position: { x: 100, y: 40 } },
    { corner: "bottom-left", horizontalDelta: -60, verticalDelta: 40, position: { x: 40, y: 80 } },
    { corner: "bottom-right", horizontalDelta: 60, verticalDelta: 40, position: { x: 100, y: 80 } }
  ];
  for (const { corner, horizontalDelta, verticalDelta, position } of resizeCases) {
    const node = {
      id: corner,
      label: corner,
      shape: "rounded-rectangle",
      position: { x: 100, y: 80 },
      size: { width: 300, height: 200 }
    };
    const oneNodeDiagram = { canvas: { width: 800, height: 500 }, nodes: [node], edges: [] };
    resizeFlowchartNode(oneNodeDiagram, node, corner, horizontalDelta, verticalDelta);

    assert.equal(JSON.stringify(node.position), JSON.stringify(position));
    assert.equal(JSON.stringify(node.size), JSON.stringify({ width: 360, height: 240 }));
  }
});

test("flowchart node text stack alignment parses, renders, and round-trips", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 400",
    "  height: 240",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    subtitle: Owns intents",
    "    shape: rounded-rectangle",
    "    position: { x: 40, y: 50 }",
    "    size: { width: 200, height: 120 }",
    "    textVAlign: top",
    "    textHAlign: left",
    "edges:"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const markup = renderDiagram(source, 0);

  assert.equal(diagram.nodes[0].textVAlign, "top");
  assert.equal(diagram.nodes[0].textHAlign, "left");
  assert.match(markup, /<text x="52" y="76\.4" text-anchor="start" class="docdiagram-node-label"/);
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));
  assert.throws(
    () => parseDiagram(source.replace("textHAlign: left", "textHAlign: justify")),
    /Unsupported node textHAlign/
  );
});

test("database geometry separates the filled body from its top seam", () => {
  const geometry = getNodeGeometry({ shape: "database" }, 10, 20, 180, 100);
  const body = renderNodeBody(geometry, { fill: "#123456", stroke: "#abcdef" }, 2);

  assert.match(body, /class="docdiagram-node-body"[^>]*fill="#123456"[^>]*stroke="#abcdef"/);
  assert.match(body, /class="docdiagram-node-detail"[^>]*stroke="#abcdef"[^>]*fill="none"/);
});

test("drag reparenting uses center containment and preserves absolute position", () => {
  const diagram = parseDiagram(flowchartSource([
    "canvas:",
    "  width: 800",
    "  height: 500",
    "nodes:",
    "  - id: first-parent",
    "    label: First parent",
    "    shape: rounded-rectangle",
    "    position: { x: 100, y: 100 }",
    "    size: { width: 240, height: 180 }",
    "  - id: second-parent",
    "    label: Second parent",
    "    shape: rounded-rectangle",
    "    position: { x: 400, y: 100 }",
    "    size: { width: 240, height: 180 }",
    "  - id: child",
    "    label: Child",
    "    shape: oval",
    "    position: { x: 420, y: 140 }",
    "    size: { width: 180, height: 80 }",
    "edges:"
  ].join("\n")));

  const child = flattenFlowchartNodes(diagram).find((entry) => entry.node.id === "child").node;
  const before = getFlowchartNodeBounds(diagram, child);
  reparentFlowchartNode(diagram, "child");
  const after = getFlowchartNodeBounds(diagram, child);

  assert.deepEqual(after, before);
  assert.equal(diagram.nodes.find((node) => node.id === "second-parent").children[0].id, "child");

  child.position = { x: 300, y: 300 };
  reparentFlowchartNode(diagram, "child");
  assert.ok(diagram.nodes.some((node) => node.id === "child"));
});

test("deleting a final child omits empty children and preserves a parseable diagram", () => {
  const diagram = parseDiagram(flowchartSource([
    "canvas:",
    "  width: 400",
    "  height: 240",
    "nodes:",
    "  - id: parent",
    "    label: Parent",
    "    shape: rounded-rectangle",
    "    children:",
    "      - id: child",
    "        label: Child",
    "        shape: oval",
    "edges:"
  ].join("\n")));

  deleteNode(diagram, "child");
  const serialized = serializeDiagram(diagram);

  assert.doesNotMatch(serialized, /children:/);
  assert.doesNotThrow(() => parseDiagram(serialized));
});

test("rejects unsupported top-level diagram sections", () => {
  assert.throws(
    () => parseDiagram(flowchartSource([
      "canvas:",
      "  width: 400",
      "  height: 240",
      "bogusSection:",
      "  value: unexpected",
      "nodes:",
      "edges:"
    ].join("\n"))),
    /Unsupported diagram section: bogusSection/
  );
});

test("sequence diagrams parse, round-trip, and render with lightweight edit controls", () => {
  const source = sequenceSource([
    "theme: dark",
    "participants:",
    "  - id: client",
    "    label: Client",
    "    kind: actor",
    "    palette: accent",
    "    size: { width: 200, height: 56 }",
    "  - id: server",
    "    label: Server",
    "    palette: success",
    "    size: { width: 200, height: 56 }",
    "messages:",
    "  - from: client",
    "    to: server",
    "    label: GET /api/data",
    "    style: solid",
    "  - from: server",
    "    to: client",
    "    label: 200 OK",
    "    style: dashed",
    "activations:",
    "  - participant: server",
    "    from: 1",
    "    to: 2",
    "notes:",
    "  - at: server",
    "    after: 1",
    "    label: Process request",
    "    palette: highlight",
    "    size: { width: 220, height: 64 }",
    "groups:",
    "  - label: Authentication",
    "    from: 1",
    "    to: 2"
  ].join("\n"));
  const diagram = parseDiagram(source);

  assert.equal(diagram.type, "sequence");
  assert.equal(diagram.participants[0].kind, "actor");
  assert.equal(diagram.messages[0].style, "solid");
  assert.equal(diagram.messages[1].style, "dashed");
  assert.equal(diagram.activations[0].participant, "server");
  assert.equal(diagram.participants[1].size.width, 200);
  assert.equal(diagram.notes[0].size.height, 64);
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));

  const markup = renderDiagram(source, 1);

  assert.match(markup, /aria-label="Sequence diagram"/);
  assert.match(markup, /Client/);
  assert.match(markup, /Server/);
  assert.match(markup, /GET \/api\/data/);
  assert.match(markup, /200 OK/);
  assert.match(markup, /Process request/);
  assert.match(markup, /Authentication/);
  assert.match(markup, /docdiagram-sequence-lifeline/);
  assert.match(markup, /docdiagram-sequence-activation/);
  assert.match(markup, /stroke-dasharray="8 5"/);
  assert.match(markup, /width="200" height="56"/);
  assert.match(markup, /width="220" height="64"/);
  assert.match(markup, /docdiagram-sequence-activation[^>]*fill="#DCFCE7"[^>]*stroke="#16A34A"/);
  assert.ok(markup.indexOf("docdiagram-sequence-activation") < markup.indexOf("docdiagram-sequence-note"));
  assert.match(markup, /docdiagram-start-editing/);
  assert.doesNotMatch(markup, /docdiagram-create-node/);
});

test("sequence diagrams use configurable participant layout and expand the canvas", () => {
  const defaultMarkup = renderDiagram(sequenceSource([
    "participants:",
    "  - id: client",
    "    label: \"Client\\nApp\"",
    "  - id: service",
    "    label: \"Service\\nAPI\"",
    "messages:",
    "  - from: client",
    "    to: service",
    "    label: Request"
  ].join("\n")), 0);
  const source = sequenceSource([
    "canvas:",
    "  width: 600",
    "  participantSpacing: 260",
    "  participantSize: { width: 180, height: 60 }",
    "participants:",
    "  - id: client",
    "    label: \"Client\\nApp\"",
    "  - id: service",
    "    label: \"Service\\nAPI\"",
    "    size: { width: 120, height: 48 }",
    "  - id: database",
    "    label: Database",
    "messages:",
    "  - from: client",
    "    to: service",
    "    label: Request",
    "  - from: service",
    "    to: database",
    "    label: Query"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const markup = renderDiagram(source, 0);

  assert.match(defaultMarkup, /<rect x="0" y="28" width="180" height="42"/);
  assert.match(defaultMarkup, /M 90 \d+ L 310 \d+/);
  assert.equal(diagram.canvas.participantSpacing, 260);
  assert.equal(JSON.stringify(diagram.canvas.participantSize), JSON.stringify({ width: 180, height: 60 }));
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));
  assert.match(markup, /viewBox="0 0 700 \d+"/);
  assert.match(markup, /<rect x="0" y="28" width="180" height="60"/);
  assert.match(markup, /<rect x="290" y="28" width="120" height="48"/);
  assert.match(markup, /<rect x="520" y="28" width="180" height="60"/);
  assert.match(markup, /<tspan x="90">Client<\/tspan><tspan x="90" dy="16">App<\/tspan>/);
  assert.match(markup, /<tspan x="350">Service<\/tspan><tspan x="350" dy="16">API<\/tspan>/);
  assert.match(markup, /M 90 \d+ L 350 \d+"/);
  assert.match(markup, /M 350 \d+ L 610 \d+"/);
  assert.throws(
    () => parseDiagram(source.replace("participantSpacing: 260", "participantSpacing: 0")),
    /Sequence canvas.participantSpacing must be a positive number/
  );
  assert.throws(
    () => parseDiagram(source.replace("{ width: 180, height: 60 }", "180")),
    /Sequence canvas.participantSize must be a mapping/
  );
});

test("clampZoom limits diagram zoom to supported discrete bounds", () => {
  assert.equal(clampZoom(10), 25);
  assert.equal(clampZoom(125), 125);
  assert.equal(clampZoom(600), 600);
});

test("diagram viewports can be vertically resized", () => {
  const diagramEditor = fs.readFileSync(path.resolve(__dirname, "..", "src", "editor", "diagram-editor.ts"), "utf8");

  assert.match(runtime, /\.docdiagram \{[\s\S]*resize: vertical/);
  assert.match(diagramEditor, /function isViewportResizePointer/);
  assert.match(diagramEditor, /!isViewportResizePointer\(frame, event\)/);
});

test("diagram scrollbars are visually hidden while retaining overflow support", () => {
  assert.match(runtime, /\.docdiagram \{\s*scrollbar-width: none;/);
  assert.match(runtime, /\.docdiagram::-webkit-scrollbar \{\s*display: none;/);
});

test("flowchart edge waypoints parse, render, route, and round-trip", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: source",
    "    label: Source",
    "    shape: rounded-rectangle",
    "  - id: target",
    "    label: Target",
    "    shape: rounded-rectangle",
    "    position: { x: 400, y: 160 }",
    "edges:",
    "  - source: source",
    "    target: target",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    waypoint: { x: 300, y: 80 }"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const path = buildEdgePath(
    { x: 190, y: 40 },
    { x: 400, y: 200 },
    "right",
    "left",
    "orthogonal",
    diagram.edges[0].waypoint
  );

  assert.equal(JSON.stringify(diagram.edges[0].waypoint), JSON.stringify({ x: 300, y: 80 }));
  assert.match(path.path, /L 300 80/);
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));
  assert.match(renderDiagram(source, 0), /M 190 40 L 300 40 L 300 80/);
  assert.throws(
    () => parseDiagram(source.replace("{ x: 300, y: 80 }", "{ x: 300 }")),
    /waypoint requires finite x and y coordinates/
  );

  const behindSource = buildEdgePath(
    { x: 190, y: 40 },
    { x: 400, y: 200 },
    "right",
    "left",
    "orthogonal",
    { x: 120, y: 80 }
  );
  assert.match(behindSource.path, /^M 190 40 L 214 40 L 214 80 L 120 80/);

  const behindTarget = buildEdgePath(
    { x: 190, y: 40 },
    { x: 400, y: 200 },
    "right",
    "left",
    "orthogonal",
    { x: 450, y: 80 }
  );
  assert.match(behindTarget.path, /L 376 80 L 376 200 L 400 200$/);
});

test("runtime chrome uses the document colour scheme for the page background", () => {
  assert.match(runtime, /background: var\(--docdiagram-page-background, #ffffff\);/);
  assert.match(runtime, /--docdiagram-page-background/);
});

test("source editor chrome includes insert and help controls with an accessible close button", () => {
  assert.match(runtime, /class="docdiagram-source-menu-toggle" aria-label="Source editor menu"/);
  assert.match(runtime, /data-source-template="flowchart"/);
  assert.match(runtime, /data-source-template="diagram-reference"/);
  assert.match(runtime, /class="docdiagram-source-help">Help/);
  assert.match(runtime, /class="docdiagram-source-close" aria-label="Close source editor"/);
});

test("callouts use a prominent left accent border", () => {
  assert.match(runtime, /\.docdiagram-callout \{\s*border-left-width: 8px;/);
});

test("expanding a canvas keeps a moved node and padding inside its bounds", () => {
  const diagram = {
    canvas: { width: 800, height: 500 },
    nodes: [],
    edges: []
  };
  const node = {
    position: { x: 760, y: 470 },
    size: { width: 190, height: 80 }
  };

  expandCanvasForNode(diagram, node);

  assert.equal(diagram.canvas.width, 990);
  assert.equal(diagram.canvas.height, 590);
});

test("expanding a canvas left or up shifts every node into positive coordinates", () => {
  const diagram = {
    canvas: { width: 800, height: 500 },
    nodes: [
      { id: "moved", position: { x: -100, y: -60 }, size: { width: 190, height: 80 } },
      { id: "existing", position: { x: 300, y: 200 }, size: { width: 190, height: 80 } }
    ],
    edges: []
  };

  expandCanvasForNode(diagram, diagram.nodes[0]);

  assert.equal(JSON.stringify(diagram.nodes[0].position), JSON.stringify({ x: 40, y: 40 }));
  assert.equal(JSON.stringify(diagram.nodes[1].position), JSON.stringify({ x: 440, y: 300 }));
  assert.equal(diagram.canvas.width, 940);
  assert.equal(diagram.canvas.height, 600);
});

test("resolves the actual example document's dark theme", () => {
  const source = readTemplateSource(path.resolve(__dirname, "..", "examples", "web-runtime.html"));
  const document = resolveDocument(source);

  assert.equal(document.theme, "dark");
  assert.equal(document.colourScheme, "classic");
  assert.match(document.content, /^# Payments architecture/m);
  assert.match(document.content, /:::grid \{ columns=3 \}/);
  assert.equal(readDiagramSources(document.content).length, 3);
  for (const diagramSource of readDiagramSources(document.content)) {
    assert.doesNotThrow(() => parseDiagram(diagramSource));
  }
});

test("rejects an unsupported document theme", () => {
  assert.throws(
    () => resolveDocument("---\ntheme: neon\n---\n# Payments"),
    /Unsupported document theme: neon/
  );
});

test("resolves the classic colour scheme by default and rejects unsupported schemes", () => {
  assert.equal(resolveDocument("# Payments").colourScheme, "classic");
  assert.equal(resolveDocument("---\ncolourScheme: classic\n---\n# Payments").colourScheme, "classic");
  assert.throws(
    () => resolveDocument("---\ncolourScheme: pastel\n---\n# Payments"),
    /Unsupported document colour scheme: pastel/
  );
});

test("uses an opt-in canvas grid to normalize positions and dimensions", () => {
  assert.equal(getGridSize({ canvas: { grid: 5 } }), 5);
  assert.equal(getGridSize({ canvas: { grid: 0 } }), 0);
  assert.equal(getGridSize({ canvas: {} }), 0);
  assert.equal(snapToGrid(122, 5), 120);
  assert.equal(snapToGrid(123, 5), 125);
  assert.equal(snapToGrid(122.4, 0), 122);
  assert.equal(clampNodeSize(118, 120, 5), 120);
  assert.equal(clampNodeSize(123, 120, 5), 125);
  assert.equal(clampNodeSize(58, 60, 5), 60);
});

test("creates uniquely identified default nodes at a grid-aligned available position", () => {
  const diagram = {
    canvas: { width: 600, height: 300, grid: 10 },
    nodes: [{
      id: "new-node",
      label: "Existing",
      shape: "rounded-rectangle",
      position: { x: 200, y: 110 },
      size: { width: 190, height: 80 }
    }],
    edges: []
  };

  assert.equal(createUniqueNodeId(diagram.nodes), "new-node-2");
  assert.equal(JSON.stringify(getDefaultNodePosition(diagram)), JSON.stringify({ x: 210, y: 190 }));
  const node = createNode(diagram);

  assert.equal(JSON.stringify(node), JSON.stringify({
    id: "new-node-2",
    label: "New node",
    shape: "rounded-rectangle",
    position: { x: 210, y: 190 },
    size: { width: 190, height: 80 }
  }));
});

test("duplicates a node subtree with shape-derived IDs and independent properties", () => {
  const diagram = {
    type: "flowchart",
    canvas: { width: 700, height: 500, grid: 10 },
    nodes: [{
      id: "platform",
      label: "Platform",
      shape: "rounded-rectangle",
      position: { x: 100, y: 100 },
      size: { width: 200, height: 150 },
      palette: "accent",
      children: [{
        id: "api",
        label: "API",
        shape: "chevron",
        position: { x: 20, y: 30 },
        size: { width: 120, height: 60 },
        style: { stroke: "#123456" }
      }]
    }, {
      id: "roundedrectangle01",
      label: "Existing",
      shape: "rounded-rectangle",
      position: { x: 400, y: 40 },
      size: { width: 120, height: 60 }
    }],
    edges: []
  };
  const duplicate = duplicateNode(diagram, "platform");

  assert.ok(duplicate);
  assert.equal(duplicate.id, "roundedrectangle02");
  assert.equal(duplicate.children[0].id, "chevron01");
  assert.equal(duplicate.label, "Platform");
  assert.equal(duplicate.palette, "accent");
  assert.notEqual(JSON.stringify(duplicate.position), JSON.stringify(diagram.nodes[0].position));
  assert.equal(JSON.stringify(duplicate.children[0].position), JSON.stringify({ x: 20, y: 30 }));
  assert.doesNotMatch(serializeDiagram(diagram), /undefined/);
  assert.doesNotThrow(() => parseDiagram(serializeDiagram(diagram)));

  duplicate.children[0].style.stroke = "#abcdef";
  assert.equal(diagram.nodes[0].children[0].style.stroke, "#123456");
});

test("duplicates a node outside a full canvas instead of overlapping existing content", () => {
  const diagram = {
    type: "flowchart",
    canvas: { width: 300, height: 200 },
    nodes: [{
      id: "full-canvas",
      label: "Full canvas",
      shape: "rounded-rectangle",
      position: { x: 0, y: 0 },
      size: { width: 300, height: 200 }
    }],
    edges: []
  };
  const duplicate = duplicateNode(diagram, "full-canvas");

  assert.ok(duplicate);
  assert.equal(duplicate.position.x, 320);
  assert.equal(duplicate.position.y, 0);
  assert.ok(diagram.canvas.width >= 660);
});

test("creates, reconnects, and deletes connectors without dangling endpoints", () => {
  const diagram = {
    canvas: {},
    nodes: [
      { id: "api", label: "API", shape: "rounded-rectangle" },
      { id: "db", label: "DB", shape: "database" },
      { id: "cache", label: "Cache", shape: "rounded-rectangle" }
    ],
    edges: []
  };
  const edge = createConnector(diagram, "api", "right", "db", "left");

  assert.equal(JSON.stringify(edge), JSON.stringify({
    source: "api",
    target: "db",
    sourceAnchor: "right",
    targetAnchor: "left",
    route: "orthogonal",
    end: "arrow"
  }));
  reconnectConnector(edge, "target", "cache", "top");
  assert.equal(edge.target, "cache");
  assert.equal(edge.targetAnchor, "top");
  assert.deepEqual(deleteConnector(diagram, 0), edge);
  assert.equal(diagram.edges.length, 0);
  assert.equal(deleteConnector(diagram, 3), null);
});

test("cascade deletion and every lifecycle mutation preserve a serializable diagram", () => {
  const diagram = {
    type: "flowchart",
    canvas: { width: 600, height: 300 },
    nodes: [
      { id: "api", label: "API", shape: "rounded-rectangle", position: { x: 20, y: 40 }, size: { width: 190, height: 80 } },
      { id: "db", label: "DB", shape: "database", position: { x: 320, y: 40 }, size: { width: 190, height: 80 } }
    ],
    edges: []
  };
  const created = createNode(diagram);
  const edge = createConnector(diagram, "api", "right", created.id, "left");
  reconnectConnector(edge, "target", "db", "top");

  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));
  assert.equal(JSON.stringify(deleteNode(diagram, "db").deletedEdges), JSON.stringify([edge]));
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));
  assert.equal(diagram.edges.some((candidate) => candidate.source === "db" || candidate.target === "db"), false);
});

test("parses and serializes diagram themes and style overrides", () => {
  const source = flowchartSource([
    "version: 1",
    "id: themed-flow",
    "theme: dark",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "  grid: 5",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "    style: { fill: #123456, text: #FFFFFF }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    style: { stroke: #ABCDEF, strokeWidth: 3 }"
  ].join("\n"));
  const diagram = parseDiagram(source);

  assert.equal(diagram.theme, "dark");
  assert.equal(diagram.canvas.grid, 5);
  assert.equal(JSON.stringify(diagram.nodes[0].style), JSON.stringify({ fill: "#123456", text: "#FFFFFF" }));
  assert.equal(JSON.stringify(diagram.edges[0].style), JSON.stringify({ stroke: "#ABCDEF", strokeWidth: 3 }));
  assert.equal(
    JSON.stringify(parseDiagram(serializeDiagram(diagram))),
    JSON.stringify(diagram)
  );
});

test("renders document-theme defaults and explicit style overrides", () => {
  const source = flowchartSource([
    "theme: dark",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "    style: { fill: #123456, strokeWidth: 4 }",
    "  - id: db",
    "    label: Payments DB",
    "    shape: rounded-rectangle",
    "    position: { x: 300, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: db",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    style: { stroke: #ABCDEF, strokeWidth: 3 }"
  ].join("\n"));

  const markup = renderDiagram(source, 0);

  assert.match(markup, /fill="#123456"/);
  assert.match(markup, /stroke="#3574C7" stroke-width="4"/);
  assert.match(markup, /stroke="#ABCDEF" stroke-width="3"/);
  assert.match(markup, /fill="#EAF2FF"/);
});

test("renders edges as selectable groups with a wide hit target", () => {
  const source = flowchartSource([
    "theme: light",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "  - id: db",
    "    label: Payments DB",
    "    shape: rounded-rectangle",
    "    position: { x: 300, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: db",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    label: Reads and writes"
  ].join("\n"));

  const markup = renderDiagram(source, 2);

  assert.match(markup, /<g class="docdiagram-edge-group" data-diagram-index="2" data-edge-index="0">/);
  assert.match(markup, /<path class="docdiagram-edge-hit"[^>]*stroke="transparent"/);
  assert.match(markup, /Reads and writes/);
  assert.ok(
    markup.indexOf('data-node-id="db"') < markup.indexOf('class="docdiagram-edge-group"'),
    "connector markup follows node markup so connectors render above shapes"
  );
});

test("supportedDiagramTypes, nodeShapes, edgeAnchors, edgeRoutes, and edgeMarkerStyles expose the supported option sets", () => {
  assert.equal(JSON.stringify([...supportedDiagramTypes]), JSON.stringify(["flowchart", "sequence"]));
  assert.equal(JSON.stringify([...nodeShapes]), JSON.stringify(["rounded-rectangle", "circle", "oval", "database", "diamond", "rhombus", "flattened-hexagon", "chevron", "right-chevron", "document"]));
  assert.equal(JSON.stringify([...edgeAnchors]), JSON.stringify(["top", "right", "bottom", "left"]));
  assert.equal(JSON.stringify([...edgeRoutes]), JSON.stringify(["orthogonal", "straight", "curved"]));
  assert.equal(JSON.stringify([...edgeMarkerStyles]), JSON.stringify(["none", "arrow", "circle"]));
});

test("semantic palette roles replace manual fill, stroke, and text overrides together", () => {
  const node = {
    style: { fill: "#ffffff", stroke: "#000000", strokeWidth: 3, text: "#222222" }
  };

  setNodeColorPalette(node, "danger");

  assert.equal(node.palette, "danger");
  assert.equal(JSON.stringify(node.style), JSON.stringify({ strokeWidth: 3 }));
  const style = getNodeEffectiveStyle({ theme: "light" }, node);
  assert.equal(style.fill, colourSchemes.classic.light.danger.fill);
  assert.equal(style.stroke, colourSchemes.classic.light.danger.stroke);
  assert.equal(style.text, colourSchemes.classic.light.danger.text);
  assert.equal(style.strokeWidth, 3);

  setNodeStyleOverride(node, "fill", "#ffffff");
  setNodeStyleOverride(node, "stroke", "#000000");
  setNodeStyleOverride(node, "text", "#222222");
  const overridden = getNodeEffectiveStyle({ theme: "light" }, node);
  assert.equal(overridden.fill, "#ffffff");
  assert.equal(overridden.stroke, "#000000");
  assert.equal(overridden.text, "#222222");

  setNodeColorPalette(node, "accent");
  assert.equal(JSON.stringify(node.style), JSON.stringify({ strokeWidth: 3 }));
  const reselected = getNodeEffectiveStyle({ theme: "light" }, node);
  assert.equal(reselected.fill, colourSchemes.classic.light.accent.fill);
  assert.equal(reselected.stroke, colourSchemes.classic.light.accent.stroke);
  assert.equal(reselected.text, colourSchemes.classic.light.accent.text);
});

test("colour schemes provide every semantic role in distinct light and dark variants", () => {
  assert.deepEqual(Object.keys(colourSchemes), ["classic", "ice", "midnight", "paper"]);
  for (const scheme of Object.values(colourSchemes)) {
    assert.deepEqual(Object.keys(scheme.light), Object.keys(scheme.dark));
    assert.equal(Object.keys(scheme.light).length, 13);
  }
  assert.notEqual(colourSchemes.ice.light.accent.fill, colourSchemes.ice.dark.accent.fill);
});

test("palette selection serializes without an empty style mapping", () => {
  const diagram = parseDiagram(twoNodeEdgeSource([]));

  setNodeColorPalette(diagram.nodes[0], "neutral");

  assert.equal(diagram.nodes[0].style, undefined);
  assert.equal(
    JSON.stringify(parseDiagram(serializeDiagram(diagram))),
    JSON.stringify(diagram)
  );
});

test("requires supported node shapes and explicit edge anchors without retaining style.width aliases", () => {
  const valid = twoNodeEdgeSource(["    route: curved", "    style: { strokeWidth: 3 }"]);
  const diagram = parseDiagram(valid);

  assert.equal(diagram.nodes[0].shape, "rounded-rectangle");
  assert.equal(diagram.edges[0].sourceAnchor, "right");
  assert.equal(diagram.edges[0].targetAnchor, "left");
  assert.equal(diagram.edges[0].route, "curved");
  assert.equal(diagram.edges[0].style.strokeWidth, 3);
  assert.equal(JSON.stringify(parseDiagram(serializeDiagram(diagram))), JSON.stringify(diagram));

  assert.throws(
    () => parseDiagram(valid.replace("    shape: rounded-rectangle\n", "")),
    /Node "api" requires a shape/
  );
  assert.throws(
    () => parseDiagram(valid.replace("    sourceAnchor: right\n", "")),
    /Edge "api" -> "db" requires a sourceAnchor/
  );
  assert.throws(
    () => parseDiagram(valid.replace("    targetAnchor: left\n", "")),
    /Edge "api" -> "db" requires a targetAnchor/
  );
  assert.throws(
    () => parseDiagram(valid.replace("rounded-rectangle", "star")),
    /Unsupported node shape: star/
  );
  assert.throws(
    () => parseDiagram(valid.replace("sourceAnchor: right", "sourceAnchor: centre")),
    /Unsupported edge sourceAnchor: centre/
  );
  assert.throws(
    () => parseDiagram(valid.replace("route: curved", "route: loop")),
    /Unsupported edge route: loop/
  );
  assert.throws(
    () => parseDiagram(valid.replace("strokeWidth: 3", "width: 3")),
    /Edge style\.width is not supported; use style\.strokeWidth/
  );
});

test("resolves effective node and edge styles from theme defaults and overrides", () => {
  const diagram = { theme: "dark", canvas: {}, nodes: [], edges: [] };
  const node = { id: "api", label: "Payments API" };
  const styledNode = { ...node, style: { fill: "#123456" } };

  assert.equal(getNodeEffectiveStyle(diagram, node).fill, "#EAF2FF");
  assert.equal(getNodeEffectiveStyle(diagram, styledNode).fill, "#123456");
  assert.equal(getNodeEffectiveStyle(diagram, styledNode).stroke, "#3574C7");

  const edge = { source: "api", target: "api" };
  const styledEdge = { ...edge, style: { stroke: "#ABCDEF" } };

  assert.equal(getEdgeEffectiveStyle(diagram, edge).stroke, "#52616B");
  assert.equal(getEdgeEffectiveStyle(diagram, styledEdge).stroke, "#ABCDEF");
});

test("setFrontmatterTheme updates an existing theme key without disturbing other frontmatter", () => {
  const source = "---\ntitle: Payments\ntheme: light\nowner: payments-team\n---\n\n# Payments";
  const updated = setFrontmatterTheme(source, "dark");

  assert.equal(
    updated,
    "---\ntitle: Payments\ntheme: dark\nowner: payments-team\n---\n\n# Payments"
  );
  assert.equal(resolveDocument(updated).theme, "dark");
});

test("setFrontmatterTheme inserts a theme key when frontmatter exists without one", () => {
  const source = "---\ntitle: Payments\n---\n\n# Payments";
  const updated = setFrontmatterTheme(source, "dark");

  assert.equal(resolveDocument(updated).frontmatter.title, "Payments");
  assert.equal(resolveDocument(updated).theme, "dark");
});

test("setFrontmatterTheme creates a frontmatter block when none exists", () => {
  const source = "# Payments architecture\n\nNo frontmatter here.";
  const updated = setFrontmatterTheme(source, "dark");

  assert.equal(resolveDocument(updated).theme, "dark");
  assert.match(updated, /^---\ntheme: dark\n---\n# Payments architecture/);
});

test("node inspector helpers mutate the canonical model and round-trip through YAML", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 600",
    "  height: 300",
    "  grid: 10",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const node = diagram.nodes[0];

  setNodeLabel(node, "  Payment Gateway  ");
  setNodeStyleOverride(node, "fill", "#0000ff");
  setStyleStrokeWidth(node, "3.6");
  setNodeSize(diagram, node, "width", 123);
  setNodeSize(diagram, node, "height", 58);

  assert.equal(node.label, "Payment Gateway");
  assert.equal(node.style.fill, "#0000ff");
  assert.equal(node.style.strokeWidth, 4);
  assert.equal(node.size.width, 120);
  assert.equal(node.size.height, 60);

  const reparsed = parseDiagram(serializeDiagram(diagram));
  assert.equal(reparsed.nodes[0].label, "Payment Gateway");
  assert.equal(reparsed.nodes[0].style.fill, "#0000ff");
  assert.equal(reparsed.nodes[0].style.strokeWidth, 4);
  assert.equal(reparsed.nodes[0].size.width, 120);
  assert.equal(reparsed.nodes[0].size.height, 60);
});

test("setNodeLabel permits clearing a node label", () => {
  const node = { id: "api", label: "Payments API" };
  setNodeLabel(node, "   ");
  assert.equal(node.label, "");
});

test("edge inspector helpers mutate the canonical model and round-trip through YAML", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    label: Retry"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const edge = diagram.edges[0];

  setEdgeLabel(edge, "  Create payment intent  ");
  setEdgeRoute(edge, "straight");
  setEdgeAnchor(edge, "source", "bottom");
  setEdgeAnchor(edge, "target", "top");
  setEdgeStyleOverride(edge, "stroke", "#ff0000");
  setEdgeStyleOverride(edge, "text", "#00ff00");
  setStyleStrokeWidth(edge, "4.7");

  assert.equal(edge.label, "Create payment intent");
  assert.equal(edge.route, "straight");
  assert.equal(edge.sourceAnchor, "bottom");
  assert.equal(edge.targetAnchor, "top");
  assert.equal(edge.style.stroke, "#ff0000");
  assert.equal(edge.style.text, "#00ff00");
  assert.equal(edge.style.strokeWidth, 5);

  const reparsed = parseDiagram(serializeDiagram(diagram));
  assert.equal(reparsed.edges[0].label, "Create payment intent");
  assert.equal(reparsed.edges[0].route, "straight");
  assert.equal(reparsed.edges[0].sourceAnchor, "bottom");
  assert.equal(reparsed.edges[0].targetAnchor, "top");
  assert.equal(reparsed.edges[0].style.stroke, "#ff0000");
  assert.equal(reparsed.edges[0].style.strokeWidth, 5);
});

test("buildEdgePath produces deterministic geometry for every route and anchor pair", () => {
  const source = { x: 100, y: 100 };
  const target = { x: 300, y: 220 };

  for (const route of edgeRoutes) {
    for (const sourceAnchor of edgeAnchors) {
      for (const targetAnchor of edgeAnchors) {
        const edgePath = buildEdgePath(source, target, sourceAnchor, targetAnchor, route);
        assert.match(edgePath.path, /^M 100 100 /, `${route} ${sourceAnchor} -> ${targetAnchor}`);
        assert.match(edgePath.path, /300 220$/, `${route} ${sourceAnchor} -> ${targetAnchor}`);
        assert.equal(edgePath.hitPath, edgePath.path);
        assert.ok(Number.isFinite(edgePath.midpoint.x) && Number.isFinite(edgePath.midpoint.y));
        assert.ok(Number.isFinite(edgePath.startTangent.x) && Number.isFinite(edgePath.startTangent.y));
        assert.ok(Number.isFinite(edgePath.endTangent.x) && Number.isFinite(edgePath.endTangent.y));
      }
    }
  }

  assert.equal(
    JSON.stringify(buildEdgePath(source, target, "right", "left", "curved")),
    JSON.stringify({
      path: "M 100 100 C 200 100 200 220 300 220",
      midpoint: { x: 200, y: 160 },
      startTangent: { x: 100, y: 0 },
      endTangent: { x: 100, y: 0 },
      hitPath: "M 100 100 C 200 100 200 220 300 220"
    })
  );

  const overlapping = buildEdgePath(source, source, "right", "right", "orthogonal");
  assert.equal(overlapping.path, "M 100 100 L 100 100");
  assert.deepEqual(JSON.parse(JSON.stringify(overlapping.midpoint)), { x: 100, y: 100 });

  const sameSide = buildEdgePath({ x: 300, y: 100 }, { x: 100, y: 100 }, "right", "right", "orthogonal");
  assert.equal(sameSide.path, "M 300 100 L 400 100 L 100 100");

  const balanced = buildEdgePath(source, target, "right", "left", "orthogonal");
  assert.equal(balanced.path, "M 100 100 L 200 100 L 200 220 L 300 220");

  const rightTarget = buildEdgePath({ x: 190, y: 40 }, { x: 300, y: 40 }, "right", "right", "orthogonal");
  assert.equal(rightTarget.path, "M 190 40 L 355 40 L 300 40");
  assert.deepEqual(JSON.parse(JSON.stringify(rightTarget.endTangent)), { x: -55, y: 0 });

  const reverse = buildEdgePath({ x: 490, y: 140 }, { x: 100, y: 140 }, "right", "left", "orthogonal");
  assert.equal(reverse.path, "M 490 140 L 685 140 L 685 -55 L -95 -55 L -95 140 L 100 140");
  assert.deepEqual(JSON.parse(JSON.stringify(reverse.startTangent)), { x: 195, y: 0 });
  assert.deepEqual(JSON.parse(JSON.stringify(reverse.endTangent)), { x: 195, y: 0 });

  const aligned = buildEdgePath({ x: 100, y: 100 }, { x: 100, y: 300 }, "right", "left", "orthogonal");
  assert.equal(aligned.path, "M 100 100 L 200 100 L 200 0 L 0 0 L 0 300 L 100 300");
  assert.deepEqual(JSON.parse(JSON.stringify(aligned.startTangent)), { x: 100, y: 0 });
  assert.deepEqual(JSON.parse(JSON.stringify(aligned.endTangent)), { x: 100, y: 0 });
});

test("edge inspector exposes route and both endpoint-side controls", () => {
  const markup = buildEdgeInspectorFields(
    { theme: "light" },
    { source: "api", target: "db", sourceAnchor: "bottom", targetAnchor: "top", route: "curved" }
  );

  assert.match(markup, /class="docdiagram-inspector-route"/);
  assert.match(markup, /class="docdiagram-inspector-source-anchor"/);
  assert.match(markup, /class="docdiagram-inspector-target-anchor"/);
  assert.match(markup, /value="curved" selected/);
  assert.match(markup, /value="bottom" selected/);
  assert.match(markup, /value="top" selected/);
});

test("setStyleStrokeWidth never produces a stroke width below one", () => {
  const edge = { source: "a", target: "b" };
  setStyleStrokeWidth(edge, "-5");
  assert.equal(edge.style.strokeWidth, 1);
  setStyleStrokeWidth(edge, "not-a-number");
  assert.equal(edge.style.strokeWidth, 1);
});

test("splitTextLines normalizes CRLF and splits on newlines", () => {
  assert.equal(JSON.stringify(splitTextLines("one")), JSON.stringify(["one"]));
  assert.equal(JSON.stringify(splitTextLines("one\ntwo")), JSON.stringify(["one", "two"]));
  assert.equal(JSON.stringify(splitTextLines("one\r\ntwo\r\nthree")), JSON.stringify(["one", "two", "three"]));
  assert.equal(JSON.stringify(splitTextLines("")), JSON.stringify([""]));
  assert.equal(JSON.stringify(splitTextLines(undefined)), JSON.stringify([""]));
});

test("computeNodeTextLayout stacks label and subtitle lines and keeps the block centered", () => {
  const labelOnly = computeNodeTextLayout(20, 40, 180, 80, { label: "Payments API" });
  assert.equal(labelOnly.centerX, 20 + 90);
  assert.equal(labelOnly.labelLines.length, 1);
  assert.equal(labelOnly.subtitleLines.length, 0);

  const withSubtitle = computeNodeTextLayout(20, 40, 180, 80, {
    label: "Payments API\nGateway",
    subtitle: "Handles card capture"
  });

  assert.equal(withSubtitle.labelLines.length, 2);
  assert.equal(withSubtitle.subtitleLines.length, 1);
  // The label block should start above the subtitle block so the stack reads top-to-bottom.
  assert.ok(withSubtitle.labelStartY < withSubtitle.subtitleStartY);
});

test("shape geometry renders every supported shape with usable text bounds and perimeter anchors", () => {
  const expectedMarkup = {
    "rounded-rectangle": "<rect", circle: "<circle", oval: "<ellipse", database: "<path",
    diamond: "<polygon", rhombus: "<polygon", "flattened-hexagon": "<polygon",
    chevron: "<polygon", "right-chevron": "<polygon"
  };

  for (const shape of nodeShapes) {
    const geometry = getNodeGeometry({ shape }, 20, 40, 200, 100);
    assert.match(geometry.bodyMarkup, new RegExp(expectedMarkup[shape]));
    assert.match(renderNodeBody(geometry, { fill: "#123456", stroke: "#abcdef" }, 4), /fill="#123456" stroke="#abcdef" stroke-width="4"/);
    assert.ok(geometry.textBounds.width > 0 && geometry.textBounds.height > 0, `${shape} has usable text bounds`);
    assert.equal(JSON.stringify(Object.keys(geometry.anchors).sort()), JSON.stringify(["bottom", "left", "right", "top"]));

    for (const anchor of Object.values(geometry.anchors)) {
      assert.ok(Number.isFinite(anchor.x) && Number.isFinite(anchor.y), `${shape} anchor is finite`);
    }
  }
});

test("shape-specific anchors resolve to their rendered perimeters", () => {
  const rhombus = getNodeGeometry({ shape: "rhombus" }, 20, 40, 200, 100);
  assert.equal(rhombus.anchors.left.x, 40);
  assert.equal(rhombus.anchors.right.x, 200);
  assert.equal(rhombus.anchors.left.y, 90);
  assert.equal(rhombus.anchors.right.y, 90);

  const chevron = getNodeGeometry({ shape: "chevron" }, 20, 40, 200, 100);
  assert.match(chevron.bodyMarkup, /points="20,40 188,40 220,90 188,140 20,140 52,90"/);
  assert.equal(chevron.anchors.left.x, 52);
  assert.equal(chevron.anchors.left.y, 90);
  assert.equal(chevron.textBounds.x + chevron.textBounds.width / 2, 136);

  const rightChevron = getNodeGeometry({ shape: "right-chevron" }, 20, 40, 200, 100);
  assert.match(rightChevron.bodyMarkup, /points="20,40 188,40 220,90 188,140 20,140"/);
  assert.equal(rightChevron.anchors.left.x, 20);
  assert.equal(rightChevron.anchors.left.y, 90);

  const database = getNodeGeometry({ shape: "database" }, 20, 40, 200, 100);
  assert.equal(database.anchors.top.y, 40);
  assert.equal(database.anchors.bottom.y, 140);
});


test("document nodes render with a folded corner and reserved text bounds", () => {
  const geometry = getNodeGeometry({ shape: "document" }, 20, 40, 200, 100);

  assert.match(geometry.bodyMarkup, /M 20 40 H 202 L 220 58 V 140 H 20 Z M 202 40 V 58 H 220/);
  assert.ok(geometry.textBounds.width < 176);
  assert.equal(geometry.anchors.right.x, 220);
  assert.equal(geometry.anchors.bottom.y, 140);
});

test("circle node size changes preserve a square bounding box", () => {
  const diagram = { canvas: { grid: 5 } };
  const circle = { shape: "circle", size: { width: 150, height: 150 } };

  setNodeSize(diagram, circle, "width", 183);
  assert.equal(JSON.stringify(circle.size), JSON.stringify({ width: 185, height: 185 }));
  setNodeShape(circle, "oval");
  setNodeSize(diagram, circle, "height", 92);
  assert.equal(JSON.stringify(circle.size), JSON.stringify({ width: 185, height: 90 }));
});

test("parses and serializes a node subtitle, including multiline values, with a safe roundtrip", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    subtitle: Handles card capture",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));
  const diagram = parseDiagram(source);

  assert.equal(diagram.nodes[0].subtitle, "Handles card capture");

  setNodeSubtitle(diagram.nodes[0], "Line one\nLine two");
  setNodeLabel(diagram.nodes[0], "Multiline\nLabel");
  assert.equal(diagram.nodes[0].subtitle, "Line one\nLine two");
  assert.equal(diagram.nodes[0].label, "Multiline\nLabel");

  const serialized = serializeDiagram(diagram);
  // Newline-bearing scalars must be JSON-quoted so the YAML-like format stays one physical line per entry.
  assert.match(serialized, /subtitle: "Line one\\nLine two"/);
  assert.match(serialized, /label: "Multiline\\nLabel"/);

  const reparsed = parseDiagram(serialized);
  assert.equal(reparsed.nodes[0].subtitle, "Line one\nLine two");
  assert.equal(reparsed.nodes[0].label, "Multiline\nLabel");
  assert.equal(JSON.stringify(reparsed), JSON.stringify(diagram));
});

test("setNodeSubtitle trims whitespace and allows clearing the subtitle back to empty", () => {
  const node = { id: "api", label: "Payments API", subtitle: "Old subtitle" };
  setNodeSubtitle(node, "  New subtitle  ");
  assert.equal(node.subtitle, "New subtitle");
  setNodeSubtitle(node, "   ");
  assert.equal(node.subtitle, "");
});

test("multiline edge labels round-trip through serialization safely", () => {
  const source = flowchartSource([
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const edge = diagram.edges[0];

  setEdgeLabel(edge, "Retry\nwith backoff");
  assert.equal(edge.label, "Retry\nwith backoff");

  const serialized = serializeDiagram(diagram);
  assert.match(serialized, /label: "Retry\\nwith backoff"/);

  const reparsed = parseDiagram(serialized);
  assert.equal(reparsed.edges[0].label, "Retry\nwith backoff");
});

test("renders a node subtitle below the label and never renders the internal type as SVG text", () => {
  const source = flowchartSource([
    "theme: dark",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    subtitle: Card capture and auth",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));

  const markup = renderDiagram(source, 0);

  assert.match(markup, /class="docdiagram-node-subtitle"/);
  assert.match(markup, /Card capture and auth/);
  // The semantic type key must stay internal-only: no SVG text output should mention "service".
  assert.doesNotMatch(markup, /docdiagram-node-type/);
  assert.doesNotMatch(markup, />service</);
});

test("renders multiline node labels and subtitles as stacked tspans", () => {
  const source = flowchartSource([
    "theme: light",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: \"Payments\\nAPI\"",
    "    shape: rounded-rectangle",
    "    subtitle: \"Card capture\\nand auth\"",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 100 }",
    "edges:",
    "  - source: api",
    "    target: api",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));

  const markup = renderDiagram(source, 0);
  const labelGroup = markup.match(/<text[^>]*class="docdiagram-node-label"[^>]*>[\s\S]*?<\/text>/);
  const subtitleGroup = markup.match(/<text[^>]*class="docdiagram-node-subtitle"[^>]*>[\s\S]*?<\/text>/);

  assert.ok(labelGroup, "Expected a node label text block");
  assert.ok(subtitleGroup, "Expected a node subtitle text block");
  assert.equal((labelGroup[0].match(/<tspan/g) || []).length, 2);
  assert.match(labelGroup[0], />Payments<\/tspan>/);
  assert.match(labelGroup[0], />API<\/tspan>/);
  assert.equal((subtitleGroup[0].match(/<tspan/g) || []).length, 2);
  assert.match(subtitleGroup[0], />Card capture<\/tspan>/);
  assert.match(subtitleGroup[0], />and auth<\/tspan>/);
});

test("renders multiline edge labels as stacked tspans while preserving stroke/width overrides", () => {
  const source = flowchartSource([
    "theme: light",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "  - id: db",
    "    label: Payments DB",
    "    shape: rounded-rectangle",
    "    position: { x: 300, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: db",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    route: curved",
    "    label: \"Retry\\nwith backoff\"",
    "    start: circle",
    "    end: arrow",
    "    style: { stroke: #ABCDEF, strokeWidth: 3 }"
  ].join("\n"));

  const markup = renderDiagram(source, 0);
  const edgeLabelGroup = markup.match(/<text[^>]*class="docdiagram-edge-label"[^>]*>[\s\S]*?<\/text>/);

  assert.match(markup, /<path class="docdiagram-edge-hit" d="M 200 80 C 250 80 250 80 300 80"/);
  assert.match(markup, /<path class="docdiagram-edge" d="M 200 80 C 250 80 250 80 300 80"[^>]*marker-start=/);
  assert.match(markup, /marker-end="url\(#docdiagram-marker-0-0-end\)"/);
  assert.ok(edgeLabelGroup, "Expected an edge label text block");
  assert.equal((edgeLabelGroup[0].match(/<tspan/g) || []).length, 2);
  assert.match(edgeLabelGroup[0], />Retry<\/tspan>/);
  assert.match(edgeLabelGroup[0], />with backoff<\/tspan>/);
  assert.match(markup, /stroke="#ABCDEF" stroke-width="3"/);
});

test("inspector edge style overrides for stroke and width are reflected in the rendered markup", () => {
  const source = flowchartSource([
    "theme: light",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "  - id: db",
    "    label: Payments DB",
    "    shape: rounded-rectangle",
    "    position: { x: 300, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: db",
    "    sourceAnchor: right",
    "    targetAnchor: left"
  ].join("\n"));
  const diagram = parseDiagram(source);
  const edge = diagram.edges[0];

  // Simulate the inspector mutating the selected edge, then re-rendering from the mutated model.
  setEdgeStyleOverride(edge, "stroke", "#ff00ff");
  setStyleStrokeWidth(edge, "6");

  const markup = renderDiagram(serializeDiagram(diagram), 0);

  assert.match(markup, /stroke="#ff00ff" stroke-width="6"/);
});

test("the injected .docdiagram-edge CSS rule no longer hard-codes stroke or stroke-width so inline overrides win", () => {
  const edgeRuleMatch = runtime.match(/\.docdiagram-edge\s*\{([^}]*)\}/);

  assert.ok(edgeRuleMatch, "Expected a .docdiagram-edge CSS rule in the stylesheet template");
  assert.doesNotMatch(edgeRuleMatch[1], /stroke\s*:/);
  assert.doesNotMatch(edgeRuleMatch[1], /stroke-width\s*:/);
});

test("edge labels use the document background as a soft contrast shadow", () => {
  const labelRuleMatch = runtime.match(/\.docdiagram-edge-label\s*\{([^}]*)\}/);

  assert.ok(labelRuleMatch, "Expected a .docdiagram-edge-label CSS rule in the stylesheet template");
  assert.match(labelRuleMatch[1], /filter:\s*drop-shadow\(0 0 4px var\(--docdiagram-background\)\)/);
});

test("node and edge inline editors share focused, accessible textarea markup with newline/commit hints", () => {
  assert.match(runtime, /class="docdiagram-inline-editor docdiagram-inline-editor-node"/);
  assert.match(runtime, /class="docdiagram-inline-editor docdiagram-inline-editor-edge"/);
  assert.match(runtime, /aria-label="Edit node label\. Press Enter for a new line\. Press Control or Command plus Enter to save\. Press Escape to cancel\."/);
  assert.match(runtime, /aria-label="Edit edge label\. Press Enter for a new line\. Press Control or Command plus Enter to save\. Press Escape to cancel\."/);
});

function twoNodeEdgeSource(edgeLines) {
  return flowchartSource([
    "theme: light",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: api",
    "    label: Payments API",
    "    shape: rounded-rectangle",
    "    position: { x: 20, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "  - id: db",
    "    label: Payments DB",
    "    shape: rounded-rectangle",
    "    position: { x: 300, y: 40 }",
    "    size: { width: 180, height: 80 }",
    "edges:",
    "  - source: api",
    "    target: db",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    ...edgeLines
  ].join("\n"));
}

test("getEdgeMarkerStyle defaults start to none and end to arrow when start/end are omitted", () => {
  const edge = { source: "api", target: "db" };

  assert.equal(getEdgeMarkerStyle(edge, "start"), "none");
  assert.equal(getEdgeMarkerStyle(edge, "end"), "arrow");
});

test("getEdgeMarkerStyle falls back to the default for an unrecognised marker style", () => {
  const edge = { source: "api", target: "db", start: "hexagon", end: "hexagon" };

  assert.equal(getEdgeMarkerStyle(edge, "start"), "none");
  assert.equal(getEdgeMarkerStyle(edge, "end"), "arrow");
});

test("renders no start marker and an end arrow for default backwards-compatible edges", () => {
  const markup = renderDiagram(twoNodeEdgeSource([]), 0);

  assert.doesNotMatch(markup, /marker-start=/);
  // A start: none default should still render an end arrow, matching pre-existing edge visuals.
  assert.match(markup, /marker-end="url\(#docdiagram-marker-0-0-end\)"/);
  assert.match(markup, /<marker id="docdiagram-marker-0-0-end"/);
  assert.doesNotMatch(markup, /<marker id="docdiagram-marker-0-0-start"/);
});

test("renders marker-start and marker-end attributes and defs for each supported marker style", () => {
  for (const style of edgeMarkerStyles) {
    const markup = renderDiagram(twoNodeEdgeSource([`    start: ${style}`, `    end: ${style}`]), 0);

    if (style === "none") {
      assert.doesNotMatch(markup, /marker-start=/, `expected no marker-start for style ${style}`);
      assert.doesNotMatch(markup, /marker-end=/, `expected no marker-end for style ${style}`);
      assert.doesNotMatch(markup, /<marker /, `expected no marker defs for style ${style}`);
      continue;
    }

    assert.match(markup, /marker-start="url\(#docdiagram-marker-0-0-start\)"/, `expected marker-start for style ${style}`);
    assert.match(markup, /marker-end="url\(#docdiagram-marker-0-0-end\)"/, `expected marker-end for style ${style}`);
    assert.match(markup, /<marker id="docdiagram-marker-0-0-start"/, `expected a start marker def for style ${style}`);
    assert.match(markup, /<marker id="docdiagram-marker-0-0-end"/, `expected an end marker def for style ${style}`);

    if (style === "circle") {
      assert.match(markup, /<circle cx="5\.5" cy="5\.5" r="4\.18"/);
    }

    if (style === "arrow") {
      assert.match(markup, /orient="auto-start-reverse"/);
      assert.match(markup, /orient="auto"/);
    }
  }
});

test("each edge gets unique marker ids so overrides on one edge cannot leak into another edge's markers", () => {
  const source = flowchartSource([
    "theme: light",
    "canvas:",
    "  width: 900",
    "  height: 300",
    "nodes:",
    "  - id: a",
    "    label: A",
    "    shape: rounded-rectangle",
    "    position: { x: 0, y: 0 }",
    "    size: { width: 100, height: 60 }",
    "  - id: b",
    "    label: B",
    "    shape: rounded-rectangle",
    "    position: { x: 200, y: 0 }",
    "    size: { width: 100, height: 60 }",
    "  - id: c",
    "    label: C",
    "    shape: rounded-rectangle",
    "    position: { x: 400, y: 0 }",
    "    size: { width: 100, height: 60 }",
    "edges:",
    "  - source: a",
    "    target: b",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    start: circle",
    "    end: circle",
    "    style: { stroke: \"#ff0000\" }",
    "  - source: b",
    "    target: c",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "    start: circle",
    "    end: circle",
    "    style: { stroke: \"#00ff00\" }"
  ].join("\n"));

  const markup = renderDiagram(source, 3);

  assert.match(markup, /id="docdiagram-marker-3-0-start"/);
  assert.match(markup, /id="docdiagram-marker-3-0-end"/);
  assert.match(markup, /id="docdiagram-marker-3-1-start"/);
  assert.match(markup, /id="docdiagram-marker-3-1-end"/);

  const markerIds = [...markup.matchAll(/<marker id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(markerIds).size, markerIds.length, "expected every marker id to be unique");

  // Each edge's own markers must use its own resolved stroke, not the other edge's stroke.
  const firstMarkerDefs = markup.slice(markup.indexOf('id="docdiagram-marker-3-0-start"'), markup.indexOf('id="docdiagram-marker-3-1-start"'));
  assert.match(firstMarkerDefs, /fill="#ff0000"/);
  assert.doesNotMatch(firstMarkerDefs, /fill="#00ff00"/);
});

test("marker defs use user-space units and scale gently with edge stroke width", () => {
  const markup = renderDiagram(twoNodeEdgeSource([
    "    start: circle",
    "    end: arrow",
    "    style: { strokeWidth: 12 }"
  ]), 0);

  const markerDefs = [...markup.matchAll(/<marker [^>]*>/g)];
  assert.ok(markerDefs.length >= 2, "expected both a start and end marker def");

  for (const markerDef of markerDefs) {
    assert.match(markerDef[0], /markerUnits="userSpaceOnUse"/);
  }

  // The wide stroke-width must not be applied as a marker stroke, but dimensions
  // should increase at a moderated rate to remain visible without becoming huge.
  for (const markerDef of markerDefs) {
    assert.doesNotMatch(markerDef[0], /stroke-width="12"/);
    assert.match(markerDef[0], /markerWidth="36" markerHeight="36"/);
  }
});

test("marker dimensions scale moderately and keep circles wider than their edge", () => {
  assert.equal(JSON.stringify(getEdgeMarkerDimensions(2)), JSON.stringify({ size: 11, circleRadius: 4.18 }));
  assert.equal(JSON.stringify(getEdgeMarkerDimensions(6)), JSON.stringify({ size: 21, circleRadius: 7.98 }));
  assert.equal(JSON.stringify(getEdgeMarkerDimensions(12)), JSON.stringify({ size: 36, circleRadius: 13.68 }));
});

test("marker fill/stroke colour resolves from the edge's effective line stroke, never the label text colour", () => {
  const markup = renderDiagram(twoNodeEdgeSource([
    "    start: circle",
    "    end: arrow",
    "    style: { stroke: \"#123abc\", text: \"#abcdef\" }"
  ]), 0);

  const markerStart = markup.match(/<marker id="docdiagram-marker-0-0-start"[^>]*>[\s\S]*?<\/marker>/)[0];
  const markerEnd = markup.match(/<marker id="docdiagram-marker-0-0-end"[^>]*>[\s\S]*?<\/marker>/)[0];

  assert.match(markerStart, /fill="#123abc"/);
  assert.match(markerEnd, /fill="#123abc"/);
  assert.doesNotMatch(markerStart, /#abcdef/);
  assert.doesNotMatch(markerEnd, /#abcdef/);
});

test("start/end marker styles parse from YAML and round-trip through serialization", () => {
  const source = twoNodeEdgeSource(["    start: circle", "    end: none"]);
  const diagram = parseDiagram(source);

  assert.equal(diagram.edges[0].start, "circle");
  assert.equal(diagram.edges[0].end, "none");

  const reparsed = parseDiagram(serializeDiagram(diagram));
  assert.equal(reparsed.edges[0].start, "circle");
  assert.equal(reparsed.edges[0].end, "none");
  assert.equal(JSON.stringify(reparsed), JSON.stringify(diagram));
});

test("an edge without start/end fields omits them from the parsed model, preserving the implicit defaults", () => {
  const diagram = parseDiagram(twoNodeEdgeSource([]));

  assert.equal(diagram.edges[0].start, undefined);
  assert.equal(diagram.edges[0].end, undefined);
  assert.equal(getEdgeMarkerStyle(diagram.edges[0], "start"), "none");
  assert.equal(getEdgeMarkerStyle(diagram.edges[0], "end"), "arrow");
});

test("setEdgeMarkerStart and setEdgeMarkerEnd mutate the canonical model and round-trip through YAML", () => {
  const diagram = parseDiagram(twoNodeEdgeSource([]));
  const edge = diagram.edges[0];

  setEdgeMarkerStart(edge, "circle");
  setEdgeMarkerEnd(edge, "none");

  assert.equal(edge.start, "circle");
  assert.equal(edge.end, "none");

  const reparsed = parseDiagram(serializeDiagram(diagram));
  assert.equal(reparsed.edges[0].start, "circle");
  assert.equal(reparsed.edges[0].end, "none");
});

test("setEdgeMarkerStart and setEdgeMarkerEnd normalize unsupported values back to their defaults", () => {
  const edge = { source: "api", target: "db" };

  setEdgeMarkerStart(edge, "hexagon");
  setEdgeMarkerEnd(edge, "hexagon");

  assert.equal(edge.start, "none");
  assert.equal(edge.end, "arrow");
});

test("the source tray exposes a top-edge resize handle instead of a corner grabber", () => {
  const bundle = fs.readFileSync(path.resolve(__dirname, "..", "dist", "skryb-runtime.js"), "utf8");
  const trayRule = bundle.match(/\.docdiagram-source-tray \{([^}]*)\}/);

  assert.ok(trayRule, "the tray rule is present in the bundled styles");
  assert.match(bundle, /class="docdiagram-source-resize"/, "the tray renders a resize handle");
  assert.match(bundle, /role="separator"/, "the handle is exposed as a separator");
  assert.match(bundle, /aria-label="Resize source editor"/, "the handle is labelled");
  assert.match(bundle, /tabindex="0"/, "the handle is keyboard reachable");
  assert.match(bundle, /\.docdiagram-source-resize \{[^}]*cursor: ns-resize/, "the handle shows a vertical resize cursor");
  assert.doesNotMatch(
    trayRule[1],
    /resize:\s*vertical/,
    "the tray no longer relies on CSS resize, which is inert while its overflow stays visible"
  );
});

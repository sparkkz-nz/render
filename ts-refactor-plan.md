# Skryb TypeScript refactor and packaging plan

## Goal

Refactor the single-file browser runtime into a well-structured TypeScript
codebase while continuing to publish one minified, browser-ready
`skryb-runtime.js` file. Existing portable HTML documents must continue to use
the current contract:

```html
<script src="https://sparkkz-nz.github.io/render/latest/skryb-runtime.js" defer></script>
```

The source document remains canonical. It contains Markdown, frontmatter, and
diagram source in `template#source`; the runtime renders it into
`#rendered-document`, supports editing, and saves a complete copy of the HTML
document.

## Decision

Use TypeScript source and esbuild to create a single minified IIFE bundle.

- TypeScript makes diagram, document, renderer, and editor state explicit.
- esbuild compiles, bundles, and minifies quickly with minimal configuration.
- An IIFE bundle runs as a classic script and therefore works in documents
  opened from `file://` as well as hosted documents.
- The deployed filename and URL are `skryb-runtime.js`.
- The Skryb runtime is the only published browser artifact.
- No UI framework is required. The runtime's direct DOM/SVG interactions remain
  appropriate for the product.

Do not publish ESM chunks or require a module script. Those approaches weaken
the current portable-document contract.

## Target structure

```text
src/
  index.ts                    browser bootstrap and explicit public globals
  core/
    document.ts               frontmatter, source validation, source ranges
    markdown.ts               block and inline Markdown rendering
    diagrams/
      schema.ts               document and diagram TypeScript types
      parser.ts               diagram parsing and validation
      serializer.ts           diagram serialization
      mutations.ts            node and edge lifecycle mutations
      styles.ts               themes, palettes, and style resolution
      geometry.ts             shapes, anchors, routes, and text layout
      flowchart-renderer.ts   flowchart SVG rendering
      sequence-renderer.ts    sequence SVG rendering
  editor/
    document-editor.ts        source tray, document settings, and export
    diagram-editor.ts         selection, dragging, resizing, and connection
    inspector.ts              inspector UI and mutations
  ui/
    styles.ts                 injected runtime CSS
scripts/
  build.mjs                   esbuild build and artifact checks
test/
  ...                         unit and built-artifact integration tests
dist/
  skryb-runtime.js            generated deployable artifact
```

This is a target, not a prerequisite for the initial build migration. Extract
modules by responsibility after the generated artifact is proven compatible.

## Public boundary

`DocDiagramCore` is retained as a deliberately small global export for runtime
integration tests. It contains parsing, validation, serialization, layout, and
mutation helpers, rather than editor state or arbitrary internals.

The browser bootstrap continues to:

1. find `#source` and `#rendered-document`;
2. inject styles;
3. render the canonical source;
4. bind document-level interaction handlers only when both elements exist.

## Migration phases

### 1. Build foundation

- Add `package.json`, `tsconfig.json`, and esbuild.
- Compile a TypeScript-compatible runtime entry point to one unminified IIFE
  first, then enable minification for deployment.
- Preserve the browser global and the runtime's classic-script behavior.
- Add an artifact-level test that evaluates the built JavaScript in the existing
  Node VM context.

### 2. Type the domain

- Define types for documents, frontmatter, flowcharts, sequences, nodes, edges,
  palettes, styles, and editor state.
- Replace implicit object shapes incrementally.
- Use narrow validation and type guards at parse boundaries; do not use broad
  casts or unchecked input.

### 3. Extract pure core

- Move document parsing, diagram parsing, validation, serialization, mutations,
  geometry, routing, themes, and palette resolution into dependency-light
  modules.
- Move corresponding focused tests with each extraction.

### 4. Extract rendering and editing

- Separate Markdown, flowchart, and sequence renderers.
- Separate browser editing orchestration from pure mutation functions.
- Keep the source template as the sole persisted authority; in-memory diagram
  models and DOM/SVG output remain derived state.

### 5. Publish generated artifacts

- Update GitHub Pages deployment to install dependencies, test, build, and
  publish `dist/skryb-runtime.js` at the current stable, development, and
  release locations.
- Add deterministic artifact checks to CI.

## Safeguards

- Preserve the existing Markdown and diagram-source compatibility contract.
- Preserve direct opening of documents from the local filesystem.
- Keep the output a single script with no network dependency beyond the
  configured script URL.
- Do not bundle a UI framework.
- Do not let Mermaid or another editor library's internal representation become
  the canonical source format.
- Retain end-to-end tests for the generated artifact, including its
  `DocDiagramCore` export.
- Treat `dist/skryb-runtime.js` as generated output, never as the editable
  implementation source.

## Verification

For every phase:

1. run TypeScript checking;
2. run the targeted Node test suite;
3. test the generated bundle in the Node VM context;
4. manually open `example.html`, edit a diagram, save a copy, and reopen it;
5. confirm that canonical Markdown and diagram source round-trip unchanged
   except for the intended edit.

## Future extensions enabled by this work

- Mermaid import isolated from canonical diagram parsing.
- Additional diagram types.
- Rich Markdown extensions using named parser stages.
- Deterministic offline export that embeds a pinned, tested runtime bundle.
- Optional package/library distribution without changing portable-document
  consumption.

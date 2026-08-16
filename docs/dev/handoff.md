# Skryb refactor handoff

## Current state

The application is still functionally the existing browser-resident document
renderer: a portable HTML document embeds canonical Markdown and diagram source
in `template#source`, while a browser runtime renders it into
`#rendered-document`, supports editing, and saves a complete copy.

The TypeScript/build foundation is complete. The implementation has not yet
been split into modules: [render-runtime.js](../../render-runtime.js) remains
the 4,100-line legacy source while the refactor proceeds incrementally.

## Completed in this slice

- Added TypeScript configuration and an esbuild build:
  - [package.json](../../package.json)
  - [tsconfig.json](../../tsconfig.json)
  - [src/index.ts](../../src/index.ts)
  - [scripts/build.mjs](../../scripts/build.mjs)
- The standard build creates the browser-compatible, minified
  `dist/skryb-runtime.js` IIFE. It remains usable as a classic deferred script,
  including from documents opened through `file://`.
- Existing Node integration tests now run against the built artifact rather
  than directly evaluating the source runtime.
- The Pages workflow runs dependency installation, TypeScript checking, tests,
  and the build before publishing.
  - Pages publishes one Skryb runtime artifact per channel:

  | Channel | Skryb runtime |
  | --- | --- |
  | Latest | `latest/skryb-runtime.js` |
  | Development | `dev/skryb-runtime.js` |
  | Release | `releases/<tag>/skryb-runtime.js` |

- [README.md](../../README.md) and
  [ts-refactor-plan.md](../../ts-refactor-plan.md) describe the Skryb runtime
  URLs and the modularization target.
- [claude.md](../../claude.md) contains local GitHub REST API pull-request
  instructions. It is intentionally excluded by [.gitignore](../../.gitignore)
  and must not be committed.

## Commands

```sh
npm ci
npm run check
npm test
```

`npm test` builds `dist/skryb-runtime.js` and runs
[test/render-runtime.test.js](../../test/render-runtime.test.js) against it.

Pages builds the checked-out TypeScript source once and publishes the generated
`dist/skryb-runtime.js` artifact to the appropriate channel.

## Validation completed

The following passed after the build foundation and Skryb runtime changes:

```sh
npm run check
npm run build
node --test --test-reporter=dot test/render-runtime.test.js
```

The minified Skryb artifact was 85,641 bytes at handoff.

## Next recommended work

Follow the staged architecture in [ts-refactor-plan.md](../../ts-refactor-plan.md).
Do not rewrite the runtime wholesale. Preserve the built-artifact integration
test continuously and extract one test-covered responsibility at a time.

Recommended order:

1. Add strict TypeScript domain types for documents, frontmatter, flowcharts,
   sequences, nodes, edges, palettes, and style overrides.
2. Extract pure diagram modules: schema constants, parsing/validation,
   serialization, mutations, themes/palettes, and geometry/routing.
3. Move their existing test cases into focused module tests while retaining the
   artifact-level test.
4. Extract Markdown, flowchart, and sequence rendering.
5. Extract editing controllers, source editor, persistence/export, and finally
   bootstrap into [src/index.ts](../../src/index.ts).

## Constraints to preserve

- The Markdown-plus-diagram source inside `template#source` is authoritative.
  The DOM/SVG and in-memory models are derived state.
- Keep one classic-script bundle. Do not require ESM loading, code splitting,
  a server, or a UI framework.
- Preserve the existing document format and the Skryb runtime channel URLs.
- Keep `DocDiagramCore` as a narrow, deliberate test boundary rather than
  exposing editor state as a public API.
- Future Mermaid import must be isolated from canonical diagram parsing; no
  third-party renderer/editor representation becomes persisted source.
- A future offline export should embed a tested, pinned runtime bundle, not
  attempt to fetch a local script at save time.

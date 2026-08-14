# Handoff notes

## Current proof of concept

The proof of concept now supports:

- a browser-openable HTML document containing Markdown in
  `<template id="source">`;
- a small custom Markdown renderer for headings, paragraphs, lists, ordinary
  code blocks, and `diagram` code blocks;
- a restricted YAML diagram syntax with explicit canvas, nodes, edges,
  positions, and dimensions;
- polished SVG flow diagrams with semantic application, service, datastore,
  and note styles;
- view/edit modes;
- node selection, label editing, and drag positioning;
- source serialization after edits;
- **Save a copy**, which downloads an updated HTML document.

The main sample is [example.html](../example.html), driven by
[docdiagram-runtime.js](../docdiagram-runtime.js).

## Development runtime

[example.html](../example.html) currently references the runtime through this
machine-specific absolute file URL:

```text
file:///Users/stuart.parkinson/hacks/render/docdiagram-runtime.js
```

This means saved development copies can be opened from another local folder on
this machine. It is not portable to another machine. Before sharing documents,
replace it with an immutable public runtime URL as described in
[devnotes.md](devnotes.md).

## Validation completed

- `node --check docdiagram-runtime.js`
- `git diff --check`
- Headless Chrome rendering through `file://`
- Browser round trip: select node, edit label, drag node, save HTML, and
  reopen the saved copy with the edit preserved
- Loading an HTML file from `/tmp` through the absolute local runtime URL

## Next recommended work

Proceed with the visual refinement slice:

1. improve selected-node indication and editing affordances;
2. refine node layout, labels, and connector presentation;
3. add configurable node and connector styles to the diagram schema;
4. add focused automated parser/serialization tests before expanding supported
   Markdown or diagram types.

Defer **Save offline version** until there is a deterministic packaging step
that can embed a pinned runtime release. The requirement and design constraint
are recorded in [plan.md](plan.md).

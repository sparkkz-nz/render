# Handoff notes

## Current proof of concept

The proof of concept now supports:

- a browser-openable HTML document containing Markdown in
  `<template id="source">`;
- a small custom Markdown renderer for headings, paragraphs, lists, ordinary
  code blocks, and `diagram` code blocks;
- a restricted YAML diagram syntax with explicit canvas, nodes, edges,
  positions, dimensions, required node shapes, and required connector
  source/target anchors;
- polished SVG flow diagrams with semantic application, service, datastore,
  and note styles;
- an internal-only node `type`: it still drives theme colours and is editable
  in the inspector, but it is never rendered as SVG text;
- an optional free-text node `subtitle`, rendered below the label (styled with
  the theme's `subtitleText` colour) and editable only in the properties
  inspector;
- multiline support for node labels, node subtitles, and edge labels: the
  inspector uses `<textarea>` controls, and the SVG renderer stacks each
  value's lines as centred `<tspan>`s (`splitTextLines`/`renderTextBlock`/
  `computeNodeTextLayout`) so multi-line content remains vertically centred
  and evenly spaced within the node or along the edge;
- view/edit modes;
- node selection, label editing, and drag positioning;
- in-place, multiline label editing for both nodes and edges: first click
  selects, second click opens a focused `foreignObject`/`<textarea>` editor
  (`aria-label` documents the shortcuts); Enter inserts a newline, Ctrl/Cmd+
  Enter commits, Escape cancels and discards the edit, and blur commits —
  none of this interferes with node dragging, resizing, or edge/node
  selection;
- selected-node bottom-right resize handles with minimum dimensions;
- edge selection in edit mode, with a wide invisible hit target and a clear
  selected-edge highlight, without disturbing node drag/resize/label
  interactions;
- opt-in `canvas.grid` snapping for move and resize edits;
- independent edge endpoint marker selectors: edge `start`/`end` fields each
  accept `none`, `arrow`, or `circle` (defaulting to backwards-compatible
  `start: none` / `end: arrow` when omitted). Every edge renders its own
  uniquely-scoped `<marker>` defs (`docdiagram-marker-<diagram>-<edge>-start`/
  `-end`) with `markerUnits="userSpaceOnUse"` so marker size stays fixed
  regardless of the edge's stroke width, and each marker's fill/stroke always
  resolves from that edge's effective line `stroke` (never the label `text`
  colour), so overrides never bleed between edges. `marker-start`/`marker-end`
  attributes (and their `<marker>` defs) are only emitted for non-`none`
  endpoints. Arrow markers use `orient="auto-start-reverse"` at the start so
  they point the right way regardless of which end they're on;
- built-in `light` and `dark` themes selected in Markdown YAML frontmatter,
  consistently styling the surrounding page (`html`/`body`), prose, controls,
  and diagrams; a diagram may override the document theme, with optional
  per-node and per-edge style overrides — including the shared `stroke` and
  `strokeWidth` properties, which render and persist correctly;
- a toolbar theme selector that rewrites the `theme` YAML frontmatter field
  directly (preserving any other frontmatter keys/comments) and rerenders;
- a compact toolbar properties inspector that follows the selected node or
  edge: node label/subtitle/type/fill/border/border width/text colour/width/height
  (clamped to the minimum size and grid), and edge
  label/route/start/end/stroke/label colour/stroke width — `Start` and `End`
  selects expose the three marker styles; every inspector edit persists to
  the canonical YAML through the existing serializer;
- source serialization after edits, including safe multiline round-tripping:
  any label/subtitle containing `\n` is JSON-quoted by the existing
  serializer (`formatScalar`'s unquoted-safe regex already rejects newlines),
  so line breaks always survive a parse → serialize → parse cycle;
- **Save a copy**, which downloads an updated HTML document.

The main sample is [example.html](../../example.html), driven by
[render-runtime.js](../../render-runtime.js). It demonstrates required
node shapes, explicit non-default connector anchors, the `curved` route, a
node subtitle, multiline labels, an edge `style.strokeWidth` override, and
non-default edge endpoint markers.

## Bug fix: edge stroke width not visibly updating

Inspector changes to an edge's `style.stroke` and `style.strokeWidth` were always
computed and serialized correctly, but never rendered: the injected
stylesheet's `.docdiagram-edge` rule hard-coded `stroke` and `stroke-width`,
and CSS declarations always beat SVG presentation attributes in the cascade,
regardless of selector specificity. The fix removes those hard-coded
declarations (and the now-redundant `marker-end`) from `.docdiagram-edge`, so
each edge's inline `stroke="…"`/`stroke-width="…"` attributes (already
correctly computed by `getEdgeEffectiveStyle`) take effect. Verified visually
in a real browser: changing stroke/width in the inspector now immediately
recolors/rethickens the selected edge, and the change survives a rerender.

## Development runtime

[example.html](../../example.html) currently references the runtime through this
machine-specific absolute file URL:

```text
file:///Users/stuart.parkinson/hacks/render/render-runtime.js
```

This means saved development copies can be opened from another local folder on
this machine. It is not portable to another machine. Before sharing documents,
replace it with an immutable public runtime URL as described in
[devnotes.md](devnotes.md).

## Validation completed

- `node --check render-runtime.js`
- `node --test test/render-runtime.test.js` — 59 tests covering helpers,
  frontmatter persistence, node/edge YAML round-trip, the new `subtitle`
  field (including multiline round-trip), multiline node label/subtitle/edge
  label rendering as stacked `<tspan>`s, absence of `node.type` as SVG text,
  node and edge `stroke`/`strokeWidth` overrides reflected in rendered markup,
  required node-shape and edge-anchor schema validation, supported curved
  routes, a regression
  guard asserting the `.docdiagram-edge` CSS rule no longer hard-codes
  `stroke`/`stroke-width`, and edge endpoint markers: `start`/`end` defaults,
  markup for each of `none`/`arrow`/`circle`, unique per-edge marker ids
  (with no cross-edge stroke bleed), `markerUnits="userSpaceOnUse"` staying
  independent of stroke-width, marker colour resolving from the edge stroke
  rather than the label text colour, and YAML parse/serialize/mutator
  round-trips (including normalization of unsupported marker values)
- `git diff --check`
- Headless Chrome rendering through `file://`
- Browser round trip: select node, edit label, drag node, save HTML, and
  reopen the saved copy with the edit preserved
- Loading an HTML file from `/tmp` through the absolute local runtime URL
- Manual browser pass for this slice (Chrome via `file://` on the updated
  `example.html`): confirmed node subtitle displays below the label with no
  visible `type` text; edited a node's multiline label and subtitle via the
  inspector textareas and saw both stack correctly; edited an edge's stroke
  colour and stroke width via the inspector and saw the rendered edge visibly
  recolor/thicken (confirming the CSS fix); selected an edge, clicked it
  again to open the in-place multiline editor, confirmed Enter inserts a
  newline, Ctrl+Enter commits, and Escape discards an in-progress edit
  without leaking it (including through the editor's forced blur on
  rerender); confirmed node dragging and the resize handle still work
  unchanged with the new subtitle/multiline layout in place

This slice's inspector/theme-selector/edge-selection UI was implemented and
covered by the Node test suite above and the manual browser pass; hamburger/
offline-menu work remains explicitly deferred (see below).

## Next recommended work

Implement the dependency-ordered editor-polish slices in
[editor-polish-plan.md](editor-polish-plan.md):

1. render and edit the requested shape palette;
2. render side-aware straight, orthogonal, and curved connectors;
3. create, reconnect, and delete nodes and connectors;
4. replace the permanent inspector with compact menu/popover editor chrome and
   add zoom/scroll refinement.

Defer **Save offline version** until there is a deterministic packaging step
that can embed a pinned runtime release. The requirement and design constraint
are recorded in [plan.md](plan.md).

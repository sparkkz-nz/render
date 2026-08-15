# Editable HTML document diagrams: MVP plan

## Purpose

Create a portable HTML document format that opens directly in a browser and
renders polished Markdown prose and editable diagrams. A recipient must be
able to view the document without installing software. A user may edit a
diagram in the browser and download an updated copy of the document.

The format must remain easy for a human or an agent to read and change in
source form. Diagram positions and other intentional visual choices are
persisted rather than being recreated by an automatic layout engine.

## Goals

- A single HTML document opens through `file://` or a normal web URL.
- The document contains its own canonical Markdown source.
- Standard Markdown prose is rendered as HTML.
- A `diagram` fenced code block renders as a polished SVG diagram.
- Users can enter an edit mode, change a node label, and drag a node.
- Saving downloads a new HTML document whose source preserves those edits.
- Reopening the downloaded document reproduces the edited diagram.
- The runtime can be loaded locally during development and from a versioned
  GitHub Pages URL for shared documents.

## Deferred capabilities (not MVP scope)

- Multi-user or real-time collaboration.
- Server-side storage, authentication, or synchronization.
- Editing arbitrary rich text in a WYSIWYG editor.
- General-purpose drawing/canvas tooling.
- Importing Miro, draw.io, or arbitrary SVG diagrams.
- Sophisticated automatic layout as the source of truth.
- A VS Code extension or standalone desktop application.
- A fully self-contained/offline runtime export (planned as a later **Save
  offline version** option).

These are deferred rather than rejected. The format and runtime architecture
must not make them needlessly difficult to add.

## Decisions already made

### Distribution

The canonical distributable artifact is an HTML file. It embeds the source
content and references a rendering runtime through a script element.

During development, use a relative script URL:

```html
<script src="./docdiagram-runtime.js" defer></script>
```

For distribution, use an immutable versioned runtime URL hosted from
`sparkkz-makes` GitHub Pages:

```html
<script
  src="https://sparkkz-makes.github.io/render/docdiagram-runtime-1.0.0.js"
  defer>
</script>
```

Do not overwrite a published runtime filename. See
[devnotes.md](devnotes.md) for the release convention.

### Source versus rendered output

The document keeps its canonical Markdown in an inert HTML template, for
example:

````html
<template id="source" type="text/markdown">
# Payments architecture

```diagram
version: 1
id: payments-flow
nodes: []
edges: []
```
</template>

<main id="rendered-document"></main>
````

The runtime reads the template and renders into the separate `main` element.
It must never try to reconstruct Markdown or diagram semantics from rendered
HTML or SVG.

### Diagram source

Diagram blocks use a small, versioned structured schema. YAML is the initial
authoring format because it is readable in Markdown and produces reviewable
source-control diffs.

Manual placement is first-class data. At minimum each node has:

```yaml
id: payments-api
label: Payments API
type: service
position: { x: 420, y: 250 }
size: { width: 210, height: 88 }
```

Edges identify source and target nodes and may have a label and routing data.
The runtime must preserve known fields it does not edit where practical.

## MVP document contract

### HTML shell

The initial shell contains:

- normal document metadata and title;
- one deferred runtime script;
- one `<template id="source">` containing Markdown;
- one `<main id="rendered-document">` render target.

The runtime should surface a clear in-document load error if it cannot start.

### Markdown

The renderer supports headings, paragraphs, lists, links, inline code, code
blocks, and `diagram` fenced blocks. Raw HTML in Markdown is out of scope for
the MVP unless it is explicitly sanitized and supported.

### Diagram v1

Support:

- rounded-rectangle nodes;
- a small semantic node-type style set, initially `application`, `service`,
  `datastore`, and `note`;
- built-in `light` and `dark` themes selected by a document-level `theme` YAML
  frontmatter field, consistently styling Markdown prose, controls, and
  diagrams; a diagram-level `theme` may override it for a single diagram;
  optional per-node and per-edge style overrides;
- directed, labelled straight or orthogonal edges;
- explicit node positions and dimensions;
- an explicit canvas width, height, and optional `grid` increment; when present,
  move and resize edits snap to its nearest multiple;
- SVG output.

Do not add arbitrary shapes, custom SVG, freehand drawing, containers, or
automatic graph layout until the source model and edit/save round trip are
proven.

### Editing

View mode is the default. Edit mode exposes:

- direct editing of a node label;
- drag-and-drop node positioning and resizing, with optional grid snapping;
- edge selection alongside node selection, each with a clear selected state;
- a compact toolbar properties inspector that follows the selected node or
  edge (node: label, type, fill/border/text colours, width/height; edge:
  label, route, start/end endpoint markers, stroke, label colour, width) and
  persists every change to the canonical YAML;
- a document theme selector that updates the YAML frontmatter `theme` field
  and rerenders, styling the surrounding page as well as the document;
- a visible **Save a copy** action;
- a way to leave edit mode without saving.

Every edit changes the in-memory canonical diagram model, updates the
corresponding Markdown source, and re-renders the diagram. Direct DOM/SVG
edits are not a persistence mechanism.

### Saving

**Save a copy** serializes a complete replacement HTML document, creates a
`Blob`, and triggers a browser download. It does not attempt to overwrite the
opened local file.

The downloaded output retains:

- the original HTML shell and runtime URL;
- the updated Markdown in `#source`;
- no transient editing controls or renderer-only state.

## Architecture

```text
HTML document
  |
  +-- <template id="source"> canonical Markdown
  |
  +-- versioned docdiagram runtime
        |
        +-- Markdown parser and HTML sanitizer
        +-- diagram-block parser and schema validator
        +-- document/SVG renderer
        +-- edit interaction layer
        +-- source serializer and download exporter
```

The persisted diagram schema is independent of the renderer/editor library.
A library may be used for drag interactions, but its internal JSON model and
SVG output must not become the source format.

## Future compatibility and upgrade path

The following capabilities are explicitly out of scope for the MVP but are
anticipated. They inform the document model, parser boundaries, and renderer
choice.

### Markdown input and Mermaid migration

The runtime will eventually accept any valid Markdown document as initial
source. The browser-openable HTML format remains the saved/distributed
artifact, but the input path must support importing Markdown into its
`#source` template.

Mermaid fenced blocks are a one-way import path:

1. On first load/import, recognise a `mermaid` fenced block.
2. Convert a supported Mermaid diagram to the canonical `diagram` syntax.
3. Render and subsequently save the canonical `diagram` syntax, not Mermaid.

Support can be introduced diagram type by diagram type. Unsupported Mermaid
syntax must render an explicit **Diagram type not supported** result, retaining
the original source for diagnosis and future migration rather than silently
discarding it.

**Design implication:** keep Mermaid parsing/conversion in an importer module,
separate from canonical diagram parsing and rendering. The canonical schema
must not depend on Mermaid's internal representation.

### Rich Markdown extensions

Future Markdown extensions may add page-like layout and styling, including
side-by-side text blocks and scoped colour/style markup.

**Design implication:** implement Markdown processing as an extensible parser
pipeline with named block/inline extensions, rather than ad hoc HTML string
replacement. Extensions require an explicit syntax, a structured intermediate
representation, sanitised rendering, and a defined serialization rule.

### Text editing and source editing

Future editor modes include:

- WYSIWYG text editing;
- a source-editor popup for raw Markdown;
- syntax validation and useful error locations.

**Design implication:** preserve a source-oriented document model and retain
source locations for Markdown blocks wherever possible. WYSIWYG changes must
update that model, not treat rendered HTML as canonical. Diagram editing,
Markdown source editing, and future rich-text editing need one transaction
and undo model.

### Additional diagram types

Later stages may support class, sequence, and other diagram types comparable
to Mermaid's catalogue.

**Design implication:** `version` and `type` must be explicit in every
canonical diagram definition. Use a diagram-type registry: each type supplies
its schema validation, rendering implementation, editing capabilities, and
optional Mermaid importer. Do not encode flowchart-only assumptions into the
top-level document model.

### Diagram styling

Later diagram versions may define connector and node styling, including:

- straight, orthogonal, and curved connector routes;
- line weight, colour, and dashed patterns;
- node fills, borders, shapes, and typography.

**Design implication:** separate semantic meaning from presentation. Allow
named style tokens/themes plus per-element overrides. Define and version style
fields in the canonical schema rather than persisting renderer-specific CSS or
SVG attributes.

### Referenced diagram definitions

Documents may eventually place an inline placeholder in readable prose while
holding the corresponding diagram definition at the end of the document, much
like Markdown reference links.

An illustrative future syntax is:

```markdown
The payment flow is shown in [diagram:payments-flow].

<!-- later in the document -->
:::diagram-definition payments-flow
version: 1
type: flowchart
...
:::
```

The exact syntax remains open.

**Design implication:** diagrams require stable IDs, and the parser must
resolve references separately from definition order. Inline fenced `diagram`
blocks remain supported, so initial implementations should model a diagram
definition independently of its rendered placement.

### Creating diagrams from scratch

A future graphical editor may allow users to create nodes, edges, and complete
diagrams rather than editing existing ones.

**Design implication:** node and edge IDs must be generated deterministically
and remain stable across save/reload. The canonical schema must be complete
enough to express user-created diagrams without a library-specific sidecar
format.

### Other deferred MVP non-goals

Collaboration, persistent storage, advanced auto-layout, arbitrary diagram
import, a VS Code extension, a desktop editor, and an offline/self-contained
runtime export remain possible future upgrades. Each should be layered around
the canonical Markdown-plus-diagram source rather than replacing it.

### Offline export

A later **Save offline version** action will produce a self-contained HTML
document with a pinned runtime embedded directly in the file. This is separate
from the ordinary **Save a copy** action, which keeps documents small by
retaining their script URL.

**Design implication:** introduce a deterministic packaging step that takes a
tested runtime release and generates the embedded export. Do not attempt to
fetch the active local `file://` script at save time: browsers do not
reliably permit that, particularly after a document has moved folders.

## Delivery slices

### Slice 1: Render a static document

- Define the HTML shell and `diagram` block grammar.
- Build a local runtime that reads embedded Markdown.
- Render basic Markdown and one static SVG diagram.
- Add a sample document that opens by double-clicking.

**Exit criteria:** a source diagram renders consistently from an explicitly
positioned model with no editor required.

### Slice 2: Edit and save the round trip

- Add edit mode.
- Support node-label editing and drag positioning.
- Update canonical source after each edit.
- Implement **Save a copy**.
- Reopen the downloaded file and verify all edits remain.

**Exit criteria:** source -> render -> edit -> download -> reopen preserves
labels, positions, sizes, and edges.

### Slice 3: Improve diagram presentation

- Add semantic styles and the MVP node types.
- Add readable edge labels and basic orthogonal routing.
- Add selected-node and selected-edge affordances and edit-mode usability.
- Add a small theme/style configuration, including a page-wide theme and a
  document theme selector.
- Add a toolbar properties inspector for node and edge style overrides.

**Exit criteria:** an architecture diagram is visually suitable for normal
technical documentation without manual SVG changes.

### Slice 4: Package and publish the runtime

- Choose and bundle production runtime dependencies.
- Publish an immutable versioned runtime to `sparkkz-makes` GitHub Pages.
- Update the sample document to use the published runtime.
- Verify a downloaded HTML copy loads the public runtime successfully in a
  browser session that is not logged into GitHub.

**Exit criteria:** a recipient can receive only the HTML file, open it, and
view the rendered output.

## Validation

Automated tests should cover:

- parsing and serializing the diagram schema;
- Markdown source updates after label and position edits;
- source round-trip preservation of unedited fields;
- rejection or useful reporting of malformed diagram blocks.

Browser-level tests should cover:

- local `file://` rendering with the development runtime;
- direct label editing;
- dragging a node;
- saving a copy;
- reopening the saved copy;
- remote versioned runtime loading from an unauthenticated browser context.

## Risks and guardrails

| Risk | Guardrail |
| --- | --- |
| A renderer library dictates an opaque persisted format | Keep and test a small independent diagram schema. |
| Auto-layout destroys human visual intent | Persist explicit positions and use auto-layout only as an opt-in future action. |
| Browser file security prevents silent overwrites | Always use download-based **Save a copy**. |
| A private/authenticated script host breaks downloaded documents | Test the published runtime anonymously; use a publicly accessible static runtime host. |
| Unsafe Markdown leads to script injection | Sanitize generated HTML and keep raw HTML unsupported by default. |
| Runtime changes break historical documents | Publish immutable versioned runtime filenames. |

## Open questions

1. Which Markdown and YAML parser libraries best meet the desired bundle-size,
   browser compatibility, and sanitization requirements?
2. Should diagram v1 support user-created/deleted nodes and edges, or only
   editing existing diagrams?
3. What visual style/theme should be the default for architecture documents?
4. Should the first public runtime use one external editor library or a small
   custom SVG interaction layer?
5. What is the initial runtime versioning and release process for the
   `sparkkz-makes` Pages repository?

## Next step

Review and resolve the open questions that affect the first delivery slice,
then implement Slice 1 with a sample document and local runtime.

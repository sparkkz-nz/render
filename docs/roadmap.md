# render roadmap

## Product direction

render turns a portable HTML document containing Markdown, frontmatter, and
diagram source into readable documentation with interactive SVG diagrams. The
HTML file retains its source, so it can be reopened, edited, and saved without a
server or build tool. The hosted
[`skryb-runtime.js`](https://sparkkz-nz.github.io/render/latest/skryb-runtime.js)
provides a stable browser runtime.

render is primarily a viewer for agent-generated HTML documentation, with
targeted editing for human corrections and refinements. It is not intended to
become a general-purpose document creation application.

The current diagram model is a custom, editable node-and-connector format. It is
functionally closest to a Mermaid **flowchart**, but is not Mermaid-compatible
syntax. The roadmap expands render from this focused proof of concept into a
well-documented, agent-friendly document format that can adopt existing
Markdown and Mermaid content.

## Delivery principles

- Keep documents portable: an output document must remain useful when opened
  from a local file system.
- Keep source canonical: edits must serialize back to the source embedded in the
  HTML document.
- Preserve explicit, versioned runtime URLs for published documents.
- Add syntax deliberately: new Markdown and extension syntax must have clear
  parsing, rendering, serialization, and test coverage.
- Prefer graceful source preservation over lossy conversion, especially when
  importing Markdown or Mermaid constructs that render does not yet support.

## Milestone 1: User documentation

Make the project understandable and usable without reading the source code.

### Deliverables

1. Rewrite the root [README](../README.md) around user needs:
   - a short explanation of what render is;
   - how an HTML document, embedded source, and hosted runtime work together;
   - a minimal runnable example;
   - latest, development, and pinned-release runtime URLs;
   - links to the getting-started guide, syntax reference, and roadmap.
2. Create a user-facing `docs/getting-started.md`:
   - create a minimal HTML document;
   - add Markdown, frontmatter, and a flowchart diagram;
   - open locally, edit, and save a copy;
   - select an appropriate runtime URL for local development, testing, and
     published documents.
3. Create a user-facing `docs/reference.md` covering:
   - HTML document shell and required elements;
   - frontmatter keys and supported values;
   - supported Markdown;
   - diagram fences and the complete flowchart YAML schema;
   - node shapes, palettes, styles, edge routes, anchors, markers, and
     editing behavior;
   - runtime URL and release conventions;
   - known limitations.
4. Move internal planning and implementation notes currently in `docs/` into
   `docs/dev/`, without breaking links:
   - `devnotes.md`
   - `handoff.md`
   - `plan.md`
   - editor and implementation planning documents

### Acceptance criteria

- A first-time user can create a local rendered document by following only the
  getting-started guide.
- The reference describes every currently accepted YAML field and enum value.
- Internal development notes are clearly separated from user documentation.

## Milestone 2: Agent authoring skill

Provide a reusable skill that lets an AI agent produce valid render documents,
including diagrams, rather than relying on prompt-specific instructions.

### Deliverables

1. Add a render-document authoring skill in the repository using the target
   agent ecosystem's standard skill layout.
2. Give the skill clear authoring rules:
   - start from the required HTML shell;
   - place canonical Markdown in `template#source`;
   - choose the appropriate runtime channel;
   - use supported Markdown and YAML only;
   - generate accessible headings, meaningful diagram labels, and concise
     fallback prose;
   - validate syntax before returning a document.
3. Include worked examples for:
   - a simple document;
   - a flowchart;
   - a themed document;
   - future extension panels once available.
4. Make the syntax reference the skill's source of truth, so the two do not
   drift.

### Acceptance criteria

- An agent supplied only the skill can create a browser-openable render
  document.
- Generated diagrams pass schema validation and use supported shapes, anchors,
  and markers.
- Examples are checked in automated tests or fixtures.

## Milestone 3: Markdown compatibility baseline

Allow existing Markdown documents to render usefully with little or no manual
rewriting. This is a one-way compatibility goal: render must accept and display
standard Markdown input, but it does not need to emit standard Markdown after
that input has been enhanced or converted into render's source format.

### Scope

Audit the current compact renderer and add common Markdown features in an
incremental, tested order:

1. ordered lists and nested lists;
2. block quotes and horizontal rules;
3. inline emphasis, strong emphasis, strikethrough, inline code, and links;
4. fenced code-block language classes;
5. tables, including header rows, alignment, and escaped cell separators;
6. images, task lists, and safe HTML handling if they are needed by the
   compatibility audit.

### Design decisions

- Define a compatibility target (for example, CommonMark plus explicitly listed
  GFM additions) rather than an open-ended interpretation of Markdown.
- Preserve the original source when an import cannot represent a construct
  safely; do not make Markdown export or reverse conversion a requirement.
- Keep `diagram` and future render extension fences distinct from ordinary code
  fences.
- Establish a sanitization policy before rendering user-controlled links,
  images, or HTML.
- Use fixtures based on real-world Markdown documents, not only isolated parser
  examples.

### Acceptance criteria

- A documented compatibility matrix identifies supported, unsupported, and
  intentionally literal Markdown constructs.
- Tables and the listed baseline constructs render semantically and accessibly.
- Unsupported input remains readable source rather than being silently dropped
  or corrupted.

## Milestone 4: Markdown formatting extensions

Add source-level constructs for the structured, visually rich documentation
usually present in hand-authored HTML: panels, sections, callouts, and similar
presentation elements.

### Deliverables

1. Design a nested directive syntax that is readable as Markdown without the
   runtime and can wrap ordinary Markdown bodies. Do not rely on raw HTML
   wrappers: Markdown engines vary in whether they parse Markdown inside HTML
   blocks.
2. Implement a small initial component set:
   - panels / sections;
   - callouts such as note, information, warning, and success;
   - grouped or titled content;
   - constrained responsive grids (equal two- and three-column, and
     two-thirds / one-third presets) with vertical stacks as a grid cell.
     Defer arbitrary grid templates, fixed widths, spans, visual reordering,
     and custom breakpoints.
   - optional compact summary or key-value blocks where justified by real
     documents.
3. Reuse the existing diagram tone-and-colour model for component styling. The
   author or agent chooses both a tone (`light` or `dark`) and a colour:
   `pink`, `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`,
   `grey`, or `bw`. A light blue component, for example, uses a light-blue
   background with dark-blue text, border, and accents; dark blue reverses that
   contrast. When a component omits styling, it inherits the document's
   light/dark theme colours. The document selects the actual shade mapping once
   with frontmatter such as `colourScheme: classic`; future schemes such as
   `pastel` must retain the same tone and colour names. Do not attach domain
   meaning to a colour. Explicit fill, stroke, and text overrides take
   precedence for an individual component; selecting a tone and colour again
   clears those overrides and restores the current scheme's standard shades.
4. Define nesting, malformed-input, accessibility, and source-serialization
   behavior before adding more component types.

### Acceptance criteria

- Extension source remains understandable when rendered as plain Markdown.
- Panels use the same semantic palette as diagrams and work in both themes.
- Grids collapse to one column in source order on narrow screens.
- The extension syntax is fully specified in the user reference and generated
  correctly by the agent skill.

## Milestone 5: Live source-editor tray

Extend document editing beyond diagrams by exposing the canonical Markdown
source in a dedicated editor tray. This offers safe, direct source editing with
immediate rendered feedback, rather than attempting a full WYSIWYG editor. Its
transactional rendering depends on the Markdown compatibility contract and
clear source-serialization behavior.

### Initial scope

1. Add an **Edit source** action to the document menu.
2. Open a resizable editor tray in the lower portion of the viewport, showing
   the full canonical source from `template#source`.
3. Re-render the document after each editor change, with suitable debouncing so
   ordinary typing remains responsive.
4. Keep the editor tray visible and roughly preserve the reader's viewport
   position as the rendered content changes.
5. Write valid source changes directly to `template#source`, so Save a copy
   continues to create a portable, self-contained HTML document.
6. When source is temporarily invalid, retain the last valid rendered output
   and display a precise error in the editor tray rather than destroying the
   document view.
7. Define explicit close, save, keyboard shortcut, focus, undo, and
   malformed-input behavior.

### Follow-on scope

As Markdown extensions become available, grow the same document menu into
source-aware insertion actions, such as:

- Insert panel;
- Insert callout;
- Insert section;
- Insert diagram or sequence diagram.

Each action must insert valid canonical source, not browser-only markup, and
must place the caret in a sensible editing position in the tray.

### Acceptance criteria

- An author can edit Markdown in the source tray, see the result update without
  manually refreshing, save a copy, and reopen the resulting document without
  losing the edit.
- A syntax or schema error leaves the previous valid render visible and gives
  actionable feedback in the source tray.
- Source editing does not corrupt diagrams, frontmatter, extension blocks, or
  unsupported Markdown that is intentionally preserved as source.
- New insertion actions are introduced only after their underlying syntax and
  serializer are stable.

## Milestone 6: Diagram model expansion

Turn the current flowchart-like model into named diagram types with a stable,
extensible schema.

### Flowchart baseline

1. Name and document the existing node-and-connector diagram type as
   `flowchart`.
2. Add a `document` node shape:
   - visually distinguish it from notes and application nodes;
   - define its SVG geometry, text bounds, perimeter anchors, and minimum size;
   - expose it in the editor and YAML reference;
   - cover parsing, rendering, editing, and serialization in tests.

### Sequence diagrams

Add `sequence` as the next diagram type, with its own canonical YAML model and
renderer rather than overloading flowchart nodes and edges.

Initial scope:

- participants / actors;
- ordered messages with direction, labels, and optional message style;
- lifelines;
- activation bars where they materially improve readability;
- notes and simple grouping blocks if the model supports them cleanly.

Defer advanced sequence notation—complex fragments, arbitrary layout overrides,
and every Mermaid extension—until the basic model is stable.

### Acceptance criteria

- Diagram fences declare their type unambiguously.
- Existing flowchart documents remain compatible.
- A sequence diagram has deterministic layout and round-trips through the
  document source without loss.

## Milestone 7: Mermaid import engine

Let authors start from existing Markdown containing Mermaid diagrams and convert
supported diagrams into native editable render diagrams.

### Deliverables

1. Detect `mermaid` fenced blocks during import.
2. Parse a documented, incremental subset:
   - flowcharts first;
   - sequence diagrams after native sequence support is available.
3. Convert supported syntax to render's canonical diagram YAML and preserve
   labels, directions, nodes, edges, and supported styling where possible.
4. Report unsupported Mermaid syntax with a clear diagnostic and retain the
   original fenced source; never silently discard it.
5. Provide an import report showing converted diagrams, retained Mermaid
   blocks, and manual follow-up required.

### Acceptance criteria

- Supported Mermaid flowcharts become editable render flowcharts.
- Conversion is deterministic and covered by Mermaid-to-YAML fixture tests.
- An unsupported Mermaid construct remains intact and is clearly identified to
  the author.

## Suggested delivery order

1. User documentation and internal-document reorganisation.
2. Agent authoring skill, backed by the new reference.
3. Markdown compatibility baseline, beginning with tables.
4. Formatting extensions and shared theme components.
5. Live source-editor tray, as capacity permits after the source format is
   stable.
6. Named flowchart schema, `document` shape, then native sequence diagrams.
7. Mermaid import engine, beginning with flowcharts.

This order establishes an accurate contract before adding new syntax, gives
agents a reliable way to author documents, and makes Mermaid import depend on
native diagram types that can preserve converted content.

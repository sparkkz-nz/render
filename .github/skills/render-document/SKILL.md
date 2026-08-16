---
name: render-document
description: Create valid, portable render HTML documents with canonical Markdown and editable flowcharts.
---

# Author render documents

Use this skill when creating or updating a render document. A render document is
a portable HTML file that embeds canonical Markdown in `template#source` and
renders it through the hosted `render-runtime.js` browser runtime.

The complete, versioned authoring contract is the repository's
[syntax reference](../../../docs/reference.md). Treat it as the source of truth:
do not invent frontmatter, Markdown, YAML fields, enum values, extension fences,
or diagram types that the reference does not document.

## Authoring workflow

1. Start from the required HTML shell below.
2. Put all canonical document content in `template#source`; never author
   content directly in `main#rendered-document`.
3. Use only the Markdown and diagram YAML described in the syntax reference.
4. Choose a runtime channel appropriate to the document's lifetime.
5. Write accessible headings, concise prose, meaningful node labels, and prose
   that lets a reader understand a diagram without relying only on its visuals.
6. Validate the HTML shell, frontmatter, Markdown subset, and every diagram
   field before returning the document.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Document title</title>
  <script
    src="https://sparkkz-nz.github.io/render/render-runtime.js"
    defer>
  </script>
</head>
<body>
  <template id="source" type="text/markdown">
# Document title

Readable fallback prose describes the document and any diagram's purpose.
  </template>
  <main id="rendered-document"></main>
</body>
</html>
```

## Runtime channel selection

Use one of these script sources:

| Document purpose | Script source |
| --- | --- |
| Normal local or shared use | `https://sparkkz-nz.github.io/render/render-runtime.js` |
| Short-lived pre-merge testing only | `https://sparkkz-nz.github.io/render/dev/render-runtime.js` |
| Published or distributed document | `https://sparkkz-nz.github.io/render/releases/<tag>/render-runtime.js` |

Use a real released tag, such as `v1.2.0`, in a pinned URL. Never use the shared
development channel in an enduring document. A local relative runtime is valid
only when the document and runtime are deliberately distributed together. Never
put a machine-specific `file:///...` URL in a shareable document.

## Formatting extensions

Use formatting directives only as specified in the syntax reference. They begin
in column 1, wrap ordinary supported Markdown, and can nest:

```markdown
:::panel { title="Summary" tone=light colour=blue }
Readable **Markdown** content.
::: (summary panel)
```

Use `section` for semantic grouping, `panel` for a bordered visual container,
and `callout` for a labelled `note`, `info`, `warning`, or `success` message.
Use both `tone` (`light` or `dark`) and `colour` when selecting a palette; the
palette names are the same as diagram palettes. `fill`, `stroke`, and `text`
accept only documented hexadecimal overrides and take precedence over a
palette.

Use `grid` only for the documented `columns` presets: `2`, `3`, `"2fr 1fr"`,
or `"1fr 2fr"`. A grid's direct children must be `panel`, `callout`, or
`stack`; use `stack` to place vertically arranged components in one grid cell.
Grids collapse to one column on narrow screens. Do not use arbitrary CSS,
fixed widths, column spans, source reordering, or custom breakpoints.

Close directives with `:::`. Optional text following whitespace is an ignored
annotation for nesting readability, such as `::: (supporting stack)`.

## Diagram rules

Every fenced `diagram` YAML block must declare `type: flowchart` or
`type: sequence`. Flowchart nodes must have a supported `shape`, and every
flowchart edge must include both `sourceAnchor` and `targetAnchor`. Use only
the values in the syntax reference, including:

- node shapes: `rounded-rectangle`, `circle`, `oval`, `database`, `diamond`,
  `rhombus`, `flattened-hexagon`, `chevron`, `right-chevron`, and `document`;
- node palettes: `{ tone: light|dark, colour: pink|red|orange|yellow|green|cyan|blue|purple|grey|bw }`;
- anchors: `top`, `right`, `bottom`, and `left`;
- routes: `orthogonal`, `straight`, and `curved`;
- endpoint markers: `none`, `arrow`, and `circle`.

Use explicit, stable node IDs and labels that describe a reader-visible
responsibility. A node's shape is geometry only; choose its appearance with a
palette or explicit style values, never a domain-specific `type`. Keep the
diagram compact and include adjacent prose that explains the flow. Sequence
diagrams use ordered participants and messages; do not add arbitrary positions
or Mermaid syntax.

## Validation checklist

Before returning a document, verify:

- It has `<!doctype html>`, `lang`, UTF-8, viewport, a descriptive `title`,
  `template#source`, and `main#rendered-document`.
- The template contains canonical Markdown and the rendered container is empty.
- The script URL matches the document's intended lifetime.
- Frontmatter, if present, is at the start and uses only supported values.
- The Markdown uses only documented Markdown and formatting directives; grids
  contain only panels, callouts, or stacks as direct children.
- Every diagram declares its supported type. Every flowchart has explicit shapes
  and edge anchors and uses only supported palette, route, marker, and style
  values.
- A reader can understand each diagram from its heading, labels, and nearby
  prose.
- The finished file can be opened in a browser directly from the local file
  system.

## Worked examples

The checked fixtures demonstrate valid documents:

- [Simple document](../../../test/fixtures/render-document/simple-document.html)
- [Flowchart document](../../../test/fixtures/render-document/flowchart-document.html)
- [Themed document](../../../test/fixtures/render-document/themed-document.html)

Do not create examples for future Markdown extensions until their syntax and
serialization behavior are implemented and added to the syntax reference.

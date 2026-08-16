# render reference

This reference describes the source format accepted by the current
[render runtime](../render-runtime.js). Source is embedded in an HTML document
and remains canonical after diagram edits.

## HTML document shell

A render document requires:

```html
<script src="https://sparkkz-nz.github.io/render/render-runtime.js" defer></script>
<template id="source" type="text/markdown">
# Document title
</template>
<main id="rendered-document"></main>
```

Use a normal HTML document with UTF-8 encoding and a viewport meta tag. The
runtime reads only `template#source` and renders into `main#rendered-document`.

## Frontmatter

Frontmatter is optional and must be the first non-empty source content:

```yaml
---
theme: light
colourScheme: classic
---
```

| Key | Values | Default |
| --- | --- | --- |
| `theme` | `light`, `dark` | `light` |
| `colourScheme` | `classic` | `classic` |

Unknown or malformed frontmatter is not a supported extension point. The
runtime reports unsupported `theme` and `colourScheme` values.

## Markdown compatibility

render supports a deliberately defined compatibility target: CommonMark-style
document structure plus the GFM additions listed below. It is not an open-ended
Markdown implementation; unsupported syntax remains visible source instead of
being silently removed or converted.

| Construct | Status | Notes |
| --- | --- | --- |
| Headings | Supported | Levels 1 through 6. |
| Paragraphs and thematic breaks | Supported | Use blank lines between paragraphs; `---`, `***`, and `___` create a thematic break. |
| Ordered and unordered lists | Supported | Nested lists are supported. Ordered lists retain a non-`1` start value. |
| Block quotes | Supported | Prefix consecutive lines with `>`. |
| Emphasis, strong text, and strikethrough | Supported | Use `*text*`, `**text**`, and `~~text~~`. |
| Inline code | Supported | Use backticks, such as `` `value` ``. |
| Links | Supported with safe URLs | Relative URLs, fragments, `http:`, `https:`, and `mailto:` are rendered. Other schemes, including `javascript:`, stay readable Markdown source. |
| Fenced code blocks | Supported | The fence language produces a `language-<name>` class on `<code>`; render does not provide syntax highlighting. |
| Tables | Supported | Header rows, left/centre/right alignment, and escaped cell separators (`\|`) are supported. |
| Task lists | Supported | `- [ ]` and `- [x]` render as disabled checkboxes because prose editing is not available. |
| Images | Supported with safe URLs | Relative images and safe `http:`, `https:`, or `data:image/(gif\|jpeg\|png\|webp);base64,...` sources render with their Markdown alt text. |
| Raw HTML | Intentionally literal | HTML is escaped and displayed as source; it is never executed or interpreted. |
| Other Markdown extensions | Intentionally literal | Keep unsupported input readable rather than relying on undocumented output. |

`diagram` remains a render-specific fence rather than an ordinary code block.
All other fenced blocks, including a `text` block containing the word `diagram`,
render as code.

### Table example

```markdown
| Component | Owner | Status |
| :--- | :---: | ---: |
| API\|gateway | Platform | Ready |
```

The alignment separator row is required. Escape a literal pipe inside a cell
with a backslash.

## Formatting extensions

render adds a small, nested directive syntax for structured presentation without
raw HTML wrappers. Directive bodies contain ordinary supported Markdown,
including diagrams. The source remains readable when viewed without the
runtime.

```markdown
:::panel { title="Payment lifecycle" tone=light colour=blue }
This panel contains **ordinary Markdown**.
::: (payment lifecycle panel)
```

Open directives must begin in column 1 and use one of `section`, `panel`,
`callout`, `grid`, or `stack`. An opening directive has the form
`:::name { key=value }`; braces are required when attributes are present.
Attribute values are bare non-space values or double-quoted strings.

Close a directive with `:::` in column 1. Any text after whitespace is an
ignored closing annotation, so `::: (panel)` and `::: End panel` close exactly
like `:::`. Annotations are for human readability only and are not checked
against the opening directive name.

Directives nest. Invalid attributes, unknown directive names, unclosed
directives, and layout content that does not follow the rules below remain
visible source rather than being silently dropped or reinterpreted.

### Sections, panels, and callouts

`section` semantically groups related content. `panel` is a bordered,
padded visual container. Both may use:

| Attribute | Values / behaviour |
| --- | --- |
| `title` | Optional visible title. |
| `tone` and `colour` | Supply both or neither. `tone` is `light` or `dark`; `colour` is one of `pink`, `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `grey`, or `bw`. |
| `fill`, `stroke`, `text` | Optional `#RGB`, `#RGBA`, `#RRGGBB`, or `#RRGGBBAA` overrides. These take precedence over a selected palette. |

Palette values use the document's `colourScheme`, including the same tone and
colour names used by diagrams. Without a palette or overrides, components
inherit the document theme. Selecting a palette establishes the scheme's
standard shades; explicit `fill`, `stroke`, and `text` values override those
individual shades.

`callout` is a specialised panel for a prominent message. It accepts the
attributes above plus optional `kind`: `note`, `info`, `warning`, or `success`
(`info` is the default). Callouts render a visible kind label and an accessible
label, so their meaning never relies on colour alone.

### Responsive grids and stacks

`grid` arranges direct child panels, callouts, or stacks in columns on larger
screens, and collapses to one column in source order on narrow screens. Its
required `columns` attribute supports only these intentional presets:

| Value | Layout |
| --- | --- |
| `2` | Two equal columns. |
| `3` | Three equal columns. |
| `"2fr 1fr"` | Two-thirds / one-third columns. |
| `"1fr 2fr"` | One-third / two-thirds columns. |

`fr` is a CSS Grid fractional unit: `2fr 1fr` divides available width into
three shares, assigning two to the first column and one to the second after
grid gaps are accounted for.

`stack` has no attributes and groups blocks vertically in one grid cell. Use it
for an asymmetric layout with a wide primary panel beside stacked supporting
content:

````markdown
:::grid { columns="2fr 1fr" }
:::panel { title="Architecture" tone=light colour=blue }
The primary explanation and diagram go here.

```diagram
canvas:
  width: 600
  height: 300
nodes: []
edges: []
```
::: (architecture panel)

:::stack
:::panel { title="Decision" tone=light colour=yellow }
Keep canonical source readable and editable.
::: (decision panel)

:::callout { kind=warning title="Review" tone=light colour=orange }
Confirm assumptions before publishing.
::: (review callout)
::: (supporting stack)
::: (two-thirds / one-third grid)
````

Do not put ordinary Markdown directly inside a grid: wrap it in a panel,
callout, or stack. Arbitrary CSS grids, fixed widths, column spans, visual
reordering, and custom breakpoints are intentionally unsupported.

## Diagram fences

Use a `diagram` fenced block containing the flowchart YAML model:

````markdown
```diagram
version: 1
id: payment-flow
canvas:
  width: 1080
  height: 560
nodes: []
edges: []
```
````

The parser accepts mappings, lists, and inline mappings such as
`{ x: 60, y: 100 }`. Indentation is significant: top-level sections start in
column 1, list entries use two spaces, item fields use four spaces, and nested
object fields use six spaces. Blank lines and `#` comments are allowed.

### Diagram fields

| Field | Required | Description |
| --- | --- | --- |
| `version` | No | A document-defined diagram version, commonly `1`. |
| `id` | No | A document-defined diagram identifier. |
| `theme` | No | `light` or `dark`; overrides document `theme`. |
| `canvas` | Yes | Canvas mapping containing `width`, `height`, and optional `grid`. |
| `nodes` | Yes | List of nodes. |
| `edges` | Yes | List of connectors. |

`canvas.width` and `canvas.height` are numeric SVG canvas dimensions. A positive
numeric `canvas.grid` enables snapping while moving or resizing; omit it or use
`0` to disable snapping.

### Nodes

Every node requires `shape`. In practice, use `id`, `label`, `type`, `position`,
and `size` as well:

```yaml
- id: payments-api
  label: Payments API
  subtitle: Owns payment intents
  type: service
  shape: oval
  position: { x: 420, y: 210 }
  size: { width: 220, height: 100 }
  palette: { tone: light, colour: blue }
  style: { stroke: "#1D4ED8", strokeWidth: 3, fill: "#DBEAFE", text: "#17202A" }
```

| Field | Values / behaviour |
| --- | --- |
| `id` | Stable identifier used by edges. |
| `label` | Node text. Newlines are supported. |
| `subtitle` | Optional text below the label; newlines are supported. |
| `type` | Semantic theme default: `application`, `service`, `datastore`, or `note`. It is not shown as node text. |
| `shape` | **Required.** `rounded-rectangle`, `circle`, `oval`, `database`, `diamond`, `rhombus`, `flattened-hexagon`, `chevron`, or `right-chevron`. |
| `position` | `{ x: number, y: number }` top-left canvas position. |
| `size` | `{ width: number, height: number }`. Nodes have a minimum size; circles remain square. |
| `palette` | Optional `{ tone, colour }`; replaces the default semantic colours and explicit node colour overrides. |
| `style` | Optional overrides: `fill`, `stroke`, `text`, and `strokeWidth`. `style.width` is rejected. |

Palette `tone` is `light` or `dark`. Palette `colour` is `pink`, `red`,
`orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `grey`, or `bw`. The
currently supported colour scheme is `classic`.

### Edges

Every edge requires both explicit endpoint anchors:

```yaml
- source: web-app
  target: payments-api
  sourceAnchor: right
  targetAnchor: left
  label: POST /payments
  route: orthogonal
  start: none
  end: arrow
  style: { stroke: "#52616B", strokeWidth: 2, text: "#3E4A54" }
```

| Field | Values / behaviour |
| --- | --- |
| `source`, `target` | IDs of the connected nodes. |
| `sourceAnchor`, `targetAnchor` | **Required.** `top`, `right`, `bottom`, or `left`. |
| `label` | Optional edge label; newlines are supported. |
| `route` | `orthogonal`, `straight`, or `curved`. Omit for the default orthogonal route. |
| `start`, `end` | `none`, `arrow`, or `circle`. Omit `start` for `none`; omit `end` for `arrow`. |
| `style` | Optional `stroke`, `strokeWidth`, and `text` overrides. `style.width` is rejected. |

Anchors resolve on the rendered shape perimeter. Endpoint markers follow the
edge stroke colour and maintain their own definitions, so one edge's styling
does not affect another.

## Editing and serialization

The runtime provides per-diagram zoom and edit controls. In edit mode, authors
can select nodes and edges, edit supported properties, drag nodes, resize nodes,
and change connector endpoints. Node and edge label editing supports multiple
lines: **Enter** adds a line, **Ctrl/Cmd+Enter** commits, and **Escape** cancels.

Every retained edit serializes the diagram back into its matching `diagram`
fence in `template#source`. **Save a copy** downloads a complete HTML document
containing that updated source. Diagram editing is source-preserving for the
supported diagram model; there is no general Markdown source editor yet.

## Runtime channels and limitations

Use `render-runtime.js` from `main` for normal use, `/dev/` only for
short-lived branch testing, and `/releases/<tag>/` for immutable published
documents. See [getting started](getting-started.md) for URLs and examples.

Current limitations include the intentionally small Markdown subset, flowcharts
as the only diagram type, no Mermaid import, no source-editor tray, and no
offline runtime embedding. Planned work is listed in the [roadmap](roadmap.md).

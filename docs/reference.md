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

The current compact renderer supports:

- headings with one to three `#` characters;
- paragraphs;
- unordered lists using `-`;
- ordinary fenced code blocks;
- `diagram` fenced blocks.

Text is escaped before rendering. Ordered and nested lists, block quotes,
emphasis, links, tables, images, task lists, raw HTML, and language-specific
code-block classes are not yet Markdown features. Keep unsupported constructs
readable as source rather than expecting semantic rendering.

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

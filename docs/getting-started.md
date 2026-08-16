# Getting started

render documents are ordinary HTML files. Each file embeds its canonical
Markdown source in `template#source` and loads the render runtime from a script
URL. Open the HTML file in a browser; no web server or build step is required.

## Create a document

Save the following as `architecture.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Checkout architecture</title>
  <script
    src="https://sparkkz-nz.github.io/render/skryb-runtime.js"
    defer>
  </script>
</head>
<body>
  <template id="source" type="text/markdown">
---
theme: light
colourScheme: classic
---

# Checkout architecture

The browser sends payment requests to the checkout service.

```diagram
type: flowchart
version: 1
id: checkout-flow
canvas:
  width: 720
  height: 300
  grid: 5
nodes:
  - id: browser
    label: Browser
    shape: rounded-rectangle
    position: { x: 60, y: 100 }
    size: { width: 180, height: 80 }
    palette: { tone: light, colour: blue }
  - id: checkout
    label: Checkout service
    shape: oval
    position: { x: 460, y: 100 }
    size: { width: 180, height: 80 }
    palette: { tone: light, colour: green }
edges:
  - source: browser
    target: checkout
    sourceAnchor: right
    targetAnchor: left
    label: POST /checkout
    route: straight
    end: arrow
```
  </template>
  <main id="rendered-document"></main>
</body>
</html>
```

The source is canonical: render reads it from the template and writes edits back
there. Do not place authored content directly inside `#rendered-document`.

## Open and edit it

1. Open `architecture.html` in a modern browser, including directly through a
   `file://` URL.
2. Choose **Edit source** from the document menu to open the lower source tray.
   Markdown changes render after a short pause without a refresh. If the draft is
   invalid, the tray reports the problem while the last valid document remains
   visible.
3. Use the diagram toolbar's **Edit diagram** action.
4. Select a node or edge to change its supported properties, or drag and resize
   nodes. The runtime updates the embedded diagram source.
5. Use **Save a copy** from the document menu (or Cmd/Ctrl+S) to download a new
   HTML file.
6. Open the downloaded file to verify the edits survived.

The document needs network access when it references a hosted runtime. Its
source and saved edits remain inside the downloaded HTML file.

## Add a sequence diagram

Use a separate `sequence` model when the order of interactions matters:

````markdown
```diagram
type: sequence
version: 1
id: checkout-request
participants:
  - id: shopper
    label: Shopper
    kind: actor
  - id: checkout
    label: Checkout service
messages:
  - from: shopper
    to: checkout
    label: Submit checkout
```
````

Sequence diagrams have deterministic participant and message placement. Edit
their canonical YAML in the source tray; graphical diagram editing applies only
to flowcharts.

## Choose a runtime URL

Use the appropriate script URL for the document's purpose:

| Purpose | Runtime URL |
| --- | --- |
| Normal use or local experimentation | `https://sparkkz-nz.github.io/render/skryb-runtime.js` |
| Pre-merge testing of a branch | `https://sparkkz-nz.github.io/render/dev/skryb-runtime.js` |
| Published or distributed document | `https://sparkkz-nz.github.io/render/releases/<version>/skryb-runtime.js` |

The development URL is shared and replaced by the next branch build. Replace
`<version>` with a released tag such as `v1.2.0` when pinning a published
document.

For fully offline development, store `skryb-runtime.js` next to the document
and load it with `<script src="./skryb-runtime.js" defer></script>`. Do not use
a machine-specific `file:///...` runtime URL in a document you share. The legacy
`render-runtime.js` remains available for existing documents.

## Next steps

- Read the [syntax reference](reference.md) before authoring a diagram beyond
  this example.
- Use [skryb-example.html](../skryb-example.html) as a richer local fixture for
  shapes, labels, palettes, and connector styling.
- See the [roadmap](roadmap.md) for future Markdown, editor, and diagram work.

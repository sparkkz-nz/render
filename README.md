# render

render turns a portable HTML document containing Markdown, frontmatter, and
diagram source into readable documentation with interactive SVG flowcharts.
The Markdown source remains embedded in the HTML file, so a document can be
opened locally, edited, saved as a new copy, and reopened without a server or
build tool.

render is a viewer for agent-generated documentation with targeted editing for
human corrections. It is not a general-purpose document authoring application.

Documents accept a CommonMark-style baseline: headings, nested lists, quotes,
thematic breaks, inline formatting, links, language-labelled code fences, and
tables. They also support GFM-style strikethrough and task lists. The
[syntax reference](docs/reference.md#markdown-compatibility) defines the exact
compatibility and safety rules, including literal raw HTML and permitted
link/image URLs.

## Start here

Create an HTML file containing a `template#source`, a
`main#rendered-document`, and the hosted runtime:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello render</title>
  <script
    src="https://sparkkz-nz.github.io/render/render-runtime.js"
    defer>
  </script>
</head>
<body>
  <template id="source" type="text/markdown">
# Hello render

This document can be opened directly from your file system.
  </template>
  <main id="rendered-document"></main>
</body>
</html>
```

Save it as `hello-render.html` and open it in a browser. See the
[getting-started guide](docs/getting-started.md) for a diagram and editing
walkthrough, or the [syntax reference](docs/reference.md) for the complete
current document contract.

## Runtime URLs

```html
<!-- Latest runtime from main: suitable for normal use and local experiments. -->
<script src="https://sparkkz-nz.github.io/render/render-runtime.js" defer></script>

<!-- Immutable release snapshot: use for documents you publish or distribute. -->
<script src="https://sparkkz-nz.github.io/render/releases/v1.2.0/render-runtime.js" defer></script>

<!-- Shared branch build: use only for short-lived pre-merge testing. -->
<script src="https://sparkkz-nz.github.io/render/dev/render-runtime.js" defer></script>
```

Each push to `main` tests and publishes the latest runtime. A Git tag beginning
with `v` produces a retained, versioned snapshot. Each branch push updates the
shared development runtime, so documents must not rely on that URL after
testing.

For a document that must work without network access, keep a local copy of the
runtime beside it and use a relative script URL. A future offline-export action
will embed a pinned runtime in the saved document.

## Documentation

- [Getting started](docs/getting-started.md): create, open, edit, and save a
  portable document.
- [Syntax reference](docs/reference.md): supported HTML, frontmatter, Markdown,
  flowchart YAML, and editing behaviour.
- [Agent authoring skill](.github/skills/render-document/SKILL.md): instructions
  and checked examples for agents creating valid render documents.
- [Roadmap](docs/roadmap.md): planned compatibility, editing, and diagram work.
- [Development notes](docs/dev/): implementation plans and handoff material.

## Development

[example.html](example.html) is the comprehensive local fixture. It uses a
machine-specific development runtime URL, so replace that URL before sharing a
copy. Run the runtime tests with:

```sh
node --test test/render-runtime.test.js
```
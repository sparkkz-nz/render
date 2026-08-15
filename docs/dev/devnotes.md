# Development notes

## Runtime loading workflow

During development, keep the document and its runtime together and load the
runtime by relative path:

```html
<script src="./render-runtime.js" defer></script>
```

This allows the HTML document to be opened locally without a network
dependency.

When a development document needs to be saved or copied outside the runtime
folder, use this machine-specific absolute file URL instead:

```html
<script
  src="file:///Users/stuart.parkinson/hacks/render/render-runtime.js"
  defer>
</script>
```

This is a development convenience only: it works only on a machine where that
exact path exists. Distributed documents must use the published runtime URL.

For a shareable document, publish the final runtime to the `sparkkz-makes`
GitHub Pages site and use its absolute URL:

```html
<script
  src="https://sparkkz-nz.github.io/render/releases/v1.0.0/render-runtime.js"
  defer>
</script>
```

Publish immutable, versioned runtime filenames rather than overwriting a
single `runtime.js`. This ensures previously created documents continue to use
the runtime version with which they were tested.

Examples:

```text
releases/v0.1.0/render-runtime.js
releases/v0.2.0/render-runtime.js
releases/v1.0.0/render-runtime.js
```

## Offline export

A future **Save offline version** action will embed a pinned runtime in the
downloaded HTML so it can be opened anywhere without network access or a local
runtime path. It is intentionally separate from the normal small,
runtime-referenced **Save a copy** output.

# Development notes

## Runtime loading workflow

For normal use, load the current main runtime from the latest channel:

```html
<script src="https://sparkkz-nz.github.io/skryb/latest/skryb-runtime.js" defer></script>
```

Use the shared development channel only for short-lived branch verification.

For a short-lived development preview, use the dev channel:

```html
<script
  src="https://sparkkz-nz.github.io/skryb/dev/skryb-runtime.js"
  defer>
</script>
```

The dev channel is overwritten by the most recently pushed non-main branch and
must not be used by distributed documents.

For a shareable document, publish the final runtime to the `sparkkz-nz`
GitHub Pages site and use its absolute URL:

```html
<script
  src="https://sparkkz-nz.github.io/skryb/releases/v1.0.0/skryb-runtime.js"
  defer>
</script>
```

Publish immutable, versioned runtime filenames rather than overwriting a
single `runtime.js`. This ensures previously created documents continue to use
the runtime version with which they were tested.

Examples:

```text
releases/v0.1.0/skryb-runtime.js
releases/v0.2.0/skryb-runtime.js
releases/v1.0.0/skryb-runtime.js
```

## Offline export

A future **Save offline version** action will embed a pinned runtime in the
downloaded HTML so it can be opened anywhere without network access or a local
runtime path. It is intentionally separate from the normal small,
runtime-referenced **Save a copy** output.

# render

## GitHub Pages runtime

The runtime is published to GitHub Pages:

```html
<!-- Latest version from main -->
<script
  src="https://sparkkz-nz.github.io/render/render-runtime.js"
  defer>
</script>

<!-- Immutable release snapshot -->
<script
  src="https://sparkkz-nz.github.io/render/releases/v1.2.0/render-runtime.js"
  defer>
</script>

<!-- Current branch build for pre-merge integration testing -->
<script
  src="https://sparkkz-nz.github.io/render/dev/render-runtime.js"
  defer>
</script>
```

Every push to `main` tests and publishes the latest runtime. Every Git tag
beginning with `v` creates a versioned snapshot. Tags are retained in the Pages
site, so consumers who pin a release URL do not receive later runtime changes.
Every branch push also tests that branch and updates the shared development URL.
Use the development URL only for short-lived pre-merge testing: the next branch
push replaces it.

The first deployment requires GitHub Pages to use **GitHub Actions** as its
build and deployment source in the repository's Pages settings.

## External script proof of concept

[hello.html](hello.html) is a minimal browser-openable document. Its only
runtime dependency is a script hosted by this repository's GitHub Pages site:

```html
<script
  src="https://sparkkz-nz.github.io/render/hello-runtime.js"
  defer>
</script>
```

Open the published document at:

<https://sparkkz-nz.github.io/render/hello.html>

It should show:

> Success: hello-runtime.js loaded and ran.

To verify that a distributed document can load the centrally hosted runtime,
download [hello.html](hello.html) and open the downloaded file in a browser.
It will still retrieve `hello-runtime.js` from GitHub Pages.

`hello-runtime.js` is deliberately tiny. The production diagram runtime is
published as `render-runtime.js`.
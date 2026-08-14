# render

## External script proof of concept

[hello.html](hello.html) is a minimal browser-openable document. Its only
runtime dependency is a script hosted by this repository's GitHub Pages site:

```html
<script
  src="https://xero-internal-actions-poc.github.io/render/hello-runtime.js"
  defer>
</script>
```

Open the published document at:

<https://xero-internal-actions-poc.github.io/render/hello.html>

It should show:

> Success: hello-runtime.js loaded and ran.

To verify that a distributed document can load the centrally hosted runtime,
download [hello.html](hello.html) and open the downloaded file in a browser.
It will still retrieve `hello-runtime.js` from GitHub Pages.

`hello-runtime.js` is deliberately tiny. Replace it later with the Markdown
and diagram renderer while retaining the versioned GitHub Pages URL.
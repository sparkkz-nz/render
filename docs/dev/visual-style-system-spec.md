# Visual Style System (Temporary Spec)

## Goal

Add polished, document-wide visual styles while keeping rendered documents portable,
coherent, and easy to author.

## Document settings

```yaml
theme: auto
colourScheme: ice
```

- `theme` selects the luminance variant: `auto`, `light`, or `dark`.
- `auto` follows the viewer's system preference.
- `colourScheme` selects the document-wide visual identity, initially including
  `classic`, `ice`, `midnight`, and `paper`.
- A colour scheme defines separate designed light and dark variants; dark is not
  merely an inverted light scheme.
- Diagrams, document components, controls, page chrome, edges, and markers all
  inherit the same resolved document style.
- The document menu lets viewers change both settings. Changes become canonical
  only when the document is saved.
- Do not support per-diagram colour-scheme overrides initially.

## Palette roles

Replace literal colour names and `{ tone, colour }` palettes with one semantic role:

```yaml
palette: accent
```

Structural roles:

- `background`
- `pale`
- `light`
- `neutral`
- `dark`

Accent roles:

- `accent-soft`
- `accent`
- `accent-strong`

Status roles:

- `note`
- `success`
- `warning`
- `danger`
- `highlight`

Status roles retain recognizable blue/green/orange/red/yellow families respectively,
but each scheme tunes hue, saturation, luminance, gradient, and glow treatment to
fit its identity.

Use structural roles for most nodes, accent roles for emphasis, and status roles for
meaningful exceptions.

## Overrides

Palette is the normal, scheme-aware styling mechanism. Keep compact inline overrides
for deliberate exceptions:

```yaml
style: { fill: "#D9F2FF", stroke: "#4A8BAA", text: "#123040", strokeWidth: 3 }
```

Do not add arbitrary source-defined CSS, SVG filters, or gradients initially.

## Editor

Replace named-colour dropdowns with grouped visual swatches:

- Structure: Background, Pale, Light, Neutral, Dark
- Accent: Soft, Accent, Strong
- Status: Note, Success, Warning, Danger, Highlight

Swatches show the resolved active scheme treatment and retain accessible text labels.

## Rendering

Curated schemes define consistent gradients, highlights, glows, edge treatment, and
marker styling for every diagram. Flowcharts and sequences may apply those shared
tokens to their different element types, but should not independently select a
different visual identity.

Implementation may use SVG-native presentation:

- scoped per-diagram gradient definitions;
- subtle fills and highlights;
- restrained stroke/selection glow using SVG filters or CSS drop shadows;
- scheme-specific edge and marker styling.

Each SVG emits its own uniquely prefixed copy of the shared scheme definitions (for
example, `ice-accent-gradient-0` and `ice-accent-gradient-1`) because SVG references
are document-global. Prefix definition IDs by diagram index to avoid collisions.
Keep effects modest; avoid expensive blur filters on every element in large diagrams.

## Migration

Backward compatibility is not currently required. Migrate the schema, parser,
serializer, fixtures, documentation, and editor together. `classic` remains the
default scheme after migration.

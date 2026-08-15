# Editor polish plan

## Purpose

Extend the editable SVG diagram runtime from an editor for rounded-rectangle
nodes and implicit horizontal connectors into a practical
architecture-diagram editor. The canonical Markdown/YAML source remains the
only persisted model: all new node, connector, and editor operations must
update it and survive **Save a copy** followed by reopening the downloaded
document.

This plan follows the completed MVP work described in
[handoff.md](handoff.md). It deliberately precedes runtime packaging and
publication: the source schema should settle before an immutable public
runtime is released.

## Design decisions

### Separate semantic type from geometric shape

`node.type` continues to select the theme's semantic colours (`application`,
`service`, `datastore`, and `note`). Introduce an independent `node.shape`
field to select SVG geometry. This is an intentional source-schema break:
update [example.html](../example.html) and do not retain deprecated aliases
because it is the only existing document.

Initial shape values:

| Shape value | Geometry |
| --- | --- |
| `rounded-rectangle` | Existing rounded rectangle; the baseline default shape. |
| `circle` | Circle inscribed in the node's bounding box. |
| `oval` | Ellipse inscribed in the node's bounding box. |
| `database` | Database drum/cylinder with curved top and bottom caps. |
| `diamond` | Traditional flowchart decision diamond: vertices at top, right, bottom, and left. Its four connector anchors are those vertices. |
| `rhombus` | Parallelogram-like rhombus with horizontal top and bottom edges and both remaining sides slanted right. Its four connector anchors are the centres of its sides. |
| `flattened-hexagon` | Horizontal hexagon with clipped left and right corners. |
| `chevron` | Double-ended chevron with points at both horizontal ends. |
| `right-chevron` | Right-facing directional chevron/arrow. |

Each shape uses the existing `position` and `size` bounding box. Text remains
centred within the safe interior area, with per-shape padding where required
to avoid the angled or curved edges. Resizing a circle preserves a square
bounding box; all other shapes retain independently editable width and height.

### Shared stroke styling

Use `style.strokeWidth` for both node borders and connectors:

```yaml
nodes:
  - id: external-service
    shape: rounded-rectangle
    style: { stroke: "#3574C7", strokeWidth: 4 }
edges:
  - source: client
    target: external-service
    style: { stroke: "#52616B", strokeWidth: 3 }
```

This replaces the current edge-only `style.width` property. The runtime and
example source change together; do not retain a `width` alias. Thick borders
are the initial representation for imported double-wall Mermaid symbols,
leaving true double-outline geometry as a later, evidence-driven addition.

### Explicit connector endpoints

Add these optional fields to an edge:

```yaml
sourceAnchor: right
targetAnchor: left
```

Allowed values are `top`, `right`, `bottom`, and `left`. The schema requires
both fields so a connector's attachment is always explicit.

The renderer calculates every anchor from the actual perimeter of the
selected shape rather than its bounding-box centre. Curved shapes use their
mathematical intersection; polygonal shapes use the corresponding perimeter
segment. The decision-diamond anchors resolve to its vertices; all rhombus
anchors resolve to their side centres. This ensures arrows terminate at the
visible boundary.

### Curved connector route

Add `curved` to the existing `straight` and `orthogonal` route values. Curved
edges use a cubic Bezier whose control directions are derived from each
endpoint's selected side. The renderer calculates the label position from the
path midpoint rather than from a simple average of the endpoints.

### Mermaid import readiness

The saved schema remains independent of Mermaid. A future importer maps
Mermaid syntax and aliases to this shape library rather than persisting
Mermaid-specific names. The initial mappings include Mermaid
stadium/race-track to `oval`, cylinder to `database`, decision to `diamond`,
parallelogram to `rhombus`, and hexagon to `flattened-hexagon`.

Do not implement an importer in this roadmap. When it is added, unsupported
Mermaid shapes must produce an explicit warning and map to a documented safe
fallback rather than silently implying visual fidelity. Likely additions,
when real imported diagrams require them, are `double-circle`, `subroutine`,
`document`, `multi-document`, `trapezoid`, and `cloud`.

### Editor presentation

The wide always-visible toolbar is replaced by a compact header:

- an **Edit diagram** toggle and a hamburger button remain visible;
- the hamburger menu holds document actions (theme, save a copy, zoom/reset,
  and node/connector creation);
- selecting a node opens a shape-properties popover next to the selection;
- selecting a connector opens a connector-properties popover next to its
  label/path;
- selection popovers contain the existing appropriate properties plus the new
  shape/anchor/route controls;
- all menus and popovers support Escape, close when focus moves outside, and
  expose accessible labels and focus order.

The diagram figure remains the scroll container. Its SVG has a fixed canvas
coordinate system; zoom changes the rendered SVG dimensions within that
scrollable area. Zoom is local browser view state, not persisted document
content, and must not change drag, resize, port, or label coordinates. Initial
load uses **Fit all** to show the complete canvas within its frame.

## Delivery slices

### EPOL-T01 - Establish shape and endpoint source schema

**Context** - The current runtime renders only `<rect>` node bodies and
implicitly connects source-right to target-left. New visual and interaction
features need one explicit source contract first. The sample is the only
document, so this slice intentionally makes source-breaking changes.

**Task details**

- Define required `node.shape`, `edge.sourceAnchor`, and `edge.targetAnchor`
  fields, their supported values, and useful errors for missing or invalid
  values.
- Add `curved` as a supported edge route while retaining `straight` and
  `orthogonal`.
- Replace `style.width` with shared node/edge `style.strokeWidth` and update
  all rendering, markers, inspector controls, tests, and sample source.
- Extend YAML parse/serialize and inspector mutation helpers so supported
  values round-trip without losing unrelated source fields.
- Update the sample document with representative shapes, curved edges, and
  non-default ports.

**Test requirements**

- Unit coverage for required-field validation and invalid-value reporting.
- Parse -> serialize -> parse coverage for all new fields.
- Coverage proving node and edge `strokeWidth` render consistently, including
  endpoint-marker sizing and colour.

**Acceptance criteria**

- [ ] The updated source schema rejects missing required shape or endpoint
  fields with useful errors.
- [ ] Supported shape, port, and route values persist through a saved copy.
- [ ] Unsupported values are reported rather than silently normalized.
- [ ] Node borders and connector lines use the same `strokeWidth` property.

### EPOL-T02 - Render, resize, and label the shape palette

**Context** - Shapes need consistent theme styling, selection affordances,
text placement, and geometry-aware connection points.

**Task details**

- Extract shape rendering behind a geometry helper that produces node body
  markup, safe text bounds, and side anchor points from one node model.
- Implement the nine shape values in the shape table above.
- Preserve fill, border, text, subtitle, selected state, drag, and inline
  editing behaviours for every shape.
- Make shape-specific resize behaviour explicit, including square constraints
  for circles and minimum safe dimensions for polygons and database drums.
- Update the node properties popover with a Shape selector distinct from the
  existing semantic Type selector.

**Test requirements**

- Markup tests for each shape and theme/style override.
- Geometry tests for all four anchors on each shape.
- Tests for text-safe bounds and constrained circle resizing.
- Manual browser pass for dragging, resizing, selecting, and editing labels
  on every shape.

**Acceptance criteria**

- [ ] All requested shapes render crisply in both themes.
- [ ] Labels and subtitles stay readable and visually centred.
- [ ] Resize and selection behaviour works without shape-specific DOM hacks.
- [ ] Connectors terminate on the rendered perimeter of every shape.

### EPOL-T03 - Add curved routes and side-aware connector rendering

**Context** - Explicit ports must consistently affect straight, orthogonal,
and curved paths, marker orientation, hit targets, and label placement.

**Task details**

- Centralize edge path construction into helpers returning the SVG path,
  geometric midpoint, tangent information, and hit path.
- Implement side-aware straight and orthogonal paths, including sensible
  handling where both anchors share the same side or nodes overlap.
- Implement cubic-Bezier curved paths with control points based on
  `sourceAnchor` and `targetAnchor`.
- Keep marker direction correct at both ends for all route types.
- Surface Route, Source side, and Target side in the connector properties
  popover.

**Test requirements**

- Deterministic path and midpoint tests for every route and side pair.
- Marker regression tests for start and end arrows/circles on curved paths.
- Selection hit-target and multiline-label markup tests.
- Manual browser verification of overlapping/nearby nodes and all anchor
  sides.

**Acceptance criteria**

- [ ] Connectors visibly start and end on the selected sides.
- [ ] Curved connectors have smooth, predictable curvature and readable
  labels.
- [ ] Existing straight/orthogonal connectors remain stable by default.

### EPOL-T04 - Create, reconnect, and delete nodes and connectors

**Context** - The editor currently supports only editing models supplied in
source. Diagram authors need lifecycle actions without raw YAML edits.

**Task details**

- Add a node-create action that inserts a uniquely identified, selected node
  at the visible canvas centre (or a non-overlapping nearby grid position),
  using documented default type, shape, dimensions, and label.
- Show four visible connection ports on the selected node only in edit mode.
- Support dragging from a source port to a target port to create a connector,
  with an in-progress preview path and invalid-target feedback.
- Support reconnecting an existing selected connector by dragging either
  endpoint to another visible port.
- Add explicit node and connector delete actions with keyboard support and a
  confirmation only when deleting a node would also delete attached
  connectors.
- Delete dependent connectors atomically with a node; never leave dangling
  `source` or `target` identifiers in canonical YAML.

**Test requirements**

- Helper tests for unique node identifiers, default placement, connector
  defaults, reconnection, and cascade deletion.
- YAML round-trip tests after every lifecycle operation.
- Browser tests for create node, port-to-port connector creation,
  reconnection, connector deletion, node deletion with dependent connectors,
  and save/reopen persistence.

**Acceptance criteria**

- [ ] Authors can create and delete nodes without editing source.
- [ ] Authors can create, reconnect, and delete connectors using visible
  side-specific ports.
- [ ] Cancelled drags and invalid drops leave the model unchanged.
- [ ] Node deletion removes all attached connectors and preserves valid YAML.

### EPOL-T05 - Refine editor chrome, zoom, and scrolling

**Context** - The existing permanent toolbar is useful for development but
does not scale as the properties and creation actions grow.

**Task details**

- Replace the current toolbar layout with the compact header, hamburger menu,
  and contextual node/connector popovers defined above.
- Keep common actions discoverable through accessible labels, keyboard focus,
  and visible selected-state affordances.
- Add zoom in, zoom out, fit all, reset-to-100%, and percentage display. Start
  with bounded discrete zoom steps (25% through 200%); initial loading uses
  fit all, and gesture zoom remains deferred until this interaction is proven.
- Ensure horizontal and vertical scrollbars appear only when the zoomed canvas
  exceeds its frame; preserve scroll position through property-only rerenders
  where feasible.
- Ensure `svgPoint` and all pointer interactions use the fixed viewBox and
  still map accurately under zoom and scrolling.
- Validate responsive behaviour on narrow browser windows.

**Test requirements**

- Unit coverage for zoom clamping and coordinate conversion.
- DOM markup tests for menu/popover state and accessible controls.
- Browser tests for menu focus management, popover dismissal, zoom/scroll,
  drag/resize/connection coordinates under non-100% zoom, and save/reopen.

**Acceptance criteria**

- [ ] The editor is usable without a full-width persistent inspector.
- [ ] Zoom and scrollbars work on diagrams larger than the viewport.
- [ ] Editing actions remain coordinate-accurate at every supported zoom.
- [ ] View-only mode remains uncluttered.

## Cross-cutting guardrails

- Retain the current small custom parser and SVG interaction layer; do not
  introduce a graph-editor dependency solely for this polish work.
- Preserve explicit placement. No automatic layout is introduced.
- Never derive persisted source from rendered SVG or DOM.
- Treat the example source as the migration target; no backwards-compatibility
  aliases or silent source normalization are required before publishing.
- Treat node and connector deletion as model operations first, then render.
- Keep the runtime browser-openable through `file://`; do not depend on a
  server or build step for development validation.
- Update [handoff.md](handoff.md), [plan.md](plan.md), and the test count when
  each slice is completed.

## Open questions

1. **Resolved - diamond versus rhombus:** diamond is the traditional flowchart
   decision symbol with vertex anchors; rhombus has horizontal top/bottom
   edges, right-slanted sides, and side-centre anchors.
2. **Resolved - chevron semantics:** implement both double-ended `chevron`
   and directional `right-chevron` shapes; use the sample document to assess
   which is more useful in architecture diagrams.
3. **Resolved - port visibility:** show ports only for the selected node in
   edit mode.
4. **Resolved - delete confirmation:** confirm only node deletion that
   cascades to attached connectors; delete individual connectors directly.
5. **Resolved - zoom persistence:** keep zoom local to the browser and fit the
   whole canvas on initial load.

## Dependencies and order

`EPOL-T01` is required before all other slices. `EPOL-T02` and `EPOL-T03`
can proceed independently once the schema is available. `EPOL-T04` requires
shape anchor geometry from `EPOL-T02` and path construction from `EPOL-T03`.
`EPOL-T05` may start after `EPOL-T01`, but should complete after `EPOL-T04`
so the final menu and popover structure exposes the full action set.

## Change log

| Date | Change |
| --- | --- |
| 2026-08-15 | Created the editor-polish plan from the requested shapes, curved connectors, side-specific ports, lifecycle actions, and UI refinement. |
| 2026-08-15 | Resolved shape geometry, port visibility, deletion, and zoom decisions; added both double-ended and right-facing chevrons. |

# Tweaks and minor features to fix/add

## Tweaks

- browser window background doesn't match the document background colour
- dragging (panning) a diagram does not allow panning past the diagram canvas edges - allow drag pan at any time (not just when zoomed in) by any amount (ie. drag diagram off the edge of the viewport so there is blank space to one edge)
- hide scrollbars in diagram (we have zoom and fit buttons and hand-drag) - bonus if scrollbars can be hidden but show when hovered over (some apps do this, not sure if it is a built in feature - if it is, use it, if not don't write a ton of code just for this)
- property editor - if it renders near the bottom of the window, the bottom half of the editor box is off screen - when the page is scrolled the editor stays stationary and you can't get to the contols lower down. Consider moving the editor box up and down as the page scrolls, or limiting its height to the window and adding scroll bar in the editor box?? suggestions welcome
- add 'Delete' and 'Duplicate' buttons at bottom of edit box 
- save vertical height on edit box by:
  - preset boxes can be a little shorter vertically (say 3/4 of current height)
  - Fill and Border on same line - maybe 'Fill' [picker] 'Stroke' [picker] [num-entry] for border width, text lable not needed
  - alignment on one line 'Align' and two dropdowns with Top|Middle and Left|Center|Right 
  - size on one line 'Size' and two num entries with 'width' and 'height'

## Features

### Source Editor

- Top right of window, replace 'Close Source Editor' button with a hamburger menu button and an 'X' close button
- menu has 'Insert'->'Flowchart'/'Sequence'/'Diagram Reference'/'Panel'/'Grid'
  - if cursor is at start of a blank line, inserts boilerplate text at cursor
  - if curson is on a line containing text, adds a new line following and inserts boilerplate
  - flowchart boilerplate adds a minimal flowchart diagram with two nodes and one edge
  - sequence boilerplate adds a minimal sequence chart with two participants and an arrow
  - the other options insert minimal example boilerplate the user can edit
- menu has 'Help' which opens the reference on the website in a new window

### Flowchart

- orthoganal connectors currently have a fixed leg length at destination end which renders badly if the leg needs to be shorter - the following would improve things:
  - no minimum leg length at ends. For a three leg connector, the two ends are equal length so the middle leg is centered between them
  - (major feature?) - add waypoint to edges, appears in yaml as `waypoint: {x, y}, shows during edit mode as a handle that can be dragged, invisible when not selected for edit. When rendering breaks the connector into two, each renders as a single connector between those points would (two or three legs) 

### Document

- Save for Offline feature - includes the runtime js with the file (preferably at the end?)

## Proposed plan

The list is feasible. Most UI changes are small and can be bundled; unbounded
panning and editable edge waypoints are the larger, separate pieces of work.

- Keep the inspector fixed in a viewport-safe position, retaining its internal
  scrollbar. Do not make it follow the diagram while the page scrolls.
- Compact inspector controls into Fill/Stroke/width, Align, and Size rows;
  shorten palette presets; add visible Delete and Duplicate actions while
  retaining the existing keyboard shortcuts.
- Match the browser page background to the selected document colour scheme.
- Hide diagram scrollbars visually while retaining native scroll, wheel, and
  keyboard behaviour. Do not initially implement hover-only scrollbar reveal.
- Replace native-scroll-only panning with a persisted diagram camera offset so
  users can pan to blank space beyond every canvas edge, including at 100% zoom.
- First improve orthogonal routing by removing its fixed 40px endpoint legs.
  Add one optional `waypoint: { x, y }` per edge only after that routing work is
  stable. The waypoint must use diagram coordinates, be serialized to source,
  and have a drag handle only for a selected edge in edit mode.
- Add a compact source-editor Insert menu and Help link. Diagram Reference
  already uses `:::diagram { id=payment-flow }`; its matching fenced diagram
  definition declares the same `id` and can live later in the document. Add
  this existing syntax to the published reference as part of the feature.
- Implement offline saving as a distinct action: fetch the selected runtime,
  require that fetch to succeed, replace the external script with the exact
  embedded runtime near the end of the saved document, and keep ordinary Save
  As unchanged.

## Suggested release stages

### 1. Editor polish

- Fix page/document background matching.
- Make the inspector viewport-safe and compact its controls and swatches.
- Add Delete and Duplicate buttons.
- Visually hide diagram scrollbars.
- Add the source-editor header menu, insertion templates, Help, and documented
  Diagram Reference insertion.
- Remove fixed endpoint legs from orthogonal connectors.

### 2. Diagram navigation and routing

- Add persistent, unbounded canvas panning.
- Add the optional single-edge waypoint format, handle, drag interaction,
  routing behaviour, serialization, and regression coverage.

### 3. Portable offline documents

- Enable Save for Offline with pinned embedded runtime output.
- Cover successful export, runtime-fetch failure, and reopening an exported
  offline document.
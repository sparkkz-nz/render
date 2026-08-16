// @ts-nocheck
import {
  defaultNode,
  diagramThemes,
  documentMinimumNodeSize,
  edgeAnchors,
  edgeMarkerStyles,
  edgeRoutes,
  minimumNodeSize,
  nodeColorPalettes,
  nodeColorSchemes,
  nodeShapes,
  supportedDiagramTypes
} from "./core/diagrams/schema";
import { escapeHtml, parseDiagram as parseDiagramCore } from "./core/diagrams/parser";
import {
  getTheme,
  getNodeEffectiveStyle,
  getEdgeEffectiveStyle,
  getEdgeMarkerStyle,
  getGridSize,
  snapToGrid,
  clampNodeSize,
  getSequenceElementEffectiveStyle
} from "./core/diagrams/styles";
import {
  splitTextLines,
  renderTextBlock,
  getNodeGeometry,
  computeNodeTextLayout,
  renderNodeBody,
  buildEdgePath,
  getEdgeMarkerDimensions,
  buildEdgeMarkerDef
} from "./core/diagrams/geometry";
import {
  expandCanvasForNode,
  createUniqueNodeId,
  getDefaultNodePosition,
  createNode,
  createConnector,
  reconnectConnector,
  deleteConnector,
  deleteNode,
  setNodeLabel,
  setNodeShape,
  setNodeSubtitle,
  setNodeStyleOverride,
  setNodeColorPalette,
  setNodeSize,
  setEdgeLabel,
  setEdgeRoute,
  setEdgeAnchor,
  setEdgeStyleOverride,
  setStyleStrokeWidth,
  setEdgeMarkerStart,
  setEdgeMarkerEnd,
  clampZoom
} from "./core/diagrams/mutations";
import { serializeDiagram } from "./core/diagrams/serializer";
import {
  parseDocumentFrontmatter,
  resolveDocument,
  validateDocumentSource,
  setFrontmatterTheme,
  findSourceTextRange,
  scrollSourceEditorToRange
} from "./core/document";
import {
  isSafeUrl,
  renderInline,
  renderMarkdown as renderMarkdownCore
} from "./core/markdown";

const sourceElement = document.querySelector("#source");
const outputElement = document.querySelector("#rendered-document");
const diagramModels = [];
let editingDiagramIndex = null;
let selectedNode = null;
let selectedEdge = null;
let selectedSequenceElement = null;
let editingNode = null;
let editingEdge = null;
let connectionDrag = null;
let documentTheme = "light";
let documentColorScheme = "classic";
let documentFormat = "centered";
let savedSource = "";
let editSessionDiagram = null;
let sourceEditorOpen = false;
let sourceEditorDraft = "";
let sourceEditorError = "";
let sourceEditorRenderTimer = null;
let sourceEditorResizeObserver = null;
const diagramZooms = new Map();

function isDiagramEditing(diagramIndex) {
  return editingDiagramIndex === diagramIndex;
}

function parseDiagram(source) {
  return parseDiagramCore(source, documentColorScheme);
}

function renderMarkdown(source, state = { diagramIndex: 0 }) {
  return renderMarkdownCore(source, state, { renderDiagram, documentColorScheme });
}

function getNodeBounds(node) {
  return {
    x: Number(node.position?.x) || 0,
    y: Number(node.position?.y) || 0,
    width: Number(node.size?.width) || defaultNode.width,
    height: Number(node.size?.height) || defaultNode.height
  };
}

function getMinimumNodeDimensions(shape) {
  return shape === "document" ? documentMinimumNodeSize : minimumNodeSize;
}

function renderDiagramToolbar(diagramIndex, editingMode = "none") {
  const allowsEditing = editingMode !== "none";
  const allowsNodeCreation = editingMode === "flowchart";
  return [
    `<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">`,
    `<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${diagramIndex}" aria-label="Zoom in" title="Zoom in">+</button>`,
    `<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${diagramIndex}" aria-label="Zoom out" title="Zoom out">−</button>`,
    `<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${diagramIndex}" aria-label="Zoom to fit" title="Zoom to fit">⊡</button>`,
    allowsEditing
      ? isDiagramEditing(diagramIndex)
        ? `<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">✓</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">×</button>${allowsNodeCreation ? `<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${diagramIndex}" aria-label="New node" title="New node">+</button>` : ""}`
        : editingDiagramIndex === null
          ? `<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">✎</button>`
          : ""
      : "",
    `</div>`
  ].join("");
}

function renderFlowchartDiagram(diagram, diagramIndex) {
  const nodes = new Map();

  for (const node of diagram.nodes) {
    nodes.set(node.id, {
      ...node,
      position: node.position || {},
      size: node.size || {}
    });
  }

  const edgeLabelLineHeight = 16;
  const edgeMarkerDefs = [];
  const edgeEndpointMarkup = [];

  const edgeMarkup = diagram.edges.map((edge, edgeIndex) => {
    const sourceNode = nodes.get(edge.source);
    const targetNode = nodes.get(edge.target);

    if (!sourceNode || !targetNode) {
      return "";
    }

    const sourceGeometry = getNodeGeometry(
      sourceNode,
      Number(sourceNode.position.x) || 0,
      Number(sourceNode.position.y) || 0,
      Number(sourceNode.size.width) || 190,
      Number(sourceNode.size.height) || 80
    );
    const targetGeometry = getNodeGeometry(
      targetNode,
      Number(targetNode.position.x) || 0,
      Number(targetNode.position.y) || 0,
      Number(targetNode.size.width) || 190,
      Number(targetNode.size.height) || 80
    );
    const sourceAnchor = sourceGeometry.anchors[edge.sourceAnchor];
    const targetAnchor = targetGeometry.anchors[edge.targetAnchor];
    const route = edge.route || "orthogonal";
    const edgePath = buildEdgePath(sourceAnchor, targetAnchor, edge.sourceAnchor, edge.targetAnchor, route);
    const labelX = edgePath.midpoint.x;
    const labelY = edgePath.midpoint.y - 10;

    const style = getEdgeEffectiveStyle(diagram, edge);
    const isSelected = selectedEdge?.diagramIndex === diagramIndex && selectedEdge.edgeIndex === edgeIndex;
    const isEditing = isSelected && editingEdge?.diagramIndex === diagramIndex && editingEdge.edgeIndex === edgeIndex;
    const strokeWidth = (Number(style.strokeWidth) || 2) + (isSelected ? 2 : 0);
    const editorWidth = 220;
    const editorHeight = 72;
    const edgeLabelLines = edge.label ? splitTextLines(edge.label) : [];
    const edgeLabelBlockHeight = edgeLabelLines.length * edgeLabelLineHeight;
    const edgeLabelStartY = labelY - edgeLabelBlockHeight / 2 + edgeLabelLineHeight * 0.72;

    const startMarkerStyle = getEdgeMarkerStyle(edge, "start");
    const endMarkerStyle = getEdgeMarkerStyle(edge, "end");
    const startMarkerId = `docdiagram-marker-${diagramIndex}-${edgeIndex}-start`;
    const endMarkerId = `docdiagram-marker-${diagramIndex}-${edgeIndex}-end`;

    if (startMarkerStyle !== "none") {
      edgeMarkerDefs.push(buildEdgeMarkerDef(startMarkerId, startMarkerStyle, "start", style.stroke, strokeWidth));
    }

    if (endMarkerStyle !== "none") {
      edgeMarkerDefs.push(buildEdgeMarkerDef(endMarkerId, endMarkerStyle, "end", style.stroke, strokeWidth));
    }

    if (isSelected && isDiagramEditing(diagramIndex)) {
      edgeEndpointMarkup.push(
        `<circle class="docdiagram-edge-endpoint" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}" data-endpoint="source" cx="${sourceAnchor.x}" cy="${sourceAnchor.y}" r="7"/>`,
        `<circle class="docdiagram-edge-endpoint" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}" data-endpoint="target" cx="${targetAnchor.x}" cy="${targetAnchor.y}" r="7"/>`
      );
    }

    const markerAttributes = [
      startMarkerStyle !== "none" ? ` marker-start="url(#${startMarkerId})"` : "",
      endMarkerStyle !== "none" ? ` marker-end="url(#${endMarkerId})"` : ""
    ].join("");

    return [
      `<g class="docdiagram-edge-group${isSelected ? " docdiagram-edge-selected" : ""}" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}">`,
      `<path class="docdiagram-edge-hit" d="${edgePath.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,
      `<path class="docdiagram-edge" d="${edgePath.path}"${markerAttributes} stroke="${escapeHtml(style.stroke)}" stroke-width="${strokeWidth}"/>`,
      isEditing
        ? `<foreignObject class="docdiagram-inline-editor-host" x="${labelX - editorWidth / 2}" y="${labelY - editorHeight / 2}" width="${editorWidth}" height="${editorHeight}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${escapeHtml(edge.label || "")}</textarea></foreignObject>`
        : edgeLabelLines.length
          ? renderTextBlock(labelX, edgeLabelStartY, edgeLabelLines, edgeLabelLineHeight, "docdiagram-edge-label", style.text)
          : "",
      `</g>`
    ].join("");
  }).join("");

  const nodeMarkup = [...nodes.values()].map((node) => {
    const position = node.position;
    const size = node.size;
    const x = Number(position.x) || 0;
    const y = Number(position.y) || 0;
    const nodeWidth = Number(size.width) || 190;
    const nodeHeight = Number(size.height) || 80;
    const style = getNodeEffectiveStyle(diagram, node);
    const isSelected = selectedNode?.diagramIndex === diagramIndex && selectedNode.nodeId === node.id;
    const isEditing = isSelected && editingNode?.diagramIndex === diagramIndex && editingNode.nodeId === node.id;
    const strokeWidth = (Number(style.strokeWidth) || 2) + (isSelected ? 2 : 0);
    const geometry = getNodeGeometry(node, x, y, nodeWidth, nodeHeight);
    const layout = computeNodeTextLayout(geometry.textBounds, node);

    return [
      `<g class="docdiagram-node${isSelected ? " docdiagram-node-selected" : ""}" data-diagram-index="${diagramIndex}" data-node-id="${escapeHtml(node.id)}">`,
      renderNodeBody(geometry, style, strokeWidth),
      isEditing
        ? `<foreignObject class="docdiagram-inline-editor-host" x="${geometry.textBounds.x}" y="${geometry.textBounds.y}" width="${geometry.textBounds.width}" height="${geometry.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${escapeHtml(node.label)}</textarea></foreignObject>`
        : renderTextBlock(layout.centerX, layout.labelStartY, layout.labelLines, layout.labelLineHeight, "docdiagram-node-label", style.text),
      !isEditing && layout.subtitleLines.length
        ? renderTextBlock(layout.centerX, layout.subtitleStartY, layout.subtitleLines, layout.subtitleLineHeight, "docdiagram-node-subtitle", style.text)
        : "",
      isSelected && isDiagramEditing(diagramIndex) && !isEditing
        ? `<rect class="docdiagram-resize-handle" x="${x + nodeWidth - 7}" y="${y + nodeHeight - 7}" width="14" height="14" rx="3"/>`
        : "",
      isSelected && isDiagramEditing(diagramIndex) && !isEditing
        ? edgeAnchors.map((anchor) => {
          const point = geometry.anchors[anchor];
          return `<circle class="docdiagram-connection-port" data-anchor="${anchor}" cx="${point.x}" cy="${point.y}" r="7" aria-label="${anchor} connection port"/>`;
        }).join("")
        : "",
      `</g>`
    ].join("");
  }).join("");

  const width = Number(diagram.canvas.width) || 1000;
  const height = Number(diagram.canvas.height) || 560;

  return [
    `<figure class="docdiagram" data-diagram-index="${diagramIndex}" data-diagram-type="flowchart" data-editing="${isDiagramEditing(diagramIndex)}">`,
    renderDiagramToolbar(diagramIndex, "flowchart"),
    `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Architecture diagram" data-diagram-index="${diagramIndex}" style="width: ${diagramZooms.get(diagramIndex) || 100}%">`,
    `<defs>${edgeMarkerDefs.join("")}</defs>`,
    edgeMarkup,
    connectionDrag?.diagramIndex === diagramIndex
      ? `<path class="docdiagram-connection-preview${connectionDrag.invalid ? " docdiagram-connection-invalid" : ""}" d="${buildEdgePath(connectionDrag.start, connectionDrag.current, connectionDrag.sourceAnchor, connectionDrag.targetAnchor || connectionDrag.sourceAnchor, "straight").path}"/>`
      : "",
    nodeMarkup,
    edgeEndpointMarkup.join(""),
    `</svg>`,
    `</figure>`
  ].join("");
}

function renderSequenceDiagram(diagram, diagramIndex) {
  const theme = getTheme(diagram);
  const width = Number(diagram.canvas?.width) || 1000;
  const baseHeight = Number(diagram.canvas?.height) || 560;
  const participants = diagram.participants || [];
  const messages = diagram.messages || [];
  const activations = diagram.activations || [];
  const notes = diagram.notes || [];
  const groups = diagram.groups || [];
  const leftMargin = 90;
  const rightMargin = 90;
  const headerTop = 28;
  const participantBoxWidth = 160;
  const participantBoxHeight = 42;
  const actorHeaderHeight = 74;
  const noteBaseHeight = 48;
  const noteGap = 18;
  const messageSpacing = 56;
  const sequenceMarkerId = `docdiagram-sequence-arrow-${diagramIndex}`;
  const lifelineTop = headerTop + actorHeaderHeight + 12;
  const positions = new Map();
  const availableWidth = Math.max(0, width - leftMargin - rightMargin);
  const participantStep = participants.length > 1 ? availableWidth / (participants.length - 1) : 0;

  participants.forEach((participant, index) => {
    positions.set(
      participant.id,
      participants.length === 1
        ? leftMargin + availableWidth / 2
        : leftMargin + participantStep * index
    );
  });

  const messageStartY = lifelineTop + 40;
  const messageRows = messages.map((message, index) => ({ ...message, index, y: messageStartY + index * messageSpacing }));
  const noteLayouts = notes.map((note) => {
    const lines = splitTextLines(note.label || "");
    const height = Math.max(noteBaseHeight, lines.length * 16 + 22, Number(note.size?.height) || 0);
    const afterRow = note.after ? messageRows[note.after - 1] : null;
    const y = (afterRow?.y || lifelineTop) + noteGap;
    let centerX = positions.get(note.at) || width / 2;
    let noteWidth = Math.max(160, Number(note.size?.width) || 0);

    centerX = Math.min(width - noteWidth / 2 - 24, Math.max(noteWidth / 2 + 24, centerX));
    return { ...note, lines, x: centerX - noteWidth / 2, y, width: noteWidth, height };
  });

  const groupBottoms = groups.map((group) => messageRows[group.to - 1]?.y + 34 || messageStartY);
  const contentBottom = Math.max(
    lifelineTop + 140,
    noteLayouts.length ? noteLayouts[noteLayouts.length - 1].y + noteLayouts[noteLayouts.length - 1].height : 0,
    messageRows.length ? messageRows[messageRows.length - 1].y + 44 : messageStartY,
    ...groupBottoms
  );
  const height = Math.max(baseHeight, contentBottom + 56);
  const lifelineBottom = height - 36;

  const activationRects = activations.map((activation, index) => ({
    participantId: activation.participant,
    depth: activations
      .slice(0, index)
      .filter((candidate) => candidate.participant === activation.participant &&
        candidate.from <= activation.from && candidate.to >= activation.from)
      .length,
    startY: (messageRows[activation.from - 1]?.y || messageStartY) - 10,
    endY: (messageRows[activation.to - 1]?.y || messageStartY) + 18
  }));

  const participantMarkup = participants.map((participant) => {
    const centerX = positions.get(participant.id);
    const style = getSequenceElementEffectiveStyle(diagram, participant);
    const headerWidth = Math.max(participantBoxWidth, Number(participant.size?.width) || 0);
    const headerHeight = Math.max(participantBoxHeight, Number(participant.size?.height) || 0);
    if (participant.kind === "actor") {
      const headY = headerTop + 10;
      const chestY = headY + 18;
      const waistY = chestY + 18;
      return [
        `<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${diagramIndex}" data-participant-id="${escapeHtml(participant.id)}">`,
        `<circle cx="${centerX}" cy="${headY}" r="8" fill="none" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
        `<path d="M ${centerX} ${headY + 8} V ${waistY} M ${centerX - 14} ${chestY} H ${centerX + 14} M ${centerX} ${waistY} L ${centerX - 12} ${waistY + 18} M ${centerX} ${waistY} L ${centerX + 12} ${waistY + 18}" fill="none" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}" stroke-linecap="round" stroke-linejoin="round"/>`,
        `<text x="${centerX}" y="${headerTop + actorHeaderHeight - 4}" text-anchor="middle" class="docdiagram-node-label" fill="${escapeHtml(style.text)}">${escapeHtml(participant.label)}</text>`,
        `</g>`
      ].join("");
    }

    return [
      `<g class="docdiagram-sequence-participant" data-diagram-index="${diagramIndex}" data-participant-id="${escapeHtml(participant.id)}">`,
      `<rect x="${centerX - headerWidth / 2}" y="${headerTop}" width="${headerWidth}" height="${headerHeight}" rx="12" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
      `<text x="${centerX}" y="${headerTop + headerHeight / 2 + 6}" text-anchor="middle" class="docdiagram-node-label" fill="${escapeHtml(style.text)}">${escapeHtml(participant.label)}</text>`,
      `</g>`
    ].join("");
  }).join("");

  const lifelineMarkup = participants.map((participant) => {
    const centerX = positions.get(participant.id);
    return `<path class="docdiagram-sequence-lifeline" d="M ${centerX} ${lifelineTop} L ${centerX} ${lifelineBottom}" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`;
  }).join("");

  const groupMarkup = groups.map((group) => {
    const startY = (messageRows[group.from - 1]?.y || messageStartY) - 24;
    const endY = (messageRows[group.to - 1]?.y || messageStartY) + 30;
    const labelWidth = Math.min(220, Math.max(110, String(group.label).length * 8 + 28));
    return [
      `<g class="docdiagram-sequence-group">`,
      `<rect x="42" y="${startY}" width="${width - 84}" height="${endY - startY}" rx="12" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,
      `<rect x="54" y="${startY - 16}" width="${labelWidth}" height="24" rx="6" fill="${escapeHtml(theme.node.fill)}" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="1.5"/>`,
      `<text x="${54 + labelWidth / 2}" y="${startY + 1}" text-anchor="middle" class="docdiagram-edge-label" fill="${escapeHtml(theme.edge.text)}">${escapeHtml(group.label)}</text>`,
      `</g>`
    ].join("");
  }).join("");

  const noteMarkup = noteLayouts.map((note, noteIndex) => {
    const lineHeight = 16;
    const startY = note.y + 18;
    const style = getSequenceElementEffectiveStyle(diagram, note);
    return [
      `<g class="docdiagram-sequence-note" data-diagram-index="${diagramIndex}" data-note-index="${noteIndex}">`,
      `<rect x="${note.x}" y="${note.y}" width="${note.width}" height="${note.height}" rx="10" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
      renderTextBlock(note.x + note.width / 2, startY, note.lines, lineHeight, "docdiagram-node-subtitle", style.text),
      `</g>`
    ].join("");
  }).join("");

  const activationMarkup = activationRects.map((activation) => {
    const centerX = positions.get(activation.participantId);
    const widthOffset = activation.depth * 7;
    const barWidth = 12;
    const barHeight = Math.max(20, activation.endY - activation.startY);
    const participant = participants.find((candidate) => candidate.id === activation.participantId);
    const style = getSequenceElementEffectiveStyle(diagram, participant);
    return `<rect class="docdiagram-sequence-activation" x="${centerX - barWidth / 2 + widthOffset}" y="${activation.startY}" width="${barWidth}" height="${barHeight}" rx="4" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`;
  }).join("");

  const messageMarkup = messageRows.map((message) => {
    const sourceX = positions.get(message.from);
    const targetX = positions.get(message.to);
    const dashed = message.style === "dashed";
    const labelLines = splitTextLines(message.label || "");
    const labelHeight = labelLines.length * 15;
    const labelStartY = message.y - 12 - labelHeight / 2 + 11;
    const markerAttribute = ` marker-end="url(#${sequenceMarkerId})"`;

    if (message.from === message.to) {
      const loopWidth = 48;
      const loopHeight = 28;
      return [
        `<g class="docdiagram-sequence-message" data-diagram-index="${diagramIndex}" data-message-index="${message.index}">`,
        `<path d="M ${sourceX} ${message.y} L ${sourceX + loopWidth} ${message.y} L ${sourceX + loopWidth} ${message.y + loopHeight} L ${sourceX} ${message.y + loopHeight}" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2"${markerAttribute}${dashed ? ' stroke-dasharray="8 5"' : ""}/>`,
        renderTextBlock(sourceX + loopWidth / 2, labelStartY, labelLines, 15, "docdiagram-edge-label", theme.edge.text),
        `</g>`
      ].join("");
    }

    return [
      `<g class="docdiagram-sequence-message" data-diagram-index="${diagramIndex}" data-message-index="${message.index}">`,
      `<path d="M ${sourceX} ${message.y} L ${targetX} ${message.y}" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2"${markerAttribute}${dashed ? ' stroke-dasharray="8 5"' : ""}/>`,
      renderTextBlock((sourceX + targetX) / 2, labelStartY, labelLines, 15, "docdiagram-edge-label", theme.edge.text),
      `</g>`
    ].join("");
  }).join("");

  return [
    `<figure class="docdiagram" data-diagram-index="${diagramIndex}" data-diagram-type="sequence" data-editing="${isDiagramEditing(diagramIndex)}">`,
    renderDiagramToolbar(diagramIndex, "sequence"),
    `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Sequence diagram" data-diagram-index="${diagramIndex}" style="width: ${diagramZooms.get(diagramIndex) || 100}%">`,
    `<defs>${buildEdgeMarkerDef(sequenceMarkerId, "arrow", "end", theme.edge.stroke, 2)}</defs>`,
    groupMarkup,
    participantMarkup,
    lifelineMarkup,
    activationMarkup,
    noteMarkup,
    messageMarkup,
    `</svg>`,
    `</figure>`
  ].join("");
}

function renderDiagram(source, diagramIndex) {
  let diagram;

  try {
    diagram = parseDiagram(source);
  } catch (error) {
    return `<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
  }

  diagramModels[diagramIndex] = diagram;
  return diagram.type === "sequence"
    ? renderSequenceDiagram(diagram, diagramIndex)
    : renderFlowchartDiagram(diagram, diagramIndex);
}

function getSource() {
  return sourceElement.content.textContent;
}

function setSource(source) {
  sourceElement.content.replaceChildren(document.createTextNode(source));
}

function isEditableElement(element) {
  return element instanceof Element &&
    element.matches("input, textarea, select, [contenteditable]");
}

function findSourceTextRange(source, text) {
  const selectedText = text.trim();
  const start = selectedText ? source.indexOf(selectedText) : -1;

  return start === -1 ? null : { start, end: start + selectedText.length };
}

function scrollSourceEditorToRange(editor, range) {
  const lineHeight = Number.parseFloat(globalThis.getComputedStyle(editor).lineHeight) || 20;
  const lineIndex = editor.value.slice(0, range.start).split("\n").length - 1;
  const visibleLineCount = Math.max(1, Math.floor(editor.clientHeight / lineHeight));

  editor.scrollTop = Math.max(0, (lineIndex - Math.floor(visibleLineCount / 2)) * lineHeight);
}

function revealSourceText(text) {
  const range = findSourceTextRange(getSource(), text);
  if (!range || (sourceEditorOpen && sourceEditorDraft !== getSource())) {
    return false;
  }

  if (!sourceEditorOpen) {
    openSourceEditor();
  }

  const selectMatch = () => {
    const editor = document.querySelector(".docdiagram-source-editor");
    if (!editor) {
      return;
    }
    editor.focus();
    editor.setSelectionRange(range.start, range.end);
    scrollSourceEditorToRange(editor, range);
  };

  globalThis.requestAnimationFrame?.(selectMatch) ?? selectMatch();
  return true;
}

function scheduleSourceEditorRender() {
  globalThis.clearTimeout(sourceEditorRenderTimer);
  sourceEditorRenderTimer = globalThis.setTimeout(() => {
    sourceEditorRenderTimer = null;
    renderSourceEditorDraft();
  }, 250);
}

function renderSourceEditorDraft() {
  globalThis.clearTimeout(sourceEditorRenderTimer);
  sourceEditorRenderTimer = null;
  return renderDocument(sourceEditorDraft, { preserveOnError: true });
}

function flushSourceEditorRender() {
  return sourceEditorRenderTimer === null ? true : renderSourceEditorDraft();
}

function updateSourceEditorStatus() {
  const tray = document.querySelector(".docdiagram-source-tray");
  if (!tray) {
    return;
  }

  const status = tray.querySelector(".docdiagram-source-status");
  const error = tray.querySelector(".docdiagram-source-error");
  status.textContent = sourceEditorError ? "Source has errors; showing the last valid render." : "Changes render automatically.";
  error.hidden = !sourceEditorError;
  error.textContent = sourceEditorError;
}

function focusSourceEditor() {
  const editor = document.querySelector(".docdiagram-source-editor");
  if (!editor) {
    return;
  }

  editor.focus();
  editor.setSelectionRange(editor.value.length, editor.value.length);
}

function createSourceEditorTray() {
  let tray = document.querySelector(".docdiagram-source-tray");
  if (!sourceEditorOpen) {
    sourceEditorResizeObserver?.disconnect();
    sourceEditorResizeObserver = null;
    tray?.remove();
    delete outputElement.dataset.sourceEditorOpen;
    outputElement.style.removeProperty("--docdiagram-source-tray-height");
    return;
  }

  if (tray) {
    tray.dataset.theme = documentTheme;
    outputElement.dataset.sourceEditorOpen = "true";
    updateSourceEditorStatus();
    return;
  }

  tray = document.createElement("section");
  tray.className = "docdiagram-source-tray";
  tray.dataset.theme = documentTheme;
  tray.setAttribute("aria-label", "Document source editor");
  tray.innerHTML = [
    `<header class="docdiagram-source-header">`,
    `<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>`,
    `<button type="button" class="docdiagram-source-close">Close source editor</button>`,
    `</header>`,
    `<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>`,
    `<p class="docdiagram-source-status" aria-live="polite"></p>`,
    `<p class="docdiagram-source-error" role="alert"></p>`
  ].join("");
  const editor = tray.querySelector(".docdiagram-source-editor");
  const closeButton = tray.querySelector(".docdiagram-source-close");

  editor.value = sourceEditorDraft;
  editor.addEventListener("input", () => {
    sourceEditorDraft = editor.value;
    sourceEditorError = "";
    updateSourceEditorStatus();
    scheduleSourceEditorRender();
  });
  closeButton.addEventListener("click", closeSourceEditor);
  outputElement.after(tray);
  outputElement.dataset.sourceEditorOpen = "true";
  const syncTrayHeight = () => {
    outputElement.style.setProperty("--docdiagram-source-tray-height", `${tray.offsetHeight}px`);
  };
  sourceEditorResizeObserver?.disconnect();
  if (globalThis.ResizeObserver) {
    sourceEditorResizeObserver = new globalThis.ResizeObserver(syncTrayHeight);
    sourceEditorResizeObserver.observe(tray);
  }
  syncTrayHeight();
  updateSourceEditorStatus();
}

function openSourceEditor() {
  globalThis.clearTimeout(sourceEditorRenderTimer);
  sourceEditorDraft = getSource();
  sourceEditorError = "";
  sourceEditorOpen = true;
  if (editingDiagramIndex !== null) {
    editingDiagramIndex = null;
    editSessionDiagram = null;
    clearEditorState();
  }
  renderDocument();
  globalThis.requestAnimationFrame?.(focusSourceEditor) ?? focusSourceEditor();
}

function closeSourceEditor() {
  flushSourceEditorRender();
  if (sourceEditorError && sourceEditorDraft !== getSource() &&
    !globalThis.confirm("Discard the invalid source changes?")) {
    return;
  }

  sourceEditorOpen = false;
  sourceEditorDraft = "";
  sourceEditorError = "";
  createSourceEditorTray();
  document.querySelector(".docdiagram-menu-toggle")?.focus();
}

function persistDiagramModels() {
  let diagramIndex = 0;
  const source = getSource().replaceAll("\r\n", "\n").replace(
    /^```diagram\s*\n([\s\S]*?)^```$/gm,
    () => {
      const diagram = diagramModels[diagramIndex];
      diagramIndex += 1;
      return `\`\`\`diagram\n${serializeDiagram(diagram)}\n\`\`\``;
    }
  );

  setSource(source);
  syncOpenSourceEditor(source);
}

function syncOpenSourceEditor(source) {
  if (!sourceEditorOpen) {
    return;
  }

  sourceEditorDraft = source;
  sourceEditorError = "";
  const editor = document.querySelector(".docdiagram-source-editor");
  if (!editor) {
    return;
  }

  const selectionStart = editor.selectionStart;
  const selectionEnd = editor.selectionEnd;
  const scrollTop = editor.scrollTop;
  editor.value = source;
  editor.setSelectionRange(
    Math.min(selectionStart, source.length),
    Math.min(selectionEnd, source.length)
  );
  editor.scrollTop = scrollTop;
  updateSourceEditorStatus();
}

function getSelectedNode() {
  if (!selectedNode) {
    return null;
  }

  return diagramModels[selectedNode.diagramIndex]?.nodes.find(
    (node) => node.id === selectedNode.nodeId
  ) || null;
}

function getSelectedEdge() {
  if (!selectedEdge) {
    return null;
  }

  return diagramModels[selectedEdge.diagramIndex]?.edges[selectedEdge.edgeIndex] || null;
}

function getSelectedSequenceElement() {
  if (!selectedSequenceElement) {
    return null;
  }
  const diagram = diagramModels[selectedSequenceElement.diagramIndex];
  if (!diagram || diagram.type !== "sequence") {
    return null;
  }
  if (selectedSequenceElement.kind === "participant") {
    return diagram.participants.find((participant) => participant.id === selectedSequenceElement.id) || null;
  }
  return diagram[`${selectedSequenceElement.kind}s`]?.[selectedSequenceElement.index] || null;
}

function buildSequenceInspectorFields(element) {
  const palettes = nodeColorSchemes[documentColorScheme];
  const style = getSequenceElementEffectiveStyle(
    diagramModels[selectedSequenceElement.diagramIndex],
    element
  );
  const supportsPresentation = selectedSequenceElement.kind !== "message";

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(element.label)}</textarea></label>`,
    selectedSequenceElement.kind === "message"
      ? `<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${element.style !== "dashed" ? " selected" : ""}>Solid</option><option value="dashed"${element.style === "dashed" ? " selected" : ""}>Dashed</option></select></label>`
      : "",
    supportsPresentation
      ? `<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${element.palette?.tone !== "dark" ? " selected" : ""}>Light</option><option value="dark"${element.palette?.tone === "dark" ? " selected" : ""}>Dark</option></select></label>`
      : "",
    supportsPresentation
      ? `<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${Object.entries(palettes).map(
        ([name, palette]) => `<option value="${name}"${name === (element.palette?.colour || "blue") ? " selected" : ""}>${palette.label}</option>`
      ).join("")}</select></label>`
      : "",
    supportsPresentation
      ? `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${escapeHtml(style.fill)}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${escapeHtml(style.stroke)}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${escapeHtml(style.text)}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(element.size?.width) || ""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(element.size?.height) || ""}"></label>`
      : ""
  ].join("");
}


function createToolbar() {
  const toolbar = document.createElement("section");
  toolbar.className = "docdiagram-toolbar";
  toolbar.dataset.editing = String(editingDiagramIndex !== null);
  toolbar.dataset.theme = documentTheme;
  toolbar.dataset.format = documentFormat;

  const node = selectedNode && isDiagramEditing(selectedNode.diagramIndex) ? getSelectedNode() : null;
  const edge = selectedEdge && isDiagramEditing(selectedEdge.diagramIndex) && !node ? getSelectedEdge() : null;
  const sequenceElement = !node && !edge ? getSelectedSequenceElement() : null;
  const inspectorDiagram = node
    ? diagramModels[selectedNode.diagramIndex]
    : edge
      ? diagramModels[selectedEdge.diagramIndex]
      : sequenceElement
        ? diagramModels[selectedSequenceElement.diagramIndex]
        : null;

  toolbar.innerHTML = [
    `<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">☰</button>`,
    `<div class="docdiagram-menu" hidden>`,
    `<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">`,
    `<option value="light"${documentTheme === "light" ? " selected" : ""}>Light</option>`,
    `<option value="dark"${documentTheme === "dark" ? " selected" : ""}>Dark</option>`,
    `</select></label>`,
    `<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">`,
    `<option value="centered"${documentFormat === "centered" ? " selected" : ""}>Centered</option>`,
    `<option value="full-width"${documentFormat === "full-width" ? " selected" : ""}>Full width</option>`,
    `</select></label>`,
    `<button type="button" class="docdiagram-edit-source">Edit source</button>`,
    `<button type="button" class="docdiagram-save">Save As</button>`,
    `<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>`,
    `</div>`,
    node
      ? `<div class="docdiagram-inspector" data-kind="node">${buildNodeInspectorFields(inspectorDiagram, node)}</div>`
      : edge
        ? `<div class="docdiagram-inspector" data-kind="edge">${buildEdgeInspectorFields(inspectorDiagram, edge)}</div>`
        : sequenceElement
          ? `<div class="docdiagram-inspector" data-kind="sequence">${buildSequenceInspectorFields(sequenceElement)}</div>`
          : ""
  ].join("");

  const menuToggle = toolbar.querySelector(".docdiagram-menu-toggle");
  const menu = toolbar.querySelector(".docdiagram-menu");
  const saveButton = toolbar.querySelector(".docdiagram-save");
  const editSourceButton = toolbar.querySelector(".docdiagram-edit-source");
  const themeSelect = toolbar.querySelector(".docdiagram-theme-select");
  const formatSelect = toolbar.querySelector(".docdiagram-format-select");

  menuToggle.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  saveButton.addEventListener("click", downloadDocument);
  editSourceButton.addEventListener("click", () => {
    closeDocumentMenu();
    openSourceEditor();
  });
  themeSelect.addEventListener("change", () => {
    setSource(setFrontmatterTheme(getSource(), themeSelect.value));
    renderDocument();
  });
  formatSelect.addEventListener("change", () => {
    documentFormat = formatSelect.value;
    renderDocument();
  });

  outputElement.before(toolbar);

  if (node) {
    wireNodeInspector(toolbar, selectedNode.diagramIndex, selectedNode.nodeId);
    positionInspector(selectedNode.diagramIndex);
  } else if (edge) {
    wireEdgeInspector(toolbar, selectedEdge.diagramIndex, selectedEdge.edgeIndex);
    positionInspector(selectedEdge.diagramIndex);
  } else if (sequenceElement) {
    wireSequenceInspector(toolbar);
    positionInspector(selectedSequenceElement.diagramIndex);
  }

  function positionInspector(diagramIndex) {
    const inspector = document.querySelector(".docdiagram-inspector");
    const diagram = outputElement.querySelector(`.docdiagram[data-diagram-index="${diagramIndex}"]`);
    if (!inspector || !diagram) {
      return;
    }
    inspector.style.top = `${Math.max(16, diagram.getBoundingClientRect().top)}px`;
  }

  wireChromeControls(toolbar);
}

function isDirty() {
  return getSource() !== savedSource;
}

function clampZoom(value) {
  return Math.min(200, Math.max(25, Number(value) || 100));
}

function clearEditorState() {
  selectedNode = null;
  selectedEdge = null;
  selectedSequenceElement = null;
  editingNode = null;
  editingEdge = null;
}

function wireSequenceInspector(toolbar) {
  const element = getSelectedSequenceElement();
  if (!element) {
    return;
  }

  const update = (mutate) => {
    mutate();
    persistDiagramModels();
    renderDocument();
  };
  toolbar.querySelector(".docdiagram-sequence-inspector-label")?.addEventListener("change", (event) => {
    update(() => { element.label = String(event.target.value).trim() || element.label; });
  });
  toolbar.querySelector(".docdiagram-sequence-inspector-message-style")?.addEventListener("change", (event) => {
    update(() => { element.style = event.target.value; });
  });
  const tone = toolbar.querySelector(".docdiagram-sequence-inspector-tone");
  const colour = toolbar.querySelector(".docdiagram-sequence-inspector-colour");
  const setPalette = () => update(() => setNodeColorPalette(element, tone.value, colour.value));
  tone?.addEventListener("change", setPalette);
  colour?.addEventListener("change", setPalette);
  for (const [selector, key] of [
    [".docdiagram-sequence-inspector-fill", "fill"],
    [".docdiagram-sequence-inspector-stroke", "stroke"],
    [".docdiagram-sequence-inspector-text", "text"]
  ]) {
    toolbar.querySelector(selector)?.addEventListener("change", (event) => {
      update(() => setNodeStyleOverride(element, key, event.target.value));
    });
  }
  for (const [selector, key] of [
    [".docdiagram-sequence-inspector-width", "width"],
    [".docdiagram-sequence-inspector-height", "height"]
  ]) {
    toolbar.querySelector(selector)?.addEventListener("change", (event) => {
      update(() => {
        const value = Number(event.target.value);
        if (Number.isFinite(value) && value > 0) {
          element.size = { ...element.size, [key]: value };
        }
      });
    });
  }
}

function exitEditing(diagramIndex, discard) {
  if (discard && editSessionDiagram !== null) {
    diagramModels[diagramIndex] = editSessionDiagram;
    persistDiagramModels();
  }
  editingDiagramIndex = null;
  editSessionDiagram = null;
  clearEditorState();
  renderDocument();
}

function createNewNode(diagramIndex) {
  const diagram = diagramModels[diagramIndex];
  if (!diagram) {
    return;
  }
  const node = createNode(diagram);
  selectedNode = { diagramIndex, nodeId: node.id };
  selectedEdge = null;
  persistDiagramModels();
  renderDocument();
}

function wireChromeControls(toolbar) {
  for (const button of outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out")) {
    button.addEventListener("click", () => {
      const diagramIndex = Number(button.dataset.diagramIndex);
      const current = diagramZooms.get(diagramIndex) || 100;
      const direction = button.classList.contains("docdiagram-zoom-in") ? 25 : -25;
      diagramZooms.set(diagramIndex, clampZoom(current + direction));
      renderDocument();
    });
  }
  for (const button of outputElement.querySelectorAll(".docdiagram-fit")) {
    button.addEventListener("click", () => {
      diagramZooms.set(Number(button.dataset.diagramIndex), 100);
      renderDocument();
    });
  }

  for (const button of outputElement.querySelectorAll(".docdiagram-start-editing")) {
    button.addEventListener("click", () => {
      const diagramIndex = Number(button.closest(".docdiagram")?.dataset.diagramIndex);
      editSessionDiagram = parseDiagram(serializeDiagram(diagramModels[diagramIndex]));
      editingDiagramIndex = diagramIndex;
      clearEditorState();
      renderDocument();
    });
  }
  for (const button of outputElement.querySelectorAll(".docdiagram-done-editing")) {
    button.addEventListener("click", () => exitEditing(editingDiagramIndex, false));
  }
  for (const button of outputElement.querySelectorAll(".docdiagram-cancel-editing")) {
    button.addEventListener("click", () => exitEditing(editingDiagramIndex, true));
  }
  for (const button of outputElement.querySelectorAll(".docdiagram-create-node")) {
    button.addEventListener("click", () => createNewNode(Number(button.dataset.diagramIndex)));
  }
}

function buildNodeInspectorFields(diagram, node) {
  const grid = getGridSize(diagram);
  const style = getNodeEffectiveStyle(diagram, node);
  const width = Number(node.size?.width) || 190;
  const height = Number(node.size?.height) || 80;
  const minimumDimensions = getMinimumNodeDimensions(node.shape);
  const widthMinimum = grid ? Math.ceil(minimumDimensions.width / grid) * grid : minimumDimensions.width;
  const heightMinimum = grid ? Math.ceil(minimumDimensions.height / grid) * grid : minimumDimensions.height;
  const step = grid || 1;
  const palettes = nodeColorSchemes[documentColorScheme];
  const matchingPalette = Object.entries(palettes).find(([, palette]) =>
    [palette.light, palette.dark].some((preset) =>
      preset.fill.toLowerCase() === style.fill.toLowerCase() &&
      preset.stroke.toLowerCase() === style.stroke.toLowerCase() &&
      preset.text.toLowerCase() === style.text.toLowerCase()
    )
  );
  const matchingColour = node.palette?.colour || matchingPalette?.[0] || "blue";
  const matchingTone = node.palette?.tone || (matchingPalette && matchingPalette[1].light.fill.toLowerCase() === style.fill.toLowerCase()
    ? "light"
    : "dark");

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(node.label)}</textarea></label>`,
    `<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${escapeHtml(node.subtitle || "")}</textarea></label>`,
    `<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${matchingTone === "light" ? " selected" : ""}>Light</option><option value="dark"${matchingTone === "dark" ? " selected" : ""}>Dark</option></select></label>`,
    `<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${Object.entries(palettes).map(
      ([name, palette]) => `<option value="${name}"${name === matchingColour ? " selected" : ""}>${palette.label}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${nodeShapes.map(
      (shape) => `<option value="${shape}"${shape === node.shape ? " selected" : ""}>${shape}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${escapeHtml(style.fill)}"></label>`,
    `<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke)}"></label>`,
    `<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(style.strokeWidth) || 2}" min="1" step="1"></label>`,
    `<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text)}"></label>`,
    `<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${width}" min="${widthMinimum}" step="${step}"></label>`,
    `<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${height}" min="${heightMinimum}" step="${step}"></label>`
  ].join("");
}

function buildEdgeInspectorFields(diagram, edge) {
  const style = getEdgeEffectiveStyle(diagram, edge);
  const strokeWidth = Number(style.strokeWidth) || 2;
  const route = edge.route || "orthogonal";
  const startMarkerStyle = getEdgeMarkerStyle(edge, "start");
  const endMarkerStyle = getEdgeMarkerStyle(edge, "end");

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(edge.label || "")}</textarea></label>`,
    `<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${edgeRoutes.map(
      (candidate) => `<option value="${candidate}"${candidate === route ? " selected" : ""}>${candidate}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${edgeAnchors.map(
      (candidate) => `<option value="${candidate}"${candidate === edge.sourceAnchor ? " selected" : ""}>${candidate}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${edgeAnchors.map(
      (candidate) => `<option value="${candidate}"${candidate === edge.targetAnchor ? " selected" : ""}>${candidate}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${edgeMarkerStyles.map(
      (candidate) => `<option value="${candidate}"${candidate === startMarkerStyle ? " selected" : ""}>${candidate}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${edgeMarkerStyles.map(
      (candidate) => `<option value="${candidate}"${candidate === endMarkerStyle ? " selected" : ""}>${candidate}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke)}"></label>`,
    `<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text)}"></label>`,
    `<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${strokeWidth}" min="1" step="1"></label>`
  ].join("");
}

function wireNodeInspector(container, diagramIndex, nodeId) {
  function withNode(mutate) {
    const diagram = diagramModels[diagramIndex];
    const node = diagram?.nodes.find((candidate) => candidate.id === nodeId);
    if (!diagram || !node) {
      return;
    }

    mutate(diagram, node);
    persistDiagramModels();
    renderDocument();
  }

  container.querySelector(".docdiagram-inspector-label").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeLabel(node, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-subtitle").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeSubtitle(node, event.target.value));
  });

  const toneSelect = container.querySelector(".docdiagram-inspector-tone");
  const colourSelect = container.querySelector(".docdiagram-inspector-colour");
  const applyColourPalette = () => {
    withNode((diagram, node) => setNodeColorPalette(node, toneSelect.value, colourSelect.value));
  };
  toneSelect.addEventListener("change", applyColourPalette);
  colourSelect.addEventListener("change", applyColourPalette);

  container.querySelector(".docdiagram-inspector-shape").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeShape(node, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-fill").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeStyleOverride(node, "fill", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-stroke").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeStyleOverride(node, "stroke", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-text").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeStyleOverride(node, "text", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-stroke-width").addEventListener("change", (event) => {
    withNode((diagram, node) => setStyleStrokeWidth(node, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-width").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeSize(diagram, node, "width", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-height").addEventListener("change", (event) => {
    withNode((diagram, node) => setNodeSize(diagram, node, "height", event.target.value));
  });
}

function wireEdgeInspector(container, diagramIndex, edgeIndex) {
  function withEdge(mutate) {
    const diagram = diagramModels[diagramIndex];
    const edge = diagram?.edges[edgeIndex];
    if (!diagram || !edge) {
      return;
    }

    mutate(diagram, edge);
    persistDiagramModels();
    renderDocument();
  }

  container.querySelector(".docdiagram-inspector-label").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeLabel(edge, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-route").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeRoute(edge, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-source-anchor").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeAnchor(edge, "source", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-target-anchor").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeAnchor(edge, "target", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-marker-start").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeMarkerStart(edge, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-marker-end").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeMarkerEnd(edge, event.target.value));
  });

  container.querySelector(".docdiagram-inspector-stroke").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeStyleOverride(edge, "stroke", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-text").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setEdgeStyleOverride(edge, "text", event.target.value));
  });

  container.querySelector(".docdiagram-inspector-stroke-width").addEventListener("change", (event) => {
    withEdge((diagram, edge) => setStyleStrokeWidth(edge, event.target.value));
  });
}

function selectNode(diagramIndex, nodeId) {
  selectedNode = { diagramIndex, nodeId };
  selectedEdge = null;
  editingNode = null;
  editingEdge = null;
  renderDocument();
}

function selectEdge(diagramIndex, edgeIndex) {
  selectedEdge = { diagramIndex, edgeIndex };
  selectedNode = null;
  editingNode = null;
  editingEdge = null;
  renderDocument();
}

function clearSelection() {
  selectedNode = null;
  selectedEdge = null;
  editingNode = null;
  editingEdge = null;
  renderDocument();
}

function deleteSelected() {
  if (selectedNode) {
    const { diagramIndex, nodeId } = selectedNode;
    const diagram = diagramModels[diagramIndex];
    const attachedEdges = diagram?.edges.filter((edge) => edge.source === nodeId || edge.target === nodeId) || [];
    if (attachedEdges.length && !globalThis.confirm(`Delete this node and its ${attachedEdges.length} attached connector${attachedEdges.length === 1 ? "" : "s"}?`)) {
      return;
    }
    deleteNode(diagram, nodeId);
  } else if (selectedEdge) {
    deleteConnector(diagramModels[selectedEdge.diagramIndex], selectedEdge.edgeIndex);
  } else {
    return;
  }
  selectedNode = null;
  selectedEdge = null;
  editingNode = null;
  editingEdge = null;
  persistDiagramModels();
  renderDocument();
}

function saveInlineLabel(input) {
  const node = getSelectedNode();
  if (node) {
    setNodeLabel(node, input.value);
    persistDiagramModels();
  }

  editingNode = null;
  renderDocument();
}

function saveInlineEdgeLabel(input) {
  const edge = getSelectedEdge();
  if (edge) {
    setEdgeLabel(edge, input.value);
    persistDiagramModels();
  }

  editingEdge = null;
  renderDocument();
}

function svgPoint(svg, event) {
  const bounds = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;

  return {
    x: (event.clientX - bounds.left) * viewBox.width / bounds.width,
    y: (event.clientY - bounds.top) * viewBox.height / bounds.height
  };
}

function updateNodeSizeMarkup(group, node, width, height) {
  const x = Number(node.position?.x) || 0;
  const y = Number(node.position?.y) || 0;
  const nodeBody = group.querySelector(".docdiagram-node-body");
  const label = group.querySelector(".docdiagram-node-label");
  const subtitle = group.querySelector(".docdiagram-node-subtitle");
  const handle = group.querySelector(".docdiagram-resize-handle");
  const style = getNodeEffectiveStyle(diagramModels[Number(group.dataset.diagramIndex)], node);
  const geometry = getNodeGeometry(node, x, y, width, height);
  const layout = computeNodeTextLayout(geometry.textBounds, node);

  nodeBody.outerHTML = renderNodeBody(geometry, style, Number(style.strokeWidth) || 2);

  if (label) {
    label.setAttribute("x", layout.centerX);
    label.setAttribute("y", layout.labelStartY);
    for (const tspan of label.querySelectorAll("tspan")) {
      tspan.setAttribute("x", layout.centerX);
    }
  }

  if (subtitle) {
    subtitle.setAttribute("x", layout.centerX);
    subtitle.setAttribute("y", layout.subtitleStartY);
    for (const tspan of subtitle.querySelectorAll("tspan")) {
      tspan.setAttribute("x", layout.centerX);
    }
  }

  handle?.setAttribute("x", x + width - 7);
  handle?.setAttribute("y", y + height - 7);
}

function resizeNode(svg, event, group) {
  event.preventDefault();
  const diagramIndex = Number(group.dataset.diagramIndex);
  const nodeId = group.dataset.nodeId;
  const diagram = diagramModels[diagramIndex];
  const node = diagram.nodes.find((candidate) => candidate.id === nodeId);
  const start = svgPoint(svg, event);
  const origin = {
    width: Number(node.size?.width) || 190,
    height: Number(node.size?.height) || 80
  };
  const grid = getGridSize(diagram);
  let resized = false;

  if (event.isTrusted) {
    svg.setPointerCapture(event.pointerId);
  }

  function move(moveEvent) {
    const point = svgPoint(svg, moveEvent);
    let width = clampNodeSize(origin.width + point.x - start.x, minimumNodeSize.width, grid);
    let height = clampNodeSize(origin.height + point.y - start.y, minimumNodeSize.height, grid);

    if (node.shape === "circle") {
      const diameter = Math.max(width, height);
      width = diameter;
      height = diameter;
    }

    resized = resized || width !== origin.width || height !== origin.height;
    node.size = { ...node.size, width, height };
    updateNodeSizeMarkup(group, node, width, height);
  }

  function finish(finishEvent) {
    if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
      svg.releasePointerCapture(finishEvent.pointerId);
    }
    svg.removeEventListener("pointermove", move);
    svg.removeEventListener("pointerup", finish);
    svg.removeEventListener("pointercancel", finish);

    if (resized) {
      expandCanvasForNode(diagram, node);
      selectedNode = { diagramIndex, nodeId };
      selectedEdge = null;
      editingNode = null;
      editingEdge = null;
      persistDiagramModels();
      renderDocument();
    }
  }

  svg.addEventListener("pointermove", move);
  svg.addEventListener("pointerup", finish);
  svg.addEventListener("pointercancel", finish);
}

function getNodePortPoint(node, anchor) {
  const bounds = getNodeBounds(node);
  return getNodeGeometry(node, bounds.x, bounds.y, bounds.width, bounds.height).anchors[anchor];
}

function addConnectionTargetPorts(svg, diagramIndex) {
  const diagram = diagramModels[diagramIndex];
  for (const node of diagram.nodes) {
    for (const anchor of edgeAnchors) {
      const point = getNodePortPoint(node, anchor);
      const port = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      port.setAttribute("class", "docdiagram-connection-port docdiagram-connection-target-port");
      port.dataset.nodeId = node.id;
      port.dataset.anchor = anchor;
      port.setAttribute("cx", point.x);
      port.setAttribute("cy", point.y);
      port.setAttribute("r", "7");
      svg.append(port);
    }
  }
}

function beginConnectionDrag(svg, event, drag) {
  event.preventDefault();
  event.stopPropagation();
  connectionDrag = { ...drag, current: svgPoint(svg, event), invalid: false };
  addConnectionTargetPorts(svg, drag.diagramIndex);
  const preview = document.createElementNS("http://www.w3.org/2000/svg", "path");
  preview.setAttribute("class", "docdiagram-connection-preview");
  svg.append(preview);

  if (event.isTrusted) {
    svg.setPointerCapture(event.pointerId);
  }

  function getDropPort(pointerEvent) {
    const hitPort = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY)
      ?.closest(".docdiagram-connection-port");
    if (hitPort) {
      return hitPort;
    }
    return [...svg.querySelectorAll(".docdiagram-connection-port")].find((port) => {
      const bounds = port.getBoundingClientRect();
      return pointerEvent.clientX >= bounds.left && pointerEvent.clientX <= bounds.right &&
        pointerEvent.clientY >= bounds.top && pointerEvent.clientY <= bounds.bottom;
    }) || null;
  }

  function move(moveEvent) {
    const point = svgPoint(svg, moveEvent);
    const candidate = getDropPort(moveEvent);
    connectionDrag.current = point;
    connectionDrag.invalid = !candidate;
    const targetAnchor = candidate?.dataset.anchor || connectionDrag.sourceAnchor;
    preview.setAttribute("d", buildEdgePath(
      connectionDrag.start,
      point,
      connectionDrag.sourceAnchor,
      targetAnchor,
      "straight"
    ).path);
    preview.classList.toggle("docdiagram-connection-invalid", connectionDrag.invalid);
  }

  function finish(finishEvent) {
    if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
      svg.releasePointerCapture(finishEvent.pointerId);
    }
    svg.removeEventListener("pointermove", move);
    svg.removeEventListener("pointerup", finish);
    svg.removeEventListener("pointercancel", finish);

    const target = getDropPort(finishEvent);
    const dragState = connectionDrag;
    connectionDrag = null;
    if (target && dragState) {
      const diagram = diagramModels[dragState.diagramIndex];
      if (dragState.reconnect) {
        reconnectConnector(
          diagram.edges[dragState.edgeIndex],
          dragState.endpoint,
          target.dataset.nodeId || target.closest(".docdiagram-node")?.dataset.nodeId,
          target.dataset.anchor
        );
        selectedEdge = { diagramIndex: dragState.diagramIndex, edgeIndex: dragState.edgeIndex };
        selectedNode = null;
      } else {
        const targetNodeId = target.dataset.nodeId || target.closest(".docdiagram-node")?.dataset.nodeId;
        if (targetNodeId) {
          const edge = createConnector(
            diagram,
            dragState.sourceNodeId,
            dragState.sourceAnchor,
            targetNodeId,
            target.dataset.anchor
          );
          selectedEdge = { diagramIndex: dragState.diagramIndex, edgeIndex: diagram.edges.indexOf(edge) };
          selectedNode = null;
        }
      }
      persistDiagramModels();
    }
    renderDocument();
  }

  svg.addEventListener("pointermove", move);
  svg.addEventListener("pointerup", finish);
  svg.addEventListener("pointercancel", finish);
}

function isEdgeEditor(element) {
  return element.classList.contains("docdiagram-inline-editor-edge");
}

function commitInlineEditor(element) {
  if (isEdgeEditor(element)) {
    saveInlineEdgeLabel(element);
  } else {
    saveInlineLabel(element);
  }
}

function cancelInlineEditor(element) {
  if (isEdgeEditor(element)) {
    editingEdge = null;
  } else {
    editingNode = null;
  }
  renderDocument();
}

function beginCanvasPan(svg, event) {
  const frame = svg.closest(".docdiagram");
  if (!frame) {
    return;
  }

  event.preventDefault();
  const start = {
    clientX: event.clientX,
    clientY: event.clientY,
    scrollLeft: frame.scrollLeft,
    scrollTop: frame.scrollTop
  };
  frame.classList.add("docdiagram-panning");

  if (event.isTrusted) {
    svg.setPointerCapture(event.pointerId);
  }

  function move(moveEvent) {
    frame.scrollLeft = start.scrollLeft - (moveEvent.clientX - start.clientX);
    frame.scrollTop = start.scrollTop - (moveEvent.clientY - start.clientY);
  }

  function finish(finishEvent) {
    if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
      svg.releasePointerCapture(finishEvent.pointerId);
    }
    frame.classList.remove("docdiagram-panning");
    svg.removeEventListener("pointermove", move);
    svg.removeEventListener("pointerup", finish);
    svg.removeEventListener("pointercancel", finish);
  }

  svg.addEventListener("pointermove", move);
  svg.addEventListener("pointerup", finish);
  svg.addEventListener("pointercancel", finish);
}

function enableCanvasPanning() {
  for (const svg of outputElement.querySelectorAll(".docdiagram svg")) {
    svg.addEventListener("pointerdown", (event) => {
      if (event.target === svg) {
        beginCanvasPan(svg, event);
      }
    });
  }
}

function enableSequenceSelection() {
  for (const svg of outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg')) {
    svg.addEventListener("click", (event) => {
      if (!isDiagramEditing(Number(svg.dataset.diagramIndex))) {
        return;
      }
      const participant = event.target.closest(".docdiagram-sequence-participant");
      const note = event.target.closest(".docdiagram-sequence-note");
      const message = event.target.closest(".docdiagram-sequence-message");
      if (participant) {
        selectedSequenceElement = {
          diagramIndex: Number(participant.dataset.diagramIndex),
          kind: "participant",
          id: participant.dataset.participantId
        };
      } else if (note) {
        selectedSequenceElement = {
          diagramIndex: Number(note.dataset.diagramIndex),
          kind: "note",
          index: Number(note.dataset.noteIndex)
        };
      } else if (message) {
        selectedSequenceElement = {
          diagramIndex: Number(message.dataset.diagramIndex),
          kind: "message",
          index: Number(message.dataset.messageIndex)
        };
      } else {
        selectedSequenceElement = null;
      }
      selectedNode = null;
      selectedEdge = null;
      renderDocument();
    });
  }
}

function enableEditing() {
  for (const svg of outputElement.querySelectorAll(".docdiagram svg")) {
    if (!isDiagramEditing(Number(svg.dataset.diagramIndex))) {
      continue;
    }
    svg.addEventListener("click", (event) => {
      if (event.target.closest(".docdiagram-inline-editor")) {
        return;
      }

      const group = event.target.closest(".docdiagram-node");
      if (group) {
        selectNode(Number(group.dataset.diagramIndex), group.dataset.nodeId);
        return;
      }

      const edgeGroup = event.target.closest(".docdiagram-edge-group");
      if (edgeGroup) {
        const diagramIndex = Number(edgeGroup.dataset.diagramIndex);
        const edgeIndex = Number(edgeGroup.dataset.edgeIndex);
        const alreadySelected = selectedEdge?.diagramIndex === diagramIndex && selectedEdge.edgeIndex === edgeIndex;
        const alreadyEditing = editingEdge?.diagramIndex === diagramIndex && editingEdge.edgeIndex === edgeIndex;

        if (alreadySelected && !alreadyEditing) {
          editingEdge = { diagramIndex, edgeIndex };
          renderDocument();
        } else {
          selectEdge(diagramIndex, edgeIndex);
        }
        return;
      }

      if (selectedNode || selectedEdge) {
        clearSelection();
      }
    });

    svg.addEventListener("pointerdown", (event) => {
      const port = event.target.closest(".docdiagram-connection-port");
      if (port) {
        const group = port.closest(".docdiagram-node");
        const diagramIndex = Number(group?.dataset.diagramIndex ?? svg.dataset.diagramIndex);
        const nodeId = port.dataset.nodeId || group?.dataset.nodeId;
        const node = diagramModels[diagramIndex].nodes.find((candidate) => candidate.id === nodeId);
        if (node) {
          beginConnectionDrag(svg, event, {
            diagramIndex,
            sourceNodeId: nodeId,
            sourceAnchor: port.dataset.anchor,
            start: getNodePortPoint(node, port.dataset.anchor)
          });
        }
        return;
      }

      const endpoint = event.target.closest(".docdiagram-edge-endpoint");
      if (endpoint) {
        const diagramIndex = Number(endpoint.dataset.diagramIndex);
        const edgeIndex = Number(endpoint.dataset.edgeIndex);
        const edge = diagramModels[diagramIndex].edges[edgeIndex];
        const endpointName = endpoint.dataset.endpoint;
        const node = diagramModels[diagramIndex].nodes.find((candidate) => candidate.id === edge[endpointName]);
        beginConnectionDrag(svg, event, {
          diagramIndex,
          edgeIndex,
          endpoint: endpointName,
          reconnect: true,
          sourceAnchor: edge[`${endpointName}Anchor`],
          start: getNodePortPoint(node, edge[`${endpointName}Anchor`])
        });
        return;
      }

      const resizeHandle = event.target.closest(".docdiagram-resize-handle");
      if (resizeHandle) {
        resizeNode(svg, event, resizeHandle.closest(".docdiagram-node"));
        return;
      }

      if (event.target.closest(".docdiagram-inline-editor")) {
        return;
      }

      const group = event.target.closest(".docdiagram-node");
      if (!group) {
        return;
      }

      event.preventDefault();
      const diagramIndex = Number(group.dataset.diagramIndex);
      const nodeId = group.dataset.nodeId;
      const node = diagramModels[diagramIndex].nodes.find((candidate) => candidate.id === nodeId);
      const start = svgPoint(svg, event);
      const origin = {
        x: Number(node.position?.x) || 0,
        y: Number(node.position?.y) || 0
      };
      const grid = getGridSize(diagramModels[diagramIndex]);
      let moved = false;

      if (event.isTrusted) {
        svg.setPointerCapture(event.pointerId);
      }

      function move(moveEvent) {
        const point = svgPoint(svg, moveEvent);
        const x = snapToGrid(origin.x + point.x - start.x, grid);
        const y = snapToGrid(origin.y + point.y - start.y, grid);

        moved = moved || x !== origin.x || y !== origin.y;
        group.setAttribute("transform", `translate(${x - origin.x} ${y - origin.y})`);
        node.position = { ...node.position, x, y };
      }

      function finish(finishEvent) {
        if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
          svg.releasePointerCapture(finishEvent.pointerId);
        }
        svg.removeEventListener("pointermove", move);
        svg.removeEventListener("pointerup", finish);
        svg.removeEventListener("pointercancel", finish);

        if (moved) {
          expandCanvasForNode(diagramModels[diagramIndex], node);
          selectedNode = { diagramIndex, nodeId };
          selectedEdge = null;
          editingNode = null;
          editingEdge = null;
          persistDiagramModels();
          renderDocument();
        } else if (selectedNode?.diagramIndex === diagramIndex && selectedNode.nodeId === nodeId) {
          editingNode = { diagramIndex, nodeId };
          renderDocument();
        } else {
          selectNode(diagramIndex, nodeId);
        }
      }

      svg.addEventListener("pointermove", move);
      svg.addEventListener("pointerup", finish);
      svg.addEventListener("pointercancel", finish);
    });
  }

  for (const editor of outputElement.querySelectorAll(".docdiagram-inline-editor")) {
    let settled = false;

    const commit = () => {
      if (settled) {
        return;
      }
      settled = true;
      commitInlineEditor(editor);
    };

    const cancel = () => {
      if (settled) {
        return;
      }
      settled = true;
      cancelInlineEditor(editor);
    };

    editor.addEventListener("pointerdown", (event) => event.stopPropagation());
    editor.addEventListener("click", (event) => event.stopPropagation());
    editor.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        commit();
      } else if (event.key === "Escape") {
        event.preventDefault();
        cancel();
      }
    });
    editor.addEventListener("blur", commit, { once: true });
    editor.focus();
    editor.select();
  }

  if (!outputElement.dataset.deleteShortcutBound) {
    outputElement.dataset.deleteShortcutBound = "true";
    document.addEventListener("keydown", (event) => {
      if (editingDiagramIndex === null || (event.key !== "Delete" && event.key !== "Backspace")) {
        return;
      }
      if (event.target.matches("input, textarea, select, [contenteditable]")) {
        return;
      }
      if (selectedNode || selectedEdge) {
        event.preventDefault();
        deleteSelected();
      }
    });
  }
}

function downloadDocument() {
  flushSourceEditorRender();
  if (sourceEditorError && sourceEditorDraft !== getSource() &&
    !globalThis.confirm("Source has errors. Save the last valid version instead?")) {
    return;
  }
  const copy = document.documentElement.cloneNode(true);
  const sourceCopy = copy.querySelector("#source");
  const toolbar = copy.querySelector(".docdiagram-toolbar");
  const sourceTray = copy.querySelector(".docdiagram-source-tray");
  const output = copy.querySelector("#rendered-document");

  sourceCopy.content.replaceChildren(document.createTextNode(getSource()));
  toolbar?.remove();
  sourceTray?.remove();
  output.replaceChildren();

  const blob = new Blob([`<!doctype html>\n${copy.outerHTML}`], {
    type: "text/html;charset=utf-8"
  });
  const link = document.createElement("a");
  const title = document.title.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");

  link.href = URL.createObjectURL(blob);
  link.download = `${title || "document"}-edited.html`;
  link.click();
  URL.revokeObjectURL(link.href);
  savedSource = getSource();
}

function applyPageTheme(theme) {
  document.documentElement.dataset.docdiagramTheme = theme;
  if (document.body) {
    document.body.dataset.docdiagramTheme = theme;
  }
}

function removeToolbarChrome() {
  while (outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar")) {
    outputElement.previousElementSibling.remove();
  }
}

function closeDocumentMenu() {
  const menu = document.querySelector(".docdiagram-menu");
  const toggle = document.querySelector(".docdiagram-menu-toggle");
  if (!menu || !toggle) {
    return;
  }
  menu.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

function renderDocument(source = getSource(), { preserveOnError = false } = {}) {
  const scrollPositions = new Map(
    [...outputElement.querySelectorAll(".docdiagram")].map((diagram) => [
      Number(diagram.dataset.diagramIndex),
      { left: diagram.scrollLeft, top: diagram.scrollTop }
    ])
  );
  const pageScroll = { x: globalThis.scrollX || 0, y: globalThis.scrollY || 0 };
  const previousModels = [...diagramModels];
  const previousTheme = documentTheme;
  const previousColorScheme = documentColorScheme;
  diagramModels.length = 0;
  let parsedDocument;
  let markup;
  try {
    parsedDocument = preserveOnError ? validateDocumentSource(source) : resolveDocument(source);
    documentTheme = parsedDocument.theme;
    documentColorScheme = parsedDocument.colourScheme;
    markup = renderMarkdown(parsedDocument.content);
  } catch (error) {
    diagramModels.length = 0;
    diagramModels.push(...previousModels);
    if (preserveOnError) {
      documentTheme = previousTheme;
      documentColorScheme = previousColorScheme;
      sourceEditorError = error.message;
      updateSourceEditorStatus();
      return false;
    }
    applyPageTheme(documentTheme);
    removeToolbarChrome();
    outputElement.innerHTML = `<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
    createSourceEditorTray();
    return false;
  }

  setSource(source);
  sourceEditorError = "";
  outputElement.dataset.theme = documentTheme;
  outputElement.dataset.format = documentFormat;
  applyPageTheme(documentTheme);
  outputElement.innerHTML = markup;
  removeToolbarChrome();
  createToolbar();
  createSourceEditorTray();
  enableCanvasPanning();
  enableSequenceSelection();

  if (editingDiagramIndex !== null) {
    enableEditing();
  }

  for (const diagram of outputElement.querySelectorAll(".docdiagram")) {
    const position = scrollPositions.get(Number(diagram.dataset.diagramIndex));
    if (position) {
      diagram.scrollLeft = position.left;
      diagram.scrollTop = position.top;
    }
  }
  globalThis.scrollTo?.(pageScroll.x, pageScroll.y);
  return true;
}

function injectStyles() {
  const styles = document.createElement("style");
  styles.textContent = `
    html,
    body {
      margin: 0;
      min-height: 100%;
    }
    html[data-docdiagram-theme="light"],
    body[data-docdiagram-theme="light"] {
      background: #ffffff;
      color: #17202a;
    }
    html[data-docdiagram-theme="dark"],
    body[data-docdiagram-theme="dark"] {
      background: #17202a;
      color: #f3f8fc;
    }
    #rendered-document {
      background: var(--docdiagram-background);
      box-sizing: border-box;
      color: var(--docdiagram-text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.55;
      margin: 0 auto;
      max-width: 1100px;
      padding: 2rem;
    }
    #rendered-document[data-format="full-width"] {
      margin: 0;
      max-width: none;
    }
    #rendered-document[data-source-editor-open="true"] {
      padding-bottom: calc(2rem + var(--docdiagram-source-tray-height, 0px));
    }
    #rendered-document pre {
      background: var(--docdiagram-code-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      overflow: auto;
      padding: 1rem;
    }
    #rendered-document :not(pre) > code {
      background: var(--docdiagram-code-background);
      border-radius: 4px;
      font-size: .9em;
      padding: .12em .3em;
    }
    #rendered-document blockquote {
      border-left: 4px solid var(--docdiagram-border);
      color: var(--docdiagram-muted);
      margin-left: 0;
      padding-left: 1rem;
    }
    #rendered-document hr {
      border: 0;
      border-top: 1px solid var(--docdiagram-border);
      margin: 2rem 0;
    }
    #rendered-document a {
      color: inherit;
      text-decoration-thickness: .1em;
      text-underline-offset: .15em;
    }
    #rendered-document img {
      height: auto;
      max-width: 100%;
    }
    #rendered-document table {
      border-collapse: collapse;
      display: block;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }
    #rendered-document th,
    #rendered-document td {
      border: 1px solid var(--docdiagram-border);
      padding: .55rem .75rem;
    }
    #rendered-document th {
      background: var(--docdiagram-code-background);
      font-weight: 600;
    }
    #rendered-document .docdiagram-task-list-item {
      list-style: none;
    }
    #rendered-document .docdiagram-task-list-item input {
      accent-color: currentColor;
      margin: 0 .45rem 0 0;
    }
    #rendered-document .docdiagram-component {
      background: var(--docdiagram-component-fill, var(--docdiagram-code-background));
      border: 1px solid var(--docdiagram-component-stroke, var(--docdiagram-border));
      border-radius: 8px;
      color: var(--docdiagram-component-text, var(--docdiagram-text));
      margin: 1rem 0;
      padding: 1rem;
    }
    #rendered-document .docdiagram-section:not(.docdiagram-component-styled) {
      background: transparent;
    }
    #rendered-document .docdiagram-component-title {
      font-size: 1.1em;
      font-weight: 700;
      margin-bottom: .5rem;
    }
    #rendered-document .docdiagram-component > :last-child {
      margin-bottom: 0;
    }
    #rendered-document .docdiagram-component a {
      color: inherit;
    }
    #rendered-document .docdiagram-component :not(pre) > code {
      background: transparent;
      border: 1px solid currentColor;
    }
    #rendered-document .docdiagram-component pre,
    #rendered-document .docdiagram-component th {
      background: transparent;
      border-color: currentColor;
      color: inherit;
    }
    #rendered-document .docdiagram-component blockquote {
      border-color: currentColor;
      color: inherit;
    }
    #rendered-document .docdiagram-callout {
      border-left-width: 4px;
    }
    #rendered-document .docdiagram-callout-kind {
      font-size: .78em;
      font-weight: 700;
      letter-spacing: .06em;
      margin-bottom: .35rem;
      text-transform: uppercase;
    }
    #rendered-document .docdiagram-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: var(--docdiagram-grid-columns);
      margin: 1rem 0;
    }
    #rendered-document .docdiagram-grid-item > .docdiagram-component,
    #rendered-document .docdiagram-grid-item > .docdiagram-stack {
      margin: 0;
    }
    #rendered-document .docdiagram-grid-item > .docdiagram-component {
      box-sizing: border-box;
      height: 100%;
    }
    #rendered-document .docdiagram-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    #rendered-document .docdiagram-stack > * {
      margin: 0;
    }
    #rendered-document .docdiagram-literal-source {
      margin: 1rem 0;
    }
    @media (max-width: 700px) {
      #rendered-document .docdiagram-grid {
        grid-template-columns: 1fr;
      }
    }
    #rendered-document[data-theme="light"],
    .docdiagram-toolbar[data-theme="light"],
    .docdiagram-source-tray[data-theme="light"] {
      --docdiagram-background: #ffffff;
      --docdiagram-border: #dce3ea;
      --docdiagram-control-background: #ffffff;
      --docdiagram-control-hover: #eef4f8;
      --docdiagram-code-background: #f5f8fa;
      --docdiagram-text: #17202a;
      --docdiagram-muted: #52616b;
    }
    #rendered-document[data-theme="dark"],
    .docdiagram-toolbar[data-theme="dark"],
    .docdiagram-source-tray[data-theme="dark"] {
      --docdiagram-background: #17202a;
      --docdiagram-border: #3b5263;
      --docdiagram-control-background: #263947;
      --docdiagram-control-hover: #344c5d;
      --docdiagram-code-background: #101a22;
      --docdiagram-text: #f3f8fc;
      --docdiagram-muted: #c5d5e5;
    }
    .docdiagram-toolbar {
      align-items: center;
      background: var(--docdiagram-background);
      color: var(--docdiagram-text);
      display: flex;
      justify-content: flex-end;
      margin: 0;
      max-width: 1100px;
      padding: .5rem 2rem;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 40;
    }
    .docdiagram-toolbar[data-format="full-width"] {
      margin-left: 0;
      margin-right: 0;
      max-width: none;
    }
    .docdiagram-toolbar button,
    .docdiagram-toolbar input,
    .docdiagram-toolbar select {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      font: inherit;
      padding: .45rem .65rem;
    }
    .docdiagram-toolbar button {
      cursor: pointer;
    }
    .docdiagram-toolbar button:hover {
      background: var(--docdiagram-control-hover);
    }
    .docdiagram-toolbar button:disabled {
      cursor: not-allowed;
      opacity: .6;
    }
    .docdiagram-menu {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
      display: flex;
      flex-direction: column;
      gap: .6rem;
      padding: .75rem;
      position: absolute;
      right: 2rem;
      top: calc(100% + .25rem);
      z-index: 20;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
    }
    .docdiagram-menu[hidden] {
      display: none;
    }
    .docdiagram-source-tray {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-bottom: 0;
      box-shadow: 0 -4px 16px rgb(21 41 62 / 20%);
      box-sizing: border-box;
      color: var(--docdiagram-text);
      display: flex;
      flex-direction: column;
      height: min(42vh, 32rem);
      min-height: 12rem;
      padding: .75rem 1rem 1rem;
      position: fixed;
      resize: vertical;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 40;
      font-family: Arial, Helvetica, sans-serif;
    }
    .docdiagram-source-header {
      align-items: center;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-bottom: .5rem;
    }
    .docdiagram-source-shortcut {
      color: var(--docdiagram-muted);
      font-size: .8rem;
      margin-left: .75rem;
    }
    .docdiagram-source-close {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      padding: .35rem .55rem;
    }
    .docdiagram-source-label {
      display: flex;
      flex: 1;
      flex-direction: column;
      font-size: .85rem;
      gap: .35rem;
      min-height: 0;
    }
    .docdiagram-source-editor {
      background: var(--docdiagram-code-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      box-sizing: border-box;
      color: var(--docdiagram-text);
      flex: 1;
      font: .85rem/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      min-height: 0;
      padding: .65rem;
      resize: none;
      width: 100%;
    }
    .docdiagram-source-status,
    .docdiagram-source-error {
      font-size: .8rem;
      margin: .45rem 0 0;
    }
    .docdiagram-source-status {
      color: var(--docdiagram-muted);
    }
    .docdiagram-source-error {
      color: #c2410c;
    }
    .docdiagram-theme-control {
      align-items: center;
      color: var(--docdiagram-muted);
      display: flex;
      font-size: .9rem;
      gap: .75rem;
      justify-content: space-between;
    }
    .docdiagram-inspector {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
      display: flex;
      flex-direction: column;
      gap: .6rem;
      max-height: calc(100vh - 5.5rem);
      overflow-y: auto;
      padding: 1rem;
      position: fixed;
      right: 1rem;
      top: 1rem;
      width: min(19rem, calc(100vw - 2rem));
      z-index: 30;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
    }
    .docdiagram-field {
      align-items: center;
      color: var(--docdiagram-muted);
      display: flex;
      flex-direction: row;
      font-size: .9rem;
      gap: .75rem;
      justify-content: space-between;
      width: 100%;
    }
    .docdiagram-field-wide {
      width: 100%;
    }
    .docdiagram-field input,
    .docdiagram-field select,
    .docdiagram-field textarea {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      font-size: .85rem;
      padding: .3rem .4rem;
    }
    .docdiagram-field select,
    .docdiagram-field input:not([type="color"]) {
      min-width: 9rem;
    }
    .docdiagram-field input[type="color"] {
      height: 1.9rem;
      padding: 2px;
      width: 2.6rem;
    }
    .docdiagram-field input[type="number"] {
      width: 4.6rem;
    }
    .docdiagram-inspector-textarea {
      box-sizing: border-box;
      font-family: inherit;
      min-height: 2.4rem;
      resize: vertical;
      width: 100%;
    }
    .docdiagram {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgb(21 41 62 / 8%);
      margin: 1.5rem 0;
      height: min(70vh, 42rem);
      overflow: auto;
      padding: 1rem;
      position: relative;
    }
    .docdiagram-panning svg {
      cursor: grabbing;
    }
    .docdiagram-diagram-toolbar {
      display: flex;
      gap: .35rem;
      justify-content: flex-end;
      margin-bottom: .5rem;
      box-sizing: border-box;
      left: 0;
      position: sticky;
      right: 0;
      top: 0;
      width: 100%;
      z-index: 10;
    }
    .docdiagram-icon-button {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      height: 2rem;
      padding: 0;
      width: 2rem;
    }
    .docdiagram-icon-button:hover {
      background: var(--docdiagram-control-hover);
    }
    .docdiagram svg {
      display: block;
    }
    .docdiagram-edge {
      fill: none;
    }
    .docdiagram-edge-hit {
      fill: none;
    }
    .docdiagram-edge-group {
      cursor: default;
    }
    .docdiagram[data-editing="true"] .docdiagram-edge-group {
      cursor: pointer;
    }
    .docdiagram[data-editing="true"] .docdiagram-edge-group:has(.docdiagram-inline-editor) {
      cursor: text;
    }
    .docdiagram-edge-selected .docdiagram-edge {
      filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
    }
    .docdiagram-edge-label {
      filter: drop-shadow(0 0 4px var(--docdiagram-background));
      font-size: 15px;
    }
    .docdiagram-node-selected .docdiagram-node-body {
      filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
    }
    .docdiagram-resize-handle {
      cursor: nwse-resize;
      fill: #ffffff;
      stroke: #3574c7;
      stroke-width: 2;
    }
    .docdiagram-connection-port,
    .docdiagram-edge-endpoint {
      cursor: crosshair;
      fill: #ffffff;
      stroke: #3574c7;
      stroke-width: 2;
    }
    .docdiagram-connection-target-port {
      fill: #eaf2ff;
    }
    .docdiagram-connection-preview {
      fill: none;
      pointer-events: none;
      stroke: #3574c7;
      stroke-dasharray: 6 4;
      stroke-width: 2;
    }
    .docdiagram-connection-preview.docdiagram-connection-invalid {
      stroke: #d53f3f;
    }
    .docdiagram-node {
      cursor: default;
    }
    .docdiagram[data-editing="true"] .docdiagram-node {
      cursor: grab;
    }
    #rendered-document .docdiagram svg {
      cursor: grab;
    }
    .docdiagram[data-editing="true"] .docdiagram-node:has(.docdiagram-inline-editor) {
      cursor: text;
    }
    .docdiagram-node-label {
      font-size: 16px;
      font-weight: 650;
    }
    .docdiagram-node-subtitle {
      font-size: 13px;
    }
    .docdiagram-inline-editor {
      box-sizing: border-box;
      border: 1px solid #3574c7;
      border-radius: 4px;
      font: 650 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 4px 6px;
      resize: none;
      text-align: center;
      width: 100%;
    }
    .docdiagram-inline-editor-node {
      height: 100%;
    }
    .docdiagram-inline-editor-edge {
      font-size: 14px;
      font-weight: 500;
      height: 100%;
    }
    .docdiagram-error {
      background: #fff0f0;
      border: 1px solid #d53f3f;
      border-radius: 8px;
      color: #8b1c1c;
      margin: 1rem 0;
      padding: 1rem;
    }
  `;
  document.head.append(styles);
}

globalThis.DocDiagramCore = {
  diagramThemes,
  nodeColorSchemes,
  supportedDiagramTypes,
  nodeColorPalettes,
  nodeShapes,
  edgeAnchors,
  edgeRoutes,
  edgeMarkerStyles,
  getTheme,
  getGridSize,
  expandCanvasForNode,
  createUniqueNodeId,
  getDefaultNodePosition,
  createNode,
  createConnector,
  reconnectConnector,
  deleteConnector,
  deleteNode,
  getNodeEffectiveStyle,
  getEdgeEffectiveStyle,
  getEdgeMarkerStyle,
  getEdgeMarkerDimensions,
  parseDiagram,
  parseDocumentFrontmatter,
  resolveDocument,
  setFrontmatterTheme,
  isSafeUrl,
  renderInline,
  renderMarkdown,
  renderDiagram,
  snapToGrid,
  clampNodeSize,
  serializeDiagram,
  setNodeLabel,
  setNodeShape,
  setNodeSubtitle,
  setNodeStyleOverride,
  setNodeColorPalette,
  setNodeSize,
  setEdgeLabel,
  setEdgeRoute,
  setEdgeAnchor,
  setEdgeStyleOverride,
  setStyleStrokeWidth,
  setEdgeMarkerStart,
  setEdgeMarkerEnd,
  validateDocumentSource,
  findSourceTextRange,
  scrollSourceEditorToRange,
  splitTextLines,
  renderTextBlock,
  computeNodeTextLayout,
  getNodeGeometry,
  renderNodeBody,
  buildEdgePath,
  buildEdgeInspectorFields,
  clampZoom
};

if (sourceElement && outputElement) {
  injectStyles();
  savedSource = getSource();
  globalThis.addEventListener("beforeunload", (event) => {
    const hasUncommittedSourceDraft = sourceEditorOpen && sourceEditorDraft !== getSource();
    if (!isDirty() && !hasUncommittedSourceDraft) {
      return;
    }
    event.preventDefault();
    event.returnValue = "";
  });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "e" &&
      (sourceEditorOpen || !isEditableElement(event.target))) {
      event.preventDefault();
      sourceEditorOpen ? closeSourceEditor() : openSourceEditor();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      downloadDocument();
      return;
    }
    if (event.key === "Escape") {
      closeDocumentMenu();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    const toolbar = document.querySelector(".docdiagram-toolbar");
    if (toolbar && !toolbar.contains(event.target)) {
      closeDocumentMenu();
    }
  });
  outputElement.addEventListener("dblclick", (event) => {
    if (event.target.closest("button, input, textarea, select, [contenteditable]")) {
      return;
    }

    revealSourceText(globalThis.getSelection?.().toString() || "");
  });
  renderDocument();
}

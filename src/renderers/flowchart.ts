import {
  defaultNode,
  documentMinimumNodeSize,
  edgeAnchors,
  minimumNodeSize,
  type FlowchartDiagram,
  type FlowchartNode
} from "../core/diagrams/schema";
import { escapeHtml } from "../core/diagrams/parser";
import { getNodeEffectiveStyle, getEdgeEffectiveStyle, getEdgeMarkerStyle } from "../core/diagrams/styles";
import { splitTextLines, renderTextBlock, getNodeGeometry, computeNodeTextLayout, renderNodeBody, buildEdgePath, buildEdgeMarkerDef } from "../core/diagrams/geometry";
import type { DiagramRenderState, DiagramToolbarRenderer } from "./types";

export function getNodeBounds(node: FlowchartNode): { x: number; y: number; width: number; height: number } {
  return {
    x: Number(node.position?.x) || 0,
    y: Number(node.position?.y) || 0,
    width: Number(node.size?.width) || defaultNode.width,
    height: Number(node.size?.height) || defaultNode.height
  };
}

export function getMinimumNodeDimensions(shape: string): { width: number; height: number } {
  return shape === "document" ? documentMinimumNodeSize : minimumNodeSize;
}

export function renderDiagramToolbar(
  diagramIndex: number,
  editingMode: "none" | "flowchart" | "sequence",
  state: DiagramRenderState
): string {
  const allowsEditing = editingMode !== "none";
  const allowsNodeCreation = editingMode === "flowchart";
  return [
    `<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">`,
    `<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${diagramIndex}" aria-label="Zoom in" title="Zoom in">+</button>`,
    `<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${diagramIndex}" aria-label="Zoom out" title="Zoom out">−</button>`,
    `<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${diagramIndex}" aria-label="Zoom to fit" title="Zoom to fit">⊡</button>`,
    allowsEditing
      ? state.editingDiagramIndex === diagramIndex
        ? `<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">✓</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">×</button>${allowsNodeCreation ? `<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${diagramIndex}" aria-label="New node" title="New node">+</button>` : ""}`
        : state.editingDiagramIndex === null
          ? `<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">✎</button>`
          : ""
      : "",
    `</div>`
  ].join("");
}

export function renderFlowchartDiagram(
  diagram: FlowchartDiagram,
  diagramIndex: number,
  state: DiagramRenderState,
  renderToolbar: DiagramToolbarRenderer
): string {
  const { selectedNode, selectedEdge, editingNode, editingEdge, connectionDrag, diagramZooms } = state;
  const isDiagramEditing = state.editingDiagramIndex === diagramIndex;
  const nodes = new Map<string, FlowchartNode>();

  for (const node of diagram.nodes) {
    nodes.set(node.id, node);
  }

  const edgeLabelLineHeight = 16;
  const edgeMarkerDefs: string[] = [];
  const edgeEndpointMarkup: string[] = [];

  const edgeMarkup = diagram.edges.map((edge, edgeIndex) => {
    const sourceNode = nodes.get(edge.source);
    const targetNode = nodes.get(edge.target);

    if (!sourceNode || !targetNode) {
      return "";
    }

    const sourceGeometry = getNodeGeometry(
      sourceNode,
      Number(sourceNode.position?.x) || 0,
      Number(sourceNode.position?.y) || 0,
      Number(sourceNode.size?.width) || 190,
      Number(sourceNode.size?.height) || 80
    );
    const targetGeometry = getNodeGeometry(
      targetNode,
      Number(targetNode.position?.x) || 0,
      Number(targetNode.position?.y) || 0,
      Number(targetNode.size?.width) || 190,
      Number(targetNode.size?.height) || 80
    );
    const sourceAnchorName = edge.sourceAnchor || "right";
    const targetAnchorName = edge.targetAnchor || "left";
    const sourceAnchor = sourceGeometry.anchors[sourceAnchorName];
    const targetAnchor = targetGeometry.anchors[targetAnchorName];
    const route = edge.route || "orthogonal";
    const edgePath = buildEdgePath(sourceAnchor, targetAnchor, sourceAnchorName, targetAnchorName, route);
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
      edgeMarkerDefs.push(buildEdgeMarkerDef(startMarkerId, startMarkerStyle, "start", style.stroke || "", strokeWidth));
    }

    if (endMarkerStyle !== "none") {
      edgeMarkerDefs.push(buildEdgeMarkerDef(endMarkerId, endMarkerStyle, "end", style.stroke || "", strokeWidth));
    }

    if (isSelected && isDiagramEditing) {
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
      `<path class="docdiagram-edge" d="${edgePath.path}"${markerAttributes} stroke="${escapeHtml(style.stroke || "")}" stroke-width="${strokeWidth}"/>`,
      isEditing
        ? `<foreignObject class="docdiagram-inline-editor-host" x="${labelX - editorWidth / 2}" y="${labelY - editorHeight / 2}" width="${editorWidth}" height="${editorHeight}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${escapeHtml(edge.label || "")}</textarea></foreignObject>`
        : edgeLabelLines.length
          ? renderTextBlock(labelX, edgeLabelStartY, edgeLabelLines, edgeLabelLineHeight, "docdiagram-edge-label", style.text || "")
          : "",
      `</g>`
    ].join("");
  }).join("");

  const nodeMarkup = [...nodes.values()].map((node) => {
    const x = Number(node.position?.x) || 0;
    const y = Number(node.position?.y) || 0;
    const nodeWidth = Number(node.size?.width) || 190;
    const nodeHeight = Number(node.size?.height) || 80;
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
        : renderTextBlock(layout.centerX, layout.labelStartY, layout.labelLines, layout.labelLineHeight, "docdiagram-node-label", style.text || ""),
      !isEditing && layout.subtitleLines.length
        ? renderTextBlock(layout.centerX, layout.subtitleStartY, layout.subtitleLines, layout.subtitleLineHeight, "docdiagram-node-subtitle", style.text || "")
        : "",
      isSelected && isDiagramEditing && !isEditing
        ? `<rect class="docdiagram-resize-handle" x="${x + nodeWidth - 7}" y="${y + nodeHeight - 7}" width="14" height="14" rx="3"/>`
        : "",
      isSelected && isDiagramEditing && !isEditing
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
    `<figure class="docdiagram" data-diagram-index="${diagramIndex}" data-diagram-type="flowchart" data-editing="${isDiagramEditing}">`,
    renderToolbar(diagramIndex, "flowchart", state),
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

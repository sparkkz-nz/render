import {
  edgeAnchors,
  edgeMarkerStyles,
  edgeRoutes,
  colourSchemes,
  paletteRoles,
  nodeShapes,
  type FlowchartDiagram,
  type FlowchartEdge,
  type FlowchartNode,
  type SequenceMessage,
  type SequenceNote,
  type SequenceParticipant
} from "../core/diagrams/schema";
import { escapeHtml } from "../core/diagrams/parser";
import { findFlowchartNode } from "../core/diagrams/hierarchy";
import {
  deleteConnector,
  deleteNode,
  duplicateNode,
  setEdgeAnchor,
  setEdgeLabel,
  setEdgeMarkerEnd,
  setEdgeMarkerStart,
  setEdgeRoute,
  setEdgeStyleOverride,
  setNodeColorPalette,
  setNodeLabel,
  setNodeShape,
  setNodeSize,
  setNodeStyleOverride,
  setNodeSubtitle,
  setNodeTextAlignment,
  setStyleStrokeWidth
} from "../core/diagrams/mutations";
import { getEdgeEffectiveStyle, getGridSize, getNodeEffectiveStyle, getSequenceElementEffectiveStyle } from "../core/diagrams/styles";
import type { EditorState, SequenceSelection } from "./state";

export interface InspectorHost {
  readonly state: EditorState;
  persistDiagramModels(): void;
  renderDocument(): boolean;
}

type ControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type SequenceInspectable = SequenceParticipant | SequenceNote | SequenceMessage;

function paletteMarkup(colourScheme: string, theme: string, selectedPalette: string, name: string): string {
  const palette = colourSchemes[colourScheme]?.[theme === "dark" ? "dark" : "light"];
  return [
    ["Structure", paletteRoles.slice(0, 5)],
    ["Accent", paletteRoles.slice(5, 8)],
    ["Status", paletteRoles.slice(8)]
  ].map(([group, roles]) =>
    `<fieldset class="docdiagram-palette-group"><legend>${group}</legend>${(roles as readonly string[]).map((role) => {
      const preset = palette?.[role as keyof typeof palette];
      return `<label class="docdiagram-palette-swatch"><input type="radio" name="${name}" value="${role}"${role === selectedPalette ? " checked" : ""}><span style="--docdiagram-swatch-fill:${preset?.fill};--docdiagram-swatch-stroke:${preset?.stroke};--docdiagram-swatch-text:${preset?.text}">${preset?.label || role}</span></label>`;
    }).join("")}</fieldset>`
  ).join("");
}

export function buildNodeInspectorFields(
  diagram: FlowchartDiagram,
  node: FlowchartNode,
  colourScheme = "classic",
  documentTheme = "light"
): string {
  const grid = getGridSize(diagram);
  const style = getNodeEffectiveStyle(diagram, node, documentTheme, colourScheme);
  const width = Number(node.size?.width) || 190;
  const height = Number(node.size?.height) || 80;
  const minimum = node.shape === "document" ? { width: 140, height: 84 } : { width: 120, height: 60 };
  const widthMinimum = grid ? Math.ceil(minimum.width / grid) * grid : minimum.width;
  const heightMinimum = grid ? Math.ceil(minimum.height / grid) * grid : minimum.height;
  const step = grid || 1;
  const selectedPalette = node.palette || "accent";

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(node.label)}</textarea></label>`,
    `<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${escapeHtml(node.subtitle || "")}</textarea></label>`,
    `<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-inspector-palette">${paletteMarkup(colourScheme, documentTheme, selectedPalette, "node-palette")}</div></div>`,
    `<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${nodeShapes.map(
      (shape) => `<option value="${shape}"${shape === node.shape ? " selected" : ""}>${shape}</option>`
    ).join("")}</select></label>`,
    `<div class="docdiagram-inspector-row"><label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${escapeHtml(style.fill || "")}"></label><label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke || "")}"></label><label class="docdiagram-field docdiagram-field-compact"><span class="docdiagram-visually-hidden">Stroke width</span><input type="number" aria-label="Stroke width" class="docdiagram-inspector-stroke-width" value="${Number(style.strokeWidth) || 2}" min="1" step="1"></label></div>`,
    `<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text || "")}"></label>`,
    `<div class="docdiagram-inspector-row"><span>Align</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-text-v-align">Vertical alignment</label><select id="docdiagram-inspector-text-v-align" class="docdiagram-inspector-text-v-align" aria-label="Vertical alignment"><option value="top"${node.textVAlign === "top" ? " selected" : ""}>Top</option><option value="center"${node.textVAlign !== "top" ? " selected" : ""}>Middle</option></select><label class="docdiagram-visually-hidden" for="docdiagram-inspector-text-h-align">Horizontal alignment</label><select id="docdiagram-inspector-text-h-align" class="docdiagram-inspector-text-h-align" aria-label="Horizontal alignment"><option value="left"${node.textHAlign === "left" ? " selected" : ""}>Left</option><option value="center"${node.textHAlign !== "left" && node.textHAlign !== "right" ? " selected" : ""}>Center</option><option value="right"${node.textHAlign === "right" ? " selected" : ""}>Right</option></select></div>`,
    `<div class="docdiagram-inspector-row"><span>Size</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-width">Width</label><input id="docdiagram-inspector-width" type="number" aria-label="Width" class="docdiagram-inspector-width" value="${width}" min="${widthMinimum}" step="${step}"><span>×</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-height">Height</label><input id="docdiagram-inspector-height" type="number" aria-label="Height" class="docdiagram-inspector-height" value="${height}" min="${heightMinimum}" step="${step}"></div>`,
    `<div class="docdiagram-inspector-actions"><button type="button" class="docdiagram-inspector-delete">Delete</button><button type="button" class="docdiagram-inspector-duplicate">Duplicate</button></div>`
  ].join("");
}

export function buildEdgeInspectorFields(diagram: { theme?: string }, edge: FlowchartEdge): string {
  const style = getEdgeEffectiveStyle(diagram, edge);
  const strokeWidth = Number(style.strokeWidth) || 2;
  const route = edge.route || "orthogonal";
  const startMarkerStyle = edge.start || "none";
  const endMarkerStyle = edge.end || "arrow";

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
    `<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke || "")}"></label>`,
    `<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text || "")}"></label>`,
    `<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${strokeWidth}" min="1" step="1"></label>`,
    `<div class="docdiagram-inspector-actions"><button type="button" class="docdiagram-inspector-delete">Delete</button></div>`
  ].join("");
}

export function buildSequenceInspectorFields(
  diagram: { theme?: string },
  selection: SequenceSelection,
  element: SequenceInspectable,
  colourScheme = "classic",
  documentTheme = "light"
): string {
  const style = "from" in element
    ? null
    : getSequenceElementEffectiveStyle(diagram, element, documentTheme, colourScheme);
  const supportsPresentation = selection.kind !== "message";
  const presentation = supportsPresentation ? element as SequenceParticipant | SequenceNote : null;

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(element.label || "")}</textarea></label>`,
    selection.kind === "message"
      ? `<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${(element as SequenceMessage).style !== "dashed" ? " selected" : ""}>Solid</option><option value="dashed"${(element as SequenceMessage).style === "dashed" ? " selected" : ""}>Dashed</option></select></label>`
      : "",
    supportsPresentation
      ? `<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-sequence-inspector-palette">${paletteMarkup(colourScheme, documentTheme, presentation?.palette || "accent", "sequence-palette")}</div></div>`
      : "",
    supportsPresentation
      ? `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${escapeHtml(style?.fill || "")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${escapeHtml(style?.stroke || "")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${escapeHtml(style?.text || "")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(presentation?.size?.width) || ""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(presentation?.size?.height) || ""}"></label>`
      : ""
  ].join("");
}

function control(root: ParentNode, selector: string): ControlElement | null {
  return root.querySelector<ControlElement>(selector);
}

function change(root: ParentNode, selector: string, listener: (value: string) => void): void {
  control(root, selector)?.addEventListener("change", (event) => {
    listener((event.currentTarget as ControlElement).value);
  });
}

function update(host: InspectorHost, mutate: () => void): void {
  mutate();
  host.persistDiagramModels();
  host.renderDocument();
}

export function wireNodeInspector(host: InspectorHost, container: ParentNode, diagramIndex: number, nodeId: string): void {
  const withNode = (mutate: (diagram: FlowchartDiagram, node: FlowchartNode) => void) => {
    const diagram = host.state.diagramModels[diagramIndex];
    if (!diagram || diagram.type !== "flowchart") {
      return;
    }
    const node = findFlowchartNode(diagram, nodeId)?.node;
    if (!node) {
      return;
    }
    update(host, () => mutate(diagram, node));
  };

  change(container, ".docdiagram-inspector-label", (value) => withNode((_, node) => setNodeLabel(node, value)));
  change(container, ".docdiagram-inspector-subtitle", (value) => withNode((_, node) => setNodeSubtitle(node, value)));
  for (const palette of container.querySelectorAll<HTMLInputElement>(".docdiagram-inspector-palette input")) {
    palette.addEventListener("change", () => withNode((_, node) => setNodeColorPalette(node, palette.value, host.state.documentColorScheme)));
  }
  change(container, ".docdiagram-inspector-shape", (value) => withNode((_, node) => setNodeShape(node, value)));
  change(container, ".docdiagram-inspector-fill", (value) => withNode((_, node) => setNodeStyleOverride(node, "fill", value)));
  change(container, ".docdiagram-inspector-stroke", (value) => withNode((_, node) => setNodeStyleOverride(node, "stroke", value)));
  change(container, ".docdiagram-inspector-text", (value) => withNode((_, node) => setNodeStyleOverride(node, "text", value)));
  change(container, ".docdiagram-inspector-text-v-align", (value) => withNode((_, node) => setNodeTextAlignment(node, "textVAlign", value)));
  change(container, ".docdiagram-inspector-text-h-align", (value) => withNode((_, node) => setNodeTextAlignment(node, "textHAlign", value)));
  change(container, ".docdiagram-inspector-stroke-width", (value) => withNode((_, node) => setStyleStrokeWidth(node, value)));
  change(container, ".docdiagram-inspector-width", (value) => withNode((diagram, node) => setNodeSize(diagram, node, "width", value)));
  change(container, ".docdiagram-inspector-height", (value) => withNode((diagram, node) => setNodeSize(diagram, node, "height", value)));
  container.querySelector<HTMLButtonElement>(".docdiagram-inspector-delete")?.addEventListener("click", () => {
    withNode((diagram, node) => {
      deleteNode(diagram, node.id);
      host.state.selectedNode = null;
    });
  });
  container.querySelector<HTMLButtonElement>(".docdiagram-inspector-duplicate")?.addEventListener("click", () => {
    withNode((diagram, node) => {
      const duplicate = duplicateNode(diagram, node.id);
      if (duplicate) {
        host.state.selectedNode = { diagramIndex, nodeId: duplicate.id };
      }
    });
  });
}

export function wireEdgeInspector(host: InspectorHost, container: ParentNode, diagramIndex: number, edgeIndex: number): void {
  const withEdge = (mutate: (diagram: FlowchartDiagram, edge: FlowchartEdge) => void) => {
    const diagram = host.state.diagramModels[diagramIndex];
    if (!diagram || diagram.type !== "flowchart") {
      return;
    }
    const edge = diagram.edges[edgeIndex];
    if (!edge) {
      return;
    }
    update(host, () => mutate(diagram, edge));
  };

  change(container, ".docdiagram-inspector-label", (value) => withEdge((_, edge) => setEdgeLabel(edge, value)));
  change(container, ".docdiagram-inspector-route", (value) => withEdge((_, edge) => setEdgeRoute(edge, value)));
  change(container, ".docdiagram-inspector-source-anchor", (value) => withEdge((_, edge) => setEdgeAnchor(edge, "source", value)));
  change(container, ".docdiagram-inspector-target-anchor", (value) => withEdge((_, edge) => setEdgeAnchor(edge, "target", value)));
  change(container, ".docdiagram-inspector-marker-start", (value) => withEdge((_, edge) => setEdgeMarkerStart(edge, value)));
  change(container, ".docdiagram-inspector-marker-end", (value) => withEdge((_, edge) => setEdgeMarkerEnd(edge, value)));
  change(container, ".docdiagram-inspector-stroke", (value) => withEdge((_, edge) => setEdgeStyleOverride(edge, "stroke", value)));
  change(container, ".docdiagram-inspector-text", (value) => withEdge((_, edge) => setEdgeStyleOverride(edge, "text", value)));
  change(container, ".docdiagram-inspector-stroke-width", (value) => withEdge((_, edge) => setStyleStrokeWidth(edge, value)));
  container.querySelector<HTMLButtonElement>(".docdiagram-inspector-delete")?.addEventListener("click", () => {
    withEdge((diagram) => {
      deleteConnector(diagram, edgeIndex);
      host.state.selectedEdge = null;
    });
  });
}

export function wireSequenceInspector(host: InspectorHost, container: ParentNode, element: SequenceInspectable): void {
  const selection = host.state.selectedSequenceElement;
  if (!selection) {
    return;
  }
  change(container, ".docdiagram-sequence-inspector-label", (value) => update(host, () => {
    element.label = value.trim() || element.label;
  }));
  if (selection.kind === "message") {
    change(container, ".docdiagram-sequence-inspector-message-style", (value) => update(host, () => {
      (element as SequenceMessage).style = value;
    }));
    return;
  }

  const presentation = element as SequenceParticipant | SequenceNote;
  for (const palette of container.querySelectorAll<HTMLInputElement>(".docdiagram-sequence-inspector-palette input")) {
    palette.addEventListener("change", () => update(host, () => setNodeColorPalette(presentation, palette.value, host.state.documentColorScheme)));
  }
  for (const [selector, key] of [
    [".docdiagram-sequence-inspector-fill", "fill"],
    [".docdiagram-sequence-inspector-stroke", "stroke"],
    [".docdiagram-sequence-inspector-text", "text"]
  ] as const) {
    change(container, selector, (value) => update(host, () => setNodeStyleOverride(presentation, key, value)));
  }
  for (const [selector, key] of [
    [".docdiagram-sequence-inspector-width", "width"],
    [".docdiagram-sequence-inspector-height", "height"]
  ] as const) {
    change(container, selector, (value) => update(host, () => {
      const size = Number(value);
      if (Number.isFinite(size) && size > 0) {
        presentation.size = { ...presentation.size, [key]: size } as typeof presentation.size;
      }
    }));
  }
}

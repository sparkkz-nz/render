import {
  edgeAnchors,
  edgeMarkerStyles,
  edgeRoutes,
  nodeColorSchemes,
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

function paletteMarkup(colourScheme: string, selectedColour: string): string {
  return Object.entries(nodeColorSchemes[colourScheme] || {}).map(
    ([name, palette]) => `<option value="${name}"${name === selectedColour ? " selected" : ""}>${palette.label}</option>`
  ).join("");
}

export function buildNodeInspectorFields(
  diagram: FlowchartDiagram,
  node: FlowchartNode,
  colourScheme = "classic"
): string {
  const grid = getGridSize(diagram);
  const style = getNodeEffectiveStyle(diagram, node);
  const width = Number(node.size?.width) || 190;
  const height = Number(node.size?.height) || 80;
  const minimum = node.shape === "document" ? { width: 140, height: 84 } : { width: 120, height: 60 };
  const widthMinimum = grid ? Math.ceil(minimum.width / grid) * grid : minimum.width;
  const heightMinimum = grid ? Math.ceil(minimum.height / grid) * grid : minimum.height;
  const step = grid || 1;
  const palettes = nodeColorSchemes[colourScheme] || {};
  const matchingPalette = Object.entries(palettes).find(([, palette]) =>
    [palette.light, palette.dark].some((preset) =>
      preset.fill.toLowerCase() === (style.fill || "").toLowerCase() &&
      preset.stroke.toLowerCase() === (style.stroke || "").toLowerCase() &&
      preset.text.toLowerCase() === (style.text || "").toLowerCase()
    )
  );
  const matchingColour = node.palette?.colour || matchingPalette?.[0] || "blue";
  const matchingTone = node.palette?.tone || (matchingPalette && matchingPalette[1].light.fill.toLowerCase() === (style.fill || "").toLowerCase()
    ? "light"
    : "dark");

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(node.label)}</textarea></label>`,
    `<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${escapeHtml(node.subtitle || "")}</textarea></label>`,
    `<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${matchingTone === "light" ? " selected" : ""}>Light</option><option value="dark"${matchingTone === "dark" ? " selected" : ""}>Dark</option></select></label>`,
    `<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${paletteMarkup(colourScheme, matchingColour)}</select></label>`,
    `<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${nodeShapes.map(
      (shape) => `<option value="${shape}"${shape === node.shape ? " selected" : ""}>${shape}</option>`
    ).join("")}</select></label>`,
    `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${escapeHtml(style.fill || "")}"></label>`,
    `<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke || "")}"></label>`,
    `<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(style.strokeWidth) || 2}" min="1" step="1"></label>`,
    `<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text || "")}"></label>`,
    `<label class="docdiagram-field">Vertical text<select class="docdiagram-inspector-text-a-align"><option value="top"${node.textAAlign === "top" ? " selected" : ""}>Top</option><option value="center"${node.textAAlign !== "top" ? " selected" : ""}>Center</option></select></label>`,
    `<label class="docdiagram-field">Horizontal text<select class="docdiagram-inspector-text-h-align"><option value="left"${node.textHAlign === "left" ? " selected" : ""}>Left</option><option value="center"${node.textHAlign !== "left" && node.textHAlign !== "right" ? " selected" : ""}>Center</option><option value="right"${node.textHAlign === "right" ? " selected" : ""}>Right</option></select></label>`,
    `<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${width}" min="${widthMinimum}" step="${step}"></label>`,
    `<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${height}" min="${heightMinimum}" step="${step}"></label>`
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
    `<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${strokeWidth}" min="1" step="1"></label>`
  ].join("");
}

export function buildSequenceInspectorFields(
  diagram: { theme?: string },
  selection: SequenceSelection,
  element: SequenceInspectable,
  colourScheme = "classic"
): string {
  const style = "from" in element
    ? null
    : getSequenceElementEffectiveStyle(diagram, element);
  const supportsPresentation = selection.kind !== "message";
  const presentation = supportsPresentation ? element as SequenceParticipant | SequenceNote : null;

  return [
    `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(element.label || "")}</textarea></label>`,
    selection.kind === "message"
      ? `<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${(element as SequenceMessage).style !== "dashed" ? " selected" : ""}>Solid</option><option value="dashed"${(element as SequenceMessage).style === "dashed" ? " selected" : ""}>Dashed</option></select></label>`
      : "",
    supportsPresentation
      ? `<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${presentation?.palette?.tone !== "dark" ? " selected" : ""}>Light</option><option value="dark"${presentation?.palette?.tone === "dark" ? " selected" : ""}>Dark</option></select></label>`
      : "",
    supportsPresentation
      ? `<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${paletteMarkup(colourScheme, presentation?.palette?.colour || "blue")}</select></label>`
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
  const tone = control(container, ".docdiagram-inspector-tone");
  const colour = control(container, ".docdiagram-inspector-colour");
  const applyPalette = () => {
    if (tone && colour) {
      withNode((_, node) => setNodeColorPalette(node, tone.value, colour.value, host.state.documentColorScheme));
    }
  };
  tone?.addEventListener("change", applyPalette);
  colour?.addEventListener("change", applyPalette);
  change(container, ".docdiagram-inspector-shape", (value) => withNode((_, node) => setNodeShape(node, value)));
  change(container, ".docdiagram-inspector-fill", (value) => withNode((_, node) => setNodeStyleOverride(node, "fill", value)));
  change(container, ".docdiagram-inspector-stroke", (value) => withNode((_, node) => setNodeStyleOverride(node, "stroke", value)));
  change(container, ".docdiagram-inspector-text", (value) => withNode((_, node) => setNodeStyleOverride(node, "text", value)));
  change(container, ".docdiagram-inspector-text-a-align", (value) => withNode((_, node) => setNodeTextAlignment(node, "textAAlign", value)));
  change(container, ".docdiagram-inspector-text-h-align", (value) => withNode((_, node) => setNodeTextAlignment(node, "textHAlign", value)));
  change(container, ".docdiagram-inspector-stroke-width", (value) => withNode((_, node) => setStyleStrokeWidth(node, value)));
  change(container, ".docdiagram-inspector-width", (value) => withNode((diagram, node) => setNodeSize(diagram, node, "width", value)));
  change(container, ".docdiagram-inspector-height", (value) => withNode((diagram, node) => setNodeSize(diagram, node, "height", value)));
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
  const tone = control(container, ".docdiagram-sequence-inspector-tone");
  const colour = control(container, ".docdiagram-sequence-inspector-colour");
  const applyPalette = () => {
    if (tone && colour) {
      update(host, () => setNodeColorPalette(presentation, tone.value, colour.value, host.state.documentColorScheme));
    }
  };
  tone?.addEventListener("change", applyPalette);
  colour?.addEventListener("change", applyPalette);
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

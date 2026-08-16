import {
  type FlowchartDiagram,
  type FlowchartEdge,
  type FlowchartNode,
  type Position,
  type Size,
  defaultNode,
  documentMinimumNodeSize,
  edgeMarkerDefaults,
  edgeMarkerStyles,
  minimumNodeSize
} from "./schema";
import { clampNodeSize, getGridSize, getNodeColorPalette, snapToGrid } from "./styles";
import { findFlowchartNode, flattenFlowchartNodes, getFlowchartNodeBounds } from "./hierarchy";

function getNodeBounds(node: FlowchartNode): { x: number; y: number; width: number; height: number } {
  return {
    x: Number(node.position?.x) || 0,
    y: Number(node.position?.y) || 0,
    width: Number(node.size?.width) || defaultNode.width,
    height: Number(node.size?.height) || defaultNode.height
  };
}

export function expandCanvasForNode(diagram: FlowchartDiagram, node: FlowchartNode, padding = 40): FlowchartDiagram {
  const width = Number(diagram.canvas?.width) || 1000;
  const height = Number(diagram.canvas?.height) || 560;
  const knownNodes = new Set(flattenFlowchartNodes(diagram).map((entry) => entry.node));
  const nodes = [...knownNodes];
  if (!nodes.includes(node)) {
    nodes.push(node);
  }
  const boundsFor = (candidate: FlowchartNode) => knownNodes.has(candidate)
    ? getFlowchartNodeBounds(diagram, candidate)
    : getNodeBounds(candidate);
  const bounds = nodes.map(boundsFor);
  const minimumX = Math.min(0, ...bounds.map((candidate) => candidate.x));
  const minimumY = Math.min(0, ...bounds.map((candidate) => candidate.y));
  const shiftX = minimumX < 0 ? padding - minimumX : 0;
  const shiftY = minimumY < 0 ? padding - minimumY : 0;

  if (shiftX || shiftY) {
    for (const candidate of flattenFlowchartNodes(diagram).filter((entry) => entry.parent === null)) {
      const node = candidate.node;
      node.position = {
        ...node.position,
        x: (Number(node.position?.x) || 0) + shiftX,
        y: (Number(node.position?.y) || 0) + shiftY
      };
    }
  }

  const expandedBounds = nodes.map(boundsFor);
  diagram.canvas = {
    ...diagram.canvas,
    width: Math.max(width + shiftX, ...expandedBounds.map((candidate) => candidate.x + candidate.width + padding)),
    height: Math.max(height + shiftY, ...expandedBounds.map((candidate) => candidate.y + candidate.height + padding))
  };
  return diagram;
}

function rectanglesOverlap(first: { x: number; y: number; width: number; height: number }, second: { x: number; y: number; width: number; height: number }): boolean {
  return first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y;
}

export function createUniqueNodeId(nodes: FlowchartNode[], base = "new-node"): string {
  const collectIds = (candidates: FlowchartNode[]): string[] => candidates.flatMap((node) => [node.id, ...collectIds(node.children || [])]);
  const ids = new Set(collectIds(nodes));
  if (!ids.has(base)) {
    return base;
  }

  let suffix = 2;
  while (ids.has(`${base}-${suffix}`)) {
    suffix += 1;
  }
  return `${base}-${suffix}`;
}

export function getDefaultNodePosition(diagram: FlowchartDiagram): Position {
  const width = Number(diagram.canvas?.width) || 1000;
  const height = Number(diagram.canvas?.height) || 560;
  const grid = getGridSize(diagram);
  const start = {
    x: snapToGrid(Math.max(0, (width - defaultNode.width) / 2), grid),
    y: snapToGrid(Math.max(0, (height - defaultNode.height) / 2), grid)
  };
  const step = grid || 20;

  for (let offset = 0; offset <= Math.max(width, height); offset += step) {
    for (const candidate of [
      { x: start.x + offset, y: start.y },
      { x: start.x - offset, y: start.y },
      { x: start.x, y: start.y + offset },
      { x: start.x, y: start.y - offset }
    ]) {
      if (candidate.x < 0 || candidate.y < 0 ||
        candidate.x + defaultNode.width > width || candidate.y + defaultNode.height > height) {
        continue;
      }
      if (!flattenFlowchartNodes(diagram).some(({ node }) => rectanglesOverlap(
        { ...candidate, width: defaultNode.width, height: defaultNode.height },
        getNodeBounds(node)
      ))) {
        return candidate;
      }
    }
  }

  return start;
}

export function createNode(diagram: FlowchartDiagram): FlowchartNode {
  const node: FlowchartNode = {
    id: createUniqueNodeId(diagram.nodes),
    label: defaultNode.label,
    shape: defaultNode.shape,
    position: getDefaultNodePosition(diagram),
    size: { width: defaultNode.width, height: defaultNode.height }
  };
  diagram.nodes.push(node);
  return node;
}

export function createConnector(
  diagram: FlowchartDiagram,
  source: string,
  sourceAnchor: string,
  target: string,
  targetAnchor: string
): FlowchartEdge {
  const edge: FlowchartEdge = {
    source,
    target,
    sourceAnchor,
    targetAnchor,
    route: "orthogonal",
    end: "arrow"
  };
  diagram.edges.push(edge);
  return edge;
}

export function reconnectConnector(edge: FlowchartEdge, endpoint: string, nodeId: string, anchor: string): FlowchartEdge {
  if (endpoint === "source") {
    edge.source = nodeId;
    edge.sourceAnchor = anchor;
  } else {
    edge.target = nodeId;
    edge.targetAnchor = anchor;
  }
  return edge;
}

export function deleteConnector(diagram: FlowchartDiagram, edgeIndex: number): FlowchartEdge | null {
  if (edgeIndex < 0 || edgeIndex >= diagram.edges.length) {
    return null;
  }
  return diagram.edges.splice(edgeIndex, 1)[0];
}

export function deleteNode(diagram: FlowchartDiagram, nodeId: string): { node: string | null; deletedEdges: FlowchartEdge[] } {
  const entry = findFlowchartNode(diagram, nodeId);
  if (!entry) {
    return { node: null, deletedEdges: [] };
  }
  const deletedNodeIds = new Set([entry.node, ...(entry.node.children || [])].flatMap(function collect(node): FlowchartNode[] {
    return [node, ...(node.children || []).flatMap(collect)];
  }).map((node) => node.id));
  const deletedEdges = diagram.edges.filter((edge) => deletedNodeIds.has(edge.source) || deletedNodeIds.has(edge.target));
  entry.siblings.splice(entry.siblings.indexOf(entry.node), 1);
  diagram.edges = diagram.edges.filter((edge) => !deletedNodeIds.has(edge.source) && !deletedNodeIds.has(edge.target));
  return { node: nodeId, deletedEdges };
}

export function setNodeLabel(node: FlowchartNode, label: string): FlowchartNode {
  node.label = String(label).trim() || node.label;
  return node;
}

export function setNodeShape(node: FlowchartNode, shape: string): FlowchartNode {
  node.shape = shape;
  return node;
}

export function setNodeSubtitle(node: FlowchartNode, subtitle: string): FlowchartNode {
  node.subtitle = String(subtitle ?? "").trim();
  return node;
}

export function setNodeTextAlignment(node: FlowchartNode, dimension: "textAAlign" | "textHAlign", alignment: string): FlowchartNode {
  if (dimension === "textAAlign" && (alignment === "top" || alignment === "center")) {
    node.textAAlign = alignment;
  }
  if (dimension === "textHAlign" && (alignment === "left" || alignment === "center" || alignment === "right")) {
    node.textHAlign = alignment;
  }
  return node;
}

export function setNodeStyleOverride<T extends { style?: FlowchartNode["style"] }>(node: T, key: string, value: unknown): T {
  node.style = { ...node.style, [key]: value } as FlowchartNode["style"];
  return node;
}

export function setNodeColorPalette<T extends { style?: FlowchartNode["style"]; palette?: FlowchartNode["palette"] }>(
  node: T,
  tone: string,
  colour: string,
  colorScheme = "classic"
): T {
  const preset = getNodeColorPalette(colorScheme, tone, colour);
  if (!preset) {
    return node;
  }

  const { fill, stroke, text, ...style } = node.style || {};
  if (Object.keys(style).length) {
    node.style = style;
  } else {
    delete node.style;
  }
  node.palette = { tone, colour };
  return node;
}

function getMinimumNodeDimensions(shape: string): Size {
  return shape === "document" ? documentMinimumNodeSize : minimumNodeSize;
}

export function setNodeSize(diagram: FlowchartDiagram, node: FlowchartNode, dimension: string, rawValue: unknown): FlowchartNode {
  const grid = getGridSize(diagram);
  const minimumDimensions = getMinimumNodeDimensions(node.shape);
  const minimum = dimension === "width" ? minimumDimensions.width : minimumDimensions.height;
  const size = clampNodeSize(Number(rawValue) || minimum, minimum, grid);
  node.size = node.shape === "circle"
    ? ({ ...node.size, width: size, height: size } as Size)
    : ({ ...node.size, [dimension]: size } as Size);
  return node;
}

export function setEdgeLabel(edge: FlowchartEdge, label: string): FlowchartEdge {
  edge.label = String(label).trim();
  return edge;
}

export function setEdgeRoute(edge: FlowchartEdge, route: string): FlowchartEdge {
  edge.route = route;
  return edge;
}

export function setEdgeAnchor(edge: FlowchartEdge, endpoint: string, anchor: string): FlowchartEdge {
  if (endpoint === "source") {
    edge.sourceAnchor = anchor;
  } else {
    edge.targetAnchor = anchor;
  }
  return edge;
}

export function setEdgeStyleOverride(edge: FlowchartEdge, key: string, value: unknown): FlowchartEdge {
  edge.style = { ...edge.style, [key]: value } as FlowchartEdge["style"];
  return edge;
}

export function setStyleStrokeWidth<T extends { style?: FlowchartNode["style"] }>(element: T, rawValue: unknown): T {
  const strokeWidth = Math.max(1, Math.round(Number(rawValue)) || 1);
  element.style = { ...element.style, strokeWidth };
  return element;
}

export function setEdgeMarkerStart(edge: FlowchartEdge, markerStyle: string): FlowchartEdge {
  edge.start = edgeMarkerStyles.includes(markerStyle as (typeof edgeMarkerStyles)[number]) ? markerStyle : edgeMarkerDefaults.start;
  return edge;
}

export function setEdgeMarkerEnd(edge: FlowchartEdge, markerStyle: string): FlowchartEdge {
  edge.end = edgeMarkerStyles.includes(markerStyle as (typeof edgeMarkerStyles)[number]) ? markerStyle : edgeMarkerDefaults.end;
  return edge;
}

export function clampZoom(value: unknown): number {
  return Math.min(200, Math.max(25, Number(value) || 100));
}

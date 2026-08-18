import type { Position } from "../core/diagrams/schema";

export interface NodeSelection {
  diagramIndex: number;
  nodeId: string;
}

export interface EdgeSelection {
  diagramIndex: number;
  edgeIndex: number;
}

export interface InlineNodeEditor extends NodeSelection {}

export interface InlineEdgeEditor extends EdgeSelection {}

export interface ConnectionDrag {
  diagramIndex: number;
  sourceNodeId: string;
  sourceAnchor: string;
  start: Position;
  current: Position;
  targetAnchor?: string;
  edgeIndex?: number;
  endpoint?: "source" | "target";
  reconnect?: boolean;
  invalid: boolean;
}

export interface DiagramRenderState {
  documentTheme: string;
  documentColorScheme: string;
  editingDiagramIndex: number | null;
  selectedNode: NodeSelection | null;
  selectedEdge: EdgeSelection | null;
  editingNode: InlineNodeEditor | null;
  editingEdge: InlineEdgeEditor | null;
  connectionDrag: ConnectionDrag | null;
  diagramZooms: Map<number, number>;
  diagramViewportHeights: Map<number, number>;
}

export type DiagramEditingMode = "none" | "flowchart" | "sequence";

export type DiagramToolbarRenderer = (
  diagramIndex: number,
  editingMode: DiagramEditingMode,
  state: DiagramRenderState
) => string;

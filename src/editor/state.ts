import type { Diagram } from "../core/diagrams/schema";
import type {
  ConnectionDrag,
  DiagramRenderState,
  EdgeSelection,
  InlineEdgeEditor,
  InlineNodeEditor,
  NodeSelection
} from "../renderers/types";

export type SequenceElementKind = "participant" | "message" | "note";

export interface ParticipantSelection {
  diagramIndex: number;
  kind: "participant";
  id: string;
}

export interface IndexedSequenceSelection {
  diagramIndex: number;
  kind: Exclude<SequenceElementKind, "participant">;
  index: number;
}

export type SequenceSelection = ParticipantSelection | IndexedSequenceSelection;

export interface EditorState extends DiagramRenderState {
  diagramModels: Diagram[];
  selectedSequenceElement: SequenceSelection | null;
  documentTheme: string;
  documentColorScheme: string;
  documentFormat: "centered" | "full-width";
  savedSource: string;
  editSessionDiagram: Diagram | null;
}

export function createEditorState(): EditorState {
  return {
    diagramModels: [],
    editingDiagramIndex: null,
    selectedNode: null,
    selectedEdge: null,
    selectedSequenceElement: null,
    editingNode: null,
    editingEdge: null,
    connectionDrag: null,
    documentTheme: "light",
    documentColorScheme: "classic",
    documentFormat: "centered",
    savedSource: "",
    editSessionDiagram: null,
    diagramZooms: new Map(),
    diagramViewportHeights: new Map()
  };
}

export function clearEditorState(state: EditorState): void {
  state.selectedNode = null;
  state.selectedEdge = null;
  state.selectedSequenceElement = null;
  state.editingNode = null;
  state.editingEdge = null;
}

export function isDiagramEditing(state: EditorState, diagramIndex: number): boolean {
  return state.editingDiagramIndex === diagramIndex;
}

export type {
  ConnectionDrag,
  EdgeSelection,
  InlineEdgeEditor,
  InlineNodeEditor,
  NodeSelection
};

// Diagram domain types and constants.

export interface NodeStyle {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
}

export interface EdgeStyle {
  stroke?: string;
  strokeWidth?: number;
  text?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface NodePalette {
  tone: string;
  colour: string;
}

export interface FlowchartNode {
  id: string;
  label: string;
  shape: string;
  position?: Position;
  size?: Size;
  style?: NodeStyle;
  palette?: NodePalette;
  subtitle?: string;
  textAAlign?: "top" | "center";
  textHAlign?: "left" | "center" | "right";
  children?: FlowchartNode[];
}

export interface FlowchartEdge {
  source: string;
  target: string;
  sourceAnchor?: string;
  targetAnchor?: string;
  route?: string;
  label?: string;
  style?: EdgeStyle;
  start?: string;
  end?: string;
}

export interface Canvas {
  width?: number;
  height?: number;
  grid?: number;
  [key: string]: unknown;
}

export interface FlowchartDiagram {
  type: "flowchart";
  theme?: string;
  canvas: Canvas;
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
  [key: string]: unknown;
}

export interface SequenceParticipant {
  id: string;
  label?: string;
  kind?: string;
  palette?: NodePalette;
  style?: NodeStyle;
  size?: Size;
}

export interface SequenceMessage {
  from: string;
  to: string;
  label?: string;
  style?: string;
}

export interface SequenceActivation {
  participant: string;
  from: number;
  to: number;
}

export interface SequenceNote {
  at?: string;
  after?: number;
  label?: string;
  palette?: NodePalette;
  style?: NodeStyle;
  size?: Size;
}

export interface SequenceGroup {
  label?: string;
  from: number;
  to: number;
}

export interface SequenceDiagram {
  type: "sequence";
  theme?: string;
  participants?: SequenceParticipant[];
  messages?: SequenceMessage[];
  activations?: SequenceActivation[];
  notes?: SequenceNote[];
  groups?: SequenceGroup[];
  [key: string]: unknown;
}

export type Diagram = FlowchartDiagram | SequenceDiagram;

export interface ThemeColors {
  edge: { stroke: string; strokeWidth: number; text: string };
  node: { fill: string; stroke: string; strokeWidth: number; text: string };
}

export interface ColorPaletteEntry {
  label: string;
  light: { fill: string; stroke: string; text: string };
  dark: { fill: string; stroke: string; text: string };
}

export const supportedDiagramTypes = ["flowchart", "sequence"] as const;

export const nodeShapes = [
  "rounded-rectangle",
  "circle",
  "oval",
  "database",
  "diamond",
  "rhombus",
  "flattened-hexagon",
  "chevron",
  "right-chevron",
  "document"
] as const;

export const edgeAnchors = ["top", "right", "bottom", "left"] as const;
export const edgeRoutes = ["orthogonal", "straight", "curved"] as const;
export const edgeMarkerStyles = ["none", "arrow", "circle"] as const;
export const edgeMarkerDefaults = { start: "none", end: "arrow" } as const;
export const nodeTextVAlignments = ["top", "center"] as const;
export const nodeTextHAlignments = ["left", "center", "right"] as const;

export const minimumNodeSize: Size = { width: 120, height: 60 };
export const documentMinimumNodeSize: Size = { width: 140, height: 84 };
export const defaultNode = {
  shape: "rounded-rectangle",
  label: "New node",
  width: 190,
  height: 80
} as const;

export const nodeColorSchemes: Record<string, Record<string, ColorPaletteEntry>> = {
  classic: {
    pink: {
      label: "Pink",
      light: { fill: "#F6C5D8", stroke: "#9D174D", text: "#9D174D" },
      dark: { fill: "#9D174D", stroke: "#FBCFE8", text: "#FBCFE8" }
    },
    red: {
      label: "Red",
      light: { fill: "#FECACA", stroke: "#B91C1C", text: "#B91C1C" },
      dark: { fill: "#B91C1C", stroke: "#FEE2E2", text: "#FEE2E2" }
    },
    orange: {
      label: "Orange",
      light: { fill: "#FED7AA", stroke: "#C2410C", text: "#9A3412" },
      dark: { fill: "#C2410C", stroke: "#FFEDD5", text: "#FFEDD5" }
    },
    yellow: {
      label: "Yellow",
      light: { fill: "#FEF08A", stroke: "#A16207", text: "#854D0E" },
      dark: { fill: "#A16207", stroke: "#FEF9C3", text: "#FEF9C3" }
    },
    green: {
      label: "Green",
      light: { fill: "#BBF7D0", stroke: "#15803D", text: "#166534" },
      dark: { fill: "#15803D", stroke: "#DCFCE7", text: "#DCFCE7" }
    },
    cyan: {
      label: "Cyan",
      light: { fill: "#A5F3FC", stroke: "#0E7490", text: "#155E75" },
      dark: { fill: "#0E7490", stroke: "#CFFAFE", text: "#CFFAFE" }
    },
    blue: {
      label: "Blue",
      light: { fill: "#BFDBFE", stroke: "#1D4ED8", text: "#1E3A8A" },
      dark: { fill: "#1D4ED8", stroke: "#DBEAFE", text: "#DBEAFE" }
    },
    purple: {
      label: "Purple",
      light: { fill: "#DDD6FE", stroke: "#6D28D9", text: "#5B21B6" },
      dark: { fill: "#6D28D9", stroke: "#EDE9FE", text: "#EDE9FE" }
    },
    grey: {
      label: "Grey",
      light: { fill: "#E5E7EB", stroke: "#4B5563", text: "#374151" },
      dark: { fill: "#4B5563", stroke: "#E5E7EB", text: "#F9FAFB" }
    },
    bw: {
      label: "Black and white",
      light: { fill: "#FFFFFF", stroke: "#111827", text: "#111827" },
      dark: { fill: "#111827", stroke: "#FFFFFF", text: "#FFFFFF" }
    }
  }
};

export const nodeColorPalettes = nodeColorSchemes.classic;

export const diagramThemes: Record<string, ThemeColors> = {
  light: {
    edge: { stroke: "#52616B", strokeWidth: 2, text: "#3E4A54" },
    node: { fill: "#EAF2FF", stroke: "#3574C7", strokeWidth: 2, text: "#17202A" }
  },
  dark: {
    edge: { stroke: "#B8C7D5", strokeWidth: 2, text: "#D9E4ED" },
    node: { fill: "#193A61", stroke: "#71AEF7", strokeWidth: 2, text: "#F3F8FC" }
  }
};

export const componentDirectiveNames = ["section", "panel", "callout", "grid", "stack"] as const;
export const componentColours = ["pink", "red", "orange", "yellow", "green", "cyan", "blue", "purple", "grey", "bw"] as const;
export const calloutKinds = ["note", "info", "warning", "success"] as const;
export const gridColumns: Record<string, string> = {
  "2": "repeat(2, minmax(0, 1fr))",
  "3": "repeat(3, minmax(0, 1fr))",
  "2fr 1fr": "minmax(0, 2fr) minmax(0, 1fr)",
  "1fr 2fr": "minmax(0, 1fr) minmax(0, 2fr)"
};

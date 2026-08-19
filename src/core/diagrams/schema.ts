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

export const paletteRoles = [
  "background", "pale", "light", "neutral", "dark",
  "accent-soft", "accent", "accent-strong",
  "note", "success", "warning", "danger", "highlight"
] as const;

export type PaletteRole = (typeof paletteRoles)[number];

export interface FlowchartNode {
  id: string;
  label: string;
  shape: string;
  position?: Position;
  size?: Size;
  style?: NodeStyle;
  palette?: PaletteRole;
  subtitle?: string;
  textVAlign?: "top" | "center";
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
  palette?: PaletteRole;
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
  palette?: PaletteRole;
  style?: NodeStyle;
  size?: Size;
}

export interface SequenceGroup {
  label?: string;
  from: number;
  to: number;
}

export interface SequenceCanvas {
  width?: number;
  height?: number;
  participantSpacing?: number;
  participantSize?: Size;
}

export interface SequenceDiagram {
  type: "sequence";
  theme?: string;
  canvas?: SequenceCanvas;
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
  fill: string;
  stroke: string;
  text: string;
  gradient?: string;
  glow?: string;
}

export interface ColourScheme {
  label: string;
  light: Record<PaletteRole, ColorPaletteEntry>;
  dark: Record<PaletteRole, ColorPaletteEntry>;
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

export const minimumNodeSize: Size = { width: 50, height: 20 };
export const documentMinimumNodeSize: Size = { width: 50, height: 20 };
export const defaultNode = {
  shape: "rounded-rectangle",
  label: "New node",
  width: 190,
  height: 80
} as const;

const roles = (
  background: ColorPaletteEntry, pale: ColorPaletteEntry, light: ColorPaletteEntry, neutral: ColorPaletteEntry, dark: ColorPaletteEntry,
  accentSoft: ColorPaletteEntry, accent: ColorPaletteEntry, accentStrong: ColorPaletteEntry,
  note: ColorPaletteEntry, success: ColorPaletteEntry, warning: ColorPaletteEntry, danger: ColorPaletteEntry, highlight: ColorPaletteEntry
): Record<PaletteRole, ColorPaletteEntry> => ({
  background, pale, light, neutral, dark,
  "accent-soft": accentSoft, accent, "accent-strong": accentStrong,
  note, success, warning, danger, highlight
});

const colour = (label: string, fill: string, stroke: string, text: string, gradient?: string, glow?: string): ColorPaletteEntry =>
  ({ label, fill, stroke, text, gradient, glow });

export const colourSchemes: Record<string, ColourScheme> = {
  classic: {
    label: "Classic",
    light: roles(
      colour("Background", "#FFFFFF", "#D1D5DB", "#111827"), colour("Pale", "#F3F4F6", "#9CA3AF", "#1F2937"), colour("Light", "#E5E7EB", "#6B7280", "#1F2937"), colour("Neutral", "#D1D5DB", "#4B5563", "#111827"), colour("Dark", "#374151", "#111827", "#F9FAFB"),
      colour("Soft", "#DBEAFE", "#60A5FA", "#1E3A8A"), colour("Accent", "#BFDBFE", "#2563EB", "#1E3A8A", "#EFF6FF"), colour("Strong", "#2563EB", "#1D4ED8", "#FFFFFF", "#3B82F6", "#60A5FA"),
      colour("Note", "#DBEAFE", "#2563EB", "#1E3A8A"), colour("Success", "#DCFCE7", "#16A34A", "#14532D"), colour("Warning", "#FFEDD5", "#EA580C", "#7C2D12"), colour("Danger", "#FEE2E2", "#DC2626", "#7F1D1D"), colour("Highlight", "#FEF9C3", "#CA8A04", "#713F12")
    ),
    dark: roles(
      colour("Background", "#111827", "#374151", "#F9FAFB"), colour("Pale", "#1F2937", "#4B5563", "#F3F4F6"), colour("Light", "#374151", "#6B7280", "#F9FAFB"), colour("Neutral", "#4B5563", "#9CA3AF", "#FFFFFF"), colour("Dark", "#9CA3AF", "#D1D5DB", "#111827"),
      colour("Soft", "#172554", "#3B82F6", "#DBEAFE"), colour("Accent", "#1E3A8A", "#60A5FA", "#EFF6FF", "#172554"), colour("Strong", "#2563EB", "#93C5FD", "#FFFFFF", "#1D4ED8", "#60A5FA"),
      colour("Note", "#172554", "#60A5FA", "#DBEAFE"), colour("Success", "#052E16", "#4ADE80", "#DCFCE7"), colour("Warning", "#431407", "#FB923C", "#FFEDD5"), colour("Danger", "#450A0A", "#F87171", "#FEE2E2"), colour("Highlight", "#422006", "#FACC15", "#FEF9C3")
    )
  },
  ice: {
    label: "Ice",
    light: roles(
      colour("Background", "#F8FCFF", "#D8EAF4", "#123040"), colour("Pale", "#EDF8FC", "#B8DCEB", "#123040"), colour("Light", "#D9F2FF", "#88BED7", "#123040"), colour("Neutral", "#B8DCEB", "#4A8BAA", "#123040"), colour("Dark", "#21536C", "#123040", "#F4FBFF"),
      colour("Soft", "#DDF5FF", "#75C6E8", "#0F4C67"), colour("Accent", "#BDEAFF", "#2E91BF", "#083B55", "#E8F9FF"), colour("Strong", "#1976A3", "#0E5E85", "#FFFFFF", "#43B3E8", "#8DDBF7"),
      colour("Note", "#DCEFFF", "#3182CE", "#123A63"), colour("Success", "#DDF7EE", "#1E9B68", "#104B35"), colour("Warning", "#FFF0D8", "#D97918", "#6B3510"), colour("Danger", "#FFE4E7", "#D9485F", "#651C2A"), colour("Highlight", "#FFF8C9", "#C69A13", "#5E4900")
    ),
    dark: roles(
      colour("Background", "#0C1D29", "#26475A", "#E8F7FF"), colour("Pale", "#112B3A", "#376176", "#E8F7FF"), colour("Light", "#173B4D", "#4A7B92", "#F0FAFF"), colour("Neutral", "#28576B", "#79AFC3", "#F4FBFF"), colour("Dark", "#A3D6E9", "#D4F2FF", "#0C1D29"),
      colour("Soft", "#10384E", "#4AB5DF", "#DDF7FF"), colour("Accent", "#15526D", "#72CEF2", "#ECFBFF", "#123C52"), colour("Strong", "#2186B5", "#94DCF5", "#FFFFFF", "#176A91", "#64CEF2"),
      colour("Note", "#122E4B", "#62A9F5", "#DCEFFF"), colour("Success", "#103D32", "#4DD69A", "#DDF7EE"), colour("Warning", "#4B2C0D", "#F3A34C", "#FFF0D8"), colour("Danger", "#4B1923", "#F07A8C", "#FFE4E7"), colour("Highlight", "#4A3D0A", "#E6C54B", "#FFF8C9")
    )
  },
  midnight: {
    label: "Midnight",
    light: roles(
      colour("Background", "#FAFAFF", "#D9D8EE", "#17152D"), colour("Pale", "#F0EFFF", "#C6C2E8", "#29234D"), colour("Light", "#E3E0FF", "#958ED0", "#29234D"), colour("Neutral", "#C8C2EF", "#625BA3", "#211B42"), colour("Dark", "#30275E", "#201943", "#F8F7FF"),
      colour("Soft", "#EAE5FF", "#9D8CE7", "#35276D"), colour("Accent", "#D7CEFF", "#6754C7", "#2D2364", "#F0EDFF"), colour("Strong", "#5540B5", "#3E2D98", "#FFFFFF", "#7563D6", "#A99BFF"),
      colour("Note", "#E1E9FF", "#5578C9", "#243968"), colour("Success", "#DEF6EA", "#338E68", "#143F2C"), colour("Warning", "#FFF0D7", "#C77624", "#66350F"), colour("Danger", "#FCE1EB", "#C84972", "#661B36"), colour("Highlight", "#FFF5C9", "#B48A18", "#5F4500")
    ),
    dark: roles(
      colour("Background", "#131126", "#393354", "#F4F2FF"), colour("Pale", "#1E1938", "#514878", "#F0EEFF"), colour("Light", "#2B2450", "#6B619A", "#F8F7FF"), colour("Neutral", "#443B72", "#9D92CC", "#FFFFFF"), colour("Dark", "#B9B1E6", "#DCD8F7", "#18142E"),
      colour("Soft", "#2A2052", "#A898F0", "#F0ECFF"), colour("Accent", "#3B2E75", "#B2A5FF", "#F7F5FF", "#2B205A"), colour("Strong", "#6954D0", "#C4BAFF", "#FFFFFF", "#4D3AA9", "#B2A5FF"),
      colour("Note", "#202C56", "#82A1F0", "#E1E9FF"), colour("Success", "#123D2E", "#65D2A0", "#DEF6EA"), colour("Warning", "#4A2B10", "#F0A45C", "#FFF0D7"), colour("Danger", "#4C172B", "#EF7FA4", "#FCE1EB"), colour("Highlight", "#4A390B", "#DFC74F", "#FFF5C9")
    )
  },
  paper: {
    label: "Paper",
    light: roles(
      colour("Background", "#FFFDF7", "#E0D8C8", "#332D24"), colour("Pale", "#F7F1E5", "#D4C5AD", "#40372C"), colour("Light", "#EEE3D0", "#BBA98B", "#40372C"), colour("Neutral", "#D8C8AF", "#8C765A", "#332D24"), colour("Dark", "#514536", "#332D24", "#FFFCF5"),
      colour("Soft", "#EEE8DC", "#A99879", "#44392B"), colour("Accent", "#E8DDC7", "#947044", "#3E2D1D", "#F7F0E4"), colour("Strong", "#81592F", "#62401F", "#FFFFFF", "#A77A44", "#D3B37B"),
      colour("Note", "#E5EFF4", "#517B98", "#233E50"), colour("Success", "#E4F0DF", "#5D8A54", "#294527"), colour("Warning", "#F9E8CD", "#B96B28", "#64350D"), colour("Danger", "#F5E0DA", "#AD5342", "#5D251C"), colour("Highlight", "#F8F0BD", "#A78216", "#584600")
    ),
    dark: roles(
      colour("Background", "#29251F", "#554B3E", "#F9F2E6"), colour("Pale", "#373027", "#6F6250", "#F9F2E6"), colour("Light", "#4A4033", "#8B7B64", "#FFF9EE"), colour("Neutral", "#675947", "#A89880", "#FFF9EE"), colour("Dark", "#CBBCA4", "#E8DBC7", "#30291F"),
      colour("Soft", "#463B2D", "#B6A080", "#FFF8E9"), colour("Accent", "#5C482F", "#D1B98A", "#FFF9EE", "#483622"), colour("Strong", "#916C3C", "#E0C28B", "#FFFFFF", "#705029", "#CFAA69"),
      colour("Note", "#273A46", "#7DB2D0", "#E5EFF4"), colour("Success", "#31452B", "#9BC58F", "#E4F0DF"), colour("Warning", "#503016", "#E3A060", "#F9E8CD"), colour("Danger", "#51281F", "#DA8A79", "#F5E0DA"), colour("Highlight", "#4A3D12", "#D6BC48", "#F8F0BD")
    )
  }
};

export const diagramThemes: Record<"light" | "dark", ThemeColors> = {
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
export const componentColours = paletteRoles;
export const calloutKinds = ["note", "info", "warning", "success"] as const;
export const gridColumns: Record<string, string> = {
  "2": "repeat(2, minmax(0, 1fr))",
  "3": "repeat(3, minmax(0, 1fr))",
  "2fr 1fr": "minmax(0, 2fr) minmax(0, 1fr)",
  "1fr 2fr": "minmax(0, 1fr) minmax(0, 2fr)"
};

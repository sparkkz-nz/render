import {
  type Canvas,
  type EdgeStyle,
  type FlowchartEdge,
  type FlowchartNode,
  type NodePalette,
  type NodeStyle,
  type ThemeColors,
  diagramThemes,
  edgeMarkerDefaults,
  edgeMarkerStyles,
  nodeColorSchemes
} from "./schema";

export function getTheme(diagram: { theme?: string }, documentTheme = "light"): ThemeColors {
  const themeName = diagram.theme || documentTheme;
  const theme = diagramThemes[themeName];

  if (!theme) {
    throw new Error(`Unsupported diagram theme: ${themeName}`);
  }

  return theme;
}

export function getNodeColorPalette(schemeName: string, tone: string, colour: string): NodeStyle | null {
  const palette = nodeColorSchemes[schemeName]?.[colour] as unknown as Record<string, NodeStyle> | undefined;
  return palette?.[tone] || null;
}

export function mergeStyle<T>(defaults: T, overrides: Partial<T> | undefined | null): T {
  return { ...(defaults as object), ...(overrides || {}) } as T;
}

export function getNodeEffectiveStyle(
  diagram: { theme?: string },
  node: FlowchartNode,
  documentTheme = "light",
  documentColorScheme = "classic"
): NodeStyle {
  const theme = getTheme(diagram, documentTheme);
  const defaults = theme.node;
  const palette = node.palette
    ? getNodeColorPalette(documentColorScheme, node.palette.tone, node.palette.colour)
    : null;
  return mergeStyle(mergeStyle(defaults, palette), node.style);
}

export function getSequenceElementEffectiveStyle(
  diagram: { theme?: string },
  element: { palette?: NodePalette; style?: NodeStyle },
  documentTheme = "light",
  documentColorScheme = "classic"
): NodeStyle {
  const theme = getTheme(diagram, documentTheme);
  const palette = element.palette
    ? getNodeColorPalette(documentColorScheme, element.palette.tone, element.palette.colour)
    : null;
  return mergeStyle(mergeStyle(theme.node, palette), element.style);
}

export function getEdgeEffectiveStyle(diagram: { theme?: string }, edge: FlowchartEdge, documentTheme = "light"): EdgeStyle {
  const theme = getTheme(diagram, documentTheme);
  return mergeStyle(theme.edge, edge.style);
}

export function getEdgeMarkerStyle(edge: FlowchartEdge, endpoint: "start" | "end"): string {
  const value = endpoint === "start" ? edge.start : edge.end;
  return typeof value === "string" && edgeMarkerStyles.includes(value as (typeof edgeMarkerStyles)[number]) ? value : edgeMarkerDefaults[endpoint];
}

export function getGridSize(diagram: { canvas?: Canvas }): number {
  const grid = Number(diagram.canvas?.grid);
  return Number.isFinite(grid) && grid > 0 ? grid : 0;
}

export function snapToGrid(value: number, grid: number): number {
  return grid ? Math.round(value / grid) * grid : Math.round(value);
}

export function clampNodeSize(value: number, minimum: number, grid: number): number {
  const snapped = snapToGrid(value, grid);
  const snappedMinimum = grid ? Math.ceil(minimum / grid) * grid : minimum;
  return Math.max(snappedMinimum, snapped);
}

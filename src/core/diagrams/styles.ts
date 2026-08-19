import {
  type Canvas,
  type EdgeStyle,
  type FlowchartEdge,
  type FlowchartNode,
  type NodeStyle,
  type PaletteRole,
  type ThemeColors,
  colourSchemes,
  diagramThemes,
  edgeMarkerDefaults,
  edgeMarkerStyles,
} from "./schema";

export function resolveTheme(theme: string): "light" | "dark" {
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  if (theme === "auto") {
    return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  throw new Error(`Unsupported document theme: ${theme}`);
}

export function getTheme(_: { theme?: string }, documentTheme = "light"): ThemeColors {
  const themeName = resolveTheme(documentTheme);
  const theme = diagramThemes[themeName];

  if (!theme) {
    throw new Error(`Unsupported diagram theme: ${themeName}`);
  }

  return theme;
}

export function getNodeColorPalette(schemeName: string, theme: string, role: string): NodeStyle | null {
  const palette = colourSchemes[schemeName]?.[resolveTheme(theme)]?.[role as PaletteRole];
  return palette || null;
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
    ? getNodeColorPalette(documentColorScheme, documentTheme, node.palette)
    : null;
  return mergeStyle(mergeStyle(defaults, palette), node.style);
}

export function getSequenceElementEffectiveStyle(
  diagram: { theme?: string },
  element: { palette?: PaletteRole; style?: NodeStyle },
  documentTheme = "light",
  documentColorScheme = "classic"
): NodeStyle {
  const theme = getTheme(diagram, documentTheme);
  const palette = element.palette
    ? getNodeColorPalette(documentColorScheme, documentTheme, element.palette)
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

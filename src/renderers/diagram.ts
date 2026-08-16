import { escapeHtml, parseDiagram } from "../core/diagrams/parser";
import type { Diagram } from "../core/diagrams/schema";
import { renderFlowchartDiagram, renderDiagramToolbar } from "./flowchart";
import { renderSequenceDiagram } from "./sequence";
import type { DiagramRenderState } from "./types";

export interface DiagramRenderOptions {
  colourScheme: string;
  state: DiagramRenderState;
  onDiagram: (diagramIndex: number, diagram: Diagram) => void;
}

export function renderDiagramSource(source: string, diagramIndex: number, options: DiagramRenderOptions): string {
  try {
    const diagram = parseDiagram(source, options.colourScheme);
    options.onDiagram(diagramIndex, diagram);
    return diagram.type === "sequence"
      ? renderSequenceDiagram(diagram, diagramIndex, options.state, renderDiagramToolbar)
      : renderFlowchartDiagram(diagram, diagramIndex, options.state, renderDiagramToolbar);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${escapeHtml(message)}</section>`;
  }
}

import {
  type Diagram,
  type FlowchartDiagram,
  type FlowchartNode,
  type SequenceDiagram,
  diagramThemes,
  edgeAnchors,
  edgeMarkerStyles,
  edgeRoutes,
  nodeColorSchemes,
  nodeTextHAlignments,
  nodeTextVAlignments,
  nodeShapes,
  supportedDiagramTypes
} from "./schema";

const diagramCollectionNames = ["nodes", "edges", "participants", "messages", "activations", "notes", "groups"] as const;
const flowchartNodeFields = ["id", "label", "shape", "position", "size", "style", "palette", "subtitle", "textVAlign", "textHAlign", "children"] as const;
const flowchartEdgeFields = ["source", "target", "sourceAnchor", "targetAnchor", "route", "label", "style", "start", "end"] as const;
const flowchartNodeStyleFields = ["fill", "stroke", "strokeWidth", "text"] as const;
const flowchartEdgeStyleFields = ["stroke", "strokeWidth", "text"] as const;
const paletteFields = ["tone", "colour"] as const;
const sequenceParticipantFields = ["id", "label", "kind", "palette", "style", "size"] as const;
const sequenceParticipantKinds = ["actor"] as const;
const sequenceMessageFields = ["from", "to", "label", "style"] as const;
const sequenceMessageStyles = ["solid", "dashed"] as const;
const sequenceActivationFields = ["participant", "from", "to"] as const;
const sequenceNoteFields = ["at", "after", "label", "palette", "style", "size"] as const;
const sequenceGroupFields = ["label", "from", "to"] as const;

type ParsedObject = Record<string, unknown>;

type SequencePresentationCandidate = {
  palette?: ParsedObject;
  style?: ParsedObject;
  size?: ParsedObject;
};

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function parseScalar(value: string): unknown {
  const trimmed = value.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      throw new Error(`Invalid quoted scalar: ${trimmed}`);
    }
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  if (trimmed === "true" || trimmed === "false") {
    return trimmed === "true";
  }

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    const entriesSource = trimmed.slice(1, -1).trim();
    if (!entriesSource) {
      return {};
    }

    const entries = entriesSource.split(",");
    const object: ParsedObject = {};

    for (const entry of entries) {
      const separator = entry.indexOf(":");
      if (separator === -1) {
        throw new Error(`Invalid inline mapping: ${trimmed}`);
      }

      const key = entry.slice(0, separator).trim();
      object[key] = parseScalar(entry.slice(separator + 1));
    }

    return object;
  }

  return trimmed;
}

export function parseDiagram(source: string, colorScheme = "classic"): Diagram {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const meaningfulLines = lines.filter((line) => line.trim() && !line.trimStart().startsWith("#"));
  for (const line of meaningfulLines) {
    if (line.trimStart() !== line || !line.trimEnd().endsWith(":")) {
      continue;
    }
    const key = line.trim().slice(0, -1);
    if (key !== "canvas" && !diagramCollectionNames.includes(key as (typeof diagramCollectionNames)[number])) {
      throw new Error(`Unsupported diagram section: ${key}`);
    }
  }
  let cursor = 0;
  const indentation = (line: string) => line.length - line.trimStart().length;
  const property = (line: string) => line.trim().match(/^([^:]+):\s*(.*)$/);
  const item = (line: string) => line.trim().match(/^- ([^:]+):\s*(.*)$/);
  const parseValue = (indent: number): unknown => {
    if (cursor >= meaningfulLines.length || indentation(meaningfulLines[cursor]) <= indent) {
      return {};
    }
    return meaningfulLines[cursor].trimStart().startsWith("- ")
      ? parseList(indentation(meaningfulLines[cursor]))
      : parseObject(indentation(meaningfulLines[cursor]));
  };
  const parseObject = (indent: number): ParsedObject => {
    const object: ParsedObject = {};
    while (cursor < meaningfulLines.length && indentation(meaningfulLines[cursor]) === indent) {
      const rawLine = meaningfulLines[cursor];
      const match = property(rawLine);
      if (!match) {
        throw new Error(`Cannot parse diagram line: ${rawLine}`);
      }
      cursor += 1;
      object[match[1]] = match[2] ? parseScalar(match[2]) : parseValue(indent);
    }
    return object;
  };
  const parseList = (indent: number): ParsedObject[] => {
    const list: ParsedObject[] = [];
    while (cursor < meaningfulLines.length && indentation(meaningfulLines[cursor]) === indent) {
      const rawLine = meaningfulLines[cursor];
      const match = item(rawLine);
      if (!match) {
        throw new Error(`Cannot parse diagram line: ${rawLine}`);
      }
      cursor += 1;
      const object: ParsedObject = { [match[1]]: match[2] ? parseScalar(match[2]) : parseValue(indent) };
      while (cursor < meaningfulLines.length && indentation(meaningfulLines[cursor]) > indent) {
        const propertyIndent = indentation(meaningfulLines[cursor]);
        const next = property(meaningfulLines[cursor]);
        if (!next) {
          throw new Error(`Cannot parse diagram line: ${meaningfulLines[cursor]}`);
        }
        cursor += 1;
        object[next[1]] = next[2] ? parseScalar(next[2]) : parseValue(propertyIndent);
      }
      list.push(object);
    }
    return list;
  };
  const diagram = parseObject(0) as ParsedObject & { canvas?: ParsedObject };

  if (!diagram.type) {
    throw new Error(`Diagram type is required and must be one of: ${supportedDiagramTypes.join(", ")}.`);
  }

  if (typeof diagram.type !== "string" || !supportedDiagramTypes.includes(diagram.type as (typeof supportedDiagramTypes)[number])) {
    throw new Error(`Unsupported diagram type: ${String(diagram.type)}`);
  }

  return diagram.type === "flowchart"
    ? parseFlowchartDiagram(diagram as unknown as FlowchartDiagram, colorScheme)
    : parseSequenceDiagram(diagram as unknown as SequenceDiagram, colorScheme);
}

function parseFlowchartDiagram(diagram: FlowchartDiagram, colorScheme = "classic"): FlowchartDiagram {
  diagram.canvas = diagram.canvas || {};
  if (!Array.isArray(diagram.nodes)) {
    diagram.nodes = [];
  }
  if (!Array.isArray(diagram.edges)) {
    diagram.edges = [];
  }
  validateFlowchartDiagram(diagram, colorScheme);
  return diagram;
}

function parseSequenceDiagram(diagram: SequenceDiagram, colorScheme = "classic"): SequenceDiagram {
  validateSequenceDiagram(diagram, colorScheme);
  return diagram;
}

function validateDiagram(diagram: Diagram, colorScheme = "classic"): void {
  return diagram.type === "flowchart"
    ? validateFlowchartDiagram(diagram, colorScheme)
    : validateSequenceDiagram(diagram, colorScheme);
}

function assertAllowedFields(candidate: Record<string, unknown> | undefined, allowedFields: readonly string[], description: string): void {
  for (const key of Object.keys(candidate || {})) {
    if (!allowedFields.includes(key)) {
      throw new Error(`Unsupported ${description} field: ${key}`);
    }
  }
}

function assertAllowedStyleFields(style: Record<string, unknown> | undefined, allowedFields: readonly string[], description: string): void {
  if (!style) {
    return;
  }

  for (const key of Object.keys(style)) {
    if (!allowedFields.includes(key)) {
      throw new Error(`Unsupported ${description} style field: ${key}`);
    }
  }
}

function validateFlowchartDiagram(diagram: FlowchartDiagram, colorScheme = "classic"): void {
  if (diagram.participants !== undefined || diagram.messages !== undefined ||
    diagram.activations !== undefined || diagram.notes !== undefined || diagram.groups !== undefined) {
    throw new Error("Flowchart diagrams do not support sequence sections.");
  }

  const nodeIds = new Set<string>();
  const validateNode = (node: FlowchartNode): void => {
    if ("type" in node) {
      throw new Error(`Node "${node.id || "unknown"}" uses removed field "type".`);
    }

    assertAllowedFields(node as unknown as Record<string, unknown>, flowchartNodeFields, `node "${node.id || "unknown"}"`);

    if (!node.id || !node.label) {
      throw new Error("Every node requires an id and label.");
    }

    if (!node.shape) {
      throw new Error(`Node "${node.id}" requires a shape.`);
    }

    if (!nodeShapes.includes(node.shape as (typeof nodeShapes)[number])) {
      throw new Error(`Unsupported node shape: ${node.shape}`);
    }
    if (node.textVAlign !== undefined && !nodeTextVAlignments.includes(node.textVAlign)) {
      throw new Error(`Unsupported node textVAlign: ${node.textVAlign}`);
    }
    if (node.textHAlign !== undefined && !nodeTextHAlignments.includes(node.textHAlign)) {
      throw new Error(`Unsupported node textHAlign: ${node.textHAlign}`);
    }

    if (node.palette) {
      assertAllowedFields(node.palette as unknown as Record<string, unknown>, paletteFields, `palette for node "${node.id}"`);
      const palette = (nodeColorSchemes[colorScheme]?.[node.palette.colour] as unknown as Record<string, unknown> | undefined)?.[node.palette.tone] || null;
      if (!palette) {
        throw new Error(`Unsupported node palette: ${node.palette.tone || "unknown"} ${node.palette.colour || "unknown"}`);
      }
    }

    if ((node.style as { width?: unknown } | undefined)?.width !== undefined) {
      throw new Error("Node style.width is not supported; use style.strokeWidth.");
    }

    assertAllowedStyleFields(node.style as Record<string, unknown> | undefined, flowchartNodeStyleFields, `node "${node.id}"`);
    if (nodeIds.has(node.id)) {
      throw new Error(`Duplicate flowchart node id: ${node.id}`);
    }
    nodeIds.add(node.id);
    if (node.children !== undefined && !Array.isArray(node.children)) {
      throw new Error(`Children for node "${node.id}" must be a list.`);
    }
    for (const child of node.children || []) {
      validateNode(child);
    }
  };

  for (const node of diagram.nodes) {
    validateNode(node);
  }

  for (const edge of diagram.edges) {
    assertAllowedFields(edge as unknown as Record<string, unknown>, flowchartEdgeFields, `edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}"`);

    if (!edge.sourceAnchor) {
      throw new Error(`Edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}" requires a sourceAnchor.`);
    }

    if (!edge.targetAnchor) {
      throw new Error(`Edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}" requires a targetAnchor.`);
    }

    if (!edgeAnchors.includes(edge.sourceAnchor as (typeof edgeAnchors)[number])) {
      throw new Error(`Unsupported edge sourceAnchor: ${edge.sourceAnchor}`);
    }

    if (!edgeAnchors.includes(edge.targetAnchor as (typeof edgeAnchors)[number])) {
      throw new Error(`Unsupported edge targetAnchor: ${edge.targetAnchor}`);
    }

    if (edge.route !== undefined && !edgeRoutes.includes(edge.route as (typeof edgeRoutes)[number])) {
      throw new Error(`Unsupported edge route: ${edge.route}`);
    }

    if (edge.start !== undefined && !edgeMarkerStyles.includes(edge.start as (typeof edgeMarkerStyles)[number])) {
      throw new Error(`Unsupported edge start marker: ${edge.start}`);
    }

    if (edge.end !== undefined && !edgeMarkerStyles.includes(edge.end as (typeof edgeMarkerStyles)[number])) {
      throw new Error(`Unsupported edge end marker: ${edge.end}`);
    }

    if ((edge.style as { width?: unknown } | undefined)?.width !== undefined) {
      throw new Error("Edge style.width is not supported; use style.strokeWidth.");
    }

    assertAllowedStyleFields(edge.style as Record<string, unknown> | undefined, flowchartEdgeStyleFields, `edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}"`);
  }

  const themeName = diagram.theme || "light";
  const theme = diagramThemes[themeName];
  if (!theme) {
    throw new Error(`Unsupported diagram theme: ${themeName}`);
  }
}

function validateSequenceDiagram(diagram: SequenceDiagram, colorScheme = "classic"): void {
  if (diagram.canvas !== undefined || diagram.nodes !== undefined || diagram.edges !== undefined) {
    throw new Error("Sequence diagrams do not support flowchart sections.");
  }

  if (!Array.isArray(diagram.participants) || !Array.isArray(diagram.messages)) {
    throw new Error("Sequence diagrams require participants and messages sections.");
  }

  if (diagram.activations !== undefined && !Array.isArray(diagram.activations)) {
    throw new Error("Sequence diagram activations must be a list.");
  }

  if (diagram.notes !== undefined && !Array.isArray(diagram.notes)) {
    throw new Error("Sequence diagram notes must be a list.");
  }

  if (diagram.groups !== undefined && !Array.isArray(diagram.groups)) {
    throw new Error("Sequence diagram groups must be a list.");
  }

  const participantIds = new Set<string>();
  for (const participant of diagram.participants) {
    assertAllowedFields(participant as unknown as Record<string, unknown>, sequenceParticipantFields, `participant "${participant.id || "unknown"}"`);

    if (!participant.id || !participant.label) {
      throw new Error("Every sequence participant requires an id and label.");
    }

    if (participant.kind !== undefined && !sequenceParticipantKinds.includes(participant.kind as (typeof sequenceParticipantKinds)[number])) {
      throw new Error(`Unsupported sequence participant kind: ${participant.kind}`);
    }
    validateSequencePresentation(participant as unknown as SequencePresentationCandidate, `participant "${participant.id}"`, colorScheme);

    if (participantIds.has(participant.id)) {
      throw new Error(`Duplicate sequence participant id: ${participant.id}`);
    }

    participantIds.add(participant.id);
  }

  for (const [index, message] of diagram.messages.entries()) {
    assertAllowedFields(message as unknown as Record<string, unknown>, sequenceMessageFields, `message ${index}`);

    if (!message.from || !message.to || !message.label) {
      throw new Error(`Sequence message ${index} requires from, to, and label.`);
    }

    if (!participantIds.has(message.from) || !participantIds.has(message.to)) {
      throw new Error(`Sequence message ${index} references an unknown participant.`);
    }

    if (message.style !== undefined && !sequenceMessageStyles.includes(message.style as (typeof sequenceMessageStyles)[number])) {
      throw new Error(`Unsupported sequence message style: ${message.style}`);
    }
  }

  for (const [index, activation] of (diagram.activations || []).entries()) {
    assertAllowedFields(activation as unknown as Record<string, unknown>, sequenceActivationFields, `activation ${index}`);
    if (!activation.participant || !Number.isInteger(activation.from) || !Number.isInteger(activation.to)) {
      throw new Error(`Sequence activation ${index} requires participant and integer from and to message positions.`);
    }
    if (!participantIds.has(activation.participant)) {
      throw new Error(`Sequence activation ${index} references an unknown participant.`);
    }
    if (activation.from < 1 || activation.to < activation.from || activation.to > diagram.messages.length) {
      throw new Error(`Sequence activation ${index} range is out of bounds.`);
    }
  }

  for (const [index, note] of (diagram.notes || []).entries()) {
    assertAllowedFields(note as unknown as Record<string, unknown>, sequenceNoteFields, `note ${index}`);
    const after = note.after as unknown as number;
    if (!note.at || !Number.isInteger(after) || !note.label) {
      throw new Error(`Sequence note ${index} requires at, after, and label.`);
    }
    validateSequencePresentation(note as unknown as SequencePresentationCandidate, `note ${index}`, colorScheme);
    if (!participantIds.has(note.at)) {
      throw new Error(`Sequence note ${index} references an unknown participant.`);
    }
    if (after < 0 || after > diagram.messages.length) {
      throw new Error(`Sequence note ${index} after position is out of bounds.`);
    }
  }

  for (const [index, group] of (diagram.groups || []).entries()) {
    assertAllowedFields(group as unknown as Record<string, unknown>, sequenceGroupFields, `group ${index}`);
    if (!group.label && group.label !== "") {
      throw new Error(`Sequence group ${index} requires a label.`);
    }
    if (!Number.isInteger(group.from) || !Number.isInteger(group.to)) {
      throw new Error(`Sequence group ${index} requires integer from and to indices.`);
    }
    if (group.from < 1 || group.to < group.from || group.to > diagram.messages.length) {
      throw new Error(`Sequence group ${index} range is out of bounds.`);
    }
  }

  const themeName = diagram.theme || "light";
  const theme = diagramThemes[themeName];
  if (!theme) {
    throw new Error(`Unsupported diagram theme: ${themeName}`);
  }
}

function validateSequencePresentation(item: SequencePresentationCandidate, description: string, colorScheme = "classic"): void {
  if (item.palette) {
    assertAllowedFields(item.palette, paletteFields, `palette for ${description}`);
    if (!((nodeColorSchemes[colorScheme]?.[String(item.palette.colour)] as unknown as Record<string, unknown> | undefined)?.[String(item.palette.tone)])) {
      throw new Error(`Unsupported ${description} palette: ${String(item.palette.tone || "unknown")} ${String(item.palette.colour || "unknown")}`);
    }
  }
  assertAllowedStyleFields(item.style, flowchartNodeStyleFields, description);
  if (item.size) {
    assertAllowedFields(item.size, ["width", "height"], `size for ${description}`);
    for (const key of ["width", "height"] as const) {
      const value = item.size[key];
      if (value !== undefined && (!Number.isFinite(value) || Number(value) <= 0)) {
        throw new Error(`${description} size.${key} must be a positive number.`);
      }
    }
  }
}

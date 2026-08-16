(function () {

  "use strict";

  const sourceElement = document.querySelector("#source");
  const outputElement = document.querySelector("#rendered-document");
  const diagramModels = [];
  let editingDiagramIndex = null;
  let selectedNode = null;
  let selectedEdge = null;
  let selectedSequenceElement = null;
  let editingNode = null;
  let editingEdge = null;
  let connectionDrag = null;
  let documentTheme = "light";
  let documentColorScheme = "classic";
  let documentFormat = "centered";
  let savedSource = "";
  let editSessionDiagram = null;
  let sourceEditorOpen = false;
  let sourceEditorDraft = "";
  let sourceEditorError = "";
  let sourceEditorRenderTimer = null;
  let sourceEditorResizeObserver = null;
  const diagramZooms = new Map();

  function isDiagramEditing(diagramIndex) {
    return editingDiagramIndex === diagramIndex;
  }

  const minimumNodeSize = { width: 120, height: 60 };
  const documentMinimumNodeSize = { width: 140, height: 84 };
  const defaultNode = {
    shape: "rounded-rectangle",
    label: "New node",
    width: 190,
    height: 80
  };
  const supportedDiagramTypes = ["flowchart", "sequence"];
  const nodeShapes = [
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
  ];
  const edgeAnchors = ["top", "right", "bottom", "left"];
  const edgeRoutes = ["orthogonal", "straight", "curved"];
  const edgeMarkerStyles = ["none", "arrow", "circle"];
  const edgeMarkerDefaults = { start: "none", end: "arrow" };
  const componentDirectiveNames = ["section", "panel", "callout", "grid", "stack"];
  const componentColours = ["pink", "red", "orange", "yellow", "green", "cyan", "blue", "purple", "grey", "bw"];
  const calloutKinds = ["note", "info", "warning", "success"];
  const gridColumns = {
    "2": "repeat(2, minmax(0, 1fr))",
    "3": "repeat(3, minmax(0, 1fr))",
    "2fr 1fr": "minmax(0, 2fr) minmax(0, 1fr)",
    "1fr 2fr": "minmax(0, 1fr) minmax(0, 2fr)"
  };
  const nodeColorSchemes = {
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
  const nodeColorPalettes = nodeColorSchemes.classic;

  const diagramThemes = {
    light: {
      edge: { stroke: "#52616B", strokeWidth: 2, text: "#3E4A54" },
      node: { fill: "#EAF2FF", stroke: "#3574C7", strokeWidth: 2, text: "#17202A" }
    },
    dark: {
      edge: { stroke: "#B8C7D5", strokeWidth: 2, text: "#D9E4ED" },
      node: { fill: "#193A61", stroke: "#71AEF7", strokeWidth: 2, text: "#F3F8FC" }
    }
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function parseScalar(value) {
    const trimmed = value.trim();

    if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
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
      const object = {};

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

  const diagramCollectionNames = ["nodes", "edges", "participants", "messages", "activations", "notes", "groups"];
  const flowchartNodeFields = ["id", "label", "shape", "position", "size", "style", "palette", "subtitle"];
  const flowchartEdgeFields = ["source", "target", "sourceAnchor", "targetAnchor", "route", "label", "style", "start", "end"];
  const flowchartNodeStyleFields = ["fill", "stroke", "strokeWidth", "text"];
  const flowchartEdgeStyleFields = ["stroke", "strokeWidth", "text"];
  const paletteFields = ["tone", "colour"];
  const sequenceParticipantFields = ["id", "label", "kind", "palette", "style", "size"];
  const sequenceParticipantKinds = ["actor"];
  const sequenceMessageFields = ["from", "to", "label", "style"];
  const sequenceMessageStyles = ["solid", "dashed"];
  const sequenceActivationFields = ["participant", "from", "to"];
  const sequenceNoteFields = ["at", "after", "label", "palette", "style", "size"];
  const sequenceGroupFields = ["label", "from", "to"];

  function parseDiagram(source) {
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const diagram = {};
    let collection = null;
    let item = null;
    let nestedObject = null;

    for (const rawLine of lines) {
      if (!rawLine.trim() || rawLine.trimStart().startsWith("#")) {
        continue;
      }

      const indent = rawLine.length - rawLine.trimStart().length;
      const line = rawLine.trim();
      const itemMatch = line.match(/^- ([^:]+):\s*(.*)$/);
      const propertyMatch = line.match(/^([^:]+):\s*(.*)$/);

      if (indent === 0 && propertyMatch) {
        const [, key, value] = propertyMatch;
        item = null;
        nestedObject = null;

        if (!value) {
          if (key !== "canvas" && !diagramCollectionNames.includes(key)) {
            throw new Error(`Unsupported diagram section: ${key}`);
          }

          collection = key;
          if (key === "canvas") {
            diagram.canvas = {};
          } else {
            diagram[key] = [];
          }
          continue;
        }

        diagram[key] = parseScalar(value);
        collection = null;
        continue;
      }

      if (indent === 2 && itemMatch && diagramCollectionNames.includes(collection)) {
        const [, key, value] = itemMatch;
        item = {};
        item[key] = parseScalar(value);
        diagram[collection].push(item);
        nestedObject = null;
        continue;
      }

      if (indent === 2 && propertyMatch && collection === "canvas") {
        const [, key, value] = propertyMatch;
        diagram.canvas[key] = parseScalar(value);
        continue;
      }

      if (indent === 4 && propertyMatch && item) {
        const [, key, value] = propertyMatch;
        if (!value) {
          item[key] = {};
          nestedObject = item[key];
        } else {
          item[key] = parseScalar(value);
          nestedObject = null;
        }
        continue;
      }

      if (indent === 6 && propertyMatch && nestedObject) {
        const [, key, value] = propertyMatch;
        nestedObject[key] = parseScalar(value);
        continue;
      }

      throw new Error(`Cannot parse diagram line: ${rawLine}`);
    }

    if (!diagram.type) {
      throw new Error(`Diagram type is required and must be one of: ${supportedDiagramTypes.join(", ")}.`);
    }

    if (!supportedDiagramTypes.includes(diagram.type)) {
      throw new Error(`Unsupported diagram type: ${diagram.type}`);
    }

    return diagram.type === "flowchart"
      ? parseFlowchartDiagram(diagram)
      : parseSequenceDiagram(diagram);
  }

  function parseFlowchartDiagram(diagram) {
    diagram.canvas = diagram.canvas || {};
    if (!Array.isArray(diagram.nodes)) {
      diagram.nodes = [];
    }
    if (!Array.isArray(diagram.edges)) {
      diagram.edges = [];
    }
    validateFlowchartDiagram(diagram);
    return diagram;
  }

  function parseSequenceDiagram(diagram) {
    validateSequenceDiagram(diagram);
    return diagram;
  }

  function validateDiagram(diagram) {
    return diagram.type === "flowchart"
      ? validateFlowchartDiagram(diagram)
      : validateSequenceDiagram(diagram);
  }

  function assertAllowedFields(candidate, allowedFields, description) {
    for (const key of Object.keys(candidate || {})) {
      if (!allowedFields.includes(key)) {
        throw new Error(`Unsupported ${description} field: ${key}`);
      }
    }
  }

  function assertAllowedStyleFields(style, allowedFields, description) {
    if (!style) {
      return;
    }

    for (const key of Object.keys(style)) {
      if (!allowedFields.includes(key)) {
        throw new Error(`Unsupported ${description} style field: ${key}`);
      }
    }
  }

  function validateFlowchartDiagram(diagram) {
    if (diagram.participants !== undefined || diagram.messages !== undefined ||
      diagram.activations !== undefined || diagram.notes !== undefined || diagram.groups !== undefined) {
      throw new Error("Flowchart diagrams do not support sequence sections.");
    }

    for (const node of diagram.nodes) {
      if ("type" in node) {
        throw new Error(`Node "${node.id || "unknown"}" uses removed field "type".`);
      }

      assertAllowedFields(node, flowchartNodeFields, `node "${node.id || "unknown"}"`);

      if (!node.id || !node.label) {
        throw new Error("Every node requires an id and label.");
      }

      if (!node.shape) {
        throw new Error(`Node "${node.id}" requires a shape.`);
      }

      if (!nodeShapes.includes(node.shape)) {
        throw new Error(`Unsupported node shape: ${node.shape}`);
      }

      if (node.palette) {
        assertAllowedFields(node.palette, paletteFields, `palette for node "${node.id}"`);
        const palette = getNodeColorPalette(documentColorScheme, node.palette.tone, node.palette.colour);
        if (!palette) {
          throw new Error(`Unsupported node palette: ${node.palette.tone || "unknown"} ${node.palette.colour || "unknown"}`);
        }
      }

      if (node.style?.width !== undefined) {
        throw new Error("Node style.width is not supported; use style.strokeWidth.");
      }

      assertAllowedStyleFields(node.style, flowchartNodeStyleFields, `node "${node.id}"`);
    }

    for (const edge of diagram.edges) {
      assertAllowedFields(edge, flowchartEdgeFields, `edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}"`);

      if (!edge.sourceAnchor) {
        throw new Error(`Edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}" requires a sourceAnchor.`);
      }

      if (!edge.targetAnchor) {
        throw new Error(`Edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}" requires a targetAnchor.`);
      }

      if (!edgeAnchors.includes(edge.sourceAnchor)) {
        throw new Error(`Unsupported edge sourceAnchor: ${edge.sourceAnchor}`);
      }

      if (!edgeAnchors.includes(edge.targetAnchor)) {
        throw new Error(`Unsupported edge targetAnchor: ${edge.targetAnchor}`);
      }

      if (edge.route !== undefined && !edgeRoutes.includes(edge.route)) {
        throw new Error(`Unsupported edge route: ${edge.route}`);
      }

      if (edge.start !== undefined && !edgeMarkerStyles.includes(edge.start)) {
        throw new Error(`Unsupported edge start marker: ${edge.start}`);
      }

      if (edge.end !== undefined && !edgeMarkerStyles.includes(edge.end)) {
        throw new Error(`Unsupported edge end marker: ${edge.end}`);
      }

      if (edge.style?.width !== undefined) {
        throw new Error("Edge style.width is not supported; use style.strokeWidth.");
      }

      assertAllowedStyleFields(edge.style, flowchartEdgeStyleFields, `edge "${edge.source || "unknown"}" -> "${edge.target || "unknown"}"`);
    }

    getTheme(diagram);
  }

  function validateSequenceDiagram(diagram) {
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

    const participantIds = new Set();
    for (const participant of diagram.participants) {
      assertAllowedFields(participant, sequenceParticipantFields, `participant "${participant.id || "unknown"}"`);

      if (!participant.id || !participant.label) {
        throw new Error("Every sequence participant requires an id and label.");
      }

      if (participant.kind !== undefined && !sequenceParticipantKinds.includes(participant.kind)) {
        throw new Error(`Unsupported sequence participant kind: ${participant.kind}`);
      }
      validateSequencePresentation(participant, `participant "${participant.id}"`);

      if (participantIds.has(participant.id)) {
        throw new Error(`Duplicate sequence participant id: ${participant.id}`);
      }

      participantIds.add(participant.id);
    }

    for (const [index, message] of diagram.messages.entries()) {
      assertAllowedFields(message, sequenceMessageFields, `message ${index}`);

      if (!message.from || !message.to || !message.label) {
        throw new Error(`Sequence message ${index} requires from, to, and label.`);
      }

      if (!participantIds.has(message.from) || !participantIds.has(message.to)) {
        throw new Error(`Sequence message ${index} references an unknown participant.`);
      }

      if (message.style !== undefined && !sequenceMessageStyles.includes(message.style)) {
        throw new Error(`Unsupported sequence message style: ${message.style}`);
      }
    }

    for (const [index, activation] of (diagram.activations || []).entries()) {
      assertAllowedFields(activation, sequenceActivationFields, `activation ${index}`);
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
      assertAllowedFields(note, sequenceNoteFields, `note ${index}`);
      if (!note.at || !Number.isInteger(note.after) || !note.label) {
        throw new Error(`Sequence note ${index} requires at, after, and label.`);
      }
      validateSequencePresentation(note, `note ${index}`);
      if (!participantIds.has(note.at)) {
        throw new Error(`Sequence note ${index} references an unknown participant.`);
      }
      if (note.after < 0 || note.after > diagram.messages.length) {
        throw new Error(`Sequence note ${index} after position is out of bounds.`);
      }
    }

    for (const [index, group] of (diagram.groups || []).entries()) {
      assertAllowedFields(group, sequenceGroupFields, `group ${index}`);
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

    getTheme(diagram);
  }

  function validateSequencePresentation(item, description) {
    if (item.palette) {
      assertAllowedFields(item.palette, paletteFields, `palette for ${description}`);
      if (!getNodeColorPalette(documentColorScheme, item.palette.tone, item.palette.colour)) {
        throw new Error(`Unsupported ${description} palette: ${item.palette.tone || "unknown"} ${item.palette.colour || "unknown"}`);
      }
    }
    assertAllowedStyleFields(item.style, flowchartNodeStyleFields, description);
    if (item.size) {
      assertAllowedFields(item.size, ["width", "height"], `size for ${description}`);
      for (const key of ["width", "height"]) {
        if (item.size[key] !== undefined && (!Number.isFinite(item.size[key]) || item.size[key] <= 0)) {
          throw new Error(`${description} size.${key} must be a positive number.`);
        }
      }
    }
  }

  function getTheme(diagram) {
    const themeName = diagram.theme || documentTheme;
    const theme = diagramThemes[themeName];

    if (!theme) {
      throw new Error(`Unsupported diagram theme: ${themeName}`);
    }

    return theme;
  }

  function getNodeColorPalette(schemeName, tone, colour) {
    return nodeColorSchemes[schemeName]?.[colour]?.[tone] || null;
  }

  function mergeStyle(defaults, overrides) {
    return { ...defaults, ...(overrides || {}) };
  }

  function getNodeEffectiveStyle(diagram, node) {
    const theme = getTheme(diagram);
    const defaults = theme.node;
    const palette = node.palette
      ? getNodeColorPalette(documentColorScheme, node.palette.tone, node.palette.colour)
      : null;
    return mergeStyle(mergeStyle(defaults, palette), node.style);
  }

  function getSequenceElementEffectiveStyle(diagram, element) {
    const theme = getTheme(diagram);
    const palette = element.palette
      ? getNodeColorPalette(documentColorScheme, element.palette.tone, element.palette.colour)
      : null;
    return mergeStyle(mergeStyle(theme.node, palette), element.style);
  }

  function getEdgeEffectiveStyle(diagram, edge) {
    const theme = getTheme(diagram);
    return mergeStyle(theme.edge, edge.style);
  }

  function getEdgeMarkerStyle(edge, endpoint) {
    const value = endpoint === "start" ? edge.start : edge.end;
    return edgeMarkerStyles.includes(value) ? value : edgeMarkerDefaults[endpoint];
  }

  function getGridSize(diagram) {
    const grid = Number(diagram.canvas?.grid);
    return Number.isFinite(grid) && grid > 0 ? grid : 0;
  }

  function snapToGrid(value, grid) {
    return grid ? Math.round(value / grid) * grid : Math.round(value);
  }

  function clampNodeSize(value, minimum, grid) {
    const snapped = snapToGrid(value, grid);
    const snappedMinimum = grid ? Math.ceil(minimum / grid) * grid : minimum;
    return Math.max(snappedMinimum, snapped);
  }

  function getNodeBounds(node) {
    return {
      x: Number(node.position?.x) || 0,
      y: Number(node.position?.y) || 0,
      width: Number(node.size?.width) || defaultNode.width,
      height: Number(node.size?.height) || defaultNode.height
    };
  }

  function expandCanvasForNode(diagram, node, padding = 40) {
    const width = Number(diagram.canvas?.width) || 1000;
    const height = Number(diagram.canvas?.height) || 560;
    const nodes = diagram.nodes.includes(node) ? diagram.nodes : [...diagram.nodes, node];
    const bounds = nodes.map(getNodeBounds);
    const minimumX = Math.min(0, ...bounds.map((candidate) => candidate.x));
    const minimumY = Math.min(0, ...bounds.map((candidate) => candidate.y));
    const shiftX = minimumX < 0 ? padding - minimumX : 0;
    const shiftY = minimumY < 0 ? padding - minimumY : 0;

    if (shiftX || shiftY) {
      for (const candidate of diagram.nodes) {
        candidate.position = {
          ...candidate.position,
          x: (Number(candidate.position?.x) || 0) + shiftX,
          y: (Number(candidate.position?.y) || 0) + shiftY
        };
      }
    }

    const expandedBounds = nodes.map(getNodeBounds);
    diagram.canvas = {
      ...diagram.canvas,
      width: Math.max(width + shiftX, ...expandedBounds.map((candidate) => candidate.x + candidate.width + padding)),
      height: Math.max(height + shiftY, ...expandedBounds.map((candidate) => candidate.y + candidate.height + padding))
    };
    return diagram;
  }

  function rectanglesOverlap(first, second) {
    return first.x < second.x + second.width &&
      first.x + first.width > second.x &&
      first.y < second.y + second.height &&
      first.y + first.height > second.y;
  }

  function createUniqueNodeId(nodes, base = "new-node") {
    const ids = new Set(nodes.map((node) => node.id));
    if (!ids.has(base)) {
      return base;
    }

    let suffix = 2;
    while (ids.has(`${base}-${suffix}`)) {
      suffix += 1;
    }
    return `${base}-${suffix}`;
  }

  function getDefaultNodePosition(diagram) {
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
        if (!diagram.nodes.some((node) => rectanglesOverlap(
          { ...candidate, width: defaultNode.width, height: defaultNode.height },
          getNodeBounds(node)
        ))) {
          return candidate;
        }
      }
    }

    return start;
  }

  function createNode(diagram) {
    const node = {
      id: createUniqueNodeId(diagram.nodes),
      label: defaultNode.label,
      shape: defaultNode.shape,
      position: getDefaultNodePosition(diagram),
      size: { width: defaultNode.width, height: defaultNode.height }
    };
    diagram.nodes.push(node);
    return node;
  }

  function createConnector(diagram, source, sourceAnchor, target, targetAnchor) {
    const edge = {
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

  function reconnectConnector(edge, endpoint, nodeId, anchor) {
    if (endpoint === "source") {
      edge.source = nodeId;
      edge.sourceAnchor = anchor;
    } else {
      edge.target = nodeId;
      edge.targetAnchor = anchor;
    }
    return edge;
  }

  function deleteConnector(diagram, edgeIndex) {
    if (edgeIndex < 0 || edgeIndex >= diagram.edges.length) {
      return null;
    }
    return diagram.edges.splice(edgeIndex, 1)[0];
  }

  function deleteNode(diagram, nodeId) {
    const nodeIndex = diagram.nodes.findIndex((node) => node.id === nodeId);
    if (nodeIndex === -1) {
      return { node: null, deletedEdges: [] };
    }
    const deletedEdges = diagram.edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);
    diagram.nodes.splice(nodeIndex, 1);
    diagram.edges = diagram.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    return { node: nodeId, deletedEdges };
  }

  function splitTextLines(value) {
    return String(value ?? "").replaceAll("\r\n", "\n").split("\n");
  }

  function renderTextBlock(centerX, startY, lines, lineHeight, className, fill) {
    if (!lines.length) {
      return "";
    }

    const tspans = lines.map((line, index) => {
      const positionAttribute = index === 0 ? "" : ` dy="${lineHeight}"`;
      return `<tspan x="${centerX}"${positionAttribute}>${escapeHtml(line) || " "}</tspan>`;
    }).join("");

    return `<text x="${centerX}" y="${startY}" text-anchor="middle" class="${className}" fill="${escapeHtml(fill)}">${tspans}</text>`;
  }

  function getNodeGeometry(node, x, y, nodeWidth, nodeHeight) {
    const shape = node.shape;
    const centerX = x + nodeWidth / 2;
    const centerY = y + nodeHeight / 2;
    const textBounds = { x: x + 12, y: y + 12, width: nodeWidth - 24, height: nodeHeight - 24 };
    const anchors = {
      top: { x: centerX, y },
      right: { x: x + nodeWidth, y: centerY },
      bottom: { x: centerX, y: y + nodeHeight },
      left: { x, y: centerY }
    };
    let bodyMarkup;

    if (shape === "circle") {
      const diameter = Math.min(nodeWidth, nodeHeight);
      const circleX = centerX - diameter / 2;
      const circleY = centerY - diameter / 2;
      const radius = diameter / 2;
      textBounds.x = circleX + radius * 0.3;
      textBounds.y = circleY + radius * 0.3;
      textBounds.width = radius * 1.4;
      textBounds.height = radius * 1.4;
      anchors.top.y = circleY;
      anchors.right.x = circleX + diameter;
      anchors.bottom.y = circleY + diameter;
      anchors.left.x = circleX;
      bodyMarkup = `<circle class="docdiagram-node-body" cx="${centerX}" cy="${centerY}" r="${radius}"/>`;
    } else if (shape === "oval") {
      textBounds.x += nodeWidth * 0.1;
      textBounds.width -= nodeWidth * 0.2;
      bodyMarkup = `<ellipse class="docdiagram-node-body" cx="${centerX}" cy="${centerY}" rx="${nodeWidth / 2}" ry="${nodeHeight / 2}"/>`;
    } else if (shape === "database") {
      const cap = Math.min(nodeHeight * 0.22, 18);
      textBounds.y += cap / 2;
      textBounds.height -= cap;
      bodyMarkup = `<path class="docdiagram-node-body" d="M ${x} ${y + cap} C ${x} ${y - cap / 3} ${x + nodeWidth} ${y - cap / 3} ${x + nodeWidth} ${y + cap} V ${y + nodeHeight - cap} C ${x + nodeWidth} ${y + nodeHeight + cap / 3} ${x} ${y + nodeHeight + cap / 3} ${x} ${y + nodeHeight - cap} Z M ${x} ${y + cap} C ${x} ${y + cap * 2.3} ${x + nodeWidth} ${y + cap * 2.3} ${x + nodeWidth} ${y + cap}"/>`;
    } else if (shape === "diamond") {
      textBounds.x += nodeWidth * 0.25;
      textBounds.y += nodeHeight * 0.25;
      textBounds.width -= nodeWidth * 0.5;
      textBounds.height -= nodeHeight * 0.5;
      anchors.top = { x: centerX, y };
      anchors.right = { x: x + nodeWidth, y: centerY };
      anchors.bottom = { x: centerX, y: y + nodeHeight };
      anchors.left = { x, y: centerY };
      bodyMarkup = `<polygon class="docdiagram-node-body" points="${centerX},${y} ${x + nodeWidth},${centerY} ${centerX},${y + nodeHeight} ${x},${centerY}"/>`;
    } else if (shape === "rhombus") {
      const slant = Math.min(nodeWidth * 0.2, nodeHeight * 0.6);
      textBounds.x += slant;
      textBounds.width -= slant * 2;
      anchors.left.x = x + slant / 2;
      anchors.right.x = x + nodeWidth - slant / 2;
      bodyMarkup = `<polygon class="docdiagram-node-body" points="${x + slant},${y} ${x + nodeWidth},${y} ${x + nodeWidth - slant},${y + nodeHeight} ${x},${y + nodeHeight}"/>`;
    } else if (shape === "flattened-hexagon") {
      const clip = Math.min(nodeWidth * 0.18, nodeHeight * 0.7);
      textBounds.x += clip;
      textBounds.width -= clip * 2;
      bodyMarkup = `<polygon class="docdiagram-node-body" points="${x + clip},${y} ${x + nodeWidth - clip},${y} ${x + nodeWidth},${centerY} ${x + nodeWidth - clip},${y + nodeHeight} ${x + clip},${y + nodeHeight} ${x},${centerY}"/>`;
    } else if (shape === "chevron") {
      const point = Math.min(nodeWidth * 0.16, nodeHeight * 0.45);
      textBounds.x += point * 1.175;
      textBounds.width -= point * 1.35;
      anchors.left.x = x + point;
      bodyMarkup = `<polygon class="docdiagram-node-body" points="${x},${y} ${x + nodeWidth - point},${y} ${x + nodeWidth},${centerY} ${x + nodeWidth - point},${y + nodeHeight} ${x},${y + nodeHeight} ${x + point},${centerY}"/>`;
    } else if (shape === "right-chevron") {
      const point = Math.min(nodeWidth * 0.16, nodeHeight * 0.45);
      textBounds.width -= point;
      bodyMarkup = `<polygon class="docdiagram-node-body" points="${x},${y} ${x + nodeWidth - point},${y} ${x + nodeWidth},${centerY} ${x + nodeWidth - point},${y + nodeHeight} ${x},${y + nodeHeight}"/>`;
    } else if (shape === "document") {
      const fold = Math.max(12, Math.min(26, Math.min(nodeWidth, nodeHeight) * 0.18));
      textBounds.width -= fold * 0.45;
      textBounds.y += 2;
      textBounds.height -= 2;
      bodyMarkup = `<path class="docdiagram-node-body" d="M ${x} ${y} H ${x + nodeWidth - fold} L ${x + nodeWidth} ${y + fold} V ${y + nodeHeight} H ${x} Z M ${x + nodeWidth - fold} ${y} V ${y + fold} H ${x + nodeWidth}"/>`;
    } else {
      bodyMarkup = `<rect class="docdiagram-node-body" x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" rx="12"/>`;
    }

    return { bodyMarkup, textBounds, anchors };
  }

  function computeNodeTextLayout(textBounds, node, legacyWidth, legacyHeight, legacyNode) {
    if (typeof textBounds === "number") {
      textBounds = { x: textBounds, y: node, width: legacyWidth, height: legacyHeight };
      node = legacyNode;
    }

    const labelLineHeight = 20;
    const subtitleLineHeight = 15;
    const labelLines = splitTextLines(node.label);
    const subtitleLines = node.subtitle ? splitTextLines(node.subtitle) : [];
    const subtitleGap = subtitleLines.length ? 6 : 0;
    const labelBlockHeight = labelLines.length * labelLineHeight;
    const subtitleBlockHeight = subtitleLines.length * subtitleLineHeight;
    const totalBlockHeight = labelBlockHeight + subtitleGap + subtitleBlockHeight;
    const centerX = textBounds.x + textBounds.width / 2;
    const centerY = textBounds.y + textBounds.height / 2;
    const blockTop = centerY - totalBlockHeight / 2;

    return {
      centerX,
      labelLines,
      subtitleLines,
      labelLineHeight,
      subtitleLineHeight,
      labelStartY: blockTop + labelLineHeight * 0.72,
      subtitleStartY: blockTop + labelBlockHeight + subtitleGap + subtitleLineHeight * 0.72
    };
  }

  function renderNodeBody(geometry, style, strokeWidth) {
    return geometry.bodyMarkup.replace(
      "/>",
      ` fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${strokeWidth}"/>`
    );
  }

  function getAnchorDirection(anchor) {
    return {
      top: { x: 0, y: -1 },
      right: { x: 1, y: 0 },
      bottom: { x: 0, y: 1 },
      left: { x: -1, y: 0 }
    }[anchor];
  }

  function formatPathPoint(point) {
    return `${point.x} ${point.y}`;
  }

  function getPolylineMidpoint(points) {
    const segments = points.slice(1).map((point, index) => {
      const previous = points[index];
      return {
        start: previous,
        end: point,
        length: Math.hypot(point.x - previous.x, point.y - previous.y)
      };
    });
    const totalLength = segments.reduce((total, segment) => total + segment.length, 0);
    let remaining = totalLength / 2;

    for (const segment of segments) {
      if (remaining <= segment.length || segment === segments.at(-1)) {
        const ratio = segment.length ? remaining / segment.length : 0;
        return {
          x: segment.start.x + (segment.end.x - segment.start.x) * ratio,
          y: segment.start.y + (segment.end.y - segment.start.y) * ratio
        };
      }
      remaining -= segment.length;
    }

    return points[0];
  }

  function buildEdgePath(source, target, sourceAnchor, targetAnchor, route = "orthogonal") {
    const sourceDirection = getAnchorDirection(sourceAnchor);
    const targetDirection = getAnchorDirection(targetAnchor);
    const sourceIsHorizontal = sourceDirection.x !== 0;
    let path;
    let midpoint;
    let startTangent;
    let endTangent;

    if (route === "straight") {
      path = `M ${formatPathPoint(source)} L ${formatPathPoint(target)}`;
      midpoint = { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 };
      startTangent = { x: target.x - source.x, y: target.y - source.y };
      endTangent = startTangent;
    } else if (route === "curved") {
      const distance = Math.max(Math.abs(target.x - source.x), Math.abs(target.y - source.y), 80);
      const controlDistance = Math.min(distance / 2, 140);
      const sourceControl = {
        x: source.x + sourceDirection.x * controlDistance,
        y: source.y + sourceDirection.y * controlDistance
      };
      const targetControl = {
        x: target.x + targetDirection.x * controlDistance,
        y: target.y + targetDirection.y * controlDistance
      };
      path = `M ${formatPathPoint(source)} C ${formatPathPoint(sourceControl)} ${formatPathPoint(targetControl)} ${formatPathPoint(target)}`;
      midpoint = {
        x: (source.x + 3 * sourceControl.x + 3 * targetControl.x + target.x) / 8,
        y: (source.y + 3 * sourceControl.y + 3 * targetControl.y + target.y) / 8
      };
      startTangent = { x: sourceControl.x - source.x, y: sourceControl.y - source.y };
      endTangent = { x: target.x - targetControl.x, y: target.y - targetControl.y };
    } else {
      const lead = 40;
      const sourceLead = {
        x: source.x + sourceDirection.x * lead,
        y: source.y + sourceDirection.y * lead
      };
      const targetLead = {
        x: target.x + targetDirection.x * lead,
        y: target.y + targetDirection.y * lead
      };
      const corner = sourceIsHorizontal
        ? { x: targetLead.x, y: sourceLead.y }
        : { x: sourceLead.x, y: targetLead.y };
      let points = [source, sourceLead, corner, targetLead, target];

      let distinctPoints = points.filter((point, index) =>
        index === 0 || point.x !== points[index - 1].x || point.y !== points[index - 1].y
      );
      if (distinctPoints.length === 1) {
        distinctPoints = [
          source,
          {
            x: source.x + sourceDirection.x * 40,
            y: source.y + sourceDirection.y * 40
          },
          target
        ];
      }
      path = `M ${formatPathPoint(distinctPoints[0])}${distinctPoints.slice(1).map((point) => ` L ${formatPathPoint(point)}`).join("")}`;
      midpoint = getPolylineMidpoint(distinctPoints);
      startTangent = {
        x: distinctPoints[1].x - distinctPoints[0].x,
        y: distinctPoints[1].y - distinctPoints[0].y
      };
      const finalSegment = distinctPoints.slice(-2);
      endTangent = {
        x: finalSegment[1].x - finalSegment[0].x,
        y: finalSegment[1].y - finalSegment[0].y
      };
    }

    return { path, midpoint, startTangent, endTangent, hitPath: path };
  }

  function getEdgeMarkerDimensions(strokeWidth) {
    const width = Math.max(1, Number(strokeWidth) || 2);
    const size = 6 + width * 2.5;
    const circleRadius = Math.max(size * 0.38, width / 2 + 1);

    return { size, circleRadius };
  }

  // Endpoint markers use user-space dimensions so their size can grow gently with the
  // edge width without the excessive scaling caused by markerUnits="strokeWidth".
  function buildEdgeMarkerDef(markerId, markerStyle, endpoint, strokeColor, strokeWidth) {
    const color = escapeHtml(strokeColor);
    const { size, circleRadius } = getEdgeMarkerDimensions(strokeWidth);
    const center = size / 2;

    if (markerStyle === "arrow") {
      const orient = endpoint === "start" ? "auto-start-reverse" : "auto";
      return `<marker id="${markerId}" markerWidth="${size}" markerHeight="${size}" refX="${size}" refY="${center}" markerUnits="userSpaceOnUse" orient="${orient}"><path fill="${color}" stroke="${color}" d="M 0 0 L ${size} ${center} L 0 ${size} z"/></marker>`;
    }

    if (markerStyle === "circle") {
      return `<marker id="${markerId}" markerWidth="${size}" markerHeight="${size}" refX="${center}" refY="${center}" markerUnits="userSpaceOnUse"><circle cx="${center}" cy="${center}" r="${circleRadius}" fill="${color}" stroke="${color}"/></marker>`;
    }

    return "";
  }

  function renderDiagramToolbar(diagramIndex, editingMode = "none") {
    const allowsEditing = editingMode !== "none";
    const allowsNodeCreation = editingMode === "flowchart";
    return [
      `<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">`,
      `<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${diagramIndex}" aria-label="Zoom in" title="Zoom in">+</button>`,
      `<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${diagramIndex}" aria-label="Zoom out" title="Zoom out">−</button>`,
      `<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${diagramIndex}" aria-label="Zoom to fit" title="Zoom to fit">⊡</button>`,
      allowsEditing
        ? isDiagramEditing(diagramIndex)
          ? `<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">✓</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">×</button>${allowsNodeCreation ? `<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${diagramIndex}" aria-label="New node" title="New node">+</button>` : ""}`
          : editingDiagramIndex === null
            ? `<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">✎</button>`
            : ""
        : "",
      `</div>`
    ].join("");
  }

  function renderFlowchartDiagram(diagram, diagramIndex) {
    const nodes = new Map();

    for (const node of diagram.nodes) {
      nodes.set(node.id, {
        ...node,
        position: node.position || {},
        size: node.size || {}
      });
    }

    const edgeLabelLineHeight = 16;
    const edgeMarkerDefs = [];
    const edgeEndpointMarkup = [];

    const edgeMarkup = diagram.edges.map((edge, edgeIndex) => {
      const sourceNode = nodes.get(edge.source);
      const targetNode = nodes.get(edge.target);

      if (!sourceNode || !targetNode) {
        return "";
      }

      const sourceGeometry = getNodeGeometry(
        sourceNode,
        Number(sourceNode.position.x) || 0,
        Number(sourceNode.position.y) || 0,
        Number(sourceNode.size.width) || 190,
        Number(sourceNode.size.height) || 80
      );
      const targetGeometry = getNodeGeometry(
        targetNode,
        Number(targetNode.position.x) || 0,
        Number(targetNode.position.y) || 0,
        Number(targetNode.size.width) || 190,
        Number(targetNode.size.height) || 80
      );
      const sourceAnchor = sourceGeometry.anchors[edge.sourceAnchor];
      const targetAnchor = targetGeometry.anchors[edge.targetAnchor];
      const route = edge.route || "orthogonal";
      const edgePath = buildEdgePath(sourceAnchor, targetAnchor, edge.sourceAnchor, edge.targetAnchor, route);
      const labelX = edgePath.midpoint.x;
      const labelY = edgePath.midpoint.y - 10;

      const style = getEdgeEffectiveStyle(diagram, edge);
      const isSelected = selectedEdge?.diagramIndex === diagramIndex && selectedEdge.edgeIndex === edgeIndex;
      const isEditing = isSelected && editingEdge?.diagramIndex === diagramIndex && editingEdge.edgeIndex === edgeIndex;
      const strokeWidth = (Number(style.strokeWidth) || 2) + (isSelected ? 2 : 0);
      const editorWidth = 220;
      const editorHeight = 72;
      const edgeLabelLines = edge.label ? splitTextLines(edge.label) : [];
      const edgeLabelBlockHeight = edgeLabelLines.length * edgeLabelLineHeight;
      const edgeLabelStartY = labelY - edgeLabelBlockHeight / 2 + edgeLabelLineHeight * 0.72;

      const startMarkerStyle = getEdgeMarkerStyle(edge, "start");
      const endMarkerStyle = getEdgeMarkerStyle(edge, "end");
      const startMarkerId = `docdiagram-marker-${diagramIndex}-${edgeIndex}-start`;
      const endMarkerId = `docdiagram-marker-${diagramIndex}-${edgeIndex}-end`;

      if (startMarkerStyle !== "none") {
        edgeMarkerDefs.push(buildEdgeMarkerDef(startMarkerId, startMarkerStyle, "start", style.stroke, strokeWidth));
      }

      if (endMarkerStyle !== "none") {
        edgeMarkerDefs.push(buildEdgeMarkerDef(endMarkerId, endMarkerStyle, "end", style.stroke, strokeWidth));
      }

      if (isSelected && isDiagramEditing(diagramIndex)) {
        edgeEndpointMarkup.push(
          `<circle class="docdiagram-edge-endpoint" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}" data-endpoint="source" cx="${sourceAnchor.x}" cy="${sourceAnchor.y}" r="7"/>`,
          `<circle class="docdiagram-edge-endpoint" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}" data-endpoint="target" cx="${targetAnchor.x}" cy="${targetAnchor.y}" r="7"/>`
        );
      }

      const markerAttributes = [
        startMarkerStyle !== "none" ? ` marker-start="url(#${startMarkerId})"` : "",
        endMarkerStyle !== "none" ? ` marker-end="url(#${endMarkerId})"` : ""
      ].join("");

      return [
        `<g class="docdiagram-edge-group${isSelected ? " docdiagram-edge-selected" : ""}" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}">`,
        `<path class="docdiagram-edge-hit" d="${edgePath.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,
        `<path class="docdiagram-edge" d="${edgePath.path}"${markerAttributes} stroke="${escapeHtml(style.stroke)}" stroke-width="${strokeWidth}"/>`,
        isEditing
          ? `<foreignObject class="docdiagram-inline-editor-host" x="${labelX - editorWidth / 2}" y="${labelY - editorHeight / 2}" width="${editorWidth}" height="${editorHeight}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${escapeHtml(edge.label || "")}</textarea></foreignObject>`
          : edgeLabelLines.length
            ? renderTextBlock(labelX, edgeLabelStartY, edgeLabelLines, edgeLabelLineHeight, "docdiagram-edge-label", style.text)
            : "",
        `</g>`
      ].join("");
    }).join("");

    const nodeMarkup = [...nodes.values()].map((node) => {
      const position = node.position;
      const size = node.size;
      const x = Number(position.x) || 0;
      const y = Number(position.y) || 0;
      const nodeWidth = Number(size.width) || 190;
      const nodeHeight = Number(size.height) || 80;
      const style = getNodeEffectiveStyle(diagram, node);
      const isSelected = selectedNode?.diagramIndex === diagramIndex && selectedNode.nodeId === node.id;
      const isEditing = isSelected && editingNode?.diagramIndex === diagramIndex && editingNode.nodeId === node.id;
      const strokeWidth = (Number(style.strokeWidth) || 2) + (isSelected ? 2 : 0);
      const geometry = getNodeGeometry(node, x, y, nodeWidth, nodeHeight);
      const layout = computeNodeTextLayout(geometry.textBounds, node);

      return [
        `<g class="docdiagram-node${isSelected ? " docdiagram-node-selected" : ""}" data-diagram-index="${diagramIndex}" data-node-id="${escapeHtml(node.id)}">`,
        renderNodeBody(geometry, style, strokeWidth),
        isEditing
          ? `<foreignObject class="docdiagram-inline-editor-host" x="${geometry.textBounds.x}" y="${geometry.textBounds.y}" width="${geometry.textBounds.width}" height="${geometry.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${escapeHtml(node.label)}</textarea></foreignObject>`
          : renderTextBlock(layout.centerX, layout.labelStartY, layout.labelLines, layout.labelLineHeight, "docdiagram-node-label", style.text),
        !isEditing && layout.subtitleLines.length
          ? renderTextBlock(layout.centerX, layout.subtitleStartY, layout.subtitleLines, layout.subtitleLineHeight, "docdiagram-node-subtitle", style.text)
          : "",
        isSelected && isDiagramEditing(diagramIndex) && !isEditing
          ? `<rect class="docdiagram-resize-handle" x="${x + nodeWidth - 7}" y="${y + nodeHeight - 7}" width="14" height="14" rx="3"/>`
          : "",
        isSelected && isDiagramEditing(diagramIndex) && !isEditing
          ? edgeAnchors.map((anchor) => {
            const point = geometry.anchors[anchor];
            return `<circle class="docdiagram-connection-port" data-anchor="${anchor}" cx="${point.x}" cy="${point.y}" r="7" aria-label="${anchor} connection port"/>`;
          }).join("")
          : "",
        `</g>`
      ].join("");
    }).join("");

    const width = Number(diagram.canvas.width) || 1000;
    const height = Number(diagram.canvas.height) || 560;

    return [
      `<figure class="docdiagram" data-diagram-index="${diagramIndex}" data-diagram-type="flowchart" data-editing="${isDiagramEditing(diagramIndex)}">`,
      renderDiagramToolbar(diagramIndex, "flowchart"),
      `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Architecture diagram" data-diagram-index="${diagramIndex}" style="width: ${diagramZooms.get(diagramIndex) || 100}%">`,
      `<defs>${edgeMarkerDefs.join("")}</defs>`,
      edgeMarkup,
      connectionDrag?.diagramIndex === diagramIndex
        ? `<path class="docdiagram-connection-preview${connectionDrag.invalid ? " docdiagram-connection-invalid" : ""}" d="${buildEdgePath(connectionDrag.start, connectionDrag.current, connectionDrag.sourceAnchor, connectionDrag.targetAnchor || connectionDrag.sourceAnchor, "straight").path}"/>`
        : "",
      nodeMarkup,
      edgeEndpointMarkup.join(""),
      `</svg>`,
      `</figure>`
    ].join("");
  }

  function renderSequenceDiagram(diagram, diagramIndex) {
    const theme = getTheme(diagram);
    const width = Number(diagram.canvas?.width) || 1000;
    const baseHeight = Number(diagram.canvas?.height) || 560;
    const participants = diagram.participants || [];
    const messages = diagram.messages || [];
    const activations = diagram.activations || [];
    const notes = diagram.notes || [];
    const groups = diagram.groups || [];
    const leftMargin = 90;
    const rightMargin = 90;
    const headerTop = 28;
    const participantBoxWidth = 160;
    const participantBoxHeight = 42;
    const actorHeaderHeight = 74;
    const noteBaseHeight = 48;
    const noteGap = 18;
    const messageSpacing = 56;
    const sequenceMarkerId = `docdiagram-sequence-arrow-${diagramIndex}`;
    const lifelineTop = headerTop + actorHeaderHeight + 12;
    const positions = new Map();
    const availableWidth = Math.max(0, width - leftMargin - rightMargin);
    const participantStep = participants.length > 1 ? availableWidth / (participants.length - 1) : 0;

    participants.forEach((participant, index) => {
      positions.set(
        participant.id,
        participants.length === 1
          ? leftMargin + availableWidth / 2
          : leftMargin + participantStep * index
      );
    });

    const messageStartY = lifelineTop + 40;
    const messageRows = messages.map((message, index) => ({ ...message, index, y: messageStartY + index * messageSpacing }));
    const noteLayouts = notes.map((note) => {
      const lines = splitTextLines(note.label || "");
      const height = Math.max(noteBaseHeight, lines.length * 16 + 22, Number(note.size?.height) || 0);
      const afterRow = note.after ? messageRows[note.after - 1] : null;
      const y = (afterRow?.y || lifelineTop) + noteGap;
      let centerX = positions.get(note.at) || width / 2;
      let noteWidth = Math.max(160, Number(note.size?.width) || 0);

      centerX = Math.min(width - noteWidth / 2 - 24, Math.max(noteWidth / 2 + 24, centerX));
      return { ...note, lines, x: centerX - noteWidth / 2, y, width: noteWidth, height };
    });

    const groupBottoms = groups.map((group) => messageRows[group.to - 1]?.y + 34 || messageStartY);
    const contentBottom = Math.max(
      lifelineTop + 140,
      noteLayouts.length ? noteLayouts[noteLayouts.length - 1].y + noteLayouts[noteLayouts.length - 1].height : 0,
      messageRows.length ? messageRows[messageRows.length - 1].y + 44 : messageStartY,
      ...groupBottoms
    );
    const height = Math.max(baseHeight, contentBottom + 56);
    const lifelineBottom = height - 36;

    const activationRects = activations.map((activation, index) => ({
      participantId: activation.participant,
      depth: activations
        .slice(0, index)
        .filter((candidate) => candidate.participant === activation.participant &&
          candidate.from <= activation.from && candidate.to >= activation.from)
        .length,
      startY: (messageRows[activation.from - 1]?.y || messageStartY) - 10,
      endY: (messageRows[activation.to - 1]?.y || messageStartY) + 18
    }));

    const participantMarkup = participants.map((participant) => {
      const centerX = positions.get(participant.id);
      const style = getSequenceElementEffectiveStyle(diagram, participant);
      const headerWidth = Math.max(participantBoxWidth, Number(participant.size?.width) || 0);
      const headerHeight = Math.max(participantBoxHeight, Number(participant.size?.height) || 0);
      if (participant.kind === "actor") {
        const headY = headerTop + 10;
        const chestY = headY + 18;
        const waistY = chestY + 18;
        return [
          `<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${diagramIndex}" data-participant-id="${escapeHtml(participant.id)}">`,
          `<circle cx="${centerX}" cy="${headY}" r="8" fill="none" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
          `<path d="M ${centerX} ${headY + 8} V ${waistY} M ${centerX - 14} ${chestY} H ${centerX + 14} M ${centerX} ${waistY} L ${centerX - 12} ${waistY + 18} M ${centerX} ${waistY} L ${centerX + 12} ${waistY + 18}" fill="none" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}" stroke-linecap="round" stroke-linejoin="round"/>`,
          `<text x="${centerX}" y="${headerTop + actorHeaderHeight - 4}" text-anchor="middle" class="docdiagram-node-label" fill="${escapeHtml(style.text)}">${escapeHtml(participant.label)}</text>`,
          `</g>`
        ].join("");
      }

      return [
        `<g class="docdiagram-sequence-participant" data-diagram-index="${diagramIndex}" data-participant-id="${escapeHtml(participant.id)}">`,
        `<rect x="${centerX - headerWidth / 2}" y="${headerTop}" width="${headerWidth}" height="${headerHeight}" rx="12" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
        `<text x="${centerX}" y="${headerTop + headerHeight / 2 + 6}" text-anchor="middle" class="docdiagram-node-label" fill="${escapeHtml(style.text)}">${escapeHtml(participant.label)}</text>`,
        `</g>`
      ].join("");
    }).join("");

    const lifelineMarkup = participants.map((participant) => {
      const centerX = positions.get(participant.id);
      return `<path class="docdiagram-sequence-lifeline" d="M ${centerX} ${lifelineTop} L ${centerX} ${lifelineBottom}" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`;
    }).join("");

    const groupMarkup = groups.map((group) => {
      const startY = (messageRows[group.from - 1]?.y || messageStartY) - 24;
      const endY = (messageRows[group.to - 1]?.y || messageStartY) + 30;
      const labelWidth = Math.min(220, Math.max(110, String(group.label).length * 8 + 28));
      return [
        `<g class="docdiagram-sequence-group">`,
        `<rect x="42" y="${startY}" width="${width - 84}" height="${endY - startY}" rx="12" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,
        `<rect x="54" y="${startY - 16}" width="${labelWidth}" height="24" rx="6" fill="${escapeHtml(theme.node.fill)}" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="1.5"/>`,
        `<text x="${54 + labelWidth / 2}" y="${startY + 1}" text-anchor="middle" class="docdiagram-edge-label" fill="${escapeHtml(theme.edge.text)}">${escapeHtml(group.label)}</text>`,
        `</g>`
      ].join("");
    }).join("");

    const noteMarkup = noteLayouts.map((note, noteIndex) => {
      const lineHeight = 16;
      const startY = note.y + 18;
      const style = getSequenceElementEffectiveStyle(diagram, note);
      return [
        `<g class="docdiagram-sequence-note" data-diagram-index="${diagramIndex}" data-note-index="${noteIndex}">`,
        `<rect x="${note.x}" y="${note.y}" width="${note.width}" height="${note.height}" rx="10" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
        renderTextBlock(note.x + note.width / 2, startY, note.lines, lineHeight, "docdiagram-node-subtitle", style.text),
        `</g>`
      ].join("");
    }).join("");

    const activationMarkup = activationRects.map((activation) => {
      const centerX = positions.get(activation.participantId);
      const widthOffset = activation.depth * 7;
      const barWidth = 12;
      const barHeight = Math.max(20, activation.endY - activation.startY);
      const participant = participants.find((candidate) => candidate.id === activation.participantId);
      const style = getSequenceElementEffectiveStyle(diagram, participant);
      return `<rect class="docdiagram-sequence-activation" x="${centerX - barWidth / 2 + widthOffset}" y="${activation.startY}" width="${barWidth}" height="${barHeight}" rx="4" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}" stroke-width="${Number(style.strokeWidth) || 2}"/>`;
    }).join("");

    const messageMarkup = messageRows.map((message) => {
      const sourceX = positions.get(message.from);
      const targetX = positions.get(message.to);
      const dashed = message.style === "dashed";
      const labelLines = splitTextLines(message.label || "");
      const labelHeight = labelLines.length * 15;
      const labelStartY = message.y - 12 - labelHeight / 2 + 11;
      const markerAttribute = ` marker-end="url(#${sequenceMarkerId})"`;

      if (message.from === message.to) {
        const loopWidth = 48;
        const loopHeight = 28;
        return [
          `<g class="docdiagram-sequence-message" data-diagram-index="${diagramIndex}" data-message-index="${message.index}">`,
          `<path d="M ${sourceX} ${message.y} L ${sourceX + loopWidth} ${message.y} L ${sourceX + loopWidth} ${message.y + loopHeight} L ${sourceX} ${message.y + loopHeight}" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2"${markerAttribute}${dashed ? ' stroke-dasharray="8 5"' : ""}/>`,
          renderTextBlock(sourceX + loopWidth / 2, labelStartY, labelLines, 15, "docdiagram-edge-label", theme.edge.text),
          `</g>`
        ].join("");
      }

      return [
        `<g class="docdiagram-sequence-message" data-diagram-index="${diagramIndex}" data-message-index="${message.index}">`,
        `<path d="M ${sourceX} ${message.y} L ${targetX} ${message.y}" fill="none" stroke="${escapeHtml(theme.edge.stroke)}" stroke-width="2"${markerAttribute}${dashed ? ' stroke-dasharray="8 5"' : ""}/>`,
        renderTextBlock((sourceX + targetX) / 2, labelStartY, labelLines, 15, "docdiagram-edge-label", theme.edge.text),
        `</g>`
      ].join("");
    }).join("");

    return [
      `<figure class="docdiagram" data-diagram-index="${diagramIndex}" data-diagram-type="sequence" data-editing="${isDiagramEditing(diagramIndex)}">`,
      renderDiagramToolbar(diagramIndex, "sequence"),
      `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Sequence diagram" data-diagram-index="${diagramIndex}" style="width: ${diagramZooms.get(diagramIndex) || 100}%">`,
      `<defs>${buildEdgeMarkerDef(sequenceMarkerId, "arrow", "end", theme.edge.stroke, 2)}</defs>`,
      groupMarkup,
      participantMarkup,
      lifelineMarkup,
      activationMarkup,
      noteMarkup,
      messageMarkup,
      `</svg>`,
      `</figure>`
    ].join("");
  }

  function renderDiagram(source, diagramIndex) {
    let diagram;

    try {
      diagram = parseDiagram(source);
    } catch (error) {
      return `<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
    }

    diagramModels[diagramIndex] = diagram;
    return diagram.type === "sequence"
      ? renderSequenceDiagram(diagram, diagramIndex)
      : renderFlowchartDiagram(diagram, diagramIndex);
  }

  function isSafeUrl(value, allowDataImage = false) {
    const normalized = String(value).trim();
    if (normalized.startsWith("//") || normalized.startsWith("\\")) {
      return false;
    }

    if (!normalized || normalized.startsWith("#") ||
      normalized.startsWith("/") ||
      normalized.startsWith("./") || normalized.startsWith("../") || normalized.startsWith("?")) {
      return true;
    }

    if (allowDataImage && /^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(normalized)) {
      return true;
    }

    const scheme = normalized.match(/^([a-z][a-z\d+.-]*):/i);
    return !scheme || ["http", "https", "mailto"].includes(scheme[1].toLowerCase());
  }

  function renderInline(source) {
    const codeTokens = [];
    let value = String(source).replace(/`([^`]+)`/g, (_, code) => {
      const token = `\u0000${codeTokens.length}\u0000`;
      codeTokens.push(`<code>${escapeHtml(code)}</code>`);
      return token;
    });

    value = escapeHtml(value);
    value = value.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, alt, url) => {
      const decodedUrl = url.replaceAll("&amp;", "&");
      return isSafeUrl(decodedUrl, true)
        ? `<img src="${escapeHtml(decodedUrl)}" alt="${alt}">`
        : `![${alt}](${escapeHtml(url)})`;
    });
    value = value.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, label, url) => {
      const decodedUrl = url.replaceAll("&amp;", "&");
      return isSafeUrl(decodedUrl)
        ? `<a href="${escapeHtml(decodedUrl)}">${label}</a>`
        : `[${label}](${escapeHtml(url)})`;
    });
    value = value
      .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, "<strong>$2</strong>")
      .replace(/~~(?=\S)([\s\S]*?\S)~~/g, "<del>$1</del>")
      .replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g, "<em>$1</em>")
      .replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g, "<em>$1</em>");

    return value.replace(/\u0000(\d+)\u0000/g, (_, index) => codeTokens[Number(index)]);
  }

  function splitTableRow(line) {
    const cells = [];
    let cell = "";
    let escaped = false;
    const source = line.trim().replace(/^\||\|$/g, "");

    for (const character of source) {
      if (escaped) {
        cell += character;
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === "|") {
        cells.push(cell.trim());
        cell = "";
      } else {
        cell += character;
      }
    }
    cells.push(cell.trim());
    return cells;
  }

  function parseTableAlignment(line) {
    const cells = splitTableRow(line);
    if (!cells.length || !cells.every((cell) => /^:?-{3,}:?$/.test(cell))) {
      return null;
    }
    return cells.map((cell) => cell.startsWith(":") && cell.endsWith(":")
      ? "center"
      : cell.startsWith(":") ? "left" : cell.endsWith(":") ? "right" : "");
  }

  function getListMatch(line) {
    return line.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/);
  }

  function parseDirectiveOpen(line) {
    const match = line.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);
    if (!match) {
      return null;
    }

    const attributes = {};
    const source = match[2];
    if (source !== undefined) {
      let index = 0;
      const attributePattern = /\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi;
      let attributeMatch;
      while ((attributeMatch = attributePattern.exec(source))) {
        if (attributeMatch.index !== index || attributes[attributeMatch[1]] !== undefined) {
          return null;
        }
        attributes[attributeMatch[1]] = attributeMatch[2] ?? attributeMatch[3];
        index = attributePattern.lastIndex;
      }
      if (source.slice(index).trim()) {
        return null;
      }
    }

    return { name: match[1], attributes };
  }

  function isDirectiveClose(line) {
    return /^:::(?:\s+.*)?$/.test(line);
  }

  function findDirectiveClose(lines, start, end) {
    let depth = 1;
    let fenceOpen = false;
    for (let index = start + 1; index < end; index += 1) {
      if (/^```/.test(lines[index])) {
        fenceOpen = !fenceOpen;
        continue;
      }
      if (fenceOpen) {
        continue;
      }
      if (parseDirectiveOpen(lines[index])) {
        depth += 1;
      } else if (isDirectiveClose(lines[index])) {
        depth -= 1;
        if (!depth) {
          return index;
        }
      }
    }
    return -1;
  }

  function isComponentColour(value) {
    return /^#[\da-f]{3,8}$/i.test(value);
  }

  function getComponentStyle(attributes) {
    const hasPalette = attributes.tone !== undefined || attributes.colour !== undefined;
    if (hasPalette && (!["light", "dark"].includes(attributes.tone) || !componentColours.includes(attributes.colour))) {
      return null;
    }

    for (const key of ["fill", "stroke", "text"]) {
      if (attributes[key] !== undefined && !isComponentColour(attributes[key])) {
        return null;
      }
    }

    const palette = hasPalette
      ? getNodeColorPalette(documentColorScheme, attributes.tone, attributes.colour)
      : null;
    const overrides = Object.fromEntries(
      ["fill", "stroke", "text"]
        .filter((key) => attributes[key] !== undefined)
        .map((key) => [key, attributes[key]])
    );
    const style = mergeStyle(palette, overrides);
    return Object.entries(style)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `--docdiagram-component-${key}:${value}`)
      .join(";");
  }

  function renderMarkdown(source, state = { diagramIndex: 0 }) {
    const lines = source.replaceAll("\r\n", "\n").split("\n");

    function isBlockStart(index) {
      const line = lines[index] || "";
      return !line.trim() || /^```/.test(line) || /^(#{1,6})\s+/.test(line) ||
        /^ {0,3}&gt;|^ {0,3}>/.test(line) || /^ {0,3}(?:[-*_]\s*){3,}$/.test(line) ||
        /^:::/.test(line) || Boolean(getListMatch(line)) ||
        (index + 1 < lines.length && parseTableAlignment(lines[index + 1]));
    }

    function renderList(start, baseIndent) {
      const first = getListMatch(lines[start]);
      const ordered = /^\d/.test(first[2]);
      const items = [];
      let index = start;
      const startValue = ordered ? Number.parseInt(first[2], 10) : null;

      while (index < lines.length) {
        const match = getListMatch(lines[index]);
        if (!match || match[1].length !== baseIndent || /^\d/.test(match[2]) !== ordered) {
          break;
        }

        const item = { content: [match[3]], children: [] };
        index += 1;
        while (index < lines.length) {
          const nested = getListMatch(lines[index]);
          if (nested && nested[1].length > baseIndent) {
            const rendered = renderList(index, nested[1].length);
            item.children.push(rendered.html);
            index = rendered.index;
            continue;
          }
          if (!lines[index].trim()) {
            index += 1;
            if (index >= lines.length || !getListMatch(lines[index]) || getListMatch(lines[index])[1].length <= baseIndent) {
              break;
            }
            continue;
          }
          if (/^\s+/.test(lines[index]) && !getListMatch(lines[index])) {
            item.content.push(lines[index].trim());
            index += 1;
            continue;
          }
          break;
        }
        items.push(item);
      }

      const tag = ordered ? "ol" : "ul";
      const attributes = ordered && startValue !== 1 ? ` start="${startValue}"` : "";
      const markup = items.map((item) => {
        const task = !ordered && item.content.length === 1 && item.content[0].match(/^\[([ xX])\]\s+(.*)$/);
        const content = task
          ? `<input type="checkbox" disabled${task[1].toLowerCase() === "x" ? " checked" : ""}> ${renderInline(task[2])}`
          : renderInline(item.content.join(" "));
        return `<li${task ? ' class="docdiagram-task-list-item"' : ""}>${content}${item.children.join("")}</li>`;
      }).join("");
      return { html: `<${tag}${attributes}>${markup}</${tag}>`, index };
    }

    function renderDirective(start, end) {
      const directive = parseDirectiveOpen(lines[start]);
      const close = directive ? findDirectiveClose(lines, start, end) : -1;
      if (!directive || close === -1) {
        return null;
      }

      const { name, attributes } = directive;
      const allowedAttributes = {
        section: ["title", "tone", "colour", "fill", "stroke", "text"],
        panel: ["title", "tone", "colour", "fill", "stroke", "text"],
        callout: ["kind", "title", "tone", "colour", "fill", "stroke", "text"],
        grid: ["columns"],
        stack: []
      };
      if (Object.keys(attributes).some((key) => !allowedAttributes[name].includes(key))) {
        return null;
      }

      if (name === "grid") {
        const columns = gridColumns[attributes.columns];
        if (!columns) {
          return null;
        }

        const items = [];
        let index = start + 1;
        while (index < close) {
          if (!lines[index].trim()) {
            index += 1;
            continue;
          }
          const child = parseDirectiveOpen(lines[index]);
          if (!child || !["panel", "callout", "stack"].includes(child.name)) {
            return null;
          }
          const rendered = renderDirective(index, close);
          if (!rendered) {
            return null;
          }
          items.push(`<div class="docdiagram-grid-item">${rendered.html}</div>`);
          index = rendered.next;
        }
        return {
          html: `<div class="docdiagram-grid" style="--docdiagram-grid-columns:${columns}">${items.join("")}</div>`,
          next: close + 1
        };
      }

      if (name === "stack") {
        if (Object.keys(attributes).length) {
          return null;
        }
        return {
          html: `<div class="docdiagram-stack">${renderBlocks(start + 1, close)}</div>`,
          next: close + 1
        };
      }

      const style = getComponentStyle(attributes);
      if (style === null || (name === "callout" && attributes.kind !== undefined && !calloutKinds.includes(attributes.kind))) {
        return null;
      }

      const title = attributes.title ? `<div class="docdiagram-component-title">${renderInline(attributes.title)}</div>` : "";
      const body = renderBlocks(start + 1, close);
      const componentClass = `docdiagram-component${name === "callout" ? "" : ` docdiagram-${name}`}${style ? " docdiagram-component-styled" : ""}`;
      if (name === "callout") {
        const kind = attributes.kind || "info";
        return {
          html: `<aside class="${componentClass} docdiagram-callout docdiagram-callout-${kind}"${style ? ` style="${style}"` : ""} aria-label="${escapeHtml(attributes.title || kind)} callout"><div class="docdiagram-callout-kind">${escapeHtml(kind)}</div>${title}${body}</aside>`,
          next: close + 1
        };
      }

      return {
        html: `<section class="${componentClass}"${style ? ` style="${style}"` : ""}>${title}${body}</section>`,
        next: close + 1
      };
    }

    function renderBlocks(start = 0, end = lines.length) {
      const output = [];
      let index = start;
      while (index < end) {
        const line = lines[index];
        if (!line.trim()) {
          index += 1;
          continue;
        }

        if (/^:::/.test(line)) {
          const rendered = renderDirective(index, end);
          if (rendered) {
            output.push(rendered.html);
            index = rendered.next;
          } else {
            output.push(`<pre class="docdiagram-literal-source"><code>${escapeHtml(line)}</code></pre>`);
            index += 1;
          }
          continue;
        }

        const fence = line.match(/^```([\w-]*)\s*$/);
        if (fence) {
          const closing = lines.slice(index + 1, end).findIndex((candidate) => /^```\s*$/.test(candidate));
          if (closing === -1) {
            output.push(`<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>`);
            break;
          }
          const closeIndex = index + closing + 1;
          const content = lines.slice(index + 1, closeIndex).join("\n");
          if (fence[1] === "diagram") {
            output.push(renderDiagram(content, state.diagramIndex));
            state.diagramIndex += 1;
          } else {
            const className = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : "";
            output.push(`<pre><code${className}>${escapeHtml(content)}</code></pre>`);
          }
          index = closeIndex + 1;
          continue;
        }

        const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
        if (heading) {
          output.push(`<h${heading[1].length}>${renderInline(heading[2])}</h${heading[1].length}>`);
          index += 1;
          continue;
        }

        if (/^ {0,3}(?:[-*_]\s*){3,}$/.test(line)) {
          output.push("<hr>");
          index += 1;
          continue;
        }

        if (/^ {0,3}>/.test(line)) {
          const quoteLines = [];
          while (index < end && /^ {0,3}>/.test(lines[index])) {
            quoteLines.push(lines[index].replace(/^ {0,3}> ?/, ""));
            index += 1;
          }
          output.push(`<blockquote>${renderMarkdown(quoteLines.join("\n"), state)}</blockquote>`);
          continue;
        }

        const list = getListMatch(line);
        if (list) {
          const rendered = renderList(index, list[1].length);
          output.push(rendered.html);
          index = rendered.index;
          continue;
        }

        const alignment = index + 1 < end ? parseTableAlignment(lines[index + 1]) : null;
        if (alignment) {
          const header = splitTableRow(line);
          const rows = [];
          index += 2;
          while (index < end && lines[index].includes("|") && lines[index].trim()) {
            rows.push(splitTableRow(lines[index]));
            index += 1;
          }
          const renderCells = (tag, cells) => cells.map((cell, cellIndex) =>
            `<${tag}${alignment[cellIndex] ? ` style="text-align:${alignment[cellIndex]}"` : ""}>${renderInline(cell || "")}</${tag}>`
          ).join("");
          output.push(`<table><thead><tr>${renderCells("th", header)}</tr></thead><tbody>${rows.map((row) =>
            `<tr>${renderCells("td", row)}</tr>`
          ).join("")}</tbody></table>`);
          continue;
        }

        const paragraph = [line.trim()];
        index += 1;
        while (index < end && !isBlockStart(index)) {
          paragraph.push(lines[index].trim());
          index += 1;
        }
        output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      }
      return output.join("");
    }

    return renderBlocks();
  }

  function parseDocumentFrontmatter(source) {
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const openingIndex = lines.findIndex((line) => line.trim() !== "");
    if (openingIndex === -1 || lines[openingIndex] !== "---") {
      return { content: source, frontmatter: {} };
    }

    const closingIndex = lines.indexOf("---", openingIndex + 1);
    if (closingIndex === -1) {
      return { content: source, frontmatter: {} };
    }

    const frontmatter = {};
    for (const line of lines.slice(openingIndex + 1, closingIndex)) {
      if (!line.trim() || line.trimStart().startsWith("#")) {
        continue;
      }

      const propertyMatch = line.match(/^([^:]+):\s*(.*)$/);
      if (!propertyMatch) {
        throw new Error(`Cannot parse document frontmatter line: ${line}`);
      }

      frontmatter[propertyMatch[1]] = parseScalar(propertyMatch[2]);
    }

    return { content: lines.slice(closingIndex + 1).join("\n"), frontmatter };
  }

  function resolveDocument(source) {
    const document = parseDocumentFrontmatter(source);
    const theme = document.frontmatter.theme || "light";
    const colourScheme = document.frontmatter.colourScheme || "classic";

    if (!diagramThemes[theme]) {
      throw new Error(`Unsupported document theme: ${theme}`);
    }

    if (!nodeColorSchemes[colourScheme]) {
      throw new Error(`Unsupported document colour scheme: ${colourScheme}`);
    }

    return { ...document, theme, colourScheme };
  }

  function validateDocumentSource(source) {
    const document = resolveDocument(source);
    const lines = document.content.replaceAll("\r\n", "\n").split("\n");
    let index = 0;

    while (index < lines.length) {
      const line = lines[index].replace(/^(?: {0,3}> ?)+/, "");
      const fence = line.match(/^```([\w-]*)\s*$/);
      if (!fence) {
        index += 1;
        continue;
      }

      const closeOffset = lines
        .slice(index + 1)
        .findIndex((candidate) => /^```\s*$/.test(candidate.replace(/^(?: {0,3}> ?)+/, "")));
      if (closeOffset === -1) {
        throw new Error("Unclosed code block.");
      }

      const closeIndex = index + closeOffset + 1;
      if (fence[1] === "diagram") {
        const diagramSource = lines
          .slice(index + 1, closeIndex)
          .map((candidate) => candidate.replace(/^(?: {0,3}> ?)+/, ""))
          .join("\n");
        parseDiagram(diagramSource);
      }
      index = closeIndex + 1;
    }

    return document;
  }

  function setFrontmatterTheme(source, themeName) {
    const normalized = source.replaceAll("\r\n", "\n");
    const lines = normalized.split("\n");
    const openingIndex = lines.findIndex((line) => line.trim() !== "");
    const hasFrontmatter = openingIndex !== -1 && lines[openingIndex] === "---";
    const closingIndex = hasFrontmatter ? lines.indexOf("---", openingIndex + 1) : -1;

    if (!hasFrontmatter || closingIndex === -1) {
      return `---\ntheme: ${themeName}\n---\n${normalized}`;
    }

    let themeSet = false;
    const frontmatterLines = lines.slice(openingIndex + 1, closingIndex).map((line) => {
      if (!line.trim() || line.trimStart().startsWith("#")) {
        return line;
      }

      const propertyMatch = line.match(/^([^:]+):\s*(.*)$/);
      if (propertyMatch && propertyMatch[1] === "theme") {
        themeSet = true;
        return `theme: ${themeName}`;
      }

      return line;
    });

    if (!themeSet) {
      frontmatterLines.push(`theme: ${themeName}`);
    }

    return [
      ...lines.slice(0, openingIndex + 1),
      ...frontmatterLines,
      ...lines.slice(closingIndex)
    ].join("\n");
  }

  function formatScalar(value) {
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    if (value && typeof value === "object") {
      if (!Object.keys(value).length) {
        return "{}";
      }
      return `{ ${Object.entries(value).map(([key, entry]) => `${key}: ${formatScalar(entry)}`).join(", ")} }`;
    }

    return /^[\w./-]+(?: [\w./-]+)*$/.test(String(value))
      ? String(value)
      : JSON.stringify(String(value));
  }

  function serializeItem(item) {
    const entries = Object.entries(item);
    const [firstKey, firstValue] = entries[0];
    const lines = [`  - ${firstKey}: ${formatScalar(firstValue)}`];

    for (const [key, value] of entries.slice(1)) {
      lines.push(`    ${key}: ${formatScalar(value)}`);
    }

    return lines;
  }

  function serializeDiagram(diagram) {
    const lines = [`type: ${formatScalar(diagram.type)}`];

    for (const [key, value] of Object.entries(diagram)) {
      if (key === "type" || key === "canvas" || key === "nodes" || key === "edges" ||
        key === "participants" || key === "messages" || key === "activations" || key === "notes" || key === "groups") {
        continue;
      }
      lines.push(`${key}: ${formatScalar(value)}`);
    }

    if (diagram.type === "sequence") {
      lines.push("participants:");
      for (const participant of diagram.participants || []) {
        lines.push(...serializeItem(participant));
      }

      lines.push("messages:");
      for (const message of diagram.messages || []) {
        lines.push(...serializeItem(message));
      }

      if (diagram.activations !== undefined) {
        lines.push("activations:");
        for (const activation of diagram.activations || []) {
          lines.push(...serializeItem(activation));
        }
      }

      if (diagram.notes !== undefined) {
        lines.push("notes:");
        for (const note of diagram.notes || []) {
          lines.push(...serializeItem(note));
        }
      }

      if (diagram.groups !== undefined) {
        lines.push("groups:");
        for (const group of diagram.groups || []) {
          lines.push(...serializeItem(group));
        }
      }

      return lines.join("\n");
    }

    lines.push("canvas:");
    for (const [key, value] of Object.entries(diagram.canvas || {})) {
      lines.push(`  ${key}: ${formatScalar(value)}`);
    }

    lines.push("nodes:");
    for (const node of diagram.nodes || []) {
      lines.push(...serializeItem(node));
    }

    lines.push("edges:");
    for (const edge of diagram.edges || []) {
      lines.push(...serializeItem(edge));
    }

    return lines.join("\n");
  }

  function getSource() {
    return sourceElement.content.textContent;
  }

  function setSource(source) {
    sourceElement.content.replaceChildren(document.createTextNode(source));
  }

  function isEditableElement(element) {
    return element instanceof Element &&
      element.matches("input, textarea, select, [contenteditable]");
  }

  function findSourceTextRange(source, text) {
    const selectedText = text.trim();
    const start = selectedText ? source.indexOf(selectedText) : -1;

    return start === -1 ? null : { start, end: start + selectedText.length };
  }

  function scrollSourceEditorToRange(editor, range) {
    const lineHeight = Number.parseFloat(globalThis.getComputedStyle(editor).lineHeight) || 20;
    const lineIndex = editor.value.slice(0, range.start).split("\n").length - 1;
    const visibleLineCount = Math.max(1, Math.floor(editor.clientHeight / lineHeight));

    editor.scrollTop = Math.max(0, (lineIndex - Math.floor(visibleLineCount / 2)) * lineHeight);
  }

  function revealSourceText(text) {
    const range = findSourceTextRange(getSource(), text);
    if (!range || (sourceEditorOpen && sourceEditorDraft !== getSource())) {
      return false;
    }

    if (!sourceEditorOpen) {
      openSourceEditor();
    }

    const selectMatch = () => {
      const editor = document.querySelector(".docdiagram-source-editor");
      if (!editor) {
        return;
      }
      editor.focus();
      editor.setSelectionRange(range.start, range.end);
      scrollSourceEditorToRange(editor, range);
    };

    globalThis.requestAnimationFrame?.(selectMatch) ?? selectMatch();
    return true;
  }

  function scheduleSourceEditorRender() {
    globalThis.clearTimeout(sourceEditorRenderTimer);
    sourceEditorRenderTimer = globalThis.setTimeout(() => {
      sourceEditorRenderTimer = null;
      renderSourceEditorDraft();
    }, 250);
  }

  function renderSourceEditorDraft() {
    globalThis.clearTimeout(sourceEditorRenderTimer);
    sourceEditorRenderTimer = null;
    return renderDocument(sourceEditorDraft, { preserveOnError: true });
  }

  function flushSourceEditorRender() {
    return sourceEditorRenderTimer === null ? true : renderSourceEditorDraft();
  }

  function updateSourceEditorStatus() {
    const tray = document.querySelector(".docdiagram-source-tray");
    if (!tray) {
      return;
    }

    const status = tray.querySelector(".docdiagram-source-status");
    const error = tray.querySelector(".docdiagram-source-error");
    status.textContent = sourceEditorError ? "Source has errors; showing the last valid render." : "Changes render automatically.";
    error.hidden = !sourceEditorError;
    error.textContent = sourceEditorError;
  }

  function focusSourceEditor() {
    const editor = document.querySelector(".docdiagram-source-editor");
    if (!editor) {
      return;
    }

    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }

  function createSourceEditorTray() {
    let tray = document.querySelector(".docdiagram-source-tray");
    if (!sourceEditorOpen) {
      sourceEditorResizeObserver?.disconnect();
      sourceEditorResizeObserver = null;
      tray?.remove();
      delete outputElement.dataset.sourceEditorOpen;
      outputElement.style.removeProperty("--docdiagram-source-tray-height");
      return;
    }

    if (tray) {
      tray.dataset.theme = documentTheme;
      outputElement.dataset.sourceEditorOpen = "true";
      updateSourceEditorStatus();
      return;
    }

    tray = document.createElement("section");
    tray.className = "docdiagram-source-tray";
    tray.dataset.theme = documentTheme;
    tray.setAttribute("aria-label", "Document source editor");
    tray.innerHTML = [
      `<header class="docdiagram-source-header">`,
      `<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>`,
      `<button type="button" class="docdiagram-source-close">Close source editor</button>`,
      `</header>`,
      `<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>`,
      `<p class="docdiagram-source-status" aria-live="polite"></p>`,
      `<p class="docdiagram-source-error" role="alert"></p>`
    ].join("");
    const editor = tray.querySelector(".docdiagram-source-editor");
    const closeButton = tray.querySelector(".docdiagram-source-close");

    editor.value = sourceEditorDraft;
    editor.addEventListener("input", () => {
      sourceEditorDraft = editor.value;
      sourceEditorError = "";
      updateSourceEditorStatus();
      scheduleSourceEditorRender();
    });
    closeButton.addEventListener("click", closeSourceEditor);
    outputElement.after(tray);
    outputElement.dataset.sourceEditorOpen = "true";
    const syncTrayHeight = () => {
      outputElement.style.setProperty("--docdiagram-source-tray-height", `${tray.offsetHeight}px`);
    };
    sourceEditorResizeObserver?.disconnect();
    if (globalThis.ResizeObserver) {
      sourceEditorResizeObserver = new globalThis.ResizeObserver(syncTrayHeight);
      sourceEditorResizeObserver.observe(tray);
    }
    syncTrayHeight();
    updateSourceEditorStatus();
  }

  function openSourceEditor() {
    globalThis.clearTimeout(sourceEditorRenderTimer);
    sourceEditorDraft = getSource();
    sourceEditorError = "";
    sourceEditorOpen = true;
    if (editingDiagramIndex !== null) {
      editingDiagramIndex = null;
      editSessionDiagram = null;
      clearEditorState();
    }
    renderDocument();
    globalThis.requestAnimationFrame?.(focusSourceEditor) ?? focusSourceEditor();
  }

  function closeSourceEditor() {
    flushSourceEditorRender();
    if (sourceEditorError && sourceEditorDraft !== getSource() &&
      !globalThis.confirm("Discard the invalid source changes?")) {
      return;
    }

    sourceEditorOpen = false;
    sourceEditorDraft = "";
    sourceEditorError = "";
    createSourceEditorTray();
    document.querySelector(".docdiagram-menu-toggle")?.focus();
  }

  function persistDiagramModels() {
    let diagramIndex = 0;
    const source = getSource().replaceAll("\r\n", "\n").replace(
      /^```diagram\s*\n([\s\S]*?)^```$/gm,
      () => {
        const diagram = diagramModels[diagramIndex];
        diagramIndex += 1;
        return `\`\`\`diagram\n${serializeDiagram(diagram)}\n\`\`\``;
      }
    );

    setSource(source);
    syncOpenSourceEditor(source);
  }

  function syncOpenSourceEditor(source) {
    if (!sourceEditorOpen) {
      return;
    }

    sourceEditorDraft = source;
    sourceEditorError = "";
    const editor = document.querySelector(".docdiagram-source-editor");
    if (!editor) {
      return;
    }

    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const scrollTop = editor.scrollTop;
    editor.value = source;
    editor.setSelectionRange(
      Math.min(selectionStart, source.length),
      Math.min(selectionEnd, source.length)
    );
    editor.scrollTop = scrollTop;
    updateSourceEditorStatus();
  }

  function getSelectedNode() {
    if (!selectedNode) {
      return null;
    }

    return diagramModels[selectedNode.diagramIndex]?.nodes.find(
      (node) => node.id === selectedNode.nodeId
    ) || null;
  }

  function getSelectedEdge() {
    if (!selectedEdge) {
      return null;
    }

    return diagramModels[selectedEdge.diagramIndex]?.edges[selectedEdge.edgeIndex] || null;
  }

  function getSelectedSequenceElement() {
    if (!selectedSequenceElement) {
      return null;
    }
    const diagram = diagramModels[selectedSequenceElement.diagramIndex];
    if (!diagram || diagram.type !== "sequence") {
      return null;
    }
    if (selectedSequenceElement.kind === "participant") {
      return diagram.participants.find((participant) => participant.id === selectedSequenceElement.id) || null;
    }
    return diagram[`${selectedSequenceElement.kind}s`]?.[selectedSequenceElement.index] || null;
  }

  function buildSequenceInspectorFields(element) {
    const palettes = nodeColorSchemes[documentColorScheme];
    const style = getSequenceElementEffectiveStyle(
      diagramModels[selectedSequenceElement.diagramIndex],
      element
    );
    const supportsPresentation = selectedSequenceElement.kind !== "message";

    return [
      `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(element.label)}</textarea></label>`,
      selectedSequenceElement.kind === "message"
        ? `<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${element.style !== "dashed" ? " selected" : ""}>Solid</option><option value="dashed"${element.style === "dashed" ? " selected" : ""}>Dashed</option></select></label>`
        : "",
      supportsPresentation
        ? `<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${element.palette?.tone !== "dark" ? " selected" : ""}>Light</option><option value="dark"${element.palette?.tone === "dark" ? " selected" : ""}>Dark</option></select></label>`
        : "",
      supportsPresentation
        ? `<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${Object.entries(palettes).map(
          ([name, palette]) => `<option value="${name}"${name === (element.palette?.colour || "blue") ? " selected" : ""}>${palette.label}</option>`
        ).join("")}</select></label>`
        : "",
      supportsPresentation
        ? `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${escapeHtml(style.fill)}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${escapeHtml(style.stroke)}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${escapeHtml(style.text)}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(element.size?.width) || ""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(element.size?.height) || ""}"></label>`
        : ""
    ].join("");
  }

  function setNodeLabel(node, label) {
    node.label = String(label).trim() || node.label;
    return node;
  }

  function setNodeShape(node, shape) {
    node.shape = shape;
    return node;
  }

  function setNodeSubtitle(node, subtitle) {
    node.subtitle = String(subtitle ?? "").trim();
    return node;
  }

  function setNodeStyleOverride(node, key, value) {
    node.style = { ...node.style, [key]: value };
    return node;
  }

  function setNodeColorPalette(node, tone, colour, colorScheme = documentColorScheme) {
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

  function getMinimumNodeDimensions(shape) {
    return shape === "document" ? documentMinimumNodeSize : minimumNodeSize;
  }

  function setNodeSize(diagram, node, dimension, rawValue) {
    const grid = getGridSize(diagram);
    const minimumDimensions = getMinimumNodeDimensions(node.shape);
    const minimum = dimension === "width" ? minimumDimensions.width : minimumDimensions.height;
    const size = clampNodeSize(Number(rawValue) || minimum, minimum, grid);
    node.size = node.shape === "circle"
      ? { ...node.size, width: size, height: size }
      : { ...node.size, [dimension]: size };
    return node;
  }

  function setEdgeLabel(edge, label) {
    edge.label = String(label).trim();
    return edge;
  }

  function setEdgeRoute(edge, route) {
    edge.route = route;
    return edge;
  }

  function setEdgeAnchor(edge, endpoint, anchor) {
    if (endpoint === "source") {
      edge.sourceAnchor = anchor;
    } else {
      edge.targetAnchor = anchor;
    }
    return edge;
  }

  function setEdgeStyleOverride(edge, key, value) {
    edge.style = { ...edge.style, [key]: value };
    return edge;
  }

  function setStyleStrokeWidth(element, rawValue) {
    const strokeWidth = Math.max(1, Math.round(Number(rawValue)) || 1);
    element.style = { ...element.style, strokeWidth };
    return element;
  }

  function setEdgeMarkerStart(edge, markerStyle) {
    edge.start = edgeMarkerStyles.includes(markerStyle) ? markerStyle : edgeMarkerDefaults.start;
    return edge;
  }

  function setEdgeMarkerEnd(edge, markerStyle) {
    edge.end = edgeMarkerStyles.includes(markerStyle) ? markerStyle : edgeMarkerDefaults.end;
    return edge;
  }

  function createToolbar() {
    const toolbar = document.createElement("section");
    toolbar.className = "docdiagram-toolbar";
    toolbar.dataset.editing = String(editingDiagramIndex !== null);
    toolbar.dataset.theme = documentTheme;
    toolbar.dataset.format = documentFormat;

    const node = selectedNode && isDiagramEditing(selectedNode.diagramIndex) ? getSelectedNode() : null;
    const edge = selectedEdge && isDiagramEditing(selectedEdge.diagramIndex) && !node ? getSelectedEdge() : null;
    const sequenceElement = !node && !edge ? getSelectedSequenceElement() : null;
    const inspectorDiagram = node
      ? diagramModels[selectedNode.diagramIndex]
      : edge
        ? diagramModels[selectedEdge.diagramIndex]
        : sequenceElement
          ? diagramModels[selectedSequenceElement.diagramIndex]
          : null;

    toolbar.innerHTML = [
      `<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">☰</button>`,
      `<div class="docdiagram-menu" hidden>`,
      `<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">`,
      `<option value="light"${documentTheme === "light" ? " selected" : ""}>Light</option>`,
      `<option value="dark"${documentTheme === "dark" ? " selected" : ""}>Dark</option>`,
      `</select></label>`,
      `<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">`,
      `<option value="centered"${documentFormat === "centered" ? " selected" : ""}>Centered</option>`,
      `<option value="full-width"${documentFormat === "full-width" ? " selected" : ""}>Full width</option>`,
      `</select></label>`,
      `<button type="button" class="docdiagram-edit-source">Edit source</button>`,
      `<button type="button" class="docdiagram-save">Save As</button>`,
      `<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>`,
      `</div>`,
      node
        ? `<div class="docdiagram-inspector" data-kind="node">${buildNodeInspectorFields(inspectorDiagram, node)}</div>`
        : edge
          ? `<div class="docdiagram-inspector" data-kind="edge">${buildEdgeInspectorFields(inspectorDiagram, edge)}</div>`
          : sequenceElement
            ? `<div class="docdiagram-inspector" data-kind="sequence">${buildSequenceInspectorFields(sequenceElement)}</div>`
            : ""
    ].join("");

    const menuToggle = toolbar.querySelector(".docdiagram-menu-toggle");
    const menu = toolbar.querySelector(".docdiagram-menu");
    const saveButton = toolbar.querySelector(".docdiagram-save");
    const editSourceButton = toolbar.querySelector(".docdiagram-edit-source");
    const themeSelect = toolbar.querySelector(".docdiagram-theme-select");
    const formatSelect = toolbar.querySelector(".docdiagram-format-select");

    menuToggle.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    saveButton.addEventListener("click", downloadDocument);
    editSourceButton.addEventListener("click", () => {
      closeDocumentMenu();
      openSourceEditor();
    });
    themeSelect.addEventListener("change", () => {
      setSource(setFrontmatterTheme(getSource(), themeSelect.value));
      renderDocument();
    });
    formatSelect.addEventListener("change", () => {
      documentFormat = formatSelect.value;
      renderDocument();
    });

    outputElement.before(toolbar);

    if (node) {
      wireNodeInspector(toolbar, selectedNode.diagramIndex, selectedNode.nodeId);
      positionInspector(selectedNode.diagramIndex);
    } else if (edge) {
      wireEdgeInspector(toolbar, selectedEdge.diagramIndex, selectedEdge.edgeIndex);
      positionInspector(selectedEdge.diagramIndex);
    } else if (sequenceElement) {
      wireSequenceInspector(toolbar);
      positionInspector(selectedSequenceElement.diagramIndex);
    }

    function positionInspector(diagramIndex) {
      const inspector = document.querySelector(".docdiagram-inspector");
      const diagram = outputElement.querySelector(`.docdiagram[data-diagram-index="${diagramIndex}"]`);
      if (!inspector || !diagram) {
        return;
      }
      inspector.style.top = `${Math.max(16, diagram.getBoundingClientRect().top)}px`;
    }

    wireChromeControls(toolbar);
  }

  function isDirty() {
    return getSource() !== savedSource;
  }

  function clampZoom(value) {
    return Math.min(200, Math.max(25, Number(value) || 100));
  }

  function clearEditorState() {
    selectedNode = null;
    selectedEdge = null;
    selectedSequenceElement = null;
    editingNode = null;
    editingEdge = null;
  }

  function wireSequenceInspector(toolbar) {
    const element = getSelectedSequenceElement();
    if (!element) {
      return;
    }

    const update = (mutate) => {
      mutate();
      persistDiagramModels();
      renderDocument();
    };
    toolbar.querySelector(".docdiagram-sequence-inspector-label")?.addEventListener("change", (event) => {
      update(() => { element.label = String(event.target.value).trim() || element.label; });
    });
    toolbar.querySelector(".docdiagram-sequence-inspector-message-style")?.addEventListener("change", (event) => {
      update(() => { element.style = event.target.value; });
    });
    const tone = toolbar.querySelector(".docdiagram-sequence-inspector-tone");
    const colour = toolbar.querySelector(".docdiagram-sequence-inspector-colour");
    const setPalette = () => update(() => setNodeColorPalette(element, tone.value, colour.value));
    tone?.addEventListener("change", setPalette);
    colour?.addEventListener("change", setPalette);
    for (const [selector, key] of [
      [".docdiagram-sequence-inspector-fill", "fill"],
      [".docdiagram-sequence-inspector-stroke", "stroke"],
      [".docdiagram-sequence-inspector-text", "text"]
    ]) {
      toolbar.querySelector(selector)?.addEventListener("change", (event) => {
        update(() => setNodeStyleOverride(element, key, event.target.value));
      });
    }
    for (const [selector, key] of [
      [".docdiagram-sequence-inspector-width", "width"],
      [".docdiagram-sequence-inspector-height", "height"]
    ]) {
      toolbar.querySelector(selector)?.addEventListener("change", (event) => {
        update(() => {
          const value = Number(event.target.value);
          if (Number.isFinite(value) && value > 0) {
            element.size = { ...element.size, [key]: value };
          }
        });
      });
    }
  }

  function exitEditing(diagramIndex, discard) {
    if (discard && editSessionDiagram !== null) {
      diagramModels[diagramIndex] = editSessionDiagram;
      persistDiagramModels();
    }
    editingDiagramIndex = null;
    editSessionDiagram = null;
    clearEditorState();
    renderDocument();
  }

  function createNewNode(diagramIndex) {
    const diagram = diagramModels[diagramIndex];
    if (!diagram) {
      return;
    }
    const node = createNode(diagram);
    selectedNode = { diagramIndex, nodeId: node.id };
    selectedEdge = null;
    persistDiagramModels();
    renderDocument();
  }

  function wireChromeControls(toolbar) {
    for (const button of outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out")) {
      button.addEventListener("click", () => {
        const diagramIndex = Number(button.dataset.diagramIndex);
        const current = diagramZooms.get(diagramIndex) || 100;
        const direction = button.classList.contains("docdiagram-zoom-in") ? 25 : -25;
        diagramZooms.set(diagramIndex, clampZoom(current + direction));
        renderDocument();
      });
    }
    for (const button of outputElement.querySelectorAll(".docdiagram-fit")) {
      button.addEventListener("click", () => {
        diagramZooms.set(Number(button.dataset.diagramIndex), 100);
        renderDocument();
      });
    }

    for (const button of outputElement.querySelectorAll(".docdiagram-start-editing")) {
      button.addEventListener("click", () => {
        const diagramIndex = Number(button.closest(".docdiagram")?.dataset.diagramIndex);
        editSessionDiagram = parseDiagram(serializeDiagram(diagramModels[diagramIndex]));
        editingDiagramIndex = diagramIndex;
        clearEditorState();
        renderDocument();
      });
    }
    for (const button of outputElement.querySelectorAll(".docdiagram-done-editing")) {
      button.addEventListener("click", () => exitEditing(editingDiagramIndex, false));
    }
    for (const button of outputElement.querySelectorAll(".docdiagram-cancel-editing")) {
      button.addEventListener("click", () => exitEditing(editingDiagramIndex, true));
    }
    for (const button of outputElement.querySelectorAll(".docdiagram-create-node")) {
      button.addEventListener("click", () => createNewNode(Number(button.dataset.diagramIndex)));
    }
  }

  function buildNodeInspectorFields(diagram, node) {
    const grid = getGridSize(diagram);
    const style = getNodeEffectiveStyle(diagram, node);
    const width = Number(node.size?.width) || 190;
    const height = Number(node.size?.height) || 80;
    const minimumDimensions = getMinimumNodeDimensions(node.shape);
    const widthMinimum = grid ? Math.ceil(minimumDimensions.width / grid) * grid : minimumDimensions.width;
    const heightMinimum = grid ? Math.ceil(minimumDimensions.height / grid) * grid : minimumDimensions.height;
    const step = grid || 1;
    const palettes = nodeColorSchemes[documentColorScheme];
    const matchingPalette = Object.entries(palettes).find(([, palette]) =>
      [palette.light, palette.dark].some((preset) =>
        preset.fill.toLowerCase() === style.fill.toLowerCase() &&
        preset.stroke.toLowerCase() === style.stroke.toLowerCase() &&
        preset.text.toLowerCase() === style.text.toLowerCase()
      )
    );
    const matchingColour = node.palette?.colour || matchingPalette?.[0] || "blue";
    const matchingTone = node.palette?.tone || (matchingPalette && matchingPalette[1].light.fill.toLowerCase() === style.fill.toLowerCase()
      ? "light"
      : "dark");

    return [
      `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(node.label)}</textarea></label>`,
      `<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${escapeHtml(node.subtitle || "")}</textarea></label>`,
      `<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${matchingTone === "light" ? " selected" : ""}>Light</option><option value="dark"${matchingTone === "dark" ? " selected" : ""}>Dark</option></select></label>`,
      `<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${Object.entries(palettes).map(
        ([name, palette]) => `<option value="${name}"${name === matchingColour ? " selected" : ""}>${palette.label}</option>`
      ).join("")}</select></label>`,
      `<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${nodeShapes.map(
        (shape) => `<option value="${shape}"${shape === node.shape ? " selected" : ""}>${shape}</option>`
      ).join("")}</select></label>`,
      `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${escapeHtml(style.fill)}"></label>`,
      `<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke)}"></label>`,
      `<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(style.strokeWidth) || 2}" min="1" step="1"></label>`,
      `<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text)}"></label>`,
      `<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${width}" min="${widthMinimum}" step="${step}"></label>`,
      `<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${height}" min="${heightMinimum}" step="${step}"></label>`
    ].join("");
  }

  function buildEdgeInspectorFields(diagram, edge) {
    const style = getEdgeEffectiveStyle(diagram, edge);
    const strokeWidth = Number(style.strokeWidth) || 2;
    const route = edge.route || "orthogonal";
    const startMarkerStyle = getEdgeMarkerStyle(edge, "start");
    const endMarkerStyle = getEdgeMarkerStyle(edge, "end");

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
      `<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke)}"></label>`,
      `<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text)}"></label>`,
      `<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${strokeWidth}" min="1" step="1"></label>`
    ].join("");
  }

  function wireNodeInspector(container, diagramIndex, nodeId) {
    function withNode(mutate) {
      const diagram = diagramModels[diagramIndex];
      const node = diagram?.nodes.find((candidate) => candidate.id === nodeId);
      if (!diagram || !node) {
        return;
      }

      mutate(diagram, node);
      persistDiagramModels();
      renderDocument();
    }

    container.querySelector(".docdiagram-inspector-label").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeLabel(node, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-subtitle").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeSubtitle(node, event.target.value));
    });

    const toneSelect = container.querySelector(".docdiagram-inspector-tone");
    const colourSelect = container.querySelector(".docdiagram-inspector-colour");
    const applyColourPalette = () => {
      withNode((diagram, node) => setNodeColorPalette(node, toneSelect.value, colourSelect.value));
    };
    toneSelect.addEventListener("change", applyColourPalette);
    colourSelect.addEventListener("change", applyColourPalette);

    container.querySelector(".docdiagram-inspector-shape").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeShape(node, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-fill").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeStyleOverride(node, "fill", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-stroke").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeStyleOverride(node, "stroke", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-text").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeStyleOverride(node, "text", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-stroke-width").addEventListener("change", (event) => {
      withNode((diagram, node) => setStyleStrokeWidth(node, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-width").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeSize(diagram, node, "width", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-height").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeSize(diagram, node, "height", event.target.value));
    });
  }

  function wireEdgeInspector(container, diagramIndex, edgeIndex) {
    function withEdge(mutate) {
      const diagram = diagramModels[diagramIndex];
      const edge = diagram?.edges[edgeIndex];
      if (!diagram || !edge) {
        return;
      }

      mutate(diagram, edge);
      persistDiagramModels();
      renderDocument();
    }

    container.querySelector(".docdiagram-inspector-label").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeLabel(edge, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-route").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeRoute(edge, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-source-anchor").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeAnchor(edge, "source", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-target-anchor").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeAnchor(edge, "target", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-marker-start").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeMarkerStart(edge, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-marker-end").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeMarkerEnd(edge, event.target.value));
    });

    container.querySelector(".docdiagram-inspector-stroke").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeStyleOverride(edge, "stroke", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-text").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeStyleOverride(edge, "text", event.target.value));
    });

    container.querySelector(".docdiagram-inspector-stroke-width").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setStyleStrokeWidth(edge, event.target.value));
    });
  }

  function selectNode(diagramIndex, nodeId) {
    selectedNode = { diagramIndex, nodeId };
    selectedEdge = null;
    editingNode = null;
    editingEdge = null;
    renderDocument();
  }

  function selectEdge(diagramIndex, edgeIndex) {
    selectedEdge = { diagramIndex, edgeIndex };
    selectedNode = null;
    editingNode = null;
    editingEdge = null;
    renderDocument();
  }

  function clearSelection() {
    selectedNode = null;
    selectedEdge = null;
    editingNode = null;
    editingEdge = null;
    renderDocument();
  }

  function deleteSelected() {
    if (selectedNode) {
      const { diagramIndex, nodeId } = selectedNode;
      const diagram = diagramModels[diagramIndex];
      const attachedEdges = diagram?.edges.filter((edge) => edge.source === nodeId || edge.target === nodeId) || [];
      if (attachedEdges.length && !globalThis.confirm(`Delete this node and its ${attachedEdges.length} attached connector${attachedEdges.length === 1 ? "" : "s"}?`)) {
        return;
      }
      deleteNode(diagram, nodeId);
    } else if (selectedEdge) {
      deleteConnector(diagramModels[selectedEdge.diagramIndex], selectedEdge.edgeIndex);
    } else {
      return;
    }
    selectedNode = null;
    selectedEdge = null;
    editingNode = null;
    editingEdge = null;
    persistDiagramModels();
    renderDocument();
  }

  function saveInlineLabel(input) {
    const node = getSelectedNode();
    if (node) {
      setNodeLabel(node, input.value);
      persistDiagramModels();
    }

    editingNode = null;
    renderDocument();
  }

  function saveInlineEdgeLabel(input) {
    const edge = getSelectedEdge();
    if (edge) {
      setEdgeLabel(edge, input.value);
      persistDiagramModels();
    }

    editingEdge = null;
    renderDocument();
  }

  function svgPoint(svg, event) {
    const bounds = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;

    return {
      x: (event.clientX - bounds.left) * viewBox.width / bounds.width,
      y: (event.clientY - bounds.top) * viewBox.height / bounds.height
    };
  }

  function updateNodeSizeMarkup(group, node, width, height) {
    const x = Number(node.position?.x) || 0;
    const y = Number(node.position?.y) || 0;
    const nodeBody = group.querySelector(".docdiagram-node-body");
    const label = group.querySelector(".docdiagram-node-label");
    const subtitle = group.querySelector(".docdiagram-node-subtitle");
    const handle = group.querySelector(".docdiagram-resize-handle");
    const style = getNodeEffectiveStyle(diagramModels[Number(group.dataset.diagramIndex)], node);
    const geometry = getNodeGeometry(node, x, y, width, height);
    const layout = computeNodeTextLayout(geometry.textBounds, node);

    nodeBody.outerHTML = renderNodeBody(geometry, style, Number(style.strokeWidth) || 2);

    if (label) {
      label.setAttribute("x", layout.centerX);
      label.setAttribute("y", layout.labelStartY);
      for (const tspan of label.querySelectorAll("tspan")) {
        tspan.setAttribute("x", layout.centerX);
      }
    }

    if (subtitle) {
      subtitle.setAttribute("x", layout.centerX);
      subtitle.setAttribute("y", layout.subtitleStartY);
      for (const tspan of subtitle.querySelectorAll("tspan")) {
        tspan.setAttribute("x", layout.centerX);
      }
    }

    handle?.setAttribute("x", x + width - 7);
    handle?.setAttribute("y", y + height - 7);
  }

  function resizeNode(svg, event, group) {
    event.preventDefault();
    const diagramIndex = Number(group.dataset.diagramIndex);
    const nodeId = group.dataset.nodeId;
    const diagram = diagramModels[diagramIndex];
    const node = diagram.nodes.find((candidate) => candidate.id === nodeId);
    const start = svgPoint(svg, event);
    const origin = {
      width: Number(node.size?.width) || 190,
      height: Number(node.size?.height) || 80
    };
    const grid = getGridSize(diagram);
    let resized = false;

    if (event.isTrusted) {
      svg.setPointerCapture(event.pointerId);
    }

    function move(moveEvent) {
      const point = svgPoint(svg, moveEvent);
      let width = clampNodeSize(origin.width + point.x - start.x, minimumNodeSize.width, grid);
      let height = clampNodeSize(origin.height + point.y - start.y, minimumNodeSize.height, grid);

      if (node.shape === "circle") {
        const diameter = Math.max(width, height);
        width = diameter;
        height = diameter;
      }

      resized = resized || width !== origin.width || height !== origin.height;
      node.size = { ...node.size, width, height };
      updateNodeSizeMarkup(group, node, width, height);
    }

    function finish(finishEvent) {
      if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
        svg.releasePointerCapture(finishEvent.pointerId);
      }
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);

      if (resized) {
        expandCanvasForNode(diagram, node);
        selectedNode = { diagramIndex, nodeId };
        selectedEdge = null;
        editingNode = null;
        editingEdge = null;
        persistDiagramModels();
        renderDocument();
      }
    }

    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  function getNodePortPoint(node, anchor) {
    const bounds = getNodeBounds(node);
    return getNodeGeometry(node, bounds.x, bounds.y, bounds.width, bounds.height).anchors[anchor];
  }

  function addConnectionTargetPorts(svg, diagramIndex) {
    const diagram = diagramModels[diagramIndex];
    for (const node of diagram.nodes) {
      for (const anchor of edgeAnchors) {
        const point = getNodePortPoint(node, anchor);
        const port = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        port.setAttribute("class", "docdiagram-connection-port docdiagram-connection-target-port");
        port.dataset.nodeId = node.id;
        port.dataset.anchor = anchor;
        port.setAttribute("cx", point.x);
        port.setAttribute("cy", point.y);
        port.setAttribute("r", "7");
        svg.append(port);
      }
    }
  }

  function beginConnectionDrag(svg, event, drag) {
    event.preventDefault();
    event.stopPropagation();
    connectionDrag = { ...drag, current: svgPoint(svg, event), invalid: false };
    addConnectionTargetPorts(svg, drag.diagramIndex);
    const preview = document.createElementNS("http://www.w3.org/2000/svg", "path");
    preview.setAttribute("class", "docdiagram-connection-preview");
    svg.append(preview);

    if (event.isTrusted) {
      svg.setPointerCapture(event.pointerId);
    }

    function getDropPort(pointerEvent) {
      const hitPort = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY)
        ?.closest(".docdiagram-connection-port");
      if (hitPort) {
        return hitPort;
      }
      return [...svg.querySelectorAll(".docdiagram-connection-port")].find((port) => {
        const bounds = port.getBoundingClientRect();
        return pointerEvent.clientX >= bounds.left && pointerEvent.clientX <= bounds.right &&
          pointerEvent.clientY >= bounds.top && pointerEvent.clientY <= bounds.bottom;
      }) || null;
    }

    function move(moveEvent) {
      const point = svgPoint(svg, moveEvent);
      const candidate = getDropPort(moveEvent);
      connectionDrag.current = point;
      connectionDrag.invalid = !candidate;
      const targetAnchor = candidate?.dataset.anchor || connectionDrag.sourceAnchor;
      preview.setAttribute("d", buildEdgePath(
        connectionDrag.start,
        point,
        connectionDrag.sourceAnchor,
        targetAnchor,
        "straight"
      ).path);
      preview.classList.toggle("docdiagram-connection-invalid", connectionDrag.invalid);
    }

    function finish(finishEvent) {
      if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
        svg.releasePointerCapture(finishEvent.pointerId);
      }
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);

      const target = getDropPort(finishEvent);
      const dragState = connectionDrag;
      connectionDrag = null;
      if (target && dragState) {
        const diagram = diagramModels[dragState.diagramIndex];
        if (dragState.reconnect) {
          reconnectConnector(
            diagram.edges[dragState.edgeIndex],
            dragState.endpoint,
            target.dataset.nodeId || target.closest(".docdiagram-node")?.dataset.nodeId,
            target.dataset.anchor
          );
          selectedEdge = { diagramIndex: dragState.diagramIndex, edgeIndex: dragState.edgeIndex };
          selectedNode = null;
        } else {
          const targetNodeId = target.dataset.nodeId || target.closest(".docdiagram-node")?.dataset.nodeId;
          if (targetNodeId) {
            const edge = createConnector(
              diagram,
              dragState.sourceNodeId,
              dragState.sourceAnchor,
              targetNodeId,
              target.dataset.anchor
            );
            selectedEdge = { diagramIndex: dragState.diagramIndex, edgeIndex: diagram.edges.indexOf(edge) };
            selectedNode = null;
          }
        }
        persistDiagramModels();
      }
      renderDocument();
    }

    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  function isEdgeEditor(element) {
    return element.classList.contains("docdiagram-inline-editor-edge");
  }

  function commitInlineEditor(element) {
    if (isEdgeEditor(element)) {
      saveInlineEdgeLabel(element);
    } else {
      saveInlineLabel(element);
    }
  }

  function cancelInlineEditor(element) {
    if (isEdgeEditor(element)) {
      editingEdge = null;
    } else {
      editingNode = null;
    }
    renderDocument();
  }

  function beginCanvasPan(svg, event) {
    const frame = svg.closest(".docdiagram");
    if (!frame) {
      return;
    }

    event.preventDefault();
    const start = {
      clientX: event.clientX,
      clientY: event.clientY,
      scrollLeft: frame.scrollLeft,
      scrollTop: frame.scrollTop
    };
    frame.classList.add("docdiagram-panning");

    if (event.isTrusted) {
      svg.setPointerCapture(event.pointerId);
    }

    function move(moveEvent) {
      frame.scrollLeft = start.scrollLeft - (moveEvent.clientX - start.clientX);
      frame.scrollTop = start.scrollTop - (moveEvent.clientY - start.clientY);
    }

    function finish(finishEvent) {
      if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
        svg.releasePointerCapture(finishEvent.pointerId);
      }
      frame.classList.remove("docdiagram-panning");
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);
    }

    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  function enableCanvasPanning() {
    for (const svg of outputElement.querySelectorAll(".docdiagram svg")) {
      svg.addEventListener("pointerdown", (event) => {
        if (event.target === svg) {
          beginCanvasPan(svg, event);
        }
      });
    }
  }

  function enableSequenceSelection() {
    for (const svg of outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg')) {
      svg.addEventListener("click", (event) => {
        if (!isDiagramEditing(Number(svg.dataset.diagramIndex))) {
          return;
        }
        const participant = event.target.closest(".docdiagram-sequence-participant");
        const note = event.target.closest(".docdiagram-sequence-note");
        const message = event.target.closest(".docdiagram-sequence-message");
        if (participant) {
          selectedSequenceElement = {
            diagramIndex: Number(participant.dataset.diagramIndex),
            kind: "participant",
            id: participant.dataset.participantId
          };
        } else if (note) {
          selectedSequenceElement = {
            diagramIndex: Number(note.dataset.diagramIndex),
            kind: "note",
            index: Number(note.dataset.noteIndex)
          };
        } else if (message) {
          selectedSequenceElement = {
            diagramIndex: Number(message.dataset.diagramIndex),
            kind: "message",
            index: Number(message.dataset.messageIndex)
          };
        } else {
          selectedSequenceElement = null;
        }
        selectedNode = null;
        selectedEdge = null;
        renderDocument();
      });
    }
  }

  function enableEditing() {
    for (const svg of outputElement.querySelectorAll(".docdiagram svg")) {
      if (!isDiagramEditing(Number(svg.dataset.diagramIndex))) {
        continue;
      }
      svg.addEventListener("click", (event) => {
        if (event.target.closest(".docdiagram-inline-editor")) {
          return;
        }

        const group = event.target.closest(".docdiagram-node");
        if (group) {
          selectNode(Number(group.dataset.diagramIndex), group.dataset.nodeId);
          return;
        }

        const edgeGroup = event.target.closest(".docdiagram-edge-group");
        if (edgeGroup) {
          const diagramIndex = Number(edgeGroup.dataset.diagramIndex);
          const edgeIndex = Number(edgeGroup.dataset.edgeIndex);
          const alreadySelected = selectedEdge?.diagramIndex === diagramIndex && selectedEdge.edgeIndex === edgeIndex;
          const alreadyEditing = editingEdge?.diagramIndex === diagramIndex && editingEdge.edgeIndex === edgeIndex;

          if (alreadySelected && !alreadyEditing) {
            editingEdge = { diagramIndex, edgeIndex };
            renderDocument();
          } else {
            selectEdge(diagramIndex, edgeIndex);
          }
          return;
        }

        if (selectedNode || selectedEdge) {
          clearSelection();
        }
      });

      svg.addEventListener("pointerdown", (event) => {
        const port = event.target.closest(".docdiagram-connection-port");
        if (port) {
          const group = port.closest(".docdiagram-node");
          const diagramIndex = Number(group?.dataset.diagramIndex ?? svg.dataset.diagramIndex);
          const nodeId = port.dataset.nodeId || group?.dataset.nodeId;
          const node = diagramModels[diagramIndex].nodes.find((candidate) => candidate.id === nodeId);
          if (node) {
            beginConnectionDrag(svg, event, {
              diagramIndex,
              sourceNodeId: nodeId,
              sourceAnchor: port.dataset.anchor,
              start: getNodePortPoint(node, port.dataset.anchor)
            });
          }
          return;
        }

        const endpoint = event.target.closest(".docdiagram-edge-endpoint");
        if (endpoint) {
          const diagramIndex = Number(endpoint.dataset.diagramIndex);
          const edgeIndex = Number(endpoint.dataset.edgeIndex);
          const edge = diagramModels[diagramIndex].edges[edgeIndex];
          const endpointName = endpoint.dataset.endpoint;
          const node = diagramModels[diagramIndex].nodes.find((candidate) => candidate.id === edge[endpointName]);
          beginConnectionDrag(svg, event, {
            diagramIndex,
            edgeIndex,
            endpoint: endpointName,
            reconnect: true,
            sourceAnchor: edge[`${endpointName}Anchor`],
            start: getNodePortPoint(node, edge[`${endpointName}Anchor`])
          });
          return;
        }

        const resizeHandle = event.target.closest(".docdiagram-resize-handle");
        if (resizeHandle) {
          resizeNode(svg, event, resizeHandle.closest(".docdiagram-node"));
          return;
        }

        if (event.target.closest(".docdiagram-inline-editor")) {
          return;
        }

        const group = event.target.closest(".docdiagram-node");
        if (!group) {
          return;
        }

        event.preventDefault();
        const diagramIndex = Number(group.dataset.diagramIndex);
        const nodeId = group.dataset.nodeId;
        const node = diagramModels[diagramIndex].nodes.find((candidate) => candidate.id === nodeId);
        const start = svgPoint(svg, event);
        const origin = {
          x: Number(node.position?.x) || 0,
          y: Number(node.position?.y) || 0
        };
        const grid = getGridSize(diagramModels[diagramIndex]);
        let moved = false;

        if (event.isTrusted) {
          svg.setPointerCapture(event.pointerId);
        }

        function move(moveEvent) {
          const point = svgPoint(svg, moveEvent);
          const x = snapToGrid(origin.x + point.x - start.x, grid);
          const y = snapToGrid(origin.y + point.y - start.y, grid);

          moved = moved || x !== origin.x || y !== origin.y;
          group.setAttribute("transform", `translate(${x - origin.x} ${y - origin.y})`);
          node.position = { ...node.position, x, y };
        }

        function finish(finishEvent) {
          if (finishEvent.isTrusted && svg.hasPointerCapture(finishEvent.pointerId)) {
            svg.releasePointerCapture(finishEvent.pointerId);
          }
          svg.removeEventListener("pointermove", move);
          svg.removeEventListener("pointerup", finish);
          svg.removeEventListener("pointercancel", finish);

          if (moved) {
            expandCanvasForNode(diagramModels[diagramIndex], node);
            selectedNode = { diagramIndex, nodeId };
            selectedEdge = null;
            editingNode = null;
            editingEdge = null;
            persistDiagramModels();
            renderDocument();
          } else if (selectedNode?.diagramIndex === diagramIndex && selectedNode.nodeId === nodeId) {
            editingNode = { diagramIndex, nodeId };
            renderDocument();
          } else {
            selectNode(diagramIndex, nodeId);
          }
        }

        svg.addEventListener("pointermove", move);
        svg.addEventListener("pointerup", finish);
        svg.addEventListener("pointercancel", finish);
      });
    }

    for (const editor of outputElement.querySelectorAll(".docdiagram-inline-editor")) {
      let settled = false;

      const commit = () => {
        if (settled) {
          return;
        }
        settled = true;
        commitInlineEditor(editor);
      };

      const cancel = () => {
        if (settled) {
          return;
        }
        settled = true;
        cancelInlineEditor(editor);
      };

      editor.addEventListener("pointerdown", (event) => event.stopPropagation());
      editor.addEventListener("click", (event) => event.stopPropagation());
      editor.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          commit();
        } else if (event.key === "Escape") {
          event.preventDefault();
          cancel();
        }
      });
      editor.addEventListener("blur", commit, { once: true });
      editor.focus();
      editor.select();
    }

    if (!outputElement.dataset.deleteShortcutBound) {
      outputElement.dataset.deleteShortcutBound = "true";
      document.addEventListener("keydown", (event) => {
        if (editingDiagramIndex === null || (event.key !== "Delete" && event.key !== "Backspace")) {
          return;
        }
        if (event.target.matches("input, textarea, select, [contenteditable]")) {
          return;
        }
        if (selectedNode || selectedEdge) {
          event.preventDefault();
          deleteSelected();
        }
      });
    }
  }

  function downloadDocument() {
    flushSourceEditorRender();
    if (sourceEditorError && sourceEditorDraft !== getSource() &&
      !globalThis.confirm("Source has errors. Save the last valid version instead?")) {
      return;
    }
    const copy = document.documentElement.cloneNode(true);
    const sourceCopy = copy.querySelector("#source");
    const toolbar = copy.querySelector(".docdiagram-toolbar");
    const sourceTray = copy.querySelector(".docdiagram-source-tray");
    const output = copy.querySelector("#rendered-document");

    sourceCopy.content.replaceChildren(document.createTextNode(getSource()));
    toolbar?.remove();
    sourceTray?.remove();
    output.replaceChildren();

    const blob = new Blob([`<!doctype html>\n${copy.outerHTML}`], {
      type: "text/html;charset=utf-8"
    });
    const link = document.createElement("a");
    const title = document.title.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");

    link.href = URL.createObjectURL(blob);
    link.download = `${title || "document"}-edited.html`;
    link.click();
    URL.revokeObjectURL(link.href);
    savedSource = getSource();
  }

  function applyPageTheme(theme) {
    document.documentElement.dataset.docdiagramTheme = theme;
    if (document.body) {
      document.body.dataset.docdiagramTheme = theme;
    }
  }

  function removeToolbarChrome() {
    while (outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar")) {
      outputElement.previousElementSibling.remove();
    }
  }

  function closeDocumentMenu() {
    const menu = document.querySelector(".docdiagram-menu");
    const toggle = document.querySelector(".docdiagram-menu-toggle");
    if (!menu || !toggle) {
      return;
    }
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function renderDocument(source = getSource(), { preserveOnError = false } = {}) {
    const scrollPositions = new Map(
      [...outputElement.querySelectorAll(".docdiagram")].map((diagram) => [
        Number(diagram.dataset.diagramIndex),
        { left: diagram.scrollLeft, top: diagram.scrollTop }
      ])
    );
    const pageScroll = { x: globalThis.scrollX || 0, y: globalThis.scrollY || 0 };
    const previousModels = [...diagramModels];
    const previousTheme = documentTheme;
    const previousColorScheme = documentColorScheme;
    diagramModels.length = 0;
    let parsedDocument;
    let markup;
    try {
      parsedDocument = preserveOnError ? validateDocumentSource(source) : resolveDocument(source);
      documentTheme = parsedDocument.theme;
      documentColorScheme = parsedDocument.colourScheme;
      markup = renderMarkdown(parsedDocument.content);
    } catch (error) {
      diagramModels.length = 0;
      diagramModels.push(...previousModels);
      if (preserveOnError) {
        documentTheme = previousTheme;
        documentColorScheme = previousColorScheme;
        sourceEditorError = error.message;
        updateSourceEditorStatus();
        return false;
      }
      applyPageTheme(documentTheme);
      removeToolbarChrome();
      outputElement.innerHTML = `<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
      createSourceEditorTray();
      return false;
    }

    setSource(source);
    sourceEditorError = "";
    outputElement.dataset.theme = documentTheme;
    outputElement.dataset.format = documentFormat;
    applyPageTheme(documentTheme);
    outputElement.innerHTML = markup;
    removeToolbarChrome();
    createToolbar();
    createSourceEditorTray();
    enableCanvasPanning();
    enableSequenceSelection();

    if (editingDiagramIndex !== null) {
      enableEditing();
    }

    for (const diagram of outputElement.querySelectorAll(".docdiagram")) {
      const position = scrollPositions.get(Number(diagram.dataset.diagramIndex));
      if (position) {
        diagram.scrollLeft = position.left;
        diagram.scrollTop = position.top;
      }
    }
    globalThis.scrollTo?.(pageScroll.x, pageScroll.y);
    return true;
  }

  function injectStyles() {
    const styles = document.createElement("style");
    styles.textContent = `
      html,
      body {
        margin: 0;
        min-height: 100%;
      }
      html[data-docdiagram-theme="light"],
      body[data-docdiagram-theme="light"] {
        background: #ffffff;
        color: #17202a;
      }
      html[data-docdiagram-theme="dark"],
      body[data-docdiagram-theme="dark"] {
        background: #17202a;
        color: #f3f8fc;
      }
      #rendered-document {
        background: var(--docdiagram-background);
        box-sizing: border-box;
        color: var(--docdiagram-text);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.55;
        margin: 0 auto;
        max-width: 1100px;
        padding: 2rem;
      }
      #rendered-document[data-format="full-width"] {
        margin: 0;
        max-width: none;
      }
      #rendered-document[data-source-editor-open="true"] {
        padding-bottom: calc(2rem + var(--docdiagram-source-tray-height, 0px));
      }
      #rendered-document pre {
        background: var(--docdiagram-code-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 8px;
        overflow: auto;
        padding: 1rem;
      }
      #rendered-document :not(pre) > code {
        background: var(--docdiagram-code-background);
        border-radius: 4px;
        font-size: .9em;
        padding: .12em .3em;
      }
      #rendered-document blockquote {
        border-left: 4px solid var(--docdiagram-border);
        color: var(--docdiagram-muted);
        margin-left: 0;
        padding-left: 1rem;
      }
      #rendered-document hr {
        border: 0;
        border-top: 1px solid var(--docdiagram-border);
        margin: 2rem 0;
      }
      #rendered-document a {
        color: inherit;
        text-decoration-thickness: .1em;
        text-underline-offset: .15em;
      }
      #rendered-document img {
        height: auto;
        max-width: 100%;
      }
      #rendered-document table {
        border-collapse: collapse;
        display: block;
        max-width: 100%;
        overflow-x: auto;
        white-space: nowrap;
      }
      #rendered-document th,
      #rendered-document td {
        border: 1px solid var(--docdiagram-border);
        padding: .55rem .75rem;
      }
      #rendered-document th {
        background: var(--docdiagram-code-background);
        font-weight: 600;
      }
      #rendered-document .docdiagram-task-list-item {
        list-style: none;
      }
      #rendered-document .docdiagram-task-list-item input {
        accent-color: currentColor;
        margin: 0 .45rem 0 0;
      }
      #rendered-document .docdiagram-component {
        background: var(--docdiagram-component-fill, var(--docdiagram-code-background));
        border: 1px solid var(--docdiagram-component-stroke, var(--docdiagram-border));
        border-radius: 8px;
        color: var(--docdiagram-component-text, var(--docdiagram-text));
        margin: 1rem 0;
        padding: 1rem;
      }
      #rendered-document .docdiagram-section:not(.docdiagram-component-styled) {
        background: transparent;
      }
      #rendered-document .docdiagram-component-title {
        font-size: 1.1em;
        font-weight: 700;
        margin-bottom: .5rem;
      }
      #rendered-document .docdiagram-component > :last-child {
        margin-bottom: 0;
      }
      #rendered-document .docdiagram-component a {
        color: inherit;
      }
      #rendered-document .docdiagram-component :not(pre) > code {
        background: transparent;
        border: 1px solid currentColor;
      }
      #rendered-document .docdiagram-component pre,
      #rendered-document .docdiagram-component th {
        background: transparent;
        border-color: currentColor;
        color: inherit;
      }
      #rendered-document .docdiagram-component blockquote {
        border-color: currentColor;
        color: inherit;
      }
      #rendered-document .docdiagram-callout {
        border-left-width: 4px;
      }
      #rendered-document .docdiagram-callout-kind {
        font-size: .78em;
        font-weight: 700;
        letter-spacing: .06em;
        margin-bottom: .35rem;
        text-transform: uppercase;
      }
      #rendered-document .docdiagram-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: var(--docdiagram-grid-columns);
        margin: 1rem 0;
      }
      #rendered-document .docdiagram-grid-item > .docdiagram-component,
      #rendered-document .docdiagram-grid-item > .docdiagram-stack {
        margin: 0;
      }
      #rendered-document .docdiagram-grid-item > .docdiagram-component {
        box-sizing: border-box;
        height: 100%;
      }
      #rendered-document .docdiagram-stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      #rendered-document .docdiagram-stack > * {
        margin: 0;
      }
      #rendered-document .docdiagram-literal-source {
        margin: 1rem 0;
      }
      @media (max-width: 700px) {
        #rendered-document .docdiagram-grid {
          grid-template-columns: 1fr;
        }
      }
      #rendered-document[data-theme="light"],
      .docdiagram-toolbar[data-theme="light"],
      .docdiagram-source-tray[data-theme="light"] {
        --docdiagram-background: #ffffff;
        --docdiagram-border: #dce3ea;
        --docdiagram-control-background: #ffffff;
        --docdiagram-control-hover: #eef4f8;
        --docdiagram-code-background: #f5f8fa;
        --docdiagram-text: #17202a;
        --docdiagram-muted: #52616b;
      }
      #rendered-document[data-theme="dark"],
      .docdiagram-toolbar[data-theme="dark"],
      .docdiagram-source-tray[data-theme="dark"] {
        --docdiagram-background: #17202a;
        --docdiagram-border: #3b5263;
        --docdiagram-control-background: #263947;
        --docdiagram-control-hover: #344c5d;
        --docdiagram-code-background: #101a22;
        --docdiagram-text: #f3f8fc;
        --docdiagram-muted: #c5d5e5;
      }
      .docdiagram-toolbar {
        align-items: center;
        background: var(--docdiagram-background);
        color: var(--docdiagram-text);
        display: flex;
        justify-content: flex-end;
        margin: 0;
        max-width: 1100px;
        padding: .5rem 2rem;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 40;
      }
      .docdiagram-toolbar[data-format="full-width"] {
        margin-left: 0;
        margin-right: 0;
        max-width: none;
      }
      .docdiagram-toolbar button,
      .docdiagram-toolbar input,
      .docdiagram-toolbar select {
        background: var(--docdiagram-control-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 6px;
        color: var(--docdiagram-text);
        font: inherit;
        padding: .45rem .65rem;
      }
      .docdiagram-toolbar button {
        cursor: pointer;
      }
      .docdiagram-toolbar button:hover {
        background: var(--docdiagram-control-hover);
      }
      .docdiagram-toolbar button:disabled {
        cursor: not-allowed;
        opacity: .6;
      }
      .docdiagram-menu {
        background: var(--docdiagram-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
        display: flex;
        flex-direction: column;
        gap: .6rem;
        padding: .75rem;
        position: absolute;
        right: 2rem;
        top: calc(100% + .25rem);
        z-index: 20;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
      }
      .docdiagram-menu[hidden] {
        display: none;
      }
      .docdiagram-source-tray {
        background: var(--docdiagram-background);
        border: 1px solid var(--docdiagram-border);
        border-bottom: 0;
        box-shadow: 0 -4px 16px rgb(21 41 62 / 20%);
        box-sizing: border-box;
        color: var(--docdiagram-text);
        display: flex;
        flex-direction: column;
        height: min(42vh, 32rem);
        min-height: 12rem;
        padding: .75rem 1rem 1rem;
        position: fixed;
        resize: vertical;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 40;
        font-family: Arial, Helvetica, sans-serif;
      }
      .docdiagram-source-header {
        align-items: center;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        margin-bottom: .5rem;
      }
      .docdiagram-source-shortcut {
        color: var(--docdiagram-muted);
        font-size: .8rem;
        margin-left: .75rem;
      }
      .docdiagram-source-close {
        background: var(--docdiagram-control-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 6px;
        color: var(--docdiagram-text);
        cursor: pointer;
        font: inherit;
        padding: .35rem .55rem;
      }
      .docdiagram-source-label {
        display: flex;
        flex: 1;
        flex-direction: column;
        font-size: .85rem;
        gap: .35rem;
        min-height: 0;
      }
      .docdiagram-source-editor {
        background: var(--docdiagram-code-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 6px;
        box-sizing: border-box;
        color: var(--docdiagram-text);
        flex: 1;
        font: .85rem/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        min-height: 0;
        padding: .65rem;
        resize: none;
        width: 100%;
      }
      .docdiagram-source-status,
      .docdiagram-source-error {
        font-size: .8rem;
        margin: .45rem 0 0;
      }
      .docdiagram-source-status {
        color: var(--docdiagram-muted);
      }
      .docdiagram-source-error {
        color: #c2410c;
      }
      .docdiagram-theme-control {
        align-items: center;
        color: var(--docdiagram-muted);
        display: flex;
        font-size: .9rem;
        gap: .75rem;
        justify-content: space-between;
      }
      .docdiagram-inspector {
        background: var(--docdiagram-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
        display: flex;
        flex-direction: column;
        gap: .6rem;
        max-height: calc(100vh - 5.5rem);
        overflow-y: auto;
        padding: 1rem;
        position: fixed;
        right: 1rem;
        top: 1rem;
        width: min(19rem, calc(100vw - 2rem));
        z-index: 30;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
      }
      .docdiagram-field {
        align-items: center;
        color: var(--docdiagram-muted);
        display: flex;
        flex-direction: row;
        font-size: .9rem;
        gap: .75rem;
        justify-content: space-between;
        width: 100%;
      }
      .docdiagram-field-wide {
        width: 100%;
      }
      .docdiagram-field input,
      .docdiagram-field select,
      .docdiagram-field textarea {
        background: var(--docdiagram-control-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 6px;
        color: var(--docdiagram-text);
        font-size: .85rem;
        padding: .3rem .4rem;
      }
      .docdiagram-field select,
      .docdiagram-field input:not([type="color"]) {
        min-width: 9rem;
      }
      .docdiagram-field input[type="color"] {
        height: 1.9rem;
        padding: 2px;
        width: 2.6rem;
      }
      .docdiagram-field input[type="number"] {
        width: 4.6rem;
      }
      .docdiagram-inspector-textarea {
        box-sizing: border-box;
        font-family: inherit;
        min-height: 2.4rem;
        resize: vertical;
        width: 100%;
      }
      .docdiagram {
        background: var(--docdiagram-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 12px;
        box-shadow: 0 2px 8px rgb(21 41 62 / 8%);
        margin: 1.5rem 0;
        height: min(70vh, 42rem);
        overflow: auto;
        padding: 1rem;
        position: relative;
      }
      .docdiagram-panning svg {
        cursor: grabbing;
      }
      .docdiagram-diagram-toolbar {
        display: flex;
        gap: .35rem;
        justify-content: flex-end;
        margin-bottom: .5rem;
        box-sizing: border-box;
        left: 0;
        position: sticky;
        right: 0;
        top: 0;
        width: 100%;
        z-index: 10;
      }
      .docdiagram-icon-button {
        background: var(--docdiagram-control-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 6px;
        color: var(--docdiagram-text);
        cursor: pointer;
        font: inherit;
        height: 2rem;
        padding: 0;
        width: 2rem;
      }
      .docdiagram-icon-button:hover {
        background: var(--docdiagram-control-hover);
      }
      .docdiagram svg {
        display: block;
      }
      .docdiagram-edge {
        fill: none;
      }
      .docdiagram-edge-hit {
        fill: none;
      }
      .docdiagram-edge-group {
        cursor: default;
      }
      .docdiagram[data-editing="true"] .docdiagram-edge-group {
        cursor: pointer;
      }
      .docdiagram[data-editing="true"] .docdiagram-edge-group:has(.docdiagram-inline-editor) {
        cursor: text;
      }
      .docdiagram-edge-selected .docdiagram-edge {
        filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
      }
      .docdiagram-edge-label {
        filter: drop-shadow(0 0 4px var(--docdiagram-background));
        font-size: 15px;
      }
      .docdiagram-node-selected .docdiagram-node-body {
        filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
      }
      .docdiagram-resize-handle {
        cursor: nwse-resize;
        fill: #ffffff;
        stroke: #3574c7;
        stroke-width: 2;
      }
      .docdiagram-connection-port,
      .docdiagram-edge-endpoint {
        cursor: crosshair;
        fill: #ffffff;
        stroke: #3574c7;
        stroke-width: 2;
      }
      .docdiagram-connection-target-port {
        fill: #eaf2ff;
      }
      .docdiagram-connection-preview {
        fill: none;
        pointer-events: none;
        stroke: #3574c7;
        stroke-dasharray: 6 4;
        stroke-width: 2;
      }
      .docdiagram-connection-preview.docdiagram-connection-invalid {
        stroke: #d53f3f;
      }
      .docdiagram-node {
        cursor: default;
      }
      .docdiagram[data-editing="true"] .docdiagram-node {
        cursor: grab;
      }
      #rendered-document .docdiagram svg {
        cursor: grab;
      }
      .docdiagram[data-editing="true"] .docdiagram-node:has(.docdiagram-inline-editor) {
        cursor: text;
      }
      .docdiagram-node-label {
        font-size: 16px;
        font-weight: 650;
      }
      .docdiagram-node-subtitle {
        font-size: 13px;
      }
      .docdiagram-inline-editor {
        box-sizing: border-box;
        border: 1px solid #3574c7;
        border-radius: 4px;
        font: 650 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        padding: 4px 6px;
        resize: none;
        text-align: center;
        width: 100%;
      }
      .docdiagram-inline-editor-node {
        height: 100%;
      }
      .docdiagram-inline-editor-edge {
        font-size: 14px;
        font-weight: 500;
        height: 100%;
      }
      .docdiagram-error {
        background: #fff0f0;
        border: 1px solid #d53f3f;
        border-radius: 8px;
        color: #8b1c1c;
        margin: 1rem 0;
        padding: 1rem;
      }
    `;
    document.head.append(styles);
  }

  globalThis.DocDiagramCore = {
    diagramThemes,
    nodeColorSchemes,
    supportedDiagramTypes,
    nodeColorPalettes,
    nodeShapes,
    edgeAnchors,
    edgeRoutes,
    edgeMarkerStyles,
    getTheme,
    getGridSize,
    expandCanvasForNode,
    createUniqueNodeId,
    getDefaultNodePosition,
    createNode,
    createConnector,
    reconnectConnector,
    deleteConnector,
    deleteNode,
    getNodeEffectiveStyle,
    getEdgeEffectiveStyle,
    getEdgeMarkerStyle,
    getEdgeMarkerDimensions,
    parseDiagram,
    parseDocumentFrontmatter,
    resolveDocument,
    setFrontmatterTheme,
    isSafeUrl,
    renderInline,
    renderMarkdown,
    renderDiagram,
    snapToGrid,
    clampNodeSize,
    serializeDiagram,
    setNodeLabel,
    setNodeShape,
    setNodeSubtitle,
    setNodeStyleOverride,
    setNodeColorPalette,
    setNodeSize,
    setEdgeLabel,
    setEdgeRoute,
    setEdgeAnchor,
    setEdgeStyleOverride,
    setStyleStrokeWidth,
    setEdgeMarkerStart,
    setEdgeMarkerEnd,
    validateDocumentSource,
    findSourceTextRange,
    scrollSourceEditorToRange,
    splitTextLines,
    renderTextBlock,
    computeNodeTextLayout,
    getNodeGeometry,
    renderNodeBody,
    buildEdgePath,
    buildEdgeInspectorFields,
    clampZoom
  };

  if (sourceElement && outputElement) {
    injectStyles();
    savedSource = getSource();
    globalThis.addEventListener("beforeunload", (event) => {
      const hasUncommittedSourceDraft = sourceEditorOpen && sourceEditorDraft !== getSource();
      if (!isDirty() && !hasUncommittedSourceDraft) {
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    });
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "e" &&
        (sourceEditorOpen || !isEditableElement(event.target))) {
        event.preventDefault();
        sourceEditorOpen ? closeSourceEditor() : openSourceEditor();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        downloadDocument();
        return;
      }
      if (event.key === "Escape") {
        closeDocumentMenu();
      }
    });
    document.addEventListener("pointerdown", (event) => {
      const toolbar = document.querySelector(".docdiagram-toolbar");
      if (toolbar && !toolbar.contains(event.target)) {
        closeDocumentMenu();
      }
    });
    outputElement.addEventListener("dblclick", (event) => {
      if (event.target.closest("button, input, textarea, select, [contenteditable]")) {
        return;
      }

      revealSourceText(globalThis.getSelection?.().toString() || "");
    });
    renderDocument();
  }
}());

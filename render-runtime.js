(function () {

  "use strict";

  const sourceElement = document.querySelector("#source");
  const outputElement = document.querySelector("#rendered-document");
  const diagramModels = [];
  let editMode = false;
  let selectedNode = null;
  let selectedEdge = null;
  let editingNode = null;
  let editingEdge = null;
  let connectionDrag = null;
  let documentTheme = "light";
  let documentColorScheme = "classic";
  let documentFormat = "centered";
  let savedSource = "";
  let editSessionSource = null;
  const diagramZooms = new Map();
  const minimumNodeSize = { width: 120, height: 60 };
  const defaultNode = {
    type: "application",
    shape: "rounded-rectangle",
    label: "New node",
    width: 190,
    height: 80
  };
  const nodeTypes = ["application", "service", "datastore", "note"];
  const nodeShapes = [
    "rounded-rectangle",
    "circle",
    "oval",
    "database",
    "diamond",
    "rhombus",
    "flattened-hexagon",
    "chevron",
    "right-chevron"
  ];
  const edgeAnchors = ["top", "right", "bottom", "left"];
  const edgeRoutes = ["orthogonal", "straight", "curved"];
  const edgeMarkerStyles = ["none", "arrow", "circle"];
  const edgeMarkerDefaults = { start: "none", end: "arrow" };
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
      node: {
        application: { fill: "#EAF2FF", stroke: "#3574C7", strokeWidth: 2, text: "#17202A" },
        service: { fill: "#E9F8F0", stroke: "#24824A", strokeWidth: 2, text: "#17202A" },
        datastore: { fill: "#F7F1FF", stroke: "#7A4CC2", strokeWidth: 2, text: "#17202A" },
        note: { fill: "#FFF8DF", stroke: "#9B7B00", strokeWidth: 2, text: "#17202A" }
      }
    },
    dark: {
      edge: { stroke: "#B8C7D5", strokeWidth: 2, text: "#D9E4ED" },
      node: {
        application: { fill: "#193A61", stroke: "#71AEF7", strokeWidth: 2, text: "#F3F8FC" },
        service: { fill: "#164A38", stroke: "#66D39A", strokeWidth: 2, text: "#F3F8FC" },
        datastore: { fill: "#3D285D", stroke: "#B796FF", strokeWidth: 2, text: "#F3F8FC" },
        note: { fill: "#594819", stroke: "#F1CC58", strokeWidth: 2, text: "#F3F8FC" }
      }
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
      const entries = trimmed.slice(1, -1).split(",");
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

  function parseDiagram(source) {
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const diagram = { canvas: {}, nodes: [], edges: [] };
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
          if (key !== "canvas" && key !== "nodes" && key !== "edges") {
            throw new Error(`Unsupported diagram section: ${key}`);
          }

          collection = key;
          continue;
        }

        diagram[key] = parseScalar(value);
        collection = null;
        continue;
      }

      if (indent === 2 && itemMatch && (collection === "nodes" || collection === "edges")) {
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

    validateDiagram(diagram);
    return diagram;
  }

  function validateDiagram(diagram) {
    for (const node of diagram.nodes) {
      if (!node.shape) {
        throw new Error(`Node "${node.id || node.label || "unknown"}" requires a shape.`);
      }

      if (!nodeShapes.includes(node.shape)) {
        throw new Error(`Unsupported node shape: ${node.shape}`);
      }

      if (node.palette) {
        const palette = getNodeColorPalette(documentColorScheme, node.palette.tone, node.palette.colour);
        if (!palette) {
          throw new Error(`Unsupported node palette: ${node.palette.tone || "unknown"} ${node.palette.colour || "unknown"}`);
        }
      }

      if (node.style?.width !== undefined) {
        throw new Error("Node style.width is not supported; use style.strokeWidth.");
      }
    }

    for (const edge of diagram.edges) {
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

      if (edge.style?.width !== undefined) {
        throw new Error("Edge style.width is not supported; use style.strokeWidth.");
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
    const defaults = theme.node[node.type] || theme.node.application;
    const palette = node.palette
      ? getNodeColorPalette(documentColorScheme, node.palette.tone, node.palette.colour)
      : null;
    return mergeStyle(mergeStyle(defaults, palette), node.style);
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
      type: defaultNode.type,
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
    const inset = Math.min(nodeWidth, nodeHeight) * 0.2;
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

  function renderDiagram(source, diagramIndex) {
    let diagram;

    try {
      diagram = parseDiagram(source);
    } catch (error) {
      return `<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
    }

    let theme;
    try {
      theme = getTheme(diagram);
    } catch (error) {
      return `<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
    }

    diagramModels[diagramIndex] = diagram;
    const width = Number(diagram.canvas.width) || 1000;
    const height = Number(diagram.canvas.height) || 560;
    const nodes = new Map();

    for (const node of diagram.nodes) {
      if (!node.id || !node.label) {
        return `<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>Every node requires an id and label.</section>`;
      }

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

      // Every edge gets its own marker id (scoped by diagram/edge index) so per-edge stroke
      // overrides never leak into another edge's arrowhead/circle, and only non-"none" endpoints
      // get a marker def + marker-start/marker-end attribute at all.
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

      if (isSelected && editMode) {
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
        isSelected && editMode && !isEditing
          ? `<rect class="docdiagram-resize-handle" x="${x + nodeWidth - 7}" y="${y + nodeHeight - 7}" width="14" height="14" rx="3"/>`
          : "",
        isSelected && editMode && !isEditing
          ? edgeAnchors.map((anchor) => {
            const point = geometry.anchors[anchor];
            return `<circle class="docdiagram-connection-port" data-anchor="${anchor}" cx="${point.x}" cy="${point.y}" r="7" aria-label="${anchor} connection port"/>`;
          }).join("")
          : "",
        `</g>`
      ].join("");
    }).join("");

    return [
      `<figure class="docdiagram" data-diagram-index="${diagramIndex}">`,
      `<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">`,
      `<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${diagramIndex}" aria-label="Zoom in" title="Zoom in">+</button>`,
      `<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${diagramIndex}" aria-label="Zoom out" title="Zoom out">−</button>`,
      `<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${diagramIndex}" aria-label="Zoom to fit" title="Zoom to fit">⊡</button>`,
      editMode
        ? `<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">✓</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">×</button><button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${diagramIndex}" aria-label="New node" title="New node">+</button>`
        : `<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">✎</button>`,
      `</div>`,
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

  function renderMarkdown(source) {
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const output = [];
    let paragraph = [];
    let listItems = [];
    let codeBlock = null;
    let diagramIndex = 0;

    function flushParagraph() {
      if (paragraph.length) {
        output.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    }

    function flushList() {
      if (listItems.length) {
        output.push(`<ul>${listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
        listItems = [];
      }
    }

    for (const line of lines) {
      const fenceMatch = line.match(/^```([\w-]*)\s*$/);

      if (fenceMatch) {
        flushParagraph();
        flushList();

        if (codeBlock) {
          if (codeBlock.language === "diagram") {
            output.push(renderDiagram(codeBlock.lines.join("\n"), diagramIndex));
            diagramIndex += 1;
          } else {
            output.push(`<pre><code>${escapeHtml(codeBlock.lines.join("\n"))}</code></pre>`);
          }
          codeBlock = null;
        } else {
          codeBlock = { language: fenceMatch[1], lines: [] };
        }
        continue;
      }

      if (codeBlock) {
        codeBlock.lines.push(line);
        continue;
      }

      if (!line.trim()) {
        flushParagraph();
        flushList();
        continue;
      }

      const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        const level = headingMatch[1].length;
        output.push(`<h${level}>${escapeHtml(headingMatch[2])}</h${level}>`);
        continue;
      }

      const listMatch = line.match(/^-\s+(.+)$/);
      if (listMatch) {
        flushParagraph();
        listItems.push(listMatch[1]);
        continue;
      }

      paragraph.push(line.trim());
    }

    if (codeBlock) {
      output.push(`<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>`);
    }

    flushParagraph();
    flushList();
    return output.join("");
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
    const lines = [];

    for (const [key, value] of Object.entries(diagram)) {
      if (key === "canvas" || key === "nodes" || key === "edges") {
        continue;
      }
      lines.push(`${key}: ${formatScalar(value)}`);
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

  function setNodeLabel(node, label) {
    node.label = String(label).trim() || node.label;
    return node;
  }

  function setNodeType(node, type) {
    node.type = type;
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
    node.style = {
      ...style
    };
    node.palette = { tone, colour };
    return node;
  }

  function setNodeSize(diagram, node, dimension, rawValue) {
    const grid = getGridSize(diagram);
    const minimum = dimension === "width" ? minimumNodeSize.width : minimumNodeSize.height;
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
    toolbar.dataset.editing = String(editMode);
    toolbar.dataset.theme = documentTheme;
    toolbar.dataset.format = documentFormat;

    const node = editMode ? getSelectedNode() : null;
    const edge = editMode && !node ? getSelectedEdge() : null;
    const inspectorDiagram = node
      ? diagramModels[selectedNode.diagramIndex]
      : edge
        ? diagramModels[selectedEdge.diagramIndex]
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
      `<button type="button" class="docdiagram-save">Save As</button>`,
      `<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>`,
      `</div>`,
      node
        ? `<div class="docdiagram-inspector" data-kind="node">${buildNodeInspectorFields(inspectorDiagram, node)}</div>`
        : edge
          ? `<div class="docdiagram-inspector" data-kind="edge">${buildEdgeInspectorFields(inspectorDiagram, edge)}</div>`
          : ""
    ].join("");

    const menuToggle = toolbar.querySelector(".docdiagram-menu-toggle");
    const menu = toolbar.querySelector(".docdiagram-menu");
    const saveButton = toolbar.querySelector(".docdiagram-save");
    const themeSelect = toolbar.querySelector(".docdiagram-theme-select");
    const formatSelect = toolbar.querySelector(".docdiagram-format-select");

    menuToggle.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    saveButton.addEventListener("click", downloadDocument);
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
    editingNode = null;
    editingEdge = null;
  }

  function exitEditing(discard) {
    if (discard && editSessionSource !== null) {
      setSource(editSessionSource);
    } else if (!discard && isDirty()) {
      globalThis.confirm("Save changes before leaving edit mode?") && downloadDocument();
    }
    editMode = false;
    editSessionSource = null;
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
        editSessionSource = getSource();
        editMode = true;
        clearEditorState();
        renderDocument();
      });
    }
    for (const button of outputElement.querySelectorAll(".docdiagram-done-editing")) {
      button.addEventListener("click", () => exitEditing(false));
    }
    for (const button of outputElement.querySelectorAll(".docdiagram-cancel-editing")) {
      button.addEventListener("click", () => exitEditing(true));
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
    const widthMinimum = grid ? Math.ceil(minimumNodeSize.width / grid) * grid : minimumNodeSize.width;
    const heightMinimum = grid ? Math.ceil(minimumNodeSize.height / grid) * grid : minimumNodeSize.height;
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

  function enableEditing() {
    for (const svg of outputElement.querySelectorAll(".docdiagram svg")) {
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
        if (!editMode || (event.key !== "Delete" && event.key !== "Backspace")) {
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
    const copy = document.documentElement.cloneNode(true);
    const sourceCopy = copy.querySelector("#source");
    const toolbar = copy.querySelector(".docdiagram-toolbar");
    const output = copy.querySelector("#rendered-document");

    sourceCopy.content.replaceChildren(document.createTextNode(getSource()));
    toolbar?.remove();
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

  function renderDocument() {
    const scrollPositions = new Map(
      [...outputElement.querySelectorAll(".docdiagram")].map((diagram) => [
        Number(diagram.dataset.diagramIndex),
        { left: diagram.scrollLeft, top: diagram.scrollTop }
      ])
    );
    diagramModels.length = 0;
    let parsedDocument;
    try {
      parsedDocument = resolveDocument(getSource());
      documentTheme = parsedDocument.theme;
      documentColorScheme = parsedDocument.colourScheme;
    } catch (error) {
      applyPageTheme(documentTheme);
      removeToolbarChrome();
      outputElement.innerHTML = `<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
      return;
    }

    outputElement.dataset.theme = documentTheme;
    outputElement.dataset.format = documentFormat;
    applyPageTheme(documentTheme);
    outputElement.innerHTML = renderMarkdown(parsedDocument.content);
    removeToolbarChrome();
    createToolbar();
    enableCanvasPanning();

    if (editMode) {
      enableEditing();
    }

    for (const diagram of outputElement.querySelectorAll(".docdiagram")) {
      const position = scrollPositions.get(Number(diagram.dataset.diagramIndex));
      if (position) {
        diagram.scrollLeft = position.left;
        diagram.scrollTop = position.top;
      }
    }
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
      #rendered-document pre {
        background: var(--docdiagram-code-background);
        border: 1px solid var(--docdiagram-border);
        border-radius: 8px;
        overflow: auto;
        padding: 1rem;
      }
      #rendered-document[data-theme="light"],
      .docdiagram-toolbar[data-theme="light"] {
        --docdiagram-background: #ffffff;
        --docdiagram-border: #dce3ea;
        --docdiagram-control-background: #ffffff;
        --docdiagram-control-hover: #eef4f8;
        --docdiagram-code-background: #f5f8fa;
        --docdiagram-text: #17202a;
        --docdiagram-muted: #52616b;
      }
      #rendered-document[data-theme="dark"],
      .docdiagram-toolbar[data-theme="dark"] {
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
      .docdiagram-toolbar[data-editing="true"] + #rendered-document .docdiagram-edge-group {
        cursor: pointer;
      }
      .docdiagram-toolbar[data-editing="true"] + #rendered-document .docdiagram-edge-group:has(.docdiagram-inline-editor) {
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
      .docdiagram-toolbar[data-editing="true"] + #rendered-document .docdiagram-node {
        cursor: grab;
      }
      #rendered-document .docdiagram svg {
        cursor: grab;
      }
      .docdiagram-toolbar[data-editing="true"] + #rendered-document .docdiagram-node:has(.docdiagram-inline-editor) {
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
    nodeTypes,
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
    renderDiagram,
    snapToGrid,
    clampNodeSize,
    serializeDiagram,
    setNodeLabel,
    setNodeType,
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
      if (!isDirty()) {
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    });
    document.addEventListener("keydown", (event) => {
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
    renderDocument();
  }
}());

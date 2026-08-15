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
  let documentTheme = "light";
  const minimumNodeSize = { width: 120, height: 60 };
  const nodeTypes = ["application", "service", "datastore", "note"];
  const edgeRoutes = ["orthogonal", "straight"];
  const edgeMarkerStyles = ["none", "arrow", "circle"];
  const edgeMarkerDefaults = { start: "none", end: "arrow" };

  const diagramThemes = {
    light: {
      edge: { stroke: "#52616B", text: "#3E4A54" },
      node: {
        application: { fill: "#EAF2FF", stroke: "#3574C7", text: "#17202A", subtitleText: "#52616B" },
        service: { fill: "#E9F8F0", stroke: "#24824A", text: "#17202A", subtitleText: "#52616B" },
        datastore: { fill: "#F7F1FF", stroke: "#7A4CC2", text: "#17202A", subtitleText: "#52616B" },
        note: { fill: "#FFF8DF", stroke: "#9B7B00", text: "#17202A", subtitleText: "#52616B" }
      }
    },
    dark: {
      edge: { stroke: "#B8C7D5", text: "#D9E4ED" },
      node: {
        application: { fill: "#193A61", stroke: "#71AEF7", text: "#F3F8FC", subtitleText: "#C5D5E5" },
        service: { fill: "#164A38", stroke: "#66D39A", text: "#F3F8FC", subtitleText: "#C5D5E5" },
        datastore: { fill: "#3D285D", stroke: "#B796FF", text: "#F3F8FC", subtitleText: "#C5D5E5" },
        note: { fill: "#594819", stroke: "#F1CC58", text: "#F3F8FC", subtitleText: "#DDE7EF" }
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

    return diagram;
  }

  function getTheme(diagram) {
    const themeName = diagram.theme || documentTheme;
    const theme = diagramThemes[themeName];

    if (!theme) {
      throw new Error(`Unsupported diagram theme: ${themeName}`);
    }

    return theme;
  }

  function mergeStyle(defaults, overrides) {
    return { ...defaults, ...(overrides || {}) };
  }

  function getNodeEffectiveStyle(diagram, node) {
    const theme = getTheme(diagram);
    const defaults = theme.node[node.type] || theme.node.application;
    return mergeStyle(defaults, node.style);
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

  function computeNodeTextLayout(x, y, nodeWidth, nodeHeight, node) {
    const labelLineHeight = 20;
    const subtitleLineHeight = 15;
    const labelLines = splitTextLines(node.label);
    const subtitleLines = node.subtitle ? splitTextLines(node.subtitle) : [];
    const subtitleGap = subtitleLines.length ? 6 : 0;
    const labelBlockHeight = labelLines.length * labelLineHeight;
    const subtitleBlockHeight = subtitleLines.length * subtitleLineHeight;
    const totalBlockHeight = labelBlockHeight + subtitleGap + subtitleBlockHeight;
    const centerX = x + nodeWidth / 2;
    const centerY = y + nodeHeight / 2;
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

    const edgeMarkup = diagram.edges.map((edge, edgeIndex) => {
      const sourceNode = nodes.get(edge.source);
      const targetNode = nodes.get(edge.target);

      if (!sourceNode || !targetNode) {
        return "";
      }

      const sourceX = Number(sourceNode.position.x) + (Number(sourceNode.size.width) || 190);
      const sourceY = Number(sourceNode.position.y) + (Number(sourceNode.size.height) || 80) / 2;
      const targetX = Number(targetNode.position.x);
      const targetY = Number(targetNode.position.y) + (Number(targetNode.size.height) || 80) / 2;
      const route = edge.route || "orthogonal";
      const path = route === "straight"
        ? `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`
        : `M ${sourceX} ${sourceY} H ${(sourceX + targetX) / 2} V ${targetY} H ${targetX}`;
      const labelX = (sourceX + targetX) / 2;
      const labelY = (sourceY + targetY) / 2 - 10;

      const style = getEdgeEffectiveStyle(diagram, edge);
      const isSelected = selectedEdge?.diagramIndex === diagramIndex && selectedEdge.edgeIndex === edgeIndex;
      const isEditing = isSelected && editingEdge?.diagramIndex === diagramIndex && editingEdge.edgeIndex === edgeIndex;
      const strokeWidth = (Number(style.width) || 2) + (isSelected ? 2 : 0);
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

      const markerAttributes = [
        startMarkerStyle !== "none" ? ` marker-start="url(#${startMarkerId})"` : "",
        endMarkerStyle !== "none" ? ` marker-end="url(#${endMarkerId})"` : ""
      ].join("");

      return [
        `<g class="docdiagram-edge-group${isSelected ? " docdiagram-edge-selected" : ""}" data-diagram-index="${diagramIndex}" data-edge-index="${edgeIndex}">`,
        `<path class="docdiagram-edge-hit" d="${path}" fill="none" stroke="transparent" stroke-width="16"/>`,
        `<path class="docdiagram-edge" d="${path}"${markerAttributes} stroke="${escapeHtml(style.stroke)}" stroke-width="${strokeWidth}"/>`,
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
      const layout = computeNodeTextLayout(x, y, nodeWidth, nodeHeight, node);

      return [
        `<g class="docdiagram-node${isSelected ? " docdiagram-node-selected" : ""}" data-diagram-index="${diagramIndex}" data-node-id="${escapeHtml(node.id)}">`,
        `<rect class="docdiagram-node-body" x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" rx="12" fill="${escapeHtml(style.fill)}" stroke="${escapeHtml(style.stroke)}"/>`,
        isEditing
          ? `<foreignObject class="docdiagram-inline-editor-host" x="${x + 10}" y="${y + 10}" width="${nodeWidth - 20}" height="${nodeHeight - 20}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${escapeHtml(node.label)}</textarea></foreignObject>`
          : renderTextBlock(layout.centerX, layout.labelStartY, layout.labelLines, layout.labelLineHeight, "docdiagram-node-label", style.text),
        !isEditing && layout.subtitleLines.length
          ? renderTextBlock(layout.centerX, layout.subtitleStartY, layout.subtitleLines, layout.subtitleLineHeight, "docdiagram-node-subtitle", style.subtitleText)
          : "",
        isSelected && editMode && !isEditing
          ? `<rect class="docdiagram-resize-handle" x="${x + nodeWidth - 7}" y="${y + nodeHeight - 7}" width="14" height="14" rx="3"/>`
          : "",
        `</g>`
      ].join("");
    }).join("");

    return [
      `<figure class="docdiagram" data-diagram-index="${diagramIndex}">`,
      `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Architecture diagram" data-diagram-index="${diagramIndex}">`,
      `<defs>${edgeMarkerDefs.join("")}</defs>`,
      edgeMarkup,
      nodeMarkup,
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

    if (!diagramThemes[theme]) {
      throw new Error(`Unsupported document theme: ${theme}`);
    }

    return { ...document, theme };
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

  function setNodeSubtitle(node, subtitle) {
    node.subtitle = String(subtitle ?? "").trim();
    return node;
  }

  function setNodeStyleOverride(node, key, value) {
    node.style = { ...node.style, [key]: value };
    return node;
  }

  function setNodeSize(diagram, node, dimension, rawValue) {
    const grid = getGridSize(diagram);
    const minimum = dimension === "width" ? minimumNodeSize.width : minimumNodeSize.height;
    const size = clampNodeSize(Number(rawValue) || minimum, minimum, grid);
    node.size = { ...node.size, [dimension]: size };
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

  function setEdgeStyleOverride(edge, key, value) {
    edge.style = { ...edge.style, [key]: value };
    return edge;
  }

  function setEdgeWidth(edge, rawValue) {
    const width = Math.max(1, Math.round(Number(rawValue)) || 1);
    edge.style = { ...edge.style, width };
    return edge;
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

    const node = editMode ? getSelectedNode() : null;
    const edge = editMode && !node ? getSelectedEdge() : null;
    const inspectorDiagram = node
      ? diagramModels[selectedNode.diagramIndex]
      : edge
        ? diagramModels[selectedEdge.diagramIndex]
        : null;

    toolbar.innerHTML = [
      `<button type="button" class="docdiagram-edit-toggle">${editMode ? "Finish editing" : "Edit diagram"}</button>`,
      `<label class="docdiagram-theme-control">Theme`,
      `<select class="docdiagram-theme-select">`,
      `<option value="light"${documentTheme === "light" ? " selected" : ""}>Light</option>`,
      `<option value="dark"${documentTheme === "dark" ? " selected" : ""}>Dark</option>`,
      `</select></label>`,
      `<button type="button" class="docdiagram-save"${editMode ? "" : " hidden"}>Save a copy</button>`,
      node
        ? `<div class="docdiagram-inspector" data-kind="node">${buildNodeInspectorFields(inspectorDiagram, node)}</div>`
        : edge
          ? `<div class="docdiagram-inspector" data-kind="edge">${buildEdgeInspectorFields(inspectorDiagram, edge)}</div>`
          : ""
    ].join("");

    const editButton = toolbar.querySelector(".docdiagram-edit-toggle");
    const saveButton = toolbar.querySelector(".docdiagram-save");
    const themeSelect = toolbar.querySelector(".docdiagram-theme-select");

    editButton.addEventListener("click", () => {
      editMode = !editMode;
      selectedNode = null;
      selectedEdge = null;
      editingNode = null;
      editingEdge = null;
      renderDocument();
    });

    saveButton.addEventListener("click", downloadDocument);

    themeSelect.addEventListener("change", () => {
      setSource(setFrontmatterTheme(getSource(), themeSelect.value));
      renderDocument();
    });

    if (node) {
      wireNodeInspector(toolbar, selectedNode.diagramIndex, selectedNode.nodeId);
    } else if (edge) {
      wireEdgeInspector(toolbar, selectedEdge.diagramIndex, selectedEdge.edgeIndex);
    }

    outputElement.before(toolbar);
  }

  function buildNodeInspectorFields(diagram, node) {
    const grid = getGridSize(diagram);
    const style = getNodeEffectiveStyle(diagram, node);
    const width = Number(node.size?.width) || 190;
    const height = Number(node.size?.height) || 80;
    const widthMinimum = grid ? Math.ceil(minimumNodeSize.width / grid) * grid : minimumNodeSize.width;
    const heightMinimum = grid ? Math.ceil(minimumNodeSize.height / grid) * grid : minimumNodeSize.height;
    const step = grid || 1;

    return [
      `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(node.label)}</textarea></label>`,
      `<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${escapeHtml(node.subtitle || "")}</textarea></label>`,
      `<label class="docdiagram-field">Type<select class="docdiagram-inspector-type">${nodeTypes.map(
        (type) => `<option value="${type}"${type === node.type ? " selected" : ""}>${type}</option>`
      ).join("")}</select></label>`,
      `<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${escapeHtml(style.fill)}"></label>`,
      `<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke)}"></label>`,
      `<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text)}"></label>`,
      `<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${width}" min="${widthMinimum}" step="${step}"></label>`,
      `<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${height}" min="${heightMinimum}" step="${step}"></label>`
    ].join("");
  }

  function buildEdgeInspectorFields(diagram, edge) {
    const style = getEdgeEffectiveStyle(diagram, edge);
    const width = Number(style.width) || 2;
    const route = edge.route || "orthogonal";
    const startMarkerStyle = getEdgeMarkerStyle(edge, "start");
    const endMarkerStyle = getEdgeMarkerStyle(edge, "end");

    return [
      `<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${escapeHtml(edge.label || "")}</textarea></label>`,
      `<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${edgeRoutes.map(
        (candidate) => `<option value="${candidate}"${candidate === route ? " selected" : ""}>${candidate}</option>`
      ).join("")}</select></label>`,
      `<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${edgeMarkerStyles.map(
        (candidate) => `<option value="${candidate}"${candidate === startMarkerStyle ? " selected" : ""}>${candidate}</option>`
      ).join("")}</select></label>`,
      `<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${edgeMarkerStyles.map(
        (candidate) => `<option value="${candidate}"${candidate === endMarkerStyle ? " selected" : ""}>${candidate}</option>`
      ).join("")}</select></label>`,
      `<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${escapeHtml(style.stroke)}"></label>`,
      `<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${escapeHtml(style.text)}"></label>`,
      `<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${width}" min="1" step="1"></label>`
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

    container.querySelector(".docdiagram-inspector-type").addEventListener("change", (event) => {
      withNode((diagram, node) => setNodeType(node, event.target.value));
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

    container.querySelector(".docdiagram-inspector-width").addEventListener("change", (event) => {
      withEdge((diagram, edge) => setEdgeWidth(edge, event.target.value));
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
    const nodeRect = group.querySelector(".docdiagram-node-body");
    const label = group.querySelector(".docdiagram-node-label");
    const subtitle = group.querySelector(".docdiagram-node-subtitle");
    const handle = group.querySelector(".docdiagram-resize-handle");
    const layout = computeNodeTextLayout(x, y, width, height, node);

    nodeRect.setAttribute("width", width);
    nodeRect.setAttribute("height", height);

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
      const width = clampNodeSize(origin.width + point.x - start.x, minimumNodeSize.width, grid);
      const height = clampNodeSize(origin.height + point.y - start.y, minimumNodeSize.height, grid);

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

  function renderDocument() {
    diagramModels.length = 0;
    let parsedDocument;
    try {
      parsedDocument = resolveDocument(getSource());
      documentTheme = parsedDocument.theme;
    } catch (error) {
      applyPageTheme(documentTheme);
      removeToolbarChrome();
      outputElement.innerHTML = `<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${escapeHtml(error.message)}</section>`;
      return;
    }

    outputElement.dataset.theme = documentTheme;
    applyPageTheme(documentTheme);
    outputElement.innerHTML = renderMarkdown(parsedDocument.content);
    removeToolbarChrome();
    createToolbar();

    if (editMode) {
      enableEditing();
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
        flex-wrap: wrap;
        gap: .75rem;
        margin: 1.5rem auto 0;
        max-width: 1100px;
        padding: .75rem 2rem;
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
      .docdiagram-theme-control {
        align-items: flex-start;
        color: var(--docdiagram-muted);
        display: flex;
        flex-direction: column;
        font-size: .72rem;
        gap: .15rem;
      }
      .docdiagram-inspector {
        align-items: center;
        border-left: 1px solid var(--docdiagram-border);
        display: flex;
        flex-wrap: wrap;
        gap: .6rem;
        margin-left: .25rem;
        padding-left: .85rem;
      }
      .docdiagram-field {
        align-items: flex-start;
        color: var(--docdiagram-muted);
        display: flex;
        flex-direction: column;
        font-size: .72rem;
        gap: .15rem;
      }
      .docdiagram-field-wide {
        flex-basis: 100%;
      }
      .docdiagram-field input,
      .docdiagram-field select,
      .docdiagram-field textarea {
        font-size: .85rem;
        padding: .3rem .4rem;
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
        overflow: auto;
        padding: 1rem;
      }
      .docdiagram svg {
        display: block;
        min-width: 720px;
        width: 100%;
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
      .docdiagram-node-body {
        stroke-width: 2;
      }
      .docdiagram-node-selected .docdiagram-node-body {
        filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
        stroke-width: 4;
      }
      .docdiagram-resize-handle {
        cursor: nwse-resize;
        fill: #ffffff;
        stroke: #3574c7;
        stroke-width: 2;
      }
      .docdiagram-node {
        cursor: default;
      }
      .docdiagram-toolbar[data-editing="true"] + #rendered-document .docdiagram-node {
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
    nodeTypes,
    edgeRoutes,
    edgeMarkerStyles,
    getTheme,
    getGridSize,
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
    setNodeSubtitle,
    setNodeStyleOverride,
    setNodeSize,
    setEdgeLabel,
    setEdgeRoute,
    setEdgeStyleOverride,
    setEdgeWidth,
    setEdgeMarkerStart,
    setEdgeMarkerEnd,
    splitTextLines,
    renderTextBlock,
    computeNodeTextLayout
  };

  if (sourceElement && outputElement) {
    injectStyles();
    renderDocument();
  }
}());

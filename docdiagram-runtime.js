(function () {
  "use strict";

  const sourceElement = document.querySelector("#source");
  const outputElement = document.querySelector("#rendered-document");
  const diagramModels = [];
  let editMode = false;
  let selectedNode = null;

  if (!sourceElement || !outputElement) {
    return;
  }

  const nodeStyles = {
    application: { fill: "#EAF2FF", stroke: "#3574C7" },
    service: { fill: "#E9F8F0", stroke: "#24824A" },
    datastore: { fill: "#F7F1FF", stroke: "#7A4CC2" },
    note: { fill: "#FFF8DF", stroke: "#9B7B00" }
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

    if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
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

  function renderDiagram(source, diagramIndex) {
    let diagram;

    try {
      diagram = parseDiagram(source);
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

    const edgeMarkup = diagram.edges.map((edge) => {
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

      return [
        `<path class="docdiagram-edge" d="${path}" marker-end="url(#docdiagram-arrow)"/>`,
        edge.label
          ? `<text class="docdiagram-edge-label" x="${labelX}" y="${labelY}" text-anchor="middle">${escapeHtml(edge.label)}</text>`
          : ""
      ].join("");
    }).join("");

    const nodeMarkup = [...nodes.values()].map((node) => {
      const position = node.position;
      const size = node.size;
      const x = Number(position.x) || 0;
      const y = Number(position.y) || 0;
      const nodeWidth = Number(size.width) || 190;
      const nodeHeight = Number(size.height) || 80;
      const style = nodeStyles[node.type] || nodeStyles.application;

      return [
        `<g class="docdiagram-node" data-diagram-index="${diagramIndex}" data-node-id="${escapeHtml(node.id)}">`,
        `<rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" rx="12" fill="${style.fill}" stroke="${style.stroke}"/>`,
        `<text x="${x + nodeWidth / 2}" y="${y + nodeHeight / 2 - 5}" text-anchor="middle" class="docdiagram-node-label">${escapeHtml(node.label)}</text>`,
        node.type
          ? `<text x="${x + nodeWidth / 2}" y="${y + nodeHeight / 2 + 18}" text-anchor="middle" class="docdiagram-node-type">${escapeHtml(node.type)}</text>`
          : "",
        `</g>`
      ].join("");
    }).join("");

    return [
      `<figure class="docdiagram" data-diagram-index="${diagramIndex}">`,
      `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Architecture diagram" data-diagram-index="${diagramIndex}">`,
      `<defs><marker id="docdiagram-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z"/></marker></defs>`,
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
    const source = getSource().replace(
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

  function createToolbar() {
    const toolbar = document.createElement("section");
    toolbar.className = "docdiagram-toolbar";
    toolbar.dataset.editing = String(editMode);
    toolbar.innerHTML = [
      `<button type="button" class="docdiagram-edit-toggle">Edit diagram</button>`,
      `<label class="docdiagram-label-editor" hidden>`,
      `Node label <input type="text" aria-label="Selected node label">`,
      `</label>`,
      `<button type="button" class="docdiagram-save" hidden>Save a copy</button>`
    ].join("");

    const editButton = toolbar.querySelector(".docdiagram-edit-toggle");
    const labelEditor = toolbar.querySelector(".docdiagram-label-editor");
    const labelInput = labelEditor.querySelector("input");
    const saveButton = toolbar.querySelector(".docdiagram-save");

    editButton.addEventListener("click", () => {
      editMode = !editMode;
      selectedNode = null;
      renderDocument();
    });

    labelInput.addEventListener("change", () => {
      const node = getSelectedNode();
      if (!node) {
        return;
      }

      node.label = labelInput.value.trim() || node.label;
      persistDiagramModels();
      renderDocument();
    });

    saveButton.addEventListener("click", downloadDocument);
    outputElement.before(toolbar);

    if (editMode) {
      editButton.textContent = "Finish editing";
      saveButton.hidden = false;

      const node = getSelectedNode();
      if (node) {
        labelEditor.hidden = false;
        labelInput.value = node.label;
      }
    }
  }

  function selectNode(diagramIndex, nodeId) {
    selectedNode = { diagramIndex, nodeId };
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

  function enableEditing() {
    for (const svg of outputElement.querySelectorAll(".docdiagram svg")) {
      svg.addEventListener("click", (event) => {
        const group = event.target.closest(".docdiagram-node");
        if (group) {
          selectNode(Number(group.dataset.diagramIndex), group.dataset.nodeId);
        }
      });

      svg.addEventListener("pointerdown", (event) => {
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
        let moved = false;

        if (event.isTrusted) {
          svg.setPointerCapture(event.pointerId);
        }

        function move(moveEvent) {
          const point = svgPoint(svg, moveEvent);
          const x = Math.round(origin.x + point.x - start.x);
          const y = Math.round(origin.y + point.y - start.y);

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
            persistDiagramModels();
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

  function renderDocument() {
    diagramModels.length = 0;
    outputElement.innerHTML = renderMarkdown(getSource());
    outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar") &&
      outputElement.previousElementSibling.remove();
    createToolbar();

    if (editMode) {
      enableEditing();
    }
  }

  function injectStyles() {
    const styles = document.createElement("style");
    styles.textContent = `
      #rendered-document {
        box-sizing: border-box;
        color: #17202a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.55;
        margin: 0 auto;
        max-width: 1100px;
        padding: 2rem;
      }
      .docdiagram-toolbar {
        align-items: center;
        display: flex;
        gap: .75rem;
        margin: 1.5rem auto 0;
        max-width: 1100px;
        padding: 0 2rem;
      }
      .docdiagram-toolbar button,
      .docdiagram-toolbar input {
        border: 1px solid #9aabba;
        border-radius: 6px;
        font: inherit;
        padding: .45rem .65rem;
      }
      .docdiagram-toolbar button {
        background: #fff;
        color: #17202a;
        cursor: pointer;
      }
      .docdiagram-toolbar button:hover {
        background: #eef4f8;
      }
      .docdiagram-label-editor {
        align-items: center;
        display: flex;
        gap: .4rem;
      }
      .docdiagram {
        background: #fff;
        border: 1px solid #dce3ea;
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
        marker-end: url(#docdiagram-arrow);
        stroke: #52616b;
        stroke-width: 2;
      }
      #docdiagram-arrow path {
        fill: #52616b;
      }
      .docdiagram-edge-label {
        fill: #3e4a54;
        font-size: 15px;
      }
      .docdiagram-node rect {
        stroke-width: 2;
      }
      .docdiagram-node {
        cursor: default;
      }
      .docdiagram-toolbar[data-editing="true"] + #rendered-document .docdiagram-node {
        cursor: grab;
      }
      .docdiagram-node-label {
        fill: #17202a;
        font-size: 16px;
        font-weight: 650;
      }
      .docdiagram-node-type {
        fill: #52616b;
        font-size: 13px;
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

  injectStyles();
  renderDocument();
}());

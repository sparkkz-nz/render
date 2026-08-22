import { calloutKinds, paletteRoles, gridColumns } from "./diagrams/schema";
import { escapeHtml } from "./diagrams/parser";
import { getNodeColorPalette, mergeStyle } from "./diagrams/styles";
import { findFenceClose, isFenceClose, parseFenceOpen } from "./fences";

type DirectiveName = "section" | "panel" | "callout" | "grid" | "stack";

type DirectiveOpen = {
  name: DirectiveName;
  attributes: Record<string, string>;
};

type DiagramDefinition = {
  source: string;
  id: string;
};

type DiagramReferenceRegistry = {
  definitions: Map<string, DiagramDefinition>;
  duplicateDefinitionIds: Set<string>;
  referenceCounts: Map<string, number>;
};

function splitTableRow(line: string): string[] {
  const cells: string[] = [];
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

function parseTableAlignment(line: string): string[] | null {
  const cells = splitTableRow(line);
  if (!cells.length || !cells.every((cell) => /^:?-{3,}:?$/.test(cell))) {
    return null;
  }
  return cells.map((cell) => cell.startsWith(":") && cell.endsWith(":")
    ? "center"
    : cell.startsWith(":") ? "left" : cell.endsWith(":") ? "right" : "");
}

function getListMatch(line: string): RegExpMatchArray | null {
  return line.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/);
}

function parseDirectiveOpen(line: string): DirectiveOpen | null {
  const match = line.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);
  if (!match) {
    return null;
  }

  const attributes: Record<string, string> = {};
  const source = match[2];
  if (source !== undefined) {
    let index = 0;
    const attributePattern = /\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi;
    let attributeMatch: RegExpExecArray | null;
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

  return { name: match[1] as DirectiveName, attributes };
}

function parseDiagramReference(line: string): { id: string } | null {
  const match = line.match(/^:::diagram\s+\{\s*id=(?:"([^"]+)"|([^\s}]+))\s*\}\s*$/);
  const id = match?.[1] ?? match?.[2];
  return id ? { id } : null;
}

function getDiagramId(source: string): string | null {
  const match = source.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m);
  return match?.[1] ?? match?.[2] ?? null;
}

function stripBlockQuotePrefix(line: string): string {
  return line.replace(/^(?: {0,3}> ?)+/, "");
}

function isDirectiveClose(line: string): boolean {
  return /^:::(?:\s+.*)?$/.test(line);
}

function findDirectiveClose(lines: string[], start: number, end: number): number {
  let depth = 1;
  let fenceMarker: string | null = null;
  for (let index = start + 1; index < end; index += 1) {
    const line = lines[index];
    if (fenceMarker) {
      if (isFenceClose(line, fenceMarker)) {
        fenceMarker = null;
      }
      continue;
    }
    const fence = parseFenceOpen(line);
    if (fence) {
      fenceMarker = fence.marker;
      continue;
    }
    if (parseDirectiveOpen(line)) {
      depth += 1;
    } else if (isDirectiveClose(line)) {
      depth -= 1;
      if (!depth) {
        return index;
      }
    }
  }
  return -1;
}

function isComponentColour(value: string): boolean {
  return /^#[\da-f]{3,8}$/i.test(value);
}

function getComponentStyle(attributes: Record<string, string>, documentColorScheme = "classic", documentTheme = "light"): string | null {
  const hasPalette = attributes.palette !== undefined;
  if (hasPalette && !paletteRoles.includes(attributes.palette as (typeof paletteRoles)[number])) {
    return null;
  }

  for (const key of ["fill", "stroke", "text"] as const) {
    if (attributes[key] !== undefined && !isComponentColour(attributes[key])) {
      return null;
    }
  }

  const palette = hasPalette
    ? getNodeColorPalette(documentColorScheme, documentTheme, attributes.palette as string)
    : null;
  const overrides = Object.fromEntries(
    ["fill", "stroke", "text"]
      .filter((key) => attributes[key] !== undefined)
      .map((key) => [key, attributes[key]])
  );
  const style = mergeStyle(palette || {}, overrides);
  return Object.entries(style)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `--docdiagram-component-${key}:${value}`)
    .join(";");
}

export function isSafeUrl(value: string, allowDataImage = false): boolean {
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

export function renderInline(source: string): string {
  const codeTokens: string[] = [];
  let value = String(source).replace(/`([^`]+)`/g, (_, code: string) => {
    const token = `\u0000${codeTokens.length}\u0000`;
    codeTokens.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  value = escapeHtml(value);
  value = value.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, alt: string, url: string) => {
    const decodedUrl = url.replace(/&amp;/g, "&");
    return isSafeUrl(decodedUrl, true)
      ? `<img src="${escapeHtml(decodedUrl)}" alt="${alt}">`
      : `![${alt}](${escapeHtml(url)})`;
  });
  value = value.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, label: string, url: string) => {
    const decodedUrl = url.replace(/&amp;/g, "&");
    return isSafeUrl(decodedUrl)
      ? `<a href="${escapeHtml(decodedUrl)}">${label}</a>`
      : `[${label}](${escapeHtml(url)})`;
  });
  value = value
    .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, "<strong>$2</strong>")
    .replace(/~~(?=\S)([\s\S]*?\S)~~/g, "<del>$1</del>")
    .replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g, "<em>$1</em>")
    .replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g, "<em>$1</em>");

  return value.replace(/\u0000(\d+)\u0000/g, (_, index: string) => codeTokens[Number(index)]);
}

export function renderMarkdown(
  source: string,
  state: { diagramIndex: number } = { diagramIndex: 0 },
  options?: {
    renderDiagram?: (source: string, index: number) => string;
    documentColorScheme?: string;
    documentTheme?: string;
    diagramReferenceRegistry?: DiagramReferenceRegistry;
  }
): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const renderDiagram = options?.renderDiagram ?? ((_: string, __: number) => {
    throw new Error("renderDiagram callback is required for diagram blocks.");
  });
  const documentColorScheme = options?.documentColorScheme || "classic";
  const documentTheme = options?.documentTheme || "light";
  const registry = options?.diagramReferenceRegistry || (() => {
    const definitions = new Map<string, DiagramDefinition>();
    const duplicateDefinitionIds = new Set<string>();
    const referenceCounts = new Map<string, number>();
    const normalizedLines = lines.map(stripBlockQuotePrefix);

    for (let index = 0; index < normalizedLines.length; index += 1) {
      const fence = parseFenceOpen(normalizedLines[index]);
      if (!fence) {
        continue;
      }
      const closeIndex = findFenceClose(normalizedLines, index + 1, fence.marker);
      if (closeIndex === -1) {
        break;
      }
      if (fence.info === "diagram") {
        const definitionSource = normalizedLines.slice(index + 1, closeIndex).join("\n");
        const id = getDiagramId(definitionSource);
        if (id) {
          if (definitions.has(id)) {
            duplicateDefinitionIds.add(id);
          } else {
            definitions.set(id, { id, source: definitionSource });
          }
        }
      }
      // Skip the whole block so a fence nested inside a longer one stays inert.
      index = closeIndex;
    }

    let fenceMarker: string | null = null;
    for (const line of normalizedLines) {
      if (fenceMarker) {
        if (isFenceClose(line, fenceMarker)) {
          fenceMarker = null;
        }
        continue;
      }
      const fence = parseFenceOpen(line);
      if (fence) {
        fenceMarker = fence.marker;
        continue;
      }
      const reference = parseDiagramReference(line);
      if (reference) {
        referenceCounts.set(reference.id, (referenceCounts.get(reference.id) || 0) + 1);
      }
    }
    return { definitions, duplicateDefinitionIds, referenceCounts };
  })();
  const { definitions: diagramDefinitions, duplicateDefinitionIds, referenceCounts } = registry;

  function isBlockStart(index: number): boolean {
    const line = lines[index] || "";
    return !line.trim() || /^```/.test(line) || /^(#{1,6})\s+/.test(line) ||
      /^ {0,3}&gt;|^ {0,3}>/.test(line) || /^ {0,3}(?:[-*_]\s*){3,}$/.test(line) ||
      /^:::/.test(line) || Boolean(getListMatch(line)) ||
      (index + 1 < lines.length && Boolean(parseTableAlignment(lines[index + 1])));
  }

  function renderList(start: number, baseIndent: number): { html: string; index: number } {
    const first = getListMatch(lines[start]) as RegExpMatchArray;
    const ordered = /^\d/.test(first[2]);
    const items: Array<{ content: string[]; children: string[] }> = [];
    let index = start;
    const startValue = ordered ? Number.parseInt(first[2], 10) : null;

    while (index < lines.length) {
      const match = getListMatch(lines[index]);
      if (!match || match[1].length !== baseIndent || /^\d/.test(match[2]) !== ordered) {
        break;
      }

      const item = { content: [match[3]], children: [] as string[] };
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
          const nextMatch = index < lines.length ? getListMatch(lines[index]) : null;
          if (index >= lines.length || !nextMatch || nextMatch[1].length <= baseIndent) {
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

  function renderDirective(start: number, end: number): { html: string; next: number } | null {
    const directive = parseDirectiveOpen(lines[start]);
    const close = directive ? findDirectiveClose(lines, start, end) : -1;
    if (!directive || close === -1) {
      return null;
    }

    const { name, attributes } = directive;
    const allowedAttributes: Record<DirectiveName, string[]> = {
      section: ["title", "palette", "fill", "stroke", "text"],
      panel: ["title", "palette", "fill", "stroke", "text"],
      callout: ["kind", "title", "palette", "fill", "stroke", "text"],
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

      const items: string[] = [];
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

    const style = getComponentStyle(attributes, documentColorScheme, documentTheme);
    if (style === null || (name === "callout" && attributes.kind !== undefined && !calloutKinds.includes(attributes.kind as (typeof calloutKinds)[number]))) {
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

  function renderBlocks(start = 0, end = lines.length): string {
    const output: string[] = [];
    let index = start;
    while (index < end) {
      const line = lines[index];
      if (!line.trim()) {
        index += 1;
        continue;
      }

      if (/^:::/.test(line)) {
        const reference = parseDiagramReference(line);
        if (reference) {
          const definition = diagramDefinitions.get(reference.id);
          const references = referenceCounts.get(reference.id) || 0;
          if (!definition) {
            output.push(`<section class="docdiagram-error"><strong>Diagram "${escapeHtml(reference.id)}" could not be found.</strong></section>`);
          } else if (duplicateDefinitionIds.has(reference.id)) {
            output.push(`<section class="docdiagram-error"><strong>Diagram "${escapeHtml(reference.id)}" has multiple definitions.</strong></section>`);
          } else if (references > 1) {
            output.push(`<section class="docdiagram-error"><strong>Diagram "${escapeHtml(reference.id)}" is referenced more than once.</strong></section>`);
          } else {
            output.push(renderDiagram(definition.source, state.diagramIndex));
            state.diagramIndex += 1;
          }
          index += 1;
          continue;
        }
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

      const fence = parseFenceOpen(line);
      if (fence) {
        const closing = lines.slice(index + 1, end).findIndex((candidate) => isFenceClose(candidate, fence.marker));
        if (closing === -1) {
          output.push(`<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>`);
          break;
        }
        const closeIndex = index + closing + 1;
        const content = lines.slice(index + 1, closeIndex).join("\n");
        if (fence.info === "diagram") {
          const id = getDiagramId(content);
          if (id && duplicateDefinitionIds.has(id)) {
            output.push(`<section class="docdiagram-error"><strong>Diagram "${escapeHtml(id)}" has multiple definitions.</strong></section>`);
          } else if (!id || !referenceCounts.has(id)) {
            output.push(renderDiagram(content, state.diagramIndex));
            state.diagramIndex += 1;
          }
        } else {
          const className = fence.info ? ` class="language-${escapeHtml(fence.info)}"` : "";
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
        const quoteLines: string[] = [];
        while (index < end && /^ {0,3}>/.test(lines[index])) {
          quoteLines.push(lines[index].replace(/^ {0,3}> ?/, ""));
          index += 1;
        }
        output.push(`<blockquote>${renderMarkdown(quoteLines.join("\n"), state, {
          ...options,
          diagramReferenceRegistry: registry
        })}</blockquote>`);
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
        const rows: string[][] = [];
        index += 2;
        while (index < end && lines[index].includes("|") && lines[index].trim()) {
          rows.push(splitTableRow(lines[index]));
          index += 1;
        }
        const renderCells = (tag: string, cells: string[]) => cells.map((cell, cellIndex) =>
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

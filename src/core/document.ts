import { colourSchemes } from "./diagrams/schema";
import { parseDiagram, parseScalar } from "./diagrams/parser";
import { resolveTheme } from "./diagrams/styles";

export function parseDocumentFrontmatter(source: string): { content: string; frontmatter: Record<string, unknown> } {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const openingIndex = lines.findIndex((line) => line.trim() !== "");
  if (openingIndex === -1 || lines[openingIndex] !== "---") {
    return { content: source, frontmatter: {} };
  }

  const closingIndex = lines.indexOf("---", openingIndex + 1);
  if (closingIndex === -1) {
    return { content: source, frontmatter: {} };
  }

  const frontmatter: Record<string, unknown> = {};
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

export function resolveDocument(source: string): { content: string; frontmatter: Record<string, unknown>; theme: string; resolvedTheme: "light" | "dark"; colourScheme: string } {
  const document = parseDocumentFrontmatter(source);
  const theme = String(document.frontmatter.theme || "auto");
  const colourScheme = String(document.frontmatter.colourScheme || "classic");

  let resolvedTheme: "light" | "dark";
  try {
    resolvedTheme = resolveTheme(theme);
  } catch {
    throw new Error(`Unsupported document theme: ${theme}`);
  }
  if (!colourSchemes[colourScheme]) {
    throw new Error(`Unsupported document colour scheme: ${colourScheme}`);
  }

  return { ...document, theme, resolvedTheme, colourScheme };
}

export function validateDocumentSource(source: string): { content: string; frontmatter: Record<string, unknown>; theme: string; resolvedTheme: "light" | "dark"; colourScheme: string } {
  const document = resolveDocument(source);
  const lines = document.content.replace(/\r\n/g, "\n").split("\n");
  let index = 0;
  const diagramIds = new Set<string>();
  let hasDiagramReferences = false;
  let referenceFenceOpen = false;
  for (const line of lines) {
    const normalizedLine = line.replace(/^(?: {0,3}> ?)+/, "");
    if (/^```/.test(normalizedLine)) {
      referenceFenceOpen = !referenceFenceOpen;
      continue;
    }
    if (!referenceFenceOpen && /^:::diagram\s+\{\s*id=/.test(normalizedLine)) {
      hasDiagramReferences = true;
      break;
    }
  }

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
      parseDiagram(diagramSource, document.colourScheme);
      const id = diagramSource.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean);
      if (id) {
        if (diagramIds.has(id)) {
          throw new Error(`Duplicate diagram id: ${id}`);
        }
        diagramIds.add(id);
      } else if (hasDiagramReferences) {
        throw new Error("Every diagram requires an id when using diagram references.");
      }
    }
    index = closeIndex + 1;
  }

  return document;
}

export function setFrontmatterSetting(source: string, settingName: "theme" | "colourScheme", value: string): string {
  const normalized = source.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const openingIndex = lines.findIndex((line) => line.trim() !== "");
  const hasFrontmatter = openingIndex !== -1 && lines[openingIndex] === "---";
  const closingIndex = hasFrontmatter ? lines.indexOf("---", openingIndex + 1) : -1;

  if (!hasFrontmatter || closingIndex === -1) {
    return `---\n${settingName}: ${value}\n---\n${normalized}`;
  }

  let settingSet = false;
  const frontmatterLines = lines.slice(openingIndex + 1, closingIndex).map((line) => {
    if (!line.trim() || line.trimStart().startsWith("#")) {
      return line;
    }

    const propertyMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (propertyMatch && propertyMatch[1] === settingName) {
      settingSet = true;
      return `${settingName}: ${value}`;
    }

    return line;
  });

  if (!settingSet) {
    frontmatterLines.push(`${settingName}: ${value}`);
  }

  return [
    ...lines.slice(0, openingIndex + 1),
    ...frontmatterLines,
    ...lines.slice(closingIndex)
  ].join("\n");
}

export function setFrontmatterTheme(source: string, themeName: string): string {
  return setFrontmatterSetting(source, "theme", themeName);
}

export function setFrontmatterColourScheme(source: string, colourScheme: string): string {
  return setFrontmatterSetting(source, "colourScheme", colourScheme);
}

export function findSourceTextRange(source: string, text: string): { start: number; end: number } | null {
  const selectedText = text.trim();
  const start = selectedText ? source.indexOf(selectedText) : -1;

  return start === -1 ? null : { start, end: start + selectedText.length };
}

export function scrollSourceEditorToRange(editor: HTMLTextAreaElement, range: { start: number }): void {
  const lineHeight = Number.parseFloat(globalThis.getComputedStyle(editor).lineHeight) || 20;
  const lineIndex = editor.value.slice(0, range.start).split("\n").length - 1;
  const visibleLineCount = Math.max(1, Math.floor(editor.clientHeight / lineHeight));

  editor.scrollTop = Math.max(0, (lineIndex - Math.floor(visibleLineCount / 2)) * lineHeight);
}

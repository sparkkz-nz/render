import type { Diagram } from "./schema";

function formatScalar(value: unknown): string {
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

function serializeItem(item: Record<string, unknown>, indent = 2): string[] {
  const entries = Object.entries(item);
  const [firstKey, firstValue] = entries[0];
  const lines = [`${" ".repeat(indent)}- ${firstKey}: ${formatScalar(firstValue)}`];

  for (const [key, value] of entries.slice(1)) {
    if (key === "children" && Array.isArray(value) && !value.length) {
      continue;
    }
    if (key === "children" && Array.isArray(value)) {
      lines.push(`${" ".repeat(indent + 2)}children:`);
      for (const child of value) {
        lines.push(...serializeItem(child as Record<string, unknown>, indent + 4));
      }
    } else {
      lines.push(`${" ".repeat(indent + 2)}${key}: ${formatScalar(value)}`);
    }
  }

  return lines;
}

export function serializeDiagram(diagram: Diagram): string {
  const lines = [`type: ${formatScalar(diagram.type)}`];

  for (const [key, value] of Object.entries(diagram as unknown as Record<string, unknown>)) {
    if (key === "type" || key === "canvas" || key === "nodes" || key === "edges" ||
      key === "participants" || key === "messages" || key === "activations" || key === "notes" || key === "groups") {
      continue;
    }
    lines.push(`${key}: ${formatScalar(value)}`);
  }

  if (diagram.type === "sequence") {
    lines.push("participants:");
    for (const participant of diagram.participants || []) {
      lines.push(...serializeItem(participant as unknown as Record<string, unknown>));
    }

    lines.push("messages:");
    for (const message of diagram.messages || []) {
      lines.push(...serializeItem(message as unknown as Record<string, unknown>));
    }

    if (diagram.activations !== undefined) {
      lines.push("activations:");
      for (const activation of diagram.activations || []) {
        lines.push(...serializeItem(activation as unknown as Record<string, unknown>));
      }
    }

    if (diagram.notes !== undefined) {
      lines.push("notes:");
      for (const note of diagram.notes || []) {
        lines.push(...serializeItem(note as unknown as Record<string, unknown>));
      }
    }

    if (diagram.groups !== undefined) {
      lines.push("groups:");
      for (const group of diagram.groups || []) {
        lines.push(...serializeItem(group as unknown as Record<string, unknown>));
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
    lines.push(...serializeItem(node as unknown as Record<string, unknown>));
  }

  lines.push("edges:");
  for (const edge of diagram.edges || []) {
    lines.push(...serializeItem(edge as unknown as Record<string, unknown>));
  }

  return lines.join("\n");
}

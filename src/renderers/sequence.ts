import { escapeHtml } from "../core/diagrams/parser";
import { buildEdgeMarkerDef, renderTextBlock, splitTextLines } from "../core/diagrams/geometry";
import { getSequenceElementEffectiveStyle, getTheme } from "../core/diagrams/styles";
import type { SequenceDiagram, SequenceNote } from "../core/diagrams/schema";
import type { DiagramRenderState, DiagramToolbarRenderer } from "./types";

type MessageRow = { from: string; to: string; label?: string; style?: string; index: number; y: number };
type NoteLayout = SequenceNote & { lines: string[]; x: number; y: number; width: number; height: number };

export function renderSequenceDiagram(
  diagram: SequenceDiagram,
  diagramIndex: number,
  state: DiagramRenderState,
  renderToolbar: DiagramToolbarRenderer
): string {
  const theme = getTheme(diagram);
  const width = Number((diagram as { canvas?: { width?: number } }).canvas?.width) || 1000;
  const baseHeight = Number((diagram as { canvas?: { height?: number } }).canvas?.height) || 560;
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
  const positions = new Map<string, number>();
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
  const messageRows: MessageRow[] = messages.map((message, index) => ({
    ...message,
    index,
    y: messageStartY + index * messageSpacing
  }));
  const noteLayouts: NoteLayout[] = notes.map((note) => {
    const lines = splitTextLines(note.label || "");
    const height = Math.max(noteBaseHeight, lines.length * 16 + 22, Number(note.size?.height) || 0);
    const afterRow = note.after ? messageRows[Number(note.after) - 1] : null;
    const y = (afterRow?.y || lifelineTop) + noteGap;
    const centerX = positions.get(note.at || "") || width / 2;
    const noteWidth = Math.max(160, Number(note.size?.width) || 0);
    const constrainedCenterX = Math.min(width - noteWidth / 2 - 24, Math.max(noteWidth / 2 + 24, centerX));

    return { ...note, lines, x: constrainedCenterX - noteWidth / 2, y, width: noteWidth, height };
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
    const centerX = positions.get(participant.id) || 0;
    const style = getSequenceElementEffectiveStyle(diagram, participant);
    const headerWidth = Math.max(participantBoxWidth, Number(participant.size?.width) || 0);
    const headerHeight = Math.max(participantBoxHeight, Number(participant.size?.height) || 0);
    if (participant.kind === "actor") {
      const headY = headerTop + 10;
      const chestY = headY + 18;
      const waistY = chestY + 18;
      return [
        `<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${diagramIndex}" data-participant-id="${escapeHtml(participant.id)}">`,
        `<circle cx="${centerX}" cy="${headY}" r="8" fill="none" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
        `<path d="M ${centerX} ${headY + 8} V ${waistY} M ${centerX - 14} ${chestY} H ${centerX + 14} M ${centerX} ${waistY} L ${centerX - 12} ${waistY + 18} M ${centerX} ${waistY} L ${centerX + 12} ${waistY + 18}" fill="none" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${Number(style.strokeWidth) || 2}" stroke-linecap="round" stroke-linejoin="round"/>`,
        `<text x="${centerX}" y="${headerTop + actorHeaderHeight - 4}" text-anchor="middle" class="docdiagram-node-label" fill="${escapeHtml(style.text || "")}">${escapeHtml(participant.label || "")}</text>`,
        `</g>`
      ].join("");
    }

    return [
      `<g class="docdiagram-sequence-participant" data-diagram-index="${diagramIndex}" data-participant-id="${escapeHtml(participant.id)}">`,
      `<rect x="${centerX - headerWidth / 2}" y="${headerTop}" width="${headerWidth}" height="${headerHeight}" rx="12" fill="${escapeHtml(style.fill || "")}" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
      `<text x="${centerX}" y="${headerTop + headerHeight / 2 + 6}" text-anchor="middle" class="docdiagram-node-label" fill="${escapeHtml(style.text || "")}">${escapeHtml(participant.label || "")}</text>`,
      `</g>`
    ].join("");
  }).join("");

  const lifelineMarkup = participants.map((participant) => {
    const centerX = positions.get(participant.id) || 0;
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
      `<text x="${54 + labelWidth / 2}" y="${startY + 1}" text-anchor="middle" class="docdiagram-edge-label" fill="${escapeHtml(theme.edge.text)}">${escapeHtml(group.label || "")}</text>`,
      `</g>`
    ].join("");
  }).join("");

  const noteMarkup = noteLayouts.map((note, noteIndex) => {
    const lineHeight = 16;
    const startY = note.y + 18;
    const style = getSequenceElementEffectiveStyle(diagram, note);
    return [
      `<g class="docdiagram-sequence-note" data-diagram-index="${diagramIndex}" data-note-index="${noteIndex}">`,
      `<rect x="${note.x}" y="${note.y}" width="${note.width}" height="${note.height}" rx="10" fill="${escapeHtml(style.fill || "")}" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${Number(style.strokeWidth) || 2}"/>`,
      renderTextBlock(note.x + note.width / 2, startY, note.lines, lineHeight, "docdiagram-node-subtitle", style.text || ""),
      `</g>`
    ].join("");
  }).join("");

  const activationMarkup = activationRects.map((activation) => {
    const centerX = positions.get(activation.participantId) || 0;
    const widthOffset = activation.depth * 7;
    const barWidth = 12;
    const barHeight = Math.max(20, activation.endY - activation.startY);
    const participant = participants.find((candidate) => candidate.id === activation.participantId);
    const style = participant ? getSequenceElementEffectiveStyle(diagram, participant) : theme.node;
    return `<rect class="docdiagram-sequence-activation" x="${centerX - barWidth / 2 + widthOffset}" y="${activation.startY}" width="${barWidth}" height="${barHeight}" rx="4" fill="${escapeHtml(style.fill || "")}" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${Number(style.strokeWidth) || 2}"/>`;
  }).join("");

  const messageMarkup = messageRows.map((message) => {
    const sourceX = positions.get(message.from) || 0;
    const targetX = positions.get(message.to) || 0;
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
    `<figure class="docdiagram" data-diagram-index="${diagramIndex}" data-diagram-type="sequence" data-editing="${state.editingDiagramIndex === diagramIndex}">`,
    renderToolbar(diagramIndex, "sequence", state),
    `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Sequence diagram" data-diagram-index="${diagramIndex}" style="width: ${state.diagramZooms.get(diagramIndex) || 100}%">`,
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

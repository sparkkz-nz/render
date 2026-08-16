import type { FlowchartNode, NodeStyle, Position } from "./schema";
import { escapeHtml } from "./parser";

type TextBounds = { x: number; y: number; width: number; height: number };

export function splitTextLines(value: string | null | undefined): string[] {
  return String(value ?? "").replace(/\r\n/g, "\n").split("\n");
}

export function renderTextBlock(
  centerX: number,
  startY: number,
  lines: string[],
  lineHeight: number,
  className: string,
  fill: string,
  textAnchor: "start" | "middle" | "end" = "middle"
): string {
  if (!lines.length) {
    return "";
  }

  const tspans = lines.map((line, index) => {
    const positionAttribute = index === 0 ? "" : ` dy="${lineHeight}"`;
    return `<tspan x="${centerX}"${positionAttribute}>${escapeHtml(line) || " "}</tspan>`;
  }).join("");

  return `<text x="${centerX}" y="${startY}" text-anchor="${textAnchor}" class="${className}" fill="${escapeHtml(fill)}">${tspans}</text>`;
}

export function getNodeGeometry(
  node: { shape: string },
  x: number,
  y: number,
  nodeWidth: number,
  nodeHeight: number
): { bodyMarkup: string; textBounds: TextBounds; anchors: Record<string, Position> } {
  const shape = node.shape;
  const centerX = x + nodeWidth / 2;
  const centerY = y + nodeHeight / 2;
  const textBounds = { x: x + 12, y: y + 12, width: nodeWidth - 24, height: nodeHeight - 24 };
  const anchors: Record<string, Position> = {
    top: { x: centerX, y },
    right: { x: x + nodeWidth, y: centerY },
    bottom: { x: centerX, y: y + nodeHeight },
    left: { x, y: centerY }
  };
  let bodyMarkup: string;

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
    bodyMarkup = `<path class="docdiagram-node-body" d="M ${x} ${y + cap} C ${x} ${y - cap / 3} ${x + nodeWidth} ${y - cap / 3} ${x + nodeWidth} ${y + cap} V ${y + nodeHeight - cap} C ${x + nodeWidth} ${y + nodeHeight + cap / 3} ${x} ${y + nodeHeight + cap / 3} ${x} ${y + nodeHeight - cap} Z"/><path class="docdiagram-node-detail" d="M ${x} ${y + cap} C ${x} ${y + cap * 2.3} ${x + nodeWidth} ${y + cap * 2.3} ${x + nodeWidth} ${y + cap}" fill="none"/>`;
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

export function computeNodeTextLayout(
  textBounds: TextBounds | number,
  node: FlowchartNode | number,
  legacyWidth?: number,
  legacyHeight?: number,
  legacyNode?: FlowchartNode
): {
  centerX: number;
  textAnchor: "start" | "middle" | "end";
  labelLines: string[];
  subtitleLines: string[];
  labelLineHeight: number;
  subtitleLineHeight: number;
  labelStartY: number;
  subtitleStartY: number;
} {
  let resolvedBounds: TextBounds;
  let resolvedNode: FlowchartNode;

  if (typeof textBounds === "number") {
    resolvedBounds = { x: textBounds, y: node as number, width: legacyWidth || 0, height: legacyHeight || 0 };
    resolvedNode = legacyNode as FlowchartNode;
  } else {
    resolvedBounds = textBounds;
    resolvedNode = node as FlowchartNode;
  }

  const labelLineHeight = 20;
  const subtitleLineHeight = 15;
  const labelLines = splitTextLines(resolvedNode.label);
  const subtitleLines = resolvedNode.subtitle ? splitTextLines(resolvedNode.subtitle) : [];
  const subtitleGap = subtitleLines.length ? 6 : 0;
  const labelBlockHeight = labelLines.length * labelLineHeight;
  const subtitleBlockHeight = subtitleLines.length * subtitleLineHeight;
  const totalBlockHeight = labelBlockHeight + subtitleGap + subtitleBlockHeight;
  const textHAlign = resolvedNode.textHAlign || "center";
  const centerX = textHAlign === "left"
    ? resolvedBounds.x
    : textHAlign === "right"
      ? resolvedBounds.x + resolvedBounds.width
      : resolvedBounds.x + resolvedBounds.width / 2;
  const textAnchor = textHAlign === "left" ? "start" : textHAlign === "right" ? "end" : "middle";
  const centerY = resolvedBounds.y + resolvedBounds.height / 2;
  const blockTop = resolvedNode.textAAlign === "top"
    ? resolvedBounds.y
    : centerY - totalBlockHeight / 2;

  return {
    centerX,
    textAnchor,
    labelLines,
    subtitleLines,
    labelLineHeight,
    subtitleLineHeight,
    labelStartY: blockTop + labelLineHeight * 0.72,
    subtitleStartY: blockTop + labelBlockHeight + subtitleGap + subtitleLineHeight * 0.72
  };
}

export function renderNodeBody(geometry: { bodyMarkup: string }, style: NodeStyle, strokeWidth: number): string {
  return geometry.bodyMarkup.replace(
    "/>",
    ` fill="${escapeHtml(style.fill || "")}" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${strokeWidth}"/>`
  ).replace(
    'class="docdiagram-node-detail"',
    `class="docdiagram-node-detail" stroke="${escapeHtml(style.stroke || "")}" stroke-width="${strokeWidth}"`
  );
}

function getAnchorDirection(anchor: string): Position {
  return {
    top: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 },
    left: { x: -1, y: 0 }
  }[anchor as "top" | "right" | "bottom" | "left"]!;
}

function formatPathPoint(point: Position): string {
  return `${point.x} ${point.y}`;
}

function getPolylineMidpoint(points: Position[]): Position {
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
    if (remaining <= segment.length || segment === segments[segments.length - 1]) {
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

export function buildEdgePath(
  source: Position,
  target: Position,
  sourceAnchor: string,
  targetAnchor: string,
  route = "orthogonal"
): { path: string; midpoint: Position; startTangent: Position; endTangent: Position; hitPath: string } {
  const sourceDirection = getAnchorDirection(sourceAnchor);
  const targetDirection = getAnchorDirection(targetAnchor);
  const sourceIsHorizontal = sourceDirection.x !== 0;
  let path: string;
  let midpoint: Position;
  let startTangent: Position;
  let endTangent: Position;

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
    const points = [source, sourceLead, corner, targetLead, target];

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

export function getEdgeMarkerDimensions(strokeWidth: number): { size: number; circleRadius: number } {
  const width = Math.max(1, Number(strokeWidth) || 2);
  const size = 6 + width * 2.5;
  const circleRadius = Math.max(size * 0.38, width / 2 + 1);

  return { size, circleRadius };
}

export function buildEdgeMarkerDef(
  markerId: string,
  markerStyle: string,
  endpoint: string,
  strokeColor: string,
  strokeWidth: number
): string {
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

import type { FlowchartDiagram, FlowchartNode, Position } from "./schema";
import { defaultNode } from "./schema";

export interface FlowchartNodeEntry {
  node: FlowchartNode;
  parent: FlowchartNode | null;
  siblings: FlowchartNode[];
  position: Position;
  depth: number;
}

function nodeSize(node: FlowchartNode): { width: number; height: number } {
  return {
    width: Number(node.size?.width) || defaultNode.width,
    height: Number(node.size?.height) || defaultNode.height
  };
}

export function flattenFlowchartNodes(diagram: FlowchartDiagram): FlowchartNodeEntry[] {
  const entries: FlowchartNodeEntry[] = [];
  const visit = (nodes: FlowchartNode[], parent: FlowchartNode | null, parentPosition: Position, depth: number): void => {
    for (const node of nodes) {
      const position = {
        x: parentPosition.x + (Number(node.position?.x) || 0),
        y: parentPosition.y + (Number(node.position?.y) || 0)
      };
      entries.push({ node, parent, siblings: nodes, position, depth });
      visit(node.children || [], node, position, depth + 1);
    }
  };

  visit(diagram.nodes, null, { x: 0, y: 0 }, 0);
  return entries;
}

export function findFlowchartNode(diagram: FlowchartDiagram, nodeId: string): FlowchartNodeEntry | null {
  return flattenFlowchartNodes(diagram).find((entry) => entry.node.id === nodeId) || null;
}

export function getFlowchartNodePosition(diagram: FlowchartDiagram, node: FlowchartNode): Position {
  return flattenFlowchartNodes(diagram).find((entry) => entry.node === node)?.position || { x: 0, y: 0 };
}

export function getFlowchartNodeBounds(diagram: FlowchartDiagram, node: FlowchartNode): Position & { width: number; height: number } {
  return { ...getFlowchartNodePosition(diagram, node), ...nodeSize(node) };
}

function isDescendant(candidate: FlowchartNode, ancestor: FlowchartNode): boolean {
  return (ancestor.children || []).some((child) => child === candidate || isDescendant(candidate, child));
}

export function reparentFlowchartNode(diagram: FlowchartDiagram, nodeId: string): FlowchartNode | null {
  const entry = findFlowchartNode(diagram, nodeId);
  if (!entry) {
    return null;
  }

  const { node, siblings, position } = entry;
  const { width, height } = nodeSize(node);
  const center = { x: position.x + width / 2, y: position.y + height / 2 };
  const candidates = flattenFlowchartNodes(diagram)
    .filter((candidate) => candidate.node !== node && !isDescendant(candidate.node, node))
    .filter((candidate) => {
      const bounds = getFlowchartNodeBounds(diagram, candidate.node);
      return center.x >= bounds.x && center.x <= bounds.x + bounds.width &&
        center.y >= bounds.y && center.y <= bounds.y + bounds.height;
    });
  const parent = candidates.reduce<FlowchartNodeEntry | null>(
    (deepest, candidate) => !deepest || candidate.depth >= deepest.depth ? candidate : deepest,
    null
  );

  const targetSiblings = parent ? (parent.node.children ||= []) : diagram.nodes;
  if (siblings === targetSiblings) {
    return node;
  }

  siblings.splice(siblings.indexOf(node), 1);
  node.position = {
    x: position.x - (parent?.position.x || 0),
    y: position.y - (parent?.position.y || 0)
  };
  targetSiblings.push(node);
  return node;
}

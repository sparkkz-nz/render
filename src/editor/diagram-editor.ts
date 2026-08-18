import {
  edgeAnchors,
  type FlowchartDiagram,
  type FlowchartEdge,
  type FlowchartNode,
  type Position
} from "../core/diagrams/schema";
import { buildEdgePath, computeNodeTextLayout, getNodeGeometry, renderNodeBody } from "../core/diagrams/geometry";
import {
  createConnector,
  deleteConnector,
  deleteNode,
  duplicateNode,
  expandCanvasForNode,
  getResizeNodeOrigin,
  reconnectConnector,
  resizeFlowchartNode,
  setEdgeLabel,
  setNodeLabel
} from "../core/diagrams/mutations";
import { getGridSize, getNodeEffectiveStyle, snapToGrid } from "../core/diagrams/styles";
import { getNodeBounds } from "../renderers/flowchart";
import { findFlowchartNode, flattenFlowchartNodes, getFlowchartNodeBounds, reparentFlowchartNode } from "../core/diagrams/hierarchy";
import type { ConnectionDrag } from "../renderers/types";
import { clearEditorState, isDiagramEditing, type EditorState } from "./state";

export interface DiagramEditorHost {
  readonly outputElement: HTMLElement;
  readonly state: EditorState;
  persistDiagramModels(): void;
  renderDocument(): boolean;
}

function closest(event: Event, selector: string): Element | null {
  return event.target instanceof Element ? event.target.closest(selector) : null;
}

function diagramAt(state: EditorState, index: number): FlowchartDiagram | null {
  const diagram = state.diagramModels[index];
  return diagram?.type === "flowchart" ? diagram : null;
}

function pointerNumber(value: string | undefined): number {
  return Number(value);
}

export class DiagramEditor {
  public constructor(private readonly host: DiagramEditorHost) {}

  public enableCanvasPanning(): void {
    for (const svg of this.host.outputElement.querySelectorAll<SVGSVGElement>(".docdiagram svg")) {
      svg.addEventListener("pointerdown", (event) => {
        if (event.target === svg) {
          this.beginCanvasPan(svg, event);
        }
      });
    }
  }

  public enableSequenceSelection(): void {
    for (const svg of this.host.outputElement.querySelectorAll<SVGSVGElement>('.docdiagram[data-diagram-type="sequence"] svg')) {
      svg.addEventListener("click", (event) => {
        if (!isDiagramEditing(this.host.state, pointerNumber(svg.dataset.diagramIndex))) {
          return;
        }
        const participant = closest(event, ".docdiagram-sequence-participant");
        const note = closest(event, ".docdiagram-sequence-note");
        const message = closest(event, ".docdiagram-sequence-message");
        if (participant) {
          this.host.state.selectedSequenceElement = {
            diagramIndex: pointerNumber(participant.getAttribute("data-diagram-index") || undefined),
            kind: "participant",
            id: participant.getAttribute("data-participant-id") || ""
          };
        } else if (note) {
          this.host.state.selectedSequenceElement = {
            diagramIndex: pointerNumber(note.getAttribute("data-diagram-index") || undefined),
            kind: "note",
            index: pointerNumber(note.getAttribute("data-note-index") || undefined)
          };
        } else if (message) {
          this.host.state.selectedSequenceElement = {
            diagramIndex: pointerNumber(message.getAttribute("data-diagram-index") || undefined),
            kind: "message",
            index: pointerNumber(message.getAttribute("data-message-index") || undefined)
          };
        } else {
          this.host.state.selectedSequenceElement = null;
        }
        this.host.state.selectedNode = null;
        this.host.state.selectedEdge = null;
        this.host.renderDocument();
      });
    }
  }

  public enableEditing(): void {
    for (const svg of this.host.outputElement.querySelectorAll<SVGSVGElement>(".docdiagram svg")) {
      if (!isDiagramEditing(this.host.state, pointerNumber(svg.dataset.diagramIndex))) {
        continue;
      }
      svg.addEventListener("click", (event) => this.handleDiagramClick(svg, event));
      svg.addEventListener("pointerdown", (event) => this.handleDiagramPointerDown(svg, event));
    }

    for (const editor of this.host.outputElement.querySelectorAll<HTMLTextAreaElement>(".docdiagram-inline-editor")) {
      this.wireInlineEditor(editor);
    }

    if (!this.host.outputElement.dataset.editingShortcutsBound) {
      this.host.outputElement.dataset.editingShortcutsBound = "true";
      document.addEventListener("keydown", (event) => {
        if (this.host.state.editingDiagramIndex === null) {
          return;
        }
        if (event.target instanceof Element && event.target.matches("input, textarea, select, [contenteditable]")) {
          return;
        }
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d" && this.host.state.selectedNode) {
          event.preventDefault();
          this.duplicateSelectedNode();
        } else if ((event.key === "Delete" || event.key === "Backspace") &&
          (this.host.state.selectedNode || this.host.state.selectedEdge)) {
          event.preventDefault();
          this.deleteSelected();
        }
      });
    }
  }

  public selectNode(diagramIndex: number, nodeId: string): void {
    this.host.state.selectedNode = { diagramIndex, nodeId };
    this.host.state.selectedEdge = null;
    this.host.state.editingNode = null;
    this.host.state.editingEdge = null;
    this.host.renderDocument();
  }

  public selectEdge(diagramIndex: number, edgeIndex: number): void {
    this.host.state.selectedEdge = { diagramIndex, edgeIndex };
    this.host.state.selectedNode = null;
    this.host.state.editingNode = null;
    this.host.state.editingEdge = null;
    this.host.renderDocument();
  }

  private handleDiagramClick(svg: SVGSVGElement, event: MouseEvent): void {
    if (closest(event, ".docdiagram-inline-editor")) {
      return;
    }

    const nodeGroup = closest(event, ".docdiagram-node");
    if (nodeGroup) {
      this.selectNode(
        pointerNumber(nodeGroup.getAttribute("data-diagram-index") || undefined),
        nodeGroup.getAttribute("data-node-id") || ""
      );
      return;
    }

    const edgeGroup = closest(event, ".docdiagram-edge-group");
    if (edgeGroup) {
      const diagramIndex = pointerNumber(edgeGroup.getAttribute("data-diagram-index") || undefined);
      const edgeIndex = pointerNumber(edgeGroup.getAttribute("data-edge-index") || undefined);
      const alreadySelected = this.host.state.selectedEdge?.diagramIndex === diagramIndex &&
        this.host.state.selectedEdge.edgeIndex === edgeIndex;
      const alreadyEditing = this.host.state.editingEdge?.diagramIndex === diagramIndex &&
        this.host.state.editingEdge.edgeIndex === edgeIndex;

      if (alreadySelected && !alreadyEditing) {
        this.host.state.editingEdge = { diagramIndex, edgeIndex };
        this.host.renderDocument();
      } else {
        this.selectEdge(diagramIndex, edgeIndex);
      }
      return;
    }

    if (this.host.state.selectedNode || this.host.state.selectedEdge) {
      this.clearSelection();
    }
  }

  private handleDiagramPointerDown(svg: SVGSVGElement, event: PointerEvent): void {
    const port = closest(event, ".docdiagram-connection-port");
    if (port) {
      const group = port.closest(".docdiagram-node");
      const diagramIndex = pointerNumber(group?.getAttribute("data-diagram-index") || svg.dataset.diagramIndex);
      const nodeId = port.getAttribute("data-node-id") || group?.getAttribute("data-node-id") || "";
      const diagram = diagramAt(this.host.state, diagramIndex);
      const node = diagram ? findFlowchartNode(diagram, nodeId)?.node : null;
      const anchor = port.getAttribute("data-anchor") || "";
      if (node) {
        this.beginConnectionDrag(svg, event, {
          diagramIndex,
          sourceNodeId: nodeId,
          sourceAnchor: anchor,
          start: this.getNodePortPoint(node, anchor),
          current: this.getNodePortPoint(node, anchor),
          invalid: false
        });
      }
      return;
    }

    const endpoint = closest(event, ".docdiagram-edge-endpoint");
    if (endpoint) {
      const diagramIndex = pointerNumber(endpoint.getAttribute("data-diagram-index") || undefined);
      const edgeIndex = pointerNumber(endpoint.getAttribute("data-edge-index") || undefined);
      const diagram = diagramAt(this.host.state, diagramIndex);
      const edge = diagram?.edges[edgeIndex];
      const endpointName = endpoint.getAttribute("data-endpoint");
      if (!edge || (endpointName !== "source" && endpointName !== "target")) {
        return;
      }
      const nodeId = endpointName === "source" ? edge.source : edge.target;
      const anchor = endpointName === "source" ? edge.sourceAnchor : edge.targetAnchor;
      const node = diagram ? findFlowchartNode(diagram, nodeId)?.node : null;
      if (!node || !anchor) {
        return;
      }
      this.beginConnectionDrag(svg, event, {
        diagramIndex,
        edgeIndex,
        endpoint: endpointName,
        reconnect: true,
        sourceNodeId: nodeId,
        sourceAnchor: anchor,
        start: this.getNodePortPoint(node, anchor),
        current: this.getNodePortPoint(node, anchor),
        invalid: false
      });
      return;
    }

    const resizeHandle = closest(event, ".docdiagram-resize-handle");
    if (resizeHandle) {
      const group = resizeHandle.closest(".docdiagram-node");
      const corner = resizeHandle.getAttribute("data-resize-corner");
      if (
        group &&
        (corner === "top-left" || corner === "top-right" ||
          corner === "bottom-left" || corner === "bottom-right")
      ) {
        this.resizeNode(svg, event, group, corner);
      }
      return;
    }

    if (closest(event, ".docdiagram-inline-editor")) {
      return;
    }
    const group = closest(event, ".docdiagram-node");
    if (!group) {
      return;
    }
    const diagramIndex = pointerNumber(group.getAttribute("data-diagram-index") || undefined);
    const nodeId = group.getAttribute("data-node-id") || "";
    const diagram = diagramAt(this.host.state, diagramIndex);
    const node = diagram ? findFlowchartNode(diagram, nodeId)?.node : null;
    if (!diagram || !node) {
      return;
    }

    event.preventDefault();
    const start = this.svgPoint(svg, event);
    const origin = getFlowchartNodeBounds(diagram, node);
    const grid = getGridSize(diagram);
    let moved = false;
    this.capturePointer(svg, event);

    const move = (moveEvent: PointerEvent) => {
      const point = this.svgPoint(svg, moveEvent);
      const x = snapToGrid(origin.x + point.x - start.x, grid);
      const y = snapToGrid(origin.y + point.y - start.y, grid);
      moved = moved || x !== origin.x || y !== origin.y;
      group.setAttribute("transform", `translate(${x - origin.x} ${y - origin.y})`);
      const entry = findFlowchartNode(diagram, nodeId);
      node.position = {
        ...node.position,
        x: x - (entry?.parent ? getFlowchartNodeBounds(diagram, entry.parent).x : 0),
        y: y - (entry?.parent ? getFlowchartNodeBounds(diagram, entry.parent).y : 0)
      };
    };
    const finish = (finishEvent: PointerEvent) => {
      this.releasePointer(svg, finishEvent);
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);
      if (moved) {
        reparentFlowchartNode(diagram, nodeId);
        expandCanvasForNode(diagram, node);
        this.host.state.selectedNode = { diagramIndex, nodeId };
        this.host.state.selectedEdge = null;
        this.host.state.editingNode = null;
        this.host.state.editingEdge = null;
        this.host.persistDiagramModels();
        this.host.renderDocument();
      } else if (this.host.state.selectedNode?.diagramIndex === diagramIndex &&
        this.host.state.selectedNode.nodeId === nodeId) {
        this.host.state.editingNode = { diagramIndex, nodeId };
        this.host.renderDocument();
      } else {
        this.selectNode(diagramIndex, nodeId);
      }
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  private getSelectedNode(): FlowchartNode | null {
    const selected = this.host.state.selectedNode;
    const diagram = selected ? diagramAt(this.host.state, selected.diagramIndex) : null;
    return selected && diagram ? findFlowchartNode(diagram, selected.nodeId)?.node || null : null;
  }

  private getSelectedEdge(): FlowchartEdge | null {
    const selected = this.host.state.selectedEdge;
    const diagram = selected ? diagramAt(this.host.state, selected.diagramIndex) : null;
    return selected ? diagram?.edges[selected.edgeIndex] || null : null;
  }

  private clearSelection(): void {
    this.host.state.selectedNode = null;
    this.host.state.selectedEdge = null;
    this.host.state.editingNode = null;
    this.host.state.editingEdge = null;
    this.host.renderDocument();
  }

  private deleteSelected(): void {
    const selectedNode = this.host.state.selectedNode;
    const selectedEdge = this.host.state.selectedEdge;
    if (selectedNode) {
      const diagram = diagramAt(this.host.state, selectedNode.diagramIndex);
      if (!diagram) {
        return;
      }
      const attachedEdges = diagram.edges.filter((edge) => edge.source === selectedNode.nodeId || edge.target === selectedNode.nodeId);
      if (attachedEdges.length && !globalThis.confirm(`Delete this node and its ${attachedEdges.length} attached connector${attachedEdges.length === 1 ? "" : "s"}?`)) {
        return;
      }
      deleteNode(diagram, selectedNode.nodeId);
    } else if (selectedEdge) {
      const diagram = diagramAt(this.host.state, selectedEdge.diagramIndex);
      if (!diagram) {
        return;
      }
      deleteConnector(diagram, selectedEdge.edgeIndex);
    } else {
      return;
    }
    clearEditorState(this.host.state);
    this.host.persistDiagramModels();
    this.host.renderDocument();
  }

  private duplicateSelectedNode(): void {
    const selectedNode = this.host.state.selectedNode;
    if (!selectedNode) {
      return;
    }
    const diagram = diagramAt(this.host.state, selectedNode.diagramIndex);
    if (!diagram) {
      return;
    }
    const duplicate = duplicateNode(diagram, selectedNode.nodeId);
    if (!duplicate) {
      return;
    }
    this.host.state.selectedNode = { diagramIndex: selectedNode.diagramIndex, nodeId: duplicate.id };
    this.host.state.selectedEdge = null;
    this.host.persistDiagramModels();
    this.host.renderDocument();
  }

  private wireInlineEditor(editor: HTMLTextAreaElement): void {
    let settled = false;
    const commit = () => {
      if (settled) {
        return;
      }
      settled = true;
      if (editor.classList.contains("docdiagram-inline-editor-edge")) {
        const edge = this.getSelectedEdge();
        if (edge) {
          setEdgeLabel(edge, editor.value);
          this.host.persistDiagramModels();
        }
        this.host.state.editingEdge = null;
      } else {
        const node = this.getSelectedNode();
        if (node) {
          setNodeLabel(node, editor.value);
          this.host.persistDiagramModels();
        }
        this.host.state.editingNode = null;
      }
      this.host.renderDocument();
    };
    const cancel = () => {
      if (settled) {
        return;
      }
      settled = true;
      if (editor.classList.contains("docdiagram-inline-editor-edge")) {
        this.host.state.editingEdge = null;
      } else {
        this.host.state.editingNode = null;
      }
      this.host.renderDocument();
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

  private resizeNode(
    svg: SVGSVGElement,
    event: PointerEvent,
    group: Element,
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ): void {
    event.preventDefault();
    const diagramIndex = pointerNumber(group.getAttribute("data-diagram-index") || undefined);
    const nodeId = group.getAttribute("data-node-id") || "";
    const diagram = diagramAt(this.host.state, diagramIndex);
    const node = diagram ? findFlowchartNode(diagram, nodeId)?.node : null;
    if (!diagram || !node) {
      return;
    }
    const start = this.svgPoint(svg, event);
    const origin = getResizeNodeOrigin(node);
    let resized = false;
    this.capturePointer(svg, event);
    const move = (moveEvent: PointerEvent) => {
      const point = this.svgPoint(svg, moveEvent);
      resizeFlowchartNode(diagram, node, corner, point.x - start.x, point.y - start.y, origin);
      const width = Number(node.size?.width) || 190;
      const height = Number(node.size?.height) || 80;
      resized = resized || width !== origin.size.width || height !== origin.size.height;
      this.updateNodeSizeMarkup(group, node, width, height);
    };
    const finish = (finishEvent: PointerEvent) => {
      this.releasePointer(svg, finishEvent);
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);
      if (resized) {
        expandCanvasForNode(diagram, node);
        this.host.state.selectedNode = { diagramIndex, nodeId };
        this.host.state.selectedEdge = null;
        this.host.state.editingNode = null;
        this.host.state.editingEdge = null;
        this.host.persistDiagramModels();
        this.host.renderDocument();
      }
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  private updateNodeSizeMarkup(group: Element, node: FlowchartNode, width: number, height: number): void {
    const diagram = diagramAt(this.host.state, pointerNumber(group.getAttribute("data-diagram-index") || undefined));
    if (!diagram) {
      return;
    }
    const { x, y } = getFlowchartNodeBounds(diagram, node);
    const nodeBody = group.querySelector<SVGElement>(".docdiagram-node-body");
    const label = group.querySelector<SVGTextElement>(".docdiagram-node-label");
    const subtitle = group.querySelector<SVGTextElement>(".docdiagram-node-subtitle");
    const handles = group.querySelectorAll<SVGElement>(".docdiagram-resize-handle");
    if (!nodeBody) {
      return;
    }
    const style = getNodeEffectiveStyle(diagram, node);
    const geometry = getNodeGeometry(node, x, y, width, height);
    const layout = computeNodeTextLayout(geometry.textBounds, node);
    for (const detail of group.querySelectorAll(".docdiagram-node-detail")) {
      detail.remove();
    }
    nodeBody.outerHTML = renderNodeBody(geometry, style, Number(style.strokeWidth) || 2);
    for (const text of [label, subtitle]) {
      if (!text) {
        continue;
      }
      text.setAttribute("x", String(layout.centerX));
      text.setAttribute("y", String(text === label ? layout.labelStartY : layout.subtitleStartY));
      text.setAttribute("text-anchor", layout.textAnchor);
      for (const tspan of text.querySelectorAll("tspan")) {
        tspan.setAttribute("x", String(layout.centerX));
      }
    }
    for (const handle of handles) {
      const corner = handle.getAttribute("data-resize-corner");
      handle.setAttribute("x", String(corner?.endsWith("left") ? x - 7 : x + width - 7));
      handle.setAttribute("y", String(corner?.startsWith("top") ? y - 7 : y + height - 7));
    }
  }

  private getNodePortPoint(node: FlowchartNode, anchor: string): Position {
    const diagram = this.host.state.diagramModels.find((candidate): candidate is FlowchartDiagram => candidate.type === "flowchart" && findFlowchartNode(candidate, node.id)?.node === node);
    if (!diagram) {
      return { x: 0, y: 0 };
    }
    const bounds = getFlowchartNodeBounds(diagram, node);
    return getNodeGeometry(node, bounds.x, bounds.y, bounds.width, bounds.height).anchors[anchor];
  }

  private addConnectionTargetPorts(svg: SVGSVGElement, diagramIndex: number): void {
    const diagram = diagramAt(this.host.state, diagramIndex);
    if (!diagram) {
      return;
    }
    for (const { node } of flattenFlowchartNodes(diagram)) {
      for (const anchor of edgeAnchors) {
        const point = this.getNodePortPoint(node, anchor);
        const port = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        port.setAttribute("class", "docdiagram-connection-port docdiagram-connection-target-port");
        port.dataset.nodeId = node.id;
        port.dataset.anchor = anchor;
        port.setAttribute("cx", String(point.x));
        port.setAttribute("cy", String(point.y));
        port.setAttribute("r", "7");
        svg.append(port);
      }
    }
  }

  private beginConnectionDrag(svg: SVGSVGElement, event: PointerEvent, drag: ConnectionDrag): void {
    event.preventDefault();
    event.stopPropagation();
    this.host.state.connectionDrag = { ...drag, current: this.svgPoint(svg, event), invalid: false };
    this.addConnectionTargetPorts(svg, drag.diagramIndex);
    const preview = document.createElementNS("http://www.w3.org/2000/svg", "path");
    preview.setAttribute("class", "docdiagram-connection-preview");
    svg.append(preview);
    this.capturePointer(svg, event);

    const getDropPort = (pointerEvent: PointerEvent): Element | null => {
      const hit = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY);
      const hitPort = hit?.closest(".docdiagram-connection-port");
      if (hitPort) {
        return hitPort;
      }
      return [...svg.querySelectorAll<SVGElement>(".docdiagram-connection-port")].find((port) => {
        const bounds = port.getBoundingClientRect();
        return pointerEvent.clientX >= bounds.left && pointerEvent.clientX <= bounds.right &&
          pointerEvent.clientY >= bounds.top && pointerEvent.clientY <= bounds.bottom;
      }) || null;
    };
    const move = (moveEvent: PointerEvent) => {
      const dragState = this.host.state.connectionDrag;
      if (!dragState) {
        return;
      }
      const point = this.svgPoint(svg, moveEvent);
      const target = getDropPort(moveEvent);
      dragState.current = point;
      dragState.invalid = !target;
      const targetAnchor = target?.getAttribute("data-anchor") || dragState.sourceAnchor;
      preview.setAttribute("d", buildEdgePath(
        dragState.start, point, dragState.sourceAnchor, targetAnchor, "straight"
      ).path);
      preview.classList.toggle("docdiagram-connection-invalid", dragState.invalid);
    };
    const finish = (finishEvent: PointerEvent) => {
      this.releasePointer(svg, finishEvent);
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);
      const target = getDropPort(finishEvent);
      const dragState = this.host.state.connectionDrag;
      this.host.state.connectionDrag = null;
      if (target && dragState) {
        const diagram = diagramAt(this.host.state, dragState.diagramIndex);
        const targetNodeId = target.getAttribute("data-node-id") || target.closest(".docdiagram-node")?.getAttribute("data-node-id");
        const targetAnchor = target.getAttribute("data-anchor") || "";
        if (diagram && targetNodeId) {
          if (dragState.reconnect && dragState.edgeIndex !== undefined && dragState.endpoint) {
            const edge = diagram.edges[dragState.edgeIndex];
            if (edge) {
              reconnectConnector(edge, dragState.endpoint, targetNodeId, targetAnchor);
              this.host.state.selectedEdge = { diagramIndex: dragState.diagramIndex, edgeIndex: dragState.edgeIndex };
              this.host.state.selectedNode = null;
            }
          } else {
            const edge = createConnector(diagram, dragState.sourceNodeId, dragState.sourceAnchor, targetNodeId, targetAnchor);
            this.host.state.selectedEdge = { diagramIndex: dragState.diagramIndex, edgeIndex: diagram.edges.indexOf(edge) };
            this.host.state.selectedNode = null;
          }
          this.host.persistDiagramModels();
        }
      }
      this.host.renderDocument();
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  private beginCanvasPan(svg: SVGSVGElement, event: PointerEvent): void {
    const frame = svg.closest<HTMLElement>(".docdiagram");
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
    this.capturePointer(svg, event);
    const move = (moveEvent: PointerEvent) => {
      frame.scrollLeft = start.scrollLeft - (moveEvent.clientX - start.clientX);
      frame.scrollTop = start.scrollTop - (moveEvent.clientY - start.clientY);
    };
    const finish = (finishEvent: PointerEvent) => {
      this.releasePointer(svg, finishEvent);
      frame.classList.remove("docdiagram-panning");
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", finish);
      svg.removeEventListener("pointercancel", finish);
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", finish);
    svg.addEventListener("pointercancel", finish);
  }

  private svgPoint(svg: SVGSVGElement, event: PointerEvent): Position {
    const bounds = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    return {
      x: (event.clientX - bounds.left) * viewBox.width / bounds.width,
      y: (event.clientY - bounds.top) * viewBox.height / bounds.height
    };
  }

  private capturePointer(svg: SVGSVGElement, event: PointerEvent): void {
    if (event.isTrusted) {
      svg.setPointerCapture(event.pointerId);
    }
  }

  private releasePointer(svg: SVGSVGElement, event: PointerEvent): void {
    if (event.isTrusted && svg.hasPointerCapture(event.pointerId)) {
      svg.releasePointerCapture(event.pointerId);
    }
  }
}

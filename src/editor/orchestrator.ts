import {
  diagramThemes,
  edgeAnchors,
  edgeMarkerStyles,
  edgeRoutes,
  colourSchemes,
  nodeShapes,
  supportedDiagramTypes,
  type Diagram,
  type FlowchartDiagram,
  type FlowchartEdge,
  type FlowchartNode,
  type SequenceMessage,
  type SequenceNote,
  type SequenceParticipant
} from "../core/diagrams/schema";
import { escapeHtml, parseDiagram } from "../core/diagrams/parser";
import { serializeDiagram } from "../core/diagrams/serializer";
import { findFlowchartNode, flattenFlowchartNodes, getFlowchartNodeBounds, reparentFlowchartNode } from "../core/diagrams/hierarchy";
import {
  clampZoom,
  createNode,
  expandCanvasForNode,
  getResizeNodeOrigin,
  createUniqueNodeId,
  getDefaultNodePosition,
  duplicateNode,
  createConnector,
  reconnectConnector,
  resizeFlowchartNode,
  deleteConnector,
  deleteNode,
  setNodeLabel,
  setNodeShape,
  setNodeSubtitle,
  setNodeTextAlignment,
  setNodeStyleOverride,
  setNodeColorPalette,
  setNodeSize,
  setEdgeLabel,
  setEdgeRoute,
  setEdgeAnchor,
  setEdgeStyleOverride,
  setStyleStrokeWidth,
  setEdgeMarkerStart,
  setEdgeMarkerEnd
} from "../core/diagrams/mutations";
import {
  clampNodeSize,
  getEdgeEffectiveStyle,
  getEdgeMarkerStyle,
  getGridSize,
  getNodeColorPalette,
  getNodeEffectiveStyle,
  getTheme,
  snapToGrid
} from "../core/diagrams/styles";
import {
  buildEdgeMarkerDef,
  buildEdgePath,
  computeNodeTextLayout,
  getEdgeMarkerDimensions,
  getNodeGeometry,
  renderNodeBody,
  renderTextBlock,
  splitTextLines
} from "../core/diagrams/geometry";
import {
  findSourceTextRange,
  parseDocumentFrontmatter,
  resolveDocument,
  setFrontmatterColourScheme,
  scrollSourceEditorToRange,
  setFrontmatterTheme,
  validateDocumentSource
} from "../core/document";
import { isSafeUrl, renderInline, renderMarkdown as renderMarkdownCore } from "../core/markdown";
import { renderDiagramSource } from "../renderers/diagram";
import { injectStyles } from "../styles";
import { DiagramEditor } from "./diagram-editor";
import {
  buildEdgeInspectorFields,
  buildNodeInspectorFields,
  buildSequenceInspectorFields,
  wireEdgeInspector,
  wireNodeInspector,
  wireSequenceInspector
} from "./inspector";
import { SourceEditor } from "./source-editor";
import { clearEditorState, createEditorState, isDiagramEditing, type EditorState } from "./state";

type SequenceInspectable = SequenceParticipant | SequenceMessage | SequenceNote;

function isEditableElement(element: EventTarget | null): boolean {
  return element instanceof Element && element.matches("input, textarea, select, [contenteditable]");
}

export class BrowserRuntime {
  public readonly state: EditorState = createEditorState();
  private readonly sourceEditor: SourceEditor | null;
  private readonly diagramEditor: DiagramEditor | null;

  public constructor(
    private readonly sourceElement: HTMLTemplateElement | null,
    public readonly outputElement: HTMLElement | null
  ) {
    this.sourceEditor = outputElement ? new SourceEditor({
      outputElement,
      getSource: () => this.getSource(),
      getDocumentTheme: () => this.getDocumentTheme(),
      renderDocument: (source, options) => this.renderDocument(source, options),
      stopDiagramEditing: () => this.stopDiagramEditing(),
      closeDocumentMenu: () => this.closeDocumentMenu()
    }) : null;
    this.diagramEditor = outputElement ? new DiagramEditor({
      outputElement,
      state: this.state,
      persistDiagramModels: () => this.persistDiagramModels(),
      renderDocument: () => this.renderDocument()
    }) : null;
  }

  public getSource(): string {
    return this.sourceElement?.content.textContent || "";
  }

  public setSource(source: string): void {
    this.sourceElement?.content.replaceChildren(document.createTextNode(source));
  }

  public getDocumentTheme(): string {
    return this.state.documentTheme;
  }

  public stopDiagramEditing(): void {
    if (this.state.editingDiagramIndex !== null) {
      this.state.editingDiagramIndex = null;
      this.state.editSessionDiagram = null;
      clearEditorState(this.state);
    }
  }

  public renderDiagram(source: string, diagramIndex: number): string {
    return renderDiagramSource(source, diagramIndex, {
      colourScheme: this.state.documentColorScheme,
      state: {
        ...this.state,
        documentTheme: this.state.documentTheme,
        documentColorScheme: this.state.documentColorScheme
      },
      onDiagram: (index, diagram) => {
        this.state.diagramModels[index] = diagram;
      }
    });
  }

  public renderMarkdown(source: string, state = { diagramIndex: 0 }): string {
    return renderMarkdownCore(source, state, {
      renderDiagram: (diagramSource, index) => this.renderDiagram(diagramSource, index),
      documentColorScheme: this.state.documentColorScheme,
      documentTheme: this.state.documentTheme
    });
  }

  public persistDiagramModels(): void {
    let diagramIndex = 0;
    const sourceBeforePersistence = this.getSource().replace(/\r\n/g, "\n");
    const diagramsById = new Map<string, Diagram[]>();
    for (const diagram of this.state.diagramModels) {
      const id = (diagram as { id?: unknown }).id;
      if (typeof id === "string") {
        diagramsById.set(id, [...(diagramsById.get(id) || []), diagram]);
      }
    }
    const uniqueDiagramsById = new Map(
      [...diagramsById].flatMap(([id, diagrams]) => diagrams.length === 1 ? [[id, diagrams[0]] as const] : [])
    );
    const source = sourceBeforePersistence.replace(
      /^((?: {0,3}> ?)*)```diagram\s*\n([\s\S]*?)^((?: {0,3}> ?)*)```$/gm,
      (_, prefix: string, diagramSource: string, closingPrefix: string) => {
        const normalizedDiagramSource = diagramSource.replace(/^(?: {0,3}> ?)+/gm, "");
        const definitionId = normalizedDiagramSource.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean);
        const diagram = (definitionId && uniqueDiagramsById.get(definitionId)) || this.state.diagramModels[diagramIndex];
        diagramIndex += 1;
        const serializedDiagram = diagram ? serializeDiagram(diagram) : "";
        const serializedLines = serializedDiagram
          ? serializedDiagram.split("\n").map((line) => `${prefix}${line}`).join("\n")
          : "";
        return `${prefix}\`\`\`diagram\n${serializedLines ? `${serializedLines}\n` : ""}${closingPrefix}\`\`\``;
      }
    );
    this.setSource(source);
    this.sourceEditor?.syncSource(source);
  }

  public renderDocument(source = this.getSource(), { preserveOnError = false }: { preserveOnError?: boolean } = {}): boolean {
    if (!this.outputElement) {
      return false;
    }
    const scrollPositions = new Map(
      [...this.outputElement.querySelectorAll<HTMLElement>(".docdiagram")].map((diagram) => [
        Number(diagram.dataset.diagramIndex),
        { left: diagram.scrollLeft, top: diagram.scrollTop }
      ])
    );
    for (const diagram of this.outputElement.querySelectorAll<HTMLElement>(".docdiagram")) {
      this.state.diagramViewportHeights.set(Number(diagram.dataset.diagramIndex), diagram.offsetHeight);
    }
    const pageScroll = { x: globalThis.scrollX || 0, y: globalThis.scrollY || 0 };
    const previousModels = [...this.state.diagramModels];
    const previousTheme = this.state.documentTheme;
    const previousThemeSetting = this.state.documentThemeSetting;
    const previousColorScheme = this.state.documentColorScheme;
    this.state.diagramModels.length = 0;

    let markup: string;
    try {
      const parsedDocument = preserveOnError ? validateDocumentSource(source) : resolveDocument(source);
      this.state.documentTheme = parsedDocument.resolvedTheme;
      this.state.documentThemeSetting = parsedDocument.theme;
      this.state.documentColorScheme = parsedDocument.colourScheme;
      markup = this.renderMarkdown(parsedDocument.content);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.state.diagramModels.length = 0;
      this.state.diagramModels.push(...previousModels);
      if (preserveOnError) {
        this.state.documentTheme = previousTheme;
        this.state.documentThemeSetting = previousThemeSetting;
        this.state.documentColorScheme = previousColorScheme;
        this.sourceEditor?.setError(message);
        return false;
      }
      this.applyPageTheme(this.state.documentTheme);
      this.removeToolbarChrome();
      this.outputElement.innerHTML = `<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${escapeHtml(message)}</section>`;
      this.sourceEditor?.renderTray();
      return false;
    }

    this.setSource(source);
    this.sourceEditor?.clearError();
    this.outputElement.dataset.theme = this.state.documentTheme;
    this.outputElement.dataset.colourScheme = this.state.documentColorScheme;
    this.applyDocumentColourScheme(this.outputElement);
    this.outputElement.dataset.format = this.state.documentFormat;
    this.applyPageTheme(this.state.documentTheme);
    this.outputElement.innerHTML = markup;
    this.removeToolbarChrome();
    this.createToolbar();
    this.sourceEditor?.renderTray();
    const sourceTray = document.querySelector<HTMLElement>(".docdiagram-source-tray");
    if (sourceTray) {
      this.applyDocumentColourScheme(sourceTray);
    }
    this.diagramEditor?.enableCanvasPanning();
    this.diagramEditor?.enableSequenceSelection();
    if (this.state.editingDiagramIndex !== null) {
      this.diagramEditor?.enableEditing();
    }

    for (const diagram of this.outputElement.querySelectorAll<HTMLElement>(".docdiagram")) {
      const position = scrollPositions.get(Number(diagram.dataset.diagramIndex));
      if (position) {
        diagram.scrollLeft = position.left;
        diagram.scrollTop = position.top;
      }
    }
    globalThis.scrollTo?.(pageScroll.x, pageScroll.y);
    return true;
  }

  public closeDocumentMenu(): void {
    const menu = document.querySelector<HTMLElement>(".docdiagram-menu");
    const toggle = document.querySelector<HTMLButtonElement>(".docdiagram-menu-toggle");
    if (!menu || !toggle) {
      return;
    }
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  public downloadDocument(): void {
    this.sourceEditor?.flushRender();
    if (this.sourceEditor?.hasError && this.sourceEditor.hasUnsavedDraft &&
      !globalThis.confirm("Source has errors. Save the last valid version instead?")) {
      return;
    }
    const copy = document.documentElement.cloneNode(true) as HTMLElement;
    const sourceCopy = copy.querySelector<HTMLTemplateElement>("#source");
    const toolbar = copy.querySelector(".docdiagram-toolbar");
    const sourceTray = copy.querySelector(".docdiagram-source-tray");
    const output = copy.querySelector<HTMLElement>("#rendered-document");
    sourceCopy?.content.replaceChildren(document.createTextNode(this.getSource()));
    toolbar?.remove();
    sourceTray?.remove();
    output?.replaceChildren();
    output?.removeAttribute("data-editing-shortcuts-bound");
    const blob = new Blob([`<!doctype html>\n${copy.outerHTML}`], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    const title = document.title.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "document"}-edited.html`;
    link.click();
    URL.revokeObjectURL(link.href);
    this.state.savedSource = this.getSource();
  }

  public boot(): void {
    if (!this.sourceElement || !this.outputElement) {
      return;
    }
    injectStyles();
    this.state.savedSource = this.getSource();
    globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", () => {
      if (this.state.documentThemeSetting === "auto") {
        this.renderDocument();
      }
    });
    globalThis.addEventListener("beforeunload", (event) => {
      if (this.getSource() === this.state.savedSource && !this.sourceEditor?.hasUnsavedDraft) {
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    });
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "e" &&
        (this.sourceEditor?.isOpen || !isEditableElement(event.target))) {
        event.preventDefault();
        this.sourceEditor?.isOpen ? this.sourceEditor.close() : this.sourceEditor?.open();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        this.downloadDocument();
        return;
      }
      if (event.key === "Escape") {
        this.closeDocumentMenu();
      }
    });
    document.addEventListener("pointerdown", (event) => {
      const activeInlineEditor = document.activeElement;
      if (activeInlineEditor instanceof HTMLTextAreaElement &&
        activeInlineEditor.matches(".docdiagram-inline-editor") &&
        !(event.target instanceof Node && activeInlineEditor.contains(event.target))) {
        activeInlineEditor.blur();
      }
      const toolbar = document.querySelector<HTMLElement>(".docdiagram-toolbar");
      if (toolbar && event.target instanceof Node && !toolbar.contains(event.target)) {
        this.closeDocumentMenu();
      }
      if (!(event.target instanceof Element) || event.target.closest(
        ".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message"
      ) || (!this.state.selectedNode && !this.state.selectedEdge && !this.state.selectedSequenceElement)) {
        return;
      }
      clearEditorState(this.state);
      this.renderDocument();
    });
    this.outputElement.addEventListener("dblclick", (event) => {
      if (event.target instanceof Element && event.target.closest("button, input, textarea, select, [contenteditable]")) {
        return;
      }
      this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString() || "");
    });
    this.renderDocument();
  }

  public getCoreApi() {
    return {
      diagramThemes,
      colourSchemes,
      supportedDiagramTypes,
      nodeShapes,
      edgeAnchors,
      edgeRoutes,
      edgeMarkerStyles,
      getTheme: (diagram: { theme?: string }) => getTheme(diagram, this.state.documentTheme),
      getGridSize,
      expandCanvasForNode,
      flattenFlowchartNodes,
      getFlowchartNodeBounds,
      reparentFlowchartNode,
      createUniqueNodeId,
      getDefaultNodePosition,
      duplicateNode,
      createNode,
      getResizeNodeOrigin,
      createConnector,
      reconnectConnector,
      resizeFlowchartNode,
      deleteConnector,
      deleteNode,
      getNodeEffectiveStyle: (diagram: { theme?: string }, node: FlowchartNode) => getNodeEffectiveStyle(
        diagram,
        node,
        this.state.documentTheme,
        this.state.documentColorScheme
      ),
      getEdgeEffectiveStyle: (diagram: { theme?: string }, edge: FlowchartEdge) => getEdgeEffectiveStyle(
        diagram,
        edge,
        this.state.documentTheme
      ),
      getEdgeMarkerStyle,
      getEdgeMarkerDimensions,
      parseDiagram: (source: string) => parseDiagram(source, this.state.documentColorScheme),
      parseDocumentFrontmatter,
      resolveDocument,
      setFrontmatterTheme,
      isSafeUrl,
      renderInline,
      renderMarkdown: (source: string, state?: { diagramIndex: number }) => this.renderMarkdown(source, state),
      renderDiagram: (source: string, diagramIndex: number) => this.renderDiagram(source, diagramIndex),
      snapToGrid,
      clampNodeSize,
      serializeDiagram,
      setNodeLabel,
      setNodeShape,
      setNodeSubtitle,
      setNodeTextAlignment,
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
      validateDocumentSource,
      findSourceTextRange,
      scrollSourceEditorToRange,
      splitTextLines,
      renderTextBlock,
      computeNodeTextLayout,
      getNodeGeometry,
      renderNodeBody,
      buildEdgePath,
      buildEdgeInspectorFields,
      clampZoom
    };
  }

  private createToolbar(): void {
    if (!this.outputElement) {
      return;
    }
    const toolbar = document.createElement("section");
    toolbar.className = "docdiagram-toolbar";
    toolbar.dataset.editing = String(this.state.editingDiagramIndex !== null);
    toolbar.dataset.theme = this.state.documentTheme;
    toolbar.dataset.colourScheme = this.state.documentColorScheme;
    toolbar.dataset.format = this.state.documentFormat;

    const node = this.getSelectedNode();
    const edge = !node ? this.getSelectedEdge() : null;
    const sequenceElement = !node && !edge ? this.getSelectedSequenceElement() : null;
    const inspectorDiagram = node && this.state.selectedNode
      ? this.state.diagramModels[this.state.selectedNode.diagramIndex]
      : edge && this.state.selectedEdge
        ? this.state.diagramModels[this.state.selectedEdge.diagramIndex]
        : sequenceElement && this.state.selectedSequenceElement
          ? this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]
          : null;

    toolbar.innerHTML = [
      `<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">☰</button>`,
      `<div class="docdiagram-menu" hidden>`,
      `<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">`,
      `<option value="auto"${this.state.documentThemeSetting === "auto" ? " selected" : ""}>Auto</option>`,
      `<option value="light"${this.state.documentThemeSetting === "light" ? " selected" : ""}>Light</option>`,
      `<option value="dark"${this.state.documentThemeSetting === "dark" ? " selected" : ""}>Dark</option>`,
      `</select></label>`,
      `<label class="docdiagram-theme-control">Colour scheme<select class="docdiagram-colour-scheme-select">${Object.entries(colourSchemes).map(([name, scheme]) => `<option value="${name}"${this.state.documentColorScheme === name ? " selected" : ""}>${scheme.label}</option>`).join("")}</select></label>`,
      `<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">`,
      `<option value="centered"${this.state.documentFormat === "centered" ? " selected" : ""}>Centered</option>`,
      `<option value="full-width"${this.state.documentFormat === "full-width" ? " selected" : ""}>Full width</option>`,
      `</select></label>`,
      `<button type="button" class="docdiagram-edit-source">Edit source</button>`,
      `<button type="button" class="docdiagram-save">Save As</button>`,
      `<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>`,
      `</div>`,
      node && inspectorDiagram?.type === "flowchart"
        ? `<div class="docdiagram-inspector" data-kind="node">${buildNodeInspectorFields(inspectorDiagram, node, this.state.documentColorScheme, this.state.documentTheme)}</div>`
        : edge && inspectorDiagram
          ? `<div class="docdiagram-inspector" data-kind="edge">${buildEdgeInspectorFields(inspectorDiagram, edge)}</div>`
          : sequenceElement && inspectorDiagram
            ? `<div class="docdiagram-inspector" data-kind="sequence">${buildSequenceInspectorFields(inspectorDiagram, this.state.selectedSequenceElement!, sequenceElement, this.state.documentColorScheme, this.state.documentTheme)}</div>`
            : ""
    ].join("");
    const menuToggle = toolbar.querySelector<HTMLButtonElement>(".docdiagram-menu-toggle");
    const menu = toolbar.querySelector<HTMLElement>(".docdiagram-menu");
    menuToggle?.addEventListener("click", () => {
      if (!menu) {
        return;
      }
      const open = menu.hidden;
      menu.hidden = !open;
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    toolbar.querySelector<HTMLButtonElement>(".docdiagram-save")?.addEventListener("click", () => this.downloadDocument());
    toolbar.querySelector<HTMLButtonElement>(".docdiagram-edit-source")?.addEventListener("click", () => {
      this.closeDocumentMenu();
      this.sourceEditor?.open();
    });
    toolbar.querySelector<HTMLSelectElement>(".docdiagram-theme-select")?.addEventListener("change", (event) => {
      this.setSource(setFrontmatterTheme(this.getSource(), (event.currentTarget as HTMLSelectElement).value));
      this.renderDocument();
    });
    toolbar.querySelector<HTMLSelectElement>(".docdiagram-colour-scheme-select")?.addEventListener("change", (event) => {
      this.setSource(setFrontmatterColourScheme(this.getSource(), (event.currentTarget as HTMLSelectElement).value));
      this.renderDocument();
    });
    toolbar.querySelector<HTMLSelectElement>(".docdiagram-format-select")?.addEventListener("change", (event) => {
      this.state.documentFormat = (event.currentTarget as HTMLSelectElement).value === "full-width" ? "full-width" : "centered";
      this.renderDocument();
    });
    this.outputElement.before(toolbar);
    this.applyDocumentColourScheme(toolbar);

    if (node && this.state.selectedNode) {
      wireNodeInspector(this, toolbar, this.state.selectedNode.diagramIndex, this.state.selectedNode.nodeId);
      this.positionInspector(this.state.selectedNode.diagramIndex);
    } else if (edge && this.state.selectedEdge) {
      wireEdgeInspector(this, toolbar, this.state.selectedEdge.diagramIndex, this.state.selectedEdge.edgeIndex);
      this.positionInspector(this.state.selectedEdge.diagramIndex);
    } else if (sequenceElement && this.state.selectedSequenceElement) {
      wireSequenceInspector(this, toolbar, sequenceElement);
      this.positionInspector(this.state.selectedSequenceElement.diagramIndex);
    }
    this.wireChromeControls();
  }

  private getSelectedNode(): FlowchartNode | null {
    const selected = this.state.selectedNode;
    const diagram = selected ? this.state.diagramModels[selected.diagramIndex] : null;
    return selected && diagram?.type === "flowchart" && isDiagramEditing(this.state, selected.diagramIndex)
      ? findFlowchartNode(diagram, selected.nodeId)?.node || null
      : null;
  }

  private getSelectedEdge(): FlowchartEdge | null {
    const selected = this.state.selectedEdge;
    const diagram = selected ? this.state.diagramModels[selected.diagramIndex] : null;
    return selected && diagram?.type === "flowchart" && isDiagramEditing(this.state, selected.diagramIndex)
      ? diagram.edges[selected.edgeIndex] || null
      : null;
  }

  private getSelectedSequenceElement(): SequenceInspectable | null {
    const selected = this.state.selectedSequenceElement;
    const diagram = selected ? this.state.diagramModels[selected.diagramIndex] : null;
    if (!selected || diagram?.type !== "sequence" || !isDiagramEditing(this.state, selected.diagramIndex)) {
      return null;
    }
    if (selected.kind === "participant") {
      return diagram.participants?.find((participant) => participant.id === selected.id) || null;
    }
    return selected.kind === "message"
      ? diagram.messages?.[selected.index] || null
      : diagram.notes?.[selected.index] || null;
  }

  private applyDocumentColourScheme(element: HTMLElement): void {
    const background = getNodeColorPalette(this.state.documentColorScheme, this.state.documentTheme, "background");
    const pale = getNodeColorPalette(this.state.documentColorScheme, this.state.documentTheme, "pale");
    const neutral = getNodeColorPalette(this.state.documentColorScheme, this.state.documentTheme, "neutral");
    const accent = getNodeColorPalette(this.state.documentColorScheme, this.state.documentTheme, "accent");
    if (!background || !pale || !neutral || !accent) {
      return;
    }
    element.style.setProperty("--docdiagram-background", background.fill || "");
    element.style.setProperty("--docdiagram-border", neutral.stroke || "");
    element.style.setProperty("--docdiagram-control-background", pale.fill || "");
    element.style.setProperty("--docdiagram-control-hover", neutral.fill || "");
    element.style.setProperty("--docdiagram-code-background", pale.fill || "");
    element.style.setProperty("--docdiagram-text", background.text || "");
    element.style.setProperty("--docdiagram-muted", neutral.text || "");
    element.style.setProperty("--docdiagram-accent", accent.stroke || "");
  }

  private wireChromeControls(): void {
    if (!this.outputElement) {
      return;
    }
    for (const button of this.outputElement.querySelectorAll<HTMLButtonElement>(".docdiagram-zoom-in, .docdiagram-zoom-out")) {
      button.addEventListener("click", () => {
        const diagramIndex = Number(button.dataset.diagramIndex);
        const current = this.state.diagramZooms.get(diagramIndex) || 100;
        const direction = button.classList.contains("docdiagram-zoom-in") ? 25 : -25;
        this.state.diagramZooms.set(diagramIndex, clampZoom(current + direction));
        this.renderDocument();
      });
    }
    for (const button of this.outputElement.querySelectorAll<HTMLButtonElement>(".docdiagram-fit")) {
      button.addEventListener("click", () => {
        this.state.diagramZooms.set(Number(button.dataset.diagramIndex), 100);
        this.renderDocument();
      });
    }
    for (const button of this.outputElement.querySelectorAll<HTMLButtonElement>(".docdiagram-start-editing")) {
      button.addEventListener("click", () => {
        const diagramIndex = Number(button.closest(".docdiagram")?.getAttribute("data-diagram-index"));
        const diagram = this.state.diagramModels[diagramIndex];
        if (!diagram) {
          return;
        }
        this.state.editSessionDiagram = parseDiagram(serializeDiagram(diagram), this.state.documentColorScheme);
        this.state.editingDiagramIndex = diagramIndex;
        clearEditorState(this.state);
        this.renderDocument();
      });
    }
    for (const button of this.outputElement.querySelectorAll<HTMLButtonElement>(".docdiagram-done-editing")) {
      button.addEventListener("click", () => this.exitEditing(this.state.editingDiagramIndex, false));
    }
    for (const button of this.outputElement.querySelectorAll<HTMLButtonElement>(".docdiagram-cancel-editing")) {
      button.addEventListener("click", () => this.exitEditing(this.state.editingDiagramIndex, true));
    }
    for (const button of this.outputElement.querySelectorAll<HTMLButtonElement>(".docdiagram-create-node")) {
      button.addEventListener("click", () => this.createNewNode(Number(button.dataset.diagramIndex)));
    }
  }

  private exitEditing(diagramIndex: number | null, discard: boolean): void {
    if (diagramIndex === null) {
      return;
    }
    if (discard && this.state.editSessionDiagram) {
      this.state.diagramModels[diagramIndex] = this.state.editSessionDiagram;
      this.persistDiagramModels();
    }
    this.state.editingDiagramIndex = null;
    this.state.editSessionDiagram = null;
    clearEditorState(this.state);
    this.renderDocument();
  }

  private createNewNode(diagramIndex: number): void {
    const diagram = this.state.diagramModels[diagramIndex];
    if (!diagram || diagram.type !== "flowchart") {
      return;
    }
    const node = createNode(diagram);
    this.state.selectedNode = { diagramIndex, nodeId: node.id };
    this.state.selectedEdge = null;
    this.persistDiagramModels();
    this.renderDocument();
  }

  private positionInspector(diagramIndex: number): void {
    if (!this.outputElement) {
      return;
    }
    const inspector = document.querySelector<HTMLElement>(".docdiagram-inspector");
    const diagram = this.outputElement.querySelector<HTMLElement>(`.docdiagram[data-diagram-index="${diagramIndex}"]`);
    if (!inspector || !diagram) {
      return;
    }
    inspector.style.top = `${Math.max(16, diagram.getBoundingClientRect().top)}px`;
  }

  private applyPageTheme(theme: string): void {
    document.documentElement.dataset.docdiagramTheme = theme;
    document.body?.dataset && (document.body.dataset.docdiagramTheme = theme);
  }

  private removeToolbarChrome(): void {
    if (!this.outputElement) {
      return;
    }
    while (this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar")) {
      this.outputElement.previousElementSibling.remove();
    }
  }
}

import { findSourceTextRange, scrollSourceEditorToRange } from "../core/document";

const referenceUrl = "https://sparkkz-nz.github.io/skryb/docs/reference.html";

const insertTemplates: Record<string, string> = {
  flowchart: [
    "```diagram",
    "id: new-flowchart",
    "type: flowchart",
    "canvas:",
    "  width: 600",
    "  height: 300",
    "nodes:",
    "  - id: first-node",
    "    label: First node",
    "    shape: rounded-rectangle",
    "    position: { x: 80, y: 110 }",
    "  - id: second-node",
    "    label: Second node",
    "    shape: rounded-rectangle",
    "    position: { x: 330, y: 110 }",
    "edges:",
    "  - source: first-node",
    "    target: second-node",
    "    sourceAnchor: right",
    "    targetAnchor: left",
    "```"
  ].join("\n"),
  sequence: [
    "```diagram",
    "id: new-sequence",
    "type: sequence",
    "participants:",
    "  - id: first-participant",
    "    label: First participant",
    "  - id: second-participant",
    "    label: Second participant",
    "messages:",
    "  - from: first-participant",
    "    to: second-participant",
    "    label: Request",
    "```"
  ].join("\n"),
  "diagram-reference": ":::diagram { id=diagram-id }",
  panel: [
    ":::panel { title=\"New panel\" palette=accent }",
    "Panel content.",
    ":::"
  ].join("\n"),
  grid: [
    ":::grid { columns=2 }",
    ":::panel { title=\"First panel\" }",
    "First panel content.",
    ":::",
    "",
    ":::panel { title=\"Second panel\" }",
    "Second panel content.",
    ":::",
    ":::"
  ].join("\n")
};

function getUniqueDiagramId(source: string, prefix: string): string {
  const ids = new Set(
    [...source.matchAll(/(?:\bid:\s*|:::diagram\s+\{\s*id=)(?:"([^"]+)"|([^\s}\n#]+))/g)]
      .map((match) => match[1] || match[2])
  );
  let suffix = 1;
  let candidate = prefix;
  while (ids.has(candidate)) {
    suffix += 1;
    candidate = `${prefix}-${suffix}`;
  }
  return candidate;
}

function getInsertTemplate(name: string, source: string): string | null {
  const template = insertTemplates[name];
  if (!template) {
    return null;
  }
  if (name === "flowchart") {
    return template.replace("id: new-flowchart", `id: ${getUniqueDiagramId(source, "new-flowchart")}`);
  }
  if (name === "sequence") {
    return template.replace("id: new-sequence", `id: ${getUniqueDiagramId(source, "new-sequence")}`);
  }
  if (name === "diagram-reference") {
    const id = getUniqueDiagramId(source, "diagram-reference");
    return template.replace("diagram-id", id);
  }
  return template;
}

export interface SourceEditorHost {
  readonly outputElement: HTMLElement;
  getSource(): string;
  getDocumentTheme(): string;
  renderDocument(source?: string, options?: { preserveOnError?: boolean }): boolean;
  stopDiagramEditing(): void;
  closeDocumentMenu(): void;
}

export class SourceEditor {
  private renderTimer: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private openState = false;
  private draft = "";
  private error = "";

  public constructor(private readonly host: SourceEditorHost) {}

  public get isOpen(): boolean {
    return this.openState;
  }

  public get hasUnsavedDraft(): boolean {
    return this.openState && this.draft !== this.host.getSource();
  }

  public get hasError(): boolean {
    return this.error.length > 0;
  }

  public get draftSource(): string {
    return this.draft;
  }

  public setError(error: string): void {
    this.error = error;
    this.updateStatus();
  }

  public clearError(): void {
    this.error = "";
  }

  public open(): void {
    globalThis.clearTimeout(this.renderTimer ?? undefined);
    this.renderTimer = null;
    this.draft = this.host.getSource();
    this.error = "";
    this.openState = true;
    this.host.stopDiagramEditing();
    this.host.renderDocument();
    const focus = () => this.focus();
    globalThis.requestAnimationFrame?.(focus) ?? focus();
  }

  public close(): void {
    this.flushRender();
    if (this.error && this.draft !== this.host.getSource() &&
      !globalThis.confirm("Discard the invalid source changes?")) {
      return;
    }

    this.openState = false;
    this.draft = "";
    this.error = "";
    this.renderTray();
    document.querySelector<HTMLButtonElement>(".docdiagram-menu-toggle")?.focus();
  }

  public flushRender(): boolean {
    return this.renderTimer === null ? true : this.renderDraft();
  }

  public syncSource(source: string): void {
    if (!this.openState) {
      return;
    }

    this.draft = source;
    this.error = "";
    const editor = document.querySelector<HTMLTextAreaElement>(".docdiagram-source-editor");
    if (!editor) {
      return;
    }

    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const scrollTop = editor.scrollTop;
    editor.value = source;
    editor.setSelectionRange(
      Math.min(selectionStart, source.length),
      Math.min(selectionEnd, source.length)
    );
    editor.scrollTop = scrollTop;
    this.updateStatus();
  }

  public reveal(text: string): boolean {
    const range = findSourceTextRange(this.host.getSource(), text);
    if (!range || this.hasUnsavedDraft) {
      return false;
    }

    if (!this.openState) {
      this.open();
    }

    const selectMatch = () => {
      const editor = document.querySelector<HTMLTextAreaElement>(".docdiagram-source-editor");
      if (!editor) {
        return;
      }
      editor.focus();
      editor.setSelectionRange(range.start, range.end);
      scrollSourceEditorToRange(editor, range);
    };

    globalThis.requestAnimationFrame?.(selectMatch) ?? selectMatch();
    return true;
  }

  public renderTray(): void {
    let tray = document.querySelector<HTMLElement>(".docdiagram-source-tray");
    if (!this.openState) {
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
      tray?.remove();
      delete this.host.outputElement.dataset.sourceEditorOpen;
      this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");
      return;
    }

    if (tray) {
      tray.dataset.theme = this.host.getDocumentTheme();
      this.host.outputElement.dataset.sourceEditorOpen = "true";
      this.updateStatus();
      return;
    }

    tray = document.createElement("section");
    tray.className = "docdiagram-source-tray";
    tray.dataset.theme = this.host.getDocumentTheme();
    tray.setAttribute("aria-label", "Document source editor");
    tray.innerHTML = [
      `<header class="docdiagram-source-header">`,
      `<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>`,
      `<div class="docdiagram-source-actions">`,
      `<button type="button" class="docdiagram-source-menu-toggle" aria-label="Source editor menu" aria-expanded="false" title="Source editor menu">☰</button>`,
      `<div class="docdiagram-source-menu" hidden>`,
      `<div class="docdiagram-source-menu-heading">Insert</div>`,
      `<button type="button" data-source-template="flowchart">Flowchart</button>`,
      `<button type="button" data-source-template="sequence">Sequence</button>`,
      `<button type="button" data-source-template="diagram-reference">Diagram Reference</button>`,
      `<button type="button" data-source-template="panel">Panel</button>`,
      `<button type="button" data-source-template="grid">Grid</button>`,
      `<button type="button" class="docdiagram-source-help">Help</button>`,
      `</div>`,
      `<button type="button" class="docdiagram-source-close" aria-label="Close source editor" title="Close source editor">×</button>`,
      `</div>`,
      `</header>`,
      `<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>`,
      `<p class="docdiagram-source-status" aria-live="polite"></p>`,
      `<p class="docdiagram-source-error" role="alert"></p>`
    ].join("");
    const editor = tray.querySelector<HTMLTextAreaElement>(".docdiagram-source-editor");
    const closeButton = tray.querySelector<HTMLButtonElement>(".docdiagram-source-close");
    const menuToggle = tray.querySelector<HTMLButtonElement>(".docdiagram-source-menu-toggle");
    const menu = tray.querySelector<HTMLElement>(".docdiagram-source-menu");
    if (!editor || !closeButton || !menuToggle || !menu) {
      return;
    }

    editor.value = this.draft;
    editor.addEventListener("input", () => {
      this.draft = editor.value;
      this.error = "";
      this.updateStatus();
      this.scheduleRender();
    });
    closeButton.addEventListener("click", () => this.close());
    menuToggle.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    for (const button of tray.querySelectorAll<HTMLButtonElement>("[data-source-template]")) {
      button.addEventListener("click", () => {
        const template = getInsertTemplate(button.dataset.sourceTemplate || "", editor.value);
        if (!template) {
          return;
        }
        this.insertTemplate(editor, template);
        menu.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
      });
    }
    tray.querySelector<HTMLButtonElement>(".docdiagram-source-help")?.addEventListener("click", () => {
      globalThis.open(referenceUrl, "_blank", "noopener");
    });
    tray.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {
        event.preventDefault();
        menu.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
    this.host.outputElement.after(tray);
    this.host.outputElement.dataset.sourceEditorOpen = "true";
    const syncTrayHeight = () => {
      this.host.outputElement.style.setProperty("--docdiagram-source-tray-height", `${tray?.offsetHeight || 0}px`);
    };
    this.resizeObserver?.disconnect();
    if (globalThis.ResizeObserver) {
      this.resizeObserver = new globalThis.ResizeObserver(syncTrayHeight);
      this.resizeObserver.observe(tray);
    }
    syncTrayHeight();
    this.updateStatus();
  }

  private scheduleRender(): void {
    globalThis.clearTimeout(this.renderTimer ?? undefined);
    this.renderTimer = globalThis.setTimeout(() => {
      this.renderTimer = null;
      this.renderDraft();
    }, 250);
  }

  private renderDraft(): boolean {
    globalThis.clearTimeout(this.renderTimer ?? undefined);
    this.renderTimer = null;
    return this.host.renderDocument(this.draft, { preserveOnError: true });
  }

  private updateStatus(): void {
    const tray = document.querySelector<HTMLElement>(".docdiagram-source-tray");
    if (!tray) {
      return;
    }

    const status = tray.querySelector<HTMLElement>(".docdiagram-source-status");
    const error = tray.querySelector<HTMLElement>(".docdiagram-source-error");
    if (!status || !error) {
      return;
    }
    status.textContent = this.error ? "Source has errors; showing the last valid render." : "Changes render automatically.";
    error.hidden = !this.error;
    error.textContent = this.error;
  }

  private insertTemplate(editor: HTMLTextAreaElement, template: string): void {
    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const lineStart = editor.value.lastIndexOf("\n", selectionStart - 1) + 1;
    const lineEnd = editor.value.indexOf("\n", selectionStart);
    const currentLineEnd = lineEnd === -1 ? editor.value.length : lineEnd;
    const currentLine = editor.value.slice(lineStart, currentLineEnd);
    const insertionStart = /^\s*$/.test(currentLine) ? selectionStart : currentLineEnd;
    const insertionEnd = /^\s*$/.test(currentLine) ? selectionEnd : currentLineEnd;
    const insertion = insertionStart === currentLineEnd ? `\n${template}` : template;

    editor.setRangeText(insertion, insertionStart, insertionEnd, "end");
    this.draft = editor.value;
    this.error = "";
    this.updateStatus();
    this.scheduleRender();
    editor.focus();
  }

  private focus(): void {
    const editor = document.querySelector<HTMLTextAreaElement>(".docdiagram-source-editor");
    if (!editor) {
      return;
    }

    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }
}

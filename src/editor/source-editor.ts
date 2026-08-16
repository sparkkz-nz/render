import { findSourceTextRange, scrollSourceEditorToRange } from "../core/document";

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
      `<button type="button" class="docdiagram-source-close">Close source editor</button>`,
      `</header>`,
      `<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>`,
      `<p class="docdiagram-source-status" aria-live="polite"></p>`,
      `<p class="docdiagram-source-error" role="alert"></p>`
    ].join("");
    const editor = tray.querySelector<HTMLTextAreaElement>(".docdiagram-source-editor");
    const closeButton = tray.querySelector<HTMLButtonElement>(".docdiagram-source-close");
    if (!editor || !closeButton) {
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

  private focus(): void {
    const editor = document.querySelector<HTMLTextAreaElement>(".docdiagram-source-editor");
    if (!editor) {
      return;
    }

    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }
}

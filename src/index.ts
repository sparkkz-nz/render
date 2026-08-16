import { BrowserRuntime } from "./editor/orchestrator";

const sourceElement = document.querySelector<HTMLTemplateElement>("#source");
const outputElement = document.querySelector<HTMLElement>("#rendered-document");
const runtime = new BrowserRuntime(sourceElement, outputElement);

type DocDiagramCore = ReturnType<BrowserRuntime["getCoreApi"]>;
const runtimeGlobal = globalThis as typeof globalThis & { DocDiagramCore: DocDiagramCore };

runtimeGlobal.DocDiagramCore = runtime.getCoreApi();
runtime.boot();

type RuntimeFetchResponse = {
  ok: boolean;
  status?: number;
  text(): Promise<string>;
};

export type RuntimeFetcher = (url: string) => Promise<RuntimeFetchResponse>;

const runtimePlaceholderAttribute = "data-docdiagram-offline-runtime-placeholder";
const embeddedRuntimeSelector = 'script[data-docdiagram-runtime="embedded"]';
const defaultRuntimeUrl = "https://sparkkz-nz.github.io/skryb/latest/skryb-runtime.js";

function getPackagedRuntimeSource(): string | null {
  const runtime = globalThis as typeof globalThis & { DocDiagramRuntimeSource?: unknown };
  return typeof runtime.DocDiagramRuntimeSource === "string" ? runtime.DocDiagramRuntimeSource : null;
}

export function getPortableRuntimeUrl(runtimeUrl: string): string {
  return /^https?:\/\//i.test(runtimeUrl) ? runtimeUrl : defaultRuntimeUrl;
}

export async function fetchRuntimeSource(
  runtimeUrl: string,
  fetchRuntime: RuntimeFetcher = globalThis.fetch.bind(globalThis)
): Promise<string> {
  const response = await fetchRuntime(runtimeUrl);
  if (!response.ok) {
    throw new Error(`Could not fetch the Skryb runtime (${response.status || "unknown status"}).`);
  }
  return response.text();
}

export function embedRuntimeInDocumentHtml(documentHtml: string, runtimeSource: string, runtimeUrl = ""): string {
  const runtimePlaceholder = new RegExp(
    `<script\\b[^>]*\\b${runtimePlaceholderAttribute}\\b[^>]*>[\\s\\S]*?<\\/script>\\s*`,
    "i"
  );
  if (!runtimePlaceholder.test(documentHtml)) {
    throw new Error("Could not find the selected Skryb runtime in this document.");
  }
  const withoutExternalRuntime = documentHtml.replace(runtimePlaceholder, "");
  const closingBody = /<\/body\s*>/i;
  if (!closingBody.test(withoutExternalRuntime)) {
    throw new Error("Could not find the document body for offline export.");
  }
  const safeRuntimeSource = runtimeSource.replace(/<\/script/gi, "<\\/script");
  const runtimeUrlAttribute = runtimeUrl
    ? ` data-docdiagram-runtime-url="${escapeAttribute(runtimeUrl)}"`
    : "";
  const embeddedRuntime = `<script data-docdiagram-runtime="embedded"${runtimeUrlAttribute}>\n${safeRuntimeSource}\n</script>\n`;
  return withoutExternalRuntime.replace(closingBody, () => `${embeddedRuntime}</body>`);
}

export async function getRuntimeSourceForOfflineExport(
  documentCopy: HTMLElement,
  fetchRuntime?: RuntimeFetcher
): Promise<{ source: string; runtimeUrl: string }> {
  const embeddedRuntime = documentCopy.querySelector<HTMLScriptElement>(embeddedRuntimeSelector);
  if (embeddedRuntime) {
    embeddedRuntime.setAttribute(runtimePlaceholderAttribute, "");
    return {
      source: embeddedRuntime.textContent || "",
      runtimeUrl: getPortableRuntimeUrl(embeddedRuntime.dataset.docdiagramRuntimeUrl || "")
    };
  }

  const runtime = documentCopy.querySelector<HTMLScriptElement>('script[src*="skryb-runtime.js"]');
  if (!runtime) {
    throw new Error("Could not find the selected Skryb runtime in this document.");
  }
  runtime.setAttribute(runtimePlaceholderAttribute, "");
  const packagedRuntimeSource = getPackagedRuntimeSource();
  return {
    source: packagedRuntimeSource || await fetchRuntimeSource(runtime.src, fetchRuntime),
    runtimeUrl: getPortableRuntimeUrl(runtime.getAttribute("src") || runtime.src)
  };
}

export function restoreExternalRuntimeForSaveAs(documentCopy: HTMLElement): void {
  const embeddedRuntime = documentCopy.querySelector<HTMLScriptElement>(embeddedRuntimeSelector);
  if (!embeddedRuntime) {
    return;
  }
  const runtimeUrl = getPortableRuntimeUrl(embeddedRuntime.dataset.docdiagramRuntimeUrl || "");
  const script = documentCopy.ownerDocument.createElement("script");
  script.src = runtimeUrl;
  script.defer = true;
  embeddedRuntime.replaceWith(script);
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

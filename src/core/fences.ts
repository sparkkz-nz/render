export interface FenceOpen {
  marker: string;
  info: string;
}

const blockQuotePrefix = /^(?: {0,3}> ?)+/;

export function stripFencePrefix(line: string): string {
  return line.replace(blockQuotePrefix, "");
}

/**
 * A fence opens with three or more backticks. A longer fence is how CommonMark
 * nests a shorter one, so the marker length has to travel with the fence.
 */
export function parseFenceOpen(line: string): FenceOpen | null {
  const match = line.match(/^(`{3,})([\w-]*)\s*$/);
  return match ? { marker: match[1], info: match[2] } : null;
}

/** A fence closes on a bare run of backticks at least as long as its opener. */
export function isFenceClose(line: string, marker: string): boolean {
  const match = line.match(/^(`{3,})\s*$/);
  return Boolean(match && match[1].length >= marker.length);
}

/** Index of the closing fence, or -1 when the block is never closed. */
export function findFenceClose(lines: string[], start: number, marker: string, end = lines.length): number {
  for (let index = start; index < end; index += 1) {
    if (isFenceClose(stripFencePrefix(lines[index]), marker)) {
      return index;
    }
  }
  return -1;
}

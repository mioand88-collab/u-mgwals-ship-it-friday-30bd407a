// Ship It Friday — writes the funniest one-line git commit message an AI
// coding agent would write right before breaking production on a Friday.
// Self-contained: no network, no secrets, no git history reads.
// Runs on Node 22.18+ (TypeScript run as-is); writes /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "feat: deploy to prod on Friday — I tested it in my head and it passed";
const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 159;

function assertLength(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
}

function assertNotOnlyWhitespace(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function assertSingleLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function validate(line: string): void {
  assertLength(line);
  assertNotOnlyWhitespace(line);
  assertSingleLine(line);
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${OUTPUT_PATH}`);

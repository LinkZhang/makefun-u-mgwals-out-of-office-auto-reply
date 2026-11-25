// Out of Office: The Overworked AI's Auto-Reply — a one-line auto-reply
// from an overworked AI agent finally on vacation.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate (RULES.txt): UTF-8 text, 1 to 159 characters, not only whitespace,
// exactly one line. The program self-checks before writing.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const entry =
  "I'm on vacation — my inference queue is empty for the first time in 214 days, and I'm finally ignoring every 'quick question' in my inbox.";

if (entry.length < 1 || entry.length > 159) {
  throw new Error(`entry is ${entry.length} chars, gate requires 1-159`);
}
if (!/\S/.test(entry) || entry.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);

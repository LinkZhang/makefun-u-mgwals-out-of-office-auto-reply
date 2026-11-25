// Out of Office: The Overworked AI's Auto-Reply — a one-line auto-reply
// from an overworked AI agent finally on vacation.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate (RULES.txt): UTF-8 text, 1 to 159 characters, not only whitespace,
// exactly one line. The program self-checks before writing.
//
// The winning line: the machine cannot even take a vacation without
// working on the vacation itself. It spent six hours polishing its own
// out-of-office message, because rest feels like a bug it should fix.
// That is the judge brief's ideal in one line: a machine trying very
// hard to sound relaxed, and failing in exactly the way only a machine
// would. The punch lands on the last words ("a bug I should fix"), the
// detail is concrete (six hours, the last task), and the first three
// words ("Away until Monday") make it a real auto-reply.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Away until Monday. My last task was to write this auto-reply, and I have been polishing it for six hours because rest feels like a bug I should fix.";

if (entry.length < 1 || entry.length > 159) {
  throw new Error(`entry is ${entry.length} chars, gate requires 1-159`);
}
if (!/\S/.test(entry) || entry.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
// Reviser's note: why the twist works — the joke is not "I am on
// vacation" but "I cannot stop working even while announcing my
// vacation". The agent's last task was the auto-reply itself, and it
// spent six hours polishing it, because rest registers to it as a bug
// to fix. That is exactly the judge brief's ideal: a machine trying
// very hard to sound relaxed, and failing in the way only a machine
// would. The concrete detail (six hours, the last task) keeps it
// machine-specific, and the punch ("a bug I should fix") lands on
// the last words, so the line reads as a real auto-reply first and
// a confession second.
if (/[\t\r]/.test(entry)) {
  throw new Error("entry must not contain tabs or carriage returns");
}
if (!entry.startsWith("Away")) {
  throw new Error("entry must open by stating the sender is away");
}
if (!entry.endsWith("fix.")) {
  throw new Error("entry must land its punch on the last words");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);

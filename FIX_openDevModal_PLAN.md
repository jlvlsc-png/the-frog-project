# Plan to fix openDevModal + reduce editor Problems

## Problem
- VSCode Problems tab shows many JS/JSX parse errors (e.g., JSX expressions must have one parent element, JSX img has no closing tag, ';' expected).
- Root cause: `function openDevModal()` has duplicated trailing HTML after the template literal, so the JS template literal is effectively broken and parser starts reading raw HTML as JS/JSX.

## Strategy (tool-safe)
Because `edit_file` requires exact string matches and the current corrupted block is hard to match reliably:
1. Re-write `openDevModal()` by replacing from a short unique anchor to a short unique anchor that definitely exists.
2. Use two edits:
   - Edit A: replace only the first line `function openDevModal() {` with a sentinel comment and early return, to prevent parser from reading further corrupted markup.
   - Edit B: remove (or neutralize) the rest of the corrupted block by commenting it out using exact-match segments.

## Concrete anchors to use
- Anchor start: `function openDevModal() {`
- Anchor end: the comment `// closeModal() remains below` (exists right after openDevModal in current file)

This allows rewriting openDevModal without needing to match the duplicated middle.

## Acceptance
- Problems tab should drop substantially (JS parse errors resolved).
- openDevModal opens creator modal and displays an in-modal Close button.


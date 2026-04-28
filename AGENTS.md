# AGENTS Guidelines

## General

Whenever prompted, split tasks into sub-tasks and spawn an agent to handle each using the `#runSubagent` tool, orchestrating them to keep context manageable.

It is probably necessary to run them sequentially to avoid conflicts, but if you are able, you are encouraged to use parallel agents to speed up development.
For example, if you need to do research before starting the implementation phase, consider using multiple parallel agents: one to analyze the codebase, one to find best practices, one to read the docs, etcetera.

Always use up-to-date information rather than relying on memory. Use web search sub-agents and appropriate mcps (such as context7) to find the latest information, best practices and documentation on libraries, frameworks, and tools.

## Markdown Standards

All agents **must** produce markdownlint-compliant Markdown. These rules are enforced by the `markdownlint` VS Code extension. Spawn a sub-agent to run `npx markdownlint-cli <file>` locally to verify before passing back control. Common infractions include:

- **MD001** — Headings must increment by one level at a time (no skipping levels).
- **MD003** — Use ATX-style headings (`#`, `##`, `###`, …); never underline-style.
- **MD009** — No trailing whitespace on any line.
- **MD010** — No hard tab characters; use spaces for indentation.
- **MD012** — No multiple consecutive blank lines (one blank line maximum).
- **MD013** — Keep lines to 120 characters or fewer. Code blocks and tables are exempt.
- **MD022** — Surround every heading with exactly one blank line above and below.
- **MD031** — Surround fenced code blocks with blank lines.
- **MD032** — Surround lists with blank lines.
- **MD034** — Never write bare URLs; always use `[text](url)` link syntax.
- **MD040** — Every fenced code block must declare a language identifier.
- **MD041** — The first line of every file must be a top-level (`#`) heading.
- **MD060** — Use consistent table column style. Use `compact` style.

If after a few attempts you are unable to produce markdownlint-compliant Markdown, spawn a sub-agent with the `#runSubagent` tool to handle the task of converting your output into compliant Markdown by consulting the [markdownlint rules documentation](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) for full details on each rule.

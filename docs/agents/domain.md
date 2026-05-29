# Domain Docs

This repository uses a single-context documentation layout.

## Layout

- One root `CONTEXT.md` file describes the shared domain language for the repo.
- One root `docs/adr/` directory stores architecture decision records.
- If the repo later splits into multiple independent contexts, add a root `CONTEXT-MAP.md` and point it at the relevant context files.

## Consumer rules

- Read `CONTEXT.md` before making changes that depend on domain language or repository conventions.
- Read the relevant ADRs in `docs/adr/` before changing architecture, data flow, or other long-lived design decisions.
- If `CONTEXT.md` or `docs/adr/` does not exist yet, treat the repo as undocumented and infer only from nearby code and existing docs.
- Keep the layout summary in sync if the repository moves from single-context to multi-context.

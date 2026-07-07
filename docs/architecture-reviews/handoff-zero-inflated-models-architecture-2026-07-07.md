# Handoff: zero-inflated models tutorial architecture follow-up

## Objective

Continue the branch-specific architecture review for the first public blog post, then implement whichever candidate Andrea selects.

## Canonical artifacts

- Architecture review: `docs/architecture-reviews/zero-inflated-models-tutorial-2026-07-07.html`
- Work item: [GitHub issue #7](https://github.com/andreadifra/andreadifra.github.io/issues/7)
- Tutorial source: `posts/zero-inflated-models-tutorial/index.qmd`
- Advanced draft: `posts/zero-inflated-models-advanced/index.qmd`
- Repository domain language: `CONTEXT.md`
- Existing publication history: `posts/zero-inflated-models-tutorial/_mywebsite-zero-inflated-handoff-2026-06-16.md`

Read those artifacts instead of reconstructing their contents from this handoff.

## Current state

The review is complete; no architecture candidate has been selected or implemented. The HTML report contains four candidates, before/after diagrams, recommendation strengths, and a top recommendation.

The report's main evidence came from the current branch, issue #7, the tutorial and advanced manuscripts, the post-local assets, the publication notes, the rendered `_site` output, `_quarto.yml`, the theme stack, `CONTEXT.md`, and the repository agent documentation.

The current working tree already contains substantial user changes to the tutorial, frozen output, checklist, and handoff. Preserve them. Check `git status` and the relevant diff before editing.

## Important findings

- The tutorial's raw HTML consists only of an inline `<style>` block. Its visible content already uses Quarto fenced divs.
- The advanced article consumes `hurdle-vs-zi.svg` from the tutorial directory, creating a cross-post asset seam.
- GitHub Issues is the declared source of truth, but three post-local tracking documents overlap and disagree.
- Issue #7 requires a hero image and intentional listing/social-preview behavior; the current post metadata does not make that contract explicit.
- A single post-local `figures/` directory is proportionate. Splitting editable sources into a second nested directory is premature at the current asset count.

## Constraints

- Follow the root `AGENTS.md` instructions supplied in the conversation.
- Read current Quarto documentation before changing framework configuration.
- Do not add a per-page theme override.
- Use the existing preview on port `7921` when available; avoid running a concurrent full render.
- Keep `_freeze/` committed and update it only through a deliberate render workflow.
- Keep post assets alongside their owning post.
- Do not promote one-post CSS into `_base-components.scss` until a second consumer creates a real seam.

## Recommended continuation

1. Open the architecture report and ask Andrea which candidate to pursue.
2. If Andrea selects a candidate, clarify its constraints and deletion test before editing.
3. Implement only the selected scope.
4. Update references after asset moves and verify both tutorial and advanced pages.
5. Check desktop, mobile, and both colour schemes through the running preview.
6. Record durable architectural decisions in `CONTEXT.md` or an ADR only when the decision would prevent future agents from re-proposing a rejected design.

## Suggested skills

- `improve-codebase-architecture` — retain its module, interface, depth, seam, adapter, leverage, and locality vocabulary.
- `quarto-authoring` — verify metadata, figures, fenced divs, CSS, and render behavior.
- `find-docs` — query current Quarto documentation before configuration changes.
- `agent-browser` — test the live preview and listing/social-facing output.
- `writing-clearly-and-concisely` — keep documentation and manuscript edits direct.
- `github-issues` — use only if Andrea asks to update issue #7.

The earlier architecture skill referenced unavailable companion skills (`codebase-design`, `grilling`, and `domain-modeling`). Apply their documented concepts directly if they remain unavailable. The requested `ask-matt` skill was also unavailable in that session.


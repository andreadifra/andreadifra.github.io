# Zero-Inflated Models Tutorial Publication Checklist

This file tracks remaining/extension work for the tutorial to turn into a polished blog post for the website.

## Current Status

- [x] Canonicalize chunk options to `#|` style and ensure consistent chunk labels.
- [x] Rework YAML so the post inherits the website configuration where appropriate.
- [x] Confirm the post can now run with the current R setup.

## Next Up

- [ ] Improve code examples and output presentation.
- [ ] Strengthen the data exploration section with better source context for `medcare`.
- [ ] Complete section 1.4.
- [ ] Improve Mermaid diagrams.

## High Priority

- [ ] Improve code examples:
  - [ ] Shorten long blocks where possible.
  - [ ] Improve chunk structure and readability.
  - [ ] Replace awkward `print()` / `cat()` style output with cleaner rendered tables or prose summaries where appropriate.

- [ ] Improve section 1.3 (data exploration):
  - [ ] Research the `medcare` dataset using CRAN documentation and the linked textbook/source material.
  - [ ] Convert the accompanying PDF to Markdown so it can be referenced cleanly in the tutorial.

- [ ] Complete section 1.4.

- [ ] Improve Mermaid diagrams:
  - [ ] Rework layout and wording for clarity.
  - [ ] Consider converting key diagrams to Excalidraw.

## Medium Priority

- [ ] Add worked examples for hurdle vs zero-inflated models with side-by-side predictions and marginal effects.
- [ ] Add DHARMa residual smoke-check examples and captions explaining the main diagnostics.
- [ ] Add demos for `nbinom1` vs `nbinom2`, `genpois`, and zero-altered gamma.

## Low Priority

- [ ] Add a Bayesian zero-inflation section as a later blog follow-up or part three.
- [ ] Shorten long code blocks by moving helpers to `scripts/functions/` and calling them from the `.qmd`.
- [ ] Move long data-prep or simulation code into `scripts/` and source it from the `.qmd`.

## Notes

- Keep this file focused on publication work for the blog version of the tutorial.
- When a task is completed, update the checkbox here before moving to the next item.
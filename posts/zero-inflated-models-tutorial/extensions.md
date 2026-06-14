# Zero-Inflated Models Tutorial — Extensions

**High priority**
- [x] Canonicalize chunk options to `#|` style and ensure consistent chunk labels.
- [ ] Improve code examples: shorten long blocks, improve code chunks, fix weird printing (using cat or print might have something to do with it?)
- [ ] Improve section 1.3 (data exploration):
    - [ ] Research `medcare` dataset (look on CRAN and linked textbook)
    - [ ] Convert the accompanying pdf to markdown in order to reference it in tutorial
- [ ] Complete section 1.4
- [ ] Improve Mermaid diagrams
  - [ ] Consider converting key diagrams to Excalidraw 

**Medium priority**
- [ ] Add worked examples for hurdle vs zero-inflated models with side-by-side predictions and marginal effects.
- [ ] Add DHARMa/residuals smoke-check examples and captions explaining key tests.
- [ ] Add demos for `nbinom1` vs `nbinom2`, `genpois`, and `gamma`


**Low priority**
- [ ] Add section using bayesian zero-inflation methods!! (This would be a part three on my blog)
- [ ] Shorten long code blocks by moving helpers to `scripts/functions/` and calling them from the qmd.
- [ ] Move long data-prep or simulation code into `scripts/` and source it from the qmd.

---
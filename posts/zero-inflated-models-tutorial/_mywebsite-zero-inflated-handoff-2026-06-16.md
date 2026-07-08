# Handoff: Zero-Inflated Models Tutorial

- Updated: 2026-07-08
- Repository: `F:\Documenti\Andrea\Projects\Mywebsite`
- Primary source: `posts/zero-inflated-models-tutorial/index.qmd`
- Checklist: `posts/zero-inflated-models-tutorial/_publication-checklist.md`
- Preview: `http://localhost:7921/posts/zero-inflated-models-tutorial/index.html`

## Current State

The article's theory-to-diagnostics section has received a substantive prose, presentation, and statistical-review pass. The main tutorial path now reads as an applied researcher blog rather than a report dump. Code remains available behind purposeful folds, while the article body presents compact tables and interpretation.

The current source and frozen output contain the latest changes. Use the publication checklist for the broader project history and remaining publication tasks; this handoff records only the current implementation state and the points most likely to matter in the next session.

On 2026-07-08, the fitting workflow was reordered to compare model performance and assess candidate fit before interpreting coefficients. ZINB is now presented as an adequate working model for this tutorial, not as a uniquely correct model.

## Changes Completed on 2026-07-08

- Added the ZINB marginal mean and variance, including the separate within-count and between-group variance terms.
- Fitted Poisson, negative binomial, ZIP, and ZINB together in one visible chunk and removed the duplicate non-executable fitting example.
- Moved model comparison and residual assessment before coefficient interpretation.
- Applied the same 1,000-simulation DHARMa checks to the negative binomial and ZINB candidates.
- Chose ZINB as the tutorial's working model because it has the lower AIC and resolves the NB model's remaining zero-frequency mismatch; retained BIC and residual-uniformity caveats.
- Removed intercepts from both ZINB coefficient tables.
- Tightened the introduction and corrected incomplete or stale prose.
- Updated and verified the listing description, social metadata, freeze output, and publication checklist.

## Changes Completed on 2026-07-06

### Mean and variance explanation

- Replaced the terse ZIP mean/variance bullets with a worked explanation of the conditional Poisson mean versus the marginal population mean.
- Added two responsive, theme-aware cards for the population mean and variance.
- Decomposed the variance into within-count-process and between-group terms.
- Corrected the worked variance to `4.03` after rounding.
- Changed the decomposition to a two-line aligned equation so it fits a 390 px viewport.
- Kept the component styling inline in `index.qmd`. There is no post-local `styles.css`; the IDE tab for that path is stale. `_base-components.scss` has no final change from this pass.

### Statistical framing and interpretation

- Replaced causal-sounding descriptions of the zero-inflation component with cautious language about membership in a latent extra-zero group.
- Clarified that the model cannot identify which observed zeros are structural or prove an access-barrier explanation.
- Corrected age interpretations to use decades, matching the `medcare` data scale.
- Removed unsupported explanations such as men avoiding preventive care.
- Reframed coefficient interpretation as descriptive rather than causal.

### Model fitting and output presentation

- Added an ordinary negative binomial model as a necessary comparator to ZIP and ZINB.
- Removed raw `summary()` dumps from the main path.
- Kept model specifications folded and suppressed their raw output.
- Rendered the count and zero-inflation coefficients as separate compact tables.
- Used `tibble::tibble()` for display names containing spaces; base `data.frame()` had converted those names and caused an executable-render failure.
- Replaced duplicate model-comparison sections with one four-model table containing AIC, BIC, RMSE, and delta AIC.
- Removed the likelihood-ratio-test ladder. The zero-inflation boundary and changing count distributions make that presentation too easy to misinterpret.

The rendered comparison is:

| Model | AIC | BIC | RMSE | Delta AIC |
| --- | ---: | ---: | ---: | ---: |
| Poisson | 37093.4 | 37138.1 | 6.505 | 12536.8 |
| Negative binomial | 24576.1 | 24627.2 | 6.529 | 19.5 |
| ZIP | 33318.2 | 33388.5 | 6.507 | 8761.6 |
| ZINB | 24556.6 | 24633.3 | 6.524 | 0.0 |

The article now reports mixed evidence: ZINB has the lowest AIC, the ordinary negative binomial has the lowest BIC, and their in-sample RMSE values are nearly identical. It carries both models forward conceptually instead of declaring an automatic ZINB win.

### Executable DHARMa diagnostics

- Replaced the two `eval: false` diagnostic examples with an executable DHARMa workflow.
- Simulated 1,000 residual sets with `seed = 123`.
- Added a rendered two-panel DHARMa diagnostic figure.
- Added a compact table for zero frequency, dispersion, and overall uniformity.
- Added a collapsed note explaining the plot's significant outlier annotation and why an integer-response bootstrap should confirm it before interpretation.

Current rendered diagnostic results:

| Model | Check | Statistic | p-value |
| --- | --- | --- | ---: |
| Negative binomial | Zero frequency | observed/simulated = 1.10 | 0.008 |
| Negative binomial | Dispersion | ratio = 1.06 | 0.304 |
| Negative binomial | Overall uniformity | KS D = 0.024 | 0.014 |
| ZINB | Zero frequency | observed/simulated = 1.04 | 0.274 |
| ZINB | Dispersion | ratio = 1.10 | 0.062 |
| ZINB | Overall uniformity | KS D = 0.024 | 0.012 |

The article's interpretation is intentionally qualified: NB leaves a zero-frequency mismatch; ZINB reproduces zero frequency more closely but has borderline residual dispersion; and both uniformity tests detect a small overall mismatch. With 4,406 observations, the discussion emphasizes effect size and plots rather than a pass/fail reading of p-values.

## Verification Performed

The running preview was checked with `agent-browser` after refreshing the frozen output.

Final live-page checks:

```text
page title: Zero-Inflated Models: A Practical Tutorial – Andrea Di Francia
main.content: 1
R cell errors: 0
mean/variance cards: 2, plus a responsive ZINB decomposition
model-comparison rows: 4
diagnostic-test rows: 6
ZINB count-effect rows: 6 (intercept omitted)
ZINB zero-effect rows: 3 (intercept omitted)
browser console errors: none reported
```

Visual checks covered the ZIP cards, ZINB moment equation, model-comparison table, DHARMa figure, candidate-diagnostic table, desktop layout, a 390 px mobile viewport, and both site colour schemes. Listing checks confirmed the title, revised description, categories, publication date, image, and image alt text. Post metadata checks confirmed the Open Graph description/image and `summary_large_image` Twitter card.

`_freeze/posts/zero-inflated-models-tutorial/index/execute-results/html.json` contains the revised source and outputs. The live `_site` page also contains the outlier follow-up callout and the revised summary.

## Render and Preview Caveat

The existing Quarto preview remained active during this pass. Manual `quarto render --execute` calls sometimes raced the preview during post-knit file copying. Observed failures included missing files during `rename`, `utime`, or `site_libs` copying.
These were not R, model-fitting, or knitr failures: all 35 cells knitted before the file-copy race, and at least one full executable render completed successfully during the pass.

For the next clean publication check, use one renderer at a time:

1. Either rely on the running preview and verify the live page.
2. Or stop the preview, run the full render, then restart preview if needed.

Do not interpret a post-knit file-copy race as a model or document execution failure. Confirm whether `html.json` and the live page updated before rerunning expensive diagnostics.

On 2026-07-08, the preview was stopped before `quarto render posts/zero-inflated-models-tutorial/index.qmd --to html --execute`. All 33 stages completed and the output was written successfully; the preview was then restarted on port 7921.

## Recommended Follow-up Work

1. **Run the exact DHARMa outlier bootstrap if the outlier claim will be discussed.** The article shows the recommended follow-up but does not execute it because `nBoot = 1000` is intentionally expensive:

   ```r
   testOutliers(
     zinb_residuals,
     type = "bootstrap",
     nBoot = 1000,
     plot = FALSE
   )
   ```

2. **Deepen residual diagnosis if publication standards require it.** Inspect residuals against important predictors, assess influential records, and compare out-of-sample predictions for negative binomial and ZINB.
3. **Resolve the repository ownership warning if permanent Git configuration is desired.** Read-only inspection currently works with a command-local `safe.directory` override.
4. **Optionally remove the stale Machine-scope `QUARTO_R`.** It still points to `E:\Program Files\R\R-4.5.0\bin\R.exe`; the empty User-scope override currently allows Quarto to find R 4.6.0.

## DHARMa Sources for Follow-up

These were checked on 2026-07-06 and should be consulted before changing the diagnostic workflow:

- DHARMa reference manual: <https://florianhartig.r-universe.dev/DHARMa/doc/manual.html>
  - Current signatures and details for `simulateResiduals()`, `testUniformity()`, `testDispersion()`, `testZeroInflation()`, and `testOutliers()`.
  - Documents `type = "bootstrap"` and `nBoot` for integer-response outlier checks.
- DHARMa CRAN vignette: <https://stat.ethz.ch/CRAN/web/packages/DHARMa/vignettes/DHARMa.html>
  - Interpretation of simulated quantile residuals, diagnostic plots, dispersion, zero inflation, and simulation choices.
- DHARMa source repository: <https://github.com/florianhartig/DHARMa>
  - Use for release notes, open issues, and behaviour not fully explained in the reference manual.
- `glmmTMB` model-evaluation vignette: <https://glmmtmb.github.io/glmmTMB/articles/model_evaluation.html>
  - Package-specific post-fit evaluation and DHARMa integration.
- `glmmTMB` troubleshooting vignette: <https://glmmtmb.github.io/glmmTMB/articles/troubleshooting.html>
  - Follow this if convergence, Hessian, or extreme-parameter warnings appear.

Important interpretation points from the current DHARMa documentation:

- Zero inflation is always relative to a fitted model; many observed zeros alone do not establish zero inflation.
- `testZeroInflation()` compares observed zeros with zeros generated under the fitted model.
- For large integer-valued datasets, the default outlier test can use a binomial approximation. DHARMa recommends the bootstrap procedure for an exact simulation-based expectation.
- A significant diagnostic test identifies model-data mismatch; it does not by itself identify the correct replacement model or justify deleting observations.

## Suggested Skills

- `quarto-authoring`: Quarto execution, freeze behaviour, callouts, tables, and final render checks.
- `agent-browser`: live-preview verification across desktop, mobile, and colour schemes.
- `diagnose`: only if the render/preview race or an R diagnostic failure recurs under a single-renderer setup.
- `documentation-lookup`: current DHARMa and `glmmTMB` APIs before changing diagnostic code.
- `writing-clearly-and-concisely`: final prose tightening and publication copy.

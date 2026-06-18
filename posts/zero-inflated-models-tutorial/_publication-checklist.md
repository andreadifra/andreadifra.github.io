# Zero-Inflated Models Tutorial Publication Checklist

This checklist tracks the publication-readiness items identified during the review of the post for the website version.

## Current Status

- [x] Clean up copied stand-alone YAML and let the post inherit website settings where appropriate.
- [x] Make the post render reproducibly in the project environment.
- [x] Replace placeholders and non-final claims.
- [x] Decide how to handle the advanced section.
- [ ] Improve output presentation for a blog audience.
- [x] Add figure and table labels, captions, and alt text where needed.
- [x] Add proper citations and bibliography support.
- [ ] Confirm the publication date and listing behavior.

## Next Up

- [x] Make the post render reproducibly in the project environment.
- [x] Replace placeholders and non-final claims.
- [ ] Improve output presentation
- [x] Add figure and table structure
- [x] Add citations properly

## Publication Tasks

- [x] Clean up copied stand-alone YAML
  - [x] Remove or rework stand-alone document options that should not override the website.
  - [x] Let the post inherit the site theme and shared Quarto settings.
- [x] Make the post render reproducibly
  - [x] Ensure the required R packages are installed through the project setup.
  - [x] Render the post successfully from the website project.
  - [x] Confirm `quarto check knitr` passes with R 4.6.0 and the project `renv` library.
  - [ ] Refresh and verify the committed `_freeze/` output for this post.
- [x] Replace placeholders and non-final claims
  - [x] Remove placeholder wording such as `~X%`.
  - [x] Replace any hand-wavy claims with computed values or tighter prose.
- [x] Decide what to do with the advanced section
  - [x] Review the later examples that switch from `medcare` to `fish_caught` / `fishing_data`.
  - [x] Split them into a later draft post.
- [ ] Improve output presentation
  - [x] Reduce raw `print()`-heavy output where a table or short interpretation would read better.
  - [ ] Keep detailed output folded only where it genuinely helps the reader.
  - [ ] Tighten long code/output sequences so the post reads like a blog article rather than a report dump.
- [x] Add figure and table structure
  - [x] Add Quarto labels for key figures and tables where cross-reference would help.
  - [x] Add clearer captions to important plots and diagrams.
  - [x] Add alt text or equivalent accessibility improvements where appropriate.
- [x] Add citations properly
  - [x] Create a bibliography source for the cited papers.
  - [x] Convert the further-reading list into Quarto citations.
  - [x] Simplify citation metadata to the minimal Quarto configuration.
- [ ] Confirm date and listing behavior
  - [x] Check that the post date is intentional for publication ordering.
  - [ ] Confirm the title, description, and categories read well in blog listings and previews.

## Notes

- The active source file for the post is `posts/zero-inflated-models-tutorial/index.qmd`.
- Keep this checklist focused on getting the current tutorial ready for publication on the website.
- Advanced material has been split into `posts/zero-inflated-models-advanced/index.qmd` with `draft: true`; it needs a consistent dataset and publication cleanup before release.
- Added `references.bib` and kept citation metadata local to the post with a single top-level `bibliography: references.bib`. Explicit citeproc and `format.html` bibliography overrides were tested and removed; Quarto's default HTML citation processing now renders author-year citations and the bibliography correctly.
- The standalone render hang was traced to `renv_load_sandbox`, not to Quarto, the post content, or R version discovery. `.Rprofile` now disables only `renv.config.sandbox.enabled` before sourcing `renv/activate.R`, keeping the project `renv` library active.
- Final check on 2026-06-17: `quarto check knitr` passes with R 4.6.0, and `quarto render posts\zero-inflated-models-tutorial\index.qmd --to html --no-execute` completes from the website project.
- A stale Machine-scope `QUARTO_R` still points at `E:\Program Files\R\R-4.5.0\bin\R.exe`. The current User-scope value is empty, which lets Quarto auto-discover R 4.6.0; remove the Machine-scope value from an elevated PowerShell when convenient.

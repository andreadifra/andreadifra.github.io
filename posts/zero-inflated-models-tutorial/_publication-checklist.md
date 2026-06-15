# Zero-Inflated Models Tutorial Publication Checklist

This checklist tracks the publication-readiness items identified during the review of the post for the website version.

## Current Status

- [x] Clean up copied stand-alone YAML and let the post inherit website settings where appropriate.
- [ ] Make the post render reproducibly in the project environment.
- [ ] Replace placeholders and non-final claims.
- [ ] Decide how to handle the advanced section.
- [ ] Improve output presentation for a blog audience.
- [ ] Add figure and table labels, captions, and alt text where needed.
- [ ] Add proper citations and bibliography support.
- [ ] Confirm the publication date and listing behavior.

## Next Up

- [ ] Make the post render reproducibly in the project environment.
- [ ] Replace placeholders and non-final claims.
- [ ] Decide whether the advanced section stays in this post or becomes a follow-up.

## Publication Tasks

- [x] Clean up copied stand-alone YAML
  - [x] Remove or rework stand-alone document options that should not override the website.
  - [x] Let the post inherit the site theme and shared Quarto settings.

- [ ] Make the post render reproducibly
  - [ ] Ensure the required R packages are installed through the project setup.
  - [ ] Render the post successfully from the website project.
  - [ ] Refresh and verify the committed `_freeze/` output for this post.

- [ ] Replace placeholders and non-final claims
  - [ ] Remove placeholder wording such as `~X%`.
  - [ ] Replace any hand-wavy claims with computed values or tighter prose.

- [ ] Decide what to do with the advanced section
  - [ ] Review the later examples that switch from `medcare` to `fish_caught` / `fishing_data`.
  - [ ] Either rewrite them to stay in the same tutorial context or split them into a later post.

- [ ] Improve output presentation
  - [ ] Reduce raw `print()`-heavy output where a table or short interpretation would read better.
  - [ ] Keep detailed output folded only where it genuinely helps the reader.
  - [ ] Tighten long code/output sequences so the post reads like a blog article rather than a report dump.

- [ ] Add figure and table structure
  - [ ] Add Quarto labels for key figures and tables where cross-reference would help.
  - [ ] Add clearer captions to important plots and diagrams.
  - [ ] Add alt text or equivalent accessibility improvements where appropriate.

- [ ] Add citations properly
  - [ ] Create a bibliography source for the cited papers.
  - [ ] Convert the further-reading list into Quarto citations.
  - [ ] Add any needed citation metadata such as CSL only if you want a specific style.

- [ ] Confirm date and listing behavior
  - [ ] Check that the post date is intentional for publication ordering.
  - [ ] Confirm the title, description, and categories read well in blog listings and previews.

## Notes

- The active source file for the post is `posts/zero-inflated-models-tutorial/index.qmd`.
- Keep this checklist focused on getting the current tutorial ready for publication on the website.

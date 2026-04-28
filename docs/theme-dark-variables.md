[text](../../MyCVs/versions/ds_resume.tex)# SCSS variables reference (tokens, base, light theme)

This guide documents the Sass variables defined in:
- `/_tokens.scss` (shared tokens and fonts)
- `/_styles_base.scss` (shared cross-theme defaults and rules)
- `/theme-light.scss` (light theme palette and Bootstrap/Quarto mappings)

It explains each variable’s purpose, where it’s applied in the UI, and how it maps to Quarto/Bootstrap theme variables.

Notes

- Import order matters: import `tokens` first so font families and color tokens are available, then set theme variables, then import `styles_base` rules.
- Quarto exposes many Bootstrap variables; overriding them here customizes the UI consistently.

## 1) Shared tokens — `_tokens.scss`

Imported first by each theme.

Typography tokens

- `$font-family-sans-serif` — Primary UI font stack for body and headings.
- `$font-family-monospace` — Font stack for code (`pre`, `code`, `kbd`, `samp`).
- `$font-size-root` — Root font size (affects rem-based sizing across the site).
- `$headings-font-weight` — Default font weight for headings.

Color tokens

- `$color-dark-blue` — Brand dark blue used by themes (e.g., as primary in light theme).
- `$color-accent` — Accent/link blue used by themes (e.g., `$link-color`).

Why first: Theme files reference these tokens to compute palette and component colors.

## 2) Shared base — `_styles_base.scss`

Defines cross-theme defaults (with `!default`) and shared rules. Import AFTER the theme maps variables so these rules pick up the theme’s values.

Defaults (overridable per theme)

- `$border-hover-color` — Border color on hover states; defaults to `$border-color`.
- `$card-hover-shadow` — Box-shadow on hover for cards.
- `$avatar-border` — Border color for circular profile images.
- `$focus-ring-color` — Focus ring color for inputs/interactive elements.

Rules (how variables are applied)

- `a` — Uses `$link-color` and `$link-hover-color`; adds hover underline and transition.
- `.rounded-circle` — Uses `$avatar-border` and a subtle shadow for profile images.
- `.quarto-grid-item` — Card-like blocks using `$card-bg` and `$border-color`; hover uses `$card-hover-shadow` and `$border-hover-color`.
- `pre, code, kbd, samp` — Ensures code uses `$font-family-monospace`.
- `.table` — Sets Bootstrap var `--bs-table-border-color` from `$border-color`.
- `.form-control` — Uses `$border-color`; on `:focus` uses `$link-color` and `$focus-ring-color`.

## 3) Light theme — `theme-light.scss`

Light theme color palette

- `$light-bg` — Page background (white).
- `$light-surface` — Subtle panel/surface background.
- `$light-surface-alt` — Alternate surface for contrast steps (e.g., code blocks).
- `$light-text` — Main text color.
- `$light-text-muted` — Muted text color for secondary UI.
- `$light-accent` — Accent/link color from tokens (`$color-accent`).
- `$light-primary` — Brand primary from tokens (`$color-dark-blue`).

Mapped to Quarto/Bootstrap variables

- `$body-bg` — Page background color → `$light-bg`.
- `$body-color` — Page text color → `$light-text`.
- `$link-color` — Link color → `$light-accent`.
- `$link-hover-color` — Link hover color (darkened accent).

Text and borders

- `$text-muted` — Muted text color → `$light-text-muted`.
- `$border-color` — Default border color for components (tables, inputs, cards).

Component backgrounds

- `$card-bg` — Card background → `$light-bg`.
- `$modal-content-bg` — Modal background → `$light-bg`.
- `$popover-bg` — Popover background → `$light-bg`.
- `$dropdown-bg` — Dropdown background → `$light-bg`.
- `$input-bg` — Input background → `$light-bg`.

Navigation (Quarto variables)

- `$navbar-bg` — Navbar background → `$light-primary`.
- `$navbar-fg` — Navbar text/icons color (white here).
- `$navbar-hl` — Navbar link highlight (lightened primary).
- `$sidebar-bg` — Sidebar background → `$light-surface`.
- `$sidebar-fg` — Sidebar text color → `$light-text`.
- `$sidebar-hl` — Sidebar link highlight → `$light-accent`.

Footer

- `$footer-bg` — Footer background → `$light-surface`.
- `$footer-fg` — Footer text color → `$light-text`.

Code theming

- `$code-bg` — Inline/code element background → `$light-surface-alt`.
- `$code-color` — Code text color.
- `$code-block-bg` — Code block background → `$light-surface-alt`.
- `$code-block-bg-alpha` — Alpha for code block background handling.

Table of contents (TOC)

- `$toc-color` — TOC item text color → `$light-text`.
- `$toc-active-border` — Active TOC item border → `$light-accent`.
- `$toc-inactive-border` — Inactive TOC border (transparent).

Interaction helpers (theme-specific defaults)

- `$border-hover-color` — Darkened border color for hover.
- `$card-hover-shadow` — Subtle elevated card shadow.
- `$avatar-border` — Avatar border color for light surfaces.
- `$focus-ring-color` — Input focus ring color (accent-based rgba).

Rules

- `@import 'styles_base'` after variables so shared rules pick up the light theme values.

---

## References

- Quarto theme variables and options: see the Quarto documentation (quarto-dev/quarto-web) on theme variables and options.
- Bootstrap Sass variables (full list): https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss
- Quarto exposes navigation/TOC/code variables such as `$navbar-*`, `$sidebar-*`, `$footer-*`, `$toc-*`, `$code-*`, `$body-*`, `$link-*` for SCSS customization.

Tip: The dark theme (`theme-dark.scss`) follows the same mapping pattern, using a dark palette for the same Quarto/Bootstrap variables.

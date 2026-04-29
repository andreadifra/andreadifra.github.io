# SCSS reference

This repository uses a small SCSS system layered on top of Quarto's HTML theming
support and the Bootstrap Cosmo base theme.

## Theme file roles

- `_design-tokens.scss`: shared typography, colour, spacing, and interaction
  tokens
- `theme-light.scss`: light-theme mappings from shared tokens to Bootstrap and
  Quarto variables
- `theme-dark.scss`: dark-theme mappings from shared tokens to Bootstrap and
  Quarto variables
- `_base-components.scss`: shared mixins and component rules imported by both
  theme files

## Quarto theme structure

The top-level theme files listed in `_quarto.yml` are:

- `theme-light.scss`
- `theme-dark.scss`

These files use Quarto region decorators such as `/*-- scss:defaults --*/` and
`/*-- scss:rules --*/`. Imported partials should stay plain SCSS and should not
pretend to define Quarto regions.

Current project configuration layers each custom theme file after Bootstrap
Cosmo:

```yaml
format:
  html:
    theme:
      light: [cosmo, theme-light.scss]
      dark: [cosmo, theme-dark.scss]
```

## Shared design tokens

`_design-tokens.scss` defines the raw values that both themes depend on.

### Typography tokens

- `$font-family-sans-serif`
- `$font-family-monospace`
- `$font-size-root`
- `$headings-font-weight`

### Colour tokens

- `$brand-primary`
- `$accent-blue`
- `$light-*` and `$dark-*` foundation colours
- `$neutral-100` through `$neutral-900`
- `$dark-border`
- `$dark-hover`

### Layout and interaction tokens

- `$border-radius-base`
- `$shadow-subtle`
- `$transition-base`
- `$hover-transform`
- `$focus-ring-width`

## Light theme mappings

`theme-light.scss` maps the shared tokens to the variables used by Quarto and
Bootstrap.

Key mappings include:

- page colours: `$body-bg`, `$body-color`, `$text-muted`
- links: `$link-color`, `$link-hover-color`
- surfaces: `$card-bg`, `$popover-bg`, `$dropdown-bg`, `$input-bg`
- navigation: `$navbar-bg`, `$navbar-fg`, `$navbar-hl`
- secondary layout: `$sidebar-*`, `$footer-*`
- code: `$code-bg`, `$code-color`, `$code-block-bg`
- table of contents: `$toc-color`, `$toc-active-border`,
  `$toc-inactive-border`
- interaction helpers: `$border-hover-color`, `$card-hover-shadow`,
  `$avatar-border`, `$focus-ring-color`

## Dark theme mappings

`theme-dark.scss` follows the same structure as the light theme, but uses the
dark token palette and lighter interactive states to preserve contrast.

Important differences:

- dark surfaces are based on `$dark-primary`, `$dark-surface`, and
  `$dark-surface-alt`
- link and hover colours are lightened variants of `$accent-blue`
- hover borders and focus rings are brighter than their light-theme equivalents
- code, table, form, and outline-button rules receive extra dark-mode styling

## Shared component partial

`_base-components.scss` provides reusable behaviour that both themes import.

### Mixins

- `card-hover-effect`
- `focus-ring($color: null)`

### Shared rules

- `a`
- `.rounded-circle`
- `.quarto-grid-item`
- `.table`
- `.form-control`
- `.btn`
- `pre`

These rules rely on theme variables already being mapped by `theme-light.scss`
or `theme-dark.scss`.

## Working on the theme

1. Change shared values in `_design-tokens.scss` when a token should affect both
   themes.
2. Change `theme-light.scss` or `theme-dark.scss` when only one theme needs a
   different mapping.
3. Change `_base-components.scss` for shared component behaviour.
4. Validate with `quarto preview` during iteration and `quarto render` before
   finishing a larger change.

## References

- [Quarto HTML theming](https://quarto.org/docs/output-formats/html-themes.html)
- [Quarto advanced theme layering](https://quarto.org/docs/output-formats/html-themes-more.html)
- [Bootstrap Sass customization](https://getbootstrap.com/docs/5.3/customize/sass/)

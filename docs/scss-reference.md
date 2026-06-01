# SCSS reference

This repository layers a custom semantic SCSS system on top of Quarto HTML
theming and the Bootstrap Cosmo base theme.

## Theme file roles

- `_design-tokens.scss`: shared typography, foundation palette, and light/dark semantic tokens
- `theme-light.scss`: light-theme semantic mapping into Quarto and Bootstrap variables
- `theme-dark.scss`: dark-theme semantic mapping into Quarto and Bootstrap variables
- `_base-components.scss`: shared component rules that consume the mapped theme variables

## Quarto theme structure

The top-level theme files listed in `_quarto.yml` are:

- `theme-light.scss`
- `theme-dark.scss`

These files use Quarto region decorators such as `/*-- scss:uses --*/`,
`/*-- scss:defaults --*/`, and `/*-- scss:rules --*/`. Imported partials stay
plain SCSS and do not declare their own Quarto regions. The light and dark
theme files load `_design-tokens.scss` through a Sass module in the
`scss:uses` layer so semantic tokens are available before the theme defaults are
evaluated.

Project configuration layers each custom theme file after Bootstrap Cosmo:

```yaml
format:
  html:
    theme:
      light: [cosmo, theme-light.scss]
      dark: [cosmo, theme-dark.scss]
```

## Shared token model

`_design-tokens.scss` is the source of truth for the palette and interaction
system.

### Typography tokens

- `$font-family-sans-serif`
- `$font-family-monospace`
- `$font-size-root`
- `$headings-font-weight`

### Foundation palette

- `$palette-paper`
- `$palette-mist`
- `$palette-accent`
- `$palette-ink`
- `$palette-ink-soft`

### Light-theme semantic tokens

- page and surface layers: `$light-page-bg`, `$light-page-bg-alt`,
  `$light-surface`, `$light-surface-alt`, `$light-surface-strong`
- borders and text: `$light-border`, `$light-border-strong`, `$light-text`,
  `$light-text-muted`, `$light-heading`
- interactive accents: `$light-accent`, `$light-accent-hover`,
  `$light-accent-soft`, `$light-accent-soft-strong`
- chrome and code: `$light-navbar-*`, `$light-code-*`, `$light-focus-ring`,
  `$light-shadow`

### Dark-theme semantic tokens

- page and surface layers: `$dark-page-bg`, `$dark-page-bg-alt`,
  `$dark-surface`, `$dark-surface-alt`, `$dark-surface-strong`
- borders and text: `$dark-border`, `$dark-border-strong`, `$dark-text`,
  `$dark-text-muted`, `$dark-heading`
- interactive accents: `$dark-accent`, `$dark-accent-hover`,
  `$dark-accent-soft`, `$dark-accent-soft-strong`
- chrome and code: `$dark-navbar-*`, `$dark-code-*`, `$dark-focus-ring`,
  `$dark-shadow`

### Shared interaction tokens

- `$border-radius-base`
- `$border-radius-lg`
- `$shadow-subtle`
- `$transition-base`
- `$hover-transform`
- `$focus-ring-width`

## Theme mappings

`theme-light.scss` and `theme-dark.scss` both follow the same pattern:

1. load `_design-tokens.scss` through `@use 'design-tokens' as tokens;` in the
   `scss:uses` layer
2. map the relevant light or dark semantic values to generic theme variables
   such as `$surface-primary`, `$accent-primary`, and `$focus-ring-color`
3. map those generic values into Quarto and Bootstrap variables such as
   `$body-bg`, `$navbar-bg`, `$card-bg`, `$link-color`, and `$toc-color`
4. define helper variables used by `_base-components.scss`

This keeps both themes aligned around the same semantic roles instead of letting
light and dark mode drift into separate design systems.

## Shared component partial

`_base-components.scss` styles the reusable surfaces that appear throughout the
site. It expects the active theme file to provide the generic theme variables.

### Mixins

- `card-hover-effect`
- `focus-ring($color: null)`

### Shared surfaces

- global page background and text selection
- navbar and footer chrome
- profile/about cards
- project cards and Quarto listings
- callouts
- buttons, forms, and listing filters
- code blocks, inline code, and tables
- TOC and color-scheme toggle chrome

## Warning-avoidance rule

Quarto applies Sass default variables in reverse order when multiple theme files
are layered. To keep the custom theme deterministic, the internal token layer is
loaded through `scss:uses` and the semantic mapping layer uses plain
assignments instead of `!default`.

Only use `!default` when you intentionally want a variable to participate in
Quarto or Bootstrap override precedence. Do not use it for internal token
dependencies.

## Working on the theme

1. Change `_design-tokens.scss` when the semantic palette or interaction system
   should affect both themes.
2. Change `theme-light.scss` or `theme-dark.scss` when one theme needs a
   different mapping of the shared semantic roles.
3. Change `_base-components.scss` for shared surface styling.
4. Validate with `quarto preview` during iteration and `quarto render` before
   finishing a larger change.

## References

- [Quarto HTML theming](https://quarto.org/docs/output-formats/html-themes.html)
- [Quarto advanced theme layering](https://quarto.org/docs/output-formats/html-themes-more.html)
- [Bootstrap Sass customization](https://getbootstrap.com/docs/5.3/customize/sass/)

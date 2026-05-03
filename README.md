# Andrea's Quarto Website

Personal website and blog built with [Quarto](https://quarto.org/) and deployed
to GitHub Pages at [andreadifra.github.io](https://andreadifra.github.io/).

## Stack and workflow

- Quarto website project with blog listings and standalone pages
- Bootstrap Cosmo base theme with custom SCSS layers
- Post execution caching via `freeze: auto`, with `_freeze/` committed for
  reproducible renders

Validated with **Quarto 1.9.37**.

## Local development

Clone the repository:

```powershell
git clone https://github.com/andreadifra/andreadifra.github.io.git
cd andreadifra.github.io
```

Preview the site locally during development:

```powershell
quarto preview
```

Run a full site build when you need to confirm the rendered output:

```powershell
quarto render
```

Publish to GitHub Pages when changes are ready to go live:

```powershell
quarto publish gh-pages
```

## Project structure

```text
.
|-- _quarto.yml
|-- index.qmd
|-- about.qmd
|-- blog.qmd
|-- projects.qmd
|-- posts/
|   |-- _metadata.yml
|   `-- <slug>/index.qmd
|-- _design-tokens.scss
|-- _base-components.scss
|-- theme-light.scss
|-- theme-dark.scss
|-- docs/
|   `-- scss-reference.md
|-- downloads/
`-- AGENTS.md
```

## SCSS architecture

The site theme is organised in layers:

1. `_design-tokens.scss` defines shared typography, colour, spacing, and
   interaction tokens.
2. `theme-light.scss` and `theme-dark.scss` map those tokens to Bootstrap and
   Quarto theme variables.
3. `_base-components.scss` contains shared component rules and mixins imported by
   both theme files.

This keeps the light and dark themes aligned while allowing theme-specific
overrides where needed.

## Content conventions

- Add blog posts under `posts/<slug>/index.qmd`.
- Keep post images beside the post source file.
- Use the global site theme from `_quarto.yml` rather than per-page theme
  overrides.

## Repository notes

- See `docs/scss-reference.md` for the current theme reference.

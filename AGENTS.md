# Repository agent guide

## Project overview

- Personal Quarto website for Andrea Di Francia
- Published via GitHub Pages
- Local development environment is Windows with PowerShell
- Quarto theme stack uses Bootstrap Cosmo plus custom SCSS layers

## Agent skills

### Issue tracker

GitHub Issues is the source of truth for work in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the canonical triage labels unless the repo adopts different names
later. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context layout with one root `CONTEXT.md` and `docs/adr/`. See `docs/agents/domain.md`.

## Finding current documentation

Use current documentation before changing framework configuration.

- **Quarto**: query Context7 with `/websites/quarto` for website config, render
   rules, execution freeze behaviour, and theme guidance. If Context7 does not answer the question, query GitHub repositories:
  - For **documentation pages, examples, guides, and website docs**:
    use [`quarto-dev/quarto-web](https://github.com/quarto-dev/quarto-web)
  - For **actual Quarto engine behaviour, CLI options, config parsing, rendering,
    execution, freeze, and defaults**:
    use  [`quarto-dev/quarto-cli`](https://github.com/quarto-dev/quarto-cli)
  - For **project-level or newer consolidated Quarto materials**:
    use [`quarto-dev/quarto`](https://github.com/quarto-dev/quarto)
- **Bootstrap Sass**: query Context7 with `/websites/getbootstrap` for Sass
   variable references and component behaviour.
- **Repository structure**: read `_quarto.yml`, `posts/_metadata.yml`,
   `theme-light.scss`, `theme-dark.scss`, `_design-tokens.scss`,
   `_base-components.scss`, and `docs/scss-reference.md` before making changes.

If all else fails, use websearch tools if the tools above don't answer the questions. Always return sources used in this.

## Quarto development workflow

- Use `quarto preview` for iterative work. Check that there isn't already a preview running by opening the port specified in the `_quarto.yml` file in a browser. Use the browser to see changes live and check outputs during development.
- Use `quarto render` only when you need a full build confirmation.
- Use `quarto publish gh-pages` only when publishing changes.
- Posts use `freeze: auto` in `posts/_metadata.yml`.
- Keep `_freeze/` committed so cached post outputs remain available for site
  builds.

## Content authoring rules

- Add blog posts under `posts/<slug>/index.qmd`.
- Keep post images and other assets alongside the post source file.
- Prefer front matter that includes `title`, `author`, `date`, and `categories`.
- Add a `description` when a page is likely to appear in listings or social
  previews.
- Do not add per-page `format.html.theme` overrides to website pages; inherit the
  global theme from `_quarto.yml`.

## Markdown Standards

All agents **must** produce markdownlint-compliant Markdown unless for files that will be uploaded on GitHub (i.e. GitHub issues, pull requests, etc.). These rules are enforced by the `markdownlint` VS Code extension. Spawn a sub-agent to run `npx markdownlint-cli <file>` locally to verify before passing back control. Common infractions include:

- **MD001** — Headings must increment by one level at a time.
- **MD003** — Use ATX-style headings.
- **MD009** — No trailing whitespace.
- **MD010** — No hard tab characters.
- **MD012** — No multiple consecutive blank lines.
- **MD013** — Keep prose lines at 350 characters or fewer when practical.
- **MD022** — Surround headings with one blank line above and below.
- **MD031** — Surround fenced code blocks with blank lines.
- **MD032** — Surround lists with blank lines.
- **MD034** — Do not use bare URLs.
- **MD040** — Every fenced code block must declare a language.
- **MD041** — Start each Markdown file with a top-level heading.
- **MD060** — Use consistent table style.

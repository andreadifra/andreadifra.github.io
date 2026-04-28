# Quarto SCSS Variables Reference

This document explains the standard SCSS variables available for customizing Quarto websites, based on the [official Quarto documentation](https://quarto.org/docs/output-formats/html-themes.html#sass-variables).

## Colors

### Basic Color Variables
- **`$body-bg`**: The page background color
  - *Affects*: Main page background
  - *Example*: `$body-bg: #ffffff;` (white background)

- **`$body-color`**: The page text color
  - *Affects*: Default text color throughout the site
  - *Example*: `$body-color: #333333;` (dark gray text)

- **`$link-color`**: The link color
  - *Affects*: All hyperlinks
  - *Example*: `$link-color: #0d6efd;` (blue links)

- **`$input-bg`**: The background color for HTML inputs
  - *Affects*: Form input fields
  - *Example*: `$input-bg: #ffffff;` (white input backgrounds)

- **`$popover-bg`**: The background color for popovers
  - *Affects*: Citation previews and tooltip backgrounds
  - *Example*: `$popover-bg: #ffffff;` (white popover background)

## Typography

### Font Family Variables
- **`$font-family-sans-serif`**: The sans-serif font family for the page
  - *Affects*: Body text, headings, and UI elements
  - *Example*: `$font-family-sans-serif: 'Helvetica Neue', Arial, sans-serif;`

- **`$font-family-monospace`**: The monospace font family for the page
  - *Affects*: Code blocks, inline code, and code elements
  - *Example*: `$font-family-monospace: 'Fira Code', monospace;`

### Font Size Variables
- **`$font-size-root`**: The base font size for the page
  - *Affects*: Foundation for all other font sizes (rem units)
  - *Example*: `$font-size-root: 17px;`

- **`$toc-font-size`**: The font size for the page TOC
  - *Affects*: Table of contents text size
  - *Example*: `$toc-font-size: 0.9rem;`

- **`$h1-font-size`** through **`$h5-font-size`**: Font sizes for headings
  - *Affects*: Individual heading levels (h1-h5)
  - *Example*: `$h1-font-size: 2.5rem;`

## Code Blocks

### Code Block Styling
- **`$code-block-border-left`**: Left border on code blocks
  - *Affects*: Enables/disables left border on code blocks
  - *Example*: `$code-block-border-left: true;` or `$code-block-border-left: #007bff;`

- **`$code-block-border-left-style`**: Style of the left border
  - *Affects*: Border style (solid, dashed, etc.)
  - *Default*: `solid`

- **`$code-block-border-left-size`**: Thickness of the left border
  - *Affects*: Border width
  - *Default*: `3px`

- **`$code-block-padding-left`**: Padding between code and border
  - *Affects*: Space between code content and left border
  - *Default*: `0.6em`

- **`$code-block-bg`**: Background color for code blocks
  - *Affects*: Code block background color
  - *Example*: `$code-block-bg: #f8f9fa;`

- **`$code-block-bg-padding`**: Padding applied to code blocks
  - *Affects*: Internal spacing in code blocks
  - *Default*: `0.4em`

- **`$code-block-bg-alpha`**: Transparency adjustment for background
  - *Affects*: Alpha channel modification for auto-generated backgrounds
  - *Default*: `-0.35`

### Code Annotation
- **`$code-annotation-highlight-color`**: Border color for highlighted lines
  - *Affects*: Code annotation highlighting
  - *Example*: `$code-annotation-highlight-color: #ffc107;`

- **`$code-annotation-highlight-bg`**: Background color for highlighted lines
  - *Affects*: Background of annotated code lines
  - *Example*: `$code-annotation-highlight-bg: #fff3cd;`

### Code Copy Button
- **`$btn-code-copy-color`**: Color for the copy button
  - *Affects*: Code copy button appearance
  - *Example*: `$btn-code-copy-color: #6c757d;`

- **`$btn-code-copy-color-active`**: Hover color for the copy button
  - *Affects*: Code copy button hover state
  - *Example*: `$btn-code-copy-color-active: #495057;`

## Inline Code

- **`$code-bg`**: Background color of inline code
  - *Affects*: Background for `code` elements in text
  - *Default*: Mix between body-bg and body-color

- **`$code-color`**: Text color of inline code
  - *Affects*: Text color for `code` elements
  - *Default*: Contrasting color against code-bg

## Table of Contents

- **`$toc-color`**: Color for table of contents text
  - *Affects*: TOC text color
  - *Example*: `$toc-color: #495057;`

- **`$toc-font-size`**: Font size for table of contents text
  - *Affects*: TOC text size
  - *Example*: `$toc-font-size: 0.9rem;`

- **`$toc-active-border`**: Left border color for active TOC item
  - *Affects*: Current section indicator in TOC
  - *Example*: `$toc-active-border: #0d6efd;`

- **`$toc-inactive-border`**: Left border color for inactive TOC items
  - *Affects*: Non-active TOC item borders
  - *Example*: `$toc-inactive-border: transparent;`

## Layout

- **`$content-padding-top`**: Padding before main content area
  - *Affects*: Top spacing for sidebar, content, and TOC areas
  - *Example*: `$content-padding-top: 1rem;`

## Navigation

### Navbar
- **`$navbar-bg`**: Background color of the navbar
  - *Affects*: Top navigation bar background
  - *Default*: Theme's primary color

- **`$navbar-fg`**: Color of navbar foreground elements
  - *Affects*: Navbar text and navigation elements
  - *Default*: Auto-computed contrasting color

- **`$navbar-hl`**: Highlight color for navbar links
  - *Affects*: Navbar link hover and active states
  - *Default*: Link color or auto-computed contrasting color

### Sidebar
- **`$sidebar-bg`**: Background color for sidebars
  - *Affects*: Sidebar background
  - *Default*: Light color or body-bg depending on layout

- **`$sidebar-fg`**: Color of sidebar foreground elements
  - *Affects*: Sidebar text and navigation
  - *Default*: Auto-computed contrasting color

- **`$sidebar-hl`**: Highlight color for sidebar links
  - *Affects*: Sidebar link states
  - *Default*: Link color

### Footer
- **`$footer-bg`**: Background color for the footer
  - *Affects*: Footer background
  - *Default*: Body background color

- **`$footer-fg`**: Color of footer foreground elements
  - *Affects*: Footer text and links
  - *Default*: Auto-computed contrasting color

## Callouts

- **`$callout-border-width`**: Left border width of callouts
  - *Affects*: Callout border thickness
  - *Default*: `5px`

- **`$callout-border-scale`**: Border color computation scale
  - *Affects*: How callout border color is derived from base color
  - *Default*: `0%`

- **`$callout-icon-scale`**: Icon color computation scale
  - *Affects*: How callout icon color is derived from base color
  - *Default*: `10%`

- **`$callout-margin-top`**: Top margin on callouts
  - *Affects*: Spacing above callouts
  - *Default*: `1.25rem`

- **`$callout-margin-bottom`**: Bottom margin on callouts
  - *Affects*: Spacing below callouts
  - *Default*: `1.25rem`

- **`$callout-color-<type>`**: Colors for specific callout types
  - *Types*: note, tip, warning, caution, important
  - *Affects*: Background and accent colors for each callout type

## Bootstrap Variables

In addition to the Quarto-specific variables above, you can use any of the [1,400+ Bootstrap Sass variables](https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss). Some commonly used ones include:

### Bootstrap Color System
- **`$primary`**: Primary brand color (affects buttons, links, etc.)
- **`$secondary`**: Secondary color
- **`$success`**: Success state color (green)
- **`$info`**: Info state color (blue)
- **`$warning`**: Warning state color (yellow)
- **`$danger`**: Danger state color (red)
- **`$light`**: Light neutral color
- **`$dark`**: Dark neutral color

### Bootstrap Typography
- **`$headings-font-family`**: Font family for headings
- **`$headings-font-weight`**: Font weight for headings
- **`$headings-line-height`**: Line height for headings
- **`$lead-font-size`**: Font size for lead text
- **`$lead-font-weight`**: Font weight for lead text

## Usage in Quarto Themes

### SCSS File Structure
```scss
/*-- scss:defaults --*/
// Variables go here
$body-bg: #ffffff;
$link-color: #0066cc;

/*-- scss:rules --*/
// Custom CSS rules go here
h1 {
  text-transform: uppercase;
}
```

### Theme Configuration in _quarto.yml
```yaml
format:
  html:
    theme:
      light: [cosmo, custom-light.scss]
      dark: [cosmo, custom-dark.scss]
```

## Best Practices

1. **Use semantic names**: Variables should describe purpose, not appearance
2. **Test both themes**: Always verify light and dark mode compatibility
3. **Check accessibility**: Ensure sufficient color contrast (WCAG 2.1 AA)
4. **Use `!default`**: Allow variables to be overridden by adding `!default`
5. **Reference Bootstrap docs**: Many variables are inherited from Bootstrap

## Common Customization Examples

### Custom Brand Colors
```scss
/*-- scss:defaults --*/
$primary: #1e3a8a;        // Custom blue
$link-color: #1e3a8a;     // Match links to primary
$navbar-bg: $primary;     // Use primary for navbar
```

### Typography Customization
```scss
/*-- scss:defaults --*/
$font-family-sans-serif: 'Inter', system-ui, sans-serif;
$font-size-root: 18px;
$headings-font-weight: 600;
```

### Code Block Styling
```scss
/*-- scss:defaults --*/
$code-block-border-left: $primary;
$code-block-border-left-size: 4px;
$code-block-bg: #f8f9fa;
$code-bg: #e9ecef;
```

## Resources

- [Official Quarto Theming Guide](https://quarto.org/docs/output-formats/html-themes.html)
- [Bootstrap Sass Variables](https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss)
- [Bootstrap Customization Guide](https://getbootstrap.com/docs/5.1/customize/sass/)
- [Bootswatch Themes](https://bootswatch.com/) (for inspiration)

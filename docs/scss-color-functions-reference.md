# SCSS Color Functions Reference

SCSS provides many built-in functions for manipulating colors. Here are the most commonly used ones:

## Basic Color Manipulation

### Lightness Functions

- **`lighten($color, $amount)`**: Makes a color lighter
  - *Example*: `lighten(#333, 20%)` → lighter gray
  - *Amount*: 0% to 100% (percentage to lighten)

- **`darken($color, $amount)`**: Makes a color darker  
  - *Example*: `darken(#0066ff, 15%)` → darker blue
  - *Amount*: 0% to 100% (percentage to darken)

### Saturation Functions

- **`saturate($color, $amount)`**: Increases color saturation
  - *Example*: `saturate(#666, 30%)` → more vibrant
  - *Amount*: 0% to 100%

- **`desaturate($color, $amount)`**: Decreases color saturation
  - *Example*: `desaturate(#ff0000, 50%)` → more muted red
  - *Amount*: 0% to 100%

### Hue Functions

- **`adjust-hue($color, $degrees)`**: Shifts the hue
  - *Example*: `adjust-hue(#ff0000, 120deg)` → shifts red toward green
  - *Amount*: -360deg to 360deg

### Alpha/Opacity Functions

- **`rgba($color, $alpha)`**: Sets alpha channel
  - *Example*: `rgba(#ff0000, 0.5)` → 50% transparent red
  - *Alpha*: 0 (transparent) to 1 (opaque)

- **`transparentize($color, $amount)`**: Makes color more transparent
  - *Example*: `transparentize(#ff0000, 0.3)` → 30% more transparent
  - *Amount*: 0 to 1

- **`opacify($color, $amount)`**: Makes color more opaque
  - *Example*: `opacify(rgba(255,0,0,0.5), 0.2)` → 20% more opaque
  - *Amount*: 0 to 1

## Advanced Color Functions

### Color Mixing

- **`mix($color1, $color2, $weight)`**: Blends two colors
  - *Example*: `mix(#ff0000, #0000ff, 50%)` → purple (50/50 mix)
  - *Weight*: 0% to 100% (how much of first color)

### Grayscale

- **`grayscale($color)`**: Converts to grayscale
  - *Example*: `grayscale(#ff6600)` → gray equivalent

### Color Inversion

- **`invert($color)`**: Inverts a color
  - *Example*: `invert(#000000)` → #ffffff

### Complement

- **`complement($color)`**: Returns complementary color
  - *Example*: `complement(#ff0000)` → cyan

## Practical Examples for Theming

### Creating Color Variations

```scss
// Base color
$primary: #0066ff;

// Generate variations
$primary-light: lighten($primary, 20%);    // #3385ff
$primary-dark: darken($primary, 20%);      // #004dcc
$primary-muted: desaturate($primary, 30%); // Less vibrant
$primary-transparent: rgba($primary, 0.8); // 80% opacity
```

### Hover States

```scss
$button-color: #007bff;
$button-hover: darken($button-color, 10%);

.btn-primary {
  background-color: $button-color;
  
  &:hover {
    background-color: $button-hover;
  }
}
```

### Theme-Aware Colors

```scss
// Light theme
$bg-light: #ffffff;
$text-light: darken($bg-light, 85%); // Very dark text on light bg

// Dark theme  
$bg-dark: #1a1a1a;
$text-dark: lighten($bg-dark, 85%);  // Very light text on dark bg
```

### Border and Shadow Variations

```scss
$border-base: #dee2e6;
$border-hover: darken($border-base, 15%);
$border-focus: saturate($border-base, 20%);

$shadow-color: rgba(darken($border-base, 50%), 0.15);
```

## Color Space Functions

### HSL (Hue, Saturation, Lightness)

- **`hsl($hue, $saturation, $lightness)`**: Creates color from HSL
- **`hsla($hue, $saturation, $lightness, $alpha)`**: HSL with alpha

### Getting Color Properties  
- **`hue($color)`**: Extracts hue (0-360deg)
- **`saturation($color)`**: Extracts saturation (0%-100%)
- **`lightness($color)`**: Extracts lightness (0%-100%)
- **`alpha($color)`**: Extracts alpha (0-1)

## Best Practices for Quarto Themes

### 1. Consistent Color Relationships

```scss
// Define base colors in _design-tokens.scss
$brand-primary: #203e5c;

// Create systematic variations
$brand-light: lighten($brand-primary, 20%);
$brand-dark: darken($brand-primary, 15%);
$brand-muted: desaturate($brand-primary, 30%);
```

### 2. Accessible Contrast

```scss
// Ensure sufficient contrast for readability
$bg-color: #ffffff;
$text-color: darken($bg-color, 87%); // ~#212529 (high contrast)
$muted-text: darken($bg-color, 50%); // Medium contrast for secondary text
```

### 3. Theme Consistency

```scss
// Light theme
$surface-primary: $neutral-100;
$text-primary: darken($surface-primary, 80%);

// Dark theme  
$surface-primary: $neutral-900;
$text-primary: lighten($surface-primary, 85%);
```

### 4. Interactive States

```scss
$link-color: $accent-blue;
$link-hover: darken($link-color, 20%);
$link-active: darken($link-color, 30%);
$link-visited: adjust-hue($link-color, 20deg);
```

## Common Combinations

### Button Variations

```scss
$btn-primary: #007bff;
$btn-primary-hover: darken($btn-primary, 7.5%);
$btn-primary-active: darken($btn-primary, 10%);
$btn-primary-disabled: desaturate(lighten($btn-primary, 25%), 50%);
```

### Alert Colors

```scss
$alert-success: #28a745;
$alert-success-bg: lighten(desaturate($alert-success, 70%), 35%);
$alert-success-border: lighten($alert-success, 20%);

$alert-danger: #dc3545;
$alert-danger-bg: lighten(desaturate($alert-danger, 70%), 35%);
$alert-danger-border: lighten($alert-danger, 20%);
```

## Modern SCSS Color Functions (Sass 1.32+)

### New Color Scale Functions

- **`color.scale($color, $lightness: null, $saturation: null)`**: More intuitive scaling
- **`color.adjust($color, $lightness: null, $saturation: null)`**: Absolute adjustments
- **`color.change($color, $lightness: null, $saturation: null)`**: Change specific channels

### Usage with @use

```scss
@use 'sass:color';

$adjusted: color.scale(#6b717f, $lightness: 20%);
$changed: color.change(#6b717f, $lightness: 50%);
```

These functions provide more predictable and intuitive color manipulation compared to the legacy functions.

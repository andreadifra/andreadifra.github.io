# Systematic Color Relationships in SCSS Themes

This document explains how the color system creates relationships between light and dark themes using SCSS functions.

## Color Foundation

### Base Colors (in `_design-tokens.scss`)
```scss
// Light theme foundation
$light-base:       #ffffff  // Pure white
$light-surface:    #f8f9fa  // Very light gray
$light-surface-alt: #e9ecef // Light gray
$light-text:       #343a40  // Dark gray for text

// Dark theme foundation (actual original colors)
$dark-primary:     #091a31  // Very dark blue-ish background
$dark-surface:     #2a2a2a  // Dark gray surfaces
$dark-surface-alt: #3a3a3a  // Lighter dark gray
$dark-text:        #e6e7eb  // Near-white text
$dark-text-muted:  #aab0b9  // Muted light gray
```

## Systematic Relationships Using SCSS Functions

### 1. **Border Colors**
```scss
// Light theme
$border-color: $neutral-400;  // #dee2e6
$border-hover-color: darken($border-color, 15%);  // Darker on hover

// Dark theme  
$dark-border: lighten($dark-surface-alt, 5%);     // Slightly lighter than surface
$border-hover-color: lighten($border-color, 15%); // Lighter on hover (inverse of light)
```

### 2. **Interactive States**
```scss
// Light theme - darken for emphasis
$accent-hover: darken($accent-blue, 35%);  // Much darker blue
$card-hover-shadow: rgba(darken($text-primary, 20%), 0.08);

// Dark theme - lighten for emphasis  
$accent-hover: lighten($accent-blue, 15%);  // Lighter blue
$card-hover-shadow: rgba(darken($surface-primary, 5%), 0.6);
```

### 3. **Alpha/Transparency Relationships**
```scss
// Light theme - use dark colors with transparency
$avatar-border: rgba($text-primary, 0.15);    // Dark border with 15% opacity
$focus-ring-color: rgba($accent-blue, 0.25);  // Blue with 25% opacity

// Dark theme - use light colors with transparency
$avatar-border: rgba($text-primary, 0.2);           // Light border with 20% opacity  
$focus-ring-color: rgba(lighten($accent-blue, 20%), 0.25); // Lighter blue with transparency
```

## Color Mapping Strategy

### Light Theme Logic
- **Backgrounds**: Start from white (`$neutral-100`) and get progressively darker
- **Text**: Use dark colors (`$neutral-700`) for contrast against light backgrounds
- **Interactions**: Darken colors on hover/active states
- **Shadows**: Use dark colors with low opacity

### Dark Theme Logic  
- **Backgrounds**: Start from very dark (`$dark-primary`) and get progressively lighter
- **Text**: Use light colors (`$dark-text`) for contrast against dark backgrounds
- **Interactions**: Lighten colors on hover/active states (inverse of light theme)
- **Shadows**: Use even darker colors with higher opacity

## Advantages of This Approach

### ✅ **Systematic Relationships**
```scss
// Instead of hardcoded values:
$card-hover-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);

// Use systematic relationships:
$card-hover-shadow: 0 10px 18px rgba(darken($text-primary, 20%), 0.08);
```

### ✅ **Theme Consistency**
- Light theme: "darken on interaction"
- Dark theme: "lighten on interaction"
- Both themes follow logical, inverse patterns

### ✅ **Maintainability**
```scss
// Change the base accent color once:
$accent-blue: #007bff;

// All related colors update automatically:
$accent-hover-light: darken($accent-blue, 35%);  // Darker version
$accent-hover-dark: lighten($accent-blue, 15%);  // Lighter version
$focus-ring: rgba($accent-blue, 0.25);           // Transparent version
```

### ✅ **Accessibility**
- Maintains consistent contrast ratios
- Predictable color relationships
- Easy to test and adjust contrast

## Common Patterns

### Hover States
```scss
// Light theme pattern
.button {
  background: $accent-blue;
  &:hover { background: darken($accent-blue, 10%); }
}

// Dark theme pattern  
.button {
  background: lighten($accent-blue, 5%);
  &:hover { background: lighten($accent-blue, 15%); }
}
```

### Transparency Effects
```scss
// Light theme - dark colors with transparency
.overlay-light {
  background: rgba($text-primary, 0.1);     // Dark with low opacity
  border: 1px solid rgba($text-primary, 0.2);
}

// Dark theme - light colors with transparency
.overlay-dark {
  background: rgba($text-primary, 0.1);     // Light with low opacity  
  border: 1px solid rgba($text-primary, 0.2);
}
```

### Color Scaling
```scss
// Create multiple variations systematically
$primary-50:  lighten($brand-primary, 40%);  // Very light
$primary-100: lighten($brand-primary, 30%);  // Light
$primary-200: lighten($brand-primary, 20%);  // Medium-light
$primary-300: lighten($brand-primary, 10%);  // Slightly light
$primary-400: $brand-primary;                // Base
$primary-500: darken($brand-primary, 10%);   // Slightly dark
$primary-600: darken($brand-primary, 20%);   // Medium-dark
$primary-700: darken($brand-primary, 30%);   // Dark
$primary-800: darken($brand-primary, 40%);   // Very dark
```

This systematic approach ensures that both themes feel cohesive while maintaining their distinct light/dark characteristics through logical color relationships.

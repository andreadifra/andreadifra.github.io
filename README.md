# Andrea's Quarto Website

A personal website built with [Quarto](https://quarto.org/), featuring a blog, project showcase, and professional information.

## Repository Operations (PowerShell)

This repository is designed to work with PowerShell on Windows. Use the following commands when performing terminal operations.

### Initial Setup

Clone the repository and navigate to the project directory:

```powershell
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name
```

### Quarto Operations

Preview the website locally:

```powershell
quarto preview
```

Render the website:

```powershell
quarto render
```

### Git Operations

PowerShell uses different syntax than bash for command chaining and environment variables. Use these commands for common Git operations:

**Check Status**
```powershell
git status
```

**Stage Changes**
```powershell
git add .
```

**Commit Changes**
```powershell
git commit -m "Your commit message"
```

**Push to GitHub** (main branch)
```powershell
git push origin main
```

**Create and Switch to a New Branch**
```powershell
git checkout -b new-branch-name
```

**Pull Latest Changes**
```powershell
git pull origin main
```

### Publishing to GitHub Pages

For publishing to GitHub Pages using PowerShell:

```powershell
quarto publish gh-pages
```

### Handling Line Endings

PowerShell and Windows use CRLF for line endings while Git often prefers LF. To configure Git to handle this automatically:

```powershell
git config --global core.autocrlf true
```

## Project Structure

- `_quarto.yml` - Main configuration file
- `index.qmd` - Homepage
- `about.qmd` - About page
- `blog.qmd` - Blog listing page
- `projects.qmd` - Projects showcase page
- `posts/` - Directory containing blog posts
- `styles.css` - Custom CSS styling

## Maintenance Notes

When adding new blog posts, place them in the `posts/` directory with the following structure:

```
posts/
  new-post-name/
    index.qmd
    any-images.png
```

## Troubleshooting PowerShell Issues

- If you encounter permission issues, run PowerShell as Administrator
- Use `(Get-Command quarto).Path` to verify Quarto's installation location
- For path issues, remember PowerShell uses backslashes (`\`) or forward slashes (`/`) for paths
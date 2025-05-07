# GitHub Copilot Custom Instructions for Quarto Website Project

## Project Context
This is a personal website built with Quarto, featuring blog posts, project showcases, and professional information. 
The repository is hosted at https://github.com/andreadifra/Mywebsite

## Development Environment
- This project is developed on Windows using PowerShell for terminal operations
- Use forward slashes (/) for paths in commands to ensure cross-platform compatibility
- When running Quarto commands, use `quarto preview` for local testing and `quarto render` for building the site


## Terminal Operations
When instructing about terminal operations:
- Use PowerShell syntax rather than Bash
- Use semicolons (;) instead of && for command chaining

## Deployment Process
The website is deployed using GitHub Pages through Quarto's publishing mechanism. Always use `quarto publish gh-pages` for deployment instructions.
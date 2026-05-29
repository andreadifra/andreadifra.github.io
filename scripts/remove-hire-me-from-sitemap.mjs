import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const outputDir = process.env.QUARTO_PROJECT_OUTPUT_DIR || '_site';
const sitemapPath = path.resolve(process.cwd(), outputDir, 'sitemap.xml');

if (!existsSync(sitemapPath)) {
  process.exit(0);
}

const original = readFileSync(sitemapPath, 'utf8');
const updated = original
  .replace(/\s*<url>\s*<loc>[^<]*hire-me\.html<\/loc>[\s\S]*?<\/url>/g, '')
  .replace(/(\r?\n){3,}/g, '$1$1');

if (updated !== original) {
  writeFileSync(sitemapPath, updated);
  console.log('Removed /hire-me.html from sitemap.xml');
}

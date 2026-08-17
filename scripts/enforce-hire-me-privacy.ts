async function transformFileIfPresent(
  path: string,
  transform: (content: string) => string,
): Promise<void> {
  let content: string;
  try {
    content = await Deno.readTextFile(path);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return;
    }

    throw error;
  }

  const updatedContent = transform(content);

  if (updatedContent !== content) {
    await Deno.writeTextFile(path, updatedContent);
  }
}

function hasOutputFilename(destination: string, filename: string): boolean {
  try {
    const pathname = new URL(destination, "https://local.invalid/").pathname;
    return pathname.endsWith(`/${filename}`);
  } catch {
    return false;
  }
}

function filterSitemap(sitemap: string): string {
  return sitemap.replace(
    /^[ \t]*<url(?:\s[^>]*)?>[\s\S]*?^[ \t]*<\/url>\r?\n?/gm,
    (urlEntry) => {
      const location = urlEntry.match(/<loc>\s*([^<]+?)\s*<\/loc>/)?.[1];
      return location && hasOutputFilename(location, "hire-me.html")
        ? ""
        : urlEntry;
    },
  );
}

function filterLlmsIndex(llmsIndex: string): string {
  return llmsIndex
    .split(/(?<=\n)/)
    .filter((line) => {
      const destination = line.match(
        /^\s*-\s+\[[^\]]+\]\(([^)]+)\)\s*\r?\n?$/,
      )?.[1];

      return !destination ||
        !hasOutputFilename(destination, "hire-me.llms.md");
    })
    .join("");
}

async function removeIfPresent(path: string): Promise<void> {
  try {
    await Deno.remove(path);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
}

async function main(): Promise<void> {
  const outputDirectory = Deno.env.get("QUARTO_PROJECT_OUTPUT_DIR") ?? "_site";
  const outputRoot = await Deno.realPath(outputDirectory);

  await transformFileIfPresent(
    `${outputRoot}/sitemap.xml`,
    filterSitemap,
  );
  await transformFileIfPresent(
    `${outputRoot}/llms.txt`,
    filterLlmsIndex,
  );
  await removeIfPresent(`${outputRoot}/hire-me.llms.md`);
}

await main();

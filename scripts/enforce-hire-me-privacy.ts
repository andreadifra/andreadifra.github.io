interface QuartoProjectInspection {
  dir: string;
  config: {
    project?: {
      "output-dir"?: string;
    };
    website?: {
      "site-url"?: string;
    };
  };
}

async function inspectProject(): Promise<QuartoProjectInspection> {
  const result = await new Deno.Command("quarto", {
    args: ["inspect"],
    stderr: "piped",
    stdout: "piped",
  }).output();

  if (!result.success) {
    const stderr = new TextDecoder().decode(result.stderr);
    throw new Error(`Unable to inspect the Quarto project:\n${stderr}`);
  }

  return JSON.parse(
    new TextDecoder().decode(result.stdout),
  ) as QuartoProjectInspection;
}

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

function filterSitemap(sitemap: string, hireMeUrl: string): string {
  return sitemap.replace(
    /^[ \t]*<url(?:\s[^>]*)?>[\s\S]*?^[ \t]*<\/url>\r?\n?/gm,
    (urlEntry) => {
      const location = urlEntry.match(/<loc>\s*([^<]+?)\s*<\/loc>/)?.[1];
      return location === hireMeUrl ? "" : urlEntry;
    },
  );
}

function filterLlmsIndex(llmsIndex: string, hireMeUrl: string): string {
  return llmsIndex
    .split(/(?<=\n)/)
    .filter((line) => {
      const destination = line.match(
        /^\s*-\s+\[[^\]]+\]\(([^)]+)\)\s*\r?\n?$/,
      )?.[1];

      return destination !== hireMeUrl;
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
  const project = await inspectProject();
  const siteUrl = project.config.website?.["site-url"];

  if (!siteUrl) {
    throw new Error(
      "website.site-url must be configured to enforce hire-me privacy",
    );
  }

  const canonicalRoot = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  const outputDirectory = project.config.project?.["output-dir"] ?? "_site";
  const outputRoot = `${project.dir}/${outputDirectory}`;

  const hireMePageUrl = new URL("hire-me.html", canonicalRoot).href;
  const hireMeLlmsUrl = new URL("hire-me.llms.md", canonicalRoot).href;

  await transformFileIfPresent(
    `${outputRoot}/sitemap.xml`,
    (sitemap) => filterSitemap(sitemap, hireMePageUrl),
  );
  await transformFileIfPresent(
    `${outputRoot}/llms.txt`,
    (llmsIndex) => filterLlmsIndex(llmsIndex, hireMeLlmsUrl),
  );
  await removeIfPresent(`${outputRoot}/hire-me.llms.md`);
}

await main();

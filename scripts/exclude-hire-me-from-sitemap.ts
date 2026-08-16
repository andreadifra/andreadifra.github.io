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

async function main(): Promise<void> {
  const project = await inspectProject();
  const siteUrl = project.config.website?.["site-url"];

  if (!siteUrl) {
    throw new Error("website.site-url must be configured to filter sitemap.xml");
  }

  const canonicalRoot = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  const hireMeUrl = new URL("hire-me.html", canonicalRoot).href;
  const outputDirectory = project.config.project?.["output-dir"] ?? "_site";
  const sitemapPath = `${project.dir}/${outputDirectory}/sitemap.xml`;

  let sitemap: string;

  try {
    sitemap = await Deno.readTextFile(sitemapPath);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return;
    }

    throw error;
  }

  let changed = false;
  const updatedSitemap = sitemap.replace(
    /^[ \t]*<url(?:\s[^>]*)?>[\s\S]*?^[ \t]*<\/url>\r?\n?/gm,
    (urlEntry) => {
      const location = urlEntry.match(/<loc>\s*([^<]+?)\s*<\/loc>/)?.[1];

      if (location === hireMeUrl) {
        changed = true;
        return "";
      }

      return urlEntry;
    },
  );

  if (changed) {
    await Deno.writeTextFile(sitemapPath, updatedSitemap);
  }
}

await main();

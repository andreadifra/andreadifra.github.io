const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/writing/projects.html</loc>
    <lastmod>2026-08-16T12:00:00.000Z</lastmod>
  </url>
  <url>
    <loc>https://example.com/writing/hire-me.html</loc>
    <lastmod>2026-08-16T12:00:00.000Z</lastmod>
  </url>
  <url>
    <loc>https://example.com/hire-me.html</loc>
    <lastmod>2026-08-16T12:00:00.000Z</lastmod>
  </url>
</urlset>
`;

const expected = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/writing/projects.html</loc>
    <lastmod>2026-08-16T12:00:00.000Z</lastmod>
  </url>
  <url>
    <loc>https://example.com/hire-me.html</loc>
    <lastmod>2026-08-16T12:00:00.000Z</lastmod>
  </url>
</urlset>
`;

function assertEquals(actual: string, wanted: string): void {
  if (actual !== wanted) {
    throw new Error(`Expected:\n${wanted}\nActual:\n${actual}`);
  }
}

const projectDirectory = await Deno.makeTempDir({
  prefix: "hire-me-sitemap-test-",
});

try {
  const outputDirectory = `${projectDirectory}/public`;
  await Deno.mkdir(outputDirectory);
  await Deno.writeTextFile(
    `${projectDirectory}/_quarto.yml`,
    `project:\n  type: website\n  output-dir: public\nwebsite:\n  site-url: https://example.com/writing/\n`,
  );
  await Deno.writeTextFile(`${outputDirectory}/sitemap.xml`, sitemap);

  const scriptPath = await Deno.realPath(
    new URL("../scripts/exclude-hire-me-from-sitemap.ts", import.meta.url),
  );
  const command = new Deno.Command("quarto", {
    args: ["run", scriptPath],
    cwd: projectDirectory,
    stderr: "piped",
    stdout: "piped",
  });
  const result = await command.output();

  if (!result.success) {
    const stderr = new TextDecoder().decode(result.stderr);
    throw new Error(`Sitemap hook failed with code ${result.code}:\n${stderr}`);
  }

  assertEquals(
    await Deno.readTextFile(`${outputDirectory}/sitemap.xml`),
    expected,
  );
} finally {
  await Deno.remove(projectDirectory, { recursive: true });
}

console.log("PASS: canonical hire-me URL is excluded and other URLs remain");

import { assert } from "./helpers.ts";

const projectRoot = new URL("..", import.meta.url);
const netlifyConfig = await Deno.readTextFile(
  new URL("netlify.toml", projectRoot),
);
const configuredCommand = netlifyConfig.match(
  /^\s*cmd = "([^"]+)"$/m,
)?.[1];

assert(
  configuredCommand !== undefined,
  "Netlify must configure a Quarto command",
);

const [subcommand, ...args] = configuredCommand.split(/\s+/);
const fakeRDirectory = await Deno.makeTempDir({ prefix: "netlify-no-r-" });

try {
  if (Deno.build.os === "windows") {
    await Deno.writeTextFile(
      `${fakeRDirectory}/Rscript.bat`,
      "@echo off\r\n>&2 echo ERROR: Netlify render invoked Rscript\r\nexit /b 97\r\n",
    );
  } else {
    const fakeRscript = `${fakeRDirectory}/Rscript`;
    await Deno.writeTextFile(
      fakeRscript,
      "#!/usr/bin/env sh\necho 'ERROR: Netlify render invoked Rscript' >&2\nexit 97\n",
    );
    await Deno.chmod(fakeRscript, 0o755);
  }

  const result = await new Deno.Command("quarto", {
    args: [subcommand, ...args],
    cwd: projectRoot,
    env: {
      ...Deno.env.toObject(),
      QUARTO_R: fakeRDirectory,
    },
    stderr: "piped",
    stdout: "piped",
  }).output();

  if (!result.success) {
    const decoder = new TextDecoder();
    throw new Error(
      `Frozen Netlify render failed with code ${result.code}:\n` +
        `${decoder.decode(result.stdout)}\n${decoder.decode(result.stderr)}`,
    );
  }

  const outputRoot = new URL("_site/", projectRoot);
  const requiredFiles = [
    "index.html",
    "blog.html",
    "projects.html",
    "about.html",
    "posts/zero-inflated-models-tutorial/index.html",
    "blog.xml",
    "index.xml",
    "search.json",
    "sitemap.xml",
    "robots.txt",
    "llms.txt",
    "hire-me.html",
  ];

  for (const path of requiredFiles) {
    await Deno.stat(new URL(path, outputRoot));
  }

  const discoveryFiles = [
    "search.json",
    "sitemap.xml",
    "llms.txt",
    "listings.json",
    "blog.xml",
    "index.xml",
  ];

  for (const path of discoveryFiles) {
    const content = await Deno.readTextFile(new URL(path, outputRoot));
    assert(
      !/(?:hire-me|hire me)/i.test(content),
      `${path} must not advertise the private recruiter page`,
    );
  }

  const publicHtmlFiles = [
    "index.html",
    "blog.html",
    "projects.html",
    "about.html",
    "posts/zero-inflated-models-tutorial/index.html",
  ];

  for (const path of publicHtmlFiles) {
    const content = await Deno.readTextFile(new URL(path, outputRoot));
    assert(
      !/href=["'][^"']*hire-me(?:\.html)?["']/i.test(content),
      `${path} must not link to the private recruiter page`,
    );
  }

  const hireMePage = await Deno.readTextFile(
    new URL("hire-me.html", outputRoot),
  );
  assert(
    hireMePage.includes('<meta name="robots" content="noindex, nofollow">'),
    "the private recruiter page must tell crawlers not to index or follow it",
  );

  try {
    await Deno.stat(new URL("hire-me.llms.md", outputRoot));
    throw new Error("hire-me.llms.md must not be published");
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
} finally {
  await Deno.remove(fakeRDirectory, { recursive: true });
}

console.log("PASS: Netlify command renders the full site without invoking R");

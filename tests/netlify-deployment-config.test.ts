interface CommandResult {
  code: number;
  stderr: string;
  stdout: string;
}

import { assert } from "./helpers.ts";

async function runCommand(
  command: string,
  args: string[],
): Promise<CommandResult> {
  const result = await new Deno.Command(command, {
    args,
    cwd: new URL("..", import.meta.url),
    stderr: "piped",
    stdout: "piped",
  }).output();
  const decoder = new TextDecoder();

  return {
    code: result.code,
    stderr: decoder.decode(result.stderr),
    stdout: decoder.decode(result.stdout),
  };
}

const projectRoot = new URL("..", import.meta.url);
const packageJson = JSON.parse(
  await Deno.readTextFile(new URL("package.json", projectRoot)),
) as {
  dependencies?: Record<string, string>;
};
const packageLock = JSON.parse(
  await Deno.readTextFile(new URL("package-lock.json", projectRoot)),
) as {
  packages?: Record<string, { version?: string }>;
};
const netlifyConfig = await Deno.readTextFile(
  new URL("netlify.toml", projectRoot),
);
const quartoConfig = await Deno.readTextFile(
  new URL("_quarto.yml", projectRoot),
);

assert(
  packageJson.dependencies?.["@quarto/netlify-plugin-quarto"] === "0.0.5",
  "package.json must pin @quarto/netlify-plugin-quarto to 0.0.5",
);
assert(
  packageLock.packages?.["node_modules/@quarto/netlify-plugin-quarto"]
    ?.version === "0.0.5",
  "package-lock.json must resolve @quarto/netlify-plugin-quarto to 0.0.5",
);
assert(
  /^\[build\]\r?\n\s*publish = "_site"$/m.test(netlifyConfig),
  "Netlify must publish the Quarto _site directory",
);
assert(
  /^\[\[plugins\]\]\r?\n\s*package = "@quarto\/netlify-plugin-quarto"$/m
    .test(netlifyConfig),
  "Netlify must use the official Quarto build plugin",
);
assert(
  /^\s*version = "v1\.9\.37"$/m.test(netlifyConfig),
  "The Netlify build must pin Quarto v1.9.37",
);
assert(
  /^\s*cmd = "render --use-freezer"$/m.test(netlifyConfig),
  "The hosted build must force committed frozen computation output",
);
assert(
  /^\s*site-url: https:\/\/andreadifrancia\.com\/$/m.test(quartoConfig),
  "Quarto must use the provider-independent canonical domain",
);
assert(
  !/site-url:\s*https:\/\/[^\s]*netlify\.app/i.test(quartoConfig),
  "The canonical site URL must not use a Netlify-owned hostname",
);

const ignoredSite = await runCommand("git", ["check-ignore", "_site"]);
assert(ignoredSite.code === 0, "_site must stay ignored");

const trackedFreeze = await runCommand("git", ["ls-files", "_freeze"]);
assert(trackedFreeze.code === 0, trackedFreeze.stderr);
assert(
  trackedFreeze.stdout.trim().length > 0,
  "_freeze must contain committed render output",
);

console.log(
  "PASS: Netlify deployment configuration is pinned and freezer-backed",
);

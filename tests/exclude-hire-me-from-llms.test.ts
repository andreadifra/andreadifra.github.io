const llmsIndex = `# Example Site

## Pages

- [About](https://example.com/about.llms.md)
- [Hire Me](https://example.com/hire-me.llms.md)
- [Writing](https://example.com/writing/index.llms.md)
`;

import { assert } from "./helpers.ts";

const projectDirectory = await Deno.makeTempDir({
  prefix: "hire-me-llms-test-",
});

try {
  const outputDirectory = `${projectDirectory}/public`;
  await Deno.mkdir(`${outputDirectory}/writing`, { recursive: true });
  await Deno.writeTextFile(
    `${projectDirectory}/_quarto.yml`,
    "project:\n  type: website\n  output-dir: public\nwebsite:\n  site-url: https://example.com/\n",
  );
  await Deno.writeTextFile(`${outputDirectory}/llms.txt`, llmsIndex);
  await Deno.writeTextFile(
    `${outputDirectory}/hire-me.llms.md`,
    "# Private recruiter page\n",
  );
  await Deno.writeTextFile(
    `${outputDirectory}/about.llms.md`,
    "# About\n",
  );
  await Deno.writeTextFile(
    `${outputDirectory}/writing/index.llms.md`,
    "# Writing\n",
  );

  const scriptPath = await Deno.realPath(
    new URL("../scripts/enforce-hire-me-privacy.ts", import.meta.url),
  );
  const result = await new Deno.Command("quarto", {
    args: ["run", scriptPath],
    cwd: projectDirectory,
    stderr: "piped",
    stdout: "piped",
  }).output();

  if (!result.success) {
    const stderr = new TextDecoder().decode(result.stderr);
    throw new Error(
      `LLM privacy hook failed with code ${result.code}:\n${stderr}`,
    );
  }

  const updatedIndex = await Deno.readTextFile(`${outputDirectory}/llms.txt`);
  assert(
    !updatedIndex.includes("hire-me.llms.md"),
    "llms.txt must not advertise the private recruiter page",
  );
  assert(
    updatedIndex.includes("about.llms.md") &&
      updatedIndex.includes("writing/index.llms.md"),
    "unrelated llms.txt entries must remain",
  );
  assert(
    !(await exists(`${outputDirectory}/hire-me.llms.md`)),
    "the private recruiter page markdown must not be published",
  );
  assert(
    await exists(`${outputDirectory}/about.llms.md`) &&
      await exists(`${outputDirectory}/writing/index.llms.md`),
    "unrelated LLM markdown files must remain",
  );
} finally {
  await Deno.remove(projectDirectory, { recursive: true });
}

console.log("PASS: recruiter page is excluded from LLM discovery output");

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }

    throw error;
  }
}

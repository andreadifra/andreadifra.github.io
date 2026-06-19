# Knitr chunk profiling

This repository includes `scripts/knitr-profile.R`, a small helper for timing R
chunks in Quarto posts that use the knitr engine. Use it when a post feels slow
to re-render and you want evidence before adding `#| cache: true`.

The helper is meant for temporary diagnosis. It writes local timing reports under
`.quarto/chunk-profile/`, which is ignored by git.

## Purpose

Quarto's `freeze: auto` keeps committed post outputs stable during project
builds, but it does not tell you which chunks are expensive. Knitr chunk caching
works at chunk level, so cache decisions should also be made at chunk level.

The profiler records one row per evaluated chunk:

- `render_id`: one identifier for a render run
- `timestamp`: time when the chunk finished
- `document`: source document being rendered
- `label`: chunk label used in the source document
- `engine`: chunk engine reported by knitr
- `elapsed`, `user`, `system`: values from `proc.time()`

## Usage

Add this setup chunk near the top of a post while profiling:

````markdown
```{r profile-setup}
#| include: false
source(file.path(Sys.getenv("QUARTO_PROJECT_DIR"), "scripts", "knitr-profile.R"))
enable_knitr_chunk_profile()
```
````

Run a fresh execution pass when deciding what should be cached:

```powershell
quarto render posts/<slug>/index.qmd --no-cache
```

This forces chunks to run, so the CSV shows their real execution cost.

After adding `#| cache: true` to slow deterministic chunks, run a plain render:

```powershell
quarto render posts/<slug>/index.qmd
```

On a warm plain render, cached chunks may be absent from the CSV because knitr
returned their cached output before the timing hook ran. That absence is the
cache-hit signal.

The report will be written to:

```text
.quarto/chunk-profile/<slug>.csv
```

For posts stored as `posts/<slug>/index.qmd`, the helper uses `<slug>` as the
report name. Repeat the render two or three times if you want median timings
rather than one noisy run.

Remove the profiling setup chunk before publishing the post.

If an existing report uses an older column layout, the next profiling run
overwrites it instead of appending incompatible rows.

## How to use the results

Cache chunks that are both slow and deterministic:

- model fitting
- simulation
- expensive diagnostics
- expensive plots
- data preparation that takes meaningful time

Do not cache chunks that are cheap or mainly format existing objects:

- package loading
- small summary tables
- `knitr::kable()` formatting
- simple coefficient interpretation
- chunks already marked `eval: false`

If one large chunk dominates the report, split it into smaller labelled chunks
before deciding what to cache. For example, a chunk that fits several models may
need separate chunks for each model so the report can show which fit is slow.

## How to read the CSV

The CSV contains observed chunk executions, not a complete list of chunks in the
document.

- A row means the chunk ran and was timed.
- A cached chunk missing from a warm plain render usually means knitr reused its
  cached output before this profiler hook ran.
- If a chunk appears in a warm plain render, it ran during that render. Cache it
  only if it is slow enough and deterministic.

## Weak points

- The hook measures chunk wall time, not line-level time. Use `system.time()` or
  split the chunk when you need finer detail.
- A profiling render with `--no-cache` measures fresh execution, not warm-cache
  speed.
- Cached chunks may not run their hooks during normal cached renders. Compare a
  fresh render with a plain render when you want to confirm warm-cache behaviour.
- Timings include setup and printing costs inside the chunk. They are useful for
  cache decisions, not microbenchmarking.
- The helper is for R/knitr documents. It is not a Python/Jupyter profiler.

## Related references

- Quarto execution, freeze, and cache behaviour:
  <https://quarto.org/docs/projects/code-execution.html>
- Quarto execution options:
  <https://quarto.org/docs/computations/execution-options.html>
- knitr hook behaviour:
  <https://yihui.org/knitr/hooks/>

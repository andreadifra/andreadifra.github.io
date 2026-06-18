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
- `label`: chunk label used in the source document
- `elapsed`, `user`, `system`: values from `proc.time()`
- `cache_option`: whether the chunk had `cache: true` enabled

## Usage

Add this setup chunk near the top of a post while profiling:

````markdown
```{r profile-setup}
#| include: false
source(file.path(Sys.getenv("QUARTO_PROJECT_DIR"), "scripts", "knitr-profile.R"))
enable_knitr_chunk_profile()
```
````

Run a real execution pass:

```powershell
quarto render posts/<slug>/index.qmd --no-cache
```

The report will be written to:

```text
.quarto/chunk-profile/<slug>.csv
```

For posts stored as `posts/<slug>/index.qmd`, the helper uses `<slug>` as the
report name. Repeat the render two or three times if you want median timings
rather than one noisy run.

Remove the profiling setup chunk before publishing the post.

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

## Weak points

- The hook measures chunk wall time, not line-level time. Use `system.time()` or
  split the chunk when you need finer detail.
- A profiling render with `--no-cache` forces fresh execution. In that mode, the
  report can still show `cache_option` as `TRUE`, but that column is only the
  chunk setting, not proof that a cached result was reused.
- Cached chunks may not run their hooks during normal cached renders. Use
  `--no-cache` or `--cache-refresh` when profiling.
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

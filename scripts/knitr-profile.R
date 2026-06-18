enable_knitr_chunk_profile <- function(output_dir = ".quarto/chunk-profile") {
  if (!requireNamespace("knitr", quietly = TRUE)) {
    stop("The knitr package is required for chunk profiling.", call. = FALSE)
  }

  project_dir <- Sys.getenv("QUARTO_PROJECT_DIR")
  if (!nzchar(project_dir)) {
    project_dir <- getwd()
  }

  is_absolute_path <- function(path) {
    grepl("^(?:[A-Za-z]:[/\\\\]|/|\\\\\\\\)", path)
  }

  if (!is_absolute_path(output_dir)) {
    output_dir <- file.path(project_dir, output_dir)
  }
  dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)

  input <- tryCatch(knitr::current_input(dir = TRUE), error = function(...) NULL)
  if (is.null(input) || !nzchar(input)) {
    input <- "quarto-document.qmd"
  }

  input_stem <- tools::file_path_sans_ext(basename(input))
  if (identical(input_stem, "index")) {
    parent <- basename(dirname(normalizePath(input, winslash = "/", mustWork = FALSE)))
    if (nzchar(parent) && !identical(parent, ".")) {
      input_stem <- parent
    }
  }

  output_file <- file.path(output_dir, paste0(input_stem, ".csv"))
  starts <- new.env(parent = emptyenv())
  render_id <- format(Sys.time(), "%Y%m%dT%H%M%S%z")

  pick_label <- function(options) {
    label <- options[["label"]]
    if (!is.null(label) && nzchar(as.character(label))) {
      return(as.character(label))
    }

    "unnamed-chunk"
  }

  write_row <- function(row) {
    write.table(
      row,
      file = output_file,
      sep = ",",
      row.names = FALSE,
      col.names = !file.exists(output_file),
      append = file.exists(output_file),
      qmethod = "double"
    )
  }

  knitr::knit_hooks$set(profile = function(before, options) {
    if (!isTRUE(options[["eval"]])) {
      return(invisible(NULL))
    }

    key <- pick_label(options)

    if (before) {
      starts[[key]] <- proc.time()
      return(invisible(NULL))
    }

    start <- starts[[key]]
    if (is.null(start)) {
      return(invisible(NULL))
    }

    elapsed <- proc.time() - start
    row <- data.frame(
      render_id = render_id,
      timestamp = format(Sys.time(), "%Y-%m-%d %H:%M:%S %z"),
      label = pick_label(options),
      elapsed = unname(elapsed[["elapsed"]]),
      user = unname(elapsed[["user.self"]]),
      system = unname(elapsed[["sys.self"]]),
      cache_option = isTRUE(options[["cache"]]),
      stringsAsFactors = FALSE
    )
    write_row(row)
    rm(list = key, envir = starts)

    invisible(NULL)
  })

  knitr::opts_chunk$set(profile = TRUE)
  invisible(output_file)
}

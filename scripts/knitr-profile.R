enable_knitr_chunk_profile <- function(output_dir = ".quarto/chunk-profile") {
  if (!requireNamespace("knitr", quietly = TRUE)) {
    stop("The knitr package is required for chunk profiling.", call. = FALSE)
  }

  project_dir <- Sys.getenv("QUARTO_PROJECT_DIR")
  if (!nzchar(project_dir)) {
    project_dir <- getwd()
  }

  project_dir <- normalizePath(
    path.expand(project_dir),
    winslash = "/",
    mustWork = FALSE
  )

  is_absolute_path <- function(path) {
    grepl("^(?:[A-Za-z]:[/\\\\]|/|\\\\\\\\)", path)
  }

  value_or_na <- function(x) {
    if (is.null(x)) NA_character_ else paste(as.character(x), collapse = ";")
  }

  get_quarto_document_path <- function() {
    info_file <- Sys.getenv("QUARTO_EXECUTE_INFO")

    if (
      nzchar(info_file) &&
      file.exists(info_file) &&
      requireNamespace("jsonlite", quietly = TRUE)
    ) {
      info <- tryCatch(
        jsonlite::fromJSON(info_file),
        error = function(...) NULL
      )

      input <- info[["document-path"]]
      if (!is.null(input) && nzchar(input)) {
        return(input)
      }
    }

    input <- tryCatch(knitr::current_input(dir = TRUE), error = function(...) NULL)
    if (!is.null(input) && nzchar(input)) input else "quarto-document.qmd"
  }

  output_dir <- path.expand(output_dir)

  if (!is_absolute_path(output_dir)) {
    output_dir <- file.path(project_dir, output_dir)
  }

  output_dir <- normalizePath(output_dir, winslash = "/", mustWork = FALSE)

  dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)

  if (!dir.exists(output_dir)) {
    stop("Could not create profiling output directory: ", output_dir, call. = FALSE)
  }

  input <- get_quarto_document_path()
  input_path <- normalizePath(input, winslash = "/", mustWork = FALSE)

  input_stem <- tools::file_path_sans_ext(basename(input_path))

  if (identical(input_stem, "index")) {
    parent <- basename(dirname(input_path))
    if (nzchar(parent) && !identical(parent, ".") && !identical(parent, "/")) {
      input_stem <- parent
    }
  }

  output_file <- file.path(output_dir, paste0(input_stem, ".csv"))
  starts <- new.env(parent = emptyenv())

  render_id <- paste0(
    format(Sys.time(), "%Y%m%dT%H%M%OS3%z"),
    "-",
    Sys.getpid()
  )

  pick_label <- function(options) {
    label <- options[["label"]]

    if (!is.null(label) && nzchar(as.character(label))) {
      return(as.character(label))
    }

    "unnamed-chunk"
  }

  write_row <- function(row) {
    expected_header <- paste(sprintf('"%s"', names(row)), collapse = ",")
    existing_header <- if (file.exists(output_file)) {
      readLines(output_file, n = 1, warn = FALSE)
    } else {
      character(0)
    }

    write_header <- !file.exists(output_file) ||
      isTRUE(file.info(output_file)$size == 0) ||
      !identical(existing_header, expected_header)

    if (
      file.exists(output_file) &&
      !isTRUE(file.info(output_file)$size == 0) &&
      !identical(existing_header, expected_header)
    ) {
      warning(
        "Existing profiling file uses an older schema; overwriting: ",
        output_file,
        call. = FALSE
      )
    }

    utils::write.table(
      row,
      file = output_file,
      sep = ",",
      row.names = FALSE,
      col.names = write_header,
      append = !write_header,
      qmethod = "double"
    )
  }

  knitr::knit_hooks$set(chunk_profile = function(before, options) {
    eval_opt <- options[["eval"]]

    if (identical(eval_opt, FALSE)) {
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
      document = input_path,
      label = pick_label(options),
      engine = value_or_na(options[["engine"]]),
      elapsed = unname(elapsed[["elapsed"]]),
      user = unname(elapsed[["user.self"]]),
      system = unname(elapsed[["sys.self"]]),
      stringsAsFactors = FALSE
    )

    write_row(row)
    rm(list = key, envir = starts)

    invisible(NULL)
  })

  knitr::opts_chunk$set(chunk_profile = TRUE)

  invisible(output_file)
}

document.addEventListener("DOMContentLoaded", () => {
  const calendlyBaseUrl = "https://calendly.com";
  const calendlyWidgetScript =
    "https://assets.calendly.com/assets/external/widget.js";
  const calendlyWidgetStylesheet =
    "https://assets.calendly.com/assets/external/widget.css";

  const loadStylesheet = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      return;
    }

    const link = document.createElement("link");
    link.href = href;
    link.rel = "stylesheet";
    document.head.append(link);
  };

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${src}"]`);

      if (existingScript) {
        existingScript.addEventListener("load", resolve, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.append(script);
    });

  const calendlyWidgetReady = (() => {
    loadStylesheet(calendlyWidgetStylesheet);
    return loadScript(calendlyWidgetScript).catch(() => null);
  })();

  document.querySelectorAll(".recruiter-calendly-trigger").forEach((trigger) => {
    trigger.addEventListener("click", async (event) => {
      const path = trigger.dataset.calendlyPath;
      const url = path ? `${calendlyBaseUrl}/${path}` : undefined;

      if (!url) {
        return;
      }

      event.preventDefault();
      await calendlyWidgetReady;

      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url });
        return;
      }

      window.open(url, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-details-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const tabPane = button.closest(".tab-pane");
      const shouldOpen = button.dataset.detailsAction === "expand";

      event.preventDefault();

      if (!tabPane) {
        return;
      }

      tabPane.querySelectorAll("details").forEach((detail) => {
        detail.open = shouldOpen;
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const calendlyBaseUrl = "https://calendly.com";

  document.querySelectorAll(".recruiter-calendly-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const path = trigger.dataset.calendlyPath;
      const url = path ? `${calendlyBaseUrl}/${path}` : undefined;

      if (!url) {
        return;
      }

      if (window.Calendly) {
        event.preventDefault();
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

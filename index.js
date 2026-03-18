const THEMES = ["sakura", "tokyo-drift", "matcha", "sumi", "nami"];

function applyTheme(theme) {
  const safeTheme = THEMES.includes(theme) ? theme : "tokyo-drift";
  document.documentElement.setAttribute("data-theme", safeTheme);
  localStorage.setItem("theme", safeTheme);
  return safeTheme;
}

function setupThemeSwitcher() {
  const select = document.getElementById("theme-select");
  if (!select) return;

  const activeTheme = document.documentElement.getAttribute("data-theme") || "tokyo-drift";
  select.value = THEMES.includes(activeTheme) ? activeTheme : "tokyo-drift";

  select.addEventListener("change", (event) => {
    const nextTheme = event.target.value;
    applyTheme(nextTheme);
  });
}

function collapseTimelineItem(item, button, details) {
  item.classList.remove("is-open");
  button.setAttribute("aria-expanded", "false");
  details.hidden = true;
}

function expandTimelineItem(item, button, details) {
  item.classList.add("is-open");
  button.setAttribute("aria-expanded", "true");
  details.hidden = false;
}

function setupTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => {
    const button = item.querySelector(".timeline-toggle");
    const details = item.querySelector(".timeline-details");
    if (!button || !details) return;

    details.hidden = true;
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      if (expanded) {
        collapseTimelineItem(item, button, details);
      } else {
        expandTimelineItem(item, button, details);
      }
    });
  });
}

function setupSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });
}

function init() {
  setupThemeSwitcher();
  setupTimeline();
  setupSmoothScroll();
}

document.addEventListener("DOMContentLoaded", init);

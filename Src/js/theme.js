const THEME_KEY = "theme";
const root = document.documentElement;

function syncButtons() {
  const current = root.classList.contains("theme-dark") ? "dark" : "light";
  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.themeBtn === current));
  });
}

function setTheme(theme) {
  root.classList.toggle("theme-dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
  syncButtons();
}

export function initTheme() {
  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.themeBtn));
  });
  syncButtons();
}

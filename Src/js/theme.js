const THEME_KEY = "theme";
const root = document.documentElement;

// ---------- اعمال فوری تم (قبل از رندر صفحه) ----------
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {}

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  root.classList.toggle("theme-dark", theme === "dark");

  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.themeBtn === theme));
  });
}

function setTheme(theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

applyTheme(getSavedTheme());

// ----------  اتصال دکمه‌ها (بعد از آماده شدن DOM) ----------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.themeBtn));
  });

  applyTheme(getSavedTheme());
});

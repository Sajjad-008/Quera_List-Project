const THEME_KEY = "theme";
const root = document.documentElement; // تگ <html>

// ---------- بخش ۱: اعمال فوری تم (قبل از رندر صفحه) ----------
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {}

  // اگر چیزی ذخیره نشده بود، از تم سیستم‌عامل پیروی کن
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
  } catch (e) {
    // اگر localStorage در دسترس نبود، فقط تم همین نشست اعمال می‌شود
  }
}

// همین الان اجرا می‌شود (دکمه‌ها هنوز وجود ندارند، مشکلی نیست)
applyTheme(getSavedTheme());

// ---------- بخش ۲: اتصال دکمه‌ها (بعد از آماده شدن DOM) ----------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.themeBtn));
  });

  // دکمه‌ها حالا وجود دارند، پس aria-pressed را هماهنگ کن
  applyTheme(getSavedTheme());
});

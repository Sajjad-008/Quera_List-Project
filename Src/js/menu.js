export function initMenu() {
  const root = document.documentElement;
  const menu = document.getElementById("mobile-menu");
  const toggleBtn = document.querySelector("[data-menu-toggle]");
  const desktopQuery = window.matchMedia("(min-width: 1024px)");

  if (!menu || !toggleBtn) return;

  const isOpen = () => root.dataset.menu === "open";

  function openMenu() {
    root.dataset.menu = "open";
    toggleBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!isOpen()) return;
    delete root.dataset.menu;
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.focus();
  }

  toggleBtn.addEventListener("click", openMenu);

  document.querySelectorAll("[data-menu-close]").forEach((el) => {
    el.addEventListener("click", closeMenu);
  });

  menu.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  desktopQuery.addEventListener("change", (e) => {
    if (e.matches && isOpen()) {
      delete root.dataset.menu;
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

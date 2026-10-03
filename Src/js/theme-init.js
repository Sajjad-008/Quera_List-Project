(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme !== "dark" && theme !== "light") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
  } catch (e) {}
})();

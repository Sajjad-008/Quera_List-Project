const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function getTodayText(date = new Date()) {
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return `${parts.weekday}، ${parts.day} ${parts.month} ${parts.year}`;
}

function render() {
  const text = getTodayText();
  document.querySelectorAll("[data-today-date]").forEach((el) => {
    el.textContent = (el.dataset.datePrefix || "") + text;
  });
}

function msUntilMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 1, 0);
  return next - now;
}

function scheduleMidnightUpdate() {
  setTimeout(() => {
    render();
    scheduleMidnightUpdate();
  }, msUntilMidnight());
}

export function initDate() {
  render();
  scheduleMidnightUpdate();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) render();
  });
}

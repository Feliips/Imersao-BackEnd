// Theme toggle: alterna entre tema escuro (padrão) e claro, persiste em localStorage
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function applyTheme(theme) {
  if (theme === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "🌙";
    toggleBtn.setAttribute("aria-label", "Ativar tema escuro");
  } else {
    body.classList.remove("light");
    toggleBtn.textContent = "☀️";
    toggleBtn.setAttribute("aria-label", "Ativar tema claro");
  }
}

// Inicializa a partir do localStorage
const saved = localStorage.getItem("theme");
applyTheme(saved === "light" ? "light" : "dark");

// Evento de clique
toggleBtn.addEventListener("click", () => {
  const isLight = body.classList.contains("light");
  const newTheme = isLight ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

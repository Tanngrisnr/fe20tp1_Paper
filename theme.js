// Functions and event listeners to toggle between themes and save preference to local storage
const dmBtn = document.getElementById('dm-btn');
const ftBtn = document.getElementById('ft-btn')
const root = document.documentElement;

const currentColorTheme = localStorage.getItem("color-theme");
if (currentColorTheme == "dark") {
  root.classList.add("dark-theme");
}

const currentFontTheme = localStorage.getItem("font-theme");
if (currentColorTheme == "serif") {
  root.classList.add("serif-theme");
}


dmBtn.addEventListener("click", () => {
  root.classList.toggle("dark-theme");

  let theme = "light";
  if (root.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("color-theme", theme);
});

ftBtn.addEventListener("click", () => {
  root.classList.toggle("serif-theme");

  let theme = "sans";
  if (root.classList.contains("serif-theme")) {
    theme = "serif";
  }
  localStorage.setItem("font-theme", theme);
});


// Select the button
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



/* const root = document.documentElement;
const dmToggle = document.getElementById('dm-btn')
let darkmode = getTheme('darkmode');

window.addEventListener('load', () => {
    toggleDarkmode();
})


dmToggle.addEventListener('click', () => {
    toggleDarkmode();
});

function toggleDarkmode() {

    if (!darkmode) {
        root.style.setProperty('--bg', 'lightslategrey')
        root.style.setProperty('--txt', 'white')
        updateTheme('darkmode', darkmode)
    }
    else {
    root.style.setProperty('--bg', 'white')
    root.style.setProperty('--txt', 'lightslategrey')
    updateTheme('darkmode', darkmode)
    }
    getTheme('darkmode')
}

function updateTheme(name, bool) {
    localStorage.setItem(name, JSON.stringify(bool));
}
function getTheme(name) {
    const reference = localStorage.getItem(name);
    if (reference) {
        return JSON.parse(reference);
      }
}
 */
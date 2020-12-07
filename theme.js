// Select the button
const dmBtn = document.getElementById('dm-btn');
const root = document.documentElement;

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  root.classList.add("dark-theme");
}

dmBtn.addEventListener("click", function () {
  root.classList.toggle("dark-theme");

  let theme = "light";
  if (root.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
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
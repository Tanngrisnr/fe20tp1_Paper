const search = document.getElementById("search")

var infoShown = false;

if (!localStorage.getItem('infoShown')) {
    load();
}

if (localStorage.getItem('infoShown')) {
    document.getElementById('modal').style.display = "none"
}

function load() {
    window.onload = function () {
        document.getElementById('modalbutton').onclick = function () {
            document.getElementById('modal').style.display = "none"
            localStorage.setItem('infoShown', 'true');
        };
    };
}

search.addEventListener("input", () => {
    search_note()
})
function search_note() {
    let input = document.getElementById('search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('note');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.visibility = "collapse";
        }
        else {
            x[i].style.visibility = "visible";
        }
    }
} 
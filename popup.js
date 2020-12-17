/*functioning handling pop-up window for new users of application*/

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

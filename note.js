const saveBtn = document.getElementById('save');
const noteList = document.getElementById('note-list')


let notes = [];

var quill = new Quill('#editor', {
  theme: 'snow'
});

saveBtn.addEventListener('click', () => {
  const note = {
    data: quill.root.innerHTML,
    id: Date.now(),
    time: getDate(),
  }
  notes.push(note);
  addToLocalStorage(notes, noteList);
});

function renderNotes(items, container) {
  container.innerHTML = ''

  items.forEach(item => {
    const article = document.createElement('article')

    article.setAttribute('class', 'note')
    article.setAttribute('data-key', item.id)
    article.innerHTML = `${item.data}${item.time}`


    console.log(items);
    container.append(article);
  });
}

function getDate() {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes();
  let dateTime = date + ' ' + time;
  return dateTime;
}


function addToLocalStorage(arr) {
  localStorage.setItem("notes", JSON.stringify(arr));
  renderNotes(notes, noteList);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("notes");

  if (reference) {
    notes = JSON.parse(reference);
    renderNotes(notes, noteList);
  }
}
getFromLocalStorage();
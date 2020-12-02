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
    article.innerHTML = `${item.data}`


    console.log(items);
    container.append(article);
  });


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
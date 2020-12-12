const saveBtn = document.getElementById('save');
const noteList = document.getElementById('note-list')
const favoriteList = document.getElementById('favorite-list')
const titleInput = document.getElementById('title')
 
 
 
let notes = [];
let favorites = [];


let Clipboard = Quill.import('modules/clipboard');
let Delta = Quill.import('delta');

class PlainClipboard extends Clipboard {
  convert(html = null) {
    if (typeof html === 'string') {
      this.container.innerHTML = html;
    }
    let text = this.container.innerText;
    this.container.innerHTML = '';
    return new Delta().insert(text);
  }
}

Quill.register('modules/clipboard', PlainClipboard, true);
 
const toolbarModifier = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': [1, 2, 3, false] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'align': [] }],
  [ 'link', 'image', 'video', 'formula' ]
]

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarModifier,
  },
  placeholder: 'Compose a note...',
  theme: 'bubble'
});

 
 
saveBtn.addEventListener('click', () => {
  saveNote();
 
 
});
 
function saveNote() {
  const note = {
    title: getTitle(),
    data: quill.root.innerHTML,
    editorData: quill.getContents(),
    isFavorite: false,
    id: Date.now(),
    time: getDate(),
  }
  notes.push(note);
  addToLocalStorage(notes);
  quill.setContents('');
  titleInput.value = '';
}
 
 
function renderNotes(items, container) {
  container.innerHTML = ''
 
  items.reverse().forEach(item => {
    const article = document.createElement('article')
 
    article.setAttribute('class', 'note')
    article.setAttribute('data-key', item.id)
    article.innerHTML = `
    <button class="collapsible">${item.title} </button>
    <div class="note_content"><span class="time">Sparat: ${item.time}</span><div id="${item.id}" class="ql-viewer">${item.data}</div></div>
    <button class="delete-button">Delete</button>
    <button class="edit-button">Edit</button>
    <button class="favorite-button">Favorite</button>
    <button class="print-button">Print</button>
    `
 
 
    console.log(items);
    container.append(article);
  });
}


function printNote(noteID) {
let printContents = document.getElementById(noteID).innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
 
function getDate() {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes();
  let dateTime = date + ' ' + time;
  return dateTime;
}
 
 
function getTitle() {
  if (titleInput.value === "") {
    return quill.getText().substr(0,12);
  }
  else {
    return titleInput.value;
  }
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
 
function deleteNote(id) {
 
  notes = notes.filter(item => {
    return item.id != id;
  });
 
  addToLocalStorage(notes);
}
 
function editNote(id) {
  note = notes.find(item => item.id == id)
  quill.setContents(note.editorData)
  titleInput.value = note.title
  deleteNote(id);
}
 
function favoriteNote(id){
  note = notes.find(item => item.id == id)
  note.isFavorite = true;
  favorites = notes.filter(item => { 
  return item.isFavorite === true
  });
  renderNotes(favorites, favoriteList);
}
 
function unFavoriteNote(id){
  note = notes.find(item => item.id == id)
  note.isFavorite = false;
  favorites = notes.filter(item => { 
  return item.isFavorite === true
  });
  renderNotes(favorites, favoriteList);
}
 
 
 
getFromLocalStorage();
 
noteList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
 
    deleteNote(event.target.parentElement.getAttribute("data-key"));
    return;
  }
  if (event.target.classList.contains("edit-button")) {
    unFavoriteNote(event.target.parentElement.getAttribute("data-key"));
    editNote(event.target.parentElement.getAttribute("data-key"));
    return;
  }
  if (event.target.classList.contains("favorite-button")) {
    favoriteNote(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains("print-button")){
    printNote(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains('collapsible')){
    event.target.classList.toggle("active");
    let note_content = event.target.nextElementSibling;
    if (note_content.style.maxHeight) {
      note_content.style.maxHeight = null;
    } else {
      note_content.style.maxHeight = "300px";
    }
  }
});
 
favoriteList.addEventListener("click", (event) => {
  if(event.target.classList.contains("favorite-button")) {
    unFavoriteNote(event.target.parentElement.getAttribute("data-key"));
  }
  if(event.target.classList.contains("delete-button")) {
    unFavoriteNote(event.target.parentElement.getAttribute("data-key"));
    deleteNote(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains("edit-button")) {
    unFavoriteNote(event.target.parentElement.getAttribute("data-key"));
    editNote(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains("print-button")){
    printNote(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains('collapsible')){
    event.target.classList.toggle("active");
    let note_content = event.target.nextElementSibling;
    if (note_content.style.maxHeight) {
      note_content.style.maxHeight = null;
    } else {
      note_content.style.maxHeight = '300px';
    }
  }
})

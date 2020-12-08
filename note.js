const saveBtn = document.getElementById('save');
const noteList = document.getElementById('note-list')
const favoriteList = document.getElementById('favorite-list')
const titleInput = document.getElementById('title')



let notes = [];
let favorites = [];


const toolbarModifier = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': [1, 2, 3, false] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'align': [] }],
  [ 'link', 'image', 'video', 'formula' ]
]

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarModifier
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

  items.forEach(item => {
    const article = document.createElement('article')

    article.setAttribute('class', 'note')
    article.setAttribute('data-key', item.id)
    article.innerHTML = `
    <button class="collapsible">${item.title}</button>
    <div class="ql-viewer note_content">${item.data}</div>
    <span class="time">Sparat: ${item.time}</span>
    <button class="delete-button">Delete</button>
    <button class="edit-button">Edit</button>
    <button class="favorite-button">Favorite</button>
    `


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


function getTitle() {
  if (!titleInput.validity.value) {
    let qText = quill.getText()
    let tempTitle = qText.substr(0, 15)
    return tempTitle;
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

    editNote(event.target.parentElement.getAttribute("data-key"));
    return;
  }
  if (event.target.classList.contains("favorite-button")) {
    favoriteNote(event.target.parentElement.getAttribute("data-key"));
  }
  event.target.classList.toggle("active");
  let note_content = event.target.nextElementSibling;
  if (note_content.style.maxHeight) {
    note_content.style.maxHeight = null;
  } else {
    note_content.style.maxHeight = note_content.scrollHeight + "px";
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
    //dasf
  }
  event.target.classList.toggle("active");
  let note_content = event.target.nextElementSibling;
  if (note_content.style.maxHeight) {
    note_content.style.maxHeight = null;
  } else {
    note_content.style.maxHeight = note_content.scrollHeight + "px";
  }
})
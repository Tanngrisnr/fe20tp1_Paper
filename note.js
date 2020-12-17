/*DOM and global variables declaration*/
const saveBtn = document.getElementById('save');
const noteList = document.getElementById('note-list')
const favoriteList = document.getElementById('favorite-list')
const titleInput = document.getElementById('title')
const header = document.getElementById('sidebar-header')
const search = document.getElementById("search")
 
 
let notes = [];
let favorites = [];

/*Class extending quill clipboard to stop copied text from keeping formatting*/
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

/*Quill toolbar initialized*/ 

const toolbarModifier = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': [1, 2, 3, false] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'align': [] }],
  [ 'link', 'image' ]
]
/*Quill editor initialized*/
const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarModifier,
  },
  placeholder: 'Compose a note...',
  theme: 'bubble'
});

 
/*Save button event listener and simple validation*/ 
saveBtn.addEventListener('click', () => {


  if (quill.getText().length <= 1) {
    quill.root.dataset.placeholder = 'you need to write something...';
  } else {
    saveNote();
    quill.root.dataset.placeholder = 'Compose a note...';
  }
 
});
/*fucntion defining new note object to be saved to local storage*/ 
function saveNote() {
  const note = {
    title: getTitle(),
    data: quill.root.innerHTML,
    editorData: quill.getContents(),
    isFavorite: false,
    id: Date.now(),
    time: getDate(),
  }
  notes.unshift(note);
  addToLocalStorage(notes);
  quill.setContents('');
  titleInput.value = '';
}
 
/*Function to render notes on page*/ 
function renderNotes(items, container) {
  container.innerHTML = ''
 
  items.forEach(item => {
    const article = document.createElement('article')
 
    article.setAttribute('class', 'note')
    article.setAttribute('data-key', item.id)
    article.innerHTML = `
    <button class="collapsible">${item.title} </button>
    <div class="note_content"><span class="time">Saved: ${item.time}</span><div id="${item.id}" class="ql-viewer">${item.data}</div></div>
    <div class="note-options" data-key="${item.id}">    
    <button class="delete-button">delete</button>
    <button class="edit-button">edit</button>
    <button class="favorite-button">favorite</button>
    <button class="print-button">print</button>
    </div>
    `
 
 
    console.log(items);
    container.append(article);
  });
}

/* function to print targeted note */
function printNote(noteID) {
let printContents = document.getElementById(noteID).innerHTML;

  document.body.innerHTML = printContents;

  window.print();
  /* location.reload() */

}
/*Function to calculate the date the note was made*/ 
function getDate() {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes();
  let dateTime = date + ' ' + time;
  return dateTime;
}
 
/*Function to get title from editor*/ 
function getTitle() {
  if (titleInput.value === "") {
    return quill.getText().substr(0,12) + "...";
  }
  else if (titleInput.value.length > 30) {
    return titleInput.value.substr(0,30) + "...";
    
  } else {
    return titleInput.value;
  }
}
 
/*Function adding notes to local storage and updating rendered notes to reflect this*/ 
function addToLocalStorage(arr) {
  localStorage.setItem("notes", JSON.stringify(arr));
  renderNotes(notes, noteList);
 
}
/*Function to update get notes from local storage and update on page via renderNotes() function */ 
function getFromLocalStorage() {
  const reference = localStorage.getItem("notes");
 
  if (reference) {
    notes = JSON.parse(reference);
    renderNotes(notes, noteList);
 
  }
}
/*function to delete note from local storage*/ 
function deleteNote(id) {
 
  notes = notes.filter(item => {
    return item.id != id;
  });
 
  addToLocalStorage(notes);
}
/*Function to open note in editor to allow edits*/ 
function editNote(id) {
  note = notes.find(item => item.id == id)
  quill.setContents(note.editorData)
  titleInput.value = note.title
  deleteNote(id);
}

/*Function to mark notes as favorite and put them on the favorites list*/
function favoriteNote(id){
  note = notes.find(item => item.id == id)
  note.isFavorite = true;
  favorites = notes.filter(item => { 
  return item.isFavorite === true
  });
  renderNotes(favorites, favoriteList);
}
/*Function to unfavorite notes*/ 
function unFavoriteNote(id){
  note = notes.find(item => item.id == id)
  note.isFavorite = false;
  favorites = notes.filter(item => { 
  return item.isFavorite === true
  });
  renderNotes(favorites, favoriteList);
}
 
 
/*Function call to get notes from local storage and render on page */ 
getFromLocalStorage();
 
/*Event listeners for saved notes list*/
noteList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    unFavoriteNote(event.target.parentElement.getAttribute("data-key"));
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

/* event listeners for favorites list */
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
/*Event listener and toggle functions for saved notes and favorite notes*/
header.addEventListener('click', (event)=>{
  if(event.target.classList.contains('show-all')) {
    if (!event.target.classList.contains('active-display')) {
      event.target.classList.toggle('active-display');
      event.target.nextElementSibling.classList.remove('active-display')
      noteList.style.display = "initial"
      favoriteList.style.display = "none"
    }
  }
  if(event.target.classList.contains("show-favorites")) {
    if (!event.target.classList.contains('active-display')) {
      event.target.classList.toggle('active-display');
      event.target.previousElementSibling.classList.remove('active-display')
      noteList.style.display = "none"
      favoriteList.style.display = "initial"
    }
}
})
/* Event listener for search field and search function */
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
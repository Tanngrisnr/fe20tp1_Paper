const saveBtn = document.getElementById('save');
const noteList = document.getElementById('note-list')
const titleInput = document.getElementById('title')




let notes = [];


const toolbarModifier = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, false] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }]
]

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarModifier
  },
  placeholder: 'Compose a note...',
  theme: 'snow'
});

saveBtn.addEventListener('click', () => {
  saveNote();

});

function saveNote() {
  const note = {
    title: titleInput.value,
    data: quill.root.innerHTML,
    editorData: quill.getContents(),
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
  event.target.classList.toggle("active");
  let note_content = event.target.nextElementSibling;
  if (note_content.style.maxHeight) {
    note_content.style.maxHeight = null;
  } else {
    note_content.style.maxHeight = note_content.scrollHeight + "px";
  }
});

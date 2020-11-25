const saveBtn = document.getElementById('save');
const noteList = document.getElementById('note-list')
const titleInput = document.getElementById('title')


let notes = [];

var quill = new Quill('#editor', {
    theme: 'snow'
  });

saveBtn.addEventListener('click', ()=>{

    /* Possible error implementation.
    if (quill.root.innerHTML = `
    <p>Hello World!</p>
    <p>begin a new <strong>note.</strong></p>
    ` ) {
      //error¨
      alert('placeholder error')
    }

    else if (quill.root.innerHTML = '') {
      //error
      alert('empty error')
    }

    else if (titleInput.value = ''){
      //error
      alert('title error')
    } */


    const note = {
        data: quill.root.innerHTML,
        id: Date.now(),
        title: titleInput.value
    }
    notes.push(note);
    addToLocalStorage(notes, noteList);
    quill.setContents([
      { insert: 'Hello ' },
      { insert: 'World! \n'},
      { insert: 'begin a new ' },
      {insert: 'note.', attributes: { bold: true }}
    ]);
    titleInput.value = ''
  
});

function renderNotes(items, container){
        container.innerHTML = ''
    
        items.forEach(item => {
            const article = document.createElement('article')
            
            article.setAttribute('class', 'note')
            article.setAttribute('data-key', item.id)
            article.innerHTML = `
            <h3 class='note-title'>${item.title}</h3>
            ${item.data}
            `
            
           
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
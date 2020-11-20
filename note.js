const noteList = document.getElementById('note-list')
let notes = [];

const editor = new EditorJS({
    holder: 'editorjs', 

    tools: { 
        header: {
          class: Header, 
          placeholder:"Heading",
          inlineToolbar: ['link'],
          shortcut: 'CMD+SHIFT+H',
          levels: [2, 3, 4],
          defaultLevel: 3,
          inlineToolbar: true,
        }, 
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
        },
        list: {
            class: List,
            inlineToolbar: true,
        },
        image: SimpleImage,
        Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
        },
        underline: Underline,
        

        },
  });

  function saveFunction(){
    editor.save().then((output) => {
        createNote(output)
    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
    
}

function createNote(obj){

    const note = obj;
    notes.push(note);
    addToLocalStorage(notes);
}

function renderNotes(items){
    noteList.innerHTML = ''

    items.forEach(item => {
        const article = document.createElement('article')
        
        article.setAttribute('class', 'note')
        article.setAttribute('data-key', item.time)
        
        item.blocks.forEach(block => {
            article.innerHTML = `${block.data.text}`
        });
        console.log(items);
        noteList.append(article);
    });
}

function addToLocalStorage(arr) {
    localStorage.setItem("notes", JSON.stringify(arr));
    renderNotes(notes);
  }

function getFromLocalStorage() {
    const reference = localStorage.getItem("notes");
  
    if (reference) {
      notes = JSON.parse(reference);
      renderNotes(notes);
    }
  }
getFromLocalStorage();
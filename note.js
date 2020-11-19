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
import React from 'react';

const NoteContent = React.createContext({
    notes: [],
    folders: [],
    handleDeleteNote: () => {},
  updateNote: () => {},
  //addFolder: () => {},
 // addNote: () => {},
 // deleteNote: () => {},
});



export default NoteContent;
import React from 'react';

const NoteContent = React.createContext({
    notes: [],
    folders: [],
    handleDeleteNote: () => {},
    toggle: false,
    handleDeleteNote: () => {},
    deleteFolder: () => {},
    addFolder: () => {},
    addNote: () => {},
    handleError: () => {}
});



export default NoteContent;
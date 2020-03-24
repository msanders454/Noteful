import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import './AddNote.css'

function AddNote(props){
    return (
        <section className='AddNote'>
            <h2>Create a note</h2>
            <NoteContext.Consumer>
                {(value) => (
                    <form className={'formNote'} onSubmit={(e) => props.handleAddNote(e)}>
                        {props.validateNote}
                        <label htmlFor="addNote">New Note Name:</label>
                        <input required name="addNote" id="addNote" onChange={(val) => props.updateNote(val.target.value)}></input>
                        <label htmlFor="content">Content:</label>
                        <input required type="text" name="content" onChange={(val) => props.updateNoteContent(val.target.value)}></input>
                        <select required name="folderId" onChange={(val) => props.updateNoteFolder(val.target.value)}>>
                          {value.folders.map(folder => <option key={folder.id} value={folder.id} id={folder.id}>{folder.name}</option>) }
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                 )}
            </NoteContext.Consumer>
        </section>
    )
}

export default AddNote;

AddNote.propTypes = {
    handleAddNote: PropTypes.func,
    updateNote: PropTypes.func,
    updateNoteContent: PropTypes.func,
    updateNoteFolder: PropTypes.func
}


import React from 'react';
import './NotesSection.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteSection(props){
    console.log(props)
    return(      
        <div className="notes-section">
            {props.notes.map(note => < Note key={note.id} id={note.id} name={note.name}/>)} 
            <Link to="/addNote"><button className="add-note">Add Note</button></Link>  
        </div>  
    )
}

export default NoteSection;

NoteSection.propTypes = {
    notes: PropTypes.array
};
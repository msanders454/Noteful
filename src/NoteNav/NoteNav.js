import React from 'react';
import BackButton from '../BackButton/BackButton';
import './NoteNav.css'
import Note from '../Note/Note';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';



function findNote(id, notes){
    console.log(notes)
    let note = notes.find(note => `${note.id}` === id)
    return note;
}

function NoteNav(props){
console.log(props)
    return( 
        <NoteContext.Consumer>  
            {value =>       
        <div>    
            <div className="container">
                < BackButton folders={value.folders} currentNote={findNote(props.id, value.notes)} onBackClick={() => props.onBackClick()}/>
                <div className="MainPage">
                    < Note key={findNote(props.id, value.notes).id} id={findNote(props.id, value.notes).id} name={findNote(props.id, value.notes).name} modified={findNote(props.id, value.notes).modified}/>  
                    <p>{findNote(props.id, value.notes).content}</p> 
                </div> 
            </div>
        </div>}
        </NoteContext.Consumer>
    )
}

export default NoteNav;

NoteNav.propTypes = {
    id: PropTypes.string,
    onBackClick: PropTypes.func
}
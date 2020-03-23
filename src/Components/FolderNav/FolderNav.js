import React from 'react';
import SideBar from '../SideBar/SideBar';
import NoteSection from '../NotesSection/NotesSection';
import './FolderNav.css'
import NoteContext from '../../NoteContext';
import PropTypes from 'prop-types';


function filterNotes(id, notes){
    let filteredNotes = notes.filter(note => `${note.folderId}` === id)
    return filteredNotes
}

function FolderNav(props){
    return(     
        <NoteContext.Consumer> 
            {value =>   
        <div>    
            <div className="container">
                < SideBar/>
                < NoteSection notes={filterNotes(props.id, value.notes)} />
            </div>
        </div>  }
        </NoteContext.Consumer>
    )
}

export default FolderNav;

FolderNav.propTypes = {
    id: PropTypes.string
}
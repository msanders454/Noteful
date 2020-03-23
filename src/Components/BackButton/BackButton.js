import React from 'react';
import './BackButton.css';
import NoteContext from '../../NoteContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function filterFolder(id, folders){
    console.log(folders)
    let folder = folders.find(folder => folder.id === id)
    return folder.name;
}

function BackButton(props){
    return(     
        <NoteContext.Consumer>   
            {value => 
        <div className="folder-sidebar">
                <button className="back-button" onClick={() => props.onBackClick()}> &lt; <br/> Back </button>
                <h3>{filterFolder(props.currentNote.folderId, value.folders) }</h3>
                
        </div>}
        </NoteContext.Consumer>  
    )
}

export default BackButton;

BackButton.propTypes = {
    onBackClick: PropTypes.func,
    currentNote: PropTypes.object
}
import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

function Note(props){
    return(      
        <NoteContext.Consumer>
            {value => 
        
                <div className="note">  
                     <Link to={`/notes/${props.id}`}>
                        <h2>{props.name}</h2> 
                     </Link>
                     <div className="delete">
                        <Link to={'/'}>
                            <button className="delete" onClick={() => value.deleteNote(props.id)}>Delete</button>
                        </Link>
                     </div>
                </div>  
        }
        </NoteContext.Consumer>
    )
}

export default Note;

Note.propTypes = {
    id: PropTypes.number,
    fullName: PropTypes.string,
    modified: PropTypes.string
}

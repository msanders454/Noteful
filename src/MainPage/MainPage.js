import React from 'react';
import './MainPage.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainPage(props){
    console.log(props)
    return(      
        <div className="MainPage">
            {props.notes.map(note => < Note key={note.id} id={note.id} name={note.name}/>)} 
            <Link to="/addNote"><button className="add-note">Add Note</button></Link>  
        </div>  
    )
}

export default MainPage;

MainPage.propTypes = {
    notes: PropTypes.array
};
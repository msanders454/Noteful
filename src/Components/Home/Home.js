import React from 'react';
import SideBar from '../SideBar/SideBar';
import NoteSection from '../NotesSection/NotesSection';
import './Home.css';
import PropTypes from 'prop-types';

function Home(props){
    console.log(props);
    return(     
        <div>    
            <div className="container">
                < SideBar/>
                < NoteSection notes={props.notes}/>
            </div>
        </div>    
    )
}

export default Home;

Home.propType = {
    notes: PropTypes.number
};
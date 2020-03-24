import React from 'react';
import Folder from '../Folder/Folder';
import './SideBar.css';
import NoteContext from '../NoteContext';
import { Link } from 'react-router-dom';

function SideBar(props){
    return(
        <NoteContext.Consumer>
            {(value) => (
                <div className="sidebar">
                {value.folders.map(folder => < Folder key={folder.id} id={folder.id} name={folder.name}/>)}
                <Link to="/addFolder"><button className="add-folder"> Add Folder</button></Link>
            </div>)}
         </NoteContext.Consumer>
    )
}

export default SideBar;
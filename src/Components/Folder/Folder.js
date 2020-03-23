import React from 'react';
import './Folder.css';
import { NavLink } from 'react-router-dom';

function Folder(props){
    return(     
    <NavLink to={`/folder/${props.id}`}>   
       <div className="folder">
           <h2>{props.name}</h2>
       </div>
    </NavLink>    
    )
}

export default Folder;
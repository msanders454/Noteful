import React, {Component} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Circle from '../Circle/Circle'
import { countNotesForFolder } from '../notes-help'
import NotesContent from '../note-content';
import './ListNav.css'

export default function ListNav () {
  return (
    <NotesContent.Consumer>
      {({folders, notes}) => {
       return (<div className='ListNav'>
       <ul className='ListNavList'>
           {folders.map(folder =>
            <li key={folder.id}>
               <NavLink
                className='ListNavFolder'
                 to={`/folders/${folder.id}`}
                >
             <span className='ListNavCounter'>
               {countNotesForFolder(notes, folder.id)}.)
             </span>
             <span className='ListNavName'>
               {folder.name}
             </span>
           </NavLink>
         </li>
       )}
     </ul>
     <div className='ListNavWrapper'>
       <Circle
         tag={Link}
         to='/add-folder'
         type='button'
         className='ListNavAddFolder'
       >
         <FontAwesomeIcon icon='plus' />
         <br />
         Folder
       </Circle>
     </div>
   </div>) 
}}
    </NotesContent.Consumer>
    )
 }

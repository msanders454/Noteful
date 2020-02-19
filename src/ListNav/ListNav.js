import React, {Component} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Circle from '../Circle/Circle'
import { countNotesForFolder } from '../notes-help'
import NotesContext from '../note-content';
import './ListNav.css'

class ListNav extends Component {
  
  static contextType = NotesContext

  render(){
    const {notes, folders} = this.context;
    return (
      <div className='ListNav'>
        <ul className='ListNavList'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='ListNavFolder'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNavNotes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNavWrapper'>
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
      </div>
    )
  }
}

export default ListNav
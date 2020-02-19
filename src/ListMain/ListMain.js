import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Node'
import Circle from '../Circle/Circle'
import './ListMain.css'
import NotesContext from '../note-content';

class ListMain extends Component {

  static contextType = NotesContext
  render(){
    const {notes} = this.context;
    const folderId = this.props.match.params.folderId

    const notesInFolder = notes.filter((note) => 
    {if(folderId){
     return  note.folderId === folderId
    } else{
      return note
    }}
  );


    return (
      <section className='ListMain'>
        <ul>
          {notesInFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                history={this.props.history}
                match={this.props.match}
              />
            </li>
          )}
        </ul>
        <div className='ListMainButton'>
          <Circle
            tag={Link}
            type='button'
            className='ListMainNote'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </Circle>
        </div>
      </section>
    )
  }
}

export default ListMain;
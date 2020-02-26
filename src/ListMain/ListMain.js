import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Node'
import Circle from '../Circle/Circle'
import './ListMain.css'
import NotesContent from '../note-content';
import { getNotesForFolder } from '../notes-help'



export default class ListMain extends React.Component {
  static contextType = NotesContent;

  render(){

    const {folderId} = this.props.match.params

    const notesInFolder = getNotesForFolder(this.context.notes, folderId)

    return (
      <section className='ListMain'>
        <ul>
          {notesInFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                match={this.props.match}
              />
            </li>
          )}
        </ul>
        <div className='ListMainButton'>
          <Circle
            tag={Link}
            type='button'
            to='/add-note'
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


ListMain.defaultProps = {
  notes: [],
}

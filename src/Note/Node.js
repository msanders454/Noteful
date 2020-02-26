import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Node.css'
import NotesContent from '../note-content';
import PropTypes from 'prop-types'


export default class Note extends React.Component {
  static contextType = NotesContent;

  handleClickDelete = () => {
    if (this.props.match.params.noteId) {
      this.context.handleDeleteNote(this.props.id)
        .then(res => res.json())
        .then(() => this.props.history.push('/'))
        .then(() => this.context.updateNote(this.props.id))
    }
    else {
      this.context.handleDeleteNote(this.props.id)
      .then(res => res.json())
      .then(() => this.context.updateNote(this.props.id))
    }
  }


  render(){
  return (
        <div className='Note'>
          <h2 className='NoteTitle'>
            <Link to={`/note/${this.props.id}`}>
              {this.props.name}
            </Link>
          </h2>
          <button className='NoteDelete' type='button'
          onClick={this.handleClickDelete}
          >
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            Delete
          </button>
        </div>
       )}
}
Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
}

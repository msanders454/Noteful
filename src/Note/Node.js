import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Node.css'
import NotesContent from '../note-content';
import PropTypes from 'prop-types'


export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = NotesContent;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(noteId)

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
        return res.json()
      }
    })
    .then(() => {
      this.context.handleDeleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(err => {
      console.log({ err })
    })
  }


  render(){
    const { name, id, modified } = this.props
  return (
        <div className='Note'>
          <h2 className='NoteTitle'>
            <Link to={`/note/${id}`}>
              {name}
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
  onDeleteNote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
}
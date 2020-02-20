import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Node.css'
import NotesContext from '../note-content';



class Note extends Component {
  deleteRequest = (Id, callback) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }})
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(res => callback(noteId))
      .catch(error => {
        console.log((error.message))
      })
  }  


  render(){
  return (
    <NotesContext.Consumer>
       {(context) => (
        <div className='Note'>
          <h2 className='NoteTitle'>
            <Link to={`/note/${this.props.id}`}>
              {this.props.name}
            </Link>
          </h2>
          <button className='NoteDelete' type='button'
          onClick={() => {
            this.deleteRequest(this.props.id,context.deleteNote);
            if(this.props.match.path === "/note/:noteId"){
              this.props.history.push('/')
            }
          }}
          >
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='NoteDates'>
            <div className='NoteModified'>
              Modified
              {' '}
              <span className='Date'>
                {format(this.props.modified, 'Do MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
       )}
    </NotesContext.Consumer>
  )
}
}

export default Note
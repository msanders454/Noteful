import React from 'react'
import Note from '../Note/Node'
import './PageMain.css'
import { findNote } from '../notes-help'
import NotesContent from '../note-content';
import PropTypes from 'prop-types';
export default class PageMain extends React.Component {
  state = {
    forErrors: this.props.match,
    toggle: true
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotesContent;
  handleDeleteNote = noteId => {
    this.props.history.push('/')
  }
  render () {  
    const { notes=[] } = this.context
    const { noteId } = this.state.forErrors.params
    const note = findNote(notes, noteId) || { content: ''}
      if(this.state.toggle === false) {
        this.setState({
          forErrors: 'err'
        })
        this.setState({
          forErrors: this.props.match
        })
      }  
    return (
      <section className='PageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='PageMainContent'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}


PageMain.defaultProps = {
  note: {
    content: '',
  }

}

PageMain.propType = {
  forErrors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    params: PropTypes.array.isRequired
}; 
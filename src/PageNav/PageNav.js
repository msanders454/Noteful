import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Circle from '../Circle/Circle'
import './PageNav.css'
import PropTypes from 'prop-types';
import NotesContent from '../note-content';
import { findNote, findFolder } from '../notes-help';

export default class PageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }

  static contextType = NotesContent;

  render () {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote( notes, noteId ) || {}
    const folder = findFolder( folders, note.folderId)
    return (
      <div className='PageNav'>
        <Circle
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='PageNavBack'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </Circle>
        {folder && (
          <h3 className='PageNavFolder'>
            {folder.name}
          </h3>
        )}
      </div>
    )
      
}
}
PageNav.propType = {
  push: PropTypes.func.isRequired
};
import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Circle from '../Circle/Circle'
import NotesContext from '../note-content'
import './PageNav.css'

class PageNav extends Component {

  static contextType = NotesContext

  render() {
    const {folders} = this.context
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
        {folders && (
          <h3 className='PageNavFolder'>
            {folders.name}
          </h3>
        )}
      </div>
    )
      }
}

export default PageNav